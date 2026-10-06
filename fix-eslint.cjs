const fs = require('fs');
const glob = require('glob');

// Run via: node fix-eslint.cjs

function removeUnusedVars() {
  // src/App.jsx
  let app = fs.readFileSync('src/App.jsx', 'utf8');
  app = app.replace('import BrandBackground from "./components/BrandBackground";\n', '');
  fs.writeFileSync('src/App.jsx', app);

  // src/components/ContactSection.jsx
  let contact = fs.readFileSync('src/components/ContactSection.jsx', 'utf8');
  contact = contact.replace('const { data: content, loading: contentLoading } = useSiteContent', 'const { loading: contentLoading } = useSiteContent');
  fs.writeFileSync('src/components/ContactSection.jsx', contact);

  // src/components/Footer.jsx
  let footer = fs.readFileSync('src/components/Footer.jsx', 'utf8');
  footer = footer.replace('const { data: content, loading } = useSiteContent', 'const { loading } = useSiteContent');
  fs.writeFileSync('src/components/Footer.jsx', footer);

  // src/components/IndustriesSection.jsx
  let industries = fs.readFileSync('src/components/IndustriesSection.jsx', 'utf8');
  industries = industries.replace('const { data: dbIndustries, loading } = useSiteCollection', 'const { data: dbIndustries } = useSiteCollection');
  fs.writeFileSync('src/components/IndustriesSection.jsx', industries);

  // src/components/ProjectsSection.jsx
  let projects = fs.readFileSync('src/components/ProjectsSection.jsx', 'utf8');
  projects = projects.replace('import ScrollReveal from "./ScrollReveal";\n', '');
  projects = projects.replace('const { data: dbProjects, loading } = useSiteCollection', 'const { data: dbProjects } = useSiteCollection');
  fs.writeFileSync('src/components/ProjectsSection.jsx', projects);

  // src/components/SolutionsSection.jsx
  let solutions = fs.readFileSync('src/components/SolutionsSection.jsx', 'utf8');
  solutions = solutions.replace('const { data: dbSolutions, loading } = useSiteCollection', 'const { data: dbSolutions } = useSiteCollection');
  fs.writeFileSync('src/components/SolutionsSection.jsx', solutions);

  // src/components/WhyJaySection.jsx
  let why = fs.readFileSync('src/components/WhyJaySection.jsx', 'utf8');
  why = why.replace('const { data: content, loading } = useSiteContent', 'const { loading } = useSiteContent');
  fs.writeFileSync('src/components/WhyJaySection.jsx', why);

  // src/pages/admin/ContentEditor.jsx
  let ce = fs.readFileSync('src/pages/admin/ContentEditor.jsx', 'utf8');
  ce = ce.replace('import { useSiteContent, updateSiteContent } from "../../utils/firebaseUtils";', 'import { updateSiteContent } from "../../utils/firebaseUtils";');
  ce = ce.replace('} catch (err) {', '} catch {');
  fs.writeFileSync('src/pages/admin/ContentEditor.jsx', ce);

  // src/pages/admin/MediaManager.jsx
  let mm = fs.readFileSync('src/pages/admin/MediaManager.jsx', 'utf8');
  mm = mm.replace('const [progress, setProgress] = useState(0);', 'const [, setProgress] = useState(0);');
  fs.writeFileSync('src/pages/admin/MediaManager.jsx', mm);
}

function fixHoisting(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  // move `async function fetchStats()` above `useEffect`
  
  // Find fetchStats block
  const match = content.match(/(async function fetchStats\(\) \{[\s\S]*?^\s*\};)/m);
  if (match) {
    const fnStr = match[1];
    content = content.replace(fnStr, '');
    
    // Find useEffect block where it's used
    const effectMatch = content.match(/useEffect\(\(\) => \{/);
    if (effectMatch) {
      const idx = effectMatch.index;
      content = content.substring(0, idx) + fnStr + "\n\n  " + content.substring(idx);
      fs.writeFileSync(filePath, content);
    }
  }
}

removeUnusedVars();
try {
  fixHoisting('src/pages/AdminDashboard.jsx');
} catch (e) {}
try {
  fixHoisting('src/pages/admin/AdminDashboardShell.jsx');
} catch (e) {}

console.log('Fixed ESLint issues.');
