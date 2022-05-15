var express = require('express');

var quotesRouter = require('./prod/server');

var app = express();

app.use('/start', quotesRouter);
