const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1080, height: 1350 });

  const fileUrl = 'file:///' + path.resolve(__dirname, 'instagram-carousel.html').replace(/\\/g, '/');
  await page.goto(fileUrl, { waitUntil: 'networkidle0', timeout: 30000 });
  await new Promise(r => setTimeout(r, 2000));

  const slides = ['s1','s2','s3','s4','s5','s6','s7'];

  for (let i = 0; i < slides.length; i++) {
    const id = slides[i];
    const num = String(i + 1).padStart(2, '0');
    const el = await page.$('#' + id);
    if (!el) { console.log('Slide ' + id + ' nao encontrado'); continue; }

    const box = await el.boundingBox();
    await page.screenshot({
      path: `gabriel-coltz-slide-${num}.png`,
      clip: { x: box.x, y: box.y, width: 1080, height: 1350 }
    });
    console.log(`Slide ${num} salvo: gabriel-coltz-slide-${num}.png`);
  }

  await browser.close();
  console.log('Todos os slides capturados!');
})();
