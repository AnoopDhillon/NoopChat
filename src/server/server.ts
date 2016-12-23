import * as config from 'config';
import * as express from 'express';
import * as socketIO from 'socket.io';
import * as http from 'http';
import * as path from 'path';

let port = config.get('port');
let app = express();
let server = http.createServer(app);
let io = socketIO(server);

let Users = [];
let messageHistory = [];

// static content
app.get('/app|res|styles|scripts|server|lib',
 (req: express.Request, res: express.Response) => {
 res.sendFile(req.path, { root: 'dist' });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/../index.html'));
});

io.on('connection', function(socket){
var sid = socket.id;
    var username = 'Anoop';
    messageHistory.forEach(function(post){
        socket.emit('chat message', post.name, post.message);
    });

    socket.on('chat message', function(msg){
        console.log(msg);
        messageHistory.push({
            name: username,
            message: msg
        });
        io.emit('chat message', username, msg);
        console.log(username + msg);
    });

    socket.on('disconnect', function(){
        io.emit('alert', username + ' has disconnected');
    });

    socket.on('login', function(nickName){
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
    for (let entry of Users) {
        if (sid === entry.id) {
            return entry.name;
        }
    }
}

server.listen(3000, function(){
    console.log('listening on *:3000');
}); 