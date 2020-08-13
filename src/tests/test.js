const test = require('ava');
const request = require('supertest');
const app = require('../index');

//Registrar Usuaruio
const user = {
  codigo: 'Codigo',
  contrasena: 'Contraseña',
  email: 'Email',
  nombres: 'Nombres',
//  id_grupo: 'grupo',
  tipo: 'docente',
  activo: true
}
test.cb('Agregar Usuario', (t) => {
  request(app)
    .post('/api/usuarios/')
    .send({
      codigo: 'Codigo',
      contrasena: 'Contraseña',
      email: 'Email',
      nombres: 'Nombres',
    //  id_grupo: 'grupo',
      tipo: 'docente',
      activo: true
    })
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .then(response => {
        //  t.assert(response.body.email, 'Email')
        t.pass('Completada')

      })
    .catch(err => {
      t.fail('fail')
    })
    /*.end(function(err, res) {
        if (err) return t(err);
        t();
      });*/
  /*  .end((err, res) => {
    //  t.falsy(err, 'No hay error')
      t.truthy(res, 'message')
      t.end()
    })*/
})
