import { IConfigServer } from './config-server';

export interface IConfig {
    readonly servers: IConfigServer[];
}
