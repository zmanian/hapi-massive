import * as massive from "massive";
import * as hapi from 'hapi';
export interface MassiveOption<T extends massive.Massive> {
    connectionString: string;
    models: Model<T>;
}
export declare class Model<T extends massive.Massive> {
    static modelName: string;
    db: T;
    properties: any;
    constructor(doc: any, db: massive.Massive);
    static create(document: any, db: massive.Massive, cb: Function): void;
}
export declare const plugin: {
    register: (server: hapi.Server, options: any, next: Function) => void;
    attributes: {
        pkg: any;
    };
};
