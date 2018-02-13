import { Controller, Get, HttpException } from '@nestjs/common';
import { ConfigFile } from '../../common/models/config';

import { ConfigService } from './config.service';

@Controller('/config')
export class ConfigController {
    constructor(
        private service: ConfigService,
    ) {}
    @Get()
    public getConfig() {
        try {
            return this.service.read();
        } catch (err) {
            throw new HttpException(err.toString(), 418);
        }
    }
    @Get('file')
    public getConfigFile(): ConfigFile {
        try {
            const body = this.service.readFile();
            const errors = this.service.validate(body).map((e) => e.message);
            return {
                body,
                errors,
                location: this.service.getPath(),
            };
        } catch (err) {
            throw new HttpException(err.toString(), 418);
        }
    }
}