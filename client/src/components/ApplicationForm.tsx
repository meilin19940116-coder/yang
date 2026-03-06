/**
 * Synchro - Application Form Component (Final Polish)
 * 1. 【体验优化】自我介绍字数限制从 20 改为 10 (intro.length < 10)。
 * 2. 【完整保留】关系目标选择、隐私优化、多语言支持、Telegram通知。
 * 3. 【无损】所有动画、弹窗、风控逻辑完全一致。
 */

import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ShieldCheck, Lock, CheckCircle } from 'lucide-react'; 
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { filteringRules } from '@/lib/config';
import { countryCodes } from '@/lib/i18n';
import { useLocation } from 'wouter';

// =================【安全加固：从环境变量读取】=================
const TG_TOKEN = import.meta.env.VITE_TG_TOKEN; 
const TG_CHAT_ID = import.meta.env.VITE_TG_CHAT_ID;
// =========================================================

// --- 实时弹窗数据池 (完全展开，确保行数完整，绝不缩减) ---
const eliteNames = [
  "David", "Sophia", "Marco", "Emma", "James", "Olivia", "Alexander", "Isabella", "William", "Mia", 
  "Benjamin", "Charlotte", "Henry", "Amelia", "Sebastian", "Evelyn", "Jack", "Abigail", "Daniel", "Harper", 
  "Matthew", "Emily", "Joseph", "Elizabeth", "Samuel", "Avery", "Leo", "Sofia", "Arthur", "Ella", 
  "Lucas", "Scarlett", "Oscar", "Victoria", "Noah", "Aria", "Liam", "Grace", "Ethan", "Chloe", 
  "Mason", "Penelope", "Freddie", "Layla", "Theo", "Riley", "Thomas", "Zoey", "Isaac", "Lily"
];

const globalCities = [
  "London", "New York", "Singapore", "Dubai", "Hong Kong", "Paris", "Tokyo", "Zurich", "Sydney", "Toronto", 
  "Munich", "San Francisco", "Seoul", "Shanghai", "Stockholm", "Amsterdam", "Vienna", "Melbourne", "Los Angeles", "Berlin", 
  "Madrid", "Rome", "Vancouver", "Oslo", "Copenhagen", "Helsinki", "Frankfurt", "Geneva", "Brussels", "Barcelona", 
  "Milan", "Taipei", "Osaka", "Beijing", "Seattle", "Boston", "Chicago", "Washington", "Houston", "Dallas", 
  "Atlanta", "Miami", "Denver", "Phoenix", "San Diego", "Lisbon", "Dublin", "Prague", "Warsaw", "Luxembourg"
];

interface FormData {
  name: string;
  age: number;
  gender: string;
  occupation: string;
  relationshipGoal: string; // 【新增】关系目标
  interests: string;
  countryCode: string;
  whatsappNumber: string;
}

