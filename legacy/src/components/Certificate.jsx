import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import CertificatePreview from './CertificatePreview';
import SEO from './SEO';
import AdSlot from './AdSlot';
import { TEMPLATES } from '../data/templates';
import { buildShareUrl } from '../utils/share';
import { exportNodeToPdf } from '../utils/pdfExport';
import { getStorageItem, setStorageItem } from '../utils/storage';

function Certificate() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const recipientName = state?.recipientName || getStorageItem('cert_recipientName') || '';
  const event = state?.event || getStorageItem('cert_event') || '';
  const date = state?.date || getStorageItem('cert_date') || '';
  const issuer = state?.issuer || getStorageItem('cert_issuer') || '';
  const signature = state?.signature || getStorageItem('cert_signature') || '';
  const logoUrl = state?.logoUrl || getStorageItem('cert_logoUrl') || '';
  const selectedTemplate = state?.templateId || getStorageItem('cert_template') || 'classic-gold';


  const certificateRef = useRef(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);
  const [showSuccess, setShowSuccess] = useState('');
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

  useEffect(() => {
    if (recipientName && event) {
      setShareLink(buildShareUrl({
        recipientName, event, date, issuer, signature, templateId: selectedTemplate,
      }));
    }
  }, [recipientName, event, date, issuer, signature, selectedTemplate]);

  if (!recipientName || !event) return null;

  const downloadPng = async () => {
    if (!certificateRef.current) return;
    setIsDownloading(true);
    try {
      const { default: html2canvas } = await import('html2canvas');
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2, useCORS: true, backgroundColor: null, logging: false,
      });
      const link = document.createElement('a');
      link.download = `${recipientName.replace(/\s+/g, '_')}_${event.replace(/\s+/g, '_')}_certificate.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      setShowSuccess('PNG downloaded');
      setTimeout(() => setShowSuccess(''), 3000);
    } catch (err) {
      console.error('Download failed:', err);
      alert('Sorry, download failed. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  const downloadPdf = async () => {
    if (!certificateRef.current) return;
    setIsDownloadingPdf(true);
    try {
      await exportNodeToPdf(
        certificateRef.current,
        `${recipientName.replace(/\s+/g, '_')}_${event.replace(/\s+/g, '_')}_certificate.pdf`
      );
      setShowSuccess('PDF downloaded');
      setTimeout(() => setShowSuccess(''), 3000);
    } catch (err) {
      console.error('PDF failed:', err);
      alert('Sorry, PDF generation failed. Please try again.');
    } finally {
      setIsDownloadingPdf(false);
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
    setStorageItem('cert_template', tplId);
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
          ✅ {showSuccess} successfully!
        </div>
      )}

      <div className="container mx-auto px-4 sm:px-6 py-8">
        <div className="max-w-4xl mx-auto mb-8 animate-fade-in">
          <div className="bg-[#C9A24B]/10 backdrop-blur-xl p-6 sm:p-8 rounded-md border border-white/10  text-center">
            <div className="text-xs uppercase tracking-widest text-[#C9A24B]/80 mb-2">
              {currentTemplate.category} · {currentTemplate.name}
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">
              <span className="font-display text-[#C9A24B]">
                🎊 Congratulations, {recipientName}!
              </span>
            </h1>
            <p className="text-slate-300 text-base sm:text-lg">
              Your certificate for <span className="font-semibold text-[#C9A24B]">{event}</span> is ready.
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              <span className="bg-amber-500/20 text-amber-200 px-3 py-1 rounded-full text-xs">Template: {currentTemplate.name}</span>
              <span className="bg-emerald-500/20 text-emerald-200 px-3 py-1 rounded-full text-xs">✓ Ready to download</span>
              <span className="bg-[#C9A24B]/20 text-[#DAB86A] px-3 py-1 rounded-full text-xs">📐 A4 Landscape · 2x export</span>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto mb-8 animate-scale-in">
          <div
            ref={certificateRef}
            style={{ aspectRatio: '1.414 / 1', width: '100%' }}
            className="rounded-lg overflow-hidden  border border-white/10"
          >
            <CertificatePreview
              templateId={selectedTemplate}
              data={data}
              logoUrl={logoUrl}
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
                className="w-full px-3 py-2 rounded-lg bg-slate-900/60 border border-white/10 text-[#C9A24B] text-xs font-mono truncate"
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
        <div className="flex flex-col sm:flex-row justify-center gap-3 mb-6">
          <button
            className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all transform hover:scale-105 active:scale-95 shadow-lg ${
              isDownloading
                ? 'bg-slate-600 cursor-not-allowed'
                : 'bg-[#C9A24B] hover:brightness-105 text-[#0E1526]'
            }`}
            onClick={downloadPng}
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
            className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all transform hover:scale-105 active:scale-95 shadow-lg ${
              isDownloadingPdf
                ? 'bg-slate-600 cursor-not-allowed'
                : 'bg-[#8C2F39] hover:brightness-110 text-white'
            }`}
            onClick={downloadPdf}
            disabled={isDownloadingPdf}
          >
            {isDownloadingPdf ? (
              <>
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Generating PDF...
              </>
            ) : (
              <>📄 Download PDF</>
            )}
          </button>

          <button
            className="flex items-center justify-center gap-2 bg-[#8C2F39] hover:brightness-110 text-white px-6 py-3 rounded-lg font-semibold text-sm transition-all transform hover:scale-105 active:scale-95 shadow-lg"
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

        {/* Ad slot */}
        <div className="max-w-3xl mx-auto mb-12">
          <AdSlot slot="0000000002" className="min-h-[90px]" />
        </div>

        {/* Template switcher panel */}
        {showSwitcher && (
          <div className="max-w-5xl mx-auto mb-12 bg-white/[0.04] border border-white/10 rounded-md p-5 animate-fade-in">
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
                      ? 'border-[#C9A24B] ring-2 ring-[#C9A24B]/40'
                      : 'border-white/10 hover:border-white/30'
                  }`}
                >
                  <CertificatePreview templateId={tpl.id} data={data} logoUrl={logoUrl} />
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
            { icon: '💾', title: 'Save it', desc: 'Download as high-quality PNG or PDF' },
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
