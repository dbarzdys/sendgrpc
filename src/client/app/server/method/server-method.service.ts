import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Call } from '../../../../common/models/call';

@Injectable()
export class ServerMethodService {
    constructor(
        private http: Http,
    ) {}

    public async callMethod(call: Call) {
        const req = await this.http.post('/api/call', call).toPromise();
        return req.json();
    }
}