import { Language } from '../types';

export interface TranslationStrings {
  brandTagline: string;
  brandSubtext: string;
  nav: {
    features: string;
    tools: string;
    planner: string;
    assistant: string;
    pricing: string;
    dashboard: string;
    launchStudio: string;
  };
  hero: {
    badge: string;
    title1: string;
    titleHighlight: string;
    title2: string;
    description: string;
    ctaPrimary: string;
    ctaSecondary: string;
    socialProof: string;
    statsGenerations: string;
    statsCreators: string;
    statsTimeSaved: string;
  };
  toolsNav: {
    captions: string;
    scripts: string;
    ideas: string;
    hashtags: string;
    planner: string;
    assistant: string;
  };
  captions: {
    title: string;
    subtitle: string;
    nichePlaceholder: string;
    topicLabel: string;
    platformLabel: string;
    toneLabel: string;
    langLabel: string;
    btnGenerate: string;
    generating: string;
    variation1: string;
    variation2: string;
    variation3: string;
  };
  scripts: {
    title: string;
    subtitle: string;
    topicLabel: string;
    durationLabel: string;
    styleLabel: string;
    btnGenerate: string;
  };
  ideas: {
    title: string;
    subtitle: string;
    nicheLabel: string;
    pillarLabel: string;
    btnGenerate: string;
  };
  hashtags: {
    title: string;
    subtitle: string;
    keywordLabel: string;
    btnGenerate: string;
  };
  planner: {
    title: string;
    subtitle: string;
    exportCsv: string;
    markAllReady: string;
  };
  assistant: {
    title: string;
    subtitle: string;
    chatPlaceholder: string;
    suggestedPrompts: string;
  };
  dashboard: {
    title: string;
    welcome: string;
    creditsRemaining: string;
    savedItems: string;
    planBadge: string;
    upgradePlan: string;
  };
  pricing: {
    title: string;
    subtitle: string;
    monthly: string;
    annual: string;
    saveDiscount: string;
    getStarted: string;
    currentPlan: string;
    guarantee: string;
  };
  creator: {
    badge: string;
    title: string;
    description: string;
    quote: string;
    role: string;
  };
  common: {
    copy: string;
    copied: string;
    save: string;
    saved: string;
    close: string;
    search: string;
    clear: string;
    filter: string;
  };
}

