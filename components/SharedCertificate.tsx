'use client';

import Link from 'next/link';
import Navbar from './Navbar';
import CertificatePreview from './CertificatePreview';
import type { CertificateData } from '@/lib/types';

interface SharedCertificateProps {
  data: string;
  // Pre-decoded certificate (from the Server Component page) — optional.
  // If provided, the client component skips decoding and renders immediately.
  initialCert?: CertificateData | null;
}

export default function SharedCertificate({ data, initialCert }: SharedCertificateProps) {
  // If the server already decoded successfully, use that.
  if (!initialCert || (!initialCert.recipientName && !initialCert.event)) {
    return (
      <div>
        <Navbar />
        <div className="min-h-[60vh] flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <div className="text-5xl mb-4">🔍</div>
            <h1 className="text-2xl font-bold text-white mb-2">Certificate not found</h1>
            <p className="text-slate-300 mb-6">
              This share link is invalid or has been corrupted.
            </p>
            <Link
              href="/"
              className="inline-block bg-[#8C2F39] text-white font-semibold px-5 py-2.5 rounded-lg text-sm"
            >
              Create your own certificate →
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const cert = initialCert;

  return (
    <div>
      <Navbar />

      <div className="container mx-auto px-4 sm:px-6 py-8 max-w-5xl">
        <div className="text-center mb-6 animate-fade-in">
          <div className="text-xs uppercase tracking-widest text-[#C9A24B]/80 mb-2">
            Shared certificate
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">
            <span className="font-display text-[#C9A24B]">🎊 {cert.recipientName}</span>
          </h1>
          <p className="text-slate-300 text-sm">
            Awarded for <span className="text-[#C9A24B] font-medium">{cert.event}</span>
          </p>
        </div>

        <div className="rounded-lg overflow-hidden border border-white/10 animate-scale-in">
          <CertificatePreview templateId={cert.templateId} data={cert} />
        </div>

        <div className="mt-8 text-center">
          <p className="text-slate-400 text-sm mb-4">Want to create your own?</p>
          <Link
            href="/"
            className="inline-block bg-[#8C2F39] text-white font-semibold px-6 py-3 rounded-lg text-sm hover:scale-105 transition-transform"
          >
            🎓 Create a free certificate
          </Link>
          <p className="text-[11px] text-slate-500 mt-3">
            Powered by CertifyMe · Free, no sign-up · ref {data.slice(0, 8)}
          </p>
        </div>
      </div>
    </div>
  );
}
