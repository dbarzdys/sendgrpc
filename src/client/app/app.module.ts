import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ROUTING } from './app.routing';
import { ConfigModule } from './config';
import { NavigationModule } from './navigation';

import { AppComponent } from './app.component';
import { ClarityModule } from '@clr/angular';
import { HomeModule } from './home';
import { ServerModule } from './server';
import { NotFoundModule } from './not-found';
import { PingModule } from './ping';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    ClarityModule,
    BrowserAnimationsModule,
    BrowserModule,
    CommonModule,
    NavigationModule,
    HomeModule,
    ServerModule,
    ConfigModule,
    NotFoundModule,
    PingModule,
    ROUTING,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
