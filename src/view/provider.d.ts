import { ViewData, NodeDef, DepDef } from './types';
export declare function tokenKey(token: any): string;
export declare function resolveDep(view: ViewData, depDef: DepDef, allowPrivateServices: boolean, notFoundValue?: Object): any;
export declare function createProviderInstance(view: ViewData, def: NodeDef): any;
