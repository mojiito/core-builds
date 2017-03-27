var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var StringMapWrapper = (function () {
    function StringMapWrapper() {
    }
    /**
     * @template V
     * @param {?} m1
     * @param {?} m2
     * @return {?}
     */
    StringMapWrapper.merge = function (m1, m2) {
        var /** @type {?} */ m = {};
        for (var _i = 0, _a = Object.keys(m1); _i < _a.length; _i++) {
            var k = _a[_i];
            m[k] = m1[k];
        }
        for (var _b = 0, _c = Object.keys(m2); _b < _c.length; _b++) {
            var k = _c[_b];
            m[k] = m2[k];
        }
        return m;
    };
    /**
     * @template V
     * @param {?} m1
     * @param {?} m2
     * @return {?}
     */
    StringMapWrapper.equals = function (m1, m2) {
        var /** @type {?} */ k1 = Object.keys(m1);
        var /** @type {?} */ k2 = Object.keys(m2);
        if (k1.length != k2.length) {
            return false;
        }
        for (var /** @type {?} */ i = 0; i < k1.length; i++) {
            var /** @type {?} */ key = k1[i];
            if (m1[key] !== m2[key]) {
                return false;
            }
        }
        return true;
    };
    return StringMapWrapper;
}());
var ListWrapper = (function () {
    function ListWrapper() {
    }
    /**
     * @template T
     * @param {?} arr
     * @param {?} condition
     * @return {?}
     */
    ListWrapper.findLast = function (arr, condition) {
        for (var /** @type {?} */ i = arr.length - 1; i >= 0; i--) {
            if (condition(arr[i])) {
                return arr[i];
            }
        }
        return null;
    };
    /**
     * @template T
     * @param {?} list
     * @param {?} items
     * @return {?}
     */
    ListWrapper.removeAll = function (list, items) {
        for (var /** @type {?} */ i = 0; i < items.length; ++i) {
            var /** @type {?} */ index = list.indexOf(items[i]);
            if (index > -1) {
                list.splice(index, 1);
            }
        }
    };
    /**
     * @template T
     * @param {?} list
     * @param {?} el
     * @return {?}
     */
    ListWrapper.remove = function (list, el) {
        var /** @type {?} */ index = list.indexOf(el);
        if (index > -1) {
            list.splice(index, 1);
            return true;
        }
        return false;
    };
    /**
     * @param {?} a
     * @param {?} b
     * @return {?}
     */
    ListWrapper.equals = function (a, b) {
        if (a.length != b.length)
            return false;
        for (var /** @type {?} */ i = 0; i < a.length; ++i) {
            if (a[i] !== b[i])
                return false;
        }
        return true;
    };
    /**
     * @template T
     * @param {?} list
     * @return {?}
     */
    ListWrapper.flatten = function (list) {
        return list.reduce(function (flat, item) {
            var /** @type {?} */ flatItem = Array.isArray(item) ? ListWrapper.flatten(item) : item;
            return ((flat)).concat(flatItem);
        }, []);
    };
    /**
     * @template T
     * @param {?} list
     * @param {?} callback
     * @return {?}
     */
    ListWrapper.forEach = function (list, callback) {
        for (var /** @type {?} */ i = 0, /** @type {?} */ max = list.length; i < max; i++) {
            callback.call(callback, list[i], i);
        }
    };
    return ListWrapper;
}());
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
        var /** @type {?} */ parts = token.toString().match(/\w+/g);
        if (parts && parts.length) {
            return parts[parts.length - 1];
        }
    }
    var /** @type {?} */ res = token.toString();
    var /** @type {?} */ newLineIndex = res.indexOf('\n');
    return (newLineIndex === -1) ? res : res.substring(0, newLineIndex);
}
var globalScope;
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
var Reflect = globalScope.Reflect;
/**
 * @param {?} name
 * @param {?} props
 * @param {?=} parentClass
 * @param {?=} chainFn
 * @return {?}
 */
