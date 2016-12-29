export class Message {
    sender: string;
    content: string;

    constructor(_uname, _msg) {
        this.sender = _uname;
        this.content = _msg;
    }
}