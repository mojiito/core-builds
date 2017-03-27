import { ApplicationRef } from '../application/application';
export declare abstract class ViewRef {
    /** Destroys the view and all of the data structures associated with it. */
    abstract destroy(): void;
    readonly abstract destroyed: boolean;
    abstract onDestroy(callback: Function): any;
}
export interface InternalViewRef extends ViewRef {
    detachFromAppRef(): void;
    attachToAppRef(appRef: ApplicationRef): void;
}
