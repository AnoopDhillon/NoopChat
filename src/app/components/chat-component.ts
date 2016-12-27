import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocketService } from '../services/socket-service';
import { Router } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'chat-component',
    templateUrl: '../templates/chat-component.html'
})

export class ChatComponent implements OnInit {

    messageHistory: Array<any> = [];
    message: string;

     sendMessage($event) {
         $event.preventDefault();
         this.socketService.sendMessage(this.message);
         this.message = '';
     }

    ngOnInit() {
        this.socketService.messages.subscribe( message => {
                this.messageHistory.push(message);
        });
    }

    constructor(private socketService: SocketService,
                private _router: Router) {};
}