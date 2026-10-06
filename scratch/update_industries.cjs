const fs = require('fs');
let css = fs.readFileSync('src/components/IndustriesSection.css', 'utf8');

// Remove old styles safely
css = css.replace(/\.industries-grid \{[\s\S]*?\}/, '');
css = css.replace(/\.industry-card \{[\s\S]*?\}/, '');
css = css.replace(/\.industry-content \{[\s\S]*?\}/, '');

// Add connecting lines
const linesStyles = `
.industries-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1px;
  background: rgba(0, 229, 255, 0.2);
  padding: 1px;
  border-radius: 12px;
  overflow: hidden;
}

.industry-card {
  background: #02070d;
  padding: 40px;
  min-height: 250px;
  position: relative;
  transition: all 0.4s ease;
  border-radius: 0;
  border: none;
}

.industry-card:hover {
  background: rgba(0, 229, 255, 0.05);
  transform: translateY(-5px);
  z-index: 2;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
}

.industry-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 10px;
  height: 10px;
  border-top: 2px solid var(--cyan);
  border-left: 2px solid var(--cyan);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.industry-card::after {
  content: '';
  position: absolute;
  bottom: 0;
  right: 0;
  width: 10px;
  height: 10px;
  border-bottom: 2px solid var(--cyan);
  border-right: 2px solid var(--cyan);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.industry-card:hover::before,
.industry-card:hover::after {
  opacity: 1;
}

.industry-content h3 {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 15px;
  color: #fff;
  display: flex;
  align-items: center;
  gap: 12px;
}

.industry-content h3::before {
  content: '';
  display: inline-block;
  width: 8px;
  height: 8px;
  background: var(--cyan);
  border-radius: 50%;
  box-shadow: 0 0 10px var(--cyan-glow);
}

.industry-content p {
  color: #a4a4a4;
  line-height: 1.6;
}
`;
fs.writeFileSync('src/components/IndustriesSection.css', css + '\n' + linesStyles);
