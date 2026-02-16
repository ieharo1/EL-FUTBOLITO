# ⚽ EL FUTBOLITO - Tienda de Camisetas de Fútbol

Una tienda online **profesional y completa** para venta de camisetas de equipos de fútbol, construida con las últimas tecnologías web.

## 🚀 Características Principales

### 💎 FUNCIONALIDADES COMPLETAS:

- ✅ **Carrito de Compras Funcional**: Añadir, editar, eliminar productos
- ✅ **Sistema de Favoritos/Wishlist**: Guarda tus productos favoritos
- ✅ **Buscador en Tiempo Real**: Búsqueda instantánea por equipo, liga o país
- ✅ **Filtros por Liga**: La Liga, Premier, Serie A, Bundesliga, Ligue 1
- ✅ **Vista Rápida de Productos**: Modal con selector de tallas y cantidad
- ✅ **Ofertas Flash con Countdown**: Timer de cuenta regresiva para ofertas
- ✅ **Sección Más Vendidos**: Productos destacados
- ✅ **Loading Screen Profesional**: Pantalla de carga animada
- ✅ **Scroll to Top Button**: Botón flotante para volver arriba
- ✅ **Modal de Bienvenida**: Cupón de descuento para nuevos clientes
- ✅ **Persistencia de Datos**: LocalStorage para carrito y favoritos
- ✅ **Notificaciones**: Sistema de alertas para cada acción
- ✅ **Responsive 100%**: Adaptado a todos los dispositivos
- ✅ **24 Equipos Top**: Los mejores equipos de Europa

### 🎨 Diseño Espectacular:

- **Tema Oscuro con Neón**: Colores vibrantes y modernos
- **Animaciones Fluidas**: Transiciones y efectos suaves
- **Micro-interacciones**: Detalles que mejoran la experiencia
- **Tipografías Premium**: Bebas Neue, Exo 2, Montserrat
- **Gradientes Modernos**: Verde neón y rosa vibrante

## 🛠️ Tecnologías Utilizadas

- **HTML5**: Estructura semántica moderna
- **CSS3**: Estilos personalizados con variables CSS
- **JavaScript ES6+**: Lógica interactiva avanzada
- **Bootstrap 5**: Framework CSS responsive
- **Bootstrap Icons**: Iconografía completa
- **Node.js**: Entorno de ejecución JavaScript
- **Express**: Framework web minimalista
- **Google Fonts**: Tipografías premium

## 📦 Instalación

### Prerrequisitos
- Node.js (v14 o superior)
- npm (v6 o superior)

### Pasos de Instalación

1. **Extrae el archivo ZIP**
```bash
unzip el-futbolito-FINAL.zip
cd el-futbolito
```

2. **Instala las dependencias**
```bash
npm install
```

3. **Inicia el servidor**
```bash
npm start
```

4. **Abre tu navegador**
```
http://localhost:3000
```

## 🎯 Funcionalidades Detalladas

### 🛒 CARRITO DE COMPRAS
- Añadir productos con talla personalizada
- Cambiar cantidades (límite 10 por producto)
- Eliminar productos individualmente
- Cálculo automático de subtotal, envío y total
- Envío GRATIS en compras mayores a $50
- Persistencia en localStorage
- Botón de checkout funcional

### ❤️ SISTEMA DE FAVORITOS
- Añadir/quitar productos de favoritos
- Ver todos los favoritos en panel lateral
- Añadir todos los favoritos al carrito de una vez
- Contador de favoritos en header
- Persistencia en localStorage

### 🔍 BUSCADOR AVANZADO
- Búsqueda en tiempo real mientras escribes
- Busca por: equipo, liga o país
- Sugerencias rápidas populares
- Resultados visuales con imágenes
- Clic en resultado abre vista rápida
- Modal con diseño oscuro y neón

### 👁️ VISTA RÁPIDA
- Modal completo del producto
- Selector de tallas (S, M, L, XL, XXL)
- Selector de cantidad (1-10)
- Añadir al carrito desde el modal
- Botón de favoritos integrado
- Información detallada del producto

### ⚡ OFERTAS FLASH
- Banner destacado con diseño impactante
- Countdown timer en tiempo real
- Contador con horas, minutos y segundos
- Se reinicia automáticamente cada 24h
- Animaciones de brillo y pulso

### 🏆 MÁS VENDIDOS
- Sección dedicada a productos destacados
- 4 productos más populares
- Diseño consistente con el resto

### 📱 OTRAS MEJORAS
- **Loading Screen**: Pantalla de carga con logo animado
- **Scroll to Top**: Botón flotante que aparece al hacer scroll
- **Modal Bienvenida**: Cupón de 15% para nuevos clientes
- **Badges**: Contadores en carrito y favoritos
- **Animaciones**: Efectos al hacer scroll y hover

## 📁 Estructura del Proyecto

```
el-futbolito/
├── public/
│   ├── css/
│   │   └── styles.css          # Estilos completos
│   ├── js/
│   │   └── main.js             # JavaScript funcional
│   └── images/                 # Imágenes del sitio
├── views/
│   └── index.html              # Página principal
├── server.js                   # Servidor Node.js/Express
├── package.json                # Dependencias
└── README.md                   # Este archivo
```

## 🎨 Paleta de Colores

- **Primary**: `#00ff88` (Verde neón)
- **Secondary**: `#ff0066` (Rosa vibrante)
- **Dark**: `#0a0e27` (Azul oscuro)
- **Dark Light**: `#151933`
- **Dark Lighter**: `#1f2342`
- **Accent**: `#ffd700` (Dorado)

## 🌐 Equipos Disponibles

### La Liga (España)
- Real Madrid, Barcelona, Atlético Madrid

### Premier League (Inglaterra)
- Man City, Liverpool, Man United, Chelsea, Arsenal, Tottenham

### Serie A (Italia)
- Juventus, AC Milan, Inter Milan, Napoli

### Bundesliga (Alemania)
- Bayern Munich, Borussia Dortmund, RB Leipzig

### Ligue 1 (Francia)
- PSG, Olympique Marseille, Lyon

### Otros
- Ajax, Benfica, Porto, Celtic, Galatasaray

## 🚀 Scripts Disponibles

- `npm start` - Inicia el servidor en modo producción
- `npm run dev` - Inicia con nodemon (recarga automática)

## 🔌 API Endpoints

### GET `/api/productos`
Obtiene todos los productos disponibles

### GET `/api/buscar?q=termino`
Busca productos por término

## 📱 Responsive Design

Optimizado para:
- 📱 Mobile (320px+)
- 📱 Tablet (768px+)
- 💻 Desktop (992px+)
- 🖥️ Large Desktop (1200px+)

## 🎉 Características Premium

- ✅ Countdown timer funcional
- ✅ Sistema de favoritos completo
- ✅ Loading screen profesional
- ✅ Modal de bienvenida con cupón
- ✅ Scroll to top animado
- ✅ Búsqueda en tiempo real
- ✅ Persistencia de datos
- ✅ Notificaciones animadas
- ✅ Ofertas flash destacadas
- ✅ Sección más vendidos

## 📞 Soporte

Para más información:
- 🌐 Web: www.elfutbolito.com
- 📧 Email: info@elfutbolito.com
- 📱 WhatsApp: +1234567890

---

## 📄 Licencia

MIT — contribuciones bienvenidas 🚀

---

## 💻 Creado Por

🧑‍💻 Isaac Haro

Ingeniero en Sistemas · Full Stack · Automatización · Data

Isaac Esteban Haro Torres
- 📧 zackharo1@gmail.com
- 📱 098805517
- 💻 [GitHub](https://github.com/ieharo1)
