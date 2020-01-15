const mongoose = require('mongoose');
const { Schema } = mongoose;

const UnidadSchema = new Schema({
  nombre: {
    type: String,
    required: true,
    unique: true
  },
  activo: {
    type: Boolean,
    required: true,
    default: false,
  },
  fecha_creacion: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('Unidad', UnidadSchema)
