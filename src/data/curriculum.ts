import { CurriculumModule, TrackInfo } from '../types/learning';
import { AI_STUDIO_CURRICULUM } from './aiStudioCurriculum';
import { GITHUB_VERCEL_CURRICULUM } from './githubVercelCurriculum';
import { CLAUDE_CHATGPT_CURRICULUM } from './claudeChatGptCurriculum';

export const TRACKS: TrackInfo[] = [
  {
    id: 'antigravity',
    title: 'Google Antigravity',
    shortTitle: 'Antigravity',
    tagline: 'App 2.0, IDE, agy CLI, Özelleştirme, Swarm & Python SDK',
    badgeColor: 'indigo',
  },
  {
    id: 'aistudio',
    title: 'Google AI Studio',
    shortTitle: 'AI Studio',
    tagline: 'Modeller, Structured Output, Grounding, Build & API Key',
    badgeColor: 'cyan',
  },
  {
    id: 'claude-chatgpt',
    title: 'Claude & ChatGPT',
    shortTitle: 'Claude & ChatGPT',
    tagline: 'Artifacts, Claude Code, Canvas, Custom GPTs & 4’lü AI Matrisi',
    badgeColor: 'amber',
  },
  {
    id: 'github-vercel',
    title: 'GitHub & Vercel',
    shortTitle: 'GitHub & Vercel',
    tagline: 'Git, Pull Request, Ücretsiz CI/CD, .env & Özel Alan Adı',
    badgeColor: 'emerald',
  },
];

