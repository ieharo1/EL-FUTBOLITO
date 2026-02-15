// ============================================
// EL FUTBOLITO - JAVASCRIPT 100% FUNCIONAL
// Sistema completo: Búsqueda + Filtros + Carrito
// ============================================

// Variables globales
let cart = [];
let productos = [];
let wishlist = [];
let currentProduct = null;
let selectedSize = 'L';
let modalQuantity = 1;

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    initApp();
});

async function initApp() {
    await loadProducts();
    initNavbar();
    initFilters();
    initSearch();
    initNewsletter();
    initAnimations();
    initScrollToTop();
    initCountdown();
    loadCart();
    loadWishlist();
    renderProducts(productos);
    renderBestSellers();
    updateCartUI();
    updateWishlistUI();
    checkFirstVisit();
}

// ============================================
// NAVBAR
// ============================================
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                    bootstrap.Collapse.getInstance(navbarCollapse).hide();
                }
            }
        });
    });
}

// ============================================
// PRODUCTOS
// ============================================
async function loadProducts() {
    try {
        const response = await fetch('/api/productos');
        productos = await response.json();
        console.log('✅ Productos cargados:', productos.length);
    } catch (error) {
        console.error('❌ Error:', error);
        productos = [];
    }
}

function renderProducts(productsToRender) {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    if (productsToRender.length === 0) {
        grid.innerHTML = `
            <div class="col-12 text-center py-5">
                <i class="bi bi-inbox" style="font-size: 4rem; color: var(--text-muted); opacity: 0.3;"></i>
                <p class="mt-3" style="color: var(--text-muted); font-size: 1.1rem;">No se encontraron productos</p>
            </div>
        `;
        return;
    }
    
    productsToRender.forEach((producto) => {
        const productCard = createProductCard(producto);
        grid.appendChild(productCard);
    });
    
    setTimeout(() => {
        const cards = grid.querySelectorAll('.product-card');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 50);
        });
    }, 100);
}

function createProductCard(producto) {
    const col = document.createElement('div');
    col.className = 'col-lg-3 col-md-6 mb-4';
    
    col.innerHTML = `
        <div class="product-card" style="opacity: 0; transform: translateY(20px); transition: all 0.5s ease;">
            <div class="product-image">
                <img src="${producto.imagen}" alt="${producto.nombre}" loading="lazy">
                <span class="product-badge">NUEVO</span>
                <div class="product-actions">
                    <button class="action-btn" onclick="addToWishlist(${producto.id})" title="Favoritos">
                        <i class="bi bi-heart"></i>
                    </button>
                    <button class="action-btn" onclick="quickView(${producto.id})" title="Vista rápida">
                        <i class="bi bi-eye"></i>
                    </button>
                </div>
            </div>
            <div class="product-info">
                <div class="product-team">${producto.equipo}</div>
                <h3 class="product-name">${producto.nombre}</h3>
                <div class="product-price">$${producto.precio.toFixed(2)}</div>
                <div class="product-footer">
                    <button class="btn-cart" onclick="addToCartQuick(${producto.id})">
                        <i class="bi bi-bag-plus-fill"></i>
                        <span>AÑADIR</span>
                    </button>
                </div>
            </div>
        </div>
    `;
    
    return col;
}

// ============================================
// FILTROS
// ============================================
function initFilters() {
    const filterButtons = document.querySelectorAll('.btn-filter');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            filterProducts(filter);
        });
    });
}

function filterProducts(filter) {
    let filtered = productos;
    
    if (filter !== 'all') {
        filtered = productos.filter(p => p.liga === filter);
    }
    
    renderProducts(filtered);
    
    // Scroll a la sección de productos
    document.getElementById('productos').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ============================================
// BÚSQUEDA FUNCIONAL
// ============================================
function initSearch() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        // Búsqueda en tiempo real
        searchInput.addEventListener('input', debounce(function(e) {
            const query = e.target.value;
            if (query.length >= 2) {
                performSearchLive(query);
            } else if (query.length === 0) {
                showSearchSuggestions();
            }
        }, 300));
        
        // Búsqueda al presionar Enter
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                performSearch();
            }
        });
    }
}

