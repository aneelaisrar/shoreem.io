import { Language, SocialPlatform } from '../types';

export interface CaptionResult {
  id: string;
  styleName: string;
  hook: string;
  body: string;
  cta: string;
  hashtags: string[];
  charCount: number;
  readTime: string;
}

export interface ScriptScene {
  timeframe: string;
  visualCue: string;
  spokenAudio: string;
  onScreenText: string;
}

export interface ScriptResult {
  title: string;
  duration: string;
  audioRecommendation: string;
  hookRetentionFormula: string;
  scenes: ScriptScene[];
  bRollList: string[];
  loopStrategy: string;
}

export interface ContentIdea {
  id: string;
  title: string;
  format: 'Reel/Short' | 'Carousel' | 'Deep Dive' | 'Thread / X' | 'Story Poll';
  hook: string;
  engagementScore: number;
  pillar: string;
  whyItWorks: string;
}

export interface HashtagSet {
  highVolume: string[];
  mediumReach: string[];
  nicheSpecific: string[];
  totalScore: number;
  competitionGrade: 'Low' | 'Medium' | 'High';
}

// 1. Caption Generator Engine
export function generateCaptions(
  topic: string,
  platform: SocialPlatform,
  tone: string,
  lang: Language
): CaptionResult[] {
  const safeTopic = topic.trim() || (lang === 'ur' ? 'کامیابی اور ترقی' : lang === 'ar' ? 'النجاح والتطوير' : lang === 'ur-roman' ? 'Online business growth' : 'Digital Growth Mastery');

  if (lang === 'ur') {
    return [
      {
        id: 'cap-1',
        styleName: 'کہانی اور گہرا اثر (High Retention Story)',
        hook: `اگر آپ اب بھی "${safeTopic}" کے روایتی طریقوں پر منحصر ہیں، تو آپ بہت بڑا موقع گنوا رہے ہیں... 👇`,
        body: `پچھلے سال جب میں نے شروعات کی، تو مجھے لگتا تھا کہ سخت محنت ہی کافی ہے۔ لیکن سچ یہ ہے کہ درست حکمت عملی کے بغیر محنت ضائع ہو جاتی ہے۔\n\nیہ 3 اہم تبدیلیاں ہیں جنہوں نے سب کچھ بدل دیا:\n١. روزانہ چھوٹی پیش رفت کو ترجیح دیں۔\n٢. منفی سوچ کو فوری ترک کریں۔\n٣. نتائج پر نہیں، عمل پر توجہ دیں۔`,
        cta: 'اس پوسٹ کو بعد کے لیے سیو (Save) کریں اور اپنی رائے کمنٹ میں شیئر کریں! ✨',
        hashtags: ['#کامیابی', '#ترقی', '#سوشل_میڈیا', '#اردو_مواد', '#شوریم'],
        charCount: 380,
        readTime: '30 سیکنڈ'
      },
      {
        id: 'cap-2',
        styleName: 'وائرل ہک (Viral Punch)',
        hook: `٩٠ فیصد لوگ "${safeTopic}" میں یہ ایک سنگین غلطی کرتے ہیں 🛑`,
        body: `کیا آپ بھی یہی غلطی دہرا رہے ہیں؟ اکثر لوگ بنیادی اصول سمجھے بغیر نتائج کی امید رکھتے ہیں۔ آج سے ہی اپنے روٹین کو تبدیل کریں۔ درست رہنمائی اور مستقل مزاجی ہی کامیابی کی ضمانت ہے۔`,
        cta: 'اگر متفق ہیں تو ڈبل ٹیپ کریں اور اپنے دوست کے ساتھ شیئر کریں! 🚀',
        hashtags: ['#وائرل', '#حقائق', '#موٹیویشن', '#آن_لائن_ترقی'],
        charCount: 290,
        readTime: '20 سیکنڈ'
      },
      {
        id: 'cap-3',
        styleName: 'قیمتی گائیڈ (Save Magnet)',
        hook: `مکمل روڈ میپ: "${safeTopic}" کو کیسے ماسٹر کریں 📌`,
        body: `قدم بہ قدم مکمل طریقہ کار:\nمرحلہ ١: مقصد کا واضح تعین۔\nمرحلہ ٢: بہترین ٹولز کا دانشمندانہ استعمال۔\nمرحلہ ٣: باقاعدگی اور تجزیہ۔\n\nکامیابی راتوں رات نہیں ملتی لیکن یہ فارمولا آپ کی رفتار کو 10 گنا تیز کر دے گا۔`,
        cta: 'اس روڈ میپ کو بھولنے سے پہلے ابھی بک مارک کریں! 💾',
        hashtags: ['#تعلیم', '#گائیڈ', '#اسٹریٹجی', '#شوریم_اسٹوڈیو'],
        charCount: 340,
        readTime: '25 سیکنڈ'
      }
    ];
  }

  if (lang === 'ar') {
    return [
      {
        id: 'cap-1',
        styleName: 'أسلوب القصة المؤثرة (Storyteller)',
        hook: `الحقيقة الصادمة حول "${safeTopic}" التي لا يخبرك بها أحد في البداية... 💡`,
        body: `عندما بدأت مسيرتي، ظننت أن التواجد المستمر يكفي لتحقيق النمو. لكن النتيجة الحقيقية جاءت فقط عندما غيرت هذه الركائز الثلاث:\n١. التركيز على تقديم قيمة فورية للمتابع.\n٢. تبسيط الخطوات دون تعقيد.\n٣. الاستمرارية المنضبطة بدلاً من الحماس المؤقت.`,
        cta: 'احفظ هذا المنشور في المفضلة للرجوع إليه عند الحاجة، وشاركه مع زميلك! 🚀',
        hashtags: ['#ريادة_الأعمال', '#تطوير_الذات', '#صناع_المحتوى', '#شوريم', '#نجاح'],
        charCount: 420,
        readTime: '35 ثانية'
      },
      {
        id: 'cap-2',
        styleName: 'الخطاف الفيروسي الصاعق (Viral Punch)',
        hook: `توقف فوراً عن ارتكاب هذا الخطأ في "${safeTopic}" 🛑`,
        body: `أكثر من 85% من المبتدئين يقعون في نفس الفخ ويكررون الأسلوب العقيم. السر لا يكمن في كثرة المحاولات العشوائية، بل في دقة الاستهداف الذكي وفهم ما يحتاجه جمهورك بدقة.`,
        cta: 'هل توافق على هذا الرأي؟ اكتب رأيك في التعليقات الآن! 👇',
        hashtags: ['#نصائح_تسويقية', '#نمو_سريع', '#استراتيجية', '#ريلز_عرب'],
        charCount: 310,
        readTime: '25 ثانية'
      },
      {
        id: 'cap-3',
        styleName: 'دليل الخطوات العملية (Value Play)',
        hook: `خارطة طريق مختصرة لاحتراف "${safeTopic}" لعام 2026 📌`,
        body: `إليك الخطوات الثلاث الأساسية لتحقيق نتائج ملموسة في 14 يوماً:\n- الخطوة ١: تحليل المنافسين واستخراج الفجوات.\n- الخطوة ٢: بناء هوية فريدة لا يمكن استنساخها.\n- الخطوة ٣: أتمتة العمليات اليومية باستخدام الذكاء الاصطناعي.`,
        cta: 'اضغط على زر الحفظ للمراجعة لاحقاً! 💾',
        hashtags: ['#دليل_عملي', '#تسويق_رقمي', '#شوريم_ستوديو', '#تطوير'],
        charCount: 360,
        readTime: '30 ثانية'
      }
    ];
  }

  if (lang === 'ur-roman') {
    return [
      {
        id: 'cap-1',
        styleName: 'Real Story Angle (High Trust)',
        hook: `Agar aap abhi bhi "${safeTopic}" mein stuck mehsoos kar rahe hain, toh ye post aapke liye hai... 👇`,
        body: `Maine jab start kiya tha toh lagta tha ke consistent rehna he kaafi hai. Lekin reality ye hai ke bina smart systems ke mehnat waste ho jati hai.\n\nYe 3 cheezein note karein:\n1. Audience ke pain point ko pehle solve karein.\n2. Over-complicated strategies ko avoid karein.\n3. Daily actionable progress par focus rakhein.\n\nResults consistent execution se aate hain, shortcuts se nahi.`,
        cta: 'Post ko Save karein taake zaroorat par kaam aaye, aur doston ke sath share karein! 🚀',
        hashtags: ['#ContentStrategy', '#OnlineGrowth', '#PakistanCreators', '#ShoreemAI', '#ViralTips'],
        charCount: 410,
        readTime: '30 sec'
      },
      {
        id: 'cap-2',
        styleName: 'Viral Hook & Pattern Interrupt',
        hook: `90% log "${safeTopic}" mein ye sab se bari ghalti karte hain 🛑`,
        body: `Wo shuru toh josh se karte hain magar 2 hafton baad give up kar dete hain kyunke execution framework clear nahi hota.\n\nAgar aapko long-term results chahiyein toh patience aur right toolset use karna seekhein. Shoreem ke sath work smarter, not harder.`,
        cta: 'Aap is baare mein kya sochte hain? Comment mein batayein! 👇',
        hashtags: ['#GrowthHacks', '#CreatorTips', '#DesiCreators', '#ShoreemIo'],
        charCount: 320,
        readTime: '22 sec'
      },
      {
        id: 'cap-3',
        styleName: 'Actionable 3-Step Playbook',
        hook: `"${safeTopic}" ko master karne ka step-by-step roadmap 📌`,
        body: `Step 1: Apni core audience aur unke main problem ko define karein.\nStep 2: Quality high-retention content create karein jo actually value provide kare.\nStep 3: Feedback loop aur analytics ko daily monitor karein.\n\nSave this checklist for your next planning session!`,
        cta: 'Save this post right now so you don\'t lose it later! 💾',
        hashtags: ['#SocialMediaTips', '#Productivity', '#CreatorEconomy', '#Shoreem'],
        charCount: 350,
        readTime: '25 sec'
      }
    ];
  }

  // Default: English
  return [
    {
      id: 'cap-1',
      styleName: 'The Storyteller (High Retention)',
      hook: `Most people approach "${safeTopic}" completely backwards. Here is what shifted everything for us... 💡`,
      body: `When I first stepped into this space, I assumed relentless grinding was the only missing puzzle piece. It took 6 months of stagnant growth to realize:\n\nHard work without leverage is just glorified exhaustion.\n\nHere are 3 fundamental shifts that unlocked predictable momentum:\n1. Solve a visceral friction point before presenting a solution.\n2. Cut out 40% of the fluff and deliver undeniable density.\n3. Build scalable retention loops that compound over time.\n\nFocus on signal over noise. The results speak for themselves.`,
      cta: 'Bookmark this for your next strategy session & drop your take below! 👇',
      hashtags: [`#${safeTopic.replace(/\s+/g, '')}`, '#ContentStrategy', '#CreatorEconomy', '#GrowthHacks', '#ShoreemAI'],
      charCount: 520,
      readTime: '35 sec'
    },
    {
      id: 'cap-2',
      styleName: 'The Viral Hook (Punchy & Direct)',
      hook: `Stop making this $10,000 mistake with "${safeTopic}" 🛑`,
      body: `87% of creators and modern businesses burn out right here.\n\nThey optimize for vanity optics instead of retention and conversion. If your core message doesn\'t provoke curiosity within the first 1.8 seconds, you have already lost the scroll.\n\nFix your hook. Clarify your value. Automate your distribution.`,
      cta: 'Double tap if this resonated and share with someone who needs this wake-up call! 🚀',
      hashtags: ['#SaaSGrowth', '#ViralMarketing', '#DigitalBusiness', '#AudienceGrowth', '#Shoreem'],
      charCount: 380,
      readTime: '24 sec'
    },
    {
      id: 'cap-3',
      styleName: 'The Value Play (Save & Share Magnet)',
      hook: `The 3-step master framework for "${safeTopic}" (steal this blueprint) 📌`,
      body: `Here is the exact playbook high-growth operators use to stay ahead:\n\n▫️ Step 01: Audit your bottleneck — pinpoint the exact friction stopping conversions.\n▫️ Step 02: Deploy high-velocity micro-experiments to validate product-market resonance.\n▫️ Step 03: Scale what works with smart AI workflows.\n\nExecution beats perfection every single time.`,
      cta: 'Hit "Save" to keep this guide in your creator arsenal for when you need it most! 💾',
      hashtags: ['#ActionableTips', '#MarketingBlueprint', '#FounderPlaybook', '#ScaleFaster'],
      charCount: 460,
      readTime: '30 sec'
    }
  ];
}

