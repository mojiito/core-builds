import { ClassType } from '../type';
import { Injector } from '../di/injector';
import { ComponentFactory } from '../component/factory';
import { ViewData, ViewDefinitionFactory, ViewContainerData } from './types';
export declare function createInjector(view: ViewData): Injector;
export declare function createComponentFactory(selector: string, componentType: ClassType<any>, viewDefFactory: ViewDefinitionFactory): ComponentFactory<any>;
export declare function createViewContainerData(view: ViewData): ViewContainerData;
