const jwt = require('jsonwebtoken');
const config = require('../config/config');


function verifyToken (req, res, next) {
  const token = req.headers['x-access-token'];
  const id_ = req.params.id
  console.log(id_);
  if (!token) {
    return res.status(401).json({
      auth: false,
      message: 'Token NO recibido'
    });
  }
  else {
    jwt.verify(token, config.secret, function(error, decode){
      //console.log(req);
      let path_ = req.path;
      var pathUpdate = `/update/${decode.id}`
      var pathMe = `/me/${decode.id}`
      // console.log(path_);
      // console.log(`path: /me/${decode.id}`);
      // console.log(decode.tipo);
      if (error) {
        return res.status(401).send({message: 'Error de autorización'})
      }
      if (decode.tipo == 'admin') {
        next();
      }
      if (decode.tipo === 'estudiante') {

        //console.log(pathUpdate);
        if ( path_ === pathMe) {
          // console.log('Estudiante');
           console.log(decode);
          // console.log(req.path);
          // req.usuarioId = decode.id;
          // req.usuarioId = decode.tipo;
          next();
        } if ( path_ === pathUpdate) {

          // console.log('Estudiante');
          // console.log(decode);
          // console.log(req.path);
          // req.usuarioId = decode.id;
          // req.usuarioId = decode.tipo;
          next();
        }

      }
      if (decode.tipo === 'docente') {
        if (path_ === '/crear' || path_ === '/listarAct' || path_ === `/obtenerAct/${id_}`) {
          // console.log('Docente');
          // req.usuarioId = decode.id;
          // req.usuarioId = decode.tipo;
          next();
        }
        if ( path_ === pathMe) {
          // console.log('Estudiante');
          // console.log(decode);
          // console.log(req.path);
          // req.usuarioId = decode.id;
          // req.usuarioId = decode.tipo;
          next();
        } if ( path_ === pathUpdate) {

          // console.log('Estudiante');
          // console.log(decode);
          // console.log(req.path);
          // req.usuarioId = decode.id;
          // req.usuarioId = decode.tipo;
          next();
        }

      }
    });
  }
  // const decode = jwt.verify(token, config.secret);
  // req.usuarioId = decode.id;
  // console.log(decode);
  // next();
  // if (req.body.tipo == 'admin') {
  //   next();
  // }
  //
  // if (req.body.tipo == 'estudiante') {
  //   if (req.path == '/update/:id' || '/me') {
  //      next();
  //   }
  //   else {
  //     res.status(401).send({message: 'No está autorizado para ingresar aqui'})
  //   }
  // }
  // if (decode.tipo) {
  //
  // }
  // if(req.path == '/update/:id' || ){//
  //   if
  // }
  //
}

module.exports = verifyToken;
