import { Service } from 'protobufjs';

import { PbService, PbMethod } from '../../../common/models';

export function transformServices(services: Service[]): PbService[] {
    return services.map((s) => transform(s));
}

function transform(service: Service): PbService {
    return {
        methods: service.methodsArray.map((m) => {
            return {
                name: m.name,
                requestType: m.requestType,
                responseType: m.responseType,
            };
        }),
        name: service.name,
    };
}
