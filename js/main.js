// ===== CART COUNT UPDATE =====
let cart = JSON.parse(localStorage.getItem("cart")) || [];
function updateCartCount() {
  const cartCount = document.querySelector(".cart-count");
  if (cartCount) {
    cartCount.textContent = cart.reduce((acc, item) => acc + item.quantity, 0);
  }
}

// ===== HERO ANIMATION =====
window.addEventListener("DOMContentLoaded", () => {
  updateCartCount();

  // Example: fade-in for hero text
  const heroText = document.querySelector(".hero-text");
  if (heroText) {
    heroText.classList.add("fade-in");
  }

  // Example: fade-in for Why Choose Us cards
  const featureCards = document.querySelectorAll(".feature-card");
  featureCards.forEach((card, i) => {
    setTimeout(() => card.classList.add("fade-in-up"), i * 200);
  });
});
