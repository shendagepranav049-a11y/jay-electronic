import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { collection, query, orderBy, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import logo from "../assets/je-logo.png";
import "./AdminDashboard.css";
import { motion } from "framer-motion";

function AdminDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        navigate("/admin/login");
      } else {
        setUser(currentUser);
      }
    });

    return () => unsubscribeAuth();
  }, [navigate]);

  useEffect(() => {
    if (!user) return;

    const q = query(collection(db, "enquiries"), orderBy("createdAt", "desc"));
    const unsubscribeData = onSnapshot(q, (querySnapshot) => {
      const enquiriesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setEnquiries(enquiriesData);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching enquiries:", error);
      setLoading(false);
    });

    return () => unsubscribeData();
  }, [user]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/admin/login");
    } catch (error) {
      console.error("Logout error", error);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const enquiryRef = doc(db, "enquiries", id);
      await updateDoc(enquiryRef, { status: newStatus });
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return "N/A";
    const date = timestamp.toDate();
    return new Intl.DateTimeFormat('en-IN', {
      day: '2-digit', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    }).format(date);
  };

  if (!user || loading) {
    return <div className="dashboard-loading">LOADING DATA...</div>;
  }

  return (
    <div className="dashboard-page">
      <nav className="dashboard-nav">
        <div className="dashboard-brand">
          <div className="dashboard-logo">
            <img src={logo} alt="Jay Electronics" />
          </div>
          <div className="dashboard-brand-text">
            <h2>ADMIN PORTAL</h2>
            <p>JAY ELECTRONICS PVT LTD</p>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>{user.email}</span>
          <button className="dashboard-logout" onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      <main className="dashboard-content">
        <motion.div 
          className="dashboard-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1>Enquiries</h1>
          <p>Manage customer enquiries and requests</p>
        </motion.div>

        <motion.div 
          className="enquiries-table-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {enquiries.length === 0 ? (
            <div className="dashboard-empty">
              No enquiries found.
            </div>
          ) : (
            <table className="enquiries-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Name / Company</th>
                  <th>Contact</th>
                  <th>Requirement</th>
                  <th>Message</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {enquiries.map((enq) => (
                  <tr key={enq.id}>
                    <td>{formatDate(enq.createdAt)}</td>
                    <td>
                      <strong>{enq.name}</strong><br/>
                      <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)' }}>{enq.company || '-'}</span>
                    </td>
                    <td>
                      {enq.phone}<br/>
                      <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)' }}>{enq.email}</span>
                    </td>
                    <td style={{ textTransform: 'capitalize' }}>{enq.requirement.replace('-', ' ')}</td>
                    <td>
                      <span className="enquiry-message" title={enq.message}>{enq.message}</span>
                    </td>
                    <td>
                      <span className={`enquiry-status status-${enq.status}`}>
                        {enq.status}
                      </span>
                    </td>
                    <td>
                      <select 
                        className="action-select" 
                        value={enq.status} 
                        onChange={(e) => handleStatusChange(enq.id, e.target.value)}
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="closed">Closed</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </motion.div>
      </main>
    </div>
  );
}

export default AdminDashboard;