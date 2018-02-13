import { Module } from '@nestjs/common';

import { ConfigService } from './config.service';
import { ConfigController } from './config.controller';

@Module({
    controllers: [
        ConfigController,
    ],
    components: [
        ConfigService,
    ],
    exports: [
        ConfigService,
    ],
})
export class ConfigModule {}
