import React from 'react';
import "../css/Career.css";

const values = [
  {
    title: "Equal Opportunity",
    description:
      "A platform for everyone to succeed and become independent, regardless of their background.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path
          d="M12 3V21M5 7H19M5 7L2 13H8L5 7ZM19 7L16 13H22L19 7ZM8 21H16"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Personal Growth",
    description:
      "We motivate every member to become a better version of themselves and achieve their dreams.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path
          d="M3 20H21M5 17V12H9V17M11 17V7H15V17M17 17V3H21V17M5 9L11 5L15 8L21 2"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Financial Freedom",
    description:
      "Our goal is to help every willing and capable member of our family achieve true financial security.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2L14.9 8.1L21.5 9L16.7 13.7L17.8 20.3L12 17.2L6.2 20.3L7.3 13.7L2.5 9L9.1 8.1L12 2Z"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];


const Career = () => {
  return (
    <div>
        <div className="hero bg-base-400 min-h-screen">
            <div className="hero-content text-center">
                <div className="max-w-7xl">
                  <h1 className="text-5xl font-bold">Build Your Future With MZE</h1>
                  <p className='w-full max-w-5xl mx-auto mt-6'>
                    We believe in providing more than just a job; we offer a platform for our team to succeed, be independent, and build a better future.

  As our company grows, so do the opportunities for every member of our family. We are motivated to help you become the best version of yourself, turning dreams into reality.

  We want every willing and capable member of this family to achieve their own financial freedom.
                  </p>
                
                </div>
            </div>
        </div>

        <CompanyValues/>
    </div>
  )
}

const CompanyValues = () => {
  return (
    <section className="company-values">
      <div className="values-container">

        {/* Heading */}
        <div className="values-heading">
          <h2>
            Grow. Thrive. <span>Belong.</span>
          </h2>

          <p>
            As our company grows, so do the opportunities for every member
            of our family.
            <br />
            We are motivated to help you become the best version of yourself,
            turning dreams into reality.
          </p>
        </div>

        {/* Value Cards */}
        <div className="values-grid">
          {values.map((value, index) => (
            <div className="value-card" key={index}>
              <div className="value-icon">
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

export default Career