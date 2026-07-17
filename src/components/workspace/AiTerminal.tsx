"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Send, RefreshCw } from "lucide-react";

type Message = {
  id: string;
  sender: "user" | "ai";
  text: string;
};

export default function AiTerminal() {
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", sender: "ai", text: "SYSTEM_ONLINE. I am Samridh-AI, a simulated digital twin. How can I assist you today?" }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const predefinedResponses: Record<string, string> = {
    "What are your skills?": "I specialize in Machine Learning, Deep Neural Networks, and NLP. My core stack includes Python, PyTorch, TensorFlow, and React/Next.js for building full-stack AI applications.",
    "Tell me about your experience": "I have over 2 years of experience building end-to-end AI pipelines, optimizing transformer models, and deploying scalable inference engines on cloud infrastructure.",
    "Are you looking for opportunities?": "Yes, I am currently open to new roles in AI/ML Engineering or Full Stack Engineering where I can build impactful AI systems.",
    "Help": "You can ask me about: skills, experience, or opportunities."
  };

  const handleCommand = (command: string) => {
    const newMessage: Message = { id: Date.now().toString(), sender: "user", text: command };
    setMessages(prev => [...prev, newMessage]);
    setIsTyping(true);

    // Simulate network delay
    setTimeout(() => {
      let responseText = predefinedResponses[command];
      if (!responseText) {
        // Simple fuzzy match or fallback
        const lowerCmd = command.toLowerCase();
        if (lowerCmd.includes("skill")) responseText = predefinedResponses["What are your skills?"];
        else if (lowerCmd.includes("exp")) responseText = predefinedResponses["Tell me about your experience"];
        else if (lowerCmd.includes("job") || lowerCmd.includes("hire") || lowerCmd.includes("opportunity")) responseText = predefinedResponses["Are you looking for opportunities?"];
        else responseText = "Command not recognized. Type 'Help' for available options.";
      }

      setMessages(prev => [...prev, { id: Date.now().toString(), sender: "ai", text: responseText }]);
      setIsTyping(false);
    }, 1200);
  };

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const presetQuestions = [
    "What are your skills?",
    "Tell me about your experience",
    "Are you looking for opportunities?"
  ];

  return (
    <section className="w-full max-w-4xl mx-auto px-6 py-24">
      <div className="glass-panel rounded-2xl border border-border/50 overflow-hidden shadow-2xl flex flex-col h-[500px]">
        {/* Terminal Header */}
        <div className="bg-surface border-b border-border/50 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-error"></div>
              <div className="w-3 h-3 rounded-full bg-warning"></div>
              <div className="w-3 h-3 rounded-full bg-success"></div>
            </div>
            <span className="font-mono text-xs text-secondary opacity-70 flex items-center gap-2">
              <Terminal size={14} />
              samridh-ai@server ~
            </span>
          </div>
          <button 
            onClick={() => setMessages([{ id: Date.now().toString(), sender: "ai", text: "SYSTEM_REBOOTED. Ready." }])}
            className="text-secondary hover:text-primary transition-colors"
            title="Reset Terminal"
          >
            <RefreshCw size={14} />
          </button>
        </div>

        {/* Terminal Body */}
        <div ref={containerRef} className="flex-1 p-6 overflow-y-auto font-mono text-sm space-y-4">
          <AnimatePresence>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
              >
                <div className={`max-w-[80%] rounded-lg px-4 py-2 ${
                  msg.sender === "user" 
                    ? "bg-primary text-background" 
                    : "bg-surface border border-border/50 text-secondary"
                }`}>
                  {msg.sender === "ai" && <span className="text-accent font-bold mr-2">SAM-AI:</span>}
                  {msg.text}
                </div>
              </motion.div>
            ))}
            
            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-start"
              >
                <div className="bg-surface border border-border/50 text-secondary rounded-lg px-4 py-2">
                  <span className="text-accent font-bold mr-2">SAM-AI:</span>
                  <span className="inline-flex gap-1">
                    <span className="animate-bounce">.</span>
                    <span className="animate-bounce" style={{ animationDelay: "0.2s" }}>.</span>
                    <span className="animate-bounce" style={{ animationDelay: "0.4s" }}>.</span>
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        {/* Terminal Input Area */}
        <div className="p-4 bg-surface border-t border-border/50">
          <div className="flex flex-wrap gap-2 mb-4">
            {presetQuestions.map((q) => (
              <button
                key={q}
                onClick={() => handleCommand(q)}
                disabled={isTyping}
                className="text-[10px] uppercase tracking-wider font-mono px-3 py-1.5 rounded-full border border-border/50 bg-background/50 text-secondary hover:text-primary hover:border-accent/50 transition-colors disabled:opacity-50"
              >
                {q}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <span className="text-success font-mono font-bold">❯</span>
            <input 
              type="text"
              readOnly
              placeholder="Select a command above to interact..."
              className="flex-1 bg-transparent border-none outline-none font-mono text-primary placeholder:text-secondary/30"
            />
            <Send size={16} className="text-secondary/50" />
          </div>
        </div>
      </div>
    </section>
  );
}
