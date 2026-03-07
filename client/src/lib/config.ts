export const COOKIE_NAME = "app_session_id";
export const ONE_YEAR_MS = 1000 * 60 * 60 * 24 * 365;

function pickRandom(list: string[]) {
  const randomIndex = Math.floor(Math.random() * list.length);
  return list[randomIndex];
}

export const personaPool = [
  // ------------------ 人设 1：Simone ------------------
  {
    id: "simone",
    name: "Simone",
    age: 32,
    title: {
      en: "Interior Designer", zh: "室内设计师", es: "Decorador de interiores", pt: "Designer de Interiores", 
      ja: "インテリアデザイナー", ko: "인테리어 디자이너", fr: "décorateur d'intérieur", de: "Innenarchitektin", 
      it: "Architetto d'interni", ru: "Дизайнер интерьеров", ar: "مصمم داخلي"
    },
    bio: {
      en: "I'm from London, England, and I love design. I believe true love is built on understanding and shared values.",
      zh: "我来自英国伦敦，热爱设计。我相信真爱建立在理解包容和共同价值观之上。",
      es: "Soy de Londres, Inglaterra. Creo que el amor verdadero se basa en la comprensión.",
      pt: "Sou de Londres, Inglaterra. Acredito que o amor verdadeiro se constrói sobre compreensão.",
      ja: "イギリスのロンドン出身で。真の愛は、理解と共通の価値観の上に築かれると信じています。",
      ko: "저는 영국 런던 출신이고 디자인을 좋아합니다. 진정한 사랑은 이해와 공유된 가치관을 바탕으로 한다고 믿습니다.",
      fr: "Je viens de Londres et je suis passionnée de design. Je crois que le véritable amour repose sur la compréhension.",
      de: "Ich komme aus London, England. Ich glaube, wahre Liebe basiert auf Verständnis.",
      it: "Vengo da Londra, Inghilterra. Credo che il vero amore si basi sulla comprensione.",
      ru: "Я из Лондона, Англия. Я верю, что настоящая любовь строится на понимании.",
      ar: "أنا من لندن، إنجلترا. أؤمن بأن الحب الحقيقي يقوم على التفاهم."
    },
    tags: {
      en: ["Ambitious", "Elegant", "Thoughtful", "Discerning"],
      zh: ["充满野心", "优雅迷人", "体贴周到", "品味不凡"],
      es: ["Ambicioso", "Elegante", "Atento", "Perspicaz"],
      pt: ["Ambicioso", "Elegante", "Atencioso", "Perspicaz"],
      ja: ["野心的", "エレガント", "思いやり", "洞察力"],
      ko: ["야심 찬", "우아한", "사려 깊은", "안목 있는"],
      fr: ["Ambitieux", "Élégant", "Attentionné", "Perspicace"],
      de: ["Ehrgeizig", "Elegant", "Rücksichtsvoll", "Anspruchsvoll"],
      it: ["Ambizioso", "Elegante", "Premuroso", "Esigente"],
      ru: ["Амбициозный", "Элегантный", "Заботливый", "Проницательный"],
      ar: ["طموح", "أنيق", "مراعي", "فطين"]
    },
    images: ["/images/1.jpg", "/images/2.jpg", "/images/3.jpg"],
    whatsappNumbers: ["447526833681", "447544476515"], 
    get whatsappNumber() { return pickRandom(this.whatsappNumbers); }
  },
  // ------------------ 人设 2：Jesse ------------------
  {
    id: "jesse",
    name: "Jesse",
    age: 31,
    title: {
      en: "Internal medicine doctor", zh: "内科医生", es: "Médico de medicina interna", pt: "Médico de medicina interna",
      ja: "内科医", ko: "내과 의사", fr: "Médecin interniste", de: "Internist",
      it: "Medico di medicina interna", ru: "Врач-терапевт", ar: "طبيب باطني"
    },
    bio: {
      en: "I value intelligence and emotional depth. Let's build a future together.",
      zh: "我看重智慧和情感深度。希望能和你一起共创未来。",
      es: "Valoro la inteligencia y la profundidad emocional.",
      pt: "Valorizo a inteligência e a profundidade emocional.",
      ja: "知性と感情の深さを大切にしています。",
      ko: "저는 지성과 감정의 깊이를 중요하게 생각합니다.",
      fr: "J'apprécie l'intelligence et la profondeur émotionnelle.",
      de: "Ich schätze Intelligenz und emotionale Tiefe.",
      it: "Apprezzo l'intelligenza e la profondità emotiva.",
      ru: "Я ценю интеллект и эмоциональную глубину.",
      ar: "أقدر الذكاء والعمق العاطفي."
    },
    tags: {
      en: ["Sophisticated", "Independent", "Adventurous", "Intellectual"],
      zh: ["成熟稳重", "独立自主", "热爱冒险", "知性大方"],
      es: ["Sofisticado", "Independiente", "Aventurero", "Intelectual"],
      pt: ["Sofisticado", "Independente", "Aventureiro", "Intelectual"],
      ja: ["洗練された", "自立した", "冒険好き", "知的"],
      ko: ["세련된", "독립적인", "모험을 즐기는", "지적인"],
      fr: ["Sophistiqué", "Indépendant", "Aventureux", "Intellectuel"],
      de: ["Anspruchsvoll", "Unabhängig", "Abenteuerlustig", "Intellektuell"],
      it: ["Sofisticato", "Indipendente", "Avventuroso", "Intellettuale"],
      ru: ["Утонченный", "Независимый", "Склонный к авантюрам", "Интеллектуальный"],
      ar: ["راقي", "مستقل", "مغامر", "مثقف"]
    },
    images: ["/images/1.jpg", "/images/2.jpg", "/images/3.jpg"],
    whatsappNumbers: ["441333333333"], 
    get whatsappNumber() { return pickRandom(this.whatsappNumbers); }
  },
  // ------------------ 人设 3：Clara (美甲沙龙老板) ------------------
  {
    id: "clara",
    name: "Clara",
    age: 26,
    title: {
      en: "Nail Salon Owner", zh: "美甲沙龙主理人", es: "Dueña de salón de uñas", pt: "Dona de Salão de Unhas",
      ja: "ネイルサロンオーナー", ko: "네일 살롱 원장", fr: "Propriétaire de salon de manucure", de: "Inhaberin eines Nagelstudios",
      it: "Titolare di salone di bellezza", ru: "Владелица маникюрного салона", ar: "صاحبة صالون تجميل"
    },
    bio: {
      en: "I run my own nail salon and love making life colorful. Looking for a sincere partner.",
      zh: "我经营着一家美甲沙龙，喜欢把生活装点得丰富多彩。希望能遇到一个真诚的伴侣。",
      es: "Dirijo mi propio salón de uñas. Busco una pareja sincera.",
      pt: "Dirijo o meu próprio salão de unhas. Procuro um parceiro sincero.",
      ja: "自分のネイルサロンを経営しています。誠実なパートナーを探しています。",
      ko: "제 네일 살롱을 운영하고 있습니다. 진실한 파트너를 찾고 있습니다.",
      fr: "Je gère mon propre salon de manucure. Je cherche un partenaire sincère.",
      de: "Ich betreibe mein eigenes Nagelstudio. Ich suche einen aufrichtigen Partner.",
      it: "Gestisco il mio salone di bellezza. Cerco un partner sincero.",
      ru: "Я руковожу собственным маникюрным салоном. Ищу искреннего партнера.",
      ar: "أدير صالون الأظافر الخاص بي. أبحث عن شريك صادق."
    },
    tags: {
      en: ["Artistic", "Independent", "Detail-oriented", "Warm-hearted"],
      zh: ["充满艺术感", "经济独立", "注重细节", "内心温暖"],
      es: ["Artístico", "Independiente", "Detallista", "Cálido"],
      pt: ["Artístico", "Independente", "Atento aos detalhes", "Caloroso"],
      ja: ["芸術的", "自立した", "細部へのこだわり", "温かい心"],
      ko: ["예술적인", "독립적인", "세심한", "따뜻한 마음"],
      fr: ["Artistique", "Indépendant", "Minutieux", "Chaleureux"],
      de: ["Künstlerisch", "Unabhängig", "Detailorientiert", "Warmherzig"],
      it: ["Artistico", "Indipendente", "Attento ai dettagli", "Di cuore caldo"],
      ru: ["Артистичный", "Независимый", "Внимательный к деталям", "Добросердечный"],
      ar: ["فني", "مستقل", "دقيق", "طيب القلب"]
    },
    images: ["/images/7.jpg", "/images/8.jpg", "/images/9.jpg"],
    whatsappNumbers: ["4412345678"], 
    get whatsappNumber() { return pickRandom(this.whatsappNumbers); }
  }
];

export const personaConfig = personaPool[0];
export const filteringRules = {
  ageRange: { min: 35, max: 65 },
  disqualifiedOccupations: ["student", "unemployed"],
  disqualifiedCountryCode: "+86"
};
export const formspreeEndpoint = "FORMSPREE_API_ENDPOINT";
