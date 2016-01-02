var http = require('http');
var path = require('path');
var express = require('express');
var multer = require('multer');
var fs = require("fs");
var upload = multer({ dest: 'uploads/'});
var app = express();
// Set access control
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
// Default index
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname+"/index.html"));
});
// Analyze url
app.post('/analyze', upload.single("file"), function(req, res) {
  // Get uploaded file data
  var file = {
    "name": req.file.originalname,
    "type": req.file.mimetype,
    "size": req.file.size
  }
  // Delete file
  fs.unlink(req.file.path, function(err) {
    if (err) return console.error(err);
    console.log("File deleted successfully!");
  });
  // Send data
  res.json(file);
});
app.listen(process.env.PORT || 3000); // Listen on port
