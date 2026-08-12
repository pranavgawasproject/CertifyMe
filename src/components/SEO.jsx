import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://certify-me-five.vercel.app';
const DEFAULT_OG = `${SITE_URL}/og-image.png`;

export default function SEO({ title, description, path = '', image = DEFAULT_OG, keywords }) {
  const fullTitle = title
    ? `${title} | CertifyMe`
    : 'CertifyMe — Free Certificate Maker | 20 Templates, Live Preview';
  const url = `${SITE_URL}${path}`;
  const desc =
    description ||
    'Create professional certificates in seconds. 20 designer templates, live preview, PNG download, CSV bulk generation. Free, no sign-up. Perfect for teachers, HR, events & online courses.';

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="CertifyMe" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}
