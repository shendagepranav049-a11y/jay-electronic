import { useState, useEffect } from "react";
import { db, storage } from "../../firebase";
import { collection, query, orderBy, onSnapshot, deleteDoc, doc, setDoc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { uploadMedia } from "../../utils/firebaseUtils";

function MediaManager({ onSelect, isPicker = false }) {
  const [media, setMedia] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [, setProgress] = useState(0);

  useEffect(() => {
    const q = query(collection(db, "media"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      setMedia(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return () => unsub();
  }, []);

  const handleUpload = async (e) => {
    const files = e.target.files;
    if (!files.length) return;
    setUploading(true);
    
    for (let i = 0; i < files.length; i++) {
      try {
        const file = files[i];
        if (!file.type.startsWith("image/")) continue;
        
        const mediaData = await uploadMedia(file, setProgress);
        
        // Save to firestore
        const docRef = doc(collection(db, "media"));
        await setDoc(docRef, mediaData);
      } catch (err) {
        console.error("Upload failed", err);
      }
    }
    setUploading(false);
    setProgress(0);
  };

  const handleDelete = async (item) => {
    if (!window.confirm("Delete this image?")) return;
    try {
      await deleteDoc(doc(db, "media", item.id));
      const storageRef = ref(storage, item.storagePath);
      await deleteObject(storageRef);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="admin-media-manager">
      {!isPicker && <h2>Media & Gallery</h2>}
      
      <div className="upload-zone">
        <label className="btn-upload">
          {uploading ? `Uploading... \${Math.round(progress)}%` : "Upload Image(s)"}
          <input type="file" multiple accept="image/*" onChange={handleUpload} style={{ display: 'none' }} disabled={uploading} />
        </label>
        <p>Supports JPG, PNG, WEBP</p>
      </div>

      <div className="media-grid">
        {media.map(item => (
          <div key={item.id} className="media-item">
            <img src={item.downloadURL} alt={item.fileName} />
            <div className="media-overlay">
              {isPicker ? (
                <button className="btn-select" onClick={() => onSelect(item.downloadURL)}>Select</button>
              ) : (
                <button className="btn-delete-icon" onClick={() => handleDelete(item)}>🗑</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MediaManager;
