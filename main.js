// Getting elements from the DOM
const moon = document.querySelector("#moon");
const sun = document.querySelector("#sun");

const modal = document.querySelector("#modal");
const addBook = document.querySelector("#add-book");
const closeModal = document.querySelector("#close-modal-btn");

const book = document.querySelector("#book");
const infoWrapper = document.querySelector("#book__info-wrapper");
const deleteWrapper = document.querySelector("#book__delete-wrapper");
const bookDelete = document.querySelector("#book__delete");

const cancelDeletion = document.querySelector("#book__cancel-deletion");

// Theme toggle funcionality
moon.addEventListener('click', () => {
  document.body.classList.add('dark-theme-variables');
  moon.style.display = 'none'
  sun.style.display = 'block'
})

sun.addEventListener('click', () => {
  document.body.classList.remove('dark-theme-variables');
  sun.style.display = 'none'
  moon.style.display = 'block'
})

// Showing and hiding the Modal
addBook.addEventListener('click', () => {
  modal.showModal();
})

closeModal.addEventListener('click', () => {
  modal.close();
})

bookDelete.addEventListener('click', () => {
  infoWrapper.style.display = 'none';
  deleteWrapper.style.display = 'block';
})

cancelDeletion.addEventListener('click', () => {
  deleteWrapper.style.display = 'none';
  infoWrapper.style.display = 'block';
})