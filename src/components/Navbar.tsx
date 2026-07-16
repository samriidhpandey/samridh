import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full border-b border-terminal-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-mono font-bold text-lg flex items-center gap-2 group">
          <span className="text-neon-green">&gt;</span>
          <span className="group-hover:text-neon-blue transition-colors">user@portfolio</span>
          <span className="w-2 h-4 bg-gray-400 animate-pulse inline-block"></span>
        </Link>
        <div className="flex gap-6 font-mono text-sm text-gray-400">
          <Link href="/projects" className="hover:text-neon-green transition-colors">/projects</Link>
          <a href="mailto:hello@example.com" className="hover:text-neon-blue transition-colors">/contact</a>
        </div>
      </div>
    </nav>
  );
}
