const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION Shuting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: './config.env' });

const app = require('./app');

mongoose
  // .connect('mongodb://db/database', {
  .connect(
    'mongodb+srv://Crhistian:_-5vWdW2MQpZzVB@cluster0.bbhy4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log('DB CONECTION SUCCESFULL');
  });

//Blue prints

app.set('port', process.env.PORT || 5000);
const server = app.listen(app.get('port'), () => {
  console.log(`App runing on port ${app.get('port')}`);
});

process.on('unhandledRejection', (err) => {
  console.log('UUNHANDLER REJECTION Shuting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
