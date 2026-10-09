import { motion } from "framer-motion";

function Overview({ stats, setActiveTab }) {
  const adminOptions = [
    { id: "hero", label: "Hero Content", color: "#FF6B6B" },
    { id: "about", label: "About Section", color: "#4ECDC4" },
    { id: "why-jay", label: "Why Jay", color: "#FFE66D" },
    { id: "solutions", label: "Solutions", color: "#1A535C" },
    { id: "projects", label: "Projects", color: "#F7FFF7" },
    { id: "industries", label: "Industries", color: "#FF9F1C" },
    { id: "contact", label: "Contact Info", color: "#2EC4B6" },
    { id: "footer", label: "Footer", color: "#E71D36" },
  ];

  return (
    <div className="admin-overview">
      <div className="stats-grid">
        <div className="stat-card" onClick={() => setActiveTab('enquiries')}>
          <h3>Total Enquiries</h3>
          <p className="stat-number">{stats.enquiries}</p>
        </div>
        <div className="stat-card" onClick={() => setActiveTab('projects')}>
          <h3>Published Projects</h3>
          <p className="stat-number">{stats.projects}</p>
        </div>
        <div className="stat-card" onClick={() => setActiveTab('solutions')}>
          <h3>Solutions</h3>
          <p className="stat-number">{stats.solutions}</p>
        </div>
      </div>
      
      <div className="overview-welcome" style={{ marginTop: '20px' }}>
        <h2>Quick Access: Manage Website Content</h2>
        <p>Select any of the moving options below to quickly edit that section of the website.</p>
      </div>

      {/* Marquee matching the Industries section style */}
      <div className="admin-marquee-container">
        <div className="admin-marquee-track">
          {/* Duplicate the array twice for seamless infinite scrolling */}
          {[...adminOptions, ...adminOptions, ...adminOptions].map((opt, index) => (
            <div 
              key={`\${opt.id}-\${index}`}
              className="admin-marquee-item"
              onClick={() => setActiveTab(opt.id)}
            >
              <span>{opt.label}</span>
              <div className="admin-marquee-glow"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Overview;
