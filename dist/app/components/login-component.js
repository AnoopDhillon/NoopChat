"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var socket_service_1 = require("../services/socket-service");
var auth_service_1 = require("../services/auth-service");
var router_1 = require("@angular/router");
var login_1 = require("../models/login");
var LoginComponent = (function () {
    function LoginComponent(socketService, _router, _authService) {
        this.socketService = socketService;
        this._router = _router;
        this._authService = _authService;
        this.storedUserKey = 'rememberUsername';
        this.loginError = false;
    }
    ;
    LoginComponent.prototype.ngOnInit = function () {
        var authUser = JSON.parse(localStorage.getItem('authenticatedUser'));
        if (authUser && Date.now() < authUser.expiresAt) {
            this._router.navigate(['home']);
        }
    };
    LoginComponent.prototype.onLogin = function (f) {
        var _this = this;
        this._authService.logIn(f.value.username, f.value.password)
            .subscribe(function (flag) {
            if (flag) {
                _this.socketService.sendLogin(new login_1.LoginCredentials(f.value.username, f.value.password));
                localStorage.setItem(_this.storedUserKey, '');
                _this._router.navigate(['home']);
                _this.loginError = false;
            }
            else {
                _this.loginError = true;
            }
        }, function (err) {
            _this.loginError = true;
        });
    };
    LoginComponent.prototype.onRegister = function (f) {
        console.log(f.value);
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'login-component',
        templateUrl: '../templates/login-component.html',
        styleUrls: ['../../styles/login.css']
    }),
    __metadata("design:paramtypes", [socket_service_1.SocketService,
        router_1.Router,
        auth_service_1.AuthService])
], LoginComponent);
exports.LoginComponent = LoginComponent;

//# sourceMappingURL=login-component.js.map
