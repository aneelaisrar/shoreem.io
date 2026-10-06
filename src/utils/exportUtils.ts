import { ExportFormat } from '../types';

export function exportContent(
  title: string,
  content: string,
  format: ExportFormat,
  metadata?: {
    platform?: string;
    type?: string;
    tags?: string[];
  }
) {
  const sanitizedTitle = title.replace(/[^a-z0-9_-]/gi, '_').slice(0, 40) || 'Shoreem_Content';
  const timestamp = new Date().toISOString().split('T')[0];

  if (format === 'txt') {
    const textData = `=====================================================
SHOREEM.IO - CREATE SMARTER. GROW FASTER.
Content Asset: ${title}
Type: ${metadata?.type || 'AI Social Asset'}
Platform: ${metadata?.platform || 'Multi-platform'}
Date: ${new Date().toLocaleDateString()}
Created By: Shoreem AI Studio (Creator: Aneela Israr)
=====================================================

${content}

=====================================================
Generated with Shoreem.io (https://shoreem.io)
`;

    const blob = new Blob([textData], { type: 'text/plain;charset=utf-8' });
    triggerDownload(blob, `${sanitizedTitle}_${timestamp}.txt`);
    return;
  }

  if (format === 'csv') {
    const headers = ['Title', 'Type', 'Platform', 'Content', 'ExportDate', 'Brand'];
    const safeContent = content.replace(/"/g, '""');
    const safeTitle = title.replace(/"/g, '""');
    const row = [
      `"${safeTitle}"`,
      `"${metadata?.type || 'AI Generation'}"`,
      `"${metadata?.platform || 'General'}"`,
      `"${safeContent}"`,
      `"${timestamp}"`,
      `"Shoreem.io"`,
    ];

    const csvData = headers.join(',') + '\n' + row.join(',');
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8' });
    triggerDownload(blob, `${sanitizedTitle}_${timestamp}.csv`);
    return;
  }

  if (format === 'pdf') {
    // Generate a sleek, high-fidelity printable HTML document using a hidden iframe
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${title} - Shoreem.io PDF Export</title>
  <style>
    @page { margin: 20mm; size: A4; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: #0f172a;
      background: #ffffff;
      line-height: 1.6;
      margin: 0;
      padding: 24px;
    }
    .header {
      border-bottom: 2px solid #6366f1;
      padding-bottom: 16px;
      margin-bottom: 24px;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }
    .logo {
      font-size: 24px;
      font-weight: 800;
      color: #0f172a;
      letter-spacing: -0.5px;
    }
    .logo span { color: #6366f1; }
    .tagline {
      font-size: 11px;
      color: #64748b;
      font-weight: 500;
      margin-top: 2px;
    }
    .badge {
      background: #eef2ff;
      color: #4f46e5;
      padding: 4px 10px;
      border-radius: 6px;
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .title-box {
      margin-bottom: 24px;
    }
    .doc-title {
      font-size: 20px;
      font-weight: 700;
      color: #1e293b;
      margin: 0 0 6px 0;
    }
    .meta-line {
      font-size: 12px;
      color: #64748b;
    }
    .content-box {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      padding: 24px;
      font-size: 14px;
      white-space: pre-wrap;
      color: #334155;
      line-height: 1.8;
      margin-bottom: 30px;
    }
    .footer {
      border-top: 1px solid #e2e8f0;
      padding-top: 16px;
      font-size: 11px;
      color: #94a3b8;
      display: flex;
      justify-content: space-between;
    }
    @media print {
      body { padding: 0; }
      .no-print { display: none; }
    }
  </style>
</head>
<body>
  <div class="header">
    <div>
      <div class="logo">Shoreem<span>.io</span></div>
      <div class="tagline">Create Smarter. Grow Faster. · Created by Aneela Israr</div>
    </div>
    <div class="badge">${metadata?.type || 'AI Content Asset'}</div>
  </div>

  <div class="title-box">
    <h1 class="doc-title">${escapeHtml(title)}</h1>
    <div class="meta-line">
      Platform: <strong>${metadata?.platform || 'Multi-platform'}</strong> · 
      Date: <strong>${new Date().toLocaleDateString()}</strong> · 
      Status: Ready for Publishing
    </div>
  </div>

  <div class="content-box">${escapeHtml(content)}</div>

  <div class="footer">
    <div>Exported from Shoreem.io Creator Studio</div>
    <div>Aneela Israr · Global AI SaaS Platform</div>
  </div>
</body>
</html>
`;

    const iframe = document.createElement('iframe');
    iframe.style.position = 'fixed';
    iframe.style.right = '0';
    iframe.style.bottom = '0';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = '0';
    document.body.appendChild(iframe);

    try {
      const doc = iframe.contentWindow?.document;
      if (doc) {
        doc.open();
        doc.write(htmlContent);
        doc.close();
        setTimeout(() => {
          try {
            iframe.contentWindow?.focus();
            iframe.contentWindow?.print();
          } catch (e) {
            // Fallback download if print inside iframe is blocked
            const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
            triggerDownload(blob, `${sanitizedTitle}_${timestamp}.html`);
          }
          setTimeout(() => {
            if (document.body.contains(iframe)) {
              document.body.removeChild(iframe);
            }
          }, 1500);
        }, 300);
      }
    } catch (e) {
      // Direct file fallback
      const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
      triggerDownload(blob, `${sanitizedTitle}_${timestamp}.html`);
      if (document.body.contains(iframe)) {
        document.body.removeChild(iframe);
      }
    }
    return;
  }
}

function triggerDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
