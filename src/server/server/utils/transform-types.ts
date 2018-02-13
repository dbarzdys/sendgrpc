import { Type } from 'protobufjs';

import { PbType, PbEnumValue, PbField } from '../../../common/models';

export function transformTypes(types: Type[]): PbType[] {
    return types.map((t) => {
        if ('fields' in t) {
            return transformType(t);
        }
        if ('values' in t) {
            return transformEnum(t);
        }
        return null;
    });
}

function transformEnum(type: Type): PbType {
    const values: PbEnumValue[] = [];
    for (const name in type['values']) {
        if (typeof type['values'][name] === 'number') {
            values.push({
                name,
                value: type['values'][name],
            });
        }
    }
    return {
        isEnum: true,
        name: type.name,
        values,
    };
}

function transformType(type: Type): PbType {
    const fields: PbField[] = [];
    for (const field of type.fieldsArray) {
        fields.push({
            id: field.id,
            name: field.name,
            repeated: field.repeated,
            rule: field.rule,
            type: field.type,
        });
    }
    return {
        isEnum: false,
        name: type.name,
        fields,
    };
}