const express = require('express');
const session = require('express-session');
const cors = require('cors');

//Initiliazations
const app = express();
require('./database');
const morgan = require('morgan');

//Settings
app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2);



//Middlewares

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({exended: false}));
app.use(express.json());
app.use(session({
  secret: 'secretapp',
  resave: true,
  saveUninitialized: true
}));


// Global variables


// Routes
app.use('/api/usuarios',require('./routes/usuarios.js'));
app.use('/api/actividades',require('./routes/actividades.js'));
app.use('/api/estudiante',require('./routes/estudiante.js'));
app.use('/api/administrador',require('./routes/administrador.js'));



// Static Files

//Server is listenning
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});
