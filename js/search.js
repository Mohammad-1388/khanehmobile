// ✅ داده‌ها
const products = [
  { name: "iPhone 17 Pro", price: "2,900,000", category: "موبایل", image: "./images/products/iphone/17promax.jpg", url: "./pages/products/iphone/17promax.html" },
  { name: "iPhone 16 Pro", price: "2,800,000", category: "موبایل", image: "./images/products/iphone/16promax.jpg", url: "./pages/products/iphone/16promax.html" },
  { name: "iPhone 15 Pro", price: "2,700,000", category: "موبایل", image: "./images/products/iphone/15promax.jpg", url: "./pages/products/iphone/15promax.html" },
  { name: "iPhone 14 Pro", price: "2,600,000", category: "موبایل", image: "./images/products/iphone/14promax.jpg", url: "./pages/products/iphone/14promax.html" },

  { name: "Samsung S25 Ultra", price: "2,500,000", category: "موبایل", image: "./images/products/samsung/s25ultra.jpg", url: "./pages/products/samsung/s25ultra.html" },
  { name: "Samsung S24 Ultra", price: "2,400,000", category: "موبایل", image: "./images/products/samsung/s24ultra.jpg", url: "./pages/products/samsung/s24ultra.html" },
  { name: "Samsung S23 Ultra", price: "2,300,000", category: "موبایل", image: "./images/products/samsung/s23ultra.jpg", url: "./pages/products/samsung/s23ultra.html" },
  { name: "Samsung S22 Ultra", price: "2,200,000", category: "موبایل", image: "./images/products/samsung/s22ultra.jpg", url: "./pages/products/samsung/s22ultra.html" },

  { name: "Xiaomi 17 Promax", price: "2,100,000", category: "موبایل", image: "./images/products/shiaumi/17promax.jpg", url: "./pages/products/shiaumi/17promax.html" },
  { name: "Xiaomi 16 Promax", price: "2,000,000", category: "موبایل", image: "./images/products/shiaumi/16promax.jpg", url: "./pages/products/shiaumi/16promax.html" },
  { name: "Xiaomi 15 Pro", price: "1,900,000", category: "موبایل", image: "./images/products/shiaumi/15pro.jpg", url: "./pages/products/shiaumi/15pro.html" },
  { name: "Xiaomi 14 Pro", price: "1,800,000", category: "موبایل", image: "./images/products/shiaumi/14pro.jpg", url: "./pages/products/shiaumi/14pro.html" },

  { name: "Huavie P 100 Pro", price: "1,700,000", category: "موبایل", image: "./images/products/huavie/p100pro.jpg", url: "./pages/products/huavie/p100pro.html" },
  { name: "Huavie P 90 Pro", price: "1,600,000", category: "موبایل", image: "./images/products/huavie/p90pro.jpg", url: "./pages/products/huavie/p90pro.html" },
  { name: "Huavie P 80 Pro", price: "1,500,000", category: "موبایل", image: "./images/products/huavie/p80pro.jpg", url: "./pages/products/huavie/p80pro.html" },
  { name: "Huavie P 70 Pro", price: "1,400,000", category: "موبایل", image: "./images/products/huavie/p70pro.jpg", url: "./pages/products/huavie/p70pro.html" },
];

const searchInput = document.getElementById("search-text");
const searchBtn = document.getElementById("btn-search");
const resultsDiv = document.getElementById("search-results");

// ✅ یکسان‌سازی حروف فارسی و انگلیسی
function normalizeText(text) {
  return text.replace(/[ي]/g, "ی").replace(/[ك]/g, "ک").toLowerCase();
}

// ✅ تابع هایلایت
function highlight(text, query) {
  const regex = new RegExp(`(${query})`, "gi");
  return text.replace(regex, "<mark>$1</mark>");
}

// ✅ fuzzy match ساده
function fuzzyMatch(str, query) {
  str = normalizeText(str);
  query = normalizeText(query);
  let lastIndex = -1;
  for (let char of query) {
    const index = str.indexOf(char, lastIndex + 1);
    if (index === -1) return false;
    lastIndex = index;
  }
  return true;
}

// ✅ امتیازدهی هوشمند برای مرتب‌سازی نتایج
function getScore(product, query) {
  const name = normalizeText(product.name);
  const category = normalizeText(product.category);
  query = normalizeText(query);
  let score = 0;
  if (name.includes(query)) score += 5;
  if (category.includes(query)) score += 3;
  if (fuzzyMatch(name, query)) score += 2;
  if (fuzzyMatch(category, query)) score += 1;
  return score;
}

// ✅ تابع جست‌وجو
function performSearch(goToPage = false) {
  const query = normalizeText(searchInput.value.trim());
  resultsDiv.innerHTML = "";

  if (!query) {
    resultsDiv.style.display = "none";
    return;
  }

  const filtered = products
    .map(p => ({ ...p, score: getScore(p, query) }))
    .filter(p => p.score > 0)
    .sort((a, b) => b.score - a.score);

  // ✅ اگر دکمه کلیک شده بود (goToPage = true) → برو به اولین نتیجه
  if (goToPage && filtered.length > 0) {
    window.location.href = filtered[0].url;
    return;
  }

  if (filtered.length === 0) {
    resultsDiv.innerHTML = `<p class="text-center text-danger m-2">نتیجه‌ای پیدا نشد 😕</p>`;
  } else {
    filtered.forEach(p => {
      const item = document.createElement("div");
      item.className = "search-item";
      item.innerHTML = `
        <img src="${p.image}" alt="${p.name}">
        <div>
          <strong>${highlight(p.name, query)}</strong><br>
          <small>دسته: ${highlight(p.category, query)}</small><br>
          <span class="text-success">قیمت: ${p.price} تومان</span>
        </div>
      `;
      item.addEventListener("click", () => window.location.href = p.url);
      resultsDiv.appendChild(item);
    });
  }

  resultsDiv.style.display = "block";
}

// ✅ رویدادها
let timeout;
searchInput.addEventListener("input", () => {
  clearTimeout(timeout);
  timeout = setTimeout(() => performSearch(false), 300); // فقط نمایش نتایج
});

// ✅ وقتی روی دکمه کلیک می‌کنی → برو داخل صفحه‌ی اولین محصول
searchBtn.addEventListener("click", () => performSearch(true));

// ✅ وقتی Enter میزنی → فقط جستجو کن (نره به صفحه)
searchInput.addEventListener("keydown", e => {
  if (e.key === "Enter") performSearch(false);
});


// ✅ تاخیر در جستجو (debounce)
searchInput.addEventListener("input", () => {
  clearTimeout(timeout);
  timeout = setTimeout(performSearch, 300);
});

searchBtn.addEventListener("click", performSearch);
searchInput.addEventListener("keydown", e => {
  if (e.key === "Enter") performSearch();
});