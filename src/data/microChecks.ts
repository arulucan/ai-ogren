import { MicroCheck } from '../types/learning';

/**
 * 1-question inline Active Recall micro-checks mapped by "<moduleId>:<conceptIndex>".
 * Every concept card across all 16 initial modules (plus the 4 Claude/ChatGPT modules which define inline microChecks)
 * gets a crisp, immediate 10-second verification question right under the card!
 */
export const CONCEPT_MICRO_CHECKS: Record<string, MicroCheck> = {
  // Track 1: Antigravity
  'ecosystem:0': {
    question: 'Birden fazla projede paralel ajanları ve Artifact belgelerini izlemek için en ideal yüzey hangisidir?',
    options: ['Antigravity 2.0 Masaüstü Uygulaması', 'Sadece not defteri', 'Tarayıcı yer imleri'],
    correctIndex: 0,
    explanation: 'Antigravity 2.0 Masaüstü uygulaması paralel sohbetler, Auxiliary Pane ve Scheduled Tasks için tasarlanmıştır.',
  },
  'ecosystem:1': {
    question: 'Antigravity IDE’de seçili kod bloğu üzerinde hızlı düzenleme başlatan kısayol hangisidir?',
    options: ['Ctrl+I (macOS: ⌘+I)', 'Alt+F4', 'Ctrl+P'],
    correctIndex: 0,
    explanation: 'Inline Command (Ctrl+I / ⌘+I) seçili blokta hedefli refactor ve kod üretimi yapar.',
  },
  'ecosystem:2': {
    question: 'Terminalde etkileşimli Antigravity CLI oturumunu başlatan komut nedir?',
    options: ['agy', 'antigravity-start-all', 'npm cli'],
    correctIndex: 0,
    explanation: 'Terminalde `agy` yazarak hafif TUI arayüzünü anında başlatabilirsin.',
  },

  'context:0': {
    question: 'Çalışan bir terminaldeki hata çıktısını kopyala-yapıştır yapmadan ajana nasıl bağlarsın?',
    options: ['Sohbette `@` yazıp ilgili Terminal oturumunu seçerek', 'Ekranı telefonla çekerek', 'Dosyayı silerek'],
    correctIndex: 0,
    explanation: '`@` mention menüsü dosya, klasör, geçmiş sohbet ve terminal oturumlarını doğrudan bağlama ekler.',
  },
  'context:1': {
    question: 'Bozuk bir CSS düzenini ajana anlatmanın en hızlı ve hatasız yolu nedir?',
    options: ['Ekran görüntüsünü doğrudan sohbete yapıştırmak', 'Piksel koordinatlarını tek tek yazmak', 'CSS dosyasını silmek'],
    correctIndex: 0,
    explanation: 'Multimodal destek sayesinde yapıştırdığın ekran görüntüsündeki görsel hatayı ajan anında görür.',
  },
  'context:2': {
    question: 'Sohbet çok uzayıp bağlam penceresi dolmaya başladığında hangi komutu çalıştırırsın?',
    options: ['/compact', '/browser', '/schedule'],
    correctIndex: 0,
    explanation: '`/compact` konuşmayı akıllıca özetleyip bağlam penceresini rahatlatır.',
  },

  'commands:0': {
    question: 'Kod yazmadan önce ajanın sana sorular sorup belirsiz tasarım kararlarını netleştirmesi için hangi komut kullanılır?',
    options: ['/grill-me', '/compact', '/exit'],
    correctIndex: 0,
    explanation: '`/grill-me` etkileşimli tasarım mülakatı başlatarak tüm kararları kodlamadan önce netleştirir.',
  },
  'commands:1': {
    question: 'Ajanı düzelttiğin bir bilgiyi gelecekteki tüm sohbetler için kalıcı hale getiren komut hangisidir?',
    options: ['/learn', '/browser', '/compact'],
    correctIndex: 0,
    explanation: '`/learn` düzeltmeleri ve karmaşık kurulum çözümlerini kalıcı davranışa dönüştürür.',
  },
  'commands:2': {
    question: 'Plan Artifact’i oluşturulduğunda doğrudan onay vermeden önce ne yapabilirsin?',
    options: ['Üzerinde revizyon/yorum isteyip netleşince Proceed ile başlatabilirsin', 'Hiçbir değişiklik yapılamaz', 'Dosyayı silmek zorundasın'],
    correctIndex: 0,
    explanation: 'Artifact inceleme döngüsü kod yazılmadan önce planı birlikte iyileştirmeni sağlar.',
  },

  'security:0': {
    question: 'Standard Sandbox modunda çalışan bir komut hangisine erişebilir?',
    options: ['Yalnızca aktif Workspace dosyalarına (internet kapalı)', 'Tüm internete ve kişisel SSH anahtarlarına', 'Hiçbir dosyaya'],
    correctIndex: 0,
    explanation: 'Standard Sandbox çalışma alanı okuma/yazmasına izin verir ancak ağ ve workspace dışı erişimi engeller.',
  },
  'security:1': {
    question: 'Güvenli yerel komutları otomatik çalıştırıp, yalnızca sandbox dışı işlemlerde onay isteyen önerilen politika hangisidir?',
    options: ['proceed-in-sandbox', 'always-deny', 'no-sandbox'],
    correctIndex: 0,
    explanation: '`proceed-in-sandbox` hız ve güvenlik arasında en iyi dengeyi sunar.',
  },
  'security:2': {
    question: 'Aktif proje ayarları ile global ayarlar çakıştığında hangisi önceliklidir?',
    options: ['Aktif Proje Ayarları (Project-Level Settings)', 'Global Ayarlar', 'İkisi de iptal olur'],
    correctIndex: 0,
    explanation: 'Proje bazlı ayarlar o proje açıkken global ayarların üzerine yazar (override).',
  },

  'customizations:0': {
    question: 'Çok adımlı bir prosedürü yalnızca gerektiğinde yüklenecek şekilde tanımlamak için hangi dosya kullanılır?',
    options: ['SKILL.md (Skills)', 'package.json', 'index.html'],
    correctIndex: 0,
    explanation: 'Skills (`skills/<ad>/SKILL.md`) çok adımlı runbook ve iş akışlarını kademeli olarak yükler.',
  },
  'customizations:1': {
    question: 'Progressive Disclosure (Kademeli Yükleme) bağlam penceresini nasıl korur?',
    options: ['Başta sadece skill adı ve açıklamasını yükleyip tam içeriği yalnızca gerektiğinde okuyarak', 'Tüm dosyaları silerek', 'Sadece tek skill’e izin vererek'],
    correctIndex: 0,
    explanation: 'Böylece onlarca beceri yüklü olsa bile bağlam penceresi gereksiz yere dolmaz.',
  },
  'customizations:2': {
    question: 'Workspace içindeki `.agents/` ile global `~/.gemini/config/` çakışırsa hangisi kazanır?',
    options: ['Workspace `.agents/` (1. öncelik)', 'Global `~/.gemini/config/`', 'Rastgele biri'],
    correctIndex: 0,
    explanation: 'Proje düzeyindeki Workspace özelleştirmeleri her zaman global ayarlardan daha yüksek önceliğe sahiptir.',
  },

  'multiagent:0': {
    question: 'Canlı bir web sayfasını açıp tıklayarak görsel test yapmak için hangi yerleşik alt ajan kullanılır?',
    options: ['browser', 'research', 'image-generator'],
    correctIndex: 0,
    explanation: '`browser` subagent yerleşik tarayıcıyı kontrol ederek gerçek kullanıcı etkileşimlerini test eder.',
  },
  'multiagent:1': {
    question: 'Swarm’da iki ajan aynı anda kod düzenleyecekse çakışmayı önlemek için hangi workspace modu seçilir?',
    options: ['share veya branch', 'inherit', 'disabled'],
    correctIndex: 0,
    explanation: '`share` veya `branch` her yazıcı ajana izole bir çalışma kopyası verir.',
  },
  'multiagent:2': {
    question: 'Tekrarlayan arka plan görevlerini (Cron) hangi komutla kurarsın?',
    options: ['/schedule', '/compact', '/grill-me'],
    correctIndex: 0,
    explanation: '`/schedule` ile hem tek seferlik zamanlayıcı hem de 5 alanlı Cron otomasyonları tanımlayabilirsin.',
  },

  'sdk:0': {
    question: 'Antigravity Python SDK neden `pip install google-antigravity` ile kurulmalıdır?',
    options: ['Platforma özel derlenmiş runtime binary paketle birlikte geldiği için', 'Sadece pip renkli çıktı verdiği için', 'PyPI zorunlu olduğu için'],
    correctIndex: 0,
    explanation: 'PyPI wheel paketleri SDK’nın çalışması için gereken derlenmiş çalışma zamanı ikili dosyasını içerir.',
  },
  'sdk:1': {
    question: '`LocalAgentConfig` içinde `capabilities` belirtilmezse ajan hangi modda başlar?',
    options: ['Salt-Okunur (Read-Only)', 'Tam yazma yetkili', 'Sadece tarayıcı modunda'],
    correctIndex: 0,
    explanation: 'SDK güvenlik için varsayılan olarak salt-okunur başlar; yazma için `CapabilitiesConfig()` eklenir.',
  },
  'sdk:2': {
    question: 'Ajanın iç akıl yürütme adımlarını canlı izlemek için hangi akış kullanılır?',
    options: ['response.thoughts', 'agent.sleep', 'config.debug'],
    correctIndex: 0,
    explanation: '`async for thought in response.thoughts:` ile modelin düşünme adımlarını anlık izleyebilirsin.',
  },

  // Track 2: Google AI Studio
  'aistudio-basics:0': {
    question: 'Yeni bir fikri hızlıca prompt/parametrelerle test etmek için AI Studio, çok dosyalı gerçek kodlama için hangisi daha güçlüdür?',
    options: ['Google Antigravity', 'Hesap makinesi', 'Sadece PDF okuyucu'],
    correctIndex: 0,
    explanation: 'AI Studio hızlı deney ve API anahtarı için, Antigravity ise yerel çok dosyalı geliştirme ve dağıtım için idealdir.',
  },
  'aistudio-basics:1': {
    question: 'Kod üretimi ve tutarlı veri çıkarmada `Temperature` değeri nasıl olmalıdır?',
    options: ['Düşük (0.0 – 0.3)', 'Maksimum (2.0)', 'Hiç fark etmez'],
    correctIndex: 0,
    explanation: 'Düşük Temperature rastgeleliği azaltır ve öngörülebilir, hatasız teknik çıktılar üretir.',
  },
  'aistudio-basics:2': {
    question: 'Hızlı ve yüksek hacimli günlük API çağrıları için hangi Gemini ailesi tercih edilir?',
    options: ['Gemini Flash', 'Yalnızca çevrimdışı mod', 'Eski statik şablon'],
    correctIndex: 0,
    explanation: 'Gemini Flash ultra düşük gecikme ve maliyet avantajıyla yüksek hacimli işler için idealdir.',
  },

  'aistudio-prompting:0': {
    question: 'Structured Output açıldığında model çıktısı nasıl garanti altına alınır?',
    options: ['Sohbet metni olmadan %100 tanımlı JSON şemasına uygun döner', 'Sadece büyük harfle yazar', 'Her zaman 10 sayfa döner'],
    correctIndex: 0,
    explanation: 'Structured Output, `JSON.parse()` hatalarını tamamen ortadan kaldırır.',
  },
  'aistudio-prompting:1': {
    question: 'Few-Shot Prompting ne yaparak doğruluğu artırır?',
    options: ['2–3 somut girdi→çıktı örneği göstererek', 'Sadece tek kelime yazarak', 'Tüm kuralları silerek'],
    correctIndex: 0,
    explanation: 'Somut örnekler modelin istediğin tonu ve formatı tam olarak yakalamasını sağlar.',
  },
  'aistudio-prompting:2': {
    question: 'Gemini’nin Multimodal gücü sayesinde AI Studio’ya aşağıdakilerden hangisi yüklenebilir?',
    options: ['PDF, video, ses ve ekran görüntüsü', 'Yalnızca düz .txt dosyası', 'Yalnızca 1 satırlık metin'],
    correctIndex: 0,
    explanation: 'AI Studio metin, görsel, PDF, ses ve videoları tek bir büyük bağlamda işleyebilir.',
  },

  'aistudio-tools:0': {
    question: 'Güncel bir haber veya yeni kütüphane sürümü sorarken halüsinasyonu önlemek için hangi araç açılır?',
    options: ['Grounding with Google Search', 'Temperature 2.0', 'Max Tokens 10'],
    correctIndex: 0,
    explanation: 'Grounding canlı Google araması yaparak yanıtı gerçek web kaynaklarına dayandırır.',
  },
  'aistudio-tools:1': {
    question: 'Modelin kendi veritabanından sipariş sorgulamasını tetikleyen mekanizma nedir?',
    options: ['Function Calling', 'Top-P', 'Markdown'],
    correctIndex: 0,
    explanation: 'Function Calling modelin tanımladığın dış fonksiyonu doğru parametrelerle çağırmasını sağlar.',
  },
  'aistudio-tools:2': {
    question: 'Karmaşık finansal veya matematiksel hesaplarda kesin sonuç için hangi araç açılır?',
    options: ['Code Execution', 'Yalnızca yaratıcı mod', 'Görsel kırpma'],
    correctIndex: 0,
    explanation: 'Code Execution arka planda Python kodu çalıştırarak kesin hesap sonucu üretir.',
  },

  'aistudio-build:0': {
    question: 'AI Studio’da tek cümleyle tarayıcıda canlı React prototipi üreten bölüm hangisidir?',
    options: ['Build', 'Settings', 'Billing'],
    correctIndex: 0,
    explanation: 'AI Studio Build (Vibe Coding), doğal dille anında çalışan web prototipleri oluşturur.',
  },
  'aistudio-build:1': {
    question: 'Ekranını paylaşarak sesli canlı destek almanı sağlayan özellik nedir?',
    options: ['Stream Realtime (Live API)', 'Structured Output', 'Static Build'],
    correctIndex: 0,
    explanation: 'Live API düşük gecikmeli ses, kamera ve ekran paylaşımıyla canlı etkileşim sunar.',
  },
  'aistudio-build:2': {
    question: 'AI Studio’da test ettiğin promptu tek tıkla `@google/genai` koduna dönüştüren buton hangisidir?',
    options: ['Get Code', 'Reset', 'Share Link'],
    correctIndex: 0,
    explanation: 'Get Code, seçtiğin model ve tüm ayarları doğrudan projene yapıştırabileceğin SDK koduna çevirir.',
  },

  'aistudio-api:0': {
    question: 'Ücretsiz Gemini API anahtarı nereden oluşturulur?',
    options: ['AI Studio → Get API key', 'GitHub Issues', 'Vercel Domains'],
    correctIndex: 0,
    explanation: 'aistudio.google.com üzerindeki Get API key sayfasından ücretsiz anahtarını oluşturabilirsin.',
  },
  'aistudio-api:1': {
    question: 'Kendi API anahtarını tarayıcıda çalışan React kodunun içine doğrudan yazmak neden tehlikelidir?',
    options: ['Herkes tarayıcı DevTools ile anahtarı görüp kotanı tüketebilir', 'Kod daha yavaş derlenir', 'Sadece koyu temayı bozar'],
    correctIndex: 0,
    explanation: 'Gizli anahtarlar asla frontend’e gömülmemeli; `.env` + sunucu tarafı (Vercel Serverless Function) üzerinden kullanılmalıdır.',
  },

  // Track 3: GitHub & Vercel
  'gv-git-basics:0': {
    question: 'Git’te `git add` ile `git commit` arasındaki temel fark nedir?',
    options: ['`git add` değişiklikleri hazırlık alanına (Staging) alır, `git commit` kalıcı kaydeder', 'İkisi de aynı işi yapar', '`git commit` dosyaları siler'],
    correctIndex: 0,
    explanation: 'Staging Area hangi değişikliklerin tek bir anlamlı commit içinde mühürleneceğini seçmeni sağlar.',
  },
  'gv-git-basics:1': {
    question: '`node_modules/` klasörü neden `.gitignore` içine yazılır?',
    options: ['Binlerce yeniden indirilebilir paket içerdiği için depoyu gereksiz şişirmesin diye', 'Node.js çalışmasın diye', 'Vercel izin vermediği için'],
    correctIndex: 0,
    explanation: '`package.json` yeterlidir; `npm install` bağımlılıkları her ortamda otomatik yeniden kurar.',
  },
  'gv-git-basics:2': {
    question: 'Ana canlı kodu (`main`) bozmadan yeni özellik geliştirmek için ne açarsın?',
    options: ['Yeni bir Branch (Dal)', 'Yeni bir bilgisayar', 'Yeni bir .env dosyası'],
    correctIndex: 0,
    explanation: 'Branch üzerinde güvenle deney yapıp her şey çalıştığında `main` dalına birleştirirsin.',
  },

  'gv-github:0': {
    question: 'Vercel ücretsiz Hobby planı Private (gizli) GitHub depolarını yayınlayabilir mi?',
    options: ['Evet, kişisel Private depolar da ücretsiz yayınlanır', 'Hayır, kesinlikle yasaktır', 'Sadece 1 günlüğüne'],
    correctIndex: 0,
    explanation: 'Kendi kişisel Private GitHub depolarını Vercel Hobby planında ücretsiz canlıya alabilirsin.',
  },
  'gv-github:1': {
    question: 'Terminalden tek komutla GitHub deposu açıp kodunu yükleyen araç hangisidir?',
    options: ['gh (GitHub CLI)', 'notepad', 'ping'],
    correctIndex: 0,
    explanation: '`gh repo create <ad> --public --source=. --push` saniyeler içinde deponu oluşturup yükler.',
  },
  'gv-github:2': {
    question: 'GitHub’da Pull Request açtığında bağlı Vercel uygulaması ne yapar?',
    options: ['Ana siteyi etkilemeden test edebileceğin özel bir Preview linki oluşturur', 'Ana siteyi kapatır', 'Tüm dalları siler'],
    correctIndex: 0,
    explanation: 'Vercel Preview Deployments sayesinde değişiklikleri canlıya almadan önce gerçek URL’de test edersin.',
  },

  'gv-vercel-deploy:0': {
    question: 'Yeni bir `git push` sırasında derleme hatası çıkarsa yayındaki Production sitene ne olur?',
    options: ['Hiç etkilenmez; önceki çalışan sürüm kesintisiz yayında kalır', 'Site tamamen çöker', 'Veriler silinir'],
    correctIndex: 0,
    explanation: 'Atomik yayınlama sayesinde yalnızca hatasız derlenen sürümler canlıya geçer.',
  },
  'gv-vercel-deploy:1': {
    question: 'Hangi daldaki güncellemeler varsayılan olarak ana canlı siteyi (Production) günceller?',
    options: ['main dalı', 'Herhangi bir geçici dal', 'Sadece silinen dallar'],
    correctIndex: 0,
    explanation: '`main` dalı Production’a, diğer yan dallar ise Preview linklerine gider.',
  },
  'gv-vercel-deploy:2': {
    question: 'Vite/React SPA uygulamasında alt sayfa yenilemelerinde 404 hatasını önleyen dosya hangisidir?',
    options: ['vercel.json (rewrites kuralı)', 'README.md', '.gitignore'],
    correctIndex: 0,
    explanation: '`vercel.json` içindeki `rewrites` kuralı tüm yolları `/index.html` dosyasına yönlendirir.',
  },

  'gv-env-domains:0': {
    question: 'Vercel paneline yeni bir `GEMINI_API_KEY` ekledikten sonra ne yapmalısın?',
    options: ['Yeni derlemeye yansıması için Redeploy etmelisin', 'Projeyi silmelisin', 'Hiçbir şey yapmadan 1 hafta beklemelisin'],
    correctIndex: 0,
    explanation: 'Ortam değişkeni değişiklikleri yeni bir Redeploy veya Push ile aktif olur.',
  },
  'gv-env-domains:1': {
    question: 'Vercel’e kendi özel alan adını bağladığında SSL/HTTPS sertifikası nasıl alınır?',
    options: ['Vercel otomatik ve tamamen ücretsiz sağlar', 'Ayrı ücretli sertifika satın alınır', 'HTTPS desteklenmez'],
    correctIndex: 0,
    explanation: 'DNS kaydı doğrulandığı anda Vercel otomatik ücretsiz SSL sertifikası tanımlayıp yeniler.',
  },
  'gv-env-domains:2': {
    question: 'Windows’ta çalışıp Vercel’de `Module not found` hatası veren importların en yaygın nedeni nedir?',
    options: ['Dosya adındaki büyük/küçük harf farkı (Linux harf duyarlıdır)', 'Klavye düzeni', 'Monitör çözünürlüğü'],
    correctIndex: 0,
    explanation: 'Import yolları dosya adlarıyla harf harf birebir aynı olmalıdır (`Navbar.tsx` ≠ `navbar.tsx`).',
  },
};