// 2. Reel / Shorts Script Generator Engine
export function generateScript(
  topic: string,
  duration: '15s' | '30s' | '60s',
  style: string,
  lang: Language
): ScriptResult {
  const safeTopic = topic.trim() || 'How to 10x your organic reach in 30 days';

  if (lang === 'ur') {
    return {
      title: `وائرل ریل اسکرپٹ: ${safeTopic}`,
      duration: duration === '15s' ? '15 سیکنڈز (شارٹ وائرل)' : duration === '60s' ? '60 سیکنڈز (گائیڈ)' : '30 سیکنڈز (آئیڈیل ریل)',
      audioRecommendation: 'ٹرینڈنگ لو فائی دھن یا سسپنس بیک گراؤنڈ میوزک (حجم 20% پر)',
      hookRetentionFormula: 'پہلے 2 سیکنڈز میں غیر متوقع حرکت + سکرین پر بڑا سوال',
      scenes: [
        {
          timeframe: '0:00 - 0:03',
          visualCue: 'کیمرے کے بالکل قریب آئیں، ہاتھ میں فون یا نوٹ پیڈ ہو، کیمرہ تیز زوم ان کرے۔',
          spokenAudio: `اگر آپ بھی "${safeTopic}" کو مشکل سمجھتے ہیں، تو بس اگلے 30 سیکنڈز غور سے سنیں!`,
          onScreenText: '🛑 رکیں! یہ جاننا ضروری ہے'
        },
        {
          timeframe: '0:03 - 0:14',
          visualCue: 'ایک سائیڈ پر قدم رکھیں، بیک گراؤنڈ میں کمپیوٹر یا پروڈکٹ کی تیز اسپیڈ ویڈیو چلے۔',
          spokenAudio: `زیادہ تر لوگ مہینوں محنت کرتے ہیں لیکن وہ اصل نکتہ بھول جاتے ہیں۔ سب سے اہم بات یہ ہے کہ آپ کا پیغام واضح اور فوکسڈ ہو۔`,
          onScreenText: 'غلطی: بغیر منصوبہ بندی کے مواد بنانا'
        },
        {
          timeframe: '0:14 - 0:25',
          visualCue: 'کیمرے کی طرف دیکھ کر مسکرائیں، ہاتھ سے 3 انگلیاں دکھائیں۔',
          spokenAudio: `یہ تین سادہ طریقے اپنائیں: روزانہ 1 معیاری پوسٹ، دلچسپ کیپشن اور آڈینس سے بات چیت۔`,
          onScreenText: 'حل: مستقل مزاجی + جدید ٹولز'
        },
        {
          timeframe: '0:25 - 0:30',
          visualCue: 'سکرین کی طرف اشارہ کریں، ویڈیو شروع والے فریم پر واپس آئے (پرفیکٹ لوپ)۔',
          spokenAudio: `ابھی فالو کریں اور مزید ٹپس کے لیے نیچے دیا گیا کیپشن پڑھیں!`,
          onScreenText: 'فالو کریں ➕ کیپشن پڑھیں ⬇️'
        }
      ],
      bRollList: [
        'لیپ ٹاپ کی بورڈ پر تیز ٹائپنگ کا کلوز اپ',
        'موبائل سکرین پر اسکرولنگ کا سلو موشن شارٹ',
        'نوٹ بک پر تیز پوائنٹس لکھنے کا زاویہ'
      ],
      loopStrategy: 'آخری جملہ پہلے جملے سے ملا دیں تا کہ صارف ویڈیو دوبارہ دیکھنا شروع کر دے!'
    };
  }

  if (lang === 'ar') {
    return {
      title: `سيناريو ريلز فيروسي: ${safeTopic}`,
      duration: duration === '15s' ? '15 ثانية (سريع)' : duration === '60s' ? '60 ثانية (شامل)' : '30 ثانية (مثالي)',
      audioRecommendation: 'إيقاع عصري خفيف مع صعود حماسي في منتصف الفيديو',
      hookRetentionFormula: 'حركة مفاجئة نحو الكاميرا + نص كبير يكسر التوقع',
      scenes: [
        {
          timeframe: '0:00 - 0:03',
          visualCue: 'اقترب سريعاً من العدسة مع إيماءة يد قاطعة وقطع بصري فوري.',
          spokenAudio: `إذا كنت ما زلت تكافح مع "${safeTopic}"، فهذا الفيديو سيغير قواعد اللعبة تماماً!`,
          onScreenText: '🛑 انتظر! لا تتجاوز هذا المقطع'
        },
        {
          timeframe: '0:03 - 0:14',
          visualCue: 'لقطة شاشة متحركة مع ظهور أيقونات توضيحية لسرعة الإنجاز.',
          spokenAudio: `السبب الذي يجعل 90% من الحسابات تفشل ليس قلة النشر، بل غياب الخطاف الذي يجبر المشاهد على التوقف.`,
          onScreenText: 'السر الحقيقي: قوة أول 3 ثوانٍ'
        },
        {
          timeframe: '0:14 - 0:25',
          visualCue: 'تحدث بنبرة واثقة ومباشرة مع إشارة سريعة للشاشة.',
          spokenAudio: `ركز على حل مشكلة واحدة ومحددة بوضوح، واستخدم أدوات الذكاء الاصطناعي الذكية لمضاعفة إنتاجك.`,
          onScreenText: 'الحل: محتوى مستهدف + ذكاء اصطناعي'
        },
        {
          timeframe: '0:25 - 0:30',
          visualCue: 'إشارة واضحة لزر المتابعة وزر الحفظ ثم رجوع لوضعية البداية.',
          spokenAudio: `احفظ الفيديو وطبّق الخطوات فوراً، ولا تنسَ متابعة الحساب للمزيد!`,
          onScreenText: 'احفظ المنشور 📌 وتابعنا ➕'
        }
      ],
      bRollList: [
        'تصوير شاشة الهاتف أثناء قفزة التفاعل والإشعارات',
        'لقطة مقربة لليد أثناء تدوين الملاحظات على الآيباد',
        'مشي واثق في مساحة عمل مضاءة بنقاء'
      ],
      loopStrategy: 'دمج الجملة الختامية مع خطاف البداية لصنع تكرار لا نهائي بدون توقف.'
    };
  }

  // English & Roman Urdu fallbacks
  return {
    title: `Viral Reel Production Script: ${safeTopic}`,
    duration: duration === '15s' ? '15 Seconds (Hyper-Paced)' : duration === '60s' ? '60 Seconds (Authority)' : '30 Seconds (Algorithm Sweet Spot)',
    audioRecommendation: 'Subtle bass-heavy Lo-Fi bounce or cinematic atmospheric riser',
    hookRetentionFormula: 'Pattern-interrupt in first 1.2s: Snap zoom + counter-intuitive claim',
    scenes: [
      {
        timeframe: '0:00 - 0:03',
        visualCue: 'Quick snap-zoom into creator\'s eyes. Holding up phone showing a blank screen, shaking head.',
        spokenAudio: `Stop scrolling if you\'re still trying to figure out "${safeTopic}" the hard way!`,
        onScreenText: '🛑 STOP MAKING THIS MISTAKE'
      },
      {
        timeframe: '0:03 - 0:13',
        visualCue: 'Cut to dynamic B-roll: Fast montage of digital dashboards, analytics spikes, or product shots.',
        spokenAudio: `Most creators waste 15 hours a week doing everything manually. The top 1% use structured systems to automate the friction.`,
        onScreenText: 'The Reality: Manual = Burnout'
      },
      {
        timeframe: '0:13 - 0:24',
        visualCue: 'Back to talking head with split-screen showing 3 actionable bullet points sliding in with sound effects.',
        spokenAudio: `Shift your focus to 3 things: Unbreakable hooks, repeatable templates, and leveraging Shoreem.io to generate your roadmap.`,
        onScreenText: '1. Hook · 2. System · 3. Scale'
      },
      {
        timeframe: '0:24 - 0:30',
        visualCue: 'Point downward towards caption, subtle wink/smile, snap cut seamlessly matching Scene 1.',
        spokenAudio: `Drop a comment with "GROW" and I\'ll send you the complete step-by-step checklist!`,
        onScreenText: 'Comment "GROW" below 🚀'
      }
    ],
    bRollList: [
      'Over-the-shoulder shot typing on sleek keyboard at dusk',
      'Macro lens shot of phone notifications popping up rapidly',
      'Warm ambient studio shot adjusting microphone or coffee mug'
    ],
    loopStrategy: 'End with "And that\'s exactly why..." so it loops seamlessly into the opening line: "...Stop scrolling!"'
  };
}

