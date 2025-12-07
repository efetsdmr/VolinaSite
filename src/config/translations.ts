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
    testimonial4Text: string;
    testimonial4Author: string;
    testimonial4Role: string;
    tryModel: string;
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

  // Admin Login
  adminLogin: {
    title: string;
    subtitle: string;
    username: string;
    usernamePlaceholder: string;
    password: string;
    passwordPlaceholder: string;
    signIn: string;
    signingIn: string;
    backToHome: string;
    errorInvalidCredentials: string;
    errorConnection: string;
  };

  // Admin Dashboard
  adminDashboard: {
    title: string;
    logout: string;
    demoRequests: string;
    noRequests: string;
    totalRequests: string;
    totalCalls: string;
    avgDuration: string;
    totalCost: string;
    avgCost: string;
    callSuccess: string;
    chartTitle: string;
    name: string;
    email: string;
    phone: string;
    company: string;
    sector: string;
    message: string;
    date: string;
    actions: string;
    viewDetails: string;
    requestDetails: string;
    close: string;
    loading: string;
    // Settings translations
    settingsTitle: string;
    settingsSubtitle: string;
    createAssistant: string;
    searchAssistants: string;
    assistantName: string;
    assistantNamePlaceholder: string;
    voiceSettings: string;
    selectVoice: string;
    voiceSearchPlaceholder: string;
    voiceMaleTurkish: string;
    voiceFemaleTurkish: string;
    voiceMaleEnglish: string;
    voiceFemaleEnglish: string;
    behaviorSettings: string;
    behaviorPlaceholder: string;
    workingHours: string;
    startTime: string;
    endTime: string;
    saveSettings: string;
    settingsSaved: string;
    knowledgeBase: string;
    uploadFile: string;
    orDragDrop: string;
    // Analytics translations
    metrics: string;
    groupedBy: string;
    days: string;
    weeks: string;
    months: string;
    allAssistants: string;
    totalCallMinutes: string;
    numberOfCalls: string;
    totalSpent: string;
    avgCostPerCall: string;
    callAnalysis: string;
    reasonCallEnded: string;
    avgCallDurationByAssistant: string;
    startDate: string;
    endDate: string;
    cancel: string;
    apply: string;
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
    demoNamePlaceholder: string;
    demoEmail: string;
    demoEmailPlaceholder: string;
    demoPhone: string;
    demoPhonePlaceholder: string;
    demoCompany: string;
    demoCompanyPlaceholder: string;
    demoSector: string;
    demoSectorPlaceholder: string;
    demoSectorDental: string;
    demoSectorRestaurant: string;
    demoSectorEcommerce: string;
    demoSectorOther: string;
    demoMessage: string;
    demoMessagePlaceholder: string;
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
      caseStudies: 'Customer Stories',
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
      testimonial1Text: 'Volina AI increased our lead response time from 4 hours to instant response. Our conversion rate increased by 45% in just the first month.',
      testimonial1Author: 'FormLab',
      testimonial1Role: 'Nutrition and Consulting',
      testimonial2Text: 'Our reservation line was constantly busy. Now we handle many more reservations with zero wait time.',
      testimonial2Author: 'L\'Ancora',
      testimonial2Role: 'Seafood Restaurant',
      testimonial3Text: 'No potential patient is missed anymore. The AI assistant greets customers who call at any time of day, answers their questions, and books appointments.',
      testimonial3Author: 'Smile and Holiday',
      testimonial3Role: 'Dental Clinic',
      testimonial4Text: 'We receive approximately 500 reservation requests per month. Volina AI handles them all seamlessly, and our customers are delighted with the instant service.',
      testimonial4Author: 'Latife Meyhane Bestekar',
      testimonial4Role: 'Traditional Turkish Tavern',
      tryModel: 'Try the Model',
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
    adminLogin: {
      title: 'Admin Login',
      subtitle: 'Please enter your credentials to access the admin panel.',
      username: 'Username',
      usernamePlaceholder: 'Enter your username',
      password: 'Password',
      passwordPlaceholder: 'Enter your password',
      signIn: 'Sign In',
      signingIn: 'Signing In...',
      backToHome: 'Back to Home',
      errorInvalidCredentials: 'Invalid username or password. Please try again.',
      errorConnection: 'Connection error. Please try again later.',
    },
    adminDashboard: {
      title: 'Admin Dashboard',
      logout: 'Logout',
      demoRequests: 'Demo Requests',
      noRequests: 'No demo requests yet.',
      totalRequests: 'Total Requests',
      totalCalls: 'Total Calls',
      avgDuration: 'Avg Duration',
      totalCost: 'Total Cost',
      avgCost: 'Avg Cost',
      callSuccess: 'Call Success',
      chartTitle: 'Call Performance',
      name: 'Name',
      email: 'Email',
      phone: 'Phone',
      company: 'Company',
      sector: 'Sector',
      message: 'Message',
      date: 'Date',
      actions: 'Actions',
      viewDetails: 'View Details',
      requestDetails: 'Request Details',
      close: 'Close',
      loading: 'Loading...',
      // Settings translations
      settingsTitle: 'Assistant Settings',
      settingsSubtitle: 'Configure your AI assistant\'s voice, behavior, and working hours',
      createAssistant: 'Create New Assistant',
      searchAssistants: 'Search assistants...',
      assistantName: 'Assistant Name',
      assistantNamePlaceholder: 'E.g: Customer Service Assistant',
      voiceSettings: 'Voice Settings',
      selectVoice: 'Select Voice',
      voiceSearchPlaceholder: 'Search voice...',
      voiceMaleTurkish: 'Male Voice (Turkish)',
      voiceFemaleTurkish: 'Female Voice (Turkish)',
      voiceMaleEnglish: 'Male Voice (English)',
      voiceFemaleEnglish: 'Female Voice (English)',
      behaviorSettings: 'Behavior Settings',
      behaviorPlaceholder: 'Write how you want your assistant to behave. E.g: "Be polite and professional with customers. Provide detailed answers to questions."',
      workingHours: 'Working Hours',
      startTime: 'Start Time',
      endTime: 'End Time',
      saveSettings: 'Save Settings',
      settingsSaved: 'Settings saved successfully!',
      knowledgeBase: 'Knowledge Base',
      uploadFile: 'Upload file',
      orDragDrop: 'or drag and drop',
      // Analytics translations
      metrics: 'Metrics',
      groupedBy: 'Grouped By',
      days: 'Days',
      weeks: 'Weeks',
      months: 'Months',
      allAssistants: 'All Assistants',
      totalCallMinutes: 'Total Call Minutes',
      numberOfCalls: 'Number of Calls',
      totalSpent: 'Total Spent',
      avgCostPerCall: 'Avg Cost Per Call',
      callAnalysis: 'Call Analysis',
      reasonCallEnded: 'Reason Call Ended',
      avgCallDurationByAssistant: 'Avg Call Duration By Assistant',
      startDate: 'Start Date',
      endDate: 'End Date',
      cancel: 'Cancel',
      apply: 'Apply',
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
      productCaseStudies: 'Customer Stories',
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
      demoNamePlaceholder: 'John Smith',
      demoEmail: 'Work Email',
      demoEmailPlaceholder: 'john@acme.com',
      demoPhone: 'Phone Number',
      demoPhonePlaceholder: '+1 (555) 123-4567',
      demoCompany: 'Company Name',
      demoCompanyPlaceholder: 'Acme Inc.',
      demoSector: 'Sector',
      demoSectorPlaceholder: 'Select your sector',
      demoSectorDental: 'Dental',
      demoSectorRestaurant: 'Restaurant',
      demoSectorEcommerce: 'E-commerce',
      demoSectorOther: 'Other',
      demoMessage: 'Tell us about your needs',
      demoMessagePlaceholder: 'Tell us about your use case...',
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
      caseStudies: 'Müşteri Hikayeleri',
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
      testimonial1Author: 'FormLab',
      testimonial1Role: 'Beslenme ve Danışmanlık',
      testimonial2Text: 'Rezervasyon hattımız sürekli meşguldü. Şimdi sıfır bekleme süresiyle çok daha fazla rezervasyon işliyoruz.',
      testimonial2Author: 'L\'Ancora',
      testimonial2Role: 'Balık Restoranı',
      testimonial3Text: 'Artık hiçbir potansiyel hasta kaçmıyor. AI asistan günün her saati arayan müşterileri karşılıyor, sorularını yanıtlıyor ve randevu alıyor.',
      testimonial3Author: 'Smile and Holiday',
      testimonial3Role: 'Diş Kliniği',
      testimonial4Text: 'Aylık yaklaşık 500 rezervasyon talebi alıyoruz. Volina AI hepsini kusursuz bir şekilde hallediyor ve müşterilerimiz anında hizmetten çok memnun.',
      testimonial4Author: 'Latife Meyhane Bestekar',
      testimonial4Role: 'Geleneksel Türk Meyhanesi',
      tryModel: 'Modeli Dene',
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
    adminLogin: {
      title: 'Yönetici Girişi',
      subtitle: 'Yönetici paneline erişmek için kimlik bilgilerinizi girin.',
      username: 'Kullanıcı Adı',
      usernamePlaceholder: 'Kullanıcı adınızı girin',
      password: 'Şifre',
      passwordPlaceholder: 'Şifrenizi girin',
      signIn: 'Giriş Yap',
      signingIn: 'Giriş Yapılıyor...',
      backToHome: 'Anasayfaya Geri Dön',
      errorInvalidCredentials: 'Geçersiz kullanıcı adı veya şifre. Lütfen tekrar deneyin.',
      errorConnection: 'Bağlantı hatası. Lütfen daha sonra tekrar deneyin.',
    },
    adminDashboard: {
      title: 'Admin Dashboard',
      logout: 'Çıkış Yap',
      demoRequests: 'Demo Talepleri',
      noRequests: 'Henüz demo talebi yok.',
      totalRequests: 'Toplam Talep',
      totalCalls: 'Toplam Çağrı',
      avgDuration: 'Ort. Süre',
      totalCost: 'Toplam Maliyet',
      avgCost: 'Ort. Maliyet',
      callSuccess: 'Çağrı Başarı',
      chartTitle: 'Çağrı Performansı',
      name: 'Ad Soyad',
      email: 'E-posta',
      phone: 'Telefon',
      company: 'Şirket',
      sector: 'Sektör',
      message: 'Mesaj',
      date: 'Tarih',
      actions: 'Eylemler',
      viewDetails: 'Detayları Görüntüle',
      requestDetails: 'Talep Detayları',
      close: 'Kapat',
      loading: 'Yükleniyor...',
      // Settings translations
      settingsTitle: 'Asistan Ayarları',
      settingsSubtitle: 'AI asistanınızın ses, davranış ve çalışma saatlerini yapılandırın',
      createAssistant: 'Yeni Asistan',
      searchAssistants: 'Asistan ara...',
      assistantName: 'Asistan Adı',
      assistantNamePlaceholder: 'Örn: Müşteri Hizmetleri Asistanı',
      voiceSettings: 'Ses Ayarları',
      selectVoice: 'Ses Seçin',
      voiceSearchPlaceholder: 'Ses ara...',
      voiceMaleTurkish: 'Erkek Ses (Türkçe)',
      voiceFemaleTurkish: 'Kadın Ses (Türkçe)',
      voiceMaleEnglish: 'Erkek Ses (İngilizce)',
      voiceFemaleEnglish: 'Kadın Ses (İngilizce)',
      behaviorSettings: 'Davranış Ayarları',
      behaviorPlaceholder: 'Asistanın nasıl davranmasını istediğinizi yazın. Örn: "Müşterilere nazik ve profesyonel bir şekilde davran. Sorulara detaylı cevaplar ver."',
      workingHours: 'Çalışma Saatleri',
      startTime: 'Başlangıç Saati',
      endTime: 'Bitiş Saati',
      saveSettings: 'Ayarları Kaydet',
      settingsSaved: 'Ayarlar başarıyla kaydedildi!',
      knowledgeBase: 'Bilgi Bankası',
      uploadFile: 'Dosya yükle',
      orDragDrop: 'veya sürükle bırak',
      // Analytics translations
      metrics: 'Metrikler',
      groupedBy: 'Gruplanan',
      days: 'Günler',
      weeks: 'Haftalar',
      months: 'Aylar',
      allAssistants: 'Tüm Asistanlar',
      totalCallMinutes: 'Toplam Çağrı Dakikası',
      numberOfCalls: 'Çağrı Sayısı',
      totalSpent: 'Toplam Harcama',
      avgCostPerCall: 'Çağrı Başına Ortalama Maliyet',
      callAnalysis: 'Çağrı Analizi',
      reasonCallEnded: 'Çağrı Nedeniyle Sonlandırıldı',
      avgCallDurationByAssistant: 'Asistan Başına Ortalama Çağrı Süresi',
      startDate: 'Başlangıç Tarihi',
      endDate: 'Bitiş Tarihi',
      cancel: 'İptal',
      apply: 'Uygula',
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
      productCaseStudies: 'Müşteri Hikayeleri',
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
      demoNamePlaceholder: 'Ahmet Yılmaz',
      demoEmail: 'İş E-postası',
      demoEmailPlaceholder: 'ahmet@ornek.com.tr',
      demoPhone: 'Telefon Numarası',
      demoPhonePlaceholder: '+90 (555) 123-4567',
      demoCompany: 'Şirket Adı',
      demoCompanyPlaceholder: 'Örnek A.Ş.',
      demoSector: 'Sektör',
      demoSectorPlaceholder: 'Sektörünüzü seçin',
      demoSectorDental: 'Diş Hekimliği',
      demoSectorRestaurant: 'Restoran',
      demoSectorEcommerce: 'E-ticaret',
      demoSectorOther: 'Diğer',
      demoMessage: 'İhtiyaçlarınızı anlatın',
      demoMessagePlaceholder: 'Kullanım senaryonuzu anlatın...',
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