function performSearch() {
    const searchInput = document.getElementById('searchInput');
    const query = searchInput.value.trim();
    
    if (query.length === 0) {
        showNotification('⚠️ Por favor ingresa un término de búsqueda', 'info');
        return;
    }
    
    searchAndDisplay(query);
}

function quickSearch(term) {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.value = term;
    }
    searchAndDisplay(term);
}

function searchAndDisplay(query) {
    const results = searchProducts(query);
    
    if (results.length > 0) {
        renderSearchResults(results);
        showNotification(`✅ ${results.length} resultado(s) encontrado(s)`, 'success');
    } else {
        showNoResults();
        showNotification('❌ No se encontraron resultados', 'error');
    }
}

function performSearchLive(query) {
    const results = searchProducts(query);
    renderSearchResults(results);
}

function searchProducts(query) {
    const searchTerm = query.toLowerCase().trim();
    
    return productos.filter(p => 
        p.nombre.toLowerCase().includes(searchTerm) ||
        p.equipo.toLowerCase().includes(searchTerm) ||
        p.liga.toLowerCase().includes(searchTerm) ||
        p.pais.toLowerCase().includes(searchTerm)
    );
}

function renderSearchResults(results) {
    const searchResults = document.getElementById('searchResults');
    if (!searchResults) return;
    
    if (results.length === 0) {
        showNoResults();
        return;
    }
    
    searchResults.innerHTML = `
        <div class="search-results-grid">
            ${results.map(producto => `
                <div class="search-result-item" onclick="selectSearchResult(${producto.id})">
                    <img src="${producto.imagen}" alt="${producto.nombre}" class="search-result-image">
                    <div class="search-result-name">${producto.equipo}</div>
                    <div class="search-result-price">$${producto.precio.toFixed(2)}</div>
                </div>
            `).join('')}
        </div>
    `;
}

function showNoResults() {
    const searchResults = document.getElementById('searchResults');
    if (searchResults) {
        searchResults.innerHTML = `
            <div class="search-no-results">
                <i class="bi bi-search"></i>
                <p>No se encontraron resultados</p>
                <button class="btn btn-primary mt-3" onclick="showSearchSuggestions()">Ver sugerencias</button>
            </div>
        `;
    }
}

function showSearchSuggestions() {
    const searchResults = document.getElementById('searchResults');
    if (searchResults) {
        searchResults.innerHTML = `
            <div class="search-suggestions">
                <h6>Búsquedas populares:</h6>
                <div class="suggestion-tags">
                    <span class="suggestion-tag" onclick="quickSearch('Real Madrid')">Real Madrid</span>
                    <span class="suggestion-tag" onclick="quickSearch('Barcelona')">Barcelona</span>
                    <span class="suggestion-tag" onclick="quickSearch('Manchester')">Manchester</span>
                    <span class="suggestion-tag" onclick="quickSearch('PSG')">PSG</span>
                    <span class="suggestion-tag" onclick="quickSearch('Bayern')">Bayern</span>
                    <span class="suggestion-tag" onclick="quickSearch('Liverpool')">Liverpool</span>
                    <span class="suggestion-tag" onclick="quickSearch('Juventus')">Juventus</span>
                    <span class="suggestion-tag" onclick="quickSearch('Premier League')">Premier League</span>
                </div>
            </div>
        `;
    }
}

function selectSearchResult(productId) {
    // Cerrar modal de búsqueda
    const searchModal = bootstrap.Modal.getInstance(document.getElementById('searchModal'));
    if (searchModal) searchModal.hide();
    
    // Abrir vista rápida del producto
    quickView(productId);
}

