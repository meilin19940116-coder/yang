# Synchro - 全球私人定制相亲引荐系统

一个高转化率、专业且温暖的私人相亲引荐落地页,采用浪漫主义现代派设计风格。

## 🎨 设计理念

**浪漫主义现代派 (Romantic Modernism)**

融合法国新艺术运动的流畅曲线与现代极简主义,创造既温暖又精致的视觉语言:

- **配色方案**: 温暖胭脂粉 (#E9967A) + 暖象牙白背景 (#FFFDF5) + 深灰炭色文字 (#333333)
- **字体系统**: Playfair Display (优雅衬线标题) + Inter (现代无衬线正文) + Cormorant Garamond (精致强调)
- **布局特点**: 流体不对称网格,波浪形分隔线,打破传统居中布局
- **交互动效**: 柔和淡入上浮动画、呼吸灯按钮效果、温柔的响应反馈
- **视觉元素**: 流动波纹背景、柔光光晕、手写风格点缀

## ✨ 核心功能

### 1. 多语言支持 (11种语言)
- 英语 (English)
- 中文 (简体中文)
- 西班牙语 (Español)
- 葡萄牙语 (Português)
- 日语 (日本語)
- 韩语 (한국어)
- 法语 (Français)
- 德语 (Deutsch)
- 意大利语 (Italiano)
- 俄语 (Русский)
- 阿拉伯语 (العربية)

### 2. 分步式申请流程 (4步)
1. **基本信息**: 姓名、年龄
2. **职业背景**: 职业、年收入
3. **个人介绍**: 兴趣爱好
4. **联系方式**: 国家代码 + WhatsApp 号码

### 3. 智能"安检门"过滤系统

#### 拦截规则 (自动引导至排队页面):
- ❌ 年龄不在 **35-65岁** 之间
- ❌ 职业选择 **"学生"** 或 **"无业"**
- ❌ 电话号码包含 **"+86"** (中国大陆)

#### 通过逻辑:
- ✅ 符合条件的用户 → 12秒匹配动画 → 跳转至 Simone 资料卡 (显示 WhatsApp 联系按钮)
- ❌ 不符合条件的用户 → 12秒匹配动画 → 跳转至排队审核页面 (不显示 WhatsApp 按钮)

### 4. 落地页模块
- **导航栏**: Logo + 语言切换器 + 导航链接
- **首屏英雄区**: 大气标题 + 副标题 + CTA 按钮 + 流动波纹背景
- **核心优势**: 3个特色卡片 (严格筛选、隐私加密、精准匹配)
- **操作指南**: 3步流程展示
- **信任背书**: 安全认证徽章
- **成功案例**: 3个真实故事 (人物图片模糊处理)
- **页脚**: 链接 + 版权信息

## 🔧 技术配置

### 人设配置 (personaConfig)

所有人设数据集中在 `shared/const.ts` 文件中:

```typescript
export const personaConfig = {
  name: "Simone",
  age: 32,
  title: {
    en: "Architect",
    cn: "建筑师",
    es: "Arquitecta",
    // ... 其他语言
  },
  bio: {
    en: "Passionate about design and meaningful connections...",
    cn: "热爱设计,期待有灵魂的碰撞...",
    es: "Apasionada por el diseño y las conexiones significativas...",
    // ... 其他语言
  },
  imageUrl: "/images/simone-profile.png", // 可替换
  whatsappUrl: "https://wa.me/1234567890", // 可替换
};
```

### 修改人设信息

只需编辑 `shared/const.ts` 文件中的 `personaConfig` 对象:

1. **修改姓名/年龄**: 直接修改 `name` 和 `age` 字段
2. **修改职业**: 编辑 `title` 对象中各语言的值
3. **修改个人简介**: 编辑 `bio` 对象中各语言的值
4. **修改头像**: 替换 `imageUrl` 的图片路径
5. **修改 WhatsApp 链接**: 更新 `whatsappUrl` 字段

### 表单提交配置

表单提交使用 Formspree API,配置位于 `client/src/components/ApplicationForm.tsx`:

```typescript
const FORMSPREE_ENDPOINT = "YOUR_FORMSPREE_ENDPOINT_HERE";
```

替换为您的 Formspree 端点地址即可。

## 📱 响应式设计

网站完美支持:
- 📱 iPhone (iOS Safari)
- 🤖 Android (Chrome/Firefox)
- 💻 桌面浏览器 (Chrome/Firefox/Safari/Edge)

## 🚀 部署说明

### 开发环境
```bash
pnpm install
pnpm dev
```

### 生产构建
```bash
pnpm build
pnpm start
```

## 📂 项目结构

```
synchro/
├── client/
│   ├── public/
│   │   └── images/          # 视觉资产
│   ├── src/
│   │   ├── components/      # 可复用组件
│   │   │   └── ApplicationForm.tsx  # 申请表单
│   │   ├── contexts/        # React 上下文
│   │   │   └── LanguageContext.tsx  # 语言上下文
│   │   ├── lib/             # 工具函数
│   │   │   ├── config.ts    # 配置导出
│   │   │   └── i18n.ts      # 多语言翻译
│   │   ├── pages/           # 页面组件
│   │   │   ├── Home.tsx     # 首页
│   │   │   ├── MatchResult.tsx  # 匹配成功页
│   │   │   └── QueuePage.tsx    # 排队审核页
│   │   ├── App.tsx          # 应用入口
│   │   └── index.css        # 全局样式
│   └── index.html           # HTML 模板
├── shared/
│   └── const.ts             # 人设配置
└── README.md                # 本文档
```

## 🎯 关键特性

### 1. 人设解耦设计
所有人设数据集中在一个配置对象中,便于快速更换目标人物,无需修改多处代码。

### 2. 智能过滤逻辑
前端实现的过滤系统,根据年龄、职业、电话号码自动判断用户资格,提供差异化的用户体验。

### 3. 多语言国际化
支持11种语言,覆盖全球主要市场,语言切换实时生效。

### 4. 动画与交互
- 淡入上浮动画 (fade-in-up)
- 呼吸灯按钮效果
- 12秒匹配动画
- 平滑滚动效果

### 5. 模块化设计
所有组件高度模块化,易于维护和扩展。

## 📝 待办事项

- [ ] 配置 Formspree 端点地址
- [ ] 替换 Simone 的真实头像 (如需要)
- [ ] 更新 WhatsApp 联系链接
- [ ] 添加 Google Analytics (可选)
- [ ] 配置自定义域名 (可选)

## 📄 许可证

MIT License

---

**Synchro** - Where meaningful connections begin. 💕
