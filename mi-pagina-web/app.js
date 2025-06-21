const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const Bote = require('./models/Bote');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sirve archivos estáticos desde carpeta "public"
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect('mongodb://localhost:27017/mipagina', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Conectado a MongoDB'))
.catch(err => console.error('Error al conectar a MongoDB:', err));

// Crear bote (Alta)
app.post('/botes', async (req, res) => {
  try {
    const nuevoBote = new Bote(req.body);
    await nuevoBote.save();
    res.json(nuevoBote);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Obtener todos los botes (Visualizar)
app.get('/botes', async (req, res) => {
  try {
    const botes = await Bote.find();
    res.json(botes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar bote (Modificación)
app.put('/botes/:id', async (req, res) => {
  try {
    const boteActualizado = await Bote.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!boteActualizado) {
      return res.status(404).json({ mensaje: 'Bote no encontrado' });
    }
    res.json(boteActualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Eliminar bote (Baja)
app.delete('/botes/:id', async (req, res) => {
  try {
    const eliminado = await Bote.findByIdAndDelete(req.params.id);
    if (!eliminado) {
      return res.status(404).json({ mensaje: 'Bote no encontrado' });
    }
    res.json({ mensaje: 'Bote eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
