import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private _router: Router) {
    }

    canActivate(): boolean {
        let currUser = JSON.parse(localStorage.getItem('currUser'));

        if (currUser && currUser.expiresAt > Date.now()) {
            return true;
        } else {
            this._router.navigate(['login']);
            return false;
        }
    }
}