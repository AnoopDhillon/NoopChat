import { Component } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'main-app',
    templateUrl: '/app/templates/main-app.html'
})
export class MainApp {
    title: string = "HELLO";
    subtitle: string = "hello";

    constructor() {};
}