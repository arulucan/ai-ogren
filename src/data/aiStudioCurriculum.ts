import { CurriculumModule } from '../types/learning';

export const AI_STUDIO_CURRICULUM: CurriculumModule[] = [
  {
    id: 'aistudio-basics',
    track: 'aistudio',
    number: 1,
    title: 'Google AI Studio’ya Giriş & Model Parametreleri',
    shortTitle: 'AI Studio & Parametreler',
    subtitle: 'aistudio.google.com arayüzü, Gemini modelleri, System Instructions ve Temperature ayarı',
    durationMinutes: 9,
    xpReward: 265,
    iconName: 'Sparkles',
    accentColor: 'cyan',
    summary:
      'Google AI Studio, Gemini modellerini tarayıcıda sıfır kurulumla denemen, promptlarını ince ayar yapman ve tek tıkla üretime hazır koda dönüştürmen için tasarlanmış geliştirici laboratuvarıdır. Antigravity ile birlikte kullanıldığında fikir aşamasından canlı ürüne ışık hızında geçersin.',
    concepts: [
      {
        title: 'AI Studio vs. Antigravity: Ne Zaman Hangisi?',
        badge: 'Paralel İş Akışı',
        description:
          'İki araç rakip değil, birbirini mükemmel tamamlayan iki aşamadır:',
        bullets: [
          'Google AI Studio: Prompt tasarlama, yeni Gemini modellerini test etme, büyük PDF/video/ses dosyalarını analiz etme, API anahtarı üretme ve Vibe Coding ile hızlı prototipleme.',
          'Google Antigravity: Yerel proje klasöründe (Workspace) çoklu dosya düzenleme, terminal komutları çalıştırma, Git yönetimi, test koşma ve canlıya yayınlama (Deploy).',
        ],
        tip: 'Önce AI Studio’da en iyi promptu ve model ayarını keşfet, sonra "Get Code" ile aldığın yapıyı Antigravity’de gerçek projenin içine entegre et!',
      },
      {
        title: 'Temel Parametreler: System Instructions, Temperature & Top-P',
        badge: 'İnce Ayar Kontrolleri',
        description:
          'AI Studio’nun sağ panelindeki kontroller modelin karakterini ve doğruluğunu doğrudan yönetir:',
        bullets: [
          'System Instructions: Modelin rolünü, Türkçe üslubunu ve kesin kurallarını her yanıtta geçerli olacak şekilde sabitler.',
          'Temperature (0.0 – 2.0): Düşük değer (0.0–0.3) kodlama, veri çıkarma ve tutarlı sonuçlar için; yüksek değer (0.8–1.2) beyin fırtınası ve yaratıcı yazarlık için kullanılır.',
          'Max Output Tokens & Thinking Budget: Yanıtın uzunluk sınırını ve derin akıl yürütme (Thinking) kapasitesini ayarlar.',
        ],
      },
      {
        title: 'Doğru Gemini Modelini Seçme',
        badge: 'Hız vs. Derinlik',
        description:
          'Her görev için aynı modeli kullanmak zorunda değilsin:',
        bullets: [
          'Gemini Flash: Ultra hızlı, düşük maliyetli — özetleme, sınıflandırma, sohbet botları ve yüksek hacimli API çağrıları için ideal.',
          'Gemini Pro: Karmaşık akıl yürütme, derin kod mimarisi, uzun belge analizi ve zor mantık problemleri için en güçlü seçenek.',
        ],
      },
    ],
    comparison: {
      title: 'Google AI Studio vs. Google Antigravity',
      headers: ['Özellik', 'Google AI Studio', 'Google Antigravity'],
      rows: [
        {
          feature: 'Çalışma Ortamı',
          col1: 'Tarayıcı (aistudio.google.com)',
          col2: 'Masaüstü App 2.0, IDE ve agy CLI',
        },
        {
          feature: 'Temel Gücü',
          col1: 'Prompt/parametre testi, Multimodal, API Key',
          col2: 'Çok dosyalı proje geliştirme, Sandbox, Git',
        },
        {
          feature: 'Dosya & Terminal Erişimi',
          col1: 'Yüklenen dosyalar & tarayıcı önizleme',
          col2: 'Tam yerel Workspace okuma/yazma & terminal',
        },
      ],
    },
    quiz: [
      {
        id: 'ais-b-q1',
        question: 'Faturalardan kesin JSON verisi çıkarırken modelin uydurma yapmadan her seferinde tutarlı yanıt vermesi için Temperature nasıl ayarlanmalıdır?',
        options: [
          'Düşük (0.0 – 0.2 arası)',
          'Çok yüksek (1.8 – 2.0 arası)',
          'Rastgele değiştirilmelidir',
          'Temperature yalnızca görsel boyutunu etkiler',
        ],
        correctIndex: 0,
        explanation:
          'Düşük Temperature (0.0–0.2) modeli en yüksek olasılıklı ve tutarlı yanıtlara yönlendirir; veri çıkarma ve kodlama için idealdir.',
      },
      {
        id: 'ais-b-q2',
        question: 'Modelin her mesajda "Sen kıdemli bir Türk hukuk asistanısın ve her zaman maddeler halinde yanıt ver" kuralına uyması için bu yönerge nereye yazılmalıdır?',
        options: [
          'Dosya adına',
          'System Instructions (Sistem Talimatları) alanına',
          'Max Output Tokens kutusuna',
          'API Key alanına',
        ],
        correctIndex: 1,
        explanation:
          'System Instructions, tüm konuşma boyunca modelin rolünü ve davranış çerçevesini kalıcı olarak belirler.',
      },
      {
        id: 'ais-b-q3',
        question: 'Google AI Studio ve Antigravity’yi paralel kullanırken en verimli iş akışı hangisidir?',
        options: [
          'AI Studio’da prompt ve model ayarlarını test edip, Antigravity’de gerçek proje dosyalarına entegre etmek',
          'Sadece birini kullanıp diğerini tamamen bırakmak',
          'Antigravity projelerini tek tek kopyalayıp AI Studio sohbetine yapıştırmak',
          'API anahtarını tarayıcı konsoluna yazmak',
        ],
        correctIndex: 0,
        explanation:
          'AI Studio hızlı prompt/parametre deneyleri ve API anahtarı yönetimi için, Antigravity ise gerçek proje geliştirme ve dağıtım için mükemmel ikilidir.',
      },
    ],
    realMission: {
      title: 'AI Studio’da İlk System Instructions & Temperature Deneyin',
      goal: 'aistudio.google.com adresine girip aynı soruyu Temperature 0.1 ve 1.2 ile kıyasla.',
      copyablePrompt:
        'Bir kahve dükkanı için 3 kısa ve akılda kalıcı Türkçe slogan öner.',
      steps: [
        'Tarayıcıda aistudio.google.com adresini aç ve ücretsiz Google hesabınla giriş yap.',
        'System Instructions kutusuna "Her zaman kısa, modern ve Türkçe yanıt ver" yaz.',
        'Sağ panelde Temperature değerini önce 0.1 yapıp yukarıdaki promptu çalıştır, sonra 1.2 yapıp farkı gözlemle.',
      ],
      expectedOutcome:
        'Düşük Temperature’da daha klasik ve öngörülebilir, yüksek Temperature’da daha yaratıcı ve sıra dışı sloganlar ürettiğini canlı görürsün.',
    },
  },
  {
    id: 'aistudio-prompting',
    track: 'aistudio',
    number: 2,
    title: 'Prompt Mühendisliği, Multimodal & Structured Output',
    shortTitle: 'Prompt & JSON Şema',
    subtitle: 'Few-Shot örnekleri, büyük medya dosyaları (PDF/Video) ve garantili JSON çıktısı alma',
    durationMinutes: 10,
    xpReward: 265,
    iconName: 'FileJson',
    accentColor: 'indigo',
    summary:
      'Yapay zekâdan bir yazılımda güvenle kullanılabilecek veri almanın sırrı yalnızca iyi prompt yazmak değil, AI Studio’nun Few-Shot ve Structured Output (JSON Şema) özelliklerini kullanmaktır.',
    concepts: [
      {
        title: 'Structured Output (Garantili JSON Şeması)',
        badge: 'Yazılım Entegrasyonu',
        description:
          'Normalde model yanıtın başına "İşte istediğiniz JSON:" gibi sohbet metni ekleyebilir ve bu durum kodunu bozar. Structured Output bunu tamamen çözer:',
        bullets: [
          'Sağ panelden "Structured output" seçeneğini açıp beklediğin alanları (`title`, `priority`, `tags`) tanımlarsın.',
          'Model her seferinde %100 geçerli, tanımladığın tiplere uyan saf JSON döndürür.',
        ],
        codeSnippet: {
          label: 'Örnek Structured Output Yanıtı',
          code: `{
  "ozet": "Giriş ekranında şifre sıfırlama bağlantısı kırık",
  "oncelik": "yuksek",
  "etiketler": ["auth", "bug", "frontend"]
}`,
        },
      },
      {
        title: 'Few-Shot Prompting (Örneklerle Öğretme)',
        badge: 'Yüksek Tutarlılık',
        description:
          'Uzun kurallar yazmak yerine 2–3 adet "Girdi → İstenen Çıktı" örneği göstermek modelin biçimi anında kavramasını sağlar.',
        tip: 'Özellikle kurumsal e-posta tonu, müşteri destek kategorileme veya özel formatlı özetlerde Few-Shot tekniği doğruluğu %40’a kadar artırır.',
      },
      {
        title: 'Devasa Multimodal Bağlam (PDF, Video, Ses, Görsel)',
        badge: '1M+ Token Gücü',
        description:
          'AI Studio sohbetine doğrudan Google Drive’dan veya bilgisayarından yüzlerce sayfalık PDF, uzun bir ders videosu ya da ses kaydı yükleyebilirsin.',
        bullets: [
          'Bir YouTube veya yerel eğitim videosunu yükleyip "Dakika dakika önemli noktaları ve zaman damgalarını çıkar" diyebilirsin.',
          'Bir arayüz tasarım ekran görüntüsü yükleyip HTML/Tailwind koduna çevirebilirsin.',
        ],
      },
    ],
    quiz: [
      {
        id: 'ais-p-q1',
        question: 'Uygulamanın arka ucunda (backend) `JSON.parse()` hatası almadan modelden her zaman kesin alanlara sahip JSON almak için hangi özellik kullanılır?',
        options: [
          'Temperature değerini 2.0 yapmak',
          'Structured Output (JSON Şema tanımlama)',
          'Sohbeti her seferinde silmek',
          'Metni büyük harfle yazmak',
        ],
        correctIndex: 1,
        explanation:
          'Structured Output, modelin yanıtını doğrudan belirlediğin JSON şemasına zorlayarak ayrıştırma (parse) hatalarını ortadan kaldırır.',
      },
      {
        id: 'ais-p-q2',
        question: 'Few-Shot Prompting yaklaşımının temel mantığı nedir?',
        options: [
          'Modele hiç örnek vermeden tek kelime yazmak',
          'Modele 2–3 adet girdi ve beklenen çıktı örneği göstererek formatı öğretmek',
          'Sadece resim yüklemek',
          'Modeli çevrimdışı çalıştırmak',
        ],
        correctIndex: 1,
        explanation:
          'Few-Shot tekniği az sayıda somut örnek vererek modelin tam istediğin üslubu ve yapıyı taklit etmesini sağlar.',
      },
      {
        id: 'ais-p-q3',
        question: 'AI Studio’nun Multimodal yeteneği aşağıdakilerden hangisini doğrudan işleyebilir?',
        options: [
          'Sadece düz ASCII metin',
          'Metin, görsel, PDF doküman, ses ve video dosyaları',
          'Yalnızca Excel makroları',
          'Yalnızca .exe dosyaları',
        ],
        correctIndex: 1,
        explanation:
          'Gemini modelleri doğal olarak Multimodal’dır; metinle birlikte görsel, PDF, ses ve videoları tek bağlamda analiz eder.',
      },
    ],
    realMission: {
      title: 'AI Studio’da Structured Output Şeması Oluştur',
      goal: 'Bir müşteri geri bildirimini otomatik analiz edip kesin JSON çıktısı veren bir şema kur.',
      copyablePrompt:
        'Aşağıdaki müşteri yorumunu analiz et: "Kargo çok hızlıydı ama kutu biraz ezilmiş, yine de ürün sorunsuz çalışıyor."',
      steps: [
        'AI Studio’da sağ panelden "Structured output" anahtarını aç ve Edit butonuna tıkla.',
        'Şemaya `duygu` (string), `puan` (integer) ve `konular` (array of strings) alanlarını ekle.',
        'Yukarıdaki promptu çalıştır ve yanıtın sohbet metni olmadan saf JSON döndüğünü doğrula.',
      ],
      expectedOutcome:
        'Her çalıştırmada doğrudan yazılımda kullanılabilecek temiz bir JSON nesnesi elde edersin.',
    },
  },
  {
    id: 'aistudio-tools',
    track: 'aistudio',
    number: 3,
    title: 'AI Studio Araçları: Grounding, Function Calling & Code Execution',
    shortTitle: 'Grounding & Araçlar',
    subtitle: 'Google Arama ile güncel doğrulama, harici fonksiyon çağırma ve yerleşik Python çalıştırma',
    durationMinutes: 10,
    xpReward: 265,
    iconName: 'Wrench',
    accentColor: 'violet',
    summary:
      'Modeller yalnızca eğitim verisiyle sınırlı kaldığında güncel olayları bilemez veya zor hesaplarda yanılabilir. AI Studio’daki 3 yerleşik araç katmanı modeli canlı dünyaya ve kesin hesaplamaya bağlar.',
    concepts: [
      {
        title: 'Grounding with Google Search (Kaynaklı Doğrulama)',
        badge: 'Güncel Bilgi',
        description:
          'Sağ panelde "Grounding with Google Search" açıldığında Gemini yanıt üretmeden önce canlı Google araması yapar:',
        bullets: [
          'Güncel haberler, yeni kütüphane sürümleri ve fiyat/tarih bilgilerini doğru verir.',
          'Yanıtın altında tıklanabilir kaynak web sitelerini listeler; halüsinasyon riskini dramatik biçimde azaltır.',
        ],
      },
      {
        title: 'Function Calling (Fonksiyon Çağırma)',
        badge: 'Kendi Sistemine Bağla',
        description:
          'Modelin kendi veritabanından sipariş sorgulaması veya takvim oluşturması gerektiğinde Function Calling devreye girer:',
        bullets: [
          'Sen fonksiyonun adını ve parametre şemasını tanımlarsın (örn. `get_order_status(order_id)`).',
          'Model kullanıcı sorusunu anlayıp fonksiyonu hangi parametreyle çağırması gerektiğini JSON olarak döner; senin kodun sonucu geri iletir.',
        ],
      },
      {
        title: 'Code Execution (Yerleşik Python Motoru)',
        badge: 'Kesin Matematik & Veri',
        description:
          'Karmaşık istatistik, tarih hesabı veya CSV analizi sorduğunda model tahminde bulunmak yerine arka planda Python kodu yazıp çalıştırarak kesin sonucu döndürür.',
        tip: 'Finansal hesaplama, bileşik faiz veya büyük sayı işlemlerinde Code Execution açmak hata payını sıfıra indirir.',
      },
    ],
    quiz: [
      {
        id: 'ais-t-q1',
        question: 'Bugün yayınlanan bir yazılım sürümünün yeniliklerini kaynak linkleriyle öğrenmek için AI Studio’da hangi aracı açmalısın?',
        options: [
          'Grounding with Google Search',
          'Sadece Temperature artırımı',
          'Max Tokens kısaltma',
          'Code Execution kapatma',
        ],
        correctIndex: 0,
        explanation:
          'Grounding with Google Search canlı web araması yaparak güncel bilgileri doğrulanmış kaynak bağlantılarıyla sunar.',
      },
      {
        id: 'ais-t-q2',
        question: 'Kullanıcı "12345 numaralı kargom nerede?" dediğinde modelin şirket içi kargo API’ni tetiklemesini sağlayan özellik hangisidir?',
        options: ['Function Calling', 'Top-P', 'System Instructions', 'Markdown Preview'],
        correctIndex: 0,
        explanation:
          'Function Calling sayesinde model, tanımladığın harici fonksiyonu doğru parametrelerle (`order_id: "12345"`) çağırılmasını talep eder.',
      },
      {
        id: 'ais-t-q3',
        question: 'Code Execution aracı en çok hangi görevde fayda sağlar?',
        options: [
          'Şiir yazarken',
          'Karmaşık matematiksel hesaplamalar ve veri analizi doğrulamasında',
          'Tarayıcı temasını değiştirirken',
          'API anahtarı kopyalarken',
        ],
        correctIndex: 1,
        explanation:
          'Code Execution, modelin tahmin yürütmek yerine Python kodu çalıştırarak kesin hesap sonucu elde etmesini sağlar.',
      },
    ],
    realMission: {
      title: 'Grounding ile Canlı Kaynaklı Araştırma Yap',
      goal: 'AI Studio’da Google Search Grounding özelliğini açıp kaynaklı yanıt üretimini deneyimle.',
      copyablePrompt:
        'React ve Vite ekosistemindeki en güncel kararlı sürümleri ve öne çıkan 3 yeniliği kaynaklarıyla özetle.',
      steps: [
        'AI Studio sağ panelinde "Tools" altında "Grounding with Google Search" anahtarını aktif et.',
        'Yukarıdaki promptu gönder ve yanıtın altında beliren kaynak bağlantılarını (Search Suggestions / Sources) incele.',
        'Aynı panelde "Code Execution" anahtarını açıp "İlk 50 asal sayının toplamını Python ile hesapla" diye sor.',
      ],
      expectedOutcome:
        'İlk soruda canlı web kaynaklarını, ikinci soruda ise arka planda çalıştırılan Python kodunu ve kesin sonucu görürsün.',
    },
  },
  {
    id: 'aistudio-build',
    track: 'aistudio',
    number: 4,
    title: 'AI Studio Build (Vibe Coding), Live API & Get Code',
    shortTitle: 'Build, Live API & Get Code',
    subtitle: 'Tarayıcıda anında uygulama prototipleme, sesli/ekranlı Live API ve Antigravity’ye kod aktarma',
    durationMinutes: 10,
    xpReward: 265,
    iconName: 'Wand2',
    accentColor: 'pink',
    summary:
      'AI Studio yalnızca metin deneme ekranı değildir: "Build" ile saniyeler içinde çalışan React uygulamaları üretebilir, "Stream Realtime" ile ekranını paylaşarak canlı destek alabilir ve "Get Code" ile projeni Antigravity’ye taşıyabilirsin.',
    concepts: [
      {
        title: 'AI Studio Build (Tarayıcıda Vibe Coding)',
        badge: 'Anında Prototip',
        description:
          'Sol menüdeki "Build" bölümüyle tek bir Türkçe fikir yazarak canlı önizlemeli web uygulamaları oluşturabilirsin:',
        bullets: [
          'Fikrini tarif et → AI Studio otomatik olarak React/TypeScript dosyalarını yazar ve yan pencerede anında çalıştırır.',
          'Uygulamayı ZIP olarak indirip veya GitHub’a gönderip Antigravity içinde profesyonelce büyütmeye devam edebilirsin.',
        ],
      },
      {
        title: 'Stream Realtime (Live API)',
        badge: 'Ses + Ekran Paylaşımı',
        description:
          'Mikrofonunu açıp veya ekranını paylaşarak Gemini ile gerçek zamanlı konuşabilirsin:',
        bullets: [
          'Bir arayüzü veya hata ekranını canlı gösterip "Şu an ekranda gördüğün hatayı adım adım nasıl çözerim?" diye sorabilirsin.',
          'Düşük gecikmeli sesli etkileşim sayesinde fikir geliştirme ve İngilizce/teknik pratik için harikadır.',
        ],
      },
      {
        title: 'Get Code → Antigravity Köprüsü',
        badge: 'Üretime Geçiş',
        description:
          'AI Studio’da mükemmelleştirdiğin herhangi bir promptu üstteki "Get Code" butonuyla Python, JavaScript/TypeScript (`@google/genai`) veya cURL koduna çevirebilirsin.',
        codeSnippet: {
          label: 'Resmi @google/genai TypeScript Örneği',
          code: `import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const response = await ai.models.generateContent({
  model: "gemini-2.5-flash",
  contents: "Antigravity nedir? 2 cümlede açıkla.",
});
console.log(response.text);`,
        },
      },
    ],
    quiz: [
      {
        id: 'ais-bd-q1',
        question: 'AI Studio’da mükemmelleştirdiğin bir promptu ve System Instructions ayarını doğrudan TypeScript veya Python koduna dönüştüren buton hangisidir?',
        options: ['Get Code', 'Clear History', 'Delete Prompt', 'Temperature'],
        correctIndex: 0,
        explanation:
          '"Get Code" butonu tüm model, parametre ve sistem talimatlarını hazır SDK koduna çevirir.',
      },
      {
        id: 'ais-bd-q2',
        question: 'Ekranını canlı paylaşarak sesli olarak bir arayüz veya hata hakkında anlık yönlendirme almak için AI Studio’nun hangi özelliği kullanılır?',
        options: ['Stream Realtime (Live API)', 'Structured Output', 'JSON Schema', 'Static Export'],
        correctIndex: 0,
        explanation:
          'Stream Realtime (Live API) ses, kamera ve ekran paylaşımıyla düşük gecikmeli gerçek zamanlı etkileşim sunar.',
      },
      {
        id: 'ais-bd-q3',
        question: 'AI Studio Build’de ürettiğin bir prototipi özel backend, Git geçmişi ve kapsamlı testlerle gerçek bir ürüne dönüştürmek için en iyi sonraki adım nedir?',
        options: [
          'Kodu ekran görüntüsü alıp saklamak',
          'Projeyi indirip/GitHub’a aktarıp Antigravity içinde geliştirmek ve Vercel’de yayınlamak',
          'Her seferinde baştan yazmak',
          'Sadece yerel not defterinde tutmak',
        ],
        correctIndex: 1,
        explanation:
          'AI Studio Build hızlı prototipleme, Antigravity derin geliştirme, GitHub + Vercel ise canlıya yayınlama için ideal zincirdir.',
      },
    ],
    realMission: {
      title: 'Get Code ile Kendi İlk Gemini SDK Kodunu Al',
      goal: 'AI Studio’da test ettiğin bir promptu "Get Code" ile dışa aktarıp incele.',
      copyablePrompt:
        'Bir öğrencinin günlük çalışma planını 3 maddelik motivasyonel bir plana dönüştür.',
      steps: [
        'AI Studio’da yukarıdaki promptu çalıştır.',
        'Sağ üstteki "Get Code" butonuna tıkla ve JavaScript/TypeScript ile Python sekmelerini karşılaştır.',
        'İsteğe bağlı olarak sol menüden "Build" sekmesine girip basit bir Pomodoro sayacı fikri deneyerek anlık önizlemeyi gör.',
      ],
      expectedOutcome:
        'Tarayıcıdaki deneyinin saniyeler içinde gerçek yazılım koduna nasıl dönüştüğünü görmüş olursun.',
    },
  },
  {
    id: 'aistudio-api',
    track: 'aistudio',
    number: 5,
    title: 'API Anahtarı (API Key), Ücretsiz Kota & Güvenli Mimari',
    shortTitle: 'API Key & Güvenlik',
    subtitle: 'AI Studio’dan ücretsiz API anahtarı alma, .env koruması ve Vercel Serverless ile güvenli kullanım',
    durationMinutes: 9,
    xpReward: 265,
    iconName: 'KeyRound',
    accentColor: 'emerald',
    summary:
      'Google AI Studio ücretsiz katmanda geliştiricilere cömert bir API kotası sunar. Ancak bir API Key’i yanlışlıkla GitHub’a veya tarayıcı (frontend) koduna koymak en sık yapılan ve en tehlikeli hatadır.',
    concepts: [
      {
        title: 'API Anahtarını Nereden Alırsın?',
        badge: 'Ücretsiz Başlangıç',
        description:
          'AI Studio sol menüsündeki "Get API key" sayfasından saniyeler içinde ücretsiz bir Gemini API anahtarı oluşturabilirsin.',
        bullets: [
          'Ücretsiz katmanda (Free Tier) kredi kartı bağlamadan deneme ve kişisel projeler geliştirebilirsin.',
          'Anahtarı oluşturduktan sonra yalnızca yerel `.env` dosyana veya Vercel Environment Variables paneline yapıştır.',
        ],
      },
      {
        title: 'Altın Güvenlik Kuralı: Frontend’e (Tarayıcıya) Asla Koyma!',
        badge: 'Kritik Kural',
        description:
          'Vite/React kodunda `VITE_GEMINI_API_KEY` gibi bir değişken kullanırsan bu anahtar derlenen JavaScript dosyasına gömülür ve herkes "İncele (DevTools)" ile anahtarını çalabilir!',
        bullets: [
          'Doğru Mimari: React uygulaması kendi Vercel Serverless Function ucuna (`/api/chat`) istek atar; gizli `GEMINI_API_KEY` sadece sunucu tarafında okunur.',
          'İstisna (BYOK): Kullanıcı kendi anahtarını ayarlardan kendi tarayıcısına giriyorsa senin anahtarın riske girmez.',
        ],
        codeSnippet: {
          label: 'Güvenli .env ve .gitignore Kurulumu',
          code: `# .env.local (ASLA GitHub'a gönderme!)
GEMINI_API_KEY=AIzaSy...gizli_anahtarin

# .gitignore içinde mutlaka olmalı:
.env
.env.local
.env*.local`,
        },
      },
    ],
    quiz: [
      {
        id: 'ais-a-q1',
        question: 'Kendi Gemini API anahtarını herkese açık bir Vercel web sitesinde güvenle kullanmanın doğru yolu nedir?',
        options: [
          'Anahtarı doğrudan `App.tsx` içine sabit metin olarak yazmak',
          'Anahtarı Vercel Environment Variables’a koyup bir Serverless Function (`/api/...`) üzerinden çağırmak',
          'Anahtarı README.md içine not almak',
          'Anahtarı `VITE_` önekiyle tarayıcıya gömmek',
        ],
        correctIndex: 1,
        explanation:
          'Serverless Function sunucu tarafında çalışır; böylece `GEMINI_API_KEY` asla kullanıcının tarayıcısına gönderilmez.',
      },
      {
        id: 'ais-a-q2',
        question: 'Yerel geliştirme sırasında `.env.local` dosyasının yanlışlıkla GitHub’a yüklenmesini ne engeller?',
        options: [
          'Dosyayı `.gitignore` listesine eklemek',
          'Dosya adını büyük harfle yazmak',
          'Bilgisayarın sesini kısmak',
          'Tarayıcı önbelleğini temizlemek',
        ],
        correctIndex: 0,
        explanation:
          '`.gitignore` dosyasına `.env` ve `.env.local` eklemek Git’in bu dosyaları asla takip etmemesini garanti eder.',
      },
      {
        id: 'ais-a-q3',
        question: 'Yanlışlıkla bir API anahtarını herkese açık (Public) bir GitHub deposuna push edersen ilk yapman gereken nedir?',
        options: [
          'Sadece yeni commit’te silip anahtarı aynı bırakmak',
          'Derhal Google AI Studio panelinden o anahtarı iptal (revoke/delete) edip yenisini oluşturmak',
          'Hiçbir şey yapmamak',
          'Repo adını değiştirmek',
        ],
        correctIndex: 1,
        explanation:
          'Git geçmişinden silsen bile botlar saniyeler içinde sızan anahtarı yakalar; anahtar derhal iptal edilip yenilenmelidir.',
      },
    ],
    realMission: {
      title: '.gitignore Güvenlik Kontrolü & API Anahtarı Hazırlığı',
      goal: 'AI Studio’da API Key ekranını tanı ve mevcut projenin `.gitignore` dosyasının `.env` sızıntısına karşı korumalı olduğundan emin ol.',
      copyablePrompt:
        'Bu projedeki .gitignore dosyasını kontrol et; .env, .env.local ve node_modules kurallarının eksiksiz olduğunu doğrula.',
      steps: [
        'aistudio.google.com/apikey sayfasını aç ve API anahtarı oluşturma ekranını incele.',
        'Yukarıdaki promptu Antigravity’de çalıştırarak projenin gizli dosya korumasını kontrol et.',
        'Bu modüldeki İnteraktif Uygulama sekmesinde 4 güvenlik denetimi vakasını tamamla.',
      ],
      expectedOutcome:
        'İleride yapay zekâ destekli bir uygulama yayınladığında API anahtarını sıfır sızıntı riskiyle yönetebilirsin.',
    },
  },
];
