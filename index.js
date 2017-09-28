var http = require('http'),
    fs = require('fs'),
    // NEVER use a Sync function except at start-up!
    index = fs.readFileSync(__dirname + '/index.html');
var exp=require("express");
var app=exp(); 
var http=require("http").Server(app);
//var server=http.createServer(app);

var io = require('socket.io').listen(http);

app.use(exp.static(__dirname +"/"));

app.get("/",function(req, res) {
	var contenido=fs.readFileSync("./index.html");
    res.setHeader("Content-type","text/html");
    res.send(contenido);
});

// Send current time to all connected clients
function sendTime() {
    io.emit('time', { time: new Date().toJSON() });
}

// Send current time every 10 secs
setInterval(sendTime, 10000);

// Emit welcome message on connection
io.on('connection', function(socket) {
    // Use socket to communicate with this particular client only, sending it it's own id
    socket.emit('welcome', { message: 'Bienvenido!', id: socket.id });

    socket.on('i am client', console.log);
});

http.listen(3000);