"use client";
import { Cpu, Server, Network, Database } from "lucide-react";
import GithubHeatmap from "./GithubHeatmap";

export default function SystemProfile() {
  const specs = [
    { icon: <Cpu size={18} />, label: "Core Processing", value: "Neural Architectures, Transformers" },
    { icon: <Database size={18} />, label: "Data Pipeline", value: "Vector DBs, RAG Systems" },
    { icon: <Server size={18} />, label: "Deployment", value: "AWS, Docker, Kubernetes" },
    { icon: <Network size={18} />, label: "Optimization", value: "Quantization, TensorRT" },
  ];

  return (
    <section className="w-full max-w-7xl mx-auto px-6 py-24 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-accent/5 blur-[120px] rounded-full pointer-events-none -z-10"></div>
      
      <div className="flex flex-col md:flex-row gap-12 items-center">
        <div className="flex-1 space-y-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-accent"></span>
              <span className="font-mono text-xs uppercase tracking-widest text-secondary">System Profile</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-primary mb-6">
              Engineering <br/> <span className="text-secondary">Intelligent Systems</span>
            </h2>
            <p className="text-secondary leading-relaxed text-lg font-light">
              I specialize in bridging the gap between theoretical machine learning and production-ready systems. 
              My expertise lies in designing scalable architectures for LLMs, optimizing inference pipelines, 
              and building autonomous agents that solve real-world complex problems.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {specs.map((spec, idx) => (
              <div key={idx} className="glass-panel p-4 rounded-xl flex items-start gap-4 hover:bg-white/[0.02] transition-colors">
                <div className="p-2 rounded-lg bg-surface border border-border/50 text-accent">
                  {spec.icon}
                </div>
                <div>
                  <div className="text-xs font-mono text-secondary mb-1">{spec.label}</div>
                  <div className="text-sm font-medium text-primary">{spec.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 relative w-full flex justify-center">
          <div className="w-[300px] h-[400px] rounded-3xl border border-border/50 glass-panel relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent mix-blend-overlay"></div>
            <img 
              src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop" 
              alt="Cyberpunk workspace" 
              className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000 grayscale group-hover:grayscale-0"
            />
            <div className="absolute inset-0 border border-border/50 rounded-3xl pointer-events-none"></div>
            <div className="absolute bottom-6 left-6 right-6 p-4 glass-panel rounded-xl backdrop-blur-md border border-border/50 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
              <div className="font-mono text-xs text-secondary mb-1">LOCATION</div>
              <div className="font-medium text-primary">San Francisco, CA</div>
            </div>
          </div>
        </div>
      </div>
      
      <GithubHeatmap />
    </section>
  );
}
