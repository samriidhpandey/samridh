"use client";

import { motion } from "framer-motion";

interface ArchitectureLayer {
  name: string;
  items: string[];
  color: "blue" | "green" | "purple" | "yellow";
}

export default function ArchitectureDiagram({ layers }: { layers: ArchitectureLayer[] }) {
  const colorMap = {
    blue: "border-neon-blue/30 bg-neon-blue/5 text-neon-blue",
    green: "border-neon-green/30 bg-neon-green/5 text-neon-green",
    purple: "border-purple-500/30 bg-purple-500/5 text-purple-400",
    yellow: "border-yellow-500/30 bg-yellow-500/5 text-yellow-400",
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-terminal-card border border-terminal-border rounded-xl my-8">
      <h3 className="font-mono text-sm text-gray-400 mb-6 border-b border-terminal-border pb-2">&gt; SYSTEM_ARCHITECTURE</h3>
      
      <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-stretch justify-between">
        {layers.map((layer, idx) => (
          <motion.div 
            key={layer.name} 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.2 }}
            className="flex-1 flex flex-col relative"
          >
            <div className={`border rounded-lg p-4 h-full ${colorMap[layer.color]}`}>
              <div className="font-bold mb-4 text-center">{layer.name}</div>
              <div className="space-y-2">
                {layer.items.map(item => (
                  <div key={item} className="bg-background/80 px-3 py-2 rounded border border-current text-sm text-center font-mono shadow-sm">
                    {item}
                  </div>
                ))}
              </div>
            </div>
            {idx < layers.length - 1 && (
              <div className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-[2px] bg-gray-600">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-2 h-2 rounded-full bg-gray-500"></div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
