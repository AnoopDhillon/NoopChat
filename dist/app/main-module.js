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
var forms_1 = require("@angular/forms");
var platform_browser_1 = require("@angular/platform-browser");
var http_1 = require("@angular/http");
var routes_1 = require("./routes");
var main_app_1 = require("./components/main-app");
var chat_component_1 = require("./components/chat-component");
var login_component_1 = require("./components/login-component");
var socket_service_1 = require("./services/socket-service");
var auth_service_1 = require("./services/auth-service");
var auth_guard_1 = require("../auth-guard");
var MainModule = (function () {
    function MainModule() {
    }
    return MainModule;
}());
MainModule = __decorate([
    core_1.NgModule({
        imports: [
            routes_1.routing,
            platform_browser_1.BrowserModule,
            http_1.HttpModule,
            http_1.JsonpModule,
            forms_1.FormsModule
        ],
        declarations: [
            main_app_1.MainApp,
            chat_component_1.ChatComponent,
            login_component_1.LoginComponent
        ],
        providers: [
            socket_service_1.SocketService,
            auth_service_1.AuthService,
            auth_guard_1.AuthGuard
        ],
        bootstrap: [
            main_app_1.MainApp
        ]
    }),
    __metadata("design:paramtypes", [])
], MainModule);
exports.MainModule = MainModule;
;

//# sourceMappingURL=main-module.js.map
