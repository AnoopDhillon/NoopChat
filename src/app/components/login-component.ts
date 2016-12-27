import { Component } from '@angular/core';
import { SocketService } from '../services/socket-service';
import { Router } from '@angular/router';
import { LoginCredentials } from '../models/login';
import { NgForm } from '@angular/forms';

@Component({
    moduleId: module.id,
    selector: 'login-component',
    templateUrl: '../templates/login-component.html',
    styleUrls: ['../../styles/login.css']
})

export class LoginComponent {

    onLogin(f: NgForm) {
        this.socketService.sendLogin(new LoginCredentials(f.value.username, f.value.password));
        this._router.navigate(['home']);
    }

    onRegister(f: NgForm) {
        console.log(f.value);
    }

    constructor(private socketService: SocketService,
                private _router: Router) {};
}