function setDarkMode() {
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (prefersDark) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}
setDarkMode();

// Variable for navigation height to be used in CSS
const navigationHeight = document.querySelector('nav').offsetHeight + 5;
document.documentElement.style.setProperty('--navigation-height', `${navigationHeight}px`);


// Hide loader function
function hideLoader() {
  const loader = document.querySelector('.loader-wrapper');
  loader.classList.add('hidden');
}

// Toggle dark mode function for UI
function toggleDarkMode() {
  document.documentElement.classList.toggle("dark");
}

function updateCopyrightYear() {
  const yearSpan = document.getElementById('current-year');
  yearSpan.textContent = new Date().getFullYear();
}

function waitForResources() {
  return Promise.all([
    // Wait for DOM
    new Promise(resolve => {
      if (document.readyState === 'complete') {
        resolve();
      } else {
        window.addEventListener('load', resolve);
      }
    }),
    // Wait for fonts
    document.fonts.ready,
    // Wait for images
    Promise.all(
      Array.from(document.images)
        .filter(img => !img.complete)
        .map(img => new Promise(resolve => {
          img.onload = img.onerror = resolve;
        }))
    )
  ]);
}

// Wait for resources to load before hiding loader
document.addEventListener('DOMContentLoaded', () => {
  updateCopyrightYear();
  waitForResources().then(hideLoader());
  // Fallback
  setTimeout(hideLoader, 5000);
});