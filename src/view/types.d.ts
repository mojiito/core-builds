import { Renderer, RendererFactory, RendererType } from '../render';
import { Injector } from '../di/injector';
import { ViewContainerRef } from './view_container_ref';
export interface NodeDef {
    flags: NodeFlags;
    index: number;
    provider: ProviderDef;
}
export interface ProviderDef {
    token: any;
    tokenKey: string;
    factory: (...deps: any[]) => any;
    deps: DepDef[];
}
export interface DepDef {
    flags: DepFlags;
    token: any;
    tokenKey: string;
}
export declare const enum DepFlags {
    None = 0,
    SkipSelf = 1,
    Optional = 2,
    Value = 8,
}
export interface ProviderData {
    instance: any;
}
export declare function asProviderData(view: ViewData, index: number): ProviderData;
export interface ViewDefinition {
    factory: ViewDefinitionFactory;
    nodes: NodeDef[];
    /** aggregated NodeFlags for all nodes **/
    nodeFlags: NodeFlags;
    componentRendererType: RendererType;
    componentProvider: NodeDef;
    publicProviders: {
        [tokenKey: string]: NodeDef;
    };
    allProviders: {
        [tokenKey: string]: NodeDef;
    };
}
export declare type ViewDefinitionFactory = () => ViewDefinition;
export declare class NodeData {
    private __brand;
}
export interface ViewData {
    def: ViewDefinition;
    renderElement: any;
    root: RootData;
    renderer: Renderer;
    nodes: NodeData[];
    parent: ViewData;
    viewContainerParent: ViewData;
    viewContainer: ViewContainerData;
    component: any;
    context: any;
    state: ViewState;
    disposables: DisposableFn[];
}
export declare const enum ViewState {
    FirstCheck = 1,
    ChecksEnabled = 2,
    Errored = 4,
    Destroyed = 8,
}
export interface ViewContainerData extends ViewContainerRef {
    _embeddedViews: ViewData[];
}
export declare type DisposableFn = () => void;
export interface RootData {
    injector: Injector;
    selectorOrNode: any;
    renderer: Renderer;
    rendererFactory: RendererFactory;
    element: any;
}
export declare const enum NodeFlags {
    None = 0,
    TypeProvider = 128,
    LazyProvider = 2048,
    PrivateProvider = 4096,
    TypeComponent = 16384,
    CatProvider = 16512,
    OnDestroy = 65536,
    EmbeddedViews = 8388608,
    ComponentView = 16777216,
    Types = 16512,
}
