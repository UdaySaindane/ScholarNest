
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
            Steps To Follow For Getting  <span className="highlight"> A SCHOLARSHIP</span>
          </h2>
          
          <div className="steps-container">
            <div className="step-card step-card-white">
              <div className="step-icon">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoNo0kR0H2z7bCcsD-5naX8D_Cp__r7C4tkQ&s" alt="Register" />
              </div>
              <h3 className="step-title">Register and Create Your Profile on ScholarNest</h3>
              <p className="step-description">
                Share a few quick details and register instantly! Unlock personalized scholarship options, expert guidance, and education support. Let's get started!
              </p>
              <div className="step-connector"></div>
            </div>

            <div className="step-card step-card-white">
              <div className="step-icon">
                <img src="https://cdn-icons-png.flaticon.com/512/5410/5410980.png" alt="Search" />
              </div>
              <h3 className="step-title">Search Scholarship</h3>
              <p className="step-description">
                Sign up for personalized scholarship alerts tailored to your profile and never miss an opportunity that matches your qualifications and academic goals!
              </p>
              <div className="step-connector"></div>
            </div>

            <div className="step-card step-card-white">
              <div className="step-icon">
                <img src="https://thumbs.dreamstime.com/b/vector-apply-now-orange-icon-round-web-button-illustration-white-background-118342648.jpg" alt="Apply" />
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
// ////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////
// //////////////////////////top original working 10/2/2026 //////////////
// ////////////////////////////////////////
// ////////////////////////////////////////
// ////////////////////////////////////////
// ////////////////////////////////////////
// ////////////////////////////////////////
// ////////////////////////////////////////
// ////////////////////////////////////////
// ////////////////////////////////////////
// src/pages/Home.jsx
// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import api from '../utils/api';
// import './Home.css';

// function Home() {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [scholarships, setScholarships] = useState([]);
//   const [heroScholarships, setHeroScholarships] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [heroLoading, setHeroLoading] = useState(true);

//   // Default hero images for scholarships
//   const defaultHeroImages = [
//     "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1200&h=400&fit=crop",
//     "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&h=400&fit=crop",
//     "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&h=400&fit=crop",
//     "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=1200&h=400&fit=crop"
//   ];

//   // Success Stories (keep as is - dummy data)
//   const successStories = [
//     {
//       id: 1,
//       name: "Priya Sharma",
//       scholarship: "Women in STEM Scholarship",
//       amount: "₹1,00,000",
//       image: "https://ui-avatars.com/api/?name=Priya+Sharma&background=FF6B35&color=fff&size=200",
//       university: "IIT Delhi",
//       testimonial: "ScholarNest helped me find the perfect scholarship match!"
//     },
//     {
//       id: 2,
//       name: "Rahul Kumar",
//       scholarship: "Merit Excellence Award",
//       amount: "₹75,000",
//       image: "https://ui-avatars.com/api/?name=Rahul+Kumar&background=FF8C42&color=fff&size=200",
//       university: "NIT Trichy",
//       testimonial: "The AI matching saved me so much time and effort."
//     },
//     {
//       id: 3,
//       name: "Ananya Patel",
//       scholarship: "Research Innovation Grant",
//       amount: "₹1,50,000",
//       image: "https://ui-avatars.com/api/?name=Ananya+Patel&background=FFA45B&color=fff&size=200",
//       university: "BITS Pilani",
//       testimonial: "Connected with amazing mentors through ScholarNest!"
//     },
//     {
//       id: 4,
//       name: "Vikram Singh",
//       scholarship: "Sports Excellence Award",
//       amount: "₹50,000",
//       image: "https://ui-avatars.com/api/?name=Vikram+Singh&background=FFBB74&color=fff&size=200",
//       university: "DU",
//       testimonial: "Best platform for scholarship discovery and application."
//     }
//   ];

//   // Fetch real scholarships from database
//   useEffect(() => {
//     fetchHeroScholarships();
//     fetchFeaturedScholarships();
//   }, []);

//   const fetchHeroScholarships = async () => {
//     try {
//       // Fetch scholarships for hero carousel
//       const response = await api.get('/scholarships');
//       const scholarshipsData = response.data.data
//         .filter(s => new Date(s.deadline) >= new Date()) // Only future deadlines
//         .sort((a, b) => new Date(a.deadline) - new Date(b.deadline)) // Sort by nearest deadline
//         .slice(0, 4) // Take first 4
//         .map((scholarship, index) => ({
//           ...scholarship,
//           image: defaultHeroImages[index % defaultHeroImages.length]
//         }));
//       setHeroScholarships(scholarshipsData);
//     } catch (err) {
//       console.error('Fetch hero scholarships error:', err);
//       setHeroScholarships([]);
//     } finally {
//       setHeroLoading(false);
//     }
//   };

//   const fetchFeaturedScholarships = async () => {
//     try {
//       // Fetch scholarships for featured section
//       const response = await api.get('/scholarships');
//       const scholarshipsData = response.data.data
//         .filter(s => new Date(s.deadline) >= new Date()) // Only future deadlines
//         .sort((a, b) => new Date(a.deadline) - new Date(b.deadline)) // Sort by nearest deadline
//         .slice(0, 6); // Take first 6
//       setScholarships(scholarshipsData);
//     } catch (err) {
//       console.error('Fetch scholarships error:', err);
//       setScholarships([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const nextSlide = () => {
//     setCurrentSlide((prev) => (prev + 1) % heroScholarships.length);
//   };

//   const prevSlide = () => {
//     setCurrentSlide((prev) => (prev - 1 + heroScholarships.length) % heroScholarships.length);
//   };

