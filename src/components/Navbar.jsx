import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/60 border-b border-white/10">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <span className="text-2xl">🎓</span>
            <span className="text-xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-amber-200 via-pink-200 to-cyan-200 bg-clip-text text-transparent">
                CertifyMe
              </span>
            </span>
            <span className="hidden sm:inline-flex items-center text-[10px] font-semibold uppercase tracking-widest text-cyan-300/80 border border-cyan-300/30 rounded-full px-2 py-0.5 ml-1">
              v2.0
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6 text-sm">
            <a href="#templates" className="text-slate-300 hover:text-white transition-colors">
              Templates
            </a>
            <a href="#features" className="text-slate-300 hover:text-white transition-colors">
              Features
            </a>
            <span className="inline-flex items-center gap-1.5 text-slate-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              12 templates ready
            </span>
          </div>

          <a
            href="https://github.com/pranavgawasproject/CertifyMe"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 text-xs font-medium text-slate-300 hover:text-white border border-white/15 hover:border-white/30 rounded-full px-3 py-1.5 transition-all"
          >
            ⭐ Star on GitHub
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
