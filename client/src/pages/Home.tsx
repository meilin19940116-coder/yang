/**
 * Synchro - Home Page (Logo Updated)
 * 1. 【Logo 调整】导航栏 Logo 显示原色 (无滤镜)，尺寸加大至 h-10 md:h-12。
 * 2. 【页脚调整】页脚移除 Logo 图片，只保留纯文字。
 * 3. 【完整保留】Hero z-30 层级修复、汉堡菜单、多语言等所有原有代码。
 */

import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Globe, Menu, X, ShieldCheck } from 'lucide-react'; 
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

export default function Home() {
  const { language, setLanguage, t } = useLanguage();
  const [showForm, setShowForm] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); 

  // 👇 --- 从这里开始加您的 11个案例大池子 --- 👇
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

  useEffect(() => {
    // 每次组件加载时，随机打乱数组并取前 3 个
    const shuffled = [...allSuccessStories].sort(() => 0.5 - Math.random());
    setDisplayStories(shuffled.slice(0, 3));
  }, [language, t]); 

  const scrollToForm = () => {
    setShowForm(true);
    setMobileMenuOpen(false); 
    setTimeout(() => {
      document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

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
            <a href="#why-us" className="text-sm font-medium hover:text-primary transition-colors whitespace-nowrap">
              {t.nav.about}
            </a>
            <a href="#how-it-works" className="text-sm font-medium hover:text-primary transition-colors whitespace-nowrap">
              {t.nav.howItWorks}
            </a>
            
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
                  <a 
                    href="#why-us" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-lg font-medium hover:text-primary transition-colors border-b border-border pb-4"
                  >
                    {t.nav.about}
                  </a>
                  <a 
                    href="#how-it-works" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-lg font-medium hover:text-primary transition-colors border-b border-border pb-4"
                  >
                    {t.nav.howItWorks}
                  </a>
                  
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
      <section className="py-20 md:py-32 relative bg-secondary/20">
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
                      Privacy Protected
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

      {/* Footer */}
      <footer className="py-16 bg-card border-t border-border">
        <div className="container px-4 md:px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-1">
              {/* 【页脚修改点】移除了 Logo 图片，只保留文字 */}
              <h3 className="text-2xl font-bold text-primary mb-4 tracking-tight">Synchro</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{t.footer.tagline}</p>
            </div>
            
            <div>
              <h4 className="font-bold mb-6 text-foreground">{t.nav.about}</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><a href="#why-us" className="hover:text-primary transition-colors block py-1">{t.whyUs.title}</a></li>
                <li><a href="#how-it-works" className="hover:text-primary transition-colors block py-1">{t.howItWorks.title}</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-6 text-foreground">{t.footer.contact}</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>
                  <button onClick={() => setPrivacyOpen(true)} className="hover:text-primary transition-colors text-left block py-1">
                    {t.footer.privacy}
                  </button>
                </li>
                <li>
                  <button onClick={() => setTermsOpen(true)} className="hover:text-primary transition-colors text-left block py-1">
                    {t.footer.terms}
                  </button>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-6 text-foreground">{t.nav.apply}</h4>
              <Button onClick={scrollToForm} className="w-full h-12 text-lg shadow-lg">
                {t.hero.cta}
              </Button>
            </div>
          </div>
          
          <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground/60">
            <p>{t.footer.copyright}</p>
          </div>
        </div>
      </footer>

      {/* Privacy Policy Dialog */}
      <Dialog open={privacyOpen} onOpenChange={setPrivacyOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto rounded-3xl p-8">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold mb-4">Privacy Policy</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 text-sm text-muted-foreground leading-relaxed">
            <p><strong>1. Data Collection:</strong> We collect professional and personal information provided during the application process to ensure high-quality matching.</p>
            <p><strong>2. Information Usage:</strong> Your data is used exclusively for facilitating introductions within the Synchro elite circle. We use bank-level encryption for all stored data.</p>
            <p><strong>3. Third-Party Sharing:</strong> Your private contact details are never shared with third parties or advertisers without your explicit consent.</p>
            <p><strong>4. Security:</strong> We implement strict technical and organizational measures to protect your information against unauthorized access.</p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Terms of Service Dialog */}
      <Dialog open={termsOpen} onOpenChange={setTermsOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto rounded-3xl p-8">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold mb-4">Terms of Service</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 text-sm text-muted-foreground leading-relaxed">
            <p><strong>1. Eligibility:</strong> Membership is restricted to professional individuals seeking serious connections. Users must be between the ages of 35 and 65.</p>
            <p><strong>2. Verification:</strong> All applicants undergo a review process. We reserve the right to decline applications that do not meet our quality standards.</p>
            <p><strong>3. Code of Conduct:</strong> Members agree to provide truthful background information and maintain professional decorum during introductions.</p>
            <p><strong>4. Limitation of Liability:</strong> Synchro provides a boutique matchmaking service. While we vet all members, personal chemistry and relationship outcomes are individual.</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}