import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import "./ContactSection.css";
import { motion } from "framer-motion";
import { useSiteContent } from '../utils/firebaseUtils';

function ContactSection() {
  const { loading: contentLoading } = useSiteContent('contact', { phone: '+91 98765 43210', email: 'info@jayelectronics.in', address: 'Kolhapur, Maharashtra, India' });
  const { data: socialData } = useSiteContent('social');

  const getWhatsAppUrl = () => {
    if (!socialData?.whatsapp) return "https://wa.me/919876543210";
    if (socialData.whatsapp.startsWith('http')) return socialData.whatsapp;
    const digits = socialData.whatsapp.replace(/[^0-9]/g, '');
    return `https://wa.me/${digits || '919876543210'}`;
  };

  const getInstagramUrl = () => {
    if (!socialData?.instagram) return "https://www.instagram.com/";
    if (socialData.instagram.startsWith('http')) return socialData.instagram;
    return `https://www.instagram.com/${socialData.instagram.replace(/^@/, '')}`;
  };

  const getFacebookUrl = () => {
    if (!socialData?.facebook) return "https://www.facebook.com/";
    if (socialData.facebook.startsWith('http')) return socialData.facebook;
    return `https://www.facebook.com/${socialData.facebook}`;
  };

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
    visible: { transition: { staggerChildren: 0.15 } }
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
            visible: { opacity: 1, y: 0, transition: { duration: 1.2 } }
          }}
        >
          <div className="contact-label-wrap">
            <span className="contact-label-line"></span>
            <p className="contact-label">GET IN TOUCH</p>
            <div className="purple-gold-line"></div>
          </div>

          <h2 className="text-shine">
            Let’s build<span> your solution.</span>
          </h2>
        </motion.div>

        <div className="contact-content">

          <motion.div 
            className="contact-info"
            variants={{
              hidden: { opacity: 0, x: -30 },
              visible: { opacity: 1, x: 0, transition: { duration: 1.2 } }
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
            <div className="purple-gold-line"></div>

              <p className="contact-company-text">
                Technology Integrator & Infrastructure
                Service Provider delivering integrated
                technology, security and infrastructure
                solutions.
              </p>
            </div>

            {/* Social Channels on Home Page */}
            <div className="contact-social-channels">
              <p className="contact-social-title">
                Connect Directly on Social Media:
              </p>
              <div className="contact-social-grid">
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-social-pill contact-wa-pill"
                  aria-label="Connect on WhatsApp"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.031 0C5.405 0 0 5.414 0 12.046c0 2.128.553 4.2 1.603 6.035L.031 24l6.062-1.593A11.967 11.967 0 0012.031 24c6.627 0 12.032-5.414 12.032-12.046C24.062 5.414 18.658 0 12.031 0zm3.834 17.15c-.19.534-1.096 1.026-1.523 1.096-.395.065-.892.122-2.585-.579-2.035-.845-3.344-2.92-3.444-3.054-.099-.134-.823-1.096-.823-2.091 0-.994.512-1.482.693-1.685.18-.203.394-.254.526-.254.132 0 .264 0 .378.006.12.006.284-.046.435.318.15.364.512 1.25.558 1.343.045.093.076.202.016.324-.06.122-.09.197-.18.29-.09.094-.19.202-.27.284-.091.092-.191.196-.078.39.112.194.502.83 1.077 1.341.742.66 1.365.86 1.558.954.193.094.307.078.423-.053.115-.133.498-.58.632-.78.134-.2.27-.166.446-.102.176.064 1.115.526 1.306.622.191.096.318.14.364.22.046.079.046.46-.144.994z"/>
                  </svg>
                  <span>WhatsApp</span>
                </a>

                <a
                  href={getInstagramUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-social-pill contact-ig-pill"
                  aria-label="Follow on Instagram"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  <span>Instagram</span>
                </a>

                <a
                  href={getFacebookUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-social-pill contact-fb-pill"
                  aria-label="Visit on Facebook"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span>Facebook</span>
                </a>
              </div>
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