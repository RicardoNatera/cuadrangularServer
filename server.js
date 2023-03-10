require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const port = process.env.PORT || 5000;
const generalRouter = require('./src/routes/general.route')
const userRouter = require('./src/routes/user.route')
const gruposRouter = require('./src/routes/grupos.route')
const maestrosRouter = require('./src/routes/maestros.route')
const tarjetasRouter = require('./src/routes/tarjetas.route')
var cors = require('cors')

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors({ 
  origin: ['http://localhost:3000','https://eloquent-beijinho-3c2d53.netlify.app/']
}));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", 'https://eloquent-beijinho-3c2d53.netlify.app/');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

  next();
});



app.use('/general', generalRouter);

app.use('/users', userRouter);

app.use('/grupos', gruposRouter);

app.use('/maestros', maestrosRouter);

app.use('/tarjetas', tarjetasRouter);

app.get('/', (req, res) => {
    res.json({'message': 'ok'});
})

/* Error handler middleware */
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({'message': err.message});
    
    return;
});
  
app.listen(port, () => {
  console.log(`Example app listening on port ${port} :)`)
})