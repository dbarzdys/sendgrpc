
import * as path from 'path';
import * as fs from 'fs';

import { Root, load, loadSync, NamespaceBase } from 'protobufjs';
import { Component } from '@nestjs/common';

import { ConfigServer } from '../config/models';
import { extractServices } from './utils';

@Component()
export class ServerService {
    public async read(protoPath: string): Promise<NamespaceBase> {
        return new Promise<NamespaceBase>((resolve, reject) => {
            load(protoPath, (err, root) => {
                if (err) {
                    return reject(err);
                }
                try {
                    resolve(root.resolveAll());
                } catch (err) {
                    reject(err);
                }
            });
        });
    }
    public exist(protoPath: string): boolean {
        return fs.existsSync(protoPath);
    }
}