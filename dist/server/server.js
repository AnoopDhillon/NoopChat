"use strict";
var config = require("config");
var express = require("express");
var socketIO = require("socket.io");
var http = require("http");
var bodyParser = require("body-parser");
var path = require("path");
var jwt = require("jsonwebtoken");
var port = config.get('port');
var app = express();
var apiRouter = express.Router();
var server = http.createServer(app);
var io = socketIO(server);
var userList = [
    {
        'username': 'Anoop',
        'password': 'aa'
    },
    {
        'username': 'Me',
        'password': 'me'
    }
];
var activeUsers = [];
var messageHistory = [];
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use('/api', apiRouter);
//Middleware
apiRouter.use(function (request, response, next) {
    var token = request.body.token || request.query.token || request.headers['x-access-token'];
    if (token) {
        jwt.verify(token, 'secret', function (err, decoded) {
            if (err) {
                response.status(403).send({ status: '403' });
            }
            else {
                if (findName(request.body.username, request.body.password)) {
                    next();
                }
                else {
                    response.status(401).json({ status: '401' });
                    response.end();
                    return;
                }
            }
        });
    }
    else {
        return response.status(403).send({ status: '403' });
    }
});
// static content
app.get('/app|res|styles|scripts|server|lib', function (req, res) {
    res.sendFile(req.path, { root: 'dist' });
});
app.post('/login', function (req, res) {
    if (findName(req.body.username, req.body.password)) {
        var token = jwt.sign({ username: req.body.username }, 'secret', { expiresIn: 60 * 60 });
        res.json({ 'status': 200, 'token': token, 'expiresAt': Date.now() + (60 * 60 * 1000) });
    }
    else {
        res.status(403).send({ status: '403' });
    }
});
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '/../index.html'));
});
io.on('connection', function (socket) {
    var sid = socket.id;
    var username;
    messageHistory.forEach(function (post) {
        socket.emit('chat message', post.name, post.message);
    });
    socket.on('chat message', function (msg) {
        messageHistory.push({
            name: username,
            message: msg
        });
        io.emit('chat message', username, msg);
    });
    socket.on('disconnect', function () {
        io.emit('alert', username + ' has disconnected');
    });
    socket.on('login', function (data) {
        username = data.username;
        activeUsers.push({
            id: sid,
            name: data.username,
            password: data.password
        });
        socket.broadcast.emit('alert', username + ' has connected');
    });
});
function findName(uname, pword) {
    for (var _i = 0, userList_1 = userList; _i < userList_1.length; _i++) {
        var entry = userList_1[_i];
        if (uname === entry.username && pword === entry.password) {
            return true;
        }
    }
    return false;
}
server.listen(3000, function () {
    console.log('listening on *:3000');
});

//# sourceMappingURL=server.js.map