//   const scrollScholarships = (direction) => {
//     const container = document.querySelector('.scholarship-carousel-track');
//     const scrollAmount = 350;
//     if (direction === 'next') {
//       container.scrollLeft += scrollAmount;
//     } else {
//       container.scrollLeft -= scrollAmount;
//     }
//   };

//   return (
//     <div className="home-container">
//       {/* Hero Section with Carousel */}
//       <section className="hero-carousel-section">
//         {heroLoading ? (
//           <div className="hero-loading" style={{ minHeight: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8f9fa' }}>
//             <div className="spinner-border text-primary"></div>
//           </div>
//         ) : heroScholarships.length === 0 ? (
//           <div className="hero-empty" style={{ minHeight: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8f9fa' }}>
//             <p>No scholarships available</p>
//           </div>
//         ) : (
//           <div className="hero-carousel">
//             <button className="carousel-btn prev-btn" onClick={prevSlide}>
//               <i className="bi bi-chevron-left"></i>
//             </button>
            
//             <div className="carousel-slides">
//               {heroScholarships.map((scholarship, index) => (
//                 <div
//                   key={scholarship.id}
//                   className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
//                   style={{ backgroundImage: `url(${scholarship.image})` }}
//                 >
//                   <div className="carousel-overlay"></div>
//                   <div className="carousel-content">
//                     <div className="scholarship-logo">
//                       {/* <img src={scholarship.logo} alt={scholarship.title} /> */}
//                     </div>
//                     <h2 className="scholarship-title">{scholarship.title}</h2>
//                     <div className="scholarship-deadline">
//                       <i className="bi bi-calendar-event"></i>
//                       <span>Deadline: {new Date(scholarship.deadline).toLocaleDateString('en-IN')}</span>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
            
//             <button className="carousel-btn next-btn" onClick={nextSlide}>
//               <i className="bi bi-chevron-right"></i>
//             </button>
            
//             <div className="carousel-indicators">
//               {heroScholarships.map((_, index) => (
//                 <button
//                   key={index}
//                   className={`indicator ${index === currentSlide ? 'active' : ''}`}
//                   onClick={() => setCurrentSlide(index)}
//                 ></button>
//               ))}
//             </div>
//           </div>
//         )}
        
//         {/* Hero Action Buttons */}
//         {heroScholarships.length > 0 && (
//           <div className="hero-actions">
//             <Link to={`/scholarship/${heroScholarships[currentSlide]?.id}`} className="btn-hero btn-view-more">
//               View More Details
//             </Link>
//             <Link to="/scholarships" className="btn-hero btn-find-scholarships">
//               Find Scholarships
//             </Link>
//           </div>
//         )}
//       </section>

//       {/* How ScholarNest Works */}
//       <section className="how-it-works-section">
//         <div className="container">
//           <h2 className="section-title">
//             Steps To Follow For Getting  <span className="highlight"> A SCHOLARSHIP</span>
//           </h2>
          
//           <div className="steps-container">
//             <div className="step-card step-card-white">
//               <div className="step-icon">
//                 <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoNo0kR0H2z7bCcsD-5naX8D_Cp__r7C4tkQ&s" alt="Register" />
//               </div>
//               <h3 className="step-title">Register and Create Your Profile on ScholarNest</h3>
//               <p className="step-description">
//                 Share a few quick details and register instantly! Unlock personalized scholarship options, expert guidance, and education support. Let's get started!
//               </p>
//               <div className="step-connector"></div>
//             </div>

//             <div className="step-card step-card-white">
//               <div className="step-icon">
//                 <img src="https://cdn-icons-png.flaticon.com/512/5410/5410980.png" alt="Search" />
//               </div>
//               <h3 className="step-title">Search Scholarship</h3>
//               <p className="step-description">
//                 Sign up for personalized scholarship alerts tailored to your profile and never miss an opportunity that matches your qualifications and academic goals!
//               </p>
//               <div className="step-connector"></div>
//             </div>

//             <div className="step-card step-card-white">
//               <div className="step-icon">
//                 <img src="https://thumbs.dreamstime.com/b/vector-apply-now-orange-icon-round-web-button-illustration-white-background-118342648.jpg" alt="Apply" />
//               </div>
//               <h3 className="step-title">Apply for Scholarships</h3>
//               <p className="step-description">
//                 Explore over 10,000 scholarships tailored to your needs and eligibility. Whether merit-based, need-based, or field-specific, find options that match your academic goals and financial situation.
//               </p>
//             </div>
//           </div>
          
//           <div className="text-center mt-5">
//             <Link to="/register" className="btn-register-now">
//               Register Now
//             </Link>
//           </div>
//         </div>
//       </section>

//       {/* Featured Scholarships Carousel - REAL DATA */}
//       <section className="more-scholarships-section">
//         <div className="container">
//           <h2 className="section-title">Featured Scholarships</h2>
          
//           {loading ? (
//             <div className="text-center py-5">
//               <div className="spinner-border text-primary"></div>
//               <p className="mt-3">Loading scholarships...</p>
//             </div>
//           ) : scholarships.length === 0 ? (
//             <div className="text-center py-5">
//               <i className="bi bi-inbox" style={{ fontSize: '3rem', color: '#ccc' }}></i>
//               <p className="mt-3">No scholarships available at the moment</p>
//             </div>
//           ) : (
//             <div className="scholarship-carousel-wrapper">
//               <button className="scroll-btn scroll-btn-left" onClick={() => scrollScholarships('prev')}>
//                 <i className="bi bi-chevron-left"></i>
//               </button>
              
