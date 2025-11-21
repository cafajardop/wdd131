const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005-08-07",
    area: 11500,
    imageUrl: "images/aba-nigeria.webp"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888-05-21",
    area: 74792,
    imageUrl: "images/manti-utah.webp"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015-06-07",
    area: 96630,
    imageUrl: "images/payson-utah.jpg"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020-05-02",
    area: 68625,
    imageUrl: "images/yigo-guam.jpg"
  },
  {
    templeName: "Salt Lake",
    location: "Salt Lake City, Utah, United States",
    dedicated: "1893-04-06",
    area: 382207,
    imageUrl: "images/salt-lake.jpg"
  },
  {
    templeName: "Tokyo Japan",
    location: "Tokyo, Japan",
    dedicated: "1980-10-27",
    area: 52490,
    imageUrl: "images/tokyo-japan.jpg"
  },
  {
    templeName: "Rome Italy",
    location: "Rome, Italy",
    dedicated: "2019-03-10",
    area: 41010,
    imageUrl: "images/rome-italy.jpg"
  },
  {
    templeName: "Freiberg Germany",
    location: "Freiberg, Germany",
    dedicated: "1985-06-29",
    area: 7470,
    imageUrl: "images/freiberg-germany.webp"
  },
];

const templesContainer = document.querySelector("#temples");

function renderTemples(list) {
  templesContainer.innerHTML = "";

  list.forEach((temple) => {
    const card = document.createElement("article");
    card.classList.add("temple-card");

    const title = document.createElement("h2");
    title.textContent = temple.templeName;

    const location = document.createElement("p");
    location.innerHTML = `<span class="label">Location:</span> ${temple.location}`;

    const dedicatedDate = new Date(temple.dedicated);
    const dedicated = document.createElement("p");
    dedicated.innerHTML = `<span class="label">Dedicated:</span> ${dedicatedDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })}`;

    const area = document.createElement("p");
    area.innerHTML = `<span class="label">Size:</span> ${temple.area.toLocaleString()} sq ft`;

    const img = document.createElement("img");
    img.src = temple.imageUrl;
    img.alt = temple.templeName;
    img.loading = "lazy";

    card.appendChild(title);
    card.appendChild(location);
    card.appendChild(dedicated);
    card.appendChild(area);
    card.appendChild(img);

    templesContainer.appendChild(card);
  });
}

function applyFilter(filter) {
  let filtered = temples;

  switch (filter) {
    case "old":
      filtered = temples.filter((t) => new Date(t.dedicated).getFullYear() < 1900);
      break;
    case "new":
      filtered = temples.filter((t) => new Date(t.dedicated).getFullYear() > 2000);
      break;
    case "large":
      filtered = temples.filter((t) => t.area > 90000);
      break;
    case "small":
      filtered = temples.filter((t) => t.area < 10000);
      break;
    case "home":
    default:
      filtered = temples;
  }

  renderTemples(filtered);
}

document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const filter = link.dataset.filter;
    applyFilter(filter);
  });
});

function updateFooterInfo() {
  document.querySelector("#current-year").textContent = new Date().getFullYear();
  document.querySelector("#last-modified").textContent = document.lastModified;
}

document.addEventListener("DOMContentLoaded", () => {
  renderTemples(temples);
  updateFooterInfo();
});