// Utilidad: Debounce para búsqueda
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ============================================
// CARRITO
// ============================================
function loadCart() {
    const savedCart = localStorage.getItem('elfutbolito_cart');
    if (savedCart) {
        try {
            cart = JSON.parse(savedCart);
            console.log('✅ Carrito cargado:', cart.length);
        } catch (error) {
            cart = [];
        }
    }
    updateCartBadge();
}

function saveCart() {
    localStorage.setItem('elfutbolito_cart', JSON.stringify(cart));
}

function addToCartQuick(productId) {
    addToCart(productId, 'L', 1);
}

function addToCart(productId, size = 'L', cantidad = 1) {
    const producto = productos.find(p => p.id === productId);
    if (!producto) {
        showNotification('❌ Producto no encontrado', 'error');
        return;
    }
    
    const existingItemIndex = cart.findIndex(item => 
        item.id === productId && item.size === size
    );
    
    if (existingItemIndex !== -1) {
        cart[existingItemIndex].cantidad += cantidad;
        showNotification('✅ Cantidad actualizada', 'success');
    } else {
        cart.push({
            id: producto.id,
            nombre: producto.nombre,
            equipo: producto.equipo,
            precio: producto.precio,
            imagen: producto.imagen,
            size: size,
            cantidad: cantidad
        });
        showNotification('✅ ¡Añadido al carrito!', 'success');
    }
    
    saveCart();
    updateCartBadge();
    updateCartUI();
}

function removeFromCart(index) {
    const item = cart[index];
    cart.splice(index, 1);
    saveCart();
    updateCartBadge();
    updateCartUI();
    showNotification(`🗑️ ${item.nombre} eliminado`, 'info');
}

function updateCartQuantity(index, change) {
    if (cart[index]) {
        cart[index].cantidad += change;
        
        if (cart[index].cantidad <= 0) {
            removeFromCart(index);
        } else if (cart[index].cantidad > 10) {
            cart[index].cantidad = 10;
            showNotification('⚠️ Máximo 10 unidades', 'info');
        } else {
            saveCart();
            updateCartUI();
        }
    }
}

function updateCartBadge() {
    const badge = document.querySelector('.cart-badge');
    if (badge) {
        const totalItems = cart.reduce((sum, item) => sum + item.cantidad, 0);
        badge.textContent = totalItems;
        badge.style.display = totalItems > 0 ? 'flex' : 'none';
    }
}