//               <div className="scholarship-carousel-track">
//                 {scholarships.map((scholarship) => (
//                   <div key={scholarship.id} className="scholarship-featured-card">
//                     <div className="scholarship-card-header">
//                       <div className="scholarship-logo-small">
//                         <div style={{
//                           width: '80px',
//                           height: '80px',
//                           borderRadius: '50%',
//                           background: 'linear-gradient(135deg, #FF6B35 0%, #FF8C42 100%)',
//                           display: 'flex',
//                           alignItems: 'center',
//                           justifyContent: 'center',
//                           color: 'white',
//                           fontWeight: 'bold',
//                           fontSize: '1.2rem'
//                         }}>
//                           {scholarship.provider ? scholarship.provider.substring(0, 2).toUpperCase() : 'SC'}
//                         </div>
//                       </div>
//                       <div className="scholarship-deadline-badge">
//                         Deadline Date<br />
//                         <strong>{new Date(scholarship.deadline).toLocaleDateString('en-IN')}</strong>
//                       </div>
//                     </div>
                    
//                     <h3 className="scholarship-card-title">{scholarship.title}</h3>
//                     <p className="scholarship-organization">{scholarship.provider}</p>
//                     <div className="scholarship-amount">{scholarship.amount}</div>
                    
//                     <Link to={`/scholarship/${scholarship.id}`} className="btn-view-detail">
//                       View Detail
//                     </Link>
                    
//                     <div className="card-gradient-overlay"></div>
//                   </div>
//                 ))}
//               </div>
              
//               <button className="scroll-btn scroll-btn-right" onClick={() => scrollScholarships('next')}>
//                 <i className="bi bi-chevron-right"></i>
//               </button>
//             </div>
//           )}
//         </div>
//       </section>

//       {/* Why ScholarNest Section */}
//       <section className="why-scholarnest-section">
//         <div className="container">
//           <h2 className="section-title">Why Choose ScholarNest?</h2>
          
//           <div className="why-grid">
//             <div className="why-card">
//               <div className="why-icon">
//                 <i className="bi bi-cpu"></i>
//               </div>
//               <h3>AI-Powered Matching</h3>
//               <p>Our intelligent algorithm matches you with scholarships that perfectly fit your profile</p>
//             </div>
            
//             <div className="why-card">
//               <div className="why-icon">
//                 <i className="bi bi-shield-check"></i>
//               </div>
//               <h3>Verified Opportunities</h3>
//               <p>All scholarships are verified by our admin team to ensure authenticity</p>
//             </div>
            
//             <div className="why-card">
//               <div className="why-icon">
//                 <i className="bi bi-people"></i>
//               </div>
//               <h3>Expert Mentorship</h3>
//               <p>Connect with experienced mentors who guide you through the process</p>
//             </div>
            
//             <div className="why-card">
//               <div className="why-icon">
//                 <i className="bi bi-graph-up"></i>
//               </div>
//               <h3>Track Progress</h3>
//               <p>Monitor your applications in real-time and never miss deadlines</p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Our Scholars Section */}
//       <section className="our-scholars-section">
//         <div className="container">
//           <h2 className="section-title">Our Scholars</h2>
//           <p className="section-subtitle">Success stories from students who found their perfect scholarship match</p>
          
//           <div className="scholars-grid">
//             {successStories.map((story) => (
//               <div key={story.id} className="scholar-card">
//                 <div className="scholar-image-wrapper">
//                   <img src={story.image} alt={story.name} className="scholar-image" />
//                   <div className="scholar-badge">{story.amount}</div>
//                 </div>
//                 <div className="scholar-info">
//                   <h3 className="scholar-name">{story.name}</h3>
//                   <p className="scholar-university">{story.university}</p>
//                   <p className="scholar-scholarship">{story.scholarship}</p>
//                   <div className="scholar-testimonial">
//                     <i className="bi bi-quote"></i>
//                     <p>{story.testimonial}</p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Final CTA */}
//       <section className="final-cta-section">
//         <div className="container text-center">
//           <h2>Ready to Start Your Journey?</h2>
//           <p>Join thousands of students finding success. Create your account today and unlock your potential.</p>
//           <Link to="/register" className="btn-cta-large">
//             Sign Up for Free
//           </Link>
//         </div>
//       </section>
//     </div>
//   );
// }

// export default Home;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// // src/pages/Home.jsx
// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import api from '../utils/api';
// import './Home.css';

// function Home() {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [scholarships, setScholarships] = useState([]);
//   const [heroScholarships, setHeroScholarships] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [heroLoading, setHeroLoading] = useState(true);

//   // Default hero images for scholarships
//   const defaultHeroImages = [
//     "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1200&h=400&fit=crop",
//     "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&h=400&fit=crop",
//     "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&h=400&fit=crop",
//     "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=1200&h=400&fit=crop"
//   ];

