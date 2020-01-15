const mongoose = require('mongoose');
const { Schema } = mongoose;



const TemaSchema = new Schema({
  titulo: {
    type: String,
    required: true,
    unique: true
  },
  componente: {
    type: String,
    required: true
  },
  id_unidad: {
    type: Schema.Types.ObjectId,
    ref: "Unidad",
    required: true
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

module.exports = mongoose.model('Tema', TemaSchema)
