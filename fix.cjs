const fs = require('fs');
let c = fs.readFileSync('src/components/ContactSection.jsx', 'utf8');
c = c.replace('const [error, setError] = useState("");', 'const [error, setError] = useState("");\n\n  if (contentLoading) return null;');
fs.writeFileSync('src/components/ContactSection.jsx', c);
