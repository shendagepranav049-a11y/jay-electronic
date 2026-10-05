import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import "./ContactSection.css";
import ScrollReveal from "./ScrollReveal";

import { useSiteContent } from '../utils/firebaseUtils';

function ContactSection() {
  const { data: content, loading: contentLoading } = useSiteContent('contact', { phone: '+91 98765 43210', email: 'info@jayelectronics.in', address: 'Kolhapur, Maharashtra, India' });
  if (contentLoading) return null;
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

  const handleChange = (e) => {
    const { id, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setSuccess("");
    setError("");

    try {
      await addDoc(collection(db, "enquiries"), {
        name: formData.name.trim(),
        company: formData.company.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        requirement: formData.requirement,
        message: formData.message.trim(),
        status: "new",
        createdAt: serverTimestamp(),
      });

      setSuccess(
        "Thank you! Your enquiry has been submitted successfully."
      );

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

  return (
    <section className="contact-section" id="contact">
      <div className="logo-watermark"></div>
      <div className="contact-container">

        <ScrollReveal direction="up">
          <div className="contact-header">
            <div className="contact-label-wrap">
              <span className="contact-label-line"></span>
              <p className="contact-label">GET IN TOUCH</p>
            </div>

            <h2>
              Let’s build<span> your solution.</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="contact-content">

          <ScrollReveal direction="left" delay={0.15}>
            <div className="contact-info">

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

            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.25}>
            <form
              className="contact-form"
              onSubmit={handleSubmit}
            >

              <div className="contact-form-row">

                <div className="contact-field">
                  <label htmlFor="name">Name</label>

                  <input
                    id="name"
                    type="text"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="contact-field">
                  <label htmlFor="company">Company</label>

                  <input
                    id="company"
                    type="text"
                    placeholder="Company name"
                    value={formData.company}
                    onChange={handleChange}
                  />
                </div>

              </div>

              <div className="contact-form-row">

                <div className="contact-field">
                  <label htmlFor="phone">Phone</label>

                  <input
                    id="phone"
                    type="tel"
                    placeholder="Phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="contact-field">
                  <label htmlFor="email">Email</label>

                  <input
                    id="email"
                    type="email"
                    placeholder="Email address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

              </div>

              <div className="contact-field">
                <label htmlFor="requirement">
                  Requirement
                </label>

                <select
                  id="requirement"
                  value={formData.requirement}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>
                    Select requirement
                  </option>

                  <option value="security">
                    Electronic Security
                  </option>

                  <option value="networking">
                    Networking
                  </option>

                  <option value="telecom">
                    Telecom
                  </option>

                  <option value="audio-visual">
                    Audio Visual
                  </option>

                  <option value="fire-safety">
                    Fire & Safety
                  </option>

                  <option value="infrastructure">
                    Infrastructure
                  </option>

                  <option value="city-surveillance">
                    City Surveillance
                  </option>

                  <option value="solar">
                    Solar
                  </option>

                  <option value="other">
                    Other
                  </option>
                </select>
              </div>

              <div className="contact-field">
                <label htmlFor="message">
                  Message
                </label>

                <textarea
                  id="message"
                  rows="5"
                  placeholder="Tell us about your project or requirement..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="contact-submit"
                disabled={loading}
              >
                <span>
                  {loading
                    ? "Submitting..."
                    : "Submit Enquiry"}
                </span>

                <span className="contact-submit-arrow">
                  ↗
                </span>
              </button>

              {success && (
                <p className="contact-success">
                  {success}
                </p>
              )}

              {error && (
                <p className="contact-error">
                  {error}
                </p>
              )}

            </form>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
}

export default ContactSection;