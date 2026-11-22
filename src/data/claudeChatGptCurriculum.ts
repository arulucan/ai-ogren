import { CurriculumModule } from '../types/learning';

export const CLAUDE_CHATGPT_CURRICULUM: CurriculumModule[] = [
  {
    id: 'cc-claude-basics',
    track: 'claude-chatgpt',
    number: 1,
    title: 'Claude (Anthropic): Modeller, Projects & Artifacts',
    shortTitle: 'Claude, Projects & Artifacts',
    subtitle: 'Haiku/Sonnet/Opus seçimi, Claude Projects ile kalıcı bilgi tabanı ve canlı Artifacts önizleme',
    durationMinutes: 9,
    xpReward: 265,
    iconName: 'MessageSquareCode',
    accentColor: 'amber',
    summary:
      'Anthropic tarafından geliştirilen Claude; doğal ve net anlatımı, güçlü yazılım mimarisi kavrayışı, Claude Projects (kalıcı bağlam) ve tarayıcıda anında çalışan Artifacts özelliğiyle geliştiricilerin favori araçlarından biridir.',
    concepts: [
      {
        title: 'Claude Model Ailesi: Haiku, Sonnet ve Opus',
        badge: 'Hız vs. Derinlik',
        description:
          'Claude üç ana hız ve yetenek katmanında sunulur:',
        bullets: [
          'Haiku: En hızlı ve ekonomik — hızlı özetleme, sınıflandırma ve anlık yanıt gerektiren işler için.',
          'Sonnet: Günlük yazılım geliştirme, analiz ve yazarlık için en dengeli ana model (fiyat/performans yıldızı).',
          'Opus: En derin akıl yürütme ve karmaşık mimari tasarım kararları için üst seviye model.',
        ],
        microCheck: {
          question: 'Günlük kodlama ve teknik içerik üretiminde hız ile kalite arasında en iyi dengeyi sunan Claude modeli hangisidir?',
          options: ['Sonnet', 'Yalnızca Haiku', 'Sadece JSON'],
          correctIndex: 0,
          explanation: 'Sonnet serisi günlük geliştirme, analiz ve kodlama işlerinde en dengeli fiyat/performans seçeneğidir.',
        },
      },
      {
        title: 'Claude Projects (Kalıcı Proje Bağlamı)',
        badge: 'Tekrar Etmeden Çalış',
        description:
          'Her yeni sohbette aynı marka kurallarını veya dokümanları tekrar yüklemek yerine bir Claude Project oluşturursun:',
        bullets: [
          'Project Knowledge alanına PDF’ler, kod şablonları ve stil rehberleri yüklersin.',
          'Project Instructions alanına tüm sohbetlerde geçerli kurallar eklersin (AI Studio’daki System Instructions ve Antigravity’deki GEMINI.md mantığına çok benzer).',
        ],
        microCheck: {
          question: 'Claude Projects kullanmanın normal bir sohbetten temel farkı nedir?',
          options: [
            'Yüklenen bilgi dosyaları ve kurallar o projedeki tüm sohbetlerde kalıcı olarak hazır bulunur',
            'İnternet olmadan çalışır',
            'Sadece görsel üretir',
          ],
          correctIndex: 0,
          explanation: 'Claude Projects, dokümanları ve özel talimatları projeye bağlı tüm sohbetlerde otomatik bağlam olarak sunar.',
        },
      },
      {
        title: 'Claude Artifacts (Canlı İnteraktif Önizleme)',
        badge: 'Anında Görsel Çıktı',
        description:
          'Claude bir React bileşeni, SVG grafik, HTML sayfası veya Mermaid diyagramı yazdığında bunu sohbetin yanındaki ayrı pencerede canlı çalıştırır.',
        tip: 'Hızlı bir infografik, akış diyagramı veya tek sayfalık etkileşimli hesaplayıcı prototiplemek için Claude Artifacts harikadır.',
        microCheck: {
          question: 'Claude’un yazdığı bir React bileşenini veya Mermaid diyagramını sohbetin yanında canlı olarak çalıştıran özellik hangisidir?',
          options: ['Artifacts', 'git stash', 'Temperature'],
          correctIndex: 0,
          explanation: 'Claude Artifacts, üretilen kod, belge ve diyagramları yan pencerede anında etkileşimli olarak görüntüler.',
        },
      },
    ],
    quiz: [
      {
        id: 'cc-cb-q1',
        question: 'Aynı şirketin 5 farklı raporunu her yeni sohbette tekrar yüklemeden Claude’un hatırlamasını sağlamak için hangi özelliği kullanırsın?',
        options: ['Claude Projects', 'Tek seferlik gizli pencere', 'Temperature 2.0', 'git ignore'],
        correctIndex: 0,
        explanation:
          'Claude Projects içindeki Project Knowledge alanı belgeleri tüm proje sohbetlerinde kalıcı bağlam olarak tutar.',
      },
      {
        id: 'cc-cb-q2',
        question: 'Claude model ailesinde en karmaşık mimari akıl yürütme için tasarlanan en üst katman hangisidir?',
        options: ['Haiku', 'Opus', 'Nano', 'Mini'],
        correctIndex: 1,
        explanation:
          'Opus, Anthropic’in en yüksek akıl yürütme ve derin analiz kapasitesine sahip üst seviye modelidir.',
      },
      {
        id: 'cc-cb-q3',
        question: 'Claude Artifacts ile hangi tür çıktılar yan pencerede doğrudan görselleştirilebilir?',
        options: [
          'Yalnızca ses dosyaları',
          'HTML/React arayüzleri, SVG çizimler, Mermaid diyagramları ve yapılandırılmış belgeler',
          'Yalnızca Windows .exe kurucuları',
          'Sadece terminal şifreleri',
        ],
        correctIndex: 1,
        explanation:
          'Artifacts; interaktif React/HTML bileşenlerini, SVG’leri, Mermaid diyagramlarını ve uzun belgeleri canlı önizleme olarak sunar.',
      },
    ],
    realMission: {
      title: 'Claude’da İlk Project & Artifact Denemesi',
      goal: 'claude.ai üzerinde ücretsiz hesabınla basit bir Mermaid diyagramı veya etkileşimli kart Artifact’i üret.',
      copyablePrompt:
        'GitHub ve Vercel yayınlama akışını gösteren sade, Türkçe bir Mermaid akış diyagramı oluştur.',
      steps: [
        'Tarayıcıda claude.ai adresini aç ve yukarıdaki promptu gönder.',
        'Sağ pencerede açılan Artifact diyagramını incele ve "Buna Preview Deployment adımını da ekle" diyerek revize et.',
        'Claude Artifacts ile Antigravity Artifacts (uygulama planı belgeleri) arasındaki benzerliği gözlemle.',
      ],
      expectedOutcome:
        'Claude’un canlı görsel üretim ve yan pencere revizyon akışını deneyimlemiş olursun.',
    },
  },
  {
    id: 'cc-claude-code',
    track: 'claude-chatgpt',
    number: 2,
    title: 'Claude Code & Antigravity Ortak Dili (CLAUDE.md ↔ GEMINI.md & MCP)',
    shortTitle: 'Claude Code & Ortak MCP',
    subtitle: 'Terminal tabanlı ajanik kodlama, kural dosyalarının taşınabilirliği ve ortak MCP standardı',
    durationMinutes: 10,
    xpReward: 265,
    iconName: 'Terminal',
    accentColor: 'orange',
    summary:
      'İyi haber: Antigravity’de öğrendiğin neredeyse her ileri seviye kavram (proje kural dosyaları, Slash komutları, Subagent’lar ve MCP) Claude Code’da da birebir paralel çalışır! Birinde ustalaşmak diğerini 10 dakikada çözmeni sağlar.',
    concepts: [
      {
        title: 'CLAUDE.md ↔ GEMINI.md / AGENTS.md Paralelliği',
        badge: 'Bir Kez Öğren, Her Yerde Kullan',
        description:
          'Modern AI kodlama ajanları proje kurallarını depo kökündeki Markdown dosyalarından okur:',
        bullets: [
          'Antigravity: `GEMINI.md`, `AGENTS.md` ve `.agents/rules/*.md` dosyalarını okur.',
          'Claude Code: Depo kökündeki `CLAUDE.md` (ve alt klasörlerdeki yerel `CLAUDE.md`) dosyalarını okur.',
          'İpucu: Ekip projesinde genel standartları `AGENTS.md` içinde tutmak birden fazla AI aracının aynı kurallara uymasını kolaylaştırır.',
        ],
        microCheck: {
          question: 'Antigravity’deki `GEMINI.md` proje kuralları dosyasının Claude Code’daki birebir karşılığı nedir?',
          options: ['CLAUDE.md', 'index.html', 'package-lock.json'],
          correctIndex: 0,
          explanation: 'Claude Code, proje standartlarını ve çalışma kurallarını depo kökündeki `CLAUDE.md` dosyasından okur.',
        },
      },
      {
        title: 'MCP (Model Context Protocol): Evrensel Köprü',
        badge: 'Ortak Standart',
        description:
          'Anthropic’in başlattığı ve Google Antigravity’nin de tam desteklediği MCP standardı, AI dünyasının "USB-C" portu gibidir:',
        bullets: [
          'Bir kez kurduğun MCP sunucusunu (Figma, GitHub, PostgreSQL, Notion vb.) hem Antigravity’de hem Claude’da aynı mantıkla kullanabilirsin.',
          'Böylece araç değiştirsen bile harici entegrasyon bilgin ve kurulumların boşa gitmez.',
        ],
        microCheck: {
          question: 'MCP (Model Context Protocol) neden yapay zekâ araçlarının "USB-C" standardına benzetilir?',
          options: [
            'Aynı harici araç/sunucu entegrasyonunu hem Antigravity hem Claude gibi farklı ajanlarda ortak kullanabildiğin için',
            'Sadece kablo ile bağlandığı için',
            'Yalnızca görsel sıkıştırdığı için',
          ],
          correctIndex: 0,
          explanation: 'MCP açık ve evrensel bir protokoldür; bir MCP sunucusu standart destekleyen tüm ajanlarla çalışır.',
        },
      },
      {
        title: 'Antigravity CLI (`agy`) vs. Claude Code (`claude`)',
        badge: 'Terminal Ajanları',
        description:
          'Her iki araç da terminalde etkileşimli olarak dosya okur, diff gösterir, komut çalıştırır ve onay ister. Antigravity ek olarak yerleşik IDE, Masaüstü 2.0 Auxiliary Pane ve yerleşik Browser Subagent ile tümleşik bir çalışma alanı sunar.',
        microCheck: {
          question: 'Antigravity’de öğrendiğin Slash komutları, kural dosyaları ve izin onay mantığı Claude Code’a geçerken ne sağlar?',
          options: [
            'Kavramlar birebir paralel olduğu için sıfırdan başlamadan çok hızlı adapte olursun',
            'Hiçbir benzerlik yoktur',
            'Sadece Python projelerinde geçerlidir',
          ],
          correctIndex: 0,
          explanation: 'Ajanik kodlama desenleri (kurallar, beceriler, MCP, izin politikaları) iki ekosistemde de ortak mimariye dayanır.',
        },
      },
    ],
    quiz: [
      {
        id: 'cc-cc-q1',
        question: 'Hem Antigravity hem de Claude Code’un harici veritabanı veya Figma gibi araçlara bağlanmak için ortaklaşa desteklediği açık standart hangisidir?',
        options: ['MCP (Model Context Protocol)', 'FTP', 'SMTP', 'ZIP'],
        correctIndex: 0,
        explanation:
          'MCP, ajanların harici araç ve veri kaynaklarına standart biçimde bağlanmasını sağlayan ortak protokoldür.',
      },
      {
        id: 'cc-cc-q2',
        question: 'Aşağıdaki eşleştirmelerden hangisi doğrudur?',
        options: [
          'Antigravity: GEMINI.md ↔ Claude Code: CLAUDE.md',
          'Antigravity: package.json ↔ Claude Code: README.txt',
          'Antigravity: .gitignore ↔ Claude Code: index.css',
          'Hiçbiri',
        ],
        correctIndex: 0,
        explanation:
          'Her iki araç da proje kurallarını ve kodlama standartlarını kendi kök Markdown dosyalarından (`GEMINI.md` / `CLAUDE.md`) okur.',
      },
      {
        id: 'cc-cc-q3',
        question: 'Birden fazla AI kodlama aracı kullanan bir ekipte kuralların tutarlı kalması için en iyi pratik nedir?',
        options: [
          'Kuralları kısa, net Markdown maddeleri halinde sürüm kontrolünde (Git) tutmak',
          'Kuralları sadece sözlü anlatmak',
          'Her gün dosyaları silmek',
          'API anahtarlarını kural dosyasına yazmak',
        ],
        correctIndex: 0,
        explanation:
          'Git deposunda tutulan net kural dosyaları (`GEMINI.md`, `AGENTS.md`, `CLAUDE.md`) tüm ekip ve ajanlar için ortak kaynak oluşturur.',
      },
    ],
    realMission: {
      title: 'Kendi Proje Kurallarını Çoklu-Ajan Uyumlu Yap',
      goal: 'Bu modüldeki Çevirici Laboratuvarında aynı kuralın `GEMINI.md` ve `CLAUDE.md` karşılıklarını kıyasla.',
      copyablePrompt:
        'Bu proje için hem Antigravity hem diğer AI ajanların rahatça anlayabileceği sade, 5 maddelik bir AGENTS.md taslağı öner.',
      steps: [
        'İnteraktif Uygulama sekmesinde `GEMINI.md ↔ CLAUDE.md` dönüştürücüsünü ve ortak MCP yapısını test et.',
        'Yukarıdaki promptu Antigravity’de deneyip çıktıyı incele.',
        'Hangi kuralların evrensel (dil, test, build), hangilerinin araca özel olduğunu not al.',
      ],
      expectedOutcome:
        'Tek bir araca bağlı kalmadan modern AI kodlama standartlarını evrensel olarak yönetebilirsin.',
    },
  },
  {
    id: 'cc-chatgpt-basics',
    track: 'claude-chatgpt',
    number: 3,
    title: 'ChatGPT (OpenAI): Canvas, Custom GPTs & Deep Research',
    shortTitle: 'ChatGPT, Canvas & GPTs',
    subtitle: 'Reasoning (akıl yürütme) modelleri, yan yana Canvas düzenleme, Custom GPTs ve Deep Research',
    durationMinutes: 9,
    xpReward: 265,
    iconName: 'Bot',
    accentColor: 'emerald',
    summary:
      'OpenAI’ın ChatGPT ekosistemi; genel araştırma, yazarlık, derin web taraması (Deep Research), yan yana metin/kod düzenleme (Canvas) ve tekrarlayan işler için paylaşılabilir Custom GPT’lerle günlük üretkenlikte çok güçlüdür.',
    concepts: [
      {
        title: 'Hızlı Modeller vs. Reasoning (Akıl Yürütme) Modelleri',
        badge: 'Doğru Modu Seç',
        description:
          'ChatGPT’de her soru için aynı düşünme derinliği gerekmez:',
        bullets: [
          'Standart Hızlı Modeller: Günlük sohbet, çeviri, hızlı beyin fırtınası, görsel anlama ve sesli mod için.',
          'Reasoning Modelleri: Yanıt vermeden önce adım adım düşünen; karmaşık algoritma, matematik, hukuk/strateji analizi ve zor hata ayıklama için ideal modeller.',
        ],
        microCheck: {
          question: 'Zor bir algoritma tasarımında veya çok adımlı bir mantık probleminde hangi model türü daha yüksek doğruluk sunar?',
          options: ['Reasoning (Akıl Yürütme) modelleri', 'En kısa yanıtlı rastgele mod', 'Yalnızca sesli mod'],
          correctIndex: 0,
          explanation: 'Reasoning modelleri yanıt vermeden önce içsel akıl yürütme adımları çalıştırarak karmaşık problemlerde hata oranını düşürür.',
        },
      },
      {
        title: 'ChatGPT Canvas (Yan Yana Metin & Kod Düzenleme)',
        badge: 'Etkileşimli Editör',
        description:
          'Uzun bir makale, iş planı veya tek dosyalık bir kod üzerinde çalışırken sohbet geçmişinde kaybolmak yerine Canvas açılır:',
        bullets: [
          'Belgenin sadece belirli bir paragrafını seçip "Bunu daha sadeleştir" veya "Örnek ekle" diyebilirsin.',
          'Kod modunda tek tıkla "Yorum ekle", "Hata ayıkla" ve "Farklı dile çevir" kısayolları bulunur.',
        ],
        microCheck: {
          question: 'ChatGPT Canvas’ın klasik sohbet penceresine göre en büyük avantajı nedir?',
          options: [
            'Belgenin tamamını baştan yazdırmadan seçili paragraf veya kod satırlarını yan pencerede doğrudan düzenleyebilmek',
            'Projeyi Vercel’e otomatik yüklemek',
            'Bilgisayardaki tüm klasörleri silmek',
          ],
          correctIndex: 0,
          explanation: 'Canvas, uzun metin ve kodları yan yana düzenleme imkânı vererek hedefli revizyonları çok kolaylaştırır.',
        },
      },
      {
        title: 'Custom GPTs & Deep Research',
        badge: 'Paket Asistan & Derin Rapor',
        description:
          'Tekrarlayan iş akışları ve kapsamlı pazar/teknoloji araştırmaları için iki güçlü özellik:',
        bullets: [
          'Custom GPTs: Özel sistem yönergesi + bilgi dosyalarıyla (PDF/CSV) paketlenmiş, tek linkle ekibinle paylaşabileceğin uzman asistanlar.',
          'Deep Research: Onlarca web sayfasını otonom tarayıp karşılaştırmalı, kaynakçalı uzun araştırma raporları üretir (pazar analizi, teknoloji kıyaslama için mükemmeldir).',
        ],
        microCheck: {
          question: 'Onlarca farklı web kaynağını tarayıp kaynakçalı, kapsamlı bir teknoloji karşılaştırma raporu hazırlamak için hangi özellik idealdir?',
          options: ['Deep Research', 'git commit', '.gitignore'],
          correctIndex: 0,
          explanation: 'Deep Research arka planda çok sayıda web kaynağını sentezleyerek derin ve kaynaklı raporlar oluşturur.',
        },
      },
    ],
    quiz: [
      {
        id: 'cc-cg-q1',
        question: 'Uzun bir proje teklif metninde yalnızca 3. paragrafı seçip tonunu daha profesyonel hale getirmek için ChatGPT’nin hangi özelliği en uygundur?',
        options: ['Canvas', 'git init', 'Terminal Sandbox', 'CNAME'],
        correctIndex: 0,
        explanation:
          'Canvas, metnin veya kodun yalnızca seçili kısmına hedefli düzenleme yapmanı sağlayan yan yana editördür.',
      },
      {
        id: 'cc-cg-q2',
        question: 'Ekibinle tek bir bağlantı üzerinden paylaşabileceğin, kendi kılavuz PDF’lerinle eğitilmiş özel bir "İçerik Editörü Asistanı" oluşturmak için ne kullanırsın?',
        options: ['Custom GPT', 'git branch', 'npm build', 'DNS A kaydı'],
        correctIndex: 0,
        explanation:
          'Custom GPTs, özel talimatları ve referans dosyalarını paylaşılabilir tek bir asistan paketinde toplar.',
      },
      {
        id: 'cc-cg-q3',
        question: 'ChatGPT tarayıcı arayüzü ile Antigravity IDE/App 2.0 arasındaki en temel pratik fark nedir?',
        options: [
          'Antigravity bilgisayarındaki gerçek proje klasörünü doğrudan düzenleyip terminal komutları ve testler çalıştırabilir; ChatGPT web ise daha çok sohbet/Canvas tabanlıdır',
          'ChatGPT Türkçe bilmez',
          'Antigravity sadece PDF okur',
          'Arada hiçbir fark yoktur',
        ],
        correctIndex: 0,
        explanation:
          'Antigravity tam yerel Workspace erişimi, çoklu dosya düzenleme, Sandbox terminal ve otomasyonla uçtan uca yazılım üretir.',
      },
    ],
    realMission: {
      title: 'Canvas & Deep Research ile Hazırlık, Antigravity ile Uygulama',
      goal: 'ChatGPT’de bir içerik/fikir taslağı oluşturup bunu Antigravity projesinde nasıl besleyebileceğini gör.',
      copyablePrompt:
        'Yeni bir SaaS fikir doğrulama kontrol listesi hazırla; 5 kısa madde olsun ve her maddede ölçülebilir bir metrik bulunsun.',
      steps: [
        'İnteraktif Uygulama sekmesinde ChatGPT Canvas aksiyonlarını (Kısalt, Kod İncele, Custom GPT) test et.',
        'ChatGPT’de yukarıdaki promptu deneyip çıkan taslağı Canvas içinde 1 kez revize et.',
        'Araştırma/fikir aşamasında ChatGPT, prototipte AI Studio, kodlamada Antigravity döngüsünü kafanda oturt.',
      ],
      expectedOutcome:
        'ChatGPT’yi yalnızca genel soru-cevap değil, yapılandırılmış bir araştırma ve metin atölyesi olarak kullanırsın.',
    },
  },
  {
    id: 'cc-ai-matrix',
    track: 'claude-chatgpt',
    number: 4,
    title: 'Çoklu AI Stratejisi: Hangi İş İçin Hangi Araç?',
    shortTitle: '4’lü AI Seçim Matrisi',
    subtitle: 'Antigravity + Google AI Studio + Claude + ChatGPT dörtlüsünü profesyonelce birlikte kullanma',
    durationMinutes: 8,
    xpReward: 265,
    iconName: 'Compass',
    accentColor: 'violet',
    summary:
      'En verimli üreticiler tek bir yapay zekâ aracına fanatikçe bağlanmaz; her aracın "süper gücünü" bilip işi doğru araca yönlendirir. Bu modül tüm öğrendiklerini tek bir karar matrisinde birleştirir.',
    concepts: [
      {
        title: '4 Büyük Aracın Süper Güçleri',
        badge: 'Stratejik Harita',
        description: 'Her aracın parladığı ana alan:',
        bullets: [
          'Google Antigravity: Çok dosyalı gerçek yazılım projeleri, terminal testleri, Git/Vercel yayınlama, subagent/swarm ve zamanlanmış otomasyon.',
          'Google AI Studio: Ücretsiz cömert Gemini API kotası, büyük video/PDF analizi, Structured Output testi, Vibe Coding (Build) ve Live API.',
          'Claude & Claude Code: Doğal ve temiz yazarlık/kod mimarisi, Claude Projects bilgi tabanı, canlı Artifacts diyagramları ve terminal kodlama.',
          'ChatGPT: Deep Research ile derin pazar araştırması, Canvas ile uzun metin düzenleme, sesli sohbet ve ekipçe paylaşılan Custom GPT’ler.',
        ],
        microCheck: {
          question: 'Yerel bilgisayarındaki 25 dosyalık bir React projesini düzenleyip `npm run build` ile doğrulayıp GitHub/Vercel’e hazırlamak için en ideal araç hangisidir?',
          options: ['Google Antigravity (veya Claude Code)', 'Sadece görsel düzenleyici', 'Yalnızca PDF okuyucu'],
          correctIndex: 0,
          explanation: 'Çok dosyalı proje düzenleme, terminalde derleme/test ve Git yönetimi ajanik kodlama ortamlarının (Antigravity / Claude Code) süper gücüdür.',
        },
      },
      {
        title: 'Örnek Bir "Uçtan Uca" Ürün Çıkarma Günü',
        badge: 'Gerçek Hayat Akışı',
        description:
          'Bir fikri tek günde sıfırdan canlı web sitesine dönüştüren 4 adımlı profesyonel akış:',
        bullets: [
          '1. Araştırma (ChatGPT Deep Research / Claude): Rakip analizi ve net ürün gereksinim metni çıkar.',
          '2. Prompt & Veri Testi (Google AI Studio): Uygulamanın kullanacağı Gemini promptunu, Structured Output şemasını ve ücretsiz API Key’ini hazırla.',
          '3. İnşa & Test (Google Antigravity): `/plan` ile mimariyi kur, kodu yaz, tarayıcıda ve sandbox’ta doğrula.',
          '4. Canlı Yayın (GitHub + Vercel): `git push` ile ücretsiz olarak dünyaya aç ve her güncellemede otomatik yayınla!',
        ],
        microCheck: {
          question: 'Uygulamanda kullanacağın Gemini JSON şemasını hızla test edip ücretsiz API anahtarı almak için bu 4’lü zincirde hangi durak kullanılır?',
          options: ['Google AI Studio', 'Vercel DNS paneli', 'Git Merge Conflict'],
          correctIndex: 0,
          explanation: 'Google AI Studio, Structured Output şemalarını anında test etmek ve ücretsiz Gemini API anahtarı almak için tasarlanmıştır.',
        },
      },
    ],
    comparison: {
      title: '4 Büyük Yapay Zekâ Aracı Karşılaştırma Matrisi',
      headers: ['İhtiyaç', 'En Güçlü 1. Tercih', 'Güçlü Alternatif'],
      rows: [
        {
          feature: 'Çok dosyalı gerçek uygulama geliştirme & test',
          col1: 'Google Antigravity',
          col2: 'Claude Code',
        },
        {
          feature: 'Ücretsiz API Key, Video/PDF & JSON Şema testi',
          col1: 'Google AI Studio',
          col2: 'Claude Projects',
        },
        {
          feature: 'Derin web/pazar araştırması & kaynakçalı rapor',
          col1: 'ChatGPT Deep Research',
          col2: 'AI Studio Grounding',
        },
        {
          feature: 'Uzun metin revizyonu & canlı diyagram prototipi',
          col1: 'Claude Artifacts / ChatGPT Canvas',
          col2: 'AI Studio Build',
        },
      ],
    },
    quiz: [
      {
        id: 'cc-mx-q1',
        question: '2 saatlik bir eğitim videosunu yükleyip dakika dakika özet çıkarmak ve ardından ücretsiz API anahtarı almak için en ideal araç hangisidir?',
        options: ['Google AI Studio', 'Vercel CLI', 'git status', '.gitignore'],
        correctIndex: 0,
        explanation:
          'Google AI Studio, devasa multimodal bağlamı (video/ses/PDF) ve ücretsiz Gemini API anahtarı ile bu iş için biçilmiş kaftandır.',
      },
      {
        id: 'cc-mx-q2',
        question: 'Bir fikirden canlı web sitesine giden en sağlıklı modern üretim zinciri hangi sırayla akar?',
        options: [
          'Araştırma/Plan → AI Studio Prompt/API Testi → Antigravity Geliştirme → GitHub & Vercel Canlı Yayın',
          'Önce Vercel’e boş klasör at → Sonra fikir düşün',
          'Sadece tek dosyada her şeyi kopyala-yapıştır yap',
          'Git olmadan USB bellekle dağıt',
        ],
        correctIndex: 0,
        explanation:
          'Her aracın güçlü olduğu aşamayı sırayla kullanmak hızı, kaliteyi ve sürdürülebilirliği en üst düzeye çıkarır.',
      },
      {
        id: 'cc-mx-q3',
        question: 'Aynı anda hem Antigravity hem Claude Code kullanan bir geliştiriciye ortak proje kuralları ve MCP bilgisinin sağladığı en büyük kazanç nedir?',
        options: [
          'Araçtan bağımsız kalıcı mühendislik yetkinliği ve hızlı geçiş esnekliği',
          'Sadece daha büyük dosya boyutu',
          'İnternetsiz çalışma zorunluluğu',
          'Hiçbir kazanç sağlamaz',
        ],
        correctIndex: 0,
        explanation:
          'Kural dosyaları, bağlam yönetimi, MCP ve Git/Vercel akışı evrensel becerilerdir; tüm modern AI ekosisteminde değerini korur.',
      },
    ],
    realMission: {
      title: 'Kendi Kişisel AI Araç Çantanı Belirle',
      goal: '6 senaryoluk 4’lü AI Matris meydan okumasını tamamlayıp kendi günlük iş akışını netleştir.',
      copyablePrompt:
        'Benim günlük iş akışım için (Antigravity + Google AI Studio + Claude + ChatGPT + GitHub/Vercel) tek sayfalık kişisel bir "Hangi İşi Nerede Yaparım?" rehberi hazırla.',
      steps: [
        'İnteraktif Uygulama sekmesindeki 6 senaryoluk AI Araç Seçim Meydan Okumasını %100 doğru tamamla.',
        'Yukarıdaki promptu Antigravity’de çalıştırıp kendi çalışma alanına özel rehberini oluştur.',
        'Artık tüm 4 parkuru kavradığına göre projemizi GitHub + Vercel’e canlı yayınlamaya hazırsın!',
      ],
      expectedOutcome:
        'Hangi problemle karşılaşırsan karşılaş saniyeler içinde en doğru AI ve bulut aracını seçebilen bir bakış açısı kazanırsın.',
    },
  },
];
