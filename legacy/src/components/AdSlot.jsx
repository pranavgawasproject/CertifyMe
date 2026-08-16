import { useEffect, useRef } from 'react';

// Google AdSense ad slot component.
// Set VITE_ADSENSE_CLIENT in your env (e.g. "ca-pub-1234567890123456") to enable.
// If not set, this component renders nothing (so it's safe to ship before approval).
//
// Usage: <AdSlot slot="1234567890" format="auto" />
//
// To get a publisher ID:
// 1. Apply at https://www.google.com/adsense
// 2. Once approved, add your client ID to Vercel env vars as VITE_ADSENSE_CLIENT
// 3. Deploy — ads will start appearing automatically.

export default function AdSlot({ slot = '', format = 'auto', responsive = true, className = '' }) {
  const insRef = useRef(null);
  const client = import.meta.env.VITE_ADSENSE_CLIENT;

  useEffect(() => {
    // Only push ads if AdSense is configured AND the script has loaded
    if (client && insRef.current && window.adsbygoogle) {
      try {
        window.adsbygoogle.push({});
      } catch (e) {
        // AdSense sometimes throws if same slot is pushed twice — safe to ignore
      }
    }
  }, [client, slot]);

  // If no client configured, render a placeholder in dev, otherwise render nothing
  if (!client) {
    if (import.meta.env.DEV) {
      return (
        <div
          className={`bg-white/[0.02] border border-dashed border-white/10 rounded-lg p-4 text-center text-xs text-slate-500 ${className}`}
          aria-hidden="true"
        >
          Ad slot (placeholder — set <code className="text-[#C9A24B]">VITE_ADSENSE_CLIENT</code> to enable)
        </div>
      );
    }
    return null;
  }

  return (
    <ins
      ref={insRef}
      className={`adsbygoogle ${className}`}
      style={{ display: 'block' }}
      data-ad-client={client}
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive={responsive ? 'true' : 'false'}
    />
  );
}
