const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, '..', 'src', 'components');

fs.readdirSync(componentsDir).forEach(file => {
  if (file.endsWith('Section.jsx') && file !== 'HeroSection.jsx') {
    const filePath = path.join(componentsDir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Remove any existing purple-gold-line to avoid duplicates
    content = content.replace(/<div className="purple-gold-line"><\/div>/g, '');
    
    // Add the purple-gold-line to ALL labels (about-label, solutions-label, industries-label, etc)
    content = content.replace(
      /<p className="([a-z\-]+label)">([^<]+)<\/p>/g,
      '<p className="$1">$2</p>\n            <div className="purple-gold-line"></div>'
    );
    
    // Some sections might use a general section-label
    content = content.replace(
      /<p className="section-label">([^<]+)<\/p>/g,
      '<p className="section-label">$1</p>\n            <div className="purple-gold-line"></div>'
    );

    // Apply the standard text-shine effect to all h2 main headings
    content = content.replace(/<h2>/g, '<h2 className="text-shine">');

    fs.writeFileSync(filePath, content);
  }
});
console.log('Fixed headings and applied text-shine to all sections!');
