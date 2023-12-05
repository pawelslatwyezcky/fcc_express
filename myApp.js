let express = require('express');
let dotenv = require('dotenv');
let bodyParser = require('body-parser');

dotenv.config();

let app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/public', express.static(__dirname + '/public'));

function middleware(req, res, next) {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
}

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
app.use(middleware);
app.get('/', handler);
app.get('/json', jsonHandler);
app.get(
  '/now',
  function (req, res, next) {
    req.time = new Date().toString();
    next();
  },
  function (req, res) {
    res.json({ time: req.time });
  }
);
app.get('/:word/echo', function (req, res) {
  res.json({ echo: req.params.word });
});
app
  .route('/name')
  .get(function (req, res) {
    const { first, last } = req.query;
    res.json({ name: `${first} ${last}` });
  })
  .post(function (req, res) {
    const { first, last } = req.body;
    res.json({ name: `${first} ${last}` });
  });

module.exports = app;
