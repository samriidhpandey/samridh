"use client";
import { motion } from "framer-motion";

export default function SystemProfile() {
  const data = {
    "OS": "AI_Engineer_OS_v2.4",
    "Kernel": "DeepLearning_Core_9.1",
    "Uptime": "2.5 Years (Professional)",
    "Architecture": "x86_64 / CUDA_Enabled",
    "Primary Stack": ["PyTorch", "TensorFlow", "CUDA", "FastAPI"],
    "Languages": ["Python", "TypeScript", "C++", "Rust"],
    "Research Interests": ["Agentic AI", "Model Compression", "RLHF"],
    "Current Mission": "Scaling intelligence while reducing inference cost."
  };

  return (
    <section className="w-full max-w-[1400px] mx-auto px-6 py-12">
      <div className="bg-surface border border-border rounded-2xl p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-border via-secondary/20 to-border"></div>
        
        <h2 className="font-mono text-xs text-secondary mb-8 tracking-widest uppercase flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-accent"></span>
          System_Profile.json
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-8">
          {Object.entries(data).map(([key, value], idx) => (
            <motion.div 
              key={key}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="flex flex-col gap-2"
            >
              <span className="font-mono text-[10px] text-secondary uppercase tracking-widest border-b border-border/50 pb-2">{key}</span>
              {Array.isArray(value) ? (
                <div className="flex flex-wrap gap-2 pt-1">
                  {value.map(v => (
                    <span key={v} className="text-sm text-primary font-medium">{v}</span>
                  ))}
                </div>
              ) : (
                <span className="text-sm text-primary font-medium pt-1">{value}</span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
