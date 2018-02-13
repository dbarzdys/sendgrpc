import { PbField } from './pb-field';
import { PbEnumValue } from './pb-enum-value';

export interface PbType {
    isEnum: boolean;
    name: string;
    fields?: PbField[];
    values?: PbEnumValue[];
}