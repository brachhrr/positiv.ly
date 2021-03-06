var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var db = require('./db/db-setup.js');
var wk = require('./workers.js');
var email = require('./outreach/email.js');
var app = express();
var port = process.env.PORT || 8081;

if(!process.env.PORT) {
  var morgan = require('morgan');
  app.use(morgan('dev'));
}

//encoded({ extended: true });
app.use(bodyParser.json());

app.use(express.static(__dirname + '/../client'));
app.use(express.static(__dirname + '/../node_modules'));

require('./routes.js')(app, express, db, wk, email);

app.listen(port, function() {
  console.log('Listening on ' + port);
});

module.exports = {
  app: app,
};