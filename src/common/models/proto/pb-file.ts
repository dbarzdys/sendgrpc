import { PbService } from './pb-service';
import { PbType } from '../../index';

export interface PbFile {
    fileName: string;
    services: PbService[];
    types: PbType[];
    configHash: string;
}