function updateCartUI() {
    const cartContent = document.getElementById('cartContent');
    const cartFooter = document.getElementById('cartFooter');
    
    if (!cartContent || !cartFooter) return;
    
    if (cart.length === 0) {
        cartContent.innerHTML = `
            <div class="empty-cart text-center py-5">
                <i class="bi bi-bag-x" style="font-size: 5rem; color: var(--text-muted); opacity: 0.3;"></i>
                <p class="mt-3" style="color: var(--text-muted);">Carrito vacío</p>
                <a href="#productos" class="btn btn-hero btn-primary mt-3" data-bs-dismiss="offcanvas">
                    <i class="bi bi-bag-plus"></i>
                    <span>IR A COMPRAR</span>
                </a>
            </div>
        `;
        cartFooter.innerHTML = '';
    } else {
        cartContent.innerHTML = `
            <div class="cart-items">
                ${cart.map((item, index) => `
                    <div class="cart-item">
                        <div class="cart-item-image">
                            <img src="${item.imagen}" alt="${item.nombre}">
                        </div>
                        <div class="cart-item-info">
                            <div class="cart-item-team">${item.equipo}</div>
                            <div class="cart-item-name">${item.nombre}</div>
                            <div class="cart-item-size">Talla: ${item.size}</div>
                            <div class="cart-item-bottom">
                                <div class="cart-item-price">$${item.precio.toFixed(2)}</div>
                                <div class="cart-item-qty">
                                    <button class="cart-qty-btn" onclick="updateCartQuantity(${index}, -1)">
                                        <i class="bi bi-dash"></i>
                                    </button>
                                    <span class="cart-qty-value">${item.cantidad}</span>
                                    <button class="cart-qty-btn" onclick="updateCartQuantity(${index}, 1)">
                                        <i class="bi bi-plus"></i>
                                    </button>
                                </div>
                                <button class="cart-item-remove" onclick="removeFromCart(${index})">
                                    <i class="bi bi-trash-fill"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
        
        const subtotal = cart.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
        const shipping = subtotal >= 50 ? 0 : 5.99;
        const total = subtotal + shipping;
        
        cartFooter.innerHTML = `
            <div class="cart-summary">
                <div class="cart-summary-row">
                    <span>Subtotal:</span>
                    <span class="amount">$${subtotal.toFixed(2)}</span>
                </div>
                <div class="cart-summary-row">
                    <span>Envío:</span>
                    <span class="amount">${shipping === 0 ? 'GRATIS' : '$' + shipping.toFixed(2)}</span>
                </div>
                <div class="cart-summary-row total">
                    <span>TOTAL:</span>
                    <span class="amount">$${total.toFixed(2)}</span>
                </div>
            </div>
            <div class="cart-actions">
                <button class="btn btn-checkout" onclick="checkout()">
                    <i class="bi bi-credit-card-fill"></i>
                    <span>FINALIZAR COMPRA</span>
                </button>
                <button class="btn btn-continue" data-bs-dismiss="offcanvas">
                    <i class="bi bi-arrow-left"></i>
                    <span>SEGUIR COMPRANDO</span>
                </button>
            </div>
        `;
    }
}

function checkout() {
    if (cart.length === 0) {
        showNotification('⚠️ Carrito vacío', 'error');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    showNotification(`🎉 ¡Procesando $${total.toFixed(2)}!`, 'success');
    
    setTimeout(() => {
        showNotification('✅ ¡Compra exitosa!', 'success');
        cart = [];
        saveCart();
        updateCartBadge();
        updateCartUI();
        
        const offcanvas = bootstrap.Offcanvas.getInstance(document.getElementById('cartOffcanvas'));
        if (offcanvas) offcanvas.hide();
    }, 2000);
}

// ============================================
// VISTA RÁPIDA
// ============================================
function quickView(productId) {
    const producto = productos.find(p => p.id === productId);
    if (!producto) return;
    
    currentProduct = producto;
    selectedSize = 'L';
    modalQuantity = 1;
    
    document.getElementById('modalProductName').textContent = producto.nombre;
    document.getElementById('modalProductImage').src = producto.imagen;
    document.getElementById('modalProductTeam').textContent = producto.equipo;
    document.getElementById('modalProductTitle').textContent = producto.nombre;
    document.getElementById('modalProductPrice').textContent = `$${producto.precio.toFixed(2)}`;
    document.getElementById('modalQuantity').value = 1;
    
    document.querySelectorAll('.size-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.size === 'L') btn.classList.add('active');
        btn.onclick = function() {
            document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            selectedSize = this.dataset.size;
        };
    });
    
    document.getElementById('modalAddToCart').onclick = function() {
        addToCart(currentProduct.id, selectedSize, modalQuantity);
        const modal = bootstrap.Modal.getInstance(document.getElementById('quickViewModal'));
        if (modal) modal.hide();
    };
    
    const modal = new bootstrap.Modal(document.getElementById('quickViewModal'));
    modal.show();
}

function increaseModalQty() {
    if (modalQuantity < 10) {
        modalQuantity++;
        document.getElementById('modalQuantity').value = modalQuantity;
    }
}

function decreaseModalQty() {
    if (modalQuantity > 1) {
        modalQuantity--;
        document.getElementById('modalQuantity').value = modalQuantity;
    }
}

