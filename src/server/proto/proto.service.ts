import { Component } from '@nestjs/common';
import { ConfigService } from '../config';
import * as fs from 'fs';
import * as path from 'path';

@Component()
export class ProtoService {
    constructor(
        private configService: ConfigService,
    ) {}
    public async readFile(hash: string): Promise<string> {
        const config = await this.configService.read();
        const server = config.servers.find((s) => s.hash === hash);
        if (!server) {
            throw new Error(`Could not find server with hash: ${hash}`);
        }
        let fp: string;
        if (path.isAbsolute(server.protoPath)) {
            fp = server.protoPath;
        } else {
            fp = path.join(path.dirname(this.configService.getPath()), server.protoPath);
        }
        if (!fs.existsSync(fp)) {
            throw new Error(`Could not find proto file: ${fp}`);
        }
        let buffer: Buffer;
        try {
            buffer = fs.readFileSync(fp);
        } catch (err) {
            throw new Error(`Failed to read proto file: ${fp}`);
        }
        return buffer.toString();
    }
}
