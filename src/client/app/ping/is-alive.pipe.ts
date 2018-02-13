import { Pipe, PipeTransform } from '@angular/core';
import { PingService } from './ping.service';

@Pipe({
    name: 'sgIsAlive',
})
export class IsAlivePipe implements PipeTransform {
    constructor(
        private service: PingService,
    ) {}
    public transform(url: string) {
        return this.service.register(url);
    }
}