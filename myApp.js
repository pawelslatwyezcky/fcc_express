let express = require('express');
let dotenv = require('dotenv');

dotenv.config();

let app = express();

app.use('/public', express.static(__dirname + '/public'));

function handler(req, res) {
  const path = __dirname + '/views/index.html';
  res.sendFile(path);
}

function jsonHandler(req, res) {
  if (process.env.MESSAGE_STYLE === 'uppercase') {
    res.json({ message: 'HELLO JSON' });
  } else {
    res.json({ message: 'Hello json' });
  }
}

app.get('/', handler);
app.get('/json', jsonHandler);

module.exports = app;
