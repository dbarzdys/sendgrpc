import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { PbFile, ServerStatus } from '../../../common/models';

@Injectable()
export class ServerService {
    private servers: Map<string, PbFile>;
    private promises: Map<string, Promise<Response>>;
    constructor(
        private http: Http,
    ){
        this.servers = new Map();
        this.promises = new Map();
    }
    public async getOne(hash: string): Promise<PbFile> {
        if (this.servers.has(hash)) {
            return this.servers.get(hash);
        }
        if (this.promises.has(hash)) {
            const s = await this.promises.get(hash);
            return s.json() as PbFile;
        }
        const promise = this.http.get(`/api/servers/${hash}`).toPromise();
        this.promises.set(hash, promise);
        try {
            const server = await promise;
            this.promises.delete(hash);
            return server.json() as PbFile;
        } catch (err) {
            this.promises.delete(hash);
            throw err;
        }
    }
    public async check(url: string): Promise<ServerStatus> {
        const res = await this.http.get(`/api/ping/${btoa(url)}`).toPromise();
        return res.json() as ServerStatus;
    }
}
