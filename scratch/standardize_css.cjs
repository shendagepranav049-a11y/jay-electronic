const fs = require('fs');
const path = require('path');

const cssDir = path.join(__dirname, '..', 'src', 'components');

fs.readdirSync(cssDir).forEach(file => {
  if (file.endsWith('.css')) {
    const filePath = path.join(cssDir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // 1. Standardize extreme padding (180px gives a premium feel compared to 120px)
    content = content.replace(/padding:\s*1[0-9]{2}px\s+0/g, 'padding: 180px 0');
    content = content.replace(/padding-top:\s*1[0-9]{2}px/g, 'padding-top: 180px');
    content = content.replace(/padding-bottom:\s*1[0-9]{2}px/g, 'padding-bottom: 180px');

    // 2. Remove heavy colored glows and replace with subtle glass/standard shadows
    content = content.replace(/box-shadow:\s*0\s*0\s*[0-9]+px\s*var\(--accent[^)]+\)/g, 'box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1)');
    content = content.replace(/box-shadow:\s*0\s*[0-9]+px\s*[0-9]+px\s*var\(--accent[^)]+\)/g, 'box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2)');
    content = content.replace(/border:\s*[1-3]px\s*solid\s*var\(--accent[^)]+\)/g, 'border: 1px solid rgba(255, 255, 255, 0.05)');

    // 3. Make typography more standard and premium
    // Replacing overly bold 800/900 font-weights with 600 or 700, which look cleaner on tech sites
    content = content.replace(/font-weight:\s*900/g, 'font-weight: 700');
    content = content.replace(/font-weight:\s*800/g, 'font-weight: 600');
    
    // Tighten letter spacing slightly on big headings for that Apple/Linear look
    content = content.replace(/letter-spacing:\s*-3px/g, 'letter-spacing: -1.5px');
    content = content.replace(/letter-spacing:\s*-2px/g, 'letter-spacing: -1px');
    content = content.replace(/letter-spacing:\s*-1px/g, 'letter-spacing: -0.5px');

    fs.writeFileSync(filePath, content);
    console.log(`Standardized CSS in ${file}`);
  }
});
