"use client";
import { useState, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Terminal, Send, CheckCircle2 } from "lucide-react";

export default function TimelineAndContact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const smoothProgress = useSpring(scrollYProgress, { damping: 20, stiffness: 100 });
  const pathLength = useTransform(smoothProgress, [0, 1], [0, 1]);

  const commits = [
    { year: "2023", message: "Initial commit: Started Programming", hash: "a1b2c3d" },
    { year: "2024", message: "feat: Transitioned to Deep Learning & CV", hash: "e4f5g6h" },
    { year: "2025", message: "deploy: Production AI Systems", hash: "i7j8k9l" },
    { year: "2026", message: "refactor: LLMs and RAG Architectures", hash: "m0n1o2p" },
    { year: "Future", message: "feat(experimental): Agentic AI", hash: "HEAD" },
  ];

  const [contactInput, setContactInput] = useState("");
  const [messages, setMessages] = useState<{sender: string, text: string}[]>([
    { sender: "system", text: "Connection Established." },
    { sender: "system", text: "Type your message and hit Enter." }
  ]);
  const [isSuccess, setIsSuccess] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSend = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && contactInput.trim()) {
      setMessages(prev => [...prev, { sender: "user", text: contactInput }]);
      setContactInput("");
      
      setTimeout(() => {
        setMessages(prev => [...prev, { sender: "system", text: "Encrypting transmission..." }]);
      }, 500);

      setTimeout(() => {
        setMessages(prev => [...prev, { sender: "system", text: "Message delivered successfully." }]);
        setIsSuccess(true);
      }, 1500);
    }
  };

  return (
    <div className="w-full max-w-[800px] mx-auto px-6 py-24 min-h-screen">
      
      {/* Git Commit Timeline */}
      <div className="mb-40" ref={containerRef}>
        <h1 className="text-4xl font-medium tracking-tight mb-20 border-b border-border/50 pb-8 flex items-center gap-4">
          <GitBranchIcon /> Git Log
        </h1>

        <div className="relative pl-8">
          {/* Animated SVG Path for timeline */}
          <div className="absolute left-[3px] top-4 bottom-4 w-[2px] bg-border/40"></div>
          <motion.div 
            className="absolute left-[3px] top-4 bottom-4 w-[2px] bg-accent origin-top shadow-[0_0_10px_rgba(79,140,255,0.8)]"
            style={{ scaleY: pathLength }}
          />

          {commits.map((commit, idx) => (
            <motion.div 
              key={commit.hash}
              initial={{ opacity: 0, x: -30, filter: "blur(5px)" }}
              whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ delay: 0.1, duration: 0.5, type: "spring", bounce: 0.3 }}
              className="mb-16 relative group"
            >
              {/* Commit node indicator */}
              <motion.div 
                className="absolute -left-[32px] top-1 w-3 h-3 rounded-full bg-background border-2 border-border group-hover:border-accent transition-colors duration-300 z-10"
                whileInView={{ backgroundColor: ["#050505", "#4F8CFF", "#050505"], borderColor: ["#1C1C1C", "#4F8CFF", "#4F8CFF"] }}
                viewport={{ once: true, margin: "-20%" }}
                transition={{ duration: 1, delay: 0.3 }}
              />
              
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-3">
                <span className="font-mono text-xs text-accent group-hover:text-primary transition-colors">{commit.year}</span>
                <span className="font-mono text-[10px] text-secondary bg-surface/50 border border-border px-2 py-1 rounded shadow-inner group-hover:border-accent/40 transition-colors">
                  {commit.hash}
                </span>
              </div>
              
              <div className="glass-panel p-4 rounded-lg inline-block hover:border-accent/30 transition-colors shadow-lg group-hover:-translate-y-1 duration-300">
                <p className="text-primary font-mono text-sm group-hover:text-primary transition-colors">{commit.message}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* SSH Contact Form */}
      <div id="contact">
        <h2 className="font-mono text-xs text-secondary mb-6 tracking-widest uppercase flex items-center gap-2">
          <Terminal className="w-4 h-4" />
          Terminal Interface
        </h2>

        <motion.div 
          className="glass-panel rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden font-mono text-sm relative group/term focus-within:border-accent/50 focus-within:shadow-[0_0_30px_rgba(79,140,255,0.15)] transition-all duration-500"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onClick={() => inputRef.current?.focus()}
        >
          {isSuccess && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} 
              className="absolute inset-0 bg-success/10 z-0 pointer-events-none mix-blend-screen"
            />
          )}

          <div className="bg-[#0B0B0B]/80 border-b border-border/50 px-4 py-3 flex items-center gap-4 relative z-10 backdrop-blur-md">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-error/80 border border-error"></div>
              <div className="w-3 h-3 rounded-full bg-warning/80 border border-warning"></div>
              <div className="w-3 h-3 rounded-full bg-success/80 border border-success"></div>
            </div>
            <span className="text-secondary/70 text-[10px] tracking-widest flex items-center gap-2">
              ssh visitor@portfolio.ai <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse shadow-[0_0_5px_rgba(34,197,94,0.8)]"></span>
            </span>
          </div>
          
          <div className="p-6 h-[320px] flex flex-col justify-end relative z-10 bg-black/40">
            <div className="overflow-y-auto space-y-4 mb-6 flex-grow flex flex-col justify-end scrollbar-hide">
              {messages.map((msg, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`${msg.sender === "system" ? "text-secondary" : "text-primary"} flex items-start gap-2`}
                >
                  <span className={`${msg.sender === "system" ? "text-accent" : "text-success"} mt-[2px]`}>
                    {msg.sender === "system" ? "❯" : "visitor$"}
                  </span>
                  <span className={msg.sender === "system" && msg.text.includes("successfully") ? "text-success" : ""}>
                    {msg.text}
                  </span>
                  {msg.sender === "system" && msg.text.includes("successfully") && (
                    <CheckCircle2 className="w-4 h-4 text-success inline ml-2 mb-1" />
                  )}
                </motion.div>
              ))}
            </div>
            
            {!isSuccess && (
              <div className="flex items-center text-primary border-t border-border/50 pt-5 mt-2">
                <span className="text-success mr-3">visitor$</span>
                <input 
                  ref={inputRef}
                  type="text" 
                  value={contactInput}
                  onChange={(e) => setContactInput(e.target.value)}
                  onKeyDown={handleSend}
                  className="bg-transparent flex-grow outline-none text-primary placeholder:text-secondary/30"
                  placeholder="Hello world..."
                />
                <motion.span
                  animate={{ opacity: [1, 1, 0, 0] }}
                  transition={{ repeat: Infinity, duration: 0.8, ease: "linear", times: [0, 0.5, 0.5, 1] }}
                  className="w-2.5 h-4 bg-accent inline-block ml-1"
                />
              </div>
            )}
          </div>
        </motion.div>
      </div>

    </div>
  );
}

function GitBranchIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
      <line x1="6" y1="3" x2="6" y2="15"></line>
      <circle cx="18" cy="6" r="3"></circle>
      <circle cx="6" cy="18" r="3"></circle>
      <path d="M18 9a9 9 0 0 1-9 9"></path>
    </svg>
  );
}
