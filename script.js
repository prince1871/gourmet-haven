/* ==========================================
   OFFLINE DATA DATASTORE & ASSET CHANNELS
   ========================================== */
let foodItems = [
    {
        id: 1,
        name: "Artisan Truffle Pizza",
        price: 24.99,
        category: "Mains",
        image: "assets/pizza.jpg",
        desc: "White truffle reduction base layer infused with wild woodland mushrooms and buffalo mozzarella."
    },
    {
        id: 2,
        name: "Smoked Wagyu Burger",
        price: 19.50,
        category: "Mains",
        image: "assets/burger.jpg",
        desc: "Aged Wagyu brisket beef dynamic blend with vintage cheddar and hickory oak charcoal reduction smoke crisp."
    },
    {
        id: 3,
        name: "Crispy Calamari Rings",
        price: 14.25,
        category: "Starters",
        image: "assets/calamari.jpg",
        desc: "Hand-battered premium ocean calamari rings paired alongside scratch citrus operational aioli dips."
    },
    {
        id: 4,
        name: "Lava Chocolate Fondant",
        price: 11.00,
        category: "Desserts",
        image: "assets/dessert.jpg",
        desc: "Molten 70% Belgian dark cacao filling coupled with pure organic Madagascar vanilla bean gelato scoop."
    },
    {
        id: 5,
        name: "Seared Scallop Risotto",
        price: 22.75,
        category: "Mains",
        image: "assets/Seared Scallop Risotto.jpg",
        desc: "Creamy saffron risotto finished with sweet seared scallops, parmesan, and fresh herbs."
    },
    {
        id: 6,
        name: "Herb Roasted Salmon",
        price: 21.50,
        category: "Mains",
        image: "assets/Herb Roasted Salmon.jpg",
        desc: "Crisp-skinned salmon with lemon herb butter, seasonal vegetables, and roasted potatoes."
    },
    {
        id: 7,
        name: "Burrata Bruschetta",
        price: 12.50,
        category: "Starters",
        image: "assets/Burrata Bruschetta.jpg",
        desc: "Grilled sourdough topped with creamy burrata, cherry tomatoes, basil, and balsamic glaze."
    },
    {
        id: 8,
        name: "Garden Caesar Salad",
        price: 10.95,
        category: "Starters",
        image: "assets/Garden Caesar Salad.jpg",
        desc: "Crisp romaine, shaved parmesan, herb croutons, and our house-made Caesar dressing."
    },
    {
        id: 9,
        name: "Spiced Chicken Skewers",
        price: 13.75,
        category: "Starters",
        image: "assets/Spiced Chicken Skewers.jpg",
        desc: "Char-grilled chicken skewers served with smoky pepper sauce and a bright citrus salad."
    },
    {
        id: 10,
        name: "Wild Mushroom Pasta",
        price: 18.25,
        category: "Mains",
        image: "assets/Wild Mushroom Pasta.jpg",
        desc: "Silky pasta tossed with woodland mushrooms, garlic, parmesan, and a touch of truffle oil."
    },
    {
        id: 11,
        name: "Classic Tiramisu",
        price: 9.50,
        category: "Desserts",
        image: "assets/Classic Tiramisu.jpg",
        desc: "Espresso-soaked ladyfingers layered with mascarpone cream and a generous dusting of cocoa."
    },
    {
        id: 12,
        name: "Berry Cheesecake",
        price: 10.25,
        category: "Desserts",
        image: "assets/Berry Cheesecake.jpg",
        desc: "Vanilla bean cheesecake on a buttery biscuit crust with a bright seasonal berry compote."
    }
];

const carouselImages = [
    "assets/hero1.jpg",
    "assets/hero2.jpg",
    "assets/hero3.jpg"
];

let carouselIndex = 0;
let activeMenuCategory = "All";
let cart = [];

// Replace this with the restaurant's WhatsApp number, using country code only (no +, spaces, or dashes).
const WHATSAPP_PHONE_NUMBER = "15559021044";

const categoryIcons = {
    All: "fa-border-all",
    Starters: "fa-bowl-food",
    Mains: "fa-utensils",
    Desserts: "fa-ice-cream"
};

