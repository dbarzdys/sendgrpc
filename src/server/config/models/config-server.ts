import { createHash } from 'crypto';
import { IConfigServer } from '../../../common';

export class ConfigServer implements IConfigServer {
    public readonly hash: string;
    constructor(
        public readonly name: string,
        public readonly protoPath: string,
        public readonly certPath: string,
        public readonly target: string,
    ){
        const self = JSON.stringify(this);
        this.hash = createHash('md5').update(self).digest().toString('hex');
    }
}
