"use strict";
var Observable_1 = require("rxjs/Observable");
var Subject_1 = require("rxjs/Subject");
var ChatService = (function () {
    function ChatService() {
        var _this = this;
        this.url = 'http://localhost:3000';
        this._messages = new Subject_1.Subject();
        this.messages = this._messages.asObservable();
        this.socket = io(this.url);
        this.socket.on('chat message', function (username, msg) {
            _this._messages.next({ username: username, msg: msg });
        });
    }
    ChatService.prototype.getMessages = function () {
        var _this = this;
        var observable = new Observable_1.Observable(function (observer) {
            return function () {
                _this.socket.disconnect();
            };
        });
        return observable;
    };
    ChatService.prototype.sendMessage = function (msg) {
        if (this.socket !== null) {
            this.socket.emit('chat message', msg);
            return true;
        }
        return false;
    };
    ChatService.prototype.sendLogin = function (nickname) {
        if (this.socket !== null) {
            this.socket.emit('login', nickname);
            return true;
        }
        return false;
    };
    return ChatService;
}());
exports.ChatService = ChatService;

//# sourceMappingURL=chat-service.js.map
