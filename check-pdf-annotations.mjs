import { PDFDocument, PDFName } from 'pdf-lib';
import fs from 'fs';

const pdfPath = 'C:\\Users\\gabri\\Downloads\\Imagem Prompt.pdf';

async function main() {
  const pdfBytes = fs.readFileSync(pdfPath);
  const pdfDoc = await PDFDocument.load(pdfBytes);
  const pages = pdfDoc.getPages();
  const page2 = pages[1];
  
  const annots = page2.node.lookup(PDFName.of('Annots'));
  if (!annots) {
    console.log('No annotations found on Page 2');
    return;
  }
  
  console.log(`Page 2 has ${annots.size()} annotations.`);
  for (let i = 0; i < annots.size(); i++) {
    const annot = annots.lookup(i);
    console.log(`Annotation ${i + 1}:`);
    console.log('Type:', annot.lookup(PDFName.of('Type'))?.toString());
    console.log('Subtype:', annot.lookup(PDFName.of('Subtype'))?.toString());
    console.log('Rect:', annot.lookup(PDFName.of('Rect'))?.toString());
    const action = annot.lookup(PDFName.of('A'));
    if (action) {
      console.log('Action Type:', action.lookup(PDFName.of('Type'))?.toString());
      console.log('Action S:', action.lookup(PDFName.of('S'))?.toString());
      console.log('Action URI:', action.lookup(PDFName.of('URI'))?.toString());
    }
  }
}

main().catch(console.error);
