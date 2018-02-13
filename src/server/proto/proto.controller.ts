import { Controller, Get, Param, BadRequestException } from '@nestjs/common';
import { ProtoService } from './proto.service';

@Controller('/proto')
export class ProtoController {
    constructor(
        private service: ProtoService,
    ) {}
    @Get(':hash')
    public async getOne(@Param('hash') hash: string) {
        try {
            return await this.service.readFile(hash);
        } catch (err) {
            throw new BadRequestException(err.toString());
        }
    }
}