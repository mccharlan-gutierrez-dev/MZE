
import React from "react";
import "../css/Contact.css";

function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you! Your message has been submitted.");
    e.target.reset();
  };

  return (
    <section className="contact-section">
      <div className="contact-container">

        {/* LEFT SIDE - ILLUSTRATION */}
        <div className="contact-visual">
          <div className="visual-circle circle-one"></div>
          <div className="visual-circle circle-two"></div>

          <div className="contact-visual-content">
            <span className="contact-tag">
              WE'RE HERE FOR YOU
            </span>

            <h1>
              Let's Start a
              <br />
              <span>Conversation.</span>
            </h1>

            <p>
              Have questions or need assistance?
              Our team at MZE is ready to help you.
              Reach out and let's find the right
              solution together.
            </p>

            <div className="support-illustration">
              <div className="browser-window">
                <div className="browser-header">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>

                <div className="browser-content">
                  <div className="illustration-profile">
                    <div className="profile-head"></div>
                    <div className="profile-body"></div>
                  </div>

                  <div className="chat-bubble bubble-left">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>

                  <div className="chat-bubble bubble-right">
                    <span></span>
                    <span></span>
                  </div>

                  <div className="chat-input">
                    <span>Type your message...</span>
                    <div>➤</div>
                  </div>
                </div>
              </div>

              <div className="floating-message message-one">
                <span>✦</span>
              </div>

              <div className="floating-message message-two">
                <span>💬</span>
              </div>
            </div>

            <div className="contact-bottom-text">
              <span className="online-dot"></span>
              We're always happy to hear from you.
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - CONTACT FORM */}
        <div className="contact-form-wrapper">

          <div className="form-heading">
            <span className="form-subtitle">
              CONTACT MZE
            </span>

            <h2>
              Get in <span>Touch.</span>
            </h2>

            <p>
              We'd love to hear from you. Send us a
              message and we'll get back to you soon.
            </p>
          </div>

          <form
            className="contact-form"
            onSubmit={handleSubmit}
          >
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">
                  First Name <span>*</span>
                </label>
                <input
                  type="text"
                  id="firstName"
                  placeholder="Enter your first name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="lastName">
                  Last Name <span>*</span>
                </label>
                <input
                  type="text"
                  id="lastName"
                  placeholder="Enter your last name"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">
                Email Address <span>*</span>
              </label>
              <input
                type="email"
                id="email"
                placeholder="example@email.com"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">
                Phone Number <span>*</span>
              </label>
              <input
                type="tel"
                id="phone"
                placeholder="Enter your phone number"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                placeholder="What is your inquiry about?"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">
                Your Message <span>*</span>
              </label>
              <textarea
                id="message"
                rows="5"
                placeholder="Write your message here..."
                required
              ></textarea>
            </div>

            <button type="submit" className="contact-submit">
              Send Message
              <span>→</span>
            </button>

            <div className="form-note">
              <span>🔒</span>
              Your information will be kept private and secure.
            </div>
          </form>
        </div>

      </div>
    </section>
  );
}

export default Contact;
