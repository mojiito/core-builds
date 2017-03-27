import { ClassType } from '../type';
export interface TypeDecorator {
    <T extends ClassType<any>>(type: T): T;
    (target: Object, propertyKey?: string | symbol, parameterIndex?: number): void;
    annotations: any[];
    Class(obj: ClassType<any>): ClassType<any>;
}
export declare function makeDecorator(name: string, props: {
    [name: string]: any;
}, parentClass?: any, chainFn?: (fn: Function) => void): (...args: any[]) => (cls: any) => any;
export declare function makeParamDecorator(name: string, props: ([string, any] | {
    [name: string]: any;
})[], parentClass?: any): any;
export declare function makePropDecorator(name: string, props: ([string, any] | {
    [key: string]: any;
})[], parentClass?: any): any;
