import { useState, useEffect } from "react";
import { auth, db } from "../../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/je-logo.png";
import "../AdminDashboard.css";
import { motion, AnimatePresence } from "framer-motion";

import Overview from "./Overview";
import EnquiriesManager from "./EnquiriesManager";
import ContentEditor from "./ContentEditor";
import MediaManager from "./MediaManager";
import ListManager from "./ListManager";

function AdminDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [stats, setStats] = useState({ enquiries: 0, projects: 0, solutions: 0 });

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        navigate("/admin/login");
      } else {
        setUser(currentUser);
        fetchStats();
      }
    });
    return () => unsubscribeAuth();
  }, [navigate]);

  async function fetchStats() {
    try {
      const qE = query(collection(db, "enquiries"));
      const snapE = await getDocs(qE);
      
      const qP = query(collection(db, "projects"));
      const snapP = await getDocs(qP);

      const qS = query(collection(db, "solutions"));
      const snapS = await getDocs(qS);
      
      setStats({
        enquiries: snapE.size,
        projects: snapP.size,
        solutions: snapS.size
      });
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/admin/login");
  };

  if (loading) {
    return <div className="dashboard-loading">LOADING DATA...</div>;
  }

  const renderContent = () => {
    switch (activeTab) {
      case "overview": return <Overview stats={stats} setActiveTab={setActiveTab} />;
      case "enquiries": return <EnquiriesManager />;
      case "media": return <MediaManager />;
      
      case "hero": return <ContentEditor sectionId="hero" title="Hero Section" />;
      case "about": return <ContentEditor sectionId="about" title="About Section" />;
      case "why-jay": return <ContentEditor sectionId="whyJay" title="Why Jay Section" />;
      case "contact": return <ContentEditor sectionId="contact" title="Contact Information" />;
      case "footer": return <ContentEditor sectionId="footer" title="Footer & Links" />;
      
      case "solutions": return <ListManager collectionName="solutions" title="Solutions" />;
      case "projects": return <ListManager collectionName="projects" title="Projects" hasGallery={true} />;
      case "industries": return <ListManager collectionName="industries" title="Industries" />;
      
      default: return <Overview stats={stats} setActiveTab={setActiveTab} />;
    }
  };

  const tabs = [
    { id: "overview", label: "Dashboard Overview", group: "main" },
    { id: "enquiries", label: "Enquiries", group: "main" },
    { id: "media", label: "Gallery / Media", group: "main" },
    
    { id: "hero", label: "Hero Content", group: "website" },
    { id: "about", label: "About", group: "website" },
    { id: "why-jay", label: "Why Jay", group: "website" },
    { id: "contact", label: "Contact Info", group: "website" },
    { id: "footer", label: "Footer", group: "website" },
    
    { id: "solutions", label: "Solutions", group: "lists" },
    { id: "projects", label: "Projects", group: "lists" },
    { id: "industries", label: "Industries", group: "lists" },
  ];

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <img src={logo} alt="Jay Electronics" />
          <div>
            <h2>ADMIN PORTAL</h2>
            <p>CONTENT MANAGER</p>
          </div>
        </div>

        <div className="admin-nav-sections">
          <div className="admin-nav-group">
            <h3>MAIN</h3>
            {tabs.filter(t => t.group === "main").map(tab => (
              <button 
                key={tab.id} 
                className={`admin-nav-btn \${activeTab === tab.id ? "active" : ""}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="admin-nav-group">
            <h3>WEBSITE CONTENT</h3>
            {tabs.filter(t => t.group === "website").map(tab => (
              <button 
                key={tab.id} 
                className={`admin-nav-btn \${activeTab === tab.id ? "active" : ""}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="admin-nav-group">
            <h3>COLLECTIONS</h3>
            {tabs.filter(t => t.group === "lists").map(tab => (
              <button 
                key={tab.id} 
                className={`admin-nav-btn \${activeTab === tab.id ? "active" : ""}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="admin-sidebar-footer">
          <p className="user-email">{user?.email}</p>
          <button className="admin-logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="admin-main">
        <header className="admin-header">
          <h1>{tabs.find(t => t.id === activeTab)?.label || "Dashboard"}</h1>
          <a href="/" target="_blank" rel="noreferrer" className="admin-preview-btn">
            Preview Website ↗
          </a>
        </header>
        
        <div className="admin-content-scroll">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;
