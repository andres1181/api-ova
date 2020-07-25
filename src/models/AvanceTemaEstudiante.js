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

const AvanceTemaEstudianteSchema = new Schema({

  id_tema: {
    type: Schema.Types.ObjectId,
    ref: "Tema",
    required: true
  },
  aprobado: {
    type: Boolean,
    required: false
  },
  id_estudiante: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    required: true
  }
});

module.exports = mongoose.model('AvanceTemaEstudiante', AvanceTemaEstudianteSchema)
