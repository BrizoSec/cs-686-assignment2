/**
 * Portfolio Interactive Features
 * - Dark/Light Mode Toggle
 * - Smooth Scroll Animations
 * - Active Navigation Highlighting
 * - Scroll-based Navigation Shadow
 */

// ===================================
// Theme Toggle Functionality
// ===================================
function initThemeToggle() {
  const themeToggle = document.querySelector('.theme-toggle');
  const body = document.body;
  const sunIcon = '☀️';
  const moonIcon = '🌙';

  // Load saved theme preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    themeToggle.textContent = sunIcon;
  } else {
    themeToggle.textContent = moonIcon;
  }

  // Toggle theme on button click
  themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const isDark = body.classList.contains('dark-mode');

    // Update icon
    themeToggle.textContent = isDark ? sunIcon : moonIcon;

    // Save preference
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
}

// ===================================
// Smooth Scroll Animations
// ===================================
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        // Optionally unobserve after animation
        // observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all major sections
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    observer.observe(section);
  });
}

// ===================================
// Smooth Scrolling for Navigation Links
// ===================================
function initSmoothScroll() {
  const navLinks = document.querySelectorAll('.nav-links a');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');

      // Only handle internal anchor links
      if (href.startsWith('#')) {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
          const navHeight = document.querySelector('nav').offsetHeight;
          const targetPosition = targetSection.offsetTop - navHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });
}

// ===================================
// Active Navigation Link Highlighting
// ===================================
function initActiveNavHighlight() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  function highlightNavLink() {
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  // Throttle scroll event for performance
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        highlightNavLink();
        ticking = false;
      });
      ticking = true;
    }
  });

  // Initial highlight
  highlightNavLink();
}

// ===================================
// Navigation Shadow on Scroll
// ===================================
function initNavShadow() {
  const nav = document.querySelector('nav');

  function updateNavShadow() {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  // Throttle scroll event
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateNavShadow();
        ticking = false;
      });
      ticking = true;
    }
  });

  // Initial check
  updateNavShadow();
}

// ===================================
// Hero CTA Smooth Scroll
// ===================================
function initHeroCTA() {
  const viewProjectsBtn = document.querySelector('.btn-primary');
  const contactBtn = document.querySelector('.btn-secondary');

  if (viewProjectsBtn) {
    viewProjectsBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectsSection = document.getElementById('projects');
      if (projectsSection) {
        const navHeight = document.querySelector('nav').offsetHeight;
        window.scrollTo({
          top: projectsSection.offsetTop - navHeight,
          behavior: 'smooth'
        });
      }
    });
  }

  if (contactBtn) {
    contactBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        const navHeight = document.querySelector('nav').offsetHeight;
        window.scrollTo({
          top: contactSection.offsetTop - navHeight,
          behavior: 'smooth'
        });
      }
    });
  }
}

// ===================================
// Initialize All Features
// ===================================
document.addEventListener('DOMContentLoaded', () => {
  console.log('Portfolio initialized');

  // Initialize all interactive features
  initThemeToggle();
  initScrollAnimations();
  initSmoothScroll();
  initActiveNavHighlight();
  initNavShadow();
  initHeroCTA();

  // Optional: Add a small delay to hero animation
  setTimeout(() => {
    const hero = document.querySelector('.hero');
    if (hero) {
      hero.classList.add('fade-in');
    }
  }, 100);
});

// ===================================
// Handle window resize (debounced)
// ===================================
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    console.log('Window resized - recalculating positions');
  }, 250);
});
