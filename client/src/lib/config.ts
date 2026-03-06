export const COOKIE_NAME = "app_session_id";
export const ONE_YEAR_MS = 1000 * 60 * 60 * 24 * 365;

/**
 * Synchro - Global Configuration
 * 所有网页展示的数据（人设、号码、拦截规则）都在这里配置
 */

// 辅助工具：从一个池子里随机挑选一个内容
function pickRandom(list: string[]) {
  const randomIndex = Math.floor(Math.random() * list.length);
  return list[randomIndex];
}

// =================================================================
// 多人设配置池 (Persona Pool)
// =================================================================
export const personaPool = [
  // ------------------ 人设 1：Simone (您和朋友共用号码) ------------------
  {
    id: "simone",
    name: "Simone",
    age: 32,
    title: {
      en: "Interior Designer",
      zh: "室内设计师",
      es: "Decorador de interiores",
      pt: "Designer de Interiores",
      ja: "インテリアデザイナー",
      ko: "인테리어 디자이너",
      fr: "décorateur d'intérieur",
      de: "Innenarchitektin",
      it: "Architetto d'interni",
      ru: "Дизайнер интерьеров",
      ar: "مصمم داخلي"
    },
    bio: {
      en: "I'm from London, England, and I love design. I look forward to meaningful connections. I believe true love is built on understanding and shared values.",
      zh: "我来自英国伦敦，热爱设计,期待有灵魂的碰撞。我相信真爱建立在理解包容和共同价值观之上。",
      es: "Soy de Londres, Inglaterra, y me encanta el diseño. Creo que el amor verdadero se basa en la comprensión y los valores compartidos.",
      pt: "Sou de Londres, Inglaterra, e adoro design. Acredito que o amor verdadeiro se constrói sobre compreensão e valores partilhados.",
      ja: "イギリスのロンドン出身で、デザインが大好きです。真の愛は、理解と共通の価値観の上に築かれると信じています。",
      ko: "저는 영국 런던 출신이고 디자인을 좋아합니다. 진정한 사랑은 이해와 공유된 가치관을 바탕으로 한다고 믿습니다.",
      fr: "Je viens de Londres et je suis passionnée de design. Je crois que le véritable amour repose sur la compréhension et le partage de valeurs communes.",
      de: "Ich komme aus London, England, und begeistere mich für Design. Ich glaube, wahre Liebe basiert auf Verständnis und gemeinsamen Werten.",
      it: "Vengo da Londra, Inghilterra, e amo il design. Credo che il vero amore si basi sulla comprensione e sui valori condivisi.",
      ru: "Я из Лондона, Англия. Я люблю дизайн. Я верю, что настоящая любовь строится на понимании и общих ценностях.",
      ar: "أنا من لندن، إنجلترا، وأعشق التصميم. أؤمن بأن الحب الحقيقي يقوم على التفاهم والقيم المشتركة."
    },
    tags: {
      en: ["Ambitious", "Elegant", "Thoughtful", "Discerning"],
      zh: ["充满野心", "优雅迷人", "体贴周到", "品味不凡"]
    },
    images: ["/images/1.jpg", "/images/2.jpg", "/images/3.jpg"],
    // 专属号码池
    whatsappNumbers: ["447526833681", "447544476515"], 
    get whatsappNumber() { 
      return pickRandom(this.whatsappNumbers); 
    }
  },

  // ------------------ 人设 2：Elena (新业务员) ------------------
  {
    id: "elena",
    name: "Elena",
    age: 28,
    title: {
      en: "Wealth Manager",
      zh: "财富管理经理",
      es: "Gestora de patrimonio",
      pt: "Gestora de Patrimônio",
      ja: "ウェルスマネージャー",
      ko: "자산 관리자",
      fr: "Gestionnaire de patrimoine",
      de: "Vermögensverwalterin",
      it: "Gestore patrimoniale",
      ru: "Менеджер по управлению капиталом",
      ar: "مديرة ثروات"
    },
    bio: {
      en: "I value intelligence and emotional depth. Let's build a future together.",
      zh: "我看重智慧和情感深度。希望能和你一起共创未来。",
      es: "Valoro la inteligencia y la profundidad emocional. Construyamos un futuro juntos.",
      pt: "Valorizo a inteligência e a profundidade emocional. Vamos construir um futuro juntos.",
      ja: "知性と感情の深さを大切にしています。一緒に未来を築きましょう。",
      ko: "저는 지성과 감정의 깊이를 중요하게 생각합니다. 함께 미래를 만들어가요.",
      fr: "J'apprécie l'intelligence et la profondeur émotionnelle. Construisons un avenir ensemble.",
      de: "Ich schätze Intelligenz und emotionale Tiefe. Lass uns gemeinsam eine Zukunft aufbauen.",
      it: "Apprezzo l'intelligenza e la profondità emotiva. Costruiamo un futuro insieme.",
      ru: "Я ценю интеллект и эмоциональную глубину. Давайте строить будущее вместе.",
      ar: "أقدر الذكاء والعمق العاطفي. دعونا نبني مستقبلاً معًا."
    },
    tags: {
      en: ["Sophisticated", "Independent", "Adventurous", "Intellectual"],
      zh: ["成熟稳重", "独立自主", "热爱冒险", "知性大方"]
    },
    // 这里建议以后用新图片 4, 5, 6
    images: ["/images/1.jpg", "/images/2.jpg", "/images/3.jpg"],
    // 专属号码池
    whatsappNumbers: ["441333333333"], 
    get whatsappNumber() { 
      return pickRandom(this.whatsappNumbers); 
    }
  },

  // ------------------ 人设 3：Clara (新业务员) ------------------
  {
    id: "clara",
    name: "Clara",
    age: 26,
    title: {
      en: "Art Director",
      zh: "艺术总监",
      es: "Directora de arte",
      pt: "Diretora de Arte",
      ja: "アートディレクター",
      ko: "아트 디렉터",
      fr: "Directrice artistique",
      de: "Art Directorin",
      it: "Direttrice artistica",
      ru: "Арт-директор",
      ar: "مديرة فنية"
    },
    bio: {
      en: "Creativity is my life. Looking for someone who embraces passion and spontaneity.",
      zh: "创意是我的生命。寻找一个充满激情、随性自由的伴侣。",
      es: "La creatividad es mi vida. Busco a alguien que abrace la pasión y la espontaneidad.",
      pt: "A criatividade é a minha vida. Procuro alguém que abrace a paixão e a espontaneidade.",
      ja: "創造性が我的人生です。情熱と自発性を受け入れる人を探しています。",
      ko: "창의성은 제 삶입니다. 열정과 자발성을 포용하는 사람을 찾고 있습니다.",
      fr: "La créativité est ma vie. Je cherche quelqu'un qui embrasse la passion et la spontanéité.",
      de: "Kreativität ist mein Leben. Ich suche jemanden, der Leidenschaft und Spontanität schätzt.",
      it: "La creatività è la mia vida. Cerco qualcuno che abbracci la passione e la spontaneità.",
      ru: "Творчество — моя жизнь. Ищу человека, который ценит страсть и спонтанность.",
      ar: "الإبداع هو حياتي. أبحث عن شخص يتبنى الشغف والعفوية."
    },
    tags: {
      en: ["Creative", "Dynamic", "Confident", "Warm"],
      zh: ["极具创意", "活力四射", "自信阳光", "温柔体贴"]
    },
    images: ["/images/7.jpg", "/images/8.jpg", "/images/9.jpg"],
    // 专属号码池
    whatsappNumbers: ["4412345678"], 
    get whatsappNumber() { 
      return pickRandom(this.whatsappNumbers); 
    }
  }
];

// 【极重要】为了兼容 Home.tsx 等旧页面，保留这一行
export const personaConfig = personaPool[0];

// =================================================================
// 3. 风控与其他配置
// =================================================================
export const filteringRules = {
  ageRange: {
    min: 35,
    max: 65
  },
  disqualifiedOccupations: ["student", "unemployed"],
  disqualifiedCountryCode: "+86"
};

export const formspreeEndpoint = "FORMSPREE_API_ENDPOINT";
