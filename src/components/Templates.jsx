import { Link } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './Navbar';
import CertificatePreview from './CertificatePreview';
import SEO from './SEO';
import { TEMPLATES } from '../data/templates';

function Templates() {
  const [activeCategory, setActiveCategory] = useState('All');
  const categories = ['All', ...Array.from(new Set(TEMPLATES.map((t) => t.category)))];
  const filtered = activeCategory === 'All' ? TEMPLATES : TEMPLATES.filter((t) => t.category === activeCategory);

  const sampleData = {
    recipientName: 'Jane Anderson',
    event: 'Advanced Web Development',
    date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    issuer: 'CertifyMe Academy',
    signature: 'Dr. R. Sharma',
  };

  return (
    <div>
      <SEO
        title="12 Free Certificate Templates — Download & Customize"
        description="Browse 12 professionally designed certificate templates: formal, minimal, luxury, vintage, modern & more. Customize with your name and event, then download as high-res PNG. Free, no sign-up."
        path="/templates"
        keywords="certificate templates, free certificate designs, award certificate templates, certificate of achievement template, certificate of completion template"
      />
      <Navbar />

      {/* Hero */}
      <section className="px-4 sm:px-6 pt-12 pb-8">
        <div className="container mx-auto max-w-5xl text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-amber-200 via-pink-200 to-cyan-200 bg-clip-text text-transparent">
              12 Free Certificate Templates
            </span>
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto mb-6">
            Hand-crafted, designer-made certificate templates for every occasion. Formal awards, vintage diplomas, modern minimalism, luxury gold — pick one, customize, download as high-resolution PNG. No sign-up, no watermark.
          </p>
          <Link
            to="/"
            className="inline-block bg-gradient-to-r from-amber-500 via-pink-500 to-cyan-500 text-white font-semibold px-6 py-3 rounded-lg text-sm hover:scale-105 transition-transform"
          >
            🚀 Start creating →
          </Link>
        </div>
      </section>

      {/* Category filter */}
      <section className="px-4 sm:px-6 pb-8">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-xs px-4 py-2 rounded-full transition-all border ${
                  activeCategory === cat
                    ? 'bg-white text-slate-900 border-white font-semibold'
                    : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Templates grid */}
      <section className="px-4 sm:px-6 pb-16">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((tpl) => (
              <article key={tpl.id} className="group">
                <Link to={`/?template=${tpl.id}`} className="block">
                  <div className="rounded-2xl overflow-hidden border border-white/10 group-hover:border-cyan-400/50 transition-all shadow-lg group-hover:shadow-cyan-500/20">
                    <CertificatePreview templateId={tpl.id} data={sampleData} />
                  </div>
                  <div className="mt-3 px-1">
                    <div className="flex items-center justify-between">
                      <h2 className="text-white font-semibold text-base">{tpl.name}</h2>
                      <span
                        className="text-[10px] font-medium uppercase tracking-wider px-2 py-1 rounded-full border"
                        style={{ color: tpl.accent, borderColor: `${tpl.accent}50`, background: `${tpl.accent}15` }}
                      >
                        {tpl.category}
                      </span>
                    </div>
                    <p className="text-slate-400 text-xs mt-1">{tpl.description}</p>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SEO content section */}
      <section className="px-4 sm:px-6 pb-20">
        <div className="container mx-auto max-w-3xl prose prose-invert prose-sm">
          <h2 className="text-2xl font-bold text-white mb-4">About our certificate templates</h2>
          <p className="text-slate-300 leading-relaxed mb-4">
            Our templates are designed by professional graphic designers and span the most popular certificate styles — from timeless black-and-gold formal awards to modern minimal designs, vintage kraft diplomas, art deco luxury, and tech-inspired neon layouts. Each template renders at A4 landscape ratio (1.414:1) and exports as a crisp 2x PNG suitable for both screen and print.
          </p>
          <p className="text-slate-300 leading-relaxed mb-4">
            <strong className="text-white">Use cases:</strong> Perfect for teachers awarding students, HR teams issuing completion certificates, online course creators, hackathon organizers, event hosts, volunteer recognition programs, employee of the month awards, sports tournaments, and personal achievements.
          </p>
          <p className="text-slate-300 leading-relaxed">
            <strong className="text-white">How it works:</strong> Pick a template, fill in the recipient name, event name, date, issuer, and optional signature, then download as a high-resolution PNG. All processing happens locally in your browser — your data never leaves your device. For bulk needs (e.g., 50 students), use our <Link to="/bulk" className="text-cyan-400 underline">CSV bulk generation</Link> feature.
          </p>
        </div>
      </section>

      <footer className="border-t border-white/10 py-6 text-center text-xs text-slate-500">
        Built with React + Vite + Tailwind. Crafted by the CertifyMe community.
      </footer>
    </div>
  );
}

export default Templates;
