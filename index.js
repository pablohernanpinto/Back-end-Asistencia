const express = require('express');
const cors = require('cors'); // Importa el paquete CORS
const app = express();
const port = process.env.PORT || 3000;
const db = require('./src/db');

app.use(cors()); // Usa el middleware CORS

app.use(express.json());

// Ruta de prueba para verificar la conexión
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Ejemplo de ruta para obtener datos de la base de datos
app.get('/prueba', (req, res) => {
  db.query('SELECT * FROM `insertar`', (err, results) => {
    if (err) {
      res.status(500).send('Error retrieving data from database');
      return;
    }
    res.json(results);
  });
});

// Ruta para insertar datos en la base de datos
app.post('/insertar', (req, res) => {
  const { SSID, Numero, IP } = req.body; // Obtener los datos del cuerpo de la solicitud

  // Verificar si se proporcionaron todos los datos necesarios
  if (!SSID || !Numero || !IP) {
    res.status(400).send('Debe proporcionar SSID, Numero e IP');
    return;
  }

  // Ejecutar la consulta INSERT en la base de datos
  db.query('INSERT INTO `data` (`SSID`, `Numero`, `IP`) VALUES (?, ?, ?)', [SSID, Numero, IP], (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error al insertar datos en la base de datos');
      return;
    }
    res.status(200).send('Datos insertados correctamente');
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