//   // Success Stories (keep as is - dummy data)
//   const successStories = [
//     {
//       id: 1,
//       name: "Priya Sharma",
//       scholarship: "Women in STEM Scholarship",
//       amount: "₹1,00,000",
//       image: "https://ui-avatars.com/api/?name=Priya+Sharma&background=FF6B35&color=fff&size=200",
//       university: "IIT Delhi",
//       testimonial: "ScholarNest helped me find the perfect scholarship match!"
//     },
//     {
//       id: 2,
//       name: "Rahul Kumar",
//       scholarship: "Merit Excellence Award",
//       amount: "₹75,000",
//       image: "https://ui-avatars.com/api/?name=Rahul+Kumar&background=FF8C42&color=fff&size=200",
//       university: "NIT Trichy",
//       testimonial: "The AI matching saved me so much time and effort."
//     },
//     {
//       id: 3,
//       name: "Ananya Patel",
//       scholarship: "Research Innovation Grant",
//       amount: "₹1,50,000",
//       image: "https://ui-avatars.com/api/?name=Ananya+Patel&background=FFA45B&color=fff&size=200",
//       university: "BITS Pilani",
//       testimonial: "Connected with amazing mentors through ScholarNest!"
//     },
//     {
//       id: 4,
//       name: "Vikram Singh",
//       scholarship: "Sports Excellence Award",
//       amount: "₹50,000",
//       image: "https://ui-avatars.com/api/?name=Vikram+Singh&background=FFBB74&color=fff&size=200",
//       university: "DU",
//       testimonial: "Best platform for scholarship discovery and application."
//     }
//   ];

//   // Fetch real scholarships from database
//   useEffect(() => {
//     fetchHeroScholarships();
//     fetchFeaturedScholarships();
//   }, []);

//   const fetchHeroScholarships = async () => {
//     try {
//       // Fetch scholarships for hero carousel
//       const response = await api.get('/scholarships');
//       console.log('Hero scholarships response:', response.data); // Debug log
      
//       // Correct response structure: response.data.scholarships
//       let scholarshipsArray = response.data.scholarships || [];
      
//       // Ensure it's an array
//       if (!Array.isArray(scholarshipsArray)) {
//         console.error('Scholarships is not an array:', scholarshipsArray);
//         scholarshipsArray = [];
//       }
      
//       const scholarshipsData = scholarshipsArray
//         .filter(s => new Date(s.deadline) >= new Date()) // Only future deadlines
//         .sort((a, b) => new Date(a.deadline) - new Date(b.deadline)) // Sort by nearest deadline
//         .slice(0, 4) // Take first 4
//         .map((scholarship, index) => ({
//           ...scholarship,
//           image: defaultHeroImages[index % defaultHeroImages.length]
//         }));
//       setHeroScholarships(scholarshipsData);
//     } catch (err) {
//       console.error('Fetch hero scholarships error:', err);
//       setHeroScholarships([]);
//     } finally {
//       setHeroLoading(false);
//     }
//   };

//   const fetchFeaturedScholarships = async () => {
//     try {
//       // Fetch scholarships for featured section
//       const response = await api.get('/scholarships');
//       console.log('Featured scholarships response:', response.data); // Debug log
      
//       // Correct response structure: response.data.scholarships
//       let scholarshipsArray = response.data.scholarships || [];
      
//       // Ensure it's an array
//       if (!Array.isArray(scholarshipsArray)) {
//         console.error('Scholarships is not an array:', scholarshipsArray);
//         scholarshipsArray = [];
//       }
      
//       const scholarshipsData = scholarshipsArray
//         .filter(s => new Date(s.deadline) >= new Date()) // Only future deadlines
//         .sort((a, b) => new Date(a.deadline) - new Date(b.deadline)) // Sort by nearest deadline
//         .slice(0, 6); // Take first 6
//       setScholarships(scholarshipsData);
//     } catch (err) {
//       console.error('Fetch scholarships error:', err);
//       setScholarships([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const nextSlide = () => {
//     setCurrentSlide((prev) => (prev + 1) % heroScholarships.length);
//   };

//   const prevSlide = () => {
//     setCurrentSlide((prev) => (prev - 1 + heroScholarships.length) % heroScholarships.length);
//   };

//   const scrollScholarships = (direction) => {
//     const container = document.querySelector('.scholarship-carousel-track');
//     const scrollAmount = 350;
//     if (direction === 'next') {
//       container.scrollLeft += scrollAmount;
//     } else {
//       container.scrollLeft -= scrollAmount;
//     }
//   };

//   return (
//     <div className="home-container">
//       {/* Hero Section with Carousel */}
//       <section className="hero-carousel-section">
//         {heroLoading ? (
//           <div className="hero-loading" style={{ minHeight: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8f9fa' }}>
//             <div className="spinner-border text-primary"></div>
//           </div>
//         ) : heroScholarships.length === 0 ? (
//           <div className="hero-empty" style={{ minHeight: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8f9fa' }}>
//             <p>No scholarships available</p>
//           </div>
//         ) : (
//           <div className="hero-carousel">
//             <button className="carousel-btn prev-btn" onClick={prevSlide}>
//               <i className="bi bi-chevron-left"></i>
//             </button>
            
//             <div className="carousel-slides">
//               {heroScholarships.map((scholarship, index) => (
//                 <div
//                   key={scholarship.id}
//                   className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
//                   style={{ backgroundImage: `url(${scholarship.image})` }}
//                 >
//                   <div className="carousel-overlay"></div>
//                   <div className="carousel-content">
//                     <div className="scholarship-logo">
//                       {/* <img src={scholarship.logo} alt={scholarship.title} /> */}
//                     </div>
//                     <h2 className="scholarship-title">{scholarship.title}</h2>
//                     <div className="scholarship-deadline">
//                       <i className="bi bi-calendar-event"></i>
//                       <span>Deadline: {new Date(scholarship.deadline).toLocaleDateString('en-IN')}</span>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
            
//             <button className="carousel-btn next-btn" onClick={nextSlide}>
//               <i className="bi bi-chevron-right"></i>
//             </button>
            
