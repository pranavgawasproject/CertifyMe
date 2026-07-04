import { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import Navbar from './Navbar';
import CertificatePreview from './CertificatePreview';
import SEO from './SEO';
import AdSlot from './AdSlot';
import { TEMPLATES } from '../data/templates';

function Welcome() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Load from sessionStorage if returning, or from ?template= query param
  const [recipientName, setRecipientName] = useState(() => sessionStorage.getItem('cert_recipientName') || '');
  const [event, setEvent] = useState(() => sessionStorage.getItem('cert_event') || '');
  const [date, setDate] = useState(() => sessionStorage.getItem('cert_date') || new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }));
  const [issuer, setIssuer] = useState(() => sessionStorage.getItem('cert_issuer') || 'CertifyMe');
  const [signature, setSignature] = useState(() => sessionStorage.getItem('cert_signature') || '');
  const [logoUrl, setLogoUrl] = useState(() => sessionStorage.getItem('cert_logoUrl') || '');
  const [selectedTemplate, setSelectedTemplate] = useState(() => searchParams.get('template') || sessionStorage.getItem('cert_template') || 'classic-gold');

  const [errors, setErrors] = useState({});
  const [activeCategory, setActiveCategory] = useState('All');
  const logoInputRef = useRef(null);

  useEffect(() => {
    sessionStorage.setItem('cert_recipientName', recipientName);
    sessionStorage.setItem('cert_event', event);
    sessionStorage.setItem('cert_date', date);
    sessionStorage.setItem('cert_issuer', issuer);
    sessionStorage.setItem('cert_signature', signature);
    sessionStorage.setItem('cert_logoUrl', logoUrl);
    sessionStorage.setItem('cert_template', selectedTemplate);
  }, [recipientName, event, date, issuer, signature, logoUrl, selectedTemplate]);

  const categories = ['All', ...Array.from(new Set(TEMPLATES.map((t) => t.category)))];
  const filteredTemplates = activeCategory === 'All'
    ? TEMPLATES
    : TEMPLATES.filter((t) => t.category === activeCategory);

  const previewData = { recipientName, event, date, issuer, signature };

  const validateForm = () => {
    const newErrors = {};
    if (!recipientName.trim()) newErrors.name = 'Recipient name is required';
    if (!event.trim()) newErrors.event = 'Event name is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      navigate('/Certificate', { state: { ...previewData, logoUrl } });
    }
  };

  const useSampleData = () => {
    setRecipientName('Jane Anderson');
    setEvent('Advanced Web Development Bootcamp');
    setIssuer('CertifyMe Academy');
    setSignature('Dr. R. Sharma');
    setDate(new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }));
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (PNG, JPG, SVG)');
      return;
    }
    if (file.size > 500 * 1024) {
      alert('Logo must be under 500KB. Please use a smaller image.');
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => setLogoUrl(ev.target.result);
    reader.readAsDataURL(file);
  };

  const removeLogo = () => {
    setLogoUrl('');
    if (logoInputRef.current) logoInputRef.current.value = '';
  };

  return (
    <div>
      <SEO />
      <Navbar />

      {/* Hero */}
      <section className="relative pt-12 pb-8 px-4 sm:px-6">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-slate-300 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
            Free · 20 templates · CSV bulk · PDF · No sign-up
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4">
            <span className="font-display text-[#C9A24B]">
              Design a certificate
            </span>
            <br />
            <span className="text-white">worth showing off.</span>
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto mb-6">
            Pick a template, fill in the details, watch the preview update live, and download a high-resolution PNG — all in one place.
          </p>
          <div className="flex flex-wrap justify-center gap-3 text-sm">
            <button
              onClick={useSampleData}
              className="text-xs text-[#C9A24B] hover:text-[#DAB86A] underline underline-offset-4"
            >
              ✨ Use sample data to preview
            </button>
            <Link to="/bulk" className="text-xs text-amber-300 hover:text-amber-200 underline underline-offset-4">
              📦 Need many? Try bulk CSV upload →
            </Link>
          </div>
        </div>
      </section>

      {/* Main editor: form + live preview */}
      <section className="px-4 sm:px-6 pb-16">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-6">

            {/* Left: Form */}
            <form
              onSubmit={handleSubmit}
              className="bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-md p-6 "
            >
              <h2 className="text-lg font-semibold text-white mb-1">Certificate details</h2>
              <p className="text-xs text-slate-400 mb-5">All fields sync to the preview in real time.</p>

              {/* Recipient Name */}
              <div className="mb-4">
                <label className="block text-slate-200 font-medium mb-1.5 text-sm">
                  Recipient name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  className={`w-full px-3.5 py-2.5 rounded-lg bg-slate-900/60 border ${
                    errors.name ? 'border-red-400/80' : 'border-white/10'
                  } text-white placeholder-slate-500 focus:outline-none focus:border-[#C9A24B]/80 focus:ring-2 focus:ring-[#C9A24B]/20 transition-all text-sm`}
                  placeholder="e.g. Jane Anderson"
                  value={recipientName}
                  onChange={(e) => {
                    setRecipientName(e.target.value);
                    if (errors.name) setErrors({ ...errors, name: '' });
                  }}
                />
                {errors.name && <p className="text-red-300 text-xs mt-1.5">⚠ {errors.name}</p>}
              </div>

              {/* Event Name */}
              <div className="mb-4">
                <label className="block text-slate-200 font-medium mb-1.5 text-sm">
                  Event / course name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  className={`w-full px-3.5 py-2.5 rounded-lg bg-slate-900/60 border ${
                    errors.event ? 'border-red-400/80' : 'border-white/10'
                  } text-white placeholder-slate-500 focus:outline-none focus:border-[#C9A24B]/80 focus:ring-2 focus:ring-[#C9A24B]/20 transition-all text-sm`}
                  placeholder="e.g. Advanced Web Development"
                  value={event}
                  onChange={(e) => {
                    setEvent(e.target.value);
                    if (errors.event) setErrors({ ...errors, event: '' });
                  }}
                />
                {errors.event && <p className="text-red-300 text-xs mt-1.5">⚠ {errors.event}</p>}
              </div>

              {/* Two-col: Date + Issuer */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div>
                  <label className="block text-slate-200 font-medium mb-1.5 text-sm">Date</label>
                  <input
                    type="text"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900/60 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-[#C9A24B]/80 focus:ring-2 focus:ring-[#C9A24B]/20 transition-all text-sm"
                    placeholder="Date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-slate-200 font-medium mb-1.5 text-sm">Issuer</label>
                  <input
                    type="text"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900/60 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-[#C9A24B]/80 focus:ring-2 focus:ring-[#C9A24B]/20 transition-all text-sm"
                    placeholder="Issuing org"
                    value={issuer}
                    onChange={(e) => setIssuer(e.target.value)}
                  />
                </div>
              </div>

              {/* Signature */}
              <div className="mb-4">
                <label className="block text-slate-200 font-medium mb-1.5 text-sm">
                  Signature <span className="text-slate-500 font-normal">(optional)</span>
                </label>
                <input
                  type="text"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900/60 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-[#C9A24B]/80 focus:ring-2 focus:ring-[#C9A24B]/20 transition-all text-sm"
                  placeholder="e.g. Dr. R. Sharma"
                  value={signature}
                  onChange={(e) => setSignature(e.target.value)}
                />
              </div>

              {/* Logo upload */}
              <div className="mb-6">
                <label className="block text-slate-200 font-medium mb-1.5 text-sm">
                  Organization logo <span className="text-slate-500 font-normal">(optional, &lt;500KB)</span>
                </label>
                {logoUrl ? (
                  <div className="flex items-center gap-3 bg-slate-900/60 border border-white/10 rounded-lg p-3">
                    <img src={logoUrl} alt="logo preview" className="h-10 w-10 object-contain bg-white/5 rounded" />
                    <span className="text-xs text-slate-300 flex-1 truncate">Logo uploaded</span>
                    <button
                      type="button"
                      onClick={removeLogo}
                      className="text-xs text-red-400 hover:text-red-300"
                    >
                      ✕ Remove
                    </button>
                  </div>
                ) : (
                  <input
                    ref={logoInputRef}
                    type="file"
                    accept="image/png,image/jpeg,image/svg+xml"
                    onChange={handleLogoUpload}
                    className="w-full text-xs text-slate-300 file:mr-3 file:py-2 file:px-3 file:rounded-md file:border-0 file:bg-[#C9A24B]/20 file:text-[#C9A24B] hover:file:bg-[#C9A24B]/30 file:cursor-pointer cursor-pointer"
                  />
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-[#8C2F39] text-white font-semibold py-3 rounded-lg hover:brightness-110 transform hover:scale-[1.01] active:scale-95 transition-all duration-200 text-sm tracking-wide"
              >
                Continue to final preview →
              </button>

              <p className="text-[11px] text-slate-500 mt-3 text-center">
                Your data stays in your browser (sessionStorage). Nothing is uploaded.
              </p>
            </form>

            {/* Right: Live preview */}
            <div className="bg-white/[0.02] border border-white/10 rounded-md p-5 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-semibold text-white">Live preview</h2>
                  <p className="text-xs text-slate-400">Selected template:</p>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-[#C9A24B]">
                    {TEMPLATES.find((t) => t.id === selectedTemplate)?.name || '—'}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    {TEMPLATES.find((t) => t.id === selectedTemplate)?.category}
                  </div>
                </div>
              </div>

              <CertificatePreview
                templateId={selectedTemplate}
                data={previewData}
                logoUrl={logoUrl}
              />

              <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
                <span>📐 Aspect ratio: A4 landscape (1.414:1)</span>
                <span>🖼️ Export: PNG + PDF</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Template Gallery */}
      <section id="templates" className="px-4 sm:px-6 pb-20">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-6 gap-3">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">Choose a template</h2>
              <p className="text-slate-400 text-sm mt-1">20 hand-crafted designs across 7 styles. Click any one to preview.</p>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`text-xs px-3 py-1.5 rounded-full transition-all border ${
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredTemplates.map((tpl) => (
              <button
                key={tpl.id}
                onClick={() => setSelectedTemplate(tpl.id)}
                className={`group relative rounded-md overflow-hidden border transition-all duration-300 text-left ${
                  selectedTemplate === tpl.id
                    ? 'border-[#C9A24B] ring-2 ring-[#C9A24B]/40 scale-[1.01]'
                    : 'border-white/10 hover:border-white/30'
                }`}
              >
                <CertificatePreview
                  templateId={tpl.id}
                  data={previewData}
                  logoUrl={logoUrl}
                />
                <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-slate-950/95 via-slate-950/70 to-transparent">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-white text-sm font-semibold">{tpl.name}</div>
                      <div className="text-[11px] text-slate-300">{tpl.description}</div>
                    </div>
                    <span
                      className="text-[10px] font-medium uppercase tracking-wider px-2 py-1 rounded-full border"
                      style={{ color: tpl.accent, borderColor: `${tpl.accent}50`, background: `${tpl.accent}15` }}
                    >
                      {tpl.category}
                    </span>
                  </div>
                </div>
                {selectedTemplate === tpl.id && (
                  <div className="absolute top-3 right-3 bg-[#C9A24B] text-[#0E1526] rounded-full w-7 h-7 flex items-center justify-center text-sm font-bold shadow-lg">
                    ✓
                  </div>
                )}
              </button>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              to="/templates"
              className="text-sm text-[#C9A24B] hover:text-[#DAB86A] underline underline-offset-4"
            >
              See all 20 templates in detail →
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="px-4 sm:px-6 pb-12">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { icon: '⚡', title: 'Live preview', desc: 'See changes instantly as you type' },
              { icon: '🎨', title: '20 templates', desc: 'Formal, minimal, luxury, vintage & more' },
              { icon: '📦', title: 'CSV bulk export', desc: 'Upload a spreadsheet, get a ZIP of PNGs' },
              { icon: '🔗', title: 'Shareable links', desc: 'Every certificate gets its own URL' },
            ].map((f) => (
              <div key={f.title} className="bg-white/[0.04] border border-white/10 rounded-xl p-5 text-center">
                <div className="text-3xl mb-2">{f.icon}</div>
                <h3 className="text-white font-semibold text-sm mb-1">{f.title}</h3>
                <p className="text-slate-400 text-xs">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ad slot — appears once AdSense is configured */}
      <section className="px-4 sm:px-6 pb-16">
        <div className="container mx-auto max-w-4xl">
          <AdSlot slot="0000000001" className="min-h-[90px]" />
        </div>
      </section>

      {/* Use cases */}
      <section className="px-4 sm:px-6 pb-20">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-8">Built for every kind of recognition</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: '🎓', title: 'Schools & courses', desc: 'Award students at scale via CSV' },
              { icon: '💼', title: 'HR & corporate', desc: 'Completion certificates for training' },
              { icon: '🏆', title: 'Events & hackathons', desc: 'Participation and winner certs' },
              { icon: '🤝', title: 'Volunteers', desc: 'Recognize contributors instantly' },
            ].map((u) => (
              <div key={u.title} className="bg-white/[0.04] border border-white/10 rounded-xl p-5">
                <div className="text-3xl mb-2">{u.icon}</div>
                <h3 className="text-white font-semibold text-sm mb-1">{u.title}</h3>
                <p className="text-slate-400 text-xs">{u.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 py-6 text-center text-xs text-slate-500">
        Built with React + Vite + Tailwind. Crafted by the CertifyMe community.
      </footer>
    </div>
  );
}

export default Welcome;
