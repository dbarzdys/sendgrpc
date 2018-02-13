import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule } from '@clr/angular';
import { ConfigModule } from '../config';
import { NavigationComponent } from './navigation.component';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        CommonModule,
        ClarityModule,
        ConfigModule,
        RouterModule,
    ],
    declarations: [
        NavigationComponent,
    ],
    exports: [
        NavigationComponent,
    ],
})
export class NavigationModule {}