function applyTheme(theme) {
    const isDark = theme === "dark";
    const root = document.documentElement;
    const themeIcon = document.getElementById("theme-icon");
    const themeToggle = document.getElementById("theme-toggle");

    root.classList.toggle("dark", isDark);

    if (themeIcon) {
        themeIcon.className = `fas ${isDark ? "fa-sun" : "fa-moon"} text-base sm:text-lg`;
    }

    if (themeToggle) {
        const nextTheme = isDark ? "light" : "dark";
        themeToggle.setAttribute("aria-label", `Switch to ${nextTheme} mode`);
        themeToggle.setAttribute("title", `Switch to ${nextTheme} mode`);
    }
}

function initializeThemeToggle() {
    const savedTheme = localStorage.getItem("gourmet-haven-theme");
    const preferredTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    applyTheme(savedTheme || preferredTheme);

    document.getElementById("theme-toggle")?.addEventListener("click", () => {
        const nextTheme = document.documentElement.classList.contains("dark") ? "light" : "dark";
        localStorage.setItem("gourmet-haven-theme", nextTheme);
        applyTheme(nextTheme);
    });
}

function rotateCarousel(direction = 1) {
    const carouselImage = document.getElementById("carousel-img");
    if (!carouselImage) return;

    carouselIndex = (carouselIndex + direction + carouselImages.length) % carouselImages.length;
    carouselImage.src = carouselImages[carouselIndex];
}

function escapeHtml(value) {
    const element = document.createElement("div");
    element.textContent = value;
    return element.innerHTML;
}

function renderCategoryFilters() {
    const container = document.getElementById("category-filter-container");
    if (!container) return;

    const categories = ["All", ...new Set(foodItems.map((item) => item.category))];
    container.innerHTML = categories.map((category) => {
        const isActive = category === activeMenuCategory;
        const activeStyles = "bg-orange-500 text-white border-orange-500 shadow-sm shadow-orange-500/30";
        const inactiveStyles = "bg-white text-slate-600 border-slate-200 hover:border-orange-300 hover:text-orange-500 dark:bg-slate-900 dark:text-slate-300 dark:border-slate-700 dark:hover:border-orange-500";
        return `<button type="button" onclick="selectMenuCategory('${category}')" class="shrink-0 inline-flex items-center gap-2 rounded-xl border px-3.5 py-2.5 text-xs font-bold transition ${isActive ? activeStyles : inactiveStyles}"><i class="fas ${categoryIcons[category] || "fa-utensils"}"></i>${category}</button>`;
    }).join("");
}

function renderMenu(items) {
    const grid = document.getElementById("menu-grid");
    const emptyState = document.getElementById("menu-empty-state");
    const resultCount = document.getElementById("menu-result-count");
    if (!grid || !emptyState || !resultCount) return;

    resultCount.textContent = `${items.length} ${items.length === 1 ? "dish" : "dishes"} available`;
    emptyState.classList.toggle("hidden", items.length !== 0);
    grid.classList.toggle("hidden", items.length === 0);

    grid.innerHTML = items.map((item) => `
        <article class="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/60 dark:border-slate-800 dark:bg-slate-900 dark:hover:shadow-black/20">
            <div class="relative flex min-h-52 items-center justify-center overflow-hidden bg-slate-100 p-2 dark:bg-slate-800 sm:aspect-[4/3] sm:min-h-0 sm:p-0">
                <img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.name)}" class="max-h-[280px] w-full object-contain transition duration-500 sm:h-full sm:max-h-none sm:object-cover sm:group-hover:scale-105">
                <span class="absolute left-2 top-2 rounded-full bg-white/95 px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-slate-700 shadow-sm backdrop-blur dark:bg-slate-900/95 dark:text-slate-200 sm:left-3 sm:top-3 sm:px-3 sm:py-1.5 sm:text-[10px]">${escapeHtml(item.category)}</span>
                <span class="absolute right-2 top-2 flex items-center gap-1 rounded-full bg-slate-950/75 px-2 py-1 text-[9px] font-bold text-white backdrop-blur sm:right-3 sm:top-3 sm:px-2.5 sm:py-1.5 sm:text-[10px]"><i class="fas fa-star text-amber-400"></i> 4.9</span>
            </div>
            <div class="p-4 sm:p-5">
                <div class="flex items-start justify-between gap-3">
                    <h3 class="text-base font-bold leading-snug">${escapeHtml(item.name)}</h3>
                    <span class="shrink-0 text-lg font-black text-orange-500">$${Number(item.price).toFixed(2)}</span>
                </div>
                <p class="mt-2 min-h-10 text-xs leading-relaxed text-slate-500 dark:text-slate-400">${escapeHtml(item.desc)}</p>
                <div class="mt-4 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800">
                    <span class="inline-flex items-center gap-1.5 text-[11px] font-semibold text-slate-400"><i class="fas fa-leaf text-emerald-500"></i> Chef's pick</span>
                    <button type="button" onclick="addMenuItemToCart(${item.id})" class="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-3.5 py-2 text-xs font-bold text-white transition hover:bg-orange-500 dark:bg-orange-500 dark:hover:bg-orange-600"><i class="fas fa-plus"></i> Add</button>
                </div>
            </div>
        </article>
    `).join("");
}

