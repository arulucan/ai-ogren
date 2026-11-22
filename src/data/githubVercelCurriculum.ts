import { CurriculumModule } from '../types/learning';

export const GITHUB_VERCEL_CURRICULUM: CurriculumModule[] = [
  {
    id: 'gv-git-basics',
    track: 'github-vercel',
    number: 1,
    title: 'Git Temelleri: Sürüm Kontrolünün Mantığı',
    shortTitle: 'Git Temelleri & Akış',
    subtitle: 'git init, Working Tree → Staging Area → Commit döngüsü, .gitignore ve Branch mantığı',
    durationMinutes: 10,
    xpReward: 265,
    iconName: 'GitBranch',
    accentColor: 'orange',
    summary:
      'Git, projendeki her değişikliği zaman makinesi gibi kaydeden yerel sürüm kontrol sistemidir. GitHub ise bu kayıtların internetteki güvenli evi, Vercel ise onları canlı web sitesine dönüştüren vitrinidir.',
    concepts: [
      {
        title: 'Git’in 3 Temel Aşaması',
        badge: 'Zaman Makinesi',
        description:
          'Dosyalarını düzenlediğinde değişiklikler doğrudan tarihçeye girmez; 3 kontrollü duraktan geçer:',
        bullets: [
          '1. Working Directory (Çalışma Dizini): Bilgisayarında dosyaları düzenlediğin canlı alan.',
          '2. Staging Area (`git add`): "Şu dosyaları bir sonraki kayda dahil etmek istiyorum" dediğin hazırlık masası.',
          '3. Local Repository (`git commit -m "..."`): Seçili değişiklikleri açıklayıcı bir mesajla kalıcı olarak mühürlediğin anlık görüntü.',
        ],
        codeSnippet: {
          label: 'En Sık Kullanılan 5 Git Komutu',
          code: `git init                          # Klasörü Git deposuna dönüştür
git status                        # Hangi dosyalar değişmiş gör
git add .                         # Değişiklikleri Staging Area'ya al
git commit -m "İlk sürüm hazır"   # Değişiklikleri kalıcı kaydet
git log --oneline                 # Geçmiş kayıtları tek satırda listele`,
        },
      },
      {
        title: '.gitignore Neden Hayati?',
        badge: 'Temiz Depo',
        description:
          'Her dosya Git’e eklenmemelidir! `.gitignore` dosyası Git’e hangi klasörleri görmezden geleceğini söyler:',
        bullets: [
          '`node_modules/`: Binlerce indirilebilir paket içerir (yüzlerce MB); `package.json` yeterlidir.',
          '`dist/`: Derleme çıktısıdır; Vercel zaten bunu kendi derler.',
          '`.env` / `.env.local`: Gizli API anahtarlarını ve şifreleri barındırır; asla Git’e eklenmemelidir.',
        ],
      },
      {
        title: 'Branch (Dal) Mantığı',
        badge: 'Güvenli Deney',
        description:
          'Çalışan ana sürümün (`main`) bozulmaması için yeni bir özellik geliştirirken yeni bir dal (Branch) açarsın:',
        codeSnippet: {
          label: 'Yeni Dal Açma & Birleştirme',
          code: `git checkout -b ozellik/karanlik-tema   # Yeni dal oluştur ve geç
# ... değişikliklerini yapıp commit et ...
git checkout main                       # Ana dala dön
git merge ozellik/karanlik-tema         # Özelliği ana dala birleştir`,
        },
        tip: 'Antigravity ile büyük bir değişiklik denerken önce yeni bir branch açmak, beğenmezsen tek komutla tertemiz geri dönmeni sağlar.',
      },
    ],
    quiz: [
      {
        id: 'gv-g-q1',
        question: '`git add` komutunun Git akışındaki görevi nedir?',
        options: [
          'Kodu doğrudan Vercel’de yayınlamak',
          'Değişiklikleri bir sonraki commit’e dahil edilmek üzere Staging Area’ya (hazırlık alanına) almak',
          'Tüm dosyaları silmek',
          'GitHub şifresini değiştirmek',
        ],
        correctIndex: 1,
        explanation:
          '`git add`, hangi değişikliklerin bir sonraki `git commit` kaydına gireceğini seçip Staging Area’ya taşır.',
      },
      {
        id: 'gv-g-q2',
        question: 'Aşağıdaki dosya/klasörlerden hangisinin `.gitignore` içinde olması KESİNLİKLE önerilir?',
        options: ['src/App.tsx', 'package.json', 'node_modules/ ve .env.local', 'README.md'],
        correctIndex: 2,
        explanation:
          '`node_modules/` gereksiz devasa boyut taşır, `.env.local` ise gizli anahtarları barındırır; ikisi de `.gitignore` içinde olmalıdır.',
      },
      {
        id: 'gv-g-q3',
        question: 'Ana canlı kodu (`main`) riske atmadan yeni bir tasarım denemek için hangi Git özelliği kullanılır?',
        options: ['Branch (Dal)', 'git init', 'README.md', 'node_modules'],
        correctIndex: 0,
        explanation:
          'Branch (dal) açarak ana koda dokunmadan güvenle yeni özellik geliştirebilir, test ettikten sonra birleştirebilirsin (Merge).',
      },
    ],
    realMission: {
      title: 'Kendi Projende Git Durumunu İncele',
      goal: 'Antigravity projende Git deposu durumunu kontrol edip temiz başlangıcı hazırla.',
      copyablePrompt:
        'Bu projede git status kontrolü yap; henüz git deposu değilse bana git init + ilk commit için hangi dosyaların dahil edilip hangilerinin .gitignore ile dışarıda bırakılacağını özetle.',
      steps: [
        'Bu modüldeki İnteraktif Git Simülatöründe Değiştir → Add → Commit → Push akışını tamamla.',
        'Yukarıdaki promptu kendi Antigravity sohbetinde çalıştır.',
        '`.gitignore` dosyasının `node_modules` ve `dist` klasörlerini dışladığını gözünle doğrula.',
      ],
      expectedOutcome:
        'Git’in 3 aşamalı yapısını ezberlemeden mantığıyla kavramış olursun.',
    },
  },
  {
    id: 'gv-github',
    track: 'github-vercel',
    number: 2,
    title: 'GitHub: Bulut Depo, Public/Private & Pull Request',
    shortTitle: 'GitHub & Pull Request',
    subtitle: 'GitHub deposu oluşturma, gh CLI ile hızlı yükleme, Pull Request ve ekip çalışması',
    durationMinutes: 10,
    xpReward: 265,
    iconName: 'Github',
    accentColor: 'indigo',
    summary:
      'Git bilgisayarında çalışır; GitHub ise Git depolarını bulutta barındıran, projelerini yedekleyen, paylaşmanı sağlayan ve Vercel ile otomatik yayınlama köprüsü kuran platformdur.',
    concepts: [
      {
        title: 'Public (Herkese Açık) vs. Private (Gizli) Depo',
        badge: 'Görünürlük Seçimi',
        description:
          'GitHub’da yeni bir Repository oluştururken iki seçeneğin vardır:',
        bullets: [
          'Public: Portföy projeleri, açık kaynak öğrenme platformları ve paylaşmak istediğin çalışmalar için. Herkes kodu görebilir (ama sadece senin izninle değiştirebilir!).',
          'Private: Kişisel, ticari veya henüz yayına hazır olmayan projeler için. Vercel ücretsiz Hobby planında Private GitHub depolarını da sorunsuz yayınlayabilir!',
        ],
      },
      {
        title: 'GitHub CLI (`gh`) ile Tek Komutta Repo Oluşturma',
        badge: 'Süper Hızlı Yol',
        description:
          'Tarayıcıda uzun uzun tıklamak yerine bilgisayarında kurulu `gh` aracıyla 10 saniyede depo açıp kodunu yükleyebilirsin:',
        codeSnippet: {
          label: 'gh CLI ile Repo Aç & Gönder',
          code: `gh auth status                                         # Giriş durumunu kontrol et
gh auth login                                          # Giriş yapılmadıysa tarayıcıyla bağlan
gh repo create antigravity-akademi --public --source=. --push`,
        },
      },
      {
        title: 'Pull Request (PR) & Code Review Akışı',
        badge: 'Profesyonel Standart',
        description:
          'Bir branch’te yaptığın işi `main` dalına doğrudan itmek yerine GitHub’da Pull Request açarsın:',
        bullets: [
          'Değişen tüm satırlar yeşil/kırmızı Diff görünümünde listelenir.',
          'Vercel bağlıysa PR sayfasının altına otomatik bir **Preview Deployment** (test linki) yorumu düşer!',
          'Her şey kusursuzsa tek tıkla "Merge Pull Request" diyerek canlıya alırsın.',
        ],
      },
    ],
    quiz: [
      {
        id: 'gv-gh-q1',
        question: 'Vercel ücretsiz Hobby hesabıyla Private (gizli) bir GitHub deposunu canlı web sitesi olarak yayınlayabilir misin?',
        options: [
          'Evet, Vercel kişisel Private GitHub depolarını da ücretsiz yayınlar',
          'Hayır, sadece Public depolar çalışır',
          'Sadece ücretli kurumsal hesaplarda mümkündür',
          'GitHub depoları Vercel’e bağlanamaz',
        ],
        correctIndex: 0,
        explanation:
          'Vercel Hobby planında kendi kişisel Private GitHub depolarını ücretsiz bağlayıp yayınlayabilirsin.',
      },
      {
        id: 'gv-gh-q2',
        question: 'Public (herkese açık) bir GitHub deposunda yabancı biri senin kodunu doğrudan `main` dalında değiştirebilir mi?',
        options: [
          'Evet, herkes istediğini silebilir',
          'Hayır; yalnızca kodu görebilir veya öneri olarak Pull Request gönderebilir, onay sende kalır',
          'Sadece gece saatlerinde değiştirebilir',
          'Public depolarda şifre yoktur',
        ],
        correctIndex: 1,
        explanation:
          'Public depolar herkese okuma erişimi verir; yazma ve birleştirme yetkisi yalnızca depo sahibine ve yetkilendirdiği kişilere aittir.',
      },
      {
        id: 'gv-gh-q3',
        question: 'Pull Request (PR) açmanın en büyük avantajlarından biri nedir?',
        options: [
          'Değişiklikleri `main` dalına almadan önce Diff üzerinden inceleyip Vercel Preview linkiyle canlı test edebilmek',
          'Dosya boyutunu küçültmek',
          'İnternet hızını artırmak',
          'Git’i devre dışı bırakmak',
        ],
        correctIndex: 0,
        explanation:
          'Pull Request, değişiklikleri birleştirmeden önce hem kod hem de canlı önizleme (Preview) düzeyinde güvenle doğrulamanı sağlar.',
      },
    ],
    realMission: {
      title: 'GitHub Hesap Bağlantını Kontrol Et',
      goal: 'Bilgisayarındaki GitHub CLI (`gh`) durumunu doğrulayıp ilk deponu oluşturmaya hazır hale gel.',
      copyablePrompt:
        'Bilgisayarımda gh auth status ile GitHub CLI giriş durumumu kontrol et ve eğer bağlıysam bu projeyi GitHub’a yüklemeye hazır olduğumuzu söyle.',
      steps: [
        'Bu modüldeki İnteraktif GitHub & PR Simülatöründe bir depo oluşturup PR birleştirme (Merge) adımını tamamla.',
        'Yukarıdaki prompt ile kendi bilgisayarında `gh` giriş durumunu kontrol ettir.',
        'Depo adını (`antigravity-akademi`) ve Public/Private tercihini belirle.',
      ],
      expectedOutcome:
        'GitHub CLI bağlantını doğrulamış ve tek komutla kod yüklemeye hazır hale gelmiş olursun.',
    },
  },
  {
    id: 'gv-vercel-deploy',
    track: 'github-vercel',
    number: 3,
    title: 'Vercel: Sıfır Maliyetli Otomatik Yayınlama (CI/CD)',
    shortTitle: 'Vercel CI/CD & Deploy',
    subtitle: 'GitHub bağlantısı, otomatik build/deploy, Preview vs Production ve vercel.json SPA ayarı',
    durationMinutes: 11,
    xpReward: 265,
    iconName: 'CloudUpload',
    accentColor: 'emerald',
    summary:
      'Vercel, React, Vite ve Next.js projelerini saniyeler içinde global CDN ağına (Edge Network) ücretsiz yayan modern bulut platformudur. GitHub’a bağladığında her `git push` siteni otomatik günceller!',
    concepts: [
      {
        title: 'Git Push = Otomatik Canlı Yayın (CI/CD)',
        badge: 'Sıfır Zahmet',
        description:
          'Vercel projeni GitHub deposuna bir kez bağladığında şu zincir her güncellemede kendi kendine çalışır:',
        bullets: [
          '1. Sen bilgisayarında (Antigravity ile) kodu günceller ve `git push` yaparsın.',
          '2. Vercel değişikliği anında algılar, bulutta `npm install` ve `npm run build` çalıştırır.',
          '3. Derleme başarılıysa siteni saniyeler içinde tüm dünyadaki CDN sunucularına yayar (hata varsa eski canlı site ASLA bozulmaz!).',
        ],
      },
      {
        title: 'Preview Deployment vs. Production',
        badge: 'Sıfır Riskli Test',
        description:
          'Vercel’in en sevilen özelliği her dal için ayrı canlı test linki üretmesidir:',
        bullets: [
          'Production (`proje.vercel.app`): Yalnızca `main` dalına yapılan push veya birleştirmelerle güncellenir.',
          'Preview (`proje-git-yeni-ozellik.vercel.app`): Başka bir branch’e push yaptığında oluşur; arkadaşlarına link atıp canlı siteyi bozmadan test ettirebilirsin.',
        ],
      },
      {
        title: 'Vite / React (SPA) İçin `vercel.json` Altın Ayarı',
        badge: '404 Önleyici',
        description:
          'Tek sayfalık uygulamalarda (SPA) `/dersler/1` gibi bir alt sayfada tarayıcı yenilendiğinde 404 almamak için proje kökünde `vercel.json` bulunur:',
        codeSnippet: {
          label: 'vercel.json (Projende şimdiden hazır!)',
          code: `{
  "framework": "vite",
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}`,
        },
        tip: 'Terminalden hızlıca manuel yayınlamak istersen `npx vercel` (önizleme) veya `npx vercel --prod` (canlı) komutlarını da kullanabilirsin.',
      },
    ],
    quiz: [
      {
        id: 'gv-v-q1',
        question: 'GitHub’a yeni bir kod push ettiğinde Vercel’deki derleme (`npm run build`) bir TypeScript hatası nedeniyle başarısız olursa canlıdaki (Production) sitene ne olur?',
        options: [
          'Canlı site tamamen çöker ve beyaz ekran verir',
          'Canlı site etkilenmez; önceki çalışan sürüm kesintisiz yayında kalmaya devam eder',
          'Vercel hesabın silinir',
          'GitHub deposu sıfırlanır',
        ],
        correctIndex: 1,
        explanation:
          'Vercel atomik yayınlama (atomic deployment) yapar; yeni sürüm başarıyla derlenmedikçe mevcut Production yayını asla kesilmez.',
      },
      {
        id: 'gv-v-q2',
        question: 'React/Vite tabanlı bir SPA uygulamasında alt URL’lerde sayfa yenileyince 404 hatasını önlemek için `vercel.json` içine hangi ayar eklenir?',
        options: [
          '`rewrites` ile tüm yolları `/index.html` dosyasına yönlendirmek',
          '`deleteAll: true`',
          'Temperature: 0.1',
          'Sadece CSS dosyasını silmek',
        ],
        correctIndex: 0,
        explanation:
          '`"rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]` kuralı yönlendirmeyi React router’a devrederek 404 hatalarını engeller.',
      },
      {
        id: 'gv-v-q3',
        question: 'Vercel’de `main` dışındaki bir dalda (branch) geliştirme yapıp push ettiğinde Vercel ne oluşturur?',
        options: [
          'Ana siteyi hemen ezer',
          'Ana siteye dokunmadan benzersiz bir Preview Deployment (önizleme) linki oluşturur',
          'Hiçbir işlem yapmaz',
          'Sadece PDF raporu indirir',
        ],
        correctIndex: 1,
        explanation:
          'Her yan dal ve PR için otomatik oluşturulan Preview Deployment sayesinde canlı kullanıcıları etkilemeden yeni özellikleri test edebilirsin.',
      },
    ],
    realMission: {
      title: 'Vercel Yayınlama Hattını Test Et',
      goal: 'Bu modüldeki canlı CI/CD simülatöründe build→deploy sürecini deneyimle ve projemizi canlıya almaya hazırlan.',
      copyablePrompt:
        'Bu projeyi GitHub’a yükleyip ardından Vercel’de canlıya (production) yayınlamam için adım adım hazırlığı başlat.',
      steps: [
        'İnteraktif Uygulama sekmesinde bir `git push` simüle edip Build Loglarını ve Preview/Production farkını izle.',
        'Proje kökündeki `vercel.json` dosyasını açıp `rewrites` ayarını incele.',
        'Hazır olduğunda bana "GitHub ve Vercel’e kur" diyerek gerçek yayını birlikte tamamlayalım!',
      ],
      expectedOutcome:
        'GitHub → Vercel otomasyonunun nasıl çalıştığını ve her push’ta sitenin nasıl güncellendiğini tam kavramış olursun.',
    },
  },
  {
    id: 'gv-env-domains',
    track: 'github-vercel',
    number: 4,
    title: 'Ortam Değişkenleri (.env), Özel Alan Adı & Hata Ayıklama',
    shortTitle: 'Env Vars, Domain & Debug',
    subtitle: 'Vercel Environment Variables, özel alan adı (DNS/CNAME) bağlama ve sık görülen deploy hataları',
    durationMinutes: 10,
    xpReward: 265,
    iconName: 'Globe',
    accentColor: 'sky',
    summary:
      'Siten canlıya çıktıktan sonra profesyonel seviyeye geçmenin 3 adımı vardır: Gizli anahtarları Vercel Environment Variables ile yönetmek, kendi alan adını (domain) bağlamak ve Build/Deploy hatalarını saniyeler içinde çözmek.',
    concepts: [
      {
        title: 'Vercel Environment Variables (Ortam Değişkenleri)',
        badge: 'Gizli Anahtar Yönetimi',
        description:
          'Yerel bilgisayarındaki `.env.local` dosyası `.gitignore` yüzünden GitHub’a gitmez — bu yüzden Vercel’e anahtarlarını panelden tanımlarsın:',
        bullets: [
          'Vercel Dashboard → Project Settings → Environment Variables bölümünden `GEMINI_API_KEY` gibi anahtarları eklersin.',
          'Her değişkenin hangi ortamlarda geçerli olacağını (Production / Preview / Development) ayrı ayrı seçebilirsin.',
          'Yeni bir Environment Variable ekledikten sonra etkili olması için son yayını "Redeploy" etmen gerekir.',
        ],
      },
      {
        title: 'Özel Alan Adı (Custom Domain) & Ücretsiz SSL',
        badge: 'seninsiten.com',
        description:
          'Vercel varsayılan olarak ücretsiz `proje.vercel.app` adresi verir. İstersen satın aldığın kendi alan adını da ücretsiz bağlayabilirsin:',
        bullets: [
          'Vercel → Settings → Domains kısmına alan adını yazarsın.',
          'Alan adı sağlayıcında (Cloudflare, Namecheap, GoDaddy vb.) Vercel’in verdiği `A` (76.76.21.21) veya `CNAME` (`cname.vercel-dns.com`) kaydını eklersin.',
          'HTTPS / SSL sertifikası Vercel tarafından tamamen ücretsiz ve otomatik yenilenir.',
        ],
      },
      {
        title: 'En Sık 4 Deploy Hatası & Hızlı Çözüm',
        badge: 'Sorun Giderme',
        description:
          'Vercel’de bir yayın hata verdiğinde panik yapma; logların son 10 satırı her zaman cevabı söyler:',
        bullets: [
          'TypeScript Hatası (`tsc` failed): Yerelde `npm run build` çalıştırıp hatayı düzelt ve tekrar push et.',
          'Büyük/Küçük Harf Farkı: Windows `Navbar.tsx` ile `navbar.tsx` farkını önemsemez ama Vercel (Linux) önemser! Import isimlerini birebir eşleştir.',
          'Eksik Env Var: Kod `process.env.GEMINI_API_KEY` arıyor ama Vercel panelinde tanımlanmamış.',
          'Alt Sayfa 404: `vercel.json` içine SPA `rewrites` kuralını ekle.',
        ],
      },
    ],
    quiz: [
      {
        id: 'gv-e-q1',
        question: 'Yerel bilgisayarında (Windows) sorunsuz çalışan bir proje Vercel’de "Module not found: ./components/navbar" hatası veriyorsa en olası sebep nedir?',
        options: [
          'Vercel Linux tabanlıdır ve dosya adlarında büyük/küçük harf duyarlıdır (`Navbar.tsx` vs `navbar`)',
          'İnternet kablosu çıkmıştır',
          'Vercel React desteklemez',
          'Tarayıcı dili Türkçedir',
        ],
        correctIndex: 0,
        explanation:
          'Windows dosya sistemi büyük/küçük harf duyarsızken Vercel’in Linux derleme ortamı harf duyarlıdır; import yolları dosya adıyla birebir aynı olmalıdır.',
      },
      {
        id: 'gv-e-q2',
        question: 'Vercel panelinden yeni bir Environment Variable (`GEMINI_API_KEY`) ekledikten sonra canlı sitede aktif olması için ne yapmalısın?',
        options: [
          'Projeyi silip baştan yazmak',
          'Değişikliğin yeni derlemeye yansıması için Redeploy (yeniden yayınla) yapmak',
          'DNS kayıtlarını silmek',
          '`.gitignore` dosyasını silmek',
        ],
        correctIndex: 1,
        explanation:
          'Yeni eklenen veya güncellenen Environment Variables, bir sonraki Redeploy / Push ile aktif hale gelir.',
      },
      {
        id: 'gv-e-q3',
        question: 'Vercel’de özel alan adı (`ornek.com`) bağladığında HTTPS (SSL) sertifikası için ek ücret ödemen gerekir mi?',
        options: [
          'Evet, yıllık ayrı sertifika satın alınır',
          'Hayır, Vercel tüm alan adları için ücretsiz ve otomatik yenilenen SSL sertifikası sağlar',
          'Sadece Chrome’da çalışır',
          'SSL elle her hafta yüklenir',
        ],
        correctIndex: 1,
        explanation:
          'Vercel, DNS doğrulandığı anda Let’s Encrypt tabanlı SSL/HTTPS sertifikasını otomatik ve ücretsiz olarak oluşturur ve yeniler.',
      },
    ],
    realMission: {
      title: 'Yayınlama Öncesi Son Kontrol Listesi',
      goal: 'Canlıya çıkmadan önce profesyonel bir mühendisin kontrol ettiği 3 kritik maddeyi doğrula.',
      copyablePrompt:
        'Bu projede `npm run build` çalıştırarak TypeScript, import harf duyarlılığı ve vercel.json ayarlarının Vercel yayınına %100 hazır olduğunu doğrula.',
      steps: [
        'İnteraktif Uygulama sekmesinde 4 gerçek Vercel hata vakasını teşhis edip çöz.',
        'Yukarıdaki promptla yerel `npm run build` kontrolünün temiz geçtiğinden emin ol.',
        'Projeyi GitHub + Vercel’e yayınladıktan sonra mobil telefonundan da açıp canlı olarak test et!',
      ],
      expectedOutcome:
        'Artık yalnızca Antigravity ve AI Studio ile uygulama geliştirmeyi değil, onları güvenle dünyaya yayınlamayı da uçtan uca biliyorsun!',
    },
  },
];
