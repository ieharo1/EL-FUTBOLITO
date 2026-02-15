⚽ EL FUTBOLITO - Tienda de Camisetas de Fútbol

Una tienda online moderna, visualmente impactante y completamente responsive para la venta de camisetas oficiales de equipos de fútbol, desarrollada con tecnologías web actuales y arquitectura escalable basada en Node.js.

🚀 Características Principales

🎨 Diseño Moderno y Brutal: Interface con gradientes neón, efectos visuales y animaciones fluidas.

📱 100% Responsive: Adaptado a móviles, tablets y escritorio.

⚡ Bootstrap 5: Framework CSS moderno y flexible.

🧠 Node.js + Express: Backend ligero, rápido y escalable.

🛒 Carrito de Compras: Persistente mediante localStorage.

🔍 Filtros Dinámicos: Filtrado por liga.

💌 Newsletter: Sistema de suscripción funcional.

🌐 Redes Sociales Integradas: Header y footer completos.

🔔 Sistema de Notificaciones: Feedback visual interactivo.

❤️ Wishlist: Sistema de favoritos.

🛠️ Tecnologías Utilizadas

HTML5 – Estructura semántica moderna

CSS3 – Variables CSS, animaciones y efectos avanzados

JavaScript ES6+ – Lógica interactiva del cliente

Bootstrap 5 – Diseño responsive profesional

Bootstrap Icons – Iconografía moderna

Node.js – Entorno de ejecución

Express.js – Framework backend minimalista

Google Fonts – Bebas Neue, Exo 2, Montserrat

📦 Instalación
📋 Prerrequisitos

Node.js v14 o superior

npm v6 o superior

🔧 Pasos de Instalación

1️⃣ Clonar el repositorio o ingresar al directorio del proyecto:

cd el-futbolito


2️⃣ Instalar dependencias:

npm install


3️⃣ Iniciar el servidor:

npm start


4️⃣ Abrir en navegador:

http://localhost:3000

🔧 Scripts Disponibles
Script	Descripción
npm start	Inicia el servidor en modo producción
npm run dev	Inicia el servidor con nodemon (recarga automática)
📁 Estructura del Proyecto
el-futbolito/
├── public/
│   ├── css/
│   │   └── styles.css          # Estilos personalizados
│   ├── js/
│   │   └── main.js             # JavaScript principal
│   └── images/                 # Imágenes del sitio
├── views/
│   └── index.html
├── server.js
├── package.json
└── README.md

🎨 Diseño y Experiencia Visual
🔝 Header

Top Bar con información de envío y redes sociales

Navbar responsive con logo animado

Hero Section con llamada a la acción

🛍 Productos

Cards animadas con efectos hover

Badges dinámicos (“NUEVO”, “OFERTA”)

Filtros por liga

Botones de acción rápida

Añadir al carrito y favoritos

🔻 Footer

Enlaces organizados por categorías

Redes sociales integradas:

Facebook

Instagram

Twitter/X

YouTube

TikTok

WhatsApp

Formulario de newsletter

🌈 Paleta de Colores
Tipo	Color
Primary	#00ff88 (Verde neón)
Secondary	#ff0066 (Rosa vibrante)
Dark	#0a0e27 (Azul oscuro profundo)
Accent	#ffd700 (Dorado)
Gradientes	Combinaciones neón + cyan
🎯 Funcionalidades JavaScript

✅ Carrito persistente (localStorage)

✅ Filtro dinámico por liga

✅ Animaciones al hacer scroll

✅ Smooth scroll

✅ Notificaciones visuales

✅ Wishlist

✅ API REST básica

✅ Newsletter funcional

🔌 API REST
GET /api/productos

Devuelve la lista completa de camisetas disponibles.

Ejemplo de respuesta:

[
  {
    "id": 1,
    "nombre": "Real Madrid 24/25 Local",
    "equipo": "Real Madrid",
    "precio": 89.99,
    "imagen": "url_imagen",
    "liga": "liga"
  }
]
```

## 🚀 Despliegue

Para desplegar en producción:

1. **Configura las variables de entorno**
```bash
export PORT=3000
export NODE_ENV=production


2️⃣ Ejecutar:

npm start
```

## 📱 Responsive Design

Optimizado para:

📱 Mobile (320px – 767px)

📱 Tablet (768px – 991px)

💻 Desktop (992px+)

🖥️ Large Desktop (1200px+)

🔮 Roadmap / Mejoras Futuras

 Sistema de autenticación (Login / Registro)

 Pasarela de pago (Stripe / PayPal)

 Panel administrativo

 Sistema de reviews

 Comparador de productos

 Chat en vivo

 Multi-idioma

 Integración con base de datos (MongoDB / PostgreSQL)


📄 Licencia

Este proyecto está bajo la Licencia ISC.

---

**Desarrollado con ❤️ y ⚽ para los amantes del fútbol**
