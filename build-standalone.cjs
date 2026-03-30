/**
 * build-standalone.cjs
 * Gera curriculo-standalone.html — arquivo único sem dependências externas
 * Fontes Google → base64 | Imagens locais → base64 | SVGs → inline
 */

const fs   = require('fs');
const path = require('path');
const https = require('https');
const http  = require('http');

const BASE_DIR = __dirname;
const INPUT    = path.join(BASE_DIR, 'index.html');
const OUTPUT   = path.join(BASE_DIR, 'curriculo-standalone.html');

// ─── helpers ─────────────────────────────────────────────────────────────────

function fetch(url) {
  return new Promise((resolve, reject) => {
    const mod = url.startsWith('https') ? https : http;
    mod.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetch(res.headers.location).then(resolve).catch(reject);
      }
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks)));
      res.on('error', reject);
    }).on('error', reject);
  });
}

function mimeFromUrl(url) {
  if (url.endsWith('.woff2')) return 'font/woff2';
  if (url.endsWith('.woff'))  return 'font/woff';
  if (url.endsWith('.ttf'))   return 'font/ttf';
  if (/\.(png)/.test(url))   return 'image/png';
  if (/\.(jpe?g)/.test(url)) return 'image/jpeg';
  if (/\.(gif)/.test(url))   return 'image/gif';
  if (/\.(svg)/.test(url))   return 'image/svg+xml';
  if (/\.(webp)/.test(url))  return 'image/webp';
  return 'application/octet-stream';
}

function imgMimeFromFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const map = { '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
                '.gif': 'image/gif', '.svg': 'image/svg+xml', '.webp': 'image/webp' };
  return map[ext] || 'image/png';
}

// ─── 1. baixa CSS das fontes Google e substitui cada url() por base64 ────────

async function inlineFonts(googleFontsUrl) {
  console.log('  → Baixando CSS do Google Fonts...');
  const cssBuffer = await fetch(googleFontsUrl);
  let css = cssBuffer.toString('utf8');

  // Encontra todos os urls de fontes no CSS
  const urlRegex = /url\((https:\/\/fonts\.gstatic\.com\/[^)]+)\)/g;
  const fontUrls = [...css.matchAll(urlRegex)].map(m => m[1]);
  const unique   = [...new Set(fontUrls)];

  console.log(`  → ${unique.length} arquivos de fonte para baixar...`);

  for (const url of unique) {
    try {
      const buf  = await fetch(url);
      const mime = mimeFromUrl(url);
      const b64  = `url(data:${mime};base64,${buf.toString('base64')})`;
      css = css.split(`url(${url})`).join(b64);
      process.stdout.write('.');
    } catch (e) {
      console.warn(`\n  ⚠ Falhou fonte: ${url}`);
    }
  }
  console.log('\n  ✓ Fontes embutidas');
  return `<style>\n/* Google Fonts — embutido */\n${css}\n</style>`;
}

// ─── 2. converte imagens locais para base64 ───────────────────────────────────

function inlineLocalImages(html) {
  // src="images/..." ou src='images/...'
  return html.replace(/src=["']([^"']+\.(png|jpe?g|gif|svg|webp))["']/gi, (match, imgPath) => {
    const abs = path.join(BASE_DIR, imgPath.replace(/\//g, path.sep));
    if (!fs.existsSync(abs)) {
      console.warn(`  ⚠ Imagem não encontrada: ${abs}`);
      return match;
    }
    const buf  = fs.readFileSync(abs);
    const mime = imgMimeFromFile(abs);
    const b64  = buf.toString('base64');
    console.log(`  ✓ ${imgPath} (${(buf.length/1024).toFixed(0)}kb)`);
    return `src="data:${mime};base64,${b64}"`;
  });
}

// ─── 3. remove os <link> do Google Fonts e substitui por <style> inline ───────

function removeFontLinks(html) {
  return html
    .replace(/<link[^>]+fonts\.googleapis\.com[^>]*\/>/gi, '')
    .replace(/<link[^>]+fonts\.gstatic\.com[^>]*\/>/gi, '')
    .replace(/<link[^>]+preconnect[^>]*>/gi, '');
}

// ─── 4. remove animações fade-up no standalone (garante visibilidade total) ──

function fixMobileAnimations(html) {
  // No arquivo standalone, remove opacity:0 do fade-up — conteúdo sempre visível
  // Substitui a regra CSS que esconde os elementos
  html = html.replace(
    /\.fade-up\s*\{[^}]*opacity\s*:\s*0[^}]*\}/gs,
    match => match.replace('opacity: 0', 'opacity: 1').replace('transform: translateY(28px)', 'transform: translateY(0)')
  );

  // Remove transition-delay das classes .d1–.d6 (não faz sentido sem animação)
  html = html.replace(/\.fade-up\.d[1-6]\s*\{[^}]*transition-delay[^}]*\}/gs, '');

  // Garante que .visible não precise ser adicionado (tudo já visível)
  html = html.replace(
    '.fade-up.visible { opacity: 1; transform: translateY(0); }',
    '/* standalone: fade-up sempre visível */'
  );

  console.log('  ✓ Animações removidas — conteúdo sempre visível no standalone');
  return html;
}

// ─── main ─────────────────────────────────────────────────────────────────────

(async () => {
  console.log('🚀 Build standalone iniciado\n');

  let html = fs.readFileSync(INPUT, 'utf8');

  // Extrai a URL do Google Fonts
  const fontMatch = html.match(/href="(https:\/\/fonts\.googleapis\.com\/css2\?[^"]+)"/);
  if (!fontMatch) {
    console.error('❌ URL do Google Fonts não encontrada no index.html');
    process.exit(1);
  }
  const googleFontsUrl = fontMatch[1];
  console.log('📝 Google Fonts URL:', googleFontsUrl.substring(0, 80) + '...');

  // 1. Baixa e embute as fontes
  const fontStyle = await inlineFonts(googleFontsUrl);

  // 2. Remove os links externos de fontes
  html = removeFontLinks(html);

  // 3. Injeta o <style> com as fontes logo após <head>
  html = html.replace('<head>', '<head>\n' + fontStyle);

  // 4. Corrige animações para mobile
  console.log('\n📱 Corrigindo animações para mobile...');
  html = fixMobileAnimations(html);

  // 5. Converte imagens locais para base64
  console.log('\n🖼  Convertendo imagens...');
  html = inlineLocalImages(html);

  // 6. Salva o arquivo final
  fs.writeFileSync(OUTPUT, html, 'utf8');

  const sizeKb = (fs.statSync(OUTPUT).size / 1024).toFixed(0);
  console.log(`\n✅ Arquivo gerado: curriculo-standalone.html`);
  console.log(`   Tamanho: ${sizeKb} KB`);
  console.log(`   Abra no navegador — funciona sem internet, sem pasta de imagens.`);
})();
