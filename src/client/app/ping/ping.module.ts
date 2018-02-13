import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IsAlivePipe } from './is-alive.pipe';
import { PingService } from './ping.service';

@NgModule({
    imports: [HttpModule],
    declarations: [
        IsAlivePipe,
    ],
    providers: [
        PingService,
    ],
    exports: [
        IsAlivePipe,
    ],
})
export class PingModule {}
