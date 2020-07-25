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
  tipo: {
    type: String,
    default: 'estudiante',
    enum: [
      'estudiante',
      'docente',
      'administrador'
    ],
    required: true
  },
  id_grupo: {
    type: Schema.Types.ObjectId,
    ref: "Grupo",
    required: false
  },
  activo: {
    type: Boolean,
    required: true,
    default: false,
  },
  fecha_registro: { type: Date, default: Date.now },
  fecha_ultimo_login: { type: Date, default: Date.now }
});

UsuarioSchema.methods.encryptContrasena = async (contrasena) => {
  const salt = await bcrypt.genSalt(16);
  const hash = bcrypt.hash(contrasena, salt);
  return hash;
};

UsuarioSchema.methods.validatePassword = async function (contrasena) {
  return await bcrypt.compare(contrasena, this.contrasena);
};

module.exports = mongoose.model('Usuario', UsuarioSchema)
