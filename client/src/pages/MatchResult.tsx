/**
 * Synchro - Match Result Page (Multi-Persona & Stable WhatsApp)
 * 1. 【去电台化】完全移除了语音播放功能及相关UI。
 * 2. 【分流锁定】利用 localStorage 锁定分配到的人设和号码，防止刷新变脸，确保复制和跳转号码一致。
 * 3. 【无损保留】保留轮播图 [&_[data-slot=carousel-content]]:h-full 修复、Logo 原色显示等所有布局设置。
 */

import { useState, useMemo } from 'react'; 
import { useLanguage } from '@/contexts/LanguageContext';
// 引入人设池
import { personaPool } from '@/lib/config';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MessageCircle, Copy, Check } from 'lucide-react'; 
import { useLocation } from 'wouter';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function MatchResult() {
  const { language, t } = useLanguage();
  const [, setLocation] = useLocation();
  const [isCopied, setIsCopied] = useState(false); 

  // --- 核心逻辑：分配人设并同步定死号码（加入防连续重复机制） ---
  const { persona, targetNumber } = useMemo(() => {
    // 1. 检查当前浏览器是否已经存过分配结果 (防刷新变脸)
    const savedId = localStorage.getItem('synchro_matched_persona_id');
    const savedNum = localStorage.getItem('synchro_matched_number');

    if (savedId && savedNum) {
      const found = personaPool.find(p => p.id === savedId);
      if (found) return { persona: found, targetNumber: savedNum };
    }

    // === 核心改动：增强版随机分配 (尽量避免与上一次完全重复) ===
    let randomPersona;
    // 尝试读取上一个被抽到的人设ID（为了做全局记录，存在另一个变量里）
    const lastAssignedId = localStorage.getItem('synchro_last_assigned_id');

    if (personaPool.length > 1 && lastAssignedId) {
      // 如果有多个人设，且知道上次抽了谁，就从剩下的池子里抽，强制轮换
      const availablePersonas = personaPool.filter(p => p.id !== lastAssignedId);
      randomPersona = availablePersonas[Math.floor(Math.random() * availablePersonas.length)];
    } else {
      // 第一次抽，或者池子里只有1个人设，就直接抽
      randomPersona = personaPool[Math.floor(Math.random() * personaPool.length)];
    }

    // 记录这次抽到的人设，供下一次参考（防连号）
    localStorage.setItem('synchro_last_assigned_id', randomPersona.id);
    
    // ==============================================================

    // 3. 立即从该人设的专属池子里抽一个号码定死
    const selectedNumber = randomPersona.whatsappNumber;

    // 4. 将这对组合永久存入 localStorage (当前用户的锁)
    localStorage.setItem('synchro_matched_persona_id', randomPersona.id);
    localStorage.setItem('synchro_matched_number', selectedNumber);

    return { persona: randomPersona, targetNumber: selectedNumber };
  }, []);

  // --- 复制功能 ---
  const handleCopy = () => {
    const textToCopy = `+${targetNumber}`;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(textToCopy).then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      });
    } else {
      const textArea = document.createElement("textarea");
      textArea.value = textToCopy;
      textArea.style.position = "fixed"; 
      textArea.style.opacity = "0";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand('copy');
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      } catch (err) {}
      document.body.removeChild(textArea);
    }
  };

  // 安全保护：如果没有获取到人设数据，不渲染页面（防止白屏报错）
  if (!persona) return null;

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container flex items-center justify-between h-16 px-4">
          <Button variant="ghost" onClick={() => setLocation('/')} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            {t.nav.home}
          </Button>
          
          <div className="flex items-center gap-2">
            <img 
              src="/images/header-logo.png" 
              alt="Synchro Logo" 
              className="h-10 w-auto object-contain"
            />
            <h1 className="text-xl font-bold text-primary">Synchro</h1>
          </div>

          <div className="w-24" /> 
        </div>
      </nav>

      <section className="pt-32 pb-20 px-4">
        <div className="container max-w-4xl">
          <div className="text-center mb-12 fade-in-up">
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-4xl md:text-5xl mb-4 font-bold">{t.matching.success}</h1>
            <p className="text-xl text-muted-foreground">{t.matchResult.title}</p>
            
            <p className="text-sm text-primary/60 mt-6 italic max-w-2xl mx-auto border-t border-primary/10 pt-4 leading-relaxed">
              {t.matchResult.lockNotice}
            </p>
          </div>

          <div className="bg-card rounded-3xl shadow-2xl overflow-hidden fade-in-up delay-200 border border-border">
            <div className="grid md:grid-cols-2 gap-0">
              
              <div className="relative h-[450px] md:h-full md:min-h-[600px] bg-muted">
                {/* 核心修复保留：轮播图高度撑满 */}
                <Carousel className="w-full h-full [&_[data-slot=carousel-content]]:h-full">
                  <CarouselContent className="h-full ml-0">
                    {persona.images.map((src, index) => (
                      <CarouselItem key={index} className="pl-0 h-full">
                        <div className="relative w-full h-full">
                          <img 
                            src={src} 
                            alt={`${persona.name} ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="left-4 bg-white/20 border-none text-white hover:bg-white/40" />
                  <CarouselNext className="right-4 bg-white/20 border-none text-white hover:bg-white/40" />
                </Carousel>
              </div>

              <div className="p-8 md:p-12 flex flex-col justify-center">
                <div className="mb-6">
                  <h2 className="text-4xl mb-2 font-bold">{persona.name}</h2>
                  <p className="text-xl text-muted-foreground">
                    {/* @ts-ignore */}
                    {persona.age} • {persona.title[language] || persona.title['en']}
                  </p>
                </div>

                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-3">{t.matchResult.learnMore} {persona.name}</h3>
                  <p className="text-muted-foreground leading-relaxed italic">
                    {/* @ts-ignore */}
                    "{persona.bio[language] || persona.bio['en']}"
                  </p>
                </div>

                <div className="mb-8 flex flex-wrap gap-2">
                  {/* @ts-ignore */}
                  {(persona.tags[language] || persona.tags['en']).map((tag: string, index: number) => (
                    <span key={index} className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="space-y-3 mt-auto">
                  <a href={waLink} className="block w-full">
                    <Button size="lg" className="w-full breathing-glow text-lg h-14 gap-2">
                      <MessageCircle className="w-6 h-6" />
                      {t.matchResult.connectButton}
                    </Button>
                  </a>

                  <Button
                    variant="outline"
                    size="lg"
                    onClick={handleCopy}
                    className={`w-full text-lg h-14 gap-2 border-primary/20 hover:bg-primary/5 transition-all ${isCopied ? 'border-green-500 text-green-600 bg-green-50' : ''}`}
                  >
                    {isCopied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                    {/* @ts-ignore */}
                    {isCopied ? t.matchResult.copied : t.matchResult.copyButton}
                  </Button>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-8 bg-card border-t border-border">
        <div className="container text-center text-sm text-muted-foreground">
          <p>{t.footer.copyright}</p>
        </div>
      </footer>
    </div>
  );
}
