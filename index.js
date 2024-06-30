const express = require('express');
const cors = require('cors'); // Importa el paquete CORS
const app = express();
const port = process.env.PORT || 3000;
const db = require('./src/db');

app.use(cors()); // Usa el middleware CORS

app.use(express.json());
 
// Ruta de prueba para verificar la conexión
app.get('/', (req, res) => {
  res.send('Backend asistencia');
});

// Ejemplo de ruta para obtener datos de la base de datos
app.get('/data', (req, res) => {
  db.query('SELECT * FROM `insertar`', (err, results) => {
    if (err) {
      res.status(500).send('Error retrieving data from database');
      return;
    }

    const groupedResults = results.reduce((acc, item) => {
      const { Numero } = item;
      if (!acc[Numero]) {
        acc[Numero] = [];
      }
      acc[Numero].push(item);
      return acc;
    }, {});

    res.json(groupedResults);
  });
});


// Ruta para insertar datos en la base de datos
app.post('/insertar', (req, res) => {
  const { SSID, Numero, IP, Fecha } = req.body; // Obtener los datos del cuerpo de la solicitud

  // Verificar si se proporcionaron todos los datos necesarios
  if (!SSID || !Numero || !IP || !Fecha || IP != "1.1.0.25") {
    
    res.status(400).send('Debe proporcionar SSID, Numero, IP y Fecha');
    return;
  }

/*   // Manipular la fecha
  const aux = String(Fecha).split("Type")
  const aux2 = String(aux[0]/159123)+"/"+String(aux[1]/159123)+"/"+String(aux[2]/159123)  ; // Ejemplo: sumar un día a la fecha
 */
  // Ejecutar la consulta INSERT en la base de datos
  db.query('INSERT INTO `insertar` (`SSID`, `Fecha`, `IP`, `Numero`) VALUES (?, ?, ?,?)', [SSID, Numero, IP, Fecha], (err, results) => {
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
