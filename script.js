/**
 * Crazex Studio — Production Master JavaScript
 * Version: 2026.2 (Fully Consolidated, Mobile-Optimized & Exception-Safe)
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ==========================================================================
     1. Global Constants & Safe Helper Utilities
     ========================================================================== */

  const WHATSAPP_NUMBER = '8801968908404';
  const isTouchDevice = window.matchMedia('(pointer: coarse)').matches || window.innerWidth <= 992;

  // Global GA4 Event Tracking Helper
  window.trackGA4Event = function(eventName, eventParams) {
    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, eventParams || {});
    }
  };

  function openWhatsApp(message) {
    try {
      const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    } catch (e) {
      // Safe fallback
    }
  }

  function safeStorageGet(key) {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      return null;
    }
  }

  function safeStorageSet(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      // Storage restricted or disabled
    }
  }

  /* ==========================================================================
     2. Data Structures (Services & Website Showcase)
     ========================================================================== */

  const servicesData = {
    video: {
      title: 'Video Editing & Motion Graphics',
      icon: `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="m15 10-4 4 6 6 4-4-6-6Z"/><path d="m12 13 4-4"/><path d="M8 21a4 4 0 0 0-4-4"/><path d="M4 17a4 4 0 0 1 4-4"/></svg>`,
      description: 'Transform raw footage into scroll-stopping cinematic stories. We specialize in color grading, seamless transitions, professional sound design, animated typography, and high-retention reel edits.',
      features: [
        '4K Color Grading & Transitions',
        'Audio Cleaning & Custom Sound Design',
        'Kinetic Subtitles & Animated Typography',
        'Reels, Shorts & TikTok Formats',
        'Fast Turnaround & Revisions'
      ]
    },
    graphics: {
      title: 'Graphic Design & Social Creatives',
      icon: `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg>`,
      description: 'High-impact social media posts, ad banners, posters, and print collaterals crafted specifically to capture consumer attention and elevate brand perception.',
      features: [
        'Social Media Feed & Story Creatives',
        'Restaurant Menus & Banners',
        'E-Commerce Promotional Ads',
        'Print & Packaging Design',
        'Full Vector Source Files Included'
      ]
    },
    branding: {
      title: 'Branding & Visual Identity',
      icon: `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>`,
      description: 'Build a lasting brand footprint with custom logo design, color palettes, typography systems, and brand voice guidelines tailored to your specific market niche.',
      features: [
        'Custom Logo & Vector Mark Design',
        'Color System & Typography Rules',
        'Comprehensive Brand Guidelines Book',
        'Stationery & Packaging Mockups',
        'Scalable Brand Identity Systems'
      ]
    },
    marketing: {
      title: 'Digital Marketing & Strategy',
      icon: `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>`,
      description: 'Data-driven social media management, content strategy, and meta ad campaign optimization designed to turn social followers into paying customers.',
      features: [
        'Social Media Campaign Strategy',
        'Monthly Content Calendar Planning',
        'Paid Meta & Google Ad Campaign Setups',
        'Target Audience Research & Targeting',
        'Comprehensive ROI & Analytics Reports'
      ]
    },
    website: {
      title: 'Website & Landing Page Design',
      icon: `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M2 7h20"/><path d="M6 11h2"/></svg>`,
      description: 'Conversion-optimized, mobile-responsive websites and landing pages built to deliver seamless user experience across all devices.',
      features: [
        'Mobile-First Responsive Layouts',
        'Lightning-Fast Page Load Performance',
        'High-Converting UI/UX Design',
        'SEO-Optimized Code Structure',
        'Interactive Elements & Smooth Animations'
      ]
    },
    ai: {
      title: 'AI Content Creation',
      icon: `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/><circle cx="12" cy="12" r="4"/></svg>`,
      description: 'Harness generative AI tools combined with human post-processing to generate hyper-realistic visuals, natural voice-overs, and unique creative assets at scale.',
      features: [
        'Hyper-Realistic AI Image Generation',
        'Natural-Sounding AI Voice-Overs',
        'AI Motion & Video Synthesis',
        'Rapid Creative Concept Prototyping',
        'Scalable Content Asset Generation'
      ]
    },
    videoshoot: {
      title: 'Video Shoot Support',
      icon: `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>`,
      description: 'Professional on-location video production support with cinema cameras or specialized iPhone rigs, ideal for restaurants, cafés, real estate, and commercial brands.',
      features: [
        'Cinema Camera & iPhone Pro Rigs',
        'Professional Lighting & Wireless Audio',
        'Creative Direction & Shot Listing',
        'On-Location Food & Product Styling',
        'Raw Footage Transfer & Handover'
      ]
    }
  };

  const websiteProjectsData = {
    portfolio: {
      title: '👨‍💻 Personal Portfolio Website',
      badge: 'Personal Project',
      badgeClass: 'personal',
      overview: 'A sleek, modern developer & designer personal portfolio crafted to showcase creative work, services, and brand identity with smooth animations and interactive UI.',
      theme: 'Dark Futuristic Neon Accent with Glassmorphism and Minimalist Typography.',
      targetAudience: 'Freelancers, Digital Creators, Developers, Consultants, and Creative Professionals.',
      businessGoals: 'Establish online authority, highlight expertise, showcase creative case studies, and generate high-converting client leads.',
      features: [
        'Interactive Project Showcase & Filterable Gallery',
        'Smooth Scroll & Kinetic Micro-Interactions',
        'Custom Dark / Light Theme Toggle Mode',
        'Integrated Contact Form with Direct WhatsApp Routing',
        'Fully Animated Particle Background Canvas'
      ],
      problemSolved: 'Eliminates flat, boring text resumes by replacing them with a high-retention visual experience that builds instant credibility with potential clients.',
      technologies: ['HTML5', 'CSS3 Variable Systems', 'JavaScript (ES6+)', 'Schema.org JSON-LD', 'HTML Canvas API'],
      responsiveInfo: '100% Mobile & Tablet Optimized with custom viewport breakpoints and touch-friendly navigation.',
      seoFeatures: 'Pre-configured Canonical Tags, Open Graph Social Cards, Structured Schema Markup, and Semantic HTML5 tags.',
      performanceHighlights: '98+ Google PageSpeed Score, Lightweight Vanilla CSS/JS without heavy external framework bloat.',
      ctaMessage: 'Hello Crazex Studio!\n\nI loved your Personal Portfolio Website design! I would like to build a similar custom portfolio website for my personal brand.'
    },
    restaurant: {
      title: '🍽️ Restaurant Demo Website',
      badge: 'Concept Project',
      badgeClass: 'concept',
      overview: 'An appetizing, luxury website design built for fine dining restaurants, cafés, and food outlets with an interactive digital menu and reservation booking flow.',
      theme: 'Warm Culinary Dark Gold & Deep Charcoal with high-resolution food imagery.',
      targetAudience: 'Gourmet Restaurants, Cafés, Fast Food Chains, Cloud Kitchens, and Bistro Owners.',
      businessGoals: 'Drive online table reservations, increase food delivery orders, and showcase mouth-watering menu items visually.',
      features: [
        'Interactive Digital Menu with Filterable Food Categories',
        'Table Reservation Form with Instant Confirmation',
        'Customer Reviews & Social Proof Slider',
        'Integrated Google Maps Location & Store Hours',
        'Special Offers & Seasonal Banner Highlights'
      ],
      problemSolved: 'Solves slow order taking and lost reservations by giving diners an instant, mobile-friendly digital booking and ordering experience.',
      technologies: ['HTML5', 'CSS3 Grid & Flexbox', 'Vanilla JavaScript ES6', 'Google Maps API', 'CSS Glassmorphism'],
      responsiveInfo: 'Flawless presentation on mobile phones so guests can view menus and book tables easily on the go.',
      seoFeatures: 'Geo-targeted Local Business Schema, Open Graph previews for Facebook & Instagram sharing, and structured menu tags.',
      performanceHighlights: 'Lazy-loaded high-res food images, smooth CSS transitions, sub-second initial load speed.',
      ctaMessage: 'Hello Crazex Studio!\n\nI am interested in your Restaurant Demo Website design! I would like to create a website for my restaurant/café business.'
    },
    ecommerce: {
      title: '🛍️ E-commerce Demo Website',
      badge: 'Concept Project',
      badgeClass: 'concept',
      overview: 'A high-converting, modern online store showcase designed for fashion, electronics, lifestyle, and retail brands looking to scale online sales.',
      theme: 'Minimalist Clean Luxury with Vibrant Call-to-Action Highlights and bold product framing.',
      targetAudience: 'E-commerce Brands, Fashion Retailers, Gadget Stores, and Direct-to-Consumer (D2C) Merchants.',
      businessGoals: 'Maximize conversion rate, reduce cart abandonment, and offer a frictionless shopping experience.',
      features: [
        'Product Grid with Quick View & Image Zoom',
        'Dynamic Shopping Cart & Express Checkout Modal',
        'Category Filters, Price Range & Search Functionality',
        'Customer Testimonials & Verified Rating Badges',
        'Trust Badges & Secure Checkout Guarantee Banners'
      ],
      problemSolved: 'Fixes slow store loading times and complicated checkout steps that cause prospective online buyers to abandon their purchase.',
      technologies: ['HTML5', 'CSS3 Grid Layout', 'Vanilla JS Cart State', 'Local Storage API', 'SVG Icon Library'],
      responsiveInfo: 'Mobile-first cart UI optimized for single-thumb navigation on smartphone screens.',
      seoFeatures: 'Product Schema JSON-LD markup, keyword-optimized heading hierarchy, and meta preview tags.',
      performanceHighlights: 'Zero framework bloat, instant page navigation, and highly optimized web-formatted graphics.',
      ctaMessage: 'Hello Crazex Studio!\n\nI am interested in your E-commerce Demo Website design! I want to launch an online store for my brand.'
    },
    realestate: {
      title: '🏢 Real Estate Demo Website',
      badge: 'Concept Project',
      badgeClass: 'concept',
      overview: 'A premium real estate agency showcase designed to highlight luxury property listings, apartment tours, location amenities, and agent contacts.',
      theme: 'Corporate Navy, Slate Grey & Gold Accents for maximum trust and sophistication.',
      targetAudience: 'Real Estate Developers, Property Agencies, Real Estate Brokers, and Luxury Home Sellers.',
      businessGoals: 'Capture high-ticket buyer leads, schedule property site visits, and showcase property portfolios elegantly.',
      features: [
        'Interactive Property Search with Location, Price, & Bedroom Filters',
        'HD Image Gallery & Virtual Tour Embed Slot',
        'Floor Plan Viewer & Property Specifications Grid',
        'Instant Lead Capture Form for Booking Site Visits',
        'Agent Profiles with Direct Call & WhatsApp Contact'
      ],
      problemSolved: 'Replaces generic, uninspiring listings with interactive property showcases that pre-qualify serious buyers.',
      technologies: ['HTML5', 'CSS3 Custom Variables', 'JavaScript Lightbox & Slider', 'Google Maps Location Tags'],
      responsiveInfo: 'Fully responsive grid adapting effortlessly from ultra-wide monitors down to handheld smartphones.',
      seoFeatures: 'RealEstateAgent Schema markup, geo-location meta tags, and optimized property listing cards.',
      performanceHighlights: 'Optimized multi-image loading, smooth modal overlays, and 95+ performance metrics.',
      ctaMessage: 'Hello Crazex Studio!\n\nI am interested in your Real Estate Demo Website design! I want to create a website for my real estate project/agency.'
    },
    gym: {
      title: '💪 Gym Demo Website',
      badge: 'Concept Project',
      badgeClass: 'concept',
      overview: 'An energetic, high-impact fitness website crafted to boost gym memberships, promote personal training programs, and showcase class schedules.',
      theme: 'High-Energy Dark Neon Orange & Cyber Red with bold motivational typography.',
      targetAudience: 'Fitness Centers, Gyms, Crossfit Boxes, Yoga Studios, and Personal Trainers.',
      businessGoals: 'Convert visitors into active members, sell training packages, and build a thriving fitness community.',
      features: [
        'Interactive Class Schedule & Weekly Workout Timetable',
        'Membership Pricing Cards with Instant Signup Links',
        'BMI Calculator & Fitness Goal Tracker Widget',
        'Trainer Spotlight & Client Transformation Slider',
        'Free Trial Pass Lead Generation Popup'
      ],
      problemSolved: 'Eliminates confusion regarding class timings and membership rates by presenting clear, actionable signup pathways.',
      technologies: ['HTML5', 'CSS3 Flexbox & Grid', 'JavaScript Logic for Interactive Calculators', 'CSS Micro-Animations'],
      responsiveInfo: 'Touch-optimized mobile interface allowing users to check schedules and sign up directly from their phones.',
      seoFeatures: 'Local Business Schema Markup, Open Graph share cards, and targeted fitness keywords.',
      performanceHighlights: 'Superfast rendering speed, lightweight code, and hardware-accelerated animations.',
      ctaMessage: 'Hello Crazex Studio!\n\nI am interested in your Gym Demo Website design! I want to build a high-energy website for my gym/fitness studio.'
    }
  };

  /* ==========================================================================
     3. Cached DOM Elements
     ========================================================================== */

  const pageLoader = document.getElementById('pageLoader');
  const scrollProgressBar = document.querySelector('.scroll-progress-bar');
  const customCursor = document.querySelector('.custom-cursor');
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorRing = document.querySelector('.cursor-ring');
  const mouseGlow = document.querySelector('.mouse-glow');
  const navbar = document.querySelector('.navbar');
  const themeToggleBtn = document.getElementById('themeToggle');
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-menu nav a');
  const sections = document.querySelectorAll('section[id]');
  const floatingTrack = document.getElementById('floatingScrollbarTrack');
  const floatingThumb = document.getElementById('floatingScrollbarThumb');

  /* ==========================================================================
     4. Page Loader Management
     ========================================================================== */

  const hideLoader = () => {
    if (pageLoader && pageLoader.style.display !== 'none') {
      pageLoader.style.opacity = '0';
      setTimeout(() => {
        pageLoader.style.display = 'none';
      }, 400);
    }
  };

  window.addEventListener('load', hideLoader, { once: true });
  setTimeout(hideLoader, 1500);

  /* ==========================================================================
     5. Scroll Progress, Floating Scrollbar & Throttled Scroll Observer
     ========================================================================== */

  let isDraggingThumb = false;
  let dragStartY = 0;
  let startScrollTop = 0;
  let isTickingScroll = false;

  function updateScrollPositions() {
    const windowHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;
    const scrollY = window.scrollY;
    const totalScrollable = docHeight - windowHeight;

    if (totalScrollable > 0) {
      const scrollPercent = (scrollY / totalScrollable) * 100;
      if (scrollProgressBar) {
        scrollProgressBar.style.width = `${scrollPercent}%`;
      }

      if (floatingTrack && floatingThumb && !isTouchDevice) {
        const trackHeight = floatingTrack.clientHeight;
        const thumbHeight = Math.max(40, (windowHeight / docHeight) * trackHeight);
        floatingThumb.style.height = `${thumbHeight}px`;

        const maxThumbTop = trackHeight - thumbHeight;
        const currentThumbTop = (scrollY / totalScrollable) * maxThumbTop;
        floatingThumb.style.top = `${currentThumbTop}px`;
      }
    }

    if (navbar) {
      if (scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    updateActiveNavLink(scrollY);
  }

  const onScrollThrottled = () => {
    if (!isTickingScroll) {
      requestAnimationFrame(() => {
        updateScrollPositions();
        isTickingScroll = false;
      });
      isTickingScroll = true;
    }
  };

  window.addEventListener('scroll', onScrollThrottled, { passive: true });
  window.addEventListener('resize', onScrollThrottled, { passive: true });

  // Floating Drag Logic (Desktop Only)
  if (floatingTrack && floatingThumb && !isTouchDevice) {
    const startDrag = (e) => {
      isDraggingThumb = true;
      dragStartY = e.clientY || (e.touches && e.touches[0].clientY);
      startScrollTop = window.scrollY;
      document.body.style.userSelect = 'none';
    };

    const doDrag = (e) => {
      if (!isDraggingThumb) return;
      const currentY = e.clientY || (e.touches && e.touches[0].clientY);
      const deltaY = currentY - dragStartY;
      const trackHeight = floatingTrack.clientHeight;
      const thumbHeight = floatingThumb.clientHeight;
      const maxThumbTop = trackHeight - thumbHeight;
      const totalScrollable = document.documentElement.scrollHeight - window.innerHeight;

      if (maxThumbTop > 0) {
        const scrollRatio = totalScrollable / maxThumbTop;
        window.scrollTo(0, startScrollTop + deltaY * scrollRatio);
      }
    };

    const stopDrag = () => {
      if (isDraggingThumb) {
        isDraggingThumb = false;
        document.body.style.userSelect = '';
      }
    };

    floatingThumb.addEventListener('pointerdown', startDrag);
    window.addEventListener('pointermove', doDrag, { passive: true });
    window.addEventListener('pointerup', stopDrag, { passive: true });
  }

  /* ==========================================================================
     6. Custom Cursor & Mouse Glow Tracking (Desktop Only, Bypassed on Mobile)
     ========================================================================== */

  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;
  let isTickingMouse = false;

  if (!isTouchDevice) {
    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isTickingMouse) {
        requestAnimationFrame(() => {
          if (cursorDot) {
            cursorDot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
          }
          if (mouseGlow) {
            mouseGlow.style.setProperty('--mouse-x', `${mouseX}px`);
            mouseGlow.style.setProperty('--mouse-y', `${mouseY}px`);
          }
          isTickingMouse = false;
        });
        isTickingMouse = true;
      }
    }, { passive: true });

    function animateCursorRing() {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;

      if (cursorRing) {
        cursorRing.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }

      requestAnimationFrame(animateCursorRing);
    }

    if (customCursor && cursorRing) {
      animateCursorRing();
    }

    // Hover Scale Effects for Interactive Elements
    const interactiveSelector = 'a, button, .service-card, .portfolio-card, .video-embed-card, .poster-card, .pricing-card, .interactive-card, .team-card, .why-choose-card, .terms-card, .website-card, .floating-card';
    document.querySelectorAll(interactiveSelector).forEach(el => {
      el.addEventListener('mouseenter', () => {
        if (customCursor) customCursor.classList.add('hover');
      }, { passive: true });
      el.addEventListener('mouseleave', () => {
        if (customCursor) customCursor.classList.remove('hover');
      }, { passive: true });
    });
  }

  /* ==========================================================================
     7. Navigation & Active Nav Link Highlighting & Mobile Overlay Menu
     ========================================================================== */

  function updateActiveNavLink(currentScrollY) {
    const scrollPos = (currentScrollY || window.scrollY) + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }

  function toggleMobileMenu(forceClose) {
    if (!mobileMenu || !mobileMenuBtn) return;
    const shouldClose = forceClose !== undefined ? forceClose : mobileMenu.classList.contains('active');

    if (shouldClose) {
      mobileMenu.classList.remove('active');
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
      mobileMenu.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    } else {
      mobileMenu.classList.add('active');
      mobileMenuBtn.setAttribute('aria-expanded', 'true');
      mobileMenu.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  }

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMobileMenu();
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        toggleMobileMenu(true);
      });
    });

    document.addEventListener('click', (e) => {
      if (mobileMenu.classList.contains('active') && !mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        toggleMobileMenu(true);
      }
    });
  }

  /* ==========================================================================
     8. Theme Switching (Dark / Light Mode)
     ========================================================================== */

  const savedTheme = safeStorageGet('crazex-theme');
  if (savedTheme === 'light') {
    document.body.classList.add('light');
    if (themeToggleBtn) themeToggleBtn.textContent = '☀️';
  } else {
    document.body.classList.remove('light');
    if (themeToggleBtn) themeToggleBtn.textContent = '🌙';
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      document.body.classList.add('theme-transition');
      const isLight = document.body.classList.toggle('light');
      themeToggleBtn.textContent = isLight ? '☀️' : '🌙';
      safeStorageSet('crazex-theme', isLight ? 'light' : 'dark');

      setTimeout(() => {
        document.body.classList.remove('theme-transition');
      }, 500);
    });
  }

  /* ==========================================================================
     9. Particles Canvas Engine (Mobile Performance Scaled)
     ========================================================================== */

  const canvas = document.getElementById('particles');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particlesArray = [];
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        initParticles();
      }, 150);
    }, { passive: true });

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.speedY = (Math.random() - 0.5) * 0.4;
        this.opacity = Math.random() * 0.5 + 0.2;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
      }

      draw() {
        ctx.fillStyle = `rgba(167, 139, 250, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function initParticles() {
      particlesArray = [];
      const densityDivisor = width <= 576 ? 32 : 18;
      const maxCount = width <= 576 ? 20 : 70;
      const particleCount = Math.min(Math.floor(width / densityDivisor), maxCount);

      for (let i = 0; i < particleCount; i++) {
        particlesArray.push(new Particle());
      }
    }

    function animateParticles() {
      ctx.clearRect(0, 0, width, height);
      particlesArray.forEach(p => {
        p.update();
        p.draw();
      });
      requestAnimationFrame(animateParticles);
    }

    initParticles();
    animateParticles();
  }

  /* ==========================================================================
     10. Stat Counters Animation
     ========================================================================== */

  const statNumbers = document.querySelectorAll('.stat-number');
  let animatedStats = false;

  if (statNumbers.length > 0) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animatedStats) {
          animatedStats = true;
          statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'), 10);
            if (isNaN(target)) return;

            let current = 0;
            const duration = 1800;
            const stepTime = 30;
            const steps = duration / stepTime;
            const increment = target / steps;

            const timer = setInterval(() => {
              current += increment;
              if (current >= target) {
                stat.textContent = target;
                clearInterval(timer);
              } else {
                stat.textContent = Math.floor(current);
              }
            }, stepTime);
          });
        }
      });
    }, { threshold: 0.3 });

    const statsSection = document.querySelector('.stats');
    if (statsSection) {
      statsObserver.observe(statsSection);
    }
  }

  /* ==========================================================================
     11. Service Details Modal & Dynamic WhatsApp Inquire
     ========================================================================== */

  const servicesDetailModal = document.getElementById('servicesDetailModal');
  const serviceDetailsTarget = document.getElementById('serviceDetailsTarget');
  const serviceCards = document.querySelectorAll('.service-card');

  serviceCards.forEach(card => {
    const serviceKey = card.getAttribute('data-service');
    const linkBtn = card.querySelector('.service-link');

    const openServiceHandler = () => {
      if (servicesData[serviceKey] && servicesDetailModal && serviceDetailsTarget) {
        const data = servicesData[serviceKey];
        serviceDetailsTarget.innerHTML = `
          <div class="service-modal-header" style="text-align: center; margin-bottom: 1.5rem;">
            <div class="service-icon" style="margin: 0 auto 1rem; width: 64px; height: 64px;">${data.icon}</div>
            <h2 style="font-family: var(--font-display); font-size: clamp(1.4rem, 5vw, 1.8rem); margin-bottom: 0.5rem;">${data.title}</h2>
          </div>
          <p style="color: var(--text-secondary); line-height: 1.7; margin-bottom: 1.5rem; text-align: center; font-size: 0.95rem;">${data.description}</p>
          <div class="service-modal-features" style="background: var(--bg-primary); padding: 1.25rem; border-radius: var(--radius-sm); border: 1px solid var(--border); margin-bottom: 2rem;">
            <h4 style="font-size: 1rem; font-weight: 700; margin-bottom: 1rem; color: var(--accent-light);">Key Features Included:</h4>
            <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.75rem;">
              ${data.features.map(f => `
                <li style="display: flex; align-items: center; gap: 0.6rem; color: var(--text-secondary); font-size: 0.92rem;">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--accent); flex-shrink: 0;"><path d="M20 6 9 17l-5-5"/></svg>
                  <span>${f}</span>
                </li>
              `).join('')}
            </ul>
          </div>
          <div style="text-align: center;">
            <button type="button" class="btn btn-primary btn-full modal-wa-inquire-btn" style="justify-content: center; min-height: 48px;">
              <span>Inquire About This Service</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </button>
          </div>
        `;

        const inquireBtn = serviceDetailsTarget.querySelector('.modal-wa-inquire-btn');
        if (inquireBtn) {
          inquireBtn.addEventListener('click', () => {
            const msg = `Hello Crazex Studio!\n\nI am interested in inquiring about your service:\n• Service Name: ${data.title}\n\nPlease share more details and consulting steps.`;
            openWhatsApp(msg);
          });
        }

        openModal(servicesDetailModal);
      }
    };

    if (linkBtn) linkBtn.addEventListener('click', (e) => { e.stopPropagation(); openServiceHandler(); });
    card.addEventListener('click', openServiceHandler);
  });

  /* ==========================================================================
     12. Graphics Design Showcase Slider (Buttons & Touch Drag/Swipe)
     ========================================================================== */

  const graphicsSlider = document.getElementById('graphicsSlider');
  const prevBtn = document.querySelector('.slider-btn.prev-btn');
  const nextBtn = document.querySelector('.slider-btn.next-btn');

  if (graphicsSlider) {
    const scrollAmount = 280;

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        graphicsSlider.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        graphicsSlider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      });
    }

    // Touch Swipe Gesture Handling for Mobile
    let startX = 0;
    let scrollLeftPos = 0;
    let isDown = false;

    graphicsSlider.addEventListener('touchstart', (e) => {
      isDown = true;
      startX = e.touches[0].pageX - graphicsSlider.offsetLeft;
      scrollLeftPos = graphicsSlider.scrollLeft;
    }, { passive: true });

    graphicsSlider.addEventListener('touchmove', (e) => {
      if (!isDown) return;
      const x = e.touches[0].pageX - graphicsSlider.offsetLeft;
      const walk = (x - startX) * 1.2;
      graphicsSlider.scrollLeft = scrollLeftPos - walk;
    }, { passive: true });

    graphicsSlider.addEventListener('touchend', () => {
      isDown = false;
    }, { passive: true });
  }

  /* ==========================================================================
     13. Website Design Showcase Modal Popup Logic
     ========================================================================== */

  const websiteModal = document.getElementById('websiteModal');
  const websiteModalBody = document.getElementById('websiteModalBody');
  const websiteDetailsBtns = document.querySelectorAll('.website-details-btn');

  websiteDetailsBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const projectId = btn.getAttribute('data-project-id');
      const data = websiteProjectsData[projectId];

      if (data && websiteModal && websiteModalBody) {
        websiteModalBody.innerHTML = `
          <div class="website-modal-header">
            <span class="project-type-badge ${data.badgeClass}">${data.badge}</span>
            <h2 style="margin-top: 0.5rem; font-family: var(--font-display); font-size: clamp(1.4rem, 5vw, 1.8rem); color: var(--text-primary);">${data.title}</h2>
          </div>

          <div class="modal-section-grid">
            <div class="modal-box">
              <h4>📋 Project Overview</h4>
              <p>${data.overview}</p>
            </div>
            <div class="modal-box">
              <h4>🎨 Design Theme</h4>
              <p>${data.theme}</p>
            </div>
            <div class="modal-box">
              <h4>🎯 Target Audience</h4>
              <p>${data.targetAudience}</p>
            </div>
            <div class="modal-box">
              <h4>📈 Business Goals</h4>
              <p>${data.businessGoals}</p>
            </div>
          </div>

          <div class="modal-box" style="margin-bottom: 1.5rem;">
            <h4>✨ Key Features & Functionality</h4>
            <ul>
              ${data.features.map(f => `<li>${f}</li>`).join('')}
            </ul>
          </div>

          <div class="modal-section-grid">
            <div class="modal-box">
              <h4>💡 Problem Solved</h4>
              <p>${data.problemSolved}</p>
            </div>
            <div class="modal-box">
              <h4>⚙️ Technologies Used</h4>
              <p>${data.technologies.join(', ')}</p>
            </div>
            <div class="modal-box">
              <h4>📱 Responsive Information</h4>
              <p>${data.responsiveInfo}</p>
            </div>
            <div class="modal-box">
              <h4>🔍 SEO Features</h4>
              <p>${data.seoFeatures}</p>
            </div>
          </div>

          <div class="modal-box" style="margin-bottom: 1.5rem;">
            <h4>⚡ Performance Highlights</h4>
            <p>${data.performanceHighlights}</p>
          </div>

          <div class="modal-cta-box">
            <h3>Want a Website Like This For Your Business?</h3>
            <p>Get in touch with Crazex Studio today for custom web design, fast delivery, and premium growth-driven results.</p>
            <button type="button" class="btn btn-primary btn-full modal-wa-website-btn" style="padding: 0.9rem 1.5rem; min-height: 48px;">
              <span>Request Custom Website Quote</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </button>
          </div>
        `;

        const waWebsiteBtn = websiteModalBody.querySelector('.modal-wa-website-btn');
        if (waWebsiteBtn) {
          waWebsiteBtn.addEventListener('click', () => {
            openWhatsApp(data.ctaMessage);
          });
        }

        openModal(websiteModal);
      }
    });
  });

  /* ==========================================================================
     14. Essential Services Live Calculator & Business Category
     ========================================================================== */

  const categorySelect = document.getElementById('business-category');
  const essentialCards = document.querySelectorAll('#essential-services .interactive-card');
  const essentialTotalEl = document.getElementById('essential-total');
  const bookEssentialBtn = document.getElementById('book-essential-btn');
  const summaryCategoryVal = document.getElementById('summary-category-val');
  const summaryItemsList = document.getElementById('summary-items-list');

  function calculateEssentialTotal() {
    let total = 0;
    const selectedItems = [];
    let summaryHtml = '';

    const selectedCategory = categorySelect ? categorySelect.value : '';
    if (summaryCategoryVal) {
      summaryCategoryVal.textContent = selectedCategory || 'None Selected';
    }

    essentialCards.forEach(card => {
      const price = parseInt(card.getAttribute('data-price'), 10) || 0;
      const h3El = card.querySelector('h3');
      const name = card.getAttribute('data-name') || (h3El ? h3El.textContent.trim() : '');
      const countEl = card.querySelector('.qty-count');
      const count = parseInt(countEl ? countEl.textContent : '0', 10) || 0;

      if (count > 0) {
        const itemTotal = price * count;
        total += itemTotal;
        selectedItems.push(`${name} (Qty: ${count}, Rate: ৳${price}) = ৳${itemTotal.toLocaleString()}`);

        summaryHtml += `
          <div class="summary-item-row">
            <span class="item-name-qty">• ${name} (${count}x @ ৳${price})</span>
            <span class="item-price-calc">৳${itemTotal.toLocaleString()}</span>
          </div>
        `;
      }
    });

    if (summaryItemsList) {
      summaryItemsList.innerHTML = summaryHtml || '<p style="color: var(--text-muted); font-size: 0.9rem;">No services selected yet.</p>';
    }

    if (essentialTotalEl) {
      essentialTotalEl.textContent = total.toLocaleString();
    }

    if (bookEssentialBtn) {
      if (total > 0) {
        bookEssentialBtn.removeAttribute('disabled');
        bookEssentialBtn.onclick = () => {
          const categoryText = selectedCategory ? selectedCategory : 'Not Specified';
          const message = `Hello Crazex Studio!\n\nI want to book the following Essential Services:\n• Business Category: ${categoryText}\n\nSelected Services:\n• ${selectedItems.join('\n• ')}\n\nSubtotal / Grand Total: ৳${total.toLocaleString()}`;
          openWhatsApp(message);
        };
      } else {
        bookEssentialBtn.setAttribute('disabled', 'true');
        bookEssentialBtn.onclick = null;
      }
    }
  }

  if (categorySelect) {
    categorySelect.addEventListener('change', calculateEssentialTotal);
  }

  essentialCards.forEach(card => {
    const plusBtn = card.querySelector('.qty-btn.plus');
    const minusBtn = card.querySelector('.qty-btn.minus');
    const countEl = card.querySelector('.qty-count');

    if (plusBtn && countEl) {
      plusBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        let current = parseInt(countEl.textContent, 10) || 0;
        countEl.textContent = current + 1;
        calculateEssentialTotal();
      });
    }

    if (minusBtn && countEl) {
      minusBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        let current = parseInt(countEl.textContent, 10) || 0;
        if (current > 0) {
          countEl.textContent = current - 1;
          calculateEssentialTotal();
        }
      });
    }
  });

  /* ==========================================================================
     15. UPGRADED PRICING PACKAGE TOGGLE & WHATSAPP BOOKING INTEGRATION
     ========================================================================== */

  const toggleBtn = document.getElementById('pBillingToggle') || document.querySelector('.pricing-toggle .toggle-switch');
  const monthlyText = document.getElementById('pMonthlyText') || document.querySelectorAll('.pricing-toggle .toggle-label')[0];
  const yearlyText = document.getElementById('pYearlyText') || document.querySelectorAll('.pricing-toggle .toggle-label')[1];
  const pricingSectionCards = document.querySelectorAll('#pricing .pricing-card');

  let isYearlyBilling = false;

  function updatePricingSystem(isYearly) {
    isYearlyBilling = isYearly;

    pricingSectionCards.forEach((card) => {
      const priceBlock = card.querySelector('.price-block, .price-wrapper, .pricing-price');

      if (priceBlock) {
        priceBlock.classList.add('switching');
      }

      setTimeout(() => {
        const currentPrice = isYearly ? card.dataset.yearlyPrice : card.dataset.monthlyPrice;
        const period = isYearly ? card.dataset.yearlyPeriod : card.dataset.monthlyPeriod;
        const regularPrice = isYearly ? card.dataset.yearlyRegular : card.dataset.monthlyRegular;
        const discountTag = isYearly ? card.dataset.yearlyDiscount : card.dataset.monthlyDiscount;
        const savesText = isYearly ? card.dataset.yearlySaves : card.dataset.monthlySaves;
        const breakdownText = isYearly ? card.dataset.yearlyBreakdown : card.dataset.monthlyBreakdown;

        // DOM elements update with fallback selectors
        const largePriceEl = card.querySelector('.large-price, .current-price, .amount');
        const priceCycleEl = card.querySelector('.price-cycle, .price-period, .period');
        const strikethroughPriceEl = card.querySelector('.strikethrough-price, .regular-price');
        const greenDiscountTagEl = card.querySelector('.green-discount-tag, .discount-badge');
        const youSaveTextEl = card.querySelector('.you-save-text, .you-save');
        const monthlyEquivalentEl = card.querySelector('.monthly-equivalent, .monthly-breakdown');

        if (largePriceEl && currentPrice) largePriceEl.textContent = currentPrice;
        if (priceCycleEl && period) priceCycleEl.textContent = period;
        if (strikethroughPriceEl && regularPrice) strikethroughPriceEl.textContent = regularPrice;
        if (greenDiscountTagEl && discountTag) greenDiscountTagEl.textContent = `🟢 ${discountTag}`;
        if (youSaveTextEl && savesText) youSaveTextEl.textContent = savesText;
        if (monthlyEquivalentEl) monthlyEquivalentEl.textContent = breakdownText || '';

        if (priceBlock) {
          priceBlock.classList.remove('switching');
        }
      }, 150);
    });

    // Update Toggle Button & Label States
    if (toggleBtn) {
      if (isYearly) {
        toggleBtn.classList.add('active', 'yearly');
      } else {
        toggleBtn.classList.remove('active', 'yearly');
      }
    }

    if (monthlyText) monthlyText.classList.toggle('active', !isYearly);
    if (yearlyText) yearlyText.classList.toggle('active', isYearly);
  }

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      isYearlyBilling = !isYearlyBilling;
      updatePricingSystem(isYearlyBilling);
    });
  }

  if (monthlyText) {
    monthlyText.addEventListener('click', () => {
      if (isYearlyBilling) {
        updatePricingSystem(false);
      }
    });
  }

  if (yearlyText) {
    yearlyText.addEventListener('click', () => {
      if (!isYearlyBilling) {
        updatePricingSystem(true);
      }
    });
  }

  // Attach WhatsApp booking handlers to all Pricing Plan buttons
  pricingSectionCards.forEach(card => {
    const planBtn = card.querySelector('.btn-plan-wa, .pricing-action-btn');

    if (planBtn) {
      planBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const planNameEl = card.querySelector('.plan-title, h3');
        const largePriceEl = card.querySelector('.large-price, .current-price, .amount');
        const priceCycleEl = card.querySelector('.price-cycle, .price-period, .period');
        const strikethroughPriceEl = card.querySelector('.strikethrough-price, .regular-price');
        const youSaveTextEl = card.querySelector('.you-save-text, .you-save');

        const planName = planNameEl ? planNameEl.textContent.trim() : 'Package Plan';
        const price = largePriceEl ? largePriceEl.textContent.trim() : '';
        const cycle = priceCycleEl ? priceCycleEl.textContent.trim() : '';
        const regular = strikethroughPriceEl ? strikethroughPriceEl.textContent.trim() : '';
        const savings = youSaveTextEl ? youSaveTextEl.textContent.trim() : '';
        const billingType = isYearlyBilling ? 'Yearly Billed (Save 20%)' : 'Monthly Billed';

        const message = `Hello Crazex Studio!\n\nI want to choose the following Package Plan:\n• Plan Name: ${planName}\n• Current Price: ${price}${cycle}\n• Regular Price: ${regular}\n• Savings: ${savings}\n• Billing Cycle: ${billingType}\n\nPlease get in touch with me to get started.`;
        openWhatsApp(message);
      });
    }
  });

  /* ==========================================================================
     16. General WhatsApp CTA Buttons & Contact Form Handler
     ========================================================================== */

  const waButtons = document.querySelectorAll('.btn-wa');
  waButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const customMsg = btn.getAttribute('data-msg') || 'Hello Crazex Studio! I am interested in your creative agency services.';
      openWhatsApp(customMsg);
    });
  });

  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  if (contactForm) {
    const fields = {
      name: document.getElementById('name'),
      email: document.getElementById('email'),
      phone: document.getElementById('phone'),
      service: document.getElementById('service'),
      message: document.getElementById('message')
    };

    function validateField(field) {
      if (!field) return true;
      const group = field.closest('.form-group');
      let isValid = true;

      if (field.id === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        isValid = emailRegex.test(field.value.trim());
      } else if (field.id === 'phone') {
        isValid = field.value.trim().length >= 6;
      } else {
        isValid = field.value.trim() !== '';
      }

      if (group) {
        if (!isValid) {
          group.classList.add('error');
          field.setAttribute('aria-invalid', 'true');
        } else {
          group.classList.remove('error');
          field.setAttribute('aria-invalid', 'false');
        }
      }
      return isValid;
    }

    Object.values(fields).forEach(field => {
      if (field) {
        field.addEventListener('blur', () => validateField(field));
        field.addEventListener('input', () => {
          const group = field.closest('.form-group');
          if (group && group.classList.contains('error')) {
            validateField(field);
          }
        });
      }
    });

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let formIsValid = true;

      Object.values(fields).forEach(field => {
        if (!validateField(field)) {
          formIsValid = false;
        }
      });

      if (formIsValid) {
        const nameVal = fields.name ? fields.name.value.trim() : '';
        const emailVal = fields.email ? fields.email.value.trim() : '';
        const phoneVal = fields.phone ? fields.phone.value.trim() : '';
        const serviceSelect = fields.service;
        const serviceVal = (serviceSelect && serviceSelect.selectedIndex >= 0) ? serviceSelect.options[serviceSelect.selectedIndex].text : '';
        const messageVal = fields.message ? fields.message.value.trim() : '';

        const submitBtn = contactForm.querySelector('button[type="submit"]');
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerHTML = `<span>Opening WhatsApp...</span>`;
        }

        const formattedWhatsAppMsg = `Hello Crazex Studio!\n\nNew Consultation / Inquiry:\n• Name: ${nameVal}\n• Email: ${emailVal}\n• Phone: ${phoneVal}\n• Service Interested In: ${serviceVal}\n• Message: ${messageVal}`;

        setTimeout(() => {
          if (formSuccess) formSuccess.style.display = 'block';
          openWhatsApp(formattedWhatsAppMsg);
          contactForm.reset();

          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = `<span>Send Message</span><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 2 11 13"/><path d="M22 2 15 22 11 13 2 9l20-7z"/></svg>`;
          }

          setTimeout(() => {
            if (formSuccess) formSuccess.style.display = 'none';
          }, 6000);
        }, 600);
      }
    });
  }

  /* ==========================================================================
     17. Generic Modal Utilities & Keyboard Accessibility
     ========================================================================== */

  function openModal(modal) {
    if (!modal) return;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    const focusable = modal.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (focusable) focusable.focus();
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.custom-modal').forEach(modal => {
    const closeBtn = modal.querySelector('.close-modal');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => closeModal(modal));
    }

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal(modal);
      }
    });
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.custom-modal.active').forEach(modal => {
        closeModal(modal);
      });
      if (mobileMenu && mobileMenu.classList.contains('active')) {
        toggleMobileMenu(true);
      }
    }
  });

  /* ==========================================================================
     18. Scroll Reveal Observer
     ========================================================================== */

  const revealElements = document.querySelectorAll(`
    .service-card, 
    .service-price-card, 
    .pricing-card, 
    .team-card, 
    .why-choose-card, 
    .terms-card, 
    .video-embed-card,
    .poster-card,
    .website-card,
    .tool-category-card,
    .reveal,
    [data-reveal]
  `);

  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => {
      el.classList.add('reveal');
      revealObserver.observe(el);
    });
  }
});
