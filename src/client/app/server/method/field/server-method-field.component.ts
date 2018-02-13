import { Component, OnInit, Input } from '@angular/core';
import { PbType, PbField, PbEnumValue } from '../../../../../common';

interface ChildType {
    removed: boolean;
    type: PbType;
}

@Component({
    selector: 'sg-server-method-field',
    templateUrl: 'server-method-field.component.html',
    styleUrls: ['server-method-field.component.scss'],
})
export class ServerMethodFieldComponent implements OnInit {
    @Input()
    public path: string;
    @Input()
    public field: PbField;
    @Input()
    public fields: Map<string, any>;
    @Input()
    public types: PbType[];
    public type: PbType;
    public children: ChildType[];
    constructor() {
        this.children = [];
    }
    public ngOnInit() {
        this.type = this.types.find((t) => t.name === this.field.type);
        if (this.path === '') {
            this.addChild();
        }
    }
    public addChild() {
        this.children.push(this.clone({
            removed: false,
            type: this.type,
        }));
    }
    public setValue(v: any) {
        this.fields.set(this.path + '.' + this.field.name, v);
    }
    public getValue() {
        if (this.fields.has(this.path + '.' + this.field.name)) {
            return this.fields.get(this.path + '.' + this.field.name);
        } else {
            if (this.type && this.type.isEnum) {
                return 0;
            }
        }
    }
    public removeChild(childId: number) {
        const child = this.children[childId];
        const queue = [];
        this.fields.forEach((v, key) => {
            if (key.indexOf(this.path + '.' + this.field.name + (this.field.repeated ? ('[' + childId + ']') : '')) === 0) {
                queue.push(key);
            }
        });
        for (const k of queue) {
            this.fields.delete(k);
        }
        child.removed = true;
        if (this.children.filter((c) => c.removed).length === this.children.length) {
            this.children = [];
        }
    }
    private clone(obj: any): any {
        return JSON.parse(JSON.stringify(obj));
    }
}
