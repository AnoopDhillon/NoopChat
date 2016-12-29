import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { NgForm } from '@angular/forms';
import 'rxjs/Rx';

@Injectable()
export class AuthService {
    public token: string;
    public uid: number;
    private url = 'http://localhost:3000';

    constructor(private _http: Http) {
        let authenticatedUser = JSON.parse(localStorage.getItem('authenticatedUser'));
        if (authenticatedUser) {
            this.token = authenticatedUser.token;
            this.uid = authenticatedUser.id;
        }
    }

    logIn(uname: string, pword: string): Observable<boolean> {
        let body = JSON.stringify({ username: uname, password: pword });
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this._http.post(this.getUrl('login'), body, options)
            .map((response: Response) => {
                let user = response.json();
                if (user && user.token) {
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    return true;
                } else {
                    return false;
                }
            })
            .catch(this.handleError);
    }

    logOut(): void {
        this.token = null;
        localStorage.removeItem('authenticatedUser');
    }

    private getUrl(pathname: string): string {
        return this.url + '/' + pathname;
    }

    private handleError(error: any): Observable<any> {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}