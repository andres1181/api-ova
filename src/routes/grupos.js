const {
  Router
} = require('express');
const router = Router();
const jwt = require('jsonwebtoken');

const Grupo = require('../models/Grupo');
const EstudianteGrupo = require('../models/EstudianteGrupo');
const config = require('../config/config');
const verifyToken = require('../controlers/verifyToken');

//routes
router.get('/obtener/grupos', async (req, res) => {
  try {
    const grupos = await Grupo.find().sort({ _id: -1 });
    res.json(grupos);
  } catch (error) {
    return res.status(400).json({
      mensaje: 'Ocurrio un error',
      error
    })
  }
});
//Obtener los grupos de un profesor - parametro id del docente
router.get('/obtenerGrupos/:docente', async (req, res) => {
  const _docente = req.params.docente;
  try {
    const grupos = await Grupo.find({
      id_docente: _docente
    }).sort({ _id: -1 });
    res.status(200).json(grupos);

  } catch (error) {
    return res.status(400).json({
      mensaje: 'Ocurrio un error',
      error
    })
  }
});

//Obtener grupos por codigo
router.get('/obtenerGrupos/codigo/:codigo', async (req, res) => {
  const _codigo = req.params.codigo;
  try {
    const grupo = await Grupo.findOne({
      codigo: _codigo
    });
    res.status(200).json(grupo);

  } catch (error) {
    return res.status(400).json({
      mensaje: 'Ocurrio un error',
      error: error
    })
  }
});

router.get('/obtener/grupos/estudiantes', async (req, res) => {

  try {
    const estudiantes = await EstudianteGrupo.find().populate('id_grupo').populate('id_estudiante').sort({ _id: -1 });
    res.json(estudiantes);
  } catch (error) {
    return res.status(400).json({
      mensaje: 'Ocurrio un error',
      error
    })
  }
});
//el administrador crea grupos
router.post('/crearGrupo', async (req, res) => {
  let errores = [];

  const {
    nombre,
    codigo,
    id_docente,
    activo
  } = req.body
  if (!nombre) {
    errores.push({
      text: 'Nombre requerido'
    });
  }
  if (!codigo) {
    errores.push({
      text: 'Código Requerido'
    });
  }
  if (!id_docente) {
    errores.push({
      text: 'Código docente requerido'
    });
  }

  try {

    if (errores.length > 0) {
      res.status(400).json({
        mensaje: 'Ocurrio un error',
        errores: errores
      });
    } else {
      const nuevoGrupo = new Grupo({
        codigo,
        id_docente,
        activo,
        nombre
      });
      await nuevoGrupo.save();
      res.status(200).json({
        mensaje: 'Grupo creado',
        grupo: nuevoGrupo
      });
    }

  } catch (e) {
    res.status(500).json({
      error: e
    });
    console.log(e);
  }

});

//Ingreso el codigo del grupo como un paramentro, con esa informacion selecciono el id del grupo y lo agrego
//como en la interfaz muestro una lista de los grupos, cada grupo ya tiene el id
router.post('/agregarEstudiante', async (req, res) => {
  let errores = [];

  const {
    id_grupo,
    id_estudiante
  } = req.body

  if (!id_grupo || !id_estudiante) {
    errores.push({
      text: 'Todos los datos son necesarios'
    });
  }
  try {

    if (errores.length > 0) {
      res.status(400).json({
        mensaje: 'Ocurrio un error',
        errores: errores
      });
    } else {
      const estudianteGrupo = new EstudianteGrupo({
        id_grupo,
        id_estudiante
      });
      await estudianteGrupo.save();
      res.status(200).json({
        mensaje: 'Estudiante Agregado',
        datos: estudianteGrupo
      });
    }

  } catch (e) {
    res.status(500).json({
      error: e
    });
    console.log(e);
  }

});

router.delete('/delete/grupo/:id', async (req, res) => { //verifyToken,


  try {
    const _id = req.params.id;
    const deleteGrupo = await Grupo.findByIdAndDelete({
      _id
    });
    if (!deleteGrupo) {
      return res.status(400).json({
        mensaje: 'El grupo NO existe',
        error
      })
    }
    res.json(deleteGrupo);
  } catch (error) {
    return res.status(400).json({
      mensaje: 'Ocurrio un error',
      error
    })
  }
});



module.exports = router;
