import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfigComponent } from './config';
import { HomeComponent } from './home';
import { ServerComponent, ServerDetailsComponent, ServerProtoFileComponent, ServerMethodComponent } from './server';
import { NotFoundComponent } from './not-found';
export const ROUTES: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'config', component: ConfigComponent },
    { path: 'server/:hash', component: ServerComponent, children: [
        { path: '', redirectTo: 'details', pathMatch: 'full'},
        { path: 'details', component: ServerDetailsComponent },
        { path: 'proto-file', component: ServerProtoFileComponent },
        { path: 'service/:service/method/:method', component: ServerMethodComponent },
    ] },
    { path: '**', redirectTo: '404' },
    { path: '404', component: NotFoundComponent },
];

export const ROUTING: ModuleWithProviders = RouterModule.forRoot(ROUTES);
