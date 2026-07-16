"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Monitor, Moon, Sun, Folder, User, Terminal, Mail, FileText, ArrowRight } from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";

type Command = {
  id: string;
  name: string;
  icon: React.ReactNode;
  action: () => void;
  section: string;
};

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const { setTheme } = useTheme();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = "hidden";
    } else {
      setSearch("");
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  const commands: Command[] = [
    { id: "home", name: "Home", icon: <Terminal size={16} />, section: "Navigation", action: () => { router.push("/"); setIsOpen(false); } },
    { id: "projects", name: "Projects", icon: <Folder size={16} />, section: "Navigation", action: () => { router.push("/projects"); setIsOpen(false); } },
    { id: "research", name: "Research", icon: <FileText size={16} />, section: "Navigation", action: () => { router.push("/research"); setIsOpen(false); } },
    { id: "timeline", name: "Timeline", icon: <User size={16} />, section: "Navigation", action: () => { router.push("/timeline"); setIsOpen(false); } },
    
    { id: "theme-light", name: "Light Mode", icon: <Sun size={16} />, section: "Theme", action: () => { setTheme("light"); setIsOpen(false); } },
    { id: "theme-dark", name: "Dark Mode", icon: <Moon size={16} />, section: "Theme", action: () => { setTheme("dark"); setIsOpen(false); } },
    { id: "theme-system", name: "System Theme", icon: <Monitor size={16} />, section: "Theme", action: () => { setTheme("system"); setIsOpen(false); } },

    { id: "contact", name: "Send Email", icon: <Mail size={16} />, section: "Actions", action: () => { window.location.href = "mailto:hello@example.com"; setIsOpen(false); } },
    { id: "resume", name: "Download Resume", icon: <FileText size={16} />, section: "Actions", action: () => { window.open("/resume.pdf", "_blank"); setIsOpen(false); } },
  ];

  const filteredCommands = commands.filter(cmd => 
    cmd.name.toLowerCase().includes(search.toLowerCase()) || 
    cmd.section.toLowerCase().includes(search.toLowerCase())
  );

  // Group commands by section
  const sections = Array.from(new Set(filteredCommands.map(c => c.section)));

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[99999]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-2xl bg-surface border border-border/50 rounded-2xl shadow-2xl overflow-hidden z-[100000] flex flex-col max-h-[80vh]"
          >
            <div className="flex items-center px-4 py-4 border-b border-border/50 gap-3">
              <Search size={20} className="text-secondary" />
              <input
                ref={inputRef}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Type a command or search..."
                className="flex-1 bg-transparent outline-none border-none text-primary placeholder:text-secondary font-mono text-sm"
              />
              <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 rounded bg-background border border-border/50 font-mono text-[10px] text-secondary">
                ESC
              </kbd>
            </div>

            <div className="flex-1 overflow-y-auto p-2">
              {sections.length === 0 ? (
                <div className="px-4 py-8 text-center text-secondary font-mono text-sm">
                  No results found for "{search}"
                </div>
              ) : (
                sections.map(section => (
                  <div key={section} className="mb-4">
                    <div className="px-4 py-2 text-[10px] uppercase tracking-widest font-mono text-secondary opacity-70">
                      {section}
                    </div>
                    {filteredCommands.filter(c => c.section === section).map(cmd => (
                      <button
                        key={cmd.id}
                        onClick={cmd.action}
                        className="w-full flex items-center justify-between px-4 py-3 hover:bg-white/[0.04] dark:hover:bg-white/[0.04] rounded-xl transition-colors group text-left"
                      >
                        <div className="flex items-center gap-3">
                          <div className="text-secondary group-hover:text-primary transition-colors">
                            {cmd.icon}
                          </div>
                          <span className="text-sm font-medium text-primary group-hover:text-accent transition-colors">
                            {cmd.name}
                          </span>
                        </div>
                        <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-accent" />
                      </button>
                    ))}
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