//             <div className="carousel-indicators">
//               {heroScholarships.map((_, index) => (
//                 <button
//                   key={index}
//                   className={`indicator ${index === currentSlide ? 'active' : ''}`}
//                   onClick={() => setCurrentSlide(index)}
//                 ></button>
//               ))}
//             </div>
//           </div>
//         )}
        
//         {/* Hero Action Buttons */}
//         {heroScholarships.length > 0 && (
//           <div className="hero-actions">
//             <Link to={`/scholarship/${heroScholarships[currentSlide]?.id}`} className="btn-hero btn-view-more">
//               View More Details
//             </Link>
//             <Link to="/scholarships" className="btn-hero btn-find-scholarships">
//               Find Scholarships
//             </Link>
//           </div>
//         )}
//       </section>

//       {/* How ScholarNest Works */}
//       <section className="how-it-works-section">
//         <div className="container">
//           <h2 className="section-title">
//             Steps To Follow For Getting  <span className="highlight"> A SCHOLARSHIP</span>
//           </h2>
          
//           <div className="steps-container">
//             <div className="step-card step-card-white">
//               <div className="step-icon">
//                 <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoNo0kR0H2z7bCcsD-5naX8D_Cp__r7C4tkQ&s" alt="Register" />
//               </div>
//               <h3 className="step-title">Register and Create Your Profile on ScholarNest</h3>
//               <p className="step-description">
//                 Share a few quick details and register instantly! Unlock personalized scholarship options, expert guidance, and education support. Let's get started!
//               </p>
//               <div className="step-connector"></div>
//             </div>

//             <div className="step-card step-card-white">
//               <div className="step-icon">
//                 <img src="https://cdn-icons-png.flaticon.com/512/5410/5410980.png" alt="Search" />
//               </div>
//               <h3 className="step-title">Search Scholarship</h3>
//               <p className="step-description">
//                 Sign up for personalized scholarship alerts tailored to your profile and never miss an opportunity that matches your qualifications and academic goals!
//               </p>
//               <div className="step-connector"></div>
//             </div>

//             <div className="step-card step-card-white">
//               <div className="step-icon">
//                 <img src="https://thumbs.dreamstime.com/b/vector-apply-now-orange-icon-round-web-button-illustration-white-background-118342648.jpg" alt="Apply" />
//               </div>
//               <h3 className="step-title">Apply for Scholarships</h3>
//               <p className="step-description">
//                 Explore over 10,000 scholarships tailored to your needs and eligibility. Whether merit-based, need-based, or field-specific, find options that match your academic goals and financial situation.
//               </p>
//             </div>
//           </div>
          
//           <div className="text-center mt-5">
//             <Link to="/register" className="btn-register-now">
//               Register Now
//             </Link>
//           </div>
//         </div>
//       </section>

//       {/* Featured Scholarships Carousel - REAL DATA */}
//       <section className="more-scholarships-section">
//         <div className="container">
//           <h2 className="section-title">Featured Scholarships</h2>
          
//           {loading ? (
//             <div className="text-center py-5">
//               <div className="spinner-border text-primary"></div>
//               <p className="mt-3">Loading scholarships...</p>
//             </div>
//           ) : scholarships.length === 0 ? (
//             <div className="text-center py-5">
//               <i className="bi bi-inbox" style={{ fontSize: '3rem', color: '#ccc' }}></i>
//               <p className="mt-3">No scholarships available at the moment</p>
//             </div>
//           ) : (
//             <div className="scholarship-carousel-wrapper">
//               <button className="scroll-btn scroll-btn-left" onClick={() => scrollScholarships('prev')}>
//                 <i className="bi bi-chevron-left"></i>
//               </button>
              
//               <div className="scholarship-carousel-track">
//                 {scholarships.map((scholarship) => (
//                   <div key={scholarship.id} className="scholarship-featured-card">
//                     <div className="scholarship-card-header">
//                       <div className="scholarship-logo-small">
//                         <div style={{
//                           width: '80px',
//                           height: '80px',
//                           borderRadius: '50%',
//                           background: 'linear-gradient(135deg, #FF6B35 0%, #FF8C42 100%)',
//                           display: 'flex',
//                           alignItems: 'center',
//                           justifyContent: 'center',
//                           color: 'white',
//                           fontWeight: 'bold',
//                           fontSize: '1.2rem'
//                         }}>
//                           {scholarship.provider ? scholarship.provider.substring(0, 2).toUpperCase() : 'SC'}
//                         </div>
//                       </div>
//                       <div className="scholarship-deadline-badge">
//                         Deadline Date<br />
//                         <strong>{new Date(scholarship.deadline).toLocaleDateString('en-IN')}</strong>
//                       </div>
//                     </div>
                    
//                     <h3 className="scholarship-card-title">{scholarship.title}</h3>
//                     <p className="scholarship-organization">{scholarship.provider}</p>
//                     <div className="scholarship-amount">{scholarship.amount}</div>
                    
//                     <Link to={`/scholarship/${scholarship.id}`} className="btn-view-detail">
//                       View Detail
//                     </Link>
                    
//                     <div className="card-gradient-overlay"></div>
//                   </div>
//                 ))}
//               </div>
              
//               <button className="scroll-btn scroll-btn-right" onClick={() => scrollScholarships('next')}>
//                 <i className="bi bi-chevron-right"></i>
//               </button>
//             </div>
//           )}
//         </div>
//       </section>

//       {/* Why ScholarNest Section */}
//       <section className="why-scholarnest-section">
//         <div className="container">
//           <h2 className="section-title">Why Choose ScholarNest?</h2>
          