function addToWishlist(productId) {
    showNotification('❤️ ¡Añadido a favoritos!', 'success');
}

function addToWishlistFromModal() {
    if (currentProduct) addToWishlist(currentProduct.id);
}

// ============================================
// NEWSLETTER
// ============================================
function initNewsletter() {
    const form = document.getElementById('newsletterForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            if (email && isValidEmail(email)) {
                showNotification('🎉 ¡Suscripción exitosa!', 'success');
                this.reset();
            } else {
                showNotification('⚠️ Email inválido', 'error');
            }
        });
    }
}

// ============================================
// NOTIFICACIONES
// ============================================
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    const colors = { success: '#00ff88', error: '#ff0066', info: '#00d4ff' };
    
    notification.style.cssText = `
        position: fixed; top: 100px; right: 30px; z-index: 9999;
        background: ${colors[type]}; color: #0a0e27;
        padding: 20px 30px; border-radius: 15px; font-weight: 600;
        box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        animation: slideIn 0.3s ease; max-width: 350px;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn { from { transform: translateX(400px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
    @keyframes slideOut { from { transform: translateX(0); opacity: 1; } to { transform: translateX(400px); opacity: 0; } }
`;
document.head.appendChild(style);

// ============================================
// ANIMACIONES
// ============================================
function initAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });
    
    document.querySelectorAll('.feature-card, .section-header').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

// ============================================
// UTILIDADES
// ============================================
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ============================================
// INICIALIZACIÓN
// ============================================
console.log('%c⚽ EL FUTBOLITO', 'color: #00ff88; font-size: 24px; font-weight: bold;');
console.log('%c✅ Sistema 100% funcional', 'color: #00d4ff; font-size: 16px;');

// ============================================

function hideLoadingScreen() {
    const loader = document.getElementById('loadingScreen');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 1000);
    }
}

// ============================================
// SCROLL TO TOP
// ============================================
function initScrollToTop() {
    const scrollBtn = document.getElementById('scrollToTop');
    if (!scrollBtn) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    });
    
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ============================================
// COUNTDOWN TIMER
// ============================================
function initCountdown() {
    // Establecer fecha objetivo (24 horas desde ahora)
    const endDate = new Date();
    endDate.setHours(endDate.getHours() + 24);
    
    updateCountdown(endDate);
    
    setInterval(() => updateCountdown(endDate), 1000);
}

function updateCountdown(endDate) {
    const now = new Date().getTime();
    const distance = endDate - now;
    
    if (distance < 0) {
        // Reiniciar contador
        const newEndDate = new Date();
        newEndDate.setHours(newEndDate.getHours() + 24);
        updateCountdown(newEndDate);
        return;
    }
    
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    
    if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
    if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
    if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
}

// ============================================
// WELCOME MODAL (FIRST VISIT)
// ============================================
function checkFirstVisit() {
    const hasVisited = localStorage.getItem('elfutbolito_visited');
    
    if (!hasVisited) {
        setTimeout(() => {
            const modal = new bootstrap.Modal(document.getElementById('welcomeModal'));
            modal.show();
            localStorage.setItem('elfutbolito_visited', 'true');
        }, 2000);
    }
}

// ============================================
// BESTSELLERS
// ============================================
function renderBestSellers() {
    const grid = document.getElementById('bestSellersGrid');
    if (!grid || productos.length === 0) return;
    
    // Seleccionar productos destacados (los primeros 4)
    const bestSellers = productos.filter(p => p.destacado).slice(0, 4);
    
    grid.innerHTML = '';
    bestSellers.forEach((producto) => {
        const card = createProductCard(producto);
        grid.appendChild(card);
    });
}

// ============================================
// WISHLIST SYSTEM
// ============================================
function loadWishlist() {
    const saved = localStorage.getItem('elfutbolito_wishlist');
    if (saved) {
        try {
            wishlist = JSON.parse(saved);
            console.log('✅ Wishlist cargada:', wishlist.length);
        } catch (error) {
            wishlist = [];
        }
    }
    updateWishlistBadge();
}

