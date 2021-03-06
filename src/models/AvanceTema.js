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

const AvanceTemaSchema = new Schema({
  unidad: {
    type: String,
    required: true
  },
  id_tema: {
    type: Schema.Types.ObjectId,
    ref: "Grupo",
    required: true
  },
  intentos: {
    type: Number,
    required: false,
    default: 0
  },
  fallos: {
    type: Number,
    required: true,
    default: 0
  },
  id_grupo: {
    type: Schema.Types.ObjectId,
    ref: "Grupo",
    required: true
  }
});

module.exports = mongoose.model('AvanceTema', AvanceTemaSchema)