function makeDecorator(name, props, parentClass, chainFn) {
    if (chainFn === void 0) { chainFn = null; }
    var /** @type {?} */ metaCtor = makeMetadataCtor([props]);
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
        var /** @type {?} */ annotationInstance = new ((DecoratorFactory))(objOrType);
        var /** @type {?} */ chainAnnotation = typeof this === 'function' && Array.isArray(this.annotations) ? this.annotations : [];
        chainAnnotation.push(annotationInstance);
        // tslint:disable-next-line:variable-name
        var /** @type {?} */ TypeDecorator = (function TypeDecorator(cls) {
            var /** @type {?} */ annotations = Reflect.getOwnMetadata('annotations', cls) || [];
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
    DecoratorFactory.prototype.toString = function () { return "@" + name; };
    ((DecoratorFactory)).annotationCls = DecoratorFactory;
    return DecoratorFactory;
}
/**
 * @param {?} props
 * @return {?}
 */
function makeMetadataCtor(props) {
    return function ctor() {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        props.forEach(function (prop, i) {
            var /** @type {?} */ argVal = args[i];
            if (Array.isArray(prop)) {
                // plain parameter
                _this[prop[0]] = argVal === undefined ? prop[1] : argVal;
            }
            else {
                for (var /** @type {?} */ propName in prop) {
                    _this[propName] =
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
    var /** @type {?} */ metaCtor = makeMetadataCtor(props);
    /**
     * @param {...?} args
     * @return {?}
     */
    function ParamDecoratorFactory() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this instanceof ParamDecoratorFactory) {
            metaCtor.apply(this, args);
            return this;
        }
        var /** @type {?} */ annotationInstance = new (((ParamDecoratorFactory)).bind.apply(((ParamDecoratorFactory)), [void 0].concat(args)))();
        ((ParamDecorator)).annotation = annotationInstance;
        return ParamDecorator;
        /**
         * @param {?} cls
         * @param {?} unusedKey
         * @param {?} index
         * @return {?}
         */
        function ParamDecorator(cls, unusedKey, index) {
            var /** @type {?} */ parameters = Reflect.getOwnMetadata('parameters', cls) || [];
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
    ParamDecoratorFactory.prototype.toString = function () { return "@" + name; };
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
    var /** @type {?} */ metaCtor = makeMetadataCtor(props);
    /**
     * @param {...?} args
     * @return {?}
     */
    function PropDecoratorFactory() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this instanceof PropDecoratorFactory) {
            metaCtor.apply(this, args);
            return this;
        }
        var /** @type {?} */ decoratorInstance = new (((PropDecoratorFactory)).bind.apply(((PropDecoratorFactory)), [void 0].concat(args)))();
        // tslint:disable-next-line:no-shadowed-variable
        return function PropDecorator(target, name) {
            var /** @type {?} */ meta = Reflect.getOwnMetadata('propMetadata', target.constructor) || {};
            meta[name] = meta.hasOwnProperty(name) && meta[name] || [];
            meta[name].unshift(decoratorInstance);
            Reflect.defineMetadata('propMetadata', meta, target.constructor);
        };
    }
    if (parentClass) {
        PropDecoratorFactory.prototype = Object.create(parentClass.prototype);
    }
    PropDecoratorFactory.prototype.toString = function () { return "@" + name; };
    ((PropDecoratorFactory)).annotationCls = PropDecoratorFactory;
    return PropDecoratorFactory;
}
// tslint:disable:variable-name
/**
 * Component decorator and metadata.
 *
 * \@Annotation
 */
var Component = makeDecorator('Component', {
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
var HostListener = makePropDecorator('HostListener', [['eventName', undefined], ['args', []]]);
/**
 * ChildListener decorator and metadata.
 *
 * \@Annotation
 */
var ChildListener = makePropDecorator('ChildListener', [
    ['selector', undefined],
    ['eventName', undefined],
    ['args', []]
]);
/**
 * @param {?} instance
 * @return {?}
 */
// tslint:disable:variable-name
var Type = Function;
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
var DELEGATE_CTOR = /^function\s+\S+\(\)\s*{\s*("use strict";)?\s*(return\s+)?(\S+\s+!==\s+null\s+&&\s+)?\S+\.apply\(this,\s*arguments\)/;
var ReflectionCapabilities = (function () {
    /**
     * @param {?=} reflect
     */
    function ReflectionCapabilities(reflect) {
        this._reflect = reflect || globalScope['Reflect'];
    }
    /**
     * @return {?}
     */
    ReflectionCapabilities.prototype.isReflectionEnabled = function () { return true; };
    /**
     * @template T
     * @param {?} t
     * @return {?}
     */
    ReflectionCapabilities.prototype.factory = function (t) { return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return new (t.bind.apply(t, [void 0].concat(args)))();
    }; };
    /**
     * \@internal
     * @param {?} paramTypes
     * @param {?} paramAnnotations
     * @return {?}
     */
    ReflectionCapabilities.prototype._zipTypesAndAnnotations = function (paramTypes, paramAnnotations) {
        var /** @type {?} */ result;
        if (typeof paramTypes === 'undefined') {
            result = new Array(paramAnnotations.length);
        }
        else {
            result = new Array(paramTypes.length);
        }
        for (var /** @type {?} */ i = 0; i < result.length; i++) {
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
    };
    /**
     * @param {?} type
     * @param {?} parentCtor
     * @return {?}
     */
    ReflectionCapabilities.prototype._ownParameters = function (type, parentCtor) {
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
        var /** @type {?} */ tsickleCtorParams = ((type)).ctorParameters;
        if (tsickleCtorParams && tsickleCtorParams !== parentCtor.ctorParameters) {
            // Newer tsickle uses a function closure
            // Retain the non-function case for compatibility with older tsickle
            var /** @type {?} */ ctorParameters = typeof tsickleCtorParams === 'function' ? tsickleCtorParams() : tsickleCtorParams;
            var /** @type {?} */ paramTypes = ctorParameters.map(function (ctorParam) { return ctorParam && ctorParam.type; });
            var /** @type {?} */ paramAnnotations = ctorParameters.map(function (ctorParam) { return ctorParam && convertTsickleDecoratorIntoMetadata(ctorParam.decorators); });
            return this._zipTypesAndAnnotations(paramTypes, paramAnnotations);
        }
        // API for metadata created by invoking the decorators.
        if (this._reflect != null && this._reflect.getOwnMetadata != null) {
            var /** @type {?} */ paramAnnotations = this._reflect.getOwnMetadata('parameters', type);
            var /** @type {?} */ paramTypes = this._reflect.getOwnMetadata('design:paramtypes', type);
            if (paramTypes || paramAnnotations) {
                return this._zipTypesAndAnnotations(paramTypes, paramAnnotations);
            }
        }
        // If a class has no decorators, at least create metadata
        // based on function.length.
        // Note: We know that this is a real constructor as we checked
        // the content of the constructor above.
        return new Array(((type.length))).fill(undefined);
    };
    /**
     * @param {?} type
     * @return {?}
     */
    ReflectionCapabilities.prototype.parameters = function (type) {
        // Note: only report metadata if we have at least one class decorator
        // to stay in sync with the static reflector.
        if (!isType(type)) {
            return [];
        }
        var /** @type {?} */ parentCtor = getParentCtor(type);
        var /** @type {?} */ parameters = this._ownParameters(type, parentCtor);
        if (!parameters && parentCtor !== Object) {
            parameters = this.parameters(parentCtor);
        }
        return parameters || [];
    };
    /**
     * @param {?} typeOrFunc
     * @param {?} parentCtor
     * @return {?}
     */
    ReflectionCapabilities.prototype._ownAnnotations = function (typeOrFunc, parentCtor) {
        // Prefer the direct API.
        if (((typeOrFunc)).annotations && ((typeOrFunc)).annotations !== parentCtor.annotations) {
            var /** @type {?} */ annotations = ((typeOrFunc)).annotations;
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
    };
    /**
     * @param {?} typeOrFunc
     * @return {?}
     */
    ReflectionCapabilities.prototype.annotations = function (typeOrFunc) {
        if (!isType(typeOrFunc)) {
            return [];
        }
        var /** @type {?} */ parentCtor = getParentCtor(typeOrFunc);
        var /** @type {?} */ ownAnnotations = this._ownAnnotations(typeOrFunc, parentCtor) || [];
        var /** @type {?} */ parentAnnotations = parentCtor !== Object ? this.annotations(parentCtor) : [];
        return parentAnnotations.concat(ownAnnotations);
    };
    /**
     * @param {?} typeOrFunc
     * @param {?} parentCtor
     * @return {?}
     */
    ReflectionCapabilities.prototype._ownPropMetadata = function (typeOrFunc, parentCtor) {
        // Prefer the direct API.
        if (((typeOrFunc)).propMetadata &&
            ((typeOrFunc)).propMetadata !== parentCtor.propMetadata) {
            var /** @type {?} */ propMetadata = ((typeOrFunc)).propMetadata;
            if (typeof propMetadata === 'function' && propMetadata.propMetadata) {
                propMetadata = propMetadata.propMetadata;
            }
            return propMetadata;
        }
        // API of tsickle for lowering decorators to properties on the class.
        if (((typeOrFunc)).propDecorators &&
            ((typeOrFunc)).propDecorators !== parentCtor.propDecorators) {
            var /** @type {?} */ propDecorators_1 = ((typeOrFunc)).propDecorators;
            var /** @type {?} */ propMetadata_1 = ({});
            Object.keys(propDecorators_1).forEach(function (prop) {
                propMetadata_1[prop] = convertTsickleDecoratorIntoMetadata(propDecorators_1[prop]);
            });
            return propMetadata_1;
        }
        // API for metadata created by invoking the decorators.
        if (this._reflect && this._reflect.getOwnMetadata) {
            return this._reflect.getOwnMetadata('propMetadata', typeOrFunc);
        }
    };
    /**
     * @param {?} typeOrFunc
     * @return {?}
     */
    ReflectionCapabilities.prototype.propMetadata = function (typeOrFunc) {
        if (!isType(typeOrFunc)) {
            return {};
        }
        var /** @type {?} */ parentCtor = getParentCtor(typeOrFunc);
        var /** @type {?} */ propMetadata = {};
        if (parentCtor !== Object) {
            var /** @type {?} */ parentPropMetadata_1 = this.propMetadata(parentCtor);
            Object.keys(parentPropMetadata_1).forEach(function (propName) {
                propMetadata[propName] = parentPropMetadata_1[propName];
            });
        }
        var /** @type {?} */ ownPropMetadata = this._ownPropMetadata(typeOrFunc, parentCtor);
        if (ownPropMetadata) {
            Object.keys(ownPropMetadata).forEach(function (propName) {
                var /** @type {?} */ decorators = [];
                if (propMetadata.hasOwnProperty(propName)) {
                    decorators.push.apply(decorators, propMetadata[propName]);
                }
                decorators.push.apply(decorators, ownPropMetadata[propName]);
                propMetadata[propName] = decorators;
            });
        }
        return propMetadata;
    };
    /**
     * @param {?} type
     * @param {?} lcProperty
     * @return {?}
     */
    ReflectionCapabilities.prototype.hasLifecycleHook = function (type, lcProperty) {
        return type instanceof Type && lcProperty in type.prototype;
    };
    /**
     * @param {?} name
     * @return {?}
     */
    ReflectionCapabilities.prototype.getter = function (name) { return (new Function('o', 'return o.' + name + ';')); };
    /**
     * @param {?} name
     * @return {?}
     */
    ReflectionCapabilities.prototype.setter = function (name) {
        return (new Function('o', 'v', 'return o.' + name + ' = v;'));
    };
    /**
     * @param {?} name
     * @return {?}
     */
    ReflectionCapabilities.prototype.method = function (name) {
        var /** @type {?} */ functionBody = "if (!o." + name + ") throw new Error('\"" + name + "\" is undefined');\n        return o." + name + ".apply(o, args);";
        return (new Function('o', 'args', functionBody));
    };
    /**
     * @param {?} type
     * @return {?}
     */
    ReflectionCapabilities.prototype.importUri = function (type) {
        // StaticSymbol
        if (typeof type === 'object' && type['filePath']) {
            return type['filePath'];
        }
        // Runtime type
        return "./" + stringify(type);
    };
    /**
     * @param {?} type
     * @return {?}
     */
    ReflectionCapabilities.prototype.resourceUri = function (type) { return "./" + stringify(type); };
    /**
     * @param {?} name
     * @param {?} moduleUrl
     * @param {?} members
     * @param {?} runtime
     * @return {?}
     */
    ReflectionCapabilities.prototype.resolveIdentifier = function (name, moduleUrl, members, runtime) {
        return runtime;
    };
    /**
     * @param {?} enumIdentifier
     * @param {?} name
     * @return {?}
     */
    ReflectionCapabilities.prototype.resolveEnum = function (enumIdentifier, name) { return enumIdentifier[name]; };
    return ReflectionCapabilities;
}());
/**
 * @param {?} decoratorInvocations
 * @return {?}
 */
function convertTsickleDecoratorIntoMetadata(decoratorInvocations) {
    if (!decoratorInvocations) {
        return [];
    }
    return decoratorInvocations.map(function (decoratorInvocation) {
        var /** @type {?} */ decoratorType = decoratorInvocation.type;
        var /** @type {?} */ annotationCls = decoratorType.annotationCls;
        var /** @type {?} */ annotationArgs = decoratorInvocation.args ? decoratorInvocation.args : [];
        return new (annotationCls.bind.apply(annotationCls, [void 0].concat(annotationArgs)))();
    });
}
/**
 * @param {?} ctor
 * @return {?}
 */
function getParentCtor(ctor) {
    var /** @type {?} */ parentProto = Object.getPrototypeOf(ctor.prototype);
    var /** @type {?} */ parentCtor = parentProto ? parentProto.constructor : null;
    // Note: We always use `Object` as the null value
    // to simplify checking later on.
    return parentCtor || Object;
}
/**
 * Provides read-only access to reflection data about symbols. Used internally by Angular
 * to power dependency injection and compilation.
 * @abstract
 */
var ReflectorReader = (function () {
    function ReflectorReader() {
    }
    /**
     * @abstract
     * @param {?} typeOrFunc
     * @return {?}
     */
    ReflectorReader.prototype.parameters = function (typeOrFunc) { };
    /**
     * @abstract
     * @param {?} typeOrFunc
     * @return {?}
     */
    ReflectorReader.prototype.annotations = function (typeOrFunc) { };
    /**
     * @abstract
     * @param {?} typeOrFunc
     * @return {?}
     */
    ReflectorReader.prototype.propMetadata = function (typeOrFunc) { };
    /**
     * @abstract
     * @param {?} typeOrFunc
     * @return {?}
     */
    ReflectorReader.prototype.importUri = function (typeOrFunc) { };
    /**
     * @abstract
     * @param {?} typeOrFunc
     * @return {?}
     */
    ReflectorReader.prototype.resourceUri = function (typeOrFunc) { };
    /**
     * @abstract
     * @param {?} name
     * @param {?} moduleUrl
     * @param {?} members
     * @param {?} runtime
     * @return {?}
     */
    ReflectorReader.prototype.resolveIdentifier = function (name, moduleUrl, members, runtime) { };
    /**
     * @abstract
     * @param {?} identifier
     * @param {?} name
     * @return {?}
     */
    ReflectorReader.prototype.resolveEnum = function (identifier, name) { };
    return ReflectorReader;
}());
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
var Reflector = (function (_super) {
    __extends(Reflector, _super);
    /**
     * @param {?} reflectionCapabilities
     */
    function Reflector(reflectionCapabilities) {
        var _this = _super.call(this) || this;
        _this.reflectionCapabilities = reflectionCapabilities;
        return _this;
    }
    /**
     * @param {?} caps
     * @return {?}
     */
    Reflector.prototype.updateCapabilities = function (caps) { this.reflectionCapabilities = caps; };
    /**
     * @param {?} type
     * @return {?}
     */
    Reflector.prototype.factory = function (type) { return this.reflectionCapabilities.factory(type); };
    /**
     * @param {?} typeOrFunc
     * @return {?}
     */
    Reflector.prototype.parameters = function (typeOrFunc) {
        return this.reflectionCapabilities.parameters(typeOrFunc);
    };
    /**
     * @param {?} typeOrFunc
     * @return {?}
     */
    Reflector.prototype.annotations = function (typeOrFunc) {
        return this.reflectionCapabilities.annotations(typeOrFunc);
    };
    /**
     * @param {?} typeOrFunc
     * @return {?}
     */
    Reflector.prototype.propMetadata = function (typeOrFunc) {
        return this.reflectionCapabilities.propMetadata(typeOrFunc);
    };
    /**
     * @param {?} type
     * @param {?} lcProperty
     * @return {?}
     */
    Reflector.prototype.hasLifecycleHook = function (type, lcProperty) {
        return this.reflectionCapabilities.hasLifecycleHook(type, lcProperty);
    };
    /**
     * @param {?} name
     * @return {?}
     */
    Reflector.prototype.getter = function (name) { return this.reflectionCapabilities.getter(name); };
    /**
     * @param {?} name
     * @return {?}
     */
    Reflector.prototype.setter = function (name) { return this.reflectionCapabilities.setter(name); };
    /**
     * @param {?} name
     * @return {?}
     */
    Reflector.prototype.method = function (name) { return this.reflectionCapabilities.method(name); };
    /**
     * @param {?} type
     * @return {?}
     */
    Reflector.prototype.importUri = function (type) { return this.reflectionCapabilities.importUri(type); };
    /**
     * @param {?} type
     * @return {?}
     */
    Reflector.prototype.resourceUri = function (type) { return this.reflectionCapabilities.resourceUri(type); };
    /**
     * @param {?} name
     * @param {?} moduleUrl
     * @param {?} members
     * @param {?} runtime
     * @return {?}
     */
    Reflector.prototype.resolveIdentifier = function (name, moduleUrl, members, runtime) {
        return this.reflectionCapabilities.resolveIdentifier(name, moduleUrl, members, runtime);
    };
    /**
     * @param {?} identifier
     * @param {?} name
     * @return {?}
     */
    Reflector.prototype.resolveEnum = function (identifier, name) {
        return this.reflectionCapabilities.resolveEnum(identifier, name);
    };
    return Reflector;
}(ReflectorReader));
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
var reflector = new Reflector(new ReflectionCapabilities());
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
var Inject = makeParamDecorator('Inject', [['token', undefined]]);
/**
 * Optional decorator and metadata.
 *
 * \@stable
 * \@Annotation
 */
var Optional = makeParamDecorator('Optional', []);
/**
 * Injectable decorator and metadata.
 *
 * \@stable
 * \@Annotation
 */
var Injectable = makeDecorator('Injectable', []);
/**
 * Self decorator and metadata.
 *
 * \@stable
 * \@Annotation
 */
var Self = makeParamDecorator('Self', []);
/**
 * SkipSelf decorator and metadata.
 *
 * \@stable
 * \@Annotation
 */
var SkipSelf = makeParamDecorator('SkipSelf', []);
/**
 * Host decorator and metadata.
 *
 * \@stable
 * \@Annotation
 */
var Host = makeParamDecorator('Host', []);
var ComponentResolver = (function () {
    /**
     * @param {?=} _reflector
     */
    function ComponentResolver(_reflector) {
        if (_reflector === void 0) { _reflector = reflector; }
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
    ComponentResolver.prototype.resolve = function (type, throwIfNotFound) {
        if (throwIfNotFound === void 0) { throwIfNotFound = true; }
        var /** @type {?} */ resolved = this._resolved.get(type);
        if (resolved) {
            return resolved;
        }
        var /** @type {?} */ metadata = ListWrapper.findLast(this._reflector.annotations(type), function (obj) { return obj instanceof Component; });
        if (metadata) {
            var /** @type {?} */ propertyMetadata = this._reflector.propMetadata(type);
            return this._mergeWithPropertyMetadata(metadata, propertyMetadata, type);
        }
        else {
            if (throwIfNotFound) {
                throw new Error("No Component metadata found for '" + stringify(type) + "'.");
            }
            return null;
        }
    };
    /**
     * @param {?} meta
     * @param {?} propertyMetadata
     * @param {?} type
     * @return {?}
     */
    ComponentResolver.prototype._mergeWithPropertyMetadata = function (meta, propertyMetadata, type) {
        var /** @type {?} */ host = {};
        var /** @type {?} */ childs = {};
        Object.keys(propertyMetadata).forEach(function (propName) {
            var /** @type {?} */ hostListeners = propertyMetadata[propName]
                .filter(function (a) { return a && a instanceof HostListener; });
            hostListeners.forEach(function (hostListener) {
                var /** @type {?} */ args = hostListener.args || [];
                host["(" + hostListener.eventName + ")"] = propName + "(" + args.join(',') + ")";
            });
            var /** @type {?} */ childListeners = propertyMetadata[propName]
                .filter(function (a) { return a && a instanceof ChildListener; });
            childListeners.forEach(function (childListener) {
                var /** @type {?} */ args = childListener.args || [];
                childs[childListener.selector + ";(" + childListener.eventName + ")"] =
                    propName + "(" + args.join(',') + ")";
            });
        });
        var /** @type {?} */ resolved = new Component({
            selector: meta.selector,
            host: meta.host ? StringMapWrapper.merge(meta.host, host) : host,
            childs: meta.childs ? StringMapWrapper.merge(meta.childs, childs) : childs,
            providers: meta.providers,
            components: meta.components
        });
        this._resolved.set(type, resolved);
        return resolved;
    };
    return ComponentResolver;
}());
ComponentResolver.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
ComponentResolver.ctorParameters = function () { return [
    { type: ReflectorReader, },
]; };
/**
 * Convenience to throw an Error with 'unimplemented' as the message.
 * @return {?}
 */
var BaseError = (function (_super) {
    __extends(BaseError, _super);
    /**
     * @param {?} message
     */
    function BaseError(message) {
        var _this = _super.call(this, message) || this;
        // Errors don't use current this, instead they create a new instance.
        // We have to do forward all of our api to the nativeInstance.
        var nativeError = new Error(message);
        _this._nativeError = nativeError;
        return _this;
    }
    Object.defineProperty(BaseError.prototype, "message", {
        /**
         * @return {?}
         */
        get: function () { return this._nativeError.message; },
        /**
         * @param {?} message
         * @return {?}
         */
        set: function (message) { this._nativeError.message = message; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseError.prototype, "name", {
        /**
         * @return {?}
         */
        get: function () { return this._nativeError.name; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseError.prototype, "stack", {
        /**
         * @return {?}
         */
        get: function () { return ((this._nativeError)).stack; },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) { ((this._nativeError)).stack = value; },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    BaseError.prototype.toString = function () { return this._nativeError.toString(); };
    return BaseError;
}(Error));
var WrappedError = (function (_super) {
    __extends(WrappedError, _super);
    /**
     * @param {?} message
     * @param {?} error
     */
    function WrappedError(message, error) {
        var _this = _super.call(this, message + " caused by: " + (error instanceof Error ? error.message : error)) || this;
        _this.originalError = error;
        return _this;
    }
    Object.defineProperty(WrappedError.prototype, "stack", {
        /**
         * @return {?}
         */
        get: function () {
            return (((this.originalError instanceof Error ? this.originalError : this._nativeError)))
                .stack;
        },
        enumerable: true,
        configurable: true
    });
    return WrappedError;
}(BaseError));
var PlatformAlreadyExistsError = (function (_super) {
    __extends(PlatformAlreadyExistsError, _super);
    function PlatformAlreadyExistsError() {
        return _super.call(this, "A platform already exists. Destroy it first before creating this one.") || this;
    }
    return PlatformAlreadyExistsError;
}(BaseError));
var _THROW_IF_NOT_FOUND = new Object();
var THROW_IF_NOT_FOUND = _THROW_IF_NOT_FOUND;
var _NullInjector = (function () {
    function _NullInjector() {
    }
    /**
     * @param {?} token
     * @param {?=} notFoundValue
     * @return {?}
     */
    _NullInjector.prototype.get = function (token, notFoundValue) {
        if (notFoundValue === void 0) { notFoundValue = _THROW_IF_NOT_FOUND; }
        if (notFoundValue === _THROW_IF_NOT_FOUND) {
            throw new Error("No provider for " + stringify(token) + "!");
        }
        return notFoundValue;
    };
    return _NullInjector;
}());
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
var Injector = (function () {
    function Injector() {
    }
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
    Injector.prototype.get = function (token, notFoundValue) { };
    /**
     * @deprecated from v4.0.0 use Type<T> or InjectToken<T>
     * @suppress {duplicate}
     * @abstract
     * @param {?} token
     * @param {?=} notFoundValue
     * @return {?}
     */
    Injector.prototype.get = function (token, notFoundValue) { };
    return Injector;
}());
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
    var /** @type {?} */ res = [];
    for (var /** @type {?} */ i = 0; i < keys.length; ++i) {
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
        var /** @type {?} */ reversed = findFirstClosedCycle(keys.slice().reverse());
        var /** @type {?} */ tokenStrs = reversed.map(function (k) { return stringify(k.token); });
        return ' (' + tokenStrs.join(' -> ') + ')';
    }
    return '';
}
/**
 * Base class for all errors arising from misconfigured providers.
 * \@stable
 */
var AbstractProviderError = (function (_super) {
    __extends(AbstractProviderError, _super);
    /**
     * @param {?} injector
     * @param {?} key
     * @param {?} constructResolvingMessage
     */
    function AbstractProviderError(injector, key, constructResolvingMessage) {
        var _this = _super.call(this, 'DI Error') || this;
        _this.keys = [key];
        _this.injectors = [injector];
        _this.constructResolvingMessage = constructResolvingMessage;
        _this.message = _this.constructResolvingMessage(_this.keys);
        return _this;
    }
    /**
     * @param {?} injector
     * @param {?} key
     * @return {?}
     */
    AbstractProviderError.prototype.addKey = function (injector, key) {
        this.injectors.push(injector);
        this.keys.push(key);
        this.message = this.constructResolvingMessage(this.keys);
    };
    return AbstractProviderError;
}(BaseError));
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
var NoProviderError = (function (_super) {
    __extends(NoProviderError, _super);
    /**
     * @param {?} injector
     * @param {?} key
     */
    function NoProviderError(injector, key) {
        return _super.call(this, injector, key, function (keys) {
            var first = stringify(keys[0].token);
            return "No provider for " + first + "!" + constructResolvingPath(keys);
        }) || this;
    }
    return NoProviderError;
}(AbstractProviderError));
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
var CyclicDependencyError = (function (_super) {
    __extends(CyclicDependencyError, _super);
    /**
     * @param {?} injector
     * @param {?} key
     */
    function CyclicDependencyError(injector, key) {
        return _super.call(this, injector, key, function (keys) {
            return "Cannot instantiate cyclic dependency!" + constructResolvingPath(keys);
        }) || this;
    }
    return CyclicDependencyError;
}(AbstractProviderError));
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
var InstantiationError = (function (_super) {
    __extends(InstantiationError, _super);
    /**
     * @param {?} injector
     * @param {?} originalException
     * @param {?} originalStack
     * @param {?} key
     */
    function InstantiationError(injector, originalException, originalStack, key) {
        var _this = _super.call(this, 'DI Error', originalException) || this;
        _this.keys = [key];
        _this.injectors = [injector];
        return _this;
    }
    /**
     * @param {?} injector
     * @param {?} key
     * @return {?}
     */
    InstantiationError.prototype.addKey = function (injector, key) {
        this.injectors.push(injector);
        this.keys.push(key);
    };
    Object.defineProperty(InstantiationError.prototype, "message", {
        /**
         * @return {?}
         */
        get: function () {
            var /** @type {?} */ first = stringify(this.keys[0].token);
            return this.originalError.message + ": Error during instantiation " +
                ("of " + first + "!" + constructResolvingPath(this.keys) + ".");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InstantiationError.prototype, "causeKey", {
        /**
         * @return {?}
         */
        get: function () { return this.keys[0]; },
        enumerable: true,
        configurable: true
    });
    return InstantiationError;
}(WrappedError));
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
var InvalidProviderError = (function (_super) {
    __extends(InvalidProviderError, _super);
    /**
     * @param {?} provider
     */
    function InvalidProviderError(provider) {
        return _super.call(this, "Invalid provider - only instances of Provider and Type are allowed, got: " + provider) || this;
    }
    return InvalidProviderError;
}(BaseError));
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
var NoAnnotationError = (function (_super) {
    __extends(NoAnnotationError, _super);
    /**
     * @param {?} typeOrFunc
     * @param {?} params
     */
    function NoAnnotationError(typeOrFunc, params) {
        return _super.call(this, NoAnnotationError._genMessage(typeOrFunc, params)) || this;
    }
    /**
     * @param {?} typeOrFunc
     * @param {?} params
     * @return {?}
     */
    NoAnnotationError._genMessage = function (typeOrFunc, params) {
        var /** @type {?} */ signature = [];
        for (var /** @type {?} */ i = 0, /** @type {?} */ ii = params.length; i < ii; i++) {
            var /** @type {?} */ parameter = params[i];
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
    };
    return NoAnnotationError;
}(BaseError));
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
var OutOfBoundsError = (function (_super) {
    __extends(OutOfBoundsError, _super);
    /**
     * @param {?} index
     */
    function OutOfBoundsError(index) {
        return _super.call(this, "Index " + index + " is out-of-bounds.") || this;
    }
    return OutOfBoundsError;
}(BaseError));
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
var MixingMultiProvidersWithRegularProvidersError = (function (_super) {
    __extends(MixingMultiProvidersWithRegularProvidersError, _super);
    /**
     * @param {?} provider1
     * @param {?} provider2
     */
    function MixingMultiProvidersWithRegularProvidersError(provider1, provider2) {
        return _super.call(this, 'Cannot mix multi providers and regular providers, got: ' + provider1.toString() + ' ' +
            provider2.toString()) || this;
    }
    return MixingMultiProvidersWithRegularProvidersError;
}(BaseError));
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
var ReflectiveKey = (function () {
    /**
     * Private
     * @param {?} token
     * @param {?} id
     */
    function ReflectiveKey(token, id) {
        this.token = token;
        this.id = id;
        if (!token) {
            throw new Error('Token must be defined!');
        }
    }
    Object.defineProperty(ReflectiveKey.prototype, "displayName", {
        /**
         * Returns a stringified token.
         * @return {?}
         */
        get: function () { return stringify(this.token); },
        enumerable: true,
        configurable: true
    });
    /**
     * Retrieves a `Key` for a token.
     * @param {?} token
     * @return {?}
     */
    ReflectiveKey.get = function (token) {
        return _globalKeyRegistry.get(resolveForwardRef(token));
    };
    Object.defineProperty(ReflectiveKey, "numberOfKeys", {
        /**
         * @return {?} the number of keys registered in the system.
         */
        get: function () { return _globalKeyRegistry.numberOfKeys; },
        enumerable: true,
        configurable: true
    });
    return ReflectiveKey;
}());
/**
 * \@internal
 */
var KeyRegistry = (function () {
    function KeyRegistry() {
        this._allKeys = new Map();
    }
    /**
     * @param {?} token
     * @return {?}
     */
    KeyRegistry.prototype.get = function (token) {
        if (token instanceof ReflectiveKey)
            return token;
        if (this._allKeys.has(token)) {
            return this._allKeys.get(token);
        }
        var /** @type {?} */ newKey = new ReflectiveKey(token, ReflectiveKey.numberOfKeys);
        this._allKeys.set(token, newKey);
        return newKey;
    };
    Object.defineProperty(KeyRegistry.prototype, "numberOfKeys", {
        /**
         * @return {?}
         */
        get: function () { return this._allKeys.size; },
        enumerable: true,
        configurable: true
    });
    return KeyRegistry;
}());
var _globalKeyRegistry = new KeyRegistry();
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
var ReflectiveDependency = (function () {
    /**
     * @param {?} key
     * @param {?} optional
     * @param {?} visibility
     */
    function ReflectiveDependency(key, optional, visibility) {
        this.key = key;
        this.optional = optional;
        this.visibility = visibility;
    }
    /**
     * @param {?} key
     * @return {?}
     */
    ReflectiveDependency.fromKey = function (key) {
        return new ReflectiveDependency(key, false, null);
    };
    return ReflectiveDependency;
}());
var _EMPTY_LIST = [];
var ResolvedReflectiveProvider_ = (function () {
    /**
     * @param {?} key
     * @param {?} resolvedFactories
     * @param {?} multiProvider
     */
    function ResolvedReflectiveProvider_(key, resolvedFactories, multiProvider) {
        this.key = key;
        this.resolvedFactories = resolvedFactories;
        this.multiProvider = multiProvider;
    }
    Object.defineProperty(ResolvedReflectiveProvider_.prototype, "resolvedFactory", {
        /**
         * @return {?}
         */
        get: function () { return this.resolvedFactories[0]; },
        enumerable: true,
        configurable: true
    });
    return ResolvedReflectiveProvider_;
}());
/**
 * An internal resolved representation of a factory function created by resolving {\@link
 * Provider}.
 * \@experimental
 */
var ResolvedReflectiveFactory = (function () {
    /**
     * @param {?} factory
     * @param {?} dependencies
     */
    function ResolvedReflectiveFactory(factory, dependencies) {
        this.factory = factory;
        this.dependencies = dependencies;
    }
    return ResolvedReflectiveFactory;
}());
/**
 * Resolve a single provider.
 * @param {?} provider
 * @return {?}
 */
function resolveReflectiveFactory(provider) {
    var /** @type {?} */ factoryFn;
    var /** @type {?} */ resolvedDeps;
    if (provider.useClass) {
        var /** @type {?} */ useClass = resolveForwardRef(provider.useClass);
        factoryFn = reflector.factory(useClass);
        resolvedDeps = _dependenciesFor(useClass);
    }
    else if (provider.useExisting) {
        factoryFn = function (aliasInstance) { return aliasInstance; };
        resolvedDeps = [ReflectiveDependency.fromKey(ReflectiveKey.get(provider.useExisting))];
    }
    else if (provider.useFactory) {
        factoryFn = provider.useFactory;
        resolvedDeps = constructDependencies(provider.useFactory, provider.deps);
    }
    else {
        factoryFn = function () { return provider.useValue; };
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
    var /** @type {?} */ normalized = _normalizeProviders(providers, []);
    var /** @type {?} */ resolved = normalized.map(resolveReflectiveProvider);
    var /** @type {?} */ resolvedProviderMap = mergeResolvedReflectiveProviders(resolved, new Map());
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
    for (var /** @type {?} */ i = 0; i < providers.length; i++) {
        var /** @type {?} */ provider = providers[i];
        var /** @type {?} */ existing = normalizedProvidersMap.get(provider.key.id);
        if (existing) {
            if (provider.multiProvider !== existing.multiProvider) {
                throw new MixingMultiProvidersWithRegularProvidersError(existing, provider);
            }
            if (provider.multiProvider) {
                for (var /** @type {?} */ j = 0; j < provider.resolvedFactories.length; j++) {
                    existing.resolvedFactories.push(provider.resolvedFactories[j]);
                }
            }
            else {
                normalizedProvidersMap.set(provider.key.id, provider);
            }
        }
        else {
            var /** @type {?} */ resolvedProvider = void 0;
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
    providers.forEach(function (b) {
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
        var /** @type {?} */ params_1 = dependencies.map(function (t) { return [t]; });
        return dependencies.map(function (t) { return _extractToken(typeOrFunc, t, params_1); });
    }
}
/**
 * @param {?} typeOrFunc
 * @return {?}
 */
function _dependenciesFor(typeOrFunc) {
    var /** @type {?} */ params = reflector.parameters(typeOrFunc);
    if (!params)
        return [];
    if (params.some(function (p) { return p == null; })) {
        throw new NoAnnotationError(typeOrFunc, params);
    }
    return params.map(function (p) { return _extractToken(typeOrFunc, p, params); });
}
/**
 * @param {?} typeOrFunc
 * @param {?} metadata
 * @param {?} params
 * @return {?}
 */
function _extractToken(typeOrFunc, metadata, params) {
    var /** @type {?} */ token = null;
    var /** @type {?} */ optional = false;
    if (!Array.isArray(metadata)) {
        if (metadata instanceof Inject) {
            return _createDependency(metadata.token, optional, null);
        }
        else {
            return _createDependency(metadata, optional, null);
        }
    }
    var /** @type {?} */ visibility = null;
    for (var /** @type {?} */ i = 0; i < metadata.length; ++i) {
        var /** @type {?} */ paramMetadata = metadata[i];
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
var UNDEFINED = new Object();
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
var ReflectiveInjector = (function () {
    function ReflectiveInjector() {
    }
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
    ReflectiveInjector.resolve = function (providers) {
        return resolveReflectiveProviders(providers);
    };
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
    ReflectiveInjector.resolveAndCreate = function (providers, parent) {
        if (parent === void 0) { parent = null; }
        var /** @type {?} */ ResolvedReflectiveProviders = ReflectiveInjector.resolve(providers);
        return ReflectiveInjector.fromResolvedProviders(ResolvedReflectiveProviders, parent);
    };
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
    ReflectiveInjector.fromResolvedProviders = function (providers, parent) {
        if (parent === void 0) { parent = null; }
        return new ReflectiveInjector_(providers, parent);
    };
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
    ReflectiveInjector.prototype.parent = function () { };
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
    ReflectiveInjector.prototype.resolveAndCreateChild = function (providers) { };
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
    ReflectiveInjector.prototype.createChildFromResolved = function (providers) { };
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
    ReflectiveInjector.prototype.resolveAndInstantiate = function (provider) { };
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
    ReflectiveInjector.prototype.instantiateResolved = function (provider) { };
    /**
     * @abstract
     * @param {?} token
     * @param {?=} notFoundValue
     * @return {?}
     */
    ReflectiveInjector.prototype.get = function (token, notFoundValue) { };
    return ReflectiveInjector;
}());
var ReflectiveInjector_ = (function () {
    /**
     * Private
     * @param {?} _providers
     * @param {?=} _parent
     */
    function ReflectiveInjector_(_providers, _parent) {
        if (_parent === void 0) { _parent = null; }
        /**
         * \@internal
         */
        this._constructionCounter = 0;
        this._providers = _providers;
        this._parent = _parent;
        var len = _providers.length;
        this.keyIds = new Array(len);
        this.objs = new Array(len);
        for (var i = 0; i < len; i++) {
            this.keyIds[i] = _providers[i].key.id;
            this.objs[i] = UNDEFINED;
        }
    }
    /**
     * @param {?} token
     * @param {?=} notFoundValue
     * @return {?}
     */
    ReflectiveInjector_.prototype.get = function (token, notFoundValue) {
        if (notFoundValue === void 0) { notFoundValue = THROW_IF_NOT_FOUND; }
        return this._getByKey(ReflectiveKey.get(token), null, notFoundValue);
    };
    Object.defineProperty(ReflectiveInjector_.prototype, "parent", {
        /**
         * @return {?}
         */
        get: function () { return this._parent; },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} providers
     * @return {?}
     */
    ReflectiveInjector_.prototype.resolveAndCreateChild = function (providers) {
        var /** @type {?} */ ResolvedReflectiveProviders = ReflectiveInjector.resolve(providers);
        return this.createChildFromResolved(ResolvedReflectiveProviders);
    };
    /**
     * @param {?} providers
     * @return {?}
     */
    ReflectiveInjector_.prototype.createChildFromResolved = function (providers) {
        var /** @type {?} */ inj = new ReflectiveInjector_(providers);
        inj._parent = this;
        return inj;
    };
    /**
     * @param {?} provider
     * @return {?}
     */
    ReflectiveInjector_.prototype.resolveAndInstantiate = function (provider) {
        return this.instantiateResolved(ReflectiveInjector.resolve([provider])[0]);
    };
    /**
     * @param {?} provider
     * @return {?}
     */
    ReflectiveInjector_.prototype.instantiateResolved = function (provider) {
        return this._instantiateProvider(provider);
    };
    /**
     * @param {?} index
     * @return {?}
     */
    ReflectiveInjector_.prototype.getProviderAtIndex = function (index) {
        if (index < 0 || index >= this._providers.length) {
            throw new OutOfBoundsError(index);
        }
        return this._providers[index];
    };
    /**
     * \@internal
     * @param {?} provider
     * @return {?}
     */
    ReflectiveInjector_.prototype._new = function (provider) {
        if (this._constructionCounter++ > this._getMaxNumberOfObjects()) {
            throw new CyclicDependencyError(this, provider.key);
        }
        return this._instantiateProvider(provider);
    };
    /**
     * @return {?}
     */
    ReflectiveInjector_.prototype._getMaxNumberOfObjects = function () { return this.objs.length; };
    /**
     * @param {?} provider
     * @return {?}
     */
    ReflectiveInjector_.prototype._instantiateProvider = function (provider) {
        if (provider.multiProvider) {
            var /** @type {?} */ res = new Array(provider.resolvedFactories.length);
            for (var /** @type {?} */ i = 0; i < provider.resolvedFactories.length; ++i) {
                res[i] = this._instantiate(provider, provider.resolvedFactories[i]);
            }
            return res;
        }
        else {
            return this._instantiate(provider, provider.resolvedFactories[0]);
        }
    };
    /**
     * @param {?} provider
     * @param {?} ResolvedReflectiveFactory
     * @return {?}
     */
    ReflectiveInjector_.prototype._instantiate = function (provider, ResolvedReflectiveFactory$$1) {
        var _this = this;
        var /** @type {?} */ factory = ResolvedReflectiveFactory$$1.factory;
        var /** @type {?} */ deps;
        try {
            deps =
                ResolvedReflectiveFactory$$1.dependencies.map(function (dep) { return _this._getByReflectiveDependency(dep); });
        }
        catch (e) {
            if (e instanceof AbstractProviderError || e instanceof InstantiationError) {
                e.addKey(this, provider.key);
            }
            throw e;
        }
        var /** @type {?} */ obj;
        try {
            obj = factory.apply(void 0, deps);
        }
        catch (e) {
            throw new InstantiationError(this, e, e.stack, provider.key);
        }
        return obj;
    };
    /**
     * @param {?} dep
     * @return {?}
     */
    ReflectiveInjector_.prototype._getByReflectiveDependency = function (dep) {
        return this._getByKey(dep.key, dep.visibility, dep.optional ? null : THROW_IF_NOT_FOUND);
    };
    /**
     * @param {?} key
     * @param {?} visibility
     * @param {?} notFoundValue
     * @return {?}
     */
    ReflectiveInjector_.prototype._getByKey = function (key, visibility, notFoundValue) {
        if (key === INJECTOR_KEY) {
            return this;
        }
        if (visibility instanceof Self) {
            return this._getByKeySelf(key, notFoundValue);
        }
        else {
            return this._getByKeyDefault(key, notFoundValue, visibility);
        }
    };
    /**
     * @param {?} keyId
     * @return {?}
     */
    ReflectiveInjector_.prototype._getObjByKeyId = function (keyId) {
        for (var /** @type {?} */ i = 0; i < this.keyIds.length; i++) {
            if (this.keyIds[i] === keyId) {
                if (this.objs[i] === UNDEFINED) {
                    this.objs[i] = this._new(this._providers[i]);
                }
                return this.objs[i];
            }
        }
        return UNDEFINED;
    };
    /**
     * \@internal
     * @param {?} key
     * @param {?} notFoundValue
     * @return {?}
     */
    ReflectiveInjector_.prototype._throwOrNull = function (key, notFoundValue) {
        if (notFoundValue !== THROW_IF_NOT_FOUND) {
            return notFoundValue;
        }
        else {
            throw new NoProviderError(this, key);
        }
    };
    /**
     * \@internal
     * @param {?} key
     * @param {?} notFoundValue
     * @return {?}
     */
    ReflectiveInjector_.prototype._getByKeySelf = function (key, notFoundValue) {
        var /** @type {?} */ obj = this._getObjByKeyId(key.id);
        return (obj !== UNDEFINED) ? obj : this._throwOrNull(key, notFoundValue);
    };
    /**
     * \@internal
     * @param {?} key
     * @param {?} notFoundValue
     * @param {?} visibility
     * @return {?}
     */
    ReflectiveInjector_.prototype._getByKeyDefault = function (key, notFoundValue, visibility) {
        var /** @type {?} */ inj;
        if (visibility instanceof SkipSelf) {
            inj = this._parent;
        }
        else {
            inj = this;
        }
        while (inj instanceof ReflectiveInjector_) {
            var /** @type {?} */ inj_ = (inj);
            var /** @type {?} */ obj = inj_._getObjByKeyId(key.id);
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
    };
    Object.defineProperty(ReflectiveInjector_.prototype, "displayName", {
        /**
         * @return {?}
         */
        get: function () {
            var /** @type {?} */ providers = _mapProviders(this, function (b) { return ' "' + b.key.displayName + '" '; })
                .join(', ');
            return "ReflectiveInjector(providers: [" + providers + "])";
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ReflectiveInjector_.prototype.toString = function () { return this.displayName; };
    return ReflectiveInjector_;
}());
var INJECTOR_KEY = ReflectiveKey.get(Injector);
/**
 * @param {?} injector
 * @param {?} fn
 * @return {?}
 */
function _mapProviders(injector, fn) {
    var /** @type {?} */ res = new Array(injector._providers.length);
    for (var /** @type {?} */ i = 0; i < injector._providers.length; ++i) {
        res[i] = fn(injector.getProviderAtIndex(i));
    }
    return res;
}
var _platform;
/**
 * @abstract
 */
var PlatformRef = (function () {
    function PlatformRef() {
    }
    /**
     * @abstract
     * @template C
     * @param {?} component
     * @return {?}
     */
    PlatformRef.prototype.bootstrapComponent = function (component) { };
    /**
     * @abstract
     * @return {?}
     */
    PlatformRef.prototype.injector = function () { };
    /**
     * @abstract
     * @param {?} callback
     * @return {?}
     */
    PlatformRef.prototype.onDestroy = function (callback) { };
    /**
     * @abstract
     * @return {?}
     */
    PlatformRef.prototype.destroy = function () { };
    /**
     * @abstract
     * @return {?}
     */
    PlatformRef.prototype.destroyed = function () { };
    return PlatformRef;
}());
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
function createPlatformFactory(providers) {
    if (providers === void 0) { providers = []; }
    return function (extraProviders) {
        if (extraProviders === void 0) { extraProviders = []; }
        if (getPlatform()) {
            throw new PlatformAlreadyExistsError();
        }
        var /** @type {?} */ injector = ReflectiveInjector.resolveAndCreate(providers.concat(extraProviders));
        _platform = injector.get(PlatformRef);
        return _platform;
    };
}
var ComponentFactoryResolver = (function () {
    /**
     * @param {?} factories
     * @param {?=} _parent
     */
    function ComponentFactoryResolver(factories, _parent) {
        this._parent = _parent;
        this._factories = new Map();
        for (var i = 0; i < factories.length; i++) {
            var factory = factories[i];
            this._factories.set(factory.componentType, factory);
        }
    }
    /**
     * @template C
     * @param {?} componentType
     * @return {?}
     */
    ComponentFactoryResolver.prototype.resolveComponentFactory = function (componentType) {
        var /** @type {?} */ result = this._factories.get(componentType);
        if (!result) {
            if (!this._parent) {
                throw new CouldNotResolveFactoryError(componentType);
            }
            result = this._parent.resolveComponentFactory(componentType);
        }
        return result;
    };
    return ComponentFactoryResolver;
}());
var CouldNotResolveFactoryError = (function (_super) {
    __extends(CouldNotResolveFactoryError, _super);
    /**
     * @param {?} type
     */
    function CouldNotResolveFactoryError(type) {
        return _super.call(this, "Could not resolve factory for \"" + stringify(type) + "! " +
            "Did you provide the component to the bootstrap function?") || this;
    }
    return CouldNotResolveFactoryError;
}(BaseError));
/**
 * @abstract
 */
var ComponentFactory = (function () {
    function ComponentFactory() {
    }
    /**
     * @abstract
     * @return {?}
     */
    ComponentFactory.prototype.selector = function () { };
    /**
     * @abstract
     * @return {?}
     */
    ComponentFactory.prototype.componentType = function () { };
    /**
     * Creates a new component.
     * @abstract
     * @param {?} injector
     * @param {?=} rootSelectorOrNode
     * @return {?}
     */
    ComponentFactory.prototype.create = function (injector, rootSelectorOrNode) { };
    return ComponentFactory;
}());
/**
 * This is a reference of a Mojiito Application.
 *
 * @export
 * \@class ApplicationRef
 */
var ApplicationRef = (function () {
    /**
     * @param {?} injector
     * @param {?} _componentFactoryResolver
     */
    function ApplicationRef(injector, _componentFactoryResolver) {
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
    ApplicationRef.prototype.bootstrap = function (componentOrFactory) {
        var _this = this;
        var /** @type {?} */ componentFactory;
        if (componentOrFactory instanceof ComponentFactory) {
            componentFactory = componentOrFactory;
        }
        else {
            componentFactory = this._componentFactoryResolver.resolveComponentFactory(componentOrFactory);
        }
        this._rootComponentTypes.push(componentFactory.componentType);
        var /** @type {?} */ compRef = componentFactory.create(this.injector, componentFactory.selector);
        compRef.onDestroy(function () { _this._unloadComponent(compRef); });
        this._loadComponent(compRef);
        return compRef;
    };
    /**
     * @param {?} viewRef
     * @return {?}
     */
    ApplicationRef.prototype.attachView = function (viewRef) {
        var /** @type {?} */ view = ((viewRef));
        this._views.push(view);
        view.attachToAppRef(this);
    };
    /**
     * @param {?} viewRef
     * @return {?}
     */
    ApplicationRef.prototype.detachView = function (viewRef) {
        var /** @type {?} */ view = ((viewRef));
        ListWrapper.remove(this._views, view);
        view.detachFromAppRef();
    };
    /**
     * @param {?} componentRef
     * @return {?}
     */
    ApplicationRef.prototype._loadComponent = function (componentRef) {
        this.attachView(componentRef.hostView);
        // this.tick();
        this._rootComponents.push(componentRef);
    };
    /**
     * @param {?} componentRef
     * @return {?}
     */
    ApplicationRef.prototype._unloadComponent = function (componentRef) {
        this.detachView(componentRef.hostView);
        ListWrapper.remove(this._rootComponents, componentRef);
    };
    /**
     * @return {?}
     */
    ApplicationRef.prototype.onDestroy = function () {
        this._views.slice().forEach(function (view) { return view.destroy(); });
    };
    return ApplicationRef;
}());
ApplicationRef.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
ApplicationRef.ctorParameters = function () { return [
    { type: Injector, },
    { type: ComponentFactoryResolver, },
]; };
/**
 * Represents an instance of a Component created via a ComponentFactory.
 * `ComponentRef` provides access to the Component Instance as well other objects related to this
 * Component Instance and allows you to destroy the Component Instance via the destroy method.
 *
 * @export
 * \@class ComponentRef
 * @abstract
 */
var ComponentRef = (function () {
    function ComponentRef() {
    }
    /**
     * Location of the component instance
     * @abstract
     * @return {?}
     */
    ComponentRef.prototype.location = function () { };
    /**
     * The injector on which the component instance exists.
     * @abstract
     * @return {?}
     */
    ComponentRef.prototype.injector = function () { };
    /**
     * The instance of the Component.
     * @abstract
     * @return {?}
     */
    ComponentRef.prototype.instance = function () { };
    /**
     * @abstract
     * @return {?}
     */
    ComponentRef.prototype.hostView = function () { };
    /**
     * The component type.
     * @abstract
     * @return {?}
     */
    ComponentRef.prototype.componentType = function () { };
    /**
     * Destroys the component instance and all of the data structures associated with it.
     * @abstract
     * @return {?}
     */
    ComponentRef.prototype.destroy = function () { };
    /**
     * Allows to register a callback that will be called when the component is destroyed.
     * @abstract
     * @param {?} callback
     * @return {?}
     */
    ComponentRef.prototype.onDestroy = function (callback) { };
    return ComponentRef;
}());
/**
 * \@experimental
 * @abstract
 */
var RendererFactory = (function () {
    function RendererFactory() {
    }
    /**
     * @abstract
     * @param {?} hostElement
     * @param {?} type
     * @return {?}
     */
    RendererFactory.prototype.createRenderer = function (hostElement, type) { };
    return RendererFactory;
}());
/**
 * @abstract
 */
var Renderer = (function () {
    function Renderer() {
    }
    /**
     * @abstract
     * @param {?} context
     * @return {?}
     */
    Renderer.prototype.parse = function (context) { };
    /**
     * @abstract
     * @return {?}
     */
    Renderer.prototype.destroy = function () { };
    /**
     * @abstract
     * @param {?} name
     * @param {?=} namespace
     * @return {?}
     */
    Renderer.prototype.createElement = function (name, namespace) { };
    /**
     * @abstract
     * @param {?} value
     * @return {?}
     */
    Renderer.prototype.createComment = function (value) { };
    /**
     * @abstract
     * @param {?} value
     * @return {?}
     */
    Renderer.prototype.createText = function (value) { };
    /**
     * @abstract
     * @param {?} node
     * @return {?}
     */
    Renderer.prototype.destroyNode = function (node) { };
    /**
     * @abstract
     * @param {?} parent
     * @param {?} newChild
     * @return {?}
     */
    Renderer.prototype.appendChild = function (parent, newChild) { };
    /**
     * @abstract
     * @param {?} parent
     * @param {?} newChild
     * @param {?} refChild
     * @return {?}
     */
    Renderer.prototype.insertBefore = function (parent, newChild, refChild) { };
    /**
     * @abstract
     * @param {?} parent
     * @param {?} oldChild
     * @return {?}
     */
    Renderer.prototype.removeChild = function (parent, oldChild) { };
    /**
     * @abstract
     * @param {?} selectorOrNode
     * @return {?}
     */
    Renderer.prototype.selectRootElement = function (selectorOrNode) { };
    /**
     * @abstract
     * @param {?} node
     * @return {?}
     */
    Renderer.prototype.parentNode = function (node) { };
    /**
     * @abstract
     * @param {?} node
     * @return {?}
     */
    Renderer.prototype.nextSibling = function (node) { };
    /**
     * @abstract
     * @param {?} el
     * @param {?} name
     * @param {?} value
     * @param {?=} namespace
     * @return {?}
     */
    Renderer.prototype.setAttribute = function (el, name, value, namespace) { };
    /**
     * @abstract
     * @param {?} el
     * @param {?} name
     * @param {?=} namespace
     * @return {?}
     */
    Renderer.prototype.removeAttribute = function (el, name, namespace) { };
    /**
     * @abstract
     * @param {?} el
     * @param {?} name
     * @return {?}
     */
    Renderer.prototype.addClass = function (el, name) { };
    /**
     * @abstract
     * @param {?} el
     * @param {?} name
     * @return {?}
     */
    Renderer.prototype.removeClass = function (el, name) { };
    /**
     * @abstract
     * @param {?} el
     * @param {?} style
     * @param {?} value
     * @param {?} hasVendorPrefix
     * @param {?} hasImportant
     * @return {?}
     */
    Renderer.prototype.setStyle = function (el, style, value, hasVendorPrefix, hasImportant) { };
    /**
     * @abstract
     * @param {?} el
     * @param {?} style
     * @param {?} hasVendorPrefix
     * @return {?}
     */
    Renderer.prototype.removeStyle = function (el, style, hasVendorPrefix) { };
    /**
     * @abstract
     * @param {?} el
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    Renderer.prototype.setProperty = function (el, name, value) { };
    /**
     * @abstract
     * @param {?} node
     * @param {?} value
     * @return {?}
     */
    Renderer.prototype.setValue = function (node, value) { };
    /**
     * @abstract
     * @param {?} target
     * @param {?} eventName
     * @param {?} callback
     * @return {?}
     */
    Renderer.prototype.listen = function (target, eventName, callback) { };
    return Renderer;
}());
var ElementRef = (function () {
    /**
     * @param {?} nativeElement
     */
    function ElementRef(nativeElement) {
        this.nativeElement = nativeElement;
    }
    return ElementRef;
}());
/**
 * @abstract
 */
var ViewContainerRef = (function () {
    function ViewContainerRef() {
    }
    /**
     * @abstract
     * @return {?}
     */
    ViewContainerRef.prototype.anchorElement = function () { };
    /**
     * @abstract
     * @return {?}
     */
    ViewContainerRef.prototype.injector = function () { };
    /**
     * @abstract
     * @return {?}
     */
    ViewContainerRef.prototype.parentInjector = function () { };
    /**
     * Destroys all Views in this container.
     * @abstract
     * @return {?}
     */
    ViewContainerRef.prototype.clear = function () { };
    /**
     * Returns the ViewRef for the View located in this container at the specified index.
     * @abstract
     * @param {?} index
     * @return {?}
     */
    ViewContainerRef.prototype.get = function (index) { };
    /**
     * Returns the number of Views currently attached to this container.
     * @abstract
     * @return {?}
     */
    ViewContainerRef.prototype.length = function () { };
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
    ViewContainerRef.prototype.createEmbeddedView = function (templateRef, context, index) { };
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
    ViewContainerRef.prototype.createComponent = function (componentFactory, index, injector, projectableNodes) { };
    /**
     * Returns the index of the View, specified via ViewRef, within the current container or
     * `-1` if this container doesn't contain the View.
     * @abstract
     * @param {?} viewRef
     * @return {?}
     */
    ViewContainerRef.prototype.indexOf = function (viewRef) { };
    /**
     * Destroys a View attached to this container at the specified `index`.
     *
     * If `index` is not specified, the last View in the container will be removed.
     * @abstract
     * @param {?=} index
     * @return {?}
     */
    ViewContainerRef.prototype.remove = function (index) { };
    /**
     * Use along with #nsert} to move a View within the current container.
     *
     * If the `index` param is omitted, the last ViewRef is detached.
     * @abstract
     * @param {?=} index
     * @return {?}
     */
    ViewContainerRef.prototype.detach = function (index) { };
    return ViewContainerRef;
}());
/**
 * @param {?} view
 * @param {?} index
 * @return {?}
 */
function asProviderData(view, index) {
    return (view.nodes[index]);
}
var NodeData = (function () {
    function NodeData() {
    }
    return NodeData;
}());
var NOT_CREATED = new Object();
// tslint:disable:variable-name
var _tokenKeyCache = new Map();
var RendererTokenKey = tokenKey(Renderer);
var ElementRefTokenKey = tokenKey(ElementRef);
var ViewContainerRefTokenKey = tokenKey(ViewContainerRef);
// const ChangeDetectorRefTokenKey = tokenKey(ChangeDetectorRef);
var InjectorRefTokenKey = tokenKey(Injector);
/**
 * @param {?} token
 * @return {?}
 */
function tokenKey(token) {
    var /** @type {?} */ key = _tokenKeyCache.get(token);
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
function resolveDep(view, depDef, allowPrivateServices, notFoundValue) {
    if (notFoundValue === void 0) { notFoundValue = Injector.THROW_IF_NOT_FOUND; }
    if (depDef.flags & 8 /* Value */) {
        return depDef.token;
    }
    var /** @type {?} */ startView = view;
    if (depDef.flags & 2 /* Optional */) {
        notFoundValue = null;
    }
    var /** @type {?} */ tokenKey = depDef.tokenKey;
    if (depDef.flags & 1 /* SkipSelf */) {
        allowPrivateServices = false;
        view = view.parent;
    }
    while (view) {
        var /** @type {?} */ def = view.def;
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
                    var /** @type {?} */ providerDef = (allowPrivateServices ? def.allProviders : def.publicProviders)[tokenKey];
                    if (providerDef) {
                        var /** @type {?} */ providerData = asProviderData(view, providerDef.index);
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
    var /** @type {?} */ allowPrivateServices = (def.flags & 4096 /* PrivateProvider */) > 0;
    var /** @type {?} */ providerDef = def.provider;
    var /** @type {?} */ deps = [];
    if (providerDef.deps) {
        deps = providerDef.deps.map(function (d) { return resolveDep(view, d, allowPrivateServices); });
    }
    return providerDef.factory.apply(providerDef, deps);
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
    var /** @type {?} */ rendererFactory = injector.get(RendererFactory);
    var /** @type {?} */ root = createRootData(injector, rendererFactory, rootSelectorOrNode);
    var /** @type {?} */ view = createView(root, null, root.element, def);
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
    var /** @type {?} */ nodes = new Array(def.nodes.length);
    var /** @type {?} */ view = {
        def: def,
        renderElement: renderElement,
        root: root,
        renderer: createRenderer(renderElement, def, parent, root),
        nodes: nodes,
        parent: parent,
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
        for (var /** @type {?} */ i = 0; i < view.disposables.length; i++) {
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
    var /** @type {?} */ def = view.def;
    var /** @type {?} */ nodes = view.nodes;
    var /** @type {?} */ nodeData;
    for (var /** @type {?} */ i = 0; i < def.nodes.length; i++) {
        var /** @type {?} */ nodeDef = def.nodes[i];
        switch (nodeDef.flags & 16512 /* Types */) {
            case 128 /* TypeProvider */: {
                var /** @type {?} */ instance = createProviderInstance(view, nodeDef);
                nodeData = ({ instance: instance });
                break;
            }
            case 16384 /* TypeComponent */: {
                var /** @type {?} */ instance = createProviderInstance(view, nodeDef);
                nodeData = ({ instance: instance });
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
    var /** @type {?} */ renderer = rendererFactory.createRenderer(null, null);
    var /** @type {?} */ element = rootSelectorOrNode;
    if (typeof rootSelectorOrNode === 'string') {
        element = renderer.selectRootElement(rootSelectorOrNode);
    }
    return {
        injector: injector,
        selectorOrNode: rootSelectorOrNode,
        element: element,
        rendererFactory: rendererFactory,
        renderer: renderer
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
    var /** @type {?} */ publicProv = Object.create(null);
    if (publicProviders) {
        resolveReflectiveProviders(publicProviders).forEach(function (p) {
            var /** @type {?} */ resolvedFactory = p.resolvedFactories[0];
            publicProv[tokenKey(p.key)] = {
                factory: resolvedFactory.factory,
                dependencies: resolvedFactory.dependencies,
                multi: p.multiProvider
            };
        });
    }
    viewDef.publicProviders = publicProv;
    // combine to all providers
    var /** @type {?} */ allProviders = Object.create(publicProv);
    viewDef.allProviders = allProviders;
    // resolve component provider
    if (componentProvider) {
        var /** @type {?} */ resolvedComp = resolveReflectiveProviders([componentProvider])[0];
        var /** @type {?} */ resolvedCompFactory = resolvedComp.resolvedFactories[0];
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
    return function () {
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
    var /** @type {?} */ rendererType = viewDef.componentRendererType;
    var /** @type {?} */ view = parentView;
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
    var /** @type {?} */ embeddedViews = parentView.viewContainer._embeddedViews;
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
    var /** @type {?} */ embeddedViews = parent.viewContainer._embeddedViews;
    if (viewIndex == null || viewIndex >= embeddedViews.length) {
        viewIndex = embeddedViews.length - 1;
    }
    if (viewIndex < 0) {
        return null;
    }
    var /** @type {?} */ view = embeddedViews[viewIndex];
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
var VIEW_DEFINITION_CACHE = new WeakMap();
/**
 * @param {?} factory
 * @return {?}
 */
function resolveViewDefinition(factory) {
    var /** @type {?} */ value = VIEW_DEFINITION_CACHE.get(factory);
    if (!value) {
        value = factory();
        VIEW_DEFINITION_CACHE.set(factory, value);
    }
    return value;
}
// tslint:disable:class-name
var EMPTY_CONTEXT = new Object();
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
var ComponentFactory_ = (function (_super) {
    __extends(ComponentFactory_, _super);
    /**
     * @param {?} selector
     * @param {?} componentType
     * @param {?} _viewDefFactory
     */
    function ComponentFactory_(selector, componentType, _viewDefFactory) {
        var _this = _super.call(this) || this;
        _this.selector = selector;
        _this.componentType = componentType;
        _this._viewDefFactory = _viewDefFactory;
        return _this;
    }
    /**
     * @param {?} injector
     * @param {?=} rootSelectorOrNode
     * @return {?}
     */
    ComponentFactory_.prototype.create = function (injector, rootSelectorOrNode) {
        var /** @type {?} */ viewDef = resolveViewDefinition(this._viewDefFactory);
        var /** @type {?} */ componentNodeIndex = viewDef.componentProvider.index;
        var /** @type {?} */ view = createRootView(viewDef, injector, rootSelectorOrNode, EMPTY_CONTEXT);
        var /** @type {?} */ component = asProviderData(view, componentNodeIndex).instance;
        return new ComponentRef_(view, new ViewRef_(view), component);
    };
    return ComponentFactory_;
}(ComponentFactory));
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
var ComponentRef_ = (function (_super) {
    __extends(ComponentRef_, _super);
    /**
     * @param {?} _view
     * @param {?} _viewRef
     * @param {?} _component
     */
    function ComponentRef_(_view, _viewRef, _component) {
        var _this = _super.call(this) || this;
        _this._view = _view;
        _this._viewRef = _viewRef;
        _this._component = _component;
        return _this;
    }
    Object.defineProperty(ComponentRef_.prototype, "location", {
        /**
         * @return {?}
         */
        get: function () { return new ElementRef(null); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ComponentRef_.prototype, "injector", {
        /**
         * @return {?}
         */
        get: function () { return new Injector_(this._view); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ComponentRef_.prototype, "instance", {
        /**
         * @return {?}
         */
        get: function () { return this._component; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(ComponentRef_.prototype, "hostView", {
        /**
         * @return {?}
         */
        get: function () { return this._viewRef; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(ComponentRef_.prototype, "componentType", {
        /**
         * @return {?}
         */
        get: function () { return (this._component.constructor); },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ComponentRef_.prototype.destroy = function () { this._viewRef.destroy(); };
    /**
     * @param {?} callback
     * @return {?}
     */
    ComponentRef_.prototype.onDestroy = function (callback) { this._viewRef.onDestroy(callback); };
    return ComponentRef_;
}(ComponentRef));
/**
 * Internal ViewContainerRef
 */
var ViewContainerRef_ = (function () {
    /**
     * @param {?} _view
     */
    function ViewContainerRef_(_view) {
        this._view = _view;
        /* @internal */
        this._embeddedViews = [];
    }
    Object.defineProperty(ViewContainerRef_.prototype, "anchorElement", {
        /**
         * @return {?}
         */
        get: function () { return new ElementRef(this._view.renderElement); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewContainerRef_.prototype, "injector", {
        /**
         * @return {?}
         */
        get: function () { return new Injector_(this._view); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewContainerRef_.prototype, "parentInjector", {
        /**
         * @return {?}
         */
        get: function () {
            var /** @type {?} */ view = this._view;
            var /** @type {?} */ def = view.def;
            while (!def && view) {
                view = view.parent;
                def = view.def;
            }
            return view ? new Injector_(view) : this._view.root.injector;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ViewContainerRef_.prototype.clear = function () { };
    /**
     * @param {?} index
     * @return {?}
     */
    ViewContainerRef_.prototype.get = function (index) {
        var /** @type {?} */ view = this._embeddedViews[index];
        if (view) {
            var /** @type {?} */ ref = new ViewRef_(view);
            ref.attachToViewContainerRef(this);
            return ref;
        }
        return null;
    };
    Object.defineProperty(ViewContainerRef_.prototype, "length", {
        /**
         * @return {?}
         */
        get: function () { return 0; },
        enumerable: true,
        configurable: true
    });
    /**
     * @template C
     * @param {?} templateRef
     * @param {?=} context
     * @param {?=} index
     * @return {?}
     */
    ViewContainerRef_.prototype.createEmbeddedView = function (templateRef, context, index) { };
    /**
     * @template C
     * @param {?} componentFactory
     * @param {?=} index
     * @param {?=} injector
     * @param {?=} rootSelectorOrNode
     * @return {?}
     */
    ViewContainerRef_.prototype.createComponent = function (componentFactory, index, injector, rootSelectorOrNode) {
        var /** @type {?} */ contextInjector = injector || this.parentInjector;
        var /** @type {?} */ componentRef = componentFactory.create(contextInjector, rootSelectorOrNode);
        this.insert(componentRef.hostView, index);
        return componentRef;
    };
    /**
     * @param {?} viewRef
     * @param {?=} index
     * @return {?}
     */
    ViewContainerRef_.prototype.insert = function (viewRef, index) {
        // tslint:disable-next-line:variable-name
        var /** @type {?} */ viewRef_ = (viewRef);
        var /** @type {?} */ viewData = viewRef_._view;
        attachEmbeddedView(this._view, index, viewData);
        viewRef_.attachToViewContainerRef(this);
        return viewRef;
    };
    /**
     * @param {?} viewRef
     * @return {?}
     */
    ViewContainerRef_.prototype.indexOf = function (viewRef) {
        return this._embeddedViews.indexOf(((viewRef))._view);
    };
    /**
     * @param {?=} index
     * @return {?}
     */
    ViewContainerRef_.prototype.remove = function (index) {
        var /** @type {?} */ view = detachEmbeddedView(this._view, index);
        if (view) {
            destroyView(view);
        }
    };
    /**
     * @param {?=} index
     * @return {?}
     */
    ViewContainerRef_.prototype.detach = function (index) {
        var /** @type {?} */ view = detachEmbeddedView(this._view, index);
        return view ? new ViewRef_(view) : null;
    };
    return ViewContainerRef_;
}());
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
var ViewRef_ = (function () {
    /**
     * @param {?} _view
     */
    function ViewRef_(_view) {
        this._view = _view;
        this._viewContainerRef = null;
        this._appRef = null;
    }
    Object.defineProperty(ViewRef_.prototype, "context", {
        /**
         * @return {?}
         */
        get: function () { return this._view.context; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewRef_.prototype, "destroyed", {
        /**
         * @return {?}
         */
        get: function () { return (this._view.state & 8 /* Destroyed */) !== 0; },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ViewRef_.prototype.detach = function () { this._view.state &= ~2 /* ChecksEnabled */; };
    /**
     * @return {?}
     */
    ViewRef_.prototype.reattach = function () { this._view.state |= 2 /* ChecksEnabled */; };
    /**
     * @param {?} callback
     * @return {?}
     */
    ViewRef_.prototype.onDestroy = function (callback) {
        if (!this._view.disposables) {
            this._view.disposables = [];
        }
        this._view.disposables.push(/** @type {?} */ (callback));
    };
    /**
     * @return {?}
     */
    ViewRef_.prototype.destroy = function () {
        if (this._appRef) {
            this._appRef.detachView(this);
        }
        else if (this._viewContainerRef) {
            this._viewContainerRef.detach(this._viewContainerRef.indexOf(this));
        }
        destroyView(this._view);
    };
    /**
     * @return {?}
     */
    ViewRef_.prototype.detachFromAppRef = function () {
        this._appRef = null;
    };
    /**
     * @param {?} appRef
     * @return {?}
     */
    ViewRef_.prototype.attachToAppRef = function (appRef) {
        if (this._viewContainerRef) {
            throw new Error('This view is already attached to a ViewContainer!');
        }
        this._appRef = appRef;
    };
    /**
     * @param {?} vcRef
     * @return {?}
     */
    ViewRef_.prototype.attachToViewContainerRef = function (vcRef) {
        if (this._appRef) {
            throw new Error('This view is already attached directly to the ApplicationRef!');
        }
        this._viewContainerRef = vcRef;
    };
    return ViewRef_;
}());
/**
 * Internal View Injector
 */
var Injector_ = (function () {
    /**
     * @param {?} _view
     */
    function Injector_(_view) {
        this._view = _view;
    }
    /**
     * @param {?} token
     * @param {?=} notFoundValue
     * @return {?}
     */
    Injector_.prototype.get = function (token, notFoundValue) {
        if (notFoundValue === void 0) { notFoundValue = Injector.THROW_IF_NOT_FOUND; }
        return resolveDep(this._view, { flags: 0 /* None */, token: token, tokenKey: tokenKey(token) }, notFoundValue);
    };
    return Injector_;
}());
/**
 * @abstract
 */
var ViewRef = (function () {
    function ViewRef() {
    }
    /**
     * Destroys the view and all of the data structures associated with it.
     * @abstract
     * @return {?}
     */
    ViewRef.prototype.destroy = function () { };
    /**
     * @abstract
     * @return {?}
     */
    ViewRef.prototype.destroyed = function () { };
    /**
     * @abstract
     * @param {?} callback
     * @return {?}
     */
    ViewRef.prototype.onDestroy = function (callback) { };
    return ViewRef;
}());
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
var InjectionToken = (function () {
    /**
     * @param {?} _desc
     */
    function InjectionToken(_desc) {
        this._desc = _desc;
    }
    /**
     * @return {?}
     */
    InjectionToken.prototype.toString = function () { return "InjectionToken " + this._desc; };
    return InjectionToken;
}());
// Providers
var CORE_PROVIDERS = [
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
//# sourceMappingURL=core.es5.js.map
