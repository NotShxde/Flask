var express = require('express');

var quotesRouter = require('./prod/server');

var app = express();


app.get('/', (req, res) => {
  res.send('Hello Express app!')
});


app.get('/start', quotesRouter);