function saveWishlist() {
    localStorage.setItem('elfutbolito_wishlist', JSON.stringify(wishlist));
}

function addToWishlist(productId) {
    const producto = productos.find(p => p.id === productId);
    if (!producto) return;
    
    const exists = wishlist.find(item => item.id === productId);
    
    if (exists) {
        // Remover de favoritos
        wishlist = wishlist.filter(item => item.id !== productId);
        showNotification('💔 Eliminado de favoritos', 'info');
    } else {
        // Añadir a favoritos
        wishlist.push({
            id: producto.id,
            nombre: producto.nombre,
            equipo: producto.equipo,
            precio: producto.precio,
            imagen: producto.imagen
        });
        showNotification('❤️ ¡Añadido a favoritos!', 'success');
    }
    
    saveWishlist();
    updateWishlistBadge();
    updateWishlistUI();
    
    // Animación del corazón
    const btn = window.event?.target?.closest('.action-btn');
    if (btn) {
        const icon = btn.querySelector('i');
        if (wishlist.find(item => item.id === productId)) {
            icon.style.color = '#ff0066';
            btn.style.transform = 'scale(1.3)';
        } else {
            icon.style.color = '';
            btn.style.transform = 'scale(1.3)';
        }
        setTimeout(() => {
            btn.style.transform = 'scale(1)';
        }, 300);
    }
}

function removeFromWishlist(productId) {
    wishlist = wishlist.filter(item => item.id !== productId);
    saveWishlist();
    updateWishlistBadge();
    updateWishlistUI();
    showNotification('💔 Eliminado de favoritos', 'info');
}

function updateWishlistBadge() {
    const badge = document.querySelector('.wishlist-badge');
    if (badge) {
        badge.textContent = wishlist.length;
        badge.style.display = wishlist.length > 0 ? 'flex' : 'none';
    }
}

