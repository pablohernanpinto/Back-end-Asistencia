const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', // tu usuario de MySQL
  password: '', // tu contraseña de MySQL
  database: 'prueba',
  port: 3306  
});

connection.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database.');
});

module.exports = connection;
