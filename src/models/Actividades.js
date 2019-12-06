const mongoose = require('mongoose');
const { Schema } = mongoose;

const PreguntaSchema = new Schema({
  enunciado: {
    type: String,
    required: true
  },
  tipo: {
    type: String,
    required: true
  },
  autor: {
    type: String,
    required: true
  },
  fecha_creacion: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Actividad', PreguntaSchema)
