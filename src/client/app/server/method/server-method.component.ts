import { Component, OnInit, AfterViewChecked, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServerService } from '../server.service';
import { PbField, PbType, PbMethod, PbService } from '../../../../common/models/proto';
import { Metadata, Call } from '../../../../common/models/call';
import { ServerMethodService } from './server-method.service';
import { ClrCodeHighlight } from '@clr/angular';

@Component({
    selector: 'sg-server-method',
    templateUrl: 'server-method.component.html',
    styleUrls: ['server-method.component.scss'],
})
export class ServerMethodComponent implements OnInit, AfterViewChecked {
    @ViewChild(ClrCodeHighlight) codeHighlight: ClrCodeHighlight;
    public redraw = true;
    public service: PbService;
    public method: PbMethod;
    public types: PbType[];
    public path: string;
    public fields: Map<string, any>;
    public field: PbField;
    public metadata: Metadata;
    public error: string;
    public response: string;
    public methodName: string;
    private serverHash: string;
    private serviceName: string;
    constructor(
        private route: ActivatedRoute,
        private serverService: ServerService,
        private methodService: ServerMethodService,
    ) {}
    public ngOnInit() {
        this.route.parent.params.subscribe((params) => {
            delete this.serverHash;
            delete this.methodName;
            delete this.serviceName;
            delete this.types;
            delete this.field;
            delete this.metadata;
            this.serverHash = params['hash'];
            delete this.response;
            delete this.error;
            this.update();
        });
        this.route.params.subscribe((params) => {
            delete this.methodName;
            delete this.serviceName;
            delete this.types;
            delete this.field;
            delete this.metadata;
            this.methodName = params['method'];
            this.serviceName = params['service'];
            delete this.response;
            delete this.error;
            this.update();
        });
    }
    public ngAfterViewChecked() {
        if (this.redraw && this.codeHighlight) {
            this.codeHighlight.redraw();
            this.redraw = false;
        }
    }
    public clear() {
        delete this.types;
        delete this.field;
        delete this.metadata;
        delete this.response;
        delete this.error;
        this.update();
    }
    public async send() {
        delete this.error;
        delete this.response;
        const metadata = this.metadata;
        const server = this.serverHash;
        const service = this.serviceName;
        const method = this.methodName;
        const request = this.formatRequest();
        try {
            const res = await this.methodService.callMethod({
                server,
                service,
                method,
                metadata,
                request,
            });
            this.response = JSON.stringify(res, null, 2);
            this.redraw = true;
        } catch (err) {
            this.error = err.json().message;
        }
    }
    private formatRequest() {
        const request = {};
        this.fields.forEach((v, k) => {
            const path = k.split('.');
            path.splice(0, 2);
            let obj = request;
            path.forEach((key, i) => {
                if (i === path.length - 1) {
                    obj[key] = v;
                    return;
                }
                const reg = key.match(/^(\w+)\[(\d)+\]$/i);
                if (reg) {
                    const prop = reg[1];
                    const id = reg[2];
                    if (!(prop in obj)) {
                        obj[prop] = [];
                        const temp = {};
                        obj[prop][id] = temp;
                        obj = temp;
                    } else {
                        if (id in obj[prop]) {
                            obj = obj[prop][id];
                        } else {
                            const temp = {};
                            obj[prop][id] = temp;
                            obj = temp;
                        }
                    }
                } else {
                    if (!(key in obj)) {
                        obj[key] = {};
                    }
                    obj = obj[key];
                }
            });
        });
        return this.truncateEmptyArray(request);
    }
    private truncateEmptyArray(obj: any) {
        for (const k in obj) {
            if (obj[k] instanceof Array) {
                const temp = [];
                for (const v of obj[k]) {
                    if (v) {
                        temp.push(v);
                    }
                }
                obj[k] = this.truncateEmptyArray(temp);
            } else if (typeof obj[k] === 'object') {
                obj[k] = this.truncateEmptyArray(obj[k]);
            }
        }
        return obj;
    }
    private async update() {
        if (this.serverHash && this.serviceName && this.methodName) {
            this.path = '';
            this.metadata = { entries: [] };
            this.fields = new Map();
            const server = await this.serverService.getOne(this.serverHash);
            this.service = server.services.find((s) => s.name === this.serviceName);
            this.method = this.service.methods.find((m) => m.name === this.methodName);
            this.types = server.types;
            this.field = { id: 1, name: this.method.requestType, repeated: false, type: this.method.requestType };
        }
    }
}
