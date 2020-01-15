const mongoose = require('mongoose');
const { Schema } = mongoose;


const RespuestaSchema = new Schema({

  correcta: {
    type: Boolean,
    required: true,
    default: false,
  },
  respuesta: {
    type: String,
    required: true
  },
  idPregunta: {
    type: Schema.Types.ObjectId,
    ref: "Actividad",
    required: true
  }
});

module.exports = mongoose.model('Respuesta', RespuestaSchema)
