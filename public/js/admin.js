// ============================================
// ADMIN PANEL - EL FUTBOLITO
// ============================================

let productos = [];
let nextId = 33; // Continuamos desde el último ID

// Verificar si ya hay sesión
if (localStorage.getItem('admin_logged_in') === 'true') {
    showAdminPanel();
}

// ============================================
// LOGIN
// ============================================
function login(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Credenciales simples (en producción usar autenticación real)
    if (username === 'admin' && password === 'admin123') {
        localStorage.setItem('admin_logged_in', 'true');
        showNotification('✅ Inicio de sesión exitoso', 'success');
        showAdminPanel();
    } else {
        showNotification('❌ Credenciales incorrectas', 'error');
    }
}

function logout() {
    localStorage.removeItem('admin_logged_in');
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('adminPanel').style.display = 'none';
    showNotification('👋 Sesión cerrada', 'info');
}

function showAdminPanel() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('adminPanel').style.display = 'block';
    loadProducts();
}

// ============================================
// PRODUCTOS
// ============================================
async function loadProducts() {
    try {
        const response = await fetch('/api/productos');
        productos = await response.json();
        renderProducts();
        
        // Actualizar nextId
        if (productos.length > 0) {
            const maxId = Math.max(...productos.map(p => p.id));
            nextId = maxId + 1;
        }
    } catch (error) {
        console.error('Error cargando productos:', error);
        showNotification('❌ Error cargando productos', 'error');
    }
}

function renderProducts() {
    const container = document.getElementById('productsList');
    const countEl = document.getElementById('productCount');
    
    countEl.textContent = productos.length;
    
    if (productos.length === 0) {
        container.innerHTML = `
            <div class="text-center py-5" style="color: var(--text-muted);">
                <i class="bi bi-inbox" style="font-size: 3rem; opacity: 0.3;"></i>
                <p class="mt-3">No hay productos aún</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = productos.map(producto => `
        <div class="product-item">
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <div class="product-info">
                <div class="product-name">${producto.nombre}</div>
                <div style="color: var(--text-muted); font-size: 0.9rem;">
                    ${producto.equipo} • ${producto.liga}
                </div>
                <div class="product-price">$${producto.precio.toFixed(2)}</div>
            </div>
            <button class="btn-delete" onclick="deleteProduct(${producto.id})">
                <i class="bi bi-trash-fill"></i> Eliminar
            </button>
        </div>
    `).join('');
}

// ============================================
// AÑADIR PRODUCTO
// ============================================
function addProduct(event) {
    event.preventDefault();
    
    const newProduct = {
        id: nextId++,
        nombre: document.getElementById('productName').value,
        equipo: document.getElementById('productTeam').value,
        liga: document.getElementById('productLiga').value,
        pais: document.getElementById('productPais').value,
        precio: parseFloat(document.getElementById('productPrecio').value),
        imagen: document.getElementById('productImagen').value,
        destacado: document.getElementById('productDestacado').checked
    };
    
    // Añadir a la lista local
    productos.push(newProduct);
    
    // Guardar en localStorage (simulación de base de datos)
    saveProductsToStorage();
    
    // Renderizar de nuevo
    renderProducts();
    
    // Limpiar formulario
    document.getElementById('addProductForm').reset();
    
    showNotification('✅ Producto añadido exitosamente', 'success');
}

// ============================================
// ELIMINAR PRODUCTO
// ============================================
function deleteProduct(id) {
    if (!confirm('¿Estás seguro de eliminar este producto?')) {
        return;
    }
    
    productos = productos.filter(p => p.id !== id);
    saveProductsToStorage();
    renderProducts();
    showNotification('🗑️ Producto eliminado', 'info');
}

// ============================================
// PERSISTENCIA
// ============================================
function saveProductsToStorage() {
    localStorage.setItem('admin_productos', JSON.stringify(productos));
}

function loadProductsFromStorage() {
    const saved = localStorage.getItem('admin_productos');
    if (saved) {
        productos = JSON.parse(saved);
        renderProducts();
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

// Cargar productos guardados al inicio
loadProductsFromStorage();

console.log('%c🔐 ADMIN PANEL', 'color: #ff0066; font-size: 20px; font-weight: bold;');
console.log('%c✅ Sistema de administración cargado', 'color: #00ff88; font-size: 14px;');
