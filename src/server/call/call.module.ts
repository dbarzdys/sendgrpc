import { Module } from '@nestjs/common';

import { ConfigModule } from '../config';
import { ServerModule } from '../server';

import { CallController } from './call.controller';
import { CallService } from './call.service';

@Module({
    imports: [
        ConfigModule,
        ServerModule,
    ],
    controllers: [
        CallController,
    ],
    components: [
        CallService,
    ],
})
export class CallModule {}
