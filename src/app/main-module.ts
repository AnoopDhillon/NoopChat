import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, JsonpModule } from '@angular/http';
import { MainApp } from './components/main-app';
import { ChatComponent } from './components/chat-component';
import { SocketService } from './services/socket-service';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        JsonpModule,
        FormsModule
    ],
    declarations: [
        MainApp,
        ChatComponent
    ],
    providers: [ 
        SocketService
    ],
    bootstrap: [
        MainApp
    ]
})

export class MainModule { };
