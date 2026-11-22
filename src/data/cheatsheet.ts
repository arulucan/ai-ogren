export interface CheatSheetItem {
  id: string;
  category:
    | 'slash'
    | 'shortcuts'
    | 'customizations'
    | 'security'
    | 'cli'
    | 'aistudio'
    | 'claude-chatgpt'
    | 'github-vercel';
  command: string;
  title: string;
  description: string;
  example?: string;
}

export const CHEAT_SHEET_CATEGORIES = [
  { id: 'all', label: 'Tümü' },
  { id: 'slash', label: 'Slash Komutları (/)' },
  { id: 'shortcuts', label: 'IDE Kısayolları' },
  { id: 'customizations', label: 'Özelleştirme' },
  { id: 'security', label: 'Güvenlik' },
  { id: 'cli', label: 'agy CLI & SDK' },
  { id: 'aistudio', label: 'AI Studio' },
  { id: 'claude-chatgpt', label: 'Claude & ChatGPT' },
  { id: 'github-vercel', label: 'GitHub & Vercel' },
] as const;

export const CHEAT_SHEET_ITEMS: CheatSheetItem[] = [
  // Slash commands
  {
    id: 'sl-plan',
    category: 'slash',
    command: '/plan',
    title: 'Adım Adım Planlama',
    description: 'Karmaşık görevlerde kod yazmadan önce onayına sunulan yapılandırılmış bir Plan Artifact’i oluşturur.',
    example: '/plan Kullanıcı profil sayfası ve avatar yükleme ekle',
  },
  {
    id: 'sl-grill',
    category: 'slash',
    command: '/grill-me',
    title: 'Etkileşimli Tasarım Mülakatı',
    description: 'Belirsiz gereksinimleri netleştirmek için ajanın sana kısa, odaklı sorular sormasını başlatır.',
    example: '/grill-me Yeni bildirim sistemi mimarisini netleştirelim',
  },
  {
    id: 'sl-boost',
    category: 'slash',
    command: '/boost',
    title: 'Derin Düşünme & Yüksek Titizlik',
    description: 'Karmaşık mimari veya kritik hata ayıklamada çoklu bakış açısı ve sıkı doğrulama uygular.',
    example: '/boost Ödeme akışındaki yarış koşulunu (race condition) analiz et',
  },
  {
    id: 'sl-goal',
    category: 'slash',
    command: '/goal',
    title: 'Uzun Soluklu Otonom Hedef',
    description: 'Görev tam olarak tamamlanıp doğrulanana kadar ekstra kararlılıkla ilerler.',
    example: '/goal Tüm birim testlerini geçir ve %80 kapsamaya ulaş',
  },
  {
    id: 'sl-compact',
    category: 'slash',
    command: '/compact',
    title: 'Bağlam Sıkıştırma',
    description: 'Uzayan sohbeti akıllıca özetleyerek bağlam penceresini (context window) rahatlatır.',
  },
  {
    id: 'sl-learn',
    category: 'slash',
    command: '/learn',
    title: 'Kalıcı Öğrenme',
    description: 'Yaptığın düzeltmeleri veya karmaşık kurulum çözümlerini gelecek görevler için kalıcı kurala dönüştürür.',
  },
  {
    id: 'sl-browser',
    category: 'slash',
    command: '/browser',
    title: 'Tarayıcı Otomasyonu',
    description: 'Web sayfalarında gezinme, form doldurma ve canlı arayüz doğrulama görevlerini başlatır.',
  },
  {
    id: 'sl-teamwork',
    category: 'slash',
    command: '/teamwork',
    title: 'Çoklu Ajan Takımı (Swarm)',
    description: 'Büyük projelerde birbirleriyle haberleşen paralel uzman ajanlar çalıştırır.',
  },
  {
    id: 'sl-schedule',
    category: 'slash',
    command: '/schedule',
    title: 'Zamanlayıcı & Cron',
    description: 'Tek seferlik zamanlayıcı veya düzenli tekrarlayan (cron) arka plan görevi kurar.',
    example: '/schedule Her Pazartesi 09:00 açık issue özetini çıkar',
  },

  // IDE Shortcuts
  {
    id: 'sc-tab',
    category: 'shortcuts',
    command: 'Tab',
    title: 'Autocomplete / Supercomplete Kabul',
    description: 'Kod tamamlama, çok satırlı diff, Tab-to-Jump veya Tab-to-Import önerisini kabul eder.',
  },
  {
    id: 'sc-word',
    category: 'shortcuts',
    command: 'Ctrl + → / ⌘ + →',
    title: 'Kelime Kelime Kabul',
    description: 'Uzun bir önerinin tamamı yerine sadece sonraki kelimesini kabul eder.',
  },
  {
    id: 'sc-inline',
    category: 'shortcuts',
    command: 'Ctrl + I / ⌘ + I',
    title: 'Satır İçi Komut (Inline Command)',
    description: 'Seçili bloğu refactor etme veya imleç konumunda yeni kod/dokümantasyon üretme.',
  },
  {
    id: 'sc-at',
    category: 'shortcuts',
    command: '@',
    title: 'Bağlam Mention Menüsü',
    description: 'Dosya, klasör, eski sohbet, terminal oturumu, kural veya MCP aracını doğrudan mesaja bağlar.',
  },

  // Customizations
  {
    id: 'cu-rules',
    category: 'customizations',
    command: 'GEMINI.md / AGENTS.md',
    title: 'Proje & Dizin Kuralları (Rules)',
    description: 'Kod stili, dil tercihleri ve kısıtları hiyerarşik olarak dosya konumundan repo köküne kadar yükler.',
    example: '.agents/rules/typescript-style.md',
  },
  {
    id: 'cu-skills',
    category: 'customizations',
    command: '.agents/skills/<ad>/SKILL.md',
    title: 'İsteğe Bağlı Beceriler (Skills)',
    description: 'Progressive Disclosure ile yalnızca gerektiğinde yüklenen çok adımlı prosedürler ve runbook’lar.',
  },
  {
    id: 'cu-hooks',
    category: 'customizations',
    command: '.agents/hooks.json',
    title: 'Yaşam Döngüsü Kancaları (Hooks)',
    description: 'Araç çalışmadan önce/sonra gibi yaşam döngüsü noktalarında otomatik script tetikler.',
  },
  {
    id: 'cu-mcp',
    category: 'customizations',
    command: 'mcp_config.json',
    title: 'MCP Sunucuları',
    description: 'Harici API, veritabanı ve SaaS araçlarını standart Model Context Protocol ile ajana bağlar.',
  },
  {
    id: 'cu-global',
    category: 'customizations',
    command: '~/.gemini/config/',
    title: 'Global Kişisel Özelleştirmeler',
    description: 'Makinedeki tüm projelerde geçerli olan kişisel skill, kural ve MCP ayarların.',
  },

  // Security
  {
    id: 'se-sandbox',
    category: 'security',
    command: 'proceed-in-sandbox',
    title: 'Önerilen İzin Politikası',
    description: 'İzole sandbox içi güvenli komutları otomatik çalıştırır; ağ veya workspace dışı işlemlerde onay ister.',
  },
  {
    id: 'se-review',
    category: 'security',
    command: 'request-review / strict',
    title: 'Sıkı Onay Politikaları',
    description: 'Üretim veya hassas projelerde komut çalışmadan önce kullanıcı onayı zorunlu kılar.',
  },
  {
    id: 'se-override',
    category: 'security',
    command: 'Project-Level Settings',
    title: 'Proje Bazlı Öncelik',
    description: 'Aktif proje ayarları aynı alandaki global güvenlik ayarlarını her zaman ezer.',
  },

  // CLI & SDK
  {
    id: 'cl-agy',
    category: 'cli',
    command: 'agy',
    title: 'Antigravity CLI Başlat',
    description: 'Terminal içi etkileşimli (TUI) ajan oturumu başlatır. Çıkış: `/exit` veya `Ctrl+D` (x2).',
  },
  {
    id: 'cl-cfg',
    category: 'cli',
    command: '~/.gemini/antigravity-cli/settings.json',
    title: 'CLI Yapılandırma Dosyası',
    description: 'Antigravity CLI ayarlarının, varsayılanların ve tercihlerin saklandığı dosya.',
  },
  {
    id: 'cl-sdk',
    category: 'cli',
    command: 'pip install google-antigravity',
    title: 'Python SDK Kurulumu',
    description: 'Programatik ajan yönetimi için derlenmiş runtime binary içeren resmi PyPI paketi.',
  },

  // Google AI Studio
  {
    id: 'ais-temp',
    category: 'aistudio',
    command: 'Temperature: 0.0 – 0.3 / 0.8 – 1.2',
    title: 'Yaratıcılık vs. Tutarlılık Dengesi',
    description: 'Kodlama ve JSON veri çıkarmada düşük (0.0–0.3); beyin fırtınası ve içerik üretiminde yüksek (0.8–1.2) kullanılır.',
  },
  {
    id: 'ais-struct',
    category: 'aistudio',
    command: 'Structured Output (JSON Schema)',
    title: 'Garantili JSON Çıktısı',
    description: 'Modelin sohbet metni eklemeden %100 tanımladığın şemaya uygun saf JSON döndürmesini zorunlu kılar.',
  },
  {
    id: 'ais-grounding',
    category: 'aistudio',
    command: 'Grounding with Google Search',
    title: 'Canlı Google Arama Doğrulaması',
    description: 'Güncel bilgi gerektiren sorularda canlı arama yapıp tıklanabilir web kaynakları sunar.',
  },
  {
    id: 'ais-genai',
    category: 'aistudio',
    command: 'npm install @google/genai',
    title: 'Resmi Gemini JavaScript/TypeScript SDK',
    description: 'AI Studio’daki "Get Code" çıktısını kendi Node.js / Vercel Serverless projende çalıştıran güncel SDK.',
  },
  {
    id: 'ais-apikey',
    category: 'aistudio',
    command: 'GEMINI_API_KEY (.env.local)',
    title: 'Güvenli API Anahtarı Saklama',
    description: 'Anahtarı asla frontend koduna yazma; .env.local (.gitignore içinde) veya Vercel Environment Variables’ta sakla.',
  },

  // GitHub & Vercel
  {
    id: 'gv-init',
    category: 'github-vercel',
    command: 'git init && git add . && git commit -m "İlk sürüm"',
    title: 'Yerel Git Deposunu Başlat & Kaydet',
    description: 'Klasörü Git deposuna çevirir, dosyaları Staging Area’ya alır ve ilk sürüm kaydını mühürler.',
  },
  {
    id: 'gv-branch',
    category: 'github-vercel',
    command: 'git checkout -b ozellik/yeni',
    title: 'Yeni Çalışma Dalı (Branch) Aç',
    description: 'Ana `main` kodunu bozmadan güvenle yeni özellik geliştirmek için ayrı dal oluşturur.',
  },
  {
    id: 'gv-ghcreate',
    category: 'github-vercel',
    command: 'gh repo create <ad> --public --source=. --push',
    title: 'GitHub CLI ile Tek Komutta Depo Aç & Yükle',
    description: 'GitHub’da yeni depo oluşturur, yerel projeyi bağlar ve kodu anında gönderir.',
  },
  {
    id: 'gv-vercel',
    category: 'github-vercel',
    command: 'npx vercel --prod',
    title: 'Vercel CLI ile Canlıya Yayınla',
    description: 'Terminalden doğrudan Production (canlı) ortama ücretsiz yayınlama başlatır.',
  },
  {
    id: 'gv-rewrites',
    category: 'github-vercel',
    command: 'vercel.json → rewrites: /(.*) → /index.html',
    title: 'SPA Alt Sayfa 404 Önleyici',
    description: 'React/Vite uygulamalarında alt sayfalarda yenileme yapınca 404 hatasını önler.',
  },

  // Claude & ChatGPT
  {
    id: 'cc-claudemd',
    category: 'claude-chatgpt',
    command: 'CLAUDE.md ↔ GEMINI.md',
    title: 'Ortak Proje Kuralları Paralelliği',
    description: 'Antigravity’deki GEMINI.md dosyasının Claude Code karşılığı; evrensel kurallar AGENTS.md ile de paylaşılabilir.',
  },
  {
    id: 'cc-projects',
    category: 'claude-chatgpt',
    command: 'Claude Projects + Artifacts',
    title: 'Kalıcı Bilgi Tabanı & Canlı Önizleme',
    description: 'Belgeleri tek projede toplayıp tüm sohbetlerde bağlam olarak kullanma ve yan pencerede canlı React/Mermaid üretimi.',
  },
  {
    id: 'cc-canvas',
    category: 'claude-chatgpt',
    command: 'ChatGPT Canvas & Custom GPTs',
    title: 'Yan Yana Düzenleme & Paket Asistanlar',
    description: 'Seçili paragraf/kod üzerinde hedefli revizyon (Canvas) ve ekiple paylaşılabilir uzman asistanlar (Custom GPTs).',
  },
  {
    id: 'cc-deep',
    category: 'claude-chatgpt',
    command: 'ChatGPT Deep Research',
    title: 'Otonom Kaynakçalı Pazar & Teknoloji Raporu',
    description: 'Onlarca web kaynağını arka planda tarayıp karşılaştırmalı, kaynaklı derin araştırma raporu üretir.',
  },
];
