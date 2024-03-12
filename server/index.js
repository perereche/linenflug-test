const express = require('express');
const dotenv = require('dotenv');
const helmet = require('helmet');
const sqlite3 = require('sqlite3');
const {createProxyMiddleware} = require('http-proxy-middleware');

dotenv.config(); 

const app = express(); 

const PORT = process.env.PORT; 
const API_PATH = process.env.API_PATH; 
const API_TOKEN = process.env.API_TOKEN; 
const LOCALHOST_URL = process.env.LOCALHOST_URL; 
const PRODUCTION_URL = process.env.PRODUCTION_URL; 

app.use(express.json());
app.use(helmet()); 

// Verbinden mit SQLite-Datenbank
let db = new sqlite3.Database('./database.sqlite', (err) => {
  if (err) {
    return console.error(err.message); 
  }
  console.log('Connected to the SQlite database.'); 
});

// Entwicklungsumgebung spezifische Middleware
if (process.env.NODE_ENV === 'development') { 
    // Proxy Middleware für API-Anfragen im Entwicklungsumodus
    app.use('/api', createProxyMiddleware({ target: `http://localhost:${PORT}`, changeOrigin: true }));
    
    // Startseite Umleitung zur Entwicklungs-Frontend-URL
    app.get('/', (req, res) => {
      res.redirect(LOCALHOST_URL);
    });
    
    // CORS-Middleware für die Entwicklung, erlaubt Zugriffe vom Frontend
    app.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", LOCALHOST_URL); 
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-api-token");
      res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");

      if (req.method === "OPTIONS") {
          res.sendStatus(200); // Erlaube Preflight-Anfragen
      } else {
          next();
      } 
    });
  } else {
    // Produktionsmodus spezifische Einstellungen
    app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', PRODUCTION_URL);
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
      res.header('Access-Control-Allow-Headers', 'Content-Type');

      if (req.headers.origin && req.headers.origin !== PRODUCTION_URL) {
          return res.status(403).json({ message: 'CORS Policy Denies This Request' });
      }
  
      next();
  });
    app.get('/', (req, res) => {
      res.redirect(PRODUCTION_URL);
    });
  }

// Middleware zur Überprüfung des API-Tokens
app.use((req, res, next) => {
  const apiToken = req.headers['x-api-token'];
  if (apiToken !== API_TOKEN) {
    return res.status(403).json({ error: 'Unauthorized access' }); // Zugriff verweigern, wenn Token ungültig
  }
  next(); 
});

// Route, um alle Autos abzurufen
app.get(`/${API_PATH}/getcars`, (req, res) => {
   
    db.all("SELECT * FROM cars", [], (err, rows) => {
      if (err) {
        throw err; 
      }
      res.json({
        cars: rows 
      });
    });
});

// Route, um ein neues Auto hinzuzufügen
app.post(`/${API_PATH}/addcar`, (req, res) => {
    const { name, license, color, tuv } = req.body; 
  
    db.run(`INSERT INTO cars(name, license, color, tuv) VALUES(?, ?, ?, ?)`, [name,  license.toUpperCase(), color, tuv], function(err) {
      if (err) {
        return console.log(err.message); 
      }
      res.send(`A car has been added with ID ${this.lastID}`); 
    });
  });

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`); // Logge, dass Server läuft
});
