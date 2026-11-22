export interface GlossaryEntry {
  term: string;
  aliases?: string[];
  turkish: string;
  explanation: string;
}

export const GLOSSARY_ENTRIES: GlossaryEntry[] = [
  {
    term: 'Progressive Disclosure',
    turkish: 'Kademeli Yükleme',
    explanation:
      'Tüm beceri (Skill) içeriklerini baştan belleğe doldurmak yerine, önce sadece ad ve açıklamasını gösterip tam içeriği yalnızca gerektiğinde yükleme yöntemi.',
  },
  {
    term: 'Tool Execution Policy',
    turkish: 'Araç Çalıştırma Politikası',
    explanation:
      'Ajanın terminal komutlarını onay istemeden mi yoksa senden izin alarak mı çalıştıracağını belirleyen güvenlik ayarı.',
  },
  {
    term: 'Inline Code Lenses',
    turkish: 'Satır İçi Kod Aksiyonları',
    explanation:
      'Editörde fonksiyon veya sınıfların hemen üzerinde beliren "Açıkla", "Test Yaz", "Refactor" gibi tek tıkla tetiklenen ajan düğmeleri.',
  },
  {
    term: 'Inline Command',
    turkish: 'Satır İçi Komut',
    explanation:
      'Editörde seçili bir kod bloğu üzerinde Ctrl+I (macOS: ⌘+I) ile anında hedefli düzenleme veya yeni kod üretme özelliği.',
  },
  {
    term: 'Context Window',
    turkish: 'Bağlam Penceresi',
    explanation:
      'Yapay zekânın tek bir sohbette aynı anda okuyup hatırlayabildiği toplam metin, dosya ve konuşma kapasitesi.',
  },
  {
    term: 'Auxiliary Pane',
    turkish: 'Yardımcı Yan Panel',
    explanation:
      'Antigravity 2.0 arayüzünde alt ajanları, Artifact belgelerini, değişen dosyaları ve terminalleri canlı izlediğin yan panel.',
  },
  {
    term: 'Scheduled Tasks',
    turkish: 'Zamanlanmış Görevler',
    explanation:
      'Belirli saatlerde düzenli (Cron) veya gecikmeli tek seferlik otomatik çalışan arka plan ajan görevleri.',
  },
  {
    term: 'Model Context Protocol',
    aliases: ['MCP'],
    turkish: 'Model Bağlam Protokolü',
    explanation:
      'Ajanı veritabanları, Figma, Jira veya özel API’ler gibi harici servislere standart araçlarla bağlayan açık protokol.',
  },
  {
    term: 'BypassSandbox',
    turkish: 'Sandbox Dışı Çalıştırma',
    explanation:
      'İnternet erişimi veya sistem dışı işlem gerektiren tek bir komutu, kullanıcının açık onayıyla izole alan dışına çıkararak çalıştırma modu.',
  },
  {
    term: 'Supercomplete',
    turkish: 'Gelişmiş Çok Satırlı Tamamlama',
    explanation:
      'Sadece imlecin ucuna ekleme yapmak yerine, silmeler dahil büyük çok satırlı kod değişikliklerini yüzen pencerede öneren akıllı tamamlama.',
  },
  {
    term: 'Autocomplete',
    turkish: 'Otomatik Tamamlama',
    explanation:
      'Kod yazarken sonraki satırları veya ifadeleri tahmin edip Tab tuşuyla anında kabul etmeni sağlayan özellik.',
  },
  {
    term: 'Subagent',
    aliases: ['Subagents'],
    turkish: 'Alt Ajan',
    explanation:
      'Ana sohbeti kalabalıklaştırmadan arka planda araştırma, tarayıcı testi veya görsel üretimi gibi uzman işleri yürüten yardımcı ajan.',
  },
  {
    term: 'Workspace',
    turkish: 'Çalışma Alanı',
    explanation:
      'Ajanın üzerinde çalıştığı aktif proje klasörü ve bu klasöre ait dosyaların bütünü.',
  },
  {
    term: 'Artifact',
    aliases: ['Artifacts'],
    turkish: 'Yapılandırılmış Belge',
    explanation:
      'Ajanın uygulama planı, mimari rapor veya özet gibi inceleyip onaylayabileceğin özel Markdown çıktıları.',
  },
  {
    term: 'Sandbox',
    turkish: 'Güvenli İzole Ortam (Kum Havuzu)',
    explanation:
      'Komutların çalışma alanı dışına ve internete erişemeden, bilgisayara zarar verme riski olmadan çalıştırıldığı korumalı alan.',
  },
  {
    term: 'Allowlist',
    turkish: 'İzin Verilenler Listesi',
    explanation:
      'Her seferinde onay sormadan güvenle çalışmasına izin verilen komutların veya web adreslerinin listesi.',
  },
  {
    term: 'Denylist',
    turkish: 'Yasaklılar Listesi',
    explanation:
      'Ajanın hiçbir koşulda çalıştırmasına izin verilmeyen engelli komut veya adreslerin listesi.',
  },
  {
    term: 'Frontmatter',
    aliases: ['YAML frontmatter'],
    turkish: 'Üst Bilgi Bloğu',
    explanation:
      'Markdown dosyalarının en başında `---` çizgileri arasında yer alan ve `name`, `description` gibi ayarları tutan başlık bölümü.',
  },
  {
    term: 'Deduplication',
    turkish: 'Tekilleştirme',
    explanation:
      'Aynı kural veya dosyanın birden fazla kez bağlama eklenip yer kaplamasını otomatik olarak önleme işlemi.',
  },
  {
    term: 'Precedence',
    turkish: 'Öncelik Sırası',
    explanation:
      'Aynı isimde birden fazla kural veya beceri çakıştığında hangisinin geçerli olacağını belirleyen sıralama.',
  },
  {
    term: 'Override',
    turkish: 'Üzerine Yazma (Ezme)',
    explanation:
      'Proje düzeyindeki bir ayarın, genel (global) ayarın yerine geçerek öncelikli uygulanması.',
  },
  {
    term: 'Refactor',
    turkish: 'Kodu Yeniden Düzenleme',
    explanation:
      'Kodun dış davranışını değiştirmeden iç yapısını daha temiz, okunabilir ve bakımı kolay hale getirme işlemi.',
  },
  {
    term: 'Diff',
    turkish: 'Kod Farkı',
    explanation:
      'Bir dosyada yapılan eklemelerin (yeşil) ve silmelerin (kırmızı) yan yana veya satır içi gösterimi.',
  },
  {
    term: 'Mention',
    aliases: ['Mentions'],
    turkish: 'Etiketleme (@ ile Bağlam Ekleme)',
    explanation:
      'Sohbette `@` yazarak belirli bir dosyayı, klasörü, terminali veya eski sohbeti doğrudan ajanın dikkatine sunma yöntemi.',
  },
  {
    term: 'Multimodal',
    turkish: 'Çok Modlu',
    explanation:
      'Yapay zekânın yalnızca metni değil; ekran görüntüsü, diyagram, PDF gibi görsel ve medya içeriklerini de anlayabilmesi.',
  },
  {
    term: 'Prompt',
    aliases: ['Promptu', 'Promptlar'],
    turkish: 'İstem / Talimat',
    explanation:
      'Yapay zekâ ajanına ne yapmasını istediğini anlattığın yazılı komut veya görev tarifi.',
  },
  {
    term: 'Swarm',
    turkish: 'Paralel Ajan Ekibi (Sürü)',
    explanation:
      'Birden fazla uzman ajanın ortak bir mesaj panosu üzerinden haberleşerek aynı projede eş zamanlı çalışması.',
  },
  {
    term: 'Workflow',
    aliases: ['Workflows'],
    turkish: 'Otomatik İş Akışı',
    explanation:
      'Çok sayıda bağımsız görevi kodla paralel olarak dağıtan, aşamalı çalıştıran ve sonuçları birleştiren süreç.',
  },
  {
    term: 'Fan-out',
    turkish: 'Paralel Görev Dağıtımı',
    explanation:
      'Büyük bir işi (örneğin 30 dosyayı taramayı) küçük parçalara bölüp aynı anda birden fazla ajana dağıtma tekniği.',
  },
  {
    term: 'Cron',
    turkish: 'Zamanlanmış Tekrarlayıcı',
    explanation:
      'Görevlerin belirli dakika, saat veya günlerde (ör. hafta içi her sabah 09:00) otomatik tetiklenmesini sağlayan 5 alanlı zaman formatı.',
  },
  {
    term: 'Polling',
    turkish: 'Sürekli Yoklama',
    explanation:
      'Bir işlemin bitip bitmediğini sürekli tekrar tekrar sorarak kontrol etme yöntemi (Antigravity bunu gereksiz kılar, bitince otomatik haber verir).',
  },
  {
    term: 'Streaming',
    turkish: 'Canlı Akış',
    explanation:
      'Ajanın yanıtını, düşüncelerini veya araç çağrılarını tüm işlem bitmeden parça parça ve anlık olarak ekrana yansıtması.',
  },
  {
    term: 'Read-Only',
    turkish: 'Salt-Okunur',
    explanation:
      'Dosyaları inceleyebilen ancak güvenlik gereği hiçbir dosyayı değiştiremeyen veya yazma komutu çalıştıramayan mod.',
  },
  {
    term: 'Runbook',
    turkish: 'Adım Adım İşlem Rehberi',
    explanation:
      'Tekrarlayan teknik bir sürecin (ör. sürüm yayınlama veya hata kontrolü) sırasıyla nasıl yapılacağını anlatan kılavuz.',
  },
  {
    term: 'Hook',
    aliases: ['Hooks'],
    turkish: 'Yaşam Döngüsü Kancası',
    explanation:
      'Ajan bir aracı çalıştırmadan hemen önce veya sonra otomatik olarak tetiklenen özel komut/betik.',
  },
  {
    term: 'Plugin',
    aliases: ['Plugins', 'Pluginler'],
    turkish: 'Eklenti Paketi',
    explanation:
      'Birbiriyle ilişkili beceri (Skill), kural (Rule) ve MCP ayarlarını tek seferde kurulabilir bir pakette toplayan yapı.',
  },
  {
    term: 'Token',
    turkish: 'Metin Birimi (Token)',
    explanation:
      'Yapay zekâ modellerinin metni işlerken kullandığı parça birimi (ortalama 1 kelime yaklaşık 1–2 token tutar).',
  },
  {
    term: 'CLI',
    turkish: 'Komut Satırı Arayüzü',
    explanation:
      'Fare ve pencere yerine doğrudan terminal üzerinden metin komutlarıyla kullanılan hafif arayüz (Antigravity’de `agy`).',
  },
  {
    term: 'TUI',
    turkish: 'Terminal Kullanıcı Arayüzü',
    explanation:
      'Terminal penceresi içinde menüler, paneller ve kısayollarla çalışan etkileşimli metin tabanlı arayüz.',
  },
  {
    term: 'IDE',
    turkish: 'Entegre Geliştirme Ortamı',
    explanation:
      'Kod yazma, hata ayıklama, terminal ve yapay zekâ araçlarını tek çatı altında toplayan yazılım geliştirme uygulaması.',
  },
  {
    term: 'SDK',
    turkish: 'Yazılım Geliştirme Kiti',
    explanation:
      'Bir platformun yeteneklerini (ör. Antigravity ajanlarını) kendi Python kodunun içinden programatik olarak kullanmanı sağlayan kütüphane.',
  },
  {
    term: 'CI/CD',
    turkish: 'Sürekli Entegrasyon ve Yayınlama',
    explanation:
      'Kod değişikliklerini otomatik olarak test eden, derleyen ve canlı ortama aktaran otomasyon hattı.',
  },
  {
    term: 'SSH',
    turkish: 'Güvenli Uzak Bağlantı',
    explanation:
      'Başka bir bilgisayara veya sunucuya şifreli terminal bağlantısı kurmayı sağlayan ağ protokolü.',
  },
  {
    term: 'Repository',
    aliases: ['Repo'],
    turkish: 'Kod Deposu',
    explanation:
      'Bir projenin tüm dosyalarını ve sürüm geçmişini barındıran Git klasörü veya GitHub deposu.',
  },
  {
    term: 'Build',
    turkish: 'Derleme',
    explanation:
      'Yazılan kaynak kodun hatalardan arındırılıp tarayıcıda veya sunucuda çalışacak son pakete dönüştürülmesi.',
  },
  {
    term: 'PR',
    turkish: 'Çekme İsteği (Pull Request)',
    explanation:
      'Yaptığın kod değişikliklerini ana projeye birleştirmeden önce ekip incelemesine sunduğun talep.',
  },
  {
    term: 'Mermaid',
    turkish: 'Metin Tabanlı Diyagram Dili',
    explanation:
      'Düz metin yazarak otomatik akış şeması, mimari diyagram veya sıralama grafiği çizen araç.',
  },
  {
    term: 'Electron',
    turkish: 'Masaüstü Uygulama Altyapısı',
    explanation:
      'Web teknolojileriyle Windows, macOS ve Linux üzerinde çalışan masaüstü uygulamaları oluşturma çerçevesi.',
  },
  {
    term: 'JSDoc',
    turkish: 'Kod Belgeleme Yorumu',
    explanation:
      'Fonksiyonların ne iş yaptığını ve parametrelerini açıklayan standart yorum satırı formatı.',
  },
  {
    term: 'Runtime Binary',
    aliases: ['runtime binary'],
    turkish: 'Çalışma Zamanı İkili Dosyası',
    explanation:
      'Python SDK’nın arka planda Antigravity ajan motorunu çalıştırmak için kullandığı önceden derlenmiş yürütülebilir program.',
  },
  // Google AI Studio terms
  {
    term: 'System Instructions',
    turkish: 'Sistem Talimatları',
    explanation:
      'Modelin her yanıtta uyması gereken kalıcı rol, üslup, dil ve davranış kurallarını belirleyen üst yönerge alanı.',
  },
  {
    term: 'Temperature',
    turkish: 'Sıcaklık (Yaratıcılık Ayarı)',
    explanation:
      'Modelin ne kadar öngörülebilir (0.0–0.3) yoksa yaratıcı ve çeşitli (0.8–1.5) yanıtlar üreteceğini kontrol eden parametre.',
  },
  {
    term: 'Top-P',
    turkish: 'Olasılık Eşiği (Nucleus Sampling)',
    explanation:
      'Modelin sonraki kelimeyi seçerken yalnızca en olası kelimelerin toplam olasılığı P değerine ulaşan kısmını dikkate almasını sağlar.',
  },
  {
    term: 'Few-Shot',
    turkish: 'Az Örnekli Öğretme',
    explanation:
      'Modele sadece ne yapacağını söylemek yerine, birkaç adet girdi→çıktı örneği vererek tam istediğin formatı öğretme tekniği.',
  },
  {
    term: 'Structured Output',
    turkish: 'Yapılandırılmış Çıktı (JSON Şema)',
    explanation:
      'Modelin serbest metin yerine, önceden tanımladığın kesin JSON şemasına %100 uygun veri döndürmesini garanti eden özellik.',
  },
  {
    term: 'Grounding',
    turkish: 'Kaynakla Temellendirme (Google Arama)',
    explanation:
      'Modelin yanıtlarını canlı Google Arama sonuçlarına dayandırarak güncel bilgi vermesini ve kaynak linki sunmasını sağlayan özellik.',
  },
  {
    term: 'Function Calling',
    turkish: 'Fonksiyon Çağırma',
    explanation:
      'Modelin ihtiyaç duyduğunda kendi kodundaki dış fonksiyonları (hava durumu, veritabanı, ödeme vb.) parametreleriyle tetikleyebilmesi.',
  },
  {
    term: 'Code Execution',
    turkish: 'Yerleşik Kod Çalıştırma',
    explanation:
      'Gemini’nin karmaşık matematik, veri analizi veya doğrulama için güvenli ortamda Python kodu yazıp çalıştırarak kesin sonuç üretmesi.',
  },
  {
    term: 'Live API',
    turkish: 'Canlı Gerçek Zamanlı API',
    explanation:
      'AI Studio’da ses, kamera veya ekran paylaşımı üzerinden modelle düşük gecikmeli, kesintisiz canlı sohbet kurmayı sağlayan arayüz.',
  },
  {
    term: 'Vibe Coding',
    turkish: 'Doğal Dille Hızlı Prototipleme',
    explanation:
      'Detaylı kod satırları yerine ne istediğini doğal dille tarif ederek AI Studio Build veya Antigravity ile hızla çalışan uygulama üretme yaklaşımı.',
  },
  {
    term: 'API Key',
    aliases: ['API Anahtarı'],
    turkish: 'API Erişim Anahtarı',
    explanation:
      'Uygulamanın Google AI Studio / Gemini servislerine senin hesabın adına bağlanmasını sağlayan gizli kimlik şifresi; asla herkese açık paylaşılmamalıdır.',
  },
  {
    term: 'Environment Variables',
    aliases: ['Env Vars', '.env'],
    turkish: 'Ortam Değişkenleri',
    explanation:
      'API anahtarları ve gizli ayarları kaynak kodun içine yazmak yerine güvenli şekilde dışarıdan (.env dosyası veya Vercel paneli) sağlayan değişkenler.',
  },
  {
    term: 'Serverless Function',
    turkish: 'Sunucusuz Arka Uç Fonksiyonu',
    explanation:
      'Sunucu kiralamadan Vercel üzerinde sadece istek geldiğinde çalışan, gizli API anahtarlarını güvenle saklayabildiğin küçük arka uç (backend) kodu.',
  },
  // Git, GitHub & Vercel terms
  {
    term: 'Staging Area',
    turkish: 'Hazırlık Alanı (Sahneleme)',
    explanation:
      'Git’te `git add` ile seçip bir sonraki kayda (commit) dahil edilmek üzere beklettiğin değişikliklerin bulunduğu ara aşama.',
  },
  {
    term: 'Commit',
    turkish: 'Sürüm Kaydı (Anlık Görüntü)',
    explanation:
      'Projedeki belirli değişiklikleri açıklayıcı bir mesajla kalıcı olarak Git tarihçesine mühürleme işlemi.',
  },
  {
    term: 'Branch',
    turkish: 'Dal (Paralel Çalışma Hattı)',
    explanation:
      'Ana kodu (`main`) bozmadan yeni bir özellik veya hata düzeltmesi geliştirmek için açılan bağımsız geliştirme hattı.',
  },
  {
    term: 'Merge',
    turkish: 'Birleştirme',
    explanation:
      'Farklı bir dalda (branch) tamamlanan değişiklikleri ana koda (`main`) geri dahil etme işlemi.',
  },
  {
    term: 'Merge Conflict',
    turkish: 'Birleştirme Çakışması',
    explanation:
      'İki farklı dalda aynı dosyanın aynı satırı farklı şekilde değiştirildiğinde Git’in hangisini seçeceğini sana sorması durumu.',
  },
  {
    term: 'Pull Request',
    turkish: 'Çekme / Birleştirme İsteği',
    explanation:
      'GitHub’da bir daldaki değişiklikleri ana dala eklemeden önce inceleme, test ve onay sürecine açan ekran.',
  },
  {
    term: 'Deploy',
    aliases: ['Deployment'],
    turkish: 'Canlıya Yayınlama',
    explanation:
      'Geliştirdiğin uygulamanın derlenip herkesin internetten erişebileceği bir sunucuya (örn. Vercel) yüklenmesi.',
  },
  {
    term: 'Preview Deployment',
    turkish: 'Önizleme Yayını',
    explanation:
      'Vercel’in her yeni dal veya Pull Request için ana siteyi etkilemeden otomatik oluşturduğu benzersiz test adresi.',
  },
  {
    term: 'Production',
    turkish: 'Canlı Ortam (Üretim)',
    explanation:
      'Gerçek kullanıcıların eriştiği ana web sitesi sürümü (genellikle `main` dalına yapılan push ile otomatik güncellenir).',
  },
  {
    term: 'CDN',
    aliases: ['Edge Network'],
    turkish: 'İçerik Dağıtım Ağı',
    explanation:
      'Sitenin dosyalarını dünyanın dört bir yanındaki sunucularda önbelleğe alarak kullanıcılara en yakın noktadan ışık hızında sunan ağ.',
  },
  {
    term: 'SPA',
    turkish: 'Tek Sayfalık Uygulama',
    explanation:
      'React/Vite gibi sayfa yenilemeden çalışan web uygulamaları; alt sayfalarda 404 almamak için `vercel.json` içinde `rewrites` kuralı gerekir.',
  },
  {
    term: 'DNS',
    aliases: ['CNAME'],
    turkish: 'Alan Adı Sistemi',
    explanation:
      'Kendi özel alan adını (`seninsiten.com`) Vercel’in sunucularına yönlendirmek için yapılan A ve CNAME kayıt ayarları.',
  },
  // Claude & ChatGPT terms
  {
    term: 'Claude Code',
    turkish: 'Anthropic Terminal Kodlama Ajanı',
    explanation:
      'Anthropic’in terminalden doğrudan proje dosyalarını okuyup düzenleyen ve komut çalıştıran ajanik kodlama aracı (`CLAUDE.md` ve MCP destekler).',
  },
  {
    term: 'CLAUDE.md',
    turkish: 'Claude Proje Kuralları Dosyası',
    explanation:
      'Antigravity’deki `GEMINI.md` dosyasının Claude Code karşılığı; proje standartlarını ve mimari kuralları her oturumda ajana aktarır.',
  },
  {
    term: 'Claude Projects',
    turkish: 'Claude Proje Çalışma Alanı',
    explanation:
      'Belirli bir iş için belgeleri, kod örneklerini ve özel talimatları tek bir klasörde toplayıp tüm sohbetlerde ortak bağlam olarak kullanma özelliği.',
  },
  {
    term: 'Canvas',
    turkish: 'Etkileşimli Yan Yana Düzenleme Alanı',
    explanation:
      'ChatGPT’de uzun metin veya kodları sohbetin yanında ayrı bir pencerede bölüm bölüm seçip doğrudan revize etmeni sağlayan çalışma yüzeyi.',
  },
  {
    term: 'Custom GPT',
    aliases: ['Custom GPTs'],
    turkish: 'Özel Paketlenmiş Asistan',
    explanation:
      'ChatGPT’de belirli bir görev için özel yönerge, bilgi dosyaları ve araçlarla hazırlanıp ekipçe paylaşılabilen kişiselleştirilmiş asistan.',
  },
  {
    term: 'Deep Research',
    turkish: 'Derin Web Araştırması',
    explanation:
      'Yapay zekânın onlarca web kaynağını arka planda otonom tarayıp karşılaştırmalı, kaynakçalı uzun araştırma raporu hazırlaması.',
  },
  {
    term: 'Reasoning Model',
    aliases: ['Reasoning'],
    turkish: 'Akıl Yürütme Modeli',
    explanation:
      'Yanıt vermeden önce adım adım içsel düşünme (chain-of-thought) yaparak karmaşık matematik, mantık ve mimari problemlerde yüksek doğruluk sunan model türü.',
  },
  {
    term: 'Active Recall',
    turkish: 'Aktif Hatırlama',
    explanation:
      'Sadece pasif okumak yerine her konunun hemen ardından kendini kısa sorularla yoklayarak bilginin uzun süreli hafızaya yerleşmesini sağlayan bilimsel öğrenme tekniği.',
  },
];
