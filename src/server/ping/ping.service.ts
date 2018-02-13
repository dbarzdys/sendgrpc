import { Component } from '@nestjs/common';
import { ConfigService } from '../config';
import { ServerStatus } from '../../common/models/ping';

import * as url from 'url';
import * as net from 'net';

@Component()
export class PingService {
    public async check(target: string): Promise<ServerStatus> {
        return new Promise<ServerStatus>((resolve) => {
            try {
                const u = url.parse(target);
                if (!u.port) {
                    u.port = u.protocol === 'https:' ? '443' : '80';
                }
                const client = net.createConnection(parseInt(u.port, 10), u.hostname, (res) => {
                    return resolve({alive: true});
                });
                client.on('error', (err) => {
                    return resolve({alive: false});
                });
                client.on('timeout', (err) => {
                    return resolve({alive: false});
                });
            } catch (err) {
                return resolve({
                    alive: false,
                });
            }
        });
    }
}
