// ===== BOOK DATA =====
const books = [
  { id: 1, title: "Book 1", price: 15, category: "Fiction", img: "images/book-1.jpg" },
  { id: 2, title: "Book 2", price: 20, category: "Fantasy", img: "images/book-2.jpg" },
  { id: 3, title: "Book 3", price: 25, category: "Mystery", img: "images/book-3.jpg" },
  { id: 4, title: "Book 4", price: 18, category: "Romance", img: "images/book-4.jpg" },
  { id: 5, title: "Book 5", price: 22, category: "Adventure", img: "images/book-5.jpg" },
  { id: 6, title: "Book 6", price: 30, category: "Science", img: "images/book-6.jpg" },
  { id: 7, title: "Book 7", price: 19, category: "Fiction", img: "images/book-7.jpg" },
  { id: 8, title: "Book 8", price: 21, category: "Fantasy", img: "images/book-8.jpg" },
  { id: 9, title: "Book 9", price: 24, category: "Mystery", img: "images/book-9.jpg" },
  { id: 10, title: "Book 10", price: 28, category: "Romance", img: "images/book-10.jpg" },
  { id: 11, title: "Book 11", price: 26, category: "Adventure", img: "images/book-11.jpg" },
  { id: 12, title: "Book 12", price: 32, category: "Science", img: "images/book-12.jpg" }
];

// ===== CART =====
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ===== SAVE CART =====
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

// ===== UPDATE CART COUNT =====
function updateCartCount() {
  const cartCount = document.querySelector(".cart-count");
  if (cartCount) {
    const totalQty = cart.reduce((acc, item) => acc + item.quantity, 0);
    cartCount.textContent = totalQty;
  }
}

// ===== DISPLAY BOOKS =====
function displayBooks(filteredBooks = books) {
  const booksGrid = document.getElementById("books-grid");
  if (!booksGrid) return;

  booksGrid.innerHTML = "";
  filteredBooks.forEach(book => {
    const card = document.createElement("div");
    card.className = "book-card";
    card.innerHTML = `
      <img src="${book.img}" alt="${book.title}">
      <h4>${book.title}</h4>
      <p>$${book.price.toFixed(2)}</p>
      <button class="add-to-cart-btn" data-id="${book.id}">Add to Cart</button>
    `;
    booksGrid.appendChild(card);
  });

  // Add to Cart functionality
  document.querySelectorAll(".add-to-cart-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = parseInt(btn.dataset.id);
      addToCart(id);
    });
  });
}

// ===== ADD TO CART =====
function addToCart(id) {
  const book = books.find(b => b.id === id);
  if (!book) return;

  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...book, quantity: 1 });
  }

  saveCart();
}

// ===== FILTER BUTTONS =====
const filterButtons = document.querySelectorAll(".filter-btn");
filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const category = btn.dataset.category;
    if (category === "all") {
      displayBooks();
    } else {
      const filtered = books.filter(book => book.category === category);
      displayBooks(filtered);
    }
  });
});

// ===== INITIALIZE =====
document.addEventListener("DOMContentLoaded", () => {
  displayBooks();
  updateCartCount();
});
