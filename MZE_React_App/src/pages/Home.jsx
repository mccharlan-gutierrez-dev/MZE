import { useRef } from "react";
import "../css/Home.css";

import heroBg from "../assets/Hero section Bg.png";

// =====================================
// WHY CHOOSE MZE FEATURES
// =====================================

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

// =====================================
// PRODUCT DATA - SIX ITEMS
// =====================================

const products = [
  {
    id: 1,
    name: "Phones",
    description: "Various brands, models, and affordable choices.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3e-0IiIy_UxqbVaqXTL3jhA2ZuRJ-FIFTa0HBCIRKLQ&s=10",
  },
  {
    id: 2,
    name: "Laptops",
    description:
      "Different brands and models for work, school, and everyday use.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2QgzOcNrJS09f_xO1b5wEc94uC4jFXSUi9NwF3mGGWg&s=10",
  },
  {
    id: 3,
    name: "Tablets",
    description:
      "Explore various tablets for entertainment and productivity.",
    image:
      "https://d1rlzxa98cyc61.cloudfront.net/catalog/product/cache/1801c418208f9607a371e61f8d9184d9/1/9/197233_2025_8.jpg",
  },
  {
    id: 4,
    name: "Gaming Consoles",
    description:
      "Gaming devices and consoles from different generations.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnvmE8FiGoT8qXZUzdKPmQ3lxbpTJ8CMaumIV3Ur0SDA&s=10",
  },
  {
    id: 5,
    name: "Smart TV",
    description:
      "Various TV brands, screen sizes, and models for every home.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnFbPq18qYaLkkLyud2ujtQYTw8EZ7QdIZmbnyCVZUsA&s=10",
  },
  {
    id: 6,
    name: "Action Cam",
    description:
      "Capture every adventure with action cameras from various brands.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToXhJKz34A9i9ra2WUTjzrdPIB-pOf7UO5iGhJatV9MA&s=10",
  },
];

// =====================================
// HOME
// =====================================

const Home = () => {
  return (
    <div className="body">
      {/* HERO SECTION */}

      <section
        className="hero"
        style={{
          backgroundImage: `
            linear-gradient(
              rgba(0, 0, 0, 0.5),
              rgba(0, 0, 0, 0)
            ),
            url(${heroBg})
          `,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="hero-content">
          <div className="hero-text">
            <h1>Gawin Budget Ang Inyong Gadget</h1>

            <p>
              MZE Pawnshop & Trading offers fast and hassle-free pawnshop,
              buying, and selling services. Get the best value for your items
              with secure and professional service.
            </p>

            <div className="hero-buttons">
              <a href="#pawnshop" className="btn-primary">
                Pawn Now <span className="arrow">→</span>
              </a>

              <a href="#products" className="btn-secondary">
                Our Products
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE MZE */}

      <WhyChoose />

      {/* PRODUCT CAROUSEL */}

      <PawnServices />
    </div>
  );
};

// =====================================
// WHY CHOOSE MZE
// =====================================

const WhyChoose = () => {
  return (
    <section className="why-choose">
      <div className="why-container">
        <div className="why-content">
          <span className="why-label">WHY CHOOSE MZE?</span>

          <h2>Trusted. Fair. Convenient.</h2>

          <p>
            We make it easy for you to get the most value for your items. With
            years of experience, we are your reliable partner in financial
            solutions.
          </p>

          <a href="#about" className="why-button">
            Learn More <span>→</span>
          </a>
        </div>

        <div className="why-features">
          {features.map((feature) => (
            <div className="why-card" key={feature.title}>
              <div className="why-icon">{feature.icon}</div>

              <h3>{feature.title}</h3>

              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// =====================================
// PRODUCT CAROUSEL
// =====================================

const PawnServices = () => {
  const carouselRef = useRef(null);

  const scrollCarousel = (direction) => {
    if (!carouselRef.current) return;

    carouselRef.current.scrollBy({
      left: direction === "next" ? 450 : -450,
      behavior: "smooth",
    });
  };

  return (
    <section className="services-section" id="products">
      <div className="services-header">
        <div className="services-heading">
          <span className="section-label">OUR SERVICES</span>

          <h2>What We Pawn & Sell</h2>

          <p>
            We accept a wide range of gadgets and electronic devices.
            <br />
            Get cash today or shop for quality pre-owned gadgets.
          </p>
        </div>
      </div>

      <div className="services-carousel-wrapper">
        {/* PREVIOUS ARROW */}

        <button
          className="services-carousel-arrow services-arrow-left"
          onClick={() => scrollCarousel("prev")}
          aria-label="Previous products"
        >
          &#8249;
        </button>

        {/* SIX PRODUCT CARDS */}

        <div className="services-grid" ref={carouselRef}>
          {products.map((product) => (
            <article className="service-product-card" key={product.id}>
              <figure>
                <img src={product.image} alt={product.name} loading="lazy" />
              </figure>

              <div className="product-info">
                <h3>{product.name}</h3>

                <p>{product.description}</p>
              </div>
            </article>
          ))}
        </div>

        {/* NEXT ARROW */}

        <button
          className="services-carousel-arrow services-arrow-right"
          onClick={() => scrollCarousel("next")}
          aria-label="Next products"
        >
          &#8250;
        </button>
      </div>
    </section>
  );
};

export default Home;