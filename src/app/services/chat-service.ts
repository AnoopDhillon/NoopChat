import { Message } from '../models/message';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
// import * as io from 'socket.io';
declare var io:any;

export class ChatService {
    private url = 'http://localhost:3000';
    private socket;
    private _messages: Subject<any> = new Subject();
    public messages: Observable<any>;
    constructor(){
        this.messages = this._messages.asObservable();        
        this.socket = io(this.url);
        this.socket.on('chat message', (username, msg) => {
            this._messages.next({username,msg})
        });
    }

    getMessages(){
        let observable = new Observable(observer => {
           
            
            return () => {
                this.socket.disconnect();
            };
        });
        return observable;
    }

    sendMessage(msg): boolean {
        if (this.socket !== null) {
            this.socket.emit('chat message', msg);
            return true;
        }
        return false;

    }

    sendLogin(nickname): boolean {
        if (this.socket !== null) {
            this.socket.emit('login', nickname);
            return true;
        }
        return false;
    }
}