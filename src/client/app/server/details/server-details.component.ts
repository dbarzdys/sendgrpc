import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfigService } from '../../config';
import { IConfigServer } from '../../../../common/models/config';

@Component({
    selector: 'sh-server-details',
    templateUrl: 'server-details.component.html',
    styleUrls: ['server-details.component.scss'],
})
export class ServerDetailsComponent implements OnInit {
    public server: IConfigServer;
    constructor(
        private configService: ConfigService,
        private route: ActivatedRoute,
    ) {}
    public ngOnInit() {
        this.route.parent.params.subscribe(async (params) => {
            delete this.server;
            const config = await this.configService.getConfig();
            const server = config.servers.find((s) => s.hash === params['hash']);
            this.server = server;
        });
    }
}
