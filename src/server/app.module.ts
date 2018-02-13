import { Module } from '@nestjs/common';
import { ConfigModule } from './config';
import { ServerModule } from './server';
import { ProtoModule } from './proto';
import { PingModule } from './ping';
import { CallModule } from './call';

import * as express from 'express';

@Module({
  imports: [
    ConfigModule,
    ServerModule,
    ProtoModule,
    PingModule,
    CallModule,
  ],
  controllers: [],
  components: [],
})
export class ApplicationModule {}