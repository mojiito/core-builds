import { ClassType } from '../type';
import { ComponentFactory } from './factory';
import { BaseError } from '../facade/error';
export declare class ComponentFactoryResolver {
    private _parent;
    private _factories;
    constructor(factories: ComponentFactory<any>[], _parent?: ComponentFactoryResolver);
    resolveComponentFactory<C>(componentType: ClassType<C>): ComponentFactory<C>;
}
export declare class CouldNotResolveFactoryError extends BaseError {
    constructor(type: ClassType<any>);
}
