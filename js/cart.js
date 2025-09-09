// Get cart from localStorage or initialize empty
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// DOM Elements
const cartGrid = document.getElementById('cart-grid');
const cartTotal = document.getElementById('cart-total');

// Render Cart
function renderCart() {
  cartGrid.innerHTML = '';
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.quantity;

    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
    cartItem.innerHTML = `
      <img src="images/${item.img}" alt="${item.title}">
      <h4>${item.title}</h4>
      <p>Price: $${item.price}</p>
      <input type="number" min="1" value="${item.quantity}" data-index="${index}" class="quantity-input"/>
      <button class="remove-btn" data-index="${index}">Remove</button>
    `;
    cartGrid.appendChild(cartItem);
  });

  cartTotal.textContent = total.toFixed(2);

  // Attach remove and quantity listeners
  const removeBtns = document.querySelectorAll('.remove-btn');
  removeBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const index = e.target.dataset.index;
      cart.splice(index, 1);
      updateCart();
    });
  });

  const quantityInputs = document.querySelectorAll('.quantity-input');
  quantityInputs.forEach(input => {
    input.addEventListener('change', (e) => {
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
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
}

// Initial render
renderCart();
