const mongoose = require('mongoose');
const { Schema } = mongoose;



const AvanceUnidadSchema = new Schema({
  avance: {
    type: Number,
    required: true,
    default: 0
  },
  id_estudiante: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    required: true
  },
  id_unidad: {
    type: Schema.ObjectId,
    ref: "Unidad",
    required: true
  }
});

module.exports = mongoose.model('AvanceUnidad', AvanceUnidadSchema)
