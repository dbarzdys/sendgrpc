import { Component, OnInit, ViewChild, AfterViewChecked } from '@angular/core';
import { ServerProtoFileService } from './server-proto-file.service';
import { ActivatedRoute } from '@angular/router';

import { ClrCodeHighlight } from '@clr/angular';

@Component({
    selector: 'sh-server-proto-file',
    templateUrl: 'server-proto-file.component.html',
    styleUrls: ['server-proto-file.component.scss'],
})
export class ServerProtoFileComponent implements OnInit, AfterViewChecked {
    @ViewChild(ClrCodeHighlight) codeHighlight: ClrCodeHighlight;
    public redraw = true;
    public protoFile: string;
    public error: string;
    constructor(
        private service: ServerProtoFileService,
        private route: ActivatedRoute,
    ) {}
    public ngOnInit() {
        this.route.parent.params.subscribe(async (params) => {
            delete this.error;
            try {
                const protoFile = await this.service.getProtoFile(params['hash']);
                this.protoFile = protoFile;
            } catch (err) {
                this.error = err.json().message;
            }
        });
    }
    public ngAfterViewChecked() {
        if (this.redraw && this.codeHighlight) {
            this.codeHighlight.redraw();
            this.redraw = false;
        }
    }
}
