// Library Array
let myLibrary = [
  {
    title: "Beyond Good and Evil",
    author: "Friedrich Nietzsche",
    pages: "116 pages",
    state: "unread",
  },
];

// DOM Elements
const bookTitle = document.querySelector("#book-title");
const bookAuthor = document.querySelector("#book-author");
const bookPages = document.querySelector("#book-pages");
const bookStates = document.querySelectorAll("input[name='book-state']");
const addBookBtn = document.querySelector("#confirm-btn");
const displayLibrary = document.querySelector(".your-books");

// Load Library from localStorage on page load
document.addEventListener("DOMContentLoaded", () => {
  loadLibraryFromLocalStorage();
  displayBooks();
});

function saveLibraryToLocalStorage() {
  try {
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }
}

// Load Library from localStorage
function loadLibraryFromLocalStorage() {
  try {
    const storedLibrary = localStorage.getItem("myLibrary");
    if (storedLibrary) {
      myLibrary = JSON.parse(storedLibrary);
    }
  } catch (error) {
    console.error("Error loading from localStorage:", error);
  }
}

// Book Constructor
function Book(title, author, pages, state) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.state = state;
}

// Clear Input Fields
function resetInputs() {
  bookTitle.value = "";
  bookAuthor.value = "";
  bookPages.value = "";
  bookStates.forEach((state) => (state.checked = false));
}

// Get Selected Book State
function getSelectedState() {
  return [...bookStates].find((state) => state.checked)?.value || null;
}

// Add Book to Library
function addBookToLibrary() {
  const selectedState = getSelectedState();

  if (!selectedState) {
    alert("Please select a book state.");
    return;
  }

  if (bookTitle.value && bookAuthor.value && bookPages.value) {
    const newBook = new Book(
      bookTitle.value,
      bookAuthor.value,
      bookPages.value,
      selectedState
    );
    myLibrary.unshift(newBook);
    saveLibraryToLocalStorage(); // Save to localStorage
    displayBooks();
    resetInputs();
  } else {
    alert("Please fill in all fields.");
  }
}

// Event Listener for Adding a Book
addBookBtn.addEventListener("click", addBookToLibrary);

// Display Books in Library
function displayBooks() {
  displayLibrary.innerHTML = "";
  myLibrary.forEach((book, index) => {
    displayLibrary.insertAdjacentHTML("beforeend", createBookHTML(book, index));
    attachEventListeners(index);
  });
}

// Create Book HTML
function createBookHTML(book, index) {
  const bookStateColor = book.state === "unread" ? "#f87171" : "#16a34a";
  const bookStateText = book.state === "unread" ? "Unread" : "Read";

  return `
    <div class="book" id="book-${index}">
      <div class="book__info-wrapper" id="book__info-wrapper-${index}">
        <h2 class="book__title">${book.title}</h2>
        <h3 class="book__author">${book.author}</h3>
        <p class="book__pages">${book.pages} pages</p>
        <div class="book__modify">
          <button class="book__state" style="background: ${bookStateColor};" id="book__state-${index}">
            ${bookStateText}
          </button>
          <i class="ri-delete-bin-line" id="book__delete-${index}"></i>
        </div>
      </div>
      <div class="book__delete-wrapper" id="book__delete-wrapper-${index}" style="display: none;">
        <h3 class="book__delete-question">Are you sure you want to delete this book?</h3>
        <p class="book__deletion-warning">This action cannot be undone. This will permanently delete your book.</p>
        <button class="book__cancel-deletion" id="book__cancel-deletion-${index}">Cancel</button>
        <button class="book__confirm-deletion" id="book__confirm-deletion-${index}">Continue</button>
      </div>
    </div>
  `;
}

// Attach Event Listeners for Each Book
function attachEventListeners(index) {
  const deleteBtn = document.querySelector(`#book__delete-${index}`);
  const cancelBtn = document.querySelector(`#book__cancel-deletion-${index}`);
  const confirmBtn = document.querySelector(`#book__confirm-deletion-${index}`);
  const stateBtn = document.querySelector(`#book__state-${index}`);
  const deleteWrapper = document.querySelector(
    `#book__delete-wrapper-${index}`
  );
  const infoWrapper = document.querySelector(`#book__info-wrapper-${index}`);

  deleteBtn.addEventListener("click", () =>
    toggleDeleteConfirmation(deleteWrapper, infoWrapper, true)
  );
  cancelBtn.addEventListener("click", () =>
    toggleDeleteConfirmation(deleteWrapper, infoWrapper, false)
  );
  confirmBtn.addEventListener("click", () => deleteBook(index));
  stateBtn.addEventListener("click", () => toggleBookState(index, stateBtn));
}

// Toggle Delete Confirmation Visibility
function toggleDeleteConfirmation(deleteWrapper, infoWrapper, show) {
  deleteWrapper.style.display = show ? "block" : "none";
  infoWrapper.style.display = show ? "none" : "block";
}

// Delete Book from Library
function deleteBook(index) {
  myLibrary.splice(index, 1);
  saveLibraryToLocalStorage(); // Save to localStorage
  displayBooks();
}

// Toggle Book State (Read/Unread)
function toggleBookState(index, stateBtn) {
  const book = myLibrary[index];
  book.state = book.state === "unread" ? "read" : "unread";
  updateBookStateUI(book, stateBtn);
  saveLibraryToLocalStorage(); // Save to localStorage
}

// Update Book State UI (Color and Text)
function updateBookStateUI(book, stateBtn) {
  const bookStateColor = book.state === "unread" ? "#f87171" : "#16a34a";
  const bookStateText = book.state === "unread" ? "Unread" : "Read";
  stateBtn.style.background = bookStateColor;
  stateBtn.textContent = bookStateText;
}
