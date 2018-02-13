import * as fs from 'fs';
import * as path from 'path';

import { Component } from '@nestjs/common';
import { isArray, error } from 'util';

import { IConfig, IConfigServer } from '../../common/models';
import { Config, ConfigServer } from './models';

@Component()
export class ConfigService {

    public read(): Config {

        const body = this.readFile();
        const errors = this.validate(body);
        if (errors.length > 0) {
            throw errors[0];
        }
        const c: IConfig = JSON.parse(body);
        const servers: ConfigServer[] = [];
        for (const s of c.servers) {
            const server = new ConfigServer(s.name, s.protoPath, s.certPath, s.target);
            if (!servers.find((e) => e.hash === server.hash)) {
                servers.push(server);
            }
        }
        return new Config(servers);

    }
    public readFile(): string {
        if (!fs.existsSync(this.getPath())) {
            throw new Error(`Could not find configuration file: ${this.getPath()}`);
        }
        try {
           return fs.readFileSync(this.getPath()).toString();
        } catch (err) {
            throw new Error('Failed to open configuration file!');
        }
    }

    public validate(config: string): Error[] {

        const errors = [];
        let c: IConfig;
        try {
            c = JSON.parse(config);
        } catch (err) {
            errors.push(new Error('Incorect json in configuration file!'));
            return errors;
        }

        if (!(c.servers instanceof Array)) {
            errors.push(new Error('Servers not defined in configuration file!'));
        } else {
            for (const s of c.servers) {
                const enc = JSON.stringify;
                if (!s || typeof s !== 'object') {
                    errors.push(new Error(`Invalid type used as server! [${enc(s)}]`));
                    continue;
                }
                if (!s.name || typeof s.name !== 'string') {
                    errors.push(new Error(`Invalid type used as server's name! [${enc(s.name)}]`));
                }
                if (!s.protoPath || typeof s.protoPath !== 'string') {
                    errors.push(new Error(`Invalid type used as server's protoPath! [${enc(s.protoPath)}]`));
                }
                if (typeof s.certPath !== 'string' && s.certPath !== null && s.certPath !== undefined) {
                    errors.push(new Error(`Invalid type used as server's certPath! [${enc(s.certPath)}]`));
                }
                if (!s.protoPath || typeof s.target !== 'string') {
                    errors.push(new Error(`Invalid type used as server's target! [${enc( s.target)}]`));
                }
            }
        }
        return errors;

    }

    public getPath(): string {

        return global.CONFIG_FILE;

    }

}