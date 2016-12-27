import { Message } from '../models/message';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { LoginCredentials } from '../models/login';
declare var io:any;

export class SocketService {
    private url = 'http://localhost:3000';
    private socket;
    private _messages: Subject<any> = new Subject();
    public messages: Observable<any>;

    constructor() {
        this.messages = this._messages.asObservable();
        this.socket = io(this.url);
        this.socket.on('chat message', (username, msg) => {
            this._messages.next({ username, msg });
        });
    }

    sendMessage(msg): boolean {
        if (this.socket !== null) {
            this.socket.emit('chat message', msg);
            return true;
        }
        return false;
    }

    sendLogin(data: LoginCredentials): boolean {
        if (this.socket !== null) {
            this.socket.emit('login', data);
            return true;
        }
        return false;
    }
}
