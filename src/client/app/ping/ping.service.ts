import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response } from '@angular/http';

import { ServerStatus } from '../../../common/models';

@Injectable()
export class PingService {
    private statuses: Map<string, ServerStatus>;
    private intervals: Map<string, any>;
    private emitters: Map<string, EventEmitter<ServerStatus>>;
    constructor(
        private http: Http,
    ) {
        this.statuses = new Map();
        this.intervals = new Map();
        this.emitters = new Map();
    }
    public register(url: string) {
        if (this.emitters.has(url)) {
            const e = this.emitters.get(url);
            if (this.statuses.has(url)) {
                setTimeout(() => e.emit(this.statuses.get(url)));
            }
            return e;
        }
        const emitter = new EventEmitter<ServerStatus>();
        const fc = async () => {
            const res = await this.http.get(`/api/ping/${btoa(url)}`).toPromise();
            emitter.emit(res.json());
            this.statuses.set(url, res.json());
        };
        const interval = setInterval(fc, 5000);
        fc();
        this.emitters.set(url, emitter);
        this.intervals.set(url, interval);
        return emitter;
    }
    public stop(url: string) {
        if (this.intervals.has(url)) {
            clearInterval(this.intervals.get(url));
            this.intervals.delete(url);
        }
        if (this.emitters.has(url)) {
            this.emitters.delete(url);
        }
        if (this.statuses.has(url)) {
            this.statuses.delete(url);
        }
    }
}