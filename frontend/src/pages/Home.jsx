// import React from 'react';
// import { Link } from 'react-router-dom';

// function Home() {
//   return (
//     <>
//       {/* Hero Section */}
//       <div className="container-fluid hero-section bg-light text-dark py-5">
//         <div className="container text-center py-5">
//           <h1 className="display-4 fw-bold mb-3">Find Your Future. Fund Your Dreams.</h1>
//           <p className="lead mb-4 col-lg-8 mx-auto">
//             ScholarNest connects students with AI-matched scholarships and expert mentors to guide your academic & career journey.
//           </p>
//           <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
//             <Link to="/scholarships" className="btn btn-primary btn-lg px-4 gap-3">
//               Find Scholarships
//             </Link>
//             <Link to="/mentors" className="btn btn-outline-secondary btn-lg px-4">
//               Become a Mentor
//             </Link>
//           </div>
//         </div>
//       </div>

//       {/* How It Works Section */}
//       <div className="container py-5">
//         <h2 className="text-center fw-bold mb-5">How ScholarNest Works</h2>
//         <div className="row g-4 text-center">
//           {/* Step 1 */}
//           <div className="col-md-4">
//             <div className="card h-100 shadow-sm border-0 p-4">
//               <div className="card-body">
//                 <div className="feature-icon bg-primary bg-gradient text-white fs-2 mb-3">
//                   <span>👤</span>
//                 </div>
//                 <h5 className="card-title fw-bold">1. Create Your Profile</h5>
//                 <p className="card-text">Sign up and build your detailed student profile, including academics, interests, and background.</p>
//               </div>
//             </div>
//           </div>
//           {/* Step 2 */}
//           <div className="col-md-4">
//             <div className="card h-100 shadow-sm border-0 p-4">
//               <div className="card-body">
//                 <div className="feature-icon bg-primary bg-gradient text-white fs-2 mb-3">
//                   <span>🎯</span>
//                 </div>
//                 <h5 className="card-title fw-bold">2. Get AI-Powered Matches</h5>
//                 <p className="card-text">Our intelligent engine instantly matches your profile with scholarships you're eligible for.</p>
//               </div>
//             </div>
//           </div>
//           {/* Step 3 */}
//           <div className="col-md-4">
//             <div className="card h-100 shadow-sm border-0 p-4">
//               <div className="card-body">
//                 <div className="feature-icon bg-primary bg-gradient text-white fs-2 mb-3">
//                   <span>🤝</span>
//                 </div>
//                 <h5 className="card-title fw-bold">3. Connect & Grow</h5>
//                 <p className="card-text">Connect with experienced mentors for guidance on applications, career paths, and more.</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
      
//       {/* Features Section */}
//       <div className="container-fluid bg-light py-5">
//         <div className="container">
//           <div className="row align-items-center g-5">
//             <div className="col-lg-6">
//               <h2 className="fw-bold mb-3">Why Choose ScholarNest?</h2>
//               <p className="lead mb-4">
//                 We go beyond just listings. We provide a complete support system for your academic success.
//               </p>
//               <ul className="list-unstyled fs-5">
//                 <li className="mb-2">✅ <span className="fw-semibold">Intelligent Matching:</span> Save time with AI-driven eligibility checks.</li>
//                 <li className="mb-2">✅ <span className="fw-semibold">Expert Mentorship:</span> Get guidance from verified professionals.</li>
//                 <li className="mb-2">✅ <span className="fw-semibold">Verified Opportunities:</span> All scholarships are vetted by our admin team.</li>
//                 <li className="mb-2">✅ <span className="fw-semibold">Track Your Progress:</span> Manage your applications all in one place.</li>
//               </ul>
//             </div>
//             <div className="col-lg-6">
//               {/* You can place an image or illustration here */}
//               <div className="bg-white p-5 rounded shadow-lg text-center">
//                 <img 
//                   src="https://placehold.co/400x300/0d6efd/white?text=Platform+Screenshot&font=montserrat" 
//                   alt="Platform preview" 
//                   className="img-fluid rounded"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Final CTA Section */}
//       <div className="container py-5 my-5 text-center">
//         <h2 className="fw-bold">Ready to Start Your Journey?</h2>
//         <p className="lead col-lg-7 mx-auto mb-4">
//           Join thousands of students finding success. Create your account today and unlock your potential.
//         </p>
//         <Link to="/register" className="btn btn-primary btn-lg px-5">
//           Sign Up for Free
//         </Link>
//       </div>
//     </>
//   );
// }

