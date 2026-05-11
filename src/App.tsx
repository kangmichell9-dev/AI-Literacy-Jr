/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AnimatePresence, motion } from "motion/react";
import { type ReactNode, useState } from "react";
import { NeonButton } from "./components/BrutalUI";
import { QUESTIONS } from "./constants/questions";
import { generateAIProfile } from "./services/geminiService";
import { Brain, Cpu, ShieldCheck, Sparkles, Zap, Telescope, Rocket, Crown, Globe, Trophy, Compass, Terminal, HardDrive } from "lucide-react";

type AppState = "HOME" | "TEST" | "LOADING" | "RESULT";

interface UserScores {
  interest: number;
  usage: number;
  literacy: number;
  ethics: number;
}

function CharacterEmblem({ category, emoji }: { category: string; emoji: string }) {
  const getIcon = () => {
    switch (category) {
      case "EXPLORER": return <Telescope size={48} className="text-ai-cyan" />;
      case "NINJA": return <Terminal size={48} className="text-ai-blue" />;
      case "SAGE": return <Brain size={48} className="text-ai-purple" />;
      case "GUARDIAN": return <ShieldCheck size={48} className="text-emerald-400" />;
      case "MASTER": return <Crown size={48} className="text-yellow-400" />;
      case "PIONEER": return <Rocket size={48} className="text-ai-cyan" />;
      default: return <Sparkles size={48} className="text-ai-cyan" />;
    }
  };

  const getGradient = () => {
    switch (category) {
       case "EXPLORER": return "from-ai-cyan/30 via-ai-blue/10 to-transparent";
       case "NINJA": return "from-white/20 via-ai-blue/10 to-transparent";
       case "SAGE": return "from-ai-purple/30 via-ai-blue/10 to-transparent";
       case "GUARDIAN": return "from-emerald-400/30 via-ai-blue/10 to-transparent";
       case "MASTER": return "from-yellow-400/30 via-ai-blue/10 to-transparent";
       case "PIONEER": return "from-ai-cyan/30 via-ai-purple/10 to-transparent";
       default: return "from-ai-cyan/30 to-ai-purple/30";
    }
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
       {/* Background animated rings */}
       <motion.div 
         animate={{ rotate: 360 }}
         transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
         className="absolute w-[150%] h-[150%] border border-white/5 rounded-full"
       />
       <motion.div 
         animate={{ rotate: -360 }}
         transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
         className="absolute w-[120%] h-[120%] border border-white/5 rounded-full"
       />
       
       <div className={`absolute inset-0 bg-gradient-to-br ${getGradient()} opacity-40`} />
       
       {/* Floating Elements */}
       {[...Array(3)].map((_, i) => (
         <motion.div
           key={i}
           animate={{ 
             y: [0, -20, 0],
             opacity: [0.1, 0.3, 0.1]
           }}
           transition={{ 
             duration: 3 + i, 
             repeat: Infinity,
             delay: i * 0.5
           }}
           className="absolute text-white/10"
           style={{ 
             left: `${20 + i * 30}%`, 
             top: `${10 + i * 20}%`,
             fontSize: '2rem'
           }}
         >
           <Cpu size={24} />
         </motion.div>
       ))}

       {/* Main Character Display */}
       <motion.div 
         initial={{ scale: 0.8, opacity: 0 }}
         animate={{ scale: 1, opacity: 1 }}
         className="relative z-10 flex flex-col items-center justify-center group"
       >
          <div className="relative">
             {/* Halo Effect */}
             <div className="absolute inset-0 bg-white/20 blur-3xl rounded-full scale-150 opacity-20 group-hover:opacity-40 transition-opacity" />
             
             <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-[2.5rem] bg-ai-navy/80 border border-white/20 flex items-center justify-center overflow-hidden shadow-2xl backdrop-blur-xl tech-border group-hover:border-ai-cyan/50 transition-colors">
                <div className="absolute inset-0 opacity-10">
                   <div className="w-full h-full grid-pattern" />
                </div>
                <div className="flex flex-col items-center gap-2">
                   <motion.div
                     animate={{ y: [0, -5, 0] }}
                     transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                   >
                     {getIcon()}
                   </motion.div>
                   <span className="text-4xl md:text-5xl filter drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">{emoji}</span>
                </div>
             </div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 flex flex-col items-center"
          >
             <div className="h-0.5 w-12 bg-gradient-to-r from-transparent via-ai-cyan to-transparent mb-2" />
             <span className="text-[10px] font-bold text-ai-cyan tracking-[0.3em] uppercase">{category}</span>
          </motion.div>
       </motion.div>
    </div>
  );
}

