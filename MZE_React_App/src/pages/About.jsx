

import React, { useRef, useEffect, useState } from "react";
import "../css/About.css";

// =====================================
// IMAGE IMPORTS
// =====================================

import missionImg from "../assets/banner.webp";
import visionImg from "../assets/banner2.webp";

// =====================================
// CORE VALUES DATA
// =====================================

const coreValues = [
  {
    title: "Integrity",
    description: "Doing the right thing even when nobody is looking.",
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M12 2L20 5V11C20 16 16.5 20 12 22C7.5 20 4 16 4 11V5L12 2Z" />
        <path d="M8.5 12L11 14.5L16 9.5" />
      </svg>
    ),
  },
  {
    title: "Customer Focus",
    description: "Your satisfaction is our top priority.",
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M7 11L9.5 8.5C10.5 7.5 12 7.5 13 8.5L14 9.5" />
        <path d="M3 10L6 7L10 11L7 14L3 10Z" />
        <path d="M21 10L18 7L14 11L17 14L21 10Z" />
        <path d="M8 15L10 17C11 18 12 18 13 17L17 13" />
      </svg>
    ),
  },
  {
    title: "Excellence",
    description: "What we do with one thing is what we do with everything.",
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M12 2L15 4L19 4L20 8L22 11L20 14L19 18L15 18L12 22L9 18L5 18L4 14L2 11L4 8L5 4L9 4Z" />
        <path d="M9 11L11 13L15 9" />
        <path d="M9 18L8 22M15 18L16 22" />
      </svg>
    ),
  },
  {
    title: "Loyalty",
    description:
      "Loyalty to the core values, peers, and the hands that gave the opportunity.",
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M12 21s-8-4.5-8-11a4.5 4.5 0 0 1 8-2.5A4.5 4.5 0 0 1 20 10c0 6.5-8 11-8 11Z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "Work Like Owners",
    description:
      "The only way to succeed is if you work as if it's your own company.",
    icon: (
      <svg viewBox="0 0 24 24">
        <rect x="3" y="7" width="18" height="14" rx="2" />
        <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        <path d="M3 12h18" />
        <path d="M10 12v2h4v-2" />
      </svg>
    ),
  },
  {
    title: "Customer Service",
    description:
      "It’s the customer’s appreciation and loyalty that will bring you success.",
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M3 13v-2a9 9 0 0 1 18 0v2" />
        <rect x="3" y="12" width="4" height="7" rx="2" />
        <rect x="17" y="12" width="4" height="7" rx="2" />
        <path d="M21 17v1a3 3 0 0 1-3 3h-3" />
        <path d="M13 21h2" />
      </svg>
    ),
  },
];

// =====================================
// TESTIMONIAL DATA
// =====================================

const testimonials = [
  {
    quote:
      "MZE Pawnshop gave me the best appraisal for my gadgets. Fast and transparent!",
    name: "Maria Santos",
    location: "Quezon City",
    image: "https://i.pravatar.cc/100?img=47",
    rating: 5,
  },
  {
    quote:
      "Reliable, safe, and very professional. I always trust MZE!",
    name: "James Dela Cruz",
    location: "Manila",
    image: "https://i.pravatar.cc/100?img=12",
    rating: 5,
  },
  {
    quote:
      "Great experience! The staff are accommodating and the process is really fast.",
    name: "Anna Reyes",
    location: "Pasig",
    image: "https://i.pravatar.cc/100?img=44",
    rating: 5,
  },
  {
    quote:
      "Very convenient service and friendly staff. Highly recommended!",
    name: "John Mendoza",
    location: "Makati",
    image: "https://i.pravatar.cc/100?img=13",
    rating: 5,
  },
  {
    quote:
      "The transaction was smooth and hassle-free. I will definitely come back!",
    name: "Angela Garcia",
    location: "Taguig",
    image: "https://i.pravatar.cc/100?img=49",
    rating: 5,
  },
  {
    quote:
      "Excellent customer service and fair appraisal. Thank you, MZE!",
    name: "Mark Villanueva",
    location: "Marikina",
    image: "https://i.pravatar.cc/100?img=11",
    rating: 5,
  },
];

