import { useState, useEffect } from "react";
import { db } from "../../firebase";
import { collection, query, orderBy, onSnapshot, deleteDoc, doc, setDoc, updateDoc } from "firebase/firestore";
import MediaManager from "./MediaManager";

function ListManager({ collectionName, title, hasGallery = false }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [editingItem, setEditingItem] = useState(null);
  const [showMediaPicker, setShowMediaPicker] = useState(false);

  useEffect(() => {
    const q = query(collection(db, collectionName), orderBy("order", "asc"));
    const unsub = onSnapshot(q, (snap) => {
      setItems(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      setLoading(false);
    });
    return () => unsub();
  }, [collectionName]);

  const handleAddNew = () => {
    setEditingItem({
      id: `new_\${Date.now()}`,
      title: "",
      description: "",
      image: "",
      order: items.length + 1,
      isNew: true
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const { id, isNew, ...data } = editingItem;
    
    try {
      if (isNew) {
        const newRef = doc(collection(db, collectionName));
        await setDoc(newRef, { ...data, createdAt: new Date() });
      } else {
        await updateDoc(doc(db, collectionName, id), { ...data, updatedAt: new Date() });
      }
      setEditingItem(null);
    } catch (err) {
      console.error(err);
      alert("Error saving.");
    }
  };

  const handleDelete = async (id) => {
    if(window.confirm("Delete this item?")) {
      await deleteDoc(doc(db, collectionName, id));
    }
  };

  const selectImage = (url) => {
    setEditingItem({ ...editingItem, image: url });
    setShowMediaPicker(false);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="admin-list-manager">
      <div className="list-header">
        <h2>{title}</h2>
        <button className="btn-add" onClick={handleAddNew}>+ Add New</button>
      </div>

      {editingItem ? (
        <div className="editor-modal">
          <form onSubmit={handleSave} className="admin-form">
            <h3>{editingItem.isNew ? "Add New" : "Edit"} Item</h3>
            
            <div className="form-group">
              <label>Title</label>
              <input required type="text" value={editingItem.title || ""} onChange={e => setEditingItem({...editingItem, title: e.target.value})} />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea required value={editingItem.description || ""} onChange={e => setEditingItem({...editingItem, description: e.target.value})} rows="4" />
            </div>

            {hasGallery && (
              <div className="form-group">
                <label>Main Image</label>
                <div className="image-selector">
                  {editingItem.image && <img src={editingItem.image} alt="preview" className="img-preview" />}
                  <button type="button" onClick={() => setShowMediaPicker(true)}>Select from Media</button>
                  {editingItem.image && <button type="button" onClick={() => setEditingItem({...editingItem, image: ""})}>Clear</button>}
                </div>
              </div>
            )}

            <div className="form-group">
              <label>Order</label>
              <input type="number" value={editingItem.order || 0} onChange={e => setEditingItem({...editingItem, order: Number(e.target.value)})} />
            </div>

            <div className="form-actions">
              <button type="button" className="btn-cancel" onClick={() => setEditingItem(null)}>Cancel</button>
              <button type="submit" className="btn-save">Save</button>
            </div>
          </form>

          {showMediaPicker && (
            <div className="media-picker-modal">
              <div className="modal-content">
                <button className="btn-close" onClick={() => setShowMediaPicker(false)}>X</button>
                <MediaManager isPicker={true} onSelect={selectImage} />
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="list-grid">
          {items.map(item => (
            <div key={item.id} className="list-item-card">
              {item.image && <img src={item.image} alt={item.title} className="item-thumb" />}
              <div className="item-details">
                <h4>{item.title}</h4>
                <p>Order: {item.order}</p>
              </div>
              <div className="item-actions">
                <button onClick={() => setEditingItem(item)}>Edit</button>
                <button className="btn-delete" onClick={() => handleDelete(item.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ListManager;
