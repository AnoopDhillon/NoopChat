"use strict";
var router_1 = require("@angular/router");
var login_component_1 = require("./components/login-component");
var chat_component_1 = require("./components/chat-component");
var routes = [
    {
        path: '',
        component: login_component_1.LoginComponent
    },
    {
        path: 'home',
        component: chat_component_1.ChatComponent
    },
    {
        path: '**',
        component: login_component_1.LoginComponent
    }
];
exports.routing = router_1.RouterModule.forRoot(routes);

//# sourceMappingURL=routes.js.map
