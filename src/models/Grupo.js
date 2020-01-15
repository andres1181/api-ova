const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcryptjs');

const GrupoSchema = new Schema({

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
  fecha_registro: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Grupo', GrupoSchema)
