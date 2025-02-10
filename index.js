const main = document.querySelector("main");
const addBook = document.querySelector("footer");
const modal = document.querySelector("dialog");
const modalExit = document.querySelector(".modal__exit");
const form = document.querySelector("form");
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const pagesInput = document.querySelector("#pages");
const readInput = document.querySelector("#read");

let title = "";
let author = "";
let pages = 0;
let read = false;
let uid = 0;

const library = [];

// function Book(title, author, pages, read, uid) {
//   this.title = title;
//   this.author = author;
//   this.pages = pages;
//   this.read = read;
//   this.uid = uid;
// }

// Book.prototype.changeReadStatus = function () {
//   this.read = !this.read;
// };

class Book {
  constructor(title, author, pages, read, uid) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.uid = uid;
  }

  changeReadStatus() {
    this.read = !this.read;
  }
}

const getBookElement = (book) => {
  const div = document.createElement("div");
  div.className = "book";
  div.dataset.dom = `${uid}`;
  div.innerHTML = `<p>Title: ${book.title}</p>
  <p>Author: ${book.author}</p>
  <p>Pages: ${book.pages}</p>
  <p class="read"><label>Read: </label><input type="checkbox" ${
    book.read ? "checked" : ""
  } onclick="triggerStatusChange(${uid})" /></p><button onclick="triggerRemoveDOM(${uid})">Remove</button>`;
  uid += 1;
  return div;
};

const triggerAddDOM = () => {
  main.appendChild(getBookElement(library[library.length - 1]));
};

const triggerRemoveDOM = (index) => {
  main.removeChild(document.querySelector(`.book[data-dom="${index}"]`));
  triggerRemoveArray(index);
};

const triggerRemoveArray = (index) => {
  const found = library.find((book) => book.uid === index);
  const foundIndex = library.indexOf(found);
  library.splice(foundIndex, 1);
};

const triggerStatusChange = (index) => {
  const found = library.find((book) => book.uid === index);
  found.changeReadStatus();
};

const refreshAllControls = () => {
  title = "";
  author = "";
  pages = 0;
  read = false;
};

addBook.addEventListener("click", () => {
  modal.showModal();
});

modalExit.addEventListener("click", () => {
  modal.close();
});

modal.addEventListener("close", () => {
  refreshAllControls();
});

form.addEventListener("submit", () => {
  const newBook = new Book(title, author, pages, read, uid);
  library.push(newBook);
  refreshAllControls();
  triggerAddDOM();
  form.reset();
});

titleInput.addEventListener("input", (e) => {
  title = e.target.value;
});
authorInput.addEventListener("input", (e) => {
  author = e.target.value;
});
pagesInput.addEventListener("input", (e) => {
  pages = e.target.value;
});
readInput.addEventListener("click", (e) => {
  read = e.target.checked;
});
