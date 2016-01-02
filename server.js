var http = require('http');
var path = require('path');
var express = require('express');
var app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname+"/index.html"));
});
app.get('/:timestamp', function(req, res) {
  var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var timestamp = req.params.timestamp;
  var result = { unix: null, natural: null };
  var date = new Date(isNaN(timestamp) ? timestamp : parseInt(timestamp, 10)*1000);
  if (date.getTime() > 0) {
    result.unix = Math.floor(date.getTime() / 1000);
    result.natural = months[date.getUTCMonth()] + " " + date.getUTCDate() + ", " + date.getUTCFullYear();
  }
  res.json(result);
});

app.listen(process.env.PORT || 3000);
