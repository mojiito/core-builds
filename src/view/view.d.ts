import { Injector } from '../di/injector';
import { Provider } from '../di/provider';
import { ViewData, RootData, ViewDefinition } from './types';
export declare function createRootView(def: ViewDefinition, injector: Injector, rootSelectorOrNode: string | any, context?: any): ViewData;
export declare function createView(root: RootData, parent: ViewData, renderElement: any, def: ViewDefinition): ViewData;
export declare function initView(view: ViewData, component: any, context: any): void;
export declare function destroyView(view: ViewData): void;
export declare function createViewDefinitionFactory(publicProviders: Provider[], componentProvider: any): () => ViewDefinition;
