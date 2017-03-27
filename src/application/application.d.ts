import { ComponentFactoryResolver } from '../component/factory_resolver';
import { ComponentRef } from '../component/reference';
import { ComponentFactory } from '../component/factory';
import { ClassType } from '../type';
import { ViewRef } from '../view/view_ref';
import { Injector } from '../di/injector';
/**
 * This is a reference of a Mojiito Application.
 *
 * @export
 * @class ApplicationRef
 */
export declare class ApplicationRef {
    injector: Injector;
    private _componentFactoryResolver;
    private _rootComponents;
    private _rootComponentTypes;
    private _views;
    constructor(injector: Injector, _componentFactoryResolver: ComponentFactoryResolver);
    bootstrap<C>(componentOrFactory: ClassType<C> | ComponentFactory<C>): ComponentRef<C>;
    attachView(viewRef: ViewRef): void;
    detachView(viewRef: ViewRef): void;
    private _loadComponent(componentRef);
    private _unloadComponent(componentRef);
    onDestroy(): void;
}
