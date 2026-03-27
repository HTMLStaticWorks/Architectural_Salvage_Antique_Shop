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
  const rtlToggleBtns = [document.getElementById('rtlToggle'), document.getElementById('rtlToggleMobile')];
  
  const savedDir = localStorage.getItem('dir');
  if (savedDir === 'rtl') {
    htmlEl.setAttribute('dir', 'rtl');
  } else {
    htmlEl.setAttribute('dir', 'ltr');
  }

  rtlToggleBtns.forEach(btn => {
    if (btn) {
      btn.addEventListener('click', () => {
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
  });

  /* =======================================
     Shop Filtering
     ======================================= */
  const filterButtons = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card');

  const applyFilter = (filterValue) => {
    // Scroll to the product grid section if we are applying a filter on load
    // But only if we aren't already at the top
    
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

    // Update active button state
    filterButtons.forEach(btn => {
      if (btn.getAttribute('data-filter') === filterValue) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  };

  if (filterButtons.length > 0 && productCards.length > 0) {
    // Check for filter in URL
    const urlParams = new URLSearchParams(window.location.search);
    const initialFilter = urlParams.get('filter');

    if (initialFilter) {
      applyFilter(initialFilter);
    }

    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        const filterValue = button.getAttribute('data-filter');
        applyFilter(filterValue);
        
        // Optional: Update URL without reloading page
        const newUrl = new URL(window.location);
        newUrl.searchParams.set('filter', filterValue);
        window.history.pushState({}, '', newUrl);
      });
    });
  }
  /* =======================================
     Scroll to Top
     ======================================= */
  const injectScrollButton = () => {
    const btn = document.createElement('button');
    btn.className = 'scroll-top';
    btn.setAttribute('aria-label', 'Scroll to top');
    btn.innerHTML = `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="18 15 12 9 6 15"></polyline>
      </svg>
    `;
    document.body.appendChild(btn);

    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    });

    btn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  };

  injectScrollButton();

  /* =======================================
     Authentication Manager (Demo)
     ======================================= */
  const initAuth = () => {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    if (loginForm) {
      loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = loginForm.email.value;
        const password = loginForm.password.value;

        if (!email || !password) {
          alert('Please fill in all fields.');
          return;
        }

        const users = JSON.parse(localStorage.getItem('users') || '[]');
        // Check for either email or username (for demo, email is used as username)
        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
          alert('Login successful! Redirecting to home...');
          localStorage.setItem('loggedInUser', JSON.stringify(user));
          window.location.href = 'index.html';
        } else {
          alert('Invalid email or password.');
        }
      });
    }

    if (registerForm) {
      registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = registerForm.name.value;
        const email = registerForm.email.value;
        const password = registerForm.password.value;
        const confirmPassword = registerForm.confirmPassword.value;

        if (!name || !email || !password || !confirmPassword) {
          alert('Please fill in all fields.');
          return;
        }

        if (password !== confirmPassword) {
          alert('Passwords do not match.');
          return;
        }

        const users = JSON.parse(localStorage.getItem('users') || '[]');
        if (users.find(u => u.email === email)) {
          alert('Email already registered.');
          return;
        }

        users.push({ name, email, password });
        localStorage.setItem('users', JSON.stringify(users));
        alert('Registration successful! Redirecting to login...');
        window.location.href = 'login.html';
      });
    }
  };

  initAuth();

});
