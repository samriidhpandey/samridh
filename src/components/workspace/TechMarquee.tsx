"use client";
import { motion } from "framer-motion";

export default function TechMarquee() {
  const technologies = [
    "Python", "PyTorch", "TensorFlow", "Next.js", "React", "TypeScript", 
    "FastAPI", "Docker", "Kubernetes", "LangChain", "HuggingFace", "AWS",
    // Repeat for infinite effect
    "Python", "PyTorch", "TensorFlow", "Next.js", "React", "TypeScript", 
    "FastAPI", "Docker", "Kubernetes", "LangChain", "HuggingFace", "AWS"
  ];

  return (
    <section className="w-full py-12 overflow-hidden border-y border-border/30 bg-surface/30 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background z-10 pointer-events-none"></div>
      
      <div className="flex whitespace-nowrap">
        <motion.div 
          animate={{ x: [0, -1035] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
          className="flex items-center gap-8 md:gap-16 px-4"
        >
          {technologies.map((tech, idx) => (
            <div key={idx} className="flex items-center gap-4 group">
              {/* Neural Network Node style */}
              <div className="w-2 h-2 rounded-full bg-accent group-hover:shadow-[0_0_15px_rgba(79,140,255,0.8)] transition-shadow"></div>
              <span className="font-mono text-xl md:text-2xl font-bold text-secondary/40 group-hover:text-primary transition-colors uppercase tracking-widest">
                {tech}
              </span>
              <div className="w-8 h-[1px] bg-border/50 hidden md:block"></div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
