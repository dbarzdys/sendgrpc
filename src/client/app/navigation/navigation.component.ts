import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../config';
import { IConfigServer } from '../../../common/models/config';

@Component({
    selector: 'sg-navigation',
    templateUrl: 'navigation.component.html',
    styleUrls: ['navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
    public servers: IConfigServer[];
    constructor(
        private configService: ConfigService,
    ) {}
    public async ngOnInit() {
        const config = await this.configService.getConfig();
        this.servers = config.servers;
    }
}
