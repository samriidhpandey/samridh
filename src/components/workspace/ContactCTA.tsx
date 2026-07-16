"use client";
import { motion } from "framer-motion";
import { Mail, ArrowRight, Terminal } from "lucide-react";
import Link from "next/link";

export default function ContactCTA() {
  return (
    <section className="w-full max-w-7xl mx-auto px-6 py-24 mb-12">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative w-full rounded-[2.5rem] overflow-hidden p-1 bg-gradient-to-br from-accent/20 via-background to-success/20"
      >
        <div className="absolute inset-0 bg-background/90 backdrop-blur-3xl"></div>
        
        {/* Aesthetic Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_20%,transparent_100%)] z-0"></div>

        <div className="relative z-10 p-12 md:p-24 flex flex-col items-center text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
            className="w-16 h-16 rounded-2xl bg-surface border border-border/50 flex items-center justify-center mb-8 shadow-xl shadow-accent/10"
          >
            <Terminal size={32} className="text-accent" />
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-medium tracking-tight text-primary mb-6">
            Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-success">deploy?</span>
          </h2>
          
          <p className="text-lg text-secondary max-w-xl mx-auto mb-12 leading-relaxed">
            Whether you have a complex machine learning challenge or need to architect a scalable AI pipeline, I'm currently open for new opportunities.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <a 
              href="mailto:hello@example.com"
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-primary text-background rounded-full font-medium overflow-hidden transition-transform hover:scale-105 active:scale-95 shadow-2xl shadow-primary/20"
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
              <Mail size={18} />
              Initiate Connection
            </a>
            
            <Link 
              href="/resume.pdf"
              target="_blank"
              className="group inline-flex items-center gap-2 px-8 py-4 glass-panel border border-border/50 rounded-full font-medium text-primary transition-all hover:bg-surface/80 hover:border-accent/50 active:scale-95"
            >
              View Resume
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform text-secondary group-hover:text-primary" />
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
