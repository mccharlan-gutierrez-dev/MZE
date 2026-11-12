
import React from "react";
import "../css/Contact.css";

const ContactIcon = ({ type }) => {
  const icons = {
    headset: (
      <>
        <path d="M3 14v-3a9 9 0 0 1 18 0v3" />
        <path d="M5 14h2v6H5a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2Z" />
        <path d="M19 14h-2v6h2a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2Z" />
      </>
    ),
    phone: (
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 11.19 18a19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.09 3.18 2 2 0 0 1 4.08 1h3a2 2 0 0 1 2 1.72c.12.96.36 1.9.7 2.8a2 2 0 0 1-.45 2.11L8.06 8.94a16 16 0 0 0 6 6l1.31-1.31a2 2 0 0 1 2.11-.45c.9.34 1.84.58 2.8.7A2 2 0 0 1 22 16.92Z" />
    ),
    email: (
      <>
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-10 7L2 7" />
      </>
    ),
    location: (
      <>
        <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </>
    ),
    message: (
      <>
        <path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5Z" />
      </>
    )
  };

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {icons[type]}
    </svg>
  );
};

const contactDetails = [
  {
    icon: "phone",
    title: "Call Us",
    value: "(02) 8123 4567",
    description: "Mon – Sat, 9AM – 7PM"
  },
  {
    icon: "email",
    title: "Email Us",
    value: "support@mzepawn.com",
    description: "We'll respond as soon as possible."
  },
  // {
  //   icon: "location",
  //   title: "Visit Our Branches",
  //   value: "Metro Manila and Nearby Areas",
  //   description: "Find the nearest branch below."
  // },
  {
    icon: "clock",
    title: "Business Hours",
    value: "9:00 AM – 7:00 PM",
    description: "Monday to Saturday"
  }
];

const Contact = () => {
  return (
    <main className="contact-page">

      {/* CONTACT HERO */}
      <section className="contact-hero">

        <div className="contact-hero-content">

          <div className="contact-badge">
            <ContactIcon type="headset" />
            <span>Get in Touch</span>
          </div>

          <h1>
            Contact <span>Us</span>
          </h1>

          <p>
            Have questions? We're here to help! Reach out to us
            <br className="desktop-break" />
            for inquiries, support, or more information about our services.
          </p>

          <div className="contact-underline"></div>

        </div>

        {/* HERO ILLUSTRATION */}
        <div className="contact-hero-art">

          <div className="contact-yellow-shape"></div>

          <div className="contact-envelope">
            <ContactIcon type="email" />
          </div>

          <div className="contact-chat">
            <span></span>
            <span></span>
            <span></span>
          </div>

          <div className="contact-phone">
            <div className="phone-speaker"></div>
            <div className="phone-screen">
              <ContactIcon type="phone" />
            </div>
          </div>

          <div className="contact-rays">
            <span></span>
            <span></span>
            <span></span>
          </div>

        </div>

        {/* CONTACT INFORMATION */}
        <div className="contact-info-grid">

          {contactDetails.map((item, index) => (
            <div className="contact-info-card" key={index}>

              <div className="contact-info-icon">
                <ContactIcon type={item.icon} />
              </div>

              <div className="contact-info-text">
                <h3>{item.title}</h3>
                <h4>{item.value}</h4>
                <p>{item.description}</p>
              </div>

            </div>
          ))}

        </div>

      </section>


{/* =====================================
    SEND US A MESSAGE SECTION
===================================== */}

<section className="contact-form-section">

  <div className="contact-form-header">

    <div className="contact-form-main-icon">
      <svg viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round">
        <path d="m22 2-7 20-4-9-9-4Z" />
        <path d="M22 2 11 13" />
      </svg>
    </div>

    <div>
      <h2>
        Send Us a <span>Message</span>
      </h2>
      <p>Fill out the form below and we'll get back to you shortly.</p>
    </div>

  </div>

  <form
    className="contact-message-form"
    onSubmit={(e) => {
      e.preventDefault();
      alert("Thank you! Your message has been submitted.");
      e.target.reset();
    }}
  >

    {/* NAME AND EMAIL */}
    <div className="contact-form-row">

      <div className="contact-input-group">
        <div className="contact-input-icon">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
            <path d="M4 21a8 8 0 0 1 16 0H4Z" />
          </svg>
        </div>

        <input
          type="text"
          placeholder="Your Name *"
          aria-label="Your Name"
          required
        />
      </div>

      <div className="contact-input-group">
        <div className="contact-input-icon">
          <ContactIcon type="email" />
        </div>

        <input
          type="email"
          placeholder="Your Email *"
          aria-label="Your Email"
          required
        />
      </div>

    </div>

    {/* MESSAGE */}
    <div className="contact-message-group">

      <div className="contact-input-icon">
        <ContactIcon type="message" />
      </div>

      <textarea
        placeholder="Your Message *"
        aria-label="Your Message"
        rows="5"
        required
      ></textarea>

    </div>

    {/* SUBMIT BUTTON */}
    <button type="submit" className="contact-submit-btn">

      <svg viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round">
        <path d="m22 2-7 20-4-9-9-4Z" />
        <path d="M22 2 11 13" />
      </svg>

      <span>Send Message</span>
      <span className="contact-btn-arrow">→</span>

    </button>

  </form>

  <div className="contact-form-decoration"></div>

</section>


    </main>
  );
};

export default Contact;
