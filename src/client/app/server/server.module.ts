import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { ClarityModule } from '@clr/angular';

import { ConfigModule } from '../config';
import { ServerComponent } from './server.component';
import { ServerService } from './server.service';
import { ServerDetailsComponent } from './details';
import { ServerProtoFileComponent, ServerProtoFileService } from './proto-file';
import { ServerMethodComponent, ServerMethodFieldComponent, ServerMethodMetadataComponent, ServerMethodService } from './method';
import { PingModule } from '../ping';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        ClarityModule,
        CommonModule,
        ConfigModule,
        RouterModule,
        HttpModule,
        PingModule,
        FormsModule,
    ],
    declarations: [
        ServerComponent,
        ServerDetailsComponent,
        ServerProtoFileComponent,
        ServerMethodComponent,
        ServerMethodFieldComponent,
        ServerMethodMetadataComponent,
    ],
    exports: [
        ServerComponent,
        ServerDetailsComponent,
        ServerProtoFileComponent,
        ServerMethodComponent,
    ],
    providers: [
        ServerService,
        ServerProtoFileService,
        ServerMethodService,
    ],
})
export class ServerModule {}
