export const COOKIE_NAME = "app_session_id";
export const ONE_YEAR_MS = 1000 * 60 * 60 * 24 * 365;

/**
 * Synchro - Shared Configuration
 * 后端拦截和底层逻辑使用的共享数据
 */

// 1. 定义多人设池 (personaPool)
export const personaPool = [
  {
    id: "simone",
    name: "Simone",
    age: 32,
    title: {
      en: "Interior Designer",
      zh: "室内设计师"
    },
    bio: {
      en: "Passion for design.",
      zh: "热爱设计。"
    },
    // 为后端预留的号码逻辑
    whatsappNumbers: ["447526833681", "447544476515"]
  },
  {
    id: "elena",
    name: "Elena",
    age: 28,
    title: {
      en: "Wealth Manager",
      zh: "财富管理经理"
    },
    bio: {
      en: "Value intelligence.",
      zh: "看重智慧。"
    },
    whatsappNumbers: ["447111222333"]
  },
  {
    id: "clara",
    name: "Clara",
    age: 26,
    title: {
      en: "Art Director",
      zh: "艺术总监"
    },
    bio: {
      en: "Creativity is life.",
      zh: "创意是我的生命。"
    },
    whatsappNumbers: ["447999888777"]
  }
];

// 2. 重要：保留 personaConfig 变量，兼容那些还没改过来的老代码，防止崩溃
export const personaConfig = personaPool[0];

// 3. 拦截规则 (保持原样)
export const filteringRules = {
  ageRange: {
    min: 35,
    max: 65
  },
  disqualifiedOccupations: ["student", "unemployed"],
  disqualifiedCountryCode: "+86"
};

// 4. Formspree 配置
export const formspreeEndpoint = "FORMSPREE_API_ENDPOINT";
