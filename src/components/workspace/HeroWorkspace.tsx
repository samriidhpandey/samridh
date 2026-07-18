"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Terminal } from "lucide-react";

export default function HeroWorkspace() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const yText = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  
  // Mouse tracking for parallax orb
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 150 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const orbX = useTransform(smoothMouseX, [-500, 500], [-30, 30]);
  const orbY = useTransform(smoothMouseY, [-500, 500], [-30, 30]);

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full min-h-[90vh] flex flex-col items-center justify-center overflow-hidden py-20"
    >
      {/* AI Working Process Background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 opacity-40 dark:opacity-30 overflow-hidden">
        <motion.svg 
          style={{ x: orbX, y: orbY }}
          className="absolute w-[800px] h-[600px] md:w-[1200px] md:h-[800px]" 
          viewBox="0 0 1000 600"
        >
          <defs>
            <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0" />
              <stop offset="50%" stopColor="var(--color-success)" stopOpacity="1" />
              <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Static Connection Lines */}
          <g stroke="currentColor" strokeWidth="1" className="text-secondary/30">
            <path d="M 200,150 Q 350,150 500,100" fill="none" />
            <path d="M 200,150 Q 350,250 500,300" fill="none" />
            <path d="M 200,300 Q 350,300 500,300" fill="none" />
            <path d="M 200,300 Q 350,200 500,100" fill="none" />
            <path d="M 200,450 Q 350,450 500,500" fill="none" />
            <path d="M 200,450 Q 350,350 500,300" fill="none" />
            
            <path d="M 500,100 Q 650,150 800,200" fill="none" />
            <path d="M 500,300 Q 650,250 800,200" fill="none" />
            <path d="M 500,500 Q 650,450 800,400" fill="none" />
            <path d="M 500,300 Q 650,350 800,400" fill="none" />
          </g>

          {/* Animated Flowing Data */}
          <motion.g stroke="url(#lineGrad)" strokeWidth="3" fill="none" filter="url(#glow)">
            <motion.path 
              d="M 200,150 Q 350,150 500,100" 
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: [0, 1, 1], opacity: [0, 1, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "linear", delay: 0 }}
            />
            <motion.path 
              d="M 200,300 Q 350,300 500,300" 
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: [0, 1, 1], opacity: [0, 1, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "linear", delay: 1 }}
            />
            <motion.path 
              d="M 200,450 Q 350,350 500,300" 
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: [0, 1, 1], opacity: [0, 1, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "linear", delay: 0.5 }}
            />
            <motion.path 
              d="M 500,100 Q 650,150 800,200" 
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: [0, 1, 1], opacity: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 2 }}
            />
            <motion.path 
              d="M 500,300 Q 650,350 800,400" 
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: [0, 1, 1], opacity: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 2.5 }}
            />
          </motion.g>

          {/* Network Nodes */}
          <g fill="currentColor" className="text-secondary">
            {/* Input Nodes */}
            <circle cx="200" cy="150" r="4" />
            <circle cx="200" cy="300" r="4" />
            <circle cx="200" cy="450" r="4" />
            
            {/* Hidden Nodes */}
            <circle cx="500" cy="100" r="6" className="text-accent" />
            <circle cx="500" cy="300" r="6" className="text-accent" />
            <circle cx="500" cy="500" r="6" className="text-accent" />
            
            {/* Output Nodes */}
            <circle cx="800" cy="200" r="8" className="text-success" />
            <circle cx="800" cy="400" r="8" className="text-success" />
          </g>

          {/* Output Node Pulsing Effects */}
          <motion.circle cx="800" cy="200" r="14" fill="none" stroke="currentColor" strokeWidth="2" className="text-success" 
            animate={{ scale: [1, 1.5, 1], opacity: [0.8, 0, 0.8] }} transition={{ duration: 2, repeat: Infinity }} />
          <motion.circle cx="800" cy="400" r="14" fill="none" stroke="currentColor" strokeWidth="2" className="text-success" 
            animate={{ scale: [1, 1.5, 1], opacity: [0.8, 0, 0.8] }} transition={{ duration: 2, repeat: Infinity, delay: 1 }} />
        </motion.svg>
      </div>

      {/* Main Content */}
      <motion.div 
        style={{ y: yText, opacity }}
        className="relative z-10 flex flex-col items-center text-center max-w-4xl px-6"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel mb-8 border border-border/50 text-sm font-mono text-secondary"
        >
          <span className="w-2 h-2 rounded-full bg-success animate-pulse"></span>
          System Online • Samridh Pandey
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter text-primary mb-6 leading-[1.1]"
        >
          Engineering Scalable <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-primary to-success">
            AI Solutions
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          className="text-lg md:text-xl text-secondary max-w-2xl mb-10 font-light leading-relaxed"
        >
          I design intelligent agents, scalable machine learning pipelines, and robust neural architectures that turn complex data into actionable systems.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <Link 
            href="/projects"
            className="group relative inline-flex items-center gap-2 px-8 py-4 bg-primary text-background rounded-full font-medium overflow-hidden transition-transform hover:scale-105 active:scale-95"
          >
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
            Explore Projects
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          
          <Link 
            href="/research"
            className="group inline-flex items-center gap-2 px-8 py-4 glass-panel border border-border/50 rounded-full font-medium text-primary transition-all hover:bg-surface/80 hover:border-accent/50 active:scale-95"
          >
            <Terminal size={18} className="text-accent" />
            Read Research
          </Link>
        </motion.div>
      </motion.div>

      {/* Grid overlay for aesthetic */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] z-0 pointer-events-none"></div>
    </section>
  );
}
