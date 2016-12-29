import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, JsonpModule } from '@angular/http';
import { routing } from './routes';
import { MainApp } from './components/main-app';
import { ChatComponent } from './components/chat-component';
import { LoginComponent } from './components/login-component';
import { SocketService } from './services/socket-service';
import { AuthService } from './services/auth-service';
import { AuthGuard } from '../auth-guard';

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
        SocketService,
        AuthService,
        AuthGuard
    ],
    bootstrap: [
        MainApp
    ]
})

export class MainModule { };
