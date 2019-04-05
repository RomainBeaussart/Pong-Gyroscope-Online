var http = require('http');
var fs = require('fs');
var gyro_users = ['0','0'];

var srv_pl1 = http.createServer(function(req, res) {
    fs.readFile('./player1.html', 'utf-8', function(error, content) {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(content);
    });
});

var srv_display = http.createServer(function(req, res) {
    fs.readFile('./display.html', 'utf-8', function(error, content) {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(content);
    });
});

var srv_pl2 = http.createServer(function(req, res) {
    fs.readFile('./player2.html', 'utf-8', function(error, content) {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(content);
    });
});


var io1 = require('socket.io').listen(srv_pl1);

io1.sockets.on('connection', function (socket) {

    socket.on('Gyro-1', function (gyro_user_1) {
        console.log('Gyro 1 = ' + gyro_user_1)
        gyro_users[0] = gyro_user_1
    });
});

var io3 = require('socket.io').listen(srv_pl2);

io3.sockets.on('connection', function (socket) {   
    socket.on('Gyro-2', function (gyro_2) {
        console.log('Gyro 2 = ' + gyro_2)
        gyro_users[1] = gyro_2
    });
});

var io2 = require('socket.io').listen(srv_display);

io2.sockets.on('connection', function (socket) {
    setInterval(function(){
        socket.emit('Gyro', gyro_users);
    },10)
});

srv_pl1.listen(8080);
srv_display.listen(8081);
srv_pl2.listen(8082);