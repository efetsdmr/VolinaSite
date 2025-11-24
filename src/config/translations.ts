export type Language = 'en' | 'tr';

export interface Translations {
  // Navigation
  nav: {
    solutions: string;
    howItWorks: string;
    caseStudies: string;
    pricing: string;
    signIn: string;
  };
  
  // Hero Section
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    bookDemo: string;
    tryVolina: string;
    metric1Title: string;
    metric1Desc: string;
    metric2Title: string;
    metric2Desc: string;
    metric3Title: string;
    metric3Desc: string;
  };

  // Problem Solution
  problemSolution: {
    title: string;
    subtitle: string;
    problem1Title: string;
    problem1Desc: string;
    problem2Title: string;
    problem2Desc: string;
    problem3Title: string;
    problem3Desc: string;
    solutionTitle: string;
    solutionSubtitle: string;
    solution1Title: string;
    solution1Desc: string;
    solution2Title: string;
    solution2Desc: string;
    solution3Title: string;
    solution3Desc: string;
  };

  // How It Works
  howItWorks: {
    title: string;
    subtitle: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
    step4Title: string;
    step4Desc: string;
  };

  // Features
  features: {
    title: string;
    subtitle: string;
    feature1Title: string;
    feature1Desc: string;
    feature2Title: string;
    feature2Desc: string;
    feature3Title: string;
    feature3Desc: string;
    feature4Title: string;
    feature4Desc: string;
    feature5Title: string;
    feature5Desc: string;
    feature6Title: string;
    feature6Desc: string;
  };

  // Testimonials
  testimonials: {
    title: string;
    subtitle: string;
    testimonial1Text: string;
    testimonial1Author: string;
    testimonial1Role: string;
    testimonial2Text: string;
    testimonial2Author: string;
    testimonial2Role: string;
    testimonial3Text: string;
    testimonial3Author: string;
    testimonial3Role: string;
  };

  // Admin Panel
  adminPanel: {
    title: string;
    subtitle: string;
    tab1: string;
    tab2: string;
    tab3: string;
    dashboardTitle: string;
    totalCalls: string;
    successRate: string;
    avgDuration: string;
    leadsConverted: string;
    recentCalls: string;
    caller: string;
    duration: string;
    outcome: string;
    date: string;
    qualified: string;
    followUp: string;
    notInterested: string;
    scheduled: string;
    tryDashboard: string;
  };

  // Pricing
  pricing: {
    title: string;
    subtitle: string;
    monthly: string;
    annually: string;
    save20: string;
    starter: string;
    starterDesc: string;
    starterPrice: string;
    perMonth: string;
    starterFeature1: string;
    starterFeature2: string;
    starterFeature3: string;
    starterFeature4: string;
    getStarted: string;
    professional: string;
    professionalDesc: string;
    professionalPrice: string;
    professionalFeature1: string;
    professionalFeature2: string;
    professionalFeature3: string;
    professionalFeature4: string;
    professionalFeature5: string;
    mostPopular: string;
    enterprise: string;
    enterpriseDesc: string;
    enterprisePrice: string;
    enterpriseFeature1: string;
    enterpriseFeature2: string;
    enterpriseFeature3: string;
    enterpriseFeature4: string;
    enterpriseFeature5: string;
    contactSales: string;
  };

  // Footer
  footer: {
    ctaTitle: string;
    ctaSubtitle: string;
    bookDemo: string;
    startTrial: string;
    description: string;
    product: string;
    productFeatures: string;
    productPricing: string;
    productCaseStudies: string;
    productIntegrations: string;
    productApiDocs: string;
    company: string;
    companyAbout: string;
    companyCareers: string;
    companyBlog: string;
    companyPress: string;
    companyContact: string;
    resources: string;
    resourcesHelp: string;
    resourcesCommunity: string;
    resourcesWebinars: string;
    resourcesStatus: string;
    resourcesPartners: string;
    legal: string;
    legalPrivacy: string;
    legalTerms: string;
    legalCookies: string;
    legalGdpr: string;
    copyright: string;
    privacy: string;
    terms: string;
    cookies: string;
  };

  // Modals
  modal: {
    // Demo Modal
    demoTitle: string;
    demoSubtitle: string;
    demoName: string;
    demoEmail: string;
    demoPhone: string;
    demoCompany: string;
    demoSector: string;
    demoSectorPlaceholder: string;
    demoSectorDental: string;
    demoSectorRestaurant: string;
    demoSectorEcommerce: string;
    demoSectorOther: string;
    demoEmployees: string;
    demoMessage: string;
    demoSubmit: string;
    demoSuccess: string;
    demoSuccessMessage: string;
    
    // Try Volina Modal
    tryAssistantName: string;
    tryExperience: string;
    tryFeature1: string;
    tryFeature2: string;
    tryFeature3: string;
    tryFeature4: string;
    tryStartCall: string;
    tryMicRequired: string;
    tryMicDescription: string;
    tryLimitedPreview: string;
    tryLimitedPreviewDesc: string;
    tryPrivateSecure: string;
    tryAllow: string;
    tryCancel: string;
    tryConnecting: string;
    tryActiveCall: string;
    tryMicActive: string;
    tryMicMuted: string;
    tryMicActiveDesc: string;
    tryMicMutedDesc: string;
    tryLiveTranscript: string;
    tryAI: string;
    tryYou: string;
    tryCallEnded: string;
    tryDuration: string;
    tryThankYou: string;
    trySecureConnection: string;
    tryInitializing: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    nav: {
      solutions: 'Solutions',
      howItWorks: 'How it Works',
      caseStudies: 'Case Studies',
      pricing: 'Pricing',
      signIn: 'Sign In',
    },
    hero: {
      badge: 'AI-Powered Voice Automation',
      title: 'Never Miss a Lead Again',
      subtitle: 'Automate your calls with human-like AI voice agents. Qualify, convert and engage leads 24/7.',
      bookDemo: 'Book a Demo Call',
      tryVolina: 'Try Volina',
      metric1Title: '100%',
      metric1Desc: 'of leads answered',
      metric2Title: '350%',
      metric2Desc: 'boost in appointments',
      metric3Title: '+45%',
      metric3Desc: 'in conversion rate',
    },
    problemSolution: {
      title: 'The Hidden Cost of Missed Calls',
      subtitle: 'Every unanswered call is lost revenue. Here\'s what traditional call handling is costing you:',
      problem1Title: 'Missed Opportunities',
      problem1Desc: '67% of customers hang up if they can\'t reach a human. That\'s revenue walking away.',
      problem2Title: 'High Operating Costs',
      problem2Desc: 'Call centers cost $30-50/hour per agent. Scale is expensive and limited.',
      problem3Title: 'Inconsistent Quality',
      problem3Desc: 'Human agents have bad days. Training takes time. Quality varies dramatically.',
      solutionTitle: 'The Volina AI Solution',
      solutionSubtitle: 'Transform your call operations with AI that works 24/7, scales infinitely, and never has a bad day.',
      solution1Title: '24/7 Availability',
      solution1Desc: 'Answer every call instantly, any time of day. No more missed opportunities or lost leads.',
      solution2Title: '10x Cost Reduction',
      solution2Desc: 'Replace expensive call centers with AI agents that cost 90% less to operate.',
      solution3Title: 'Perfect Consistency',
      solution3Desc: 'Every caller gets the same high-quality experience. No training needed, no bad days.',
    },
    howItWorks: {
      title: 'How Volina Works',
      subtitle: 'Get started in minutes, not months. Our AI voice agents integrate seamlessly with your existing systems.',
      step1Title: 'Connect Your Phone',
      step1Desc: 'Link your business number or get a new one. No complex setup required.',
      step2Title: 'Customize AI Agent',
      step2Desc: 'Train your AI on your business, products, and preferred conversation style.',
      step3Title: 'Go Live',
      step3Desc: 'Activate your AI agent and start handling calls immediately.',
      step4Title: 'Monitor & Optimize',
      step4Desc: 'Track performance, review calls, and continuously improve results.',
    },
    features: {
      title: 'Everything You Need',
      subtitle: 'Powerful features that make your AI voice agents feel indistinguishable from human agents.',
      feature1Title: 'Natural Conversations',
      feature1Desc: 'Our AI understands context, handles interruptions, and responds naturally.',
      feature2Title: 'Multi-Language Support',
      feature2Desc: 'Serve global customers in 30+ languages with perfect accent and grammar.',
      feature3Title: 'CRM Integration',
      feature3Desc: 'Sync with Salesforce, HubSpot, and 100+ tools automatically.',
      feature4Title: 'Smart Scheduling',
      feature4Desc: 'Book appointments directly into your calendar with conflict detection.',
      feature5Title: 'Real-Time Analytics',
      feature5Desc: 'Track call metrics, conversion rates, and ROI in beautiful dashboards.',
      feature6Title: 'Custom Workflows',
      feature6Desc: 'Design complex call flows with branching logic and conditional routing.',
    },
    testimonials: {
      title: 'Loved by Growing Teams',
      subtitle: 'See how businesses are transforming their call operations with Volina AI.',
      testimonial1Text: 'Volina AI increased our lead response time from 4 hours to instant. Our conversion rate jumped 45% in the first month alone.',
      testimonial1Author: 'Sarah Chen',
      testimonial1Role: 'VP of Sales, TechCorp',
      testimonial2Text: 'We went from missing 60% of after-hours calls to answering 100%. The ROI was positive within 3 weeks.',
      testimonial2Author: 'Michael Rodriguez',
      testimonial2Role: 'CEO, GrowthLabs',
      testimonial3Text: 'The AI sounds so natural that customers don\'t realize they\'re talking to a bot. It\'s honestly mind-blowing.',
      testimonial3Author: 'Emily Watson',
      testimonial3Role: 'Operations Director, ServicePro',
    },
    adminPanel: {
      title: 'Complete Control & Visibility',
      subtitle: 'Monitor, analyze, and optimize your AI voice agents with our powerful admin dashboard.',
      tab1: 'Dashboard',
      tab2: 'Analytics',
      tab3: 'Settings',
      dashboardTitle: 'Call Performance Overview',
      totalCalls: 'Total Calls Today',
      successRate: 'Success Rate',
      avgDuration: 'Avg Duration',
      leadsConverted: 'Leads Converted',
      recentCalls: 'Recent Calls',
      caller: 'Caller',
      duration: 'Duration',
      outcome: 'Outcome',
      date: 'Date',
      qualified: 'Qualified Lead',
      followUp: 'Follow-up Scheduled',
      notInterested: 'Not Interested',
      scheduled: 'Meeting Scheduled',
      tryDashboard: 'Try Dashboard',
    },
    pricing: {
      title: 'Simple, Transparent Pricing',
      subtitle: 'Choose the plan that fits your business. No hidden fees, cancel anytime.',
      monthly: 'Monthly',
      annually: 'Annually',
      save20: 'Save 20%',
      starter: 'Starter',
      starterDesc: 'Perfect for small teams testing AI voice agents',
      starterPrice: '$99',
      perMonth: '/month',
      starterFeature1: '500 minutes/month',
      starterFeature2: '1 phone number',
      starterFeature3: 'Basic analytics',
      starterFeature4: 'Email support',
      getStarted: 'Get Started',
      professional: 'Professional',
      professionalDesc: 'For growing businesses that need more power',
      professionalPrice: '$299',
      professionalFeature1: '2,000 minutes/month',
      professionalFeature2: '3 phone numbers',
      professionalFeature3: 'Advanced analytics',
      professionalFeature4: 'CRM integrations',
      professionalFeature5: 'Priority support',
      mostPopular: 'Most Popular',
      enterprise: 'Enterprise',
      enterpriseDesc: 'Custom solutions for large organizations',
      enterprisePrice: 'Custom',
      enterpriseFeature1: 'Unlimited minutes',
      enterpriseFeature2: 'Unlimited numbers',
      enterpriseFeature3: 'Custom integrations',
      enterpriseFeature4: 'Dedicated account manager',
      enterpriseFeature5: '24/7 phone support',
      contactSales: 'Contact Sales',
    },
    footer: {
      ctaTitle: 'Ready to Transform Your Call Process?',
      ctaSubtitle: 'Join 2,000+ businesses automating their calls with AI',
      bookDemo: 'Book a Demo Call',
      startTrial: 'Start Free Trial',
      description: 'Automate your calls with human-like AI voice agents. Never miss a lead again.',
      product: 'Product',
      productFeatures: 'Features',
      productPricing: 'Pricing',
      productCaseStudies: 'Case Studies',
      productIntegrations: 'Integrations',
      productApiDocs: 'API Docs',
      company: 'Company',
      companyAbout: 'About Us',
      companyCareers: 'Careers',
      companyBlog: 'Blog',
      companyPress: 'Press Kit',
      companyContact: 'Contact',
      resources: 'Resources',
      resourcesHelp: 'Help Center',
      resourcesCommunity: 'Community',
      resourcesWebinars: 'Webinars',
      resourcesStatus: 'Status',
      resourcesPartners: 'Partners',
      legal: 'Legal',
      legalPrivacy: 'Privacy Policy',
      legalTerms: 'Terms of Service',
      legalCookies: 'Cookie Policy',
      legalGdpr: 'GDPR',
      copyright: '© 2025 Volina AI. All rights reserved.',
      privacy: 'Privacy',
      terms: 'Terms',
      cookies: 'Cookies',
    },
    modal: {
      demoTitle: 'Book Your Demo',
      demoSubtitle: 'See how Volina AI can transform your call operations',
      demoName: 'Full Name',
      demoEmail: 'Work Email',
      demoPhone: 'Phone Number',
      demoCompany: 'Company Name',
      demoSector: 'Sector',
      demoSectorPlaceholder: 'Select your sector',
      demoSectorDental: 'Dental',
      demoSectorRestaurant: 'Restaurant',
      demoSectorEcommerce: 'E-commerce',
      demoSectorOther: 'Other',
      demoEmployees: 'Number of Employees',
      demoMessage: 'Tell us about your needs',
      demoSubmit: 'Schedule Demo',
      demoSuccess: 'Demo Scheduled!',
      demoSuccessMessage: 'We\'ll send you a confirmation email shortly with next steps.',
      tryAssistantName: 'Volina AI Assistant',
      tryExperience: 'Experience our AI voice agent in action',
      tryFeature1: 'Natural conversation flow',
      tryFeature2: 'Real-time voice recognition',
      tryFeature3: 'Smart appointment scheduling',
      tryFeature4: 'Multi-language support',
      tryStartCall: 'Start Voice Call',
      tryMicRequired: 'Microphone Access Required',
      tryMicDescription: 'Click "Allow" when your browser asks for microphone permission to start the voice call.',
      tryLimitedPreview: 'Limited in Figma Preview',
      tryLimitedPreviewDesc: 'For full voice functionality, open in a new tab or deploy to a real website.',
      tryPrivateSecure: 'Your voice is private and secure',
      tryAllow: 'Allow Microphone & Start Call',
      tryCancel: 'Cancel',
      tryConnecting: 'Connecting...',
      tryActiveCall: 'Active Call',
      tryMicActive: '🎤 Microphone Active - Speak Now!',
      tryMicMuted: 'Microphone Muted',
      tryMicActiveDesc: 'Start talking - the AI will respond to your voice',
      tryMicMutedDesc: 'Click the microphone button below to unmute',
      tryLiveTranscript: 'Live Transcript',
      tryAI: 'AI',
      tryYou: 'You',
      tryCallEnded: 'Call Ended',
      tryDuration: 'Duration',
      tryThankYou: 'Thank you for trying Volina AI!',
      trySecureConnection: '🔒 Secure voice connection',
      tryInitializing: 'Initializing voice connection...',
    },
  },
  tr: {
    nav: {
      solutions: 'Çözümler',
      howItWorks: 'Nasıl Çalışır',
      caseStudies: 'Vaka Çalışmaları',
      pricing: 'Fiyatlandırma',
      signIn: 'Giriş Yap',
    },
    hero: {
      badge: 'AI Destekli Ses Otomasyonu',
      title: 'Bir Daha Asla Potansiyel Müşteri Kaçırmayın',
      subtitle: 'İnsan gibi konuşan AI ses ajanlarıyla çağrılarınızı otomatikleştirin. 7/24 potansiyel müşterileri nitelendirin, dönüştürün ve etkileşim kurun.',
      bookDemo: 'Demo Çağrısı Talep Et',
      tryVolina: 'Volina\'yı Dene',
      metric1Title: '%100',
      metric1Desc: 'yanıtlanan potansiyel müşteri',
      metric2Title: '%350',
      metric2Desc: 'randevu artışı',
      metric3Title: '+%45',
      metric3Desc: 'dönüşüm oranında artış',
    },
    problemSolution: {
      title: 'Kaçırılan Çağrıların Gizli Maliyeti',
      subtitle: 'Her cevaplanmayan çağrı, kaybedilen gelirdir. Geleneksel çağrı yönetiminin size maliyeti:',
      problem1Title: 'Kaçırılan Fırsatlar',
      problem1Desc: 'Müşterilerin %67\'si bir insana ulaşamazsa kapatır. Bu, elden çıkan gelirdir.',
      problem2Title: 'Yüksek İşletme Maliyetleri',
      problem2Desc: 'Çağrı merkezleri ajan başına saatte 30-50$ tutar. Ölçeklendirme pahalı ve sınırlıdır.',
      problem3Title: 'Tutarsız Kalite',
      problem3Desc: 'İnsan ajanların kötü günleri olur. Eğitim zaman alır. Kalite çok değişkendir.',
      solutionTitle: 'Volina AI Çözümü',
      solutionSubtitle: '7/24 çalışan, sonsuz ölçeklenebilen ve asla kötü günü olmayan AI ile çağrı operasyonlarınızı dönüştürün.',
      solution1Title: '7/24 Erişilebilirlik',
      solution1Desc: 'Her çağrıyı anında, günün her saatinde yanıtlayın. Artık kaçırılan fırsat veya kayıp potansiyel müşteri yok.',
      solution2Title: '10 Kat Maliyet Azaltma',
      solution2Desc: 'Pahalı çağrı merkezlerini %90 daha az maliyetli AI ajanlarla değiştirin.',
      solution3Title: 'Mükemmel Tutarlılık',
      solution3Desc: 'Her arayan aynı yüksek kaliteli deneyimi yaşar. Eğitim gerekmez, kötü gün olmaz.',
    },
    howItWorks: {
      title: 'Volina Nasıl Çalışır',
      subtitle: 'Aylar değil, dakikalar içinde başlayın. AI ses ajanlarımız mevcut sistemlerinizle sorunsuz entegre olur.',
      step1Title: 'Telefonunuzu Bağlayın',
      step1Desc: 'İşletme numaranızı bağlayın veya yeni bir numara alın. Karmaşık kurulum gerektirmez.',
      step2Title: 'AI Ajanı Özelleştirin',
      step2Desc: 'AI\'nızı işletmeniz, ürünleriniz ve tercih ettiğiniz konuşma tarzıyla eğitin.',
      step3Title: 'Yayına Geçin',
      step3Desc: 'AI ajanınızı etkinleştirin ve hemen çağrıları işlemeye başlayın.',
      step4Title: 'İzleyin ve Optimize Edin',
      step4Desc: 'Performansı takip edin, çağrıları inceleyin ve sonuçları sürekli iyileştirin.',
    },
    features: {
      title: 'İhtiyacınız Olan Her Şey',
      subtitle: 'AI ses ajanlarınızı insan ajanlardan ayırt edilemez hale getiren güçlü özellikler.',
      feature1Title: 'Doğal Konuşmalar',
      feature1Desc: 'AI\'mız bağlamı anlar, kesintileri yönetir ve doğal şekilde yanıt verir.',
      feature2Title: 'Çoklu Dil Desteği',
      feature2Desc: 'Mükemmel aksan ve dilbilgisiyle 30+ dilde küresel müşterilere hizmet verin.',
      feature3Title: 'CRM Entegrasyonu',
      feature3Desc: 'Salesforce, HubSpot ve 100+ araçla otomatik senkronizasyon.',
      feature4Title: 'Akıllı Randevu Planlama',
      feature4Desc: 'Çakışma algılama ile randevuları doğrudan takviminize kaydedin.',
      feature5Title: 'Gerçek Zamanlı Analitik',
      feature5Desc: 'Güzel panolarda çağrı metriklerini, dönüşüm oranlarını ve ROI\'yi izleyin.',
      feature6Title: 'Özel İş Akışları',
      feature6Desc: 'Dallanma mantığı ve koşullu yönlendirme ile karmaşık çağrı akışları tasarlayın.',
    },
    testimonials: {
      title: 'Büyünen Ekipler Tarafından Seviliyor',
      subtitle: 'İşletmelerin Volina AI ile çağrı operasyonlarını nasıl dönüştürdüklerini görün.',
      testimonial1Text: 'Volina AI, potansiyel müşteri yanıt süremizi 4 saatten anında yanıta çıkardı. Dönüşüm oranımız sadece ilk ayda %45 arttı.',
      testimonial1Author: 'Ayşe Yılmaz',
      testimonial1Role: 'Satış Başkan Yardımcısı, TechCorp',
      testimonial2Text: 'Mesai sonrası çağrıların %60\'ını kaçırmaktan %100\'ünü yanıtlamaya geçtik. Yatırım getirisi 3 hafta içinde pozitife döndü.',
      testimonial2Author: 'Mehmet Kaya',
      testimonial2Role: 'CEO, GrowthLabs',
      testimonial3Text: 'AI o kadar doğal konuşuyor ki müşteriler bir botla konuştuklarını anlamıyor. Gerçekten inanılmaz.',
      testimonial3Author: 'Elif Demir',
      testimonial3Role: 'Operasyon Direktörü, ServicePro',
    },
    adminPanel: {
      title: 'Tam Kontrol ve Görünürlük',
      subtitle: 'Güçlü yönetici panelimiyle AI ses ajanlarınızı izleyin, analiz edin ve optimize edin.',
      tab1: 'Panel',
      tab2: 'Analitik',
      tab3: 'Ayarlar',
      dashboardTitle: 'Çağrı Performans Özeti',
      totalCalls: 'Bugün Toplam Çağrı',
      successRate: 'Başarı Oranı',
      avgDuration: 'Ort. Süre',
      leadsConverted: 'Dönüştürülen Müşteriler',
      recentCalls: 'Son Çağrılar',
      caller: 'Arayan',
      duration: 'Süre',
      outcome: 'Sonuç',
      date: 'Tarih',
      qualified: 'Nitelikli Müşteri',
      followUp: 'Takip Planlandı',
      notInterested: 'İlgilenmiyor',
      scheduled: 'Toplantı Planlandı',
      tryDashboard: 'Paneli Dene',
    },
    pricing: {
      title: 'Basit, Şeffaf Fiyatlandırma',
      subtitle: 'İşletmenize uygun planı seçin. Gizli ücret yok, istediğiniz zaman iptal edin.',
      monthly: 'Aylık',
      annually: 'Yıllık',
      save20: '%20 Tasarruf',
      starter: 'Başlangıç',
      starterDesc: 'AI ses ajanlarını test eden küçük ekipler için mükemmel',
      starterPrice: '₺3.499',
      perMonth: '/ay',
      starterFeature1: 'Ayda 500 dakika',
      starterFeature2: '1 telefon numarası',
      starterFeature3: 'Temel analitik',
      starterFeature4: 'E-posta desteği',
      getStarted: 'Başlayın',
      professional: 'Profesyonel',
      professionalDesc: 'Daha fazla güce ihtiyaç duyan büyüyen işletmeler için',
      professionalPrice: '₺10.499',
      professionalFeature1: 'Ayda 2.000 dakika',
      professionalFeature2: '3 telefon numarası',
      professionalFeature3: 'Gelişmiş analitik',
      professionalFeature4: 'CRM entegrasyonları',
      professionalFeature5: 'Öncelikli destek',
      mostPopular: 'En Popüler',
      enterprise: 'Kurumsal',
      enterpriseDesc: 'Büyük organizasyonlar için özel çözümler',
      enterprisePrice: 'Özel',
      enterpriseFeature1: 'Sınırsız dakika',
      enterpriseFeature2: 'Sınırsız numara',
      enterpriseFeature3: 'Özel entegrasyonlar',
      enterpriseFeature4: 'Özel hesap yöneticisi',
      enterpriseFeature5: '7/24 telefon desteği',
      contactSales: 'Satış Ekibiyle İletişime Geç',
    },
    footer: {
      ctaTitle: 'Çağrı Sürecinizi Dönüştürmeye Hazır mısınız?',
      ctaSubtitle: 'Çağrılarını AI ile otomatikleştiren 2.000+ işletmeye katılın',
      bookDemo: 'Demo Çağrısı Talep Et',
      startTrial: 'Ücretsiz Denemeyi Başlat',
      description: 'İnsan gibi konuşan AI ses ajanlarıyla çağrılarınızı otomatikleştirin. Bir daha asla potansiyel müşteri kaçırmayın.',
      product: 'Ürün',
      productFeatures: 'Özellikler',
      productPricing: 'Fiyatlandırma',
      productCaseStudies: 'Vaka Çalışmaları',
      productIntegrations: 'Entegrasyonlar',
      productApiDocs: 'API Dökümanları',
      company: 'Şirket',
      companyAbout: 'Hakkımızda',
      companyCareers: 'Kariyer',
      companyBlog: 'Blog',
      companyPress: 'Basın Kiti',
      companyContact: 'İletişim',
      resources: 'Kaynaklar',
      resourcesHelp: 'Yardım Merkezi',
      resourcesCommunity: 'Topluluk',
      resourcesWebinars: 'Webinarlar',
      resourcesStatus: 'Durum',
      resourcesPartners: 'Ortaklar',
      legal: 'Yasal',
      legalPrivacy: 'Gizlilik Politikası',
      legalTerms: 'Hizmet Şartları',
      legalCookies: 'Çerez Politikası',
      legalGdpr: 'KVKK',
      copyright: '© 2025 Volina AI. Tüm hakları saklıdır.',
      privacy: 'Gizlilik',
      terms: 'Şartlar',
      cookies: 'Çerezler',
    },
    modal: {
      demoTitle: 'Demo Talebinde Bulunun',
      demoSubtitle: 'Volina AI\'nın çağrı operasyonlarınızı nasıl dönüştürebileceğini görün',
      demoName: 'Ad Soyad',
      demoEmail: 'İş E-postası',
      demoPhone: 'Telefon Numarası',
      demoCompany: 'Şirket Adı',
      demoSector: 'Sektör',
      demoSectorPlaceholder: 'Sektörünüzü seçin',
      demoSectorDental: 'Diş Hekimliği',
      demoSectorRestaurant: 'Restoran',
      demoSectorEcommerce: 'E-ticaret',
      demoSectorOther: 'Diğer',
      demoEmployees: 'Çalışan Sayısı',
      demoMessage: 'İhtiyaçlarınızı anlatın',
      demoSubmit: 'Demo Planla',
      demoSuccess: 'Demo Planlandı!',
      demoSuccessMessage: 'Size kısa süre içinde sonraki adımları içeren bir onay e-postası göndereceğiz.',
      tryAssistantName: 'Volina AI Asistanı',
      tryExperience: 'AI ses ajanımızı deneyimleyin',
      tryFeature1: 'Doğal konuşma akışı',
      tryFeature2: 'Gerçek zamanlı ses tanıma',
      tryFeature3: 'Akıllı randevu planlama',
      tryFeature4: 'Çoklu dil desteği',
      tryStartCall: 'Sesli Aramayı Başlat',
      tryMicRequired: 'Mikrofon Erişimi Gerekli',
      tryMicDescription: 'Sesli aramayı başlatmak için tarayıcınız mikrofon izni istediğinde "İzin Ver"e tıklayın.',
      tryLimitedPreview: 'Figma Önizlemesinde Sınırlı',
      tryLimitedPreviewDesc: 'Tam ses işlevselliği için yeni bir sekmede açın veya gerçek bir web sitesine dağıtın.',
      tryPrivateSecure: 'Sesiniz gizli ve güvenlidir',
      tryAllow: 'Mikrofona İzin Ver ve Aramayı Başlat',
      tryCancel: 'İptal',
      tryConnecting: 'Bağlanıyor...',
      tryActiveCall: 'Aktif Çağrı',
      tryMicActive: '🎤 Mikrofon Aktif - Konuşmaya Başlayın!',
      tryMicMuted: 'Mikrofon Kapalı',
      tryMicActiveDesc: 'Konuşmaya başlayın - AI sesinize yanıt verecek',
      tryMicMutedDesc: 'Sesi açmak için aşağıdaki mikrofon düğmesine tıklayın',
      tryLiveTranscript: 'Canlı Transkript',
      tryAI: 'AI',
      tryYou: 'Siz',
      tryCallEnded: 'Çağrı Sonlandı',
      tryDuration: 'Süre',
      tryThankYou: 'Volina AI\'yı denediğiniz için teşekkürler!',
      trySecureConnection: '🔒 Güvenli ses bağlantısı',
      tryInitializing: 'Ses bağlantısı başlatılıyor...',
    },
  },
};