/**
 * @license Mojiito v2.0.0-alpha.3-e516559
 * (c) 2010-2017 Thomas Pink
 * License: MIT
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
class StringMapWrapper {
    /**
     * @template V
     * @param {?} m1
     * @param {?} m2
     * @return {?}
     */
    static merge(m1, m2) {
        const /** @type {?} */ m = {};
        for (const /** @type {?} */ k of Object.keys(m1)) {
            m[k] = m1[k];
        }
        for (const /** @type {?} */ k of Object.keys(m2)) {
            m[k] = m2[k];
        }
        return m;
    }
    /**
     * @template V
     * @param {?} m1
     * @param {?} m2
     * @return {?}
     */
    static equals(m1, m2) {
        const /** @type {?} */ k1 = Object.keys(m1);
        const /** @type {?} */ k2 = Object.keys(m2);
        if (k1.length != k2.length) {
            return false;
        }
        for (let /** @type {?} */ i = 0; i < k1.length; i++) {
            const /** @type {?} */ key = k1[i];
            if (m1[key] !== m2[key]) {
                return false;
            }
        }
        return true;
    }
}
class ListWrapper {
    /**
     * @template T
     * @param {?} arr
     * @param {?} condition
     * @return {?}
     */
    static findLast(arr, condition) {
        for (let /** @type {?} */ i = arr.length - 1; i >= 0; i--) {
            if (condition(arr[i])) {
                return arr[i];
            }
        }
        return null;
    }
    /**
     * @template T
     * @param {?} list
     * @param {?} items
     * @return {?}
     */
    static removeAll(list, items) {
        for (let /** @type {?} */ i = 0; i < items.length; ++i) {
            const /** @type {?} */ index = list.indexOf(items[i]);
            if (index > -1) {
                list.splice(index, 1);
            }
        }
    }
    /**
     * @template T
     * @param {?} list
     * @param {?} el
     * @return {?}
     */
    static remove(list, el) {
        const /** @type {?} */ index = list.indexOf(el);
        if (index > -1) {
            list.splice(index, 1);
            return true;
        }
        return false;
    }
    /**
     * @param {?} a
     * @param {?} b
     * @return {?}
     */
    static equals(a, b) {
        if (a.length != b.length)
            return false;
        for (let /** @type {?} */ i = 0; i < a.length; ++i) {
            if (a[i] !== b[i])
                return false;
        }
        return true;
    }
    /**
     * @template T
     * @param {?} list
     * @return {?}
     */
    static flatten(list) {
        return list.reduce((flat, item) => {
            const /** @type {?} */ flatItem = Array.isArray(item) ? ListWrapper.flatten(item) : item;
            return ((flat)).concat(flatItem);
        }, []);
    }
    /**
     * @template T
     * @param {?} list
     * @param {?} callback
     * @return {?}
     */
    static forEach(list, callback) {
        for (let /** @type {?} */ i = 0, /** @type {?} */ max = list.length; i < max; i++) {
            callback.call(callback, list[i], i);
        }
    }
}

/**
 * Returns the class name of a type.
 *
 * @export
 * @template T
 * @param {?} klass
 * @return {?}
 */
