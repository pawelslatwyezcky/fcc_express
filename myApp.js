let express = require('express');
let app = express();

app.use(express.static(__dirname + '/public/'));
app.use('/public', express.static(__dirname + '/public'));

function handler(req, res) {
  const path = __dirname + '/views/index.html';
  res.sendFile(path);
}

app.get('/', handler);

module.exports = app;
