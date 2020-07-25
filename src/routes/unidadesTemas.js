const {
  Router
} = require('express');
const router = Router();

const Unidad = require('../models/Unidad');
const Tema = require('../models/Tema');
const verifyToken = require('../controlers/verifyToken')

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


router.put('/actualizarUnidad/:id', async (req, res) => {
//  const { codigo, contrasena, email, nombres, apellidos, tipo} = req.body;
const body = req.body;
const _id = req.params.id;
  try {

  const updateUnidad =  await Unidad.findByIdAndUpdate(
      _id,
      body,
      { new: true});
      res.status(200).json(updateUnidad);

  } catch (error) {
    return res.status(400).json({
      mensaje: 'Ocurrio un error',
      error
    })
  }
});

router.put('/actualizarTema/:id', async (req, res) => {
//  const { codigo, contrasena, email, nombres, apellidos, tipo} = req.body;
const body = req.body;
const _id = req.params.id;
  try {

  const updateTema =  await Tema.findByIdAndUpdate(
      _id,
      body,
      { new: true});
      res.status(200).json(updateTema);

  } catch (error) {
    return res.status(400).json({
      mensaje: 'Ocurrio un error',
      error
    })
  }
});

router.post('/crearUnidad', async (req, res) => {
  const {
    nombre,
    componente,
    activo
  } = req.body
  let errores = [];
  if (!nombre) {
    errores.push({
      text: 'Requiere un nombre'
    });
  }
  if (!componente) {
    errores.push({
      text: 'Requiere un componente'
    });
  }
  try {
    if (errores.length > 0) {
      res.status(400).json({
        mensaje: 'Ocurrio un error',
        errores: errores
      });
    } else {
      const nuevaUnidad = new Unidad({
        nombre,
        componente,
        activo
      });
      await nuevaUnidad.save();
      res.status(200).json(nuevaUnidad);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      mensaje: 'Ocurrio un error',

      error: error
    })
  }
});

router.post('/crearTema', async (req, res) => {
  const {
    nombre,
    componente,
    activo,
    id_unidad

  } = req.body
  let errores = [];
  if (!nombre) {
    errores.push({
      text: 'Requiere un nombre'
    });
  }
  if (!componente) {
    errores.push({
      text: 'Requiere un componente'
    });
  }
  if (!id_unidad) {
    errores.push({
      text: 'Requiere una id_unidad'
    });
  }
  try {
    if (errores.length > 0) {
      res.status(400).json({
        mensaje: 'Ocurrio un error',
        errores: errores
      });
    } else {
      const nuevoTema = new Tema({
        nombre,
        componente,
        activo,
        id_unidad
      });
      await nuevoTema.save();
      res.status(200).json(nuevoTema);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      mensaje: 'Ocurrio un error',

      error: error
    })
  }
});

router.get('/obtenerUnidades/:componente', async (req, res) => {
  console.log(req.params);
  const _componente = req.params.componente;
  try {

    const lista = await Unidad.find({
      componente: _componente
    });
    res.status(200).json(lista);

  } catch (error) {
    console.error(error);
    return res.status(400).json({
      mensaje: 'Ocurrio un error',

      Error: error
    })
  }
});

router.get('/obtenerTemas/:unidad', async (req, res) => {
  console.log(req.params);
  const _unidad = req.params.unidad;
  try {

    const lista = await Tema.find({
      id_unidad: _unidad
    }).populate('id_unidad');
    res.json(lista);

  } catch (error) {
    console.error(error);
    return res.status(400).json({
      mensaje: 'Ocurrio un error',

      error
    })
  }
});

module.exports = router;
