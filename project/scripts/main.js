const products = [
  { id: 1, name: "Sourdough Loaf", price: 4.5, category: "bread", description: "Slow-fermented, crispy crust.", isFavorite: false },
  { id: 2, name: "Baguette", price: 3.2, category: "bread", description: "Classic French-style baguette.", isFavorite: false },
  { id: 3, name: "Chocolate Croissant", price: 3.0, category: "pastry", description: "Buttery layers with dark chocolate.", isFavorite: false },
  { id: 4, name: "Almond Croissant", price: 3.4, category: "pastry", description: "Filled with almond cream and sliced almonds.", isFavorite: false },
  { id: 5, name: "Cinnamon Roll", price: 2.8, category: "sweet", description: "Soft roll with cinnamon sugar glaze.", isFavorite: false },
  { id: 6, name: "Lemon Tart", price: 4.0, category: "sweet", description: "Tangy lemon filling with butter crust.", isFavorite: false }
];

const FAVORITES_KEY = "dulceAromaFavorites";
const CATEGORY_KEY = "dulceAromaCategory";

function loadFavorites() {
  const raw = localStorage.getItem(FAVORITES_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function saveFavorites(ids) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(ids));
}

function getSavedCategory() {
  return localStorage.getItem(CATEGORY_KEY) || "all";
}

function saveCategory(category) {
  localStorage.setItem(CATEGORY_KEY, category);
}

function renderFeatured() {
  const container = document.querySelector("#featuredProducts");
  if (!container) return;

  const favorites = loadFavorites();
  const featured = products.slice(0, 3);

  container.innerHTML = "";

  featured.forEach((product) => {
    const isFav = favorites.includes(product.id);
    const card = `
      <article class="card" data-id="${product.id}">
        <h3>${product.name}</h3>
        <p class="card-meta">$${product.price.toFixed(2)} · ${product.category}</p>
        <p>${product.description}</p>
        <button class="fav-btn" type="button">
          ${isFav ? "★ Saved" : "☆ Save"}
        </button>
      </article>
    `;
    container.insertAdjacentHTML("beforeend", card);
  });

  container.addEventListener("click", (event) => {
    if (!event.target.classList.contains("fav-btn")) return;
    const card = event.target.closest(".card");
    const id = Number(card.dataset.id);
    toggleFavorite(id);
    renderFeatured();
  }, { once: true });
}

function renderProductsPage() {
  const grid = document.querySelector("#productGrid");
  const filterSelect = document.querySelector("#categoryFilter");
  if (!grid || !filterSelect) return;

  const savedCategory = getSavedCategory();
  filterSelect.value = savedCategory;

  function applyFilter() {
    const category = filterSelect.value;
    saveCategory(category);
    const favorites = loadFavorites();

    const filtered = category === "all"
      ? products
      : products.filter((p) => p.category === category);

    grid.innerHTML = "";
    filtered.forEach((product) => {
      const isFav = favorites.includes(product.id);
      const card = `
        <article class="card" data-id="${product.id}">
          <h3>${product.name}</h3>
          <p class="card-meta">$${product.price.toFixed(2)} · ${product.category}</p>
          <p>${product.description}</p>
          <button class="fav-btn" type="button">
            ${isFav ? "★ Saved" : "☆ Save"}
          </button>
        </article>
      `;
      grid.insertAdjacentHTML("beforeend", card);
    });
  }

  filterSelect.addEventListener("change", applyFilter);

  grid.addEventListener("click", (event) => {
    if (!event.target.classList.contains("fav-btn")) return;
    const card = event.target.closest(".card");
    const id = Number(card.dataset.id);
    toggleFavorite(id);
    applyFilter();
  });

  applyFilter();
}

function toggleFavorite(id) {
  const current = loadFavorites();
  const exists = current.includes(id);
  const updated = exists ? current.filter((favId) => favId !== id) : [...current, id];
  saveFavorites(updated);
}

function initMenuToggle() {
  const button = document.querySelector("#menuToggle");
  const nav = document.querySelector("#siteNav");
  if (!button || !nav) return;

  button.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    button.setAttribute("aria-expanded", String(isOpen));
  });
}

function setYear() {
  const yearSpan = document.querySelector("#year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initMenuToggle();
  setYear();
  renderFeatured();
  renderProductsPage();
});
