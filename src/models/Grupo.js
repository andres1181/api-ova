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
  id_docente: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
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
