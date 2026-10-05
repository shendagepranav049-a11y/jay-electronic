const fs = require('fs');
let c = fs.readFileSync('src/components/Footer.jsx', 'utf8');
c = c.replace('import ScrollReveal from "./ScrollReveal";', 'import { motion } from "framer-motion";');
c = c.replace(/<ScrollReveal direction="up">/g, '<motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0, transition: { duration: 0.6 } }} viewport={{ once: true }}>');
c = c.replace(/<\/ScrollReveal>/g, '</motion.div>');
fs.writeFileSync('src/components/Footer.jsx', c);
