import fs from 'node:fs/promises';
import path from 'node:path';
import PDFDocument from 'pdfkit';

export const runtime = 'nodejs';

export async function GET() {
  const mdPath = path.join(process.cwd(), 'public', 'resources', 'hipaa-security-checklist.md');
  const content = await fs.readFile(mdPath, 'utf8');

  const doc = new PDFDocument({
    size: 'LETTER',
    margins: { top: 50, bottom: 50, left: 50, right: 50 },
  });

  const chunks: Buffer[] = [];
  const done = new Promise<Buffer>((resolve) => {
    doc.on('data', (c) => chunks.push(Buffer.from(c)));
    doc.on('end', () => resolve(Buffer.concat(chunks)));
  });

  // Header
  doc.fontSize(18).text('HIPAA Security Rule Checklist', { underline: true });
  doc.moveDown(0.5);
  doc.fontSize(10).fillColor('#666666').text('Provided by SoftwarePros — https://softwarepros.org');
  doc.moveDown();
  doc.fillColor('#000000');

  // Simple markdown-like rendering
  const lines = content.split(/\r?\n/);
  for (const line of lines) {
    if (!line.trim()) {
      doc.moveDown(0.3);
      continue;
    }
    if (line.startsWith('# ')) {
      doc.moveDown(0.3);
      doc.fontSize(16).text(line.replace(/^#\s+/, ''));
      doc.fontSize(12);
      continue;
    }
    if (line.startsWith('## ')) {
      doc.moveDown(0.2);
      doc.fontSize(13).text(line.replace(/^##\s+/, ''), { continued: false });
      doc.fontSize(12);
      continue;
    }
    if (line.startsWith('- ')) {
      const text = `• ${line.replace(/^-\s+/, '')}`;
      doc.fontSize(12).text(text, { indent: 12 });
      continue;
    }
    doc.fontSize(12).text(line);
  }

  doc.end();
  const buffer = await done;

  return new Response(buffer, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="hipaa-security-checklist.pdf"',
      'Content-Length': String(buffer.length),
    },
  });
}
