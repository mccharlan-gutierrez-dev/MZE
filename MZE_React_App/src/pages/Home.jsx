
import React from "react";
import "../css/Home.css";
import { useState } from 'react';

// ==============================
// IMAGE IMPORTS
// ==============================

import heroBg from "../assets/Hero section Bg.png";

// import smartphonesImg from "../assets/nov1.jpg";
// import laptopsImg from "../assets/nov2.jpg";
// import gamingImg from "../assets/nov3.jpg";
// import camerasImg from "../assets/nov4.jpg";



// ==============================
// WHY CHOOSE MZE FEATURES DATA
// ==============================

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


// ==============================
// PAWN & SELL SERVICES DATA
// ==============================

// const services = [
//   {
//     title: "Smartphones & Tablets",
//     description: "Latest models & trusted brands",
//     image: smartphonesImg,
//   },
//   {
//     title: "Laptops & Computers",
//     description: "Work, study, create",
//     image: laptopsImg,
//   },
//   {
//     title: "Gaming Consoles",
//     description: "Play more, spend less",
//     image: gamingImg,
//   },
//   {
//     title: "Cameras & Accessories",
//     description: "Capture your moments",
//     image: camerasImg,
//   },
  
  
  
// ];


// ==============================
// MAIN HOME COMPONENT
// ==============================

const Home = () => {
  return (
    <div className="body">

      {/* HERO SECTION */}

      <section
        className="hero h-[445px]"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >

        <div className="hero-overlay"></div>

        <div className="hero-content text-neutral-content text-center">

          <div className="max-w-md">

            <h1 className="mb-5 text-5xl font-bold">
              Gawin Budget Ang Inyong Gadget
            </h1>

            <p className="mb-5">
              MZE Pawnshop & Trading offers fast and hassle-free
              pawnshop, buying, and selling services. Get the best
              value for your items with secure and professional service.
            </p>

            <div className="hero-buttons">

              <a href="#pawnshop" className="btn-primary">
                Pawn Now
                <span className="arrow">→</span>
              </a>

              <a href="#products" className="btn-secondary">
                Our  Products
              </a>

            </div>

          </div>

        </div>

      </section>


      {/* WHY CHOOSE MZE SECTION */}

      <WhyChoose />


      {/* WHAT WE PAWN & SELL SECTION */}

      <PawnServices />

    </div>
  );
};


// ==============================
// WHY CHOOSE MZE COMPONENT
// ==============================

const WhyChoose = () => {
  return (
    <section className="why-choose">

      <div className="why-container">

        {/* LEFT CONTENT */}

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


        {/* FEATURE CARDS */}

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


// ==============================
// PAWN & SELL SERVICES COMPONENT
// ==============================

const PawnServices = () => {
  const [showAll, setShowAll] = useState(false);
  return (
    <section className="services-section" id="products">

      {/* SECTION HEADER */}

      <div className="services-header">

        <div className="services-heading">

          <span className="section-label">
            OUR SERVICES
          </span>

          <h2>
            What We Pawn & Sell
          </h2>

          <p>
            
            We accept a wide range of gadgets and electronic devices.
            <br />
           Get cash today or shop for quality pre-owned gadgets.
          </p>

        </div>

      

      </div>


      {/* SERVICES GRID */}

    <div className="services-grid">

  {/* PHONES */}
  <div className="card bg-base-100 shadow-sm service-product-card">
    <figure>
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3e-0IiIy_UxqbVaqXTL3jhA2ZuRJ-FIFTa0HBCIRKLQ&s=10" alt="Phones" />
    </figure>
    <div className="card-body">
      <h2 className="card-title">Phones</h2>
      <p>Various brands, models, and affordable choices.</p>
      {/* 5 STAR RATING */}
      <div className="product-rating">
        <span>★★★★★</span>
        
      </div>
    </div>
  </div>

  {/* LAPTOPS */}
  <div className="card bg-base-100 shadow-sm service-product-card">
    <figure>
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2QgzOcNrJS09f_xO1b5wEc94uC4jFXSUi9NwF3mGGWg&s=10" alt="Laptops" />
    </figure>
    <div className="card-body">
      <h2 className="card-title">Laptops</h2>
      <p>Different brands and models for work, school, and everyday use.</p>
      {/* 5 STAR RATING */}
      <div className="product-rating">
        <span>★★★★★</span>
        
      </div>
    </div>
  </div>

  {/* TABLETS */}
  <div className="card bg-base-100 shadow-sm service-product-card">
    <figure>
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTv1cWaSm_IMUsznXc_ctyNyD3pycDe_rnnRRCSKvW8Rg&s=10" alt="Tablets" />
    </figure>
    <div className="card-body">
      <h2 className="card-title">Tablets</h2>
      <p>Explore various tablets for entertainment and productivity.</p>
      {/* 5 STAR RATING */}
      <div className="product-rating">
        <span>★★★★★</span>
        
      </div>
    </div>
  </div>

  {/* OTHER PRODUCTS - SHOW WHEN CLICKED */}
{showAll && (
  <>
    {/* GAMING */}
    <div className="card bg-base-100 shadow-sm service-product-card">
      <figure>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnvmE8FiGoT8qXZUzdKPmQ3lxbpTJ8CMaumIV3Ur0SDA&s=10"
          alt="Gaming Consoles"
        />
      </figure>

      <div className="card-body">
        <h2 className="card-title">Gaming Consoles</h2>
        <p>Gaming devices and consoles from different generations.</p>
        {/* 5 STAR RATING */}
      <div className="product-rating">
        <span>★★★★★</span>
        
      </div>
      </div>
    </div>

    {/* SMART TV */}
    <div className="card bg-base-100 shadow-sm service-product-card">
      <figure>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnFbPq18qYaLkkLyud2ujtQYTw8EZ7QdIZmbnyCVZUsA&s=10"
          alt="Smart TV"
        />
      </figure>

      <div className="card-body">
        <h2 className="card-title">Smart TV</h2>
        <p>Various TV brands, screen sizes, and models for every home.</p>
        {/* 5 STAR RATING */}
      <div className="product-rating">
        <span>★★★★★</span>
        
        
      </div>
      </div>
    </div>

    {/* ACTION CAM */}
    <div className="card bg-base-100 shadow-sm service-product-card">
      <figure>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToXhJKz34A9i9ra2WUTjzrdPIB-pOf7UO5iGhJatV9MA&s=10"
          alt="Action Cam"
        />
      </figure>

      <div className="card-body">
        <h2 className="card-title">Action Cam</h2>
        <p>Capture every adventure with action cameras from various brands.</p>
        {/* 5 STAR RATING */}
      <div className="product-rating">
        <span>★★★★★</span>
        
      </div>
      </div>
    </div>
  </>
)}

 {/* VIEW ALL BUTTON */}
        <button
          className="view-all"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? 'Show Less ↑' : 'View All Products →'}
        </button>
  

 
</div>

    </section>

    
  );
};


// ==============================
// EXPORT HOME
// ==============================

export default Home;
