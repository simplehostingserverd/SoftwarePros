import PDFDocument from 'pdfkit';
import path from 'node:path';
import fs from 'node:fs/promises';

export const runtime = 'nodejs';

export async function GET() {
  const csvPath = path.join(process.cwd(), 'public', 'resources', 'risk-register-template.csv');
  const csv = await fs.readFile(csvPath, 'utf8');

  const doc = new PDFDocument({
    size: 'LETTER',
    margins: { top: 40, bottom: 40, left: 40, right: 40 },
  });
  const chunks: Buffer[] = [];
  const done = new Promise<Buffer>((resolve) => {
    doc.on('data', (c) => chunks.push(Buffer.from(c)));
    doc.on('end', () => resolve(Buffer.concat(chunks)));
  });

  doc.fontSize(18).text('Risk Register Template', { underline: true });
  doc.moveDown(0.5);
  doc.fontSize(10).fillColor('#666').text('Provided by SoftwarePros — https://softwarepros.org');
  doc.moveDown();
  doc.fillColor('#000');

  // Render CSV as table-like rows
  const rows = csv
    .split(/\r?\n/)
    .filter(Boolean)
    .map((r) => r.split(','));
  const colWidths = [60, 120, 150, 60, 60, 60, 140, 80, 80, 60, 100];

  for (let i = 0; i < rows.length; i++) {
    const yStart = (doc as unknown as { y: number }).y;
    const row = rows[i];
    if (i === 0) doc.font('Helvetica-Bold');
    else doc.font('Helvetica');
    row.forEach((cell, idx) => {
      const width = colWidths[idx] ?? 80;
      const options = { width, continued: idx < row.length - 1 } as const;
      doc.fontSize(9).text(cell, options);
    });
    doc.moveDown(0.5);
    // Ensure we start a new page if needed
    if ((doc as unknown as { y: number }).y - yStart > 680) doc.addPage();
  }

  doc.end();
  const buffer = await done;

  return new Response(buffer, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="risk-register-template.pdf"',
      'Content-Length': String(buffer.length),
    },
  });
}
