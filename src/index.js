const express = require('express');
const session = require('express-session');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

//Initiliazations
const app = express();
require('./database');


//Settings
app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2);



//Middlewares

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({exended: true}));


// Routes
app.use('/api/usuarios',require('./routes/usuarios.js'));
app.use('/api/actividades',require('./routes/actividades.js'));
app.use('/api/estudiante',require('./routes/estudiante.js'));
app.use('/api/administrador',require('./routes/administrador.js'));
app.use('/api/unidadesTemas',require('./routes/unidadesTemas.js'));
app.use('/api/grupos',require('./routes/grupos.js'));


const history = require('connect-history-api-fallback');
app.use(history());
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(session({
  secret: 'secretapp',
  resave: true,
  saveUninitialized: true
}));


// Global variables





// Static Files

//Server is listenning
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});
