import { Component, OnInit } from '@angular/core';
import { IConfigServer } from '../../common/models/config';
import { ConfigService } from './config/config.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit{
  public error: boolean;
  constructor(
    private configService: ConfigService,
  ) {}
    public async ngOnInit() {
      this.error = false;
      try {
        await this.configService.getConfig();
      } catch (err) {
        this.error = true;
      }
    }
}
