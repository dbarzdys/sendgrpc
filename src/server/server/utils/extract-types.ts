import { ReflectionObject, Service, NamespaceBase, Method, Type } from 'protobufjs';

import { PbService, PbMethod, PbType } from '../../../common/models';

export function extractTypes(nb: NamespaceBase, fileName: string) {
    return extract(nb, fileName, nb);
}

function extract(nb: NamespaceBase, fileName: string, nested: ReflectionObject, path = null): Type[] {
    if (nested['nested']) {
        return extract(nb, fileName, nested['nested'] as any, path);
    }
    const res: Type[] = [];
    for (const k in nested) {
        if ('fields' in nested[k] || 'values' in nested[k]) {
            const spath: string = path ? `${path}.${k}` : k;
            const s = nb.lookupTypeOrEnum(spath);
            res.push(s);
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
