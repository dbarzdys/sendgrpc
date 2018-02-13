import * as path from 'path';

import { NamespaceBase } from 'protobufjs';
import {
    InternalServerErrorException,
    BadRequestException,
    NotFoundException,
    HttpException,
    Controller,
    Param,
    Get,
} from '@nestjs/common';

import { ConfigService } from '../config';
import { IConfig, PbFile, PbType } from '../../common/models';
import { ServerService } from './server.service';
import {
    transformServices,
    extractServices,
    transformTypes,
    extractTypes,
} from './utils';

@Controller('/servers')
export class ServerController {
    constructor(
        private configService: ConfigService,
        private service: ServerService,
    ) {}

    @Get(':hash')
    public async getServer(@Param('hash') hash: string): Promise<PbFile> {
        let config: IConfig;
        try {
            config = this.configService.read();
        } catch (err) {
            throw new HttpException(err.toString(), 418);
        }
        const server = config.servers.find((s) => s.hash === hash);
        if (!server) {
            throw new NotFoundException('Could not find configuration for this service.');
        }
        let fp: string;
        if (path.isAbsolute(server.protoPath)) {
            fp = server.protoPath;
        } else {
            fp = path.join(path.dirname(this.configService.getPath()), server.protoPath);
        }
        if (!this.service.exist(fp)) {
            throw new NotFoundException(`Could not find proto file: ${fp}`);
        }
        let nbase: NamespaceBase;
        try {
            nbase = await this.service.read(fp);
        } catch (err) {
            throw new InternalServerErrorException(`Could not read proto file: ${fp}. ${err}`);
        }
        const services = extractServices(nbase, fp);
        const types = extractTypes(nbase, fp);
        return {
            configHash: hash,
            fileName: path.basename(fp),
            services: transformServices(services),
            types: transformTypes(types),
        };
    }
}
