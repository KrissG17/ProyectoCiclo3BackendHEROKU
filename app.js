import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';

const app = express();


//Conexion a DB

const mongoose = require('mongoose');
// const uri = 'mongodb://localhost:27017/prueba';


const uri = 'mongodb+srv://krissg1:789456Kris@cluster0.m4b1c.mongodb.net/notas?retryWrites=true&w=majority';

const options = {useNewUrlParser: true, useUnifiedTopology:true};


mongoose.connect(uri, options).then(
    () => {
        console.log('Conectado a DB')
     },
    err => { err }
  );


// Middleware
app.use(morgan('tiny'));
app.use(cors());

app.use((req, res, next)=> {
  res.header("Access-Control-Allow-Origin","*");
  res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, ContentType, Accept");
  res.header('Access-Control-Allow-Methods','GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow','GET, POST, OPTIONS, PUT, DELETE');
  next();  
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(express.static(path.join(__dirname, 'public')));

/** RUTAS
app.get('/', function (req, res) {
 res.send('Hello World!');
});
*/

app.use('/api', require('./routes/nota'));
app.use('/api', require('./routes/libro'));


// Middleware para Vue.js router modo history
const history = require('connect-history-api-fallback');
app.use(history());
app.use(express.static(path.join(__dirname, 'public')));

//Puerto

app.set('puerto', process.env.PORT || 3000);
app.listen(app.get('puerto'), function () {
 console.log('Sever started on port:'+ app.get('puerto'));
});
