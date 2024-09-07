// Getting elements from the DOM
const moon = document.querySelector("#moon");
const sun = document.querySelector("#sun");

const modal = document.querySelector("#modal");
const addBook = document.querySelector("#add-book");
const closeModal = document.querySelector("#close-modal-btn");

// Function to apply the saved theme from localStorage
function applySavedTheme() {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    document.body.classList.add("dark-theme-variables");
    moon.style.display = "none";
    sun.style.display = "block";
  } else {
    document.body.classList.remove("dark-theme-variables");
    sun.style.display = "none";
    moon.style.display = "block";
  }
}

// Initial theme setup
document.addEventListener("DOMContentLoaded", applySavedTheme);

// Theme toggle functionality
moon.addEventListener("click", () => {
  document.body.classList.add("dark-theme-variables");
  moon.style.display = "none";
  sun.style.display = "block";
  localStorage.setItem("theme", "dark"); // Save the theme to localStorage
});

sun.addEventListener("click", () => {
  document.body.classList.remove("dark-theme-variables");
  sun.style.display = "none";
  moon.style.display = "block";
  localStorage.setItem("theme", "light"); // Save the theme to localStorage
});

// Showing and hiding the Modal
addBook.addEventListener("click", () => {
  modal.showModal();
});

closeModal.addEventListener("click", () => {
  modal.close();
  resetInputs();
});
