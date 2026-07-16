"use client";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

export default function SvgPipeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const smoothProgress = useSpring(scrollYProgress, { damping: 20, stiffness: 100 });
  const pathLength = useTransform(smoothProgress, [0, 1], [0, 1]);

  const nodes = [
    { title: "Dataset Generation", desc: "Synthesizing high-quality data." },
    { title: "Data Cleaning", desc: "Deduplication and filtering." },
    { title: "Feature Engineering", desc: "Extracting latent representations." },
    { title: "Model Training", desc: "Distributed multi-GPU training." },
    { title: "Evaluation", desc: "Benchmarking against baselines." },
    { title: "Optimization", desc: "Quantization & Pruning (QLoRA)." },
    { title: "Deployment", desc: "Edge & Cloud inference scaling." },
    { title: "Monitoring", desc: "Drift detection & logging." }
  ];

  return (
    <section ref={containerRef} className="w-full max-w-[1000px] mx-auto px-6 py-32 min-h-screen relative z-10">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-mono text-xs text-secondary mb-24 tracking-widest uppercase flex items-center gap-2"
      >
        <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
        Neural_Pipeline.exe
      </motion.h2>

      <div className="relative flex flex-col items-center pb-24">
        {/* SVG Track background */}
        <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[2px] bg-border/40"></div>
        
        {/* Animated glowing SVG path */}
        <motion.div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] bg-gradient-to-b from-accent via-accent to-success origin-top shadow-[0_0_15px_rgba(79,140,255,0.5)]"
          style={{ height: "100%", scaleY: pathLength }}
        />

        {nodes.map((node, index) => {
          const isLeft = index % 2 === 0;
          return (
            <motion.div 
              key={node.title}
              className="relative flex items-center justify-center py-12 w-full group"
              initial={{ opacity: 0, x: isLeft ? -50 : 50, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 0.7, type: "spring", bounce: 0.3 }}
            >
              {/* Node UI */}
              <div className={`
                z-10 glass-panel px-8 py-5 rounded-xl shadow-2xl transition-all duration-500
                hover:border-accent hover:shadow-[0_0_30px_rgba(79,140,255,0.15)] hover:-translate-y-1
                ${isLeft ? 'ml-auto mr-[calc(50%+4rem)] text-right' : 'mr-auto ml-[calc(50%+4rem)] text-left'}
              `}>
                <div className="text-primary font-medium tracking-tight text-lg mb-1">{node.title}</div>
                <div className="text-sm text-secondary/70">{node.desc}</div>
                <div className="font-mono text-[10px] text-accent mt-3 tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">Module_{index + 1}</div>
              </div>
              
              {/* Central Glowing Dot */}
              <motion.div 
                className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-background border-[3px] border-border z-20 transition-all duration-500"
                whileInView={{ backgroundColor: ["#050505", "#4F8CFF"], borderColor: ["#1C1C1C", "#4F8CFF"], scale: [1, 1.2, 1] }}
                viewport={{ once: true, margin: "-15%" }}
                transition={{ delay: 0.1, duration: 0.5 }}
              />
              <motion.div 
                className="absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-accent/20 blur-md z-10 opacity-0"
                whileInView={{ opacity: [0, 1, 0] }}
                viewport={{ once: true, margin: "-15%" }}
                transition={{ delay: 0.1, duration: 1.5, repeat: 1 }}
              />
              
              {/* Horizontal connection line to node */}
              <motion.div 
                className={`
                  absolute top-1/2 -translate-y-1/2 h-[2px] bg-border/60 group-hover:bg-accent/60 transition-colors w-16
                  ${isLeft ? 'right-1/2 origin-left' : 'left-1/2 origin-right'}
                `}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: "-15%" }}
                transition={{ duration: 0.5, delay: 0.3 }}
              />
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
