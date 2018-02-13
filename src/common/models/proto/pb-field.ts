import { PbType } from './pb-type';

export interface PbField {
    name: string;
    type: string;
    repeated: boolean;
    rule?: string;
    id: number;
}
