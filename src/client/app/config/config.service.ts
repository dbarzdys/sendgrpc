import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { IConfig, IConfigServer, ConfigFile } from '../../../common';

@Injectable()
export class ConfigService {
    private config: IConfig;
    private promise: Promise<Response>;
    constructor(
        private http: Http,
    ) {}
    public async getConfig(): Promise<IConfig> {
        if (this.config) {
            return this.config;
        }
        if (this.promise) {
            const r = await this.promise;
            return r.json() as IConfig;
        }
        const promise = this.http.get('/api/config').toPromise();
        this.promise = promise;
        try {
            const res = await promise;
            delete this.promise;
            const config = res.json() as IConfig;
            this.config = config;
            return config;
        } catch (err) {
            delete this.promise;
            throw err;
        }
    }
    public async getConfigFile(): Promise<ConfigFile> {
        const res = await this.http.get('/api/config/file').toPromise();
        return res.json() as ConfigFile;
    }
}