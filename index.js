var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);

var Users = ['A','B','C'];
var messageHistory = [];

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

app.get('/css/*', (req, res) => {
    res.sendFile(req.path, {root:'./'});
});

io.on('connection', function(socket){
    var sid = socket.id;
    var username;
    messageHistory.forEach(function(post){
        socket.emit('chat message', post.name, post.message);
    });

    socket.on("chat message", function(msg){
        messageHistory.push({
            name: username,
            message: msg    
        });
        io.emit('chat message', username, msg);
    });

    socket.on("disconnect", function(){
        io.emit('alert', username + ' has disconnected');
    });

    socket.on("login", function(nickName){
        console.log("login detected");
        username = nickName;
        Users.push({
            id: sid,
            name: nickName    
        });
        socket.broadcast.emit("alert", username + " has connected");
    });
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});

function findName(sid){
    for (entry of Users){
        if(sid === entry.id){
            return entry.name;
        }
    }
}