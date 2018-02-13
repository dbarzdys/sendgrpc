import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { ClarityModule } from '@clr/angular';

import { ConfigComponent } from './config.component';
import { ConfigService } from './config.service';

@NgModule({
    imports: [
        HttpModule,
        CommonModule,
        ClarityModule,
    ],
    declarations: [
        ConfigComponent,
    ],
    providers: [
        ConfigService,
    ],
    exports: [
        ConfigComponent,
    ],
})
export class ConfigModule {}
