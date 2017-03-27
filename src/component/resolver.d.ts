import { ClassType } from '../type';
import { Component } from './metadata';
import { ReflectorReader } from '../reflection/reflector_reader';
export declare class ComponentResolver {
    private _reflector;
    private _resolved;
    constructor(_reflector?: ReflectorReader);
    /**
     * Resolve the metadata of a Component.
     *
     * @param {ClassType<any>} type component type
     * @param {boolean} [throwIfNotFound=true]
     * @returns component metadata
     * @memberOf ComponentResolver
     */
    resolve(type: ClassType<any>, throwIfNotFound?: boolean): Component;
    private _mergeWithPropertyMetadata(meta, propertyMetadata, type);
}
