const { Router } = require('express');
const router = Router();
const jwt = require('jsonwebtoken');

const Tema = require('../models/Tema');
const Unidad = require('../models/Unidad');
const config = require('../config/config');
const verifyToken = require('../controlers/verifyToken');



router.get('/obtener/temas', async (req, res) => {
  //en el frontend se debera buscar los avances que coincidan con el _id del estudiante
  try {
    const avance = await Tema.find().populate('id_unidad');
    res.json(avance);
  } catch (error) {
    return res.status(400).json({
      mensaje: 'Ocurrio un error',
      error
    })
  }
});

router.get('/obtener/unidades', async (req, res) => {
  try {
    const avance = await Unidad.find();
    res.json(avance);
  } catch (error) {
    return res.status(400).json({
      mensaje: 'Ocurrio un error',
      error
    })
  }
});

router.post('/unidad', async (req, res) => {

  try {
    let errores = [];

    const {nombre, activo} = req.body
    // const emailUser = await AvanceUnidad.findOne({email: email}); //encuantra un email que coincida
    // const codigoUser = await AvanceUnidad.findOne({codigo: codigo});
    if (!nombre || !activo ) {
      errores.push({text: 'Todos los datos son necesarios'});
    }
    if (errores.length > 0) {
       res.status(400).json({mensaje: 'Ocurrio un error', errores});
     }else {
       const nuevoAvance = new Unidad({nombre, activo});
       await nuevoAvance.save();
       res.status(201).json({mensaje: 'Unidad creada'});}

  } catch (e) {
    console.log(e);
  }

});

router.post('/tema', async (req, res) => {

  try {
    let errores = [];

    const { titulo, activo, id_unidad} = req.body
    if (!titulo || !activo ) {
      errores.push({text: 'Todos los datos son necesarios'});
    }
    if (errores.length > 0) {
       res.status(400).json({mensaje: 'Ocurrio un error', errores});
     }else {
       const nuevoAvance = new Tema({titulo, activo, id_unidad});
       await nuevoAvance.save();
       res.status(201).json({mensaje: 'Tema creado'});}

  } catch (e) {
    console.log(e);
  }

});

router.put('/update/tema/:id', async (req, res) => {
//  const { codigo, contrasena, email, nombres, apellidos, tipo} = req.body;
const body = req.body;
const _id = req.params.id;
  try {

  const updateTema =  await Tema.findByIdAndUpdate(
      _id,
      body,
      { new: true});
      res.status(201).json(updateTema);

  } catch (error) {
    return res.status(400).json({
      mensaje: 'Ocurrio un error',
      error
    })
  }
});
module.exports = router;
