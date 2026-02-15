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

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'admin.html'));
});

// API endpoint para productos (ejemplo)
app.get('/api/productos', (req, res) => {
  const productos = [
    // LA LIGA - España
    {
      id: 1,
      nombre: "Real Madrid 24/25 Local",
      equipo: "Real Madrid",
      liga: "La Liga",
      pais: "España",
      precio: 89.99,
      imagen: "https://images.unsplash.com/photo-1522778526097-ce0a22ceb253?w=400&h=400&fit=crop",
      destacado: true
    },
    {
      id: 2,
      nombre: "Barcelona 24/25 Local",
      equipo: "FC Barcelona",
      liga: "La Liga",
      pais: "España",
      precio: 89.99,
      imagen: "https://images.unsplash.com/photo-1551958219-acbc608c6377?w=400&h=400&fit=crop",
      destacado: true
    },
    {
      id: 3,
      nombre: "Atlético Madrid Local",
      equipo: "Atlético Madrid",
      liga: "La Liga",
      pais: "España",
      precio: 84.99,
      imagen: "https://images.unsplash.com/photo-1614632537239-e3a5fd7c1f4e?w=400&h=400&fit=crop",
      destacado: false
    },
    {
      id: 4,
      nombre: "Real Madrid Visitante",
      equipo: "Real Madrid",
      liga: "La Liga",
      pais: "España",
      precio: 89.99,
      imagen: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400&h=400&fit=crop",
      destacado: false
    },
    {
      id: 5,
      nombre: "Sevilla FC Local",
      equipo: "Sevilla FC",
      liga: "La Liga",
      pais: "España",
      precio: 79.99,
      imagen: "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=400&h=400&fit=crop",
      destacado: false
    },
    
    // PREMIER LEAGUE - Inglaterra
    {
      id: 6,
      nombre: "Manchester City Local",
      equipo: "Manchester City",
      liga: "Premier League",
      pais: "Inglaterra",
      precio: 88.99,
      imagen: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400&h=400&fit=crop",
      destacado: true
    },
    {
      id: 7,
      nombre: "Liverpool 24/25 Local",
      equipo: "Liverpool FC",
      liga: "Premier League",
      pais: "Inglaterra",
      precio: 88.99,
      imagen: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=400&fit=crop",
      destacado: true
    },
    {
      id: 8,
      nombre: "Manchester United Local",
      equipo: "Manchester United",
      liga: "Premier League",
      pais: "Inglaterra",
      precio: 85.99,
      imagen: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=400&h=400&fit=crop",
      destacado: true
    },
    {
      id: 9,
      nombre: "Chelsea 24/25 Local",
      equipo: "Chelsea FC",
      liga: "Premier League",
      pais: "Inglaterra",
      precio: 84.99,
      imagen: "https://images.unsplash.com/photo-1606925797300-0b35e9d1794e?w=400&h=400&fit=crop",
      destacado: false
    },
    {
      id: 10,
      nombre: "Arsenal 24/25 Local",
      equipo: "Arsenal FC",
      liga: "Premier League",
      pais: "Inglaterra",
      precio: 87.99,
      imagen: "https://images.unsplash.com/photo-1511556820780-d912e42b4980?w=400&h=400&fit=crop",
      destacado: true
    },
    {
      id: 11,
      nombre: "Tottenham Local",
      equipo: "Tottenham Hotspur",
      liga: "Premier League",
      pais: "Inglaterra",
      precio: 83.99,
      imagen: "https://images.unsplash.com/photo-1577212017308-2f0cbf5a8a8c?w=400&h=400&fit=crop",
      destacado: false
    },
    {
      id: 12,
      nombre: "Newcastle United Local",
      equipo: "Newcastle United",
      liga: "Premier League",
      pais: "Inglaterra",
      precio: 82.99,
      imagen: "https://images.unsplash.com/photo-1522778526097-ce0a22ceb253?w=400&h=400&fit=crop",
      destacado: false
    },
    {
      id: 13,
      nombre: "Aston Villa Local",
      equipo: "Aston Villa",
      liga: "Premier League",
      pais: "Inglaterra",
      precio: 79.99,
      imagen: "https://images.unsplash.com/photo-1551958219-acbc608c6377?w=400&h=400&fit=crop",
      destacado: false
    },
    
    // SERIE A - Italia
    {
      id: 14,
      nombre: "Juventus 24/25 Local",
      equipo: "Juventus",
      liga: "Serie A",
      pais: "Italia",
      precio: 86.99,
      imagen: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=400&h=400&fit=crop",
      destacado: true
    },
    {
      id: 15,
      nombre: "AC Milan Local",
      equipo: "AC Milan",
      liga: "Serie A",
      pais: "Italia",
      precio: 85.99,
      imagen: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=400&h=400&fit=crop",
      destacado: true
    },
    {
      id: 16,
      nombre: "Inter Milan Local",
      equipo: "Inter Milan",
      liga: "Serie A",
      pais: "Italia",
      precio: 85.99,
      imagen: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=400&h=400&fit=crop",
      destacado: true
    },
    {
      id: 17,
      nombre: "Napoli 24/25 Local",
      equipo: "SSC Napoli",
      liga: "Serie A",
      pais: "Italia",
      precio: 83.99,
      imagen: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=400&h=400&fit=crop",
      destacado: false
    },
    {
      id: 18,
      nombre: "AS Roma Local",
      equipo: "AS Roma",
      liga: "Serie A",
      pais: "Italia",
      precio: 82.99,
      imagen: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400&h=400&fit=crop",
      destacado: false
    },
    {
      id: 19,
      nombre: "Lazio Local",
      equipo: "SS Lazio",
      liga: "Serie A",
      pais: "Italia",
      precio: 79.99,
      imagen: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=400&fit=crop",
      destacado: false
    },
    
    // BUNDESLIGA - Alemania
    {
      id: 20,
      nombre: "Bayern Munich Local",
      equipo: "Bayern Munich",
      liga: "Bundesliga",
      pais: "Alemania",
      precio: 87.99,
      imagen: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=400&fit=crop",
      destacado: true
    },
    {
      id: 21,
      nombre: "Borussia Dortmund Local",
      equipo: "Borussia Dortmund",
      liga: "Bundesliga",
      pais: "Alemania",
      precio: 84.99,
      imagen: "https://images.unsplash.com/photo-1553778263-73a83bab9b0c?w=400&h=400&fit=crop",
      destacado: true
    },
    {
      id: 22,
      nombre: "RB Leipzig Local",
      equipo: "RB Leipzig",
      liga: "Bundesliga",
      pais: "Alemania",
      precio: 79.99,
      imagen: "https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?w=400&h=400&fit=crop",
      destacado: false
    },
    {
      id: 23,
      nombre: "Bayer Leverkusen Local",
      equipo: "Bayer Leverkusen",
      liga: "Bundesliga",
      pais: "Alemania",
      precio: 78.99,
      imagen: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=400&h=400&fit=crop",
      destacado: false
    },
    
    // LIGUE 1 - Francia
    {
      id: 24,
      nombre: "PSG 24/25 Local",
      equipo: "Paris Saint-Germain",
      liga: "Ligue 1",
      pais: "Francia",
      precio: 92.99,
      imagen: "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=400&h=400&fit=crop",
      destacado: true
    },
    {
      id: 25,
      nombre: "Olympique Marseille Local",
      equipo: "Marseille",
      liga: "Ligue 1",
      pais: "Francia",
      precio: 79.99,
      imagen: "https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=400&h=400&fit=crop",
      destacado: false
    },
    {
      id: 26,
      nombre: "Olympique Lyon Local",
      equipo: "Lyon",
      liga: "Ligue 1",
      pais: "Francia",
      precio: 78.99,
      imagen: "https://images.unsplash.com/photo-1526367790999-0150786686a2?w=400&h=400&fit=crop",
      destacado: false
    },
    {
      id: 27,
      nombre: "AS Monaco Local",
      equipo: "AS Monaco",
      liga: "Ligue 1",
      pais: "Francia",
      precio: 77.99,
      imagen: "https://images.unsplash.com/photo-1606925797300-0b35e9d1794e?w=400&h=400&fit=crop",
      destacado: false
    },
    
    // OTROS EQUIPOS EUROPEOS
    {
      id: 28,
      nombre: "Ajax Amsterdam Local",
      equipo: "Ajax",
      liga: "Eredivisie",
      pais: "Países Bajos",
      precio: 79.99,
      imagen: "https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?w=400&h=400&fit=crop",
      destacado: false
    },
    {
      id: 29,
      nombre: "Benfica Local",
      equipo: "Benfica",
      liga: "Liga Portugal",
      pais: "Portugal",
      precio: 74.99,
      imagen: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400&h=400&fit=crop",
      destacado: false
    },
    {
      id: 30,
      nombre: "Porto Local",
      equipo: "FC Porto",
      liga: "Liga Portugal",
      pais: "Portugal",
      precio: 74.99,
      imagen: "https://images.unsplash.com/photo-1522778526097-ce0a22ceb253?w=400&h=400&fit=crop",
      destacado: false
    },
    {
      id: 31,
      nombre: "Celtic Local",
      equipo: "Celtic FC",
      liga: "Scottish Premiership",
      pais: "Escocia",
      precio: 72.99,
      imagen: "https://images.unsplash.com/photo-1551958219-acbc608c6377?w=400&h=400&fit=crop",
      destacado: false
    },
    {
      id: 32,
      nombre: "Galatasaray Local",
      equipo: "Galatasaray",
      liga: "Süper Lig",
      pais: "Turquía",
      precio: 69.99,
      imagen: "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=400&h=400&fit=crop",
      destacado: false
    }
  ];
  
  res.json(productos);
});

// API endpoint para búsqueda
app.get('/api/buscar', (req, res) => {
  const { q } = req.query;
  
  const productos = [
    // (mismo array de productos que arriba - solo búsqueda)
  ];
  
  if (!q || q.trim() === '') {
    return res.json([]);
  }
  
  const query = q.toLowerCase().trim();
  const resultados = productos.filter(p => 
    p.nombre.toLowerCase().includes(query) ||
    p.equipo.toLowerCase().includes(query) ||
    p.liga.toLowerCase().includes(query) ||
    p.pais.toLowerCase().includes(query)
  );
  
  res.json(resultados);
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`⚽ El Futbolito está listo!`);
});
