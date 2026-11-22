import React, { useState } from 'react';
import {
  Sparkles,
  CheckCircle2,
  Sliders,
  FileJson,
  Wrench,
  Search,
  Terminal,
  Code2,
  Copy,
  Check,
  ShieldAlert,
  ShieldCheck,
  Play,
  ArrowRight,
} from 'lucide-react';
import { GlossaryText } from '../GlossaryText';

interface LabProps {
  isCompleted: boolean;
  onComplete: () => void;
}

/* ============================================================================
 * 1. AI Studio Basics & Parameters Lab
 * ========================================================================== */
export const AiStudioParamsLab: React.FC<LabProps> = ({ isCompleted, onComplete }) => {
  const [model, setModel] = useState<'flash' | 'pro'>('flash');
  const [temp, setTemp] = useState(0.2);
  const [sysInst, setSysInst] = useState('Her zaman net, maddeli ve Türkçe yanıt ver.');
  const [testedLow, setTestedLow] = useState(false);
  const [testedHigh, setTestedHigh] = useState(false);
  const [output, setOutput] = useState<string | null>(null);

  const handleRun = () => {
    const isLow = temp <= 0.3;
    const isHigh = temp >= 0.9;
    const nextLow = testedLow || isLow;
    const nextHigh = testedHigh || isHigh;
    setTestedLow(nextLow);
    setTestedHigh(nextHigh);

    if (isLow) {
      setOutput(
        `[${model === 'flash' ? 'Gemini Flash · 0.4s' : 'Gemini Pro · 1.2s'} | Temp: ${temp.toFixed(1)}]\n• Sistem Talimatı Uygulandı: "${sysInst}"\n• Tutarlı Sloganlar:\n  1. Taze Kavrulmuş, Her Yudumda Denge.\n  2. Günün En Güvenilir Kahve Molası.\n  3. Kaliteli Çekirdek, Saf Lezzet.`
      );
    } else if (isHigh) {
      setOutput(
        `[${model === 'flash' ? 'Gemini Flash · 0.5s' : 'Gemini Pro · 1.4s'} | Temp: ${temp.toFixed(1)}]\n• Sistem Talimatı Uygulandı: "${sysInst}"\n• Yaratıcı Sloganlar:\n  1. Yerçekimine Meydan Okuyan Espresso!\n  2. Uykunu Kodla, Kahveni Yorumla.\n  3. Fincandaki Şimşek, Zihnindeki Kıvılcım.`
      );
    } else {
      setOutput(
        `[${model === 'flash' ? 'Gemini Flash · 0.4s' : 'Gemini Pro · 1.3s'} | Temp: ${temp.toFixed(1)}]\n• Dengeli Sloganlar:\n  1. Modern Şehirli İçin Taze Kavrum.\n  2. Her Fincanda İlham Veren Aroma.\n  3. Gününü Başlatan Akıllı Kahve.`
      );
    }

    if (nextLow && nextHigh) {
      onComplete();
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-4 py-3">
        <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-cyan-100">
          <span className={testedLow ? 'text-emerald-300 line-through opacity-80' : ''}>
            1. Düşük Temperature (≤ 0.3) ile çalıştır
          </span>
          <span className={testedHigh ? 'text-emerald-300 line-through opacity-80' : ''}>
            2. Yüksek Temperature (≥ 0.9) ile kıyasla
          </span>
        </div>
        {isCompleted && (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-300 border border-emerald-500/30">
            <Sparkles className="h-3.5 w-3.5" /> Tamamlandı (+120 XP)
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Controls */}
        <div className="lg:col-span-5 rounded-2xl border border-slate-800 bg-slate-900/80 p-4 space-y-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Sliders className="h-3.5 w-3.5 text-cyan-400" /> AI Studio Sağ Panel Ayarları
          </div>

          <div>
            <label className="block text-xs text-slate-300 mb-1.5">Model Seçimi</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setModel('flash')}
                className={`rounded-xl border px-3 py-2 text-xs font-semibold transition cursor-pointer ${
                  model === 'flash'
                    ? 'border-cyan-400 bg-cyan-500/20 text-cyan-200'
                    : 'border-slate-700 bg-slate-950 text-slate-400'
                }`}
              >
                ⚡ Gemini Flash
              </button>
              <button
                type="button"
                onClick={() => setModel('pro')}
                className={`rounded-xl border px-3 py-2 text-xs font-semibold transition cursor-pointer ${
                  model === 'pro'
                    ? 'border-indigo-400 bg-indigo-500/20 text-indigo-200'
                    : 'border-slate-700 bg-slate-950 text-slate-400'
                }`}
              >
                🧠 Gemini Pro
              </button>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-slate-300">
                <GlossaryText text="Temperature" />
              </span>
              <span className="font-mono font-bold text-cyan-300">{temp.toFixed(1)}</span>
            </div>
            <input
              type="range"
              min={0}
              max={1.5}
              step={0.1}
              value={temp}
              onChange={(e) => setTemp(parseFloat(e.target.value))}
              className="w-full accent-cyan-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-1">
              <span>0.0 (Tutarlı / Kod)</span>
              <span>0.7 (Dengeli)</span>
              <span>1.5 (Yaratıcı)</span>
            </div>
          </div>

          <div>
            <label className="block text-xs text-slate-300 mb-1">
              <GlossaryText text="System Instructions" />
            </label>
            <textarea
              rows={2}
              value={sysInst}
              onChange={(e) => setSysInst(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 p-2.5 text-xs text-slate-100 focus:border-cyan-500 focus:outline-none"
            />
          </div>

          <button
            onClick={handleRun}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 px-4 py-2.5 text-xs font-semibold text-white transition cursor-pointer"
          >
            <Play className="h-3.5 w-3.5" /> AI Studio’da Çalıştır (Simüle Et)
          </button>
        </div>

        {/* Simulated Response */}
        <div className="lg:col-span-7 rounded-2xl border border-slate-800 bg-slate-950 p-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-3 text-xs text-slate-300">
              <span className="font-mono text-indigo-400">Prompt: </span>
              &quot;Modern bir kahve dükkanı için 3 kısa Türkçe slogan öner.&quot;
            </div>

            <div className="rounded-xl border border-cyan-500/25 bg-slate-900/40 p-4 min-h-[180px] font-mono text-xs text-slate-200 whitespace-pre-line leading-relaxed">
              {output ?? 'Sol panelden Temperature değerini ayarlayıp "Çalıştır" butonuna basarak çıktının nasıl değiştiğini gözlemle...'}
            </div>
          </div>

          <div className="mt-3 text-[11px] text-slate-400">
            💡 <GlossaryText text="Temperature 0.1 iken her çalıştırmada tutarlı sonuç alırsın; 1.0+ değerinde yaratıcılık artar." />
          </div>
        </div>
      </div>
    </div>
  );
};

/* ============================================================================
 * 2. Structured Output (JSON Schema) Lab
 * ========================================================================== */
export const StructuredOutputLab: React.FC<LabProps> = ({ isCompleted, onComplete }) => {
  const [structuredOn, setStructuredOn] = useState(false);
  const [fields, setFields] = useState<string[]>(['duygu', 'puan', 'etiketler']);
  const [ranStructured, setRanStructured] = useState(false);

  const ALL_FIELDS = [
    { id: 'duygu', label: 'duygu (string)', sample: '"olumlu"' },
    { id: 'puan', label: 'puan (1-5 integer)', sample: '4' },
    { id: 'etiketler', label: 'etiketler (string[])', sample: '["hizli-kargo", "paketleme"]' },
    { id: 'aksiyonGerekli', label: 'aksiyonGerekli (boolean)', sample: 'false' },
  ];

  const toggleField = (id: string) => {
    setFields((prev) =>
      prev.includes(id) ? (prev.length > 1 ? prev.filter((f) => f !== id) : prev) : [...prev, id]
    );
  };

  const jsonPreview = `{\n${ALL_FIELDS.filter((f) => fields.includes(f.id))
    .map((f) => `  "${f.id}": ${f.sample}`)
    .join(',\n')}\n}`;

  const handleToggleStructured = () => {
    const next = !structuredOn;
    setStructuredOn(next);
    if (next) {
      setRanStructured(true);
      onComplete();
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-indigo-500/30 bg-indigo-500/10 px-4 py-3">
        <div className="text-xs sm:text-sm text-indigo-100 flex items-center gap-2">
          <FileJson className="h-4 w-4 text-indigo-400 shrink-0" />
          <span>
            <strong>Görev:</strong> <GlossaryText text="Structured Output anahtarını açıp şema alanlarını özelleştirerek serbest metin ile garantili JSON farkını gör." />
          </span>
        </div>
        {isCompleted && (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-300 border border-emerald-500/30">
            <Sparkles className="h-3.5 w-3.5" /> Tamamlandı (+120 XP)
          </span>
        )}
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900/75 p-4 flex flex-wrap items-center justify-between gap-3">
        <div className="text-xs text-slate-300">
          <strong className="text-white">Girdi Yorumu:</strong> &quot;Kargo ertesi gün geldi ama kutunun köşesi hafif ezilmiş, cihaz sorunsuz.&quot;
        </div>
        <button
          onClick={handleToggleStructured}
          className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-xs font-semibold transition cursor-pointer ${
            structuredOn
              ? 'border-emerald-400 bg-emerald-500/20 text-emerald-200'
              : 'border-indigo-500 bg-indigo-600 text-white hover:bg-indigo-500'
          }`}
        >
          {structuredOn ? '✓ Structured Output: AÇIK' : 'Structured Output’u Aç'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 space-y-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            JSON Şema Alanları (Tıkla &amp; Özelleştir)
          </div>
          <div className="flex flex-wrap gap-2">
            {ALL_FIELDS.map((f) => {
              const active = fields.includes(f.id);
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => toggleField(f.id)}
                  className={`rounded-lg border px-3 py-1.5 font-mono text-xs transition cursor-pointer ${
                    active
                      ? 'border-cyan-400/60 bg-cyan-500/20 text-cyan-200'
                      : 'border-slate-800 bg-slate-950 text-slate-500'
                  }`}
                >
                  {active ? '✓ ' : '+ '}
                  {f.label}
                </button>
              );
            })}
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            {structuredOn
              ? '✅ JSON.parse() %100 güvenli! Model sohbet metni veya markdown bloğu eklemeden tam bu şemayı döndürür.'
              : '⚠️ Structured Output kapalıyken model serbest cümlelerle yanıt verir; bunu kod içinde otomatik ayrıştırmak risklidir.'}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden">
          <div className="border-b border-slate-800 bg-slate-900 px-4 py-2 flex items-center justify-between text-xs">
            <span className="font-mono text-slate-300">
              {structuredOn ? 'application/json (Garantili Şema)' : 'text/plain (Serbest Metin)'}
            </span>
            {ranStructured && (
              <span className="text-emerald-400 font-semibold">Şema Doğrulandı ✓</span>
            )}
          </div>
          <pre
            className={`p-4 font-mono text-xs leading-relaxed overflow-x-auto ${
              structuredOn ? 'text-emerald-300' : 'text-amber-200/90 whitespace-pre-wrap'
            }`}
          >
            {structuredOn
              ? jsonPreview
              : `Merhaba! Müşterinin yorumu genel olarak olumlu görünüyor. Kargodan memnun kalmış ama kutu biraz ezilmiş. Puan olarak 5 üzerinden 4 verebiliriz!`}
          </pre>
        </div>
      </div>
    </div>
  );
};

/* ============================================================================
 * 3. AI Studio Tools: Grounding, Function Calling, Code Execution Lab
 * ========================================================================== */
export const AiStudioToolsLab: React.FC<LabProps> = ({ isCompleted, onComplete }) => {
  const [grounding, setGrounding] = useState(true);
  const [funcCall, setFuncCall] = useState(false);
  const [codeExec, setCodeExec] = useState(false);
  const [triedTools, setTriedTools] = useState<string[]>([]);
  const [activeOutput, setActiveOutput] = useState<string>(
    'Aşağıdaki 3 araç butonundan farklı araçları deneyerek modelin nasıl güçlendiğini gör!'
  );

  const runToolDemo = (mode: 'grounding' | 'function' | 'code') => {
    setGrounding(mode === 'grounding');
    setFuncCall(mode === 'function');
    setCodeExec(mode === 'code');

    if (mode === 'grounding') {
      setActiveOutput(
        `🌐 [Grounding with Google Search AKTİF]\nSoru: "Vite 6’nın öne çıkan yenilikleri neler?"\n\nYanıt: Vite 6, Environment API desteği ve geliştirilmiş CSS/SSR uyumluluğu ile yayınlandı.\n🔗 Doğrulanmış Kaynaklar: vite.dev/blog/announcing-vite6 · github.com/vitejs/vite`
      );
    } else if (mode === 'function') {
      setActiveOutput(
        `🔌 [Function Calling AKTİF]\nSoru: "TR-4821 numaralı siparişim nerede?"\n\nModel Araç Çağrısı Üretti:\n{\n  "functionCall": {\n    "name": "get_order_status",\n    "args": { "order_id": "TR-4821" }\n  }\n}\n→ Senin arka uç kodun veritabanından "Dağıtımda" bilgisini döndürür!`
      );
    } else {
      setActiveOutput(
        `🐍 [Code Execution AKTİF]\nSoru: "100.000 TL %35 yıllık bileşik faizle 3 yılda kaç TL olur?"\n\nÇalıştırılan Python:\nprint(round(100000 * (1.35 ** 3), 2))\n\nKesin Sonuç: 246.037,50 TL (Tahmin yok, %100 hesaplanmış sonuç!)`
      );
    }

    const next = triedTools.includes(mode) ? triedTools : [...triedTools, mode];
    setTriedTools(next);
    if (next.length >= 2) {
      onComplete();
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-violet-500/30 bg-violet-500/10 px-4 py-3">
        <div className="text-xs sm:text-sm text-violet-100 flex items-center gap-2">
          <Wrench className="h-4 w-4 text-violet-400 shrink-0" />
          <span>
            <strong>Araç Simülatörü:</strong> En az 2 farklı AI Studio aracını test ederek çalışma farkını gözlemle.
          </span>
        </div>
        {isCompleted ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-300 border border-emerald-500/30">
            <Sparkles className="h-3.5 w-3.5" /> Tamamlandı (+120 XP)
          </span>
        ) : (
          <span className="font-mono text-xs text-violet-300">Denenen: {triedTools.length}/3</span>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <button
          onClick={() => runToolDemo('grounding')}
          className={`rounded-xl border p-4 text-left transition cursor-pointer ${
            grounding
              ? 'border-cyan-400 bg-cyan-500/15 text-white'
              : 'border-slate-800 bg-slate-900/70 text-slate-300 hover:border-slate-700'
          }`}
        >
          <Search className="h-5 w-5 text-cyan-400 mb-2" />
          <div className="text-sm font-bold">Google Search Grounding</div>
          <div className="text-xs text-slate-400 mt-1">Canlı web araması &amp; kaynak linki</div>
        </button>

        <button
          onClick={() => runToolDemo('function')}
          className={`rounded-xl border p-4 text-left transition cursor-pointer ${
            funcCall
              ? 'border-indigo-400 bg-indigo-500/15 text-white'
              : 'border-slate-800 bg-slate-900/70 text-slate-300 hover:border-slate-700'
          }`}
        >
          <Code2 className="h-5 w-5 text-indigo-400 mb-2" />
          <div className="text-sm font-bold">Function Calling</div>
          <div className="text-xs text-slate-400 mt-1">Kendi API/DB fonksiyonunu çağır</div>
        </button>

        <button
          onClick={() => runToolDemo('code')}
          className={`rounded-xl border p-4 text-left transition cursor-pointer ${
            codeExec
              ? 'border-emerald-400 bg-emerald-500/15 text-white'
              : 'border-slate-800 bg-slate-900/70 text-slate-300 hover:border-slate-700'
          }`}
        >
          <Terminal className="h-5 w-5 text-emerald-400 mb-2" />
          <div className="text-sm font-bold">Code Execution</div>
          <div className="text-xs text-slate-400 mt-1">Yerleşik Python ile kesin hesap</div>
        </button>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4 font-mono text-xs text-slate-200 whitespace-pre-line leading-relaxed min-h-[150px]">
        {activeOutput}
      </div>
    </div>
  );
};

/* ============================================================================
 * 4. AI Studio Build & Get Code Lab
 * ========================================================================== */
export const AiStudioBuildLab: React.FC<LabProps> = ({ isCompleted, onComplete }) => {
  const [lang, setLang] = useState<'ts' | 'py' | 'curl'>('ts');
  const [copied, setCopied] = useState(false);

  const SNIPPETS = {
    ts: `// 1. Kurulum: npm install @google/genai
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function askGemini(prompt: string) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });
  return response.text;
}`,
    py: `# 1. Kurulum: pip install google-genai
import os
from google import genai

client = genai.Client(api_key=os.environ["GEMINI_API_KEY"])
response = client.models.generate_content(
    model="gemini-2.5-flash",
    contents="Antigravity ve AI Studio farkını özetle.",
)
print(response.text)`,
    curl: `curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=$GEMINI_API_KEY" \\
  -H 'Content-Type: application/json' \\
  -d '{"contents":[{"parts":[{"text":"Merhaba Gemini!"}]}]}'`,
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(SNIPPETS[lang]);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
    onComplete();
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-pink-500/30 bg-pink-500/10 px-4 py-3">
        <div className="text-xs sm:text-sm text-pink-100">
          <strong>Get Code Köprüsü:</strong> AI Studio’dan kodu dışa aktar (dil seç + kopyala) ve 3 aşamalı paralel geliştirme hattını incele.
        </div>
        {isCompleted && (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-300 border border-emerald-500/30">
            <Sparkles className="h-3.5 w-3.5" /> Tamamlandı (+120 XP)
          </span>
        )}
      </div>

      {/* 3-Step Pipeline Visual */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {[
          { step: '1. AI Studio', desc: 'Prompt, şema ve Vibe Coding ile 2 dakikada prototip üret', color: 'border-cyan-500/40 bg-cyan-500/10 text-cyan-200' },
          { step: '2. Antigravity', desc: 'Get Code çıktısını yerel projeye al, test & özellik ekle', color: 'border-indigo-500/40 bg-indigo-500/10 text-indigo-200' },
          { step: '3. GitHub + Vercel', desc: 'git push yap, 30 saniyede tüm dünyaya ücretsiz yayınla', color: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-200' },
        ].map((item, i) => (
          <div key={i} className={`rounded-xl border p-3.5 ${item.color}`}>
            <div className="text-xs font-bold flex items-center justify-between">
              <span>{item.step}</span>
              {i < 2 && <ArrowRight className="h-3.5 w-3.5 opacity-60 hidden md:inline" />}
            </div>
            <p className="mt-1 text-xs opacity-90">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Get Code Simulator */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 bg-slate-900 px-4 py-2.5">
          <div className="flex gap-1.5">
            {(
              [
                { id: 'ts', label: 'TypeScript (@google/genai)' },
                { id: 'py', label: 'Python (google-genai)' },
                { id: 'curl', label: 'cURL (HTTP)' },
              ] as const
            ).map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  setLang(t.id);
                  onComplete();
                }}
                className={`rounded-lg px-2.5 py-1 font-mono text-xs transition cursor-pointer ${
                  lang === t.id
                    ? 'bg-pink-600 text-white font-semibold'
                    : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 px-3 py-1 text-xs font-semibold text-white transition cursor-pointer"
          >
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            {copied ? 'Kopyalandı!' : 'Get Code Kopyala'}
          </button>
        </div>
        <pre className="p-4 font-mono text-xs text-cyan-200 overflow-x-auto leading-relaxed">
          {SNIPPETS[lang]}
        </pre>
      </div>
    </div>
  );
};

/* ============================================================================
 * 5. API Key Security Audit Lab
 * ========================================================================== */
export const ApiKeySecurityLab: React.FC<LabProps> = ({ isCompleted, onComplete }) => {
  const CASES = [
    {
      id: 'k1',
      snippet: `// src/App.tsx (Tarayıcıda çalışır)\nconst apiKey = "AIzaSyD9x8...gercek_anahtar";`,
      safe: false,
      reason: 'TEHLİKELİ! Anahtar derlenen JS dosyasına gömülür ve tarayıcı DevTools ile 5 saniyede çalınır.',
    },
    {
      id: 'k2',
      snippet: `// api/chat.ts (Vercel Serverless Function)\nconst apiKey = process.env.GEMINI_API_KEY;`,
      safe: true,
      reason: 'GÜVENLİ! Sunucu tarafında çalışır ve anahtar Vercel Environment Variables üzerinden gizlice okunur.',
    },
    {
      id: 'k3',
      snippet: `// .gitignore içinde .env.local yok ve git add . yapıldı`,
      safe: false,
      reason: 'TEHLİKELİ! `.env.local` dosyası `.gitignore` içinde olmazsa GitHub’a sızar.',
    },
    {
      id: 'k4',
      snippet: `// .gitignore içinde ".env*.local" var + Vercel panelinde GEMINI_API_KEY tanımlı`,
      safe: true,
      reason: 'GÜVENLİ! Yerelde gizli kalır, canlıda ise Vercel’in şifreli ortam değişkenlerinden okunur.',
    },
  ];

  const [picks, setPicks] = useState<Record<string, boolean>>({});
  const score = CASES.filter((c) => picks[c.id] === c.safe).length;

  const handlePick = (id: string, val: boolean) => {
    const next = { ...picks, [id]: val };
    setPicks(next);
    if (CASES.filter((c) => next[c.id] === c.safe).length === CASES.length) {
      onComplete();
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3">
        <div className="text-xs sm:text-sm text-emerald-100">
          <strong>API Anahtarı Güvenlik Denetimi:</strong> 4 örneğin güvenli mi yoksa sızıntı riskli mi olduğuna karar ver.
        </div>
        {isCompleted ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-300 border border-emerald-500/30">
            <Sparkles className="h-3.5 w-3.5" /> Tamamlandı (+120 XP)
          </span>
        ) : (
          <span className="font-mono text-xs text-emerald-300">Doğru: {score}/{CASES.length}</span>
        )}
      </div>

      <div className="grid gap-3">
        {CASES.map((c) => {
          const picked = picks[c.id];
          const answered = picked !== undefined;
          const ok = picked === c.safe;
          return (
            <div
              key={c.id}
              className={`rounded-xl border p-4 transition ${
                answered
                  ? ok
                    ? 'border-emerald-500/40 bg-emerald-500/5'
                    : 'border-rose-500/40 bg-rose-500/5'
                  : 'border-slate-800 bg-slate-900/75'
              }`}
            >
              <pre className="rounded-lg bg-slate-950 border border-slate-800 p-3 font-mono text-xs text-amber-200 overflow-x-auto mb-3">
                {c.snippet}
              </pre>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handlePick(c.id, true)}
                  className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition cursor-pointer ${
                    picked === true
                      ? ok
                        ? 'border-emerald-400 bg-emerald-500/20 text-emerald-200'
                        : 'border-rose-400 bg-rose-500/20 text-rose-200'
                      : 'border-slate-700 bg-slate-800 text-slate-200 hover:border-emerald-400/50'
                  }`}
                >
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" /> Güvenli
                </button>
                <button
                  onClick={() => handlePick(c.id, false)}
                  className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition cursor-pointer ${
                    picked === false
                      ? ok
                        ? 'border-emerald-400 bg-emerald-500/20 text-emerald-200'
                        : 'border-rose-400 bg-rose-500/20 text-rose-200'
                      : 'border-slate-700 bg-slate-800 text-slate-200 hover:border-rose-400/50'
                  }`}
                >
                  <ShieldAlert className="h-3.5 w-3.5 text-rose-400" /> Sızıntı Riskli!
                </button>
              </div>
              {answered && (
                <p className={`mt-2.5 text-xs ${ok ? 'text-emerald-300' : 'text-rose-300'}`}>
                  <GlossaryText text={c.reason} />
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
