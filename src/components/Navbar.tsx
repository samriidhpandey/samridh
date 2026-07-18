"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full border-b border-terminal-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-mono font-bold text-sm sm:text-lg flex items-center gap-1.5 sm:gap-2 group z-50 min-w-0">
          <span className="text-neon-green shrink-0">&gt;</span>
          <span className="group-hover:text-neon-blue transition-colors truncate">user@portfolio</span>
          <span className="w-1.5 sm:w-2 h-3 sm:h-4 bg-gray-400 animate-pulse inline-block shrink-0"></span>
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 font-mono text-sm text-gray-400">
          <Link href="/projects" className="hover:text-neon-green transition-colors">/projects</Link>
          <a href="mailto:hello@example.com" className="hover:text-neon-blue transition-colors">/contact</a>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-400 hover:text-white transition-colors z-50 p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-background/95 backdrop-blur-md border-b border-terminal-border flex flex-col items-center py-6 gap-6 font-mono text-lg shadow-lg">
          <Link 
            href="/projects" 
            className="text-gray-400 hover:text-neon-green transition-colors w-full text-center py-2"
            onClick={() => setIsOpen(false)}
          >
            /projects
          </Link>
          <a 
            href="mailto:hello@example.com" 
            className="text-gray-400 hover:text-neon-blue transition-colors w-full text-center py-2"
            onClick={() => setIsOpen(false)}
          >
            /contact
          </a>
        </div>
      )}
    </nav>
  );
}
