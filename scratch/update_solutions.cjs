const fs = require('fs');
let css = fs.readFileSync('src/components/SolutionsSection.css', 'utf8');

// Replace solution grid styling
const newStyles = `
.solutions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
}

.solution-card {
  background: rgba(10, 15, 25, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.05);
  padding: 40px;
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
}

.solution-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: var(--cyan);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.4s ease;
}

.solution-card:hover {
  background: rgba(0, 229, 255, 0.03);
  border-color: rgba(0, 229, 255, 0.2);
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.4);
}

.solution-card:hover::before {
  transform: scaleX(1);
}

.solution-number {
  font-size: 80px;
  font-weight: 800;
  line-height: 1;
  color: rgba(255, 255, 255, 0.03);
  position: absolute;
  top: -10px;
  right: 10px;
  transition: all 0.4s ease;
  pointer-events: none;
}

.solution-card:hover .solution-number {
  color: rgba(0, 229, 255, 0.1);
  transform: scale(1.1) translate(-10px, 10px);
}

.solution-card h3 {
  font-size: 24px;
  font-weight: 700;
  margin-top: 40px;
  margin-bottom: 16px;
  color: #fff;
  position: relative;
  z-index: 2;
  transition: color 0.3s ease;
}

.solution-card:hover h3 {
  color: var(--cyan);
}

.solution-card p {
  color: #a4a4a4;
  line-height: 1.7;
  font-size: 15px;
  position: relative;
  z-index: 2;
}
`;

css = css.replace(/\.solutions-grid \{[\s\S]*?\}/, '');
css = css.replace(/\.solution-card \{[\s\S]*?\}/, '');
css = css.replace(/\.solution-number \{[\s\S]*?\}/, '');

fs.writeFileSync('src/components/SolutionsSection.css', css + '\n' + newStyles);
