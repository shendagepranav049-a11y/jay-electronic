import { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { collection, getDocs, doc, setDoc, serverTimestamp, onSnapshot } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import logo from "../assets/je-logo.png";
import "./AdminDashboard.css";
import { motion, AnimatePresence } from "framer-motion";

import Overview from "./admin/Overview";
import EnquiriesManager from "./admin/EnquiriesManager";
import ContentEditor from "./admin/ContentEditor";
import MediaManager from "./admin/MediaManager";
import ListManager from "./admin/ListManager";

function AdminDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [stats, setStats] = useState({ enquiries: 0, projects: 0, solutions: 0 });

  async function fetchStats() {
    try {
      try {
        const snapE = await getDocs(collection(db, "enquiries"));
        setStats(prev => ({ ...prev, enquiries: snapE.size }));
      } catch (err) {
        console.warn("Could not fetch enquiries count:", err);
      }

      try {
        const snapP = await getDocs(collection(db, "projects"));
        setStats(prev => ({ ...prev, projects: snapP.size }));
      } catch (err) {
        console.warn("Could not fetch projects count:", err);
      }

      try {
        const snapS = await getDocs(collection(db, "solutions"));
        setStats(prev => ({ ...prev, solutions: snapS.size }));
      } catch (err) {
        console.warn("Could not fetch solutions count:", err);
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!user) return;

    // Live enquiries count listener
    const unsubEnquiries = onSnapshot(collection(db, "enquiries"), (snap) => {
      setStats(prev => ({ ...prev, enquiries: snap.size }));
    }, (err) => {
      console.warn("Enquiries live count listener error:", err);
    });
    return () => unsubEnquiries();
  }, [user]);

  useEffect(() => {
    const isDemo = new URLSearchParams(window.location.search).get("demo") === "true";
    if (isDemo) {
      setUser({ email: "admin@jayelectronics.com", uid: "demo-admin" });
      setLoading(false);
      return;
    }

    const unsubscribeAuth = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        navigate("/admin/login");
      } else {
        setUser(currentUser);
        // Ensure admin document exists in Firestore for permissions
        try {
          await setDoc(doc(db, "admins", currentUser.uid), {
            email: currentUser.email,
            role: "admin",
            lastActive: serverTimestamp()
          }, { merge: true });
        } catch (e) {
          console.warn("Admin record sync warning:", e);
        }
        fetchStats();
      }
    });
    return () => unsubscribeAuth();
  }, [navigate]);

  

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
      case "social": return <ContentEditor sectionId="social" title="Social Media Links" />;
      
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
    { id: "social", label: "Social Media", group: "website" },
    
    { id: "solutions", label: "Solutions", group: "lists" },
    { id: "projects", label: "Projects", group: "lists" },
    { id: "industries", label: "Industries", group: "lists" },
  ];

  return (
    <div className="admin-layout">
      {/* Mobile Sticky Top Header */}
      <header className="admin-mobile-topbar">
        <div 
          className="admin-mobile-brand" 
          onClick={() => { setActiveTab("overview"); setMobileMenuOpen(false); }}
        >
          <img src={logo} alt="Jay Electronics" />
          <div className="admin-mobile-brand-text">
            <h2>JAY ADMIN</h2>
            <span className="admin-mobile-active-badge">
              {tabs.find(t => t.id === activeTab)?.label || "Dashboard"}
            </span>
          </div>
        </div>

        <div className="admin-mobile-controls">
          <a href="/" target="_blank" rel="noreferrer" className="admin-mobile-preview-btn">
            Site ↗
          </a>
          <button 
            type="button"
            className={`admin-mobile-menu-toggle ${mobileMenuOpen ? "open" : ""}`}
            onClick={() => setMobileMenuOpen(prev => !prev)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      {/* Mobile Swipeable Tab Strip (Quick 1-Tap Switching) */}
      <nav className="admin-mobile-tab-strip" aria-label="Quick Section Navigation">
        <div className="admin-mobile-tabs-scroll">
          {tabs.map(tab => (
            <button
              key={tab.id}
              type="button"
              className={`admin-mobile-tab-pill ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => {
                setActiveTab(tab.id);
                setMobileMenuOpen(false);
              }}
            >
              {tab.label}
              {tab.id === 'enquiries' && stats.enquiries > 0 && (
                <span className="tab-pill-badge">{stats.enquiries}</span>
              )}
            </button>
          ))}
        </div>
      </nav>

      {/* Mobile Drawer (Collapsible Menu for All Sections) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="admin-drawer-portal">
            <motion.div 
              className="admin-drawer-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.aside 
              className="admin-mobile-drawer"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 26, stiffness: 300 }}
            >
              <div className="admin-drawer-header">
                <div className="admin-brand">
                  <img src={logo} alt="Jay Electronics" />
                  <div>
                    <h2>ADMIN PORTAL</h2>
                    <p>CONTROL CENTER</p>
                  </div>
                </div>
                <button 
                  type="button" 
                  className="admin-drawer-close-btn" 
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close menu"
                >
                  ✕
                </button>
              </div>

              <div className="admin-drawer-body">
                <div className="admin-nav-group">
                  <h3>MAIN</h3>
                  {tabs.filter(t => t.group === "main").map(tab => (
                    <button 
                      key={tab.id} 
                      className={`admin-nav-btn ${activeTab === tab.id ? "active" : ""}`}
                      onClick={() => {
                        setActiveTab(tab.id);
                        setMobileMenuOpen(false);
                      }}
                    >
                      <span>{tab.label}</span>
                      {tab.id === 'enquiries' && stats.enquiries > 0 && (
                        <span className="admin-badge-count">{stats.enquiries}</span>
                      )}
                    </button>
                  ))}
                </div>

                <div className="admin-nav-group">
                  <h3>WEBSITE CONTENT</h3>
                  {tabs.filter(t => t.group === "website").map(tab => (
                    <button 
                      key={tab.id} 
                      className={`admin-nav-btn ${activeTab === tab.id ? "active" : ""}`}
                      onClick={() => {
                        setActiveTab(tab.id);
                        setMobileMenuOpen(false);
                      }}
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
                      className={`admin-nav-btn ${activeTab === tab.id ? "active" : ""}`}
                      onClick={() => {
                        setActiveTab(tab.id);
                        setMobileMenuOpen(false);
                      }}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="admin-drawer-footer">
                <div className="drawer-user-info">
                  <span className="user-label">Logged in as:</span>
                  <p className="user-email">{user?.email}</p>
                </div>
                <a href="/" target="_blank" rel="noreferrer" className="drawer-preview-btn">
                  Preview Live Website ↗
                </a>
                <button className="admin-logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
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
                className={`admin-nav-btn ${activeTab === tab.id ? "active" : ""}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span>{tab.label}</span>
                {tab.id === 'enquiries' && stats.enquiries > 0 && (
                  <span className="admin-badge-count">{stats.enquiries}</span>
                )}
              </button>
            ))}
          </div>

          <div className="admin-nav-group">
            <h3>WEBSITE CONTENT</h3>
            {tabs.filter(t => t.group === "website").map(tab => (
              <button 
                key={tab.id} 
                className={`admin-nav-btn ${activeTab === tab.id ? "active" : ""}`}
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
                className={`admin-nav-btn ${activeTab === tab.id ? "active" : ""}`}
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
        
        {/* Admin Dashboard Hero Banner */}
        <div className="admin-hero-banner">
          <div className="admin-hero-overlay"></div>
          <div className="admin-hero-content">
            <h1>Welcome to the Control Center</h1>
            <p>Manage your Jay Electronics website, content, and enquiries.</p>
          </div>
        </div>

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
