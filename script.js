/* ═══════════════════════════════════════
   Portfolio Website – script.js
═══════════════════════════════════════ */

// ── Navbar: scroll glass effect ──────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// ── Hamburger menu ────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('mobile-open');
  document.body.style.overflow = navLinks.classList.contains('mobile-open') ? 'hidden' : '';
});

// Close mobile menu on link click
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('mobile-open');
    document.body.style.overflow = '';
  });
});

// ── Active nav highlight ──────────────────
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-link');

const highlightNav = () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  navItems.forEach(link => {
    link.style.color = link.getAttribute('href') === `#${current}` ? '#fff' : '';
    link.style.background = link.getAttribute('href') === `#${current}` ? 'rgba(255,255,255,0.07)' : '';
  });
};
window.addEventListener('scroll', highlightNav);

// ── Reveal on Scroll (IntersectionObserver) ──
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(
  '.service-card, .portfolio-card, .pricing-card, .contact-btn, .section-header, .hero-content > *'
).forEach((el, i) => {
  el.classList.add('reveal');
  el.style.transitionDelay = `${i * 60}ms`;
  observer.observe(el);
});

// ── Floating particles in Hero ────────────
const particlesContainer = document.getElementById('particles');
if (particlesContainer) {
  const PARTICLE_COUNT = 28;
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const p = document.createElement('span');
    const size = Math.random() * 3 + 1;
    const x    = Math.random() * 100;
    const y    = Math.random() * 100;
    const dur  = Math.random() * 14 + 8;
    const del  = Math.random() * 6;
    p.style.cssText = `
      position:absolute;
      left:${x}%;top:${y}%;
      width:${size}px;height:${size}px;
      border-radius:50%;
      background:rgba(124,58,237,${Math.random() * 0.5 + 0.15});
      animation: particleFloat ${dur}s ${del}s ease-in-out infinite alternate;
    `;
    particlesContainer.appendChild(p);
  }

  // Inject keyframe if not already present
  if (!document.getElementById('particleStyle')) {
    const style = document.createElement('style');
    style.id = 'particleStyle';
    style.textContent = `
      #particles { position:absolute; inset:0; overflow:hidden; pointer-events:none; z-index:1; }
      @keyframes particleFloat {
        from { transform: translate(0, 0) scale(1); opacity: 0.3; }
        to   { transform: translate(${(Math.random()-0.5)*80}px, ${(Math.random()-0.5)*80}px) scale(1.4); opacity: 0.7; }
      }
    `;
    document.head.appendChild(style);
  }
}

// ── Smooth scroll for all anchor links ───
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
    }
  });
});
