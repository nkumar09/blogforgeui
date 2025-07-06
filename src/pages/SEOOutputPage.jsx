import { useLocation } from "react-router-dom";
import PageLayout from "../components/PageLayout";
import { toast } from "react-toastify";

// Download as plain text
function downloadAsTxt(filename, seo, draft) {
  const text = `
SEO Title:
${seo.title}

Meta Description:
${seo.description}

Keywords:
${seo.keywords.join(", ")}

Approved Blog Draft:
${draft}
  `.trim();

  const blob = new Blob([text], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  URL.revokeObjectURL(link.href);
  toast.success(`Downloaded ${filename} ✅`);
}

// Download as .doc (Word-compatible)
function downloadAsDoc(filename, seo, draft) {
  const htmlContent = `
    <h1>SEO Title</h1>
    <p>${seo.title}</p>
    <h1>Meta Description</h1>
    <p>${seo.description}</p>
    <h1>Keywords</h1>
    <p>${seo.keywords.join(", ")}</p>
    <h1>Approved Blog Draft</h1>
    <pre>${draft.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</pre>
  `;

  const fullDoc = `
    <html xmlns:o='urn:schemas-microsoft-com:office:office'
          xmlns:w='urn:schemas-microsoft-com:office:word'
          xmlns='http://www.w3.org/TR/REC-html40'>
    <head><meta charset='utf-8'><title>Document</title></head>
    <body>${htmlContent}</body></html>
  `;

  const blob = new Blob([fullDoc], { type: "application/msword" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  URL.revokeObjectURL(link.href);
  toast.success(`Downloaded ${filename} ✅`);
}

// Download as PDF using window.print() for simplicity (quick solution)
function buildPrintableContent(seo, draft) {
  return `
SEO Title:
${seo.title}

Meta Description:
${seo.description}

Keywords:
${seo.keywords.join(", ")}

Approved Blog Draft:
${draft}
  `.trim();
}

function printAsPdf(content) {
  const printWindow = window.open("", "_blank");
  printWindow.document.write(`
    <html>
      <head>
        <title>Blog Output</title>
        <style>
          body { font-family: sans-serif; margin: 40px; color: #333; }
          h1 { font-size: 24px; margin-bottom: 20px; }
          pre { white-space: pre-wrap; word-wrap: break-word; }
        </style>
      </head>
      <body>
        <pre>${content.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</pre>
      </body>
    </html>
  `);
  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
  printWindow.close();
  toast.success("Opened print dialog for PDF ✅");
}

// Copy All data to Clipboard
function copyAllToClipboard(title, description, keywords, draft) {
  const text = `
SEO Title:
${title}

Meta Description:
${description}

Keywords:
${keywords.join(", ")}

Approved Blog Draft:
${draft}
  `.trim();

  navigator.clipboard.writeText(text)
    .then(() => toast.success("Content copied to clipboard! 🎉"))
    .catch(err => toast.error("Failed to copy: " + err));
}

export default function SEOOutputPage() {
  const location = useLocation();
  const seo = location.state?.seo;
  const draft = location.state?.draft;

  if (!seo || !draft) {
    return (
      <PageLayout>
        <div className="text-lg text-gray-500">Missing data. Please complete the previous steps first.</div>
      </PageLayout>
    );
  }

  return (
    <PageLayout
      sidebar={
        <div>
          <h2 className="text-2xl font-bold mb-2 text-blue-300">Final Step: SEO & Output</h2>
          <p className="text-gray-400">Ready to publish or copy your optimized post!</p>
        </div>
      }
    >
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold text-blue-200 mb-1">SEO Title</h3>
          <div className="bg-neutral-900/80 backdrop-blur-md border border-neutral-700 rounded p-4 text-gray-100">{seo.title}</div>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-blue-200 mb-1">Meta Description</h3>
          <div className="bg-neutral-900/80 backdrop-blur-md border border-neutral-700 rounded p-4 text-gray-100">{seo.description}</div>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-blue-200 mb-1">Keywords</h3>
          <div className="flex flex-wrap gap-2">
            {seo.keywords.map((kw, i) => (
              <span key={i} className="bg-blue-900/60 text-blue-200 px-2 py-1 rounded text-sm">{kw}</span>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-blue-200 mb-1">Approved Blog Draft</h3>
          <div className="bg-neutral-900/80 backdrop-blur-md border border-neutral-700 rounded p-4 text-gray-100 whitespace-pre-line leading-relaxed max-h-[50vh] overflow-auto shadow-lg
            transition-transform duration-200 ease-in-out hover:scale-[1.01]">
            {draft}
          </div>
        </div>
        <button
          onClick={() => copyAllToClipboard(seo.title, seo.description, seo.keywords, draft)}
          className="bg-blue-700 text-white font-semibold py-2 px-6 rounded hover:bg-blue-800
            transition-all duration-200 ease-in-out focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 hover:shadow-lg active:scale-95">
          Copy All to Clipboard
        </button>
        <div className="flex flex-wrap gap-4 mt-6">
          <button
            onClick={() => downloadAsTxt("blog-output.txt", seo, draft)}
            className="bg-gray-700 text-white font-semibold py-2 px-6 rounded hover:bg-gray-800
              transition-all duration-200 ease-in-out focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 hover:shadow-lg active:scale-95">
            Download as .txt
          </button>

          <button
            onClick={() => downloadAsDoc("blog-output.doc", seo, draft)}
            className="bg-gray-700 text-white font-semibold py-2 px-6 rounded hover:bg-gray-800
              transition-all duration-200 ease-in-out focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 hover:shadow-lg active:scale-95">
            Download as .doc
          </button>

          <button
            onClick={() => printAsPdf(buildPrintableContent(seo, draft))}
            className="bg-gray-700 text-white font-semibold py-2 px-6 rounded hover:bg-gray-800
              transition-all duration-200 ease-in-out focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 hover:shadow-lg active:scale-95">
            Download as PDF
          </button>
        </div>
      </div>
    </PageLayout>
  );
}