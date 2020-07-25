const { Router } = require('express');
const router = Router();
const jwt = require('jsonwebtoken');

const Tema = require('../models/Tema');
const Unidad = require('../models/Unidad');
const config = require('../config/config');
const verifyToken = require('../controlers/verifyToken');



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
