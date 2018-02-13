import { Module } from '@nestjs/common';

import { ConfigModule } from '../config';

import { PingController } from './ping.controller';
import { PingService } from './ping.service';

@Module({
    imports: [],
    controllers: [
        PingController,
    ],
    components: [
        PingService,
    ],
    exports: [
        PingController,
        PingService,
    ],
})
export class PingModule {}
