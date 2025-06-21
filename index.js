const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

// Conexión a MongoDB (ajusta el nombre de la base de datos si es diferente)
mongoose.connect('mongodb://localhost:27017/mipagina', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Conectado a MongoDB');
})
.catch(err => {
  console.error('Error de conexión:', err);
});

// Ruta básica de prueba
app.get('/', (req, res) => {
  res.send('Hola desde la API');
});

// Inicia el servidor
app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});