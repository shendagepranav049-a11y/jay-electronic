import "./ContactSection.css";

function ContactSection() {
  return (
    <section className="contact-section" id="contact">
      <div className="contact-container">

        {/* Header */}
        <div className="contact-header">
          <span className="contact-label">CONTACT US</span>

          <h2>
            Let&apos;s build your
            <br />
            solution.
          </h2>

          <p>
            Tell us about your requirement and our team can help you
            explore the right technology and infrastructure solution.
          </p>
        </div>

        {/* Contact Content */}
        <div className="contact-content">

          {/* Left Side */}
          <div className="contact-info">

            <div className="contact-info-block">
              <span className="contact-info-label">
                COMPANY
              </span>

              <h3>Jay Electronics Pvt Ltd</h3>

              <p>
                Technology Integrator &amp; Infrastructure
                Service Provider
              </p>
            </div>

            <div className="contact-info-block">
              <span className="contact-info-label">
                ENQUIRY
              </span>

              <p>
                Have a project requirement or need a technology
                solution? Send us your enquiry and share your
                requirement with our team.
              </p>
            </div>

            <div className="contact-info-block">
              <span className="contact-info-label">
                LOCATION
              </span>

              <p>
                Address details to be added after confirmation
                from the client.
              </p>
            </div>

          </div>

          {/* Form */}
          <div className="contact-form-wrapper">

            <form className="contact-form">

              <div className="form-row">

                <div className="form-group">
                  <label htmlFor="name">
                    Name
                  </label>

                  <input
                    id="name"
                    type="text"
                    placeholder="Your name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="company">
                    Company
                  </label>

                  <input
                    id="company"
                    type="text"
                    placeholder="Company name"
                  />
                </div>

              </div>

              <div className="form-row">

                <div className="form-group">
                  <label htmlFor="phone">
                    Phone
                  </label>

                  <input
                    id="phone"
                    type="tel"
                    placeholder="Phone number"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">
                    Email
                  </label>

                  <input
                    id="email"
                    type="email"
                    placeholder="Email address"
                  />
                </div>

              </div>

              <div className="form-group">
                <label htmlFor="requirement">
                  Requirement
                </label>

                <input
                  id="requirement"
                  type="text"
                  placeholder="What solution are you looking for?"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">
                  Message
                </label>

                <textarea
                  id="message"
                  rows="6"
                  placeholder="Tell us about your project or requirement..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="contact-submit"
              >
                Submit Enquiry
                <span>→</span>
              </button>

            </form>

          </div>

        </div>

      </div>
    </section>
  );
}

export default ContactSection;