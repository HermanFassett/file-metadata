var http = require('http');
var path = require('path');
var express = require('express');
var app = express();

var bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname+"/index.html"));
});

app.post('/analyze', function(req, res) {
  res.json({"filename": req.body.file, "data": JSON.parse(req.body.filedata)});
});

app.listen(process.env.PORT || 3000);
