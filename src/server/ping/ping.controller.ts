import { Controller, Get, Param, BadRequestException } from '@nestjs/common';
import { PingService } from './ping.service';
import { ServerStatus } from '../../common/models/ping';

@Controller('/ping')
export class PingController {
    constructor(
        private service: PingService,
    ) {}
    @Get(':url')
    public async check(@Param('url') url: string): Promise<ServerStatus> {
        let parsedUrl: string;
        try {
            parsedUrl = new Buffer(url, 'base64').toString('ascii');
            return await this.service.check(parsedUrl);
        } catch (err) {
            throw new BadRequestException(err);
        }

    }
}