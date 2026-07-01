import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import CertificatePreview from './CertificatePreview';
import SEO from './SEO';
import { TEMPLATES } from '../data/templates';
import { buildShareUrl } from '../utils/share';

function Certificate() {
  const { state } = useLocation();
  const navigate = useNavigate();

  // Read from location state OR sessionStorage (persists across refresh)
  const recipientName = state?.recipientName || sessionStorage.getItem('cert_recipientName') || '';
  const event = state?.event || sessionStorage.getItem('cert_event') || '';
  const date = state?.date || sessionStorage.getItem('cert_date') || '';
  const issuer = state?.issuer || sessionStorage.getItem('cert_issuer') || '';
  const signature = state?.signature || sessionStorage.getItem('cert_signature') || '';
  const selectedTemplate = state?.templateId || sessionStorage.getItem('cert_template') || 'classic-gold';

  const certificateRef = useRef(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSwitcher, setShowSwitcher] = useState(false);
  const [shareLink, setShareLink] = useState('');
  const [copied, setCopied] = useState(false);

  const data = { recipientName, event, date, issuer, signature, templateId: selectedTemplate };
  const currentTemplate = TEMPLATES.find((t) => t.id === selectedTemplate) || TEMPLATES[0];

  useEffect(() => {
    if (!recipientName || !event) {
      navigate('/');
    }
  }, [recipientName, event, navigate]);

  // Generate share link once on mount (and when data changes)
  useEffect(() => {
    if (recipientName && event) {
      setShareLink(buildShareUrl({
        recipientName, event, date, issuer, signature, templateId: selectedTemplate,
      }));
    }
  }, [recipientName, event, date, issuer, signature, selectedTemplate]);

  const downloadCertificate = async () => {
    if (!certificateRef.current) return;
    setIsDownloading(true);
    try {
      const { default: html2canvas } = await import('html2canvas');
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: null,
        logging: false,
      });
      const link = document.createElement('a');
      link.download = `${recipientName.replace(/\s+/g, '_')}_${event.replace(/\s+/g, '_')}_certificate.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      setTimeout(() => {
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      }, 200);
    } catch (err) {
      console.error('Download failed:', err);
      alert('Sorry, download failed. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  const shareOnSocial = async () => {
    const text = `I just received my certificate for ${event}! 🎉`;
    if (navigator.share) {
      try {
        await navigator.share({ title: 'My Certificate', text, url: shareLink });
      } catch (e) { /* user cancelled */ }
    } else {
      await copyShareLink();
    }
  };

  const copyShareLink = async () => {
    try {
      await navigator.clipboard.writeText(shareLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback for older browsers
      const ta = document.createElement('textarea');
      ta.value = shareLink;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const switchTemplate = (tplId) => {
    sessionStorage.setItem('cert_template', tplId);
    window.location.reload();
  };

  return (
    <div className="min-h-screen">
      <SEO
        title={`Certificate — ${recipientName}`}
        description={`Certificate of achievement awarded to ${recipientName} for ${event}. Issued by ${issuer}.`}
      />
      <Navbar />

      {showSuccess && (
        <div className="fixed top-20 right-4 bg-emerald-500 text-white px-5 py-3 rounded-lg shadow-lg z-50 animate-slide-in-right">
          ✅ Certificate downloaded successfully!
        </div>
      )}

      <div className="container mx-auto px-4 sm:px-6 py-8">
        {/* Header card */}
        <div className="max-w-4xl mx-auto mb-8 animate-fade-in">
          <div className="bg-gradient-to-r from-amber-500/10 via-pink-500/10 to-cyan-500/10 backdrop-blur-xl p-6 sm:p-8 rounded-2xl border border-white/10 shadow-2xl text-center">
            <div className="text-xs uppercase tracking-widest text-cyan-300/80 mb-2">
              {currentTemplate.category} · {currentTemplate.name}
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">
              <span className="bg-gradient-to-r from-amber-200 via-pink-200 to-cyan-200 bg-clip-text text-transparent">
                🎊 Congratulations, {recipientName}!
              </span>
            </h1>
            <p className="text-slate-300 text-base sm:text-lg">
              Your certificate for <span className="font-semibold text-cyan-300">{event}</span> is ready.
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              <span className="bg-amber-500/20 text-amber-200 px-3 py-1 rounded-full text-xs">Template: {currentTemplate.name}</span>
              <span className="bg-emerald-500/20 text-emerald-200 px-3 py-1 rounded-full text-xs">✓ Ready to download</span>
              <span className="bg-cyan-500/20 text-cyan-200 px-3 py-1 rounded-full text-xs">📐 A4 Landscape · 2x export</span>
            </div>
          </div>
        </div>

        {/* Certificate preview (this is the element captured for download) */}
        <div className="max-w-5xl mx-auto mb-8 animate-scale-in">
          <div
            ref={certificateRef}
            style={{ aspectRatio: '1.414 / 1', width: '100%' }}
            className="rounded-lg overflow-hidden shadow-2xl border border-white/10"
          >
            <CertificatePreview
              templateId={selectedTemplate}
              data={data}
            />
          </div>
        </div>

        {/* Share link bar */}
        {shareLink && (
          <div className="max-w-3xl mx-auto mb-6 bg-white/[0.04] border border-white/10 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="flex-1 min-w-0">
              <div className="text-xs text-slate-400 mb-1">🔗 Shareable link to this certificate</div>
              <input
                readOnly
                value={shareLink}
                onClick={(e) => e.target.select()}
                className="w-full px-3 py-2 rounded-lg bg-slate-900/60 border border-white/10 text-cyan-300 text-xs font-mono truncate"
              />
            </div>
            <button
              onClick={copyShareLink}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                copied
                  ? 'bg-emerald-500 text-white'
                  : 'bg-white/10 hover:bg-white/20 text-white border border-white/15'
              }`}
            >
              {copied ? '✓ Copied!' : 'Copy link'}
            </button>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-3 mb-12">
          <button
            className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all transform hover:scale-105 active:scale-95 shadow-lg ${
              isDownloading
                ? 'bg-slate-600 cursor-not-allowed'
                : 'bg-gradient-to-r from-emerald-500 to-green-600 hover:shadow-emerald-500/40 text-white'
            }`}
            onClick={downloadCertificate}
            disabled={isDownloading}
          >
            {isDownloading ? (
              <>
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Generating PNG...
              </>
            ) : (
              <>📥 Download PNG</>
            )}
          </button>

          <button
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:shadow-cyan-500/40 text-white px-6 py-3 rounded-lg font-semibold text-sm transition-all transform hover:scale-105 active:scale-95 shadow-lg"
            onClick={shareOnSocial}
          >
            📤 Share
          </button>

          <button
            className="flex items-center justify-center gap-2 bg-white/5 backdrop-blur border border-white/15 hover:bg-white/10 text-white px-6 py-3 rounded-lg font-semibold text-sm transition-all transform hover:scale-105 active:scale-95"
            onClick={() => setShowSwitcher((v) => !v)}
          >
            🎨 Switch template
          </button>

          <button
            className="flex items-center justify-center gap-2 bg-white/5 backdrop-blur border border-white/15 hover:bg-white/10 text-white px-6 py-3 rounded-lg font-semibold text-sm transition-all transform hover:scale-105 active:scale-95"
            onClick={() => navigate('/')}
          >
            🔄 Edit details
          </button>
        </div>

        {/* Template switcher panel */}
        {showSwitcher && (
          <div className="max-w-5xl mx-auto mb-12 bg-white/[0.04] border border-white/10 rounded-2xl p-5 animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold text-sm">Switch template (keeps your details)</h3>
              <button
                onClick={() => setShowSwitcher(false)}
                className="text-slate-400 hover:text-white text-sm"
              >
                ✕ Close
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {TEMPLATES.map((tpl) => (
                <button
                  key={tpl.id}
                  onClick={() => switchTemplate(tpl.id)}
                  className={`group rounded-lg overflow-hidden border transition-all ${
                    selectedTemplate === tpl.id
                      ? 'border-cyan-400 ring-2 ring-cyan-400/40'
                      : 'border-white/10 hover:border-white/30'
                  }`}
                >
                  <CertificatePreview templateId={tpl.id} data={data} />
                  <div className="bg-slate-900/80 backdrop-blur px-2 py-1.5">
                    <div className="text-[11px] text-white font-medium truncate">{tpl.name}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Tips */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: '💾', title: 'Save it', desc: 'Download your certificate as a high-quality PNG' },
            { icon: '🔗', title: 'Share link', desc: 'Send a unique URL that opens this exact certificate' },
            { icon: '🖼️', title: 'Print it', desc: 'Print at A4 landscape for best results' },
          ].map((tip) => (
            <div key={tip.title} className="bg-white/[0.04] backdrop-blur border border-white/10 p-5 rounded-xl text-center">
              <div className="text-3xl mb-2">{tip.icon}</div>
              <h3 className="text-white font-semibold text-sm mb-1">{tip.title}</h3>
              <p className="text-slate-400 text-xs">{tip.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Certificate;
