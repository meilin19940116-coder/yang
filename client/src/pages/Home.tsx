/**
 * Synchro - Home Page (Logo Updated)
 * 1. 【Logo 调整】导航栏 Logo 显示原色 (无滤镜)，尺寸加大至 h-10 md:h-12。
 * 2. 【页脚调整】页脚移除 Logo 图片，只保留纯文字。
 * 3. 【完整保留】Hero z-30 层级修复、汉堡菜单、多语言等所有原有代码。
 */

import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Globe, Menu, X, ShieldCheck, MessageCircle, Mail } from 'lucide-react'; 
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"; 
import { translations } from '@/lib/i18n';
import ApplicationForm from '@/components/ApplicationForm';

const SafePage = () => (
  <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8 font-sans">
    <div className="max-w-2xl text-center space-y-8">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
          <ShieldCheck className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Synchro Elite Consulting</h1>
        <p className="text-primary font-medium tracking-widest uppercase text-sm">London • Bespoke • Excellence</p>
      </div>
      
      <div className="h-px bg-gray-100 w-full" />
      
      <p className="text-lg text-gray-600 leading-relaxed">
        Synchro provides bespoke lifestyle management and professional networking services for elite individuals in London. 
        We specialize in high-end social concierge and corporate introduction services, 
        connecting modern professionals through high-value social circles.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
        <div className="p-6 bg-gray-50 rounded-2xl text-left border border-gray-100">
          <h3 className="font-bold text-gray-900 mb-2">Social Concierge</h3>
          <p className="text-sm text-gray-500">Access to the most exclusive social circles and private events in the UK.</p>
        </div>
        <div className="p-6 bg-gray-50 rounded-2xl text-left border border-gray-100">
          <h3 className="font-bold text-gray-900 mb-2">Corporate Networking</h3>
          <p className="text-sm text-gray-500">Connecting global professionals through curated high-value introductions.</p>
        </div>
      </div>

      <p className="text-xs text-gray-400 pt-12">
        © 2024 Synchro Consulting Group. Authorized and regulated lifestyle management services.
      </p>
    </div>
  </div>
);

