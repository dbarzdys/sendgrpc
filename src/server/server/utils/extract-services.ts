import { ReflectionObject, Service, NamespaceBase, Method, Type } from 'protobufjs';

import { PbService, PbMethod, PbType } from '../../../common/models';

export function extractServices(nb: NamespaceBase, fileName: string) {
    return extract(nb, fileName, nb);
}

function extract(nb: NamespaceBase, fileName: string, nested: ReflectionObject, path = null): Service[] {
    if (nested['nested']) {
        return extract(nb, fileName, nested['nested'] as any, path);
    }
    const res: Service[] = [];
    for (const k in nested) {
        if ('methods' in nested[k]) {
            const spath: string = path ? `${path}.${k}` : k;
            const s = nb.lookupService(spath);
            if (s.filename === fileName) {
                res.push(s);
            }
        }else if (nested[k]['nested']) {
            const spath: string = path ? `${path}.${k}` : k;
            const arr = extract(nb, fileName, nested[k]['nested'], spath);
            for (const s of arr) {
                res.push(s);
            }
        }
    }
    return res;
}
