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
        const path = this.path + '.' + this.field.name;
        if (this.fields.has(path)) {
            return this.fields.get(path);
        } else {
            let val: any;
            switch (this.field.type) {
                case 'string':
                val = '';
                break;
                case 'bool':
                val = false;
                break;
                case 'float':
                case 'double':
                val = 0.0;
                break;
                case 'int32':
                case 'int64':
                case 'uint32':
                case 'uint64':
                val = 0;
                break;
                default:
            }
            if (this.type && this.type.isEnum) {
                val = 0;
            }
            this.fields.set(path, val);
            return this.getValue();
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