export default function ApplicationForm() {
  const { t } = useLanguage(); 
  const [, setLocation] = useLocation();
  const [currentStep, setCurrentStep] = useState(1);
  
  // --- 状态控制 ---
  const [showProof, setShowProof] = useState(false);
  const [proofContent, setProofContent] = useState({ name: "", city: "" });
  const [matchingLogIndex, setMatchingLogIndex] = useState(0); 

  const [formData, setFormData] = useState<FormData>({
    name: '',
    age: 0,
    gender: '',
    occupation: '',
    relationshipGoal: '', // 【新增】默认空
    interests: '',
    countryCode: '+1',
    whatsappNumber: ''
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  // --- 24小时锁定检查 ---
  useEffect(() => {
    const lockTime = localStorage.getItem('synchro_match_lock');
    const matchStatus = localStorage.getItem('synchro_match_status');

    if (lockTime) {
      const isLocked = Date.now() - parseInt(lockTime) < 24 * 60 * 60 * 1000;
      
      if (isLocked) {
        if (matchStatus === 'rejected') {
          setLocation('/queue');
        } else {
          setLocation('/match');
        }
      }
    }
  }, [setLocation]);

  // --- 实时弹窗循环 ---
  useEffect(() => {
    let timer: NodeJS.Timeout;
    const triggerPopup = () => {
      const randomName = eliteNames[Math.floor(Math.random() * eliteNames.length)];
      const randomCity = globalCities[Math.floor(Math.random() * globalCities.length)];
      
      setProofContent({ name: randomName, city: randomCity });
      setShowProof(true);

      setTimeout(() => setShowProof(false), 5000);

      const nextInterval = Math.floor(Math.random() * (25000 - 8000 + 1)) + 8000;
      timer = setTimeout(triggerPopup, nextInterval);
    };

    timer = setTimeout(triggerPopup, 10000); 
    return () => clearTimeout(timer);
  }, []);

  // --- 匹配日志滚动 ---
  useEffect(() => {
    if (currentStep === 5) {
      const interval = setInterval(() => {
        setMatchingLogIndex((prev) => {
          if (prev < 6) return prev + 1;
          return prev;
        });
      }, 1800); 
      return () => clearInterval(interval);
    }
  }, [currentStep]);

  const totalSteps = 4;

  const validateStep = (step: number): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    if (step === 1) {
      if (!formData.name.trim()) {
        newErrors.name = t.form.required;
      } else if (formData.name.trim().length < 2) {
        // @ts-ignore
        newErrors.name = t.form.nameMin;
      }
      // @ts-ignore
      if (!formData.gender) newErrors.gender = t.form.required;
      if (!formData.age || formData.age < 18) newErrors.age = t.form.required;
    } else if (step === 2) {
      if (!formData.occupation) newErrors.occupation = t.form.required;
      // 【新增校验】关系目标必填
      // @ts-ignore
      if (!formData.relationshipGoal) newErrors.relationshipGoal = t.form.required;
    } else if (step === 3) {
      const intro = formData.interests.trim();
      if (!intro) {
        newErrors.interests = t.form.required;
      // 【修改】逻辑校验改为 10 字
      } else if (intro.length < 10) {
        // @ts-ignore
        newErrors.interests = t.form.introMin;
      }
    } else if (step === 4) {
      if (!formData.whatsappNumber.trim()) {
        newErrors.whatsappNumber = t.form.required;
      } else if (!/^\d{6,15}$/.test(formData.whatsappNumber)) {
        newErrors.whatsappNumber = t.form.invalidPhone;
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  const handleBack = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const checkQualification = (): boolean => {
    if (formData.gender === 'female') return false;
    if (formData.age < filteringRules.ageRange.min || formData.age > filteringRules.ageRange.max) return false;
    if (filteringRules.disqualifiedOccupations.includes(formData.occupation)) return false;
    if (formData.countryCode === filteringRules.disqualifiedCountryCode) return false;
    return true;
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;
    const isQualified = checkQualification();

    // TG 质量分级
    const introLength = formData.interests.trim().length;
    let qualityTag = "⚪ 普通";
    if (introLength > 50) qualityTag = "🔥 优质 (描述详尽)";
    if (introLength < 15) qualityTag = "⚠️ 风险 (字数极少)"; // 同步调整为 15

    // 【核心修改】Telegram 消息：移除收入，增加关系目标
    // @ts-ignore
    const relationshipText = t.relationshipTypes[formData.relationshipGoal] || formData.relationshipGoal;

    const message = `
🌟 **New Match Inquiry** 🌟
━━━━━━━━━━━━━━
👤 姓名: ${formData.name}
🎂 年龄: ${formData.age}
⚧ 性别: ${formData.gender === 'male' ? '男' : '女'}
💼 职业: ${formData.occupation}
💓 寻找: ${relationshipText}
📱 WhatsApp: ${formData.countryCode}${formData.whatsappNumber}
📝 质量评估: ${qualityTag}
📝 自我介绍: ${formData.interests}
━━━━━━━━━━━━━━
${isQualified ? "✅ 符合预审 (匹配中)" : "❌ 系统拦截 (已拒绝)"}
    `;

    try {
      fetch(`https://api.telegram.org/bot${TG_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: TG_CHAT_ID, text: message })
      });
    } catch (e) {}

    localStorage.setItem('synchro_match_lock', Date.now().toString());
    localStorage.setItem('synchro_match_status', isQualified ? 'qualified' : 'rejected');

    setCurrentStep(5);
    await new Promise(resolve => setTimeout(resolve, 12000));
    
    if (isQualified) {
      setLocation('/match');
    } else {
      setLocation('/queue');
    }
  };

  const updateFormData = (field: keyof FormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  if (currentStep === 5) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-card p-12 rounded-3xl shadow-2xl text-center" style={{ backgroundImage: 'url(/images/matching-animation-bg.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <div className="relative z-10 py-10">
            <div className="w-24 h-24 mx-auto mb-8 relative">
              <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-75"></div>
              <div className="relative w-24 h-24 bg-primary rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-primary-foreground animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl mb-4 font-bold">{t.matching.title}</h2>
            <p className="text-xl text-primary font-bold transition-all duration-500 animate-pulse">
              {/* @ts-ignore */}
              {t.matchingLogs ? t.matchingLogs[matchingLogIndex] : t.matching.subtitle}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto relative">
      {showProof && (
        <div className="fixed bottom-6 left-6 z-[100] animate-in slide-in-from-left-full duration-500">
          <div className="bg-background/95 backdrop-blur-md border border-primary/20 shadow-2xl rounded-2xl p-4 flex items-center gap-4 max-w-sm">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-bold">
                {proofContent.name} 
                {/* @ts-ignore */}
                <span className="font-normal text-muted-foreground ml-1">{t.socialProof.from} {proofContent.city}</span>
              </p>
              {/* @ts-ignore */}
              <p className="text-xs text-primary font-bold">{t.socialProof.justMatched}</p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-card p-8 md:p-12 rounded-3xl shadow-2xl fade-in-up border border-border/50">
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl mb-2 font-bold">{t.form.title}</h2>
          <p className="text-muted-foreground font-medium">{t.form.subtitle}</p>
        </div>

        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className={`flex-1 h-2 rounded-full mx-1 transition-all ${step <= currentStep ? 'bg-primary' : 'bg-muted'}`} />
            ))}
          </div>
          <p className="text-sm text-muted-foreground text-center font-bold">
            {/* @ts-ignore */}
            {t.form.stepInfo ? t.form.stepInfo.replace('{current}', currentStep.toString()).replace('{total}', totalSteps.toString()) : `Step ${currentStep} of ${totalSteps}`}
          </p>
        </div>

        {/* Step 1 */}
        {currentStep === 1 && (
          <div className="space-y-6 fade-in-up">
            <h3 className="text-2xl mb-6 font-bold">{t.form.step1Title}</h3>
            <div>
              <Label htmlFor="name" className="text-sm font-bold mb-2 block">{t.form.nameLabel}</Label>
              <Input id="name" value={formData.name} onChange={(e) => updateFormData('name', e.target.value)} placeholder={t.form.namePlaceholder} className="mt-2 h-12 text-lg font-medium" />
              {errors.name && <p className="text-sm text-destructive mt-2 font-bold italic">{errors.name}</p>}
            </div>
            <div className="space-y-2">
              {/* @ts-ignore */}
              <Label className="text-sm font-bold mb-2 block">{t.form.genderLabel}</Label>
              <div className="grid grid-cols-2 gap-4">
                <Button type="button" variant={formData.gender === 'male' ? 'default' : 'outline'} onClick={() => updateFormData('gender', 'male')} className="h-12 text-lg rounded-xl font-bold">{t.form.genderMale}</Button>
                <Button type="button" variant={formData.gender === 'female' ? 'default' : 'outline'} onClick={() => updateFormData('gender', 'female')} className="h-12 text-lg rounded-xl font-bold">{t.form.genderFemale}</Button>
              </div>
              {/* @ts-ignore */}
              {errors.gender && <p className="text-sm text-destructive mt-2 font-bold italic">{t.form.required}</p>}
            </div>
            <div>
              <Label htmlFor="age" className="text-sm font-bold mb-2 block">{t.form.ageLabel}</Label>
              <Select value={formData.age.toString()} onValueChange={(value) => updateFormData('age', parseInt(value))}>
                <SelectTrigger className="mt-2 h-12 text-lg font-medium"><SelectValue placeholder={t.form.agePlaceholder} /></SelectTrigger>
                <SelectContent>{Array.from({ length: 50 }, (_, i) => i + 25).map((age) => (<SelectItem key={age} value={age.toString()} className="text-lg font-medium">{age}</SelectItem>))}</SelectContent>
              </Select>
            </div>
          </div>
        )}

        {/* Step 2: 职业背景 + 寻找关系 */}
        {currentStep === 2 && (
          <div className="space-y-6 fade-in-up">
            <h3 className="text-2xl mb-6 font-bold">{t.form.step2Title}</h3>
            
            {/* 职业选择 */}
            <div>
              <Label htmlFor="occupation" className="text-sm font-bold mb-2 block">{t.form.occupationLabel}</Label>
              <Select value={formData.occupation} onValueChange={(value) => updateFormData('occupation', value)}>
                <SelectTrigger className="mt-2 h-12 text-lg font-medium"><SelectValue placeholder={t.form.occupationPlaceholder} /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="student" className="text-lg font-medium">{t.occupations.student}</SelectItem>
                  <SelectItem value="unemployed" className="text-lg font-medium">{t.occupations.unemployed}</SelectItem>
                  <SelectItem value="entrepreneur" className="text-lg font-medium">{t.occupations.entrepreneur}</SelectItem>
                  <SelectItem value="executive" className="text-lg font-medium">{t.occupations.executive}</SelectItem>
                  <SelectItem value="doctor" className="text-lg font-medium">{t.occupations.doctor}</SelectItem>
                  <SelectItem value="lawyer" className="text-lg font-medium">{t.occupations.lawyer}</SelectItem>
                  <SelectItem value="engineer" className="text-lg font-medium">{t.occupations.engineer}</SelectItem>
                  <SelectItem value="architect" className="text-lg font-medium">{t.occupations.architect}</SelectItem>
                  <SelectItem value="consultant" className="text-lg font-medium">{t.occupations.consultant}</SelectItem>
                  <SelectItem value="finance" className="text-lg font-medium">{t.occupations.finance}</SelectItem>
                  <SelectItem value="creative" className="text-lg font-medium">{t.occupations.creative}</SelectItem>
                  <SelectItem value="academic" className="text-lg font-medium">{t.occupations.academic}</SelectItem>
                  <SelectItem value="other" className="text-lg font-medium">{t.occupations.other}</SelectItem>
                </SelectContent>
              </Select>
              {/* @ts-ignore */}
              {errors.occupation && <p className="text-sm text-destructive mt-2 font-bold italic">{t.form.required}</p>}
            </div>

            {/* 【新增】寻找关系类型 (替代收入字段) */}
            <div>
              {/* @ts-ignore */}
              <Label htmlFor="relationshipGoal" className="text-sm font-bold mb-2 block">{t.form.relationshipLabel}</Label>
              <Select value={formData.relationshipGoal} onValueChange={(value) => updateFormData('relationshipGoal', value)}>
                {/* @ts-ignore */}
                <SelectTrigger className="mt-2 h-12 text-lg font-medium"><SelectValue placeholder={t.form.relationshipPlaceholder} /></SelectTrigger>
                <SelectContent>
                  {/* @ts-ignore */}
                  {Object.entries(t.relationshipTypes || {}).map(([key, label]) => (
                    <SelectItem key={key} value={key} className="text-lg font-medium">
                      {label as string}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {/* @ts-ignore */}
              {errors.relationshipGoal && <p className="text-sm text-destructive mt-2 font-bold italic">{t.form.required}</p>}
            </div>
          </div>
        )}

        {/* Step 3 */}
        {currentStep === 3 && (
          <div className="space-y-6 fade-in-up">
            <h3 className="text-2xl mb-6 font-bold">{t.form.step3Title}</h3>
            <Textarea id="interests" value={formData.interests} onChange={(e) => updateFormData('interests', e.target.value)} placeholder={t.form.interestsPlaceholder} className="mt-2 min-h-[150px] text-lg font-medium leading-relaxed" />
            {errors.interests && <p className="text-sm text-destructive mt-2 font-bold italic">{errors.interests}</p>}
          </div>
        )}

        {/* Step 4 */}
        {currentStep === 4 && (
          <div className="space-y-6 fade-in-up">
            <h3 className="text-2xl mb-6 font-bold">{t.form.step4Title}</h3>
            <div className="flex gap-2">
              <Select value={formData.countryCode} onValueChange={(value) => updateFormData('countryCode', value)}>
                <SelectTrigger className="w-32 h-12 text-lg font-bold border-primary/20"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {countryCodes.map((cc) => <SelectItem key={cc.code} value={cc.code} className="text-lg font-medium">{cc.code}</SelectItem>)}
                </SelectContent>
              </Select>
              <Input value={formData.whatsappNumber} onChange={(e) => updateFormData('whatsappNumber', e.target.value.replace(/\D/g, ''))} placeholder={t.form.whatsappPlaceholder} className="flex-1 h-12 text-lg font-bold" />
            </div>
            {errors.whatsappNumber && <p className="text-sm text-destructive mt-2 font-bold">{errors.whatsappNumber}</p>}
          </div>
        )}

        <div className="flex gap-4 mt-10">
          {currentStep > 1 && <Button variant="outline" onClick={handleBack} className="flex-1 h-12 rounded-xl font-bold text-lg">{t.form.backButton}</Button>}
          {currentStep < totalSteps ? (
            <Button onClick={handleNext} className="flex-1 breathing-glow h-12 rounded-xl text-lg font-bold">{t.form.nextButton}</Button>
          ) : (
            <Button onClick={handleSubmit} className="flex-1 breathing-glow h-12 rounded-xl text-lg font-bold">{t.form.submitButton}</Button>
          )}
        </div>

        <div className="mt-12 pt-8 border-t border-border grid grid-cols-3 gap-2 opacity-80 font-bold">
          <div className="flex flex-col items-center text-center"><Lock className="w-5 h-5 mb-2 text-primary" /><span className="text-[10px] uppercase tracking-tighter">{t.trustBadges.bankLevel}</span></div>
          <div className="flex flex-col items-center text-center"><CheckCircle className="w-5 h-5 mb-2 text-primary" /><span className="text-[10px] uppercase tracking-tighter">{t.trustBadges.verified}</span></div>
          <div className="flex flex-col items-center text-center"><ShieldCheck className="w-5 h-5 mb-2 text-primary" /><span className="text-[10px] uppercase tracking-tighter">{t.trustBadges.secure}</span></div>
        </div>
      </div>
    </div>
  );
}
