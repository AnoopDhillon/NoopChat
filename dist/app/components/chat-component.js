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
var router_1 = require("@angular/router");
var ChatComponent = (function () {
    function ChatComponent(socketService, _router) {
        this.socketService = socketService;
        this._router = _router;
        this.messageHistory = [];
    }
    ChatComponent.prototype.sendMessage = function ($event) {
        $event.preventDefault();
        this.socketService.sendMessage(this.message);
        this.message = '';
    };
    ChatComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.socketService.messages.subscribe(function (message) {
            _this.messageHistory.push(message);
        });
    };
    ;
    return ChatComponent;
}());
ChatComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'chat-component',
        templateUrl: '../templates/chat-component.html'
    }),
    __metadata("design:paramtypes", [socket_service_1.SocketService,
        router_1.Router])
], ChatComponent);
exports.ChatComponent = ChatComponent;

//# sourceMappingURL=chat-component.js.map