// 3. Content Ideas Engine
export function generateContentIdeas(niche: string, pillar: string, lang: Language): ContentIdea[] {
  const safeNiche = niche.trim() || 'Tech & Entrepreneurship';

  if (lang === 'ur') {
    return [
      {
        id: 'idea-1',
        title: `٥ باتیں جو میں کاش "${safeNiche}" شروع کرتے وقت جانتا`,
        format: 'Reel/Short',
        hook: 'اگر میں دوبارہ صفر سے شروع کرتا، تو یہ پہلی 3 غلطیاں کبھی نہ دہراتا...',
        engagementScore: 96,
        pillar: 'شخصی تجربہ اور رہنمائی',
        whyItWorks: 'لوگ دوسروں کے تجربات اور غلطیوں سے سیکھنا پسند کرتے ہیں۔'
      },
      {
        id: 'idea-2',
        title: `روایتی طریقہ بمقابلہ جدید اسمارٹ طریقہ`,
        format: 'Carousel',
        hook: 'آپ کا گھنٹوں کا کام منٹوں میں کیسے ہو سکتا ہے؟ مکمل موازنہ ملاحظہ فرمائیں...',
        engagementScore: 91,
        pillar: 'تعلیمی اور معلوماتی مواد',
        whyItWorks: 'تصویری موازنہ فوری توجہ کھینچتا ہے اور شیئر ریٹ بڑھاتا ہے۔'
      },
      {
        id: 'idea-3',
        title: `ایک سچ جو اس انڈسٹری میں کوئی تسلیم نہیں کرتا`,
        format: 'Thread / X',
        hook: 'شاید یہ بات سن کر کچھ لوگوں کو برا لگے، لیکن سچائی چھپائی نہیں جا سکتی...',
        engagementScore: 94,
        pillar: 'جرات مندانہ رائے (Hot Take)',
        whyItWorks: 'مباحثہ اور تعمیری بحث کمنٹ سیکشن کو متحرک رکھتی ہے۔'
      },
      {
        id: 'idea-4',
        title: `میرا روزمرہ کا 30 منٹ کا پروڈکٹیوٹی روٹین`,
        format: 'Story Poll',
        hook: 'کیا آپ بھی روزانہ وقت کی کمی کا شکار رہتے ہیں؟ یہ پول دیکھیں...',
        engagementScore: 88,
        pillar: 'پس پردہ (Behind the scenes)',
        whyItWorks: 'پول اور سوالات صارفین کے ساتھ گہرا تعلق قائم کرتے ہیں۔'
      },
      {
        id: 'idea-5',
        title: `مفت ٹولز کی مکمل خفیہ لسٹ برائے 2026`,
        format: 'Carousel',
        hook: 'ان 4 خفیہ ٹولز کے بارے میں جان کر آپ کے حریف حیران رہ جائیں گے...',
        engagementScore: 98,
        pillar: 'ہائی ویلیو ریسورسز',
        whyItWorks: 'سیو (Save) اور بک مارک کرنے کے لیے سب سے زیادہ مؤثر۔'
      }
    ];
  }

  if (lang === 'ar') {
    return [
      {
        id: 'idea-1',
        title: `5 أسرار في مجال "${safeNiche}" تمنيت معرفتها قبل 3 سنوات`,
        format: 'Reel/Short',
        hook: 'لو عاد بي الزمن للبداية، لبدأت بهذه الخطوة فوراً دون تردد...',
        engagementScore: 97,
        pillar: 'سرد قصصي وخبرات موثوقة',
        whyItWorks: 'الجمهور يبحث دائماً عن اختصار سنوات التجارب في دقائق.'
      },
      {
        id: 'idea-2',
        title: `مقارنة صريحة: الطريقة التقليدية مقابل الذكاء الاصطناعي`,
        format: 'Carousel',
        hook: 'كيف تنجز في ساعتين ما كان يستغرق أسبوعاً كاملاً؟ شريحة بشريحة...',
        engagementScore: 93,
        pillar: 'محتوى تعليمي عالي الكفاءة',
        whyItWorks: 'المنشورات المتسلسلة (الكاروسيل) تضاعف وقت البقاء على الحساب.'
      },
      {
        id: 'idea-3',
        title: `حقيقة غير مريحة في هذا المجال لا يتحدث عنها أحد`,
        format: 'Thread / X',
        hook: 'قد لا يعجب هذا الكلام البعض، لكن الحقيقة يجب أن تقال بصراحة...',
        engagementScore: 95,
        pillar: 'رأي استثنائي وجريء (Hot Take)',
        whyItWorks: 'إثارة النقاشات البناءة تدفع خوارزميات المنصات لنشر المحتوى.'
      },
      {
        id: 'idea-4',
        title: `كواليس يوم عمل كامل: كيف ندير المشاريع بدون ضغط`,
        format: 'Story Poll',
        hook: 'صوّت معنا: ما هو أكبر عائق يواجهك في تنظيم مهامك اليومية؟',
        engagementScore: 89,
        pillar: 'خلف الكواليس وتفاعل حقيقي',
        whyItWorks: 'الاستفتاءات تبني ولاءً حقيقياً مع المتابعين وتزيد التفاعل.'
      },
      {
        id: 'idea-5',
        title: `دليل الأدوات المجانية الأقوى لعام 2026`,
        format: 'Carousel',
        hook: 'احفظ هذه القائمة الذهبية قبل أن تبحث عنها لاحقاً وتفقدها...',
        engagementScore: 99,
        pillar: 'موارد ومصادر قيمة',
        whyItWorks: 'معدل حفظ (Save Rate) فائق الارتفاع ينعكس إيجاباً على التوصيات.'
      }
    ];
  }

  // English & Roman Urdu
  return [
    {
      id: 'idea-1',
      title: `5 Brutal Truths About "${safeNiche}" Nobody Tells Beginners`,
      format: 'Reel/Short',
      hook: 'If I had to restart from zero tomorrow with no followers and no budget, here is day 1 to day 30...',
      engagementScore: 97,
      pillar: 'Authority & Hard Truths',
      whyItWorks: 'Subverts expectations and delivers high perceived vulnerability and authenticity.'
    },
    {
      id: 'idea-2',
      title: `The 2026 Tech Stack That Saves 15 Hours Every Week`,
      format: 'Carousel',
      hook: 'Swipe through to see the exact 4-tool workflow replacing a full agency department...',
      engagementScore: 95,
      pillar: 'Tactical Educational Breakdown',
      whyItWorks: 'Carousels maximize dwell time and trigger high organic algorithm boosts.'
    },
    {
      id: 'idea-3',
      title: `Why The Most Popular Advice in "${safeNiche}" is Dead Wrong`,
      format: 'Thread / X',
      hook: 'Unpopular opinion: Stop listening to gurus telling you to just "work harder". Here\'s the math...',
      engagementScore: 93,
      pillar: 'Contrarian Point of View',
      whyItWorks: 'Polarization generates comment section debates that amplify reach.'
    },
    {
      id: 'idea-4',
      title: `Behind The Scenes: How We Plan 30 Days of Content in 90 Minutes`,
      format: 'Reel/Short',
      hook: 'Watch me batch an entire month of viral reels before my morning espresso gets cold...',
      engagementScore: 92,
      pillar: 'Process Transparency & Proof',
      whyItWorks: 'Demonstrates undeniable capability rather than just theoretical claims.'
    },
    {
      id: 'idea-5',
      title: `The Zero-Fluff Checklist for Scaling Faster This Quarter`,
      format: 'Carousel',
      hook: 'Don\'t scroll past this if you\'ve felt overwhelmed by content creation lately...',
      engagementScore: 98,
      pillar: 'High-Utility Resource Magnet',
      whyItWorks: 'Generates massive bookmarking metrics which platforms prioritize in discovery feeds.'
    }
  ];
}

