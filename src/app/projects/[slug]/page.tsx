import { ArrowLeft, Code, ExternalLink, Activity, Database, Clock, Cpu, FileText, LayoutList } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import * as motion from "framer-motion/client";

// Mock data fetching function
const getProjectData = (slug: string) => {
  const projects = {
    "vision-transformer-lite": {
      title: "VisionTransformer-Lite",
      id: "MOD-042",
      description: "Optimized ViT architecture designed specifically for deployment on edge devices like Raspberry Pi and mobile NPUs.",
      content: `This project tackles the challenge of deploying heavily parameterized Vision Transformers on hardware with strict memory and compute constraints. By implementing structured pruning and a custom knowledge distillation pipeline from a large teacher model, I reduced the model size by 40% with minimal accuracy drop.`,
      dataset: "Trained on a distilled subset of ImageNet-1K, consisting of 250,000 images balanced across 100 high-priority classes for edge applications.",
      evaluation: "Achieved 79.2% Top-1 accuracy on the test set, with a measured latency of 12ms on an NPU-accelerated edge board.",
      architecture: [
        { name: "Input Tensor", items: ["3x224x224", "Normalization"], type: "Data" },
        { name: "Patch Embedding", items: ["Conv2D Stride 16", "Linear Projection"], type: "Layer" },
        { name: "Transformer Blocks (x8)", items: ["Pruned Self-Attention", "Quantized MLP"], type: "Layer" },
        { name: "Classification Head", items: ["LayerNorm", "Linear Output"], type: "Output" },
      ],
      metrics: [
        { label: "Parameters", value: "15M", icon: <Database className="w-4 h-4 text-secondary"/> },
        { label: "Accuracy", value: "79.2%", icon: <Activity className="w-4 h-4 text-success"/> },
        { label: "Latency (NPU)", value: "12ms", icon: <Clock className="w-4 h-4 text-warning"/> },
        { label: "Power Draw", value: "1.2W", icon: <Cpu className="w-4 h-4 text-error"/> },
      ]
    },
  };

  return projects[slug as keyof typeof projects] || {
    title: slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" "),
    id: "MOD-???",
    description: "Detailed view of the deployed model, including architecture, methodology, and evaluation results.",
    content: "Detailed case study content goes here. Discuss dataset challenges, model selection rationale, training infrastructure, and final deployment strategy.",
    dataset: "Standard baseline dataset used for initial training and validation sweeps.",
    evaluation: "Baseline accuracy metrics met. Ready for production fine-tuning.",
    architecture: [
      { name: "Data Ingestion", items: ["Raw Data", "Preprocessing API"], type: "Data" },
      { name: "Model Inference", items: ["Feature Extractor", "Predictor"], type: "Layer" },
      { name: "Output", items: ["Post-processing", "Client Response"], type: "Output" },
    ],
    metrics: [
      { label: "Parameters", value: "N/A", icon: <Database className="w-4 h-4 text-secondary"/> },
      { label: "Accuracy", value: "N/A", icon: <Activity className="w-4 h-4 text-success"/> },
    ]
  };
};

