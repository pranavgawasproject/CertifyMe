import { Link, NavLink } from 'react-router-dom';

function SealMark({ className = '' }) {
  return (
    <svg viewBox="0 0 40 40" className={className} fill="none">
      <circle cx="20" cy="20" r="18" stroke="#C9A24B" strokeWidth="1.5" />
      <circle cx="20" cy="20" r="13" stroke="#C9A24B" strokeWidth="1" opacity="0.6" />
      <path d="M20 10 L22.5 17 L30 17 L24 21.5 L26.2 29 L20 24.5 L13.8 29 L16 21.5 L10 17 L17.5 17 Z" fill="#C9A24B" />
    </svg>
  );
}

function Navbar() {
  const navLinkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors ${
      isActive ? 'text-[#C9A24B]' : 'text-slate-300 hover:text-white'
    }`;

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-[#0E1526]/80 border-b border-white/10">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2.5 group">
            <SealMark className="h-8 w-8 animate-seal-stamp" />
            <span className="text-xl font-semibold tracking-tight font-display text-white">
              CertifyMe
            </span>
            <span className="hidden sm:inline-flex items-center text-[10px] font-semibold uppercase tracking-widest text-[#C9A24B] border border-[#C9A24B]/30 rounded-sm px-2 py-0.5 ml-1">
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
            className="inline-flex items-center gap-1.5 text-xs font-semibold bg-[#8C2F39] text-white rounded-sm px-4 py-2 border border-[#8C2F39] hover:bg-[#7A2830] transition-colors"
          >
            Create now
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
