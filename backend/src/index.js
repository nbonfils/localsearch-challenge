import express from 'express';
import request from 'request';

const app = express();

app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.append('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/places/:placeId', (req, res) => {
  const { placeId } = req.params;

  const url = `https://storage.googleapis.com/coding-session-rest-api/${placeId}`;

  request(url, { json: true }, (err, response, body) => {
    res.send(body);
  });
});

app.listen(3000);
