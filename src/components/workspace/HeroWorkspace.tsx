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
      {/* Animated Background Orb / Core */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <motion.div 
          style={{ x: orbX, y: orbY }}
          className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px] flex items-center justify-center"
        >
          {/* Outer Glow */}
          <div className="absolute inset-0 rounded-full bg-accent/20 blur-[100px] mix-blend-screen dark:mix-blend-lighten animate-pulse duration-3000"></div>
          
          {/* Inner Core */}
          <motion.div 
            animate={{ 
              rotate: 360,
              scale: [1, 1.05, 1],
            }}
            transition={{ 
              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
              scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
            }}
            className="w-48 h-48 md:w-64 md:h-64 rounded-full border border-accent/30 bg-gradient-to-br from-accent/10 to-transparent backdrop-blur-3xl shadow-[inset_0_0_50px_rgba(37,99,235,0.2)] dark:shadow-[inset_0_0_50px_rgba(79,140,255,0.2)] flex items-center justify-center"
          >
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="w-32 h-32 md:w-40 md:h-40 rounded-full border border-success/40 border-dashed"
            ></motion.div>
          </motion.div>
        </motion.div>
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
          Architecting the <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-primary to-success">
            Future of AI
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
