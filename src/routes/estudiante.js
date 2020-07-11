const {
  Router
} = require('express');
const router = Router();
const jwt = require('jsonwebtoken');

const AvanceTema = require('../models/AvanceTema');
const AvanceUnidad = require('../models/AvanceUnidad');
const config = require('../config/config');
const verifyToken = require('../controlers/verifyToken');

//routes
router.get('/avance/tema', async (req, res) => {
  //en el frontend se debera buscar los avances que coincidan con el _id del estudiante
  try {
    const avance = await AvanceTema.find().populate('id_tema');
    res.status(200).json(avance);
  } catch (error) {
    return res.status(400).json({
      mensaje: 'Ocurrio un error',
      error: error
    })
  }
});
/*
router.get('/avance/unidad', async (req, res) => {
  try {
    const avance = await AvanceUnidad.find();
    res.status(200).json(avance);
  } catch (error) {
    return res.status(400).json({
      mensaje: 'Ocurrio un error',
      error: error
    })
  }
});*/

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
/*
router.post('/avance/unidad', async (req, res) => {

  try {
    let errores = [];

    const {
      avance,
      id_estudiante,
      id_unidad
    } = req.body
    // const emailUser = await AvanceUnidad.findOne({email: email}); //encuantra un email que coincida
    // const codigoUser = await AvanceUnidad.findOne({codigo: codigo});
    if (!avance || !id_estudiante || !id_unidad) {
      errores.push({
        text: 'Todos los datos son necesarios'
      });
    }
    if (errores.length > 0) {
      res.status(400).json({
        mensaje: 'Ocurrio un error',
        errores
      });
    } else {
      const nuevoAvance = new AvanceUnidad({
        avance,
        id_estudiante,
        id_unidad
      });
      await nuevoAvance.save();
      res.status(201).json({
        mensaje: 'Avance creado'
      });
    }

  } catch (e) {
    console.log(e);
  }

});*/

//Crear por parte del administrador cuando se crea un grupo, un documento donde se almacena la cantidad de fallos por cada tema
router.post('/avanceTema/crear',  async (req, res) => {
  const {
    unidad,
    tema,
    id_grupo
  } = req.body
  let errores = [];
  if (!unidad) {
    errores.push({
      text: 'Requiere una unidad'
    });
  }
  if (!tema) {
    errores.push({
      text: 'Requiere un Tema'
    });
  }
  if (!id_grupo) {
    errores.push({
      text: 'Requiere un grupo'
    });
  }
  if (errores.length > 0) {
    res.status(500).json({
      errores: errores
    });
  } else {
    const nuevoAvance = new AvanceTema({
      unidad,
      tema,
      id_grupo
    });
    await nuevoAvance.save();
    res.status(200).json(nuevoAvance);
  }

});
//Actualizar el numero de fallos
router.put('/avanceTema/actualizar/:tema',  async (req, res) => {
  const body = req.body;
  const _tema = req.params.tema; //id del avance
  try {
    const updateAvance = await AvanceTema.findOneAndUpdate({
        tema: _tema
      },
      body, {
        new: true
      });
    res.status(200).json(updateAvance);

  } catch (e) {
    return res.status(500).json({
      mensaje: 'Ocurrio un error',
      error: e
    })
  }
});

//Dos apis para la realimentacion de los fallos para los estudiantes de manera individual

/*
router.put('/avance/update/unidad/:id', verifyToken, async (req, res) => {
const body = req.body;
const _id = req.params.id;//id del avance
  try {

  const updateAvance =  await AvanceUnidad.findByIdAndUpdate(
      _id,
      body,
      { new: true});
      res.status(201).json(updateAvance);

  } catch (error) {
    return res.status(400).json({
      mensaje: 'Ocurrio un error',
      error
    })
  }
});
*/

module.exports = router;
