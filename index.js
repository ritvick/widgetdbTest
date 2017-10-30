require("babel-polyfill");
import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes/index';

const port = 3000;

try {
  let app = express();
  app.use(bodyParser.json());
  
  app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  });
  
  app.use('/api/v1', routes);
  
  app.get('/', (req, res) => {
    res.send('Welcome to the express app');
  });
  
  app.listen(port, () => {
    console.log('App started on port - ', port);
  });
} catch(err) {
  console.error('asd' + err);
}
