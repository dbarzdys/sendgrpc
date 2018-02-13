import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class ServerProtoFileService {
    constructor(
        private http: Http,
    ) {}
    public async getProtoFile(hash: string) {
        const res = await this.http.get(`/api/proto/${hash}`).toPromise();
        return res.text();
    }
}