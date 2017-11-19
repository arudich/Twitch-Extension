const http = require('http');
var morgan = require('morgan');
var fs = require('fs');

var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
app = express();

// Set views directory
app.set('views', __dirname + '/views');

// Define the view (templating) engine
app.set('view engine', 'ejs');

// Log requests
app.use(morgan('tiny'));

// parse application/x-www-form-urlencoded, with extended qs library
app.use(bodyParser.urlencoded({extended:true}));

// Load all routes in the routes directory
fs.readdirSync('./../routes').forEach(function (file){
    // There might be non-js files in the directory that should not be loaded
    if(path.extname(file)==".js"){
        console.log('Adding routes in ' + file);
        require('./../routes/' + file).init(app);
    }
})

// middleware code


// make the server
var httpServer = http.Server(app);
// set up socket.io
var sio = require('socket.io');
var io = sio(httpServer);


const hostname = '127.0.0.1';
const port = 3000;

httpServer.listen(port, hostname, function(){
    console.log(`Server running at http://${hostname}:${port}/`)
})


// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World\n');
// });


