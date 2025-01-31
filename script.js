function setDarkMode() {
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (prefersDark) {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }
}

function toggleDarkMode() {
  document.body.classList.toggle("dark");
  console.log('toggled');
}

setDarkMode();