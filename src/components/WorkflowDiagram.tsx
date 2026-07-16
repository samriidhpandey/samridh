"use client";

import { Database, Beaker, Rocket, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function WorkflowDiagram() {
  const steps = [
    {
      id: "data",
      title: "Data Engineering",
      icon: <Database className="w-6 h-6 text-neon-blue" />,
      desc: "ETL, Cleaning, Feature Eng",
    },
    {
      id: "experiment",
      title: "Experimentation",
      icon: <Beaker className="w-6 h-6 text-purple-400" />,
      desc: "Training, Tuning, Eval",
    },
    {
      id: "deploy",
      title: "Deployment",
      icon: <Rocket className="w-6 h-6 text-neon-green" />,
      desc: "ONNX, TensorRT, FastAPI",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section className="py-20 w-full max-w-5xl mx-auto px-4 overflow-hidden">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold mb-16 text-center"
      >
        <span className="text-neon-blue font-mono mr-2">&gt;</span> 
        How I Think
      </motion.h2>
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 relative"
      >
        {/* Connection lines for desktop */}
        <div className="hidden md:block absolute top-1/2 left-10 right-10 h-[1px] bg-terminal-border -z-10 -translate-y-1/2"></div>
        
        {steps.map((step, index) => (
          <div key={step.id} className="flex flex-col md:flex-row items-center">
            <motion.div 
              variants={itemVariants}
              className="bg-terminal-card border border-terminal-border p-6 rounded-xl w-64 text-center shadow-lg hover:border-gray-500 transition-colors z-10 bg-background/80 backdrop-blur-sm"
            >
              <div className="bg-[#1f1f22] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-terminal-border shadow-inner">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-200 mb-2">{step.title}</h3>
              <p className="text-sm text-gray-400 font-mono">{step.desc}</p>
            </motion.div>
            
            {index < steps.length - 1 && (
              <motion.div 
                variants={itemVariants}
                className="hidden md:flex items-center justify-center w-8 text-gray-600 bg-background z-10 px-2"
              >
                <ArrowRight className="w-6 h-6" />
              </motion.div>
            )}
            
            {index < steps.length - 1 && (
              <motion.div 
                variants={itemVariants}
                className="md:hidden flex items-center justify-center h-8 text-gray-600 my-4"
              >
                <ArrowRight className="w-6 h-6 rotate-90" />
              </motion.div>
            )}
          </div>
        ))}
      </motion.div>
    </section>
  );
}
