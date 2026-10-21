/**
 * ============================================================================
 * PORTFOLIO WEBSITE JAVASCRIPT (script.js)
 * VIBRANT, INTERACTIVE & ANIMATED DEV SUITE
 * ============================================================================
 * Vanilla JavaScript (100% lightweight, no external CDNs/libraries needed).
 *
 * Features:
 * 1. Interactive Constellation Canvas (Neural Net / AI Particle Mesh)
 * 2. Multi-Role Dynamic Typewriter Effect
 * 3. 3D Tilt & Specular Spotlight on Project Cards
 * 4. Scroll Reveal Animations (IntersectionObserver)
 * 5. Mobile Navigation Menu Toggle with Auto-Close
 * 6. Sticky Header & Active Nav Link Highlighting on Scroll
 * 7. Interactive Floating Back-to-Top Button
 * 8. Dynamic Copyright Year
 * 9. Contact Form Client-side Validation & Animated Status
 * ============================================================================
 */

'use strict';

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================================================
  // 1. INTERACTIVE CONSTELLATION CANVAS (AI Neural Particle Network)
  // ==========================================================================
  const canvas = document.getElementById('hero-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    const particleCount = 45; // Balanced for 60fps performance on all devices
    const connectionDistance = 140;
    const mouseRadius = 160;

    const mouse = {
      x: null,
      y: null
    };

    // Resize Canvas to fit the hero section
    const resizeCanvas = () => {
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle Object
    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.9;
        this.vy = (Math.random() - 0.5) * 0.9;
        this.radius = Math.random() * 1.8 + 1;
        // Elegant Tech Blue and Soft Indigo
        this.color = Math.random() > 0.5 ? '#38bdf8' : '#818cf8';
      }

      update() {
        // Move particles
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off canvas boundaries
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        // Mouse attraction/repulsion interaction
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouseRadius) {
            const force = (mouseRadius - dist) / mouseRadius;
            this.x -= (dx / dist) * force * 1.5;
            this.y -= (dy / dist) * force * 1.5;
          }
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Track mouse position over hero canvas
    const heroSection = document.getElementById('home');
    if (heroSection) {
      heroSection.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
      });

      heroSection.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
      });
    }

    // Animation Loop
    const animateParticles = () => {
      ctx.clearRect(0, 0, width, height);

      // Connect particles with distance-based fading lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            const alpha = 1 - (dist / connectionDistance);
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(56, 189, 248, ${alpha * 0.22})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      // Connect particles to mouse
      if (mouse.x !== null && mouse.y !== null) {
        for (let i = 0; i < particles.length; i++) {
          const dx = particles[i].x - mouse.x;
          const dy = particles[i].y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouseRadius) {
            const alpha = 1 - (dist / mouseRadius);
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(99, 102, 241, ${alpha * 0.35})`;
            ctx.lineWidth = 1.2;
            ctx.stroke();
          }
        }
      }

      // Update and draw each particle
      particles.forEach(p => {
        p.update();
        p.draw();
      });

      requestAnimationFrame(animateParticles);
    };

    animateParticles();
  }

  // ==========================================================================
  // 2. DYNAMIC MULTI-ROLE TYPEWRITER EFFECT
  // ==========================================================================
  const typewriterElement = document.getElementById('typewriter-text');
  if (typewriterElement) {
    const roles = [
      'Aspiring AI/ML Engineer',
      'Python & Machine Learning Developer',
      'UI/UX Designer & Frontend Developer',
      'Data Analysis & SQL Specialist',
      'Software Engineer'
    ];

    let currentRoleIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let typingSpeed = 90;

    const type = () => {
      const currentRole = roles[currentRoleIndex];

      if (isDeleting) {
        typewriterElement.textContent = currentRole.substring(0, currentCharIndex - 1);
        currentCharIndex--;
        typingSpeed = 45;
      } else {
        typewriterElement.textContent = currentRole.substring(0, currentCharIndex + 1);
        currentCharIndex++;
        typingSpeed = 90;
      }

      // Finished typing full word
      if (!isDeleting && currentCharIndex === currentRole.length) {
        typingSpeed = 1800; // Pause at end of word
        isDeleting = true;
      } else if (isDeleting && currentCharIndex === 0) {
        isDeleting = false;
        currentRoleIndex = (currentRoleIndex + 1) % roles.length;
        typingSpeed = 400; // Pause before typing next word
      }

      setTimeout(type, typingSpeed);
    };

    type();
  }

  // ==========================================================================
  // 3. 3D TILT & SPECULAR SPOTLIGHT ON PROJECT CARDS
  // ==========================================================================
  const projectCards = document.querySelectorAll('.project-card');

  projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Set CSS variables for radial spotlight gradient
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);

      // Calculate tilt angles (-10deg to +10deg)
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -7;
      const rotateY = ((x - centerX) / centerX) * 7;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  });

  // ==========================================================================
  // 4. SCROLL REVEAL ANIMATIONS (IntersectionObserver)
  // ==========================================================================
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback if IntersectionObserver is not supported
    revealElements.forEach(el => el.classList.add('active'));
  }

  // ==========================================================================
  // 5. MOBILE NAVIGATION MENU TOGGLE
  // ==========================================================================
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close on nav link click
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (navMenu.classList.contains('open')) {
          navMenu.classList.remove('open');
          navToggle.setAttribute('aria-expanded', 'false');
        }
      });
    });

    // Close when clicking outside
    document.addEventListener('click', (event) => {
      const isClickInside = navMenu.contains(event.target) || navToggle.contains(event.target);
      if (!isClickInside && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ==========================================================================
  // 6. STICKY HEADER & ACTIVE SECTION HIGHLIGHTING
  // ==========================================================================
  const header = document.querySelector('.header');
  const sections = document.querySelectorAll('section[id]');
  const backToTopBtn = document.getElementById('back-to-top-btn');

  const onScrollHandler = () => {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;

    // Header glass blur elevation
    if (header) {
      if (scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    // Floating Back to Top Button visibility
    if (backToTopBtn) {
      if (scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }

    // Highlight current nav section
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const targetNavLink = document.querySelector(`.nav-menu a[href*="${sectionId}"]`);

      if (targetNavLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          targetNavLink.classList.add('active');
        } else {
          targetNavLink.classList.remove('active');
        }
      }
    });
  };

  window.addEventListener('scroll', onScrollHandler);

  // Floating Back to Top Click Action
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ==========================================================================
  // 7. DYNAMIC FOOTER COPYRIGHT YEAR
  // ==========================================================================
  const currentYearSpan = document.getElementById('current-year');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  // ==========================================================================
  // 8. CONTACT FORM HANDLING & VALIDATION
  // ==========================================================================
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  const submitBtn = document.getElementById('submit-btn');

  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');

  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const messageError = document.getElementById('message-error');

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const clearError = (inputEl, errorEl) => {
    inputEl.classList.remove('input-error');
    errorEl.textContent = '';
  };

  const setError = (inputEl, errorEl, message) => {
    inputEl.classList.add('input-error');
    errorEl.textContent = message;
  };

  if (nameInput) nameInput.addEventListener('input', () => clearError(nameInput, nameError));
  if (emailInput) emailInput.addEventListener('input', () => clearError(emailInput, emailError));
  if (messageInput) messageInput.addEventListener('input', () => clearError(messageInput, messageError));

  if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();

      let hasErrors = false;

      const nameValue = nameInput.value.trim();
      if (!nameValue) {
        setError(nameInput, nameError, 'Please enter your name.');
        hasErrors = true;
      } else {
        clearError(nameInput, nameError);
      }

      const emailValue = emailInput.value.trim();
      if (!emailValue) {
        setError(emailInput, emailError, 'Please enter your email address.');
        hasErrors = true;
      } else if (!isValidEmail(emailValue)) {
        setError(emailInput, emailError, 'Please enter a valid email address.');
        hasErrors = true;
      } else {
        clearError(emailInput, emailError);
      }

      const messageValue = messageInput.value.trim();
      if (!messageValue) {
        setError(messageInput, messageError, 'Please enter your message.');
        hasErrors = true;
      } else if (messageValue.length < 10) {
        setError(messageInput, messageError, 'Message should be at least 10 characters long.');
        hasErrors = true;
      } else {
        clearError(messageInput, messageError);
      }

      if (hasErrors) {
        if (!nameValue) nameInput.focus();
        else if (!emailValue || !isValidEmail(emailValue)) emailInput.focus();
        else messageInput.focus();
        return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending Message...';

      setTimeout(() => {
        formStatus.className = 'form-status success';
        formStatus.textContent = `✨ Thank you, ${nameValue}! Your message has been received. I will get back to you soon.`;

        contactForm.reset();
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';

        setTimeout(() => {
          formStatus.className = 'form-status';
          formStatus.textContent = '';
        }, 7000);
      }, 600);
    });
  }

});
