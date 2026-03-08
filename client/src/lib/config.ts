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

  // ------------------ 人设 2：Jesse (新业务员) ------------------
 {
    id: "jesse",
    name: "Jesse",
    age: 31,
    title: {
      en: "Internal Medicine Doctor",
      zh: "内科医生",
      es: "Médico internista",
      pt: "Médico Internista",
      ja: "内科医",
      ko: "내과 의사",
      fr: "Médecin interniste",
      de: "Internist",
      it: "Medico internista",
      ru: "Врач-терапевт",
      ar: "طبيب باطني"
    },
    bio: {
      en: "As a doctor, I dedicate my life to caring for others. Now, I'm looking for someone to share my own life, filled with warmth, mutual support, and simple joys.",
      zh: "作为一名医生，我习惯了照顾别人。现在，我希望能找到一个可以相互扶持的伴侣，一起分享生活中的温暖与简单快乐。",
      es: "Como médico, dedico mi vida a cuidar de los demás. Ahora busco a alguien con quien compartir mi propia vida, llena de calidez, apoyo mutuo y alegrías sencillas.",
      pt: "Como médico, dedico a minha vida a cuidar dos outros. Agora procuro alguém para partilhar a minha própria vida, cheia de calor, apoio mútuo e alegrias simples.",
      ja: "医師として、人々のケアに人生を捧げています。今は、温かさや互いのサポート、そしてささやかな喜びを分かち合えるパートナーを探しています。",
      ko: "의사로서 저는 다른 사람들을 돌보는 데 헌신하고 있습니다. 이제는 따뜻함, 서로의 지원, 그리고 소소한 기쁨을 함께 나눌 사람을 찾고 있습니다.",
      fr: "En tant que médecin, je consacre ma vie à soigner les autres. Maintenant, je cherche quelqu'un avec qui partager ma propre vie, pleine de chaleur, de soutien mutuel et de joies simples.",
      de: "Als Arzt widme ich mein Leben der Pflege anderer. Jetzt suche ich jemanden, mit dem ich mein eigenes Leben teilen kann – voller Wärme, gegenseitiger Unterstützung und einfacher Freuden.",
      it: "Come medico, dedico la mia vita a prendermi cura degli altri. Ora cerco qualcuno con cui condividere la mia vita, piena di calore, sostegno reciproco e gioie semplici.",
      ru: "Как врач, я посвящаю свою жизнь заботе о других. Теперь я ищу человека, с которым смогу разделить свою собственную жизнь, полную тепла, взаимной поддержки и простых радостей.",
      ar: "كطبيب، أكرس حياتي لرعاية الآخرين. أبحث الآن عن شخص أشاركه حياتي الخاصة، مليئة بالدفء والدعم المتبادل والأفراح البسيطة."
    },
    tags: {
      en: ["Caring", "Professional", "Empathetic", "Reliable"],
      zh: ["充满关爱", "专业敬业", "富有同理心", "成熟可靠"],
      es: ["Cariñoso", "Profesional", "Empático", "Confiable"],
      pt: ["Atencioso", "Profissional", "Empático", "Confiável"],
      ja: ["思いやり", "プロフェッショナル", "共感力", "頼りになる"],
      ko: ["배려심 깊은", "전문적인", "공감하는", "믿을 수 있는"],
      fr: ["Attentionné", "Professionnel", "Empathique", "Fiable"],
      de: ["Fürsorglich", "Professionell", "Empathisch", "Zuverlässig"],
      it: ["Premuroso", "Professionale", "Empatico", "Affidabile"],
      ru: ["Заботливый", "Профессиональный", "Эмпатичный", "Надежный"],
      ar: ["حنون", "محترف", "متعاطف", "موثوق"]
    },
    images: ["/images/4.jpg", "/images/5.jpg", "/images/6.jpg"],
    // 专属号码池，等会您自己填真实的进去
    whatsappNumbers: ["447935181351"], 
    get whatsappNumber() { 
      return pickRandom(this.whatsappNumbers); 
    }
  },

  // ------------------ 人设 3：Elsa (新业务员) ------------------
  {
    id: "elsa",
    name: "Elsa",
    age: 32,
    title: {
      en: "Beauty Salon Owner",
      zh: "美容店老板",
      es: "Dueña de salón de belleza",
      pt: "Dona de Salão de Beleza",
      ja: "ビューティーサロンオーナー",
      ko: "뷰티 살롱 원장",
      fr: "Propriétaire de salon de beauté",
      de: "Inhaberin eines Schönheitssalons",
      it: "Titolare di salone di bellezza",
      ru: "Владелица салона красоты",
      ar: "صاحبة صالون تجميل"
    },
    bio: {
      en: "I run my own beauty salon and love helping others feel confident. I'm independent but looking for a sincere, caring partner to build a warm home together.",
      zh: "我经营着一家美容店，喜欢帮助别人找回自信。虽然独立，但我依然渴望遇到一个真诚、体贴的伴侣，共同建立一个温暖的家。",
      es: "Dirijo mi propio salón de belleza y me encanta ayudar a otros a sentirse seguros. Soy independiente pero busco una pareja sincera y cariñosa para construir un hogar cálido juntos.",
      pt: "Dirijo o meu próprio salão de beleza e adoro ajudar os outros a sentirem-se confiantes. Sou independente, mas procuro um parceiro sincero e atencioso para construirmos uma casa acolhedora.",
      ja: "ビューティーサロンを経営しており、他の人が自信を持てるよう手助けするのが好きです。自立していますが、温かい家庭を築ける誠実で思いやりのあるパートナーを探しています。",
      ko: "뷰티 살롱을 운영하며 다른 사람들이 자신감을 가질 수 있도록 돕는 것을 좋아합니다. 독립적이지만, 함께 따뜻한 가정을 꾸릴 진실하고 다정한 파트너를 찾고 있습니다.",
      fr: "Je gère mon propre salon de beauté et j'adore aider les autres à se sentir en confiance. Je suis indépendante, mais je recherche un partenaire sincère et attentionné pour construire un foyer chaleureux.",
      de: "Ich betreibe meinen eigenen Schönheitssalon und liebe es, anderen zu helfen, sich selbstbewusst zu fühlen. Ich bin unabhängig, suche aber einen aufrichtigen, fürsorglichen Partner, um gemeinsam ein warmes Zuhause aufzubauen.",
      it: "Gestisco il mio salone di bellezza e adoro aiutare gli altri a sentirsi sicuri di sé. Sono indipendente, ma cerco un partner sincero e premuroso con cui costruire una famiglia accogliente.",
      ru: "Я руковожу собственным салоном красоты и люблю помогать другим обрести уверенность. Я независима, но ищу искреннего, заботливого партнера, чтобы вместе построить теплый дом.",
      ar: "أدير صالون التجميل الخاص بي وأحب مساعدة الآخرين على الشعور بالثقة. أنا مستقلة ولكني أبحث عن شريك صادق ومهتم لبناء منزل دافئ معًا."
    },
    tags: {
      en: ["Independent", "Elegant", "Caring", "Gentle"],
      zh: ["经济独立", "优雅精致", "顾家体贴", "温柔大方"],
      es: ["Independiente", "Elegante", "Cariñosa", "Gentil"],
      pt: ["Independente", "Elegante", "Atenciosa", "Gentil"],
      ja: ["自立した", "エレガント", "思いやり", "優しい"],
      ko: ["독립적인", "우아한", "배려심 많은", "다정한"],
      fr: ["Indépendante", "Élégante", "Attentionnée", "Douce"],
      de: ["Unabhängig", "Elegant", "Fürsorglich", "Sanft"],
      it: ["Indipendente", "Elegante", "Premurosa", "Gentile"],
      ru: ["Независимая", "Элегантная", "Заботливая", "Нежная"],
      ar: ["مستقلة", "أنيقة", "حنونة", "لطيفة"]
    },
    images: ["/images/7.jpg", "/images/8.jpg", "/images/9.jpg"],
    // 专属号码池
    whatsappNumbers: ["447927156139"], 
    get whatsappNumber() { 
      return pickRandom(this.whatsappNumbers); 
    }
  }

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