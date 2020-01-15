const { Router } = require('express');
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
  const _id = req.params.id;
  try {

    const nuevaActividad = await Actividad.findOne({_id}).populate('id_tema');
    res.json(nuevaActividad);

  } catch (error) {
    return res.status(400).json({
      mensaje: 'Ocurrio un error',
      error
    })
  }
});

router.post('/crear', verifyToken, async (req, res) => {
  const { enunciado, tipo, autor, id_tema, activo} = req.body
  let errores = [];
  if (!enunciado) {
    errores.push({text: 'Requiere un enunciado'});
  }
  if (!id_tema) {
    errores.push({text: 'Requiere un Tema'});
  }
  if (!tipo) {
    errores.push({text: 'Requiere un el tipo de pregunta'});
  }
  if (!autor) {
    errores.push({text: 'Falta el autor'});
  }
  if (errores.length > 0) {
    res.status(500).json({errores} );
  }else {
    const nuevaActividad = new Actividad({enunciado, tipo, autor, id_tema, activo});
    await nuevaActividad.save();
    res.status(200).json(nuevaActividad);
  }
});

router.put('/updateActividad/:id', async (req, res) => {
//  const { codigo, contrasena, email, nombres, apellidos, tipo} = req.body;
  const body = req.body;
  const _id = req.params.id;
  console.log(_id);
  try {
  const updateActividad =  await Actividad.findByIdAndUpdate(
      _id,
      body,
      { new: true});
  res.json(updateActividad);

  } catch (error) {
    return res.status(400).json({
      mensaje: 'Ocurrio un error',
      error
    })
  }
});

router.delete('deleteActividad/:id', async (req, res) => {

  const _id = req.params.id;
  try {

    const deleteActividad =  await Actividad.findByIdAndDelete({_id});
    res.json(deleteActividad);
  } catch (error) {
    return res.status(400).json({
      mensaje: 'Ocurrio un error',
      error
    })
  }
});



module.exports = router;
