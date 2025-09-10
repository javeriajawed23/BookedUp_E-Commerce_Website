// ===== MAIN.JS =====
// This file should only handle: cart badge, animations, navbar toggle

// ===== CART COUNT UPDATE (Shared) =====
function updateCartCount() {
  const cartCount = document.querySelector(".cart-count");
  if (!cartCount) return;

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalQty = cart.reduce((acc, item) => acc + item.quantity, 0);

  cartCount.textContent = totalQty;
}

// ===== HERO & FEATURES ANIMATION =====
window.addEventListener("DOMContentLoaded", () => {
  updateCartCount();

  const heroText = document.querySelector(".hero-text");
  if (heroText) heroText.classList.add("fade-in");

  const featureCards = document.querySelectorAll(".feature-card");
  featureCards.forEach((card, i) => {
    setTimeout(() => card.classList.add("fade-in-up"), i * 200);
  });

  // Optional: Navbar toggle for mobile
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }
});
