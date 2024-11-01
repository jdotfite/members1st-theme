// app.js
window.addEventListener('load', function () {
      // Theme Toggle
      const themeToggle = document.getElementById('theme-toggle');
      if (themeToggle) {
          themeToggle.addEventListener('click', function() {
              document.documentElement.classList.toggle('dark');
              localStorage.setItem('color-theme', 
                  document.documentElement.classList.contains('dark') ? 'dark' : 'light'
              );
          });
      }
  
      // Mobile Menu Toggle
      const menuToggle = document.getElementById('menu-toggle');
      const primaryMenu = document.getElementById('primary-menu');
      if (menuToggle && primaryMenu) {
          menuToggle.addEventListener('click', function() {
              primaryMenu.classList.toggle('hidden');
          });
      }
  
      // Initialize theme
      if (localStorage.getItem('color-theme') === 'dark' || 
          (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
          document.documentElement.classList.add('dark');
      }
  });