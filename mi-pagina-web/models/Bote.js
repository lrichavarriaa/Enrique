const mongoose = require('mongoose');

const boteSchema = new mongoose.Schema({
  ubicacion: { type: String, required: true },
  tipoResiduos: { type: String, required: true },
  capacidad: { type: Number, required: true }
});

module.exports = mongoose.model('Bote', boteSchema);
