import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { GLOSSARY_ENTRIES, GlossaryEntry } from '../data/glossary';

// Build a lookup map and a single compiled regex sorted by longest phrase first
const TERM_MAP = new Map<string, GlossaryEntry>();
const ALL_PATTERNS: string[] = [];

for (const entry of GLOSSARY_ENTRIES) {
  const forms = [entry.term, ...(entry.aliases ?? [])];
  for (const form of forms) {
    TERM_MAP.set(form.toLowerCase(), entry);
    ALL_PATTERNS.push(form.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  }
}

// Sort descending by length so multi-word phrases like "Progressive Disclosure" match before single words
ALL_PATTERNS.sort((a, b) => b.length - a.length);

// Match terms bounded by non-letter/non-digit characters (supports Turkish characters too)
const TERM_REGEX = new RegExp(
  `(?<![\\p{L}\\p{N}_./-])(${ALL_PATTERNS.join('|')})(?![\\p{L}\\p{N}_-])`,
  'giu'
);

interface TermBadgeProps {
  matchedText: string;
  entry: GlossaryEntry;
}

const TermBadge: React.FC<TermBadgeProps> = ({ matchedText, entry }) => {
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState<{ top: number; left: number; below: boolean }>({
    top: 0,
    left: 0,
    below: false,
  });
  const spanRef = useRef<HTMLSpanElement>(null);

  const updatePosition = () => {
    const el = spanRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const tooltipWidth = 288; // w-72 = 288px
    const margin = 12;

    let left = rect.left + rect.width / 2 - tooltipWidth / 2;
    if (left < margin) left = margin;
    if (left + tooltipWidth > window.innerWidth - margin) {
      left = window.innerWidth - tooltipWidth - margin;
    }

    const showBelow = rect.top < 150;
    const top = showBelow ? rect.bottom + 8 : rect.top - 8;

    setCoords({ top, left, below: showBelow });
  };

  const handleOpen = () => {
    updatePosition();
    setOpen(true);
  };

  useEffect(() => {
    if (!open) return;
    const closeOnScroll = () => setOpen(false);
    window.addEventListener('scroll', closeOnScroll, true);
    window.addEventListener('resize', closeOnScroll);
    return () => {
      window.removeEventListener('scroll', closeOnScroll, true);
      window.removeEventListener('resize', closeOnScroll);
    };
  }, [open]);

  return (
    <>
      <span
        ref={spanRef}
        tabIndex={0}
        role="button"
        aria-label={`${entry.term}: ${entry.turkish}`}
        onMouseEnter={handleOpen}
        onMouseLeave={() => setOpen(false)}
        onFocus={handleOpen}
        onBlur={() => setOpen(false)}
        onClick={(e) => {
          e.stopPropagation();
          if (open) {
            setOpen(false);
          } else {
            handleOpen();
          }
        }}
        className="inline border-b border-dotted border-cyan-400/75 text-cyan-200/95 hover:text-cyan-100 hover:border-cyan-300 cursor-help transition-colors"
      >
        {matchedText}
      </span>

      {open &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            style={{
              position: 'fixed',
              top: coords.top,
              left: coords.left,
              transform: coords.below ? 'translateY(0)' : 'translateY(-100%)',
              width: 288,
            }}
            className="z-[100] pointer-events-none rounded-xl border border-cyan-500/40 bg-slate-900/98 p-3 shadow-2xl shadow-black/70 backdrop-blur-md animate-fade-slide"
          >
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="font-mono text-[11px] font-bold text-cyan-300">
                {entry.term}
              </span>
              <span className="rounded-md bg-indigo-500/20 border border-indigo-500/30 px-1.5 py-0.5 text-[10px] font-semibold text-indigo-200">
                TR
              </span>
            </div>
            <div className="text-xs font-semibold text-white mb-1">{entry.turkish}</div>
            <p className="text-[11px] leading-relaxed text-slate-300">{entry.explanation}</p>
          </div>,
          document.body
        )}
    </>
  );
};

interface GlossaryTextProps {
  text: string;
}

export const GlossaryText: React.FC<GlossaryTextProps> = ({ text }) => {
  if (!text) return null;

  const nodes: React.ReactNode[] = [];
  let lastIndex = 0;
  const seenInBlock = new Set<string>();

  // Reset regex state
  TERM_REGEX.lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = TERM_REGEX.exec(text)) !== null) {
    const matchedWord = match[0];
    const start = match.index;
    const entry = TERM_MAP.get(matchedWord.toLowerCase());

    if (!entry) continue;

    // Avoid cluttering the exact same paragraph by highlighting each term cleanly once per paragraph
    if (seenInBlock.has(entry.term)) continue;
    seenInBlock.add(entry.term);

    if (start > lastIndex) {
      nodes.push(text.slice(lastIndex, start));
    }

    nodes.push(
      <TermBadge key={`${start}-${entry.term}`} matchedText={matchedWord} entry={entry} />
    );
    lastIndex = start + matchedWord.length;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return <>{nodes}</>;
};
