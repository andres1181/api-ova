const { Router } = require('express');
const router = Router();

const Usuario = require('../models/Usuarios');

//routes
router.get('/', async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.json(usuarios);
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

    const nuevoUsuario = await Usuario.findOne({_id});
    res.json(nuevoUsuario);

  } catch (error) {
    return res.status(400).json({
      mensaje: 'Ocurrio un error',
      error
    })
  }
});

router.post('/', async (req, res) => {
  const { codigo, contrasena, email, nombres, apellidos, tipo} = req.body
  let errores = [];
  const emailUser = await Usuario.findOne({email: email}); //encuantra un email que coincida
  const codigoUser = await Usuario.findOne({codigo: codigo});
  if (!codigo) {
    errores.push({text: 'Requiere un Código'});
  }
  if (!contrasena) {
    errores.push({text: 'Requiere una Contraseña'});
  }
  if (!email) {
    errores.push({text: 'Requiere un email'});
  }
  if (!nombres) {
    errores.push({text: 'Requiere al menos un nombre'});
  }
  if (!apellidos) {
    errores.push({text: 'Faltan al menos un apellido'});
  }
  if (!tipo) {
    errores.push({text: 'Falta el tipo de usuario (profesor o estudiante)'});
  }
  if(emailUser) {
    errores.push({text: 'El email ya existe'});
  }
  if(codigoUser) {
    errores.push({text: 'El Usuario ya existe'});
  }
  if (errores.length > 0) {
    res.status(500).json({errores});
  }else {
      const nuevoUsuario = new Usuario({codigo, contrasena, email, nombres, apellidos,  tipo});
      nuevoUsuario.contrasena = await nuevoUsuario.encryptContrasena(contrasena);
      await nuevoUsuario.save();
      console.log(nuevoUsuario);
      res.send(nuevoUsuario);
    }
});

router.put('/:id', async (req, res) => {
//  const { codigo, contrasena, email, nombres, apellidos, tipo} = req.body;
  const body = req.body;
  const _id = req.params.id;
  try {
  const updateUsuario =  await Usuario.findByIdAndUpdate(
      _id,
      body,
      { new: true});
  res.json(updateUsuario);

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

    const deleteUsuario =  await Usuario.findByIdAndDelete({_id});
    if(!deleteUsuario){
      return res.status(400).json({
        mensaje: 'No existe',
        error
      })
    }
    res.json(deleteUsuario);
  } catch (error) {
    return res.status(400).json({
      mensaje: 'Ocurrio un error',
      error
    })
  }
});

module.exports = router;
