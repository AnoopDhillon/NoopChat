"use strict";
var config = require("config");
var express = require("express");
var socketIO = require("socket.io");
var http = require("http");
var path = require("path");
var port = config.get('port');
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var Users = [];
var messageHistory = [];
// static content
app.get('/app|res|styles|scripts|server|lib', function (req, res) {
    res.sendFile(req.path, { root: 'dist' });
});
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/../index.html'));
});
io.on('connection', function (socket) {
    var sid = socket.id;
    var username = 'Anoop';
    messageHistory.forEach(function (post) {
        socket.emit('chat message', post.name, post.message);
    });
    socket.on('chat message', function (msg) {
        console.log(msg);
        messageHistory.push({
            name: username,
            message: msg
        });
        io.emit('chat message', username, msg);
        console.log(username + msg);
    });
    socket.on('disconnect', function () {
        io.emit('alert', username + ' has disconnected');
    });
    socket.on('login', function (nickName) {
        console.log('login detected');
        username = nickName;
        Users.push({
            id: sid,
            name: nickName
        });
        socket.broadcast.emit('alert', username + ' has connected');
    });
});
function findName(sid) {
    for (var _i = 0, Users_1 = Users; _i < Users_1.length; _i++) {
        var entry = Users_1[_i];
        if (sid === entry.id) {
            return entry.name;
        }
    }
}
server.listen(3000, function () {
    console.log('listening on *:3000');
});

//# sourceMappingURL=server.js.map
