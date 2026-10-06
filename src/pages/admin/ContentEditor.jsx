import { useState, useEffect } from "react";
import { updateSiteContent } from "../../utils/firebaseUtils";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";

function ContentEditor({ sectionId, title }) {
  const [formData, setFormData] = useState({});
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "siteContent", sectionId), (doc) => {
      if (doc.exists()) {
        setFormData(doc.data());
      } else {
        setFormData({});
      }
    });
    return () => unsub();
  }, [sectionId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateSiteContent(sectionId, formData);
      setMsg("Saved successfully!");
      setTimeout(() => setMsg(""), 3000);
    } catch {
      setMsg("Error saving.");
    }
    setSaving(false);
  };

  const getFields = () => {
    switch (sectionId) {
      case "hero":
        return [
          { name: "heading", label: "Hero Heading", type: "text" },
          { name: "subheading", label: "Hero Subheading", type: "text" },
          { name: "primaryCtaText", label: "Primary CTA Text", type: "text" },
        ];
      case "about":
        return [
          { name: "heading", label: "About Heading", type: "text" },
          { name: "description", label: "Description", type: "textarea" },
        ];
      case "whyJay":
        return [
          { name: "heading", label: "Heading", type: "text" },
          { name: "description", label: "Description", type: "textarea" },
        ];
      case "contact":
        return [
          { name: "phone", label: "Phone Number", type: "text" },
          { name: "email", label: "Email Address", type: "text" },
          { name: "address", label: "Office Address", type: "textarea" },
        ];
      case "footer":
        return [
          { name: "description", label: "Footer Description", type: "textarea" },
          { name: "copyright", label: "Copyright Text", type: "text" },
        ];
      default:
        return [];
    }
  };

  return (
    <div className="admin-content-editor">
      <h2>{title}</h2>
      <form onSubmit={handleSave} className="admin-form">
        {getFields().map((field) => (
          <div key={field.name} className="form-group">
            <label>{field.label}</label>
            {field.type === "textarea" ? (
              <textarea 
                name={field.name} 
                value={formData[field.name] || ""} 
                onChange={handleChange} 
                rows="4"
              />
            ) : (
              <input 
                type="text" 
                name={field.name} 
                value={formData[field.name] || ""} 
                onChange={handleChange} 
              />
            )}
          </div>
        ))}
        
        <div className="form-actions">
          <button type="submit" disabled={saving} className="btn-save">
            {saving ? "Saving..." : "Save Changes"}
          </button>
          {msg && <span className="save-msg">{msg}</span>}
        </div>
      </form>
    </div>
  );
}

export default ContentEditor;
