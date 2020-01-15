const { Router } = require('express');
const router = Router();
const jwt = require('jsonwebtoken');

const Grupo = require('../models/Grupo');
const EstudianteGrupo = require('../models/EstudianteGrupo');
const config = require('../config/config');
const verifyToken = require('../controlers/verifyToken');

//routes
router.get('/obtener/grupos', async (req, res) => {
  try {
    const grupos = await Grupo.find();
    res.json(grupos);
  } catch (error) {
    return res.status(400).json({
      mensaje: 'Ocurrio un error',
      error
    })
  }
});

router.get('/obtener/grupo/:id', async (req, res) => {
  const _id = req.params.id;
  try {
    const nuevoUsuario = await Grupo.findOne({_id});
    res.json(nuevoUsuario);

  } catch (error) {
    return res.status(400).json({
      mensaje: 'Ocurrio un error',
      error
    })
  }
});

router.get('/obtener/integrantes', async (req, res) => {
  try {
    const estudiantes = await EstudianteGrupo.find();
    res.json(estudiantes);
  } catch (error) {
    return res.status(400).json({
      mensaje: 'Ocurrio un error',
      error
    })
  }
});

router.post('/crear/grupo', async (req, res) => {

  try {
    let errores = [];

    const {nombre, activo} = req.body
    // const emailUser = await AvanceUnidad.findOne({email: email}); //encuantra un email que coincida
    // const codigoUser = await AvanceUnidad.findOne({codigo: codigo});
    if (!nombre) {
      errores.push({text: 'Todos los datos son necesarios'});
    }
    if (errores.length > 0) {
       res.status(400).json({mensaje: 'Ocurrio un error', errores});
     }else {
       const nuevoGrupo = new Grupo({activo, nombre});
       await nuevoGrupo.save();
       res.status(201).json({mensaje: 'Grupo creado'});}

  } catch (e) {
    console.log(e);
  }

});
router.post('/agregarEstudiante', async (req, res) => {

  try {
    let errores = [];

    const {id_grupo, id_estudiante} = req.body
    // const emailUser = await AvanceUnidad.findOne({email: email}); //encuantra un email que coincida
    // const codigoUser = await AvanceUnidad.findOne({codigo: codigo});
    if (!id_grupo || !id_estudiante) {
      errores.push({text: 'Todos los datos son necesarios'});
    }
    if (errores.length > 0) {
       res.status(400).json({mensaje: 'Ocurrio un error', errores});
     }else {
       const nuevoGrupo = new Grupo({id_grupo, id_estudiante});
       await nuevoGrupo.save();
       res.status(201).json({mensaje: 'Estudiante Agregado'});}

  } catch (e) {
    console.log(e);
  }

});
//get con parametros
// router.get('/find/avance/tema/:id', async (req, res) => {
//   const id_estudiante = req.params.id;
//   //se encuentran todos los avaces del estudiante, luego en el frontend se seleccionan los del respectivo tema
//   //en el frontend se envia como prop al iniciar Sesión
//   try {
//     const avance = await AvanceTema.find('id_estudiante');
//     res.json(avance);
//
//   } catch (error) {
//     return res.status(400).json({
//       mensaje: 'Ocurrio un error',
//       error
//     })
//   }
// });

//
//
// router.post('/avance/unidad', async (req, res) => {
//
//   try {
//     let errores = [];
//
//     const { avance, id_estudiante, id_unidad} = req.body
//     // const emailUser = await AvanceUnidad.findOne({email: email}); //encuantra un email que coincida
//     // const codigoUser = await AvanceUnidad.findOne({codigo: codigo});
//     if (!avance || !id_estudiante || !id_unidad) {
//       errores.push({text: 'Todos los datos son necesarios'});
//     }
//     if (errores.length > 0) {
//        res.status(400).json({mensaje: 'Ocurrio un error', errores});
//      }else {
//        const nuevoAvance = new AvanceUnidad({avance, id_estudiante, id_unidad});
//        await nuevoAvance.save();
//        res.status(201).json({mensaje: 'Avance creado'});}
//
//   } catch (e) {
//     console.log(e);
//   }
//
// });
//
// router.post('/avance/tema', async (req, res) => {
//
//   try {
//     let errores = [];
//
//     const { terminado, id_estudiante, id_tema} = req.body
//     // const emailUser = await AvanceUnidad.findOne({email: email}); //encuantra un email que coincida
//     // const codigoUser = await AvanceUnidad.findOne({codigo: codigo});
//     if (!id_estudiante || !id_tema) {
//       errores.push({text: 'Todos los datos son necesarios'});
//     }
//     if (errores.length > 0) {
//        res.status(400).json({mensaje: 'Ocurrio un error', errores});
//      }else {
//        const nuevoAvance = new AvanceTema({terminado, id_estudiante, id_tema});
//        await nuevoAvance.save();
//        res.status(201).json({mensaje: 'Avance Agregado'});}
//
//   } catch (e) {
//     console.log(e);
//   }
//
// });
//
// router.put('/avance/update/tema/:id', verifyToken, async (req, res) => {
// const body = req.body;
// const _id = req.params.id;//id del avance
//   try {
//
//   const updateAvance =  await AvanceTema.findByIdAndUpdate(
//       _id,
//       body,
//       { new: true});
//       res.status(201).json(updateAvance);
//
//   } catch (error) {
//     return res.status(400).json({
//       mensaje: 'Ocurrio un error',
//       error
//     })
//   }
// });
// router.put('/avance/update/unidad/:id', verifyToken, async (req, res) => {
// const body = req.body;
// const _id = req.params.id;//id del avance
//   try {
//
//   const updateAvance =  await AvanceUnidad.findByIdAndUpdate(
//       _id,
//       body,
//       { new: true});
//       res.status(201).json(updateAvance);
//
//   } catch (error) {
//     return res.status(400).json({
//       mensaje: 'Ocurrio un error',
//       error
//     })
//   }
// });
router.delete('/delete/grupo/:id',  async (req, res) => {//verifyToken,


  try {
    const _id = req.params.id;
    const deleteGrupo =  await Grupo.findByIdAndDelete({_id});
    if(!deleteGrupo){
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
//
// router.get('/me/:id',verifyToken, async (req, res) => {
//   const _id = req.params.id;
//   try {
//     const nuevoUsuario = await Usuario.findOne({_id});
//     res.status(201).json(nuevoUsuario);
//
//   } catch (error) {
//     return res.status(400).json({
//       mensaje: 'Ocurrio un error',
//       error
//     })
//   }
// });

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

// router.post('/login', async (req, res, next) => {
//   try {
//
//     const { codigo, contrasena} = req.body;
//
//     const usuario = await Usuario.findOne({codigo: codigo});
//     if (!usuario) {
//       return res.status(404).send('El usuario con el código no existe');
//     }
//     const validContrasena = await usuario.validatePassword(contrasena);
//     if (!validContrasena) {
//
//       return res.status(401).json({auth: false, token: null});
//
//     }
//
//     const token = await jwt.sign(
//       {
//         id: usuario._id,
//         tipo: usuario.tipo,
//         codigo: usuario.codigo,
//         email: usuario.email,
//         nombres: usuario.nombres
//
//       },
//       config.secret,
//       {
//         expiresIn: 60 * 60 * 6
//       });
//     res.status(200).json({auth: true, token});
//
//   } catch (e) {
//     console.log(e);
//   }
//
// });

module.exports = router;