export default async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectData(slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="w-full max-w-[1200px] mx-auto px-6 py-24 min-h-screen relative">
      <Link href="/projects" className="inline-flex items-center gap-2 text-secondary hover:text-primary font-mono text-[10px] uppercase tracking-widest mb-16 transition-colors group">
        <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" /> cd ../
      </Link>

      <div className="mb-16">
        <div className="flex items-center gap-3 mb-4">
          <span className="px-2 py-1 bg-surface border border-border rounded text-[10px] font-mono text-accent shadow-[0_0_10px_rgba(79,140,255,0.1)]">{project.id}</span>
          <span className="flex items-center gap-2 text-[10px] font-mono text-success">
            <span className="w-2 h-2 rounded-full bg-success shadow-[0_0_8px_rgba(34,197,94,0.6)] animate-pulse"></span> ONLINE
          </span>
        </div>
        <h1 className="text-4xl md:text-6xl font-medium tracking-tight text-primary mb-6">{project.title}</h1>
        <p className="text-lg text-secondary max-w-3xl leading-relaxed font-light">
          {project.description}
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-16">
        
        {/* Main Content Area */}
        <div className="flex-[2.5]">
          {/* Metrics Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20" id="metrics">
            {project.metrics.map((metric, i) => (
              <div key={i} className="glass-panel rounded-xl p-5 flex flex-col justify-between h-28 shadow-xl hover:bg-white/[0.02] transition-colors group">
                <div className="flex justify-between items-start">
                  <span className="font-mono text-[10px] text-secondary uppercase tracking-widest group-hover:text-primary/70 transition-colors">{metric.label}</span>
                  {metric.icon}
                </div>
                <div className="text-2xl font-medium tracking-tighter text-primary">{metric.value}</div>
              </div>
            ))}
          </div>

          <div className="space-y-20">
            <section id="methodology">
              <h2 className="font-mono text-[10px] text-secondary uppercase tracking-widest border-b border-border/50 pb-2 mb-6 flex items-center gap-2">
                <FileText className="w-3 h-3" /> Methodology
              </h2>
              <div className="prose prose-invert prose-p:text-secondary/90 prose-p:leading-relaxed prose-p:font-light max-w-none">
                <p>{project.content}</p>
              </div>
            </section>

            <section id="dataset">
              <h2 className="font-mono text-[10px] text-secondary uppercase tracking-widest border-b border-border/50 pb-2 mb-6 flex items-center gap-2">
                <Database className="w-3 h-3" /> Dataset & Training
              </h2>
              <div className="prose prose-invert prose-p:text-secondary/90 prose-p:leading-relaxed prose-p:font-light max-w-none">
                <p>{project.dataset}</p>
              </div>
            </section>

            <section id="evaluation">
              <h2 className="font-mono text-[10px] text-secondary uppercase tracking-widest border-b border-border/50 pb-2 mb-6 flex items-center gap-2">
                <Activity className="w-3 h-3" /> Evaluation
              </h2>
              <div className="prose prose-invert prose-p:text-secondary/90 prose-p:leading-relaxed prose-p:font-light max-w-none">
                <p>{project.evaluation}</p>
              </div>
            </section>

            {/* Interactive Architecture Diagram */}
            <section id="architecture">
              <h2 className="font-mono text-[10px] text-secondary uppercase tracking-widest border-b border-border/50 pb-2 mb-8 flex items-center gap-2">
                <LayoutList className="w-3 h-3" /> System Architecture
              </h2>
              <div className="glass-panel rounded-2xl p-10 relative overflow-hidden shadow-2xl flex flex-col items-center">
                {/* SVG Connecting Path */}
                <div className="absolute top-10 bottom-10 left-1/2 -translate-x-1/2 w-[2px] bg-border/40"></div>
                
                {project.architecture.map((layer, idx) => (
                  <div key={layer.name} className="relative z-10 my-6 w-full max-w-md group">
                      <div className="bg-background/80 backdrop-blur-sm border border-border p-5 rounded-xl text-center shadow-lg group-hover:border-accent/40 group-hover:shadow-[0_0_20px_rgba(79,140,255,0.1)] transition-all duration-300 group-hover:-translate-y-1">
                        <div className="font-mono text-[10px] text-accent mb-2 uppercase tracking-widest opacity-80 group-hover:opacity-100">{layer.type}</div>
                        <div className="text-primary font-medium tracking-tight mb-4 text-lg">{layer.name}</div>
                        <div className="flex flex-wrap justify-center gap-2">
                          {layer.items.map(item => (
                            <div key={item} className="text-xs text-secondary bg-surface/50 rounded py-1.5 px-3 border border-border/50 font-mono">
                              {item}
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Interactive node dot */}
                      <div className="absolute left-1/2 -translate-x-1/2 -bottom-7 w-2 h-2 rounded-full bg-border group-hover:bg-accent transition-colors duration-300 z-20"></div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>

        {/* Right Rail: Sticky TOC & Actions */}
        <div className="flex-1 relative">
          <div className="sticky top-32 flex flex-col gap-12">
            
            {/* Table of Contents */}
            <div>
              <h2 className="font-mono text-[10px] text-secondary uppercase tracking-widest mb-4">Contents</h2>
              <nav className="flex flex-col gap-3 border-l border-border/50 pl-4">
                <a href="#metrics" className="text-sm text-secondary hover:text-primary transition-colors">Metrics</a>
                <a href="#methodology" className="text-sm text-secondary hover:text-primary transition-colors">Methodology</a>
                <a href="#dataset" className="text-sm text-secondary hover:text-primary transition-colors">Dataset</a>
                <a href="#evaluation" className="text-sm text-secondary hover:text-primary transition-colors">Evaluation</a>
                <a href="#architecture" className="text-sm text-secondary hover:text-primary transition-colors">Architecture</a>
              </nav>
            </div>

            {/* Actions */}
            <div>
              <h2 className="font-mono text-[10px] text-secondary uppercase tracking-widest mb-4">Actions</h2>
              <div className="flex flex-col gap-3">
                <a href="#" className="flex items-center justify-between px-4 py-3 glass-panel rounded hover:bg-white/[0.03] transition-colors group">
                  <span className="font-mono text-xs text-primary group-hover:text-accent transition-colors">View Source</span>
                  <Code className="w-4 h-4 text-secondary group-hover:text-accent transition-colors" />
                </a>
                <a href="#" className="flex items-center justify-between px-4 py-3 bg-primary text-background rounded hover:bg-white/90 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.15)] group">
                  <span className="font-mono text-xs font-medium">Run Inference</span>
                  <ExternalLink className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
      
    </div>
  );
}
