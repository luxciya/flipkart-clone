// Simple Product Data
const products = [
  { id: 1, title: "Smartphone XYZ", price: 12999, rating: "4.3", img: "images/smartphone.jpg"},
  { id: 2, title: "Wireless Headphones", price: 2499, rating: "4.1", img: "images/wireless.jpg" },
  { id: 3, title: "Running Shoes", price: 1999, rating: "4.0", img: "images/Running Shoes.jpg" },
  { id: 4, title: "Men T-Shirt", price: 399, rating: "4.2", img: "images/Men T-Shirt.jpg" },
  { id: 5, title: "LED Smart TV", price: 24999, rating: "4.4", img: "images/LED Smart TV.jpg" },
];

// Cart in localStorage
let cart = JSON.parse(localStorage.getItem("cart") || "[]");

const cartCountEl = document.getElementById("cartCount");
if (cartCountEl) cartCountEl.textContent = cart.length;

// Render Products
function renderProducts(list) {
  const grid = document.getElementById("productGrid");
  if (!grid) return;
  grid.innerHTML = "";
  const template = document.getElementById("productCard");
  list.forEach((p) => {
    const node = template.content.cloneNode(true);
    node.querySelector(".p-img").src = p.img;
    node.querySelector(".p-title").textContent = p.title;
    node.querySelector(".p-price").textContent = "₹" + p.price;
    node.querySelector(".p-rating").textContent = "★ " + p.rating;
    const btn = node.querySelector(".add-btn");
    btn.addEventListener("click", () => addToCart(p));
    grid.appendChild(node);
  });
}
renderProducts(products);

// Add to Cart
function addToCart(product) {
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Added to Cart!");
  const countEl = document.getElementById("cartCount");
  if (countEl) countEl.textContent = cart.length;
}

// Scroll to products
function scrollToProducts() {
  document.getElementById("productGrid").scrollIntoView({ behavior: "smooth" });
}

// Cart Page Rendering
function renderCartPage() {
  const container = document.getElementById("cartItems");
  if (!container) return;
  const totalEl = document.getElementById("cartTotal");
  const emptyMsg = document.getElementById("cartEmpty");

  if (cart.length === 0) {
    emptyMsg.style.display = "block";
    totalEl.style.display = "none";
    return;
  }

  emptyMsg.style.display = "none";
  let total = 0;
  container.innerHTML = "";
  cart.forEach((item) => {
    total += item.price;
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <img src="${item.img}" alt="${item.title}">
      <div>${item.title}</div>
      <div>₹${item.price}</div>
    `;
    container.appendChild(div);
  });
  totalEl.textContent = "Total: ₹" + total;
}
