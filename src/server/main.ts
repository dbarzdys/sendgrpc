import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';
import * as express from 'express';
import { join } from 'path';

async function bootstrap() {
	const server = express();
	const app = await NestFactory.create(ApplicationModule,  server);
	app.use(express.static(join(__dirname, '..', 'client')));
	app.setGlobalPrefix('/api');
	await app.listen(global.PORT);
	app.use('*', (req, res)  => {
		res.sendfile(join(__dirname, '..', 'client', 'index.html'));
	});
}
bootstrap();
