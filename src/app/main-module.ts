import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, JsonpModule } from '@angular/http';
import { routing } from './routes';
import { MainApp } from './components/main-app';
import { ChatComponent } from './components/chat-component';
import { LoginComponent } from './components/login-component';
import { SocketService } from './services/socket-service';

@NgModule({
    imports: [
        routing,
        BrowserModule,
        HttpModule,
        JsonpModule,
        FormsModule
    ],
    declarations: [
        MainApp,
        ChatComponent,
        LoginComponent
    ],
    providers: [
        SocketService
    ],
    bootstrap: [
        MainApp
    ]
})

export class MainModule { };
