import { PDFDocument, PDFName, PDFString, StandardFonts } from 'pdf-lib';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const pdfPath = 'C:\\Users\\gabri\\Downloads\\Imagem Prompt.pdf';

const bannerPath = 'C:\\Users\\gabri\\Downloads\\ChatGPT Image 20_06_2026, 12_19_50.png';
const bannerLink = 'https://pay.cakto.com.br/wu7rtmh_934673';

const exampleImages = [
  'C:\\Users\\gabri\\Desktop\\Gabriel IA\\Design sem nome (1).png',
  'C:\\Users\\gabri\\Desktop\\Gabriel IA\\{__prompt____black_and_white_202604301502.jpeg',
  'C:\\Users\\gabri\\Desktop\\Gabriel IA\\{__prompt____cinematic_low_key_202604301203.jpeg',
  'C:\\Users\\gabri\\Desktop\\Gabriel IA\\{__prompt____cinematic_low_key_202605012208.jpeg',
  'C:\\Users\\gabri\\Desktop\\Gabriel IA\\{__prompt____Create_a_bold_202605031901.jpeg',
  'C:\\Users\\gabri\\Desktop\\Gabriel IA\\{__prompt____Create_a_dark_202605011737.jpeg',
  'C:\\Users\\gabri\\Desktop\\Gabriel IA\\{__prompt____Create_a_hyper-realistic_202605012028.jpeg',
  'C:\\Users\\gabri\\Desktop\\Gabriel IA\\{__prompt____Create_a_hyper-realistic_202605021655.jpeg',
  'C:\\Users\\gabri\\Desktop\\Gabriel IA\\{__prompt____dramatic_black_and_202605042141 (1).jpeg',
  'C:\\Users\\gabri\\Desktop\\Gabriel IA\\{__prompt____high-fashion_streetwear_editorial_202604301520.jpeg'
];

async function addWebLink(pdfDoc, page, uri, rect) {
  const linkAnnotation = pdfDoc.context.register(
    pdfDoc.context.obj({
      Type: 'Annot',
      Subtype: 'Link',
      Rect: rect, // [x1, y1, x2, y2]
      Border: [0, 0, 0],
      A: {
        Type: 'Action',
        S: 'URI',
        URI: PDFString.of(uri), // Fix: explicitly wrap string in PDFString
      },
    })
  );

  const pageNode = page.node;
  if (!pageNode.has(PDFName.of('Annots'))) {
    pageNode.set(PDFName.of('Annots'), pdfDoc.context.obj([]));
  }
  pageNode.lookup(PDFName.of('Annots')).push(linkAnnotation);
}

async function main() {
  const pdfBytes = fs.readFileSync(pdfPath);
  const pdfDoc = await PDFDocument.load(pdfBytes);
  const pages = pdfDoc.getPages();
  
  if (pages.length < 2) {
    throw new Error('PDF does not have at least 2 pages');
  }
  
  const page2 = pages[1];
  
  // 1. Embed the banner image
  console.log('Embedding banner image...');
  const bannerBytes = fs.readFileSync(bannerPath);
  const bannerImage = await pdfDoc.embedPng(bannerBytes);
  
  // Margins & Dimensions for Page 2 Banner
  const margin = 40;
  const page2Width = page2.getWidth();
  const bannerWidth = page2Width - (margin * 2); // 515.28
  const bannerHeight = bannerWidth * (1024 / 1536); // 343.52pt (image is 1536x1024)
  
  // Place banner at y = 150
  const bannerX = margin;
  const bannerY = 150;
  
  console.log(`Drawing banner on Page 2 at X=${bannerX}, Y=${bannerY}, W=${bannerWidth}, H=${bannerHeight}`);
  page2.drawImage(bannerImage, {
    x: bannerX,
    y: bannerY,
    width: bannerWidth,
    height: bannerHeight,
  });
  
  // Bounding box for link annotation: [x1, y1, x2, y2]
  const rect = [bannerX, bannerY, bannerX + bannerWidth, bannerY + bannerHeight];
  await addWebLink(pdfDoc, page2, bannerLink, rect);
  console.log('Banner link annotation added.');

  // 2. Create Page 3 and Page 4 for prompt examples
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const imgSize = 163.76;
  const gap = 12;
  const gridStartX = 40;
  const gridStartY = 710;
  
  console.log('Cropping and embedding 10 example images...');
  
  let currentPage = null;
  
  for (let i = 0; i < exampleImages.length; i++) {
    const imgPath = exampleImages[i];
    console.log(`Processing image ${i + 1}: ${path.basename(imgPath)}`);
    
    // Crop center to square 800x800 using sharp
    const croppedBuffer = await sharp(imgPath)
      .resize(800, 800, { fit: 'cover', position: 'center' })
      .jpeg({ quality: 85 })
      .toBuffer();
      
    const pdfImg = await pdfDoc.embedJpg(croppedBuffer);
    
    const pageIndex = Math.floor(i / 6);
    
    if (pageIndex === 0) {
      if (i === 0) {
        console.log('Creating Page 3...');
        currentPage = pdfDoc.addPage([595.28, 841.89]);
        
        // Center Title on Page 3
        const titleText = 'Exemplos de Imagens do Pack';
        const titleSize = 18;
        const titleWidth = boldFont.widthOfTextAtSize(titleText, titleSize);
        const titleX = (595.28 - titleWidth) / 2;
        const titleY = 770;
        
        currentPage.drawText(titleText, {
          x: titleX,
          y: titleY,
          size: titleSize,
          font: boldFont,
        });
      }
    } else {
      if (i === 6) {
        console.log('Creating Page 4...');
        currentPage = pdfDoc.addPage([595.28, 841.89]);
      }
    }
    
    const localIndex = i % 6;
    const col = localIndex % 3;
    const row = Math.floor(localIndex / 3);
    
    const x = gridStartX + col * (imgSize + gap);
    const y = gridStartY - (row + 1) * imgSize - row * gap;
    
    console.log(`Drawing image ${i + 1} on Page ${pageIndex + 3} at Col=${col}, Row=${row} -> X=${x.toFixed(2)}, Y=${y.toFixed(2)}`);
    currentPage.drawImage(pdfImg, {
      x: x,
      y: y,
      width: imgSize,
      height: imgSize,
    });
  }
  
  // Save the PDF
  console.log('Saving modified PDF...');
  const pdfOutputBytes = await pdfDoc.save();
  fs.writeFileSync(pdfPath, pdfOutputBytes);
  console.log('PDF saved successfully!');
}

main().catch(console.error);
