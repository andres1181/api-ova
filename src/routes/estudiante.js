const {
  Router
} = require('express');
const router = Router();
const jwt = require('jsonwebtoken');

const AvanceTema = require('../models/AvanceTema');
const AvanceTemaEstudiante = require('../models/AvanceTemaEstudiante');
const config = require('../config/config');
const verifyToken = require('../controlers/verifyToken');

//routes
router.get('/avance/tema', async (req, res) => {
  //en el frontend se debera buscar los avances que coincidan con el _id del estudiante
  try {
    const avance = await AvanceTemaEstudiante.find().populate('id_tema');
    res.status(200).json(avance);
  } catch (error) {
    return res.status(400).json({
      mensaje: 'Ocurrio un error',
      error: error
    })
  }
});

router.get('/listarAvances/tema/:estudiante', async (req, res) => {
  //en el frontend se debera buscar los avances que coincidan con el _id del estudiante
  const _estudiante = req.params.estudiante;
  try {
    const avance = await AvanceTemaEstudiante.find({
      id_estudiante: _estudiante
    }).populate('id_tema');
    res.status(200).json(avance);
  } catch (error) {
    return res.status(400).json({
      mensaje: 'Error en el servidor',
      error: error
    })
  }
});
router.get('/listarAvances/tema', async (req, res) => {
  //en el frontend se debera buscar los avances que coincidan con el _id del estudiante

  try {
    const avances = await AvanceTemaEstudiante.find().populate('id_tema');
    res.status(200).json(avances);
  } catch (error) {
    return res.status(400).json({
      mensaje: 'Ocurrio un error',
      error: error
    })
  }
});


//Crear por parte del administrador cuando se crea un grupo, un documento donde se almacena la cantidad de fallos por cada tema
router.post('/avanceTema/crear', async (req, res) => {
  const {
    id_estudiante,
    id_tema,
    aprobado
  } = req.body
  let errores = [];
  if (!id_estudiante) {
    errores.push({
      text: 'Requiere un id de estudiante'
    });
  }
  if (!id_tema) {
    errores.push({
      text: 'Requiere un id de estudiante'
    });
  }

  if (errores.length > 0) {
    res.status(500).json({
      errores: errores
    });
  } else {
    const nuevoAvance = new AvanceTemaEstudiante({
      id_estudiante,
      id_tema,
      aprobado
    });
    await nuevoAvance.save();
    res.status(200).json(nuevoAvance);
  }

});
//Actualizar el numero de fallos
// router.put('/avanceTema/actualizar/:tema', async (req, res) => {
//   const body = req.body;
//   const _tema = req.params.tema; //id del avance
//   try {
//     const updateAvance = await AvanceTemaEstudiante.findOneAndUpdate({
//         tema: _tema
//       },
//       body, {
//         new: true
//       });
//     res.status(200).json(updateAvance);
//
//   } catch (e) {
//     return res.status(500).json({
//       mensaje: 'Ocurrio un error',
//       error: e
//     })
//   }
// });

//Actualizar el numero de fallos por id del grupo e id tema
// router.put('/avanceTema/actualizar/:tema/:grupo', async (req, res) => {
//   const body = req.body;
//   const _tema = req.params.tema;
//   const _grupo = req.params.grupo;
//   try {
//     const updateAvance = await AvanceTemaEstudiante.findOneAndUpdate({
//         id_tema: _tema,
//         id_grupo: _grupo
//       },
//       body, {
//         new: true
//       });
//     res.status(200).json(updateAvance);
//
//   } catch (e) {
//     return res.status(500).json({
//       mensaje: 'Ocurrio un error',
//       error: e
//     })
//   }
// });


router.put('/avanceTema/actualizar/:id', async (req, res) => {
  const body = req.body;
  const id_ = req.params.id;
    console.log('Avance actualizar');
  console.log(req.params.id);
  try {
    const updateAvance = await AvanceTemaEstudiante.findOneAndUpdate({
        _id: id_
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


module.exports = router;
