import express from 'express';
import request from 'request';

const app = express();

// Middleware to avoid the CORS error
app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.append('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// The only route that we need to fullfil the requirements
// This route simply forwards the API request
app.get('/places/:placeId', (req, res) => {
  // Get the URL param
  const { placeId } = req.params;

  // Get the eternal API URL based on the place ID
  const url = `https://storage.googleapis.com/coding-session-rest-api/${placeId}`;

  // Forward the request
  request(url, { json: true }, (err, response, body) => {
    // Forward the response body back
    res.send(body);
  });
});

app.listen(3000);
