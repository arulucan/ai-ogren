# Antigravity & AI Studio Akademi — İnteraktif Öğrenme Platformu

**Google Antigravity**, **Google AI Studio**, **Claude & ChatGPT**, **GitHub** ve **Vercel** ekosistemini 4 paralel parkurla, **deneyerek ve adım adım ilerleyerek** öğreten, tamamen ücretsiz yayınlanabilir web uygulaması.

## 4 Paralel Eğitim Parkuru (20 Modül)

1. **Google Antigravity (7 Modül):** App 2.0, IDE (`Tab`/`Supercomplete`, `Ctrl+I`), `agy` CLI, `@` Mentions, Slash Komutları (`/plan`, `/grill-me`, `/boost`), Terminal Sandbox, Rules/Skills/Hooks/MCP, Subagent/Swarm/Cron ve Python SDK.
2. **Google AI Studio (5 Modül):** Model seçimi & `Temperature`/`System Instructions`, Prompt & `Structured Output` (JSON Şema), `Grounding` / `Function Calling` / `Code Execution`, `Build` (Vibe Coding) & `Get Code`, `API Key` güvenliği.
3. **Claude & ChatGPT (4 Modül):** Claude modelleri (`Haiku`/`Sonnet`/`Opus`), `Projects` & `Artifacts`, `Claude Code` (`CLAUDE.md ↔ GEMINI.md` & ortak `MCP`), ChatGPT `Canvas` / `Custom GPTs` / `Deep Research` ve 4’lü AI Seçim Matrisi.
4. **GitHub & Vercel (4 Modül):** Git yaşam döngüsü (`Working Tree → Staging → Commit → Push`), GitHub depoları & `Pull Request`, Vercel ücretsiz CI/CD (`Preview` vs `Production`, `vercel.json`), Ortam Değişkenleri (`.env`), Özel Alan Adı (`DNS`/`SSL`) ve hata ayıklama.

## Öne Çıkan Özellikler

- **Her Kavramın Altında Hızlı Kontrol (Mikro-Quiz):** Aktif Hatırlama (Active Recall) tekniğiyle her konu kartının hemen altında 1 soruluk anlık kontrol (+15 XP).
- **20 Modül × Özel İnteraktif Lab + 3 Soruluk Bölüm Quizi + Gerçek Hayat Görevi.**
- **83 Terimlik Akıllı Balon (Tooltip) Sistemi & Sözlük:** Teknik terimlerin üzerine gelince Türkçe karşılığı ve kısa açıklaması anında balonda açılır.
- **Antigravity 2.0 Serbest Simülatör (Playground)** & **Canlı Config Atölyesi**.
- **Oyunlaştırma & Kalıcılık:** XP, 5 rütbe, `localStorage` otomatik kayıt + JSON yedekleme ve `Ctrl+K` hızlı arama.

## Yerelde Çalıştırma

```bash
npm install
npm run dev
```

## Ücretsiz Online Yayınlama (GitHub & Vercel)

```bash
git init
git add .
git commit -m "feat: 4 parkurlu Antigravity & AI Studio Akademi"
gh repo create antigravity-akademi --public --source=. --push
npx vercel --prod
```
