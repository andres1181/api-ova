const { Router } = require('express');
const router = Router();
const jwt = require('jsonwebtoken');


// var corsOptions = {
//   origin: 'http://localhost:8080',
//   methods: ["POST"],
//   optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// }

const Usuario = require('../models/Usuario');
const config = require('../config/config');
const verifyToken = require('../controlers/verifyToken')

// app.use(cors(corsOptions))


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
router.get('/find/:id', async (req, res) => {
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

  try {
    let errores = [];

    const { codigo, contrasena, email, nombres, tipo, activo} = req.body
    const emailUser = await Usuario.findOne({email: email}); //encuantra un email que coincida
    const codigoUser = await Usuario.findOne({codigo: codigo});
    if (!codigo || !contrasena || !email || !nombres || !tipo) {
      errores.push({text: 'Todos los datos son necesarios'});
    }if(nombres==''){
      errores.push({text: 'Nombre requerido'});
    }
    if(emailUser) {
     errores.push({text: 'El email ya existe'});

    }
    if(codigoUser) {
     errores.push({text: 'El usuario ya existe'});
    }if (errores.length > 0) {
       res.status(400).json({mensaje: 'Ocurrio un error', errores});
     }else {
       const nuevoUsuario = new Usuario({codigo, contrasena, email, nombres, tipo, activo});
       nuevoUsuario.contrasena = await nuevoUsuario.encryptContrasena(contrasena);
       await nuevoUsuario.save();
       res.status(201).json({mensaje: 'Usuario creado', usuario: nuevoUsuario});}

  } catch (e) {
    console.log(e);
  }

});

router.put('/update/:id', verifyToken, async (req, res) => {
//  const { codigo, contrasena, email, nombres, apellidos, tipo} = req.body;
const body = req.body;
const _id = req.params.id;
  try {

  const updateUsuario =  await Usuario.findByIdAndUpdate(
      _id,
      body,
      { new: true});
      res.status(201).json(updateUsuario);

  } catch (error) {
    return res.status(400).json({
      mensaje: 'Ocurrio un error',
      error
    })
  }
});

router.delete('/delete/:id', verifyToken, async (req, res) => {


  try {
    const _id = req.params.id;
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

router.get('/me/:id',verifyToken, async (req, res) => {
  const _id = req.params.id;
  try {
    const nuevoUsuario = await Usuario.findOne({_id});
    res.status(201).json(nuevoUsuario);

  } catch (error) {
    return res.status(400).json({
      mensaje: 'Ocurrio un error',
      error
    })
  }
});

//Autenticacion
// router.get('/me/:id', verifyToken, async (req, res) => {//regresa los datos de un usuario cuando se le envia un token
//   const _id = req.params.id;
//   try {
//     const user = await Usuario.findById(_id, {
//       contrasena: 0
//     });
//       res.json(user);
//
//
//   } catch (e) {
//   console.log(e);
//   return res.status(400).json({
//     mensaje: 'Ocurrio un error',
//     e
//   })
// }
//
// });
// router.get('/me', verifyToken, async (req, res, next) => {//regresa los datos de un usuario cuando se le envia un token
//
//   const user = await Usuario.findById(req.usuarioId, {
//     contrasena: 0
//   });
//   if (!user) {
//     return res.status(404).send('Usuario no encontrado')
//   }
//
//   res.status(200).json(user);
// });

router.post('/login', async (req, res, next) => {
  try {

    const { codigo, contrasena} = req.body;

    const usuario = await Usuario.findOne({codigo: codigo});
    if (!usuario) {
      return res.status(404).send('El usuario con el código no existe');
    }
    const validContrasena = await usuario.validatePassword(contrasena);
    if (!validContrasena) {

      return res.status(401).json({auth: false, token: null});

    }

    const token = await jwt.sign(
      {
        id: usuario._id,
        tipo: usuario.tipo,
        codigo: usuario.codigo,
        email: usuario.email,
        nombres: usuario.nombres

      },
      config.secret,
      {
        expiresIn: 60 * 60 * 6
      });
    res.status(200).json({auth: true, token});

  } catch (e) {
    console.log(e);
  }

});

module.exports = router;
