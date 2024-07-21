const bookTitle = document.querySelector("#book-title");
const bookAuthor = document.querySelector("#book-author");
const bookPages = document.querySelector("#book-pages");
const bookStates = document.querySelectorAll("input[name='book-state']");
const addBookBtn = document.querySelector("#confirm-btn");
const displayLibrary = document.querySelector(".your-books");

const myLibrary = [
  {
    title: "Beyond Good and Evil",
    author: "Friedrich Nietzsche",
    pages: "116 pages",
    state: "unread"
  }
];

function Book(title, author, pages, state) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.state = state;
}

function resetInputs() {
    bookTitle.value = "";
    bookAuthor.value = "";
    bookPages.value = "";

    bookStates.forEach((state) => {
        state.checked = false;
    });
}

function addBookToLibrary() {
    let selectedState;
    bookStates.forEach((state) => {
      if (state.checked) {
        selectedState = state.value;
      }
    });
  
    if (!selectedState) {
      alert("Please select a book state.");
      return;
    }

    if (bookTitle.value  === "" || bookAuthor.value  === "" || bookPages.value === "") {
      alert("Please fill in all fields.")
    } else {
      const userBook = new Book(bookTitle.value, bookAuthor.value, bookPages.value, selectedState);
      myLibrary.push(userBook);
      displayBooks();
      resetInputs();
    }  
}

addBookBtn.addEventListener('click', () => {
    addBookToLibrary()
})


const displayBooks = () => {
  displayLibrary.innerHTML = '';

  myLibrary.forEach(book => {
    const userBook = `
      <div class="book" id="book">
        <div class="book__info-wrapper" id="book__info-wrapper">
          <h2 class="book__title" id="book__title">${book.title}</h2>
          <h3 class="book__author" id="book__author">${book.author}</h3>
          <p class="book__pages" id="book__pages">${book.pages} pages</p>
          <div class="book__modify" id="book__modify">
            <button class="book__state" style="background: ${book.state === "unread" ? "#f87171" : "#16a34a"};" id="book__state">${book.state === "unread" ? "Unread" : "Read"}</button>
            <i class="ri-delete-bin-line" id="book__delete"></i>
          </div>
        </div>
        <div class="book__delete-wrapper" id="book__delete-wrapper">
          <h3 class="book__delete-question">
            Are you sure you want to delete this book?
          </h3>
          <p class="book__deletion-warning">This action cannot be undone. This will permanently delete your book.</p>
          <button class="book__cancel-deletion" id="book__cancel-deletion">Cancel</button>
          <button class="book__confirm-deletion">Continue</button>
        </div>
        <svg id="#book__bookmark" width="17" height="37" viewBox="0 0 17 37" fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0H17V37L8.075 29L0 37V0Z" fill="#CBD5E1" />
        </svg>
      </div>
    `;
  
    displayLibrary.insertAdjacentHTML("beforeend", userBook);
  });
}

displayBooks();

// Generar el HTML del libro