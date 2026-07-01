import { Link, NavLink } from 'react-router-dom';

function Navbar() {
  const navLinkClass = ({ isActive }) =>
    `text-sm transition-colors ${
      isActive ? 'text-white' : 'text-slate-300 hover:text-white'
    }`;

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
              v3.0
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <NavLink to="/" end className={navLinkClass}>
              Create
            </NavLink>
            <NavLink to="/templates" className={navLinkClass}>
              Templates
            </NavLink>
            <NavLink to="/bulk" className={navLinkClass}>
              Bulk CSV
            </NavLink>
            <span className="inline-flex items-center gap-1.5 text-xs text-slate-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Free · No sign-up
            </span>
          </div>

          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold bg-gradient-to-r from-amber-500 via-pink-500 to-cyan-500 text-white rounded-full px-4 py-2 hover:scale-105 transition-transform"
          >
            ✨ Create now
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
