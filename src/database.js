const mongoose = require('mongoose')


mongoose.connect('mongodb+srv://andres:felipe@cluster0.zotiy.mongodb.net/ovadb',{
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})
  .then(db => console.log('Base de datos conectada'))
  .catch(err => console.error(err));