//           <div className="why-grid">
//             <div className="why-card">
//               <div className="why-icon">
//                 <i className="bi bi-cpu"></i>
//               </div>
//               <h3>AI-Powered Matching</h3>
//               <p>Our intelligent algorithm matches you with scholarships that perfectly fit your profile</p>
//             </div>
            
//             <div className="why-card">
//               <div className="why-icon">
//                 <i className="bi bi-shield-check"></i>
//               </div>
//               <h3>Verified Opportunities</h3>
//               <p>All scholarships are verified by our admin team to ensure authenticity</p>
//             </div>
            
//             <div className="why-card">
//               <div className="why-icon">
//                 <i className="bi bi-people"></i>
//               </div>
//               <h3>Expert Mentorship</h3>
//               <p>Connect with experienced mentors who guide you through the process</p>
//             </div>
            
//             <div className="why-card">
//               <div className="why-icon">
//                 <i className="bi bi-graph-up"></i>
//               </div>
//               <h3>Track Progress</h3>
//               <p>Monitor your applications in real-time and never miss deadlines</p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Our Scholars Section */}
//       <section className="our-scholars-section">
//         <div className="container">
//           <h2 className="section-title">Our Scholars</h2>
//           <p className="section-subtitle">Success stories from students who found their perfect scholarship match</p>
          
//           <div className="scholars-grid">
//             {successStories.map((story) => (
//               <div key={story.id} className="scholar-card">
//                 <div className="scholar-image-wrapper">
//                   <img src={story.image} alt={story.name} className="scholar-image" />
//                   <div className="scholar-badge">{story.amount}</div>
//                 </div>
//                 <div className="scholar-info">
//                   <h3 className="scholar-name">{story.name}</h3>
//                   <p className="scholar-university">{story.university}</p>
//                   <p className="scholar-scholarship">{story.scholarship}</p>
//                   <div className="scholar-testimonial">
//                     <i className="bi bi-quote"></i>
//                     <p>{story.testimonial}</p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Final CTA */}
//       <section className="final-cta-section">
//         <div className="container text-center">
//           <h2>Ready to Start Your Journey?</h2>
//           <p>Join thousands of students finding success. Create your account today and unlock your potential.</p>
//           <Link to="/register" className="btn-cta-large">
//             Sign Up for Free
//           </Link>
//         </div>
//       </section>
//     </div>
//   );
// }

// export default Home;


// ////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////
// //////////////////////////top second working 12/2/2026 //////////////
// ////////////////////////////////////////
// ////////////////////////////////////////
// ////////////////////////////////////////
// ////////////////////////////////////////
// ////////////////////////////////////////
// ////////////////////////////////////////
// ////////////////////////////////////////
// ////////////////////////////////////////

// // src/pages/Home.jsx
// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import api from '../utils/api';
// import './Home.css';

// function Home() {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [scholarships, setScholarships] = useState([]);
//   const [heroScholarships, setHeroScholarships] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [heroLoading, setHeroLoading] = useState(true);

//   // Default hero images for scholarships
//   const defaultHeroImages = [
//     "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1200&h=400&fit=crop",
//     "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&h=400&fit=crop",
//     "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&h=400&fit=crop",
//     "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=1200&h=400&fit=crop"
//   ];

//   // Success Stories (keep as is - dummy data)
//   const successStories = [
//     {
//       id: 1,
//       name: "Priya Sharma",
//       scholarship: "Women in STEM Scholarship",
//       amount: "₹1,00,000",
//       image: "https://ui-avatars.com/api/?name=Priya+Sharma&background=FF6B35&color=fff&size=200",
//       university: "IIT Delhi",
//       testimonial: "ScholarNest helped me find the perfect scholarship match!"
//     },
//     {
//       id: 2,
//       name: "Rahul Kumar",
//       scholarship: "Merit Excellence Award",
//       amount: "₹75,000",
//       image: "https://ui-avatars.com/api/?name=Rahul+Kumar&background=FF8C42&color=fff&size=200",
//       university: "NIT Trichy",
//       testimonial: "The AI matching saved me so much time and effort."
//     },
//     {
//       id: 3,
//       name: "Ananya Patel",
//       scholarship: "Research Innovation Grant",
//       amount: "₹1,50,000",
//       image: "https://ui-avatars.com/api/?name=Ananya+Patel&background=FFA45B&color=fff&size=200",
//       university: "BITS Pilani",
//       testimonial: "Connected with amazing mentors through ScholarNest!"
//     },
//     {
//       id: 4,
//       name: "Vikram Singh",
//       scholarship: "Sports Excellence Award",
//       amount: "₹50,000",
//       image: "https://ui-avatars.com/api/?name=Vikram+Singh&background=FFBB74&color=fff&size=200",
//       university: "DU",
//       testimonial: "Best platform for scholarship discovery and application."
//     }
//   ];

//   // Fetch real scholarships from database
//   useEffect(() => {
//     fetchHeroScholarships();
//     fetchFeaturedScholarships();
//   }, []);

//   const fetchHeroScholarships = async () => {
//     try {
//       const response = await api.get('/scholarships');
      
//       // Response structure: response.data.data.scholarships
//       let scholarshipsArray = response.data.data?.scholarships || response.data.scholarships || [];
      
//       if (!Array.isArray(scholarshipsArray)) scholarshipsArray = [];
      
