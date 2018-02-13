import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ConfigService } from '../config';
import { IConfigServer, PbFile } from '../../../common/models';
import { ServerService } from './server.service';

@Component({
    selector: 'sg-server',
    templateUrl: 'server.component.html',
    styleUrls: ['server.component.scss'],
})
export class ServerComponent implements OnInit {
    public serverConfig: IConfigServer;
    public server: PbFile;
    public error: string;
    constructor(
        private configService: ConfigService,
        private route: ActivatedRoute,
        private router: Router,
        private service: ServerService,
    ) {}
    public ngOnInit() {
        this.route.params.subscribe(async (p) => {
            delete this.server;
            delete this.error;
            try {
                const config =  await this.configService.getConfig();
                const serverConfig = config.servers.find((s) => s.hash === p['hash']);
                if (!serverConfig) {
                    this.router.navigateByUrl('/404');
                    return;
                }
                this.serverConfig = serverConfig;
                const server = await this.service.getOne(p['hash']);
                this.server = server;
            } catch (err) {
                this.error = err.json().message;
            }
        });
    }
}
