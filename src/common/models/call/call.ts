import { Metadata } from './metadata';

export interface Call {
    server: string;
    service: string;
    method: string;
    request: any;
    metadata: Metadata;
}