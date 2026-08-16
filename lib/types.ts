/**
 * Shared types for CertifyMe.
 */

/**
 * The core certificate payload that every template renders.
 * `templateId` is included so a shared certificate knows which template to use.
 */
export interface CertificateData {
  recipientName: string;
  event: string;
  date: string;
  issuer: string;
  signature: string;
  templateId?: string;
  logoUrl?: string;
}

/**
 * CSV-derived row in bulk generation. Same shape as CertificateData plus
 * a stable internal index used for keys and removal.
 */
export interface CsvBatchRow extends CertificateData {
  _idx: number;
}

/**
 * Metadata describing a single template (id, name, category, accent color, blurb).
 * The actual React component is wired up separately in TemplateRenderer.
 */
export interface TemplateMeta {
  id: string;
  name: string;
  category: string;
  accent: string;
  description: string;
}

/**
 * Props shared by every template component.
 */
export interface TemplateProps {
  data: CertificateData;
  logoUrl?: string;
}
