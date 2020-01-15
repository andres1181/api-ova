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
  terminado: {
    type: Boolean,
    required: true,
    default: false
  },
  id_estudiante: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    required: true
  },
  id_tema: {
    type: Schema.Types.ObjectId,
    ref: "Tema",
    required: true
  }
});

module.exports = mongoose.model('AvanceTema', AvanceTemaSchema)
