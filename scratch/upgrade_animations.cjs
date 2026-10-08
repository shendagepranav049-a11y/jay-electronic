const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, '..', 'src', 'components');

fs.readdirSync(componentsDir).forEach(file => {
  if (file.endsWith('.jsx')) {
    const filePath = path.join(componentsDir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Replace generic easeOut and bounce animations with standard ultra-premium bezier curves
    content = content.replace(/ease: "easeOut"/g, 'ease: [0.16, 1, 0.3, 1]');
    content = content.replace(/ease: "easeIn"/g, 'ease: [0.16, 1, 0.3, 1]');
    content = content.replace(/ease: "easeInOut"/g, 'ease: [0.16, 1, 0.3, 1]');
    content = content.replace(/type: "spring", stiffness: \d+, damping: \d+/g, 'duration: 1.2, ease: [0.16, 1, 0.3, 1]');
    
    // Make durations slightly longer for elegance (where duration is around 0.5 to 0.8)
    content = content.replace(/duration: 0\.[56789]/g, 'duration: 1.2');
    
    // Ensure staggered animations are a bit smoother
    content = content.replace(/staggerChildren: 0\.[12345]/g, 'staggerChildren: 0.15');

    fs.writeFileSync(filePath, content);
    console.log(`Upgraded animations in ${file}`);
  }
});
