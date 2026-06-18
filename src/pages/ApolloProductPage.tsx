import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, ExternalLink, ShieldCheck, CheckCircle2, User, Box as BoxIcon, Database, Zap, Sparkles, Layers, RefreshCw, ChevronRight, EyeOff, Puzzle, Link2, Target, BrainCircuit, LineChart, Cpu, ArrowRight } from "lucide-react";

interface ApolloProductPageProps {
  onBack: () => void;
}

export function ApolloProductPage({ onBack }: ApolloProductPageProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-cream text-graphite font-sans selection:bg-teal/20 selection:text-teal antialiased overflow-x-hidden">
      <main className="pt-40 pb-0 flex flex-col items-center">
        {/* Product Hero */}
        <div className="px-6 md:px-12 max-w-7xl mx-auto w-full flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center w-full max-w-3xl flex flex-col items-center mb-16"
          >
            <div className="font-space-grotesk text-sm font-semibold tracking-[0.3em] text-teal uppercase mb-4">
              APOLLO
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif-display font-extrabold tracking-tight leading-[1.1] mb-6 text-graphite text-balance">
              Define Competencies. <br/> <span className="text-teal italic">Build Capabilities.</span>
            </h1>
            <p className="text-base md:text-xl text-slate/75 font-sans font-light max-w-2xl mx-auto leading-relaxed text-balance mb-8">
              An AI-native platform that transforms workforce development from static training into measurable competency growth.
            </p>
            <a 
              href="https://apollo-by-orcin.vercel.app" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-[#0e1317] hover:bg-black font-sans font-semibold text-sm tracking-wide text-white px-6 py-3 rounded-full flex items-center gap-2 shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer mx-auto"
            >
              <span>Explore Live Platform</span>
              <ExternalLink size={16} className="text-teal" />
            </a>
          </motion.div>

          {/* Product Device Mockup */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full max-w-md mx-auto overflow-hidden flex justify-center mb-24"
          >
            <div className="flex justify-center items-center w-full relative aspect-[9/16] bg-[#FAF9F5]/30 rounded-[2rem] overflow-hidden group shadow-2xl shadow-graphite/5 border border-graphite/5">
              <img
                src="/pomelli_photoshoot_image_9_16_0618.png"
                alt="Apollo Interface Mockup"
                className="w-full h-full object-cover"
                style={{ objectPosition: 'center 50%' }}
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  if (e.currentTarget.nextElementSibling) {
                     (e.currentTarget.nextElementSibling as HTMLElement).style.display = 'flex';
                  }
                }}
              />
              {/* Fallback CSS Mockup if the image is not uploaded */}
              <div className="hidden w-full h-full max-w-4xl bg-white rounded-[2.5rem] p-4 border-[2px] border-graphite/5 shadow-[0_0_0_12px_white,0_30px_60px_-15px_rgba(0,0,0,0.1),inset_0_2px_4px_rgba(0,0,0,0.05)] mx-auto transform-gpu hover:-translate-y-2 transition-transform duration-500 relative flex-col" style={{ display: 'none' }}>
                <div className="flex-1 w-full bg-[#FAF9F5] rounded-[2rem] overflow-hidden relative border border-graphite/10 flex flex-col items-center justify-center p-12 text-center">
                  <div className="font-space-grotesk font-bold text-5xl tracking-[0.25em] text-graphite mb-6">APOLLO</div>
                  <p className="text-sm text-graphite/50 mb-12 max-w-md">To display your high quality device mockup, please upload your image via the File Explorer into a <strong>public</strong> folder and name it <code className="bg-graphite/5 px-1 py-0.5 rounded text-teal">apollo-mockup.png</code>.</p>
                  <div className="grid grid-cols-2 gap-6 w-full max-w-2xl">
                     <div className="h-48 rounded-2xl bg-white shadow-sm border border-graphite/5 w-full"></div>
                     <div className="h-48 rounded-2xl bg-white shadow-sm border border-graphite/5 w-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Marquee Running Text */}
        <div className="w-full bg-[#0e1317] border-y border-graphite/10 py-4 overflow-hidden flex whitespace-nowrap mb-24">
          <motion.div 
            className="flex items-center gap-8 text-white font-mono text-sm tracking-widest uppercase font-semibold"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 20, ease: "linear", repeat: Infinity }}
          >
            {[...Array(2)].map((_, i) => (
              <React.Fragment key={i}>
                <span>Measuring Growth, Not Just Activity</span>
                <span className="text-teal">✦</span>
                <span>Verified Competencies</span>
                <span className="text-teal">✦</span>
                <span>Granular Skills Acquired</span>
                <span className="text-teal">✦</span>
                <span>Demonstrated Mastery</span>
                <span className="text-teal">✦</span>
                <span>Continuous Capability Growth</span>
                <span className="text-teal">✦</span>
              </React.Fragment>
            ))}
          </motion.div>
        </div>

        <div className="px-6 md:px-12 max-w-7xl mx-auto w-full flex flex-col items-center">
          {/* The Problem Section */}
          <section className="mb-32 w-full">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-serif-display font-extrabold tracking-tight text-graphite mb-4">
                The Illusion of Workforce Readiness
              </h2>
              <p className="text-lg text-slate/75 font-sans font-light max-w-2xl mx-auto">
                Conventional training spending ends in course completions and meaningless certificates, completely disconnected from actual capabilities.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FeatureCard 
                icon={<EyeOff className="text-red-500" size={24} />}
                title="Blind Spots"
                description="Managers cannot see what capabilities the team actually possesses to execute on tasks safely."
              />
              <FeatureCard 
                icon={<Puzzle className="text-amber-500" size={24} />}
                title="Skill Gaps"
                description="No clear map of what skills are critically missing for upcoming projects, leading to failures."
              />
              <FeatureCard 
                icon={<Link2 className="text-graphite" size={24} />}
                title="Disconnected ROI"
                description="Zero correlation between learning hours logged and actual on-the-job performance improvement."
              />
            </div>
          </section>

          {/* The Capability Engine */}
          <section className="mb-32 w-full">
            <div className="bg-[#FAF9F5] border border-graphite/5 rounded-[2.5rem] p-10 md:p-16 flex flex-col items-center shadow-sm">
              <h2 className="text-3xl md:text-5xl font-serif-display font-extrabold tracking-tight text-graphite mb-6 text-center">
                The Capability Engine
              </h2>
              <p className="text-center text-slate/75 mb-16 max-w-3xl leading-relaxed">
                Apollo shifts the burden of orchestration from humans to software. A manager simply defines the desired outcome, and Apollo autonomously designs, deploys, and measures the entire learning experience.
              </p>
              
              <div className="flex flex-col lg:flex-row items-center gap-8 w-full justify-between">
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-graphite/5 flex-1 flex flex-col items-center text-center">
                  <Target size={32} className="text-teal mb-4" />
                  <h4 className="font-bold text-lg mb-2">Manager Defines Competency</h4>
                  <p className="text-sm text-slate/60">Intent-driven input on strategic outcomes.</p>
                </div>
                <ArrowRight className="text-graphite/20 hidden lg:block" size={32} />
                
                <div className="bg-[#0e1317] text-white p-8 rounded-2xl shadow-xl flex-[1.5] flex flex-col items-center text-center transform scale-105 border-2 border-teal/20">
                  <BrainCircuit size={40} className="text-teal mb-6" />
                  <h4 className="font-bold text-xl mb-6">Apollo AI Learning Engine</h4>
                  <div className="flex flex-col gap-3 w-full">
                    <span className="bg-white/10 py-2 rounded-lg text-sm tracking-wide">Derives Skills</span>
                    <span className="bg-white/10 py-2 rounded-lg text-sm tracking-wide">Generates Assessments</span>
                    <span className="bg-white/10 py-2 rounded-lg text-sm tracking-wide">Adapts Scenarios</span>
                  </div>
                </div>
                
                <ArrowRight className="text-graphite/20 hidden lg:block" size={32} />
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-graphite/5 flex-1 flex flex-col items-center text-center">
                  <LineChart size={32} className="text-teal mb-4" />
                  <h4 className="font-bold text-lg mb-2">Measurable Capability Growth</h4>
                  <p className="text-sm text-slate/60">Real-time stats and quantified mastery scoring.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Two Realities */}
          <section className="mb-32 w-full flex flex-col items-center gap-16">
            <div className="text-center w-full max-w-4xl">
              <h2 className="text-3xl md:text-5xl font-serif-display font-extrabold tracking-tight text-graphite mb-12">
                One Platform. Two Connected Realities.
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                <div className="group bg-white p-8 rounded-3xl shadow-sm border border-graphite/5 hover:border-teal/30 hover:shadow-xl transition-all flex flex-col">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-[#FAF9F5] rounded-full flex items-center justify-center group-hover:bg-teal/5 transition-colors">
                      <User size={20} className="text-graphite group-hover:text-teal transition-colors" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold font-sans">Associate Space</h3>
                      <h4 className="text-teal font-medium tracking-wide uppercase text-[10px]">Personalized Journeys</h4>
                    </div>
                  </div>
                  <p className="text-slate/70 leading-relaxed text-sm">
                    Where employees execute interactive modules, practice skills, and track continuous performance progression against dynamic benchmarks.
                  </p>
                </div>
                
                <div className="group bg-white p-8 rounded-3xl shadow-sm border border-graphite/5 hover:border-teal/30 hover:shadow-xl transition-all flex flex-col">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-[#FAF9F5] rounded-full flex items-center justify-center group-hover:bg-teal/5 transition-colors">
                      <Database size={20} className="text-graphite group-hover:text-teal transition-colors" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold font-sans">Manager Space</h3>
                      <h4 className="text-teal font-medium tracking-wide uppercase text-[10px]">Strategic Orchestration</h4>
                    </div>
                  </div>
                  <p className="text-slate/70 leading-relaxed text-sm">
                    Where leaders define critical capabilities, leverage AI for skill generation, predict gaps early, and monitor overall team skill health.
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full max-w-5xl overflow-hidden flex justify-center relative aspect-[4/3] sm:aspect-[16/9] max-h-[70vh] bg-[#FAF9F5]/30 rounded-[2.5rem] shadow-2xl shadow-graphite/5 border border-graphite/5">
              <img
                src="/1781807072778.png"
                alt="Apollo Mockup"
                className="w-full h-full object-cover rounded-[2.5rem] transform-gpu group-hover:scale-[1.02] transition-transform duration-700"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          </section>

          {/* Intelligent Features Carousel/Grid */}
          <section className="mb-32 w-full max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-serif-display font-extrabold tracking-tight text-graphite mb-4">
                The Intelligence Layer
              </h2>
              <p className="text-lg text-slate/75 font-sans font-light max-w-2xl mx-auto">
                Always contextual. Always aware. Ask Apollo weaves the entire platform together.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <CompactFeatureCard 
                icon={<BrainCircuit />} title="AI-Generated Architecture" 
                desc="Instantly breaks down competencies into underlying, measurable technical skills."
              />
              <CompactFeatureCard 
                icon={<RefreshCw />} title="Active Practice" 
                desc="Real-world simulated scenarios replace static multiple-choice quizzes."
              />
              <CompactFeatureCard 
                icon={<Target />} title="Adaptive Difficulty" 
                desc="Content dynamically adjusts based on real-time learner performance."
              />
              <CompactFeatureCard 
                icon={<Cpu />} title="Associate Support" 
                desc="Acts as an operational advisor, explains concepts, and provides study pathways."
              />
              <CompactFeatureCard 
                icon={<LineChart />} title="Manager Foresight" 
                desc="Identifies capability bottlenecks and recommends corrective development actions."
              />
              <CompactFeatureCard 
                icon={<CheckCircle2 />} title="Quantitative Scoring" 
                desc="The era of guessing is over. Managers see exact mastery percentages."
              />
            </div>
          </section>

          {/* Business Impact */}
          <section className="mb-32 w-full">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-serif-display font-extrabold tracking-tight text-graphite">
                The Business Impact
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <ImpactCard 
                icon={<Zap size={32} className="mb-6 text-teal" />}
                title="Accelerate Development."
                desc="Slash manual course creation time. Deploy targeted skill pathways in minutes, not months."
              />
              <ImpactCard 
                icon={<Sparkles size={32} className="mb-6 text-teal" />}
                title="Preempt Gaps."
                desc="Identify and resolve team capability deficits long before they compromise organizational objectives."
              />
              <ImpactCard 
                icon={<ShieldCheck size={32} className="mb-6 text-teal" />}
                title="Build Future-Ready Teams."
                desc="Ensure learning effectiveness translates directly into measurable, on-the-job execution."
              />
            </div>
          </section>

        </div>
      </main>
      
      {/* Footer Banner */}
      <section className="bg-[#0e1317] text-white py-32 text-center px-6 border-t border-graphite/20 flex flex-col items-center">
        <h2 className="text-4xl md:text-6xl font-serif-display font-extrabold tracking-tight mb-8 max-w-4xl text-balance leading-tight">
          The future is not course management. <br/>
          <span className="text-teal">The future is capability development.</span>
        </h2>
        
        <div className="font-space-grotesk text-3xl tracking-[0.4em] font-bold my-12 py-6 px-12 border border-white/10 rounded-full bg-white/5 backdrop-blur-md">
          APOLLO
        </div>
        
        <p className="text-slate/60 text-lg mb-12 max-w-xl font-light">
          A product of <strong className="text-white">ORCIN AI STUDIO</strong>
        </p>

        <a 
          href="https://apollo-by-orcin.vercel.app" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex bg-teal hover:bg-teal-dark text-white px-10 py-5 rounded-full font-heading text-sm tracking-widest hover:scale-105 active:scale-95 hover:shadow-2xl transition-all duration-300 items-center gap-3 shadow-[0_10px_40px_-10px_rgba(75,123,123,0.5)] cursor-pointer"
        >
          EXPERIENCE APOLLO LIVE
          <ExternalLink size={16} />
        </a>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="bg-white p-8 rounded-2xl border border-graphite/5 shadow-sm hover:shadow-xl transition-all duration-300 group">
      <div className="w-14 h-14 bg-[#FAF9F5] rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
        {icon}
      </div>
      <h3 className="text-xl font-bold font-sans text-graphite mb-3">{title}</h3>
      <p className="text-slate/75 font-sans font-light leading-relaxed">{description}</p>
    </div>
  );
}

function CompactFeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-graphite/5 hover:border-teal/30 hover:shadow-lg transition-all flex gap-4 items-start">
      <div className="text-teal mt-1 shrink-0">
        {icon}
      </div>
      <div>
        <h4 className="font-bold text-graphite mb-2">{title}</h4>
        <p className="text-sm text-slate/70 leading-relaxed font-light">{desc}</p>
      </div>
    </div>
  );
}

function ImpactCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="bg-[#0e1317] text-white p-10 rounded-[2rem] border border-white/10 hover:border-teal/50 hover:bg-black transition-all duration-300 flex flex-col h-full shadow-2xl">
      {icon}
      <h3 className="text-2xl font-bold mb-4 font-serif-display tracking-tight text-white">{title}</h3>
      <p className="text-white/70 leading-relaxed font-sans font-light">{desc}</p>
    </div>
  );
}

