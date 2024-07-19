// Getting elements from the DOM
const themeToggler = document.querySelector("#theme-toggler");
const modal = document.querySelector("#modal");
const addBook = document.querySelector("#add-book");
const closeModal = document.querySelector("#close-modal-btn");
const bookState = document.querySelectorAll(".book__state");

themeToggler.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme-variables');
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
