const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'src', 'components');

// 1. Update AboutSection to use the about-box radial gradient style
let aboutCss = path.join(srcDir, 'AboutSection.css');
if (fs.existsSync(aboutCss)) {
  let content = fs.readFileSync(aboutCss, 'utf8');
  content = content.replace(/background-color:[^;]+;/, 'background: radial-gradient(circle at top right, #302040, #070707 70%);');
  fs.writeFileSync(aboutCss, content);
}

// 2. Update SolutionsSection to use the service-card growing top line
let solutionsCss = path.join(srcDir, 'SolutionsSection.css');
if (fs.existsSync(solutionsCss)) {
  let content = fs.readFileSync(solutionsCss, 'utf8');
  content = content.replace(/background-color:[^;]+;/, 'background: var(--black);');
  
  // Update card to match service-card
  if (!content.includes('::before {')) {
    content += `
.solution-card {
  border-top: none;
}
.solution-card::before {
  background: linear-gradient(90deg, var(--gold), var(--purple));
  content: "";
  height: 4px;
  left: 0;
  position: absolute;
  top: 0;
  transition: .5s;
  width: 0;
}
.solution-card:hover::before {
  width: 100%;
}
.solution-card::after {
  border: 1px solid rgba(155, 89, 255, 0.2);
  border-radius: 50%;
  bottom: -55px;
  content: "";
  height: 100px;
  position: absolute;
  right: -55px;
  transition: .7s;
  width: 100px;
}
.solution-card:hover::after {
  opacity: 0;
  transform: scale(3);
}
`;
  }
  fs.writeFileSync(solutionsCss, content);
}

// 3. Update ProjectsSection to use the dark-section radial gradient
let projectsCss = path.join(srcDir, 'ProjectsSection.css');
if (fs.existsSync(projectsCss)) {
  let content = fs.readFileSync(projectsCss, 'utf8');
  content = content.replace(/background-color:[^;]+;/, 'background: radial-gradient(circle at top right, #241632, #040404 70%);');
  fs.writeFileSync(projectsCss, content);
}

// 4. Update IndustriesSection to use the industry-grid (left border, slide right)
let industriesCss = path.join(srcDir, 'IndustriesSection.css');
if (fs.existsSync(industriesCss)) {
  let content = fs.readFileSync(industriesCss, 'utf8');
  content = content.replace(/background-color:[^;]+;/, 'background: var(--black-2);');
  
  if (!content.includes('border-left: 3px')) {
    content += `
.industry-card {
  border: none;
  border-left: 3px solid var(--gold);
}
.industry-card:hover {
  border-color: transparent;
  border-left-color: var(--purple);
  transform: translateX(8px) translateY(-4px);
}
`;
  }
  fs.writeFileSync(industriesCss, content);
}

// 5. Update InformationSection to use the why-grid (gradient from top to bottom on hover)
let infoCss = path.join(srcDir, 'InformationSection.css');
if (fs.existsSync(infoCss)) {
  let content = fs.readFileSync(infoCss, 'utf8');
  content = content.replace(/background-color:[^;]+;/, 'background: radial-gradient(circle at center, #291738, #040404 72%);');
  fs.writeFileSync(infoCss, content);
}

// 6. Update WhyJaySection to use brand-grid (expanding circular background on hover)
let whyCss = path.join(srcDir, 'WhyJaySection.css');
if (fs.existsSync(whyCss)) {
  let content = fs.readFileSync(whyCss, 'utf8');
  content = content.replace(/background-color:[^;]+;/, 'background: var(--black-3);');
  
  if (!content.includes('z-index: 2')) {
    content += `
.why-card {
  text-align: center;
  border-top: none;
}
.why-card::before {
  background: rgba(155, 89, 255, 0.1);
  border-radius: 50%;
  content: "";
  height: 0;
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  transition: width .6s, height .6s;
  width: 0;
  z-index: 0;
}
.why-card > * {
  position: relative;
  z-index: 2;
}
.why-card:hover::before {
  height: 350px;
  width: 350px;
}
`;
  }
  fs.writeFileSync(whyCss, content);
}

// 7. Update ContactSection to use contact-info specific radial gradient
let contactCss = path.join(srcDir, 'ContactSection.css');
if (fs.existsSync(contactCss)) {
  let content = fs.readFileSync(contactCss, 'utf8');
  content = content.replace(/background-color:[^;]+;/, 'background: radial-gradient(circle at top right, #302040, #070707 70%);');
  fs.writeFileSync(contactCss, content);
}

console.log('Applied diverse CCTV1-Umber section backgrounds and card animations!');
