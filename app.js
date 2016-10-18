'use strict'

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const jsonfile = require('../sightings');

app.set('view engine','ejs');

app.get('/', function(req, res) {
  res.render('home');
})

app.get('/sightings', function(req, res){
  var filtered = jsonfile.filter(function(obj) {
    var state = req.query.state
    var shape = req.query.shape
    var city = req.query.city
    if('state' in obj && obj.state === state) {
      return true;
    } else if('city' in obj && obj.city === city) {
      return true;
    } else if('shape' in obj && obj.shape === shape) {
      return true;
    }
  });
  res.send(filtered);
})

app.listen(port, function() {
  console.log('on port: '+port);
})
