/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Convenience to throw an Error with 'unimplemented' as the message.
 */
export declare function unimplemented(): any;
export declare class BaseError extends Error {
    constructor(message: string);
    message: string;
    readonly name: string;
    stack: any;
    toString(): string;
}
export declare class WrappedError extends BaseError {
    originalError: any;
    constructor(message: string, error: any);
    readonly stack: any;
}