//       const scholarshipsData = scholarshipsArray
//         .filter(s => new Date(s.deadline) >= new Date())
//         .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
//         .slice(0, 4)
//         .map((scholarship, index) => ({
//           ...scholarship,
//           image: defaultHeroImages[index % defaultHeroImages.length]
//         }));
//       setHeroScholarships(scholarshipsData);
//     } catch (err) {
//       console.error('Fetch hero scholarships error:', err);
//       setHeroScholarships([]);
//     } finally {
//       setHeroLoading(false);
//     }
//   };

//   const fetchFeaturedScholarships = async () => {
//     try {
//       const response = await api.get('/scholarships');
      
//       // Response structure: response.data.data.scholarships
//       let scholarshipsArray = response.data.data?.scholarships || response.data.scholarships || [];
      
//       if (!Array.isArray(scholarshipsArray)) scholarshipsArray = [];
      
//       const scholarshipsData = scholarshipsArray
//         .filter(s => new Date(s.deadline) >= new Date())
//         .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
//         .slice(0, 6);
//       setScholarships(scholarshipsData);
//     } catch (err) {
//       console.error('Fetch scholarships error:', err);
//       setScholarships([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const nextSlide = () => {
//     setCurrentSlide((prev) => (prev + 1) % heroScholarships.length);
//   };

//   const prevSlide = () => {
//     setCurrentSlide((prev) => (prev - 1 + heroScholarships.length) % heroScholarships.length);
//   };

//   const scrollScholarships = (direction) => {
//     const container = document.querySelector('.scholarship-carousel-track');
//     const scrollAmount = 350;
//     if (direction === 'next') {
//       container.scrollLeft += scrollAmount;
//     } else {
//       container.scrollLeft -= scrollAmount;
//     }
//   };

//   return (
//     <div className="home-container">
//       {/* Hero Section with Carousel */}
//       <section className="hero-carousel-section">
//         {heroLoading ? (
//           <div className="hero-loading" style={{ minHeight: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8f9fa' }}>
//             <div className="spinner-border text-primary"></div>
//           </div>
//         ) : heroScholarships.length === 0 ? (
//           <div className="hero-empty" style={{ minHeight: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8f9fa' }}>
//             <p>No scholarships available</p>
//           </div>
//         ) : (
//           <div className="hero-carousel">
//             <button className="carousel-btn prev-btn" onClick={prevSlide}>
//               <i className="bi bi-chevron-left"></i>
//             </button>
            
//             <div className="carousel-slides">
//               {heroScholarships.map((scholarship, index) => (
//                 <div
//                   key={scholarship.id}
//                   className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
//                   style={{ backgroundImage: `url(${scholarship.image})` }}
//                 >
//                   <div className="carousel-overlay"></div>
//                   <div className="carousel-content">
//                     <div className="scholarship-logo">
//                       {/* <img src={scholarship.logo} alt={scholarship.title} /> */}
//                     </div>
//                     <h2 className="scholarship-title">{scholarship.title}</h2>
//                     <div className="scholarship-deadline">
//                       <i className="bi bi-calendar-event"></i>
//                       <span>Deadline: {new Date(scholarship.deadline).toLocaleDateString('en-IN')}</span>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
            
//             <button className="carousel-btn next-btn" onClick={nextSlide}>
//               <i className="bi bi-chevron-right"></i>
//             </button>
            
//             <div className="carousel-indicators">
//               {heroScholarships.map((_, index) => (
//                 <button
//                   key={index}
//                   className={`indicator ${index === currentSlide ? 'active' : ''}`}
//                   onClick={() => setCurrentSlide(index)}
//                 ></button>
//               ))}
//             </div>
//           </div>
//         )}
        
//         {/* Hero Action Buttons */}
//         {heroScholarships.length > 0 && (
//           <div className="hero-actions">
//             <Link to={`/scholarship/${heroScholarships[currentSlide]?.id}`} className="btn-hero btn-view-more">
//               View More Details
//             </Link>
//             <Link to="/scholarships" className="btn-hero btn-find-scholarships">
//               Find Scholarships
//             </Link>
//           </div>
//         )}
//       </section>

//       {/* How ScholarNest Works */}
//       <section className="how-it-works-section">
//         <div className="container">
//           <h2 className="section-title">
//             Steps To Follow For Getting  <span className="highlight"> A SCHOLARSHIP</span>
//           </h2>
          
//           <div className="steps-container">
//             <div className="step-card step-card-white">
//               <div className="step-icon">
//                 <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoNo0kR0H2z7bCcsD-5naX8D_Cp__r7C4tkQ&s" alt="Register" />
//               </div>
//               <h3 className="step-title">Register and Create Your Profile on ScholarNest</h3>
//               <p className="step-description">
//                 Share a few quick details and register instantly! Unlock personalized scholarship options, expert guidance, and education support. Let's get started!
//               </p>
//               <div className="step-connector"></div>
//             </div>

//             <div className="step-card step-card-white">
//               <div className="step-icon">
//                 <img src="https://cdn-icons-png.flaticon.com/512/5410/5410980.png" alt="Search" />
//               </div>
//               <h3 className="step-title">Search Scholarship</h3>
//               <p className="step-description">
//                 Sign up for personalized scholarship alerts tailored to your profile and never miss an opportunity that matches your qualifications and academic goals!
//               </p>
//               <div className="step-connector"></div>
//             </div>

//             <div className="step-card step-card-white">
//               <div className="step-icon">
//                 <img src="https://thumbs.dreamstime.com/b/vector-apply-now-orange-icon-round-web-button-illustration-white-background-118342648.jpg" alt="Apply" />
//               </div>
//               <h3 className="step-title">Apply for Scholarships</h3>
//               <p className="step-description">
//                 Explore over 10,000 scholarships tailored to your needs and eligibility. Whether merit-based, need-based, or field-specific, find options that match your academic goals and financial situation.
//               </p>
//             </div>
//           </div>
          
