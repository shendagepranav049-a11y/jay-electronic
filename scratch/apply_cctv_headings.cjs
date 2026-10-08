const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, '..', 'src', 'components');

fs.readdirSync(componentsDir).forEach(file => {
  if (file.endsWith('Section.jsx') && file !== 'HeroSection.jsx') {
    const filePath = path.join(componentsDir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Add the purple-gold-line to headings if not already there
    if (!content.includes('purple-gold-line')) {
      content = content.replace(
        /<p className="section-label">([^<]+)<\/p>/g,
        '<p className="section-label">$1</p>\n            <div className="purple-gold-line"></div>'
      );
      fs.writeFileSync(filePath, content);
      console.log(`Added purple-gold-line to ${file}`);
    }
  }
});
