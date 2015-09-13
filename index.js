var express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    crypto = require('crypto'),
    Models = require('./lib/models/');

/*!
 * express
 */

var app = express();

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

/*!
 * db
 */

mongoose.connect('mongodb://localhost/sso', function(err, res) {
  if(err) {
    console.log('error connecting to MongoDB Database. ' + err);
  } else {
    console.log('Connected to Database');
  }
});

/*! 
 * Routes
 */

app.post('/person', function (req, res) {
    
  // hash => token (should change name)
  var hash = crypto.randomBytes(16).toString('hex');
  var person = new Models.Person({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    id: req.body.id,
    email: req.body.email,
    gender: req.body.gender,
    birthdate: req.body.birthdate,
    hash: hash
  });
  person.save(function() {
    res.send(hash);
  });
});

app.get('/token/:token', function (req, res) {
  return Models.Person
    .findOne({ 'hash': req.params.token })
    .exec()
    .then(function(person) {
      if (person === null)
        res.send('invalid token');
      else
        res.send(person);
    });
});

/*!
 * Listen to incoming requests
 */
var server = app.listen(3001, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('ID server listening at http://%s:%s', host, port);
});