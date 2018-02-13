import { IConfigServer } from '../../../common';
import { ConfigServer } from './config-server';

export interface IConfig {
    readonly servers: IConfigServer[];
}

export class Config implements IConfig {
    constructor(
        public readonly servers: ConfigServer[],
    ) { }
}
