const fs = require('fs');
const path = require('path');

// 1. Update Navbar CSS
const navbarCssPath = path.join(__dirname, '..', 'src', 'components', 'Navbar.css');
if (fs.existsSync(navbarCssPath)) {
  let content = fs.readFileSync(navbarCssPath, 'utf8');

  // Replace bottom border with gradient border
  content = content.replace(
    /border-bottom:\s*1px solid\s*rgba\(255, 255, 255, 0\.07\);/g,
    'border-bottom: 2px solid transparent; border-image: linear-gradient(90deg, #F5B928, #FF8A5B, #FF6B9A, #B56CFF) 1;'
  );
  content = content.replace(
    /border-bottom:\s*1px solid\s*rgba\(0, 170, 255, 0\.18\);/g,
    'border-bottom: 2px solid transparent; border-image: linear-gradient(90deg, #F5B928, #FF8A5B, #FF6B9A, #B56CFF) 1; box-shadow: 0 10px 40px rgba(0,0,0,0.5);'
  );

  // Update active and hover colors to yellow
  content = content.replace(/color:\s*var\(--cyan\);/g, 'color: #F5B928;');
  content = content.replace(/color:\s*var\(--cyan-light\);/g, 'color: #FFC83D;');
  content = content.replace(/background:\s*var\(--cyan-glow\);/g, 'background: rgba(245, 185, 40, 0.15);');
  content = content.replace(/background:\s*var\(--cyan\);/g, 'background: #F5B928;');
  
  // Also standardise the admin button on navbar
  content = content.replace(/linear-gradient\(135deg, #00e5ff, #66f0ff\)/g, 'linear-gradient(135deg, #F5B928, #FF8A5B)');
  content = content.replace(/rgba\(0, 229, 255,/g, 'rgba(245, 185, 40,');

  fs.writeFileSync(navbarCssPath, content);
}

// 2. Update HeroSection CSS for the image scale animation
const heroCssPath = path.join(__dirname, '..', 'src', 'components', 'HeroSection.css');
if (fs.existsSync(heroCssPath)) {
  let content = fs.readFileSync(heroCssPath, 'utf8');
  
  // Add animation class to background
  if (!content.includes('heroImageZoom')) {
    content = content.replace('.hero-image-bg {', `.hero-image-bg {\n  animation: heroImageZoom 8s cubic-bezier(0.16, 1, 0.3, 1) forwards;`);
    content += `\n\n@keyframes heroImageZoom {\n  0% { transform: scale(1.04); }\n  100% { transform: scale(1); }\n}`;
  }
  
  fs.writeFileSync(heroCssPath, content);
}
