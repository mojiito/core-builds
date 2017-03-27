export interface ClassType<T> extends Function {
    new (...args: Array<any>): T;
    constructor: Function | any[];
    [propertyName: string]: any;
    name: string;
}
export declare function isClassInstance(instance: any): boolean;
export declare const Type: FunctionConstructor;
export declare function isType(v: any): v is Type<any>;
export interface Type<T> extends Function {
    new (...args: any[]): T;
}
