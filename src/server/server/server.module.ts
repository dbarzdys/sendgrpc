import { Module } from '@nestjs/common';

import { ConfigModule } from '../config';
import { ServerController } from './server.controller';
import { ServerService } from './server.service';

@Module({
    imports: [
        ConfigModule,
    ],
    controllers: [
        ServerController,
    ],
    components: [
        ServerService,
    ],
    exports: [
        ServerService,
    ],
})
export class ServerModule {}