const shopServices = [
  {
    title: "Gadget Sales with Buy-Back Options",
    description:
      "We buy pre-loved gadgets and give the original owner the opportunity to buy them back.",
    icon: (
      <svg viewBox="0 0 24 24">
        <rect x="6" y="2" width="12" height="20" rx="2" />
        <path d="M10 18h4" />
        <path d="M9 7h6" />
        <path d="M9 11h6" />
      </svg>
    ),
  },
  {
    title: "Straight Sales of Gadgets",
    description:
      "When the original owner cannot buy their gadget back, we sell it to others.",
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M3 9l2-5h14l2 5" />
        <path d="M4 9v11h16V9" />
        <path d="M3 9h18" />
        <path d="M9 20v-6h6v6" />
        <path d="M8 4V2h8v2" />
      </svg>
    ),
  },
  {
    title: "Bills Payments",
    description:
      "Conveniently pay your bills with us. Enjoy an easy and hassle-free payment experience.",
    icon: (
      <svg viewBox="0 0 24 24">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 10h18" />
        <path d="M7 15h4" />
        <path d="M16 15h1" />
      </svg>
    ),
  },
];


const useScrollAnimation = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(section);
        }
      },
      {
        threshold: 0.15,
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return { sectionRef, isVisible };
};


// =====================================
// MAIN ABOUT COMPONENT
// =====================================

const About = () => {
  const { sectionRef, isVisible } = useScrollAnimation();
  
  return (
    <main className="about-page">

      {/* ABOUT HERO SECTION */}
      {/* ABOUT HERO SECTION */}
<section
  className={`about-hero ${isVisible ? "is-visible" : ""}`}
  ref={sectionRef}
>
  <div className="about-hero-content">

    <h1 className="force-heading hero-title-animate">
      A Force <span>For Good</span>
    </h1>

    <p className="hero-description-animate">
      As a proud member of the Eguia Group of Companies (EGC),
      we share a story of hope and perseverance. From a small
      medical distribution company that survived changing market
      forces, EGC branched out into finance and wellness,
      becoming an example that dreams do come true.
      MZE Cellular carries this legacy forward, serving
      thousands of happy customers through our well-trained
      sales and service providers.
    </p>

  </div>
</section>

      <ShopServices/>

      {/* MISSION AND VISION */}
      <MissionVision />

      {/* CORE VALUES */}
      <CoreValues />

      {/* TESTIMONIALS */}
      <Testimonials />

    </main>
  );
};

