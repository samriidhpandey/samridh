"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Code, ExternalLink } from "lucide-react";
import Link from "next/link";

interface Metric {
  label: string;
  value: string;
}

interface ProjectCardProps {
  title: string;
  description: string;
  slug: string;
  metrics: Metric[];
  githubUrl?: string;
  liveUrl?: string;
  tags: string[];
}

export default function ProjectCard({ title, description, slug, metrics, githubUrl, liveUrl, tags }: ProjectCardProps) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-terminal-card border border-terminal-border rounded-xl p-6 hover:border-gray-500 transition-all group flex flex-col h-full"
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-gray-100 group-hover:text-neon-blue transition-colors">
          <Link href={`/projects/${slug}`} className="flex items-center gap-2">
            {title}
            <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
        </h3>
        <div className="flex gap-2">
          {githubUrl && (
            <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
              <Code className="w-5 h-5" />
            </a>
          )}
          {liveUrl && (
            <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-neon-green">
              <ExternalLink className="w-5 h-5" />
            </a>
          )}
        </div>
      </div>
      
      <p className="text-gray-400 mb-6 flex-grow">{description}</p>
      
      <div className="grid grid-cols-2 gap-3 mb-6">
        {metrics.map((metric, i) => (
          <div key={i} className="bg-[#1f1f22] rounded flex flex-col p-2 border border-terminal-border/50">
            <span className="text-xs text-gray-500 font-mono uppercase tracking-wider">{metric.label}</span>
            <span className="font-mono text-neon-green font-semibold">{metric.value}</span>
          </div>
        ))}
      </div>
      
      <div className="flex flex-wrap gap-2 mt-auto">
        {tags.map(tag => (
          <span key={tag} className="text-xs font-mono bg-terminal-border text-gray-300 px-2 py-1 rounded">
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
