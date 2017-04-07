import * as hapi from 'hapi';
export interface MassiveOptions {
    connectionString: string;
    models: any;
}
export declare const plugin: {
    register: (server: hapi.Server, options: MassiveOptions, next: Function) => void;
    attributes: {
        pkg: any;
    };
};
