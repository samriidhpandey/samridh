"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useSpring } from "framer-motion";

export default function CapabilityMatrix() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  
  // Custom cursor/tooltip following mouse
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const smoothX = useSpring(0, { damping: 20, stiffness: 200, mass: 0.5 });
  const smoothY = useSpring(0, { damping: 20, stiffness: 200, mass: 0.5 });

  useEffect(() => {
    smoothX.set(mousePosition.x);
    smoothY.set(mousePosition.y);
  }, [mousePosition, smoothX, smoothY]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    // Offset slightly so it doesn't block the cursor
    setMousePosition({ x: e.clientX - rect.left + 20, y: e.clientY - rect.top + 20 });
  };

  const skills = [
    { name: "PyTorch", type: "Core ML", usedIn: "VisionTransformer-Lite, AudioDenoiser" },
    { name: "TensorFlow", type: "Core ML", usedIn: "Legacy Systems, Edge TPU Deployment" },
    { name: "Python", type: "Language", usedIn: "All training scripts, APIs, Data Pipelines" },
    { name: "Docker", type: "DevOps", usedIn: "Containerized Model Serving, CI/CD" },
    { name: "FastAPI", type: "Backend", usedIn: "RAG-DocAssist, High-throughput Inference" },
    { name: "CUDA", type: "Acceleration", usedIn: "Custom Kernels, Inference Optimization" },
    { name: "Transformers", type: "Architecture", usedIn: "LLM fine-tuning, Vision Models" },
    { name: "LangChain", type: "Agentic AI", usedIn: "RAG-DocAssist, Auto-Trader RL" },
  ];

  return (
    <section className="w-full max-w-[1000px] mx-auto px-6 py-24 relative z-10" ref={containerRef} onMouseMove={handleMouseMove} onMouseLeave={() => setHoveredSkill(null)}>
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-mono text-xs text-secondary mb-8 tracking-widest uppercase flex items-center gap-2"
      >
        <span className="w-2 h-2 rounded-full bg-accent"></span>
        Capability_Matrix.dat
      </motion.h2>

      <div className="glass-panel rounded-xl p-2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none"></div>
        
        <div className="hidden sm:grid grid-cols-12 gap-4 px-6 py-4 border-b border-border font-mono text-[10px] text-secondary uppercase tracking-widest relative z-10">
          <div className="col-span-4">Capability</div>
          <div className="col-span-3">Domain</div>
          <div className="col-span-5 text-right">Status</div>
        </div>

        <div className="flex flex-col relative z-10">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, x: -20, filter: "blur(5px)" }}
              whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              onMouseEnter={() => setHoveredSkill(skill.name)}
              className="flex flex-col sm:grid sm:grid-cols-12 gap-2 sm:gap-4 px-6 py-4 border-b border-border/30 hover:bg-white/[0.04] transition-colors duration-300 cursor-none group relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-[2px] h-full bg-accent scale-y-0 group-hover:scale-y-100 transition-transform origin-center duration-300"></div>
              
              <div className="sm:col-span-4 text-primary font-medium tracking-wide flex items-center gap-3">
                <span className="w-1.5 h-1.5 bg-border group-hover:bg-accent group-hover:shadow-[0_0_10px_rgba(79,140,255,0.8)] transition-all duration-300 rounded-full"></span>
                <span className="group-hover:translate-x-2 transition-transform duration-300">{skill.name}</span>
              </div>
              <div className="sm:col-span-3 text-secondary text-xs sm:text-sm flex items-center pl-4 sm:pl-0">{skill.type}</div>
              <div className="sm:col-span-5 text-left sm:text-right flex items-center justify-start sm:justify-end mt-1 sm:mt-0 pl-4 sm:pl-0">
                <div className="flex gap-1.5">
                  {[...Array(5)].map((_, i) => (
                    <motion.div 
                      key={i} 
                      className={`w-4 h-1.5 rounded-sm ${i < 4 ? 'bg-success/80' : 'bg-border group-hover:bg-success/30 transition-colors'}`}
                      whileHover={{ scale: 1.2 }}
                    ></motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Floating Tooltip matching cursor */}
      <AnimatePresence>
        {hoveredSkill && (
          <motion.div
            style={{ x: smoothX, y: smoothY }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="absolute top-0 left-0 w-64 glass-panel border-accent/20 p-4 rounded-xl shadow-[0_0_30px_rgba(0,0,0,0.5)] z-50 pointer-events-none hidden lg:block"
          >
            <div className="font-mono text-[10px] text-accent mb-2 uppercase tracking-widest flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></span>
              Deployed In
            </div>
            <div className="text-sm text-primary leading-relaxed font-medium">
              {skills.find(s => s.name === hoveredSkill)?.usedIn}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
