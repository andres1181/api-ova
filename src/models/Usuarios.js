const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcryptjs');

const UsuarioSchema = new Schema({
  codigo: {
    type: String,
    required: true,
    unique: true
  },
  contrasena: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  nombres: {
    type: String,
    required: true
  },
  apellidos: {
    type: String,
    required: true
  },
  tipo: {
    type: String,
    required: true
  },
  fecha_registro: { type: Date, default: Date.now }
});

UsuarioSchema.methods.encryptContrasena = async (contrasena) => {
  const salt = await bcrypt.genSalt(16);
  const hash = bcrypt.hash(contrasena, salt);
  return hash;
};

UsuarioSchema.methods.matchPassword = async function (contrasena) {
  return await bcrypt.compare(contrasena, this.contrasena);
};

module.exports = mongoose.model('Usuario', UsuarioSchema)
