import { PbMethod } from './pb-method';

export interface PbService {
    name: string;
    methods: PbMethod[];
}
