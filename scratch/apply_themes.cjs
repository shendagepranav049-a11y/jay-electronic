const fs = require('fs');
const path = require('path');

const cssDir = path.join(__dirname, '..', 'src', 'components');

const updates = [
  {
    file: 'HeroSection.css',
    replacements: [
      { search: /var\(--bg-main\)/g, replace: 'var(--midnight-navy)' }
    ]
  },
  {
    file: 'AboutSection.css',
    replacements: [
      { search: /var\(--cyan\)/g, replace: 'var(--accent-about)' },
      { search: /var\(--cyan-glow\)/g, replace: 'rgba(168, 177, 188, 0.4)' },
      { search: /var\(--bg-main\)/g, replace: 'var(--dark-steel)' }
    ]
  },
  {
    file: 'SolutionsSection.css',
    replacements: [
      { search: /var\(--cyan\)/g, replace: 'var(--accent-solutions)' },
      { search: /var\(--cyan-glow\)/g, replace: 'rgba(0, 168, 255, 0.4)' },
      { search: /var\(--bg-card\)/g, replace: 'var(--midnight-navy)' }
    ]
  },
  {
    file: 'ProjectsSection.css',
    replacements: [
      { search: /var\(--cyan\)/g, replace: 'var(--accent-projects)' },
      { search: /var\(--cyan-glow\)/g, replace: 'rgba(212, 175, 55, 0.4)' },
      { search: /var\(--bg-main\)/g, replace: 'var(--deep-black)' }
    ]
  },
  {
    file: 'IndustriesSection.css',
    replacements: [
      { search: /var\(--cyan\)/g, replace: 'var(--accent-industries)' },
      { search: /var\(--cyan-glow\)/g, replace: 'rgba(0, 229, 255, 0.4)' },
      { search: /var\(--bg-main\)/g, replace: '#06131c' }, // Deep Green-Blue Navy
      { search: /rgba\(0, 229, 255,/g, replace: 'rgba(0, 229, 255,' } // Teal
    ]
  },
  {
    file: 'InformationSection.css',
    replacements: [
      { search: /var\(--cyan\)/g, replace: 'var(--accent-information)' },
      { search: /var\(--cyan-light\)/g, replace: '#9b5de5' },
      { search: /var\(--cyan-glow\)/g, replace: 'rgba(138, 43, 226, 0.4)' },
      { search: /var\(--bg-main\)/g, replace: '#12121a' }, // Deep charcoal
      { search: /rgba\(0, 229, 255,/g, replace: 'rgba(138, 43, 226,' }
    ]
  },
  {
    file: 'WhyJaySection.css',
    replacements: [
      { search: /var\(--cyan\)/g, replace: 'var(--accent-whyjay)' },
      { search: /var\(--cyan-glow\)/g, replace: 'rgba(16, 185, 129, 0.4)' },
      { search: /var\(--bg-card\)/g, replace: '#0a0d10' }, // Dark graphite
      { search: /rgba\(0, 229, 255,/g, replace: 'rgba(16, 185, 129,' }
    ]
  },
  {
    file: 'ContactSection.css',
    replacements: [
      { search: /var\(--bg-main\)/g, replace: 'var(--midnight-navy)' }
    ]
  }
];

updates.forEach(({ file, replacements }) => {
  const filePath = path.join(cssDir, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    replacements.forEach(({ search, replace }) => {
      content = content.replace(search, replace);
    });
    fs.writeFileSync(filePath, content);
    console.log(`Updated ${file}`);
  } else {
    console.log(`File not found: ${file}`);
  }
});
