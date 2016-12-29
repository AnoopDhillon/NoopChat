import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainApp } from './components/main-app';
import { LoginComponent } from './components/login-component';
import { ChatComponent } from './components/chat-component';

const routes: Routes = [
    {
        path: '',
        component: LoginComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'home',
        component: ChatComponent
    },
    {
        path: '**',
        redirectTo: 'LoginComponent'
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);