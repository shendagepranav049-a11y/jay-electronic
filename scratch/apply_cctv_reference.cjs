const fs = require('fs');
const path = require('path');

const indexCssPath = path.join(__dirname, '..', 'src', 'index.css');

let content = `
:root {
  /* MASTER THEME FROM REFERENCE SITE */
  --black: #030303;
  --black-2: #080808;
  --black-3: #111;
  
  --gold: #d4af37;
  --gold-light: #f8e7a1;
  --gold-dark: #9b7715;
  
  --purple: #9b59ff;
  --purple-light: #c99cff;
  --purple-dark: #6c2bd9;

  --white: #fff;
  --text: #171717;
  --muted: #666;
  --light: #f5f5f5;
  --border: #d4af3740;
  --purple-border: #9b59ff4d;

  --shadow-sm: 0 8px 25px #00000012;
  --shadow-md: 0 18px 45px #0000001f;
  --purple-shadow: 0 20px 50px #9b59ff26;
  --gold-shadow: 0 20px 50px #d4af3726;

  /* Overriding old variables so existing components keep working */
  --bg-main: var(--black-2);
  --text-main: var(--white);
  --text-muted: #aaa;
  --midnight-navy: var(--black-2);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: 'Inter', Arial, sans-serif;
  background: var(--black-2);
  color: var(--white);
  overflow-x: hidden;
}

/* Custom Scrollbar */
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background: var(--black-2);
}
::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, var(--gold), var(--purple));
  border-radius: 20px;
}

/* Base UI Card (Updating to match reference) */
.ui-card {
  background: #111;
  border: 1px solid var(--border);
  border-radius: 16px;
  box-shadow: var(--shadow-sm);
  transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
  position: relative;
  overflow: hidden;
}

.ui-card:hover {
  border-color: var(--purple);
  box-shadow: var(--purple-shadow);
  transform: translateY(-8px);
}

/* Base Buttons */
.ui-button {
  background: linear-gradient(135deg, var(--gold-light), var(--gold));
  border: none;
  border-radius: 8px;
  color: #000;
  font-weight: 900;
  overflow: hidden;
  padding: 14px 25px;
  transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
  cursor: pointer;
  box-shadow: 0 8px 25px rgba(212, 175, 55, 0.2);
}

.ui-button:hover {
  box-shadow: 0 15px 35px rgba(212, 175, 55, 0.4);
  transform: translateY(-4px);
}

/* Section Headings */
.section-label {
  color: var(--purple-light);
  font-size: 11px;
  font-weight: 900;
  letter-spacing: 3px;
  text-transform: uppercase;
}

/* Purple-Gold Line for under headings */
.purple-gold-line {
  animation: purpleGoldLine 3s linear infinite;
  background: linear-gradient(90deg, var(--purple), var(--gold), var(--purple));
  background-size: 200% auto;
  border-radius: 50px;
  height: 3px;
  margin: 15px 0;
  width: 120px;
}

@keyframes purpleGoldLine {
  0% { background-position: 0; }
  100% { background-position: 200%; }
}

/* Hero Title Shine Effect */
.text-shine {
  animation: textShine 6s linear infinite;
  background: linear-gradient(90deg, #fff, var(--gold-light), var(--purple-light), #fff, var(--gold));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  background-size: 300% auto;
}

@keyframes textShine {
  0% { background-position: 300%; }
  100% { background-position: -300%; }
}
`;

fs.writeFileSync(indexCssPath, content);
console.log('index.css updated to match CCTV reference template');
