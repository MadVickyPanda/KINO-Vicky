document.addEventListener('DOMContentLoaded', () => {
  // Hämta element
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.querySelector('.nav-menu');
  const mobileIcons = document.querySelectorAll('.mobile-nav_item');

  if (menuToggle && navMenu) {
    // Klick på hamburgare
    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      navMenu.classList.toggle('active');
      menuToggle.classList.toggle('active');

      if (!navMenu.classList.contains('active')) {
        mobileIcons.forEach(icon => icon.classList.remove('active'));
      }
    });
  }

  // Klick på mobilikon
  if (mobileIcons.length > 0) {
    mobileIcons.forEach(icon => {
      icon.addEventListener('click', (e) => {
        e.stopPropagation();

        if (icon.classList.contains('active')) {
          icon.classList.remove('active');
        } else {
          mobileIcons.forEach(i => i.classList.remove('active'));
          icon.classList.add('active');
        }
      });
    });
  }

  // Klick utanför stänger menyn
  document.addEventListener('click', (e) => {
    if (navMenu && menuToggle && !navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
      navMenu.classList.remove('active');
      menuToggle.classList.remove('active');
      mobileIcons.forEach(icon => icon.classList.remove('active'));
    }
  });

  // Desktop-dropdown
  const desktopDropdown = document.querySelector('.nav_item_dropdown');
  if (desktopDropdown) {
    const desktopLink = desktopDropdown.querySelector('.nav_link');

    if (desktopLink) {
      desktopLink.addEventListener('click', (e) => {
        e.preventDefault();
        desktopDropdown.classList.toggle('active');
      });
    }

    document.addEventListener('click', (e) => {
      if (!desktopDropdown.contains(e.target)) {
        desktopDropdown.classList.remove('active');
      }
    });
  }
});
