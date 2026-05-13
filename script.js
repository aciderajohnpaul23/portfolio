/* ===== Navigation: Scroll Effect ===== */
const navbar = document.getElementById('navbar');
const sections = document.querySelectorAll('.section[id]');
const navLinksContainer = document.getElementById('navLinks');
const navLinks = navLinksContainer.querySelectorAll('a:not(.nav-cta)');
const hamburger = document.getElementById('hamburger');
const navOverlay = document.getElementById('navOverlay');

function handleScroll() {
  const scrollY = window.scrollY;

  // Navbar background
  if (scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Active section highlighting
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    const sectionHeight = section.offsetHeight;
    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', handleScroll, { passive: true });

/* ===== Mobile Navigation ===== */
function toggleMobileNav() {
  hamburger.classList.toggle('active');
  navLinksContainer.classList.toggle('open');
  navOverlay.classList.toggle('active');
  document.body.style.overflow = navLinksContainer.classList.contains('open') ? 'hidden' : '';
}

hamburger.addEventListener('click', toggleMobileNav);
navOverlay.addEventListener('click', toggleMobileNav);

navLinksContainer.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    if (navLinksContainer.classList.contains('open')) {
      toggleMobileNav();
    }
  });
});

/* ===== Scroll Reveal ===== */
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

/* ===== Contact Form (Static Handler) ===== */
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
  e.preventDefault();

  const btn = this.querySelector('.btn-submit');
  const originalHTML = btn.innerHTML;

  btn.innerHTML = `
    <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
    Message Sent!
  `;
  btn.style.background = '#4ecdc4';
  btn.disabled = true;

  setTimeout(() => {
    btn.innerHTML = originalHTML;
    btn.style.background = '';
    btn.disabled = false;
    contactForm.reset();
  }, 3000);
});

/* ===== Smooth Scroll for Anchor Links ===== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

/* ===== Initialize ===== */
handleScroll();
