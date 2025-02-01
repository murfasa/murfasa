function setDarkMode() {
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (prefersDark) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}

function toggleDarkMode() {
  document.documentElement.classList.toggle("dark");
  /*document.body.classList.toggle("dark");*/
}

const navigationHeight = document.querySelector('nav').offsetHeight + 5;
document.documentElement.style.setProperty('--navigation-height', `${navigationHeight}px`);

setDarkMode();