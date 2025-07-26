let vantaEffect;

function initVantaEffect() {
  // Destroy existing effect if it exists
  if (vantaEffect) {
    vantaEffect.destroy(); 
  };

  // Initialize Vanta effect
  vantaEffect = VANTA.CLOUDS({
    el: "#hero",
    mouseControls: false,
    touchControls: false,
    gyroControls: false,
    minHeight: 200.00,
    minWidth: 200.00,
    skyColor: document.documentElement.classList.contains("dark") ? 0x1a1a2e : 0x68b8d7,
    cloudColor: 0xadc1de,
    cloudShadowColor: 0x183550,
    sunColor: document.documentElement.classList.contains("dark") ? 0x000000 : 0xff9919,
    sunlightColor: document.documentElement.classList.contains("dark") ? 0x000000 : 0xff9933,
    sunGlareColor: document.documentElement.classList.contains("dark") ? 0x000000 : 0xff6633,
    speed: 1
  });
}


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

  initVantaEffect();
}

function updateCopyrightYear() {
  const yearSpan = document.getElementById('current-year');
  yearSpan.textContent = "2017 - " + new Date().getFullYear() + " ";
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
  initVantaEffect();

  waitForResources().then(hideLoader());
  // Fallback
  setTimeout(hideLoader, 5000);
});