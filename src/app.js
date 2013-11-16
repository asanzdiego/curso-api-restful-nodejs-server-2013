// modulos requeridos
var http = require("http");
var express = require("express");
var mongoose = require('mongoose');

var app = express();
var server = http.createServer(app);

// configuramos app
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

// importamos las rutas
var routes = require('./routes/talkRoute')(app);

// conectamos con la base de datos
mongoose.connect('mongodb://localhost/gul', function (error, res) {
    if (error) {
        console.log('ERROR: connecting to MongoDB Database. ' + error);
    } else {
        console.log('Connected to GUL MongoDB Database');
    }
});

// arrancamos el servidor
server.listen(3000, function () {
    console.log("node server running on http://localhost:3000");
});