export default function App() {
  const [state, setState] = useState<AppState>("HOME");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(QUESTIONS.length).fill(null));
  const [result, setResult] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const startTest = () => {
    setState("TEST");
    setCurrentIndex(0);
    setAnswers(new Array(QUESTIONS.length).fill(null));
    setIsProcessing(false);
  };

  const handleAnswer = (val: number) => {
    if (isProcessing) return;

    const newAnswers = [...answers];
    newAnswers[currentIndex] = val;
    setAnswers(newAnswers);

    if (currentIndex < QUESTIONS.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setIsProcessing(true);
      processResult(newAnswers);
    }
  };

  const skipQuestion = () => {
    if (isProcessing) return;

    if (currentIndex < QUESTIONS.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setIsProcessing(true);
      processResult(answers);
    }
  };

  const prevQuestion = () => {
    if (isProcessing) return;
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const processResult = async (finalAnswers: (number | null)[]) => {
    setState("LOADING");
    
    const categoryScores: UserScores = {
      interest: 0,
      usage: 0,
      literacy: 0,
      ethics: 0,
    };

    finalAnswers.forEach((ans, idx) => {
      // Use the specific question type for each answer index
      if (ans !== null && QUESTIONS[idx]) {
        const type = QUESTIONS[idx].options[0].type;
        categoryScores[type as keyof UserScores] += ans;
      }
    });

    try {
      const aiProfile = await generateAIProfile(categoryScores);
      setResult({ ...aiProfile, scores: categoryScores });
      setState("RESULT");
    } catch (err) {
      console.error("Result generation failed:", err);
      // Fallback or retry?
      setState("RESULT"); // Show partial result or error state
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-ai-navy text-white font-sans selection:bg-ai-cyan/30 overflow-x-hidden">
      {/* Background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-ai-blue/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-ai-purple/10 rounded-full blur-[120px]" />
      </div>

      <AnimatePresence mode="wait">
        {state !== "HOME" && (
          <motion.button
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => setState("HOME")}
            className="fixed top-6 left-6 z-50 bg-white/10 backdrop-blur-md border border-white/20 p-2 px-4 rounded-full hover:bg-white/20 transition-all flex items-center gap-2 text-sm font-medium no-print"
          >
            <Zap size={16} className="text-ai-cyan" /> Home
          </motion.button>
        )}

        {state === "HOME" && (
          <motion.main
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-12 text-center max-w-4xl mx-auto scale-[0.9] origin-top"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block px-4 py-1.5 rounded-full border border-ai-cyan/30 bg-ai-cyan/10 text-ai-cyan text-xs font-bold mb-6 tracking-wider uppercase backdrop-blur-sm"
            >
              Junior high SCHOOL ASSESSMENT 2026
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-display font-black mb-8 tracking-tighter leading-[1.05]"
            >
              <span className="text-xl md:text-2xl font-sans font-bold block mb-2 text-gray-500">중학생을 위한</span>
              AI 리터러시<br/>
              <span className="text-gradient">역량 진단 도구</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-gray-400 max-w-lg mb-10 leading-relaxed"
            >
              인공지능 시대를 살아가는 당신의 준비도는 어느 정도일까요?<br/>
              <span className="text-white/80">20가지 문항으로 나의 AI 리터러시 지수를 진단해보세요!</span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 w-full max-w-3xl"
            >
              <div className="glass-card glass-card-hover tech-border p-4 flex flex-col items-center gap-2 text-center group">
                 <Sparkles size={24} className="text-ai-cyan group-hover:scale-110 transition-transform" />
                 <span className="text-sm font-bold text-gray-300">관심도</span>
              </div>
              <div className="glass-card glass-card-hover tech-border p-4 flex flex-col items-center gap-2 text-center group">
                 <Zap size={24} className="text-ai-blue group-hover:scale-110 transition-transform" />
                 <span className="text-sm font-bold text-gray-300">활용도</span>
              </div>
              <div className="glass-card glass-card-hover tech-border p-4 flex flex-col items-center gap-2 text-center group">
                 <Brain size={24} className="text-ai-purple group-hover:scale-110 transition-transform" />
                 <span className="text-sm font-bold text-gray-300">이해도(리터러시)</span>
              </div>
              <div className="glass-card glass-card-hover tech-border p-4 flex flex-col items-center gap-2 text-center group">
                 <ShieldCheck size={24} className="text-ai-green group-hover:scale-110 transition-transform" />
                 <span className="text-sm font-bold text-gray-300">윤리성</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              <NeonButton onClick={startTest} className="group !py-5 !px-12 shadow-[0_0_40px_rgba(59,130,246,0.3)] !text-xl">
                진단 시작하기 <motion.span animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>→</motion.span>
              </NeonButton>
              <p className="mt-8 text-gray-600 text-xs flex items-center justify-center gap-2">
                <Sparkles size={12} /> 카드를 클릭하여 문항을 진행해 보세요.
              </p>
            </motion.div>
          </motion.main>
        )}

        {state === "TEST" && (
          <motion.div
            key="test"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-12 max-w-3xl mx-auto scale-[0.9] origin-top"
          >
            {/* Steps indicator */}
            <div className="w-full mb-8">
              <div className="flex justify-between items-center mb-3">
                <span className="text-ai-cyan text-sm font-bold uppercase tracking-[0.3em] opacity-60">Step {(currentIndex + 1).toString().padStart(2, '0')}</span>
                <span className="text-gray-700 text-3xl font-display opacity-20 italic">{(currentIndex + 1).toString().padStart(2, '0')}</span>
              </div>
              <h2 className="text-xl font-bold mb-3 flex items-center gap-2 opacity-80">
                <Cpu size={18} className="text-ai-purple" /> Questionnaire
              </h2>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentIndex + 1) / QUESTIONS.length) * 100}%` }}
                  className="h-full bg-gradient-to-r from-ai-cyan via-ai-blue to-ai-purple"
                />
              </div>
            </div>

            {/* Question Card */}
            <div className="w-full glass-card p-5 md:p-6 mb-6 overflow-hidden tech-border shadow-xl">
               <div className="bg-white/5 rounded-lg p-8 md:p-12 text-center min-h-[220px] flex flex-col justify-center backdrop-blur-sm border border-white/5">
                  <h3 className="text-xl md:text-3xl font-bold leading-snug mb-0 tracking-tight">
                    {QUESTIONS[currentIndex].text}
                  </h3>
               </div>

               <div className="grid gap-3 mt-6">
                {QUESTIONS[currentIndex].options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(option.value)}
                    className="group relative flex items-center p-5 rounded-xl bg-white/5 border border-white/5 hover:bg-ai-cyan/10 hover:border-ai-cyan/40 transition-all text-left overflow-hidden"
                  >
                    <div className="w-6 h-6 rounded-full border-2 border-white/20 flex items-center justify-center mr-5 group-hover:border-ai-cyan group-active:scale-95 transition-all">
                       <div className="w-2.5 h-2.5 rounded-full bg-ai-cyan opacity-0 group-hover:opacity-100 transition-opacity shadow-[0_0_8px_#22d3ee]" />
                    </div>
                    <span className="text-base md:text-lg font-medium text-gray-400 group-hover:text-white transition-colors">{option.label}</span>
                  </button>
                ))}
               </div>
            </div>

            {/* Footer controls */}
            <div className="w-full flex justify-between items-center">
               <button 
                 onClick={prevQuestion}
                 disabled={currentIndex === 0}
                 className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors disabled:opacity-0"
               >
                 <Zap size={16} /> PREV
               </button>
               <button 
                 onClick={skipQuestion}
                 className="flex items-center gap-2 group text-white/80 hover:text-white bg-white/10 px-6 py-2 rounded-full backdrop-blur-md transition-all font-bold"
               >
                 NEXT <Zap size={16} className="rotate-180 group-hover:translate-x-1 transition-transform" />
               </button>
            </div>
          </motion.div>
        )}

        {state === "LOADING" && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center min-h-screen text-center p-6"
          >
             <div className="relative">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                  className="w-40 h-40 rounded-full border-4 border-ai-cyan/20 border-t-ai-cyan shadow-[0_0_50px_rgba(34,211,238,0.2)]"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                  className="absolute inset-4 rounded-full border-4 border-ai-purple/20 border-t-ai-purple shadow-[0_0_50px_rgba(139,92,246,0.2)]"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Cpu size={40} className="text-white animate-pulse" />
                </div>
             </div>
             <h2 className="text-4xl font-display uppercase mt-12 mb-4 text-gradient">AI 기어 가열 중...</h2>
             <p className="text-xl text-gray-400">제미나이가 너의 히어로 프로필을 생성하고 있어!</p>
          </motion.div>
        )}

        {state === "RESULT" && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-12 max-w-5xl mx-auto scale-[0.9] origin-top"
          >
            {/* Header */}
            <div className="w-full mb-6 flex flex-col md:flex-row justify-between items-end gap-5">
               <div>
                  <div className="inline-block px-3 py-1 rounded-md bg-ai-purple/60 backdrop-blur-md text-white text-xs font-bold uppercase mb-2 tracking-widest">
                    AI IDENTITY PROFILE
                  </div>
                  <h1 className="text-3xl md:text-5xl font-display font-black leading-tight tracking-tighter text-gradient">
                    {result.title}
                  </h1>
               </div>
               <div className="text-right glass-card px-4 py-1.5 border-ai-purple/20 bg-ai-purple/10">
                  <span className="text-ai-purple text-xs font-bold block mb-0.5 tracking-wider uppercase opacity-60">Status</span>
                  <span className="text-2xl font-display opacity-80">COMPLETE</span>
               </div>
            </div>

            {/* Main Result Body */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 w-full mb-6">
               {/* Left: Character Card and Description */}
               <div className="lg:col-span-8 glass-card p-1 items-stretch overflow-hidden flex flex-col md:flex-row shadow-xl tech-border">
                  <div className="w-full md:w-[40%] bg-ai-navy/40 relative">
                     <CharacterEmblem 
                        category={result.characterCategory || "EXPLORER"} 
                        emoji={result.emoji} 
                     />
                  </div>
                  <div className="flex-1 p-6 md:p-10 flex flex-col justify-center bg-gradient-to-r from-ai-navy/30 to-transparent">
                     <div className="mb-4">
                        <h4 className="text-ai-cyan text-[10px] font-bold uppercase tracking-widest mb-4 flex items-center gap-2 opacity-70">
                           <Sparkles size={12} /> CHARACTER SYNOPSIS
                        </h4>
                        <p className="text-base md:text-xl font-medium leading-relaxed text-gray-100 break-keep">
                          {result.description}
                        </p>
                     </div>
                  </div>
               </div>

               {/* Right: Category Scores */}
               <div className="lg:col-span-4 flex flex-col gap-2.5">
                  <ResultScore label="관심도" score={result.scores.interest} max={24} color="cyan" icon={<Sparkles size={14}/>} />
                  <ResultScore label="활용능력" score={result.scores.usage} max={16} color="blue" icon={<Zap size={14}/>} />
                  <ResultScore label="이해도" score={result.scores.literacy} max={20} color="purple" icon={<Brain size={14}/>} />
                  <ResultScore label="윤리성" score={result.scores.ethics} max={20} color="green" icon={<ShieldCheck size={14}/>} />
               </div>
            </div>

            {/* Bottom: Strategy & Mission */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full mb-6">
               <div className="glass-card p-5 md:p-6 bg-ai-blue/5 border-ai-blue/20 relative group hover:bg-ai-blue/10 transition-colors">
                  <div className="absolute top-4 right-4 opacity-5 group-hover:opacity-100 transition-all duration-700 rotate-12 group-hover:rotate-0"><Cpu size={60} /></div>
                  <h4 className="text-ai-blue text-sm font-bold mb-3 flex items-center gap-2 font-display">
                    <Sparkles size={18} /> STRENGTH & POTENTIAL
                  </h4>
                  <p className="text-base md:text-lg font-medium leading-snug break-keep text-gray-100 opacity-90">
                    {result.strength}
                  </p>
               </div>
               <div className="glass-card p-5 md:p-6 bg-ai-purple/5 border-ai-purple/20 relative group hover:bg-ai-purple/10 transition-colors">
                  <div className="absolute top-4 right-4 opacity-5 group-hover:opacity-100 transition-all duration-700 -rotate-12 group-hover:rotate-0"><Zap size={60} /></div>
                  <h4 className="text-ai-purple text-sm font-bold mb-3 flex items-center gap-2 font-display">
                    <Zap size={18} /> GROWTH MISSION
                  </h4>
                  <p className="text-base md:text-lg font-medium leading-snug italic break-keep text-ai-cyan/80">
                    {result.mission}
                  </p>
               </div>
            </div>

            {/* Action Buttons */}
            <div className="w-full flex flex-col md:flex-row justify-between items-center gap-5 glass-card p-5 border-white/5 no-print shadow-lg">
               <div className="flex flex-col gap-0.5">
                  <span className="text-gray-700 text-[8px] font-bold uppercase tracking-[0.4em]">Protocol v3.0 // JUNIOR_HIGH</span>
                  <div className="text-lg font-display opacity-50">AI NAVIGATOR SYSTEM</div>
               </div>
               <div className="flex flex-wrap gap-2.5 justify-center">
                  <button 
                    onClick={() => window.print()}
                    className="px-5 py-2 rounded-full border border-white/10 hover:bg-white/10 transition-all font-bold text-xs flex items-center gap-2"
                  >
                    PDF 저장 💾
                  </button>
                  <NeonButton onClick={startTest} className="!text-sm !py-2 !px-7">
                    다시 도전 🔄
                  </NeonButton>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ResultScore({ label, score, max, color, icon }: { label: string; score: number; max: number; color: string; icon: ReactNode }) {
  const percentage = Math.round((score / max) * 100);
  const colorMap: Record<string, string> = {
    cyan: 'bg-ai-cyan shadow-[0_0_15px_rgba(34,211,238,0.5)]',
    blue: 'bg-ai-blue shadow-[0_0_15px_rgba(59,130,246,0.5)]',
    purple: 'bg-ai-purple shadow-[0_0_15px_rgba(139,92,246,0.5)]',
    green: 'bg-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.5)]',
  };

  return (
    <div className="glass-card p-5 w-full">
      <div className="flex justify-between items-center mb-3">
         <div className="flex items-center gap-2">
            <span className={`text-${color}-400`}>{icon}</span>
            <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">{label}</span>
         </div>
         <span className="text-2xl font-display text-white">{percentage}%</span>
      </div>
      <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          className={`h-full ${colorMap[color]}`} 
        />
      </div>
    </div>
  );
}
