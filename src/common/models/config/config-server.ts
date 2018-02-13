export interface IConfigServer {
    readonly name: string;
    readonly protoPath: string;
    readonly certPath: string;
    readonly target: string;
    readonly hash: string;
}
