import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { Call } from '../../common/models/call';
import { CallService } from './call.service';

@Controller('/call')
export class CallController {
    constructor(
        private service: CallService,
    ) {}
    @Post()
    public async callMethod(@Body() call: Call) {
        try {
            return await this.service.callMethod(call);
        } catch (err) {
            throw new BadRequestException(err.toString());
        }
    }
}