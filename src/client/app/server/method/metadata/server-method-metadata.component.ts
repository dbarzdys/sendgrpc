import { Component, Input} from '@angular/core';

import { Metadata, MetadataEntry } from '../../../../../common/models/call';

@Component({
    selector: 'sg-server-method-metadata',
    templateUrl: 'server-method-metadata.component.html',
    styleUrls: ['server-method-metadata.component.scss'],
})
export class ServerMethodMetadataComponent {
    @Input()
    public metadata: Metadata;
    public add() {
        this.metadata.entries.push({
            key: '',
            value: '',
        });
    }
    public remove(entry: MetadataEntry) {
        const idx = this.metadata.entries.indexOf(entry);
        if (idx > -1) {
            this.metadata.entries.splice(idx, 1);
        }
    }
}