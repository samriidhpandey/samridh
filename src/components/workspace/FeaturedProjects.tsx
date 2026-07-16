"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

// Manual SVG for Github since it was removed from lucide-react in this environment version
const GithubIcon = ({ size = 24, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export default function FeaturedProjects() {
  const projects = [
    {
      id: "autonomous-ai-agent",
      title: "Autonomous AI Agent",
      description: "A multi-agent system capable of complex reasoning and code generation. Built with LangChain and fine-tuned Llama-3.",
      tags: ["Python", "PyTorch", "LangChain", "Next.js"],
      link: "/projects/autonomous-agent",
      github: "https://github.com/samridh/autonomous-agent",
      metric: "98% Accuracy"
    },
    {
      id: "llm-evaluation",
      title: "LLM Evaluation Framework",
      description: "Scalable evaluation suite for large language models comparing perplexity and reasoning across 10+ open-source models.",
      tags: ["Python", "HuggingFace", "FastAPI"],
      link: "/projects/llm-eval",
      github: "https://github.com/samridh/llm-eval",
      metric: "1M+ Tokens"
    }
  ];

  return (
    <section className="w-full max-w-7xl mx-auto px-6 py-24">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 mb-3"
          >
            <span className="w-2 h-2 rounded-full bg-accent"></span>
            <span className="font-mono text-xs uppercase tracking-widest text-secondary">Showcase</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-medium tracking-tight text-primary"
          >
            Featured Projects
          </motion.h2>
        </div>
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <Link href="/projects" className="text-accent hover:text-primary transition-colors font-mono text-sm inline-flex items-center gap-1 group">
            View All Projects
            <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, idx) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="group relative glass-panel rounded-3xl p-8 flex flex-col justify-between overflow-hidden hover:border-accent/30 transition-colors duration-500 min-h-[400px]"
          >
            {/* Background Glow on Hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-6">
                <div className="px-3 py-1 rounded-full bg-surface border border-border/50 font-mono text-xs text-primary shadow-sm">
                  {project.metric}
                </div>
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full glass-panel hover:bg-surface transition-colors text-secondary hover:text-primary">
                  <GithubIcon size={18} />
                </a>
              </div>
              
              <h3 className="text-2xl font-medium text-primary mb-3 group-hover:text-accent transition-colors">
                {project.title}
              </h3>
              <p className="text-secondary leading-relaxed mb-6">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-8">
                {project.tags.map(tag => (
                  <span key={tag} className="px-2.5 py-1 text-[10px] uppercase tracking-wider font-mono bg-surface border border-border/50 text-secondary rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative z-10 mt-auto pt-6 border-t border-border/50 flex justify-end">
              <Link href={project.link} className="inline-flex items-center gap-2 text-sm font-medium text-primary group/btn">
                Read Case Study
                <span className="w-8 h-8 rounded-full bg-primary text-background flex items-center justify-center group-hover/btn:scale-110 transition-transform">
                  <ArrowUpRight size={16} />
                </span>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
