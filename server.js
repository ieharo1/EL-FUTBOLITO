const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// API endpoint para productos (ejemplo)
app.get('/api/productos', (req, res) => {
  const productos = [
    {
      id: 1,
      nombre: "Real Madrid 24/25 Local",
      equipo: "Real Madrid",
      precio: 89.99,
      imagen: "https://images.unsplash.com/photo-1522778526097-ce0a22ceb253?w=400&h=400&fit=crop"
    },
    {
      id: 2,
      nombre: "Barcelona 24/25 Local",
      equipo: "FC Barcelona",
      precio: 89.99,
      imagen: "https://images.unsplash.com/photo-1551958219-acbc608c6377?w=400&h=400&fit=crop"
    },
    {
      id: 3,
      nombre: "Manchester United Local",
      equipo: "Manchester United",
      precio: 85.99,
      imagen: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400&h=400&fit=crop"
    },
    {
      id: 4,
      nombre: "PSG 24/25 Local",
      equipo: "Paris Saint-Germain",
      precio: 92.99,
      imagen: "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=400&h=400&fit=crop"
    },
    {
      id: 5,
      nombre: "Bayern Munich Local",
      equipo: "Bayern Munich",
      precio: 87.99,
      imagen: "https://images.unsplash.com/photo-1606925797300-0b35e9d1794e?w=400&h=400&fit=crop"
    },
    {
      id: 6,
      nombre: "Liverpool 24/25 Local",
      equipo: "Liverpool FC",
      precio: 88.99,
      imagen: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=400&fit=crop"
    }
  ];
  res.json(productos);
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`⚽ El Futbolito está listo!`);
});
