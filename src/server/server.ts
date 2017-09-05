import * as config from 'config';
import * as express from 'express';
import * as socketIO from 'socket.io';
import * as http from 'http';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import * as loginModel from '../app/models/login';
import * as jwt from 'jsonwebtoken';


let port = config.get('port');
let app = express();
let apiRouter = express.Router();
let server = http.createServer(app);
let io = socketIO(server);

let userList = [
	{
		'username': 'Anoop',
		'password': 'aa'
	},
	{
		'username': 'Me',
		'password': 'me'
	}
];

let activeUsers = [];
let messageHistory = [];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use('/api', apiRouter);

//Middleware
apiRouter.use((request, response, next) => {
	let token = request.body.token || request.query.token || request.headers['x-access-token'];
	if (token) {
		jwt.verify(token, 'secret', (err, decoded) => {
			if (err) {
				response.status(403).send({ status: '403' });
			} else {
				if (findName(request.body.username, request.body.password)) {
					next();
				} else {
					response.status(401).json({ status: '401' });
					response.end();
					return;
				}
			}
		});
	} else {
		return response.status(403).send({ status: '403' });
	}
});

// static content
app.get('/app|res|styles|scripts|server|lib',
	(req: express.Request, res: express.Response) => {
		res.sendFile(req.path, { root: 'dist' });
	});

app.post('/login', (req: any, res: any) => {
	if (findName(req.body.username, req.body.password)) {
		let token = jwt.sign({ username: req.body.username }, 'secret', { expiresIn: 60 * 60 });
		res.json({ 'status': 200, 'token': token, 'expiresAt': Date.now() + (60 * 60 * 1000) });
	} else {
		res.status(403).send({ status: '403' });
	}
});

app.get('/*', (req, res) => {
	res.sendFile(path.join(__dirname, '/../index.html'));
});

io.on('connection', function (socket) {
	let sid = socket.id;
	let username;

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
	for (let entry of userList) {
		if (uname === entry.username && pword === entry.password) {
			return true;
		}
	}
	return false;
}

server.listen(3000, function () {
	console.log('listening on *:3000');
}); 