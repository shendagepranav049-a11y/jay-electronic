import fs from 'fs';
let c = fs.readFileSync('src/components/Footer.jsx', 'utf8');
c = c.replace('import logo from "../assets/je-logo.png";', 'import logo from "../assets/je-logo.png";\nimport { Link } from "react-router-dom";');
c = c.replace('<a href="/admin/login" style={{ color: \'var(--muted)\', textDecoration: \'none\' }}>Admin Login</a>', '<Link to="/admin/login" style={{ color: \'var(--text-muted)\', textDecoration: \'none\' }}>Admin Login</Link>');
fs.writeFileSync('src/components/Footer.jsx', c);