function getClassName(klass) {
    return ((klass)).name ? ((klass)).name :
        /^function\s+([\w\$]+)\s*\(/.exec(this.toString())[1];
}
/**
 * Tries to stringify a token. A token can be any type.
 *
 * @export
 * @param {?} token
 * @return {?}
 */
function stringify(token) {
    if (typeof token === 'string') {
        return token;
    }
    if (token === undefined || token === null) {
        return '' + token;
    }
    if (token.name) {
        return token.name;
    }
    if (token.overriddenName) {
        return token.overriddenName;
    }
    if (typeof token === 'function') {
        return getClassName(token);
    }
    if (token instanceof HTMLElement) {
        let /** @type {?} */ parts = token.toString().match(/\w+/g);
        if (parts && parts.length) {
            return parts[parts.length - 1];
        }
    }
    var /** @type {?} */ res = token.toString();
    var /** @type {?} */ newLineIndex = res.indexOf('\n');
    return (newLineIndex === -1) ? res : res.substring(0, newLineIndex);
}
let globalScope;
if (typeof window === 'undefined') {
    if (typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope) {
        // TODO: Replace any with WorkerGlobalScope from lib.webworker.d.ts #3492
        globalScope = (self);
    }
    else {
        globalScope = (global);
    }
}
else {
    globalScope = (window);
}
/**
 * @param {?} obj
 * @return {?}
 */

/**
 * @param {?} obj
 * @return {?}
 */

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const Reflect = globalScope.Reflect;
/**
 * @param {?} name
 * @param {?} props
 * @param {?=} parentClass
 * @param {?=} chainFn
 * @return {?}
 */
function makeDecorator(name, props, parentClass, chainFn = null) {
    const /** @type {?} */ metaCtor = makeMetadataCtor([props]);
    /**
     * @param {?} objOrType
     * @return {?}
     */
    function DecoratorFactory(objOrType) {
        if (!(Reflect && Reflect.getOwnMetadata)) {
            throw 'reflect-metadata shim is required when using class decorators';
        }
        if (this instanceof DecoratorFactory) {
            metaCtor.call(this, objOrType);
            return this;
        }
        const /** @type {?} */ annotationInstance = new ((DecoratorFactory))(objOrType);
        const /** @type {?} */ chainAnnotation = typeof this === 'function' && Array.isArray(this.annotations) ? this.annotations : [];
        chainAnnotation.push(annotationInstance);
        // tslint:disable-next-line:variable-name
        const /** @type {?} */ TypeDecorator = (function TypeDecorator(cls) {
            const /** @type {?} */ annotations = Reflect.getOwnMetadata('annotations', cls) || [];
            annotations.push(annotationInstance);
            Reflect.defineMetadata('annotations', annotations, cls);
            return cls;
        });
        TypeDecorator.annotations = chainAnnotation;
        // TypeDecorator.Class = Class;
        if (chainFn)
            chainFn(TypeDecorator);
        return TypeDecorator;
    }
    if (parentClass) {
        DecoratorFactory.prototype = Object.create(parentClass.prototype);
    }
    DecoratorFactory.prototype.toString = () => `@${name}`;
    ((DecoratorFactory)).annotationCls = DecoratorFactory;
    return DecoratorFactory;
}
/**
 * @param {?} props
 * @return {?}
 */
function makeMetadataCtor(props) {
    return function ctor(...args) {
        props.forEach((prop, i) => {
            const /** @type {?} */ argVal = args[i];
            if (Array.isArray(prop)) {
                // plain parameter
                this[prop[0]] = argVal === undefined ? prop[1] : argVal;
            }
            else {
                for (const /** @type {?} */ propName in prop) {
                    this[propName] =
                        argVal && argVal.hasOwnProperty(propName) ? argVal[propName] : prop[propName];
                }
            }
        });
    };
}
/**
 * @param {?} name
 * @param {?} props
 * @param {?=} parentClass
 * @return {?}
 */
function makeParamDecorator(name, props, parentClass) {
    const /** @type {?} */ metaCtor = makeMetadataCtor(props);
    /**
     * @param {...?} args
     * @return {?}
     */
    function ParamDecoratorFactory(...args) {
        if (this instanceof ParamDecoratorFactory) {
            metaCtor.apply(this, args);
            return this;
        }
        const /** @type {?} */ annotationInstance = new ((ParamDecoratorFactory))(...args);
        ((ParamDecorator)).annotation = annotationInstance;
        return ParamDecorator;
        /**
         * @param {?} cls
         * @param {?} unusedKey
         * @param {?} index
         * @return {?}
         */
        function ParamDecorator(cls, unusedKey, index) {
            const /** @type {?} */ parameters = Reflect.getOwnMetadata('parameters', cls) || [];
            // there might be gaps if some in between parameters do not have annotations.
            // we pad with nulls.
            while (parameters.length <= index) {
                parameters.push(null);
            }
            parameters[index] = parameters[index] || [];
            parameters[index].push(annotationInstance);
            Reflect.defineMetadata('parameters', parameters, cls);
            return cls;
        }
    }
    if (parentClass) {
        ParamDecoratorFactory.prototype = Object.create(parentClass.prototype);
    }
    ParamDecoratorFactory.prototype.toString = () => `@${name}`;
    ((ParamDecoratorFactory)).annotationCls = ParamDecoratorFactory;
    return ParamDecoratorFactory;
}
/**
 * @param {?} name
 * @param {?} props
 * @param {?=} parentClass
 * @return {?}
 */
function makePropDecorator(name, props, parentClass) {
    const /** @type {?} */ metaCtor = makeMetadataCtor(props);
    /**
     * @param {...?} args
     * @return {?}
     */
    function PropDecoratorFactory(...args) {
        if (this instanceof PropDecoratorFactory) {
            metaCtor.apply(this, args);
            return this;
        }
        const /** @type {?} */ decoratorInstance = new ((PropDecoratorFactory))(...args);
        // tslint:disable-next-line:no-shadowed-variable
        return function PropDecorator(target, name) {
            const /** @type {?} */ meta = Reflect.getOwnMetadata('propMetadata', target.constructor) || {};
            meta[name] = meta.hasOwnProperty(name) && meta[name] || [];
            meta[name].unshift(decoratorInstance);
            Reflect.defineMetadata('propMetadata', meta, target.constructor);
        };
    }
    if (parentClass) {
        PropDecoratorFactory.prototype = Object.create(parentClass.prototype);
    }
    PropDecoratorFactory.prototype.toString = () => `@${name}`;
    ((PropDecoratorFactory)).annotationCls = PropDecoratorFactory;
    return PropDecoratorFactory;
}

// tslint:disable:variable-name
/**
 * Component decorator and metadata.
 *
 * \@Annotation
 */
const Component = makeDecorator('Component', {
    selector: undefined,
    providers: undefined,
    components: undefined,
    host: undefined,
    childs: undefined,
});
/**
 * HostListener decorator and metadata.
 *
 * \@Annotation
 */
const HostListener = makePropDecorator('HostListener', [['eventName', undefined], ['args', []]]);
/**
 * ChildListener decorator and metadata.
 *
 * \@Annotation
 */
const ChildListener = makePropDecorator('ChildListener', [
    ['selector', undefined],
    ['eventName', undefined],
    ['args', []]
]);

/**
 * @param {?} instance
 * @return {?}
 */

// tslint:disable:variable-name
const Type = Function;
/**
 * @param {?} v
 * @return {?}
 */
function isType(v) {
    return typeof v === 'function';
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Attention: This regex has to hold even if the code is minified!
 */
const DELEGATE_CTOR = /^function\s+\S+\(\)\s*{\s*("use strict";)?\s*(return\s+)?(\S+\s+!==\s+null\s+&&\s+)?\S+\.apply\(this,\s*arguments\)/;
class ReflectionCapabilities {
    /**
     * @param {?=} reflect
     */
    constructor(reflect) { this._reflect = reflect || globalScope['Reflect']; }
    /**
     * @return {?}
     */
    isReflectionEnabled() { return true; }
    /**
     * @template T
     * @param {?} t
     * @return {?}
     */
    factory(t) { return (...args) => new t(...args); }
    /**
     * \@internal
     * @param {?} paramTypes
     * @param {?} paramAnnotations
     * @return {?}
     */
    _zipTypesAndAnnotations(paramTypes, paramAnnotations) {
        let /** @type {?} */ result;
        if (typeof paramTypes === 'undefined') {
            result = new Array(paramAnnotations.length);
        }
        else {
            result = new Array(paramTypes.length);
        }
        for (let /** @type {?} */ i = 0; i < result.length; i++) {
            // TS outputs Object for parameters without types, while Traceur omits
            // the annotations. For now we preserve the Traceur behavior to aid
            // migration, but this can be revisited.
            if (typeof paramTypes === 'undefined') {
                result[i] = [];
            }
            else if (paramTypes[i] != Object) {
                result[i] = [paramTypes[i]];
            }
            else {
                result[i] = [];
            }
            if (paramAnnotations && paramAnnotations[i] != null) {
                result[i] = result[i].concat(paramAnnotations[i]);
            }
        }
        return result;
    }
    /**
     * @param {?} type
     * @param {?} parentCtor
     * @return {?}
     */
    _ownParameters(type, parentCtor) {
        // If we have no decorators, we only have function.length as metadata.
        // In that case, to detect whether a child class declared an own constructor or not,
        // we need to look inside of that constructor to check whether it is
        // just calling the parent.
        // This also helps to work around for https://github.com/Microsoft/TypeScript/issues/12439
        // that sets 'design:paramtypes' to []
        // if a class inherits from another class but has no ctor declared itself.
        if (DELEGATE_CTOR.exec(type.toString())) {
            return null;
        }
        // Prefer the direct API.
        if (((type)).parameters && ((type)).parameters !== parentCtor.parameters) {
            return ((type)).parameters;
        }
        // API of tsickle for lowering decorators to properties on the class.
        const /** @type {?} */ tsickleCtorParams = ((type)).ctorParameters;
        if (tsickleCtorParams && tsickleCtorParams !== parentCtor.ctorParameters) {
            // Newer tsickle uses a function closure
            // Retain the non-function case for compatibility with older tsickle
            const /** @type {?} */ ctorParameters = typeof tsickleCtorParams === 'function' ? tsickleCtorParams() : tsickleCtorParams;
            const /** @type {?} */ paramTypes = ctorParameters.map((ctorParam) => ctorParam && ctorParam.type);
            const /** @type {?} */ paramAnnotations = ctorParameters.map((ctorParam) => ctorParam && convertTsickleDecoratorIntoMetadata(ctorParam.decorators));
            return this._zipTypesAndAnnotations(paramTypes, paramAnnotations);
        }
        // API for metadata created by invoking the decorators.
        if (this._reflect != null && this._reflect.getOwnMetadata != null) {
            const /** @type {?} */ paramAnnotations = this._reflect.getOwnMetadata('parameters', type);
            const /** @type {?} */ paramTypes = this._reflect.getOwnMetadata('design:paramtypes', type);
            if (paramTypes || paramAnnotations) {
                return this._zipTypesAndAnnotations(paramTypes, paramAnnotations);
            }
        }
        // If a class has no decorators, at least create metadata
        // based on function.length.
        // Note: We know that this is a real constructor as we checked
        // the content of the constructor above.
        return new Array(((type.length))).fill(undefined);
    }
    /**
     * @param {?} type
     * @return {?}
     */
    parameters(type) {
        // Note: only report metadata if we have at least one class decorator
        // to stay in sync with the static reflector.
        if (!isType(type)) {
            return [];
        }
        const /** @type {?} */ parentCtor = getParentCtor(type);
        let /** @type {?} */ parameters = this._ownParameters(type, parentCtor);
        if (!parameters && parentCtor !== Object) {
            parameters = this.parameters(parentCtor);
        }
        return parameters || [];
    }
    /**
     * @param {?} typeOrFunc
     * @param {?} parentCtor
     * @return {?}
     */
    _ownAnnotations(typeOrFunc, parentCtor) {
        // Prefer the direct API.
        if (((typeOrFunc)).annotations && ((typeOrFunc)).annotations !== parentCtor.annotations) {
            let /** @type {?} */ annotations = ((typeOrFunc)).annotations;
            if (typeof annotations === 'function' && annotations.annotations) {
                annotations = annotations.annotations;
            }
            return annotations;
        }
        // API of tsickle for lowering decorators to properties on the class.
        if (((typeOrFunc)).decorators && ((typeOrFunc)).decorators !== parentCtor.decorators) {
            return convertTsickleDecoratorIntoMetadata(((typeOrFunc)).decorators);
        }
        // API for metadata created by invoking the decorators.
        if (this._reflect && this._reflect.getOwnMetadata) {
            return this._reflect.getOwnMetadata('annotations', typeOrFunc);
        }
    }
    /**
     * @param {?} typeOrFunc
     * @return {?}
     */
    annotations(typeOrFunc) {
        if (!isType(typeOrFunc)) {
            return [];
        }
        const /** @type {?} */ parentCtor = getParentCtor(typeOrFunc);
        const /** @type {?} */ ownAnnotations = this._ownAnnotations(typeOrFunc, parentCtor) || [];
        const /** @type {?} */ parentAnnotations = parentCtor !== Object ? this.annotations(parentCtor) : [];
        return parentAnnotations.concat(ownAnnotations);
    }
    /**
     * @param {?} typeOrFunc
     * @param {?} parentCtor
     * @return {?}
     */
    _ownPropMetadata(typeOrFunc, parentCtor) {
        // Prefer the direct API.
        if (((typeOrFunc)).propMetadata &&
            ((typeOrFunc)).propMetadata !== parentCtor.propMetadata) {
            let /** @type {?} */ propMetadata = ((typeOrFunc)).propMetadata;
            if (typeof propMetadata === 'function' && propMetadata.propMetadata) {
                propMetadata = propMetadata.propMetadata;
            }
            return propMetadata;
        }
        // API of tsickle for lowering decorators to properties on the class.
        if (((typeOrFunc)).propDecorators &&
            ((typeOrFunc)).propDecorators !== parentCtor.propDecorators) {
            const /** @type {?} */ propDecorators = ((typeOrFunc)).propDecorators;
            const /** @type {?} */ propMetadata = ({});
            Object.keys(propDecorators).forEach(prop => {
                propMetadata[prop] = convertTsickleDecoratorIntoMetadata(propDecorators[prop]);
            });
            return propMetadata;
        }
        // API for metadata created by invoking the decorators.
        if (this._reflect && this._reflect.getOwnMetadata) {
            return this._reflect.getOwnMetadata('propMetadata', typeOrFunc);
        }
    }
    /**
     * @param {?} typeOrFunc
     * @return {?}
     */
    propMetadata(typeOrFunc) {
        if (!isType(typeOrFunc)) {
            return {};
        }
        const /** @type {?} */ parentCtor = getParentCtor(typeOrFunc);
        const /** @type {?} */ propMetadata = {};
        if (parentCtor !== Object) {
            const /** @type {?} */ parentPropMetadata = this.propMetadata(parentCtor);
            Object.keys(parentPropMetadata).forEach((propName) => {
                propMetadata[propName] = parentPropMetadata[propName];
            });
        }
        const /** @type {?} */ ownPropMetadata = this._ownPropMetadata(typeOrFunc, parentCtor);
        if (ownPropMetadata) {
            Object.keys(ownPropMetadata).forEach((propName) => {
                const /** @type {?} */ decorators = [];
                if (propMetadata.hasOwnProperty(propName)) {
                    decorators.push(...propMetadata[propName]);
                }
                decorators.push(...ownPropMetadata[propName]);
                propMetadata[propName] = decorators;
            });
        }
        return propMetadata;
    }
    /**
     * @param {?} type
     * @param {?} lcProperty
     * @return {?}
     */
    hasLifecycleHook(type, lcProperty) {
        return type instanceof Type && lcProperty in type.prototype;
    }
    /**
     * @param {?} name
     * @return {?}
     */
    getter(name) { return (new Function('o', 'return o.' + name + ';')); }
    /**
     * @param {?} name
     * @return {?}
     */
    setter(name) {
        return (new Function('o', 'v', 'return o.' + name + ' = v;'));
    }
    /**
     * @param {?} name
     * @return {?}
     */
    method(name) {
        const /** @type {?} */ functionBody = `if (!o.${name}) throw new Error('"${name}" is undefined');
        return o.${name}.apply(o, args);`;
        return (new Function('o', 'args', functionBody));
    }
    /**
     * @param {?} type
     * @return {?}
     */
    importUri(type) {
        // StaticSymbol
        if (typeof type === 'object' && type['filePath']) {
            return type['filePath'];
        }
        // Runtime type
        return `./${stringify(type)}`;
    }
    /**
     * @param {?} type
     * @return {?}
     */
    resourceUri(type) { return `./${stringify(type)}`; }
    /**
     * @param {?} name
     * @param {?} moduleUrl
     * @param {?} members
     * @param {?} runtime
     * @return {?}
     */
    resolveIdentifier(name, moduleUrl, members, runtime) {
        return runtime;
    }
    /**
     * @param {?} enumIdentifier
     * @param {?} name
     * @return {?}
     */
    resolveEnum(enumIdentifier, name) { return enumIdentifier[name]; }
}
/**
 * @param {?} decoratorInvocations
 * @return {?}
 */
function convertTsickleDecoratorIntoMetadata(decoratorInvocations) {
    if (!decoratorInvocations) {
        return [];
    }
    return decoratorInvocations.map(decoratorInvocation => {
        const /** @type {?} */ decoratorType = decoratorInvocation.type;
        const /** @type {?} */ annotationCls = decoratorType.annotationCls;
        const /** @type {?} */ annotationArgs = decoratorInvocation.args ? decoratorInvocation.args : [];
        return new annotationCls(...annotationArgs);
    });
}
/**
 * @param {?} ctor
 * @return {?}
 */
function getParentCtor(ctor) {
    const /** @type {?} */ parentProto = Object.getPrototypeOf(ctor.prototype);
    const /** @type {?} */ parentCtor = parentProto ? parentProto.constructor : null;
    // Note: We always use `Object` as the null value
    // to simplify checking later on.
    return parentCtor || Object;
}

/**
 * Provides read-only access to reflection data about symbols. Used internally by Angular
 * to power dependency injection and compilation.
 * @abstract
 */
class ReflectorReader {
    /**
     * @abstract
     * @param {?} typeOrFunc
     * @return {?}
     */
    parameters(typeOrFunc) { }
    /**
     * @abstract
     * @param {?} typeOrFunc
     * @return {?}
     */
    annotations(typeOrFunc) { }
    /**
     * @abstract
     * @param {?} typeOrFunc
     * @return {?}
     */
    propMetadata(typeOrFunc) { }
    /**
     * @abstract
     * @param {?} typeOrFunc
     * @return {?}
     */
    importUri(typeOrFunc) { }
    /**
     * @abstract
     * @param {?} typeOrFunc
     * @return {?}
     */
    resourceUri(typeOrFunc) { }
    /**
     * @abstract
     * @param {?} name
     * @param {?} moduleUrl
     * @param {?} members
     * @param {?} runtime
     * @return {?}
     */
    resolveIdentifier(name, moduleUrl, members, runtime) { }
    /**
     * @abstract
     * @param {?} identifier
     * @param {?} name
     * @return {?}
     */
    resolveEnum(identifier, name) { }
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Provides access to reflection data about symbols. Used internally by Angular
 * to power dependency injection and compilation.
 */
class Reflector extends ReflectorReader {
    /**
     * @param {?} reflectionCapabilities
     */
    constructor(reflectionCapabilities) {
        super();
        this.reflectionCapabilities = reflectionCapabilities;
    }
    /**
     * @param {?} caps
     * @return {?}
     */
    updateCapabilities(caps) { this.reflectionCapabilities = caps; }
    /**
     * @param {?} type
     * @return {?}
     */
    factory(type) { return this.reflectionCapabilities.factory(type); }
    /**
     * @param {?} typeOrFunc
     * @return {?}
     */
    parameters(typeOrFunc) {
        return this.reflectionCapabilities.parameters(typeOrFunc);
    }
    /**
     * @param {?} typeOrFunc
     * @return {?}
     */
    annotations(typeOrFunc) {
        return this.reflectionCapabilities.annotations(typeOrFunc);
    }
    /**
     * @param {?} typeOrFunc
     * @return {?}
     */
    propMetadata(typeOrFunc) {
        return this.reflectionCapabilities.propMetadata(typeOrFunc);
    }
    /**
     * @param {?} type
     * @param {?} lcProperty
     * @return {?}
     */
    hasLifecycleHook(type, lcProperty) {
        return this.reflectionCapabilities.hasLifecycleHook(type, lcProperty);
    }
    /**
     * @param {?} name
     * @return {?}
     */
    getter(name) { return this.reflectionCapabilities.getter(name); }
    /**
     * @param {?} name
     * @return {?}
     */
    setter(name) { return this.reflectionCapabilities.setter(name); }
    /**
     * @param {?} name
     * @return {?}
     */
    method(name) { return this.reflectionCapabilities.method(name); }
    /**
     * @param {?} type
     * @return {?}
     */
    importUri(type) { return this.reflectionCapabilities.importUri(type); }
    /**
     * @param {?} type
     * @return {?}
     */
    resourceUri(type) { return this.reflectionCapabilities.resourceUri(type); }
    /**
     * @param {?} name
     * @param {?} moduleUrl
     * @param {?} members
     * @param {?} runtime
     * @return {?}
     */
    resolveIdentifier(name, moduleUrl, members, runtime) {
        return this.reflectionCapabilities.resolveIdentifier(name, moduleUrl, members, runtime);
    }
    /**
     * @param {?} identifier
     * @param {?} name
     * @return {?}
     */
    resolveEnum(identifier, name) {
        return this.reflectionCapabilities.resolveEnum(identifier, name);
    }
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * The {\@link Reflector} used internally in Angular to access metadata
 * about symbols.
 */
const reflector = new Reflector(new ReflectionCapabilities());

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
// tslint:disable:variable-name
/**
 * Inject decorator and metadata.
 *
 * \@stable
 * \@Annotation
 */
const Inject = makeParamDecorator('Inject', [['token', undefined]]);
/**
 * Optional decorator and metadata.
 *
 * \@stable
 * \@Annotation
 */
const Optional = makeParamDecorator('Optional', []);
/**
 * Injectable decorator and metadata.
 *
 * \@stable
 * \@Annotation
 */
const Injectable = makeDecorator('Injectable', []);
/**
 * Self decorator and metadata.
 *
 * \@stable
 * \@Annotation
 */
const Self = makeParamDecorator('Self', []);
/**
 * SkipSelf decorator and metadata.
 *
 * \@stable
 * \@Annotation
 */
const SkipSelf = makeParamDecorator('SkipSelf', []);
/**
 * Host decorator and metadata.
 *
 * \@stable
 * \@Annotation
 */
const Host = makeParamDecorator('Host', []);

class ComponentResolver {
    /**
     * @param {?=} _reflector
     */
    constructor(_reflector = reflector) {
        this._reflector = _reflector;
        this._resolved = new Map();
    }
    /**
     * Resolve the metadata of a Component.
     *
     * \@memberOf ComponentResolver
     * @param {?} type
     * @param {?=} throwIfNotFound
     * @return {?} component metadata
     */
    resolve(type, throwIfNotFound = true) {
        let /** @type {?} */ resolved = this._resolved.get(type);
        if (resolved) {
            return resolved;
        }
        const /** @type {?} */ metadata = ListWrapper.findLast(this._reflector.annotations(type), obj => obj instanceof Component);
        if (metadata) {
            const /** @type {?} */ propertyMetadata = this._reflector.propMetadata(type);
            return this._mergeWithPropertyMetadata(metadata, propertyMetadata, type);
        }
        else {
            if (throwIfNotFound) {
                throw new Error(`No Component metadata found for '${stringify(type)}'.`);
            }
            return null;
        }
    }
    /**
     * @param {?} meta
     * @param {?} propertyMetadata
     * @param {?} type
     * @return {?}
     */
    _mergeWithPropertyMetadata(meta, propertyMetadata, type) {
        const /** @type {?} */ host = {};
        const /** @type {?} */ childs = {};
        Object.keys(propertyMetadata).forEach((propName) => {
            const /** @type {?} */ hostListeners = propertyMetadata[propName]
                .filter(a => a && a instanceof HostListener);
            hostListeners.forEach(hostListener => {
                const /** @type {?} */ args = hostListener.args || [];
                host[`(${hostListener.eventName})`] = `${propName}(${args.join(',')})`;
            });
            const /** @type {?} */ childListeners = propertyMetadata[propName]
                .filter(a => a && a instanceof ChildListener);
            childListeners.forEach(childListener => {
                const /** @type {?} */ args = childListener.args || [];
                childs[`${childListener.selector};(${childListener.eventName})`] =
                    `${propName}(${args.join(',')})`;
            });
        });
        const /** @type {?} */ resolved = new Component({
            selector: meta.selector,
            host: meta.host ? StringMapWrapper.merge(meta.host, host) : host,
            childs: meta.childs ? StringMapWrapper.merge(meta.childs, childs) : childs,
            providers: meta.providers,
            components: meta.components
        });
        this._resolved.set(type, resolved);
        return resolved;
    }
}
ComponentResolver.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
ComponentResolver.ctorParameters = () => [
    { type: ReflectorReader, },
];

/**
 * Convenience to throw an Error with 'unimplemented' as the message.
 * @return {?}
 */

class BaseError extends Error {
    /**
     * @param {?} message
     */
    constructor(message) {
        super(message);
        // Errors don't use current this, instead they create a new instance.
        // We have to do forward all of our api to the nativeInstance.
        const nativeError = new Error(message);
        this._nativeError = nativeError;
    }
    /**
     * @return {?}
     */
    get message() { return this._nativeError.message; }
    /**
     * @param {?} message
     * @return {?}
     */
    set message(message) { this._nativeError.message = message; }
    /**
     * @return {?}
     */
    get name() { return this._nativeError.name; }
    /**
     * @return {?}
     */
    get stack() { return ((this._nativeError)).stack; }
    /**
     * @param {?} value
     * @return {?}
     */
    set stack(value) { ((this._nativeError)).stack = value; }
    /**
     * @return {?}
     */
    toString() { return this._nativeError.toString(); }
}
class WrappedError extends BaseError {
    /**
     * @param {?} message
     * @param {?} error
     */
    constructor(message, error) {
        super(`${message} caused by: ${error instanceof Error ? error.message : error}`);
        this.originalError = error;
    }
    /**
     * @return {?}
     */
    get stack() {
        return (((this.originalError instanceof Error ? this.originalError : this._nativeError)))
            .stack;
    }
}

class PlatformAlreadyExistsError extends BaseError {
    constructor() {
        super(`A platform already exists. Destroy it first before creating this one.`);
    }
}

const _THROW_IF_NOT_FOUND = new Object();
const THROW_IF_NOT_FOUND = _THROW_IF_NOT_FOUND;
class _NullInjector {
    /**
     * @param {?} token
     * @param {?=} notFoundValue
     * @return {?}
     */
    get(token, notFoundValue = _THROW_IF_NOT_FOUND) {
        if (notFoundValue === _THROW_IF_NOT_FOUND) {
            throw new Error(`No provider for ${stringify(token)}!`);
        }
        return notFoundValue;
    }
}
/**
 * \@whatItDoes Injector interface
 * \@howToUse
 * ```
 * const injector: Injector = ...;
 * injector.get(...);
 * ```
 *
 * \@description
 * For more details, see the {\@linkDocs guide/dependency-injection "Dependency Injection Guide"}.
 *
 * ### Example
 *
 * {\@example core/di/ts/injector_spec.ts region='Injector'}
 *
 * `Injector` returns itself when given `Injector` as a token:
 * {\@example core/di/ts/injector_spec.ts region='injectInjector'}
 *
 * \@stable
 * @abstract
 */
class Injector {
    /**
     * Retrieves an instance from the injector based on the provided token.
     * If not found:
     * - Throws {\@link NoProviderError} if no `notFoundValue` that is not equal to
     * Injector.THROW_IF_NOT_FOUND is given
     * - Returns the `notFoundValue` otherwise
     * @abstract
     * @template T
     * @param {?} token
     * @param {?=} notFoundValue
     * @return {?}
     */
    get(token, notFoundValue) { }
    /**
     * @deprecated from v4.0.0 use Type<T> or InjectToken<T>
     * @suppress {duplicate}
     * @abstract
     * @param {?} token
     * @param {?=} notFoundValue
     * @return {?}
     */
    get(token, notFoundValue) { }
}
Injector.THROW_IF_NOT_FOUND = _THROW_IF_NOT_FOUND;
Injector.NULL = new _NullInjector();

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @param {?} keys
 * @return {?}
 */
function findFirstClosedCycle(keys) {
    const /** @type {?} */ res = [];
    for (let /** @type {?} */ i = 0; i < keys.length; ++i) {
        if (res.indexOf(keys[i]) > -1) {
            res.push(keys[i]);
            return res;
        }
        res.push(keys[i]);
    }
    return res;
}
/**
 * @param {?} keys
 * @return {?}
 */
function constructResolvingPath(keys) {
    if (keys.length > 1) {
        const /** @type {?} */ reversed = findFirstClosedCycle(keys.slice().reverse());
        const /** @type {?} */ tokenStrs = reversed.map(k => stringify(k.token));
        return ' (' + tokenStrs.join(' -> ') + ')';
    }
    return '';
}
/**
 * Base class for all errors arising from misconfigured providers.
 * \@stable
 */
class AbstractProviderError extends BaseError {
    /**
     * @param {?} injector
     * @param {?} key
     * @param {?} constructResolvingMessage
     */
    constructor(injector, key, constructResolvingMessage) {
        super('DI Error');
        this.keys = [key];
        this.injectors = [injector];
        this.constructResolvingMessage = constructResolvingMessage;
        this.message = this.constructResolvingMessage(this.keys);
    }
    /**
     * @param {?} injector
     * @param {?} key
     * @return {?}
     */
    addKey(injector, key) {
        this.injectors.push(injector);
        this.keys.push(key);
        this.message = this.constructResolvingMessage(this.keys);
    }
}
/**
 * Thrown when trying to retrieve a dependency by key from {\@link Injector}, but the
 * {\@link Injector} does not have a {\@link Provider} for the given key.
 *
 * ### Example ([live demo](http://plnkr.co/edit/vq8D3FRB9aGbnWJqtEPE?p=preview))
 *
 * ```typescript
 * class A {
 *   constructor(b:B) {}
 * }
 *
 * expect(() => Injector.resolveAndCreate([A])).toThrowError();
 * ```
 * \@stable
 */
class NoProviderError extends AbstractProviderError {
    /**
     * @param {?} injector
     * @param {?} key
     */
    constructor(injector, key) {
        super(injector, key, function (keys) {
            const first = stringify(keys[0].token);
            return `No provider for ${first}!${constructResolvingPath(keys)}`;
        });
    }
}
/**
 * Thrown when dependencies form a cycle.
 *
 * ### Example ([live demo](http://plnkr.co/edit/wYQdNos0Tzql3ei1EV9j?p=info))
 *
 * ```typescript
 * var injector = Injector.resolveAndCreate([
 *   {provide: "one", useFactory: (two) => "two", deps: [[new Inject("two")]]},
 *   {provide: "two", useFactory: (one) => "one", deps: [[new Inject("one")]]}
 * ]);
 *
 * expect(() => injector.get("one")).toThrowError();
 * ```
 *
 * Retrieving `A` or `B` throws a `CyclicDependencyError` as the graph above cannot be constructed.
 * \@stable
 */
class CyclicDependencyError extends AbstractProviderError {
    /**
     * @param {?} injector
     * @param {?} key
     */
    constructor(injector, key) {
        super(injector, key, function (keys) {
            return `Cannot instantiate cyclic dependency!${constructResolvingPath(keys)}`;
        });
    }
}
/**
 * Thrown when a constructing type returns with an Error.
 *
 * The `InstantiationError` class contains the original error plus the dependency graph which caused
 * this object to be instantiated.
 *
 * ### Example ([live demo](http://plnkr.co/edit/7aWYdcqTQsP0eNqEdUAf?p=preview))
 *
 * ```typescript
 * class A {
 *   constructor() {
 *     throw new Error('message');
 *   }
 * }
 *
 * var injector = Injector.resolveAndCreate([A]);
 * try {
 *   injector.get(A);
 * } catch (e) {
 *   expect(e instanceof InstantiationError).toBe(true);
 *   expect(e.originalException.message).toEqual("message");
 *   expect(e.originalStack).toBeDefined();
 * }
 * ```
 * \@stable
 */
class InstantiationError extends WrappedError {
    /**
     * @param {?} injector
     * @param {?} originalException
     * @param {?} originalStack
     * @param {?} key
     */
    constructor(injector, originalException, originalStack, key) {
        super('DI Error', originalException);
        this.keys = [key];
        this.injectors = [injector];
    }
    /**
     * @param {?} injector
     * @param {?} key
     * @return {?}
     */
    addKey(injector, key) {
        this.injectors.push(injector);
        this.keys.push(key);
    }
    /**
     * @return {?}
     */
    get message() {
        const /** @type {?} */ first = stringify(this.keys[0].token);
        return `${this.originalError.message}: Error during instantiation ` +
            `of ${first}!${constructResolvingPath(this.keys)}.`;
    }
    /**
     * @return {?}
     */
    get causeKey() { return this.keys[0]; }
}
/**
 * Thrown when an object other then {\@link Provider} (or `Type`) is passed to {\@link Injector}
 * creation.
 *
 * ### Example ([live demo](http://plnkr.co/edit/YatCFbPAMCL0JSSQ4mvH?p=preview))
 *
 * ```typescript
 * expect(() => Injector.resolveAndCreate(["not a type"])).toThrowError();
 * ```
 * \@stable
 */
class InvalidProviderError extends BaseError {
    /**
     * @param {?} provider
     */
    constructor(provider) {
        super(`Invalid provider - only instances of Provider and Type are allowed, got: ${provider}`);
    }
}
/**
 * Thrown when the class has no annotation information.
 *
 * Lack of annotation information prevents the {\@link Injector} from determining which dependencies
 * need to be injected into the constructor.
 *
 * ### Example ([live demo](http://plnkr.co/edit/rHnZtlNS7vJOPQ6pcVkm?p=preview))
 *
 * ```typescript
 * class A {
 *   constructor(b) {}
 * }
 *
 * expect(() => Injector.resolveAndCreate([A])).toThrowError();
 * ```
 *
 * This error is also thrown when the class not marked with {\@link Injectable} has parameter types.
 *
 * ```typescript
 * class B {}
 *
 * class A {
 *   constructor(b:B) {} // no information about the parameter types of A is available at runtime.
 * }
 *
 * expect(() => Injector.resolveAndCreate([A,B])).toThrowError();
 * ```
 * \@stable
 */
class NoAnnotationError extends BaseError {
    /**
     * @param {?} typeOrFunc
     * @param {?} params
     */
    constructor(typeOrFunc, params) {
        super(NoAnnotationError._genMessage(typeOrFunc, params));
    }
    /**
     * @param {?} typeOrFunc
     * @param {?} params
     * @return {?}
     */
    static _genMessage(typeOrFunc, params) {
        const /** @type {?} */ signature = [];
        for (let /** @type {?} */ i = 0, /** @type {?} */ ii = params.length; i < ii; i++) {
            const /** @type {?} */ parameter = params[i];
            if (!parameter || parameter.length == 0) {
                signature.push('?');
            }
            else {
                signature.push(parameter.map(stringify).join(' '));
            }
        }
        return 'Cannot resolve all parameters for \'' + stringify(typeOrFunc) + '\'(' +
            signature.join(', ') + '). ' +
            'Make sure that all the parameters are decorated with Inject or have valid type ' +
            'annotations and that \'' + stringify(typeOrFunc) + '\' is decorated with Injectable.';
    }
}
/**
 * Thrown when getting an object by index.
 *
 * ### Example ([live demo](http://plnkr.co/edit/bRs0SX2OTQiJzqvjgl8P?p=preview))
 *
 * ```typescript
 * class A {}
 *
 * var injector = Injector.resolveAndCreate([A]);
 *
 * expect(() => injector.getAt(100)).toThrowError();
 * ```
 * \@stable
 */
class OutOfBoundsError extends BaseError {
    /**
     * @param {?} index
     */
    constructor(index) { super(`Index ${index} is out-of-bounds.`); }
}
/**
 * Thrown when a multi provider and a regular provider are bound to the same token.
 *
 * ### Example
 *
 * ```typescript
 * expect(() => Injector.resolveAndCreate([
 *   { provide: "Strings", useValue: "string1", multi: true},
 *   { provide: "Strings", useValue: "string2", multi: false}
 * ])).toThrowError();
 * ```
 */
class MixingMultiProvidersWithRegularProvidersError extends BaseError {
    /**
     * @param {?} provider1
     * @param {?} provider2
     */
    constructor(provider1, provider2) {
        super('Cannot mix multi providers and regular providers, got: ' + provider1.toString() + ' ' +
            provider2.toString());
    }
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Allows to refer to references which are not yet defined.
 *
 * For instance, `forwardRef` is used when the `token` which we need to refer to for the purposes of
 * DI is declared,
 * but not yet defined. It is also used when the `token` which we use when creating a query is not
 * yet defined.
 *
 * ### Example
 * {\@example core/di/ts/forward_ref/forward_ref_spec.ts region='forward_ref'}
 * \@experimental
 * @param {?} forwardRefFn
 * @return {?}
 */
function forwardRef(forwardRefFn) {
    ((forwardRefFn)).__forward_ref__ = forwardRef;
    ((forwardRefFn)).toString = function () { return stringify(this()); };
    return (((forwardRefFn)));
}
/**
 * Lazily retrieves the reference value from a forwardRef.
 *
 * Acts as the identity function when given a non-forward-ref value.
 *
 * ### Example ([live demo](http://plnkr.co/edit/GU72mJrk1fiodChcmiDR?p=preview))
 *
 * {\@example core/di/ts/forward_ref/forward_ref_spec.ts region='resolve_forward_ref'}
 *
 * See: {\@link forwardRef}
 * \@experimental
 * @param {?} type
 * @return {?}
 */
function resolveForwardRef(type) {
    if (typeof type === 'function' && type.hasOwnProperty('__forward_ref__') &&
        type.__forward_ref__ === forwardRef) {
        return ((type))();
    }
    else {
        return type;
    }
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * A unique object used for retrieving items from the {\@link ReflectiveInjector}.
 *
 * Keys have:
 * - a system-wide unique `id`.
 * - a `token`.
 *
 * `Key` is used internally by {\@link ReflectiveInjector} because its system-wide unique `id` allows
 * the
 * injector to store created objects in a more efficient way.
 *
 * `Key` should not be created directly. {\@link ReflectiveInjector} creates keys automatically when
 * resolving
 * providers.
 * \@experimental
 */
class ReflectiveKey {
    /**
     * Private
     * @param {?} token
     * @param {?} id
     */
    constructor(token, id) {
        this.token = token;
        this.id = id;
        if (!token) {
            throw new Error('Token must be defined!');
        }
    }
    /**
     * Returns a stringified token.
     * @return {?}
     */
    get displayName() { return stringify(this.token); }
    /**
     * Retrieves a `Key` for a token.
     * @param {?} token
     * @return {?}
     */
    static get(token) {
        return _globalKeyRegistry.get(resolveForwardRef(token));
    }
    /**
     * @return {?} the number of keys registered in the system.
     */
    static get numberOfKeys() { return _globalKeyRegistry.numberOfKeys; }
}
/**
 * \@internal
 */
class KeyRegistry {
    constructor() {
        this._allKeys = new Map();
    }
    /**
     * @param {?} token
     * @return {?}
     */
    get(token) {
        if (token instanceof ReflectiveKey)
            return token;
        if (this._allKeys.has(token)) {
            return this._allKeys.get(token);
        }
        const /** @type {?} */ newKey = new ReflectiveKey(token, ReflectiveKey.numberOfKeys);
        this._allKeys.set(token, newKey);
        return newKey;
    }
    /**
     * @return {?}
     */
    get numberOfKeys() { return this._allKeys.size; }
}
const _globalKeyRegistry = new KeyRegistry();

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * `Dependency` is used by the framework to extend DI.
 * This is internal and should not be used directly.
 */
class ReflectiveDependency {
    /**
     * @param {?} key
     * @param {?} optional
     * @param {?} visibility
     */
    constructor(key, optional, visibility) {
        this.key = key;
        this.optional = optional;
        this.visibility = visibility;
    }
    /**
     * @param {?} key
     * @return {?}
     */
    static fromKey(key) {
        return new ReflectiveDependency(key, false, null);
    }
}
const _EMPTY_LIST = [];
class ResolvedReflectiveProvider_ {
    /**
     * @param {?} key
     * @param {?} resolvedFactories
     * @param {?} multiProvider
     */
    constructor(key, resolvedFactories, multiProvider) {
        this.key = key;
        this.resolvedFactories = resolvedFactories;
        this.multiProvider = multiProvider;
    }
    /**
     * @return {?}
     */
    get resolvedFactory() { return this.resolvedFactories[0]; }
}
/**
 * An internal resolved representation of a factory function created by resolving {\@link
 * Provider}.
 * \@experimental
 */
class ResolvedReflectiveFactory {
    /**
     * @param {?} factory
     * @param {?} dependencies
     */
    constructor(factory, dependencies) {
        this.factory = factory;
        this.dependencies = dependencies;
    }
}
/**
 * Resolve a single provider.
 * @param {?} provider
 * @return {?}
 */
function resolveReflectiveFactory(provider) {
    let /** @type {?} */ factoryFn;
    let /** @type {?} */ resolvedDeps;
    if (provider.useClass) {
        const /** @type {?} */ useClass = resolveForwardRef(provider.useClass);
        factoryFn = reflector.factory(useClass);
        resolvedDeps = _dependenciesFor(useClass);
    }
    else if (provider.useExisting) {
        factoryFn = (aliasInstance) => aliasInstance;
        resolvedDeps = [ReflectiveDependency.fromKey(ReflectiveKey.get(provider.useExisting))];
    }
    else if (provider.useFactory) {
        factoryFn = provider.useFactory;
        resolvedDeps = constructDependencies(provider.useFactory, provider.deps);
    }
    else {
        factoryFn = () => provider.useValue;
        resolvedDeps = _EMPTY_LIST;
    }
    return new ResolvedReflectiveFactory(factoryFn, resolvedDeps);
}
/**
 * Converts the {\@link Provider} into {\@link ResolvedProvider}.
 *
 * {\@link Injector} internally only uses {\@link ResolvedProvider}, {\@link Provider} contains
 * convenience provider syntax.
 * @param {?} provider
 * @return {?}
 */
function resolveReflectiveProvider(provider) {
    return new ResolvedReflectiveProvider_(ReflectiveKey.get(provider.provide), [resolveReflectiveFactory(provider)], provider.multi);
}
/**
 * Resolve a list of Providers.
 * @param {?} providers
 * @return {?}
 */
function resolveReflectiveProviders(providers) {
    const /** @type {?} */ normalized = _normalizeProviders(providers, []);
    const /** @type {?} */ resolved = normalized.map(resolveReflectiveProvider);
    const /** @type {?} */ resolvedProviderMap = mergeResolvedReflectiveProviders(resolved, new Map());
    return Array.from(resolvedProviderMap.values());
}
/**
 * Merges a list of ResolvedProviders into a list where
 * each key is contained exactly once and multi providers
 * have been merged.
 * @param {?} providers
 * @param {?} normalizedProvidersMap
 * @return {?}
 */
function mergeResolvedReflectiveProviders(providers, normalizedProvidersMap) {
    for (let /** @type {?} */ i = 0; i < providers.length; i++) {
        const /** @type {?} */ provider = providers[i];
        const /** @type {?} */ existing = normalizedProvidersMap.get(provider.key.id);
        if (existing) {
            if (provider.multiProvider !== existing.multiProvider) {
                throw new MixingMultiProvidersWithRegularProvidersError(existing, provider);
            }
            if (provider.multiProvider) {
                for (let /** @type {?} */ j = 0; j < provider.resolvedFactories.length; j++) {
                    existing.resolvedFactories.push(provider.resolvedFactories[j]);
                }
            }
            else {
                normalizedProvidersMap.set(provider.key.id, provider);
            }
        }
        else {
            let /** @type {?} */ resolvedProvider;
            if (provider.multiProvider) {
                resolvedProvider = new ResolvedReflectiveProvider_(provider.key, provider.resolvedFactories.slice(), provider.multiProvider);
            }
            else {
                resolvedProvider = provider;
            }
            normalizedProvidersMap.set(provider.key.id, resolvedProvider);
        }
    }
    return normalizedProvidersMap;
}
/**
 * @param {?} providers
 * @param {?} res
 * @return {?}
 */
function _normalizeProviders(providers, res) {
    providers.forEach(b => {
        if (b instanceof Function) {
            res.push({ provide: b, useClass: b });
        }
        else if (b && typeof b == 'object' && ((b)).provide !== undefined) {
            res.push(/** @type {?} */ (b));
        }
        else if (b instanceof Array) {
            _normalizeProviders(b, res);
        }
        else {
            throw new InvalidProviderError(b);
        }
    });
    return res;
}
/**
 * @param {?} typeOrFunc
 * @param {?} dependencies
 * @return {?}
 */
function constructDependencies(typeOrFunc, dependencies) {
    if (!dependencies) {
        return _dependenciesFor(typeOrFunc);
    }
    else {
        const /** @type {?} */ params = dependencies.map(t => [t]);
        return dependencies.map(t => _extractToken(typeOrFunc, t, params));
    }
}
/**
 * @param {?} typeOrFunc
 * @return {?}
 */
function _dependenciesFor(typeOrFunc) {
    const /** @type {?} */ params = reflector.parameters(typeOrFunc);
    if (!params)
        return [];
    if (params.some(p => p == null)) {
        throw new NoAnnotationError(typeOrFunc, params);
    }
    return params.map(p => _extractToken(typeOrFunc, p, params));
}
/**
 * @param {?} typeOrFunc
 * @param {?} metadata
 * @param {?} params
 * @return {?}
 */
function _extractToken(typeOrFunc, metadata, params) {
    let /** @type {?} */ token = null;
    let /** @type {?} */ optional = false;
    if (!Array.isArray(metadata)) {
        if (metadata instanceof Inject) {
            return _createDependency(metadata.token, optional, null);
        }
        else {
            return _createDependency(metadata, optional, null);
        }
    }
    let /** @type {?} */ visibility = null;
    for (let /** @type {?} */ i = 0; i < metadata.length; ++i) {
        const /** @type {?} */ paramMetadata = metadata[i];
        if (paramMetadata instanceof Function) {
            token = paramMetadata;
        }
        else if (paramMetadata instanceof Inject) {
            token = paramMetadata.token;
        }
        else if (paramMetadata instanceof Optional) {
            optional = true;
        }
        else if (paramMetadata instanceof Self || paramMetadata instanceof SkipSelf) {
            visibility = paramMetadata;
        }
    }
    token = resolveForwardRef(token);
    if (token != null) {
        return _createDependency(token, optional, visibility);
    }
    else {
        throw new NoAnnotationError(typeOrFunc, params);
    }
}
/**
 * @param {?} token
 * @param {?} optional
 * @param {?} visibility
 * @return {?}
 */
function _createDependency(token, optional, visibility) {
    return new ReflectiveDependency(ReflectiveKey.get(token), optional, visibility);
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
// tslint:disable:variable-name class-name
// Threshold for the dynamic version
const UNDEFINED = new Object();
/**
 * A ReflectiveDependency injection container used for instantiating objects and resolving
 * dependencies.
 *
 * An `Injector` is a replacement for a `new` operator, which can automatically resolve the
 * constructor dependencies.
 *
 * In typical use, application code asks for the dependencies in the constructor and they are
 * resolved by the `Injector`.
 *
 * ### Example ([live demo](http://plnkr.co/edit/jzjec0?p=preview))
 *
 * The following example creates an `Injector` configured to create `Engine` and `Car`.
 *
 * ```typescript
 * \@Injectable()
 * class Engine {
 * }
 *
 * \@Injectable()
 * class Car {
 *   constructor(public engine:Engine) {}
 * }
 *
 * var injector = ReflectiveInjector.resolveAndCreate([Car, Engine]);
 * var car = injector.get(Car);
 * expect(car instanceof Car).toBe(true);
 * expect(car.engine instanceof Engine).toBe(true);
 * ```
 *
 * Notice, we don't use the `new` operator because we explicitly want to have the `Injector`
 * resolve all of the object's dependencies automatically.
 *
 * \@stable
 * @abstract
 */
class ReflectiveInjector {
    /**
     * Turns an array of provider definitions into an array of resolved providers.
     *
     * A resolution is a process of flattening multiple nested arrays and converting individual
     * providers into an array of {\@link ResolvedReflectiveProvider}s.
     *
     * ### Example ([live demo](http://plnkr.co/edit/AiXTHi?p=preview))
     *
     * ```typescript
     * \@Injectable()
     * class Engine {
     * }
     *
     * \@Injectable()
     * class Car {
     *   constructor(public engine:Engine) {}
     * }
     *
     * var providers = ReflectiveInjector.resolve([Car, [[Engine]]]);
     *
     * expect(providers.length).toEqual(2);
     *
     * expect(providers[0] instanceof ResolvedReflectiveProvider).toBe(true);
     * expect(providers[0].key.displayName).toBe("Car");
     * expect(providers[0].dependencies.length).toEqual(1);
     * expect(providers[0].factory).toBeDefined();
     *
     * expect(providers[1].key.displayName).toBe("Engine");
     * });
     * ```
     *
     * See {\@link ReflectiveInjector#fromResolvedProviders} for more info.
     * @param {?} providers
     * @return {?}
     */
    static resolve(providers) {
        return resolveReflectiveProviders(providers);
    }
    /**
     * Resolves an array of providers and creates an injector from those providers.
     *
     * The passed-in providers can be an array of `Type`, {\@link Provider},
     * or a recursive array of more providers.
     *
     * ### Example ([live demo](http://plnkr.co/edit/ePOccA?p=preview))
     *
     * ```typescript
     * \@Injectable()
     * class Engine {
     * }
     *
     * \@Injectable()
     * class Car {
     *   constructor(public engine:Engine) {}
     * }
     *
     * var injector = ReflectiveInjector.resolveAndCreate([Car, Engine]);
     * expect(injector.get(Car) instanceof Car).toBe(true);
     * ```
     *
     * This function is slower than the corresponding `fromResolvedProviders`
     * because it needs to resolve the passed-in providers first.
     * See {\@link Injector#resolve} and {\@link Injector#fromResolvedProviders}.
     * @param {?} providers
     * @param {?=} parent
     * @return {?}
     */
    static resolveAndCreate(providers, parent = null) {
        const /** @type {?} */ ResolvedReflectiveProviders = ReflectiveInjector.resolve(providers);
        return ReflectiveInjector.fromResolvedProviders(ResolvedReflectiveProviders, parent);
    }
    /**
     * Creates an injector from previously resolved providers.
     *
     * This API is the recommended way to construct injectors in performance-sensitive parts.
     *
     * ### Example ([live demo](http://plnkr.co/edit/KrSMci?p=preview))
     *
     * ```typescript
     * \@Injectable()
     * class Engine {
     * }
     *
     * \@Injectable()
     * class Car {
     *   constructor(public engine:Engine) {}
     * }
     *
     * var providers = ReflectiveInjector.resolve([Car, Engine]);
     * var injector = ReflectiveInjector.fromResolvedProviders(providers);
     * expect(injector.get(Car) instanceof Car).toBe(true);
     * ```
     * \@experimental
     * @param {?} providers
     * @param {?=} parent
     * @return {?}
     */
    static fromResolvedProviders(providers, parent = null) {
        return new ReflectiveInjector_(providers, parent);
    }
    /**
     * Parent of this injector.
     *
     * <!-- TODO: Add a link to the section of the user guide talking about hierarchical injection.
     * -->
     *
     * ### Example ([live demo](http://plnkr.co/edit/eosMGo?p=preview))
     *
     * ```typescript
     * var parent = ReflectiveInjector.resolveAndCreate([]);
     * var child = parent.resolveAndCreateChild([]);
     * expect(child.parent).toBe(parent);
     * ```
     * @abstract
     * @return {?}
     */
    parent() { }
    /**
     * Resolves an array of providers and creates a child injector from those providers.
     *
     * <!-- TODO: Add a link to the section of the user guide talking about hierarchical injection.
     * -->
     *
     * The passed-in providers can be an array of `Type`, {\@link Provider},
     * or a recursive array of more providers.
     *
     * ### Example ([live demo](http://plnkr.co/edit/opB3T4?p=preview))
     *
     * ```typescript
     * class ParentProvider {}
     * class ChildProvider {}
     *
     * var parent = ReflectiveInjector.resolveAndCreate([ParentProvider]);
     * var child = parent.resolveAndCreateChild([ChildProvider]);
     *
     * expect(child.get(ParentProvider) instanceof ParentProvider).toBe(true);
     * expect(child.get(ChildProvider) instanceof ChildProvider).toBe(true);
     * expect(child.get(ParentProvider)).toBe(parent.get(ParentProvider));
     * ```
     *
     * This function is slower than the corresponding `createChildFromResolved`
     * because it needs to resolve the passed-in providers first.
     * See {\@link Injector#resolve} and {\@link Injector#createChildFromResolved}.
     * @abstract
     * @param {?} providers
     * @return {?}
     */
    resolveAndCreateChild(providers) { }
    /**
     * Creates a child injector from previously resolved providers.
     *
     * <!-- TODO: Add a link to the section of the user guide talking about hierarchical injection.
     * -->
     *
     * This API is the recommended way to construct injectors in performance-sensitive parts.
     *
     * ### Example ([live demo](http://plnkr.co/edit/VhyfjN?p=preview))
     *
     * ```typescript
     * class ParentProvider {}
     * class ChildProvider {}
     *
     * var parentProviders = ReflectiveInjector.resolve([ParentProvider]);
     * var childProviders = ReflectiveInjector.resolve([ChildProvider]);
     *
     * var parent = ReflectiveInjector.fromResolvedProviders(parentProviders);
     * var child = parent.createChildFromResolved(childProviders);
     *
     * expect(child.get(ParentProvider) instanceof ParentProvider).toBe(true);
     * expect(child.get(ChildProvider) instanceof ChildProvider).toBe(true);
     * expect(child.get(ParentProvider)).toBe(parent.get(ParentProvider));
     * ```
     * @abstract
     * @param {?} providers
     * @return {?}
     */
    createChildFromResolved(providers) { }
    /**
     * Resolves a provider and instantiates an object in the context of the injector.
     *
     * The created object does not get cached by the injector.
     *
     * ### Example ([live demo](http://plnkr.co/edit/yvVXoB?p=preview))
     *
     * ```typescript
     * \@Injectable()
     * class Engine {
     * }
     *
     * \@Injectable()
     * class Car {
     *   constructor(public engine:Engine) {}
     * }
     *
     * var injector = ReflectiveInjector.resolveAndCreate([Engine]);
     *
     * var car = injector.resolveAndInstantiate(Car);
     * expect(car.engine).toBe(injector.get(Engine));
     * expect(car).not.toBe(injector.resolveAndInstantiate(Car));
     * ```
     * @abstract
     * @param {?} provider
     * @return {?}
     */
    resolveAndInstantiate(provider) { }
    /**
     * Instantiates an object using a resolved provider in the context of the injector.
     *
     * The created object does not get cached by the injector.
     *
     * ### Example ([live demo](http://plnkr.co/edit/ptCImQ?p=preview))
     *
     * ```typescript
     * \@Injectable()
     * class Engine {
     * }
     *
     * \@Injectable()
     * class Car {
     *   constructor(public engine:Engine) {}
     * }
     *
     * var injector = ReflectiveInjector.resolveAndCreate([Engine]);
     * var carProvider = ReflectiveInjector.resolve([Car])[0];
     * var car = injector.instantiateResolved(carProvider);
     * expect(car.engine).toBe(injector.get(Engine));
     * expect(car).not.toBe(injector.instantiateResolved(carProvider));
     * ```
     * @abstract
     * @param {?} provider
     * @return {?}
     */
    instantiateResolved(provider) { }
    /**
     * @abstract
     * @param {?} token
     * @param {?=} notFoundValue
     * @return {?}
     */
    get(token, notFoundValue) { }
}
class ReflectiveInjector_ {
    /**
     * Private
     * @param {?} _providers
     * @param {?=} _parent
     */
    constructor(_providers, _parent = null) {
        /**
         * \@internal
         */
        this._constructionCounter = 0;
        this._providers = _providers;
        this._parent = _parent;
        const len = _providers.length;
        this.keyIds = new Array(len);
        this.objs = new Array(len);
        for (let i = 0; i < len; i++) {
            this.keyIds[i] = _providers[i].key.id;
            this.objs[i] = UNDEFINED;
        }
    }
    /**
     * @param {?} token
     * @param {?=} notFoundValue
     * @return {?}
     */
    get(token, notFoundValue = THROW_IF_NOT_FOUND) {
        return this._getByKey(ReflectiveKey.get(token), null, notFoundValue);
    }
    /**
     * @return {?}
     */
    get parent() { return this._parent; }
    /**
     * @param {?} providers
     * @return {?}
     */
    resolveAndCreateChild(providers) {
        const /** @type {?} */ ResolvedReflectiveProviders = ReflectiveInjector.resolve(providers);
        return this.createChildFromResolved(ResolvedReflectiveProviders);
    }
    /**
     * @param {?} providers
     * @return {?}
     */
    createChildFromResolved(providers) {
        const /** @type {?} */ inj = new ReflectiveInjector_(providers);
        inj._parent = this;
        return inj;
    }
    /**
     * @param {?} provider
     * @return {?}
     */
    resolveAndInstantiate(provider) {
        return this.instantiateResolved(ReflectiveInjector.resolve([provider])[0]);
    }
    /**
     * @param {?} provider
     * @return {?}
     */
    instantiateResolved(provider) {
        return this._instantiateProvider(provider);
    }
    /**
     * @param {?} index
     * @return {?}
     */
    getProviderAtIndex(index) {
        if (index < 0 || index >= this._providers.length) {
            throw new OutOfBoundsError(index);
        }
        return this._providers[index];
    }
    /**
     * \@internal
     * @param {?} provider
     * @return {?}
     */
    _new(provider) {
        if (this._constructionCounter++ > this._getMaxNumberOfObjects()) {
            throw new CyclicDependencyError(this, provider.key);
        }
        return this._instantiateProvider(provider);
    }
    /**
     * @return {?}
     */
    _getMaxNumberOfObjects() { return this.objs.length; }
    /**
     * @param {?} provider
     * @return {?}
     */
    _instantiateProvider(provider) {
        if (provider.multiProvider) {
            const /** @type {?} */ res = new Array(provider.resolvedFactories.length);
            for (let /** @type {?} */ i = 0; i < provider.resolvedFactories.length; ++i) {
                res[i] = this._instantiate(provider, provider.resolvedFactories[i]);
            }
            return res;
        }
        else {
            return this._instantiate(provider, provider.resolvedFactories[0]);
        }
    }
    /**
     * @param {?} provider
     * @param {?} ResolvedReflectiveFactory
     * @return {?}
     */
    _instantiate(provider, ResolvedReflectiveFactory$$1) {
        const /** @type {?} */ factory = ResolvedReflectiveFactory$$1.factory;
        let /** @type {?} */ deps;
        try {
            deps =
                ResolvedReflectiveFactory$$1.dependencies.map(dep => this._getByReflectiveDependency(dep));
        }
        catch (e) {
            if (e instanceof AbstractProviderError || e instanceof InstantiationError) {
                e.addKey(this, provider.key);
            }
            throw e;
        }
        let /** @type {?} */ obj;
        try {
            obj = factory(...deps);
        }
        catch (e) {
            throw new InstantiationError(this, e, e.stack, provider.key);
        }
        return obj;
    }
    /**
     * @param {?} dep
     * @return {?}
     */
    _getByReflectiveDependency(dep) {
        return this._getByKey(dep.key, dep.visibility, dep.optional ? null : THROW_IF_NOT_FOUND);
    }
    /**
     * @param {?} key
     * @param {?} visibility
     * @param {?} notFoundValue
     * @return {?}
     */
    _getByKey(key, visibility, notFoundValue) {
        if (key === INJECTOR_KEY) {
            return this;
        }
        if (visibility instanceof Self) {
            return this._getByKeySelf(key, notFoundValue);
        }
        else {
            return this._getByKeyDefault(key, notFoundValue, visibility);
        }
    }
    /**
     * @param {?} keyId
     * @return {?}
     */
    _getObjByKeyId(keyId) {
        for (let /** @type {?} */ i = 0; i < this.keyIds.length; i++) {
            if (this.keyIds[i] === keyId) {
                if (this.objs[i] === UNDEFINED) {
                    this.objs[i] = this._new(this._providers[i]);
                }
                return this.objs[i];
            }
        }
        return UNDEFINED;
    }
    /**
     * \@internal
     * @param {?} key
     * @param {?} notFoundValue
     * @return {?}
     */
    _throwOrNull(key, notFoundValue) {
        if (notFoundValue !== THROW_IF_NOT_FOUND) {
            return notFoundValue;
        }
        else {
            throw new NoProviderError(this, key);
        }
    }
    /**
     * \@internal
     * @param {?} key
     * @param {?} notFoundValue
     * @return {?}
     */
    _getByKeySelf(key, notFoundValue) {
        const /** @type {?} */ obj = this._getObjByKeyId(key.id);
        return (obj !== UNDEFINED) ? obj : this._throwOrNull(key, notFoundValue);
    }
    /**
     * \@internal
     * @param {?} key
     * @param {?} notFoundValue
     * @param {?} visibility
     * @return {?}
     */
    _getByKeyDefault(key, notFoundValue, visibility) {
        let /** @type {?} */ inj;
        if (visibility instanceof SkipSelf) {
            inj = this._parent;
        }
        else {
            inj = this;
        }
        while (inj instanceof ReflectiveInjector_) {
            const /** @type {?} */ inj_ = (inj);
            const /** @type {?} */ obj = inj_._getObjByKeyId(key.id);
            if (obj !== UNDEFINED)
                return obj;
            inj = inj_._parent;
        }
        if (inj !== null) {
            return inj.get(key.token, notFoundValue);
        }
        else {
            return this._throwOrNull(key, notFoundValue);
        }
    }
    /**
     * @return {?}
     */
    get displayName() {
        const /** @type {?} */ providers = _mapProviders(this, (b) => ' "' + b.key.displayName + '" ')
            .join(', ');
        return `ReflectiveInjector(providers: [${providers}])`;
    }
    /**
     * @return {?}
     */
    toString() { return this.displayName; }
}
const INJECTOR_KEY = ReflectiveKey.get(Injector);
/**
 * @param {?} injector
 * @param {?} fn
 * @return {?}
 */
function _mapProviders(injector, fn) {
    const /** @type {?} */ res = new Array(injector._providers.length);
    for (let /** @type {?} */ i = 0; i < injector._providers.length; ++i) {
        res[i] = fn(injector.getProviderAtIndex(i));
    }
    return res;
}

let _platform;
/**
 * @abstract
 */
class PlatformRef {
    /**
     * @abstract
     * @template C
     * @param {?} component
     * @return {?}
     */
    bootstrapComponent(component) { }
    /**
     * @abstract
     * @return {?}
     */
    injector() { }
    /**
     * @abstract
     * @param {?} callback
     * @return {?}
     */
    onDestroy(callback) { }
    /**
     * @abstract
     * @return {?}
     */
    destroy() { }
    /**
     * @abstract
     * @return {?}
     */
    destroyed() { }
}
/**
 * @return {?}
 */
function getPlatform() {
    return _platform && !_platform.destroyed ? _platform : null;
}
/**
 * @param {?=} providers
 * @return {?}
 */
function createPlatformFactory(providers = []) {
    return (extraProviders = []) => {
        if (getPlatform()) {
            throw new PlatformAlreadyExistsError();
        }
        const /** @type {?} */ injector = ReflectiveInjector.resolveAndCreate(providers.concat(extraProviders));
        _platform = injector.get(PlatformRef);
        return _platform;
    };
}

class ComponentFactoryResolver {
    /**
     * @param {?} factories
     * @param {?=} _parent
     */
    constructor(factories, _parent) {
        this._parent = _parent;
        this._factories = new Map();
        for (let i = 0; i < factories.length; i++) {
            const factory = factories[i];
            this._factories.set(factory.componentType, factory);
        }
    }
    /**
     * @template C
     * @param {?} componentType
     * @return {?}
     */
    resolveComponentFactory(componentType) {
        let /** @type {?} */ result = this._factories.get(componentType);
        if (!result) {
            if (!this._parent) {
                throw new CouldNotResolveFactoryError(componentType);
            }
            result = this._parent.resolveComponentFactory(componentType);
        }
        return result;
    }
}
class CouldNotResolveFactoryError extends BaseError {
    /**
     * @param {?} type
     */
    constructor(type) {
        super(`Could not resolve factory for "${stringify(type)}! ` +
            `Did you provide the component to the bootstrap function?`);
    }
}

/**
 * @abstract
 */
class ComponentFactory {
    /**
     * @abstract
     * @return {?}
     */
    selector() { }
    /**
     * @abstract
     * @return {?}
     */
    componentType() { }
    /**
     * Creates a new component.
     * @abstract
     * @param {?} injector
     * @param {?=} rootSelectorOrNode
     * @return {?}
     */
    create(injector, rootSelectorOrNode) { }
}

/**
 * This is a reference of a Mojiito Application.
 *
 * @export
 * \@class ApplicationRef
 */
class ApplicationRef {
    /**
     * @param {?} injector
     * @param {?} _componentFactoryResolver
     */
    constructor(injector, _componentFactoryResolver) {
        this.injector = injector;
        this._componentFactoryResolver = _componentFactoryResolver;
        this._rootComponents = [];
        this._rootComponentTypes = [];
        this._views = [];
    }
    /**
     * @template C
     * @param {?} componentOrFactory
     * @return {?}
     */
    bootstrap(componentOrFactory) {
        let /** @type {?} */ componentFactory;
        if (componentOrFactory instanceof ComponentFactory) {
            componentFactory = componentOrFactory;
        }
        else {
            componentFactory = this._componentFactoryResolver.resolveComponentFactory(componentOrFactory);
        }
        this._rootComponentTypes.push(componentFactory.componentType);
        const /** @type {?} */ compRef = componentFactory.create(this.injector, componentFactory.selector);
        compRef.onDestroy(() => { this._unloadComponent(compRef); });
        this._loadComponent(compRef);
        return compRef;
    }
    /**
     * @param {?} viewRef
     * @return {?}
     */
    attachView(viewRef) {
        const /** @type {?} */ view = ((viewRef));
        this._views.push(view);
        view.attachToAppRef(this);
    }
    /**
     * @param {?} viewRef
     * @return {?}
     */
    detachView(viewRef) {
        const /** @type {?} */ view = ((viewRef));
        ListWrapper.remove(this._views, view);
        view.detachFromAppRef();
    }
    /**
     * @param {?} componentRef
     * @return {?}
     */
    _loadComponent(componentRef) {
        this.attachView(componentRef.hostView);
        // this.tick();
        this._rootComponents.push(componentRef);
    }
    /**
     * @param {?} componentRef
     * @return {?}
     */
    _unloadComponent(componentRef) {
        this.detachView(componentRef.hostView);
        ListWrapper.remove(this._rootComponents, componentRef);
    }
    /**
     * @return {?}
     */
    onDestroy() {
        this._views.slice().forEach((view) => view.destroy());
    }
}
ApplicationRef.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
ApplicationRef.ctorParameters = () => [
    { type: Injector, },
    { type: ComponentFactoryResolver, },
];

/**
 * Represents an instance of a Component created via a ComponentFactory.
 * `ComponentRef` provides access to the Component Instance as well other objects related to this
 * Component Instance and allows you to destroy the Component Instance via the destroy method.
 *
 * @export
 * \@class ComponentRef
 * @abstract
 */
class ComponentRef {
    /**
     * Location of the component instance
     * @abstract
     * @return {?}
     */
    location() { }
    /**
     * The injector on which the component instance exists.
     * @abstract
     * @return {?}
     */
    injector() { }
    /**
     * The instance of the Component.
     * @abstract
     * @return {?}
     */
    instance() { }
    /**
     * @abstract
     * @return {?}
     */
    hostView() { }
    /**
     * The component type.
     * @abstract
     * @return {?}
     */
    componentType() { }
    /**
     * Destroys the component instance and all of the data structures associated with it.
     * @abstract
     * @return {?}
     */
    destroy() { }
    /**
     * Allows to register a callback that will be called when the component is destroyed.
     * @abstract
     * @param {?} callback
     * @return {?}
     */
    onDestroy(callback) { }
}

/**
 * \@experimental
 * @abstract
 */
class RendererFactory {
    /**
     * @abstract
     * @param {?} hostElement
     * @param {?} type
     * @return {?}
     */
    createRenderer(hostElement, type) { }
}
/**
 * @abstract
 */
class Renderer {
    /**
     * @abstract
     * @param {?} context
     * @return {?}
     */
    parse(context) { }
    /**
     * @abstract
     * @return {?}
     */
    destroy() { }
    /**
     * @abstract
     * @param {?} name
     * @param {?=} namespace
     * @return {?}
     */
    createElement(name, namespace) { }
    /**
     * @abstract
     * @param {?} value
     * @return {?}
     */
    createComment(value) { }
    /**
     * @abstract
     * @param {?} value
     * @return {?}
     */
    createText(value) { }
    /**
     * @abstract
     * @param {?} node
     * @return {?}
     */
    destroyNode(node) { }
    /**
     * @abstract
     * @param {?} parent
     * @param {?} newChild
     * @return {?}
     */
    appendChild(parent, newChild) { }
    /**
     * @abstract
     * @param {?} parent
     * @param {?} newChild
     * @param {?} refChild
     * @return {?}
     */
    insertBefore(parent, newChild, refChild) { }
    /**
     * @abstract
     * @param {?} parent
     * @param {?} oldChild
     * @return {?}
     */
    removeChild(parent, oldChild) { }
    /**
     * @abstract
     * @param {?} selectorOrNode
     * @return {?}
     */
    selectRootElement(selectorOrNode) { }
    /**
     * @abstract
     * @param {?} node
     * @return {?}
     */
    parentNode(node) { }
    /**
     * @abstract
     * @param {?} node
     * @return {?}
     */
    nextSibling(node) { }
    /**
     * @abstract
     * @param {?} el
     * @param {?} name
     * @param {?} value
     * @param {?=} namespace
     * @return {?}
     */
    setAttribute(el, name, value, namespace) { }
    /**
     * @abstract
     * @param {?} el
     * @param {?} name
     * @param {?=} namespace
     * @return {?}
     */
    removeAttribute(el, name, namespace) { }
    /**
     * @abstract
     * @param {?} el
     * @param {?} name
     * @return {?}
     */
    addClass(el, name) { }
    /**
     * @abstract
     * @param {?} el
     * @param {?} name
     * @return {?}
     */
    removeClass(el, name) { }
    /**
     * @abstract
     * @param {?} el
     * @param {?} style
     * @param {?} value
     * @param {?} hasVendorPrefix
     * @param {?} hasImportant
     * @return {?}
     */
    setStyle(el, style, value, hasVendorPrefix, hasImportant) { }
    /**
     * @abstract
     * @param {?} el
     * @param {?} style
     * @param {?} hasVendorPrefix
     * @return {?}
     */
    removeStyle(el, style, hasVendorPrefix) { }
    /**
     * @abstract
     * @param {?} el
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    setProperty(el, name, value) { }
    /**
     * @abstract
     * @param {?} node
     * @param {?} value
     * @return {?}
     */
    setValue(node, value) { }
    /**
     * @abstract
     * @param {?} target
     * @param {?} eventName
     * @param {?} callback
     * @return {?}
     */
    listen(target, eventName, callback) { }
}

class ElementRef {
    /**
     * @param {?} nativeElement
     */
    constructor(nativeElement) { this.nativeElement = nativeElement; }
}

/**
 * @abstract
 */
class ViewContainerRef {
    /**
     * @abstract
     * @return {?}
     */
    anchorElement() { }
    /**
     * @abstract
     * @return {?}
     */
    injector() { }
    /**
     * @abstract
     * @return {?}
     */
    parentInjector() { }
    /**
     * Destroys all Views in this container.
     * @abstract
     * @return {?}
     */
    clear() { }
    /**
     * Returns the ViewRef for the View located in this container at the specified index.
     * @abstract
     * @param {?} index
     * @return {?}
     */
    get(index) { }
    /**
     * Returns the number of Views currently attached to this container.
     * @abstract
     * @return {?}
     */
    length() { }
    /**
     * Instantiates an Embedded View based on the TemplateRef `templateRef`} and inserts it
     * into this container at the specified `index`.
     *
     * If `index` is not specified, the new View will be inserted as the last View in the container.
     *
     * Returns the ViewRef for the newly created View.
     * @abstract
     * @template C
     * @param {?} templateRef
     * @param {?=} context
     * @param {?=} index
     * @return {?}
     */
    createEmbeddedView(templateRef, context, index) { }
    /**
     * Instantiates a single Component and inserts its Host View into this container at the
     * specified `index`.
     *
     * The component is instantiated using its ComponentFactory which can be
     * obtained via ComponentFactoryResolver#resolveComponentFactory}.
     *
     * If `index` is not specified, the new View will be inserted as the last View in the container.
     *
     * You can optionally specify the Injector that will be used as parent for the Component.
     *
     * Returns the ComponentRef of the Host View created for the newly instantiated Component.
     * @abstract
     * @template C
     * @param {?} componentFactory
     * @param {?=} index
     * @param {?=} injector
     * @param {?=} projectableNodes
     * @return {?}
     */
    createComponent(componentFactory, index, injector, projectableNodes) { }
    /**
     * Returns the index of the View, specified via ViewRef, within the current container or
     * `-1` if this container doesn't contain the View.
     * @abstract
     * @param {?} viewRef
     * @return {?}
     */
    indexOf(viewRef) { }
    /**
     * Destroys a View attached to this container at the specified `index`.
     *
     * If `index` is not specified, the last View in the container will be removed.
     * @abstract
     * @param {?=} index
     * @return {?}
     */
    remove(index) { }
    /**
     * Use along with #nsert} to move a View within the current container.
     *
     * If the `index` param is omitted, the last ViewRef is detached.
     * @abstract
     * @param {?=} index
     * @return {?}
     */
    detach(index) { }
}

/**
 * @param {?} view
 * @param {?} index
 * @return {?}
 */
function asProviderData(view, index) {
    return (view.nodes[index]);
}
class NodeData {
}

const NOT_CREATED = new Object();
// tslint:disable:variable-name
const _tokenKeyCache = new Map();
const RendererTokenKey = tokenKey(Renderer);
const ElementRefTokenKey = tokenKey(ElementRef);
const ViewContainerRefTokenKey = tokenKey(ViewContainerRef);
// const ChangeDetectorRefTokenKey = tokenKey(ChangeDetectorRef);
const InjectorRefTokenKey = tokenKey(Injector);
/**
 * @param {?} token
 * @return {?}
 */
function tokenKey(token) {
    let /** @type {?} */ key = _tokenKeyCache.get(token);
    if (!key) {
        key = stringifyToken(token); // + '_' + _tokenKeyCache.size;
        _tokenKeyCache.set(token, key);
    }
    return key;
}
/**
 * @param {?} token
 * @return {?}
 */
function stringifyToken(token) {
    if (token instanceof ReflectiveDependency) {
        return token.key.displayName;
    }
    if (token instanceof ReflectiveKey) {
        return token.displayName;
    }
    return stringify(token);
}
/**
 * @param {?} view
 * @param {?} depDef
 * @param {?} allowPrivateServices
 * @param {?=} notFoundValue
 * @return {?}
 */
function resolveDep(view, depDef, allowPrivateServices, notFoundValue = Injector.THROW_IF_NOT_FOUND) {
    if (depDef.flags & 8 /* Value */) {
        return depDef.token;
    }
    const /** @type {?} */ startView = view;
    if (depDef.flags & 2 /* Optional */) {
        notFoundValue = null;
    }
    const /** @type {?} */ tokenKey = depDef.tokenKey;
    if (depDef.flags & 1 /* SkipSelf */) {
        allowPrivateServices = false;
        view = view.parent;
    }
    while (view) {
        let /** @type {?} */ def = view.def;
        if (def) {
            switch (tokenKey) {
                case RendererTokenKey:
                    return view.renderer;
                case ElementRefTokenKey:
                    return new ElementRef(view.renderElement);
                case ViewContainerRefTokenKey:
                    return view.viewContainer || view.viewContainerParent;
                // case ChangeDetectorRefTokenKey: {
                //   let cdView = findCompView(view, elDef, allowPrivateServices);
                //   return createChangeDetectorRef(cdView);
                // }
                case InjectorRefTokenKey:
                    return createInjector(view);
                default:
                    const /** @type {?} */ providerDef = (allowPrivateServices ? def.allProviders : def.publicProviders)[tokenKey];
                    if (providerDef) {
                        const /** @type {?} */ providerData = asProviderData(view, providerDef.index);
                        if (providerData.instance === NOT_CREATED) {
                            providerData.instance = _createProviderInstance(view, providerDef);
                        }
                        return providerData.instance;
                    }
            }
        }
        view = view.parent;
    }
    return startView.root.injector.get(depDef.token, notFoundValue);
}
/**
 * @param {?} view
 * @param {?} def
 * @return {?}
 */
function _createProviderInstance(view, def) {
    // private services can see other private services
    const /** @type {?} */ allowPrivateServices = (def.flags & 4096 /* PrivateProvider */) > 0;
    const /** @type {?} */ providerDef = def.provider;
    let /** @type {?} */ deps = [];
    if (providerDef.deps) {
        deps = providerDef.deps.map(d => resolveDep(view, d, allowPrivateServices));
    }
    return providerDef.factory(...deps);
}
/**
 * @param {?} view
 * @param {?} def
 * @return {?}
 */
function createProviderInstance(view, def) {
    return def.flags & 2048 /* LazyProvider */ ? NOT_CREATED : _createProviderInstance(view, def);
}

/**
 * @param {?} def
 * @param {?} injector
 * @param {?} rootSelectorOrNode
 * @param {?=} context
 * @return {?}
 */
function createRootView(def, injector, rootSelectorOrNode, context) {
    const /** @type {?} */ rendererFactory = injector.get(RendererFactory);
    const /** @type {?} */ root = createRootData(injector, rendererFactory, rootSelectorOrNode);
    const /** @type {?} */ view = createView(root, null, root.element, def);
    view.renderer.parse(view);
    return view;
}
/**
 * @param {?} root
 * @param {?} parent
 * @param {?} renderElement
 * @param {?} def
 * @return {?}
 */
function createView(root, parent, renderElement, def) {
    const /** @type {?} */ nodes = new Array(def.nodes.length);
    const /** @type {?} */ view = {
        def,
        renderElement,
        root,
        renderer: createRenderer(renderElement, def, parent, root),
        nodes,
        parent,
        viewContainerParent: undefined,
        viewContainer: undefined,
        context: undefined,
        component: undefined,
        state: 1 /* FirstCheck */ | 2 /* ChecksEnabled */,
        disposables: undefined,
    };
    if (def.nodeFlags & 16384 /* TypeComponent */) {
        view.viewContainer = createViewContainerData(view);
    }
    createViewNodes(view);
    return view;
}
/**
 * @param {?} view
 * @param {?} component
 * @param {?} context
 * @return {?}
 */
function initView(view, component, context) {
    view.component = component;
    view.context = context;
}
/**
 * @param {?} view
 * @return {?}
 */
function destroyView(view) {
    if (view.state & 8 /* Destroyed */) {
        return;
    }
    // execEmbeddedViewsAction(view, ViewAction.Destroy);
    // execComponentViewsAction(view, ViewAction.Destroy);
    // callLifecycleHooksChildrenFirst(view, NodeFlags.OnDestroy);
    if (view.disposables) {
        for (let /** @type {?} */ i = 0; i < view.disposables.length; i++) {
            view.disposables[i]();
        }
    }
    destroyViewNodes(view);
    view.renderer.destroy();
    view.state |= 8 /* Destroyed */;
}
/**
 * @param {?} view
 * @return {?}
 */
function createViewNodes(view) {
    const /** @type {?} */ def = view.def;
    const /** @type {?} */ nodes = view.nodes;
    let /** @type {?} */ nodeData;
    for (let /** @type {?} */ i = 0; i < def.nodes.length; i++) {
        const /** @type {?} */ nodeDef = def.nodes[i];
        switch (nodeDef.flags & 16512 /* Types */) {
            case 128 /* TypeProvider */: {
                const /** @type {?} */ instance = createProviderInstance(view, nodeDef);
                nodeData = ({ instance });
                break;
            }
            case 16384 /* TypeComponent */: {
                const /** @type {?} */ instance = createProviderInstance(view, nodeDef);
                nodeData = ({ instance });
                initView(view, instance, instance);
                break;
            }
        }
        nodes[i] = nodeData;
    }
}
/**
 * @param {?} view
 * @return {?}
 */
function destroyViewNodes(view) {
    view.renderer.destroyNode(view.renderElement);
}
/**
 * @param {?} injector
 * @param {?} rendererFactory
 * @param {?} rootSelectorOrNode
 * @return {?}
 */
function createRootData(injector, rendererFactory, rootSelectorOrNode) {
    const /** @type {?} */ renderer = rendererFactory.createRenderer(null, null);
    let /** @type {?} */ element = rootSelectorOrNode;
    if (typeof rootSelectorOrNode === 'string') {
        element = renderer.selectRootElement(rootSelectorOrNode);
    }
    return {
        injector,
        selectorOrNode: rootSelectorOrNode,
        element,
        rendererFactory,
        renderer
    };
}
/**
 * @param {?} publicProviders
 * @param {?} componentProvider
 * @return {?}
 */
function viewDef(publicProviders, componentProvider) {
    var /** @type {?} */ viewDef = {};
    // resolve public providers
    const /** @type {?} */ publicProv = Object.create(null);
    if (publicProviders) {
        resolveReflectiveProviders(publicProviders).forEach(p => {
            const /** @type {?} */ resolvedFactory = p.resolvedFactories[0];
            publicProv[tokenKey(p.key)] = {
                factory: resolvedFactory.factory,
                dependencies: resolvedFactory.dependencies,
                multi: p.multiProvider
            };
        });
    }
    viewDef.publicProviders = publicProv;
    // combine to all providers
    const /** @type {?} */ allProviders = Object.create(publicProv);
    viewDef.allProviders = allProviders;
    // resolve component provider
    if (componentProvider) {
        const /** @type {?} */ resolvedComp = resolveReflectiveProviders([componentProvider])[0];
        const /** @type {?} */ resolvedCompFactory = resolvedComp.resolvedFactories[0];
        viewDef.componentProvider = {
            factory: resolvedCompFactory.factory,
            dependencies: resolvedCompFactory.dependencies,
            multi: false,
        };
        allProviders[tokenKey(resolvedComp.key)] = viewDef.componentProvider;
    }
    return viewDef;
}
/**
 * @param {?} publicProviders
 * @param {?} componentProvider
 * @return {?}
 */
function createViewDefinitionFactory(publicProviders, componentProvider) {
    return () => {
        return viewDef(publicProviders, componentProvider);
    };
}
/**
 * @param {?} hostElement
 * @param {?} viewDef
 * @param {?} parentView
 * @param {?} root
 * @return {?}
 */
function createRenderer(hostElement, viewDef, parentView, root) {
    let /** @type {?} */ rendererType = viewDef.componentRendererType;
    let /** @type {?} */ view = parentView;
    while (view && !rendererType) {
        rendererType = view.def.componentRendererType;
        view = view.parent;
    }
    if (!rendererType) {
        return root.renderer;
    }
    else {
        return root.rendererFactory.createRenderer(hostElement, rendererType);
    }
}

/**
 * @param {?} parentView
 * @param {?} viewIndex
 * @param {?} view
 * @return {?}
 */
function attachEmbeddedView(parentView, viewIndex, view) {
    let /** @type {?} */ embeddedViews = parentView.viewContainer._embeddedViews;
    if (viewIndex == null) {
        viewIndex = embeddedViews.length;
    }
    view.viewContainerParent = parentView;
    addToArray(embeddedViews, viewIndex, view);
}
/**
 * @param {?} parent
 * @param {?} viewIndex
 * @return {?}
 */
function detachEmbeddedView(parent, viewIndex) {
    const /** @type {?} */ embeddedViews = parent.viewContainer._embeddedViews;
    if (viewIndex == null || viewIndex >= embeddedViews.length) {
        viewIndex = embeddedViews.length - 1;
    }
    if (viewIndex < 0) {
        return null;
    }
    const /** @type {?} */ view = embeddedViews[viewIndex];
    view.viewContainerParent = undefined;
    removeFromArray(embeddedViews, viewIndex);
    return view;
}
/**
 * @param {?} arr
 * @param {?} index
 * @param {?} value
 * @return {?}
 */
function addToArray(arr, index, value) {
    // perf: array.push is faster than array.splice!
    if (index >= arr.length) {
        arr.push(value);
    }
    else {
        arr.splice(index, 0, value);
    }
}
/**
 * @param {?} arr
 * @param {?} index
 * @return {?}
 */
function removeFromArray(arr, index) {
    // perf: array.pop is faster than array.splice!
    if (index >= arr.length - 1) {
        arr.pop();
    }
    else {
        arr.splice(index, 1);
    }
}

const VIEW_DEFINITION_CACHE = new WeakMap();
/**
 * @param {?} factory
 * @return {?}
 */
function resolveViewDefinition(factory) {
    let /** @type {?} */ value = VIEW_DEFINITION_CACHE.get(factory);
    if (!value) {
        value = factory();
        VIEW_DEFINITION_CACHE.set(factory, value);
    }
    return value;
}

// tslint:disable:class-name
const EMPTY_CONTEXT = new Object();
/**
 * @param {?} view
 * @return {?}
 */
function createInjector(view) {
    return new Injector_(view);
}
/**
 * Internal ComponentFactory
 */
class ComponentFactory_ extends ComponentFactory {
    /**
     * @param {?} selector
     * @param {?} componentType
     * @param {?} _viewDefFactory
     */
    constructor(selector, componentType, _viewDefFactory) {
        super();
        this.selector = selector;
        this.componentType = componentType;
        this._viewDefFactory = _viewDefFactory;
    }
    /**
     * @param {?} injector
     * @param {?=} rootSelectorOrNode
     * @return {?}
     */
    create(injector, rootSelectorOrNode) {
        const /** @type {?} */ viewDef = resolveViewDefinition(this._viewDefFactory);
        const /** @type {?} */ componentNodeIndex = viewDef.componentProvider.index;
        const /** @type {?} */ view = createRootView(viewDef, injector, rootSelectorOrNode, EMPTY_CONTEXT);
        const /** @type {?} */ component = asProviderData(view, componentNodeIndex).instance;
        return new ComponentRef_(view, new ViewRef_(view), component);
    }
}
/**
 * @param {?} selector
 * @param {?} componentType
 * @param {?} viewDefFactory
 * @return {?}
 */
function createComponentFactory(selector, componentType, viewDefFactory) {
    return new ComponentFactory_(selector, componentType, viewDefFactory);
}
/**
 * Internal ComponentRef
 */
class ComponentRef_ extends ComponentRef {
    /**
     * @param {?} _view
     * @param {?} _viewRef
     * @param {?} _component
     */
    constructor(_view, _viewRef, _component) {
        super();
        this._view = _view;
        this._viewRef = _viewRef;
        this._component = _component;
    }
    /**
     * @return {?}
     */
    get location() { return new ElementRef(null); }
    /**
     * @return {?}
     */
    get injector() { return new Injector_(this._view); }
    /**
     * @return {?}
     */
    get instance() { return this._component; }
    ;
    /**
     * @return {?}
     */
    get hostView() { return this._viewRef; }
    ;
    /**
     * @return {?}
     */
    get componentType() { return (this._component.constructor); }
    /**
     * @return {?}
     */
    destroy() { this._viewRef.destroy(); }
    /**
     * @param {?} callback
     * @return {?}
     */
    onDestroy(callback) { this._viewRef.onDestroy(callback); }
}
/**
 * Internal ViewContainerRef
 */
class ViewContainerRef_ {
    /**
     * @param {?} _view
     */
    constructor(_view) {
        this._view = _view;
        /* @internal */
        this._embeddedViews = [];
    }
    /**
     * @return {?}
     */
    get anchorElement() { return new ElementRef(this._view.renderElement); }
    /**
     * @return {?}
     */
    get injector() { return new Injector_(this._view); }
    /**
     * @return {?}
     */
    get parentInjector() {
        let /** @type {?} */ view = this._view;
        let /** @type {?} */ def = view.def;
        while (!def && view) {
            view = view.parent;
            def = view.def;
        }
        return view ? new Injector_(view) : this._view.root.injector;
    }
    /**
     * @return {?}
     */
    clear() { }
    /**
     * @param {?} index
     * @return {?}
     */
    get(index) {
        const /** @type {?} */ view = this._embeddedViews[index];
        if (view) {
            const /** @type {?} */ ref = new ViewRef_(view);
            ref.attachToViewContainerRef(this);
            return ref;
        }
        return null;
    }
    /**
     * @return {?}
     */
    get length() { return 0; }
    /**
     * @template C
     * @param {?} templateRef
     * @param {?=} context
     * @param {?=} index
     * @return {?}
     */
    createEmbeddedView(templateRef, context, index) { }
    /**
     * @template C
     * @param {?} componentFactory
     * @param {?=} index
     * @param {?=} injector
     * @param {?=} rootSelectorOrNode
     * @return {?}
     */
    createComponent(componentFactory, index, injector, rootSelectorOrNode) {
        const /** @type {?} */ contextInjector = injector || this.parentInjector;
        const /** @type {?} */ componentRef = componentFactory.create(contextInjector, rootSelectorOrNode);
        this.insert(componentRef.hostView, index);
        return componentRef;
    }
    /**
     * @param {?} viewRef
     * @param {?=} index
     * @return {?}
     */
    insert(viewRef, index) {
        // tslint:disable-next-line:variable-name
        const /** @type {?} */ viewRef_ = (viewRef);
        const /** @type {?} */ viewData = viewRef_._view;
        attachEmbeddedView(this._view, index, viewData);
        viewRef_.attachToViewContainerRef(this);
        return viewRef;
    }
    /**
     * @param {?} viewRef
     * @return {?}
     */
    indexOf(viewRef) {
        return this._embeddedViews.indexOf(((viewRef))._view);
    }
    /**
     * @param {?=} index
     * @return {?}
     */
    remove(index) {
        const /** @type {?} */ view = detachEmbeddedView(this._view, index);
        if (view) {
            destroyView(view);
        }
    }
    /**
     * @param {?=} index
     * @return {?}
     */
    detach(index) {
        const /** @type {?} */ view = detachEmbeddedView(this._view, index);
        return view ? new ViewRef_(view) : null;
    }
}
/**
 * @param {?} view
 * @return {?}
 */
function createViewContainerData(view) {
    return new ViewContainerRef_(view);
}
/**
 * Internal View Reference
 */
class ViewRef_ {
    /**
     * @param {?} _view
     */
    constructor(_view) {
        this._view = _view;
        this._viewContainerRef = null;
        this._appRef = null;
    }
    /**
     * @return {?}
     */
    get context() { return this._view.context; }
    /**
     * @return {?}
     */
    get destroyed() { return (this._view.state & 8 /* Destroyed */) !== 0; }
    /**
     * @return {?}
     */
    detach() { this._view.state &= ~2 /* ChecksEnabled */; }
    /**
     * @return {?}
     */
    reattach() { this._view.state |= 2 /* ChecksEnabled */; }
    /**
     * @param {?} callback
     * @return {?}
     */
    onDestroy(callback) {
        if (!this._view.disposables) {
            this._view.disposables = [];
        }
        this._view.disposables.push(/** @type {?} */ (callback));
    }
    /**
     * @return {?}
     */
    destroy() {
        if (this._appRef) {
            this._appRef.detachView(this);
        }
        else if (this._viewContainerRef) {
            this._viewContainerRef.detach(this._viewContainerRef.indexOf(this));
        }
        destroyView(this._view);
    }
    /**
     * @return {?}
     */
    detachFromAppRef() {
        this._appRef = null;
    }
    /**
     * @param {?} appRef
     * @return {?}
     */
    attachToAppRef(appRef) {
        if (this._viewContainerRef) {
            throw new Error('This view is already attached to a ViewContainer!');
        }
        this._appRef = appRef;
    }
    /**
     * @param {?} vcRef
     * @return {?}
     */
    attachToViewContainerRef(vcRef) {
        if (this._appRef) {
            throw new Error('This view is already attached directly to the ApplicationRef!');
        }
        this._viewContainerRef = vcRef;
    }
}
/**
 * Internal View Injector
 */
class Injector_ {
    /**
     * @param {?} _view
     */
    constructor(_view) {
        this._view = _view;
    }
    /**
     * @param {?} token
     * @param {?=} notFoundValue
     * @return {?}
     */
    get(token, notFoundValue = Injector.THROW_IF_NOT_FOUND) {
        return resolveDep(this._view, { flags: 0 /* None */, token, tokenKey: tokenKey(token) }, notFoundValue);
    }
}

/**
 * @abstract
 */
class ViewRef {
    /**
     * Destroys the view and all of the data structures associated with it.
     * @abstract
     * @return {?}
     */
    destroy() { }
    /**
     * @abstract
     * @return {?}
     */
    destroyed() { }
    /**
     * @abstract
     * @param {?} callback
     * @return {?}
     */
    onDestroy(callback) { }
}

/**
 * Creates a token that can be used in a DI Provider.
 *
 * Use an `InjectionToken` whenever the type you are injecting is not reified (does not have a
 * runtime representation) such as when injecting an interface, callable type, array or
 * parametrized type.
 *
 * `InjectionToken` is parametrize on `T` which is the type of object which will be returned by the
 * `Injector`. This provides additional level of type safety.
 *
 * ```
 * interface MyInterface {...}
 * var myInterface = injector.get(new InjectionToken<MyInterface>('SomeToken'));
 * // myInterface is inferred to be MyInterface.
 * ```
 *
 * ### Example
 *
 * {\@example core/di/ts/injector_spec.ts region='Injector'}
 *
 * \@stable
 */
class InjectionToken {
    /**
     * @param {?} _desc
     */
    constructor(_desc) {
        this._desc = _desc;
    }
    /**
     * @return {?}
     */
    toString() { return `InjectionToken ${this._desc}`; }
}

// Providers
const CORE_PROVIDERS = [
    { provide: ReflectorReader, useValue: reflector },
    ComponentResolver
];

/**
 * @module
 * @description
 * Entry point for all public APIs of the core package.
 */

/**
 * Generated bundle index. Do not edit.
 */

export { createPlatformFactory, getPlatform, PlatformRef, ApplicationRef, Component, HostListener, ChildListener, ComponentResolver, ComponentFactory, ComponentFactoryResolver, ComponentRef, createComponentFactory, ViewRef, ViewContainerRef, ElementRef, createViewDefinitionFactory, createView, forwardRef, InjectionToken, Injector, Host, Inject, Injectable, Optional, Self, SkipSelf, ReflectiveInjector, ReflectiveInjector_, ReflectiveKey, ReflectiveDependency, ResolvedReflectiveFactory, ResolvedReflectiveProvider_, resolveReflectiveProviders, mergeResolvedReflectiveProviders, constructDependencies, reflector, ReflectorReader, Reflector, Type, Renderer, RendererFactory, CORE_PROVIDERS, asProviderData, NodeData, resolveForwardRef as ɵb, ReflectionCapabilities as ɵf, makeDecorator as ɵc, makeParamDecorator as ɵd, makePropDecorator as ɵe };
//# sourceMappingURL=core.js.map
