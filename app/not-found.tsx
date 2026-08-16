import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-5xl mb-4">🔍</div>
        <h1 className="text-3xl font-bold text-white mb-2 font-display">
          Page not found
        </h1>
        <p className="text-slate-300 text-sm mb-6">
          The page you are looking for does not exist. It may have been moved or removed.
        </p>
        <Link
          href="/"
          className="inline-block bg-[#8C2F39] text-white font-semibold px-5 py-2.5 rounded-lg text-sm hover:scale-105 transition-transform"
        >
          Back to CertifyMe home →
        </Link>
      </div>
    </main>
  );
}