// 4. Hashtag Generator Engine
export function generateHashtags(keyword: string): HashtagSet {
  const clean = keyword.trim().toLowerCase().replace(/[^a-z0-9]/gi, '') || 'creators';
  
  const high = [
    `#${clean}`,
    `#${clean}life`,
    `#contentcreation`,
    `#viral`,
    `#trending`,
    `#growthmindset`,
    `#businessonline`,
    `#socialmediamarketing`
  ];

  const mid = [
    `#${clean}tips`,
    `#${clean}strategy`,
    `#${clean}community`,
    `#creatoreconomy`,
    `#digitalcreator`,
    `#scaleup`,
    `#contenthacks`,
    `#marketingstrategy`
  ];

  const niche = [
    `#${clean}hacks`,
    `#${clean}2026`,
    `#shoreem`,
    `#shoreemcreators`,
    `#highconvertingcontent`,
    `#viralformula`,
    `#organicgrowthtips`,
    `#smartcreator`
  ];

  return {
    highVolume: high,
    mediumReach: mid,
    nicheSpecific: niche,
    totalScore: 94,
    competitionGrade: 'Medium'
  };
}

// 5. AI Marketing Assistant Responses
export function getAssistantResponse(prompt: string, lang: Language): { text: string; actionItems: string[] } {
  const lower = prompt.toLowerCase();

  if (lang === 'ur') {
    if (lower.includes('ریل') || lower.includes('reel') || lower.includes('ویڈیو')) {
      return {
        text: `انسٹاگرام ریلز اور یوٹیوب شارٹس پر ویورز کو خریداروں اور پکے فالوورز میں تبدیل کرنے کے لیے یہ 4 بنیادی اصول لازمی اپنائیں:\n\n١. **پہلے 2 سیکنڈز کا ہک:** اس بات کو یقینی بنائیں کہ ویڈیو کے شروع میں حرکت اور آواز دونوں موجود ہوں۔\n٢. **ایک ویڈیو ایک پیغام:** ریل میں کبھی بھی ایک ساتھ 5 مختلف باتیں نہ سمجھائیں، صرف ایک واضح حل پیش کریں۔\n٣. **کمنٹ متحرک کرنے والا سوال:** ویڈیو کے آخر میں کوئی دلچسپ سوال پوچھیں تاکہ لوگ اپنی رائے دیں۔\n٤. **ڈائریکٹ میسج (DM) آٹومیشن:** صارفین کو کیپشن میں خاص لفظ کمنٹ کرنے کو کہیں جس پر انہیں فری گائیڈ ملے۔`,
        actionItems: [
          'اگلی 3 ویڈیوز کے لیے ایک مضبوط سوالیہ ہک تیار کریں',
          'ویڈیو کی مدت کو 18 سے 28 سیکنڈز کے درمیان رکھیں',
          'کیپشن کے پہلے جملے کو بولڈ اور واضح رکھیں'
        ]
      };
    }
    return {
      text: `شوریم ڈاٹ آئی او کی اسٹریٹجی کے مطابق، ڈیجیٹل مارکیٹنگ میں کامیابی کا راز مستقل مزاجی اور آڈینس کے ساتھ مخلصانہ رابطہ ہے۔\n\nآپ کو چاہیے کہ اپنے مواد کو 3 حصوں میں تقسیم کریں:\n- ٦٠ فیصد: مفت اور اعلیٰ معیار کی معلومات (Value Content)\n- ٣٠ فیصد: اعتماد اور ذاتی تجربات (Trust & Proof)\n- ١٠ فیصد: براہِ راست پیشکش اور مصنوعات (Direct Offer)`,
      actionItems: [
        '30 روزہ پلانر سے ہفتہ وار تھیم فائنل کریں',
        'شوریم کیپشن جنریٹر کے ذریعے کثیر لسانی کیپشن بنائیں',
        'ہفتے میں کم از کم ایک بار آڈینس کے سوالات کے جواب دیں'
      ]
    };
  }

  if (lang === 'ar') {
    return {
      text: `أهلاً بك! لتعزيز استراتيجيتك التسويقية ومضاعفة معدلات التحويل، نوصي بتطبيق منهجية "النمو الذكي ثلاثي الأبعاد":\n\n١. **صناعة الخطاف البصري والنصي:** التوقف عن النشر العشوائي والتركيز على حل مشكلة فورية في أول ثانيتين.\n٢. **بناء الثقة عبر كواليس العمل:** مشاركة أرقام وتجارب حقيقية تبرهن على خبرتك العملية.\n٣. **الدعوة الذكية لاتخاذ الإجراء (CTA):** تجنب عبارات البيع المباشر الجافة؛ بدلاً من ذلك، ادعُ الجمهور للتعليق بكلمة محددة للحصول على دليل مجاني.`,
      actionItems: [
        'حدد الشريحة المستهدفة بدقة متناهية',
        'استخدم مولد السيناريوهات لتجهيز 5 ريلز للأسبوع القادم',
        'تأكد من إرفاق هاشتاجات متوسطة التنافس لرفع الاستكشاف'
      ]
    };
  }

  // English & Roman Urdu
  if (lower.includes('hook') || lower.includes('viral') || lower.includes('reel')) {
    return {
      text: `Here is the high-converting Viral Retention Architecture used by the top 0.1% of creators:\n\n1. **The Pattern Interrupt (0 - 1.8s):** Break visual inertia. Use physical movement towards the camera, unusual framing, or an unexpected visual contrast.\n2. **The Stakes Statement (1.8 - 4.0s):** Immediately articulate *what the viewer loses* by skipping this video.\n3. **The Value Core (4.0 - 22s):** Deliver 3 distinct, high-density insights without filler words or conversational rambling.\n4. **The Frictionless CTA (22 - 28s):** Rather than asking them to click a distant link, instruct them to comment a trigger word (e.g., "BLUEPRINT") to trigger an automated direct message.`,
      actionItems: [
        'Draft 3 variations of your opening hook line before filming',
        'Edit with cuts every 2.5 - 3.2 seconds to maintain attention velocity',
        'Add bold, high-contrast subtitles centered in the lower-middle viewport'
      ]
    };
  }

  if (lower.includes('launch') || lower.includes('product') || lower.includes('campaign') || lower.includes('sales')) {
    return {
      text: `Here is your high-converting 7-Day Campaign Sequence Blueprint:\n\n• **Day 1 (The Problem Agitation):** Highlight the hidden bottleneck costing your audience time, money, or peace of mind.\n• **Day 2 (The Paradigm Shift):** Explain why conventional solutions fail and introduce your unique methodology.\n• **Day 3 (The Case Study / Social Proof):** Showcase a real transformation or proof of execution.\n• **Day 4 (The Reveal & Offer Drop):** Official launch with early-bird or exclusive bundle bonuses.\n• **Day 5 (Objection Annihilation):** Answer the top 3 hesitations directly via a carousel or interactive Q&A.\n• **Day 6 (Urgency & Scarcity):** Announce the deadline or limited capacity.\n• **Day 7 (Final Call):** Direct countdown and final push before pricing shifts.`,
      actionItems: [
        'Prepare 7 tailored captions in Shoreem Caption Generator',
        'Schedule your assets inside the 30-Day Content Planner',
        'Set up automated DM triggers for interested commenters'
      ]
    };
  }

  // General marketing answer
  return {
    text: `To scale modern digital brand presence predictably, implement the **Tri-Pillar Content Engine**:\n\n1. **Discovery Engines (Top of Funnel - 50%):** Short-form video (Reels, TikTok, Shorts) crafted with emotional hooks and broad curiosity triggers.\n2. **Authority & Trust Catalysts (Middle of Funnel - 35%):** In-depth Carousels, tactical case studies, and transparent behind-the-scenes breakdowns that prove your expertise.\n3. **Conversion Mechanisms (Bottom of Funnel - 15%):** Value-led direct response offers, launch roadmaps, and limited-time opportunities that convert warm viewers into paying customers.`,
    actionItems: [
      'Maintain an unbroken 30-day publishing rhythm',
      'Track your save-to-share ratio as the #1 algorithmic health metric',
      'Repurpose every high-performing reel script into a written carousel'
    ]
  };
}
