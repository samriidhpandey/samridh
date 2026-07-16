"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function TerminalHero() {
  const [typedText, setTypedText] = useState("");
  const fullText = "python train.py --model transformer --dataset custom_v2";
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [showLoss, setShowLoss] = useState(false);

  useEffect(() => {
    let currentText = "";
    let currentIndex = 0;

    const typeInterval = setInterval(() => {
      if (currentIndex < fullText.length) {
        currentText += fullText[currentIndex];
        setTypedText(currentText);
        currentIndex++;
      } else {
        clearInterval(typeInterval);
        setIsTypingComplete(true);
        setTimeout(() => setShowLoss(true), 600);
      }
    }, 50);

    return () => clearInterval(typeInterval);
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto my-16 p-4">
      <div className="rounded-lg overflow-hidden border border-border bg-background shadow-2xl shadow-accent/5">
        <div className="flex items-center px-4 py-2 bg-surface border-b border-border">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
          </div>
          <div className="mx-auto text-xs text-secondary font-mono">user@ml-station:~</div>
        </div>
        <div className="p-6 font-mono text-sm md:text-base leading-relaxed text-secondary min-h-[300px]">
          <div className="flex">
            <span className="text-success mr-2">➜</span>
            <span className="text-accent mr-2">~</span>
            <span className="text-primary">
              {typedText}
              {!isTypingComplete && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                  className="inline-block w-2 h-5 bg-secondary align-middle ml-1"
                />
              )}
            </span>
          </div>

          {showLoss && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-4 space-y-2 text-secondary"
            >
              <p>Loading dataset "custom_v2"... <span className="text-success">[OK]</span></p>
              <p>Initializing Transformer model (1.2B params)... <span className="text-success">[OK]</span></p>
              <p>Starting training loop...</p>
              
              <div className="mt-4 space-y-1">
                <p>Epoch 1/10: Loss: 4.5212 | Acc: 12.4%</p>
                <p>Epoch 2/10: Loss: 3.1094 | Acc: 34.2%</p>
                <p>Epoch 3/10: Loss: 2.4501 | Acc: 56.7%</p>
                <p>Epoch 4/10: Loss: <span className="text-warning">1.8210</span> | Acc: <span className="text-warning">72.1%</span></p>
                <p>Epoch 5/10: Loss: <span className="font-bold text-success">0.9842</span> | Acc: <span className="font-bold text-success">89.5%</span></p>
                <motion.p 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  transition={{ delay: 1 }}
                  className="mt-2 text-accent"
                >
                  Model converged early. Checkpoint saved.
                </motion.p>
              </div>

              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ delay: 1.5 }}
                className="mt-8 pt-4 border-t border-border flex"
              >
                <span className="text-success mr-2">➜</span>
                <span className="text-accent mr-2">~</span>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                  className="inline-block w-2 h-5 bg-secondary align-middle ml-1"
                />
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 0.8 }}
        className="mt-12 text-center"
      >
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-primary mb-4">
          Hi, I build <span className="text-transparent bg-clip-text bg-gradient-to-r from-success to-accent">AI systems</span>.
        </h1>
        <p className="text-lg text-secondary max-w-2xl mx-auto">
          AI/ML Engineer specializing in translating complex data into scalable models.
          2 years experience building end-to-end pipelines in Computer Vision and NLP.
        </p>
      </motion.div>
    </div>
  );
}
