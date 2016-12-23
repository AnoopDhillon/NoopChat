import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService } from '../services/chat-service';

@Component({
    moduleId: module.id,
    selector: 'chat-component',
    templateUrl: '../templates/chat-component.html'
})

export class ChatComponent implements OnInit {

    messageHistory: Array<any> = [];
    message: string;

     sendMessage($event){
         $event.preventDefault();
         this.chatService.sendMessage(this.message);
         this.message = '';
     }

    ngOnInit() {
        // this.chatService.getMessages()
        // .subscribe( data => {
        //     this.messageHistory.push(data);
        // });
        this.chatService.messages.subscribe( message => {
                this.messageHistory.push(message);
        })
    }

    constructor(private chatService: ChatService){};
}