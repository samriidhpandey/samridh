"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bookmark, BookmarkCheck, Search, BookOpen, Clock, Lightbulb } from "lucide-react";

export default function ResearchNotebook() {
  const [searchQuery, setSearchQuery] = useState("");
  const [bookmarked, setBookmarked] = useState<Set<string>>(new Set());

  const papers = [
    {
      id: "arxiv:2305.14314",
      title: "QLoRA: Efficient Finetuning of Quantized LLMs",
      date: "May 2023",
      category: "LLM Optimization",
      summary: "Introduces QLoRA, an efficient finetuning approach that reduces memory usage enough to finetune a 65B parameter model on a single 48GB GPU while preserving full 16-bit finetuning task performance.",
      insights: [
        "4-bit NormalFloat yields better empirical results than standard 4-bit Floats.",
        "Double Quantization reduces average memory footprint.",
        "Paged Optimizers prevent memory spikes during gradient checkpointing."
      ],
      ideas: "Could be applied to compress our internal embedding models without retraining from scratch."
    },
    {
      id: "arxiv:2310.06825",
      title: "Mistral 7B",
      date: "Oct 2023",
      category: "Model Architecture",
      summary: "A 7-billion-parameter language model engineered for superior performance and efficiency. Outperforms Llama 2 13B on all evaluated benchmarks.",
      insights: [
        "Grouped-query attention (GQA) for faster inference.",
        "Sliding Window Attention (SWA) to handle longer sequences at smaller cost."
      ],
      ideas: "Deploy as the primary lightweight model for local edge execution."
    }
  ];

  const toggleBookmark = (id: string) => {
    setBookmarked(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const filteredPapers = papers.filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.summary.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="w-full max-w-[1000px] mx-auto px-6 py-24 min-h-screen">
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 border-b border-border/50 pb-8 gap-6">
        <div>
          <h1 className="text-4xl font-medium tracking-tight mb-3">Research Notebook</h1>
          <p className="text-secondary text-sm font-light">Recent papers, summaries, and implementation ideas.</p>
        </div>
        <div className="relative w-full md:w-72 group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary group-focus-within:text-accent transition-colors" />
          <input 
            type="text" 
            placeholder="Search papers..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full glass-panel border border-border rounded-lg py-2.5 pl-10 pr-4 text-sm text-primary placeholder:text-secondary/50 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all font-mono shadow-inner"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-12">
        <AnimatePresence>
          {filteredPapers.map((paper, idx) => (
            <motion.div 
              key={paper.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: idx * 0.1, duration: 0.5, type: "spring", bounce: 0.3 }}
              className="glass-panel border border-border rounded-2xl p-8 shadow-xl hover:shadow-[0_0_40px_rgba(255,255,255,0.03)] hover:border-border/80 transition-all duration-500 relative group"
            >
              <div className="absolute top-0 left-0 w-[2px] h-0 bg-accent group-hover:h-full transition-all duration-500 ease-out rounded-l-2xl"></div>

              {/* Magnetic Bookmark Button */}
              <motion.button 
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => toggleBookmark(paper.id)}
                className="absolute top-8 right-8 text-secondary hover:text-accent transition-colors bg-background/50 p-2 rounded-full border border-border/50 hover:border-accent/30"
              >
                {bookmarked.has(paper.id) ? (
                  <BookmarkCheck className="w-4 h-4 text-accent" />
                ) : (
                  <Bookmark className="w-4 h-4" />
                )}
              </motion.button>
              
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <span className="font-mono text-[10px] text-accent uppercase tracking-widest px-2 py-1 bg-accent/10 border border-accent/20 rounded-md shadow-sm">{paper.id}</span>
                <span className="font-mono text-[10px] text-primary uppercase tracking-widest px-2 py-1 bg-surface border border-border rounded-md">{paper.category}</span>
                <span className="font-mono text-[10px] text-secondary flex items-center gap-1.5 ml-auto md:ml-0 pr-12 md:pr-0">
                  <Clock className="w-3 h-3" /> {paper.date}
                </span>
              </div>
              
              <h2 className="text-2xl font-medium tracking-tight text-primary mb-4 pr-12 leading-snug">{paper.title}</h2>
              
              <p className="text-secondary/90 leading-relaxed mb-8 font-light text-sm md:text-base">
                {paper.summary}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-background/40 border border-border/50 rounded-xl p-6 hover:bg-background/60 transition-colors">
                  <h3 className="font-mono text-[10px] text-secondary uppercase tracking-widest mb-4 flex items-center gap-2">
                    <BookOpen className="w-3 h-3" /> Key Insights
                  </h3>
                  <ul className="space-y-3">
                    {paper.insights.map((insight, i) => (
                      <li key={i} className="text-sm text-primary/80 flex items-start gap-3 leading-relaxed">
                        <span className="text-accent mt-1 text-[10px]">■</span>
                        <span className="font-light">{insight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-accent/[0.02] border border-accent/10 rounded-xl p-6 hover:bg-accent/[0.04] hover:border-accent/20 transition-colors group/ideas">
                  <h3 className="font-mono text-[10px] text-accent uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Lightbulb className="w-3 h-3 text-accent group-hover/ideas:text-primary transition-colors" /> Ideas Generated
                  </h3>
                  <p className="text-sm text-primary/90 leading-relaxed font-light">
                    {paper.ideas}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {filteredPapers.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 text-secondary font-mono text-sm border border-dashed border-border/50 rounded-2xl"
          >
            No papers found matching "{searchQuery}"
          </motion.div>
        )}
      </div>
    </div>
  );
}
