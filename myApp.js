let express = require('express');
let app = express();

function handler(req, res) {
  const path = __dirname + '/views/index.html';
  res.sendFile(path);
}

app.get('/', handler);

module.exports = app;
