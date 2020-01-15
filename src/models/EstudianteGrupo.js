const mongoose = require('mongoose');
const { Schema } = mongoose;



const GrupoEstudianteSchema = new Schema({

  id_grupo: {
    type: Schema.Types.ObjectId,
    ref: "Grupo",
    required: true
  },
  id_estudiante: {
    type: Schema.ObjectId,
    ref: "Usuario",
    required: true
  }
});

module.exports = mongoose.model('GrupoEstudiante', GrupoEstudianteSchema)