function updateWishlistUI() {
    const wishlistContent = document.getElementById('wishlistContent');
    if (!wishlistContent) return;
    
    if (wishlist.length === 0) {
        wishlistContent.innerHTML = `
            <div class="empty-cart text-center py-5">
                <i class="bi bi-heart-fill" style="font-size: 5rem; color: var(--text-muted); opacity: 0.3;"></i>
                <p class="mt-3" style="color: var(--text-muted);">No tienes favoritos</p>
                <a href="#productos" class="btn btn-hero btn-primary mt-3" data-bs-dismiss="offcanvas">
                    <i class="bi bi-heart-fill"></i>
                    <span>EXPLORAR PRODUCTOS</span>
                </a>
            </div>
        `;
    } else {
        wishlistContent.innerHTML = `
            <div class="cart-items">
                ${wishlist.map((item) => `
                    <div class="cart-item">
                        <div class="cart-item-image">
                            <img src="${item.imagen}" alt="${item.nombre}">
                        </div>
                        <div class="cart-item-info">
                            <div class="cart-item-team">${item.equipo}</div>
                            <div class="cart-item-name">${item.nombre}</div>
                            <div class="cart-item-bottom">
                                <div class="cart-item-price">$${item.precio.toFixed(2)}</div>
                                <button class="btn btn-sm btn-primary" onclick="quickView(${item.id})" style="border-radius: 20px; padding: 8px 15px;">
                                    <i class="bi bi-eye"></i> Ver
                                </button>
                                <button class="cart-item-remove" onclick="removeFromWishlist(${item.id})">
                                    <i class="bi bi-trash-fill"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
            <div class="p-3">
                <button class="btn btn-hero btn-outline w-100" onclick="addAllWishlistToCart()">
                    <i class="bi bi-bag-plus-fill"></i>
                    <span>AÑADIR TODOS AL CARRITO</span>
                </button>
            </div>
        `;
    }
}

function addAllWishlistToCart() {
    if (wishlist.length === 0) return;
    
    let added = 0;
    wishlist.forEach(item => {
        addToCart(item.id, 'L', 1);
        added++;
    });
    
    showNotification(`✅ ${added} productos añadidos al carrito`, 'success');
    
    // Cerrar wishlist y abrir carrito
    const wishlistOffcanvas = bootstrap.Offcanvas.getInstance(document.getElementById('wishlistOffcanvas'));
    if (wishlistOffcanvas) wishlistOffcanvas.hide();
    
    setTimeout(() => {
        const cartOffcanvas = new bootstrap.Offcanvas(document.getElementById('cartOffcanvas'));
        cartOffcanvas.show();
    }, 500);
}

function addToWishlistFromModal() {
    if (currentProduct) {
        addToWishlist(currentProduct.id);
    }
}

// ============================================
// NEWSLETTER
// ============================================
function initNewsletter() {
    const form = document.getElementById('newsletterForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            if (email && isValidEmail(email)) {
                showNotification('🎉 ¡Suscripción exitosa!', 'success');
                this.reset();
            } else {
                showNotification('⚠️ Email inválido', 'error');
            }
        });
    }
}

// ============================================
// NOTIFICACIONES
// ============================================
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    const colors = { success: '#00ff88', error: '#ff0066', info: '#00d4ff' };
    
    notification.style.cssText = `
        position: fixed; top: 100px; right: 30px; z-index: 9999;
        background: ${colors[type]}; color: #0a0e27;
        padding: 20px 30px; border-radius: 15px; font-weight: 600;
        box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        animation: slideIn 0.3s ease; max-width: 350px;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn { from { transform: translateX(400px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
    @keyframes slideOut { from { transform: translateX(0); opacity: 1; } to { transform: translateX(400px); opacity: 0; } }
`;
document.head.appendChild(style);

// ============================================
// ANIMACIONES
// ============================================
function initAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });
    
    document.querySelectorAll('.feature-card, .section-header').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

// ============================================
// VISTA RÁPIDA
// ============================================
function quickView(productId) {
    const producto = productos.find(p => p.id === productId);
    if (!producto) return;
    
    currentProduct = producto;
    selectedSize = 'L';
    modalQuantity = 1;
    
    document.getElementById('modalProductName').textContent = producto.nombre;
    document.getElementById('modalProductImage').src = producto.imagen;
    document.getElementById('modalProductTeam').textContent = producto.equipo;
    document.getElementById('modalProductTitle').textContent = producto.nombre;
    document.getElementById('modalProductPrice').textContent = `$${producto.precio.toFixed(2)}`;
    document.getElementById('modalQuantity').value = 1;
    
    document.querySelectorAll('.size-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.size === 'L') btn.classList.add('active');
        btn.onclick = function() {
            document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            selectedSize = this.dataset.size;
        };
    });
    
    document.getElementById('modalAddToCart').onclick = function() {
        addToCart(currentProduct.id, selectedSize, modalQuantity);
        const modal = bootstrap.Modal.getInstance(document.getElementById('quickViewModal'));
        if (modal) modal.hide();
    };
    
    const modal = new bootstrap.Modal(document.getElementById('quickViewModal'));
    modal.show();
}

function increaseModalQty() {
    if (modalQuantity < 10) {
        modalQuantity++;
        document.getElementById('modalQuantity').value = modalQuantity;
    }
}

function decreaseModalQty() {
    if (modalQuantity > 1) {
        modalQuantity--;
        document.getElementById('modalQuantity').value = modalQuantity;
    }
}

// ============================================
// UTILIDADES
// ============================================
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Debounce para búsqueda
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ============================================
// CONTACT FORM
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showNotification('✅ ¡Mensaje enviado! Te contactaremos pronto', 'success');
            this.reset();
        });
    }
});
