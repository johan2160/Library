// Getting elements from the DOM
const moon = document.querySelector("#moon");
const sun = document.querySelector("#sun");
const modal = document.querySelector("#modal");
const addBook = document.querySelector("#add-book");
const closeModal = document.querySelector("#close-modal-btn");
const bookState = document.querySelectorAll(".book__state");

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

// Adding event listeners
addBook.addEventListener('click', () => {
  modal.showModal();
})

closeModal.addEventListener('click', () => {
  modal.close();
})

bookState.forEach(book => {
  book.addEventListener('click', () => {

    if (book.innerText === "Unread") {
      book.innerText = "Read";
      book.style.background = "var(--read)"
    } else {
      book.innerText = "Unread";
      book.style.background = "var(--unread)"
    }
  })
});
