import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import "./ContactSection.css";
import { motion } from "framer-motion";
import { useSiteContent } from '../utils/firebaseUtils';

function ContactSection() {
  const { loading: contentLoading } = useSiteContent('contact', { phone: '+91 98765 43210', email: 'info@jayelectronics.in', address: 'Kolhapur, Maharashtra, India' });

  const [formData, setFormData] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    requirement: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  if (contentLoading) return null;

  if (contentLoading) return null;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setSuccess("");
    setError("");

    try {
      await addDoc(collection(db, "enquiries"), {
        ...formData,
        status: "new",
        createdAt: serverTimestamp(),
      });

      setSuccess("Your enquiry has been successfully submitted.");

      setFormData({
        name: "",
        company: "",
        phone: "",
        email: "",
        requirement: "",
        message: "",
      });
    } catch (err) {
      console.error("Enquiry submission error:", err);

      setError(
        "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const formVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } }
  };

  const fieldVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <section className="contact-section" id="contact">
      <div className="logo-watermark"></div>
      <motion.div 
        className="contact-container"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >

        <motion.div 
          className="contact-header"
          variants={{
            hidden: { opacity: 0, y: -20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
          }}
        >
          <div className="contact-label-wrap">
            <span className="contact-label-line"></span>
            <p className="contact-label">GET IN TOUCH</p>
          </div>

          <h2>
            Let’s build<span> your solution.</span>
          </h2>
        </motion.div>

        <div className="contact-content">

          <motion.div 
            className="contact-info"
            variants={{
              hidden: { opacity: 0, x: -30 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
            }}
          >

            <p className="contact-lead">
              Looking for a technology partner for your next
              security, networking, telecom or infrastructure
              project?
            </p>

            <p className="contact-description">
              Tell us about your requirement and our team can
              understand the scope and explore the right
              technology approach for your project.
            </p>

            <div className="contact-company">
              <p className="contact-company-label">
                JAY ELECTRONICS PVT LTD
              </p>

              <p className="contact-company-text">
                Technology Integrator & Infrastructure
                Service Provider delivering integrated
                technology, security and infrastructure
                solutions.
              </p>
            </div>

          </motion.div>

          <motion.form
            className="contact-form"
            onSubmit={handleSubmit}
            variants={formVariants}
          >

            <div className="contact-form-row">

              <motion.div className="contact-field" variants={fieldVariants}>
                <label htmlFor="name">Name</label>

                <input
                  id="name"
                  type="text"
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </motion.div>

              <motion.div className="contact-field" variants={fieldVariants}>
                <label htmlFor="company">
                  Company (Optional)
                </label>

                <input
                  id="company"
                  type="text"
                  placeholder="Organization name"
                  value={formData.company}
                  onChange={handleChange}
                />
              </motion.div>

            </div>

            <div className="contact-form-row">

              <motion.div className="contact-field" variants={fieldVariants}>
                <label htmlFor="phone">Phone</label>

                <input
                  id="phone"
                  type="tel"
                  placeholder="Phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </motion.div>

              <motion.div className="contact-field" variants={fieldVariants}>
                <label htmlFor="email">Email</label>

                <input
                  id="email"
                  type="email"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </motion.div>

            </div>

            <motion.div className="contact-field" variants={fieldVariants}>
              <label htmlFor="requirement">
                Technology Requirement
              </label>

              <select
                id="requirement"
                value={formData.requirement}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Select a category
                </option>

                <option value="Electronic Security">
                  Electronic Security
                </option>

                <option value="Networking">Networking</option>

                <option value="Telecom">Telecom</option>

                <option value="Audio Visual">
                  Audio Visual
                </option>

                <option value="Fire & Safety">
                  Fire & Safety
                </option>

                <option value="Infrastructure">
                  Infrastructure
                </option>

                <option value="Other">Other</option>
              </select>
            </motion.div>

            <motion.div className="contact-field" variants={fieldVariants}>
              <label htmlFor="message">Message</label>

              <textarea
                id="message"
                rows="4"
                placeholder="Tell us about your project requirements..."
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </motion.div>

            <motion.div variants={fieldVariants}>
              <button
                type="submit"
                className="contact-submit-btn"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit Enquiry"}
                <span>→</span>
              </button>

              {success && (
                <div className="form-success">{success}</div>
              )}

              {error && (
                <div className="form-error">{error}</div>
              )}
            </motion.div>
          </motion.form>

        </div>
      </motion.div>
    </section>
  );
}

export default ContactSection;