// modelo.js
const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
id: int,
nombre: String
});

module.exports = mongoose.model('Usuario', UsuarioSchema);
const Usuario = require('./modelo');

app.post('/usuarios', async (req, res) => {
const nuevoUsuario = new Usuario(req.body);
await nuevoUsuario.save();
res.send('Usuario guardado');
});