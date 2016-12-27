"use strict";
var Subject_1 = require("rxjs/Subject");
var SocketService = (function () {
    function SocketService() {
        var _this = this;
        this.url = 'http://localhost:3000';
        this._messages = new Subject_1.Subject();
        this.messages = this._messages.asObservable();
        this.socket = io(this.url);
        this.socket.on('chat message', function (username, msg) {
            _this._messages.next({ username: username, msg: msg });
        });
    }
    SocketService.prototype.sendMessage = function (msg) {
        if (this.socket !== null) {
            this.socket.emit('chat message', msg);
            return true;
        }
        return false;
    };
    SocketService.prototype.sendLogin = function (data) {
        if (this.socket !== null) {
            this.socket.emit('login', data);
            return true;
        }
        return false;
    };
    return SocketService;
}());
exports.SocketService = SocketService;

//# sourceMappingURL=socket-service.js.map