const ShopServices = () => {
   const { sectionRef, isVisible } = useScrollAnimation();
  return (
    <section
      className={`shop-services-section ${isVisible ? "is-visible" : ""}`}
      ref={sectionRef}
    >
      <div className="shop-services-container">

        {/* SECTION HEADER */}
        <div className="shop-services-header">
          <span className="shop-section-label">
            MZE CELLULAR PHONE & GADGET SHOP
          </span>

          <h2>
            More Than Just a <span>Gadget Shop</span>
          </h2>

          <p className="shop-intro">
            A trading company specializing in pre-owned gadgets
            with a unique buy-back option for our customers.
          </p>
        </div>

        {/* SERVICES */}
        <div className="shop-services-grid">
          {shopServices.map((service) => (
            <article
              className="shop-service-card"
              key={service.title}
            >
              <div className="shop-service-icon">
                {service.icon}
              </div>

              <h3>{service.title}</h3>

              <p>{service.description}</p>

              <div className="shop-service-line"></div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
};

// =====================================
// MISSION AND VISION COMPONENT
// =====================================

const MissionVision = () => {
   const { sectionRef, isVisible } = useScrollAnimation();
  return (
     <section
      className={`mission-vision-section ${isVisible ? "is-visible" : ""}`}
      ref={sectionRef}
    >
      <div className="mission-vision-container">

        {/* MISSION CARD */}
        <div
          className="mv-card mission-card"
          style={{ "--card-image": `url(${missionImg})` }}
        >
          <div className="mv-content">

            <div className="mv-icon">
              <svg viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="8" />
                <circle cx="12" cy="12" r="4" />
                <path d="M12 12L21 3M16 3h5v5" />
              </svg>
            </div>

            <span className="mv-label">OUR MISSION</span>

            <h2>Our Mission</h2>

            <p>
              An organization that promotes equal opportunity.
              To be the bridge that connects the gap between
              people that have that motivation and willingness
              to take the extra mile to be called an achiever
              and the stage to shine. A vehicle to people that
              have big dreams but do not have the means to
              achieve it. A company but most of all an
              opportunity provider and a force for good.
            </p>

          </div>
        </div>

        {/* VISION CARD */}
        <div
          className="mv-card vision-card"
          style={{ "--card-image": `url(${visionImg})` }}
        >
          <div className="mv-content">

            <div className="mv-icon">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </div>

            <span className="mv-label">OUR VISION</span>

            <h2>Our Vision</h2>

            <p>
              To be the training ground for excellence and
              the gold standard in each industry it represents
              under the EGC umbrella. To produce partners that
              are motivated and strong but never given the
              right opportunity.
            </p>

          </div>
        </div>

      </div>
    </section>
  );
};

// =====================================
// CORE VALUES COMPONENT
// =====================================

const CoreValues = () => {
  const { sectionRef, isVisible } = useScrollAnimation();
  return (
    <section
      className={`core-values-section ${isVisible ? "is-visible" : ""}`}
      ref={sectionRef}
    >
      <div className="core-values-container">

        {/* HEADER */}
        <div className="core-values-header">

          <div className="core-values-heading">
            <span className="section-label">
              OUR CORE VALUES
            </span>

            <h2>Our Core Values</h2>

            <p>
              These values guide us in serving you better, every day.
            </p>
          </div>

          <div className="core-values-note">
            Trusted by Many,<br />
            Committed for You.
          </div>

        </div>

        {/* CORE VALUE CARDS */}
        <div className="core-values-grid">
          {coreValues.map((value, index) => (
            <div className="core-value-card" key={value.title}>

              <div className="core-value-icon">
                {value.icon}
              </div>

              <h3>{value.title}</h3>

              <p>{value.description}</p>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

// =====================================
// TESTIMONIALS COMPONENT
// =====================================

const Testimonials = () => {
  const sliderRef = useRef(null);
  const { sectionRef, isVisible } = useScrollAnimation();

  // Scroll one card at a time
  const scroll = (direction) => {
    const slider = sliderRef.current;

    if (!slider) return;

    const card = slider.querySelector(".testimonial-card");

    if (!card) return;

    const cardStyle = window.getComputedStyle(card);
    const sliderStyle = window.getComputedStyle(slider);

    const cardWidth = card.offsetWidth;
    const gap = parseFloat(sliderStyle.gap) || 0;

    const scrollAmount = cardWidth + gap;

    slider.scrollBy({
      left: direction === "right" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  };

  return (
     <section
      className={`testimonials-section ${isVisible ? "is-visible" : ""}`}
      ref={sectionRef}
    >
      <div className="testimonials-container">

        {/* HEADER */}
        <div className="testimonials-header">

          <div className="testimonials-heading">
            <span className="testimonials-label">
              WHAT OUR CUSTOMERS SAY
            </span>

            <h2>Customer Testimonials</h2>

            <p>
              Real stories from our valued customers.
            </p>
          </div>

          {/* NAVIGATION BUTTONS */}
          <div className="testimonial-controls">

            <button
              type="button"
              className="testimonial-arrow"
              onClick={() => scroll("left")}
              aria-label="Previous testimonials"
            >
              &#8249;
            </button>

            <button
              type="button"
              className="testimonial-arrow"
              onClick={() => scroll("right")}
              aria-label="Next testimonials"
            >
              &#8250;
            </button>

          </div>
        </div>

        {/* TESTIMONIAL SLIDER */}
        <div
          className="testimonials-slider"
          ref={sliderRef}
          aria-label="Customer testimonials"
        >

          {testimonials.map((item) => (
            <article
              className="testimonial-card"
              key={item.name}
            >

              {/* QUOTE ICON */}
              <div className="testimonial-quote" aria-hidden="true">
                “
              </div>

              {/* CUSTOMER REVIEW */}
              <p className="testimonial-text">
                "{item.quote}"
              </p>

              {/* CUSTOMER DETAILS */}
              <div className="testimonial-bottom">

                <div className="testimonial-profile">

                  <img
                    src={item.image}
                    alt={`Profile of ${item.name}`}
                    loading="lazy"
                  />

                  <div className="testimonial-user-info">

                    <h4>{item.name}</h4>

                    <span className="testimonial-location">
                      <span className="location-pin" aria-hidden="true">
                        ♦
                      </span>
                      {item.location}
                    </span>

                  </div>
                </div>

                {/* STAR RATING */}
                <div
                  className="testimonial-stars"
                  role="img"
                  aria-label={`${item.rating} out of 5 stars`}
                >
                  {"★".repeat(item.rating)}
                </div>

              </div>

            </article>
          ))}

        </div>

      </div>
    </section>
  );
};

export default About;
