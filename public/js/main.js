// ============================================
// EL FUTBOLITO - MAIN JAVASCRIPT
// Sistema de carrito completamente funcional
// ============================================

// Variables globales
let cart = [];
let productos = [];
let currentProduct = null;
let selectedSize = 'L';
let modalQuantity = 1;

// Inicialización cuando el DOM está listo
document.addEventListener('DOMContentLoaded', function() {
    initApp();
});

// Función principal de inicialización
async function initApp() {
    await loadProducts();
    initNavbar();
    initFilters();
    initNewsletter();
    initAnimations();
    loadCart();
    renderProducts(productos);
    updateCartUI();
}

// ============================================
// NAVBAR FUNCTIONALITY
// ============================================
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Smooth scroll para enlaces
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Cerrar navbar en móvil
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    bootstrap.Collapse.getInstance(navbarCollapse).hide();
                }
            }
        });
    });
}

// ============================================
// PRODUCTS FUNCTIONALITY
// ============================================
async function loadProducts() {
    try {
        const response = await fetch('/api/productos');
        productos = await response.json();
        console.log('✅ Productos cargados:', productos.length);
    } catch (error) {
        console.error('❌ Error cargando productos:', error);
        // Productos de respaldo
        productos = [
            {
                id: 1,
                nombre: "Real Madrid 24/25 Local",
                equipo: "Real Madrid",
                precio: 89.99,
                imagen: "https://images.unsplash.com/photo-1522778526097-ce0a22ceb253?w=400&h=400&fit=crop",
                liga: "liga"
            },
            {
                id: 2,
                nombre: "Barcelona 24/25 Local",
                equipo: "FC Barcelona",
                precio: 89.99,
                imagen: "https://images.unsplash.com/photo-1551958219-acbc608c6377?w=400&h=400&fit=crop",
                liga: "liga"
            },
            {
                id: 3,
                nombre: "Manchester United Local",
                equipo: "Manchester United",
                precio: 85.99,
                imagen: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400&h=400&fit=crop",
                liga: "premier"
            },
            {
                id: 4,
                nombre: "PSG 24/25 Local",
                equipo: "Paris Saint-Germain",
                precio: 92.99,
                imagen: "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=400&h=400&fit=crop",
                liga: "ligue1"
            },
            {
                id: 5,
                nombre: "Bayern Munich Local",
                equipo: "Bayern Munich",
                precio: 87.99,
                imagen: "https://images.unsplash.com/photo-1606925797300-0b35e9d1794e?w=400&h=400&fit=crop",
                liga: "bundesliga"
            },
            {
                id: 6,
                nombre: "Liverpool 24/25 Local",
                equipo: "Liverpool FC",
                precio: 88.99,
                imagen: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=400&fit=crop",
                liga: "premier"
            },
            {
                id: 7,
                nombre: "Juventus 24/25 Local",
                equipo: "Juventus",
                precio: 86.99,
                imagen: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=400&h=400&fit=crop",
                liga: "serie-a"
            },
            {
                id: 8,
                nombre: "Chelsea 24/25 Local",
                equipo: "Chelsea FC",
                precio: 84.99,
                imagen: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=400&h=400&fit=crop",
                liga: "premier"
            }
        ];
    }
}

