/**
 * Crazex Studio — Production JavaScript
 * Version: 2026.1
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  const WHATSAPP_NUMBER = '8801968908404';

  function openWhatsApp(message) {
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  }

  /* ==========================================================================
     1. Data Structures (Services)
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

  /* ==========================================================================
     2. Core UI & Utility Elements
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

  // Page Loader Fade Out
  window.addEventListener('load', () => {
    if (pageLoader) {
      pageLoader.style.opacity = '0';
      setTimeout(() => {
        pageLoader.style.display = 'none';
      }, 400);
    }
  });

  // Fallback loader hide
  setTimeout(() => {
    if (pageLoader && pageLoader.style.display !== 'none') {
      pageLoader.style.opacity = '0';
      setTimeout(() => {
        pageLoader.style.display = 'none';
      }, 400);
    }
  }, 1500);

  /* ==========================================================================
     3. Scroll Progress, Mouse Tracking & Floating Scrollbar (UPDATE #4)
     ========================================================================== */

  const floatingTrack = document.getElementById('floatingScrollbarTrack');
  const floatingThumb = document.getElementById('floatingScrollbarThumb');
  let isDraggingThumb = false;
  let dragStartY = 0;
  let startScrollTop = 0;

  function updateScrollPositions() {
    const totalScrollable = document.documentElement.scrollHeight - window.innerHeight;
    if (totalScrollable > 0) {
      const scrollPercent = (window.scrollY / totalScrollable) * 100;
      if (scrollProgressBar) {
        scrollProgressBar.style.width = `${scrollPercent}%`;
      }

      if (floatingTrack && floatingThumb) {
        const trackHeight = floatingTrack.clientHeight;
        const thumbHeight = Math.max(40, (window.innerHeight / document.documentElement.scrollHeight) * trackHeight);
        floatingThumb.style.height = `${thumbHeight}px`;

        const maxThumbTop = trackHeight - thumbHeight;
        const currentThumbTop = (window.scrollY / totalScrollable) * maxThumbTop;
        floatingThumb.style.top = `${currentThumbTop}px`;
      }
    }

    if (navbar) {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    updateActiveNavLink();
  }

  window.addEventListener('scroll', updateScrollPositions);
  window.addEventListener('resize', updateScrollPositions);

  // Floating Drag Logic
  if (floatingTrack && floatingThumb) {
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

      const scrollRatio = totalScrollable / maxThumbTop;
      window.scrollTo(0, startScrollTop + deltaY * scrollRatio);
    };

    const stopDrag = () => {
      isDraggingThumb = false;
      document.body.style.userSelect = '';
    };

    floatingThumb.addEventListener('pointerdown', startDrag);
    window.addEventListener('pointermove', doDrag);
    window.addEventListener('pointerup', stopDrag);
  }

  // Mouse Glow & Custom Cursor
  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (cursorDot) {
      cursorDot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    }

    if (mouseGlow) {
      mouseGlow.style.setProperty('--mouse-x', `${mouseX}px`);
      mouseGlow.style.setProperty('--mouse-y', `${mouseY}px`);
    }
  });

  function animateCursorRing() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;

    if (cursorRing) {
      cursorRing.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
    }

    requestAnimationFrame(animateCursorRing);
  }
  animateCursorRing();

  // Add Hover Scale Effects to Interactive Elements
  const interactiveSelector = 'a, button, .service-card, .portfolio-card, .video-embed-card, .poster-card, .pricing-card, .interactive-card, .team-card, .why-choose-card, .terms-card';
  document.querySelectorAll(interactiveSelector).forEach(el => {
    el.addEventListener('mouseenter', () => {
      if (customCursor) customCursor.classList.add('hover');
    });
    el.addEventListener('mouseleave', () => {
      if (customCursor) customCursor.classList.remove('hover');
    });
  });

  /* ==========================================================================
     4. Navigation & Mobile Menu
     ========================================================================== */

  function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.contains('active');
      mobileMenu.classList.toggle('active');
      mobileMenuBtn.setAttribute('aria-expanded', !isOpen);
      mobileMenu.setAttribute('aria-hidden', isOpen);
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('aria-hidden', 'true');
      });
    });
  }

  /* ==========================================================================
     5. Theme Switching (Dark/Light)
     ========================================================================== */

  const savedTheme = localStorage.getItem('crazex-theme');
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
      localStorage.setItem('crazex-theme', isLight ? 'light' : 'dark');

      setTimeout(() => {
        document.body.classList.remove('theme-transition');
      }, 500);
    });
  }

  /* ==========================================================================
     6. Particles Canvas Animation
     ========================================================================== */

  const canvas = document.getElementById('particles');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particlesArray = [];
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    });

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
      const particleCount = Math.min(Math.floor(width / 18), 70);
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
     7. Stat Counters Animation
     ========================================================================== */

  const statNumbers = document.querySelectorAll('.stat-number');
  let animatedStats = false;

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animatedStats) {
        animatedStats = true;
        statNumbers.forEach(stat => {
          const target = parseInt(stat.getAttribute('data-count'), 10);
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
  }, { threshold: 0.5 });

  const statsSection = document.querySelector('.stats');
  if (statsSection) {
    statsObserver.observe(statsSection);
  }

  /* ==========================================================================
     8. Service Details Modal & Dynamic WhatsApp Inquire
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
            <h2 style="font-family: var(--font-display); font-size: 1.8rem; margin-bottom: 0.5rem;">${data.title}</h2>
          </div>
          <p style="color: var(--text-secondary); line-height: 1.7; margin-bottom: 1.5rem; text-align: center;">${data.description}</p>
          <div class="service-modal-features" style="background: var(--bg-primary); padding: 1.5rem; border-radius: var(--radius-sm); border: 1px solid var(--border); margin-bottom: 2rem;">
            <h4 style="font-size: 1rem; font-weight: 700; margin-bottom: 1rem; color: var(--accent-light);">Key Features Included:</h4>
            <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.75rem;">
              ${data.features.map(f => `
                <li style="display: flex; align-items: center; gap: 0.6rem; color: var(--text-secondary); font-size: 0.95rem;">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--accent); flex-shrink: 0;"><path d="M20 6 9 17l-5-5"/></svg>
                  <span>${f}</span>
                </li>
              `).join('')}
            </ul>
          </div>
          <div style="text-align: center;">
            <button type="button" class="btn btn-primary btn-full modal-wa-inquire-btn" style="justify-content: center;">
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
     9. Graphics Design Showcase Slider (Horizontal Carousel)
     ========================================================================== */

  const graphicsSlider = document.getElementById('graphicsSlider');
  const prevBtn = document.querySelector('.slider-btn.prev-btn');
  const nextBtn = document.querySelector('.slider-btn.next-btn');

  if (graphicsSlider && prevBtn && nextBtn) {
    const scrollAmount = 280;

    prevBtn.addEventListener('click', () => {
      graphicsSlider.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth'
      });
    });

    nextBtn.addEventListener('click', () => {
      graphicsSlider.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    });
  }

  /* ==========================================================================
     10. Essential Services Live Calculator & Business Category (UPDATE #3)
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
      const name = card.getAttribute('data-name') || card.querySelector('h3').textContent.trim();
      const countEl = card.querySelector('.qty-count');
      const count = parseInt(countEl.textContent, 10) || 0;

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
     11. Pricing Toggle (Monthly / Yearly Billed) & Package WhatsApp CTA
     ========================================================================== */

  const pricingSwitch = document.querySelector('.toggle-switch');
  const toggleLabels = document.querySelectorAll('.pricing-toggle .toggle-label');
  const priceAmounts = document.querySelectorAll('.pricing-card .amount');
  const pricePeriods = document.querySelectorAll('.pricing-card .period');
  const pricingCards = document.querySelectorAll('.pricing-card');

  const originalPrices = Array.from(priceAmounts).map(el => el.textContent.trim());

  let isYearlyBilling = false;

  function updatePricing(isYearly) {
    isYearlyBilling = isYearly;
    priceAmounts.forEach((el, index) => {
      const rawNum = parseInt(originalPrices[index].replace(/,/g, ''), 10);
      if (!isNaN(rawNum)) {
        if (isYearly) {
          const discounted = Math.round(rawNum * 0.8);
          el.textContent = discounted.toLocaleString();
        } else {
          el.textContent = originalPrices[index];
        }
      }
    });

    pricePeriods.forEach(el => {
      el.textContent = isYearly ? '/month (yearly)' : '/month';
    });
  }

  if (pricingSwitch) {
    pricingSwitch.addEventListener('click', () => {
      const isYearly = pricingSwitch.classList.toggle('yearly');
      toggleLabels.forEach((label, idx) => {
        if ((idx === 0 && !isYearly) || (idx === 1 && isYearly)) {
          label.classList.add('active');
        } else {
          label.classList.remove('active');
        }
      });
      updatePricing(isYearly);
    });
  }

  toggleLabels.forEach((label, idx) => {
    label.addEventListener('click', () => {
      if (!pricingSwitch) return;
      const isYearly = idx === 1;
      if (isYearly) {
        pricingSwitch.classList.add('yearly');
      } else {
        pricingSwitch.classList.remove('yearly');
      }
      toggleLabels[0].classList.toggle('active', !isYearly);
      toggleLabels[1].classList.toggle('active', isYearly);
      updatePricing(isYearly);
    });
  });

  // Attach WhatsApp handlers to all Pricing Plan buttons
  pricingCards.forEach(card => {
    const planNameEl = card.querySelector('h3');
    const priceAmountEl = card.querySelector('.amount');
    const planBtn = card.querySelector('.btn-plan-wa');

    if (planBtn && planNameEl && priceAmountEl) {
      planBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const planName = planNameEl.textContent.trim();
        const price = priceAmountEl.textContent.trim();
        const billingCycle = isYearlyBilling ? 'Yearly Billed (20% Off)' : 'Monthly Billed';

        const message = `Hello Crazex Studio!\n\nI want to choose the following Package Plan:\n• Plan Name: ${planName}\n• Price: ৳${price} BDT/month\n• Billing Cycle: ${billingCycle}\n\nPlease get in touch to get started.`;
        openWhatsApp(message);
      });
    }
  });

  /* ==========================================================================
     12. General WhatsApp CTA Buttons (Get Started, Start Your Project, etc.)
     ========================================================================== */

  const waButtons = document.querySelectorAll('.btn-wa');
  waButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const customMsg = btn.getAttribute('data-msg') || 'Hello Crazex Studio! I am interested in your creative agency services.';
      openWhatsApp(customMsg);
    });
  });

  /* ==========================================================================
     13. Contact Form Submission via WhatsApp
     ========================================================================== */

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
        const nameVal = fields.name.value.trim();
        const emailVal = fields.email.value.trim();
        const phoneVal = fields.phone.value.trim();
        const serviceSelect = fields.service;
        const serviceVal = serviceSelect.options[serviceSelect.selectedIndex].text;
        const messageVal = fields.message.value.trim();

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
     14. Generic Modal Utilities
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
        mobileMenu.classList.remove('active');
        if (mobileMenuBtn) mobileMenuBtn.setAttribute('aria-expanded', 'false');
      }
    }
  });

  /* ==========================================================================
     15. Scroll Reveal Observer
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
    .reveal,
    [data-reveal]
  `);

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
});