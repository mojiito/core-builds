import { BaseError } from '../facade/error';
import { ClassType } from '../type';
export declare class InvalidComponentTypeError extends BaseError {
    constructor(type: any);
}
export declare class NoMetadataFoundError extends BaseError {
    constructor(classType: ClassType<any>);
}
export declare class ComponentAlreadyFoundError extends BaseError {
    constructor(classType: ClassType<any>);
}
export declare class NotYetBootstrappedError extends BaseError {
    constructor(methodName: string);
}
export declare class AlreadyBootstrappedError extends BaseError {
    constructor();
}