const ANTIGRAVITY_RAW: Array<Omit<CurriculumModule, 'track'>> = [
  {
    id: 'ecosystem',
    number: 1,
    title: 'Antigravity Ekosistemi & Yüzeyler',
    shortTitle: 'Ekosistem & Yüzeyler',
    subtitle: 'Antigravity 2.0 Masaüstü, Antigravity IDE ve agy CLI arasındaki farklar ve doğru araç seçimi',
    durationMinutes: 8,
    xpReward: 265,
    iconName: 'Layers',
    accentColor: 'indigo',
    summary:
      'Google Antigravity tek bir sohbet kutusundan ibaret değildir; birbirini tamamlayan 3 ana yüzeyde (Masaüstü Uygulaması, IDE ve Terminal CLI) çalışır. Her yüzeyin güçlü olduğu anı bilmek hızını katlar.',
    concepts: [
      {
        title: 'Antigravity 2.0 (Masaüstü Uygulaması)',
        badge: 'Orkestrasyon Merkezi',
        description:
          'IDE’den bağımsız olarak paralel ajan oturumlarını yönetebileceğin Electron tabanlı masaüstü uygulamasıdır.',
        bullets: [
          'Sol Menü: Yeni Sohbet, Projeler, Zamanlanmış Görevler (Cron), Skills & Customizations ve Ayarlar.',
          'Chat Canvas: Slash komutları (/), @ Mentions ve sürükle-bırak medya/görsel ekleme.',
          'Yardımcı Panel (Auxiliary Pane): Subagent’lar, arka plan görevleri, Artifact belgeleri, değişen dosyalar ve terminalleri canlı izlersin.',
        ],
        tip: 'Birden fazla projede veya uzun süren arka plan görevlerinde IDE yerine Antigravity 2.0 üzerinden ajanları paralel yönetmek çok daha rahattır.',
      },
      {
        title: 'Antigravity IDE (Kodlama & Anlık Düzenleme)',
        badge: '3 AI Modalitesi',
        description:
          'VS Code tabanlı AI-first geliştirme ortamıdır. Kod yazarken 3 farklı etkileşim seviyesi sunar:',
        bullets: [
          'Pasif — Antigravity Tab: Autocomplete, büyük diff öneren Supercomplete, sonraki noktaya atlayan Tab-to-Jump ve otomatik import ekleyen Tab-to-Import.',
          'Yönlendirici — Inline Command (Ctrl+I / ⌘+I): Seçili kod bloğunu hızla refactor etme, açıklama veya imleç konumunda yeni kod üretme.',
          'İşbirlikçi — Sidebar Chat & Agent Mode: Çok adımlı görevler, dosya yazma, terminal komutu çalıştırma, Görsel Diff Katmanları ve Inline Code Lenses.',
        ],
        codeSnippet: {
          label: 'IDE Temel Kısayolları',
          code: `Tab            → Öneriyi / Supercomplete diff'ini kabul et
Esc            → Öneriyi reddet
Ctrl + →       → Öneriyi kelime kelime kabul et (macOS: ⌘ + →)
Ctrl + I       → Satır içi komut (Inline Command - macOS: ⌘ + I)`,
        },
      },
      {
        title: 'Antigravity CLI (agy)',
        badge: 'Terminal Hızı',
        description:
          'SSH bağlantılarında, hızlı terminal görevlerinde veya hafif çalışma ortamlarında klavyeden elini kaldırmadan ajan çalıştırmanı sağlar.',
        bullets: [
          'Terminalde `agy` komutuyla anında TUI arayüzü açılır.',
          'TUI içinde `/help` ile tüm slash komutlarını, dışarıda `agy --help` ile CLI bayraklarını görebilirsin.',
          'Yapılandırma dosyası: `~/.gemini/antigravity-cli/settings.json`.',
        ],
        codeSnippet: {
          label: 'CLI Hızlı Başlangıç',
          code: `agy                  # Etkileşimli CLI oturumunu başlat
agy --help           # Tüm CLI bayraklarını listele
# Oturum içinde:
/help                # Mevcut slash komutlarını gör
/exit veya Ctrl+D x2 # Oturumdan çık`,
        },
      },
    ],
    comparison: {
      title: 'Hangi Yüzeyi Ne Zaman Kullanmalısın?',
      headers: ['Senaryo', 'Antigravity 2.0 App', 'Antigravity IDE', 'agy CLI'],
      rows: [
        {
          feature: 'Hızlı kod satırı tamamlama & refactor',
          col1: 'Dolaylı',
          col2: 'En İyi (Tab & Ctrl+I)',
          col3: 'Uygun değil',
        },
        {
          feature: 'Paralel proje / subagent orkestrasyonu',
          col1: 'En İyi (Auxiliary Pane)',
          col2: 'İyi (Tek workspace)',
          col3: 'Temel seviye',
        },
        {
          feature: 'Uzak sunucu / sadece terminal ortamı',
          col1: 'Kullanılamaz',
          col2: 'Remote gerekir',
          col3: 'En İyi (Doğrudan agy)',
        },
        {
          feature: 'Zamanlanmış görev (Cron) takibi',
          col1: 'En İyi (Özel sekme)',
          col2: 'Sohbet üzerinden',
          col3: 'CLI üzerinden',
        },
      ],
    },
    quiz: [
      {
        id: 'eco-q1',
        question: 'Antigravity IDE içinde seçili bir fonksiyonu yalnızca o blokla sınırlı kalarak hızla refactor etmek için hangi modaliteyi kullanırsın?',
        options: [
          'Inline Command (Ctrl+I / ⌘+I)',
          'agy --help komutu',
          'Tab-to-Import kısayolu',
          'Scheduled Tasks paneli',
        ],
        correctIndex: 0,
        explanation:
          'Inline Command (Ctrl+I / ⌘+I) seçili kod bloğu üzerinde hedefli, hızlı düzenlemeler ve dokümantasyon eklemek için tasarlanmıştır.',
      },
      {
        id: 'eco-q2',
        question: 'Antigravity Tab özelliğinde "Supercomplete" standart Autocomplete’ten nasıl ayrılır?',
        options: [
          'Sadece yorum satırları üretir',
          'Silmeler dahil daha büyük çok satırlı diff önerilerini yüzen pencerede sunar',
          'Yalnızca terminal komutlarını tamamlar',
          'Git commit mesajlarını otomatik push eder',
        ],
        correctIndex: 1,
        explanation:
          'Supercomplete yalnızca imleç ucuna metin eklemekle kalmaz; silme ve düzenlemeleri içeren kapsamlı diff önerileri sunar.',
      },
      {
        id: 'eco-q3',
        question: 'Antigravity CLI (agy) ayar dosyası varsayılan olarak hangi konumda tutulur?',
        options: [
          '~/.gemini/antigravity-cli/settings.json',
          '/etc/antigravity/config.yaml',
          './package.json',
          '~/.vscode/agy.ini',
        ],
        correctIndex: 0,
        explanation:
          'Antigravity CLI ayarları `~/.gemini/antigravity-cli/settings.json` dosyasında saklanır.',
      },
    ],
    realMission: {
      title: 'Kendi Antigravity Arayüzünü Keşfet',
      goal: 'Kullandığın Antigravity uygulamasında mevcut çalışma alanını, sol menüyü ve ayarları inceleyerek ilk keşif turunu tamamla.',
      copyablePrompt:
        'Bu çalışma alanındaki klasör yapısını özetle ve hangi dosyaları incelemem gerektiğini 3 maddede öner.',
      steps: [
        'Sol menüden "Skills & Customizations" bölümünü aç ve halihazırda yüklü olan skill/kural listesine göz at.',
        'Yukarıdaki promptu kopyalayıp kendi Antigravity sohbetine gönder.',
        'Ajanın yanıtındaki dosya bağlantılarına tıklayarak doğrudan dosyaya geçiş yapmayı dene.',
      ],
      expectedOutcome:
        'Ajan çalışma alanını tarayıp tıklanabilir dosya bağlantılarıyla net bir özet sunar.',
    },
  },
  {
    id: 'context',
    number: 2,
    title: 'Etkili İletişim & Bağlam (@ Mentions)',
    shortTitle: 'Bağlam & @ Mentions',
    subtitle: 'Ajanın doğru dosyaya, terminale ve geçmiş sohbete odaklanmasını sağlama sanatı',
    durationMinutes: 10,
    xpReward: 265,
    iconName: 'AtSign',
    accentColor: 'cyan',
    summary:
      'İyi bir Antigravity kullanıcısını ortalama kullanıcıdan ayıran en büyük fark bağlam (context) yönetimidir. `@` mention sistemi ve `/compact` komutu sayesinde ajana tam olarak neye bakması gerektiğini gürültüsüz biçimde gösterebilirsin.',
    concepts: [
      {
        title: '@ Mention Kategorileri',
        badge: 'Hedefli Bağlam',
        description:
          'Sohbet kutusunda `@` yazdığında bağlam menüsü açılır. Ajanın tüm projeyi tahmin etmesi yerine nokta atışı kaynak ekleyebilirsin:',
        bullets: [
          'Dosyalar & Klasörler (@src/App.tsx, @components/): Doğrudan ilgili kodları bağlama ekler.',
          'Geçmiş Sohbetler: Önceki bir konuşmada alınan kararları yeni sohbete taşır.',
          'Terminal Oturumları: Çalışan bir terminaldeki hata çıktılarını kopyala-yapıştır yapmadan ajana okutur.',
          'Kurallar (Rules) & MCP Sunucuları/Araçları: Belirli bir kuralı veya harici aracı o mesajda aktif eder.',
        ],
      },
      {
        title: 'Medya & Görsel Yükleme',
        badge: 'Çok Modlu (Multimodal)',
        description:
          'Ekran görüntülerini, UI tasarımlarını, hata mesajı görsellerini veya mimari diyagramları doğrudan sohbet kutusuna sürükleyip bırakabilir ya da yapıştırabilirsin.',
        bullets: [
          'Tasarım ekran görüntüsü verip "Bunu React + Tailwind ile birebir kodla" diyebilirsin.',
          'Bozuk görünen bir arayüzün ekran görüntüsünü yapıştırıp CSS hatasını anında tespit ettirebilirsin.',
        ],
        tip: 'Uzun uzun "sağ üstteki buton biraz sola kaymış" diye anlatmak yerine ekran görüntüsü yapıştırmak %100 daha net sonuç verir.',
      },
      {
        title: 'Bağlam Penceresi & /compact',
        badge: 'Performans Sırrı',
        description:
          'Sohbet uzadıkça bağlam penceresi (context window) dolar, yanıtlar yavaşlayabilir ve eski detaylar dikkat dağıtabilir.',
        bullets: [
          'Sohbet çok uzadığında `/compact` komutunu kullanarak konuşmayı akıllıca özetleyip bağlamı ferahlatabilirsin.',
          'Tamamen farklı bir göreve geçerken aynı sohbette kalmak yerine "New Conversation" ile temiz sayfa aç.',
        ],
        codeSnippet: {
          label: 'Kötü vs İyi Prompt Karşılaştırması',
          code: `❌ Kötü: "Giriş sayfasında hata var düzelt"

✅ İyi:  "@src/pages/Login.tsx ve @terminal:dev-server çıktısına bak.
          Kullanıcı boş şifreyle gönderince 500 hatası dönüyor.
          @GEMINI.md kurallarına uyarak istemci tarafı doğrulama ekle."`,
        },
      },
    ],
    quiz: [
      {
        id: 'ctx-q1',
        question: 'Çalışan dev sunucusundaki uzun bir hata logunu ajana aktarmanın en temiz yolu nedir?',
        options: [
          'Sohbette `@` yazıp ilgili Terminal oturumunu mention etmek',
          'Hata mesajını ezberleyip özetlemek',
          'Projeyi yeniden oluşturmak',
          'Bilgisayarı yeniden başlatmak',
        ],
        correctIndex: 0,
        explanation:
          '`@` mention menüsü terminal oturumlarını doğrudan bağlama eklemeni sağlar; kopyala-yapıştır hatalarını önler.',
      },
      {
        id: 'ctx-q2',
        question: 'Çok uzun süren bir konuşmada bağlam penceresi dolmaya başladığında hangi slash komutu kullanılır?',
        options: ['/clear-all', '/compact', '/shrink-memory', '/flush'],
        correctIndex: 1,
        explanation:
          '`/compact` mevcut konuşmanın özetini çıkararak önemli kararları korur ve bağlam penceresini rahatlatır.',
      },
      {
        id: 'ctx-q3',
        question: 'Tamamen farklı bir yeni özellik üzerinde çalışmaya başlarken en doğru pratik hangisidir?',
        options: [
          'Eski uzun sohbete devam etmek',
          'Yeni bir sohbet (New Conversation) başlatıp yalnızca ilgili dosyaları `@` ile eklemek',
          'Tüm projedeki her dosyayı tek tek `@` ile eklemek',
          'Sadece tek kelimelik prompt yazmak',
        ],
        correctIndex: 1,
        explanation:
          'Yeni bir görev için temiz bir sohbet açıp yalnızca ilgili dosyaları bağlamak hem doğruluğu hem hızı artırır.',
      },
    ],
    realMission: {
      title: '@ Mention ile Nokta Atışı Bağlam Ver',
      goal: 'Gerçek Antigravity sohbetinde `@` menüsünü açarak en az 1 dosyayı bağlama ekleyip analiz iste.',
      copyablePrompt:
        'Eklediğim dosyanın sorumluluğunu 2 cümlede özetle ve potansiyel 1 iyileştirme öner.',
      steps: [
        'Antigravity sohbet kutusuna `@` yaz ve açılan listeden projenin bir dosyasını seç (örneğin `package.json`).',
        'Aynı mesajın devamına yukarıdaki promptu ekleyip gönder.',
        'Sohbet uzadığında `/` yazıp `/compact` komutunun menüde nasıl göründüğünü kontrol et.',
      ],
      expectedOutcome:
        'Ajan arama yapmaya vakit kaybetmeden doğrudan etiketlediğin dosyayı okuyup net bir iyileştirme sunar.',
    },
  },
  {
    id: 'commands',
    number: 3,
    title: 'Slash Komutları & Planlı Çalışma',
    shortTitle: 'Slash Komutları & Plan',
    subtitle: '/plan, /grill-me, /boost, /goal, /learn ve Artifact geri bildirim döngüsü',
    durationMinutes: 10,
    xpReward: 265,
    iconName: 'Terminal',
    accentColor: 'violet',
    summary:
      'Slash komutları (`/`), ajana özel çalışma modları ve gelişmiş iş akışları kazandırır. Karmaşık bir işe doğrudan kod yazdırarak girmek yerine `/plan` veya `/grill-me` ile hizalanmak hem zamanı hem kaliteyi dramatik biçimde iyileştirir.',
    concepts: [
      {
        title: 'Stratejik Planlama Komutları',
        badge: 'Önce Düşün, Sonra Kodla',
        description:
          'Büyük veya belirsiz görevlerde ajanı hemen kod değiştirmeye göndermek yerine planlama komutlarını kullan:',
        bullets: [
          '/plan: Uygulama öncesi adım adım teknik plan (Artifact) oluşturur. Onay vermeden kod yazmaz.',
          '/grill-me: Tasarım kararlarını netleştirmek için ajanın sana etkileşimli sorular sormasını sağlar.',
          '/boost: Derin düşünme, stratejik planlama, çoklu bakış açısı ve sıkı doğrulama gerektiren karmaşık projeler için.',
        ],
      },
      {
        title: 'Yürütme & Süreklilik Komutları',
        badge: 'Otonomi & Öğrenme',
        description:
          'Uzun soluklu veya tekrarlayan işler için ajanın çalışma disiplinini değiştiren komutlar:',
        bullets: [
          '/goal: Uzun sürecek bir hedefi (ör. kapsamlı refactor/test) tam bitene kadar ekstra titizlikle sürdürür.',
          '/learn: Ajanı düzelttiğinde veya zor bir kurulumu çözdüğünde bu bilgiyi kalıcı davranışa (kural/skill) dönüştürür.',
          '/browser: Web tarayıcıda gezinme, test etme veya web uygulamalarıyla etkileşim gerektiren görevler.',
          '/teamwork & /schedule: Çoklu ajan takımı kurma ve zamanlanmış görev oluşturma.',
        ],
      },
      {
        title: 'Artifacts (Yapılandırılmış Belgeler) & Onay Döngüsü',
        badge: 'Şeffaf İşbirliği',
        description:
          'Antigravity planlarını, mimari diyagramlarını ve raporlarını özel Markdown Artifact dosyaları olarak yan panelde sunar.',
        bullets: [
          'Plan Artifact’i üzerinde doğrudan yorum bırakıp revizyon isteyebilirsin.',
          'Plan içine gömülü Mermaid diyagramları ve tıklanabilir dosya satır linkleri bulunur.',
          'Her şey içine sindiğinde "Proceed" (Devam Et) butonuyla uygulamayı başlatırsın.',
        ],
        tip: 'Büyük bir özellikte "/grill-me" ile 2 dakika soru-cevap yapmak, sonradan 20 dakika yanlış kodu düzeltmekten kurtarır.',
      },
    ],
    quiz: [
      {
        id: 'cmd-q1',
        question: 'Aklında belirsiz tasarım kararları olan yeni bir uygulama fikri var; kod yazmadan önce ajanın sana sorular sorarak kararları netleştirmesini istiyorsun. Hangi komut en uygundur?',
        options: ['/compact', '/grill-me', '/browser', '/schedule'],
        correctIndex: 1,
        explanation:
          '`/grill-me` etkileşimli bir mülakat süreci başlatarak belirsiz tasarım ve gereksinim kararlarını netleştirir.',
      },
      {
        id: 'cmd-q2',
        question: 'Ajanın projendeki özel bir test komutunu bir daha asla unutmaması için ona öğrettiğin çözümü kalıcı hale getirmek istiyorsun. Hangi komutu önerirsin?',
        options: ['/learn', '/goal', '/compact', '/plan'],
        correctIndex: 0,
        explanation:
          '`/learn` düzeltmelerini ve zor çözümleri gelecekteki görevler için kalıcı davranışa dönüştürmeye yardımcı olur.',
      },
      {
        id: 'cmd-q3',
        question: 'Gece boyu veya uzun soluklu çalışacak, hedefine tam ulaşmadan durmamasını istediğin kapsamlı bir görevde hangi komut kullanılır?',
        options: ['/browser', '/goal', '/compact', '/grill-me'],
        correctIndex: 1,
        explanation:
          '`/goal` ajanın hedef tam olarak başarılana kadar ekstra titiz ve kararlı biçimde çalışmasını sağlar.',
      },
    ],
    realMission: {
      title: '/plan ile Uygulama Planı Üret ve Revize Et',
      goal: 'Gerçek Antigravity’de kod yazmadan önce bir Plan Artifact’i oluşturup geri bildirim vermeyi deneyimle.',
      copyablePrompt:
        '/plan Bu projeye karanlık/aydınlık tema değiştirici eklemek istiyorum. Önce bana kısa bir uygulama planı çıkar, henüz kod yazma.',
      steps: [
        'Yeni bir sohbet aç ve `/` yazarak açılan Slash Komut menüsündeki tüm komutların açıklamalarını incele.',
        'Yukarıdaki `/plan` komutlu promptu gönder (veya kendi projene uygun küçük bir özellik yaz).',
        'Oluşan Plan Artifact’ini oku, en az 1 küçük değişiklik iste ve revizyonu gör.',
      ],
      expectedOutcome:
        'Ajan doğrudan dosya değiştirmek yerine inceleyip onaylayabileceğin yapılandırılmış bir Plan Artifact’i sunar.',
    },
  },
  {
    id: 'security',
    number: 4,
    title: 'Güvenlik, İzinler & Terminal Sandbox',
    shortTitle: 'Güvenlik & Sandbox',
    subtitle: 'Ajanın güvenle otonom çalışması için Sandbox, İzin Politikaları ve Proje Override ayarları',
    durationMinutes: 9,
    xpReward: 265,
    iconName: 'ShieldCheck',
    accentColor: 'emerald',
    summary:
      'Ajan terminal komutu çalıştırabilir, dosya düzenleyebilir ve internete erişebilir. Antigravity’nin çok katmanlı güvenlik mimarisi sayesinde hızdan ödün vermeden tam kontrol sende kalır.',
    concepts: [
      {
        title: 'Terminal Sandbox Nasıl Çalışır?',
        badge: 'Güvenli İzolasyon',
        description:
          'Komutlar varsayılan olarak güvenli bir izole alanda (Standard Sandbox Mode) çalıştırılır:',
        bullets: [
          'Sandbox içinde: Çalışma alanı (workspace) okuma/yazma, standart sistem araçları ve geçici dizinler erişilebilir — ama İNTERNET ve çalışma alanı dışı dosyalar kapalıdır.',
          'Sandbox Dışı (BypassSandbox): Ağ erişimi, port açma veya harici sistem işlemleri gerektiğinde ajan senden açık onay (manual approval) ister.',
          'Güvenli kural: Önce her zaman sandbox içinde denenir; yalnızca gerçekten gereken tek komut sandbox dışında çalıştırılır.',
        ],
      },
      {
        title: '4 Araç Çalıştırma Politikası (Tool Execution Policy)',
        badge: 'Onay Seviyeleri',
        description: 'Ayarlardan terminal komutlarının nasıl onaylanacağını seçebilirsin:',
        bullets: [
          'proceed-in-sandbox (Önerilen): Sandbox içindeki güvenli komutlar otomatik çalışır, sandbox dışı işlemler onay ister.',
          'request-review: Komutlar çalışmadan önce senden inceleme/onay ister.',
          'strict: En sıkı denetim; tüm kritik işlemlerde açık izin zorunludur.',
          'always-proceed: Yüksek güvenilen izole ortamlarda kesintisiz otomasyon için.',
        ],
      },
      {
        title: 'Global vs. Proje Bazlı Ayarlar & Listeler',
        badge: 'İnce Ayar',
        description:
          'Her projenin güvenlik ihtiyacı farklıdır. Proje ayarları (Project-Level Settings) aktif olduğunda global ayarları ezer:',
        bullets: [
          'Command Allowlist / Denylist: Her zaman izin verilen (örn. `npm test`, `git status`) veya kesinlikle yasaklanan komutları tanımla.',
          'Non-Workspace File Access (`allow`, `ask`, `deny`): Çalışma klasörü dışındaki dosyalara erişim kontrolü.',
          'Browser Allowlist & Internet Access Policy: Ajanın tarayıcısının hangi alan adlarına gidebileceğini sınırla.',
        ],
        tip: 'Üretim (production) veritabanına bağlı bir projede proje bazlı `strict` mod açıp, deneme projende `proceed-in-sandbox` kullanabilirsin.',
      },
    ],
    quiz: [
      {
        id: 'sec-q1',
        question: 'Standart Terminal Sandbox modunda (BypassSandbox: false) çalışan bir komut aşağıdakilerden hangisini YAPAMAZ?',
        options: [
          'Çalışma alanı (workspace) içindeki bir dosyayı okumak',
          'Birim testlerini yerel olarak çalıştırmak',
          'Harici bir internet API’sine doğrudan ağ isteği göndermek',
          'Çalışma alanında yeni bir dosya oluşturmak',
        ],
        correctIndex: 2,
        explanation:
          'Standart Sandbox modu çalışma alanı okuma/yazmasına izin verir ancak ağ (internet) erişimini ve çalışma alanı dışı dosya erişimini engeller.',
      },
      {
        id: 'sec-q2',
        question: 'Hem global ayarlarda hem de aktif proje ayarlarında farklı bir `Internet Access Policy` tanımlandıysa hangisi geçerli olur?',
        options: [
          'Her zaman Global ayar geçerlidir',
          'Aktif Proje ayarı Global ayarı ezer (önceliklidir)',
          'İkisi çakışır ve ajan çalışmaz',
          'Rastgele biri seçilir',
        ],
        correctIndex: 1,
        explanation:
          'Proje bazlı ayarlar (Project-Level Settings), o proje aktifken global ayarların üzerinde önceliğe sahiptir.',
      },
      {
        id: 'sec-q3',
        question: 'Bir komut zincirinde yalnızca tek bir adımın internet erişimine ihtiyacı varsa en güvenli yaklaşım nedir?',
        options: [
          'Tüm zinciri BypassSandbox ile çalıştırmak',
          'Sandbox’ı tamamen kapatmak',
          'Zinciri bölüp sadece ağ gerektiren tek adımı sandbox dışında, diğerlerini sandbox içinde çalıştırmak',
          'Always-proceed modunu global olarak açmak',
        ],
        correctIndex: 2,
        explanation:
          'En az yetki ilkesi gereği yalnızca gerçekten sandbox dışı yetki gerektiren tek komut yükseltilir; hazırlık, derleme ve testler sandbox içinde kalır.',
      },
    ],
    realMission: {
      title: 'Kendi Güvenlik & İzin Politikalarını İncele',
      goal: 'Antigravity Ayarlar menüsünde Global ve Proje izinlerini kontrol ederek kendi güvenli çalışma profilini oluştur.',
      copyablePrompt:
        'Bu projede güvenle otomatik izin verebileceğim (Allowlist) 3 zararsız geliştirme komutu öner.',
      steps: [
        'Sol menüden Settings (Ayarlar) bölümüne gir ve "Tool Execution Policy" ile "Terminal Sandbox" durumunu kontrol et.',
        'Global Settings ile Project-Level Settings arasındaki farkı gözlemle.',
        'Command Allowlist / Denylist alanına göz at (isteğe bağlı olarak sık kullandığın güvenli test komutunu ekle).',
      ],
      expectedOutcome:
        'Hangi işlemlerin otomatik, hangilerinin onayına tabi olduğunu tam olarak bilir hale gelirsin.',
    },
  },
  {
    id: 'customizations',
    number: 5,
    title: 'Özelleştirme Sistemi (Kendi Ajanını Eğit)',
    shortTitle: 'Özelleştirme (Rules/Skills)',
    subtitle: 'GEMINI.md, SKILL.md, Progressive Disclosure, Hooks, MCP Sunucuları ve Pluginler',
    durationMinutes: 14,
    xpReward: 265,
    iconName: 'Sliders',
    accentColor: 'amber',
    summary:
      'Antigravity’yi genel bir asistandan ekibinin kurallarını ve iş akışlarını ezbere bilen uzman bir ekip arkadaşına dönüştüren katman burasıdır.',
    concepts: [
      {
        title: '5 Özelleştirme Türü: Hangisi Ne İçin?',
        badge: 'Mimari Harita',
        description: 'İhtiyacına göre doğru özelleştirme dosyasını seçmek bağlamı temiz tutar:',
        bullets: [
          'Rules (`GEMINI.md`, `AGENTS.md`, `.agents/rules/*.md`): Kod stili, dil tercihi, yasaklı API’ler ve yerel proje kuralları.',
          'Skills (`skills/<ad>/SKILL.md`): Çok adımlı prosedürler, runbook’lar ve uzman iş akışları (sadece gerektiğinde yüklenir!).',
          'Hooks (`hooks.json`): Ajan yaşam döngüsü olaylarında (örn. araç çalışmadan önce) otomatik script tetikleme.',
          'MCP Servers (`mcp_config.json`): Harici servislere (veritabanı, Figma, Jira, Slack vb.) yeni araçlar bağlama.',
          'Plugins (`plugins/<ad>/plugin.json`): İlgili skill, rule ve MCP’leri tek bir paylaşılabilir pakette birleştirme.',
        ],
      },
      {
        title: 'Progressive Disclosure (Kademeli Yükleme)',
        badge: 'Akıllı Bağlam Tasarrufu',
        description:
          'Antigravity modelin bağlam penceresini şişirmemek için özelleştirmeleri akıllıca yükler:',
        bullets: [
          'Skill’lerin yalnızca `name` ve `description` bilgisi başta görünür; tüm `SKILL.md` gövdesi ancak model veya sen o beceriyi kullanmaya karar verdiğinde okunur.',
          'Kurallar (Rules) dosya dizininden depo köküne doğru hiyerarşik olarak taranır ve yinelenen yollar otomatik tekilleştirilir (deduplication).',
        ],
      },
      {
        title: 'Keşif Konumları ve Öncelik Sırası (Precedence)',
        badge: 'Çakışma Çözümü',
        description:
          'Aynı isimde iki özelleştirme varsa yüksek öncelikli olan kazanır:',
        codeSnippet: {
          label: 'Öncelik Sırası (En Yüksek → En Düşük)',
          code: `1. Workspace Project  → <proje>/.agents/ (ve CWD'den repo köküne GEMINI.md)
2. Declared Configs   → Workspace içindeki skills.json / plugins.json
3. Global Discovery   → ~/.gemini/config/ (tüm projelerinde geçerli)
4. Built-in           → Antigravity ile gelen yerleşik skill'ler
5. Global Declared    → Global JSON yapılandırmaları`,
        },
        tip: 'Ekipçe paylaşılacak kuralları `.agents/` ve `GEMINI.md` içine koyup Git’e gönder; sadece sana özel tercihleri `~/.gemini/config/` altında tut.',
      },
    ],
    quiz: [
      {
        id: 'cust-q1',
        question: 'Antigravity’nin "Progressive Disclosure" (Kademeli Yükleme) mekanizması Skill’ler için ne yapar?',
        options: [
          'Her sohbette tüm SKILL.md dosyalarının tamamını bağlama yapıştırır',
          'Başlangıçta yalnızca skill adını ve açıklamasını yükler; tam içeriği yalnızca ilgili görevde okur',
          'Skill dosyalarını şifreleyerek gizler',
          'Skill’leri haftada bir kez çalıştırır',
        ],
        correctIndex: 1,
        explanation:
          'Progressive Disclosure sayesinde yüzlerce skill yüklü olsa bile bağlam penceresi dolmaz; yalnızca gereken skill’in içeriği anlık yüklenir.',
      },
      {
        id: 'cust-q2',
        question: 'Hem proje kökündeki `.agents/skills/deploy/SKILL.md` hem de global `~/.gemini/config/skills/deploy/SKILL.md` varsa hangisi önceliklidir?',
        options: [
          'Global `~/.gemini/config/` olan kazanır',
          'Proje içindeki `.agents/` (Workspace Project) olan kazanır',
          'İkisi de devre dışı kalır',
          'Alfabetik sıraya göre seçilir',
        ],
        correctIndex: 1,
        explanation:
          'Workspace Project özelleştirmeleri her zaman Global Discovery’nin önünde 1. önceliğe sahiptir.',
      },
      {
        id: 'cust-q3',
        question: 'Ajanın harici bir servise (ör. şirket içi Jira veya PostgreSQL veritabanı) doğrudan araçlarla bağlanması için hangi özelleştirme türü kullanılır?',
        options: ['Rules (GEMINI.md)', 'Hooks (hooks.json)', 'MCP Servers (mcp_config.json)', 'Tab-to-Jump'],
        correctIndex: 2,
        explanation:
          'Model Context Protocol (MCP) sunucuları (`mcp_config.json`) ajana harici servisler için yeni araçlar kazandırır.',
      },
    ],
    realMission: {
      title: 'İlk GEMINI.md Kural Dosyanı Oluştur',
      goal: 'Config Atölyesi’nde hazırladığın kuralı gerçek projenin köküne ekleyip Antigravity’nin bunu otomatik tanıdığını gör.',
      copyablePrompt:
        'Bu çalışma alanının köküne Türkçe yanıt vermeni, kod yazarken TypeScript strict kurallarına uymanı ve her değişiklikten sonra build almanı söyleyen kısa bir GEMINI.md dosyası oluştur.',
      steps: [
        'Bu modüldeki "İnteraktif Uygulama" sekmesinde bir `GEMINI.md` ve `SKILL.md` taslağı yazıp doğrulamadan geçir.',
        'Yukarıdaki promptu kendi Antigravity’nde çalıştırarak gerçek bir `GEMINI.md` oluştur (veya atölyeden indirip projenin köküne koy).',
        'Yeni bir sohbet açıp "Bu projedeki kurallar neler?" diye sorarak kuralın otomatik yüklendiğini doğrula.',
      ],
      expectedOutcome:
        'Antigravity yeni sohbette `GEMINI.md` dosyasını otomatik keşfeder ve kurallarına göre davranır.',
    },
  },
  {
    id: 'multiagent',
    number: 6,
    title: 'Çoklu Ajan, Swarm & Otomasyon',
    shortTitle: 'Subagents, Swarm & Cron',
    subtitle: 'Görev devri (Subagents), paralel takım çalışması (Swarm), Workflow ve Zamanlanmış Görevler',
    durationMinutes: 11,
    xpReward: 265,
    iconName: 'Network',
    accentColor: 'pink',
    summary:
      'Tek bir ajanla sınırlı değilsin! Antigravity karmaşık işleri uzman alt ajanlara (Subagents) bölebilir, paralel çalışan bir ajan ekibi (Swarm) kurabilir veya belirli saatlerde kendi kendine çalışan otomasyonlar (Cron) başlatabilir.',
    concepts: [
      {
        title: 'Uzman Alt Ajanlar (Subagents)',
        badge: 'Görev Delegasyonu',
        description:
          'Ana sohbetinin bağlamını kirletmeden arka planda çalışan uzman yardımcılar:',
        bullets: [
          'research: Salt-okunur (read-only) kod tabanı keşfi ve kapsamlı araştırma için.',
          'browser: Gerçek web tarayıcısını açıp tıklama, form doldurma, görsel kontrol ve canlı UI testi yapmak için.',
          'image-generator: Tasarım taslakları, ikonlar ve görseller üretmek/düzenlemek için.',
          'Özel Subagent (define_subagent): Kendi sistem promptu ve araç yetkileriyle özel uzmanlar tanımlama.',
        ],
      },
      {
        title: 'Swarm (/teamwork) & Python Workflows',
        badge: 'Paralel Güç',
        description:
          'Büyük projelerde birden fazla ajanın aynı anda koordineli çalışması:',
        bullets: [
          'Swarm (`/teamwork`): Paylaşımlı mesaj panosu üzerinden haberleşen, her biri kendi izole çalışma kopyasına (`workspace: "share"` veya `"branch"`) sahip paralel ajanlar.',
          'Workflows (`run_workflow`): Çok sayıda dosya, modül veya inceleme açısı üzerine kodla paralel dağıtım (fan-out) ve sonuç birleştirme.',
        ],
        tip: 'Tek bir bağımsız görev için Subagent; 20 dosyada paralel analiz için Workflow; birbirleriyle tartışıp kontrol etmesi gereken roller için Swarm kullan.',
      },
      {
        title: 'Zamanlanmış Görevler & Otomasyon (/schedule)',
        badge: '7/24 Asistan',
        description:
          'Tek seferlik zamanlayıcılar veya düzenli tekrarlayan Cron görevleri tanımlayabilirsin:',
        bullets: [
          'Örnek Cron: `0 9 * * 1-5` → Hafta içi her sabah 09:00’da proje özetini veya bekleyen işleri hazırla.',
          'Tek seferlik timer: "30 dakika sonra build durumunu kontrol et".',
          'Antigravity 2.0 sol menüsündeki "Scheduled Tasks" ekranından tüm zamanlamaları izleyip yönetebilirsin.',
        ],
      },
    ],
    quiz: [
      {
        id: 'ma-q1',
        question: 'Canlı bir web uygulamasını tarayıcıda açıp butonlara tıklayarak görsel test yaptırmak için hangi yerleşik subagent görevlendirilir?',
        options: ['research', 'browser', 'image-generator', 'self'],
        correctIndex: 1,
        explanation:
          '`browser` subagent yerleşik webview tarayıcıyı kontrol ederek tıklama, form doldurma ve görsel inceleme yapar.',
      },
      {
        id: 'ma-q2',
        question: 'Swarm kullanırken iki farklı ajanın aynı anda dosya düzenlerken birbirinin işini ezmemesi için hangi workspace modu seçilir?',
        options: [
          'inherit (aynı dizin)',
          'share veya branch (izole çalışma kopyası)',
          'read-only',
          'disabled',
        ],
        correctIndex: 1,
        explanation:
          'Aynı anda düzenleme yapacak çalışanlar için `workspace: "share"` (git worktree benzeri) veya `"branch"` (izole klon) kullanılır; okuyucular `inherit` kullanır.',
      },
      {
        id: 'ma-q3',
        question: '`0 9 * * 1` cron ifadesi bir otomasyonu ne zaman tetikler?',
        options: [
          'Her gün gece 01:00’de',
          'Her Pazartesi sabah 09:00’da',
          'Her ayın 9’unda',
          'Her 9 dakikada bir',
        ],
        correctIndex: 1,
        explanation:
          '5 alanlı Cron formatında (dakika saat gün ay haftanın_günü): `0 9 * * 1` → Pazartesi günleri saat 09:00 demektir.',
      },
    ],
    realMission: {
      title: 'Browser veya Research Subagent ile İlk Delegasyon',
      goal: 'Ana sohbeti temiz tutarak bir araştırma veya zamanlama komutunu gerçek Antigravity’de dene.',
      copyablePrompt:
        'Bir research subagent görevlendirerek bu çalışma alanındaki tüm dosyaların bir envanterini ve kısa özetini çıkarmasını iste.',
      steps: [
        'Yukarıdaki promptu Antigravity’ye gönder ve Yardımcı Panel’de (Auxiliary Pane) Subagents sekmesini izle.',
        'Alt ajan tamamlandığında ana ajana raporun otomatik geldiğini gözlemle (hiç yoklama/polling gerekmeden!).',
        'Sol menüden "Scheduled Tasks" ekranını açıp otomasyonların nerede listelendiğini incele.',
      ],
      expectedOutcome:
        'Alt ajan arka planda çalışır, tamamlandığında ana sohbete özetini iletir.',
    },
  },
  {
    id: 'sdk',
    number: 7,
    title: 'İleri Seviye: Antigravity Python SDK',
    shortTitle: 'Python SDK (Bonus)',
    subtitle: 'google-antigravity SDK ile kendi Python script ve CI/CD akışlarından ajan yönetme',
    durationMinutes: 10,
    xpReward: 265,
    iconName: 'Code2',
    accentColor: 'sky',
    summary:
      'Antigravity’yi yalnızca etkileşimli sohbet olarak değil; Python betiklerinin, otomasyon hatlarının ve test paketlerinin içine gömülü programatik bir ajan olarak da çalıştırabilirsin.',
    concepts: [
      {
        title: 'Kurulum & Yaşam Döngüsü (Agent Context Manager)',
        badge: 'pip install google-antigravity',
        description:
          '`Agent` sınıfı derlenmiş çalışma zamanı ikili dosyasını, araç bağlantılarını ve güvenlik politikalarını tek bir `async with` bloğunda yönetir.',
        codeSnippet: {
          label: 'Kurulum ve Temel Kullanım',
          code: `pip install google-antigravity

import asyncio, sys
from google.antigravity import Agent, LocalAgentConfig, CapabilitiesConfig

async def main():
    config = LocalAgentConfig(
        system_instructions="Sen kod inceleme uzmanısın.",
        capabilities=CapabilitiesConfig(),  # Yazma/komut araçlarını açar
    )
    async with Agent(config) as agent:
        response = await agent.chat("Projedeki Python dosyalarını listele.")
        async for token in response:
            sys.stdout.write(token)

asyncio.run(main())`,
        },
      },
      {
        title: 'Varsayılan Güvenlik: Salt-Okunur (Read-Only)',
        badge: 'Güvenli Varsayılan',
        description:
          '`LocalAgentConfig` içinde `capabilities` geçilmezse ajan güvenlik için salt-okunur (read-only) modda çalışır.',
        bullets: [
          'Kod analizi, özetleme ve denetim script’leri için `capabilities` vermeden salt-okunur çalıştırabilirsin.',
          'Dosya düzenleme (`edit_file`) veya komut çalıştırma (`run_command`) gerektiğinde `capabilities=CapabilitiesConfig()` eklersin.',
        ],
      },
      {
        title: 'Düşünce (Thoughts) ve Araç Çağrısı (ToolCalls) Akışı',
        badge: 'Canlı Gözlemlenebilirlik',
        description:
          'Ajanın yalnızca son yanıtını değil; akıl yürütme adımlarını ve çalıştırdığı araçları gerçek zamanlı izleyebilirsin:',
        codeSnippet: {
          label: 'Streaming Thoughts & Tool Calls',
          code: `# Ajanın iç akıl yürütmesini canlı izle
async for thought in response.thoughts:
    print(f"[Thinking] {thought}")

# Güçlü tiplenmiş araç çağrılarını yakala
async for call in response.tool_calls:
    print(f"[Executing Tool] {call.name} -> {call.args}")`,
        },
        tip: 'Terminalde hızlıca etkileşimli test yapmak için `run_interactive_loop(agent)` yardımcı fonksiyonunu kullanabilirsin.',
      },
    ],
    quiz: [
      {
        id: 'sdk-q1',
        question: 'Antigravity Python SDK’da `LocalAgentConfig` içine `capabilities` parametresi verilmezse ajan hangi modda çalışır?',
        options: [
          'Tam yetkili yönetici modunda',
          'Güvenlik nedeniyle varsayılan olarak salt-okunur (read-only) modda',
          'İnternetsiz hata modunda',
          'Yalnızca görsel üretim modunda',
        ],
        correctIndex: 1,
        explanation:
          'SDK güvenlik gereği varsayılan olarak salt-okunur (read-only) başlar; yazma ve terminal araçları için `CapabilitiesConfig()` eklenir.',
      },
      {
        id: 'sdk-q2',
        question: 'SDK yanıtında ajanın çağırdığı araçları ve argümanlarını gerçek zamanlı dinlemek için hangi akış (stream) kullanılır?',
        options: ['response.logs', 'response.tool_calls', 'agent.history', 'config.tools'],
        correctIndex: 1,
        explanation:
          '`async for call in response.tool_calls:` ile her araç çağrısının adını (`call.name`) ve argümanlarını (`call.args`) anlık izleyebilirsin.',
      },
      {
        id: 'sdk-q3',
        question: 'Antigravity Python SDK neden kaynak kod yerine `pip install google-antigravity` ile kurulmalıdır?',
        options: [
          'Sadece pip Türkçe karakterleri destekler',
          'PyPI paketleri platforma özel derlenmiş çalışma zamanı ikili dosyasını (runtime binary) içerir',
          'GitHub kapalıdır',
          'Python 2 uyumluluğu için',
        ],
        correctIndex: 1,
        explanation:
          'SDK, PyPI wheel paketlerinin içinde gelen derlenmiş runtime binary dosyasına ihtiyaç duyar.',
      },
    ],
    realMission: {
      title: 'Kendi Python SDK Script Taslağını Hazırla',
      goal: 'İnteraktif SDK simülatöründe yapılandırmanı test edip gerçek bir Python otomasyon taslağı oluştur.',
      copyablePrompt:
        'google-antigravity Python SDK kullanarak bir klasördeki TODO yorumlarını salt-okunur (read-only) tarayıp özetleyen örnek bir script oluştur.',
      steps: [
        'Bu modüldeki "İnteraktif Uygulama" sekmesinde Read-Only ve Write modlarını karşılaştırarak streaming çıktısını çalıştır.',
        'Yukarıdaki prompt ile kendi projen için küçük bir Python SDK taslağı ürettir.',
        'İstersen bir sanal ortamda (venv) `pip install google-antigravity` komutunu dene.',
      ],
      expectedOutcome:
        'Antigravity’yi sadece arayüzden değil, kendi yazılım hatlarından (CI/CD, script) nasıl yöneteceğini kavramış olursun.',
    },
  },
];

export const ANTIGRAVITY_CURRICULUM: CurriculumModule[] = ANTIGRAVITY_RAW.map((m) => ({
  ...m,
  track: 'antigravity',
}));

export const CURRICULUM: CurriculumModule[] = [
  ...ANTIGRAVITY_CURRICULUM,
  ...AI_STUDIO_CURRICULUM,
  ...CLAUDE_CHATGPT_CURRICULUM,
  ...GITHUB_VERCEL_CURRICULUM,
];

