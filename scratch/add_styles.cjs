const fs = require('fs');
let css = fs.readFileSync('src/App.css', 'utf8');

// Replace Hero Background
css = css.replace(/url\(.*?unsplash.*?\)/, 'url(/src/assets/cctv-bg.jpg)');

// Add new classes
const newStyles = `
/* =========================================
   NEW JEPL BRANDING & UI ELEMENTS
========================================= */

.navbar-logo-text {
  display: flex;
  align-items: center;
  gap: 12px;
  background: transparent;
  border: none;
  cursor: pointer;
  text-align: left;
}

.logo-icon {
  width: 20px;
  height: 20px;
  background: linear-gradient(135deg, #10b981, #3b82f6);
  border-radius: 4px 10px 4px 10px;
}

.logo-text-group {
  display: flex;
  flex-direction: column;
}

.logo-title {
  font-size: 20px;
  font-weight: 800;
  letter-spacing: 1px;
  color: #fff;
  line-height: 1;
}

.logo-subtitle {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 2px;
  color: #a4a4a4;
  margin-top: 4px;
}

.navbar-admin-btn {
  background: linear-gradient(135deg, #FFB800, #FFD147);
  color: #000;
  border: none;
  border-radius: 8px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-left: 15px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(255, 184, 0, 0.3);
}

.navbar-admin-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(255, 184, 0, 0.5);
}

.hero-label-top {
  color: #FFB800;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 3px;
  margin-bottom: 20px;
}

.hero-description-new {
  color: #e2e8f0;
  font-size: 16px;
  line-height: 1.8;
  max-width: 800px;
  margin-bottom: 40px;
  text-shadow: 0 2px 4px rgba(0,0,0,0.8);
}

.hero-buttons-new {
  display: flex;
  gap: 20px;
}

.btn-solid-gold {
  background: #FFB800;
  color: #000;
  font-weight: 700;
  padding: 14px 28px;
  border-radius: 6px;
  text-decoration: none;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.btn-solid-gold:hover {
  background: #FFD147;
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(255, 184, 0, 0.3);
}

.btn-outline-gold {
  background: transparent;
  color: #fff;
  border: 2px solid #FFB800;
  font-weight: 700;
  padding: 12px 28px;
  border-radius: 6px;
  text-decoration: none;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.btn-outline-gold:hover {
  background: rgba(255, 184, 0, 0.1);
  transform: translateY(-2px);
}

.hero-background-overlay {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at right center, rgba(168, 85, 247, 0.15), transparent 60%);
  pointer-events: none;
  z-index: 1;
}

.hero::after {
  content: none !important;
}
`;

fs.writeFileSync('src/App.css', css + '\n' + newStyles);
