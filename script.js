// ----------------------------
// PRODUCT LIST
// ----------------------------
const products = [
  { id: 1, name: "Fresh Cow Milk", price: 4.99, category: "milk", img: "milk1.jpg" },
  { id: 2, name: "Goat Milk", price: 5.49, category: "milk", img: "milk2.jpg" },
  { id: 3, name: "Cheddar Cheese", price: 6.99, category: "cheese", img: "cheese1.jpg" },
  { id: 4, name: "Mozzarella Cheese", price: 7.49, category: "cheese", img: "cheese2.jpg" },
  { id: 5, name: "Greek Yogurt", price: 3.99, category: "yogurt", img: "yogurt1.jpg" },
  { id: 6, name: "Strawberry Yogurt", price: 4.49, category: "yogurt", img: "yogurt2.jpg" },
  { id: 7, name: "Salted Butter", price: 2.99, category: "butter", img: "butter1.jpg" },
  { id: 8, name: "Unsalted Butter", price: 3.29, category: "butter", img: "butter2.jpg" }
];

// ----------------------------
// SAVE & LOAD CART
// ----------------------------
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

// ----------------------------
// UPDATE CART COUNT IN NAVBAR
// ----------------------------
function updateCartCount() {
  const countElement = document.querySelector("#cart-count");
  if (countElement) {
    countElement.textContent = cart.length;
  }
}
updateCartCount();

// ----------------------------
// DISPLAY PRODUCTS
// ----------------------------
function displayProducts(list, containerId = "product-list") {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = "";

  list.forEach(product => {
    const item = document.createElement("div");
    item.classList.add("product-card");

    item.innerHTML = `
      <img src="${product.img}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>$${product.price.toFixed(2)}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;

    container.appendChild(item);
  });
}

// ----------------------------
// ADD TO CART
// ----------------------------
function addToCart(id) {
  const product = products.find(p => p.id === id);
  cart.push(product);
  saveCart();
  alert("Item added to cart!");
}

// ----------------------------
// SEARCH PRODUCTS
// ----------------------------
function searchProducts() {
  const query = document.getElementById("search-box").value.toLowerCase();
  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(query)
  );
  displayProducts(filtered);
}

// ----------------------------
// FILTER BY CATEGORY
// ----------------------------
function filterCategory(cat) {
  if (cat === "all") {
    displayProducts(products);
  } else {
    const filtered = products.filter(p => p.category === cat);
    displayProducts(filtered);
  }
}

// ----------------------------
// SORT PRODUCTS BY PRICE
// ----------------------------
function sortPrice(order) {
  const sorted = [...products].sort((a, b) =>
    order === "low" ? a.price - b.price : b.price - a.price
  );
  displayProducts(sorted);
}

// ----------------------------
// DISPLAY CART ITEMS
// ----------------------------
function loadCartPage() {
  const cartContainer = document.getElementById("cart-items");
  const totalBox = document.getElementById("total-price");
  if (!cartContainer || !totalBox) return;

  cartContainer.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;

    const div = document.createElement("div");
    div.classList.add("cart-item");

    div.innerHTML = `
      <p>${item.name} - $${item.price.toFixed(2)}</p>
      <button onclick="removeItem(${index})">Remove</button>
    `;

    cartContainer.appendChild(div);
  });

  totalBox.textContent = "$" + total.toFixed(2);
}

// ----------------------------
// REMOVE ITEM
// ----------------------------
function removeItem(index) {
  cart.splice(index, 1);
  saveCart();
  loadCartPage();
}

// ----------------------------
// CLEAR CART
// ----------------------------
function clearCart() {
  cart = [];
  saveCart();
  loadCartPage();
}

// ----------------------------
// CHECKOUT – PAYMENT PAGE
// ----------------------------
function togglePayment(e) {
  const cardDiv = document.getElementById("card-details");

  if (e.value === "card") {
    cardDiv.style.display = "block";
  } else {
    cardDiv.style.display = "none";
  }
}

// ----------------------------
// PLACE ORDER
// ----------------------------
function placeOrder() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  alert("Order placed successfully!");
  clearCart();
  window.location.href = "thankyou.html";
}

// ----------------------------
// INITIAL LOADING
// ----------------------------
window.onload = () => {
  if (document.getElementById("product-list")) displayProducts(products);
  if (document.getElementById("cart-items")) loadCartPage();
};