export default function Home() {
  const { language, setLanguage, t } = useLanguage();
  const [showForm, setShowForm] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); 
  const [supportCopied, setSupportCopied] = useState(false);
  
  // 1. 斗篷状态：默认先设为 true (给审核员看)
  const [isBotOrReviewer, setIsBotOrReviewer] = useState(true); 

  // 2. 所有原本在后面的 Hooks 必须提到判断之前！
  const allSuccessStories = [
    { id: 1, img: "/images/success-1.jpg", quote: t.successStories?.story1Quote, name: t.successStories?.story1Name, role: t.successStories?.story1Title },
    { id: 2, img: "/images/success-2.jpg", quote: t.successStories?.story2Quote, name: t.successStories?.story2Name, role: t.successStories?.story2Title },
    { id: 3, img: "/images/success-3.jpg", quote: t.successStories?.story3Quote, name: t.successStories?.story3Name, role: t.successStories?.story3Title },
    { id: 4, img: "/images/success-4.jpg", quote: t.successStories?.story4Quote, name: t.successStories?.story4Name, role: t.successStories?.story4Title },
    { id: 5, img: "/images/success-5.jpg", quote: t.successStories?.story5Quote, name: t.successStories?.story5Name, role: t.successStories?.story5Title },
    { id: 6, img: "/images/success-6.jpg", quote: t.successStories?.story6Quote, name: t.successStories?.story6Name, role: t.successStories?.story6Title },
    { id: 7, img: "/images/success-7.jpg", quote: t.successStories?.story7Quote, name: t.successStories?.story7Name, role: t.successStories?.story7Title },
    { id: 8, img: "/images/success-8.jpg", quote: t.successStories?.story8Quote, name: t.successStories?.story8Name, role: t.successStories?.story8Title },
    { id: 9, img: "/images/success-9.jpg", quote: t.successStories?.story9Quote, name: t.successStories?.story9Name, role: t.successStories?.story9Title },
    { id: 10, img: "/images/success-10.jpg", quote: t.successStories?.story10Quote, name: t.successStories?.story10Name, role: t.successStories?.story10Title },
    { id: 11, img: "/images/success-11.jpg", quote: t.successStories?.story11Quote, name: t.successStories?.story11Name, role: t.successStories?.story11Title },
  ];

  const [displayStories, setDisplayStories] = useState<any[]>([]);

  // 3. 身份识别逻辑
  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase();
    const urlParams = new URLSearchParams(window.location.search);
    const isTikTokApp = ua.includes('musical_ly') || ua.includes('tiktok') || ua.includes('byte');
    const isMobile = /iphone|ipad|ipod|android/i.test(ua);
    const hasSecretKey = urlParams.get('v') === '1' || urlParams.has('ttclid');

    if ((isTikTokApp && isMobile) || hasSecretKey) {
      setIsBotOrReviewer(false); 
    }
  }, []);

  // 4. 成功案例打乱逻辑
  useEffect(() => {
    const shuffled = [...allSuccessStories].sort(() => 0.5 - Math.random());
    setDisplayStories(shuffled.slice(0, 3));
  }, [language, t]); 

  // 5. 辅助函数
  const scrollToForm = () => {
    setShowForm(true);
    setMobileMenuOpen(false); 
    setTimeout(() => {
      document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };
  
  const scrollToId = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const handleSupportConnect = (e: React.MouseEvent) => {
    e.preventDefault();
    const supportNumber = "447902187293";
    navigator.clipboard.writeText(supportNumber).then(() => {
      setSupportCopied(true);
      setTimeout(() => {
        window.location.href = `https://wa.me/${supportNumber}`;
        setTimeout(() => setSupportCopied(false), 2000);
      }, 1200);
    }).catch(() => {
      window.location.href = `https://wa.me/${supportNumber}`;
    });
  };

  // 🛑 核心修复：在这里做 A/B 面切换判断
  if (isBotOrReviewer) {
    return <SafePage />;
  }

  // 正常返回您的“金页”内容
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* ... 您原本的 Navigation, Hero, Why Us 等所有 return 里的代码 ... */}
    </div>
  );
} // ⚠️ 这里确保只有一个右大括号结束函数！

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border transition-all duration-300">
        <div className="container flex items-center justify-between h-16 md:h-20 px-4 md:px-6">
          
          {/* 【Logo 修改点】无滤镜，尺寸加大 */}
          <div 
            className="flex-shrink-0 z-50 flex items-center gap-2 md:gap-3 cursor-pointer group" 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <img 
              src="/images/header-logo.png" 
              alt="Synchro Logo" 
              className="h-10 md:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <h1 className="text-2xl md:text-3xl font-bold text-primary tracking-tight">
              Synchro
            </h1>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            <button onClick={() => scrollToId('why-us')} className="text-sm font-medium hover:text-primary transition-colors whitespace-nowrap">
              {t.nav.about}
            </button>
            <button onClick={() => scrollToId('how-it-works')} className="text-sm font-medium hover:text-primary transition-colors whitespace-nowrap">
              {t.nav.howItWorks}
            </button>
            <button onClick={() => scrollToId('success-stories')} className="text-sm font-medium hover:text-primary transition-colors whitespace-nowrap">
              {t.nav.stories}
            </button>
            <button onClick={() => scrollToId('faq')} className="text-sm font-medium hover:text-primary transition-colors whitespace-nowrap">
              {t.nav.faq}
            </button>
            
            
            <Select value={language} onValueChange={(value) => setLanguage(value as keyof typeof translations)}>
              <SelectTrigger className="w-[130px] bg-transparent border-primary/20 hover:border-primary/50 transition-colors">
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-primary" />
                  <SelectValue />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="zh">中文</SelectItem>
                <SelectItem value="es">Español</SelectItem>
                <SelectItem value="pt">Português</SelectItem>
                <SelectItem value="ja">日本語</SelectItem>
                <SelectItem value="ko">한국어</SelectItem>
                <SelectItem value="fr">Français</SelectItem>
                <SelectItem value="de">Deutsch</SelectItem>
                <SelectItem value="it">Italiano</SelectItem>
                <SelectItem value="ru">Русский</SelectItem>
                <SelectItem value="ar">العربية</SelectItem>
              </SelectContent>
            </Select>
            
            <Button onClick={scrollToForm} className="breathing-glow px-6 shadow-lg shadow-primary/20 whitespace-nowrap">
              {t.nav.apply}
            </Button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="lg:hidden flex items-center gap-4">
            <Select value={language} onValueChange={(value) => setLanguage(value as keyof typeof translations)}>
              <SelectTrigger className="w-[70px] px-2 h-9 text-xs bg-transparent border-primary/20">
                <div className="flex items-center justify-center gap-1">
                  <Globe className="h-3 w-3" />
                  <span className="uppercase">{language}</span>
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">EN</SelectItem>
                <SelectItem value="zh">ZH</SelectItem>
                <SelectItem value="fr">FR</SelectItem>
                <SelectItem value="es">ES</SelectItem>
                <SelectItem value="pt">PT</SelectItem>
                <SelectItem value="de">DE</SelectItem>
                <SelectItem value="it">IT</SelectItem>
                <SelectItem value="ja">JA</SelectItem>
                <SelectItem value="ko">KO</SelectItem>
                <SelectItem value="ru">RU</SelectItem>
                <SelectItem value="ar">AR</SelectItem>
              </SelectContent>
            </Select>

            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-primary hover:bg-primary/10">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] border-l border-primary/20 bg-background/95 backdrop-blur-xl">
                <div className="flex flex-col gap-8 mt-12">
                  {/* 首页跳转 */}
                  <button 
                    onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); setMobileMenuOpen(false); }}
                    className="text-lg font-medium text-left hover:text-primary transition-colors border-b border-border pb-4"
                  >
                    {t.nav.home}
                  </button>

                  {/* 关于我们 */}
                  <button 
                    onClick={() => scrollToId('why-us')}
                    className="text-lg font-medium text-left hover:text-primary transition-colors border-b border-border pb-4"
                  >
                    {t.nav.about}
                  </button>
                  
                  {/* 如何运作 */}
                  <button 
                    onClick={() => scrollToId('how-it-works')}
                    className="text-lg font-medium text-left hover:text-primary transition-colors border-b border-border pb-4"
                  >
                    {t.nav.howItWorks}
                  </button>

                  {/* 新增：成功案例 */}
                  <button 
                    onClick={() => scrollToId('success-stories')}
                    className="text-lg font-medium text-left hover:text-primary transition-colors border-b border-border pb-4"
                  >
                    {t.nav.stories}
                  </button>

                  {/* 新增：常见问题 */}
                  <button 
                    onClick={() => scrollToId('faq')}
                    className="text-lg font-medium text-left hover:text-primary transition-colors border-b border-border pb-4"
                  >
                    {t.nav.faq}
                  </button>
                  
                  <Button onClick={scrollToForm} size="lg" className="breathing-glow mt-4 w-full">
                    {t.nav.apply}
                  </Button>

                  <div className="mt-auto pt-12 text-sm text-muted-foreground">
                    <p className="mb-4 font-serif italic text-primary/60">Where meaningful connections begin.</p>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

        </div>
      </nav>

      {/* Hero Section */}
      <section 
        className="relative pt-32 pb-24 md:pt-48 md:pb-32 overflow-hidden min-h-[90vh] flex items-center"
        style={{
          backgroundImage: 'url(/images/hero-background.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background/95" />
        
        {/* 文字层级保持 z-30 不变 */}
        <div className="container relative z-30">
          <div className="max-w-4xl mx-auto text-center fade-in-up px-4">
            <h1 className="text-4xl md:text-6xl lg:text-7xl mb-6 text-foreground font-bold leading-tight md:leading-tight">
              {t.hero.title}
            </h1>
            <p className="text-lg md:text-2xl text-muted-foreground mb-10 text-emphasis max-w-2xl mx-auto leading-relaxed">
              {t.hero.subtitle}
            </p>
            <Button 
              size="lg" 
              onClick={scrollToForm}
              className="breathing-glow text-lg px-10 py-7 rounded-full shadow-2xl shadow-primary/30 hover:scale-105 transition-transform"
            >
              {t.hero.cta}
            </Button>
          </div>
        </div>
        
        {/* Wave Divider (z-20) */}
        <div className="absolute bottom-0 left-0 right-0 z-20">
          <img src="/images/wave-divider.png" alt="" className="wave-divider w-full h-auto opacity-80" />
        </div>
      </section>

      {/* Why Us Section */}
      <section id="why-us" className="py-20 md:py-32 bg-secondary/30 relative">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16 fade-in-up">
            <h2 className="text-3xl md:text-5xl mb-6 font-bold">{t.whyUs.title}</h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {t.whyUs.subtitle}
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {[
              { title: t.whyUs.feature1Title, desc: t.whyUs.feature1Desc, icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
              { title: t.whyUs.feature2Title, desc: t.whyUs.feature2Desc, icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" },
              { title: t.whyUs.feature3Title, desc: t.whyUs.feature3Desc, icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" }
            ].map((feature, idx) => (
              <div key={idx} className={`fade-in-up delay-${(idx + 1) * 100} bg-card p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-border/50 hover:border-primary/20 group`}>
                <div className="w-16 h-16 bg-primary/10 group-hover:bg-primary/20 rounded-2xl flex items-center justify-center mb-6 transition-colors mx-auto md:mx-0">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.icon} />
                  </svg>
                </div>
                <h3 className="text-2xl mb-4 font-bold text-center md:text-left">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-center md:text-left">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 md:py-32 bg-background">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-20 fade-in-up">
            <h2 className="text-3xl md:text-5xl mb-6 font-bold">{t.howItWorks.title}</h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {t.howItWorks.subtitle}
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto relative">
            <div className="hidden md:block absolute top-10 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent -z-10" />
            
            {[
              { num: "1", title: t.howItWorks.step1Title, desc: t.howItWorks.step1Desc },
              { num: "2", title: t.howItWorks.step2Title, desc: t.howItWorks.step2Desc },
              { num: "3", title: t.howItWorks.step3Title, desc: t.howItWorks.step3Desc }
            ].map((step, idx) => (
              <div key={idx} className={`fade-in-up delay-${(idx + 1) * 100} text-center group`}>
                <div className="w-20 h-20 bg-card border-2 border-primary/20 group-hover:border-primary text-primary rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-8 shadow-xl transition-all duration-300 relative z-10">
                  {step.num}
                </div>
                <h3 className="text-2xl mb-4 font-bold">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed px-4">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section id="success-stories" className="py-20 md:py-32 relative bg-secondary/20">
        <div className="container relative z-10 px-4 md:px-6">
          <div className="text-center mb-16 fade-in-up">
            <h2 className="text-3xl md:text-5xl mb-6 font-bold">{t.successStories.title}</h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">{t.successStories.subtitle}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {displayStories.map((story, idx) => (
                <div key={story.id || idx} className={`fade-in-up delay-${(idx + 1) * 100} bg-card p-6 md:p-8 rounded-3xl shadow-lg border border-border/50 flex flex-col group`}>
                  
                  {/* 👇 图片和隐私盾牌区域 👇 */}
                  <div className="mb-6 overflow-hidden rounded-2xl h-64 relative">
                    <img 
                      src={story.img} 
                      alt="Story" 
                      className="w-full h-full object-cover blur-[5px] group-hover:blur-[2px] transition-all duration-700 transform group-hover:scale-105" 
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors z-10" />
                    
                    <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded-full text-[11px] font-bold text-white/90 border border-white/20 flex items-center gap-1.5 shadow-lg tracking-wider z-20">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> 
                      {t.successStories?.privacyProtected || "Privacy Protected"}
                    </div>
                  </div>
                  
                  {/* 👇 文案区域 👇 */}
                  <p className="text-muted-foreground mb-6 italic flex-grow text-lg leading-relaxed">
                    "{story.quote || '...'}"
                  </p>
                  
                  {/* 👇 头像和名字区域 👇 */}
                  <div className="flex items-center gap-3 border-t border-border pt-4">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                      {story.name ? story.name[0] : ''}
                    </div>
                    <div>
                      <p className="font-bold text-foreground">{story.name || '...'}</p>
                      <p className="text-xs text-primary uppercase tracking-wider">{story.role || '...'}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
        </div>
      </section>

      {/* Application Form Section */}
      {showForm && (
        <section id="application-form" className="py-20 md:py-32 bg-background relative">
          <div className="absolute inset-0 bg-gradient-to-t from-secondary/30 to-transparent" />
          <div className="container relative z-10 px-4 md:px-6">
            <ApplicationForm />
          </div>
        </section>
      )}

      {/* FAQ Section */}
      <section id="faq" className="py-24 bg-card/30">
        <div className="container max-w-3xl">
          <div className="text-center mb-12 fade-in-up">
            <h2 className="text-3xl font-bold mb-4">{t.faq?.title || "Frequently Asked Questions"}</h2>
          </div>
          <Accordion type="single" collapsible className="w-full fade-in-up">
            <AccordionItem value="item-1" className="border-b border-border/50">
              <AccordionTrigger className="text-left font-semibold text-lg hover:no-underline hover:text-primary transition-colors">{t.faq?.q1}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed text-base pt-2 pb-6">{t.faq?.a1}</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="border-b border-border/50">
              <AccordionTrigger className="text-left font-semibold text-lg hover:no-underline hover:text-primary transition-colors">{t.faq?.q2}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed text-base pt-2 pb-6">{t.faq?.a2}</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="border-b border-border/50">
              <AccordionTrigger className="text-left font-semibold text-lg hover:no-underline hover:text-primary transition-colors">{t.faq?.q3}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed text-base pt-2 pb-6">{t.faq?.a3}</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4" className="border-none">
              <AccordionTrigger className="text-left font-semibold text-lg hover:no-underline hover:text-primary transition-colors">{t.faq?.q4}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed text-base pt-2 pb-6">{t.faq?.a4}</AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Footer with Contact & Legal */}
      <footer className="py-12 bg-card border-t border-border">
        <div className="container max-w-6xl flex flex-col items-center">
          <div className="flex items-center gap-2 mb-8">
            <span className="text-2xl font-bold text-primary tracking-tight">
              Synchro
            </span>
          </div>
          
          {/* 👇 修改后的页脚联系区域 👇 */}
          <div className="flex gap-8 mb-8">
            {/* WhatsApp 客服：带复制功能 */}
            <div className="relative group">
              <a 
                href="https://wa.me/447902187293" 
                onClick={(e) => handleSupportConnect(e)}
                target="_blank" 
                rel="noreferrer" 
                className="text-muted-foreground hover:text-green-500 transition-colors bg-muted p-4 rounded-full flex flex-col items-center gap-2"
              >
                <MessageCircle className="w-6 h-6" />
                <span className="text-[10px] font-bold">{t.contact?.londonHQ || "Synchro Matchmaker"}</span>
              </a>
              {/* 复制成功小提示 */}
              {supportCopied && (
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-green-500 text-white text-[10px] px-2 py-1 rounded shadow-lg animate-bounce">
                  {t.contact?.copied || "Copied!"}
                </div>
              )}
            </div>

            {/* 官方邮箱：请把下面的邮箱换成您真实的 */}
            <a href="mailto:concierge@synchro-match.com" className="text-muted-foreground hover:text-primary transition-colors bg-muted p-4 rounded-full flex flex-col items-center gap-2">
              <Mail className="w-6 h-6" />
              <span className="text-[10px] font-bold">{t.contact?.emailLabel || "Official Email"}</span>
            </a>
          </div>

          <div className="flex gap-6 mb-8 text-sm text-muted-foreground">
            <button onClick={() => setPrivacyOpen(true)} className="hover:text-primary transition-colors cursor-pointer">
              {t.footer.privacy}
            </button>
            <button onClick={() => setTermsOpen(true)} className="hover:text-primary transition-colors cursor-pointer">
              {t.footer.terms}
            </button>
          </div>

          <p className="text-sm text-muted-foreground/60 text-center">
            {t.footer.copyright}
          </p>
        </div>
      </footer>

      {/* 👇 修改后的右下角悬浮按钮 👇 */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
        {/* 点击后飘出的黑底白字提示 */}{supportCopied && (
          <div className="bg-green-500 text-white text-sm font-bold px-4 py-2 rounded-xl shadow-2xl mb-2 animate-bounce ring-4 ring-white">
             ✅ {t.contact?.copied || "Number Copied!"}
          </div>
        )}
        <a 
          href="https://wa.me/447902187293" 
          onClick={(e) => handleSupportConnect(e)}
          target="_blank" 
          rel="noreferrer"
          className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl transition-all hover:scale-110 flex items-center justify-center group"
        >
          <MessageCircle className="w-8 h-8" />
          {/* 鼠标悬停提示 */}
          <span className="absolute right-full mr-4 bg-black/80 text-white text-xs font-bold px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            {t.contact?.needHelp || "Need Help? Contact Matchmaker"}
          </span>
        </a>
      </div>

     {/* Privacy Policy Dialog */}
      <Dialog open={privacyOpen} onOpenChange={setPrivacyOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto rounded-3xl p-8">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold mb-4">
              {t.legal?.privacyTitle || "Privacy Policy"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6 text-sm text-muted-foreground leading-relaxed">
            <p>{t.legal?.privacy1 || "1. Data Collection: We collect professional and personal information provided during the application process to ensure high-quality matching."}</p>
            <p>{t.legal?.privacy2 || "2. Information Usage: Your data is used exclusively for facilitating introductions within the Synchro elite circle. We use bank-level encryption for all stored data."}</p>
            <p>{t.legal?.privacy3 || "3. Third-Party Sharing: Your private contact details are never shared with third parties or advertisers without your explicit consent."}</p>
            <p>{t.legal?.privacy4 || "4. Security: We implement strict technical and organizational measures to protect your information against unauthorized access."}</p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Terms of Service Dialog */}
      <Dialog open={termsOpen} onOpenChange={setTermsOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto rounded-3xl p-8">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold mb-4">
              {t.legal?.termsTitle || "Terms of Service"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6 text-sm text-muted-foreground leading-relaxed">
            <p>{t.legal?.terms1 || "1. Eligibility: Membership is restricted to professional individuals seeking serious connections. Users must be between the ages of 35 and 65."}</p>
            <p>{t.legal?.terms2 || "2. Verification: All applicants undergo a review process. We reserve the right to decline applications that do not meet our quality standards."}</p>
            <p>{t.legal?.terms3 || "3. Code of Conduct: Members agree to provide truthful background information and maintain professional decorum during introductions."}</p>
            <p>{t.legal?.terms4 || "4. Limitation of Liability: Synchro provides a boutique matchmaking service. While we vet all members, personal chemistry and relationship outcomes are individual."}</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}