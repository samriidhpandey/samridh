"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function GithubHeatmap() {
  const [mounted, setMounted] = useState(false);
  
  // 52 weeks * 7 days = 364 days
  const [contributions, setContributions] = useState<number[]>([]);

  useEffect(() => {
    setMounted(true);
    // Generate some random realistic-looking contribution data
    const data = Array.from({ length: 364 }).map(() => {
      const rand = Math.random();
      if (rand > 0.8) return Math.floor(Math.random() * 4) + 1; // 1 to 4 commits
      if (rand > 0.5) return 1;
      return 0; // No commits
    });
    setContributions(data);
  }, []);

  if (!mounted) return <div className="h-32 w-full animate-pulse bg-surface rounded-xl"></div>;

  const getColor = (count: number) => {
    if (count === 0) return "bg-surface border border-border/30";
    if (count === 1) return "bg-success/30 border border-success/20";
    if (count === 2) return "bg-success/50 border border-success/30";
    if (count === 3) return "bg-success/70 border border-success/50";
    return "bg-success border border-success/80 shadow-[0_0_8px_rgba(34,197,94,0.6)]";
  };

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  return (
    <div className="w-full glass-panel rounded-2xl p-6 mt-8 overflow-hidden group">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-medium text-primary">System Activity Logs</h3>
          <p className="text-xs text-secondary/60 font-mono">1,024 contributions in the last year</p>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-secondary/60">
          Less
          <div className="flex gap-1">
            <div className="w-3 h-3 rounded-[2px] bg-surface border border-border/30"></div>
            <div className="w-3 h-3 rounded-[2px] bg-success/30 border border-success/20"></div>
            <div className="w-3 h-3 rounded-[2px] bg-success/60 border border-success/40"></div>
            <div className="w-3 h-3 rounded-[2px] bg-success border border-success/80 shadow-[0_0_5px_rgba(34,197,94,0.5)]"></div>
          </div>
          More
        </div>
      </div>

      <div className="overflow-x-auto pb-2 custom-scrollbar">
        <div className="min-w-[700px]">
          {/* Months header */}
          <div className="flex justify-between text-[10px] text-secondary/50 font-mono mb-2 px-6">
            {months.map(m => <span key={m}>{m}</span>)}
          </div>
          
          {/* Grid */}
          <div className="flex gap-1">
            <div className="flex flex-col justify-between text-[10px] text-secondary/50 font-mono pr-2 h-[105px]">
              <span>Mon</span>
              <span>Wed</span>
              <span>Fri</span>
            </div>
            
            <div className="flex gap-1 flex-1">
              {Array.from({ length: 52 }).map((_, colIndex) => (
                <div key={colIndex} className="flex flex-col gap-1">
                  {Array.from({ length: 7 }).map((_, rowIndex) => {
                    const idx = colIndex * 7 + rowIndex;
                    const count = contributions[idx] || 0;
                    return (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: (colIndex * 0.01) + (rowIndex * 0.01) }}
                        className={`w-3 h-3 rounded-[2px] transition-colors duration-300 hover:scale-125 cursor-crosshair z-10 ${getColor(count)}`}
                        title={`${count} commits on day ${idx}`}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
