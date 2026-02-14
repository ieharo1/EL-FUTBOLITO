// ============================================
// EL FUTBOLITO - MAIN JAVASCRIPT
// ============================================

// Variables globales
let cart = [];
let productos = [];

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
    initCart();
    renderProducts(productos);
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
        console.log('Productos cargados:', productos.length);
    } catch (error) {
        console.error('Error cargando productos:', error);
        // Productos de respaldo si falla la API
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

function createProductCard(producto, index) {
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
                    <button class="btn-cart" onclick="addToCart(${producto.id})">
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
            // Remover clase active de todos los botones
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Añadir clase active al botón clickeado
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
// CART FUNCTIONALITY
// ============================================
function initCart() {
    // Cargar carrito del localStorage
    const savedCart = localStorage.getItem('elfutbolito_cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartBadge();
    }
}

function addToCart(productId) {
    const producto = productos.find(p => p.id === productId);
    if (!producto) return;
    
    // Verificar si ya está en el carrito
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.cantidad++;
    } else {
        cart.push({
            ...producto,
            cantidad: 1
        });
    }
    
    // Guardar en localStorage
    localStorage.setItem('elfutbolito_cart', JSON.stringify(cart));
    
    // Actualizar UI
    updateCartBadge();
    showNotification('¡Producto añadido al carrito!', 'success');
    
    // Animación del botón
    const btn = event.target.closest('.btn-cart');
    if (btn) {
        btn.style.transform = 'scale(0.9)';
        setTimeout(() => {
            btn.style.transform = 'scale(1)';
        }, 200);
    }
}

function updateCartBadge() {
    const badge = document.querySelector('.cart-badge');
    if (badge) {
        const totalItems = cart.reduce((sum, item) => sum + item.cantidad, 0);
        badge.textContent = totalItems;
        
        if (totalItems > 0) {
            badge.style.display = 'flex';
        } else {
            badge.style.display = 'none';
        }
    }
}

function addToWishlist(productId) {
    showNotification('¡Añadido a favoritos!', 'success');
    
    // Animación del corazón
    const btn = event.target.closest('.action-btn');
    if (btn) {
        btn.style.transform = 'scale(1.3)';
        btn.style.color = '#ff0066';
        setTimeout(() => {
            btn.style.transform = 'scale(1)';
        }, 300);
    }
}

function quickView(productId) {
    const producto = productos.find(p => p.id === productId);
    if (producto) {
        showNotification(`Vista rápida: ${producto.nombre}`, 'info');
        // Aquí podrías abrir un modal con más detalles
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
            
            // Simular envío
            showNotification('¡Gracias por suscribirte! 🎉', 'success');
            this.reset();
        });
    }
}

// ============================================
// NOTIFICATIONS
// ============================================
function showNotification(message, type = 'info') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 30px;
        background: ${type === 'success' ? '#00ff88' : type === 'error' ? '#ff0066' : '#00d4ff'};
        color: #0a0e27;
        padding: 20px 30px;
        border-radius: 15px;
        font-weight: 600;
        z-index: 9999;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        animation: slideIn 0.3s ease;
        max-width: 300px;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Añadir animaciones CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ============================================
// ANIMATIONS
// ============================================
function initAnimations() {
    // Intersection Observer para animaciones al hacer scroll
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
    
    // Observar elementos
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
        showNotification('Cargando más productos...', 'info');
        // Aquí podrías cargar más productos desde la API
        setTimeout(() => {
            showNotification('No hay más productos disponibles', 'info');
        }, 1000);
    });
}

// ============================================
// UTILIDADES
// ============================================

// Formatear precio
function formatPrice(price) {
    return `$${price.toFixed(2)}`;
}

// Validar email
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Log de inicialización
console.log('%c⚽ EL FUTBOLITO - Tienda Online', 'color: #00ff88; font-size: 20px; font-weight: bold;');
console.log('%cSistema inicializado correctamente', 'color: #00d4ff; font-size: 14px;');
