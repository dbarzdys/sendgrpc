import { Component } from '@nestjs/common';
import { NamespaceBase, Constructor } from 'protobufjs';
import { loadObject, credentials, CallOptions, Deadline, propagate, GenericClientOptions, Client, Metadata } from 'grpc';

import { ConfigService } from '../config';
import { ServerService } from '../server';
import { extractServices } from '../server/utils';
import { Call } from '../../common/models/call';

import * as url from 'url';
@Component()
export class CallService {
    constructor(
        private configService: ConfigService,
        private serverService: ServerService,
    ) {}
    public async callMethod(call: Call) {
        const config = this.configService.read();
        const server = config.servers.find((s) => s.hash === call.server);
        let nbase: NamespaceBase;
        try {
            nbase = await this.serverService.read(server.protoPath);
        } catch (err) {
            throw new Error(`Could not read proto file: ${server.protoPath}. ${err}`);
        }
        const services = extractServices(nbase, server.protoPath);
        const service = services.find((s) => s.name === call.service);
        const clientClass = loadObject(service) as Constructor<Client>;
        const options: CallOptions = {
            deadline: (Date.now() + 10000) as Deadline,
            credentials: null,
            propagate_flags: propagate.DEADLINE,
        };
        return new Promise((resolve, reject) => {
            const u = url.parse(server.target);
            if (!u.port) {
                u.port = u.protocol === 'https:' ? '443' : '80';
            }
            const client = new clientClass(`${u.hostname}:${u.port}`, credentials.createInsecure());
            client.waitForReady(Date.now() + 10000, (err) => {
                try {
                    if (err) {
                        return reject(err);
                    }
                    const meta = new Metadata();
                    for (const entry of call.metadata.entries) {
                        meta.add(entry.key, entry.value);
                    }
                    const res = client[call.method](call.request, meta, (e, r) => {
                        if (e) {
                            return reject(e);
                        }
                        resolve(this.decodeBuffers(r));
                    });
                } catch (err) {
                    reject(err);
                }
            });
        });
    }
    private decodeBuffers(res: any) {
        for (const k in res) {
            if (res[k] instanceof Buffer) {
                res[k] = res[k].toString('ascii');
            } else if (typeof res[k] === 'object') {
                this.decodeBuffers(res[k]);
            }
        }
        return res;
    }
}
// import { loadObject, credentials, CallOptions, Deadline, propagate, GenericClientOptions, Client, Metadata } from 'grpc';

// const srv = loadObject(services[0]) as Constructor<Client>;
// services[0].methodsArray[0].
// const options: CallOptions = {
//     deadline: (Date.now() + 1000) as Deadline,
//     credentials: null,
//     propagate_flags: propagate.DEADLINE,
// };
// const srvv = new srv('localhost:9999', credentials.createInsecure());
// // tslint:disable-next-line:no-shadowed-variable
// srvv.waitForReady(Date.now() + 1000, (err) => {
//     if (err) {
//         return;
//     }
//     const meta = new Metadata();
//     meta.add('some', 'Haha');
//     const res = srvv['Create']({List:[{
//         InitiatorID: 'asd'
//     }]}, meta, (err, res) => {
//         pretty(err)
//         pretty(res)
//     })

// })