export const translations: Record<Language, TranslationStrings> = {
  en: {
    brandTagline: 'Create Smarter. Grow Faster.',
    brandSubtext: 'The all-in-one AI engine crafted for creators, marketers, and modern digital businesses.',
    nav: {
      features: 'Features',
      tools: 'AI Tools',
      planner: '30-Day Planner',
      assistant: 'Marketing AI',
      pricing: 'Pricing',
      dashboard: 'Dashboard',
      launchStudio: 'Start Creating Free',
    },
    hero: {
      badge: 'Next-Gen Global Social AI Suite',
      title1: 'Supercharge Your Content.',
      titleHighlight: 'Create Smarter.',
      title2: 'Grow Faster.',
      description: 'Stop staring at a blank screen. Generate viral hooks, high-converting captions, cinematic reel scripts, 30-day content calendars, and multilingual campaigns in seconds.',
      ctaPrimary: 'Explore Free AI Tools',
      ctaSecondary: 'View 30-Day Planner',
      socialProof: 'Trusted by 45,000+ creators & brands across 80+ countries',
      statsGenerations: '4.8M+ Generated',
      statsCreators: '45,000+ Active Creators',
      statsTimeSaved: '18 hrs/week Saved',
    },
    toolsNav: {
      captions: 'AI Captions',
      scripts: 'Reel Scripts',
      ideas: 'Viral Ideas',
      hashtags: 'Hashtag Matrix',
      planner: '30-Day Planner',
      assistant: 'Marketing AI',
    },
    captions: {
      title: 'AI Social Caption Generator',
      subtitle: 'Craft viral hooks, persuasive body copy, and irresistible calls to action tailored to each platform.',
      nichePlaceholder: 'e.g., Luxury minimalist sneakers launch, productivity habits for founders, healthy meal prep',
      topicLabel: 'What is your post about?',
      platformLabel: 'Target Platform',
      toneLabel: 'Tone of Voice',
      langLabel: 'Output Language',
      btnGenerate: 'Generate Viral Captions',
      generating: 'Synthesizing viral variations...',
      variation1: 'The Storyteller (High Retention)',
      variation2: 'The Viral Hook (Punchy & Direct)',
      variation3: 'The Value Play (Save & Share Magnet)',
    },
    scripts: {
      title: 'AI Reel & Shorts Script Generator',
      subtitle: 'Get production-ready, timestamped scripts with visual cues, voiceovers, on-screen text, and loop mechanics.',
      topicLabel: 'Reel Topic or Concept',
      durationLabel: 'Target Video Length',
      styleLabel: 'Visual & Camera Style',
      btnGenerate: 'Generate Video Script',
    },
    ideas: {
      title: 'Viral Content Ideas Generator',
      subtitle: 'Never run out of high-converting content concepts. Structured across 5 proven marketing pillars.',
      nicheLabel: 'Your Business Niche / Industry',
      pillarLabel: 'Core Content Pillar',
      btnGenerate: 'Uncover 5 Viral Angles',
    },
    hashtags: {
      title: 'Smart Hashtag Reach Matrix',
      subtitle: 'Categorized by High Volume, Active Discovery, and Hyper-Targeted Niche communities.',
      keywordLabel: 'Seed Keyword or Industry Focus',
      btnGenerate: 'Generate Reach Matrix',
    },
    planner: {
      title: '30-Day Strategic Content Planner',
      subtitle: 'A complete monthly roadmap of high-converting posts categorized into weekly strategic themes.',
      exportCsv: 'Export Schedule (.csv)',
      markAllReady: 'Schedule All Posts',
    },
    assistant: {
      title: 'Shoreem AI Marketing Strategist',
      subtitle: 'Your dedicated CMO in a chatbox. Get actionable advice, audit funnels, and build campaign roadmaps.',
      chatPlaceholder: 'Ask anything (e.g. How do I turn reel viewers into email subscribers?)...',
      suggestedPrompts: 'Quick Strategy Templates',
    },
    dashboard: {
      title: 'Creator Studio Dashboard',
      welcome: 'Welcome to Shoreem.io',
      creditsRemaining: 'AI Credits Remaining',
      savedItems: 'Saved Assets in Library',
      planBadge: 'Current Tier',
      upgradePlan: 'Upgrade Plan',
    },
    pricing: {
      title: 'Simple, Transparent Pricing',
      subtitle: 'Empowering solo creators and global teams alike. Pick the plan that fits your growth ambitions.',
      monthly: 'Billed Monthly',
      annual: 'Billed Annually',
      saveDiscount: 'Save 20%',
      getStarted: 'Get Started',
      currentPlan: 'Active Plan',
      guarantee: '14-day money back guarantee · No credit card required for demo',
    },
    creator: {
      badge: 'Vision & Leadership',
      title: 'Meet the Creator Behind Shoreem.io',
      description: 'Shoreem.io was conceptualized and spearheaded by Aneela Israr to democratize world-class content intelligence for creators, founders, and cross-border businesses everywhere.',
      quote: '"Our mission is simple: eliminate creative friction and empower creators worldwide to express their authentic voice with effortless speed and global scale."',
      role: 'Founder & Lead Architect',
    },
    common: {
      copy: 'Copy',
      copied: 'Copied!',
      save: 'Save to Studio',
      saved: 'Saved in Library',
      close: 'Close',
      search: 'Search...',
      clear: 'Clear',
      filter: 'Filter',
    },
  },
  ur: {
    brandTagline: 'سوچیں بہتر۔ بڑھیں تیز تر۔',
    brandSubtext: 'تخلیق کاروں، مارکیٹرز اور جدید ڈیجیٹل کاروباروں کے لیے ہمہ گیر AI پلیٹ فارم۔',
    nav: {
      features: 'خصوصیات',
      tools: 'اے آئی ٹولز',
      planner: '30 روزہ منصوبہ',
      assistant: 'مارکیٹنگ اسسٹنٹ',
      pricing: 'قیمتیں',
      dashboard: 'ڈیش بورڈ',
      launchStudio: 'مفت آغاز کریں',
    },
    hero: {
      badge: 'جدید ترین عالمی سوشل اے آئی سوٹ',
      title1: 'اپنے مواد کو نئی بلندی دیں',
      titleHighlight: 'سوچیں بہتر۔',
      title2: 'بڑھیں تیز تر۔',
      description: 'خالی سکرین دیکھ کر پریشان ہونا چھوڑیں۔ سیکنڈوں میں وائرل کیپشنز، ریل اسکرپٹس، 30 دن کا مواد پلانر اور کثیر لسانی مہمات تیار کریں۔',
      ctaPrimary: 'مفت ٹولز آزمائیں',
      ctaSecondary: '30 روزہ شیڈول دیکھیں',
      socialProof: '80 سے زائد ممالک کے 45,000+ تخلیق کاروں کا بھروسہ',
      statsGenerations: '4.8M+ تیار کردہ مواد',
      statsCreators: '45,000+ متحرک صارفین',
      statsTimeSaved: '18 گھنٹے فی ہفتہ بچت',
    },
    toolsNav: {
      captions: 'کیپشن جنریٹر',
      scripts: 'ریلز اسکرپٹس',
      ideas: 'وائرل آئیڈیاز',
      hashtags: 'ہیش ٹیگ میٹرکس',
      planner: '30 روزہ پلانر',
      assistant: 'مارکیٹنگ اے آئی',
    },
    captions: {
      title: 'اے آئی سوشل میڈیا کیپشن جنریٹر',
      subtitle: 'ہر پلیٹ فارم کے لیے دلکش جملے، کہانی اور اثر انگیز ترغیبات حاصل کریں۔',
      nichePlaceholder: 'مثال کے طور پر: فیشن برانڈ، آن لائن کاروبار، روزمرہ عادات، ٹیکنالوجی ٹپس',
      topicLabel: 'آپ کی پوسٹ کس بارے میں ہے؟',
      platformLabel: 'پلیٹ فارم',
      toneLabel: 'انداز تحریر',
      langLabel: 'زبان',
      btnGenerate: 'کیپشن تیار کریں',
      generating: 'وائرل کیپشنز تیار ہو رہے ہیں...',
      variation1: 'کہانی کا انداز (زیادہ ریٹینشن)',
      variation2: 'وائرل ہک (مختصر اور پرجوش)',
      variation3: 'قیمتی نکات (شیئر اور محفوظ کرنے کے لیے)',
    },
    scripts: {
      title: 'اے آئی ریل اور شارٹس اسکرپٹ جنریٹر',
      subtitle: 'ویڈیو کیمرہ اینگلز، وائس اوور اور آن اسکرین تحریر کے ساتھ مکمل اسکرپٹ۔',
      topicLabel: 'ویڈیو کا موضوع یا مرکزی خیال',
      durationLabel: 'ویڈیو کا دورانیہ',
      styleLabel: 'کیمرہ اور ویڈیو کا انداز',
      btnGenerate: 'ویڈیو اسکرپٹ تیار کریں',
    },
    ideas: {
      title: 'وائرل کنٹینٹ آئیڈیاز جنریٹر',
      subtitle: 'روزانہ کے منفرد اور اثر انگیز موضوعات جو آپ کے فالورز کو بڑھائیں۔',
      nicheLabel: 'آپ کی فیلڈ یا انڈسٹری',
      pillarLabel: 'مواد کی کیٹیگری',
      btnGenerate: '5 وائرل آئیڈیاز حاصل کریں',
    },
    hashtags: {
      title: 'اسمارٹ ہیش ٹیگ ریچ میٹرکس',
      subtitle: 'بڑی ریچ اور مخصوص فالورز کے لیے الگ الگ بہترین ہیش ٹیگز۔',
      keywordLabel: 'موضوع یا انڈسٹری کا نام',
      btnGenerate: 'ہیش ٹیگز حاصل کریں',
    },
    planner: {
      title: '30 روزہ اسٹریٹجک مواد کیلنڈر',
      subtitle: 'پورے مہینے کے لیے ترتیب وار اور منظم سوشل میڈیا پوسٹس کا منصوبہ۔',
      exportCsv: 'شیڈول ڈاؤنلوڈ کریں (.csv)',
      markAllReady: 'تمام پوسٹس فائنل کریں',
    },
    assistant: {
      title: 'شوریم اے آئی مارکیٹنگ ماہر',
      subtitle: 'آپ کا پرسنل مارکیٹنگ ڈائریکٹر جو آپ کو فالوورز بڑھانے اور سیلز لانے میں رہنمائی کرتا ہے۔',
      chatPlaceholder: 'کوئی بھی سوال پوچھیں (جیسے: انسٹاگرام ریلز پر سیلز کیسے بڑھائیں؟)...',
      suggestedPrompts: 'فوری حکمت عملی کے سانچے',
    },
    dashboard: {
      title: 'کریئیٹر اسٹوڈیو ڈیش بورڈ',
      welcome: 'شوریم ڈاٹ آئی او میں خوش آمدید',
      creditsRemaining: 'باقی کریڈٹس',
      savedItems: 'محفوظ شدہ آئٹمز',
      planBadge: 'موجودہ پلان',
      upgradePlan: 'پلان اپ گریڈ کریں',
    },
    pricing: {
      title: 'آسان اور شفاف قیمتیں',
      subtitle: 'انفرادی تخلیق کاروں اور عالمی کمپنیوں دونوں کے لیے موزوں۔',
      monthly: 'ماہانہ بلنگ',
      annual: 'سالانہ بلنگ',
      saveDiscount: '20% کی بچت',
      getStarted: 'شروع کریں',
      currentPlan: 'فعال پلان',
      guarantee: '14 دن رقم واپسی کی ضمانت · ڈیمو کے لیے کارڈ کی ضرورت نہیں',
    },
    creator: {
      badge: 'بانی اور وژن',
      title: 'شوریم کی تخلیق کار: انیلہ اسرار',
      description: 'شوریم ڈاٹ آئی او کو انیلہ اسرار (Aneela Israr) نے دنیا بھر کے کریئیٹرز اور کاروباری اداروں کو جدید ترین اے آئی طاقت فراہم کرنے کے لیے تخلیق کیا۔',
      quote: '"ہمارا مقصد ہر اس شخص کو غیر معمولی رفتار اور اعتماد بخشنا ہے جو اپنے خیالات دنیا تک پہنچانا چاہتا ہے۔"',
      role: 'بانی اور چیف آرکیٹیکٹ',
    },
    common: {
      copy: 'کاپی کریں',
      copied: 'کاپی ہو گیا!',
      save: 'محفوظ کریں',
      saved: 'لائبریری میں محفوظ',
      close: 'بند کریں',
      search: 'تلاش کریں...',
      clear: 'صاف کریں',
      filter: 'فلٹر',
    },
  },
  'ur-roman': {
    brandTagline: 'Create Smarter. Grow Faster.',
    brandSubtext: 'Creators, marketers aur digital businesses ke liye ultimate AI SaaS platform.',
    nav: {
      features: 'Features',
      tools: 'AI Tools',
      planner: '30-Day Planner',
      assistant: 'Marketing AI',
      pricing: 'Pricing',
      dashboard: 'Dashboard',
      launchStudio: 'Free Start Karein',
    },
    hero: {
      badge: 'Next-Gen Global Social AI Suite',
      title1: 'Apna Content Level-Up Karein.',
      titleHighlight: 'Create Smarter.',
      title2: 'Grow Faster.',
      description: 'Khali screen dekhna band karein. Seconds mein viral hooks, killer captions, cinematic reel scripts, 30-day content calendar aur multilingual campaigns generate karein.',
      ctaPrimary: 'Free AI Tools Try Karein',
      ctaSecondary: '30-Day Planner Dekhein',
      socialProof: '80+ mulkon ke 45,000+ creators aur brands ka bharosa',
      statsGenerations: '4.8M+ Generated',
      statsCreators: '45,000+ Active Creators',
      statsTimeSaved: '18 ghante/hafta bachat',
    },
    toolsNav: {
      captions: 'AI Captions',
      scripts: 'Reel Scripts',
      ideas: 'Viral Ideas',
      hashtags: 'Hashtag Matrix',
      planner: '30-Day Planner',
      assistant: 'Marketing AI',
    },
    captions: {
      title: 'AI Social Caption Generator',
      subtitle: 'Har platform ke liye zabardast hooks, engaging story aur high-converting CTA banayein.',
      nichePlaceholder: 'e.g., E-commerce store launch, fitness habits, freelance tips',
      topicLabel: 'Aapki post kis topic par hai?',
      platformLabel: 'Platform Choose Karein',
      toneLabel: 'Tone of Voice',
      langLabel: 'Zuban (Language)',
      btnGenerate: 'Viral Captions Generate Karein',
      generating: 'Captions tayyar ho rahe hain...',
      variation1: 'The Storyteller (High Retention)',
      variation2: 'The Viral Hook (Tez aur Asardar)',
      variation3: 'The Value Play (Save & Share Karein)',
    },
    scripts: {
      title: 'AI Reel & Shorts Script Generator',
      subtitle: 'Camera cues, voiceover script, text-on-screen aur seamless loop ke sath complete script.',
      topicLabel: 'Video ka topic ya concept',
      durationLabel: 'Video Duration',
      styleLabel: 'Visual Style',
      btnGenerate: 'Video Script Tayyar Karein',
    },
    ideas: {
      title: 'Viral Content Ideas Generator',
      subtitle: 'Kabhi content ideas ki kami na ho. 5 proven content pillars par based concepts.',
      nicheLabel: 'Aapka Niche / Industry',
      pillarLabel: 'Content Pillar',
      btnGenerate: '5 Viral Ideas Dekhein',
    },
    hashtags: {
      title: 'Smart Hashtag Reach Matrix',
      subtitle: 'High reach aur targeted niche audience ke liye categorized hashtags.',
      keywordLabel: 'Keyword ya Niche Topic',
      btnGenerate: 'Hashtags Nikalein',
    },
    planner: {
      title: '30-Day Strategic Content Planner',
      subtitle: 'Pore month ka structured roadmap jo daily content consistency banaye rakhe.',
      exportCsv: 'Schedule Export Karein (.csv)',
      markAllReady: 'All Posts Schedule Karein',
    },
    assistant: {
      title: 'Shoreem AI Marketing Assistant',
      subtitle: 'Aapka personal growth strategist jo aapko sales aur audience barhane mein guide kare.',
      chatPlaceholder: 'Kuch bhi poochein (e.g. Reels se followers kaise barhayein?)...',
      suggestedPrompts: 'Quick Strategy Templates',
    },
    dashboard: {
      title: 'Creator Studio Dashboard',
      welcome: 'Shoreem.io mein khush-aamdeed',
      creditsRemaining: 'Baqi AI Credits',
      savedItems: 'Saved Library Assets',
      planBadge: 'Current Plan',
      upgradePlan: 'Plan Upgrade Karein',
    },
    pricing: {
      title: 'Aasan aur Transparent Pricing',
      subtitle: 'Solo creators aur global teams sab ke liye munāsib plans.',
      monthly: 'Monthly Billing',
      annual: 'Annual Billing',
      saveDiscount: '20% Bachat',
      getStarted: 'Shuru Karein',
      currentPlan: 'Active Plan',
      guarantee: '14 din money-back guarantee · Demo ke liye card ki zaroorat nahi',
    },
    creator: {
      badge: 'Founder & Vision',
      title: 'Shoreem.io ki Creator: Aneela Israr',
      description: 'Shoreem.io ko Aneela Israr ne conceptualize kiya taake duniya bhar ke creators aur businesses ko AI ki madad se tez aur behtareen content banane ka moqa mile.',
      quote: '"Hamara maqsad hai ke har creator bina kisi rukawat ke apni authentic aawaz duniya tak pohnchaye."',
      role: 'Founder & Lead Architect',
    },
    common: {
      copy: 'Copy',
      copied: 'Copy ho gaya!',
      save: 'Save Karein',
      saved: 'Library mein Saved',
      close: 'Band Karein',
      search: 'Search...',
      clear: 'Clear',
      filter: 'Filter',
    },
  },
  ar: {
    brandTagline: 'ابتكر بذكاء. انمُ بسرعة.',
    brandSubtext: 'المنصة الذكية المتكاملة لصناع المحتوى والمسوقين والشركات الرقمية الحديثة.',
    nav: {
      features: 'الميزات',
      tools: 'أدوات الذكاء الاصطناعي',
      planner: 'مخطط ٣٠ يوم',
      assistant: 'المساعد التسويقي',
      pricing: 'الأسعار',
      dashboard: 'لوحة التحكم',
      launchStudio: 'ابدأ مجاناً',
    },
    hero: {
      badge: 'الجناح العالمي الذكي لصناع المحتوى',
      title1: 'انطلق بمحتواك إلى القمة.',
      titleHighlight: 'ابتكر بذكاء.',
      title2: 'انمُ بسرعة.',
      description: 'توقف عن التحديق في الشاشة الفارغة. قم بإنشاء نصوص ريلز فيروسية، وتسميات توضيحية احترافية، وخطط محتوى شهرية في ثوانٍ معدودة.',
      ctaPrimary: 'جرّب الأدوات مجاناً',
      ctaSecondary: 'عرض جدول ٣٠ يوماً',
      socialProof: 'يثق بنا أكثر من 45,000 صانع محتوى في أكثر من 80 دولة',
      statsGenerations: '+4.8 مليون محتوى',
      statsCreators: '+45,000 صانع محتوى',
      statsTimeSaved: '18 ساعة/أسبوعياً موفرة',
    },
    toolsNav: {
      captions: 'مولد الكابشن',
      scripts: 'سيناريو الريلز',
      ideas: 'أفكار فيروسية',
      hashtags: 'مصفوفة الهاشتاجات',
      planner: 'مخطط ٣٠ يوماً',
      assistant: 'المستشار التسويقي',
    },
    captions: {
      title: 'مولد نصوص وكابشن السوشيال ميديا',
      subtitle: 'اصنع مقدمات جذابة، وقصصاً مؤثرة، ودعوات لاتخاذ إجراء تزيد التفاعل والمبيعات.',
      nichePlaceholder: 'مثال: إطلاق متجر عطور فاخرة، نصائح إنتاجية، وصفات غذائية صحية',
      topicLabel: 'ما هو موضوع منشورك؟',
      platformLabel: 'المنصة المستهدفة',
      toneLabel: 'نبرة الصوت',
      langLabel: 'لغة المخرجات',
      btnGenerate: 'توليد الكابشن الآن',
      generating: 'جاري إنشاء نصوص مميزة...',
      variation1: 'أسلوب القصة (تفاعل واحتفاظ عالي)',
      variation2: 'الخطاف الفيروسي (مباشر وقوي)',
      variation3: 'القيمة التعليمية (مغناطيس المشاركة والحفظ)',
    },
    scripts: {
      title: 'مولد سيناريوهات الريلز والشورتس',
      subtitle: 'احصل على سيناريو دقيق ومحدد بالثواني مع المؤثرات البصرية، التعليق الصوتي ونصوص الشاشة.',
      topicLabel: 'فكرة أو موضوع الفيديو',
      durationLabel: 'مدة الفيديو',
      styleLabel: 'نمط التصوير والإخراج',
      btnGenerate: 'توليد السيناريو الكامل',
    },
    ideas: {
      title: 'مولد أفكار المحتوى الفيروسي',
      subtitle: 'لا تنفد أفكارك أبداً. أفكار مبنية على استراتيجيات التسويق الخمس الأكثر انتشاراً.',
      nicheLabel: 'مجال عملك أو تخصصك',
      pillarLabel: 'ركيزة المحتوى',
      btnGenerate: 'اكتشف 5 أفكار استثنائية',
    },
    hashtags: {
      title: 'مصفوفة الهاشتاجات الذكية',
      subtitle: 'هاشتاجات مصنفة بدقة: وصول عالي، تفاعل نشط، ومجتمعات متخصصة.',
      keywordLabel: 'الكلمة المفتاحية أو المجال',
      btnGenerate: 'توليد الهاشتاجات',
    },
    planner: {
      title: 'مخطط المحتوى الاستراتيجي لـ ٣٠ يوماً',
      subtitle: 'خارطة طريق متكاملة للمنشورات اليومية مقسمة حسب أهداف تسويقية أسبوعية.',
      exportCsv: 'تصدير الجدول (.csv)',
      markAllReady: 'اعتماد كافة المنشورات',
    },
    assistant: {
      title: 'المستشار التسويقي الذكي من شوريم',
      subtitle: 'مدير التسويق الخاص بك في نافذة محادثة ذكية. إرشادات واقعية لزيادة المبيعات والمتابعين.',
      chatPlaceholder: 'اسأل أي شيء (مثال: كيف أحول مشاهدي الريلز إلى عملاء يشترون؟)...',
      suggestedPrompts: 'نماذج استراتيجية سريعة',
    },
    dashboard: {
      title: 'لوحة استوديو صناع المحتوى',
      welcome: 'مرحباً بك في Shoreem.io',
      creditsRemaining: 'رصيد الذكاء الاصطناعي',
      savedItems: 'العناصر المحفوظة في المكتبة',
      planBadge: 'الباقة الحالية',
      upgradePlan: 'ترقية الباقة',
    },
    pricing: {
      title: 'أسعار واضحة وبسيطة',
      subtitle: 'مصممة لصناع المحتوى المستقلين والشركات العالمية على حد سواء.',
      monthly: 'دفع شهري',
      annual: 'دفع سنوي',
      saveDiscount: 'خصم 20%',
      getStarted: 'ابدأ الآن',
      currentPlan: 'الباقة المفعلة',
      guarantee: 'ضمان استرداد الأموال لمدة 14 يوماً · لا يلزم وجود بطاقة للتجربة',
    },
    creator: {
      badge: 'الرؤية والقيادة',
      title: 'مبتكرة منصة شوريم: أنيلا إسرار',
      description: 'تم تصميم وتطوير Shoreem.io بقيادة أنيلا إسرار (Aneela Israr) لتمكين صناع المحتوى والشركات العالمية بأدوات ذكاء اصطناعي فائقة التطور.',
      quote: '"هدفنا تمكين كل صانع محتوى من إيصال صوته الحقيقي للعالم بسرعة فائقة وإبداع لا ينضب."',
      role: 'المؤسسة والمهندسة المعمارية الرئيسية',
    },
    common: {
      copy: 'نسخ',
      copied: 'تم النسخ!',
      save: 'حفظ في الاستوديو',
      saved: 'تم الحفظ في المكتبة',
      close: 'إغلاق',
      search: 'بحث...',
      clear: 'مسح',
      filter: 'تصفية',
    },
  },
};
