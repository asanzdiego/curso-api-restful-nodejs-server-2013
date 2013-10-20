var express = require("express"),
    app = express(),
    http = require("http"),
    server = http.createServer(app),
    mongoose = require('mongoose');

app.configure(function () {
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        if ('OPTIONS' == req.method) {
            res.send(200);
        } else {
            next();
        }
    });
    app.use(app.router);
});

routes = require('./routes/talkRoute')(app);

mongoose.connect('mongodb://localhost/gul', function (error, res) {
  if (error) {
    console.log('ERROR: connecting to MongoDB Database. ' + error);
  } else {
    console.log('Connected to GUL MongoDB Database');
  }
});

server.listen(3000, function () {
  console.log("node server running on http://localhost:3000");
});
