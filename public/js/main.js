// ============================================
// EL FUTBOLITO - JAVASCRIPT FUNCIONAL
// ============================================

let cart = [];
let productos = [];
let wishlist = [];
let currentProduct = null;
let selectedSize = 'L';
let modalQuantity = 1;

// PRODUCTOS HARDCODED - SIEMPRE DISPONIBLES
const PRODUCTOS_DEFAULT = [
    {id: 1, nombre: "Real Madrid 24/25 Local", equipo: "Real Madrid", liga: "La Liga", pais: "España", precio: 89.99, imagen: "https://images.unsplash.com/photo-1522778526097-ce0a22ceb253?w=400&h=400&fit=crop", destacado: true},
    {id: 2, nombre: "Barcelona 24/25 Local", equipo: "FC Barcelona", liga: "La Liga", pais: "España", precio: 89.99, imagen: "https://images.unsplash.com/photo-1551958219-acbc608c6377?w=400&h=400&fit=crop", destacado: true},
    {id: 3, nombre: "Atlético Madrid Local", equipo: "Atlético Madrid", liga: "La Liga", pais: "España", precio: 84.99, imagen: "https://images.unsplash.com/photo-1614632537239-e3a5fd7c1f4e?w=400&h=400&fit=crop", destacado: false},
    {id: 4, nombre: "Manchester City Local", equipo: "Manchester City", liga: "Premier League", pais: "Inglaterra", precio: 88.99, imagen: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400&h=400&fit=crop", destacado: true},
    {id: 5, nombre: "Liverpool 24/25 Local", equipo: "Liverpool FC", liga: "Premier League", pais: "Inglaterra", precio: 88.99, imagen: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=400&fit=crop", destacado: true},
    {id: 6, nombre: "Manchester United Local", equipo: "Manchester United", liga: "Premier League", pais: "Inglaterra", precio: 85.99, imagen: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=400&h=400&fit=crop", destacado: true},
    {id: 7, nombre: "Chelsea 24/25 Local", equipo: "Chelsea FC", liga: "Premier League", pais: "Inglaterra", precio: 84.99, imagen: "https://images.unsplash.com/photo-1606925797300-0b35e9d1794e?w=400&h=400&fit=crop", destacado: false},
    {id: 8, nombre: "Arsenal 24/25 Local", equipo: "Arsenal FC", liga: "Premier League", pais: "Inglaterra", precio: 87.99, imagen: "https://images.unsplash.com/photo-1511556820780-d912e42b4980?w=400&h=400&fit=crop", destacado: true},
    {id: 9, nombre: "Juventus 24/25 Local", equipo: "Juventus", liga: "Serie A", pais: "Italia", precio: 86.99, imagen: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=400&h=400&fit=crop", destacado: true},
    {id: 10, nombre: "AC Milan Local", equipo: "AC Milan", liga: "Serie A", pais: "Italia", precio: 85.99, imagen: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=400&h=400&fit=crop", destacado: true},
    {id: 11, nombre: "Inter Milan Local", equipo: "Inter Milan", liga: "Serie A", pais: "Italia", precio: 85.99, imagen: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=400&h=400&fit=crop", destacado: true},
    {id: 12, nombre: "Bayern Munich Local", equipo: "Bayern Munich", liga: "Bundesliga", pais: "Alemania", precio: 87.99, imagen: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=400&fit=crop", destacado: true},
    {id: 13, nombre: "Borussia Dortmund Local", equipo: "Borussia Dortmund", liga: "Bundesliga", pais: "Alemania", precio: 84.99, imagen: "https://images.unsplash.com/photo-1553778263-73a83bab9b0c?w=400&h=400&fit=crop", destacado: true},
    {id: 14, nombre: "PSG 24/25 Local", equipo: "Paris Saint-Germain", liga: "Ligue 1", pais: "Francia", precio: 92.99, imagen: "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=400&h=400&fit=crop", destacado: true},
    {id: 15, nombre: "Napoli Local", equipo: "SSC Napoli", liga: "Serie A", pais: "Italia", precio: 83.99, imagen: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=400&h=400&fit=crop", destacado: false},
    {id: 16, nombre: "Tottenham Local", equipo: "Tottenham", liga: "Premier League", pais: "Inglaterra", precio: 83.99, imagen: "https://images.unsplash.com/photo-1577212017308-2f0cbf5a8a8c?w=400&h=400&fit=crop", destacado: false},
    {id: 17, nombre: "RB Leipzig Local", equipo: "RB Leipzig", liga: "Bundesliga", pais: "Alemania", precio: 79.99, imagen: "https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?w=400&h=400&fit=crop", destacado: false},
    {id: 18, nombre: "Marseille Local", equipo: "Olympique Marseille", liga: "Ligue 1", pais: "Francia", precio: 79.99, imagen: "https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=400&h=400&fit=crop", destacado: false},
    {id: 19, nombre: "AS Roma Local", equipo: "AS Roma", liga: "Serie A", pais: "Italia", precio: 82.99, imagen: "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=400&h=400&fit=crop", destacado: false},
    {id: 20, nombre: "Valencia CF Local", equipo: "Valencia CF", liga: "La Liga", pais: "España", precio: 79.99, imagen: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=400&h=400&fit=crop", destacado: false}
];

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Iniciando El Futbolito...');
    initApp();
});

async function initApp() {
    // CARGAR PRODUCTOS DEL ADMIN SI EXISTEN
    const adminProductos = localStorage.getItem('admin_productos');
    if (adminProductos) {
        productos = JSON.parse(adminProductos);
        console.log('✅ Productos cargados desde Admin:', productos.length);
    } else {
        // Usar productos por defecto
        productos = [...PRODUCTOS_DEFAULT];
        console.log('✅ Productos por defecto:', productos.length);
    }
    
    // Inicializar todo
    initNavbar();
    initFilters();
    initSearch();
    initCountdown();
    loadCart();
    loadWishlist();
    
    // RENDERIZAR PRODUCTOS
    console.log('🎨 Renderizando productos...');
    renderProducts(productos);
    renderBestSellers();
    renderOfertas();
    
    updateCartUI();
    updateWishlistUI();
    initScrollToTop();
    initForms();
    
    console.log('✅ Aplicación lista!');
}

// ============================================
// RENDERIZADO DE PRODUCTOS
// ============================================
function renderProducts(productsToRender) {
    const grid = document.getElementById('productsGrid');
    if (!grid) {
        console.error('❌ No se encontró #productsGrid');
        return;
    }
    
    grid.innerHTML = '';
    
    if (!productsToRender || productsToRender.length === 0) {
        grid.innerHTML = '<div class="col-12 text-center py-5"><p style="color: #8892b0;">No hay productos</p></div>';
        return;
    }
    
    console.log('✅ Mostrando', productsToRender.length, 'productos');
    
    productsToRender.forEach((producto) => {
        const col = document.createElement('div');
        col.className = 'col-lg-3 col-md-6 mb-4';
        
        col.innerHTML = `
            <div class="product-card">
                <div class="product-image">
                    <img src="${producto.imagen}" alt="${producto.nombre}" loading="lazy">
                    <span class="product-badge">NUEVO</span>
                    <div class="product-actions">
                        <button class="action-btn" onclick="addToWishlist(${producto.id})">
                            <i class="bi bi-heart"></i>
                        </button>
                        <button class="action-btn" onclick="quickView(${producto.id})">
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
        
        grid.appendChild(col);
    });
}

function renderBestSellers() {
    const grid = document.getElementById('bestSellersGrid');
    if (!grid) return;
    
    const bestSellers = productos.filter(p => p.destacado).slice(0, 4);
    grid.innerHTML = '';
    
    bestSellers.forEach(producto => {
        const col = document.createElement('div');
        col.className = 'col-lg-3 col-md-6 mb-4';
        col.innerHTML = `
            <div class="product-card">
                <div class="product-image">
                    <img src="${producto.imagen}" alt="${producto.nombre}">
                    <span class="product-badge">TOP</span>
                </div>
                <div class="product-info">
                    <div class="product-team">${producto.equipo}</div>
                    <h3 class="product-name">${producto.nombre}</h3>
                    <div class="product-price">$${producto.precio.toFixed(2)}</div>
                    <div class="product-footer">
                        <button class="btn-cart" onclick="addToCartQuick(${producto.id})">
                            <i class="bi bi-bag-plus-fill"></i> AÑADIR
                        </button>
                    </div>
                </div>
            </div>
        `;
        grid.appendChild(col);
    });
}

function renderOfertas() {
    const grid = document.getElementById('ofertasGrid');
    if (!grid) return;
    
    // Primero intentar cargar ofertas desde admin
    const adminProductos = localStorage.getItem('admin_productos');
    let ofertasDisponibles = [];
    
    if (adminProductos) {
        const adminProds = JSON.parse(adminProductos);
        ofertasDisponibles = adminProds.filter(p => p.enOferta);
    }
    
    // Si no hay ofertas marcadas en admin, usar productos por defecto
    if (ofertasDisponibles.length === 0) {
        ofertasDisponibles = productos.slice(0, 4);
    }
    
    grid.innerHTML = '';
    
    ofertasDisponibles.forEach(producto => {
        const col = document.createElement('div');
        col.className = 'col-lg-3 col-md-6 mb-4';
        col.innerHTML = `
            <div class="product-card">
                <div class="product-image">
                    <img src="${producto.imagen}" alt="${producto.nombre}">
                    <span class="product-badge" style="background: #ff0066;">🔥 OFERTA</span>
                </div>
                <div class="product-info">
                    <div class="product-team">${producto.equipo}</div>
                    <h3 class="product-name">${producto.nombre}</h3>
                    <div class="product-price">$${producto.precio.toFixed(2)}</div>
                    <div class="product-footer">
                        <button class="btn-cart" onclick="addToCartQuick(${producto.id})">
                            <i class="bi bi-bag-plus-fill"></i> AÑADIR
                        </button>
                    </div>
                </div>
            </div>
        `;
        grid.appendChild(col);
    });
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
    console.log('🔍 Filtrando por:', filter);
    let filtered = filter === 'all' ? productos : productos.filter(p => p.liga === filter);
    renderProducts(filtered);
    document.getElementById('productos').scrollIntoView({ behavior: 'smooth' });
}

// ============================================
// CARRITO
// ============================================
function loadCart() {
    const saved = localStorage.getItem('elfutbolito_cart');
    if (saved) cart = JSON.parse(saved);
    updateCartBadge();
}

function saveCart() {
    localStorage.setItem('elfutbolito_cart', JSON.stringify(cart));
}

function addToCartQuick(productId) {
    addToCart(productId, 'L', 1);
}

function addToCart(productId, size, cantidad) {
    const producto = productos.find(p => p.id === productId);
    if (!producto) return;
    
    const existingIndex = cart.findIndex(item => item.id === productId && item.size === size);
    
    if (existingIndex !== -1) {
        cart[existingIndex].cantidad += cantidad;
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
    }
    
    saveCart();
    updateCartBadge();
    updateCartUI();
    showNotification('✅ Añadido al carrito!', 'success');
}

function updateCartBadge() {
    const badge = document.querySelector('.cart-badge');
    if (badge) {
        const total = cart.reduce((sum, item) => sum + item.cantidad, 0);
        badge.textContent = total;
        badge.style.display = total > 0 ? 'flex' : 'none';
    }
}

function updateCartUI() {
    const content = document.getElementById('cartContent');
    const footer = document.getElementById('cartFooter');
    if (!content || !footer) return;
    
    if (cart.length === 0) {
        content.innerHTML = '<div class="empty-cart text-center py-5"><i class="bi bi-bag-x" style="font-size: 5rem; opacity: 0.3;"></i><p class="mt-3">Carrito vacío</p></div>';
        footer.innerHTML = '';
        return;
    }
    
    content.innerHTML = '<div class="cart-items">' + cart.map((item, index) => `
        <div class="cart-item">
            <div class="cart-item-image"><img src="${item.imagen}" alt="${item.nombre}"></div>
            <div class="cart-item-info">
                <div class="cart-item-team">${item.equipo}</div>
                <div class="cart-item-name">${item.nombre}</div>
                <div class="cart-item-size">Talla: ${item.size}</div>
                <div class="cart-item-bottom">
                    <div class="cart-item-price">$${item.precio.toFixed(2)}</div>
                    <div class="cart-item-qty">
                        <button class="cart-qty-btn" onclick="updateCartQuantity(${index}, -1)"><i class="bi bi-dash"></i></button>
                        <span class="cart-qty-value">${item.cantidad}</span>
                        <button class="cart-qty-btn" onclick="updateCartQuantity(${index}, 1)"><i class="bi bi-plus"></i></button>
                    </div>
                    <button class="cart-item-remove" onclick="removeFromCart(${index})"><i class="bi bi-trash-fill"></i></button>
                </div>
            </div>
        </div>
    `).join('') + '</div>';
    
    const subtotal = cart.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    const shipping = subtotal >= 50 ? 0 : 5.99;
    const total = subtotal + shipping;
    
    footer.innerHTML = `
        <div class="cart-summary">
            <div class="cart-summary-row"><span>Subtotal:</span><span>$${subtotal.toFixed(2)}</span></div>
            <div class="cart-summary-row"><span>Envío:</span><span>${shipping === 0 ? 'GRATIS' : '$' + shipping.toFixed(2)}</span></div>
            <div class="cart-summary-row total"><span>TOTAL:</span><span class="amount">$${total.toFixed(2)}</span></div>
        </div>
        <div class="cart-actions">
            <button class="btn btn-checkout" onclick="checkout()"><i class="bi bi-credit-card-fill"></i> FINALIZAR COMPRA</button>
            <button class="btn btn-continue" data-bs-dismiss="offcanvas"><i class="bi bi-arrow-left"></i> SEGUIR COMPRANDO</button>
        </div>
    `;
}

function updateCartQuantity(index, change) {
    cart[index].cantidad += change;
    if (cart[index].cantidad <= 0) {
        removeFromCart(index);
    } else {
        saveCart();
        updateCartUI();
    }
}

function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    updateCartBadge();
    updateCartUI();
}

function checkout() {
    showNotification('🎉 Procesando compra...', 'success');
    setTimeout(() => {
        cart = [];
        saveCart();
        updateCartBadge();
        updateCartUI();
        showNotification('✅ ¡Compra exitosa!', 'success');
    }, 2000);
}

// ============================================
// WISHLIST
// ============================================
function loadWishlist() {
    const saved = localStorage.getItem('elfutbolito_wishlist');
    if (saved) wishlist = JSON.parse(saved);
    updateWishlistBadge();
}

function addToWishlist(productId) {
    const producto = productos.find(p => p.id === productId);
    if (!producto) return;
    
    const exists = wishlist.find(item => item.id === productId);
    if (exists) {
        wishlist = wishlist.filter(item => item.id !== productId);
        showNotification('💔 Eliminado de favoritos', 'info');
    } else {
        wishlist.push(producto);
        showNotification('❤️ Añadido a favoritos', 'success');
    }
    
    localStorage.setItem('elfutbolito_wishlist', JSON.stringify(wishlist));
    updateWishlistBadge();
    updateWishlistUI();
}

function updateWishlistBadge() {
    const badge = document.querySelector('.wishlist-badge');
    if (badge) {
        badge.textContent = wishlist.length;
        badge.style.display = wishlist.length > 0 ? 'flex' : 'none';
    }
}

function updateWishlistUI() {
    const content = document.getElementById('wishlistContent');
    if (!content) return;
    
    if (wishlist.length === 0) {
        content.innerHTML = '<div class="empty-cart text-center py-5"><i class="bi bi-heart-fill" style="font-size: 5rem; opacity: 0.3;"></i><p class="mt-3">Sin favoritos</p></div>';
    } else {
        content.innerHTML = '<div class="cart-items">' + wishlist.map(item => `
            <div class="cart-item">
                <div class="cart-item-image"><img src="${item.imagen}" alt="${item.nombre}"></div>
                <div class="cart-item-info">
                    <div class="cart-item-team">${item.equipo}</div>
                    <div class="cart-item-name">${item.nombre}</div>
                    <div class="cart-item-bottom">
                        <div class="cart-item-price">$${item.precio.toFixed(2)}</div>
                        <button class="cart-item-remove" onclick="addToWishlist(${item.id})"><i class="bi bi-trash-fill"></i></button>
                    </div>
                </div>
            </div>
        `).join('') + '</div>';
    }
}

// ============================================
// BÚSQUEDA
// ============================================
function initSearch() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const query = e.target.value.toLowerCase();
            if (query.length >= 2) {
                const results = productos.filter(p => 
                    p.nombre.toLowerCase().includes(query) ||
                    p.equipo.toLowerCase().includes(query) ||
                    p.liga.toLowerCase().includes(query)
                );
                renderSearchResults(results);
            }
        });
    }
}

function renderSearchResults(results) {
    const container = document.getElementById('searchResults');
    if (!container) return;
    
    if (results.length === 0) {
        container.innerHTML = '<p class="text-center text-muted p-4">No se encontraron resultados</p>';
        return;
    }
    
    container.innerHTML = '<div class="search-results-grid">' + results.map(p => `
        <div class="search-result-item" onclick="quickView(${p.id})">
            <img src="${p.imagen}" alt="${p.nombre}" class="search-result-image">
            <div class="search-result-name">${p.equipo}</div>
            <div class="search-result-price">$${p.precio.toFixed(2)}</div>
        </div>
    `).join('') + '</div>';
}

function quickView(productId) {
    const producto = productos.find(p => p.id === productId);
    if (!producto) return;
    
    // CERRAR MODAL DE BÚSQUEDA SI ESTÁ ABIERTO
    const searchModal = document.getElementById('searchModal');
    if (searchModal) {
        const modalInstance = bootstrap.Modal.getInstance(searchModal);
        if (modalInstance) {
            modalInstance.hide();
        }
    }
    
    currentProduct = producto;
    selectedSize = 'L';
    modalQuantity = 1;
    
    document.getElementById('modalProductName').textContent = producto.nombre;
    document.getElementById('modalProductImage').src = producto.imagen;
    document.getElementById('modalProductTeam').textContent = producto.equipo;
    document.getElementById('modalProductTitle').textContent = producto.nombre;
    document.getElementById('modalProductPrice').textContent = `$${producto.precio.toFixed(2)}`;
    document.getElementById('modalQuantity').value = 1;
    
    // Configurar botones de talla
    document.querySelectorAll('.size-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.size === 'L') btn.classList.add('active');
        btn.onclick = function() {
            document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            selectedSize = this.dataset.size;
        };
    });
    
    // Configurar botón de añadir al carrito
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

function addToWishlistFromModal() {
    if (currentProduct) {
        addToWishlist(currentProduct.id);
    }
}

// ============================================
// UTILIDADES
// ============================================
function initNavbar() {
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            navbar.classList.toggle('scrolled', window.scrollY > 50);
        }
    });
}

function initScrollToTop() {
    const btn = document.getElementById('scrollToTop');
    if (!btn) return;
    
    window.addEventListener('scroll', () => {
        btn.classList.toggle('visible', window.scrollY > 500);
    });
    
    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

function initCountdown() {
    const endDate = new Date();
    endDate.setHours(endDate.getHours() + 24);
    
    setInterval(() => {
        const now = new Date().getTime();
        const distance = endDate - now;
        
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');
        
        if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
        if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
        if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
    }, 1000);
}

function initForms() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showNotification('✅ Mensaje enviado!', 'success');
            this.reset();
        });
    }
    
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showNotification('🎉 ¡Suscrito!', 'success');
            this.reset();
        });
    }
}

function showNotification(message, type = 'info') {
    const colors = { success: '#00ff88', error: '#ff0066', info: '#00d4ff' };
    const notification = document.createElement('div');
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

console.log('%c⚽ EL FUTBOLITO', 'color: #00ff88; font-size: 24px; font-weight: bold;');
console.log('%c✅ Sistema 100% funcional', 'color: #00d4ff; font-size: 16px;');
