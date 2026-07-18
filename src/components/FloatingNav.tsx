"use client";
import { motion, useScroll, useSpring } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { ThemeToggle } from "./ThemeToggle";

export default function FloatingNav() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const pathname = usePathname();

  const navItems = [
    { name: "Overview", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: "Research", path: "/research" },
    { name: "Timeline", path: "/timeline" },
  ];

  return (
    <div className="fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-50 w-[95vw] sm:w-auto max-w-fit">
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 2 }}
        className="bg-surface/80 backdrop-blur-xl border border-border/50 rounded-full px-4 sm:px-6 py-2 flex items-center justify-between gap-3 sm:gap-6 shadow-2xl relative overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {/* Scroll Progress Bar at the bottom of the nav */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[1px] bg-accent origin-left"
          style={{ scaleX }}
        />
        
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.name}
              href={item.path}
              className={`text-[10px] sm:text-xs font-mono transition-colors duration-300 relative group tracking-wider whitespace-nowrap py-1 ${isActive ? "text-primary" : "text-secondary hover:text-primary"}`}
            >
              {item.name}
              {isActive && (
                <motion.div 
                  layoutId="nav-active"
                  className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-accent rounded-full"
                />
              )}
            </Link>
          );
        })}

        <div className="w-[1px] h-4 bg-border/50 mx-0 sm:mx-1 shrink-0"></div>
        <div className="shrink-0">
          <ThemeToggle />
        </div>
      </motion.nav>
    </div>
  );
}
