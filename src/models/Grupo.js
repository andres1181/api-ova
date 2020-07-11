const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcryptjs');

const GrupoSchema = new Schema({

  nombre: {
    type: String,
    required: true
  },
  codigo: {
    type: String,
    required: true,
    unique: true
  },
  cod_docente: {
    type: String,
    required: true
  },
  activo: {
    type: Boolean,
    required: true,
    default: true,
  },
  fecha_registro: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Grupo', GrupoSchema)