function filterMenu() {
    const searchInput = document.getElementById("search-input");
    const query = searchInput ? searchInput.value.trim().toLowerCase() : "";
    const filteredItems = foodItems.filter((item) => {
        const matchesCategory = activeMenuCategory === "All" || item.category === activeMenuCategory;
        const searchableText = `${item.name} ${item.category} ${item.desc}`.toLowerCase();
        return matchesCategory && searchableText.includes(query);
    });
    renderMenu(filteredItems);
}

function selectMenuCategory(category) {
    activeMenuCategory = category;
    renderCategoryFilters();
    filterMenu();
}

function addMenuItemToCart(itemId) {
    const item = foodItems.find((foodItem) => foodItem.id === itemId);
    if (!item) return;

    const cartItem = cart.find((entry) => entry.id === itemId);
    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.push({ ...item, quantity: 1 });
    }

    renderCart();
    showToast("Added to basket", `${item.name} has been added to your order.`, "success");
}

function formatCurrency(amount) {
    return `$${Number(amount).toFixed(2)}`;
}

function getCartTotal() {
    return cart.reduce((total, item) => total + (Number(item.price) * item.quantity), 0);
}

function renderCart() {
    const container = document.getElementById("cart-items-container");
    const total = document.getElementById("cart-total");
    const badge = document.getElementById("cart-badge");
    const checkoutButton = document.querySelector("[onclick='checkoutCart()']");
    if (!container || !total || !badge) return;

    const itemCount = cart.reduce((count, item) => count + item.quantity, 0);
    badge.textContent = itemCount;
    badge.classList.toggle("hidden", itemCount === 0);
    total.textContent = formatCurrency(getCartTotal());

    if (checkoutButton) checkoutButton.disabled = cart.length === 0;

    if (cart.length === 0) {
        container.innerHTML = `
            <div class="h-full min-h-52 flex flex-col items-center justify-center text-center text-slate-500 dark:text-slate-400">
                <i class="fas fa-shopping-basket text-3xl text-orange-300 mb-3"></i>
                <p class="font-semibold text-slate-700 dark:text-slate-200">Your basket is empty</p>
                <p class="mt-1 text-xs">Add something delicious from the menu.</p>
            </div>`;
        return;
    }

    container.innerHTML = cart.map((item) => `
        <article class="flex gap-3 rounded-2xl border border-slate-100 bg-white p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.name)}" class="h-16 w-16 shrink-0 rounded-xl object-cover">
            <div class="min-w-0 flex-1">
                <div class="flex items-start justify-between gap-2">
                    <h4 class="text-sm font-bold leading-snug">${escapeHtml(item.name)}</h4>
                    <button type="button" onclick="removeCartItem(${item.id})" class="shrink-0 rounded-lg p-1.5 text-rose-500 transition hover:bg-rose-50 dark:hover:bg-rose-950/40" aria-label="Remove ${escapeHtml(item.name)}" title="Remove item"><i class="fas fa-trash-alt text-xs"></i></button>
                </div>
                <div class="mt-2 flex items-center justify-between gap-2 text-xs">
                    <span class="text-slate-500 dark:text-slate-400">${item.quantity} × ${formatCurrency(item.price)}</span>
                    <span class="font-bold text-orange-500">${formatCurrency(item.price * item.quantity)}</span>
                </div>
            </div>
        </article>`).join("");
}

function removeCartItem(itemId) {
    const item = cart.find((entry) => entry.id === itemId);
    if (!item) return;

    cart = cart.filter((entry) => entry.id !== itemId);
    renderCart();
    showToast("Removed from basket", `${item.name} has been removed.`, "info");
}