function renderProducts(productsToRender) {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    productsToRender.forEach((producto, index) => {
        const productCard = createProductCard(producto, index);
        grid.appendChild(productCard);
    });
    
    // Añadir animaciones escalonadas
    setTimeout(() => {
        const cards = grid.querySelectorAll('.product-card');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
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
                    <button class="action-btn" onclick="addToWishlist(${producto.id})" title="Añadir a favoritos">
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
// FILTER FUNCTIONALITY
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
}

// ============================================
// CART FUNCTIONALITY - COMPLETAMENTE FUNCIONAL
// ============================================

function loadCart() {
    const savedCart = localStorage.getItem('elfutbolito_cart');
    if (savedCart) {
        try {
            cart = JSON.parse(savedCart);
            console.log('✅ Carrito cargado:', cart.length, 'items');
        } catch (error) {
            console.error('❌ Error cargando carrito:', error);
            cart = [];
        }
    }
    updateCartBadge();
}

function saveCart() {
    localStorage.setItem('elfutbolito_cart', JSON.stringify(cart));
    console.log('💾 Carrito guardado');
}

function addToCartQuick(productId) {
    const producto = productos.find(p => p.id === productId);
    if (!producto) return;
    
    addToCart(productId, 'L', 1);
}

function addToCart(productId, size = 'L', cantidad = 1) {
    const producto = productos.find(p => p.id === productId);
    if (!producto) {
        showNotification('❌ Producto no encontrado', 'error');
        return;
    }
    
    // Buscar si ya existe en el carrito con la misma talla
    const existingItemIndex = cart.findIndex(item => 
        item.id === productId && item.size === size
    );
    
    if (existingItemIndex !== -1) {
        // Si existe, aumentar cantidad
        cart[existingItemIndex].cantidad += cantidad;
        showNotification('✅ Cantidad actualizada en el carrito', 'success');
    } else {
        // Si no existe, añadir nuevo item
        cart.push({
            id: producto.id,
            nombre: producto.nombre,
            equipo: producto.equipo,
            precio: producto.precio,
            imagen: producto.imagen,
            size: size,
            cantidad: cantidad
        });
        showNotification('✅ ¡Producto añadido al carrito!', 'success');
    }
    
    saveCart();
    updateCartBadge();
    updateCartUI();
    
    // Animación del botón
    const btn = window.event?.target?.closest('.btn-cart') || window.event?.target?.closest('.btn-hero');
    if (btn) {
        btn.style.transform = 'scale(0.9)';
        setTimeout(() => {
            btn.style.transform = 'scale(1)';
        }, 200);
    }
}

function removeFromCart(index) {
    const item = cart[index];
    cart.splice(index, 1);
    saveCart();
    updateCartBadge();
    updateCartUI();
    showNotification(`🗑️ ${item.nombre} eliminado del carrito`, 'info');
}

function updateCartQuantity(index, change) {
    if (cart[index]) {
        cart[index].cantidad += change;
        
        if (cart[index].cantidad <= 0) {
            removeFromCart(index);
        } else if (cart[index].cantidad > 10) {
            cart[index].cantidad = 10;
            showNotification('⚠️ Máximo 10 unidades por producto', 'info');
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
        // Carrito vacío
        cartContent.innerHTML = `
            <div class="empty-cart text-center py-5">
                <i class="bi bi-bag-x" style="font-size: 5rem; color: var(--text-muted); opacity: 0.3;"></i>
                <p class="mt-3" style="color: var(--text-muted); font-size: 1.1rem;">Tu carrito está vacío</p>
                <a href="#productos" class="btn btn-hero btn-primary mt-3" data-bs-dismiss="offcanvas">
                    <i class="bi bi-bag-plus"></i>
                    <span>IR A COMPRAR</span>
                </a>
            </div>
        `;
        cartFooter.innerHTML = '';
    } else {
        // Carrito con productos
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
        
        // Calcular totales
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

function clearCart() {
    cart = [];
    saveCart();
    updateCartBadge();
    updateCartUI();
    showNotification('🗑️ Carrito vaciado', 'info');
}

function checkout() {
    if (cart.length === 0) {
        showNotification('⚠️ Tu carrito está vacío', 'error');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    const items = cart.reduce((sum, item) => sum + item.cantidad, 0);
    
    showNotification(`🎉 ¡Procesando compra de ${items} artículos por $${total.toFixed(2)}!`, 'success');
    
    // Aquí integrarías tu pasarela de pago
    console.log('💳 Checkout:', { cart, total });
    
    // Simular compra exitosa
    setTimeout(() => {
        showNotification('✅ ¡Compra exitosa! Gracias por tu pedido', 'success');
        clearCart();
        
        // Cerrar offcanvas
        const offcanvas = bootstrap.Offcanvas.getInstance(document.getElementById('cartOffcanvas'));
        if (offcanvas) offcanvas.hide();
    }, 2000);
}

// ============================================
// QUICK VIEW MODAL
// ============================================

function quickView(productId) {
    const producto = productos.find(p => p.id === productId);
    if (!producto) return;
    
    currentProduct = producto;
    selectedSize = 'L';
    modalQuantity = 1;
    
    // Actualizar modal
    document.getElementById('modalProductName').textContent = producto.nombre;
    document.getElementById('modalProductImage').src = producto.imagen;
    document.getElementById('modalProductTeam').textContent = producto.equipo;
    document.getElementById('modalProductTitle').textContent = producto.nombre;
    document.getElementById('modalProductPrice').textContent = `$${producto.precio.toFixed(2)}`;
    document.getElementById('modalQuantity').value = 1;
    
    // Reset size selection
    document.querySelectorAll('.size-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.size === 'L') {
            btn.classList.add('active');
        }
    });
    
    // Event listeners para tallas
    document.querySelectorAll('.size-btn').forEach(btn => {
        btn.onclick = function() {
            document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            selectedSize = this.dataset.size;
        };
    });
    
    // Event listener para añadir al carrito
    document.getElementById('modalAddToCart').onclick = function() {
        addToCart(currentProduct.id, selectedSize, modalQuantity);
        
        // Cerrar modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('quickViewModal'));
        if (modal) modal.hide();
    };
    
    // Mostrar modal
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
    
    const btn = window.event?.target?.closest('.action-btn');
    if (btn) {
        btn.style.transform = 'scale(1.3)';
        btn.querySelector('i').style.color = '#ff0066';
        setTimeout(() => {
            btn.style.transform = 'scale(1)';
        }, 300);
    }
}

function addToWishlistFromModal() {
    if (currentProduct) {
        addToWishlist(currentProduct.id);
    }
}

// ============================================
// NEWSLETTER FUNCTIONALITY
// ============================================
function initNewsletter() {
    const form = document.getElementById('newsletterForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            if (email && isValidEmail(email)) {
                showNotification('🎉 ¡Gracias por suscribirte! Revisa tu email', 'success');
                this.reset();
            } else {
                showNotification('⚠️ Por favor ingresa un email válido', 'error');
            }
        });
    }
}

// ============================================
// NOTIFICATIONS
// ============================================
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const colors = {
        success: '#00ff88',
        error: '#ff0066',
        info: '#00d4ff'
    };
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 30px;
        background: ${colors[type] || colors.info};
        color: #0a0e27;
        padding: 20px 30px;
        border-radius: 15px;
        font-weight: 600;
        z-index: 9999;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        animation: slideIn 0.3s ease;
        max-width: 350px;
        font-size: 0.95rem;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Añadir animaciones CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(400px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(400px); opacity: 0; }
    }
`;
document.head.appendChild(style);

// ============================================
// ANIMATIONS
// ============================================
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    const animatedElements = document.querySelectorAll('.feature-card, .section-header');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

// ============================================
// LOAD MORE PRODUCTS
// ============================================
const loadMoreBtn = document.getElementById('loadMore');
if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', function() {
        showNotification('📦 Cargando más productos...', 'info');
        setTimeout(() => {
            showNotification('✅ Todos los productos están cargados', 'info');
        }, 1000);
    });
}

// ============================================
// UTILIDADES
// ============================================
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ============================================
// LOG DE INICIALIZACIÓN
// ============================================
console.log('%c⚽ EL FUTBOLITO', 'color: #00ff88; font-size: 24px; font-weight: bold;');
console.log('%c🛒 Sistema de carrito 100% funcional', 'color: #00d4ff; font-size: 16px;');
console.log('%c✅ Todo listo para usar', 'color: #00ff88; font-size: 14px;');
