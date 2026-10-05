import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc } from "firebase/firestore";

function EnquiriesManager() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "enquiries"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setEnquiries(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await updateDoc(doc(db, "enquiries", id), { status });
    } catch (e) {
      console.error(e);
    }
  };

  const deleteEnquiry = async (id) => {
    if (window.confirm("Are you sure you want to delete this enquiry?")) {
      await deleteDoc(doc(db, "enquiries", id));
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return "N/A";
    return new Intl.DateTimeFormat('en-IN', {
      day: '2-digit', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    }).format(timestamp.toDate());
  };

  if (loading) return <div>Loading enquiries...</div>;

  return (
    <div className="admin-enquiries">
      {enquiries.length === 0 ? (
        <div className="empty-state">No enquiries yet.</div>
      ) : (
        <div className="enquiries-grid">
          {enquiries.map(enquiry => (
            <div key={enquiry.id} className={`enquiry-card \${enquiry.status}`}>
              <div className="enquiry-header">
                <div>
                  <h4>{enquiry.name}</h4>
                  <p className="enquiry-company">{enquiry.company || "Individual"}</p>
                </div>
                <span className={`status-badge \${enquiry.status || 'new'}`}>
                  {enquiry.status || 'new'}
                </span>
              </div>
              <div className="enquiry-body">
                <p><strong>Email:</strong> {enquiry.email}</p>
                <p><strong>Phone:</strong> {enquiry.phone}</p>
                <p><strong>Req:</strong> {enquiry.requirement}</p>
                <p className="enquiry-msg">{enquiry.message}</p>
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