// export default Home;



////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////

// src/pages/Home.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentScholarshipSlide, setCurrentScholarshipSlide] = useState(0);

  // Hero Carousel - Featured Scholarship Posters
  const heroScholarships = [
    {
      id: 1,
      title: "L'ORÉAL FOR YOUNG WOMEN IN SCIENCE PROGRAM 2025-26",
      logo: "https://via.placeholder.com/100x50/FF6B35/FFFFFF?text=L'OREAL",
      deadline: "2025-11-03",
      image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1200&h=400&fit=crop"
    },
    {
      id: 2,
      title: "BYPL SASHAKT SCHOLARSHIP 2025-26",
      logo: "https://via.placeholder.com/100x50/FF6B35/FFFFFF?text=BSES",
      deadline: "2025-11-21",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&h=400&fit=crop"
    },
    {
      id: 3,
      title: "SBI PLATINUM JUBILEE ASHA SCHOLARSHIP 2025",
      logo: "https://via.placeholder.com/100x50/FF6B35/FFFFFF?text=SBI",
      deadline: "2025-11-15",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&h=400&fit=crop"
    },
    {
      id: 4,
      title: "NATIONAL MERIT SCHOLARSHIP 2025-26",
      logo: "https://via.placeholder.com/100x50/FF6B35/FFFFFF?text=NMS",
      deadline: "2025-12-01",
      image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=1200&h=400&fit=crop"
    }
  ];

  // More Scholarships Carousel
  const scholarships = [
    {
      id: 1,
      title: "Merit Excellence Award 2025",
      organization: "National Board",
      logo: "https://via.placeholder.com/80x80/FF6B35/FFFFFF?text=NBA",
      deadline: "2025-12-15",
      amount: "₹75,000"
    },
    {
      id: 2,
      title: "Women Empowerment Scholarship",
      organization: "Tech Foundation",
      logo: "https://via.placeholder.com/80x80/FF8C42/FFFFFF?text=TF",
      deadline: "2025-11-30",
      amount: "₹1,00,000"
    },
    {
      id: 3,
      title: "Research Innovation Grant",
      organization: "Science Council",
      logo: "https://via.placeholder.com/80x80/FFA45B/FFFFFF?text=SC",
      deadline: "2026-01-10",
      amount: "₹1,50,000"
    },
    {
      id: 4,
      title: "Sports Excellence Award",
      organization: "Sports Authority",
      logo: "https://via.placeholder.com/80x80/FFBB74/FFFFFF?text=SA",
      deadline: "2025-12-20",
      amount: "₹50,000"
    },
    {
      id: 5,
      title: "Minority Welfare Scholarship",
      organization: "Welfare Department",
      logo: "https://via.placeholder.com/80x80/FFD28D/FFFFFF?text=WD",
      deadline: "2026-01-31",
      amount: "₹60,000"
    },
    {
      id: 6,
      title: "Engineering Excellence Fund",
      organization: "AICTE",
      logo: "https://via.placeholder.com/80x80/FF6B35/FFFFFF?text=AICTE",
      deadline: "2025-11-25",
      amount: "₹80,000"
    }
  ];

  // Success Stories
  const successStories = [
    {
      id: 1,
      name: "Priya Sharma",
      scholarship: "Women in STEM Scholarship",
      amount: "₹1,00,000",
      image: "https://ui-avatars.com/api/?name=Priya+Sharma&background=FF6B35&color=fff&size=200",
      university: "IIT Delhi",
      testimonial: "ScholarNest helped me find the perfect scholarship match!"
    },
    {
      id: 2,
      name: "Rahul Kumar",
      scholarship: "Merit Excellence Award",
      amount: "₹75,000",
      image: "https://ui-avatars.com/api/?name=Rahul+Kumar&background=FF8C42&color=fff&size=200",
      university: "NIT Trichy",
      testimonial: "The AI matching saved me so much time and effort."
    },
    {
      id: 3,
      name: "Ananya Patel",
      scholarship: "Research Innovation Grant",
      amount: "₹1,50,000",
      image: "https://ui-avatars.com/api/?name=Ananya+Patel&background=FFA45B&color=fff&size=200",
      university: "BITS Pilani",
      testimonial: "Connected with amazing mentors through ScholarNest!"
    },
    {
      id: 4,
      name: "Vikram Singh",
      scholarship: "Sports Excellence Award",
      amount: "₹50,000",
      image: "https://ui-avatars.com/api/?name=Vikram+Singh&background=FFBB74&color=fff&size=200",
      university: "DU",
      testimonial: "Best platform for scholarship discovery and application."
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroScholarships.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroScholarships.length) % heroScholarships.length);
  };

  const scrollScholarships = (direction) => {
    const container = document.querySelector('.scholarship-carousel-track');
    const scrollAmount = 350;
    if (direction === 'next') {
      container.scrollLeft += scrollAmount;
    } else {
      container.scrollLeft -= scrollAmount;
    }
  };

  return (
    <div className="home-container">
      {/* Hero Section with Carousel */}
      <section className="hero-carousel-section">
        <div className="hero-carousel">
          <button className="carousel-btn prev-btn" onClick={prevSlide}>
            <i className="bi bi-chevron-left"></i>
          </button>
          
          <div className="carousel-slides">
            {heroScholarships.map((scholarship, index) => (
              <div
                key={scholarship.id}
                className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
                style={{ backgroundImage: `url(${scholarship.image})` }}
              >
                <div className="carousel-overlay"></div>
                <div className="carousel-content">
                  <div className="scholarship-logo">
                    {/* <img src={scholarship.logo} alt={scholarship.title} /> */}
                  </div>
                  <h2 className="scholarship-title">{scholarship.title}</h2>
                  <div className="scholarship-deadline">
                    <i className="bi bi-calendar-event"></i>
                    <span>Deadline: {scholarship.deadline}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <button className="carousel-btn next-btn" onClick={nextSlide}>
            <i className="bi bi-chevron-right"></i>
          </button>
          
          <div className="carousel-indicators">
            {heroScholarships.map((_, index) => (
              <button
                key={index}
                className={`indicator ${index === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
              ></button>
            ))}
          </div>
        </div>
        
        {/* Hero Action Buttons */}
        <div className="hero-actions">
          <Link to={`/scholarship/${heroScholarships[currentSlide].id}`} className="btn-hero btn-view-more">
            View More Details
          </Link>
          <Link to="/scholarships" className="btn-hero btn-find-scholarships">
            Find Scholarships
          </Link>
        </div>
      </section>

      {/* How ScholarNest Works */}
      <section className="how-it-works-section">
        <div className="container">
          <h2 className="section-title">
            Steps To Follow For Getting <span className="highlight">A SCHOLARSHIP</span>
          </h2>
          
          <div className="steps-container">
            <div className="step-card step-card-white">
              <div className="step-icon">
                <img src="https://via.placeholder.com/80x80/4A90E2/FFFFFF?text=📖" alt="Register" />
              </div>
              <h3 className="step-title">Register and Create Your Profile on ScholarNest</h3>
              <p className="step-description">
                Share a few quick details and register instantly! Unlock personalized scholarship options, expert guidance, and education support. Let's get started!
              </p>
              <div className="step-connector"></div>
            </div>

            <div className="step-card step-card-white">
              <div className="step-icon">
                <img src="https://via.placeholder.com/80x80/FF6B35/FFFFFF?text=🔔" alt="Search" />
              </div>
              <h3 className="step-title">Search Scholarship</h3>
              <p className="step-description">
                Sign up for personalized scholarship alerts tailored to your profile and never miss an opportunity that matches your qualifications and academic goals!
              </p>
              <div className="step-connector"></div>
            </div>

            <div className="step-card step-card-white">
              <div className="step-icon">
                <img src="https://via.placeholder.com/80x80/FFFFFF/4A90E2?text=✋" alt="Apply" />
              </div>
              <h3 className="step-title">Apply for Scholarships</h3>
              <p className="step-description">
                Explore over 10,000 scholarships tailored to your needs and eligibility. Whether merit-based, need-based, or field-specific, find options that match your academic goals and financial situation.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-5">
            <Link to="/register" className="btn-register-now">
              Register Now
            </Link>
          </div>
        </div>
      </section>

      {/* More Scholarships Carousel */}
      <section className="more-scholarships-section">
        <div className="container">
          <h2 className="section-title">Featured Scholarships</h2>
          
          <div className="scholarship-carousel-wrapper">
            <button className="scroll-btn scroll-btn-left" onClick={() => scrollScholarships('prev')}>
              <i className="bi bi-chevron-left"></i>
            </button>
            
            <div className="scholarship-carousel-track">
              {scholarships.map((scholarship) => (
                <div key={scholarship.id} className="scholarship-featured-card">
                  <div className="scholarship-card-header">
                    <div className="scholarship-logo-small">
                      <img src={scholarship.logo} alt={scholarship.organization} />
                    </div>
                    <div className="scholarship-deadline-badge">
                      Deadline Date<br />
                      <strong>{scholarship.deadline}</strong>
                    </div>
                  </div>
                  
                  <h3 className="scholarship-card-title">{scholarship.title}</h3>
                  <p className="scholarship-organization">{scholarship.organization}</p>
                  <div className="scholarship-amount">{scholarship.amount}</div>
                  
                  <button className="btn-view-detail">View Detail</button>
                  
                  <div className="card-gradient-overlay"></div>
                </div>
              ))}
            </div>
            
            <button className="scroll-btn scroll-btn-right" onClick={() => scrollScholarships('next')}>
              <i className="bi bi-chevron-right"></i>
            </button>
          </div>
        </div>
      </section>

      {/* Why ScholarNest Section */}
      <section className="why-scholarnest-section">
        <div className="container">
          <h2 className="section-title">Why Choose ScholarNest?</h2>
          
          <div className="why-grid">
            <div className="why-card">
              <div className="why-icon">
                <i className="bi bi-cpu"></i>
              </div>
              <h3>AI-Powered Matching</h3>
              <p>Our intelligent algorithm matches you with scholarships that perfectly fit your profile</p>
            </div>
            
            <div className="why-card">
              <div className="why-icon">
                <i className="bi bi-shield-check"></i>
              </div>
              <h3>Verified Opportunities</h3>
              <p>All scholarships are verified by our admin team to ensure authenticity</p>
            </div>
            
            <div className="why-card">
              <div className="why-icon">
                <i className="bi bi-people"></i>
              </div>
              <h3>Expert Mentorship</h3>
              <p>Connect with experienced mentors who guide you through the process</p>
            </div>
            
            <div className="why-card">
              <div className="why-icon">
                <i className="bi bi-graph-up"></i>
              </div>
              <h3>Track Progress</h3>
              <p>Monitor your applications in real-time and never miss deadlines</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Scholars Section */}
      <section className="our-scholars-section">
        <div className="container">
          <h2 className="section-title">Our Scholars</h2>
          <p className="section-subtitle">Success stories from students who found their perfect scholarship match</p>
          
          <div className="scholars-grid">
            {successStories.map((story) => (
              <div key={story.id} className="scholar-card">
                <div className="scholar-image-wrapper">
                  <img src={story.image} alt={story.name} className="scholar-image" />
                  <div className="scholar-badge">{story.amount}</div>
                </div>
                <div className="scholar-info">
                  <h3 className="scholar-name">{story.name}</h3>
                  <p className="scholar-university">{story.university}</p>
                  <p className="scholar-scholarship">{story.scholarship}</p>
                  <div className="scholar-testimonial">
                    <i className="bi bi-quote"></i>
                    <p>{story.testimonial}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="final-cta-section">
        <div className="container text-center">
          <h2>Ready to Start Your Journey?</h2>
          <p>Join thousands of students finding success. Create your account today and unlock your potential.</p>
          <Link to="/register" className="btn-cta-large">
            Sign Up for Free
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////

// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import './Home.css';

// function Home() {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [scholarshipSlide, setScholarshipSlide] = useState(0);

//   // Hero Carousel Data - Featured Scholarships
//   const featuredScholarships = [
//     {
//       id: 1,
//       logo: 'https://ui-avatars.com/api/?name=L+OREAL&background=FF6B35&color=fff&size=100',
//       title: "L'ORÉAL FOR YOUNG WOMEN IN SCIENCE PROGRAM 2025-26",
//       deadline: '2025-11-03',
//       amount: '₹1,50,000',
//       category: 'Women in Science'
//     },
//     {
//       id: 2,
//       logo: 'https://ui-avatars.com/api/?name=BYPL&background=FF8C42&color=fff&size=100',
//       title: 'BYPL SASHAKT SCHOLARSHIP 2025-26',
//       deadline: '2025-11-21',
//       amount: '₹75,000',
//       category: 'Merit Based'
//     },
//     {
//       id: 3,
//       logo: 'https://ui-avatars.com/api/?name=SBI&background=FFA459&color=fff&size=100',
//       title: 'SBI PLATINUM JUBILEE ASHA SCHOLARSHIP 2025',
//       deadline: '2025-11-15',
//       amount: '₹1,00,000',
//       category: 'Financial Aid'
//     },
//     {
//       id: 4,
//       logo: 'https://ui-avatars.com/api/?name=TECH&background=FF6B35&color=fff&size=100',
//       title: 'TECH INNOVATION SCHOLARSHIP 2025',
//       deadline: '2025-12-01',
//       amount: '₹2,00,000',
//       category: 'Technology'
//     }
//   ];

//   // More Scholarships Carousel Data
//   const moreScholarships = [
//     {
//       id: 1,
//       logo: 'https://ui-avatars.com/api/?name=Merit&background=FF6B35&color=fff&size=80',
//       title: 'NATIONAL MERIT SCHOLARSHIP',
//       deadline: '2025-12-31',
//       amount: '₹50,000'
//     },
//     {
//       id: 2,
//       logo: 'https://ui-avatars.com/api/?name=Women&background=FF8C42&color=fff&size=80',
//       title: 'WOMEN EMPOWERMENT GRANT',
//       deadline: '2026-01-15',
//       amount: '₹80,000'
//     },
//     {
//       id: 3,
//       logo: 'https://ui-avatars.com/api/?name=STEM&background=FFA459&color=fff&size=80',
//       title: 'STEM EXCELLENCE AWARD',
//       deadline: '2025-11-30',
//       amount: '₹1,20,000'
//     },
//     {
//       id: 4,
//       logo: 'https://ui-avatars.com/api/?name=Research&background=FF6B35&color=fff&size=80',
//       title: 'RESEARCH INNOVATION FUND',
//       deadline: '2026-02-28',
//       amount: '₹1,50,000'
//     },
//     {
//       id: 5,
//       logo: 'https://ui-avatars.com/api/?name=Sports&background=FF8C42&color=fff&size=80',
//       title: 'SPORTS ACHIEVEMENT SCHOLARSHIP',
//       deadline: '2025-12-15',
//       amount: '₹60,000'
//     },
//     {
//       id: 6,
//       logo: 'https://ui-avatars.com/api/?name=Arts&background=FFA459&color=fff&size=80',
//       title: 'CREATIVE ARTS SCHOLARSHIP',
//       deadline: '2026-01-31',
//       amount: '₹70,000'
//     }
//   ];

//   // Success Stories Data
//   const successStories = [
//     {
//       id: 1,
//       name: 'Priya Sharma',
//       scholarship: 'Women in STEM Scholarship',
//       amount: '₹1,50,000',
//       university: 'IIT Delhi',
//       image: 'https://ui-avatars.com/api/?name=Priya+Sharma&background=FF6B35&color=fff&size=150',
//       testimonial: 'ScholarNest helped me find the perfect scholarship match!'
//     },
//     {
//       id: 2,
//       name: 'Rajesh Kumar',
//       scholarship: 'Merit Excellence Award',
//       amount: '₹1,00,000',
//       university: 'NIT Trichy',
//       image: 'https://ui-avatars.com/api/?name=Rajesh+Kumar&background=FF8C42&color=fff&size=150',
//       testimonial: 'The AI matching saved me countless hours of research.'
//     },
//     {
//       id: 3,
//       name: 'Ananya Patel',
//       scholarship: 'Research Innovation Fund',
//       amount: '₹1,50,000',
//       university: 'BITS Pilani',
//       image: 'https://ui-avatars.com/api/?name=Ananya+Patel&background=FFA459&color=fff&size=150',
//       testimonial: 'Connected with amazing mentors who guided my journey.'
//     },
//     {
//       id: 4,
//       name: 'Vikram Singh',
//       scholarship: 'Tech Innovation Grant',
//       amount: '₹2,00,000',
//       university: 'IIT Bombay',
//       image: 'https://ui-avatars.com/api/?name=Vikram+Singh&background=FF6B35&color=fff&size=150',
//       testimonial: 'ScholarNest made my dreams come true!'
//     }
//   ];

//   const nextSlide = () => {
//     setCurrentSlide((prev) => (prev + 1) % featuredScholarships.length);
//   };

//   const prevSlide = () => {
//     setCurrentSlide((prev) => (prev - 1 + featuredScholarships.length) % featuredScholarships.length);
//   };

//   const nextScholarshipSlide = () => {
//     setScholarshipSlide((prev) => (prev + 1) % Math.ceil(moreScholarships.length / 3));
//   };

//   const prevScholarshipSlide = () => {
//     setScholarshipSlide((prev) => (prev - 1 + Math.ceil(moreScholarships.length / 3)) % Math.ceil(moreScholarships.length / 3));
//   };

//   return (
//     <div className="home-container">
//       {/* Hero Section with Carousel */}
//       <section className="hero-section">
//         <div className="hero-carousel">
//           <button className="carousel-control prev" onClick={prevSlide}>
//             <i className="bi bi-chevron-left"></i>
//           </button>
          
//           <div className="carousel-inner">
//             {featuredScholarships.map((scholarship, index) => (
//               <div
//                 key={scholarship.id}
//                 className={`carousel-item ${index === currentSlide ? 'active' : ''}`}
//               >
//                 <div className="scholarship-poster">
//                   <div className="poster-content">
//                     <div className="poster-header">
//                       <img src={scholarship.logo} alt="Organization Logo" className="org-logo" />
//                       <div className="deadline-badge">
//                         <span className="deadline-label">Deadline Date</span>
//                         <span className="deadline-date">{scholarship.deadline}</span>
//                       </div>
//                     </div>
//                     <h2 className="scholarship-title">{scholarship.title}</h2>
//                     <div className="scholarship-meta">
//                       <div className="meta-item">
//                         <i className="bi bi-currency-rupee"></i>
//                         <span>{scholarship.amount}</span>
//                       </div>
//                       <div className="meta-item">
//                         <i className="bi bi-tag"></i>
//                         <span>{scholarship.category}</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           <button className="carousel-control next" onClick={nextSlide}>
//             <i className="bi bi-chevron-right"></i>
//           </button>

//           {/* Carousel Indicators */}
//           <div className="carousel-indicators">
//             {featuredScholarships.map((_, index) => (
//               <button
//                 key={index}
//                 className={index === currentSlide ? 'active' : ''}
//                 onClick={() => setCurrentSlide(index)}
//               ></button>
//             ))}
//           </div>
//         </div>

//         {/* Hero Buttons */}
//         <div className="hero-buttons">
//           <button className="btn-hero btn-view-more">
//             View More Details
//           </button>
//           <Link to="/scholarships" className="btn-hero btn-find-scholarships">
//             Find Scholarships
//           </Link>
//         </div>
//       </section>

//       {/* How ScholarNest Works */}
//       <section className="how-it-works-section">
//         <div className="container">
//           <h2 className="section-title">Steps To Follow For Getting <span className="highlight">A SCHOLARSHIP</span></h2>
          
//           <div className="steps-container">
//             <div className="step-card step-card-1">
//               <div className="step-icon-wrapper">
//                 <div className="step-icon">
//                   <i className="bi bi-book"></i>
//                 </div>
//               </div>
//               <h3 className="step-title">Register and Create Your Profile on ScholarNest</h3>
//               <p className="step-description">
//                 Share a few quick details and register instantly! Unlock personalized scholarship options, expert guidance, and education support. Let's get started!
//               </p>
//               <div className="step-connector"></div>
//             </div>

//             <div className="step-card step-card-2">
//               <div className="step-icon-wrapper">
//                 <div className="step-icon">
//                   <i className="bi bi-bell"></i>
//                 </div>
//               </div>
//               <h3 className="step-title">Search Scholarship</h3>
//               <p className="step-description">
//                 Sign up for personalized scholarship alerts tailored to your profile and never miss an opportunity that matches your qualifications and academic goals!
//               </p>
//               <div className="step-connector"></div>
//             </div>

//             <div className="step-card step-card-3">
//               <div className="step-icon-wrapper">
//                 <div className="step-icon">
//                   <i className="bi bi-hand-index"></i>
//                 </div>
//               </div>
//               <h3 className="step-title">Apply for Scholarships</h3>
//               <p className="step-description">
//                 Explore over 10,000 scholarships tailored to your needs and eligibility. Whether merit-based, need-based, or field-specific, find options that match your academic goals and financial situation.
//               </p>
//             </div>
//           </div>

//           <div className="register-button-wrapper">
//             <Link to="/register" className="btn-register">Register Now</Link>
//           </div>
//         </div>
//       </section>

//       {/* More Scholarships Carousel */}
//       <section className="more-scholarships-section">
//         <div className="container">
//           <h2 className="section-title">Featured <span className="highlight">Scholarships</span></h2>
          
//           <div className="scholarships-carousel">
//             <button className="carousel-control-scholarship prev" onClick={prevScholarshipSlide}>
//               <i className="bi bi-chevron-left"></i>
//             </button>

//             <div className="scholarships-grid">
//               {moreScholarships.slice(scholarshipSlide * 3, (scholarshipSlide + 1) * 3).map((scholarship) => (
//                 <div key={scholarship.id} className="scholarship-card">
//                   <div className="scholarship-card-inner">
//                     <div className="scholarship-logo-container">
//                       <img src={scholarship.logo} alt="Scholarship Logo" />
//                     </div>
//                     <div className="scholarship-deadline">
//                       <span className="deadline-label-small">Deadline Date</span>
//                       <span className="deadline-date-small">{scholarship.deadline}</span>
//                     </div>
//                     <h4 className="scholarship-card-title">{scholarship.title}</h4>
//                     <div className="scholarship-amount">{scholarship.amount}</div>
//                     <button className="btn-view-detail">View Detail</button>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             <button className="carousel-control-scholarship next" onClick={nextScholarshipSlide}>
//               <i className="bi bi-chevron-right"></i>
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* Why ScholarNest */}
//       <section className="why-scholarnest-section">
//         <div className="container">
//           <h2 className="section-title">Why Choose <span className="highlight">ScholarNest?</span></h2>
          
//           <div className="why-grid">
//             <div className="why-card">
//               <div className="why-icon">
//                 <i className="bi bi-robot"></i>
//               </div>
//               <h3>AI-Powered Matching</h3>
//               <p>Our intelligent algorithm analyzes your profile and matches you with scholarships that perfectly fit your eligibility criteria.</p>
//             </div>

//             <div className="why-card">
//               <div className="why-icon">
//                 <i className="bi bi-shield-check"></i>
//               </div>
//               <h3>Verified Scholarships</h3>
//               <p>Every scholarship is thoroughly vetted by our admin team to ensure authenticity and reliability for your peace of mind.</p>
//             </div>

//             <div className="why-card">
//               <div className="why-icon">
//                 <i className="bi bi-people"></i>
//               </div>
//               <h3>Expert Mentorship</h3>
//               <p>Connect with experienced mentors who provide guidance on applications, career decisions, and academic success.</p>
//             </div>

//             <div className="why-card">
//               <div className="why-icon">
//                 <i className="bi bi-graph-up"></i>
//               </div>
//               <h3>Track Progress</h3>
//               <p>Monitor all your applications in one place with real-time updates and never miss important deadlines.</p>
//             </div>

//             <div className="why-card">
//               <div className="why-icon">
//                 <i className="bi bi-clock-history"></i>
//               </div>
//               <h3>Save Time</h3>
//               <p>Stop wasting hours searching through irrelevant opportunities. Get personalized matches instantly.</p>
//             </div>

//             <div className="why-card">
//               <div className="why-icon">
//                 <i className="bi bi-award"></i>
//               </div>
//               <h3>Success Rate</h3>
//               <p>Join thousands of students who have successfully secured scholarships through our platform.</p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Our Scholars Section */}
//       <section className="our-scholars-section">
//         <div className="container">
//           <h2 className="section-title">Our <span className="highlight">Success Stories</span></h2>
//           <p className="section-subtitle">Meet students who achieved their dreams with ScholarNest</p>
          
//           <div className="scholars-grid">
//             {successStories.map((scholar) => (
//               <div key={scholar.id} className="scholar-card">
//                 <div className="scholar-image-wrapper">
//                   <img src={scholar.image} alt={scholar.name} className="scholar-image" />
//                   <div className="scholar-overlay">
//                     <i className="bi bi-quote"></i>
//                   </div>
//                 </div>
//                 <div className="scholar-content">
//                   <h3 className="scholar-name">{scholar.name}</h3>
//                   <p className="scholar-university">{scholar.university}</p>
//                   <div className="scholar-scholarship">
//                     <i className="bi bi-award-fill"></i>
//                     <span>{scholar.scholarship}</span>
//                   </div>
//                   <div className="scholar-amount">{scholar.amount}</div>
//                   <p className="scholar-testimonial">"{scholar.testimonial}"</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Final CTA */}
//       <section className="cta-section">
//         <div className="cta-content">
//           <h2>Ready to Start Your Journey?</h2>
//           <p>Join thousands of students finding success. Create your account today and unlock your potential.</p>
//           <Link to="/register" className="btn-cta">Sign Up for Free</Link>
//         </div>
//       </section>
//     </div>
//   );
// }

// export default Home;