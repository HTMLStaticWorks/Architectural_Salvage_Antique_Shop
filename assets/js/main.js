document.addEventListener('DOMContentLoaded', () => {
  /* =======================================
     Sticky Navbar
     ======================================= */
  const header = document.querySelector('.site-header');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  /* =======================================
     Mobile Hamburger Menu
     ======================================= */
  const hamburger = document.querySelector('.hamburger-menu');
  const navMenu = document.querySelector('.nav-menu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('open');
    });

    // Close menu when clicking a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('open');
      });
    });
  }

  /* =======================================
     Dark Mode Toggle
     ======================================= */
  const darkToggleBtn = document.getElementById('darkModeToggle');
  const htmlEl = document.documentElement;

  // Auto detect user preference
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const savedTheme = localStorage.getItem('theme');

  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    htmlEl.classList.add('dark');
  }

  if (darkToggleBtn) {
    darkToggleBtn.addEventListener('click', () => {
      htmlEl.classList.toggle('dark');
      const isDark = htmlEl.classList.contains('dark');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
  }

  /* =======================================
     RTL Toggle (Right-to-Left)
     ======================================= */
  const rtlToggleBtn = document.getElementById('rtlToggle');
  
  const savedDir = localStorage.getItem('dir');
  if (savedDir === 'rtl') {
    htmlEl.setAttribute('dir', 'rtl');
  } else {
    htmlEl.setAttribute('dir', 'ltr');
  }

  if (rtlToggleBtn) {
    rtlToggleBtn.addEventListener('click', () => {
      const isRtl = htmlEl.getAttribute('dir') === 'rtl';
      if (isRtl) {
        htmlEl.setAttribute('dir', 'ltr');
        localStorage.setItem('dir', 'ltr');
      } else {
        htmlEl.setAttribute('dir', 'rtl');
        localStorage.setItem('dir', 'rtl');
      }
    });
  }

  /* =======================================
     Shop Filtering
     ======================================= */
  const filterButtons = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card');

  if (filterButtons.length > 0 && productCards.length > 0) {
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        productCards.forEach(card => {
          const category = card.getAttribute('data-category');
          
          if (filterValue === 'all' || filterValue === category) {
            card.style.display = 'flex';
            // Simple animation re-trigger
            card.style.opacity = '0';
            setTimeout(() => {
              card.style.transition = 'opacity 0.4s ease';
              card.style.opacity = '1';
            }, 10);
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

});
