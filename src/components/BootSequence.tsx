"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function BootSequence() {
  const [isVisible, setIsVisible] = useState(true);
  const [logs, setLogs] = useState<string[]>([]);
  const sequence = [
    "> Booting Neural Workspace...",
    "Checking CUDA Drivers... [OK]",
    "Loading Tensor Engine... [OK]",
    "Loading Research Models... [OK]",
    "Initializing Memory... [OK]",
    "Starting Portfolio...",
    "█████████████████ 100%",
    "System Online."
  ];

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      setLogs((prev) => [...prev, sequence[currentIndex]]);
      currentIndex++;
      if (currentIndex === sequence.length) {
        clearInterval(interval);
        setTimeout(() => setIsVisible(false), 800);
      }
    }, 150);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(10px)" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center font-mono text-sm text-secondary"
        >
          <div className="w-full max-w-md p-6">
            {logs.map((log, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className={idx === sequence.length - 1 ? "text-success font-bold mt-4" : "mt-1"}
              >
                {log}
              </motion.div>
            ))}
            {logs.length < sequence.length && (
              <motion.div
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="w-2 h-4 bg-primary inline-block mt-2"
              />
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
