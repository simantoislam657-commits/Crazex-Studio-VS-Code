// ============================================
// CRAZEX STUDIO — Performance Optimized Interactions
// Unified observers, lazy video, throttled inputs,
// reduced main-thread work, passive listeners
// ============================================

(function() {
  'use strict';

  // ---- Performance Utilities ----
  const rAF = requestAnimationFrame;
  const rIC = window.requestIdleCallback || function(cb) { return setTimeout(cb, 1); };
  const cIC = window.cancelIdleCallback || clearTimeout;

  function throttleRAF(fn) {
    let ticking = false;
    return function(...args) {
      if (!ticking) {
        rAF(() => { fn.apply(this, args); ticking = false; });
        ticking = true;
      }
    };
  }

  function debounce(fn, ms = 150) {
    let t;
    return function(...args) {
      clearTimeout(t);
      t = setTimeout(() => fn.apply(this, args), ms);
    };
  }

  // ---- Unified Intersection Observer Manager ----
  const observerMap = new Map();
  function getObserver(key, options) {
    if (!observerMap.has(key)) {
      observerMap.set(key, new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          const cb = entry.target._ioCallbacks?.[key];
          if (cb) cb(entry);
        });
      }, options));
    }
    return observerMap.get(key);
  }

  function observeIO(el, key, callback, options = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }) {
    el._ioCallbacks = el._ioCallbacks || {};
    el._ioCallbacks[key] = callback;
    getObserver(key, options).observe(el);
    return () => { getObserver(key, options).unobserve(el); };
  }

  // ---- Page Loader ----
  const pageLoader = document.getElementById('pageLoader');
  if (pageLoader) {
    window.addEventListener('load', () => {
      setTimeout(() => pageLoader.classList.add('hidden'), 400);
    }, { once: true });
  }

  // ---- Scroll Progress Bar (throttled) ----
  const scrollProgressBar = document.querySelector('.scroll-progress-bar');
  if (scrollProgressBar) {
    const updateProgress = throttleRAF(() => {
      const st = window.scrollY || document.documentElement.scrollTop;
      const dh = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      scrollProgressBar.style.width = dh > 0 ? `${(st / dh) * 100}%` : '0%';
    });
    window.addEventListener('scroll', updateProgress, { passive: true });
  }

  // ---- Navbar Scroll Effect ----
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    const onScroll = throttleRAF(() => {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    });
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // ---- Active Nav Link on Scroll ----
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  if (sections.length && navLinks.length) {
    const updateActive = throttleRAF(() => {
      let current = '';
      const sy = window.scrollY + 100;
      for (let i = sections.length - 1; i >= 0; i--) {
        if (sy >= sections[i].offsetTop) {
          current = sections[i].getAttribute('id');
          break;
        }
      }
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + current);
      });
    });
    window.addEventListener('scroll', updateActive, { passive: true });
  }

  // ---- Smooth Scroll ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        const mMenu = document.querySelector('.mobile-menu');
        const mBtn = document.querySelector('.mobile-menu-btn');
        if (mMenu) mMenu.classList.remove('active');
        if (mBtn) mBtn.classList.remove('active');
      }
    });
  });

  // ---- Mobile Menu Toggle ----
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
      mobileMenuBtn.classList.toggle('active');
    });
  }

  // ---- Close mobile menu on resize to desktop ----
  window.addEventListener('resize', debounce(() => {
    if (window.innerWidth > 900 && mobileMenu) {
      mobileMenu.classList.remove('active');
      if (mobileMenuBtn) mobileMenuBtn.classList.remove('active');
    }
  }, 200));

  // ---- Light/Dark Mode Toggle ----
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    function setTheme(theme) {
      document.body.classList.add('theme-transition');
      const isLight = theme === 'light';
      document.body.classList.toggle('light', isLight);
      themeToggle.textContent = isLight ? '☀️' : '🌙';
      localStorage.setItem('theme', theme);
      setTimeout(() => document.body.classList.remove('theme-transition'), 500);
    }
    const saved = localStorage.getItem('theme');
    setTheme(saved || 'dark');
    themeToggle.addEventListener('click', () => {
      setTheme(document.body.classList.contains('light') ? 'dark' : 'light');
    });
  }

  // ---- Mouse Glow (RAF throttled) ----
  const mouseGlow = document.querySelector('.mouse-glow');
  if (mouseGlow) {
    let mx = 50, my = 50;
    document.addEventListener('mousemove', (e) => {
      mx = (e.clientX / window.innerWidth) * 100;
      my = (e.clientY / window.innerHeight) * 100;
    }, { passive: true });
    const updateGlow = () => {
      document.documentElement.style.setProperty('--mouse-x', mx + '%');
      document.documentElement.style.setProperty('--mouse-y', my + '%');
      rAF(updateGlow);
    };
    rAF(updateGlow);
  }

  // ---- Custom Cursor (Desktop Only) ----
  const customCursor = document.querySelector('.custom-cursor');
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorRing = document.querySelector('.cursor-ring');
  if (customCursor && cursorDot && cursorRing && !window.matchMedia('(pointer: coarse)').matches) {
    let mouseX = 0, mouseY = 0, dotX = 0, dotY = 0, ringX = 0, ringY = 0;
    document.addEventListener('mousemove', (e) => { mouseX = e.clientX; mouseY = e.clientY; }, { passive: true });
    const addHover = () => { cursorRing.classList.add('hover'); cursorDot.classList.add('hover'); };
    const removeHover = () => { cursorRing.classList.remove('hover'); cursorDot.classList.remove('hover'); };
    document.querySelectorAll('a, button, .btn, .service-link, .filter-btn, .portfolio-card, .pricing-card, .service-card, .team-card, .contact-method, input, textarea, select, .close-modal').forEach(el => {
      el.addEventListener('mouseenter', addHover);
      el.addEventListener('mouseleave', removeHover);
    });
    function animateCursor() {
      dotX += (mouseX - dotX) * 0.2;
      dotY += (mouseY - dotY) * 0.2;
      ringX += (mouseX - ringX) * 0.1;
      ringY += (mouseY - ringY) * 0.1;
      cursorDot.style.transform = `translate(${dotX}px, ${dotY}px) translate(-50%, -50%)`;
      cursorRing.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      rAF(animateCursor);
    }
    rAF(animateCursor);
  }

  // ---- Particles Canvas (visibility-aware, reduced count on mobile) ----
  const canvas = document.getElementById('particles');
  if (canvas && canvas.getContext) {
    const ctx = canvas.getContext('2d');
    const isMobile = window.matchMedia('(pointer: coarse)').matches;
    const particleCount = isMobile ? 25 : 50;
    let particles = [];
    let particlesActive = true;
    let animId;

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', debounce(resizeCanvas, 200));

    class Particle {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
        this.opacity = Math.random() * 0.5 + 0.1;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(167, 139, 250, ${this.opacity})`;
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) particles.push(new Particle());

    function drawConnections() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(124, 58, 237, ${0.08 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    }

    function animateParticles() {
      if (!particlesActive) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => { p.update(); p.draw(); });
      drawConnections();
      animId = rAF(animateParticles);
    }

    // Pause when tab hidden or canvas offscreen
    const particleObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && document.visibilityState === 'visible') {
          if (!particlesActive) { particlesActive = true; animateParticles(); }
        } else {
          particlesActive = false;
          if (animId) cancelAnimationFrame(animId);
        }
      });
    }, { threshold: 0 });
    particleObserver.observe(canvas);

    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        particlesActive = false;
        if (animId) cancelAnimationFrame(animId);
      } else if (canvas.getBoundingClientRect().top < window.innerHeight) {
        particlesActive = true;
        animateParticles();
      }
    });
    animateParticles();
  }

  // ---- Parallax Effect on Hero Shapes (throttled) ----
  const parallaxShapes = document.querySelectorAll('.shape');
  if (parallaxShapes.length) {
    const onScroll = throttleRAF(() => {
      const scrolled = window.scrollY;
      parallaxShapes.forEach((shape, index) => {
        const speed = 0.1 + (index * 0.05);
        shape.style.transform = `translate3d(0, ${scrolled * speed}px, 0)`;
      });
    });
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // ---- Magnetic Button Effect (delegated, throttled per element) ----
  function initMagneticButtons() {
    document.querySelectorAll('.btn-primary, .btn-secondary, .btn-outline, .service-link, .filter-btn').forEach(el => {
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        el.style.transition = 'background-color 0.3s, box-shadow 0.3s, border-color 0.3s';
        el.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
      });
      el.addEventListener('mouseleave', () => {
        el.style.transform = '';
        el.style.transition = '';
      });
    });
  }
  initMagneticButtons();

  // ---- Global Button Ripple Effect (delegated) ----
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn, .service-link');
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const ripple = document.createElement('span');
    const size = Math.max(rect.width, rect.height);
    ripple.style.cssText = `
      position: absolute;
      border-radius: 50%;
      background: rgba(255,255,255,0.25);
      transform: scale(0);
      animation: ripple-anim 0.6s ease-out;
      pointer-events: none;
      left: ${e.clientX - rect.left}px;
      top: ${e.clientY - rect.top}px;
      width: ${size}px;
      height: ${size}px;
      margin-left: -${size/2}px;
      margin-top: -${size/2}px;
    `;
    btn.style.position = 'relative';
    btn.style.overflow = 'hidden';
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });

  // ---- Scroll Reveal Animation (unified observer) ----
  const revealElements = document.querySelectorAll('.service-card, .portfolio-card, .pricing-card, .contact-method, .form-group, .section-header, .terms-card, .why-choose-card');
  revealElements.forEach(el => el.classList.add('reveal'));
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  revealElements.forEach(el => revealObserver.observe(el));

  // ---- Team Scroll Reveal ----
  document.querySelectorAll('.team-card[data-reveal]').forEach(card => {
    observeIO(card, 'team', (entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        card._ioCallbacks.team = null;
      }
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });
  });

  // ---- Basic & Additional Services Reveal ----
  document.querySelectorAll('.service-price-card[data-reveal]').forEach((card, idx) => {
    observeIO(card, 'price', (entry) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), idx * 80);
        card._ioCallbacks.price = null;
      }
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  });

  // ---- Animated Counter ----
  const counters = document.querySelectorAll('.stat-number');
  if (counters.length) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const target = parseInt(entry.target.getAttribute('data-count'), 10) || 0;
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        const update = () => {
          current += step;
          entry.target.textContent = current < target ? Math.floor(current) : target;
          if (current < target) rAF(update);
        };
        update();
        counterObserver.unobserve(entry.target);
      });
    }, { threshold: 0.5 });
    counters.forEach(c => counterObserver.observe(c));
  }

  // ============================================
  // PORTFOLIO DATA & DYNAMIC RENDERING
  // ============================================
  const projects = [
    { id: 1, title: "Before → After Cinematic Edits", category: "video", categoryLabel: "Video Editing", isLarge: true, cover: "assets/videos/poster1.jpg", media: [{ type: "video", src: "asset/video/group1/video3.mp4", poster: "assets/videos/poster1.jpg" }], gallery: ["portfolio/project1-1.jpg", "portfolio/project1-2.jpg"], client: "Restaurant & Hospitality Client", services: ["Video Editing", "Color Grading", "Sound Design"], description: "Professional color grading, transitions, and storytelling for restaurant promos and brand reels. We transformed raw footage into a cinematic narrative that increased client engagement by 200%." },
    { id: 2, title: "Brand Reel Series", category: "video", categoryLabel: "Video Editing", cover: "assets/videos/poster2.jpg", media: [{ type: "video", src: "asset/video/group1/video6.mp4", poster: "assets/videos/poster2.jpg" }], gallery: [], client: "Fashion & Lifestyle Brand", services: ["Reel Editing", "Social Media Strategy"], description: "High-retention reels optimized for Instagram and TikTok. Designed with trending audio sync, dynamic typography, and pacing engineered to stop the scroll." },
    { id: 3, title: "Product Showcase", category: "video", categoryLabel: "Video Editing", cover: "assets/videos/poster3.jpg", media: [{ type: "video", src: "asset/video/group1/video7.mp4", poster: "assets/videos/poster3.jpg" }], gallery: [], client: "E-Commerce Partner", services: ["Product Video", "Motion Graphics"], description: "Cinematic product highlights for e-commerce growth. Clean studio-style edits with macro detail shots and seamless transitions that drive conversion." },
    { id: 4, title: "Real Estate Walkthrough", category: "video", categoryLabel: "Video Editing", cover: "assets/videos/poster4.jpg", media: [{ type: "video", src: "asset/video/group1/video4.mp4", poster: "assets/videos/poster4.jpg" }], gallery: [], client: "Real Estate Agency", services: ["Video Editing", "Color Grading", "Drone Integration"], description: "Smooth property tours with color grading and motion graphics. Architectural pacing and ambient sound design create an immersive viewing experience." },
    { id: 5, title: "Café Atmosphere", category: "video", categoryLabel: "Video Editing", cover: "assets/videos/poster5.jpg", media: [{ type: "video", src: "asset/video/group1/video5.mp4", poster: "assets/videos/poster5.jpg" }], gallery: [], client: "Local Café Chain", services: ["Mood Editing", "Sound Design"], description: "Mood-driven edits for hospitality brands. Warm tones, slow-motion detail shots, and ambient audio that transports viewers into the space." },
    { id: 6, title: "Premium Social Media Creatives", category: "graphics", categoryLabel: "Graphic Design", cover: "asset/video/group1/assets/portfolio/poster1.png", media: [{ type: "image", src: "asset/video/group1/assets/portfolio/poster1.png", alt: "Social Media Creative" }], gallery: ["portfolio/project6-1.jpg", "portfolio/project6-2.jpg"], client: "Modern Café Brand", services: ["Poster Design", "Social Media Kit"], description: "Scroll-stopping posters and banners for cafés and modern brands. Bold typography meets vibrant color psychology to maximize engagement." },
    { id: 7, title: "Brand Launch Poster", category: "graphics", categoryLabel: "Graphic Design", cover: "asset/video/group1/assets/portfolio/poster2.png", media: [{ type: "image", src: "asset/video/group1/assets/portfolio/poster2.png", alt: "Brand Launch Poster" }], gallery: [], client: "Tech Startup", services: ["Print Design", "Brand Identity"], description: "High-impact visual for product debut campaigns. Minimalist layout with strong focal points and premium finish." },
    { id: 8, title: "Restaurant Menu Design", category: "graphics", categoryLabel: "Graphic Design", cover: "asset/video/group1/assets/portfolio/poster3.png", media: [{ type: "image", src: "asset/video/group1/assets/portfolio/poster3.png", alt: "Restaurant Menu Design" }], gallery: [], client: "Fine Dining Restaurant", services: ["Menu Design", "Print Layout"], description: "Clean, appetizing layouts for dine-in and delivery. Typography hierarchy and food photography framing that elevates the dining experience." },
    { id: 9, title: "Instagram Carousel", category: "graphics", categoryLabel: "Graphic Design", cover: "asset/video/group1/assets/portfolio/poster4.png", media: [{ type: "image", src: "asset/video/group1/assets/portfolio/poster4.png", alt: "Instagram Carousel" }], gallery: [], client: "Wellness Brand", services: ["Social Media Design", "Content Strategy"], description: "Cohesive swipeable content for engagement. Unified visual language across 5+ slides designed to educate and convert." },
    { id: 10, title: "Event Flyer", category: "graphics", categoryLabel: "Graphic Design", cover: "asset/video/group1/assets/portfolio/poster5.png", media: [{ type: "image", src: "asset/video/group1/assets/portfolio/poster5.png", alt: "Event Flyer" }], gallery: [], client: "Event Management Co.", services: ["Flyer Design", "Typography"], description: "Bold typography and color for maximum reach. High-contrast design optimized for both digital sharing and physical print." },
    { id: 11, title: "YouTube Thumbnails", category: "graphics", categoryLabel: "Graphic Design", cover: "asset/video/group1/assets/portfolio/poster6.png", media: [{ type: "image", src: "asset/video/group1/assets/portfolio/poster6.png", alt: "YouTube Thumbnails" }], gallery: [], client: "Content Creator", services: ["Thumbnail Design", "CTR Optimization"], description: "Click-optimized covers with high contrast. Facial emotion emphasis, bold titles, and color pops that drive click-through rates." },
    { id: 12, title: "Story Templates", category: "graphics", categoryLabel: "Graphic Design", cover: "asset/video/group1/assets/portfolio/poster7.png", media: [{ type: "image", src: "asset/video/group1/assets/portfolio/poster7.png", alt: "Story Templates" }], gallery: [], client: "Fashion Retailer", services: ["Instagram Stories", "Template Kit"], description: "Branded Instagram & Facebook story kits. Drag-and-drop ready templates with consistent brand elements and interactive sticker zones." },
    { id: 13, title: "Promo Banners", category: "graphics", categoryLabel: "Graphic Design", cover: "asset/video/group1/assets/portfolio/poster8.png", media: [{ type: "image", src: "asset/video/group1/assets/portfolio/poster8.png", alt: "Promo Banners" }], gallery: [], client: "E-Commerce Store", services: ["Banner Design", "Seasonal Campaign"], description: "Seasonal sale and offer banners for e-commerce. Urgency-driven layouts with clear CTAs and discount highlighting." },
    { id: 14, title: "Business Card Set", category: "graphics", categoryLabel: "Graphic Design", cover: "asset/video/group1/assets/portfolio/poster9.png", media: [{ type: "image", src: "asset/video/group1/assets/portfolio/poster9.png", alt: "Business Card Set" }], gallery: [], client: "Consulting Firm", services: ["Print Design", "Identity System"], description: "Minimalist print-ready identity cards. Premium paper texture simulation and precise alignment for professional first impressions." },
    { id: 15, title: "Packaging Mockup", category: "graphics", categoryLabel: "Graphic Design", cover: "asset/video/group1/assets/portfolio/poster10.png", media: [{ type: "image", src: "asset/video/group1/assets/portfolio/poster10.png", alt: "Packaging Mockup" }], gallery: [], client: "Cosmetics Brand", services: ["Packaging Design", "3D Mockup"], description: "Realistic product packaging visuals. Photorealistic shadows, material textures, and shelf-context presentation." },
    { id: 16, title: "Complete Brand Identity", category: "branding", categoryLabel: "Branding", cover: "assets/portfolio/branding-poster.jpg", media: [{ type: "video", src: "asset/video/group1/branding.mp4", poster: "assets/portfolio/branding-poster.jpg" }], gallery: [], client: "Restaurant Chain", services: ["Logo Design", "Brand Guidelines", "Visual Identity"], description: "Logo, color palette, and brand guidelines for a local restaurant chain. A comprehensive identity system that ensures consistency across every touchpoint." }
  ];

  function renderPortfolio() {
    const grid = document.querySelector('.portfolio-grid');
    if (!grid) return;
    const fragment = document.createDocumentFragment();
    projects.forEach((project) => {
      const isLarge = project.isLarge ? 'large' : '';
      const mediaHTML = project.media.map(m => {
        if (m.type === 'video') {
          const controls = project.isLarge ? 'controls' : '';
          return `<video loop muted playsinline ${controls} preload="none" poster="${m.poster}" width="640" height="360" data-src="${m.src}"></video>`;
        }
        return `<img src="${m.src}" alt="${m.alt || project.title}" loading="lazy" width="400" height="300" decoding="async" fetchpriority="low">`;
      }).join('');
      const card = document.createElement('div');
      card.className = `portfolio-card ${isLarge}`;
      card.setAttribute('data-category', project.category);
      card.setAttribute('data-project-id', project.id);
      card.innerHTML = `
        <div class="portfolio-media media-reveal">${mediaHTML}</div>
        <div class="portfolio-overlay">
          <span class="portfolio-category">${project.categoryLabel}</span>
          <h3>${project.title}</h3>
          <p>${project.description.substring(0, 90)}${project.description.length > 90 ? '...' : ''}</p>
          <button class="btn btn-sm btn-white" onclick="openPortfolioModal(${project.id})" aria-label="View ${project.title} project details">View Project</button>
        </div>
      `;
      fragment.appendChild(card);
    });
    grid.appendChild(fragment);
  }

  // ---- Lazy Video Loading: only load src when near viewport ----
  function initLazyVideos() {
    const lazyVideos = document.querySelectorAll('video[data-src]');
    if (!lazyVideos.length) return;
    const videoObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const video = entry.target;
        if (entry.isIntersecting) {
          const src = video.getAttribute('data-src');
          if (src && !video.src) {
            video.src = src;
            video.load();
          }
          videoObserver.unobserve(video);
        }
      });
    }, { rootMargin: '0px', threshold: 0 });
    lazyVideos.forEach(v => videoObserver.observe(v));
  }

  // ---- Portfolio Video Smart Play/Pause (unified observer) ----
  function initPortfolioVideoObserver() {
    const portfolioVideos = document.querySelectorAll('.portfolio-card video');
    if (!portfolioVideos.length) return;
    const videoObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const v = entry.target;
        if (entry.isIntersecting) {
          if (v.src) v.play().catch(() => {});
        } else {
          v.pause();
        }
      });
    }, { threshold: 0.2 });
    portfolioVideos.forEach(v => videoObserver.observe(v));
  }

  function initPortfolioFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioCards = document.querySelectorAll('.portfolio-card');
    if (!filterBtns.length || !portfolioCards.length) return;
    filterBtns.forEach(btn => {
      const newBtn = btn.cloneNode(true);
      btn.parentNode.replaceChild(newBtn, btn);
      newBtn.addEventListener('click', () => {
        newBtn.parentNode.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        newBtn.classList.add('active');
        const filterValue = newBtn.getAttribute('data-filter');
        portfolioCards.forEach((card, index) => {
          const category = card.getAttribute('data-category');
          const isMatch = filterValue === 'all' || category === filterValue;
          if (isMatch) {
            card.style.display = 'block';
            card.style.opacity = '0';
            card.style.transform = 'scale(0.92) translateY(20px)';
            requestAnimationFrame(() => {
              card.style.transition = 'opacity 0.5s ease, transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
              card.style.opacity = '1';
              card.style.transform = 'scale(1) translateY(0)';
            });
          } else {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.92) translateY(20px)';
            setTimeout(() => { card.style.display = 'none'; }, 300);
          }
        });
      });
    });
  }

  // ---- Portfolio Scroll Reveal (Post-Render) ----
  function initPortfolioReveal() {
    const cards = document.querySelectorAll('.portfolio-card');
    if (!cards.length) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    cards.forEach((card, i) => {
      card.classList.add('reveal');
      card.style.transitionDelay = `${i * 60}ms`;
      observer.observe(card);
    });
  }

  // Expose to global for inline onclick
  window.openPortfolioModal = function(projectId) {
    const project = projects.find(p => p.id === projectId);
    if (!project) return;
    const modalBody = document.getElementById('portfolioModalBody');
    const modal = document.getElementById('portfolioModal');
    if (!modalBody || !modal) return;
    const coverMedia = project.media[0];
    const coverHTML = coverMedia.type === 'video'
      ? `<video autoplay loop muted playsinline controls poster="${coverMedia.poster}"><source src="${coverMedia.src}" type="video/mp4"></video>`
      : `<img src="${coverMedia.src}" alt="${project.title}" loading="lazy" width="800" height="450" decoding="async">`;
    const galleryHTML = project.gallery.length
      ? `<div class="portfolio-gallery">${project.gallery.map(g => `<img src="${g}" alt="${project.title} gallery image" loading="lazy" width="400" height="300" decoding="async">`).join('')}</div>` : '';
    const servicesHTML = project.services.map(s => `<span class="portfolio-service-tag">${s}</span>`).join('');
    modalBody.innerHTML = `
      <div class="portfolio-modal-header">${coverHTML}</div>
      <div class="portfolio-modal-body">
        <span class="portfolio-meta-tag">${project.categoryLabel}</span>
        <h3>${project.title}</h3>
        <div class="portfolio-meta"><span class="portfolio-meta-tag">Client: ${project.client}</span></div>
        <div class="portfolio-services-used">
          <h4>Services Used</h4>
          <div class="portfolio-services-list">${servicesHTML}</div>
        </div>
        <p class="portfolio-modal-description">${project.description}</p>
        ${galleryHTML}
        <a href="#contact" class="btn btn-primary close-modal-action" onclick="document.getElementById('portfolioModal').classList.remove('active'); document.body.style.overflow=''; return true;" aria-label="Start a similar project">
          Start Similar Project
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </a>
      </div>
    `;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    const modalVideo = modal.querySelector('video');
    if (modalVideo) modalVideo.play().catch(() => {});
  };

  // Portfolio modal outside-click / close cleanup
  document.addEventListener('click', (e) => {
    const modal = document.getElementById('portfolioModal');
    if (e.target === modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
      modal.querySelectorAll('video').forEach(v => v.pause());
    }
  });
  document.querySelectorAll('.close-modal').forEach(btn => {
    btn.addEventListener('click', () => { document.body.style.overflow = ''; });
  });
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') document.body.style.overflow = '';
  });

  // Initialize dynamic portfolio
  function initDynamicPortfolio() {
    renderPortfolio();
    initPortfolioFilters();
    initLazyVideos();
    initPortfolioVideoObserver();
    initPortfolioReveal();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDynamicPortfolio);
  } else {
    initDynamicPortfolio();
  }

  // ============================================
  // UNIVERSAL MODAL CONTROLS
  // ============================================
  const modals = document.querySelectorAll('.custom-modal');
  const closeBtns = document.querySelectorAll('.close-modal');

  function closeAllModals() {
    modals.forEach(modal => {
      modal.classList.remove('active');
      modal.querySelectorAll('video').forEach(v => v.pause());
    });
  }

  if (modals.length) {
    closeBtns.forEach(btn => btn.addEventListener('click', closeAllModals));
    window.addEventListener('click', (e) => {
      modals.forEach(modal => { if (e.target === modal) closeAllModals(); });
    });
    window.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeAllModals(); });
  }

  // Open Extended Video Gallery Modal
  const openVideoGallery = document.getElementById('openVideoGallery');
  const videoGalleryModal = document.getElementById('videoGalleryModal');
  if (openVideoGallery && videoGalleryModal) {
    openVideoGallery.addEventListener('click', () => {
      videoGalleryModal.classList.add('active');
    });
  }

  // Open Extended Graphics Gallery Modal
  const openGraphicsGallery = document.getElementById('openGraphicsGallery');
  const graphicsGalleryModal = document.getElementById('graphicsGalleryModal');
  if (openGraphicsGallery && graphicsGalleryModal) {
    openGraphicsGallery.addEventListener('click', () => {
      graphicsGalleryModal.classList.add('active');
      const posters = graphicsGalleryModal.querySelectorAll('.animated-poster');
      posters.forEach((poster, idx) => {
        poster.style.opacity = '0';
        poster.style.transform = 'translateY(20px)';
        setTimeout(() => {
          poster.style.transition = 'all 0.5s ease';
          poster.style.opacity = '1';
          poster.style.transform = 'translateY(0)';
        }, idx * 100);
      });
    });
  }

  // ============================================
  // SERVICES DYNAMIC LEARN MORE POP-UP
  // ============================================
  const serviceData = {
    video: {
      title: "Premium Video Editing",
      desc: "We build scroll-stopping, high-retention video architectures customized for modern social algorithms, commercial platforms, and ambitious brands.",
      features: ["Cinematic Color Grading & Balancing", "High-Retention Reel & Shorts Pacing", "Advanced Sound Design & SFX Syncing", "Text Animations & Motion Graphics Elements"],
      workflow: ["Discovery & Script Review", "Rough Cut & Pacing Edit", "Color Grading & Sound Mix", "Final Delivery & Formats"],
      benefits: ["Higher Retention Rates", "Professional Brand Image", "Platform-Optimized Formats", "Faster Turnaround"]
    },
    graphics: {
      title: "Graphic Design & Post Creative",
      desc: "High-end visual communication materials engineered to reflect a premium identity for food chains, cafés, e-commerce, and real estate operations.",
      features: ["Premium Social Media Banners & Posters", "Advanced Photo Retouching & Isolation", "Print-Ready Marketing Collaterals", "Ad Creative Visual Assets Conversion"],
      workflow: ["Creative Brief & Moodboard", "Draft Design & Feedback", "Refinement & Polish", "Export & Source Files"],
      benefits: ["Scroll-Stopping Visuals", "Consistent Brand Identity", "Print & Digital Ready", "Higher Engagement"]
    },
    branding: {
      title: "Strategic Brand Identity",
      desc: "Complete visual frameworks, guidelines, and assets built to ensure your business leaves an unforgettable footprint in the market.",
      features: ["Custom Core Logo Artworks", "Unified Color Palette & Guidelines", "Typographic System Rules", "Premium Packaging & Label Blueprinting"],
      workflow: ["Brand Discovery Session", "Concept Development", "Visual Identity Design", "Guideline Documentation"],
      benefits: ["Memorable Brand Recognition", "Consistent Customer Experience", "Premium Market Positioning", "Scalable Asset Library"]
    },
    marketing: {
      title: "Result-Driven Digital Marketing",
      desc: "Transform your high-fidelity content and digital presence into a consistent, performance-backed automated sales pipeline.",
      features: ["Conversion-Optimized Ad System Setups", "Content Pipeline Calendars", "SEO-Capable Data Driven Captions", "Target Market Funnel Optimization Analysis"],
      workflow: ["Audit & Strategy", "Content Planning", "Campaign Execution", "Analytics & Optimization"],
      benefits: ["Measurable ROI", "Qualified Lead Generation", "Brand Awareness Growth", "Data-Driven Decisions"]
    },
    website: {
      title: "Website & Landing Page Design",
      desc: "High-converting, responsive websites and landing pages tailored to your brand identity and business goals.",
      features: ["Responsive UI/UX Design", "Landing Page Optimization", "CMS Integration Ready", "SEO-Friendly Structure"],
      workflow: ["Requirement Analysis", "Wireframe & Prototype", "Visual Design & Development", "Testing & Launch"],
      benefits: ["Higher Conversions", "Mobile-First Experience", "Fast Load Times", "Easy Maintenance"]
    },
    ai: {
      title: "AI Content Making",
      desc: "Leverage cutting-edge AI tools to generate stunning visuals, copy, and creative assets at scale.",
      features: ["AI-Generated Visuals", "Smart Copywriting Assist", "Automated Design Variations", "Rapid Content Iteration"],
      workflow: ["Brief & Objectives", "AI Generation & Curation", "Human Refinement", "Final Delivery"],
      benefits: ["Faster Turnaround", "Cost Efficiency", "Scalable Output", "Creative Innovation"]
    },
    videoshoot: {
      title: "Video Shoot Support",
      desc: "End-to-end production support from planning to final cut, ensuring your vision is captured with cinematic precision.",
      features: ["Pre-Production Planning", "On-Set Direction Support", "Cinematography Consulting", "Post-Production Pipeline"],
      workflow: ["Concept Development", "Shoot Planning", "Production Support", "Editing & Delivery"],
      benefits: ["Professional Quality", "Consistent Brand Vision", "Streamlined Workflow", "Stress-Free Production"]
    }
  };

  const serviceCards = document.querySelectorAll('.service-card');
  const servicesDetailModal = document.getElementById('servicesDetailModal');
  const serviceDetailsTarget = document.getElementById('serviceDetailsTarget');

  if (serviceCards.length && servicesDetailModal && serviceDetailsTarget) {
    serviceCards.forEach(card => {
      const learnMoreBtn = card.querySelector('.service-link');
      if (!learnMoreBtn) return;
      learnMoreBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const serviceType = card.getAttribute('data-service');
        const data = serviceData[serviceType];
        if (!data) return;

        const featuresHTML = data.features.map(feat => `
          <li>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--accent); flex-shrink: 0;"><path d="M20 6 9 17l-5-5"/></svg>
            ${feat}
          </li>
        `).join('');

        const workflowHTML = data.workflow.map((step, idx) => `
          <div class="workflow-step">
            <span class="step-number">${idx + 1}</span>
            <span>${step}</span>
          </div>
        `).join('');

        const benefitsHTML = data.benefits.map(benefit => `<span class="benefit-tag">${benefit}</span>`).join('');

        serviceDetailsTarget.innerHTML = `
          <h3 class="gradient-text" style="font-size: 2rem; margin-bottom: 10px; font-family: 'Space Grotesk', sans-serif;">${data.title}</h3>
          <p style="color: var(--text-secondary); line-height: 1.7; margin-bottom: 25px; font-size: 1.05rem;">${data.desc}</p>
          <div class="service-workflow">
            <h4>Our Workflow</h4>
            <div class="workflow-steps">${workflowHTML}</div>
          </div>
          <h4 style="margin-bottom: 12px; font-weight: 600;">Core Pillars Included:</h4>
          <ul class="modal-feature-list">${featuresHTML}</ul>
          <div class="service-benefits">
            <h4>Key Benefits</h4>
            <div class="benefit-tags">${benefitsHTML}</div>
          </div>
          <a href="#contact" class="btn btn-primary close-modal-action" style="display: inline-flex; align-items: center; margin-top: 10px;">
            Let's Get Started
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-left: 6px;"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </a>
        `;
        servicesDetailModal.classList.add('active');
        const ctaBtn = servicesDetailModal.querySelector('.close-modal-action');
        if (ctaBtn) {
          ctaBtn.addEventListener('click', () => servicesDetailModal.classList.remove('active'));
        }
      });
    });
  }

  // ============================================
  // PRICING TOGGLE
  // ============================================
  const toggleSwitch = document.querySelector('.toggle-switch');
  const toggleLabels = document.querySelectorAll('.toggle-label');
  const prices = document.querySelectorAll('.pricing-price .amount');
  const periods = document.querySelectorAll('.pricing-price .period');
  const monthlyPrices = ['3,499', '6,499', '9,499', '14,499'];
  const yearlyPrices = ['33,599', '62,399', '91,199', '139,199'];

  if (toggleSwitch && prices.length) {
    let isYearly = false;
    toggleSwitch.addEventListener('click', () => {
      isYearly = !isYearly;
      toggleSwitch.classList.toggle('yearly', isYearly);
      toggleLabels.forEach(label => label.classList.remove('active'));
      if (toggleLabels.length) toggleLabels[isYearly ? 1 : 0].classList.add('active');
      prices.forEach((price, index) => {
        price.style.opacity = '0';
        setTimeout(() => {
          price.textContent = isYearly ? (yearlyPrices[index] || price.textContent) : (monthlyPrices[index] || price.textContent);
          price.style.opacity = '1';
        }, 200);
      });
      periods.forEach(period => { period.textContent = isYearly ? '/year' : '/month'; });
    });
  }

  // ============================================
  // CONTACT FORM — WhatsApp Integration
  // ============================================
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  if (contactForm) {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const messageInput = document.getElementById('message');
    const serviceSelect = document.getElementById('service');
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalBtnContent = submitBtn.innerHTML;

    function validatePhone(phone) {
      const digits = phone.replace(/\D/g, '');
      return digits.length >= 7 && digits.length <= 15;
    }
    function validateEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
    function setError(input, isError) {
      const group = input.closest('.form-group');
      if (!group) return;
      if (isError) {
        group.classList.add('error');
        group.style.animation = 'none';
        group.offsetHeight;
        group.style.animation = 'shake 0.4s cubic-bezier(.36,.07,.19,.97) both';
      } else {
        group.classList.remove('error');
        group.style.animation = '';
      }
    }
    function clearAllErrors() {
      contactForm.querySelectorAll('.form-group.error').forEach(g => {
        g.classList.remove('error');
        g.style.animation = '';
      });
    }

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      clearAllErrors();
      let isValid = true;
      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const phone = phoneInput.value.trim();
      const service = serviceSelect.value;
      const message = messageInput.value.trim();

      if (!name || name.length < 2) { setError(nameInput, true); isValid = false; } else { setError(nameInput, false); }
      if (!validateEmail(email)) { setError(emailInput, true); isValid = false; } else { setError(emailInput, false); }
      if (phoneInput && !validatePhone(phone)) { setError(phoneInput, true); isValid = false; } else if (phoneInput) { setError(phoneInput, false); }
      if (serviceSelect && !service) { setError(serviceSelect, true); isValid = false; } else if (serviceSelect) { setError(serviceSelect, false); }
      if (!message) { setError(messageInput, true); isValid = false; } else { setError(messageInput, false); }

      if (!isValid) return;

      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span class="btn-spinner"></span> Sending...`;
      submitBtn.style.opacity = '0.85';

      const serviceText = serviceSelect.options[serviceSelect.selectedIndex].text;
      const whatsappMessage = `Hello Crazex Studio!\n\nI\'m interested in your service.\n\nName:\n${name}\n\nEmail:\n${email}\n\nPhone:\n${phone}\n\nService:\n${serviceText}\n\nMessage:\n${message}\n\nPlease contact me.`;
      const encodedMessage = encodeURIComponent(whatsappMessage);
      const whatsappURL = `https://wa.me/8801968908404?text=${encodedMessage}`;

      setTimeout(() => {
        window.open(whatsappURL, '_blank');
        contactForm.style.display = 'none';
        if (formSuccess) {
          formSuccess.style.display = 'block';
          formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        setTimeout(() => {
          contactForm.reset();
          contactForm.style.display = 'block';
          if (formSuccess) formSuccess.style.display = 'none';
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnContent;
          submitBtn.style.opacity = '1';
          clearAllErrors();
        }, 5000);
      }, 800);
    });

    [nameInput, emailInput, phoneInput, messageInput].forEach(input => {
      if (!input) return;
      input.addEventListener('input', () => setError(input, false));
    });
    if (serviceSelect) {
      serviceSelect.addEventListener('change', () => setError(serviceSelect, false));
    }
  }

  // ============================================
  // PRICING CTA RIPPLE EFFECT
  // ============================================
  document.querySelectorAll('.pricing-card .btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const rect = this.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255,255,255,0.25);
        transform: scale(0);
        animation: ripple-anim 0.6s ease-out;
        pointer-events: none;
        left: ${e.clientX - rect.left}px;
        top: ${e.clientY - rect.top}px;
        width: 20px;
        height: 20px;
        margin-left: -10px;
        margin-top: -10px;
      `;
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });

  // ============================================
  // RESPONSIVE HELPERS
  // ============================================
  
  // Handle orientation change for canvas and layout
  window.addEventListener('orientationchange', debounce(() => {
    const canvas = document.getElementById('particles');
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    // Close mobile menu on orientation change
    if (mobileMenu) mobileMenu.classList.remove('active');
    if (mobileMenuBtn) mobileMenuBtn.classList.remove('active');
  }, 300));

  // Ensure proper viewport height on mobile (iOS Safari fix)
  function setVH() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }
  setVH();
  window.addEventListener('resize', debounce(setVH, 100));

  // ============================================
  // SEO ENHANCEMENT MODULE
  // 100% additive — zero existing feature changes
  // ============================================
  
  const SEO = (function() {
    const BASE_URL = 'https://crazexstudio.com';
    
    // --- Meta Tag Manager ---
    const MetaManager = {
      defaults: {},
      init() {
        this.defaults = {
          title: document.title,
          description: document.querySelector('meta[name="description"]')?.content || '',
          ogTitle: document.querySelector('meta[property="og:title"]')?.content || '',
          ogDesc: document.querySelector('meta[property="og:description"]')?.content || '',
          ogImage: document.querySelector('meta[property="og:image"]')?.content || '',
          ogUrl: document.querySelector('meta[property="og:url"]')?.content || BASE_URL,
          twitterTitle: document.querySelector('meta[name="twitter:title"]')?.content || '',
          twitterDesc: document.querySelector('meta[name="twitter:description"]')?.content || '',
          twitterImage: document.querySelector('meta[name="twitter:image"]')?.content || '',
          canonical: document.querySelector('link[rel="canonical"]')?.href || BASE_URL,
          robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
        };
      },
      set(attrs) {
        if (attrs.title) document.title = attrs.title;
        if (attrs.description) this._setMeta('name', 'description', attrs.description);
        if (attrs.ogTitle) this._setMeta('property', 'og:title', attrs.ogTitle);
        if (attrs.ogDesc) this._setMeta('property', 'og:description', attrs.ogDesc);
        if (attrs.ogImage) this._setMeta('property', 'og:image', attrs.ogImage);
        if (attrs.ogUrl) this._setMeta('property', 'og:url', attrs.ogUrl);
        if (attrs.twitterTitle) this._setMeta('name', 'twitter:title', attrs.twitterTitle);
        if (attrs.twitterDesc) this._setMeta('name', 'twitter:description', attrs.twitterDesc);
        if (attrs.twitterImage) this._setMeta('name', 'twitter:image', attrs.twitterImage);
        if (attrs.canonical) this._setCanonical(attrs.canonical);
        if (attrs.robots) this._setMeta('name', 'robots', attrs.robots);
      },
      reset() {
        document.title = this.defaults.title;
        this._setMeta('name', 'description', this.defaults.description);
        this._setMeta('property', 'og:title', this.defaults.ogTitle);
        this._setMeta('property', 'og:description', this.defaults.ogDesc);
        this._setMeta('property', 'og:image', this.defaults.ogImage);
        this._setMeta('property', 'og:url', this.defaults.ogUrl);
        this._setMeta('name', 'twitter:title', this.defaults.twitterTitle);
        this._setMeta('name', 'twitter:description', this.defaults.twitterDesc);
        this._setMeta('name', 'twitter:image', this.defaults.twitterImage);
        this._setCanonical(this.defaults.canonical);
        this._setMeta('name', 'robots', this.defaults.robots);
      },
      _setMeta(attr, key, content) {
        let el = document.querySelector(`meta[${attr}="${key}"]`);
        if (!el) { el = document.createElement('meta'); el.setAttribute(attr, key); document.head.appendChild(el); }
        el.setAttribute('content', content);
      },
      _setCanonical(href) {
        let el = document.querySelector('link[rel="canonical"]');
        if (!el) { el = document.createElement('link'); el.rel = 'canonical'; document.head.appendChild(el); }
        el.href = href;
      }
    };

    // --- History State Manager ---
    const HistoryManager = {
      push(type, data) {
        const url = this._buildUrl(type, data);
        history.pushState({ seoType: type, seoData: data, scrollY: window.scrollY }, '', url);
      },
      replace(type, data) {
        const url = this._buildUrl(type, data);
        history.replaceState({ seoType: type, seoData: data }, '', url);
      },
      _buildUrl(type, data) {
        let hash = '';
        if (type === 'portfolio' && data.id) hash = `#portfolio-${data.id}`;
        else if (type === 'filter' && data.filter) hash = `#filter=${data.filter}`;
        else if (type === 'service' && data.service) hash = `#service=${data.service}`;
        else if (type === 'section' && data.section) hash = `#${data.section}`;
        return window.location.pathname + window.location.search + hash;
      }
    };

    // --- Dynamic JSON-LD Schema Injector ---
    const SchemaInjector = {
      inject(id, schemaObj) {
        this.remove(id);
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.id = 'seo-schema-' + id;
        script.textContent = JSON.stringify(schemaObj);
        document.head.appendChild(script);
      },
      remove(id) {
        const existing = document.getElementById('seo-schema-' + id);
        if (existing) existing.remove();
      },
      buildPortfolioItem(project) {
        const schema = {
          "@context": "https://schema.org",
          "@type": project.category === 'video' ? "VideoObject" : "CreativeWork",
          "name": project.title,
          "description": project.description,
          "image": project.cover,
          "url": `${BASE_URL}/#portfolio-${project.id}`,
          "creator": { "@type": "Organization", "name": "Crazex Studio", "url": BASE_URL },
          "keywords": [project.categoryLabel, "Crazex Studio", "portfolio", "Bangladesh"],
          "datePublished": "2026-07-04"
        };
        if (project.category === 'video' && project.media[0]) {
          schema.thumbnailUrl = project.media[0].poster;
          schema.contentUrl = project.media[0].src;
          schema.uploadDate = "2026-07-04";
        }
        return schema;
      },
      buildPortfolioList() {
        return {
          "@context": "https://schema.org",
          "@type": "ItemList",
          "itemListElement": projects.map((p, i) => ({
            "@type": "ListItem",
            "position": i + 1,
            "name": p.title,
            "url": `${BASE_URL}/#portfolio-${p.id}`
          }))
        };
      },
      buildServiceSchema(data, type) {
        return {
          "@context": "https://schema.org",
          "@type": "Service",
          "name": data.title,
          "description": data.desc,
          "provider": { "@type": "Organization", "name": "Crazex Studio", "url": BASE_URL },
          "areaServed": { "@type": "Country", "name": "Bangladesh" },
          "url": `${BASE_URL}/#service=${type}`
        };
      },
      buildBreadcrumb(items) {
        return {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": items.map((item, i) => ({
            "@type": "ListItem",
            "position": i + 1,
            "name": item.name,
            "item": item.url
          }))
        };
      }
    };

    // --- Breadcrumb Manager ---
    const BreadcrumbManager = {
      defaultCrumbs: [
        { name: "Home", url: BASE_URL },
        { name: "Services", url: `${BASE_URL}/#services` },
        { name: "Portfolio", url: `${BASE_URL}/#portfolio` },
        { name: "Pricing", url: `${BASE_URL}/#pricing` },
        { name: "Contact", url: `${BASE_URL}/#contact` }
      ],
      reset() {
        SchemaInjector.inject('breadcrumb', SchemaInjector.buildBreadcrumb(this.defaultCrumbs));
      },
      update(items) {
        SchemaInjector.inject('breadcrumb', SchemaInjector.buildBreadcrumb(items));
      }
    };

    // --- Web Vitals Reporter ---
    const WebVitals = {
      init() {
        if (!('PerformanceObserver' in window)) return;
        try {
          const lcpObs = new PerformanceObserver(list => {
            const entries = list.getEntries();
            const last = entries[entries.length - 1];
            console.log('[SEO] LCP:', Math.round(last.startTime), 'ms');
          });
          lcpObs.observe({ type: 'largest-contentful-paint', buffered: true });
        } catch(e) {}
        try {
          let clsVal = 0;
          const clsObs = new PerformanceObserver(list => {
            for (const entry of list.getEntries()) {
              if (!entry.hadRecentInput) clsVal += entry.value;
            }
            console.log('[SEO] CLS:', clsVal.toFixed(4));
          });
          clsObs.observe({ type: 'layout-shift', buffered: true });
        } catch(e) {}
        try {
          const fidObs = new PerformanceObserver(list => {
            for (const entry of list.getEntries()) {
              console.log('[SEO] FID:', Math.round(entry.processingStart - entry.startTime), 'ms');
            }
          });
          fidObs.observe({ type: 'first-input', buffered: true });
        } catch(e) {}
        window.addEventListener('load', () => {
          setTimeout(() => {
            const t = performance.timing;
            console.log('[SEO] Page Load:', t.loadEventEnd - t.navigationStart, 'ms');
          }, 0);
        });
      }
    };

    // --- External Link Optimizer ---
    const LinkOptimizer = {
      init() {
        document.querySelectorAll('a[href^="http"]').forEach(link => {
          if (link.hostname !== window.location.hostname) {
            const rel = (link.getAttribute('rel') || '').split(' ');
            if (!rel.includes('noopener')) rel.push('noopener');
            if (!rel.includes('noreferrer')) rel.push('noreferrer');
            if (!rel.includes('nofollow')) rel.push('nofollow');
            link.setAttribute('rel', rel.filter(Boolean).join(' '));
            if (!link.hasAttribute('target')) link.setAttribute('target', '_blank');
          }
        });
      }
    };

    // --- Image SEO Auditor ---
    const ImageSEO = {
      init() {
        document.querySelectorAll('img:not([alt])').forEach(img => {
          img.setAttribute('alt', 'Crazex Studio creative portfolio work');
        });
        document.querySelectorAll('img[loading="lazy"]').forEach(img => {
          if (!img.hasAttribute('width') || !img.hasAttribute('height')) {
            console.warn('[SEO] Lazy image missing dimensions:', img.src);
          }
        });
      }
    };

    // --- Section-Based Meta Updates ---
    const SectionMeta = {
      map: {
        'home': { title: 'Crazex Studio | Creative Agency Bangladesh | Video Editing, Graphic Design & Branding', desc: 'Premium video editing, graphic design, branding and digital marketing for ambitious brands in Bangladesh.' },
        'portfolio': { title: 'Portfolio | Crazex Studio Bangladesh | 59+ Projects Delivered', desc: 'See our 59+ delivered projects in video editing, graphic design, and branding for restaurants, cafés, e-commerce, and real estate.' },
        'services': { title: 'Services | Crazex Studio Bangladesh | End-to-End Creative Solutions', desc: 'Video editing, graphic design, branding, digital marketing, website design, landing page design, AI content, and video shoot support.' },
        'pricing': { title: 'Pricing | Crazex Studio Bangladesh | Transparent Creative Packages', desc: 'Transparent pricing from BDT 3,499/month. Starter, Growth, Business, and Premium plans for restaurants, cafés, and modern brands.' },
        'contact': { title: 'Contact | Crazex Studio Bangladesh | Start Your Project', desc: 'Get in touch with Crazex Studio for video editing, graphic design, branding and digital marketing services in Bangladesh.' },
        'team': { title: 'Our Team | Crazex Studio Leadership | CEO & Founders', desc: 'Meet Al Emon Bashir, Meraj Hasan Tanjil, and Towhidul Islam Ananto — the creative and strategic minds driving Crazex Studio.' },
        'terms': { title: 'Terms & Conditions | Crazex Studio | Partnership Guidelines', desc: 'Clear payment terms, delivery timelines, and service agreements for a seamless creative partnership with Crazex Studio.' },
        'why-choose': { title: 'Why Choose Crazex Studio | 15 Reasons to Partner With Us', desc: 'Discover why ambitious brands in Bangladesh trust Crazex Studio for premium video editing, graphic design, and digital marketing.' },
        'basic-services': { title: 'Basic Services | Crazex Studio | À La Carte Creative Essentials', desc: 'Premium creative essentials available à la carte: poster design, menu design, logo animation, voice-over, reel editing, and more.' },
        'additional-services': { title: 'Additional Services | Crazex Studio | Extra Creative Support', desc: 'Extra posters, AI videos, real video edits, revisions, express delivery, and add-on services beyond your monthly package.' }
      },
      init() {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
              const id = entry.target.getAttribute('id');
              const meta = this.map[id];
              if (meta) {
                MetaManager.set({
                  title: meta.title,
                  description: meta.desc,
                  ogTitle: meta.title,
                  ogDesc: meta.desc,
                  twitterTitle: meta.title,
                  twitterDesc: meta.desc,
                  ogUrl: `${BASE_URL}/#${id}`,
                  canonical: `${BASE_URL}/#${id}`
                });
                HistoryManager.replace('section', { section: id });
              }
            }
          });
        }, { threshold: 0.5, rootMargin: '-80px 0px 0px 0px' });
        document.querySelectorAll('section[id]').forEach(sec => observer.observe(sec));
      }
    };

    // --- FAQ Schema Builder ---
    const FAQSchema = {
      init() {
        const whyCards = document.querySelectorAll('.why-choose-card');
        if (!whyCards.length) return;
        const mainEntity = Array.from(whyCards).map(card => ({
          "@type": "Question",
          "name": card.querySelector('h3')?.textContent.trim(),
          "acceptedAnswer": {
            "@type": "Answer",
            "text": card.querySelector('p')?.textContent.trim()
          }
        }));
        SchemaInjector.inject('faq', {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": mainEntity
        });
      }
    };

    // --- Hero Video Schema ---
    const HeroVideoSchema = {
      init() {
        const cards = document.querySelectorAll('.hero-videos .video-card');
        if (!cards.length) return;
        const graph = Array.from(cards).map((card, i) => {
          const video = card.querySelector('video');
          const name = card.querySelector('h4')?.textContent.trim() || `Showcase ${i+1}`;
          const tag = card.querySelector('.video-tag')?.textContent.trim() || 'Creative';
          return {
            "@type": "VideoObject",
            "name": `${name} — Crazex Studio`,
            "description": `${tag} showcase by Crazex Studio, creative agency Bangladesh.`,
            "thumbnailUrl": video?.getAttribute('poster') || '',
            "contentUrl": video?.querySelector('source')?.getAttribute('src') || '',
            "uploadDate": "2026-07-04",
            "publisher": {
              "@type": "Organization",
              "name": "Crazex Studio",
              "logo": { "@type": "ImageObject", "url": `${BASE_URL}/assets/images/logo.png` }
            }
          };
        });
        SchemaInjector.inject('hero-videos', { "@context": "https://schema.org", "@graph": graph });
      }
    };

    // --- Resource Hints ---
    const ResourceHints = {
      init() {
        const hints = [
          { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
          { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true },
          { rel: 'dns-prefetch', href: 'https://www.facebook.com' },
          { rel: 'dns-prefetch', href: 'https://www.instagram.com' },
          { rel: 'dns-prefetch', href: 'https://wa.me' }
        ];
        hints.forEach(h => {
          if (!document.querySelector(`link[rel="${h.rel}"][href="${h.href}"]`)) {
            const link = document.createElement('link');
            link.rel = h.rel;
            link.href = h.href;
            if (h.crossorigin) link.crossOrigin = 'anonymous';
            document.head.appendChild(link);
          }
        });
      }
    };

    // --- Sitemap & RSS Generators ---
    const SitemapGenerator = {
      generate() {
        const sections = ['', '#services', '#portfolio', '#pricing', '#contact', '#team', '#terms', '#why-choose', '#basic-services', '#additional-services'];
        const urls = sections.map(s => `${BASE_URL}/${s}`);
        projects.forEach(p => urls.push(`${BASE_URL}/#portfolio-${p.id}`));
        let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
        urls.forEach(url => {
          xml += `  <url>\n    <loc>${url}</loc>\n    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
        });
        xml += '</urlset>';
        console.log('[SEO] Sitemap XML (save as sitemap.xml):');
        console.log(xml);
        return xml;
      }
    };

    const RSSGenerator = {
      generate() {
        let rss = `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0">\n<channel>\n<title>Crazex Studio - Creative Agency Bangladesh</title>\n<link>${BASE_URL}</link>\n<description>Premium video editing, graphic design, branding and digital marketing services in Bangladesh.</description>\n<language>en-bd</language>\n<lastBuildDate>${new Date().toUTCString()}</lastBuildDate>\n`;
        projects.forEach(p => {
          rss += `<item>\n<title>${p.title}</title>\n<link>${BASE_URL}/#portfolio-${p.id}</link>\n<guid>${BASE_URL}/#portfolio-${p.id}</guid>\n<description><![CDATA[${p.description}]]></description>\n<category>${p.categoryLabel}</category>\n</item>\n`;
        });
        rss += '</channel>\n</rss>';
        console.log('[SEO] RSS Feed (save as feed.xml):');
        console.log(rss);
        return rss;
      }
    };

    // --- Service Worker Registration ---
    const SWManager = {
      init() {
        if (!('serviceWorker' in navigator)) return;
        window.addEventListener('load', () => {
          navigator.serviceWorker.register('/sw.js').then(reg => {
            console.log('[SEO] Service Worker registered:', reg.scope);
          }).catch(() => {
            console.log('[SEO] Service Worker registration skipped. Create /sw.js for offline caching.');
          });
        });
      }
    };

    // --- Popstate / Deep Link Handler ---
    function initDeepLinks() {
      window.addEventListener('popstate', (e) => {
        if (e.state && e.state.seoType === 'portfolio') {
          window.openPortfolioModal(e.state.seoData.id);
        } else {
          closeAllModals();
          MetaManager.reset();
          BreadcrumbManager.reset();
          SchemaInjector.remove('portfolio-item');
          SchemaInjector.remove('service');
        }
      });

      const hash = window.location.hash;
      if (hash.startsWith('#portfolio-')) {
        const id = parseInt(hash.replace('#portfolio-', ''), 10);
        if (id) setTimeout(() => window.openPortfolioModal(id), 800);
      } else if (hash.startsWith('#filter=')) {
        const filter = hash.replace('#filter=', '');
        const btn = document.querySelector(`.filter-btn[data-filter="${filter}"]`);
        if (btn) setTimeout(() => btn.click(), 800);
      } else if (hash.startsWith('#service=')) {
        const svc = hash.replace('#service=', '');
        const card = document.querySelector(`.service-card[data-service="${svc}"]`);
        if (card) setTimeout(() => card.querySelector('.service-link')?.click(), 800);
      }
    }

    // --- Event Delegation Hooks (non-invasive) ---
    function initEventHooks() {
      // Portfolio filter SEO
      const filterContainer = document.querySelector('.portfolio-filters');
      if (filterContainer) {
        filterContainer.addEventListener('click', (e) => {
          const btn = e.target.closest('.filter-btn');
          if (!btn) return;
          const filter = btn.getAttribute('data-filter');
          const label = filter === 'all' ? 'All Projects' : filter.charAt(0).toUpperCase() + filter.slice(1);
          MetaManager.set({
            title: `${label} | Portfolio | Crazex Studio Bangladesh`,
            description: `Browse our ${filter === 'all' ? 'complete' : filter} portfolio at Crazex Studio Bangladesh.`,
            ogUrl: `${BASE_URL}/#filter=${filter}`,
            canonical: `${BASE_URL}/#filter=${filter}`
          });
          HistoryManager.replace('filter', { filter: filter });
        });
      }

      // Service card SEO
      document.querySelectorAll('.service-card').forEach(card => {
        const btn = card.querySelector('.service-link');
        if (!btn) return;
        btn.addEventListener('click', () => {
          const type = card.getAttribute('data-service');
          const data = serviceData[type];
          if (!data) return;
          MetaManager.set({
            title: `${data.title} | Services | Crazex Studio`,
            description: data.desc,
            ogTitle: data.title,
            ogDesc: data.desc,
            ogUrl: `${BASE_URL}/#service=${type}`,
            canonical: `${BASE_URL}/#service=${type}`
          });
          SchemaInjector.inject('service', SchemaInjector.buildServiceSchema(data, type));
          BreadcrumbManager.update([
            { name: "Home", url: BASE_URL },
            { name: "Services", url: `${BASE_URL}/#services` },
            { name: data.title, url: `${BASE_URL}/#service=${type}` }
          ]);
          HistoryManager.push('service', { service: type });
        });
      });

      // Modal close SEO reset
      document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', () => {
          setTimeout(() => {
            MetaManager.reset();
            BreadcrumbManager.reset();
            SchemaInjector.remove('portfolio-item');
            SchemaInjector.remove('service');
          }, 50);
        });
      });
      window.addEventListener('click', (e) => {
        modals.forEach(modal => {
          if (e.target === modal) {
            MetaManager.reset();
            BreadcrumbManager.reset();
            SchemaInjector.remove('portfolio-item');
            SchemaInjector.remove('service');
          }
        });
      });
      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          MetaManager.reset();
          BreadcrumbManager.reset();
          SchemaInjector.remove('portfolio-item');
          SchemaInjector.remove('service');
        }
      });
    }

    // --- Wrap Global Portfolio Modal for SEO ---
    function wrapPortfolioModal() {
      const _orig = window.openPortfolioModal;
      window.openPortfolioModal = function(projectId) {
        _orig(projectId);
        const project = projects.find(p => p.id === projectId);
        if (!project) return;
        MetaManager.set({
          title: `${project.title} | Portfolio | Crazex Studio Bangladesh`,
          description: project.description,
          ogTitle: `${project.title} | Crazex Studio`,
          ogDesc: project.description,
          ogImage: project.cover,
          ogUrl: `${BASE_URL}/#portfolio-${projectId}`,
          twitterTitle: `${project.title} | Crazex Studio`,
          twitterDesc: project.description,
          twitterImage: project.cover,
          canonical: `${BASE_URL}/#portfolio-${projectId}`
        });
        SchemaInjector.inject('portfolio-item', SchemaInjector.buildPortfolioItem(project));
        BreadcrumbManager.update([
          { name: "Home", url: BASE_URL },
          { name: "Portfolio", url: `${BASE_URL}/#portfolio` },
          { name: project.title, url: `${BASE_URL}/#portfolio-${projectId}` }
        ]);
        HistoryManager.push('portfolio', { id: projectId });
      };
    }

    // --- Public Init ---
    function init() {
      MetaManager.init();
      WebVitals.init();
      LinkOptimizer.init();
      ImageSEO.init();
      SectionMeta.init();
      FAQSchema.init();
      HeroVideoSchema.init();
      ResourceHints.init();
      BreadcrumbManager.reset();
      wrapPortfolioModal();
      initEventHooks();
      initDeepLinks();
      SWManager.init();

      // Inject portfolio list schema after render
      setTimeout(() => {
        SchemaInjector.inject('portfolio-list', SchemaInjector.buildPortfolioList());
      }, 1200);

      // Expose generators globally
      window.generateSEOSitemap = SitemapGenerator.generate.bind(SitemapGenerator);
      window.generateSEORSS = RSSGenerator.generate.bind(RSSGenerator);

      console.log('🔍 Crazex Studio — SEO Module Active');
    }

    return { init };
  })();

  // Initialize SEO after a brief delay to ensure DOM is fully settled
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(SEO.init, 200));
  } else {
    setTimeout(SEO.init, 200);
  }

  console.log('🚀 Crazex Studio — Performance Optimized & Fully Responsive');
})();