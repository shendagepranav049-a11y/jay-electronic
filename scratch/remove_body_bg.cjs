const fs = require('fs');
const path = require('path');

const appCssPath = path.join(__dirname, '..', 'src', 'App.css');
if (fs.existsSync(appCssPath)) {
  let content = fs.readFileSync(appCssPath, 'utf8');
  content = content.replace(/background:\s*linear-gradient\([\s\S]*?\);/g, 'background: var(--bg-main);');
  fs.writeFileSync(appCssPath, content);
  console.log('Successfully updated App.css');
}