//           <div className="text-center mt-5">
//             <Link to="/register" className="btn-register-now">
//               Register Now
//             </Link>
//           </div>
//         </div>
//       </section>

//       {/* Featured Scholarships Carousel - REAL DATA */}
//       <section className="more-scholarships-section">
//         <div className="container">
//           <h2 className="section-title">Featured Scholarships</h2>
          
//           {loading ? (
//             <div className="text-center py-5">
//               <div className="spinner-border text-primary"></div>
//               <p className="mt-3">Loading scholarships...</p>
//             </div>
//           ) : scholarships.length === 0 ? (
//             <div className="text-center py-5">
//               <i className="bi bi-inbox" style={{ fontSize: '3rem', color: '#ccc' }}></i>
//               <p className="mt-3">No scholarships available at the moment</p>
//             </div>
//           ) : (
//             <div className="scholarship-carousel-wrapper">
//               <button className="scroll-btn scroll-btn-left" onClick={() => scrollScholarships('prev')}>
//                 <i className="bi bi-chevron-left"></i>
//               </button>
              
//               <div className="scholarship-carousel-track">
//                 {scholarships.map((scholarship) => (
//                   <div key={scholarship.id} className="scholarship-featured-card">
//                     <div className="scholarship-card-header">
//                       <div className="scholarship-logo-small">
//                         <div style={{
//                           width: '80px',
//                           height: '80px',
//                           borderRadius: '50%',
//                           background: 'linear-gradient(135deg, #FF6B35 0%, #FF8C42 100%)',
//                           display: 'flex',
//                           alignItems: 'center',
//                           justifyContent: 'center',
//                           color: 'white',
//                           fontWeight: 'bold',
//                           fontSize: '1.2rem'
//                         }}>
//                           {scholarship.provider ? scholarship.provider.substring(0, 2).toUpperCase() : 'SC'}
//                         </div>
//                       </div>
//                       <div className="scholarship-deadline-badge">
//                         Deadline Date<br />
//                         <strong>{new Date(scholarship.deadline).toLocaleDateString('en-IN')}</strong>
//                       </div>
//                     </div>
                    
//                     <h3 className="scholarship-card-title">{scholarship.title}</h3>
//                     <p className="scholarship-organization">{scholarship.provider}</p>
//                     <div className="scholarship-amount">{scholarship.amount}</div>
                    
//                     <Link to={`/scholarship/${scholarship.id}`} className="btn-view-detail">
//                       View Detail
//                     </Link>
                    
//                     <div className="card-gradient-overlay"></div>
//                   </div>
//                 ))}
//               </div>
              
//               <button className="scroll-btn scroll-btn-right" onClick={() => scrollScholarships('next')}>
//                 <i className="bi bi-chevron-right"></i>
//               </button>
//             </div>
//           )}
//         </div>
//       </section>

//       {/* Why ScholarNest Section */}
//       <section className="why-scholarnest-section">
//         <div className="container">
//           <h2 className="section-title">Why Choose ScholarNest?</h2>
          
//           <div className="why-grid">
//             <div className="why-card">
//               <div className="why-icon">
//                 <i className="bi bi-cpu"></i>
//               </div>
//               <h3>AI-Powered Matching</h3>
//               <p>Our intelligent algorithm matches you with scholarships that perfectly fit your profile</p>
//             </div>
            
//             <div className="why-card">
//               <div className="why-icon">
//                 <i className="bi bi-shield-check"></i>
//               </div>
//               <h3>Verified Opportunities</h3>
//               <p>All scholarships are verified by our admin team to ensure authenticity</p>
//             </div>
            
//             <div className="why-card">
//               <div className="why-icon">
//                 <i className="bi bi-people"></i>
//               </div>
//               <h3>Expert Mentorship</h3>
//               <p>Connect with experienced mentors who guide you through the process</p>
//             </div>
            
//             <div className="why-card">
//               <div className="why-icon">
//                 <i className="bi bi-graph-up"></i>
//               </div>
//               <h3>Track Progress</h3>
//               <p>Monitor your applications in real-time and never miss deadlines</p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Our Scholars Section */}
//       <section className="our-scholars-section">
//         <div className="container">
//           <h2 className="section-title">Our Scholars</h2>
//           <p className="section-subtitle">Success stories from students who found their perfect scholarship match</p>
          
//           <div className="scholars-grid">
//             {successStories.map((story) => (
//               <div key={story.id} className="scholar-card">
//                 <div className="scholar-image-wrapper">
//                   <img src={story.image} alt={story.name} className="scholar-image" />
//                   <div className="scholar-badge">{story.amount}</div>
//                 </div>
//                 <div className="scholar-info">
//                   <h3 className="scholar-name">{story.name}</h3>
//                   <p className="scholar-university">{story.university}</p>
//                   <p className="scholar-scholarship">{story.scholarship}</p>
//                   <div className="scholar-testimonial">
//                     <i className="bi bi-quote"></i>
//                     <p>{story.testimonial}</p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Final CTA */}
//       <section className="final-cta-section">
//         <div className="container text-center">
//           <h2>Ready to Start Your Journey?</h2>
//           <p>Join thousands of students finding success. Create your account today and unlock your potential.</p>
//           <Link to="/register" className="btn-cta-large">
//             Sign Up for Free
//           </Link>
//         </div>
//       </section>
//     </div>
//   );
// }

// export default Home;