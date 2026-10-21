/**
 * ============================================================================
 * PORTFOLIO WEBSITE JAVASCRIPT (script.js)
 * ============================================================================
 * Vanilla JavaScript (no external libraries needed).
 * 
 * Features included:
 * 1. Mobile Hamburger Menu Toggle (with Accessibility & auto-close)
 * 2. Active Section Highlighting on Scroll
 * 3. Dynamic Footer Copyright Year
 * 4. Interactive Contact Form with Validation & Feedback
 * ============================================================================
 */

// 'use strict' helps catch common coding mistakes and prevents unsafe actions
'use strict';

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================================================
  // 1. MOBILE NAVIGATION MENU TOGGLE
  // ==========================================================================
  // Select the hamburger button and the navigation menu list
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (navToggle && navMenu) {
    // Toggle menu open/closed when the button is clicked
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      // Update ARIA attribute for screen readers
      navToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close the mobile menu automatically whenever a nav link is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (navMenu.classList.contains('open')) {
          navMenu.classList.remove('open');
          navToggle.setAttribute('aria-expanded', 'false');
        }
      });
    });

    // Close the mobile menu if clicking anywhere outside the navigation
    document.addEventListener('click', (event) => {
      const isClickInsideNav = navMenu.contains(event.target) || navToggle.contains(event.target);
      if (!isClickInsideNav && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ==========================================================================
  // 2. ACTIVE NAVIGATION LINK ON SCROLL
  // ==========================================================================
  // As the user scrolls down the page, highlight the currently visible section
  const sections = document.querySelectorAll('section[id]');

  const highlightCurrentSection = () => {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 100; // 100px offset for sticky header
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

  window.addEventListener('scroll', highlightCurrentSection);

  // ==========================================================================
  // 3. DYNAMIC FOOTER COPYRIGHT YEAR
  // ==========================================================================
  // Automatically keeps the copyright year current so you never need to edit it
  const currentYearSpan = document.getElementById('current-year');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  // ==========================================================================
  // 4. CONTACT FORM HANDLING & VALIDATION
  // ==========================================================================
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  const submitBtn = document.getElementById('submit-btn');

  // Input elements
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');

  // Error message spans
  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const messageError = document.getElementById('message-error');

  // Helper function to check valid email structure
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Helper to clear error state for an input
  const clearError = (inputEl, errorEl) => {
    inputEl.classList.remove('input-error');
    errorEl.textContent = '';
  };

  // Helper to set error state for an input
  const setError = (inputEl, errorEl, message) => {
    inputEl.classList.add('input-error');
    errorEl.textContent = message;
  };

  // Clear errors when the user types in any input
  if (nameInput) nameInput.addEventListener('input', () => clearError(nameInput, nameError));
  if (emailInput) emailInput.addEventListener('input', () => clearError(emailInput, emailError));
  if (messageInput) messageInput.addEventListener('input', () => clearError(messageInput, messageError));

  if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
      // Prevent the browser's default behavior of reloading/submitting the page
      event.preventDefault();

      let hasErrors = false;

      // Validate Name
      const nameValue = nameInput.value.trim();
      if (!nameValue) {
        setError(nameInput, nameError, 'Please enter your name.');
        hasErrors = true;
      } else {
        clearError(nameInput, nameError);
      }

      // Validate Email
      const emailValue = emailInput.value.trim();
      if (!emailValue) {
        setError(emailInput, emailError, 'Please enter your email address.');
        hasErrors = true;
      } else if (!isValidEmail(emailValue)) {
        setError(emailInput, emailError, 'Please enter a valid email address (e.g. name@example.com).');
        hasErrors = true;
      } else {
        clearError(emailInput, emailError);
      }

      // Validate Message
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

      // If validation fails, focus the first invalid field
      if (hasErrors) {
        if (!nameValue) {
          nameInput.focus();
        } else if (!emailValue || !isValidEmail(emailValue)) {
          emailInput.focus();
        } else {
          messageInput.focus();
        }
        return;
      }

      // If everything is valid, simulate a successful message send
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';

      // Simulate a fast network delay (600ms) for a realistic user experience
      setTimeout(() => {
        // Show success alert
        formStatus.className = 'form-status success';
        formStatus.textContent = `Thank you, ${nameValue}! Your message has been received. I'll get back to you soon.`;

        // Reset the form input values
        contactForm.reset();

        // Restore button state
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';

        // Auto-dismiss the status banner after 7 seconds
        setTimeout(() => {
          formStatus.className = 'form-status';
          formStatus.textContent = '';
        }, 7000);

      }, 600);
    });
  }

});
