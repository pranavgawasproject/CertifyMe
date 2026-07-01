import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from './Navbar';
import CertificatePreview from './CertificatePreview';
import SEO from './SEO';
import { decodeCertData } from '../utils/share';

function SharedCertificate() {
  const { data: encoded } = useParams();
  const [cert, setCert] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const decoded = decodeCertData(encoded);
    if (!decoded || (!decoded.recipientName && !decoded.event)) {
      setNotFound(true);
    } else {
      setCert(decoded);
    }
  }, [encoded]);

  if (notFound) {
    return (
      <div>
        <Navbar />
        <div className="min-h-[60vh] flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <div className="text-5xl mb-4">🔍</div>
            <h1 className="text-2xl font-bold text-white mb-2">Certificate not found</h1>
            <p className="text-slate-300 mb-6">This share link is invalid or has been corrupted.</p>
            <Link
              to="/"
              className="inline-block bg-gradient-to-r from-amber-500 via-pink-500 to-cyan-500 text-white font-semibold px-5 py-2.5 rounded-lg text-sm"
            >
              Create your own certificate →
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!cert) {
    return (
      <div>
        <Navbar />
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="animate-pulse text-slate-400">Loading certificate…</div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <SEO
        title={`Certificate — ${cert.recipientName}`}
        description={`Certificate of achievement awarded to ${cert.recipientName} for ${cert.event}`}
        path={`/c/${encoded}`}
      />
      <Navbar />

      <div className="container mx-auto px-4 sm:px-6 py-8 max-w-5xl">
        <div className="text-center mb-6 animate-fade-in">
          <div className="text-xs uppercase tracking-widest text-cyan-300/80 mb-2">Shared certificate</div>
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">
            <span className="bg-gradient-to-r from-amber-200 via-pink-200 to-cyan-200 bg-clip-text text-transparent">
              🎊 {cert.recipientName}
            </span>
          </h1>
          <p className="text-slate-300 text-sm">
            Awarded for <span className="text-cyan-300 font-medium">{cert.event}</span>
          </p>
        </div>

        <div className="rounded-lg overflow-hidden shadow-2xl border border-white/10 animate-scale-in">
          <CertificatePreview templateId={cert.templateId} data={cert} />
        </div>

        <div className="mt-8 text-center">
          <p className="text-slate-400 text-sm mb-4">Want to create your own?</p>
          <Link
            to="/"
            className="inline-block bg-gradient-to-r from-amber-500 via-pink-500 to-cyan-500 text-white font-semibold px-6 py-3 rounded-lg text-sm hover:scale-105 transition-transform"
          >
            🎓 Create a free certificate
          </Link>
          <p className="text-[11px] text-slate-500 mt-3">Powered by CertifyMe · Free, no sign-up</p>
        </div>
      </div>
    </div>
  );
}

export default SharedCertificate;
