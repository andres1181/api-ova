const mongoose = require('mongoose');
const { Schema } = mongoose;
// var Usuario = mongoose.model('Usuario');
// var Tema = mongoose.model('Tema');

// var libroSchema = new Schema({
// 	titulo: String
//     paginas: Number,
//     isbn: String,
//     autor: { type: Schema.ObjectId, ref: "Autor" }
// });

const JuezSchema = new Schema({
  enunciado: {
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
  autor: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    required: true
  },
  respuesta: {
    type: String,
    required: true
  },
  fecha_creacion: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('Juez', JuezSchema)
