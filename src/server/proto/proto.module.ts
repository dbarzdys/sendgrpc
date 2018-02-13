import { Module } from '@nestjs/common';

import { ConfigModule } from '../config';

import { ProtoController } from './proto.controller';
import { ProtoService } from './proto.service';

@Module({
    imports: [
        ConfigModule,
    ],
    controllers: [
        ProtoController,
    ],
    components: [
        ProtoService,
    ],
    exports: [
        ProtoController,
        ProtoService,
    ],
})
export class ProtoModule {}
