import { Component, AfterViewChecked, OnInit, ViewChild } from '@angular/core';
import { ConfigService } from './config.service';
import { IConfig, ConfigFile } from '../../../common';
import { ClrCodeHighlight } from '@clr/angular';

@Component({
    selector: 'sg-config',
    templateUrl: 'config.component.html',
    styleUrls: ['config.component.scss'],
})
export class ConfigComponent implements OnInit, AfterViewChecked {
    @ViewChild(ClrCodeHighlight) codeHighlight: ClrCodeHighlight;
    public redraw = true;
    public file: string;
    public location: string;
    public errors: string[];
    constructor(
        private service: ConfigService,
    ) {
        this.errors = [];
    }

    public async ngOnInit() {
        this.errors = [];
        this.redraw = true;
        try {
            const configFile = await this.service.getConfigFile();
            this.file = configFile.body;
            this.location = configFile.location;
            this.errors = configFile.errors;
        } catch (err) {
            this.errors = [err.json().message];
        }
    }

    public ngAfterViewChecked() {
        if (this.redraw && this.codeHighlight) {
            this.codeHighlight.redraw();
            this.redraw = false;
        }
    }

}