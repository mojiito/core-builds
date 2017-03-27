import { ClassType } from '../type';
import { ComponentRef } from './reference';
import { Injector } from '../di/injector';
export declare abstract class ComponentFactory<C> {
    readonly abstract selector: string;
    readonly abstract componentType: ClassType<any>;
    /**
     * Creates a new component.
     */
    abstract create(injector: Injector, rootSelectorOrNode?: string | any): ComponentRef<C>;
}