function checkoutCart() {
    if (cart.length === 0) {
        showToast("Your basket is empty", "Add menu items before sending an order.", "error");
        return;
    }

    const orderLines = cart.map((item) => `• ${item.name} × ${item.quantity} — ${formatCurrency(item.price * item.quantity)}`);
    const message = [
        "Hello Gourmet Haven, I would like to place an order:",
        "",
        ...orderLines,
        "",
        `Total: ${formatCurrency(getCartTotal())}`
    ].join("\n");

    window.open(`https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(message)}`, "_blank", "noopener");
}

/* ==========================================
   INITIALIZATION & OPTIMIZED PRELOADER
   ========================================== */
document.addEventListener("DOMContentLoaded", () => {
    initializeThemeToggle();
    const preloader = document.getElementById("preloader");
    
    if (preloader) {
        // Clear pointer restrictions instantly so buttons register clicks immediately
        preloader.style.opacity = "0";
        preloader.style.pointerEvents = "none";
        preloader.classList.add("opacity-0");
        
        // Safely remove the structural node once the main rendering thread clears
        setTimeout(() => {
            if (preloader.parentNode) {
                preloader.remove();
            }
        }, 50);
    }

    renderCategoryFilters();
    filterMenu();
    renderCart();
    setInterval(() => rotateCarousel(), 5000);
});

/* Global Mobile Sidebar Toggle Controllers */
function toggleMobileMenu() {
    const sidebar = document.getElementById("mobile-sidebar");
    const backdrop = document.getElementById("mobile-sidebar-backdrop");
    if (!sidebar || !backdrop) return;

    const isOpen = sidebar.classList.contains("translate-x-full");
    if (isOpen) {
        sidebar.classList.remove("translate-x-full");
        backdrop.classList.remove("hidden");
    } else {
        sidebar.classList.add("translate-x-full");
        backdrop.classList.add("hidden");
    }
}

/* Overriding State Driven Basket Cart Sidebar View Layout Toggles */
function toggleCart() {
    const cartSidebar = document.getElementById("cart-sidebar");
    const cartBackdrop = document.getElementById("cart-sidebar-backdrop");
    if (!cartSidebar || !cartBackdrop) return;

    const isOpen = cartSidebar.classList.contains("translate-x-full");
    if (isOpen) {
        cartSidebar.classList.remove("translate-x-full");
        cartBackdrop.classList.remove("hidden");
    } else {
        cartSidebar.classList.add("translate-x-full");
        cartBackdrop.classList.add("hidden");
    }
}

/* User Termination Session Flow Controller */
function triggerLogout() {
    showToast("Session Termination", "De-authenticating credentials token state...", "info");
    setTimeout(() => {
        window.location.href = "login.html";
    }, 1200);
}

/* Adaptive UI Toast Notification Placement Stack Engine Layout Node Injection */
function showToast(title, body, statusType = "info") {
    const container = document.getElementById("notification-container");
    if (!container) return;

    const toast = document.createElement("div");
    toast.style.pointerEvents = "auto";
    
    let colors = "bg-white dark:bg-slate-900 text-slate-800 dark:text-white border-l-4 border-blue-500";
    let icon = "fas fa-info-circle text-blue-500";
    if (statusType === "success") {
        colors = "bg-white dark:bg-slate-900 text-slate-800 dark:text-white border-l-4 border-emerald-500";
        icon = "fas fa-check-circle text-emerald-500";
    } else if (statusType === "error") {
        colors = "bg-white dark:bg-slate-900 text-slate-800 dark:text-white border-l-4 border-rose-500";
        icon = "fas fa-exclamation-triangle text-rose-500";
    }

    toast.className = `${colors} p-3.5 rounded-xl shadow-xl flex items-start gap-3 w-full transition-all duration-300 transform translate-x-10 opacity-0 border dark:border-slate-800/80`;
    toast.innerHTML = `
        <i class="${icon} text-base mt-0.5"></i>
        <div class="flex-1 min-w-0">
            <h4 class="font-bold text-xs uppercase tracking-wide truncate">${title}</h4>
            <p class="text-slate-500 dark:text-slate-400 text-xs mt-0.5 leading-snug">${body}</p>
        </div>
    `;

    container.appendChild(toast);
    
    requestAnimationFrame(() => {
        toast.classList.remove("translate-x-10", "opacity-0");
    });

    setTimeout(() => {
        toast.classList.add("translate-x-10", "opacity-0");
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}
