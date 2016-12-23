import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, JsonpModule } from '@angular/http';
import { MainApp } from './components/main-app';
import { ChatComponent } from './components/chat-component';
import { ChatService } from './services/chat-service';

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
    providers: [ ChatService ],
    bootstrap: [
        MainApp
    ]
})

export class MainModule { };
