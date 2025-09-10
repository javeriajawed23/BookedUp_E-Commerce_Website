// Get cart from localStorage or initialize empty
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// DOM Elements
const cartGrid = document.querySelector(".cart-grid");
const cartTotal = document.getElementById("cart-total");

// Update cart count in header icon
function updateCartCount() {
  const cartCount = document.querySelector(".cart-count");
  if (cartCount) {
    const totalQty = cart.reduce((acc, item) => acc + item.quantity, 0);
    cartCount.textContent = totalQty;
  }
}

// Render Cart
function renderCart() {
  cartGrid.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.quantity;

    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";
    cartItem.innerHTML = `
      <img src="${item.img}" alt="${item.title}">
      <h4>${item.title}</h4>
      <p>Price: $${item.price}</p>
      <input type="number" min="1" value="${item.quantity}" data-index="${index}" class="quantity-input"/>
      <button class="remove-btn" data-index="${index}">Remove</button>
    `;
    cartGrid.appendChild(cartItem);
  });

  cartTotal.textContent = total.toFixed(2);

  // Attach remove listeners
  document.querySelectorAll(".remove-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      cart.splice(index, 1);
      updateCart();
    });
  });

  // Attach quantity change listeners
  document.querySelectorAll(".quantity-input").forEach(input => {
    input.addEventListener("change", (e) => {
      const index = e.target.dataset.index;
      const newQty = parseInt(e.target.value);
      if (newQty < 1) {
        e.target.value = 1;
        return;
      }
      cart[index].quantity = newQty;
      updateCart();
    });
  });
}

// Update localStorage and rerender
function updateCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
  updateCartCount(); // 🔥 keep header count in sync
}

// Initial render
renderCart();
updateCartCount();
