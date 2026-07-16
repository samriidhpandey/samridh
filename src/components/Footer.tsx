"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";

const GithubIcon = ({ size = 20, strokeWidth = 1.5, ...props }: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ size = 20, strokeWidth = 1.5, ...props }: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const InstagramIcon = ({ size = 20, strokeWidth = 1.5, ...props }: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const socialLinks = [
  {
    name: "GitHub",
    icon: GithubIcon,
    href: "https://github.com",
    color: "hover:text-white hover:border-white/30",
  },
  {
    name: "LinkedIn",
    icon: LinkedinIcon,
    href: "https://linkedin.com",
    color: "hover:text-[#0A66C2] hover:border-[#0A66C2]/30",
  },
  {
    name: "Instagram",
    icon: InstagramIcon,
    href: "https://instagram.com",
    color: "hover:text-[#E4405F] hover:border-[#E4405F]/30",
  },
  {
    name: "Email",
    icon: Mail,
    href: "mailto:hello@example.com",
    color: "hover:text-[#EA4335] hover:border-[#EA4335]/30",
  },
];

export default function Footer() {
  return (
    <footer className="w-full py-8 border-t border-border/50 relative z-20 mt-auto bg-background/50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <span className="font-mono text-sm text-secondary">
            SYSTEM.STATUS: <span className="text-success">ONLINE</span>
          </span>
          <span className="text-xs text-secondary/50 mt-1 font-mono">
            © {new Date().getFullYear()} Samridh Pandey. All rights reserved.
          </span>
        </div>
        
        <div className="flex items-center gap-4">
          {socialLinks.map((link, index) => {
            const Icon = link.icon;
            return (
              <motion.a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.15, y: -4 }}
                whileTap={{ scale: 0.95 }}
                className={`p-2.5 rounded-xl border border-border/50 bg-surface/50 text-secondary transition-all duration-300 ${link.color}`}
                aria-label={link.name}
              >
                <Icon size={20} strokeWidth={1.5} />
              </motion.a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
