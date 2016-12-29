import { Component } from '@angular/core';
import { SocketService } from '../services/socket-service';
import { AuthService } from '../services/auth-service';
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
    storedUserKey = 'rememberUsername';
    form: NgForm;
    loginError: boolean = false;

    constructor(private socketService: SocketService,
        private _router: Router,
        private _authService: AuthService) { };

    ngOnInit(): void {
        let authUser = JSON.parse(localStorage.getItem('authenticatedUser'));
        if (authUser && Date.now() < authUser.expiresAt) {
            this._router.navigate(['home']);
        }
    }

    onLogin(f: NgForm) {
        this._authService.logIn(f.value.username, f.value.password)
            .subscribe(flag => {
                if (flag) {
                    this.socketService.sendLogin(new LoginCredentials(f.value.username, f.value.password));
                    localStorage.setItem(this.storedUserKey, '');
                    this._router.navigate(['home']);
                    this.loginError = false;
                } else {
                    this.loginError = true;
                }
            },
            err => {
                this.loginError = true;
            });
    }

    onRegister(f: NgForm) {
        console.log(f.value);
    }


}
