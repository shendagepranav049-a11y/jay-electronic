import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc } from "firebase/firestore";

function EnquiriesManager() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    let isSubscribed = true;
    setLoading(true);
    setError(null);

    // Primary attempt: orderBy createdAt descending
    const qWithOrder = query(collection(db, "enquiries"), orderBy("createdAt", "desc"));
    
    const unsubscribe = onSnapshot(
      qWithOrder,
      (snapshot) => {
        if (!isSubscribed) return;
        const list = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
        setEnquiries(list);
        setLoading(false);
      },
      (err) => {
        console.warn("Ordered enquiries query failed, falling back to unordered:", err.message);
        
        // Fallback: fetch without orderBy to prevent indexing or missing-field issues
        const qFallback = collection(db, "enquiries");
        const unsubFallback = onSnapshot(
          qFallback,
          (fallbackSnap) => {
            if (!isSubscribed) return;
            const fallbackList = fallbackSnap.docs.map(d => ({ id: d.id, ...d.data() }));
            // Sort in memory by createdAt descending
            fallbackList.sort((a, b) => {
              const timeA = a.createdAt?.toMillis?.() || (a.createdAt?.seconds ? a.createdAt.seconds * 1000 : new Date(a.createdAt || 0).getTime());
              const timeB = b.createdAt?.toMillis?.() || (b.createdAt?.seconds ? b.createdAt.seconds * 1000 : new Date(b.createdAt || 0).getTime());
              return timeB - timeA;
            });
            setEnquiries(fallbackList);
            setLoading(false);
          },
          (fallbackErr) => {
            console.error("Enquiries fetch error:", fallbackErr);
            if (isSubscribed) {
              setError(fallbackErr.message || "Failed to load enquiries.");
              setLoading(false);
            }
          }
        );

        return () => unsubFallback();
      }
    );

    return () => {
      isSubscribed = false;
      unsubscribe();
    };
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await updateDoc(doc(db, "enquiries", id), { status });
    } catch (e) {
      console.error("Failed to update status:", e);
      alert("Error updating enquiry status: " + e.message);
    }
  };

  const deleteEnquiry = async (id) => {
    if (window.confirm("Are you sure you want to delete this enquiry?")) {
      try {
        await deleteDoc(doc(db, "enquiries", id));
      } catch (e) {
        console.error("Failed to delete enquiry:", e);
        alert("Error deleting enquiry: " + e.message);
      }
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return "Just now";
    try {
      let date;
      if (timestamp.toDate) {
        date = timestamp.toDate();
      } else if (timestamp.seconds) {
        date = new Date(timestamp.seconds * 1000);
      } else {
        date = new Date(timestamp);
      }
      return new Intl.DateTimeFormat('en-IN', {
        day: '2-digit', month: 'short', year: 'numeric',
        hour: '2-digit', minute: '2-digit'
      }).format(date);
    } catch {
      return "Recent";
    }
  };

  // Filter & Search logic
  const filteredEnquiries = enquiries.filter(item => {
    const matchesStatus = statusFilter === "all" || (item.status || "new") === statusFilter;
    const q = searchQuery.toLowerCase().trim();
    if (!q) return matchesStatus;

    const matchesSearch = 
      (item.name || "").toLowerCase().includes(q) ||
      (item.company || "").toLowerCase().includes(q) ||
      (item.phone || "").toLowerCase().includes(q) ||
      (item.email || "").toLowerCase().includes(q) ||
      (item.requirement || "").toLowerCase().includes(q) ||
      (item.message || "").toLowerCase().includes(q);

    return matchesStatus && matchesSearch;
  });

  const countNew = enquiries.filter(e => (e.status || "new") === "new").length;
  const countContacted = enquiries.filter(e => e.status === "contacted").length;
  const countClosed = enquiries.filter(e => e.status === "closed").length;

  if (loading) {
    return (
      <div className="admin-enquiries-loading" style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>
        <p>Loading enquiries in real-time...</p>
      </div>
    );
  }

  return (
    <div className="admin-enquiries">
      <div className="enquiries-toolbar" style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        {/* Status Filter Tabs */}
        <div className="enquiries-tabs" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button 
            type="button"
            className={`tab-pill ${statusFilter === 'all' ? 'active' : ''}`}
            onClick={() => setStatusFilter('all')}
            style={{ padding: '8px 16px', borderRadius: '20px', border: '1px solid #334155', background: statusFilter === 'all' ? '#00aaff' : '#1e293b', color: '#fff', cursor: 'pointer', fontWeight: 600, fontSize: '13px' }}
          >
            All ({enquiries.length})
          </button>
          <button 
            type="button"
            className={`tab-pill ${statusFilter === 'new' ? 'active' : ''}`}
            onClick={() => setStatusFilter('new')}
            style={{ padding: '8px 16px', borderRadius: '20px', border: '1px solid #334155', background: statusFilter === 'new' ? '#10b981' : '#1e293b', color: '#fff', cursor: 'pointer', fontWeight: 600, fontSize: '13px' }}
          >
            New ({countNew})
          </button>
          <button 
            type="button"
            className={`tab-pill ${statusFilter === 'contacted' ? 'active' : ''}`}
            onClick={() => setStatusFilter('contacted')}
            style={{ padding: '8px 16px', borderRadius: '20px', border: '1px solid #334155', background: statusFilter === 'contacted' ? '#f59e0b' : '#1e293b', color: '#fff', cursor: 'pointer', fontWeight: 600, fontSize: '13px' }}
          >
            Contacted ({countContacted})
          </button>
          <button 
            type="button"
            className={`tab-pill ${statusFilter === 'closed' ? 'active' : ''}`}
            onClick={() => setStatusFilter('closed')}
            style={{ padding: '8px 16px', borderRadius: '20px', border: '1px solid #334155', background: statusFilter === 'closed' ? '#64748b' : '#1e293b', color: '#fff', cursor: 'pointer', fontWeight: 600, fontSize: '13px' }}
          >
            Closed ({countClosed})
          </button>
        </div>

        {/* Search input */}
        <div className="enquiries-search">
          <input 
            type="text"
            placeholder="Search name, phone, email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ padding: '10px 16px', borderRadius: '10px', background: '#0f172a', border: '1px solid #334155', color: '#fff', minWidth: '240px', fontSize: '13px' }}
          />
        </div>
      </div>

      {error && (
        <div className="enquiry-error" style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid #ef4444', color: '#fca5a5', padding: '12px 18px', borderRadius: '8px', marginBottom: '20px' }}>
          Notice: {error}
        </div>
      )}

      {filteredEnquiries.length === 0 ? (
        <div className="empty-state" style={{ padding: '60px 20px', textAlign: 'center', background: '#0b1120', borderRadius: '14px', border: '1px dashed #334155', color: '#94a3b8' }}>
          <p style={{ fontSize: '16px', marginBottom: '8px' }}>
            {enquiries.length === 0 ? "No enquiries received yet." : "No enquiries match your current filter."}
          </p>
          <span style={{ fontSize: '13px', color: '#64748b' }}>
            When someone submits an enquiry on the website, it will show up here automatically in real time!
          </span>
        </div>
      ) : (
        <div className="enquiries-grid">
          {filteredEnquiries.map(enquiry => (
            <div key={enquiry.id} className={`enquiry-card ${enquiry.status || 'new'}`}>
              <div className="enquiry-header">
                <div>
                  <h4>{enquiry.name || "Anonymous Client"}</h4>
                  <p className="enquiry-company">{enquiry.company || "Individual / Organization"}</p>
                </div>
                <span className={`status-badge ${enquiry.status || 'new'}`}>
                  {enquiry.status || 'new'}
                </span>
              </div>
              <div className="enquiry-body">
                <p><strong>Email:</strong> {enquiry.email ? <a href={`mailto:${enquiry.email}`} style={{ color: '#00aaff', textDecoration: 'none' }}>{enquiry.email}</a> : "N/A"}</p>
                <p><strong>Phone:</strong> {enquiry.phone ? <a href={`tel:${enquiry.phone}`} style={{ color: '#10b981', textDecoration: 'none' }}>{enquiry.phone}</a> : "N/A"}</p>
                <p><strong>Requirement:</strong> <span style={{ color: '#f59e0b', fontWeight: 600 }}>{enquiry.requirement || "General Inquiry"}</span></p>
                <p className="enquiry-msg" style={{ marginTop: '10px', background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '8px' }}>
                  {enquiry.message || "No message provided."}
                </p>
              </div>
              <div className="enquiry-footer">
                <span className="enquiry-date">{formatDate(enquiry.createdAt)}</span>
                <div className="enquiry-actions">
                  <select 
                    value={enquiry.status || 'new'} 
                    onChange={(e) => updateStatus(enquiry.id, e.target.value)}
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="closed">Closed</option>
                  </select>
                  <button className="btn-delete" onClick={() => deleteEnquiry(enquiry.id)}>Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default EnquiriesManager;
