import { useState, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import Papa from 'papaparse';
import JSZip from 'jszip';
import Navbar from './Navbar';
import CertificatePreview from './CertificatePreview';
import TemplateRenderer from '../templates/TemplateRenderer';
import SEO from './SEO';

const SAMPLE_CSV = `recipientName,event,date,issuer,signature,template
Jane Anderson,Advanced Web Development,July 2026,CertifyMe Academy,Dr. Sharma,classic-gold
Rahul Mehta,Python for Data Science,July 2026,CertifyMe Academy,Prof. Iyer,royal-blue
Sarah Johnson,UX Design Workshop,July 2026,DesignHub,M. Chen,modern-minimal
Alex Kim,Hackathon Winner 2026,July 2026,TechFest,,tech-neon
Priya Patel,Volunteer of the Year,July 2026,Community Cares,,botanical`;

function BulkGenerate() {
  const [rows, setRows] = useState([]);
  const [error, setError] = useState('');
  const [isZipping, setIsZipping] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef(null);

  const defaultDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  const normalizeRow = (row, idx) => ({
    recipientName: row.recipientName || row.name || row.recipient || '',
    event: row.event || row.course || row.title || '',
    date: row.date || defaultDate,
    issuer: row.issuer || row.organization || row.org || 'CertifyMe',
    signature: row.signature || '',
    templateId: row.template || row.templateId || 'classic-gold',
    _idx: idx,
  });

  const handleFile = (file) => {
    setError('');
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        if (!results.data || results.data.length === 0) {
          setError('CSV appears to be empty.');
          return;
        }
        const normalized = results.data.map(normalizeRow);
        const invalid = normalized.filter((r) => !r.recipientName || !r.event);
        if (invalid.length > 0) {
          setError(`${invalid.length} row(s) missing required "recipientName" or "event" column. They were skipped.`);
        }
        const valid = normalized.filter((r) => r.recipientName && r.event);
        setRows(valid);
      },
      error: (err) => setError(`Failed to parse CSV: ${err.message}`),
    });
  };

  const handleFileInput = (e) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const loadSample = () => {
    Papa.parse(SAMPLE_CSV, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const normalized = results.data.map(normalizeRow);
        setRows(normalized);
        setError('');
      },
    });
  };

  const removeRow = (idx) => setRows(rows.filter((r) => r._idx !== idx));

  const downloadAllZip = async () => {
    if (rows.length === 0) return;
    setIsZipping(true);
    setProgress(0);
    try {
      const { default: html2canvas } = await import('html2canvas');
      const zip = new JSZip();

      // Off-screen render container at fixed A4 landscape size
      const container = document.createElement('div');
      container.style.position = 'fixed';
      container.style.left = '-9999px';
      container.style.top = '0';
      container.style.width = '1200px';
      container.style.height = '848px';
      document.body.appendChild(container);

      const holder = document.createElement('div');
      holder.style.width = '100%';
      holder.style.height = '100%';
      container.appendChild(holder);

      const root = createRoot(holder);

      for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        holder.innerHTML = '';

        await new Promise((resolve) => {
          root.render(<TemplateRenderer templateId={row.templateId} data={row} />);
          // Give React + fonts a moment to paint
          setTimeout(resolve, 250);
        });

        const canvas = await html2canvas(holder, {
          scale: 2,
          useCORS: true,
          backgroundColor: null,
          logging: false,
          width: 1200,
          height: 848,
        });

        const blob = await new Promise((res) => canvas.toBlob(res, 'image/png'));
        const safeName = (row.recipientName || 'certificate').replace(/[^a-z0-9]+/gi, '_');
        zip.file(`${String(i + 1).padStart(2, '0')}_${safeName}.png`, blob);

        setProgress(Math.round(((i + 1) / rows.length) * 100));
      }

      root.unmount();
      document.body.removeChild(container);

      const zipBlob = await zip.generateAsync({ type: 'blob' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(zipBlob);
      link.download = `certifyme_bulk_${rows.length}_certificates.zip`;
      link.click();
      URL.revokeObjectURL(link.href);
    } catch (err) {
      console.error(err);
      setError(`Bulk export failed: ${err.message}`);
    } finally {
      setIsZipping(false);
      setProgress(0);
    }
  };

  return (
    <div>
      <SEO
        title="Bulk Certificate Generator — CSV to PNG (Free)"
        description="Upload a CSV and generate dozens of personalized certificates in one click. Each row becomes a high-resolution PNG, downloaded as a ZIP. Free, no sign-up. Perfect for teachers, HR, and event organizers."
        path="/bulk"
        keywords="bulk certificate generator, csv to certificate, multiple certificates, batch certificate maker, certificate from excel"
      />
      <Navbar />

      <section className="px-4 sm:px-6 pt-12 pb-8">
        <div className="container mx-auto max-w-5xl text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-amber-200 via-pink-200 to-cyan-200 bg-clip-text text-transparent">
              Bulk Certificate Generator
            </span>
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto">
            Upload a CSV with your recipients. Get a ZIP of personalized PNG certificates in one click. No sign-up, no limits, runs entirely in your browser.
          </p>
        </div>
      </section>

      {/* Upload zone */}
      <section className="px-4 sm:px-6 pb-8">
        <div className="container mx-auto max-w-3xl">
          <div
            className="border-2 border-dashed border-white/15 rounded-2xl p-8 text-center hover:border-cyan-400/50 transition-colors cursor-pointer bg-white/[0.02]"
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const file = e.dataTransfer.files?.[0];
              if (file) handleFile(file);
            }}
          >
            <div className="text-4xl mb-3">📁</div>
            <p className="text-white font-medium mb-1">Drop your CSV here or click to upload</p>
            <p className="text-slate-400 text-xs mb-4">Required columns: <code className="text-cyan-300">recipientName</code>, <code className="text-cyan-300">event</code>. Optional: date, issuer, signature, template</p>
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv,text/csv"
              onChange={handleFileInput}
              className="hidden"
            />
            <div className="flex flex-wrap gap-2 justify-center mt-3">
              <button
                onClick={(e) => { e.stopPropagation(); loadSample(); }}
                className="text-xs px-4 py-2 rounded-full bg-white/5 border border-white/15 text-slate-200 hover:bg-white/10"
              >
                ✨ Load sample data
              </button>
              <a
                href={`data:text/csv;charset=utf-8,${encodeURIComponent(SAMPLE_CSV)}`}
                download="certifyme_template.csv"
                onClick={(e) => e.stopPropagation()}
                className="text-xs px-4 py-2 rounded-full bg-white/5 border border-white/15 text-slate-200 hover:bg-white/10"
              >
                ⬇️ Download CSV template
              </a>
            </div>
          </div>
          {error && <p className="text-amber-300 text-sm mt-3 text-center">⚠ {error}</p>}
        </div>
      </section>

      {/* Results */}
      {rows.length > 0 && (
        <section className="px-4 sm:px-6 pb-16">
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <div>
                <h2 className="text-xl font-bold text-white">{rows.length} certificate{rows.length !== 1 ? 's' : ''} ready</h2>
                <p className="text-slate-400 text-xs">Preview below · click any to remove</p>
              </div>
              <button
                onClick={downloadAllZip}
                disabled={isZipping}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all ${
                  isZipping
                    ? 'bg-slate-600 cursor-wait'
                    : 'bg-gradient-to-r from-emerald-500 to-green-600 hover:shadow-lg hover:shadow-emerald-500/30 text-white hover:scale-105'
                }`}
              >
                {isZipping ? (
                  <>
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Generating ZIP… {progress}%
                  </>
                ) : (
                  <>📦 Download all as ZIP</>
                )}
              </button>
            </div>

            {isZipping && (
              <div className="w-full bg-slate-800 rounded-full h-2 mb-6 overflow-hidden">
                <div className="bg-gradient-to-r from-amber-500 via-pink-500 to-cyan-500 h-full transition-all" style={{ width: `${progress}%` }} />
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {rows.map((row) => (
                <div key={row._idx} className="group relative">
                  <div className="rounded-lg overflow-hidden border border-white/10 shadow-lg">
                    <CertificatePreview templateId={row.templateId} data={row} />
                  </div>
                  <div className="mt-2 px-1 flex items-center justify-between">
                    <div className="min-w-0">
                      <div className="text-white text-sm font-medium truncate">{row.recipientName}</div>
                      <div className="text-slate-500 text-xs truncate">{row.event}</div>
                    </div>
                    <button
                      onClick={() => removeRow(row._idx)}
                      className="text-slate-400 hover:text-red-400 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                      aria-label="Remove"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Help section */}
      <section className="px-4 sm:px-6 pb-20">
        <div className="container mx-auto max-w-3xl">
          <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-6">
            <h2 className="text-white font-bold text-lg mb-4">CSV format</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-slate-300">
                <thead>
                  <tr className="text-left border-b border-white/10">
                    <th className="py-2 pr-4">Column</th>
                    <th className="py-2 pr-4">Required</th>
                    <th className="py-2">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {[
                    ['recipientName', 'Yes', 'Full name of the certificate recipient'],
                    ['event', 'Yes', 'Course, workshop, achievement or event name'],
                    ['date', 'No', 'Date shown on certificate. Defaults to today'],
                    ['issuer', 'No', 'Issuing organization. Defaults to "CertifyMe"'],
                    ['signature', 'No', 'Signature name (rendered in script font)'],
                    ['template', 'No', 'Template ID. Defaults to "classic-gold". See templates page'],
                  ].map(([col, req, desc]) => (
                    <tr key={col}>
                      <td className="py-2 pr-4"><code className="text-cyan-300">{col}</code></td>
                      <td className="py-2 pr-4">{req === 'Yes' ? <span className="text-red-400">{req}</span> : req}</td>
                      <td className="py-2">{desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-slate-400 text-xs mt-4">
              💡 Tip: To find valid template IDs, visit the <a href="/templates" className="text-cyan-400 underline">templates page</a>. Examples: <code className="text-cyan-300">classic-gold</code>, <code className="text-cyan-300">royal-blue</code>, <code className="text-cyan-300">tech-neon</code>, <code className="text-cyan-300">art-deco</code>.
            </p>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 py-6 text-center text-xs text-slate-500">
        All processing happens locally in your browser · No data uploaded
      </footer>
    </div>
  );
}

export default BulkGenerate;
