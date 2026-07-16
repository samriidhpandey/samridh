"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Activity, GitCommit } from "lucide-react";

export default function DeployedModels() {
  const models = [
    {
      id: "MOD-042",
      name: "VisionTransformer-Lite",
      status: "Active",
      accuracy: "79.2%",
      latency: "12ms",
      slug: "vision-transformer-lite",
      stack: ["PyTorch", "CUDA"],
      activity: [2, 5, 3, 8, 4, 10, 6]
    },
    {
      id: "MOD-091",
      name: "RAG-DocAssist",
      status: "Active",
      accuracy: "92.4%",
      latency: "800ms",
      slug: "rag-doc-assist",
      stack: ["FastAPI", "LangChain"],
      activity: [1, 2, 1, 4, 5, 2, 1]
    },
    {
      id: "MOD-112",
      name: "Auto-Trader RL",
      status: "Training",
      accuracy: "1.8 SR",
      latency: "2ms",
      slug: "auto-trader-rl",
      stack: ["TensorFlow", "Ray"],
      activity: [0, 0, 2, 12, 15, 10, 20]
    }
  ];

  return (
    <div className="w-full max-w-[1200px] mx-auto px-6 py-24 min-h-screen">
      <div className="flex items-end justify-between mb-16 border-b border-border/50 pb-8">
        <div>
          <h1 className="text-4xl font-medium tracking-tight mb-3">Model Registry</h1>
          <p className="text-secondary text-sm">Deployed systems and active research models.</p>
        </div>
        <div className="font-mono text-xs flex items-center gap-2">
          <span className="w-2 h-2 bg-success rounded-full animate-pulse"></span>
          <span className="text-secondary">SYS_ONLINE</span>
        </div>
      </div>

      <div className="flex flex-col glass-panel rounded-xl shadow-2xl overflow-hidden">
        <div className="grid grid-cols-12 gap-4 px-6 py-4 font-mono text-[10px] text-secondary uppercase tracking-widest border-b border-border bg-black/40 backdrop-blur-md">
          <div className="col-span-1 hidden md:block">ID</div>
          <div className="col-span-4 md:col-span-3">Model Name</div>
          <div className="col-span-3 hidden md:block">Tech Stack</div>
          <div className="col-span-2 hidden md:block">Status</div>
          <div className="col-span-1 hidden md:block">Metrics</div>
          <div className="col-span-8 md:col-span-2 text-right">Actions</div>
        </div>

        {models.map((model, idx) => (
          <Link href={`/projects/${model.slug}`} key={model.id}>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.5, ease: "easeOut" }}
              className="grid grid-cols-12 gap-4 px-6 py-6 border-b border-border/30 hover:bg-white/[0.03] transition-colors items-center group relative cursor-pointer"
            >
              {/* Hover Indicator Line */}
              <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-accent scale-y-0 group-hover:scale-y-100 transition-transform origin-center"></div>

              <div className="col-span-1 hidden md:block font-mono text-xs text-secondary group-hover:text-primary transition-colors">{model.id}</div>
              
              <div className="col-span-4 md:col-span-3 font-medium text-primary flex items-center gap-3">
                <Activity className="w-4 h-4 text-accent/70 group-hover:text-accent transition-colors" />
                <span className="group-hover:translate-x-1 transition-transform">{model.name}</span>
              </div>
              
              <div className="col-span-3 hidden md:flex items-center gap-2">
                {model.stack.map(tech => (
                  <span key={tech} className="text-[10px] font-mono px-2 py-0.5 border border-border/50 rounded bg-background/50 text-secondary group-hover:border-accent/30 group-hover:text-primary transition-colors">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="col-span-2 hidden md:flex items-center gap-2">
                <span className={`w-1.5 h-1.5 rounded-full ${model.status === 'Active' ? 'bg-success shadow-[0_0_8px_rgba(34,197,94,0.5)]' : 'bg-warning'}`}></span>
                <span className="text-sm text-secondary group-hover:text-primary transition-colors">{model.status}</span>
              </div>
              
              <div className="col-span-1 hidden md:flex flex-col gap-1">
                <div className="font-mono text-[10px] text-primary">{model.accuracy}</div>
                <div className="font-mono text-[10px] text-secondary">{model.latency}</div>
              </div>
              
              <div className="col-span-8 md:col-span-2 flex justify-end items-center gap-4">
                {/* Tiny Activity Sparkline */}
                <div className="hidden lg:flex items-end h-4 gap-[2px] opacity-30 group-hover:opacity-100 transition-opacity mr-4">
                  {model.activity.map((val, i) => (
                    <motion.div 
                      key={i} 
                      className="w-1 bg-accent/60" 
                      initial={{ height: 2 }}
                      whileHover={{ height: Math.max(val, 2) }}
                      style={{ height: Math.max((val / 20) * 16, 2) }}
                    />
                  ))}
                </div>
                <span className="text-[10px] font-mono text-secondary group-hover:text-accent transition-colors flex items-center gap-1">
                  INSPECT <span className="opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-5px] group-hover:translate-x-0">→</span>
                </span>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
}
