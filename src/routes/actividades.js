const { Router } = require('express');
const router = Router();

const Actividad = require('../models/Actividades');

//routes
router.get('/', async (req, res) => {
  try {
    const actividades = await Actividad.find();
    res.json(actividades);
  } catch (error) {
    return res.status(400).json({
      mensaje: 'Ocurrio un error',
      error
    })
  }
});

//get con parametros
router.get('/:id', async (req, res) => {
  const _id = req.params.id;
  try {

    const nuevaActividad = await Actividad.findOne({_id});
    res.json(nuevaActividad);

  } catch (error) {
    return res.status(400).json({
      mensaje: 'Ocurrio un error',
      error
    })
  }
});

router.post('/', async (req, res) => {
  const { enunciado, tipo, autor } = req.body
  let errores = [];
  if (!enunciado) {
    errores.push({text: 'Requiere un enunciado'});
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
    const nuevaActividad = new Actividad({enunciado, tipo, autor});
    await nuevaActividad.save();
    res.status(200).json(nuevaActividad);
  }
});

router.put('/:id', async (req, res) => {
//  const { codigo, contrasena, email, nombres, apellidos, tipo} = req.body;
  const body = req.body;
  const _id = req.params.id;
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

router.delete('/:id', async (req, res) => {

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
