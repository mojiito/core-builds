import { Injector } from '../di/injector';
import { Provider } from '../di/provider';
import { ClassType } from '../type';
export declare abstract class PlatformRef {
    abstract bootstrapComponent<C>(component: ClassType<C>): void;
    readonly abstract injector: Injector;
    abstract onDestroy(callback: () => void): void;
    abstract destroy(): void;
    readonly abstract destroyed: boolean;
}
export declare function getPlatform(): PlatformRef;
export declare function createPlatformFactory(providers?: Provider[]): (extraProviders?: Provider[]) => PlatformRef;
