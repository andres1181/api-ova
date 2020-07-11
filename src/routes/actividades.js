const {
  Router
} = require('express');
const router = Router();

const Actividad = require('../models/Actividad');
const verifyToken = require('../controlers/verifyToken')
//routes
router.get('/listarAct', verifyToken, async (req, res) => {
  try {
    const actividades = await Actividad.find().populate('id_tema');
    res.json(actividades);
  } catch (error) {
    return res.status(400).json({
      mensaje: 'Ocurrio un error',
      error
    })
  }
});

//get con parametros
router.get('/obtenerAct/:id', verifyToken, async (req, res) => {
  console.log(req.params);
  const _id = req.params.id;
  try {

    const nuevaActividad = await Actividad.findOne({
      _id
    }).populate('id_tema');
    res.json(nuevaActividad);

  } catch (error) {
    return res.status(400).json({
      mensaje: 'Ocurrio un error',
      error
    })
  }
});

router.get('/obtenerPorUnidad/:unidad', async (req, res) => {
  console.log(req.params);
  const _unidad = req.params.unidad;
  try {

    const lista = await Actividad.find({
      unidad: _unidad
    }).populate('id_tema');
    res.json(lista);

  } catch (error) {
    console.error(error);
    return res.status(400).json({
      mensaje: 'Ocurrio un error',

      error
    })
  }
});

router.post('/crear', verifyToken, async (req, res) => {
  const {
    enunciado,
    tipo,
    unidad,
    autor,
    tema,
    opciones,
    activo
  } = req.body
  let errores = [];
  if (!enunciado) {
    errores.push({
      text: 'Requiere un enunciado'
    });
  }
  if (!tema) {
    errores.push({
      text: 'Requiere un Tema'
    });
  }
  if (!tipo) {
    errores.push({
      text: 'Requiere un el tipo de pregunta'
    });
  }
  if (!opciones) {
    errores.push({
      text: 'Requiere opciones'
    });
  }
  if (!autor) {
    errores.push({
      text: 'Falta el autor'
    });
  }
  if (!unidad) {
    errores.push({
      text: 'Falta la unidad'
    });
  }
  try {
    if (errores.length > 0) {
      res.status(400).json({
        mensaje: 'Ocurrio un error',
        errores: errores
      });
    } else {
      const nuevaActividad = new Actividad({
        enunciado,
        tipo,
        unidad,
        autor,
        tema,
        opciones,
        activo
      });
      await nuevaActividad.save();
      res.status(200).json(nuevaActividad);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      mensaje: 'Ocurrio un error',

      error: error
    })
  }
});

router.put('/updateActividad/:id', async (req, res) => {
  //  const { codigo, contrasena, email, nombres, apellidos, tipo} = req.body;
  const body = req.body;
  const _id = req.params.id;
  console.log(_id);
  try {
    const updateActividad = await Actividad.findByIdAndUpdate(
      _id,
      body, {
        new: true
      });
    res.status(200).json(updateActividad);

  } catch (error) {
    return res.status(400).json({
      mensaje: 'Ocurrio un error',
      error
    })
  }
});

router.delete('/deleteActividad/:id', async (req, res) => {

  const _id = req.params.id;
  try {

    const deleteActividad = await Actividad.findByIdAndDelete({
      _id
    });
    res.status(201).json(deleteActividad);
  } catch (error) {
    return res.status(400).json({
      mensaje: 'Ocurrio un error',
      error
    })
  }
});



module.exports = router;
