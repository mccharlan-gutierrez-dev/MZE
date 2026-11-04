import React from "react";
import "../css/About.css";

const features = [
  {
    title: "Licensed & Regulated",
    description: "DTI & BSP accredited and regulated.",
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M12 2L3 6v6c0 5.5 3.8 9 9 11 5.2-2 9-5.5 9-11V6l-9-4Z" />
        <path d="m8 12 3 3 5-6" />
      </svg>
    ),
  },
  {
    title: "High Appraisal Value",
    description: "We give you the best value for your items.",
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M12 2 2 7l10 15L22 7 12 2Z" />
        <path d="M2 7h20M12 22 8 7l4-5 4 5-4 15" />
      </svg>
    ),
  },
  {
    title: "Multiple Branches",
    description: "Convenient locations across Metro Manila.",
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </svg>
    ),
  },
  {
    title: "Friendly Staff",
    description: "We are here to assist you anytime.",
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
];

const WhyChoose = () => {
  return (
    <section className="why-choose">
      <div className="why-container">

        {/* Left Content */}
        <div className="why-content">
          <span className="why-label">
            WHY CHOOSE MZE?
          </span>

          <h2>
            Trusted. Fair. Convenient.
          </h2>

          <p>
            We make it easy for you to get the most value
            for your items. With years of experience, we
            are your reliable partner in financial solutions.
          </p>

          <a href="#about" className="why-button">
            Learn More
            <span>→</span>
          </a>
        </div>

        {/* Feature Cards */}
        <div className="why-features">
          {features.map((feature, index) => (
            <div className="why-card" key={index}>
              <div className="why-icon">
                {feature.icon}
              </div>

              <h3>
                {feature.title}
              </h3>

              <p>
                {feature.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhyChoose;