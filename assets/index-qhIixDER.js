//#region \0rolldown/runtime.js
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJSMin = (cb, mod) => () => (mod || (cb((mod = { exports: {} }).exports, mod), cb = null), mod.exports);
var __copyProps = (to, from, except, desc) => {
	if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
		key = keys[i];
		if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
			get: ((k) => from[k]).bind(null, key),
			enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
		});
	}
	return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
	value: mod,
	enumerable: true
}) : target, mod));
//#endregion
//#region \0vite/modulepreload-polyfill.js
(function polyfill() {
	const relList = document.createElement("link").relList;
	if (relList && relList.supports && relList.supports("modulepreload")) return;
	for (const link of document.querySelectorAll("link[rel=\"modulepreload\"]")) processPreload(link);
	new MutationObserver((mutations) => {
		for (const mutation of mutations) {
			if (mutation.type !== "childList") continue;
			for (const node of mutation.addedNodes) if (node.tagName === "LINK" && node.rel === "modulepreload") processPreload(node);
		}
	}).observe(document, {
		childList: true,
		subtree: true
	});
	function getFetchOpts(link) {
		const fetchOpts = {};
		if (link.integrity) fetchOpts.integrity = link.integrity;
		if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
		if (link.crossOrigin === "use-credentials") fetchOpts.credentials = "include";
		else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
		else fetchOpts.credentials = "same-origin";
		return fetchOpts;
	}
	function processPreload(link) {
		if (link.ep) return;
		link.ep = true;
		const fetchOpts = getFetchOpts(link);
		fetch(link.href, fetchOpts);
	}
})();
//#endregion
//#region node_modules/react/cjs/react.production.js
/**
* @license React
* react.production.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var require_react_production = /* @__PURE__ */ __commonJSMin(((exports) => {
	var REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
	function getIteratorFn(maybeIterable) {
		if (null === maybeIterable || "object" !== typeof maybeIterable) return null;
		maybeIterable = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable["@@iterator"];
		return "function" === typeof maybeIterable ? maybeIterable : null;
	}
	var ReactNoopUpdateQueue = {
		isMounted: function() {
			return !1;
		},
		enqueueForceUpdate: function() {},
		enqueueReplaceState: function() {},
		enqueueSetState: function() {}
	}, assign = Object.assign, emptyObject = {};
	function Component(props, context, updater) {
		this.props = props;
		this.context = context;
		this.refs = emptyObject;
		this.updater = updater || ReactNoopUpdateQueue;
	}
	Component.prototype.isReactComponent = {};
	Component.prototype.setState = function(partialState, callback) {
		if ("object" !== typeof partialState && "function" !== typeof partialState && null != partialState) throw Error("takes an object of state variables to update or a function which returns an object of state variables.");
		this.updater.enqueueSetState(this, partialState, callback, "setState");
	};
	Component.prototype.forceUpdate = function(callback) {
		this.updater.enqueueForceUpdate(this, callback, "forceUpdate");
	};
	function ComponentDummy() {}
	ComponentDummy.prototype = Component.prototype;
	function PureComponent(props, context, updater) {
		this.props = props;
		this.context = context;
		this.refs = emptyObject;
		this.updater = updater || ReactNoopUpdateQueue;
	}
	var pureComponentPrototype = PureComponent.prototype = new ComponentDummy();
	pureComponentPrototype.constructor = PureComponent;
	assign(pureComponentPrototype, Component.prototype);
	pureComponentPrototype.isPureReactComponent = !0;
	var isArrayImpl = Array.isArray;
	function noop() {}
	var ReactSharedInternals = {
		H: null,
		A: null,
		T: null,
		S: null
	}, hasOwnProperty = Object.prototype.hasOwnProperty;
	function ReactElement(type, key, props) {
		var refProp = props.ref;
		return {
			$$typeof: REACT_ELEMENT_TYPE,
			type,
			key,
			ref: void 0 !== refProp ? refProp : null,
			props
		};
	}
	function cloneAndReplaceKey(oldElement, newKey) {
		return ReactElement(oldElement.type, newKey, oldElement.props);
	}
	function isValidElement(object) {
		return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
	}
	function escape(key) {
		var escaperLookup = {
			"=": "=0",
			":": "=2"
		};
		return "$" + key.replace(/[=:]/g, function(match) {
			return escaperLookup[match];
		});
	}
	var userProvidedKeyEscapeRegex = /\/+/g;
	function getElementKey(element, index) {
		return "object" === typeof element && null !== element && null != element.key ? escape("" + element.key) : index.toString(36);
	}
	function resolveThenable(thenable) {
		switch (thenable.status) {
			case "fulfilled": return thenable.value;
			case "rejected": throw thenable.reason;
			default: switch ("string" === typeof thenable.status ? thenable.then(noop, noop) : (thenable.status = "pending", thenable.then(function(fulfilledValue) {
				"pending" === thenable.status && (thenable.status = "fulfilled", thenable.value = fulfilledValue);
			}, function(error) {
				"pending" === thenable.status && (thenable.status = "rejected", thenable.reason = error);
			})), thenable.status) {
				case "fulfilled": return thenable.value;
				case "rejected": throw thenable.reason;
			}
		}
		throw thenable;
	}
	function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
		var type = typeof children;
		if ("undefined" === type || "boolean" === type) children = null;
		var invokeCallback = !1;
		if (null === children) invokeCallback = !0;
		else switch (type) {
			case "bigint":
			case "string":
			case "number":
				invokeCallback = !0;
				break;
			case "object": switch (children.$$typeof) {
				case REACT_ELEMENT_TYPE:
				case REACT_PORTAL_TYPE:
					invokeCallback = !0;
					break;
				case REACT_LAZY_TYPE: return invokeCallback = children._init, mapIntoArray(invokeCallback(children._payload), array, escapedPrefix, nameSoFar, callback);
			}
		}
		if (invokeCallback) return callback = callback(children), invokeCallback = "" === nameSoFar ? "." + getElementKey(children, 0) : nameSoFar, isArrayImpl(callback) ? (escapedPrefix = "", null != invokeCallback && (escapedPrefix = invokeCallback.replace(userProvidedKeyEscapeRegex, "$&/") + "/"), mapIntoArray(callback, array, escapedPrefix, "", function(c) {
			return c;
		})) : null != callback && (isValidElement(callback) && (callback = cloneAndReplaceKey(callback, escapedPrefix + (null == callback.key || children && children.key === callback.key ? "" : ("" + callback.key).replace(userProvidedKeyEscapeRegex, "$&/") + "/") + invokeCallback)), array.push(callback)), 1;
		invokeCallback = 0;
		var nextNamePrefix = "" === nameSoFar ? "." : nameSoFar + ":";
		if (isArrayImpl(children)) for (var i = 0; i < children.length; i++) nameSoFar = children[i], type = nextNamePrefix + getElementKey(nameSoFar, i), invokeCallback += mapIntoArray(nameSoFar, array, escapedPrefix, type, callback);
		else if (i = getIteratorFn(children), "function" === typeof i) for (children = i.call(children), i = 0; !(nameSoFar = children.next()).done;) nameSoFar = nameSoFar.value, type = nextNamePrefix + getElementKey(nameSoFar, i++), invokeCallback += mapIntoArray(nameSoFar, array, escapedPrefix, type, callback);
		else if ("object" === type) {
			if ("function" === typeof children.then) return mapIntoArray(resolveThenable(children), array, escapedPrefix, nameSoFar, callback);
			array = String(children);
			throw Error("Objects are not valid as a React child (found: " + ("[object Object]" === array ? "object with keys {" + Object.keys(children).join(", ") + "}" : array) + "). If you meant to render a collection of children, use an array instead.");
		}
		return invokeCallback;
	}
	function mapChildren(children, func, context) {
		if (null == children) return children;
		var result = [], count = 0;
		mapIntoArray(children, result, "", "", function(child) {
			return func.call(context, child, count++);
		});
		return result;
	}
	function lazyInitializer(payload) {
		if (-1 === payload._status) {
			var ctor = payload._result;
			ctor = ctor();
			ctor.then(function(moduleObject) {
				if (0 === payload._status || -1 === payload._status) payload._status = 1, payload._result = moduleObject;
			}, function(error) {
				if (0 === payload._status || -1 === payload._status) payload._status = 2, payload._result = error;
			});
			-1 === payload._status && (payload._status = 0, payload._result = ctor);
		}
		if (1 === payload._status) return payload._result.default;
		throw payload._result;
	}
	var reportGlobalError = "function" === typeof reportError ? reportError : function(error) {
		if ("object" === typeof window && "function" === typeof window.ErrorEvent) {
			var event = new window.ErrorEvent("error", {
				bubbles: !0,
				cancelable: !0,
				message: "object" === typeof error && null !== error && "string" === typeof error.message ? String(error.message) : String(error),
				error
			});
			if (!window.dispatchEvent(event)) return;
		} else if ("object" === typeof process && "function" === typeof process.emit) {
			process.emit("uncaughtException", error);
			return;
		}
		console.error(error);
	}, Children = {
		map: mapChildren,
		forEach: function(children, forEachFunc, forEachContext) {
			mapChildren(children, function() {
				forEachFunc.apply(this, arguments);
			}, forEachContext);
		},
		count: function(children) {
			var n = 0;
			mapChildren(children, function() {
				n++;
			});
			return n;
		},
		toArray: function(children) {
			return mapChildren(children, function(child) {
				return child;
			}) || [];
		},
		only: function(children) {
			if (!isValidElement(children)) throw Error("React.Children.only expected to receive a single React element child.");
			return children;
		}
	};
	exports.Activity = REACT_ACTIVITY_TYPE;
	exports.Children = Children;
	exports.Component = Component;
	exports.Fragment = REACT_FRAGMENT_TYPE;
	exports.Profiler = REACT_PROFILER_TYPE;
	exports.PureComponent = PureComponent;
	exports.StrictMode = REACT_STRICT_MODE_TYPE;
	exports.Suspense = REACT_SUSPENSE_TYPE;
	exports.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = ReactSharedInternals;
	exports.__COMPILER_RUNTIME = {
		__proto__: null,
		c: function(size) {
			return ReactSharedInternals.H.useMemoCache(size);
		}
	};
	exports.cache = function(fn) {
		return function() {
			return fn.apply(null, arguments);
		};
	};
	exports.cacheSignal = function() {
		return null;
	};
	exports.cloneElement = function(element, config, children) {
		if (null === element || void 0 === element) throw Error("The argument must be a React element, but you passed " + element + ".");
		var props = assign({}, element.props), key = element.key;
		if (null != config) for (propName in void 0 !== config.key && (key = "" + config.key), config) !hasOwnProperty.call(config, propName) || "key" === propName || "__self" === propName || "__source" === propName || "ref" === propName && void 0 === config.ref || (props[propName] = config[propName]);
		var propName = arguments.length - 2;
		if (1 === propName) props.children = children;
		else if (1 < propName) {
			for (var childArray = Array(propName), i = 0; i < propName; i++) childArray[i] = arguments[i + 2];
			props.children = childArray;
		}
		return ReactElement(element.type, key, props);
	};
	exports.createContext = function(defaultValue) {
		defaultValue = {
			$$typeof: REACT_CONTEXT_TYPE,
			_currentValue: defaultValue,
			_currentValue2: defaultValue,
			_threadCount: 0,
			Provider: null,
			Consumer: null
		};
		defaultValue.Provider = defaultValue;
		defaultValue.Consumer = {
			$$typeof: REACT_CONSUMER_TYPE,
			_context: defaultValue
		};
		return defaultValue;
	};
	exports.createElement = function(type, config, children) {
		var propName, props = {}, key = null;
		if (null != config) for (propName in void 0 !== config.key && (key = "" + config.key), config) hasOwnProperty.call(config, propName) && "key" !== propName && "__self" !== propName && "__source" !== propName && (props[propName] = config[propName]);
		var childrenLength = arguments.length - 2;
		if (1 === childrenLength) props.children = children;
		else if (1 < childrenLength) {
			for (var childArray = Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 2];
			props.children = childArray;
		}
		if (type && type.defaultProps) for (propName in childrenLength = type.defaultProps, childrenLength) void 0 === props[propName] && (props[propName] = childrenLength[propName]);
		return ReactElement(type, key, props);
	};
	exports.createRef = function() {
		return { current: null };
	};
	exports.forwardRef = function(render) {
		return {
			$$typeof: REACT_FORWARD_REF_TYPE,
			render
		};
	};
	exports.isValidElement = isValidElement;
	exports.lazy = function(ctor) {
		return {
			$$typeof: REACT_LAZY_TYPE,
			_payload: {
				_status: -1,
				_result: ctor
			},
			_init: lazyInitializer
		};
	};
	exports.memo = function(type, compare) {
		return {
			$$typeof: REACT_MEMO_TYPE,
			type,
			compare: void 0 === compare ? null : compare
		};
	};
	exports.startTransition = function(scope) {
		var prevTransition = ReactSharedInternals.T, currentTransition = {};
		ReactSharedInternals.T = currentTransition;
		try {
			var returnValue = scope(), onStartTransitionFinish = ReactSharedInternals.S;
			null !== onStartTransitionFinish && onStartTransitionFinish(currentTransition, returnValue);
			"object" === typeof returnValue && null !== returnValue && "function" === typeof returnValue.then && returnValue.then(noop, reportGlobalError);
		} catch (error) {
			reportGlobalError(error);
		} finally {
			null !== prevTransition && null !== currentTransition.types && (prevTransition.types = currentTransition.types), ReactSharedInternals.T = prevTransition;
		}
	};
	exports.unstable_useCacheRefresh = function() {
		return ReactSharedInternals.H.useCacheRefresh();
	};
	exports.use = function(usable) {
		return ReactSharedInternals.H.use(usable);
	};
	exports.useActionState = function(action, initialState, permalink) {
		return ReactSharedInternals.H.useActionState(action, initialState, permalink);
	};
	exports.useCallback = function(callback, deps) {
		return ReactSharedInternals.H.useCallback(callback, deps);
	};
	exports.useContext = function(Context) {
		return ReactSharedInternals.H.useContext(Context);
	};
	exports.useDebugValue = function() {};
	exports.useDeferredValue = function(value, initialValue) {
		return ReactSharedInternals.H.useDeferredValue(value, initialValue);
	};
	exports.useEffect = function(create, deps) {
		return ReactSharedInternals.H.useEffect(create, deps);
	};
	exports.useEffectEvent = function(callback) {
		return ReactSharedInternals.H.useEffectEvent(callback);
	};
	exports.useId = function() {
		return ReactSharedInternals.H.useId();
	};
	exports.useImperativeHandle = function(ref, create, deps) {
		return ReactSharedInternals.H.useImperativeHandle(ref, create, deps);
	};
	exports.useInsertionEffect = function(create, deps) {
		return ReactSharedInternals.H.useInsertionEffect(create, deps);
	};
	exports.useLayoutEffect = function(create, deps) {
		return ReactSharedInternals.H.useLayoutEffect(create, deps);
	};
	exports.useMemo = function(create, deps) {
		return ReactSharedInternals.H.useMemo(create, deps);
	};
	exports.useOptimistic = function(passthrough, reducer) {
		return ReactSharedInternals.H.useOptimistic(passthrough, reducer);
	};
	exports.useReducer = function(reducer, initialArg, init) {
		return ReactSharedInternals.H.useReducer(reducer, initialArg, init);
	};
	exports.useRef = function(initialValue) {
		return ReactSharedInternals.H.useRef(initialValue);
	};
	exports.useState = function(initialState) {
		return ReactSharedInternals.H.useState(initialState);
	};
	exports.useSyncExternalStore = function(subscribe, getSnapshot, getServerSnapshot) {
		return ReactSharedInternals.H.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
	};
	exports.useTransition = function() {
		return ReactSharedInternals.H.useTransition();
	};
	exports.version = "19.2.6";
}));
//#endregion
//#region node_modules/react/index.js
var require_react = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_react_production();
}));
//#endregion
//#region node_modules/scheduler/cjs/scheduler.production.js
/**
* @license React
* scheduler.production.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var require_scheduler_production = /* @__PURE__ */ __commonJSMin(((exports) => {
	function push(heap, node) {
		var index = heap.length;
		heap.push(node);
		a: for (; 0 < index;) {
			var parentIndex = index - 1 >>> 1, parent = heap[parentIndex];
			if (0 < compare(parent, node)) heap[parentIndex] = node, heap[index] = parent, index = parentIndex;
			else break a;
		}
	}
	function peek(heap) {
		return 0 === heap.length ? null : heap[0];
	}
	function pop(heap) {
		if (0 === heap.length) return null;
		var first = heap[0], last = heap.pop();
		if (last !== first) {
			heap[0] = last;
			a: for (var index = 0, length = heap.length, halfLength = length >>> 1; index < halfLength;) {
				var leftIndex = 2 * (index + 1) - 1, left = heap[leftIndex], rightIndex = leftIndex + 1, right = heap[rightIndex];
				if (0 > compare(left, last)) rightIndex < length && 0 > compare(right, left) ? (heap[index] = right, heap[rightIndex] = last, index = rightIndex) : (heap[index] = left, heap[leftIndex] = last, index = leftIndex);
				else if (rightIndex < length && 0 > compare(right, last)) heap[index] = right, heap[rightIndex] = last, index = rightIndex;
				else break a;
			}
		}
		return first;
	}
	function compare(a, b) {
		var diff = a.sortIndex - b.sortIndex;
		return 0 !== diff ? diff : a.id - b.id;
	}
	exports.unstable_now = void 0;
	if ("object" === typeof performance && "function" === typeof performance.now) {
		var localPerformance = performance;
		exports.unstable_now = function() {
			return localPerformance.now();
		};
	} else {
		var localDate = Date, initialTime = localDate.now();
		exports.unstable_now = function() {
			return localDate.now() - initialTime;
		};
	}
	var taskQueue = [], timerQueue = [], taskIdCounter = 1, currentTask = null, currentPriorityLevel = 3, isPerformingWork = !1, isHostCallbackScheduled = !1, isHostTimeoutScheduled = !1, needsPaint = !1, localSetTimeout = "function" === typeof setTimeout ? setTimeout : null, localClearTimeout = "function" === typeof clearTimeout ? clearTimeout : null, localSetImmediate = "undefined" !== typeof setImmediate ? setImmediate : null;
	function advanceTimers(currentTime) {
		for (var timer = peek(timerQueue); null !== timer;) {
			if (null === timer.callback) pop(timerQueue);
			else if (timer.startTime <= currentTime) pop(timerQueue), timer.sortIndex = timer.expirationTime, push(taskQueue, timer);
			else break;
			timer = peek(timerQueue);
		}
	}
	function handleTimeout(currentTime) {
		isHostTimeoutScheduled = !1;
		advanceTimers(currentTime);
		if (!isHostCallbackScheduled) if (null !== peek(taskQueue)) isHostCallbackScheduled = !0, isMessageLoopRunning || (isMessageLoopRunning = !0, schedulePerformWorkUntilDeadline());
		else {
			var firstTimer = peek(timerQueue);
			null !== firstTimer && requestHostTimeout(handleTimeout, firstTimer.startTime - currentTime);
		}
	}
	var isMessageLoopRunning = !1, taskTimeoutID = -1, frameInterval = 5, startTime = -1;
	function shouldYieldToHost() {
		return needsPaint ? !0 : exports.unstable_now() - startTime < frameInterval ? !1 : !0;
	}
	function performWorkUntilDeadline() {
		needsPaint = !1;
		if (isMessageLoopRunning) {
			var currentTime = exports.unstable_now();
			startTime = currentTime;
			var hasMoreWork = !0;
			try {
				a: {
					isHostCallbackScheduled = !1;
					isHostTimeoutScheduled && (isHostTimeoutScheduled = !1, localClearTimeout(taskTimeoutID), taskTimeoutID = -1);
					isPerformingWork = !0;
					var previousPriorityLevel = currentPriorityLevel;
					try {
						b: {
							advanceTimers(currentTime);
							for (currentTask = peek(taskQueue); null !== currentTask && !(currentTask.expirationTime > currentTime && shouldYieldToHost());) {
								var callback = currentTask.callback;
								if ("function" === typeof callback) {
									currentTask.callback = null;
									currentPriorityLevel = currentTask.priorityLevel;
									var continuationCallback = callback(currentTask.expirationTime <= currentTime);
									currentTime = exports.unstable_now();
									if ("function" === typeof continuationCallback) {
										currentTask.callback = continuationCallback;
										advanceTimers(currentTime);
										hasMoreWork = !0;
										break b;
									}
									currentTask === peek(taskQueue) && pop(taskQueue);
									advanceTimers(currentTime);
								} else pop(taskQueue);
								currentTask = peek(taskQueue);
							}
							if (null !== currentTask) hasMoreWork = !0;
							else {
								var firstTimer = peek(timerQueue);
								null !== firstTimer && requestHostTimeout(handleTimeout, firstTimer.startTime - currentTime);
								hasMoreWork = !1;
							}
						}
						break a;
					} finally {
						currentTask = null, currentPriorityLevel = previousPriorityLevel, isPerformingWork = !1;
					}
					hasMoreWork = void 0;
				}
			} finally {
				hasMoreWork ? schedulePerformWorkUntilDeadline() : isMessageLoopRunning = !1;
			}
		}
	}
	var schedulePerformWorkUntilDeadline;
	if ("function" === typeof localSetImmediate) schedulePerformWorkUntilDeadline = function() {
		localSetImmediate(performWorkUntilDeadline);
	};
	else if ("undefined" !== typeof MessageChannel) {
		var channel = new MessageChannel(), port = channel.port2;
		channel.port1.onmessage = performWorkUntilDeadline;
		schedulePerformWorkUntilDeadline = function() {
			port.postMessage(null);
		};
	} else schedulePerformWorkUntilDeadline = function() {
		localSetTimeout(performWorkUntilDeadline, 0);
	};
	function requestHostTimeout(callback, ms) {
		taskTimeoutID = localSetTimeout(function() {
			callback(exports.unstable_now());
		}, ms);
	}
	exports.unstable_IdlePriority = 5;
	exports.unstable_ImmediatePriority = 1;
	exports.unstable_LowPriority = 4;
	exports.unstable_NormalPriority = 3;
	exports.unstable_Profiling = null;
	exports.unstable_UserBlockingPriority = 2;
	exports.unstable_cancelCallback = function(task) {
		task.callback = null;
	};
	exports.unstable_forceFrameRate = function(fps) {
		0 > fps || 125 < fps ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : frameInterval = 0 < fps ? Math.floor(1e3 / fps) : 5;
	};
	exports.unstable_getCurrentPriorityLevel = function() {
		return currentPriorityLevel;
	};
	exports.unstable_next = function(eventHandler) {
		switch (currentPriorityLevel) {
			case 1:
			case 2:
			case 3:
				var priorityLevel = 3;
				break;
			default: priorityLevel = currentPriorityLevel;
		}
		var previousPriorityLevel = currentPriorityLevel;
		currentPriorityLevel = priorityLevel;
		try {
			return eventHandler();
		} finally {
			currentPriorityLevel = previousPriorityLevel;
		}
	};
	exports.unstable_requestPaint = function() {
		needsPaint = !0;
	};
	exports.unstable_runWithPriority = function(priorityLevel, eventHandler) {
		switch (priorityLevel) {
			case 1:
			case 2:
			case 3:
			case 4:
			case 5: break;
			default: priorityLevel = 3;
		}
		var previousPriorityLevel = currentPriorityLevel;
		currentPriorityLevel = priorityLevel;
		try {
			return eventHandler();
		} finally {
			currentPriorityLevel = previousPriorityLevel;
		}
	};
	exports.unstable_scheduleCallback = function(priorityLevel, callback, options) {
		var currentTime = exports.unstable_now();
		"object" === typeof options && null !== options ? (options = options.delay, options = "number" === typeof options && 0 < options ? currentTime + options : currentTime) : options = currentTime;
		switch (priorityLevel) {
			case 1:
				var timeout = -1;
				break;
			case 2:
				timeout = 250;
				break;
			case 5:
				timeout = 1073741823;
				break;
			case 4:
				timeout = 1e4;
				break;
			default: timeout = 5e3;
		}
		timeout = options + timeout;
		priorityLevel = {
			id: taskIdCounter++,
			callback,
			priorityLevel,
			startTime: options,
			expirationTime: timeout,
			sortIndex: -1
		};
		options > currentTime ? (priorityLevel.sortIndex = options, push(timerQueue, priorityLevel), null === peek(taskQueue) && priorityLevel === peek(timerQueue) && (isHostTimeoutScheduled ? (localClearTimeout(taskTimeoutID), taskTimeoutID = -1) : isHostTimeoutScheduled = !0, requestHostTimeout(handleTimeout, options - currentTime))) : (priorityLevel.sortIndex = timeout, push(taskQueue, priorityLevel), isHostCallbackScheduled || isPerformingWork || (isHostCallbackScheduled = !0, isMessageLoopRunning || (isMessageLoopRunning = !0, schedulePerformWorkUntilDeadline())));
		return priorityLevel;
	};
	exports.unstable_shouldYield = shouldYieldToHost;
	exports.unstable_wrapCallback = function(callback) {
		var parentPriorityLevel = currentPriorityLevel;
		return function() {
			var previousPriorityLevel = currentPriorityLevel;
			currentPriorityLevel = parentPriorityLevel;
			try {
				return callback.apply(this, arguments);
			} finally {
				currentPriorityLevel = previousPriorityLevel;
			}
		};
	};
}));
//#endregion
//#region node_modules/scheduler/index.js
var require_scheduler = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_scheduler_production();
}));
//#endregion
//#region node_modules/react-dom/cjs/react-dom.production.js
/**
* @license React
* react-dom.production.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var require_react_dom_production = /* @__PURE__ */ __commonJSMin(((exports) => {
	var React = require_react();
	function formatProdErrorMessage(code) {
		var url = "https://react.dev/errors/" + code;
		if (1 < arguments.length) {
			url += "?args[]=" + encodeURIComponent(arguments[1]);
			for (var i = 2; i < arguments.length; i++) url += "&args[]=" + encodeURIComponent(arguments[i]);
		}
		return "Minified React error #" + code + "; visit " + url + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
	}
	function noop() {}
	var Internals = {
		d: {
			f: noop,
			r: function() {
				throw Error(formatProdErrorMessage(522));
			},
			D: noop,
			C: noop,
			L: noop,
			m: noop,
			X: noop,
			S: noop,
			M: noop
		},
		p: 0,
		findDOMNode: null
	}, REACT_PORTAL_TYPE = Symbol.for("react.portal");
	function createPortal$1(children, containerInfo, implementation) {
		var key = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
		return {
			$$typeof: REACT_PORTAL_TYPE,
			key: null == key ? null : "" + key,
			children,
			containerInfo,
			implementation
		};
	}
	var ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
	function getCrossOriginStringAs(as, input) {
		if ("font" === as) return "";
		if ("string" === typeof input) return "use-credentials" === input ? input : "";
	}
	exports.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = Internals;
	exports.createPortal = function(children, container) {
		var key = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
		if (!container || 1 !== container.nodeType && 9 !== container.nodeType && 11 !== container.nodeType) throw Error(formatProdErrorMessage(299));
		return createPortal$1(children, container, null, key);
	};
	exports.flushSync = function(fn) {
		var previousTransition = ReactSharedInternals.T, previousUpdatePriority = Internals.p;
		try {
			if (ReactSharedInternals.T = null, Internals.p = 2, fn) return fn();
		} finally {
			ReactSharedInternals.T = previousTransition, Internals.p = previousUpdatePriority, Internals.d.f();
		}
	};
	exports.preconnect = function(href, options) {
		"string" === typeof href && (options ? (options = options.crossOrigin, options = "string" === typeof options ? "use-credentials" === options ? options : "" : void 0) : options = null, Internals.d.C(href, options));
	};
	exports.prefetchDNS = function(href) {
		"string" === typeof href && Internals.d.D(href);
	};
	exports.preinit = function(href, options) {
		if ("string" === typeof href && options && "string" === typeof options.as) {
			var as = options.as, crossOrigin = getCrossOriginStringAs(as, options.crossOrigin), integrity = "string" === typeof options.integrity ? options.integrity : void 0, fetchPriority = "string" === typeof options.fetchPriority ? options.fetchPriority : void 0;
			"style" === as ? Internals.d.S(href, "string" === typeof options.precedence ? options.precedence : void 0, {
				crossOrigin,
				integrity,
				fetchPriority
			}) : "script" === as && Internals.d.X(href, {
				crossOrigin,
				integrity,
				fetchPriority,
				nonce: "string" === typeof options.nonce ? options.nonce : void 0
			});
		}
	};
	exports.preinitModule = function(href, options) {
		if ("string" === typeof href) if ("object" === typeof options && null !== options) {
			if (null == options.as || "script" === options.as) {
				var crossOrigin = getCrossOriginStringAs(options.as, options.crossOrigin);
				Internals.d.M(href, {
					crossOrigin,
					integrity: "string" === typeof options.integrity ? options.integrity : void 0,
					nonce: "string" === typeof options.nonce ? options.nonce : void 0
				});
			}
		} else options ?? Internals.d.M(href);
	};
	exports.preload = function(href, options) {
		if ("string" === typeof href && "object" === typeof options && null !== options && "string" === typeof options.as) {
			var as = options.as, crossOrigin = getCrossOriginStringAs(as, options.crossOrigin);
			Internals.d.L(href, as, {
				crossOrigin,
				integrity: "string" === typeof options.integrity ? options.integrity : void 0,
				nonce: "string" === typeof options.nonce ? options.nonce : void 0,
				type: "string" === typeof options.type ? options.type : void 0,
				fetchPriority: "string" === typeof options.fetchPriority ? options.fetchPriority : void 0,
				referrerPolicy: "string" === typeof options.referrerPolicy ? options.referrerPolicy : void 0,
				imageSrcSet: "string" === typeof options.imageSrcSet ? options.imageSrcSet : void 0,
				imageSizes: "string" === typeof options.imageSizes ? options.imageSizes : void 0,
				media: "string" === typeof options.media ? options.media : void 0
			});
		}
	};
	exports.preloadModule = function(href, options) {
		if ("string" === typeof href) if (options) {
			var crossOrigin = getCrossOriginStringAs(options.as, options.crossOrigin);
			Internals.d.m(href, {
				as: "string" === typeof options.as && "script" !== options.as ? options.as : void 0,
				crossOrigin,
				integrity: "string" === typeof options.integrity ? options.integrity : void 0
			});
		} else Internals.d.m(href);
	};
	exports.requestFormReset = function(form) {
		Internals.d.r(form);
	};
	exports.unstable_batchedUpdates = function(fn, a) {
		return fn(a);
	};
	exports.useFormState = function(action, initialState, permalink) {
		return ReactSharedInternals.H.useFormState(action, initialState, permalink);
	};
	exports.useFormStatus = function() {
		return ReactSharedInternals.H.useHostTransitionStatus();
	};
	exports.version = "19.2.6";
}));
//#endregion
//#region node_modules/react-dom/index.js
var require_react_dom = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	function checkDCE() {
		if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === "undefined" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== "function") return;
		try {
			__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
		} catch (err) {
			console.error(err);
		}
	}
	checkDCE();
	module.exports = require_react_dom_production();
}));
//#endregion
//#region node_modules/react-dom/cjs/react-dom-client.production.js
/**
* @license React
* react-dom-client.production.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var require_react_dom_client_production = /* @__PURE__ */ __commonJSMin(((exports) => {
	var Scheduler = require_scheduler(), React = require_react(), ReactDOM = require_react_dom();
	function formatProdErrorMessage(code) {
		var url = "https://react.dev/errors/" + code;
		if (1 < arguments.length) {
			url += "?args[]=" + encodeURIComponent(arguments[1]);
			for (var i = 2; i < arguments.length; i++) url += "&args[]=" + encodeURIComponent(arguments[i]);
		}
		return "Minified React error #" + code + "; visit " + url + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
	}
	function isValidContainer(node) {
		return !(!node || 1 !== node.nodeType && 9 !== node.nodeType && 11 !== node.nodeType);
	}
	function getNearestMountedFiber(fiber) {
		var node = fiber, nearestMounted = fiber;
		if (fiber.alternate) for (; node.return;) node = node.return;
		else {
			fiber = node;
			do
				node = fiber, 0 !== (node.flags & 4098) && (nearestMounted = node.return), fiber = node.return;
			while (fiber);
		}
		return 3 === node.tag ? nearestMounted : null;
	}
	function getSuspenseInstanceFromFiber(fiber) {
		if (13 === fiber.tag) {
			var suspenseState = fiber.memoizedState;
			null === suspenseState && (fiber = fiber.alternate, null !== fiber && (suspenseState = fiber.memoizedState));
			if (null !== suspenseState) return suspenseState.dehydrated;
		}
		return null;
	}
	function getActivityInstanceFromFiber(fiber) {
		if (31 === fiber.tag) {
			var activityState = fiber.memoizedState;
			null === activityState && (fiber = fiber.alternate, null !== fiber && (activityState = fiber.memoizedState));
			if (null !== activityState) return activityState.dehydrated;
		}
		return null;
	}
	function assertIsMounted(fiber) {
		if (getNearestMountedFiber(fiber) !== fiber) throw Error(formatProdErrorMessage(188));
	}
	function findCurrentFiberUsingSlowPath(fiber) {
		var alternate = fiber.alternate;
		if (!alternate) {
			alternate = getNearestMountedFiber(fiber);
			if (null === alternate) throw Error(formatProdErrorMessage(188));
			return alternate !== fiber ? null : fiber;
		}
		for (var a = fiber, b = alternate;;) {
			var parentA = a.return;
			if (null === parentA) break;
			var parentB = parentA.alternate;
			if (null === parentB) {
				b = parentA.return;
				if (null !== b) {
					a = b;
					continue;
				}
				break;
			}
			if (parentA.child === parentB.child) {
				for (parentB = parentA.child; parentB;) {
					if (parentB === a) return assertIsMounted(parentA), fiber;
					if (parentB === b) return assertIsMounted(parentA), alternate;
					parentB = parentB.sibling;
				}
				throw Error(formatProdErrorMessage(188));
			}
			if (a.return !== b.return) a = parentA, b = parentB;
			else {
				for (var didFindChild = !1, child$0 = parentA.child; child$0;) {
					if (child$0 === a) {
						didFindChild = !0;
						a = parentA;
						b = parentB;
						break;
					}
					if (child$0 === b) {
						didFindChild = !0;
						b = parentA;
						a = parentB;
						break;
					}
					child$0 = child$0.sibling;
				}
				if (!didFindChild) {
					for (child$0 = parentB.child; child$0;) {
						if (child$0 === a) {
							didFindChild = !0;
							a = parentB;
							b = parentA;
							break;
						}
						if (child$0 === b) {
							didFindChild = !0;
							b = parentB;
							a = parentA;
							break;
						}
						child$0 = child$0.sibling;
					}
					if (!didFindChild) throw Error(formatProdErrorMessage(189));
				}
			}
			if (a.alternate !== b) throw Error(formatProdErrorMessage(190));
		}
		if (3 !== a.tag) throw Error(formatProdErrorMessage(188));
		return a.stateNode.current === a ? fiber : alternate;
	}
	function findCurrentHostFiberImpl(node) {
		var tag = node.tag;
		if (5 === tag || 26 === tag || 27 === tag || 6 === tag) return node;
		for (node = node.child; null !== node;) {
			tag = findCurrentHostFiberImpl(node);
			if (null !== tag) return tag;
			node = node.sibling;
		}
		return null;
	}
	var assign = Object.assign, REACT_LEGACY_ELEMENT_TYPE = Symbol.for("react.element"), REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy");
	var REACT_ACTIVITY_TYPE = Symbol.for("react.activity");
	var REACT_MEMO_CACHE_SENTINEL = Symbol.for("react.memo_cache_sentinel");
	var MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
	function getIteratorFn(maybeIterable) {
		if (null === maybeIterable || "object" !== typeof maybeIterable) return null;
		maybeIterable = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable["@@iterator"];
		return "function" === typeof maybeIterable ? maybeIterable : null;
	}
	var REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference");
	function getComponentNameFromType(type) {
		if (null == type) return null;
		if ("function" === typeof type) return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
		if ("string" === typeof type) return type;
		switch (type) {
			case REACT_FRAGMENT_TYPE: return "Fragment";
			case REACT_PROFILER_TYPE: return "Profiler";
			case REACT_STRICT_MODE_TYPE: return "StrictMode";
			case REACT_SUSPENSE_TYPE: return "Suspense";
			case REACT_SUSPENSE_LIST_TYPE: return "SuspenseList";
			case REACT_ACTIVITY_TYPE: return "Activity";
		}
		if ("object" === typeof type) switch (type.$$typeof) {
			case REACT_PORTAL_TYPE: return "Portal";
			case REACT_CONTEXT_TYPE: return type.displayName || "Context";
			case REACT_CONSUMER_TYPE: return (type._context.displayName || "Context") + ".Consumer";
			case REACT_FORWARD_REF_TYPE:
				var innerType = type.render;
				type = type.displayName;
				type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
				return type;
			case REACT_MEMO_TYPE: return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
			case REACT_LAZY_TYPE:
				innerType = type._payload;
				type = type._init;
				try {
					return getComponentNameFromType(type(innerType));
				} catch (x) {}
		}
		return null;
	}
	var isArrayImpl = Array.isArray, ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, ReactDOMSharedInternals = ReactDOM.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, sharedNotPendingObject = {
		pending: !1,
		data: null,
		method: null,
		action: null
	}, valueStack = [], index = -1;
	function createCursor(defaultValue) {
		return { current: defaultValue };
	}
	function pop(cursor) {
		0 > index || (cursor.current = valueStack[index], valueStack[index] = null, index--);
	}
	function push(cursor, value) {
		index++;
		valueStack[index] = cursor.current;
		cursor.current = value;
	}
	var contextStackCursor = createCursor(null), contextFiberStackCursor = createCursor(null), rootInstanceStackCursor = createCursor(null), hostTransitionProviderCursor = createCursor(null);
	function pushHostContainer(fiber, nextRootInstance) {
		push(rootInstanceStackCursor, nextRootInstance);
		push(contextFiberStackCursor, fiber);
		push(contextStackCursor, null);
		switch (nextRootInstance.nodeType) {
			case 9:
			case 11:
				fiber = (fiber = nextRootInstance.documentElement) ? (fiber = fiber.namespaceURI) ? getOwnHostContext(fiber) : 0 : 0;
				break;
			default: if (fiber = nextRootInstance.tagName, nextRootInstance = nextRootInstance.namespaceURI) nextRootInstance = getOwnHostContext(nextRootInstance), fiber = getChildHostContextProd(nextRootInstance, fiber);
			else switch (fiber) {
				case "svg":
					fiber = 1;
					break;
				case "math":
					fiber = 2;
					break;
				default: fiber = 0;
			}
		}
		pop(contextStackCursor);
		push(contextStackCursor, fiber);
	}
	function popHostContainer() {
		pop(contextStackCursor);
		pop(contextFiberStackCursor);
		pop(rootInstanceStackCursor);
	}
	function pushHostContext(fiber) {
		null !== fiber.memoizedState && push(hostTransitionProviderCursor, fiber);
		var context = contextStackCursor.current;
		var JSCompiler_inline_result = getChildHostContextProd(context, fiber.type);
		context !== JSCompiler_inline_result && (push(contextFiberStackCursor, fiber), push(contextStackCursor, JSCompiler_inline_result));
	}
	function popHostContext(fiber) {
		contextFiberStackCursor.current === fiber && (pop(contextStackCursor), pop(contextFiberStackCursor));
		hostTransitionProviderCursor.current === fiber && (pop(hostTransitionProviderCursor), HostTransitionContext._currentValue = sharedNotPendingObject);
	}
	var prefix, suffix;
	function describeBuiltInComponentFrame(name) {
		if (void 0 === prefix) try {
			throw Error();
		} catch (x) {
			var match = x.stack.trim().match(/\n( *(at )?)/);
			prefix = match && match[1] || "";
			suffix = -1 < x.stack.indexOf("\n    at") ? " (<anonymous>)" : -1 < x.stack.indexOf("@") ? "@unknown:0:0" : "";
		}
		return "\n" + prefix + name + suffix;
	}
	var reentry = !1;
	function describeNativeComponentFrame(fn, construct) {
		if (!fn || reentry) return "";
		reentry = !0;
		var previousPrepareStackTrace = Error.prepareStackTrace;
		Error.prepareStackTrace = void 0;
		try {
			var RunInRootFrame = { DetermineComponentFrameRoot: function() {
				try {
					if (construct) {
						var Fake = function() {
							throw Error();
						};
						Object.defineProperty(Fake.prototype, "props", { set: function() {
							throw Error();
						} });
						if ("object" === typeof Reflect && Reflect.construct) {
							try {
								Reflect.construct(Fake, []);
							} catch (x) {
								var control = x;
							}
							Reflect.construct(fn, [], Fake);
						} else {
							try {
								Fake.call();
							} catch (x$1) {
								control = x$1;
							}
							fn.call(Fake.prototype);
						}
					} else {
						try {
							throw Error();
						} catch (x$2) {
							control = x$2;
						}
						(Fake = fn()) && "function" === typeof Fake.catch && Fake.catch(function() {});
					}
				} catch (sample) {
					if (sample && control && "string" === typeof sample.stack) return [sample.stack, control.stack];
				}
				return [null, null];
			} };
			RunInRootFrame.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
			var namePropDescriptor = Object.getOwnPropertyDescriptor(RunInRootFrame.DetermineComponentFrameRoot, "name");
			namePropDescriptor && namePropDescriptor.configurable && Object.defineProperty(RunInRootFrame.DetermineComponentFrameRoot, "name", { value: "DetermineComponentFrameRoot" });
			var _RunInRootFrame$Deter = RunInRootFrame.DetermineComponentFrameRoot(), sampleStack = _RunInRootFrame$Deter[0], controlStack = _RunInRootFrame$Deter[1];
			if (sampleStack && controlStack) {
				var sampleLines = sampleStack.split("\n"), controlLines = controlStack.split("\n");
				for (namePropDescriptor = RunInRootFrame = 0; RunInRootFrame < sampleLines.length && !sampleLines[RunInRootFrame].includes("DetermineComponentFrameRoot");) RunInRootFrame++;
				for (; namePropDescriptor < controlLines.length && !controlLines[namePropDescriptor].includes("DetermineComponentFrameRoot");) namePropDescriptor++;
				if (RunInRootFrame === sampleLines.length || namePropDescriptor === controlLines.length) for (RunInRootFrame = sampleLines.length - 1, namePropDescriptor = controlLines.length - 1; 1 <= RunInRootFrame && 0 <= namePropDescriptor && sampleLines[RunInRootFrame] !== controlLines[namePropDescriptor];) namePropDescriptor--;
				for (; 1 <= RunInRootFrame && 0 <= namePropDescriptor; RunInRootFrame--, namePropDescriptor--) if (sampleLines[RunInRootFrame] !== controlLines[namePropDescriptor]) {
					if (1 !== RunInRootFrame || 1 !== namePropDescriptor) do
						if (RunInRootFrame--, namePropDescriptor--, 0 > namePropDescriptor || sampleLines[RunInRootFrame] !== controlLines[namePropDescriptor]) {
							var frame = "\n" + sampleLines[RunInRootFrame].replace(" at new ", " at ");
							fn.displayName && frame.includes("<anonymous>") && (frame = frame.replace("<anonymous>", fn.displayName));
							return frame;
						}
					while (1 <= RunInRootFrame && 0 <= namePropDescriptor);
					break;
				}
			}
		} finally {
			reentry = !1, Error.prepareStackTrace = previousPrepareStackTrace;
		}
		return (previousPrepareStackTrace = fn ? fn.displayName || fn.name : "") ? describeBuiltInComponentFrame(previousPrepareStackTrace) : "";
	}
	function describeFiber(fiber, childFiber) {
		switch (fiber.tag) {
			case 26:
			case 27:
			case 5: return describeBuiltInComponentFrame(fiber.type);
			case 16: return describeBuiltInComponentFrame("Lazy");
			case 13: return fiber.child !== childFiber && null !== childFiber ? describeBuiltInComponentFrame("Suspense Fallback") : describeBuiltInComponentFrame("Suspense");
			case 19: return describeBuiltInComponentFrame("SuspenseList");
			case 0:
			case 15: return describeNativeComponentFrame(fiber.type, !1);
			case 11: return describeNativeComponentFrame(fiber.type.render, !1);
			case 1: return describeNativeComponentFrame(fiber.type, !0);
			case 31: return describeBuiltInComponentFrame("Activity");
			default: return "";
		}
	}
	function getStackByFiberInDevAndProd(workInProgress) {
		try {
			var info = "", previous = null;
			do
				info += describeFiber(workInProgress, previous), previous = workInProgress, workInProgress = workInProgress.return;
			while (workInProgress);
			return info;
		} catch (x) {
			return "\nError generating stack: " + x.message + "\n" + x.stack;
		}
	}
	var hasOwnProperty = Object.prototype.hasOwnProperty, scheduleCallback$3 = Scheduler.unstable_scheduleCallback, cancelCallback$1 = Scheduler.unstable_cancelCallback, shouldYield = Scheduler.unstable_shouldYield, requestPaint = Scheduler.unstable_requestPaint, now = Scheduler.unstable_now, getCurrentPriorityLevel = Scheduler.unstable_getCurrentPriorityLevel, ImmediatePriority = Scheduler.unstable_ImmediatePriority, UserBlockingPriority = Scheduler.unstable_UserBlockingPriority, NormalPriority$1 = Scheduler.unstable_NormalPriority, LowPriority = Scheduler.unstable_LowPriority, IdlePriority = Scheduler.unstable_IdlePriority, log$1 = Scheduler.log, unstable_setDisableYieldValue = Scheduler.unstable_setDisableYieldValue, rendererID = null, injectedHook = null;
	function setIsStrictModeForDevtools(newIsStrictMode) {
		"function" === typeof log$1 && unstable_setDisableYieldValue(newIsStrictMode);
		if (injectedHook && "function" === typeof injectedHook.setStrictMode) try {
			injectedHook.setStrictMode(rendererID, newIsStrictMode);
		} catch (err) {}
	}
	var clz32 = Math.clz32 ? Math.clz32 : clz32Fallback, log = Math.log, LN2 = Math.LN2;
	function clz32Fallback(x) {
		x >>>= 0;
		return 0 === x ? 32 : 31 - (log(x) / LN2 | 0) | 0;
	}
	var nextTransitionUpdateLane = 256, nextTransitionDeferredLane = 262144, nextRetryLane = 4194304;
	function getHighestPriorityLanes(lanes) {
		var pendingSyncLanes = lanes & 42;
		if (0 !== pendingSyncLanes) return pendingSyncLanes;
		switch (lanes & -lanes) {
			case 1: return 1;
			case 2: return 2;
			case 4: return 4;
			case 8: return 8;
			case 16: return 16;
			case 32: return 32;
			case 64: return 64;
			case 128: return 128;
			case 256:
			case 512:
			case 1024:
			case 2048:
			case 4096:
			case 8192:
			case 16384:
			case 32768:
			case 65536:
			case 131072: return lanes & 261888;
			case 262144:
			case 524288:
			case 1048576:
			case 2097152: return lanes & 3932160;
			case 4194304:
			case 8388608:
			case 16777216:
			case 33554432: return lanes & 62914560;
			case 67108864: return 67108864;
			case 134217728: return 134217728;
			case 268435456: return 268435456;
			case 536870912: return 536870912;
			case 1073741824: return 0;
			default: return lanes;
		}
	}
	function getNextLanes(root, wipLanes, rootHasPendingCommit) {
		var pendingLanes = root.pendingLanes;
		if (0 === pendingLanes) return 0;
		var nextLanes = 0, suspendedLanes = root.suspendedLanes, pingedLanes = root.pingedLanes;
		root = root.warmLanes;
		var nonIdlePendingLanes = pendingLanes & 134217727;
		0 !== nonIdlePendingLanes ? (pendingLanes = nonIdlePendingLanes & ~suspendedLanes, 0 !== pendingLanes ? nextLanes = getHighestPriorityLanes(pendingLanes) : (pingedLanes &= nonIdlePendingLanes, 0 !== pingedLanes ? nextLanes = getHighestPriorityLanes(pingedLanes) : rootHasPendingCommit || (rootHasPendingCommit = nonIdlePendingLanes & ~root, 0 !== rootHasPendingCommit && (nextLanes = getHighestPriorityLanes(rootHasPendingCommit))))) : (nonIdlePendingLanes = pendingLanes & ~suspendedLanes, 0 !== nonIdlePendingLanes ? nextLanes = getHighestPriorityLanes(nonIdlePendingLanes) : 0 !== pingedLanes ? nextLanes = getHighestPriorityLanes(pingedLanes) : rootHasPendingCommit || (rootHasPendingCommit = pendingLanes & ~root, 0 !== rootHasPendingCommit && (nextLanes = getHighestPriorityLanes(rootHasPendingCommit))));
		return 0 === nextLanes ? 0 : 0 !== wipLanes && wipLanes !== nextLanes && 0 === (wipLanes & suspendedLanes) && (suspendedLanes = nextLanes & -nextLanes, rootHasPendingCommit = wipLanes & -wipLanes, suspendedLanes >= rootHasPendingCommit || 32 === suspendedLanes && 0 !== (rootHasPendingCommit & 4194048)) ? wipLanes : nextLanes;
	}
	function checkIfRootIsPrerendering(root, renderLanes) {
		return 0 === (root.pendingLanes & ~(root.suspendedLanes & ~root.pingedLanes) & renderLanes);
	}
	function computeExpirationTime(lane, currentTime) {
		switch (lane) {
			case 1:
			case 2:
			case 4:
			case 8:
			case 64: return currentTime + 250;
			case 16:
			case 32:
			case 128:
			case 256:
			case 512:
			case 1024:
			case 2048:
			case 4096:
			case 8192:
			case 16384:
			case 32768:
			case 65536:
			case 131072:
			case 262144:
			case 524288:
			case 1048576:
			case 2097152: return currentTime + 5e3;
			case 4194304:
			case 8388608:
			case 16777216:
			case 33554432: return -1;
			case 67108864:
			case 134217728:
			case 268435456:
			case 536870912:
			case 1073741824: return -1;
			default: return -1;
		}
	}
	function claimNextRetryLane() {
		var lane = nextRetryLane;
		nextRetryLane <<= 1;
		0 === (nextRetryLane & 62914560) && (nextRetryLane = 4194304);
		return lane;
	}
	function createLaneMap(initial) {
		for (var laneMap = [], i = 0; 31 > i; i++) laneMap.push(initial);
		return laneMap;
	}
	function markRootUpdated$1(root, updateLane) {
		root.pendingLanes |= updateLane;
		268435456 !== updateLane && (root.suspendedLanes = 0, root.pingedLanes = 0, root.warmLanes = 0);
	}
	function markRootFinished(root, finishedLanes, remainingLanes, spawnedLane, updatedLanes, suspendedRetryLanes) {
		var previouslyPendingLanes = root.pendingLanes;
		root.pendingLanes = remainingLanes;
		root.suspendedLanes = 0;
		root.pingedLanes = 0;
		root.warmLanes = 0;
		root.expiredLanes &= remainingLanes;
		root.entangledLanes &= remainingLanes;
		root.errorRecoveryDisabledLanes &= remainingLanes;
		root.shellSuspendCounter = 0;
		var entanglements = root.entanglements, expirationTimes = root.expirationTimes, hiddenUpdates = root.hiddenUpdates;
		for (remainingLanes = previouslyPendingLanes & ~remainingLanes; 0 < remainingLanes;) {
			var index$7 = 31 - clz32(remainingLanes), lane = 1 << index$7;
			entanglements[index$7] = 0;
			expirationTimes[index$7] = -1;
			var hiddenUpdatesForLane = hiddenUpdates[index$7];
			if (null !== hiddenUpdatesForLane) for (hiddenUpdates[index$7] = null, index$7 = 0; index$7 < hiddenUpdatesForLane.length; index$7++) {
				var update = hiddenUpdatesForLane[index$7];
				null !== update && (update.lane &= -536870913);
			}
			remainingLanes &= ~lane;
		}
		0 !== spawnedLane && markSpawnedDeferredLane(root, spawnedLane, 0);
		0 !== suspendedRetryLanes && 0 === updatedLanes && 0 !== root.tag && (root.suspendedLanes |= suspendedRetryLanes & ~(previouslyPendingLanes & ~finishedLanes));
	}
	function markSpawnedDeferredLane(root, spawnedLane, entangledLanes) {
		root.pendingLanes |= spawnedLane;
		root.suspendedLanes &= ~spawnedLane;
		var spawnedLaneIndex = 31 - clz32(spawnedLane);
		root.entangledLanes |= spawnedLane;
		root.entanglements[spawnedLaneIndex] = root.entanglements[spawnedLaneIndex] | 1073741824 | entangledLanes & 261930;
	}
	function markRootEntangled(root, entangledLanes) {
		var rootEntangledLanes = root.entangledLanes |= entangledLanes;
		for (root = root.entanglements; rootEntangledLanes;) {
			var index$8 = 31 - clz32(rootEntangledLanes), lane = 1 << index$8;
			lane & entangledLanes | root[index$8] & entangledLanes && (root[index$8] |= entangledLanes);
			rootEntangledLanes &= ~lane;
		}
	}
	function getBumpedLaneForHydration(root, renderLanes) {
		var renderLane = renderLanes & -renderLanes;
		renderLane = 0 !== (renderLane & 42) ? 1 : getBumpedLaneForHydrationByLane(renderLane);
		return 0 !== (renderLane & (root.suspendedLanes | renderLanes)) ? 0 : renderLane;
	}
	function getBumpedLaneForHydrationByLane(lane) {
		switch (lane) {
			case 2:
				lane = 1;
				break;
			case 8:
				lane = 4;
				break;
			case 32:
				lane = 16;
				break;
			case 256:
			case 512:
			case 1024:
			case 2048:
			case 4096:
			case 8192:
			case 16384:
			case 32768:
			case 65536:
			case 131072:
			case 262144:
			case 524288:
			case 1048576:
			case 2097152:
			case 4194304:
			case 8388608:
			case 16777216:
			case 33554432:
				lane = 128;
				break;
			case 268435456:
				lane = 134217728;
				break;
			default: lane = 0;
		}
		return lane;
	}
	function lanesToEventPriority(lanes) {
		lanes &= -lanes;
		return 2 < lanes ? 8 < lanes ? 0 !== (lanes & 134217727) ? 32 : 268435456 : 8 : 2;
	}
	function resolveUpdatePriority() {
		var updatePriority = ReactDOMSharedInternals.p;
		if (0 !== updatePriority) return updatePriority;
		updatePriority = window.event;
		return void 0 === updatePriority ? 32 : getEventPriority(updatePriority.type);
	}
	function runWithPriority(priority, fn) {
		var previousPriority = ReactDOMSharedInternals.p;
		try {
			return ReactDOMSharedInternals.p = priority, fn();
		} finally {
			ReactDOMSharedInternals.p = previousPriority;
		}
	}
	var randomKey = Math.random().toString(36).slice(2), internalInstanceKey = "__reactFiber$" + randomKey, internalPropsKey = "__reactProps$" + randomKey, internalContainerInstanceKey = "__reactContainer$" + randomKey, internalEventHandlersKey = "__reactEvents$" + randomKey, internalEventHandlerListenersKey = "__reactListeners$" + randomKey, internalEventHandlesSetKey = "__reactHandles$" + randomKey, internalRootNodeResourcesKey = "__reactResources$" + randomKey, internalHoistableMarker = "__reactMarker$" + randomKey;
	function detachDeletedInstance(node) {
		delete node[internalInstanceKey];
		delete node[internalPropsKey];
		delete node[internalEventHandlersKey];
		delete node[internalEventHandlerListenersKey];
		delete node[internalEventHandlesSetKey];
	}
	function getClosestInstanceFromNode(targetNode) {
		var targetInst = targetNode[internalInstanceKey];
		if (targetInst) return targetInst;
		for (var parentNode = targetNode.parentNode; parentNode;) {
			if (targetInst = parentNode[internalContainerInstanceKey] || parentNode[internalInstanceKey]) {
				parentNode = targetInst.alternate;
				if (null !== targetInst.child || null !== parentNode && null !== parentNode.child) for (targetNode = getParentHydrationBoundary(targetNode); null !== targetNode;) {
					if (parentNode = targetNode[internalInstanceKey]) return parentNode;
					targetNode = getParentHydrationBoundary(targetNode);
				}
				return targetInst;
			}
			targetNode = parentNode;
			parentNode = targetNode.parentNode;
		}
		return null;
	}
	function getInstanceFromNode(node) {
		if (node = node[internalInstanceKey] || node[internalContainerInstanceKey]) {
			var tag = node.tag;
			if (5 === tag || 6 === tag || 13 === tag || 31 === tag || 26 === tag || 27 === tag || 3 === tag) return node;
		}
		return null;
	}
	function getNodeFromInstance(inst) {
		var tag = inst.tag;
		if (5 === tag || 26 === tag || 27 === tag || 6 === tag) return inst.stateNode;
		throw Error(formatProdErrorMessage(33));
	}
	function getResourcesFromRoot(root) {
		var resources = root[internalRootNodeResourcesKey];
		resources || (resources = root[internalRootNodeResourcesKey] = {
			hoistableStyles: /* @__PURE__ */ new Map(),
			hoistableScripts: /* @__PURE__ */ new Map()
		});
		return resources;
	}
	function markNodeAsHoistable(node) {
		node[internalHoistableMarker] = !0;
	}
	var allNativeEvents = /* @__PURE__ */ new Set(), registrationNameDependencies = {};
	function registerTwoPhaseEvent(registrationName, dependencies) {
		registerDirectEvent(registrationName, dependencies);
		registerDirectEvent(registrationName + "Capture", dependencies);
	}
	function registerDirectEvent(registrationName, dependencies) {
		registrationNameDependencies[registrationName] = dependencies;
		for (registrationName = 0; registrationName < dependencies.length; registrationName++) allNativeEvents.add(dependencies[registrationName]);
	}
	var VALID_ATTRIBUTE_NAME_REGEX = RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"), illegalAttributeNameCache = {}, validatedAttributeNameCache = {};
	function isAttributeNameSafe(attributeName) {
		if (hasOwnProperty.call(validatedAttributeNameCache, attributeName)) return !0;
		if (hasOwnProperty.call(illegalAttributeNameCache, attributeName)) return !1;
		if (VALID_ATTRIBUTE_NAME_REGEX.test(attributeName)) return validatedAttributeNameCache[attributeName] = !0;
		illegalAttributeNameCache[attributeName] = !0;
		return !1;
	}
	function setValueForAttribute(node, name, value) {
		if (isAttributeNameSafe(name)) if (null === value) node.removeAttribute(name);
		else {
			switch (typeof value) {
				case "undefined":
				case "function":
				case "symbol":
					node.removeAttribute(name);
					return;
				case "boolean":
					var prefix$10 = name.toLowerCase().slice(0, 5);
					if ("data-" !== prefix$10 && "aria-" !== prefix$10) {
						node.removeAttribute(name);
						return;
					}
			}
			node.setAttribute(name, "" + value);
		}
	}
	function setValueForKnownAttribute(node, name, value) {
		if (null === value) node.removeAttribute(name);
		else {
			switch (typeof value) {
				case "undefined":
				case "function":
				case "symbol":
				case "boolean":
					node.removeAttribute(name);
					return;
			}
			node.setAttribute(name, "" + value);
		}
	}
	function setValueForNamespacedAttribute(node, namespace, name, value) {
		if (null === value) node.removeAttribute(name);
		else {
			switch (typeof value) {
				case "undefined":
				case "function":
				case "symbol":
				case "boolean":
					node.removeAttribute(name);
					return;
			}
			node.setAttributeNS(namespace, name, "" + value);
		}
	}
	function getToStringValue(value) {
		switch (typeof value) {
			case "bigint":
			case "boolean":
			case "number":
			case "string":
			case "undefined": return value;
			case "object": return value;
			default: return "";
		}
	}
	function isCheckable(elem) {
		var type = elem.type;
		return (elem = elem.nodeName) && "input" === elem.toLowerCase() && ("checkbox" === type || "radio" === type);
	}
	function trackValueOnNode(node, valueField, currentValue) {
		var descriptor = Object.getOwnPropertyDescriptor(node.constructor.prototype, valueField);
		if (!node.hasOwnProperty(valueField) && "undefined" !== typeof descriptor && "function" === typeof descriptor.get && "function" === typeof descriptor.set) {
			var get = descriptor.get, set = descriptor.set;
			Object.defineProperty(node, valueField, {
				configurable: !0,
				get: function() {
					return get.call(this);
				},
				set: function(value) {
					currentValue = "" + value;
					set.call(this, value);
				}
			});
			Object.defineProperty(node, valueField, { enumerable: descriptor.enumerable });
			return {
				getValue: function() {
					return currentValue;
				},
				setValue: function(value) {
					currentValue = "" + value;
				},
				stopTracking: function() {
					node._valueTracker = null;
					delete node[valueField];
				}
			};
		}
	}
	function track(node) {
		if (!node._valueTracker) {
			var valueField = isCheckable(node) ? "checked" : "value";
			node._valueTracker = trackValueOnNode(node, valueField, "" + node[valueField]);
		}
	}
	function updateValueIfChanged(node) {
		if (!node) return !1;
		var tracker = node._valueTracker;
		if (!tracker) return !0;
		var lastValue = tracker.getValue();
		var value = "";
		node && (value = isCheckable(node) ? node.checked ? "true" : "false" : node.value);
		node = value;
		return node !== lastValue ? (tracker.setValue(node), !0) : !1;
	}
	function getActiveElement(doc) {
		doc = doc || ("undefined" !== typeof document ? document : void 0);
		if ("undefined" === typeof doc) return null;
		try {
			return doc.activeElement || doc.body;
		} catch (e) {
			return doc.body;
		}
	}
	var escapeSelectorAttributeValueInsideDoubleQuotesRegex = /[\n"\\]/g;
	function escapeSelectorAttributeValueInsideDoubleQuotes(value) {
		return value.replace(escapeSelectorAttributeValueInsideDoubleQuotesRegex, function(ch) {
			return "\\" + ch.charCodeAt(0).toString(16) + " ";
		});
	}
	function updateInput(element, value, defaultValue, lastDefaultValue, checked, defaultChecked, type, name) {
		element.name = "";
		null != type && "function" !== typeof type && "symbol" !== typeof type && "boolean" !== typeof type ? element.type = type : element.removeAttribute("type");
		if (null != value) if ("number" === type) {
			if (0 === value && "" === element.value || element.value != value) element.value = "" + getToStringValue(value);
		} else element.value !== "" + getToStringValue(value) && (element.value = "" + getToStringValue(value));
		else "submit" !== type && "reset" !== type || element.removeAttribute("value");
		null != value ? setDefaultValue(element, type, getToStringValue(value)) : null != defaultValue ? setDefaultValue(element, type, getToStringValue(defaultValue)) : null != lastDefaultValue && element.removeAttribute("value");
		null == checked && null != defaultChecked && (element.defaultChecked = !!defaultChecked);
		null != checked && (element.checked = checked && "function" !== typeof checked && "symbol" !== typeof checked);
		null != name && "function" !== typeof name && "symbol" !== typeof name && "boolean" !== typeof name ? element.name = "" + getToStringValue(name) : element.removeAttribute("name");
	}
	function initInput(element, value, defaultValue, checked, defaultChecked, type, name, isHydrating) {
		null != type && "function" !== typeof type && "symbol" !== typeof type && "boolean" !== typeof type && (element.type = type);
		if (null != value || null != defaultValue) {
			if (!("submit" !== type && "reset" !== type || void 0 !== value && null !== value)) {
				track(element);
				return;
			}
			defaultValue = null != defaultValue ? "" + getToStringValue(defaultValue) : "";
			value = null != value ? "" + getToStringValue(value) : defaultValue;
			isHydrating || value === element.value || (element.value = value);
			element.defaultValue = value;
		}
		checked = null != checked ? checked : defaultChecked;
		checked = "function" !== typeof checked && "symbol" !== typeof checked && !!checked;
		element.checked = isHydrating ? element.checked : !!checked;
		element.defaultChecked = !!checked;
		null != name && "function" !== typeof name && "symbol" !== typeof name && "boolean" !== typeof name && (element.name = name);
		track(element);
	}
	function setDefaultValue(node, type, value) {
		"number" === type && getActiveElement(node.ownerDocument) === node || node.defaultValue === "" + value || (node.defaultValue = "" + value);
	}
	function updateOptions(node, multiple, propValue, setDefaultSelected) {
		node = node.options;
		if (multiple) {
			multiple = {};
			for (var i = 0; i < propValue.length; i++) multiple["$" + propValue[i]] = !0;
			for (propValue = 0; propValue < node.length; propValue++) i = multiple.hasOwnProperty("$" + node[propValue].value), node[propValue].selected !== i && (node[propValue].selected = i), i && setDefaultSelected && (node[propValue].defaultSelected = !0);
		} else {
			propValue = "" + getToStringValue(propValue);
			multiple = null;
			for (i = 0; i < node.length; i++) {
				if (node[i].value === propValue) {
					node[i].selected = !0;
					setDefaultSelected && (node[i].defaultSelected = !0);
					return;
				}
				null !== multiple || node[i].disabled || (multiple = node[i]);
			}
			null !== multiple && (multiple.selected = !0);
		}
	}
	function updateTextarea(element, value, defaultValue) {
		if (null != value && (value = "" + getToStringValue(value), value !== element.value && (element.value = value), null == defaultValue)) {
			element.defaultValue !== value && (element.defaultValue = value);
			return;
		}
		element.defaultValue = null != defaultValue ? "" + getToStringValue(defaultValue) : "";
	}
	function initTextarea(element, value, defaultValue, children) {
		if (null == value) {
			if (null != children) {
				if (null != defaultValue) throw Error(formatProdErrorMessage(92));
				if (isArrayImpl(children)) {
					if (1 < children.length) throw Error(formatProdErrorMessage(93));
					children = children[0];
				}
				defaultValue = children;
			}
			defaultValue ??= "";
			value = defaultValue;
		}
		defaultValue = getToStringValue(value);
		element.defaultValue = defaultValue;
		children = element.textContent;
		children === defaultValue && "" !== children && null !== children && (element.value = children);
		track(element);
	}
	function setTextContent(node, text) {
		if (text) {
			var firstChild = node.firstChild;
			if (firstChild && firstChild === node.lastChild && 3 === firstChild.nodeType) {
				firstChild.nodeValue = text;
				return;
			}
		}
		node.textContent = text;
	}
	var unitlessNumbers = new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));
	function setValueForStyle(style, styleName, value) {
		var isCustomProperty = 0 === styleName.indexOf("--");
		null == value || "boolean" === typeof value || "" === value ? isCustomProperty ? style.setProperty(styleName, "") : "float" === styleName ? style.cssFloat = "" : style[styleName] = "" : isCustomProperty ? style.setProperty(styleName, value) : "number" !== typeof value || 0 === value || unitlessNumbers.has(styleName) ? "float" === styleName ? style.cssFloat = value : style[styleName] = ("" + value).trim() : style[styleName] = value + "px";
	}
	function setValueForStyles(node, styles, prevStyles) {
		if (null != styles && "object" !== typeof styles) throw Error(formatProdErrorMessage(62));
		node = node.style;
		if (null != prevStyles) {
			for (var styleName in prevStyles) !prevStyles.hasOwnProperty(styleName) || null != styles && styles.hasOwnProperty(styleName) || (0 === styleName.indexOf("--") ? node.setProperty(styleName, "") : "float" === styleName ? node.cssFloat = "" : node[styleName] = "");
			for (var styleName$16 in styles) styleName = styles[styleName$16], styles.hasOwnProperty(styleName$16) && prevStyles[styleName$16] !== styleName && setValueForStyle(node, styleName$16, styleName);
		} else for (var styleName$17 in styles) styles.hasOwnProperty(styleName$17) && setValueForStyle(node, styleName$17, styles[styleName$17]);
	}
	function isCustomElement(tagName) {
		if (-1 === tagName.indexOf("-")) return !1;
		switch (tagName) {
			case "annotation-xml":
			case "color-profile":
			case "font-face":
			case "font-face-src":
			case "font-face-uri":
			case "font-face-format":
			case "font-face-name":
			case "missing-glyph": return !1;
			default: return !0;
		}
	}
	var aliases = new Map([
		["acceptCharset", "accept-charset"],
		["htmlFor", "for"],
		["httpEquiv", "http-equiv"],
		["crossOrigin", "crossorigin"],
		["accentHeight", "accent-height"],
		["alignmentBaseline", "alignment-baseline"],
		["arabicForm", "arabic-form"],
		["baselineShift", "baseline-shift"],
		["capHeight", "cap-height"],
		["clipPath", "clip-path"],
		["clipRule", "clip-rule"],
		["colorInterpolation", "color-interpolation"],
		["colorInterpolationFilters", "color-interpolation-filters"],
		["colorProfile", "color-profile"],
		["colorRendering", "color-rendering"],
		["dominantBaseline", "dominant-baseline"],
		["enableBackground", "enable-background"],
		["fillOpacity", "fill-opacity"],
		["fillRule", "fill-rule"],
		["floodColor", "flood-color"],
		["floodOpacity", "flood-opacity"],
		["fontFamily", "font-family"],
		["fontSize", "font-size"],
		["fontSizeAdjust", "font-size-adjust"],
		["fontStretch", "font-stretch"],
		["fontStyle", "font-style"],
		["fontVariant", "font-variant"],
		["fontWeight", "font-weight"],
		["glyphName", "glyph-name"],
		["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
		["glyphOrientationVertical", "glyph-orientation-vertical"],
		["horizAdvX", "horiz-adv-x"],
		["horizOriginX", "horiz-origin-x"],
		["imageRendering", "image-rendering"],
		["letterSpacing", "letter-spacing"],
		["lightingColor", "lighting-color"],
		["markerEnd", "marker-end"],
		["markerMid", "marker-mid"],
		["markerStart", "marker-start"],
		["overlinePosition", "overline-position"],
		["overlineThickness", "overline-thickness"],
		["paintOrder", "paint-order"],
		["panose-1", "panose-1"],
		["pointerEvents", "pointer-events"],
		["renderingIntent", "rendering-intent"],
		["shapeRendering", "shape-rendering"],
		["stopColor", "stop-color"],
		["stopOpacity", "stop-opacity"],
		["strikethroughPosition", "strikethrough-position"],
		["strikethroughThickness", "strikethrough-thickness"],
		["strokeDasharray", "stroke-dasharray"],
		["strokeDashoffset", "stroke-dashoffset"],
		["strokeLinecap", "stroke-linecap"],
		["strokeLinejoin", "stroke-linejoin"],
		["strokeMiterlimit", "stroke-miterlimit"],
		["strokeOpacity", "stroke-opacity"],
		["strokeWidth", "stroke-width"],
		["textAnchor", "text-anchor"],
		["textDecoration", "text-decoration"],
		["textRendering", "text-rendering"],
		["transformOrigin", "transform-origin"],
		["underlinePosition", "underline-position"],
		["underlineThickness", "underline-thickness"],
		["unicodeBidi", "unicode-bidi"],
		["unicodeRange", "unicode-range"],
		["unitsPerEm", "units-per-em"],
		["vAlphabetic", "v-alphabetic"],
		["vHanging", "v-hanging"],
		["vIdeographic", "v-ideographic"],
		["vMathematical", "v-mathematical"],
		["vectorEffect", "vector-effect"],
		["vertAdvY", "vert-adv-y"],
		["vertOriginX", "vert-origin-x"],
		["vertOriginY", "vert-origin-y"],
		["wordSpacing", "word-spacing"],
		["writingMode", "writing-mode"],
		["xmlnsXlink", "xmlns:xlink"],
		["xHeight", "x-height"]
	]), isJavaScriptProtocol = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
	function sanitizeURL(url) {
		return isJavaScriptProtocol.test("" + url) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : url;
	}
	function noop$1() {}
	var currentReplayingEvent = null;
	function getEventTarget(nativeEvent) {
		nativeEvent = nativeEvent.target || nativeEvent.srcElement || window;
		nativeEvent.correspondingUseElement && (nativeEvent = nativeEvent.correspondingUseElement);
		return 3 === nativeEvent.nodeType ? nativeEvent.parentNode : nativeEvent;
	}
	var restoreTarget = null, restoreQueue = null;
	function restoreStateOfTarget(target) {
		var internalInstance = getInstanceFromNode(target);
		if (internalInstance && (target = internalInstance.stateNode)) {
			var props = target[internalPropsKey] || null;
			a: switch (target = internalInstance.stateNode, internalInstance.type) {
				case "input":
					updateInput(target, props.value, props.defaultValue, props.defaultValue, props.checked, props.defaultChecked, props.type, props.name);
					internalInstance = props.name;
					if ("radio" === props.type && null != internalInstance) {
						for (props = target; props.parentNode;) props = props.parentNode;
						props = props.querySelectorAll("input[name=\"" + escapeSelectorAttributeValueInsideDoubleQuotes("" + internalInstance) + "\"][type=\"radio\"]");
						for (internalInstance = 0; internalInstance < props.length; internalInstance++) {
							var otherNode = props[internalInstance];
							if (otherNode !== target && otherNode.form === target.form) {
								var otherProps = otherNode[internalPropsKey] || null;
								if (!otherProps) throw Error(formatProdErrorMessage(90));
								updateInput(otherNode, otherProps.value, otherProps.defaultValue, otherProps.defaultValue, otherProps.checked, otherProps.defaultChecked, otherProps.type, otherProps.name);
							}
						}
						for (internalInstance = 0; internalInstance < props.length; internalInstance++) otherNode = props[internalInstance], otherNode.form === target.form && updateValueIfChanged(otherNode);
					}
					break a;
				case "textarea":
					updateTextarea(target, props.value, props.defaultValue);
					break a;
				case "select": internalInstance = props.value, null != internalInstance && updateOptions(target, !!props.multiple, internalInstance, !1);
			}
		}
	}
	var isInsideEventHandler = !1;
	function batchedUpdates$1(fn, a, b) {
		if (isInsideEventHandler) return fn(a, b);
		isInsideEventHandler = !0;
		try {
			return fn(a);
		} finally {
			if (isInsideEventHandler = !1, null !== restoreTarget || null !== restoreQueue) {
				if (flushSyncWork$1(), restoreTarget && (a = restoreTarget, fn = restoreQueue, restoreQueue = restoreTarget = null, restoreStateOfTarget(a), fn)) for (a = 0; a < fn.length; a++) restoreStateOfTarget(fn[a]);
			}
		}
	}
	function getListener(inst, registrationName) {
		var stateNode = inst.stateNode;
		if (null === stateNode) return null;
		var props = stateNode[internalPropsKey] || null;
		if (null === props) return null;
		stateNode = props[registrationName];
		a: switch (registrationName) {
			case "onClick":
			case "onClickCapture":
			case "onDoubleClick":
			case "onDoubleClickCapture":
			case "onMouseDown":
			case "onMouseDownCapture":
			case "onMouseMove":
			case "onMouseMoveCapture":
			case "onMouseUp":
			case "onMouseUpCapture":
			case "onMouseEnter":
				(props = !props.disabled) || (inst = inst.type, props = !("button" === inst || "input" === inst || "select" === inst || "textarea" === inst));
				inst = !props;
				break a;
			default: inst = !1;
		}
		if (inst) return null;
		if (stateNode && "function" !== typeof stateNode) throw Error(formatProdErrorMessage(231, registrationName, typeof stateNode));
		return stateNode;
	}
	var canUseDOM = !("undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement), passiveBrowserEventsSupported = !1;
	if (canUseDOM) try {
		var options = {};
		Object.defineProperty(options, "passive", { get: function() {
			passiveBrowserEventsSupported = !0;
		} });
		window.addEventListener("test", options, options);
		window.removeEventListener("test", options, options);
	} catch (e) {
		passiveBrowserEventsSupported = !1;
	}
	var root = null, startText = null, fallbackText = null;
	function getData() {
		if (fallbackText) return fallbackText;
		var start, startValue = startText, startLength = startValue.length, end, endValue = "value" in root ? root.value : root.textContent, endLength = endValue.length;
		for (start = 0; start < startLength && startValue[start] === endValue[start]; start++);
		var minEnd = startLength - start;
		for (end = 1; end <= minEnd && startValue[startLength - end] === endValue[endLength - end]; end++);
		return fallbackText = endValue.slice(start, 1 < end ? 1 - end : void 0);
	}
	function getEventCharCode(nativeEvent) {
		var keyCode = nativeEvent.keyCode;
		"charCode" in nativeEvent ? (nativeEvent = nativeEvent.charCode, 0 === nativeEvent && 13 === keyCode && (nativeEvent = 13)) : nativeEvent = keyCode;
		10 === nativeEvent && (nativeEvent = 13);
		return 32 <= nativeEvent || 13 === nativeEvent ? nativeEvent : 0;
	}
	function functionThatReturnsTrue() {
		return !0;
	}
	function functionThatReturnsFalse() {
		return !1;
	}
	function createSyntheticEvent(Interface) {
		function SyntheticBaseEvent(reactName, reactEventType, targetInst, nativeEvent, nativeEventTarget) {
			this._reactName = reactName;
			this._targetInst = targetInst;
			this.type = reactEventType;
			this.nativeEvent = nativeEvent;
			this.target = nativeEventTarget;
			this.currentTarget = null;
			for (var propName in Interface) Interface.hasOwnProperty(propName) && (reactName = Interface[propName], this[propName] = reactName ? reactName(nativeEvent) : nativeEvent[propName]);
			this.isDefaultPrevented = (null != nativeEvent.defaultPrevented ? nativeEvent.defaultPrevented : !1 === nativeEvent.returnValue) ? functionThatReturnsTrue : functionThatReturnsFalse;
			this.isPropagationStopped = functionThatReturnsFalse;
			return this;
		}
		assign(SyntheticBaseEvent.prototype, {
			preventDefault: function() {
				this.defaultPrevented = !0;
				var event = this.nativeEvent;
				event && (event.preventDefault ? event.preventDefault() : "unknown" !== typeof event.returnValue && (event.returnValue = !1), this.isDefaultPrevented = functionThatReturnsTrue);
			},
			stopPropagation: function() {
				var event = this.nativeEvent;
				event && (event.stopPropagation ? event.stopPropagation() : "unknown" !== typeof event.cancelBubble && (event.cancelBubble = !0), this.isPropagationStopped = functionThatReturnsTrue);
			},
			persist: function() {},
			isPersistent: functionThatReturnsTrue
		});
		return SyntheticBaseEvent;
	}
	var EventInterface = {
		eventPhase: 0,
		bubbles: 0,
		cancelable: 0,
		timeStamp: function(event) {
			return event.timeStamp || Date.now();
		},
		defaultPrevented: 0,
		isTrusted: 0
	}, SyntheticEvent = createSyntheticEvent(EventInterface), UIEventInterface = assign({}, EventInterface, {
		view: 0,
		detail: 0
	}), SyntheticUIEvent = createSyntheticEvent(UIEventInterface), lastMovementX, lastMovementY, lastMouseEvent, MouseEventInterface = assign({}, UIEventInterface, {
		screenX: 0,
		screenY: 0,
		clientX: 0,
		clientY: 0,
		pageX: 0,
		pageY: 0,
		ctrlKey: 0,
		shiftKey: 0,
		altKey: 0,
		metaKey: 0,
		getModifierState: getEventModifierState,
		button: 0,
		buttons: 0,
		relatedTarget: function(event) {
			return void 0 === event.relatedTarget ? event.fromElement === event.srcElement ? event.toElement : event.fromElement : event.relatedTarget;
		},
		movementX: function(event) {
			if ("movementX" in event) return event.movementX;
			event !== lastMouseEvent && (lastMouseEvent && "mousemove" === event.type ? (lastMovementX = event.screenX - lastMouseEvent.screenX, lastMovementY = event.screenY - lastMouseEvent.screenY) : lastMovementY = lastMovementX = 0, lastMouseEvent = event);
			return lastMovementX;
		},
		movementY: function(event) {
			return "movementY" in event ? event.movementY : lastMovementY;
		}
	}), SyntheticMouseEvent = createSyntheticEvent(MouseEventInterface), SyntheticDragEvent = createSyntheticEvent(assign({}, MouseEventInterface, { dataTransfer: 0 })), SyntheticFocusEvent = createSyntheticEvent(assign({}, UIEventInterface, { relatedTarget: 0 })), SyntheticAnimationEvent = createSyntheticEvent(assign({}, EventInterface, {
		animationName: 0,
		elapsedTime: 0,
		pseudoElement: 0
	})), SyntheticClipboardEvent = createSyntheticEvent(assign({}, EventInterface, { clipboardData: function(event) {
		return "clipboardData" in event ? event.clipboardData : window.clipboardData;
	} })), SyntheticCompositionEvent = createSyntheticEvent(assign({}, EventInterface, { data: 0 })), normalizeKey = {
		Esc: "Escape",
		Spacebar: " ",
		Left: "ArrowLeft",
		Up: "ArrowUp",
		Right: "ArrowRight",
		Down: "ArrowDown",
		Del: "Delete",
		Win: "OS",
		Menu: "ContextMenu",
		Apps: "ContextMenu",
		Scroll: "ScrollLock",
		MozPrintableKey: "Unidentified"
	}, translateToKey = {
		8: "Backspace",
		9: "Tab",
		12: "Clear",
		13: "Enter",
		16: "Shift",
		17: "Control",
		18: "Alt",
		19: "Pause",
		20: "CapsLock",
		27: "Escape",
		32: " ",
		33: "PageUp",
		34: "PageDown",
		35: "End",
		36: "Home",
		37: "ArrowLeft",
		38: "ArrowUp",
		39: "ArrowRight",
		40: "ArrowDown",
		45: "Insert",
		46: "Delete",
		112: "F1",
		113: "F2",
		114: "F3",
		115: "F4",
		116: "F5",
		117: "F6",
		118: "F7",
		119: "F8",
		120: "F9",
		121: "F10",
		122: "F11",
		123: "F12",
		144: "NumLock",
		145: "ScrollLock",
		224: "Meta"
	}, modifierKeyToProp = {
		Alt: "altKey",
		Control: "ctrlKey",
		Meta: "metaKey",
		Shift: "shiftKey"
	};
	function modifierStateGetter(keyArg) {
		var nativeEvent = this.nativeEvent;
		return nativeEvent.getModifierState ? nativeEvent.getModifierState(keyArg) : (keyArg = modifierKeyToProp[keyArg]) ? !!nativeEvent[keyArg] : !1;
	}
	function getEventModifierState() {
		return modifierStateGetter;
	}
	var SyntheticKeyboardEvent = createSyntheticEvent(assign({}, UIEventInterface, {
		key: function(nativeEvent) {
			if (nativeEvent.key) {
				var key = normalizeKey[nativeEvent.key] || nativeEvent.key;
				if ("Unidentified" !== key) return key;
			}
			return "keypress" === nativeEvent.type ? (nativeEvent = getEventCharCode(nativeEvent), 13 === nativeEvent ? "Enter" : String.fromCharCode(nativeEvent)) : "keydown" === nativeEvent.type || "keyup" === nativeEvent.type ? translateToKey[nativeEvent.keyCode] || "Unidentified" : "";
		},
		code: 0,
		location: 0,
		ctrlKey: 0,
		shiftKey: 0,
		altKey: 0,
		metaKey: 0,
		repeat: 0,
		locale: 0,
		getModifierState: getEventModifierState,
		charCode: function(event) {
			return "keypress" === event.type ? getEventCharCode(event) : 0;
		},
		keyCode: function(event) {
			return "keydown" === event.type || "keyup" === event.type ? event.keyCode : 0;
		},
		which: function(event) {
			return "keypress" === event.type ? getEventCharCode(event) : "keydown" === event.type || "keyup" === event.type ? event.keyCode : 0;
		}
	})), SyntheticPointerEvent = createSyntheticEvent(assign({}, MouseEventInterface, {
		pointerId: 0,
		width: 0,
		height: 0,
		pressure: 0,
		tangentialPressure: 0,
		tiltX: 0,
		tiltY: 0,
		twist: 0,
		pointerType: 0,
		isPrimary: 0
	})), SyntheticTouchEvent = createSyntheticEvent(assign({}, UIEventInterface, {
		touches: 0,
		targetTouches: 0,
		changedTouches: 0,
		altKey: 0,
		metaKey: 0,
		ctrlKey: 0,
		shiftKey: 0,
		getModifierState: getEventModifierState
	})), SyntheticTransitionEvent = createSyntheticEvent(assign({}, EventInterface, {
		propertyName: 0,
		elapsedTime: 0,
		pseudoElement: 0
	})), SyntheticWheelEvent = createSyntheticEvent(assign({}, MouseEventInterface, {
		deltaX: function(event) {
			return "deltaX" in event ? event.deltaX : "wheelDeltaX" in event ? -event.wheelDeltaX : 0;
		},
		deltaY: function(event) {
			return "deltaY" in event ? event.deltaY : "wheelDeltaY" in event ? -event.wheelDeltaY : "wheelDelta" in event ? -event.wheelDelta : 0;
		},
		deltaZ: 0,
		deltaMode: 0
	})), SyntheticToggleEvent = createSyntheticEvent(assign({}, EventInterface, {
		newState: 0,
		oldState: 0
	})), END_KEYCODES = [
		9,
		13,
		27,
		32
	], canUseCompositionEvent = canUseDOM && "CompositionEvent" in window, documentMode = null;
	canUseDOM && "documentMode" in document && (documentMode = document.documentMode);
	var canUseTextInputEvent = canUseDOM && "TextEvent" in window && !documentMode, useFallbackCompositionData = canUseDOM && (!canUseCompositionEvent || documentMode && 8 < documentMode && 11 >= documentMode), SPACEBAR_CHAR = String.fromCharCode(32), hasSpaceKeypress = !1;
	function isFallbackCompositionEnd(domEventName, nativeEvent) {
		switch (domEventName) {
			case "keyup": return -1 !== END_KEYCODES.indexOf(nativeEvent.keyCode);
			case "keydown": return 229 !== nativeEvent.keyCode;
			case "keypress":
			case "mousedown":
			case "focusout": return !0;
			default: return !1;
		}
	}
	function getDataFromCustomEvent(nativeEvent) {
		nativeEvent = nativeEvent.detail;
		return "object" === typeof nativeEvent && "data" in nativeEvent ? nativeEvent.data : null;
	}
	var isComposing = !1;
	function getNativeBeforeInputChars(domEventName, nativeEvent) {
		switch (domEventName) {
			case "compositionend": return getDataFromCustomEvent(nativeEvent);
			case "keypress":
				if (32 !== nativeEvent.which) return null;
				hasSpaceKeypress = !0;
				return SPACEBAR_CHAR;
			case "textInput": return domEventName = nativeEvent.data, domEventName === SPACEBAR_CHAR && hasSpaceKeypress ? null : domEventName;
			default: return null;
		}
	}
	function getFallbackBeforeInputChars(domEventName, nativeEvent) {
		if (isComposing) return "compositionend" === domEventName || !canUseCompositionEvent && isFallbackCompositionEnd(domEventName, nativeEvent) ? (domEventName = getData(), fallbackText = startText = root = null, isComposing = !1, domEventName) : null;
		switch (domEventName) {
			case "paste": return null;
			case "keypress":
				if (!(nativeEvent.ctrlKey || nativeEvent.altKey || nativeEvent.metaKey) || nativeEvent.ctrlKey && nativeEvent.altKey) {
					if (nativeEvent.char && 1 < nativeEvent.char.length) return nativeEvent.char;
					if (nativeEvent.which) return String.fromCharCode(nativeEvent.which);
				}
				return null;
			case "compositionend": return useFallbackCompositionData && "ko" !== nativeEvent.locale ? null : nativeEvent.data;
			default: return null;
		}
	}
	var supportedInputTypes = {
		color: !0,
		date: !0,
		datetime: !0,
		"datetime-local": !0,
		email: !0,
		month: !0,
		number: !0,
		password: !0,
		range: !0,
		search: !0,
		tel: !0,
		text: !0,
		time: !0,
		url: !0,
		week: !0
	};
	function isTextInputElement(elem) {
		var nodeName = elem && elem.nodeName && elem.nodeName.toLowerCase();
		return "input" === nodeName ? !!supportedInputTypes[elem.type] : "textarea" === nodeName ? !0 : !1;
	}
	function createAndAccumulateChangeEvent(dispatchQueue, inst, nativeEvent, target) {
		restoreTarget ? restoreQueue ? restoreQueue.push(target) : restoreQueue = [target] : restoreTarget = target;
		inst = accumulateTwoPhaseListeners(inst, "onChange");
		0 < inst.length && (nativeEvent = new SyntheticEvent("onChange", "change", null, nativeEvent, target), dispatchQueue.push({
			event: nativeEvent,
			listeners: inst
		}));
	}
	var activeElement$1 = null, activeElementInst$1 = null;
	function runEventInBatch(dispatchQueue) {
		processDispatchQueue(dispatchQueue, 0);
	}
	function getInstIfValueChanged(targetInst) {
		if (updateValueIfChanged(getNodeFromInstance(targetInst))) return targetInst;
	}
	function getTargetInstForChangeEvent(domEventName, targetInst) {
		if ("change" === domEventName) return targetInst;
	}
	var isInputEventSupported = !1;
	if (canUseDOM) {
		var JSCompiler_inline_result$jscomp$286;
		if (canUseDOM) {
			var isSupported$jscomp$inline_427 = "oninput" in document;
			if (!isSupported$jscomp$inline_427) {
				var element$jscomp$inline_428 = document.createElement("div");
				element$jscomp$inline_428.setAttribute("oninput", "return;");
				isSupported$jscomp$inline_427 = "function" === typeof element$jscomp$inline_428.oninput;
			}
			JSCompiler_inline_result$jscomp$286 = isSupported$jscomp$inline_427;
		} else JSCompiler_inline_result$jscomp$286 = !1;
		isInputEventSupported = JSCompiler_inline_result$jscomp$286 && (!document.documentMode || 9 < document.documentMode);
	}
	function stopWatchingForValueChange() {
		activeElement$1 && (activeElement$1.detachEvent("onpropertychange", handlePropertyChange), activeElementInst$1 = activeElement$1 = null);
	}
	function handlePropertyChange(nativeEvent) {
		if ("value" === nativeEvent.propertyName && getInstIfValueChanged(activeElementInst$1)) {
			var dispatchQueue = [];
			createAndAccumulateChangeEvent(dispatchQueue, activeElementInst$1, nativeEvent, getEventTarget(nativeEvent));
			batchedUpdates$1(runEventInBatch, dispatchQueue);
		}
	}
	function handleEventsForInputEventPolyfill(domEventName, target, targetInst) {
		"focusin" === domEventName ? (stopWatchingForValueChange(), activeElement$1 = target, activeElementInst$1 = targetInst, activeElement$1.attachEvent("onpropertychange", handlePropertyChange)) : "focusout" === domEventName && stopWatchingForValueChange();
	}
	function getTargetInstForInputEventPolyfill(domEventName) {
		if ("selectionchange" === domEventName || "keyup" === domEventName || "keydown" === domEventName) return getInstIfValueChanged(activeElementInst$1);
	}
	function getTargetInstForClickEvent(domEventName, targetInst) {
		if ("click" === domEventName) return getInstIfValueChanged(targetInst);
	}
	function getTargetInstForInputOrChangeEvent(domEventName, targetInst) {
		if ("input" === domEventName || "change" === domEventName) return getInstIfValueChanged(targetInst);
	}
	function is(x, y) {
		return x === y && (0 !== x || 1 / x === 1 / y) || x !== x && y !== y;
	}
	var objectIs = "function" === typeof Object.is ? Object.is : is;
	function shallowEqual(objA, objB) {
		if (objectIs(objA, objB)) return !0;
		if ("object" !== typeof objA || null === objA || "object" !== typeof objB || null === objB) return !1;
		var keysA = Object.keys(objA), keysB = Object.keys(objB);
		if (keysA.length !== keysB.length) return !1;
		for (keysB = 0; keysB < keysA.length; keysB++) {
			var currentKey = keysA[keysB];
			if (!hasOwnProperty.call(objB, currentKey) || !objectIs(objA[currentKey], objB[currentKey])) return !1;
		}
		return !0;
	}
	function getLeafNode(node) {
		for (; node && node.firstChild;) node = node.firstChild;
		return node;
	}
	function getNodeForCharacterOffset(root, offset) {
		var node = getLeafNode(root);
		root = 0;
		for (var nodeEnd; node;) {
			if (3 === node.nodeType) {
				nodeEnd = root + node.textContent.length;
				if (root <= offset && nodeEnd >= offset) return {
					node,
					offset: offset - root
				};
				root = nodeEnd;
			}
			a: {
				for (; node;) {
					if (node.nextSibling) {
						node = node.nextSibling;
						break a;
					}
					node = node.parentNode;
				}
				node = void 0;
			}
			node = getLeafNode(node);
		}
	}
	function containsNode(outerNode, innerNode) {
		return outerNode && innerNode ? outerNode === innerNode ? !0 : outerNode && 3 === outerNode.nodeType ? !1 : innerNode && 3 === innerNode.nodeType ? containsNode(outerNode, innerNode.parentNode) : "contains" in outerNode ? outerNode.contains(innerNode) : outerNode.compareDocumentPosition ? !!(outerNode.compareDocumentPosition(innerNode) & 16) : !1 : !1;
	}
	function getActiveElementDeep(containerInfo) {
		containerInfo = null != containerInfo && null != containerInfo.ownerDocument && null != containerInfo.ownerDocument.defaultView ? containerInfo.ownerDocument.defaultView : window;
		for (var element = getActiveElement(containerInfo.document); element instanceof containerInfo.HTMLIFrameElement;) {
			try {
				var JSCompiler_inline_result = "string" === typeof element.contentWindow.location.href;
			} catch (err) {
				JSCompiler_inline_result = !1;
			}
			if (JSCompiler_inline_result) containerInfo = element.contentWindow;
			else break;
			element = getActiveElement(containerInfo.document);
		}
		return element;
	}
	function hasSelectionCapabilities(elem) {
		var nodeName = elem && elem.nodeName && elem.nodeName.toLowerCase();
		return nodeName && ("input" === nodeName && ("text" === elem.type || "search" === elem.type || "tel" === elem.type || "url" === elem.type || "password" === elem.type) || "textarea" === nodeName || "true" === elem.contentEditable);
	}
	var skipSelectionChangeEvent = canUseDOM && "documentMode" in document && 11 >= document.documentMode, activeElement = null, activeElementInst = null, lastSelection = null, mouseDown = !1;
	function constructSelectEvent(dispatchQueue, nativeEvent, nativeEventTarget) {
		var doc = nativeEventTarget.window === nativeEventTarget ? nativeEventTarget.document : 9 === nativeEventTarget.nodeType ? nativeEventTarget : nativeEventTarget.ownerDocument;
		mouseDown || null == activeElement || activeElement !== getActiveElement(doc) || (doc = activeElement, "selectionStart" in doc && hasSelectionCapabilities(doc) ? doc = {
			start: doc.selectionStart,
			end: doc.selectionEnd
		} : (doc = (doc.ownerDocument && doc.ownerDocument.defaultView || window).getSelection(), doc = {
			anchorNode: doc.anchorNode,
			anchorOffset: doc.anchorOffset,
			focusNode: doc.focusNode,
			focusOffset: doc.focusOffset
		}), lastSelection && shallowEqual(lastSelection, doc) || (lastSelection = doc, doc = accumulateTwoPhaseListeners(activeElementInst, "onSelect"), 0 < doc.length && (nativeEvent = new SyntheticEvent("onSelect", "select", null, nativeEvent, nativeEventTarget), dispatchQueue.push({
			event: nativeEvent,
			listeners: doc
		}), nativeEvent.target = activeElement)));
	}
	function makePrefixMap(styleProp, eventName) {
		var prefixes = {};
		prefixes[styleProp.toLowerCase()] = eventName.toLowerCase();
		prefixes["Webkit" + styleProp] = "webkit" + eventName;
		prefixes["Moz" + styleProp] = "moz" + eventName;
		return prefixes;
	}
	var vendorPrefixes = {
		animationend: makePrefixMap("Animation", "AnimationEnd"),
		animationiteration: makePrefixMap("Animation", "AnimationIteration"),
		animationstart: makePrefixMap("Animation", "AnimationStart"),
		transitionrun: makePrefixMap("Transition", "TransitionRun"),
		transitionstart: makePrefixMap("Transition", "TransitionStart"),
		transitioncancel: makePrefixMap("Transition", "TransitionCancel"),
		transitionend: makePrefixMap("Transition", "TransitionEnd")
	}, prefixedEventNames = {}, style = {};
	canUseDOM && (style = document.createElement("div").style, "AnimationEvent" in window || (delete vendorPrefixes.animationend.animation, delete vendorPrefixes.animationiteration.animation, delete vendorPrefixes.animationstart.animation), "TransitionEvent" in window || delete vendorPrefixes.transitionend.transition);
	function getVendorPrefixedEventName(eventName) {
		if (prefixedEventNames[eventName]) return prefixedEventNames[eventName];
		if (!vendorPrefixes[eventName]) return eventName;
		var prefixMap = vendorPrefixes[eventName], styleProp;
		for (styleProp in prefixMap) if (prefixMap.hasOwnProperty(styleProp) && styleProp in style) return prefixedEventNames[eventName] = prefixMap[styleProp];
		return eventName;
	}
	var ANIMATION_END = getVendorPrefixedEventName("animationend"), ANIMATION_ITERATION = getVendorPrefixedEventName("animationiteration"), ANIMATION_START = getVendorPrefixedEventName("animationstart"), TRANSITION_RUN = getVendorPrefixedEventName("transitionrun"), TRANSITION_START = getVendorPrefixedEventName("transitionstart"), TRANSITION_CANCEL = getVendorPrefixedEventName("transitioncancel"), TRANSITION_END = getVendorPrefixedEventName("transitionend"), topLevelEventsToReactNames = /* @__PURE__ */ new Map(), simpleEventPluginEvents = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
	simpleEventPluginEvents.push("scrollEnd");
	function registerSimpleEvent(domEventName, reactName) {
		topLevelEventsToReactNames.set(domEventName, reactName);
		registerTwoPhaseEvent(reactName, [domEventName]);
	}
	var reportGlobalError = "function" === typeof reportError ? reportError : function(error) {
		if ("object" === typeof window && "function" === typeof window.ErrorEvent) {
			var event = new window.ErrorEvent("error", {
				bubbles: !0,
				cancelable: !0,
				message: "object" === typeof error && null !== error && "string" === typeof error.message ? String(error.message) : String(error),
				error
			});
			if (!window.dispatchEvent(event)) return;
		} else if ("object" === typeof process && "function" === typeof process.emit) {
			process.emit("uncaughtException", error);
			return;
		}
		console.error(error);
	}, concurrentQueues = [], concurrentQueuesIndex = 0, concurrentlyUpdatedLanes = 0;
	function finishQueueingConcurrentUpdates() {
		for (var endIndex = concurrentQueuesIndex, i = concurrentlyUpdatedLanes = concurrentQueuesIndex = 0; i < endIndex;) {
			var fiber = concurrentQueues[i];
			concurrentQueues[i++] = null;
			var queue = concurrentQueues[i];
			concurrentQueues[i++] = null;
			var update = concurrentQueues[i];
			concurrentQueues[i++] = null;
			var lane = concurrentQueues[i];
			concurrentQueues[i++] = null;
			if (null !== queue && null !== update) {
				var pending = queue.pending;
				null === pending ? update.next = update : (update.next = pending.next, pending.next = update);
				queue.pending = update;
			}
			0 !== lane && markUpdateLaneFromFiberToRoot(fiber, update, lane);
		}
	}
	function enqueueUpdate$1(fiber, queue, update, lane) {
		concurrentQueues[concurrentQueuesIndex++] = fiber;
		concurrentQueues[concurrentQueuesIndex++] = queue;
		concurrentQueues[concurrentQueuesIndex++] = update;
		concurrentQueues[concurrentQueuesIndex++] = lane;
		concurrentlyUpdatedLanes |= lane;
		fiber.lanes |= lane;
		fiber = fiber.alternate;
		null !== fiber && (fiber.lanes |= lane);
	}
	function enqueueConcurrentHookUpdate(fiber, queue, update, lane) {
		enqueueUpdate$1(fiber, queue, update, lane);
		return getRootForUpdatedFiber(fiber);
	}
	function enqueueConcurrentRenderForLane(fiber, lane) {
		enqueueUpdate$1(fiber, null, null, lane);
		return getRootForUpdatedFiber(fiber);
	}
	function markUpdateLaneFromFiberToRoot(sourceFiber, update, lane) {
		sourceFiber.lanes |= lane;
		var alternate = sourceFiber.alternate;
		null !== alternate && (alternate.lanes |= lane);
		for (var isHidden = !1, parent = sourceFiber.return; null !== parent;) parent.childLanes |= lane, alternate = parent.alternate, null !== alternate && (alternate.childLanes |= lane), 22 === parent.tag && (sourceFiber = parent.stateNode, null === sourceFiber || sourceFiber._visibility & 1 || (isHidden = !0)), sourceFiber = parent, parent = parent.return;
		return 3 === sourceFiber.tag ? (parent = sourceFiber.stateNode, isHidden && null !== update && (isHidden = 31 - clz32(lane), sourceFiber = parent.hiddenUpdates, alternate = sourceFiber[isHidden], null === alternate ? sourceFiber[isHidden] = [update] : alternate.push(update), update.lane = lane | 536870912), parent) : null;
	}
	function getRootForUpdatedFiber(sourceFiber) {
		if (50 < nestedUpdateCount) throw nestedUpdateCount = 0, rootWithNestedUpdates = null, Error(formatProdErrorMessage(185));
		for (var parent = sourceFiber.return; null !== parent;) sourceFiber = parent, parent = sourceFiber.return;
		return 3 === sourceFiber.tag ? sourceFiber.stateNode : null;
	}
	var emptyContextObject = {};
	function FiberNode(tag, pendingProps, key, mode) {
		this.tag = tag;
		this.key = key;
		this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null;
		this.index = 0;
		this.refCleanup = this.ref = null;
		this.pendingProps = pendingProps;
		this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null;
		this.mode = mode;
		this.subtreeFlags = this.flags = 0;
		this.deletions = null;
		this.childLanes = this.lanes = 0;
		this.alternate = null;
	}
	function createFiberImplClass(tag, pendingProps, key, mode) {
		return new FiberNode(tag, pendingProps, key, mode);
	}
	function shouldConstruct(Component) {
		Component = Component.prototype;
		return !(!Component || !Component.isReactComponent);
	}
	function createWorkInProgress(current, pendingProps) {
		var workInProgress = current.alternate;
		null === workInProgress ? (workInProgress = createFiberImplClass(current.tag, pendingProps, current.key, current.mode), workInProgress.elementType = current.elementType, workInProgress.type = current.type, workInProgress.stateNode = current.stateNode, workInProgress.alternate = current, current.alternate = workInProgress) : (workInProgress.pendingProps = pendingProps, workInProgress.type = current.type, workInProgress.flags = 0, workInProgress.subtreeFlags = 0, workInProgress.deletions = null);
		workInProgress.flags = current.flags & 65011712;
		workInProgress.childLanes = current.childLanes;
		workInProgress.lanes = current.lanes;
		workInProgress.child = current.child;
		workInProgress.memoizedProps = current.memoizedProps;
		workInProgress.memoizedState = current.memoizedState;
		workInProgress.updateQueue = current.updateQueue;
		pendingProps = current.dependencies;
		workInProgress.dependencies = null === pendingProps ? null : {
			lanes: pendingProps.lanes,
			firstContext: pendingProps.firstContext
		};
		workInProgress.sibling = current.sibling;
		workInProgress.index = current.index;
		workInProgress.ref = current.ref;
		workInProgress.refCleanup = current.refCleanup;
		return workInProgress;
	}
	function resetWorkInProgress(workInProgress, renderLanes) {
		workInProgress.flags &= 65011714;
		var current = workInProgress.alternate;
		null === current ? (workInProgress.childLanes = 0, workInProgress.lanes = renderLanes, workInProgress.child = null, workInProgress.subtreeFlags = 0, workInProgress.memoizedProps = null, workInProgress.memoizedState = null, workInProgress.updateQueue = null, workInProgress.dependencies = null, workInProgress.stateNode = null) : (workInProgress.childLanes = current.childLanes, workInProgress.lanes = current.lanes, workInProgress.child = current.child, workInProgress.subtreeFlags = 0, workInProgress.deletions = null, workInProgress.memoizedProps = current.memoizedProps, workInProgress.memoizedState = current.memoizedState, workInProgress.updateQueue = current.updateQueue, workInProgress.type = current.type, renderLanes = current.dependencies, workInProgress.dependencies = null === renderLanes ? null : {
			lanes: renderLanes.lanes,
			firstContext: renderLanes.firstContext
		});
		return workInProgress;
	}
	function createFiberFromTypeAndProps(type, key, pendingProps, owner, mode, lanes) {
		var fiberTag = 0;
		owner = type;
		if ("function" === typeof type) shouldConstruct(type) && (fiberTag = 1);
		else if ("string" === typeof type) fiberTag = isHostHoistableType(type, pendingProps, contextStackCursor.current) ? 26 : "html" === type || "head" === type || "body" === type ? 27 : 5;
		else a: switch (type) {
			case REACT_ACTIVITY_TYPE: return type = createFiberImplClass(31, pendingProps, key, mode), type.elementType = REACT_ACTIVITY_TYPE, type.lanes = lanes, type;
			case REACT_FRAGMENT_TYPE: return createFiberFromFragment(pendingProps.children, mode, lanes, key);
			case REACT_STRICT_MODE_TYPE:
				fiberTag = 8;
				mode |= 24;
				break;
			case REACT_PROFILER_TYPE: return type = createFiberImplClass(12, pendingProps, key, mode | 2), type.elementType = REACT_PROFILER_TYPE, type.lanes = lanes, type;
			case REACT_SUSPENSE_TYPE: return type = createFiberImplClass(13, pendingProps, key, mode), type.elementType = REACT_SUSPENSE_TYPE, type.lanes = lanes, type;
			case REACT_SUSPENSE_LIST_TYPE: return type = createFiberImplClass(19, pendingProps, key, mode), type.elementType = REACT_SUSPENSE_LIST_TYPE, type.lanes = lanes, type;
			default:
				if ("object" === typeof type && null !== type) switch (type.$$typeof) {
					case REACT_CONTEXT_TYPE:
						fiberTag = 10;
						break a;
					case REACT_CONSUMER_TYPE:
						fiberTag = 9;
						break a;
					case REACT_FORWARD_REF_TYPE:
						fiberTag = 11;
						break a;
					case REACT_MEMO_TYPE:
						fiberTag = 14;
						break a;
					case REACT_LAZY_TYPE:
						fiberTag = 16;
						owner = null;
						break a;
				}
				fiberTag = 29;
				pendingProps = Error(formatProdErrorMessage(130, null === type ? "null" : typeof type, ""));
				owner = null;
		}
		key = createFiberImplClass(fiberTag, pendingProps, key, mode);
		key.elementType = type;
		key.type = owner;
		key.lanes = lanes;
		return key;
	}
	function createFiberFromFragment(elements, mode, lanes, key) {
		elements = createFiberImplClass(7, elements, key, mode);
		elements.lanes = lanes;
		return elements;
	}
	function createFiberFromText(content, mode, lanes) {
		content = createFiberImplClass(6, content, null, mode);
		content.lanes = lanes;
		return content;
	}
	function createFiberFromDehydratedFragment(dehydratedNode) {
		var fiber = createFiberImplClass(18, null, null, 0);
		fiber.stateNode = dehydratedNode;
		return fiber;
	}
	function createFiberFromPortal(portal, mode, lanes) {
		mode = createFiberImplClass(4, null !== portal.children ? portal.children : [], portal.key, mode);
		mode.lanes = lanes;
		mode.stateNode = {
			containerInfo: portal.containerInfo,
			pendingChildren: null,
			implementation: portal.implementation
		};
		return mode;
	}
	var CapturedStacks = /* @__PURE__ */ new WeakMap();
	function createCapturedValueAtFiber(value, source) {
		if ("object" === typeof value && null !== value) {
			var existing = CapturedStacks.get(value);
			if (void 0 !== existing) return existing;
			source = {
				value,
				source,
				stack: getStackByFiberInDevAndProd(source)
			};
			CapturedStacks.set(value, source);
			return source;
		}
		return {
			value,
			source,
			stack: getStackByFiberInDevAndProd(source)
		};
	}
	var forkStack = [], forkStackIndex = 0, treeForkProvider = null, treeForkCount = 0, idStack = [], idStackIndex = 0, treeContextProvider = null, treeContextId = 1, treeContextOverflow = "";
	function pushTreeFork(workInProgress, totalChildren) {
		forkStack[forkStackIndex++] = treeForkCount;
		forkStack[forkStackIndex++] = treeForkProvider;
		treeForkProvider = workInProgress;
		treeForkCount = totalChildren;
	}
	function pushTreeId(workInProgress, totalChildren, index) {
		idStack[idStackIndex++] = treeContextId;
		idStack[idStackIndex++] = treeContextOverflow;
		idStack[idStackIndex++] = treeContextProvider;
		treeContextProvider = workInProgress;
		var baseIdWithLeadingBit = treeContextId;
		workInProgress = treeContextOverflow;
		var baseLength = 32 - clz32(baseIdWithLeadingBit) - 1;
		baseIdWithLeadingBit &= ~(1 << baseLength);
		index += 1;
		var length = 32 - clz32(totalChildren) + baseLength;
		if (30 < length) {
			var numberOfOverflowBits = baseLength - baseLength % 5;
			length = (baseIdWithLeadingBit & (1 << numberOfOverflowBits) - 1).toString(32);
			baseIdWithLeadingBit >>= numberOfOverflowBits;
			baseLength -= numberOfOverflowBits;
			treeContextId = 1 << 32 - clz32(totalChildren) + baseLength | index << baseLength | baseIdWithLeadingBit;
			treeContextOverflow = length + workInProgress;
		} else treeContextId = 1 << length | index << baseLength | baseIdWithLeadingBit, treeContextOverflow = workInProgress;
	}
	function pushMaterializedTreeId(workInProgress) {
		null !== workInProgress.return && (pushTreeFork(workInProgress, 1), pushTreeId(workInProgress, 1, 0));
	}
	function popTreeContext(workInProgress) {
		for (; workInProgress === treeForkProvider;) treeForkProvider = forkStack[--forkStackIndex], forkStack[forkStackIndex] = null, treeForkCount = forkStack[--forkStackIndex], forkStack[forkStackIndex] = null;
		for (; workInProgress === treeContextProvider;) treeContextProvider = idStack[--idStackIndex], idStack[idStackIndex] = null, treeContextOverflow = idStack[--idStackIndex], idStack[idStackIndex] = null, treeContextId = idStack[--idStackIndex], idStack[idStackIndex] = null;
	}
	function restoreSuspendedTreeContext(workInProgress, suspendedContext) {
		idStack[idStackIndex++] = treeContextId;
		idStack[idStackIndex++] = treeContextOverflow;
		idStack[idStackIndex++] = treeContextProvider;
		treeContextId = suspendedContext.id;
		treeContextOverflow = suspendedContext.overflow;
		treeContextProvider = workInProgress;
	}
	var hydrationParentFiber = null, nextHydratableInstance = null, isHydrating = !1, hydrationErrors = null, rootOrSingletonContext = !1, HydrationMismatchException = Error(formatProdErrorMessage(519));
	function throwOnHydrationMismatch(fiber) {
		queueHydrationError(createCapturedValueAtFiber(Error(formatProdErrorMessage(418, 1 < arguments.length && void 0 !== arguments[1] && arguments[1] ? "text" : "HTML", "")), fiber));
		throw HydrationMismatchException;
	}
	function prepareToHydrateHostInstance(fiber) {
		var instance = fiber.stateNode, type = fiber.type, props = fiber.memoizedProps;
		instance[internalInstanceKey] = fiber;
		instance[internalPropsKey] = props;
		switch (type) {
			case "dialog":
				listenToNonDelegatedEvent("cancel", instance);
				listenToNonDelegatedEvent("close", instance);
				break;
			case "iframe":
			case "object":
			case "embed":
				listenToNonDelegatedEvent("load", instance);
				break;
			case "video":
			case "audio":
				for (type = 0; type < mediaEventTypes.length; type++) listenToNonDelegatedEvent(mediaEventTypes[type], instance);
				break;
			case "source":
				listenToNonDelegatedEvent("error", instance);
				break;
			case "img":
			case "image":
			case "link":
				listenToNonDelegatedEvent("error", instance);
				listenToNonDelegatedEvent("load", instance);
				break;
			case "details":
				listenToNonDelegatedEvent("toggle", instance);
				break;
			case "input":
				listenToNonDelegatedEvent("invalid", instance);
				initInput(instance, props.value, props.defaultValue, props.checked, props.defaultChecked, props.type, props.name, !0);
				break;
			case "select":
				listenToNonDelegatedEvent("invalid", instance);
				break;
			case "textarea": listenToNonDelegatedEvent("invalid", instance), initTextarea(instance, props.value, props.defaultValue, props.children);
		}
		type = props.children;
		"string" !== typeof type && "number" !== typeof type && "bigint" !== typeof type || instance.textContent === "" + type || !0 === props.suppressHydrationWarning || checkForUnmatchedText(instance.textContent, type) ? (null != props.popover && (listenToNonDelegatedEvent("beforetoggle", instance), listenToNonDelegatedEvent("toggle", instance)), null != props.onScroll && listenToNonDelegatedEvent("scroll", instance), null != props.onScrollEnd && listenToNonDelegatedEvent("scrollend", instance), null != props.onClick && (instance.onclick = noop$1), instance = !0) : instance = !1;
		instance || throwOnHydrationMismatch(fiber, !0);
	}
	function popToNextHostParent(fiber) {
		for (hydrationParentFiber = fiber.return; hydrationParentFiber;) switch (hydrationParentFiber.tag) {
			case 5:
			case 31:
			case 13:
				rootOrSingletonContext = !1;
				return;
			case 27:
			case 3:
				rootOrSingletonContext = !0;
				return;
			default: hydrationParentFiber = hydrationParentFiber.return;
		}
	}
	function popHydrationState(fiber) {
		if (fiber !== hydrationParentFiber) return !1;
		if (!isHydrating) return popToNextHostParent(fiber), isHydrating = !0, !1;
		var tag = fiber.tag, JSCompiler_temp;
		if (JSCompiler_temp = 3 !== tag && 27 !== tag) {
			if (JSCompiler_temp = 5 === tag) JSCompiler_temp = fiber.type, JSCompiler_temp = !("form" !== JSCompiler_temp && "button" !== JSCompiler_temp) || shouldSetTextContent(fiber.type, fiber.memoizedProps);
			JSCompiler_temp = !JSCompiler_temp;
		}
		JSCompiler_temp && nextHydratableInstance && throwOnHydrationMismatch(fiber);
		popToNextHostParent(fiber);
		if (13 === tag) {
			fiber = fiber.memoizedState;
			fiber = null !== fiber ? fiber.dehydrated : null;
			if (!fiber) throw Error(formatProdErrorMessage(317));
			nextHydratableInstance = getNextHydratableInstanceAfterHydrationBoundary(fiber);
		} else if (31 === tag) {
			fiber = fiber.memoizedState;
			fiber = null !== fiber ? fiber.dehydrated : null;
			if (!fiber) throw Error(formatProdErrorMessage(317));
			nextHydratableInstance = getNextHydratableInstanceAfterHydrationBoundary(fiber);
		} else 27 === tag ? (tag = nextHydratableInstance, isSingletonScope(fiber.type) ? (fiber = previousHydratableOnEnteringScopedSingleton, previousHydratableOnEnteringScopedSingleton = null, nextHydratableInstance = fiber) : nextHydratableInstance = tag) : nextHydratableInstance = hydrationParentFiber ? getNextHydratable(fiber.stateNode.nextSibling) : null;
		return !0;
	}
	function resetHydrationState() {
		nextHydratableInstance = hydrationParentFiber = null;
		isHydrating = !1;
	}
	function upgradeHydrationErrorsToRecoverable() {
		var queuedErrors = hydrationErrors;
		null !== queuedErrors && (null === workInProgressRootRecoverableErrors ? workInProgressRootRecoverableErrors = queuedErrors : workInProgressRootRecoverableErrors.push.apply(workInProgressRootRecoverableErrors, queuedErrors), hydrationErrors = null);
		return queuedErrors;
	}
	function queueHydrationError(error) {
		null === hydrationErrors ? hydrationErrors = [error] : hydrationErrors.push(error);
	}
	var valueCursor = createCursor(null), currentlyRenderingFiber$1 = null, lastContextDependency = null;
	function pushProvider(providerFiber, context, nextValue) {
		push(valueCursor, context._currentValue);
		context._currentValue = nextValue;
	}
	function popProvider(context) {
		context._currentValue = valueCursor.current;
		pop(valueCursor);
	}
	function scheduleContextWorkOnParentPath(parent, renderLanes, propagationRoot) {
		for (; null !== parent;) {
			var alternate = parent.alternate;
			(parent.childLanes & renderLanes) !== renderLanes ? (parent.childLanes |= renderLanes, null !== alternate && (alternate.childLanes |= renderLanes)) : null !== alternate && (alternate.childLanes & renderLanes) !== renderLanes && (alternate.childLanes |= renderLanes);
			if (parent === propagationRoot) break;
			parent = parent.return;
		}
	}
	function propagateContextChanges(workInProgress, contexts, renderLanes, forcePropagateEntireTree) {
		var fiber = workInProgress.child;
		null !== fiber && (fiber.return = workInProgress);
		for (; null !== fiber;) {
			var list = fiber.dependencies;
			if (null !== list) {
				var nextFiber = fiber.child;
				list = list.firstContext;
				a: for (; null !== list;) {
					var dependency = list;
					list = fiber;
					for (var i = 0; i < contexts.length; i++) if (dependency.context === contexts[i]) {
						list.lanes |= renderLanes;
						dependency = list.alternate;
						null !== dependency && (dependency.lanes |= renderLanes);
						scheduleContextWorkOnParentPath(list.return, renderLanes, workInProgress);
						forcePropagateEntireTree || (nextFiber = null);
						break a;
					}
					list = dependency.next;
				}
			} else if (18 === fiber.tag) {
				nextFiber = fiber.return;
				if (null === nextFiber) throw Error(formatProdErrorMessage(341));
				nextFiber.lanes |= renderLanes;
				list = nextFiber.alternate;
				null !== list && (list.lanes |= renderLanes);
				scheduleContextWorkOnParentPath(nextFiber, renderLanes, workInProgress);
				nextFiber = null;
			} else nextFiber = fiber.child;
			if (null !== nextFiber) nextFiber.return = fiber;
			else for (nextFiber = fiber; null !== nextFiber;) {
				if (nextFiber === workInProgress) {
					nextFiber = null;
					break;
				}
				fiber = nextFiber.sibling;
				if (null !== fiber) {
					fiber.return = nextFiber.return;
					nextFiber = fiber;
					break;
				}
				nextFiber = nextFiber.return;
			}
			fiber = nextFiber;
		}
	}
	function propagateParentContextChanges(current, workInProgress, renderLanes, forcePropagateEntireTree) {
		current = null;
		for (var parent = workInProgress, isInsidePropagationBailout = !1; null !== parent;) {
			if (!isInsidePropagationBailout) {
				if (0 !== (parent.flags & 524288)) isInsidePropagationBailout = !0;
				else if (0 !== (parent.flags & 262144)) break;
			}
			if (10 === parent.tag) {
				var currentParent = parent.alternate;
				if (null === currentParent) throw Error(formatProdErrorMessage(387));
				currentParent = currentParent.memoizedProps;
				if (null !== currentParent) {
					var context = parent.type;
					objectIs(parent.pendingProps.value, currentParent.value) || (null !== current ? current.push(context) : current = [context]);
				}
			} else if (parent === hostTransitionProviderCursor.current) {
				currentParent = parent.alternate;
				if (null === currentParent) throw Error(formatProdErrorMessage(387));
				currentParent.memoizedState.memoizedState !== parent.memoizedState.memoizedState && (null !== current ? current.push(HostTransitionContext) : current = [HostTransitionContext]);
			}
			parent = parent.return;
		}
		null !== current && propagateContextChanges(workInProgress, current, renderLanes, forcePropagateEntireTree);
		workInProgress.flags |= 262144;
	}
	function checkIfContextChanged(currentDependencies) {
		for (currentDependencies = currentDependencies.firstContext; null !== currentDependencies;) {
			if (!objectIs(currentDependencies.context._currentValue, currentDependencies.memoizedValue)) return !0;
			currentDependencies = currentDependencies.next;
		}
		return !1;
	}
	function prepareToReadContext(workInProgress) {
		currentlyRenderingFiber$1 = workInProgress;
		lastContextDependency = null;
		workInProgress = workInProgress.dependencies;
		null !== workInProgress && (workInProgress.firstContext = null);
	}
	function readContext(context) {
		return readContextForConsumer(currentlyRenderingFiber$1, context);
	}
	function readContextDuringReconciliation(consumer, context) {
		null === currentlyRenderingFiber$1 && prepareToReadContext(consumer);
		return readContextForConsumer(consumer, context);
	}
	function readContextForConsumer(consumer, context) {
		var value = context._currentValue;
		context = {
			context,
			memoizedValue: value,
			next: null
		};
		if (null === lastContextDependency) {
			if (null === consumer) throw Error(formatProdErrorMessage(308));
			lastContextDependency = context;
			consumer.dependencies = {
				lanes: 0,
				firstContext: context
			};
			consumer.flags |= 524288;
		} else lastContextDependency = lastContextDependency.next = context;
		return value;
	}
	var AbortControllerLocal = "undefined" !== typeof AbortController ? AbortController : function() {
		var listeners = [], signal = this.signal = {
			aborted: !1,
			addEventListener: function(type, listener) {
				listeners.push(listener);
			}
		};
		this.abort = function() {
			signal.aborted = !0;
			listeners.forEach(function(listener) {
				return listener();
			});
		};
	}, scheduleCallback$2 = Scheduler.unstable_scheduleCallback, NormalPriority = Scheduler.unstable_NormalPriority, CacheContext = {
		$$typeof: REACT_CONTEXT_TYPE,
		Consumer: null,
		Provider: null,
		_currentValue: null,
		_currentValue2: null,
		_threadCount: 0
	};
	function createCache() {
		return {
			controller: new AbortControllerLocal(),
			data: /* @__PURE__ */ new Map(),
			refCount: 0
		};
	}
	function releaseCache(cache) {
		cache.refCount--;
		0 === cache.refCount && scheduleCallback$2(NormalPriority, function() {
			cache.controller.abort();
		});
	}
	var currentEntangledListeners = null, currentEntangledPendingCount = 0, currentEntangledLane = 0, currentEntangledActionThenable = null;
	function entangleAsyncAction(transition, thenable) {
		if (null === currentEntangledListeners) {
			var entangledListeners = currentEntangledListeners = [];
			currentEntangledPendingCount = 0;
			currentEntangledLane = requestTransitionLane();
			currentEntangledActionThenable = {
				status: "pending",
				value: void 0,
				then: function(resolve) {
					entangledListeners.push(resolve);
				}
			};
		}
		currentEntangledPendingCount++;
		thenable.then(pingEngtangledActionScope, pingEngtangledActionScope);
		return thenable;
	}
	function pingEngtangledActionScope() {
		if (0 === --currentEntangledPendingCount && null !== currentEntangledListeners) {
			null !== currentEntangledActionThenable && (currentEntangledActionThenable.status = "fulfilled");
			var listeners = currentEntangledListeners;
			currentEntangledListeners = null;
			currentEntangledLane = 0;
			currentEntangledActionThenable = null;
			for (var i = 0; i < listeners.length; i++) (0, listeners[i])();
		}
	}
	function chainThenableValue(thenable, result) {
		var listeners = [], thenableWithOverride = {
			status: "pending",
			value: null,
			reason: null,
			then: function(resolve) {
				listeners.push(resolve);
			}
		};
		thenable.then(function() {
			thenableWithOverride.status = "fulfilled";
			thenableWithOverride.value = result;
			for (var i = 0; i < listeners.length; i++) (0, listeners[i])(result);
		}, function(error) {
			thenableWithOverride.status = "rejected";
			thenableWithOverride.reason = error;
			for (error = 0; error < listeners.length; error++) (0, listeners[error])(void 0);
		});
		return thenableWithOverride;
	}
	var prevOnStartTransitionFinish = ReactSharedInternals.S;
	ReactSharedInternals.S = function(transition, returnValue) {
		globalMostRecentTransitionTime = now();
		"object" === typeof returnValue && null !== returnValue && "function" === typeof returnValue.then && entangleAsyncAction(transition, returnValue);
		null !== prevOnStartTransitionFinish && prevOnStartTransitionFinish(transition, returnValue);
	};
	var resumedCache = createCursor(null);
	function peekCacheFromPool() {
		var cacheResumedFromPreviousRender = resumedCache.current;
		return null !== cacheResumedFromPreviousRender ? cacheResumedFromPreviousRender : workInProgressRoot.pooledCache;
	}
	function pushTransition(offscreenWorkInProgress, prevCachePool) {
		null === prevCachePool ? push(resumedCache, resumedCache.current) : push(resumedCache, prevCachePool.pool);
	}
	function getSuspendedCache() {
		var cacheFromPool = peekCacheFromPool();
		return null === cacheFromPool ? null : {
			parent: CacheContext._currentValue,
			pool: cacheFromPool
		};
	}
	var SuspenseException = Error(formatProdErrorMessage(460)), SuspenseyCommitException = Error(formatProdErrorMessage(474)), SuspenseActionException = Error(formatProdErrorMessage(542)), noopSuspenseyCommitThenable = { then: function() {} };
	function isThenableResolved(thenable) {
		thenable = thenable.status;
		return "fulfilled" === thenable || "rejected" === thenable;
	}
	function trackUsedThenable(thenableState, thenable, index) {
		index = thenableState[index];
		void 0 === index ? thenableState.push(thenable) : index !== thenable && (thenable.then(noop$1, noop$1), thenable = index);
		switch (thenable.status) {
			case "fulfilled": return thenable.value;
			case "rejected": throw thenableState = thenable.reason, checkIfUseWrappedInAsyncCatch(thenableState), thenableState;
			default:
				if ("string" === typeof thenable.status) thenable.then(noop$1, noop$1);
				else {
					thenableState = workInProgressRoot;
					if (null !== thenableState && 100 < thenableState.shellSuspendCounter) throw Error(formatProdErrorMessage(482));
					thenableState = thenable;
					thenableState.status = "pending";
					thenableState.then(function(fulfilledValue) {
						if ("pending" === thenable.status) {
							var fulfilledThenable = thenable;
							fulfilledThenable.status = "fulfilled";
							fulfilledThenable.value = fulfilledValue;
						}
					}, function(error) {
						if ("pending" === thenable.status) {
							var rejectedThenable = thenable;
							rejectedThenable.status = "rejected";
							rejectedThenable.reason = error;
						}
					});
				}
				switch (thenable.status) {
					case "fulfilled": return thenable.value;
					case "rejected": throw thenableState = thenable.reason, checkIfUseWrappedInAsyncCatch(thenableState), thenableState;
				}
				suspendedThenable = thenable;
				throw SuspenseException;
		}
	}
	function resolveLazy(lazyType) {
		try {
			var init = lazyType._init;
			return init(lazyType._payload);
		} catch (x) {
			if (null !== x && "object" === typeof x && "function" === typeof x.then) throw suspendedThenable = x, SuspenseException;
			throw x;
		}
	}
	var suspendedThenable = null;
	function getSuspendedThenable() {
		if (null === suspendedThenable) throw Error(formatProdErrorMessage(459));
		var thenable = suspendedThenable;
		suspendedThenable = null;
		return thenable;
	}
	function checkIfUseWrappedInAsyncCatch(rejectedReason) {
		if (rejectedReason === SuspenseException || rejectedReason === SuspenseActionException) throw Error(formatProdErrorMessage(483));
	}
	var thenableState$1 = null, thenableIndexCounter$1 = 0;
	function unwrapThenable(thenable) {
		var index = thenableIndexCounter$1;
		thenableIndexCounter$1 += 1;
		null === thenableState$1 && (thenableState$1 = []);
		return trackUsedThenable(thenableState$1, thenable, index);
	}
	function coerceRef(workInProgress, element) {
		element = element.props.ref;
		workInProgress.ref = void 0 !== element ? element : null;
	}
	function throwOnInvalidObjectTypeImpl(returnFiber, newChild) {
		if (newChild.$$typeof === REACT_LEGACY_ELEMENT_TYPE) throw Error(formatProdErrorMessage(525));
		returnFiber = Object.prototype.toString.call(newChild);
		throw Error(formatProdErrorMessage(31, "[object Object]" === returnFiber ? "object with keys {" + Object.keys(newChild).join(", ") + "}" : returnFiber));
	}
	function createChildReconciler(shouldTrackSideEffects) {
		function deleteChild(returnFiber, childToDelete) {
			if (shouldTrackSideEffects) {
				var deletions = returnFiber.deletions;
				null === deletions ? (returnFiber.deletions = [childToDelete], returnFiber.flags |= 16) : deletions.push(childToDelete);
			}
		}
		function deleteRemainingChildren(returnFiber, currentFirstChild) {
			if (!shouldTrackSideEffects) return null;
			for (; null !== currentFirstChild;) deleteChild(returnFiber, currentFirstChild), currentFirstChild = currentFirstChild.sibling;
			return null;
		}
		function mapRemainingChildren(currentFirstChild) {
			for (var existingChildren = /* @__PURE__ */ new Map(); null !== currentFirstChild;) null !== currentFirstChild.key ? existingChildren.set(currentFirstChild.key, currentFirstChild) : existingChildren.set(currentFirstChild.index, currentFirstChild), currentFirstChild = currentFirstChild.sibling;
			return existingChildren;
		}
		function useFiber(fiber, pendingProps) {
			fiber = createWorkInProgress(fiber, pendingProps);
			fiber.index = 0;
			fiber.sibling = null;
			return fiber;
		}
		function placeChild(newFiber, lastPlacedIndex, newIndex) {
			newFiber.index = newIndex;
			if (!shouldTrackSideEffects) return newFiber.flags |= 1048576, lastPlacedIndex;
			newIndex = newFiber.alternate;
			if (null !== newIndex) return newIndex = newIndex.index, newIndex < lastPlacedIndex ? (newFiber.flags |= 67108866, lastPlacedIndex) : newIndex;
			newFiber.flags |= 67108866;
			return lastPlacedIndex;
		}
		function placeSingleChild(newFiber) {
			shouldTrackSideEffects && null === newFiber.alternate && (newFiber.flags |= 67108866);
			return newFiber;
		}
		function updateTextNode(returnFiber, current, textContent, lanes) {
			if (null === current || 6 !== current.tag) return current = createFiberFromText(textContent, returnFiber.mode, lanes), current.return = returnFiber, current;
			current = useFiber(current, textContent);
			current.return = returnFiber;
			return current;
		}
		function updateElement(returnFiber, current, element, lanes) {
			var elementType = element.type;
			if (elementType === REACT_FRAGMENT_TYPE) return updateFragment(returnFiber, current, element.props.children, lanes, element.key);
			if (null !== current && (current.elementType === elementType || "object" === typeof elementType && null !== elementType && elementType.$$typeof === REACT_LAZY_TYPE && resolveLazy(elementType) === current.type)) return current = useFiber(current, element.props), coerceRef(current, element), current.return = returnFiber, current;
			current = createFiberFromTypeAndProps(element.type, element.key, element.props, null, returnFiber.mode, lanes);
			coerceRef(current, element);
			current.return = returnFiber;
			return current;
		}
		function updatePortal(returnFiber, current, portal, lanes) {
			if (null === current || 4 !== current.tag || current.stateNode.containerInfo !== portal.containerInfo || current.stateNode.implementation !== portal.implementation) return current = createFiberFromPortal(portal, returnFiber.mode, lanes), current.return = returnFiber, current;
			current = useFiber(current, portal.children || []);
			current.return = returnFiber;
			return current;
		}
		function updateFragment(returnFiber, current, fragment, lanes, key) {
			if (null === current || 7 !== current.tag) return current = createFiberFromFragment(fragment, returnFiber.mode, lanes, key), current.return = returnFiber, current;
			current = useFiber(current, fragment);
			current.return = returnFiber;
			return current;
		}
		function createChild(returnFiber, newChild, lanes) {
			if ("string" === typeof newChild && "" !== newChild || "number" === typeof newChild || "bigint" === typeof newChild) return newChild = createFiberFromText("" + newChild, returnFiber.mode, lanes), newChild.return = returnFiber, newChild;
			if ("object" === typeof newChild && null !== newChild) {
				switch (newChild.$$typeof) {
					case REACT_ELEMENT_TYPE: return lanes = createFiberFromTypeAndProps(newChild.type, newChild.key, newChild.props, null, returnFiber.mode, lanes), coerceRef(lanes, newChild), lanes.return = returnFiber, lanes;
					case REACT_PORTAL_TYPE: return newChild = createFiberFromPortal(newChild, returnFiber.mode, lanes), newChild.return = returnFiber, newChild;
					case REACT_LAZY_TYPE: return newChild = resolveLazy(newChild), createChild(returnFiber, newChild, lanes);
				}
				if (isArrayImpl(newChild) || getIteratorFn(newChild)) return newChild = createFiberFromFragment(newChild, returnFiber.mode, lanes, null), newChild.return = returnFiber, newChild;
				if ("function" === typeof newChild.then) return createChild(returnFiber, unwrapThenable(newChild), lanes);
				if (newChild.$$typeof === REACT_CONTEXT_TYPE) return createChild(returnFiber, readContextDuringReconciliation(returnFiber, newChild), lanes);
				throwOnInvalidObjectTypeImpl(returnFiber, newChild);
			}
			return null;
		}
		function updateSlot(returnFiber, oldFiber, newChild, lanes) {
			var key = null !== oldFiber ? oldFiber.key : null;
			if ("string" === typeof newChild && "" !== newChild || "number" === typeof newChild || "bigint" === typeof newChild) return null !== key ? null : updateTextNode(returnFiber, oldFiber, "" + newChild, lanes);
			if ("object" === typeof newChild && null !== newChild) {
				switch (newChild.$$typeof) {
					case REACT_ELEMENT_TYPE: return newChild.key === key ? updateElement(returnFiber, oldFiber, newChild, lanes) : null;
					case REACT_PORTAL_TYPE: return newChild.key === key ? updatePortal(returnFiber, oldFiber, newChild, lanes) : null;
					case REACT_LAZY_TYPE: return newChild = resolveLazy(newChild), updateSlot(returnFiber, oldFiber, newChild, lanes);
				}
				if (isArrayImpl(newChild) || getIteratorFn(newChild)) return null !== key ? null : updateFragment(returnFiber, oldFiber, newChild, lanes, null);
				if ("function" === typeof newChild.then) return updateSlot(returnFiber, oldFiber, unwrapThenable(newChild), lanes);
				if (newChild.$$typeof === REACT_CONTEXT_TYPE) return updateSlot(returnFiber, oldFiber, readContextDuringReconciliation(returnFiber, newChild), lanes);
				throwOnInvalidObjectTypeImpl(returnFiber, newChild);
			}
			return null;
		}
		function updateFromMap(existingChildren, returnFiber, newIdx, newChild, lanes) {
			if ("string" === typeof newChild && "" !== newChild || "number" === typeof newChild || "bigint" === typeof newChild) return existingChildren = existingChildren.get(newIdx) || null, updateTextNode(returnFiber, existingChildren, "" + newChild, lanes);
			if ("object" === typeof newChild && null !== newChild) {
				switch (newChild.$$typeof) {
					case REACT_ELEMENT_TYPE: return existingChildren = existingChildren.get(null === newChild.key ? newIdx : newChild.key) || null, updateElement(returnFiber, existingChildren, newChild, lanes);
					case REACT_PORTAL_TYPE: return existingChildren = existingChildren.get(null === newChild.key ? newIdx : newChild.key) || null, updatePortal(returnFiber, existingChildren, newChild, lanes);
					case REACT_LAZY_TYPE: return newChild = resolveLazy(newChild), updateFromMap(existingChildren, returnFiber, newIdx, newChild, lanes);
				}
				if (isArrayImpl(newChild) || getIteratorFn(newChild)) return existingChildren = existingChildren.get(newIdx) || null, updateFragment(returnFiber, existingChildren, newChild, lanes, null);
				if ("function" === typeof newChild.then) return updateFromMap(existingChildren, returnFiber, newIdx, unwrapThenable(newChild), lanes);
				if (newChild.$$typeof === REACT_CONTEXT_TYPE) return updateFromMap(existingChildren, returnFiber, newIdx, readContextDuringReconciliation(returnFiber, newChild), lanes);
				throwOnInvalidObjectTypeImpl(returnFiber, newChild);
			}
			return null;
		}
		function reconcileChildrenArray(returnFiber, currentFirstChild, newChildren, lanes) {
			for (var resultingFirstChild = null, previousNewFiber = null, oldFiber = currentFirstChild, newIdx = currentFirstChild = 0, nextOldFiber = null; null !== oldFiber && newIdx < newChildren.length; newIdx++) {
				oldFiber.index > newIdx ? (nextOldFiber = oldFiber, oldFiber = null) : nextOldFiber = oldFiber.sibling;
				var newFiber = updateSlot(returnFiber, oldFiber, newChildren[newIdx], lanes);
				if (null === newFiber) {
					null === oldFiber && (oldFiber = nextOldFiber);
					break;
				}
				shouldTrackSideEffects && oldFiber && null === newFiber.alternate && deleteChild(returnFiber, oldFiber);
				currentFirstChild = placeChild(newFiber, currentFirstChild, newIdx);
				null === previousNewFiber ? resultingFirstChild = newFiber : previousNewFiber.sibling = newFiber;
				previousNewFiber = newFiber;
				oldFiber = nextOldFiber;
			}
			if (newIdx === newChildren.length) return deleteRemainingChildren(returnFiber, oldFiber), isHydrating && pushTreeFork(returnFiber, newIdx), resultingFirstChild;
			if (null === oldFiber) {
				for (; newIdx < newChildren.length; newIdx++) oldFiber = createChild(returnFiber, newChildren[newIdx], lanes), null !== oldFiber && (currentFirstChild = placeChild(oldFiber, currentFirstChild, newIdx), null === previousNewFiber ? resultingFirstChild = oldFiber : previousNewFiber.sibling = oldFiber, previousNewFiber = oldFiber);
				isHydrating && pushTreeFork(returnFiber, newIdx);
				return resultingFirstChild;
			}
			for (oldFiber = mapRemainingChildren(oldFiber); newIdx < newChildren.length; newIdx++) nextOldFiber = updateFromMap(oldFiber, returnFiber, newIdx, newChildren[newIdx], lanes), null !== nextOldFiber && (shouldTrackSideEffects && null !== nextOldFiber.alternate && oldFiber.delete(null === nextOldFiber.key ? newIdx : nextOldFiber.key), currentFirstChild = placeChild(nextOldFiber, currentFirstChild, newIdx), null === previousNewFiber ? resultingFirstChild = nextOldFiber : previousNewFiber.sibling = nextOldFiber, previousNewFiber = nextOldFiber);
			shouldTrackSideEffects && oldFiber.forEach(function(child) {
				return deleteChild(returnFiber, child);
			});
			isHydrating && pushTreeFork(returnFiber, newIdx);
			return resultingFirstChild;
		}
		function reconcileChildrenIterator(returnFiber, currentFirstChild, newChildren, lanes) {
			if (null == newChildren) throw Error(formatProdErrorMessage(151));
			for (var resultingFirstChild = null, previousNewFiber = null, oldFiber = currentFirstChild, newIdx = currentFirstChild = 0, nextOldFiber = null, step = newChildren.next(); null !== oldFiber && !step.done; newIdx++, step = newChildren.next()) {
				oldFiber.index > newIdx ? (nextOldFiber = oldFiber, oldFiber = null) : nextOldFiber = oldFiber.sibling;
				var newFiber = updateSlot(returnFiber, oldFiber, step.value, lanes);
				if (null === newFiber) {
					null === oldFiber && (oldFiber = nextOldFiber);
					break;
				}
				shouldTrackSideEffects && oldFiber && null === newFiber.alternate && deleteChild(returnFiber, oldFiber);
				currentFirstChild = placeChild(newFiber, currentFirstChild, newIdx);
				null === previousNewFiber ? resultingFirstChild = newFiber : previousNewFiber.sibling = newFiber;
				previousNewFiber = newFiber;
				oldFiber = nextOldFiber;
			}
			if (step.done) return deleteRemainingChildren(returnFiber, oldFiber), isHydrating && pushTreeFork(returnFiber, newIdx), resultingFirstChild;
			if (null === oldFiber) {
				for (; !step.done; newIdx++, step = newChildren.next()) step = createChild(returnFiber, step.value, lanes), null !== step && (currentFirstChild = placeChild(step, currentFirstChild, newIdx), null === previousNewFiber ? resultingFirstChild = step : previousNewFiber.sibling = step, previousNewFiber = step);
				isHydrating && pushTreeFork(returnFiber, newIdx);
				return resultingFirstChild;
			}
			for (oldFiber = mapRemainingChildren(oldFiber); !step.done; newIdx++, step = newChildren.next()) step = updateFromMap(oldFiber, returnFiber, newIdx, step.value, lanes), null !== step && (shouldTrackSideEffects && null !== step.alternate && oldFiber.delete(null === step.key ? newIdx : step.key), currentFirstChild = placeChild(step, currentFirstChild, newIdx), null === previousNewFiber ? resultingFirstChild = step : previousNewFiber.sibling = step, previousNewFiber = step);
			shouldTrackSideEffects && oldFiber.forEach(function(child) {
				return deleteChild(returnFiber, child);
			});
			isHydrating && pushTreeFork(returnFiber, newIdx);
			return resultingFirstChild;
		}
		function reconcileChildFibersImpl(returnFiber, currentFirstChild, newChild, lanes) {
			"object" === typeof newChild && null !== newChild && newChild.type === REACT_FRAGMENT_TYPE && null === newChild.key && (newChild = newChild.props.children);
			if ("object" === typeof newChild && null !== newChild) {
				switch (newChild.$$typeof) {
					case REACT_ELEMENT_TYPE:
						a: {
							for (var key = newChild.key; null !== currentFirstChild;) {
								if (currentFirstChild.key === key) {
									key = newChild.type;
									if (key === REACT_FRAGMENT_TYPE) {
										if (7 === currentFirstChild.tag) {
											deleteRemainingChildren(returnFiber, currentFirstChild.sibling);
											lanes = useFiber(currentFirstChild, newChild.props.children);
											lanes.return = returnFiber;
											returnFiber = lanes;
											break a;
										}
									} else if (currentFirstChild.elementType === key || "object" === typeof key && null !== key && key.$$typeof === REACT_LAZY_TYPE && resolveLazy(key) === currentFirstChild.type) {
										deleteRemainingChildren(returnFiber, currentFirstChild.sibling);
										lanes = useFiber(currentFirstChild, newChild.props);
										coerceRef(lanes, newChild);
										lanes.return = returnFiber;
										returnFiber = lanes;
										break a;
									}
									deleteRemainingChildren(returnFiber, currentFirstChild);
									break;
								} else deleteChild(returnFiber, currentFirstChild);
								currentFirstChild = currentFirstChild.sibling;
							}
							newChild.type === REACT_FRAGMENT_TYPE ? (lanes = createFiberFromFragment(newChild.props.children, returnFiber.mode, lanes, newChild.key), lanes.return = returnFiber, returnFiber = lanes) : (lanes = createFiberFromTypeAndProps(newChild.type, newChild.key, newChild.props, null, returnFiber.mode, lanes), coerceRef(lanes, newChild), lanes.return = returnFiber, returnFiber = lanes);
						}
						return placeSingleChild(returnFiber);
					case REACT_PORTAL_TYPE:
						a: {
							for (key = newChild.key; null !== currentFirstChild;) {
								if (currentFirstChild.key === key) if (4 === currentFirstChild.tag && currentFirstChild.stateNode.containerInfo === newChild.containerInfo && currentFirstChild.stateNode.implementation === newChild.implementation) {
									deleteRemainingChildren(returnFiber, currentFirstChild.sibling);
									lanes = useFiber(currentFirstChild, newChild.children || []);
									lanes.return = returnFiber;
									returnFiber = lanes;
									break a;
								} else {
									deleteRemainingChildren(returnFiber, currentFirstChild);
									break;
								}
								else deleteChild(returnFiber, currentFirstChild);
								currentFirstChild = currentFirstChild.sibling;
							}
							lanes = createFiberFromPortal(newChild, returnFiber.mode, lanes);
							lanes.return = returnFiber;
							returnFiber = lanes;
						}
						return placeSingleChild(returnFiber);
					case REACT_LAZY_TYPE: return newChild = resolveLazy(newChild), reconcileChildFibersImpl(returnFiber, currentFirstChild, newChild, lanes);
				}
				if (isArrayImpl(newChild)) return reconcileChildrenArray(returnFiber, currentFirstChild, newChild, lanes);
				if (getIteratorFn(newChild)) {
					key = getIteratorFn(newChild);
					if ("function" !== typeof key) throw Error(formatProdErrorMessage(150));
					newChild = key.call(newChild);
					return reconcileChildrenIterator(returnFiber, currentFirstChild, newChild, lanes);
				}
				if ("function" === typeof newChild.then) return reconcileChildFibersImpl(returnFiber, currentFirstChild, unwrapThenable(newChild), lanes);
				if (newChild.$$typeof === REACT_CONTEXT_TYPE) return reconcileChildFibersImpl(returnFiber, currentFirstChild, readContextDuringReconciliation(returnFiber, newChild), lanes);
				throwOnInvalidObjectTypeImpl(returnFiber, newChild);
			}
			return "string" === typeof newChild && "" !== newChild || "number" === typeof newChild || "bigint" === typeof newChild ? (newChild = "" + newChild, null !== currentFirstChild && 6 === currentFirstChild.tag ? (deleteRemainingChildren(returnFiber, currentFirstChild.sibling), lanes = useFiber(currentFirstChild, newChild), lanes.return = returnFiber, returnFiber = lanes) : (deleteRemainingChildren(returnFiber, currentFirstChild), lanes = createFiberFromText(newChild, returnFiber.mode, lanes), lanes.return = returnFiber, returnFiber = lanes), placeSingleChild(returnFiber)) : deleteRemainingChildren(returnFiber, currentFirstChild);
		}
		return function(returnFiber, currentFirstChild, newChild, lanes) {
			try {
				thenableIndexCounter$1 = 0;
				var firstChildFiber = reconcileChildFibersImpl(returnFiber, currentFirstChild, newChild, lanes);
				thenableState$1 = null;
				return firstChildFiber;
			} catch (x) {
				if (x === SuspenseException || x === SuspenseActionException) throw x;
				var fiber = createFiberImplClass(29, x, null, returnFiber.mode);
				fiber.lanes = lanes;
				fiber.return = returnFiber;
				return fiber;
			}
		};
	}
	var reconcileChildFibers = createChildReconciler(!0), mountChildFibers = createChildReconciler(!1), hasForceUpdate = !1;
	function initializeUpdateQueue(fiber) {
		fiber.updateQueue = {
			baseState: fiber.memoizedState,
			firstBaseUpdate: null,
			lastBaseUpdate: null,
			shared: {
				pending: null,
				lanes: 0,
				hiddenCallbacks: null
			},
			callbacks: null
		};
	}
	function cloneUpdateQueue(current, workInProgress) {
		current = current.updateQueue;
		workInProgress.updateQueue === current && (workInProgress.updateQueue = {
			baseState: current.baseState,
			firstBaseUpdate: current.firstBaseUpdate,
			lastBaseUpdate: current.lastBaseUpdate,
			shared: current.shared,
			callbacks: null
		});
	}
	function createUpdate(lane) {
		return {
			lane,
			tag: 0,
			payload: null,
			callback: null,
			next: null
		};
	}
	function enqueueUpdate(fiber, update, lane) {
		var updateQueue = fiber.updateQueue;
		if (null === updateQueue) return null;
		updateQueue = updateQueue.shared;
		if (0 !== (executionContext & 2)) {
			var pending = updateQueue.pending;
			null === pending ? update.next = update : (update.next = pending.next, pending.next = update);
			updateQueue.pending = update;
			update = getRootForUpdatedFiber(fiber);
			markUpdateLaneFromFiberToRoot(fiber, null, lane);
			return update;
		}
		enqueueUpdate$1(fiber, updateQueue, update, lane);
		return getRootForUpdatedFiber(fiber);
	}
	function entangleTransitions(root, fiber, lane) {
		fiber = fiber.updateQueue;
		if (null !== fiber && (fiber = fiber.shared, 0 !== (lane & 4194048))) {
			var queueLanes = fiber.lanes;
			queueLanes &= root.pendingLanes;
			lane |= queueLanes;
			fiber.lanes = lane;
			markRootEntangled(root, lane);
		}
	}
	function enqueueCapturedUpdate(workInProgress, capturedUpdate) {
		var queue = workInProgress.updateQueue, current = workInProgress.alternate;
		if (null !== current && (current = current.updateQueue, queue === current)) {
			var newFirst = null, newLast = null;
			queue = queue.firstBaseUpdate;
			if (null !== queue) {
				do {
					var clone = {
						lane: queue.lane,
						tag: queue.tag,
						payload: queue.payload,
						callback: null,
						next: null
					};
					null === newLast ? newFirst = newLast = clone : newLast = newLast.next = clone;
					queue = queue.next;
				} while (null !== queue);
				null === newLast ? newFirst = newLast = capturedUpdate : newLast = newLast.next = capturedUpdate;
			} else newFirst = newLast = capturedUpdate;
			queue = {
				baseState: current.baseState,
				firstBaseUpdate: newFirst,
				lastBaseUpdate: newLast,
				shared: current.shared,
				callbacks: current.callbacks
			};
			workInProgress.updateQueue = queue;
			return;
		}
		workInProgress = queue.lastBaseUpdate;
		null === workInProgress ? queue.firstBaseUpdate = capturedUpdate : workInProgress.next = capturedUpdate;
		queue.lastBaseUpdate = capturedUpdate;
	}
	var didReadFromEntangledAsyncAction = !1;
	function suspendIfUpdateReadFromEntangledAsyncAction() {
		if (didReadFromEntangledAsyncAction) {
			var entangledActionThenable = currentEntangledActionThenable;
			if (null !== entangledActionThenable) throw entangledActionThenable;
		}
	}
	function processUpdateQueue(workInProgress$jscomp$0, props, instance$jscomp$0, renderLanes) {
		didReadFromEntangledAsyncAction = !1;
		var queue = workInProgress$jscomp$0.updateQueue;
		hasForceUpdate = !1;
		var firstBaseUpdate = queue.firstBaseUpdate, lastBaseUpdate = queue.lastBaseUpdate, pendingQueue = queue.shared.pending;
		if (null !== pendingQueue) {
			queue.shared.pending = null;
			var lastPendingUpdate = pendingQueue, firstPendingUpdate = lastPendingUpdate.next;
			lastPendingUpdate.next = null;
			null === lastBaseUpdate ? firstBaseUpdate = firstPendingUpdate : lastBaseUpdate.next = firstPendingUpdate;
			lastBaseUpdate = lastPendingUpdate;
			var current = workInProgress$jscomp$0.alternate;
			null !== current && (current = current.updateQueue, pendingQueue = current.lastBaseUpdate, pendingQueue !== lastBaseUpdate && (null === pendingQueue ? current.firstBaseUpdate = firstPendingUpdate : pendingQueue.next = firstPendingUpdate, current.lastBaseUpdate = lastPendingUpdate));
		}
		if (null !== firstBaseUpdate) {
			var newState = queue.baseState;
			lastBaseUpdate = 0;
			current = firstPendingUpdate = lastPendingUpdate = null;
			pendingQueue = firstBaseUpdate;
			do {
				var updateLane = pendingQueue.lane & -536870913, isHiddenUpdate = updateLane !== pendingQueue.lane;
				if (isHiddenUpdate ? (workInProgressRootRenderLanes & updateLane) === updateLane : (renderLanes & updateLane) === updateLane) {
					0 !== updateLane && updateLane === currentEntangledLane && (didReadFromEntangledAsyncAction = !0);
					null !== current && (current = current.next = {
						lane: 0,
						tag: pendingQueue.tag,
						payload: pendingQueue.payload,
						callback: null,
						next: null
					});
					a: {
						var workInProgress = workInProgress$jscomp$0, update = pendingQueue;
						updateLane = props;
						var instance = instance$jscomp$0;
						switch (update.tag) {
							case 1:
								workInProgress = update.payload;
								if ("function" === typeof workInProgress) {
									newState = workInProgress.call(instance, newState, updateLane);
									break a;
								}
								newState = workInProgress;
								break a;
							case 3: workInProgress.flags = workInProgress.flags & -65537 | 128;
							case 0:
								workInProgress = update.payload;
								updateLane = "function" === typeof workInProgress ? workInProgress.call(instance, newState, updateLane) : workInProgress;
								if (null === updateLane || void 0 === updateLane) break a;
								newState = assign({}, newState, updateLane);
								break a;
							case 2: hasForceUpdate = !0;
						}
					}
					updateLane = pendingQueue.callback;
					null !== updateLane && (workInProgress$jscomp$0.flags |= 64, isHiddenUpdate && (workInProgress$jscomp$0.flags |= 8192), isHiddenUpdate = queue.callbacks, null === isHiddenUpdate ? queue.callbacks = [updateLane] : isHiddenUpdate.push(updateLane));
				} else isHiddenUpdate = {
					lane: updateLane,
					tag: pendingQueue.tag,
					payload: pendingQueue.payload,
					callback: pendingQueue.callback,
					next: null
				}, null === current ? (firstPendingUpdate = current = isHiddenUpdate, lastPendingUpdate = newState) : current = current.next = isHiddenUpdate, lastBaseUpdate |= updateLane;
				pendingQueue = pendingQueue.next;
				if (null === pendingQueue) if (pendingQueue = queue.shared.pending, null === pendingQueue) break;
				else isHiddenUpdate = pendingQueue, pendingQueue = isHiddenUpdate.next, isHiddenUpdate.next = null, queue.lastBaseUpdate = isHiddenUpdate, queue.shared.pending = null;
			} while (1);
			null === current && (lastPendingUpdate = newState);
			queue.baseState = lastPendingUpdate;
			queue.firstBaseUpdate = firstPendingUpdate;
			queue.lastBaseUpdate = current;
			null === firstBaseUpdate && (queue.shared.lanes = 0);
			workInProgressRootSkippedLanes |= lastBaseUpdate;
			workInProgress$jscomp$0.lanes = lastBaseUpdate;
			workInProgress$jscomp$0.memoizedState = newState;
		}
	}
	function callCallback(callback, context) {
		if ("function" !== typeof callback) throw Error(formatProdErrorMessage(191, callback));
		callback.call(context);
	}
	function commitCallbacks(updateQueue, context) {
		var callbacks = updateQueue.callbacks;
		if (null !== callbacks) for (updateQueue.callbacks = null, updateQueue = 0; updateQueue < callbacks.length; updateQueue++) callCallback(callbacks[updateQueue], context);
	}
	var currentTreeHiddenStackCursor = createCursor(null), prevEntangledRenderLanesCursor = createCursor(0);
	function pushHiddenContext(fiber, context) {
		fiber = entangledRenderLanes;
		push(prevEntangledRenderLanesCursor, fiber);
		push(currentTreeHiddenStackCursor, context);
		entangledRenderLanes = fiber | context.baseLanes;
	}
	function reuseHiddenContextOnStack() {
		push(prevEntangledRenderLanesCursor, entangledRenderLanes);
		push(currentTreeHiddenStackCursor, currentTreeHiddenStackCursor.current);
	}
	function popHiddenContext() {
		entangledRenderLanes = prevEntangledRenderLanesCursor.current;
		pop(currentTreeHiddenStackCursor);
		pop(prevEntangledRenderLanesCursor);
	}
	var suspenseHandlerStackCursor = createCursor(null), shellBoundary = null;
	function pushPrimaryTreeSuspenseHandler(handler) {
		var current = handler.alternate;
		push(suspenseStackCursor, suspenseStackCursor.current & 1);
		push(suspenseHandlerStackCursor, handler);
		null === shellBoundary && (null === current || null !== currentTreeHiddenStackCursor.current ? shellBoundary = handler : null !== current.memoizedState && (shellBoundary = handler));
	}
	function pushDehydratedActivitySuspenseHandler(fiber) {
		push(suspenseStackCursor, suspenseStackCursor.current);
		push(suspenseHandlerStackCursor, fiber);
		null === shellBoundary && (shellBoundary = fiber);
	}
	function pushOffscreenSuspenseHandler(fiber) {
		22 === fiber.tag ? (push(suspenseStackCursor, suspenseStackCursor.current), push(suspenseHandlerStackCursor, fiber), null === shellBoundary && (shellBoundary = fiber)) : reuseSuspenseHandlerOnStack(fiber);
	}
	function reuseSuspenseHandlerOnStack() {
		push(suspenseStackCursor, suspenseStackCursor.current);
		push(suspenseHandlerStackCursor, suspenseHandlerStackCursor.current);
	}
	function popSuspenseHandler(fiber) {
		pop(suspenseHandlerStackCursor);
		shellBoundary === fiber && (shellBoundary = null);
		pop(suspenseStackCursor);
	}
	var suspenseStackCursor = createCursor(0);
	function findFirstSuspended(row) {
		for (var node = row; null !== node;) {
			if (13 === node.tag) {
				var state = node.memoizedState;
				if (null !== state && (state = state.dehydrated, null === state || isSuspenseInstancePending(state) || isSuspenseInstanceFallback(state))) return node;
			} else if (19 === node.tag && ("forwards" === node.memoizedProps.revealOrder || "backwards" === node.memoizedProps.revealOrder || "unstable_legacy-backwards" === node.memoizedProps.revealOrder || "together" === node.memoizedProps.revealOrder)) {
				if (0 !== (node.flags & 128)) return node;
			} else if (null !== node.child) {
				node.child.return = node;
				node = node.child;
				continue;
			}
			if (node === row) break;
			for (; null === node.sibling;) {
				if (null === node.return || node.return === row) return null;
				node = node.return;
			}
			node.sibling.return = node.return;
			node = node.sibling;
		}
		return null;
	}
	var renderLanes = 0, currentlyRenderingFiber = null, currentHook = null, workInProgressHook = null, didScheduleRenderPhaseUpdate = !1, didScheduleRenderPhaseUpdateDuringThisPass = !1, shouldDoubleInvokeUserFnsInHooksDEV = !1, localIdCounter = 0, thenableIndexCounter = 0, thenableState = null, globalClientIdCounter = 0;
	function throwInvalidHookError() {
		throw Error(formatProdErrorMessage(321));
	}
	function areHookInputsEqual(nextDeps, prevDeps) {
		if (null === prevDeps) return !1;
		for (var i = 0; i < prevDeps.length && i < nextDeps.length; i++) if (!objectIs(nextDeps[i], prevDeps[i])) return !1;
		return !0;
	}
	function renderWithHooks(current, workInProgress, Component, props, secondArg, nextRenderLanes) {
		renderLanes = nextRenderLanes;
		currentlyRenderingFiber = workInProgress;
		workInProgress.memoizedState = null;
		workInProgress.updateQueue = null;
		workInProgress.lanes = 0;
		ReactSharedInternals.H = null === current || null === current.memoizedState ? HooksDispatcherOnMount : HooksDispatcherOnUpdate;
		shouldDoubleInvokeUserFnsInHooksDEV = !1;
		nextRenderLanes = Component(props, secondArg);
		shouldDoubleInvokeUserFnsInHooksDEV = !1;
		didScheduleRenderPhaseUpdateDuringThisPass && (nextRenderLanes = renderWithHooksAgain(workInProgress, Component, props, secondArg));
		finishRenderingHooks(current);
		return nextRenderLanes;
	}
	function finishRenderingHooks(current) {
		ReactSharedInternals.H = ContextOnlyDispatcher;
		var didRenderTooFewHooks = null !== currentHook && null !== currentHook.next;
		renderLanes = 0;
		workInProgressHook = currentHook = currentlyRenderingFiber = null;
		didScheduleRenderPhaseUpdate = !1;
		thenableIndexCounter = 0;
		thenableState = null;
		if (didRenderTooFewHooks) throw Error(formatProdErrorMessage(300));
		null === current || didReceiveUpdate || (current = current.dependencies, null !== current && checkIfContextChanged(current) && (didReceiveUpdate = !0));
	}
	function renderWithHooksAgain(workInProgress, Component, props, secondArg) {
		currentlyRenderingFiber = workInProgress;
		var numberOfReRenders = 0;
		do {
			didScheduleRenderPhaseUpdateDuringThisPass && (thenableState = null);
			thenableIndexCounter = 0;
			didScheduleRenderPhaseUpdateDuringThisPass = !1;
			if (25 <= numberOfReRenders) throw Error(formatProdErrorMessage(301));
			numberOfReRenders += 1;
			workInProgressHook = currentHook = null;
			if (null != workInProgress.updateQueue) {
				var children = workInProgress.updateQueue;
				children.lastEffect = null;
				children.events = null;
				children.stores = null;
				null != children.memoCache && (children.memoCache.index = 0);
			}
			ReactSharedInternals.H = HooksDispatcherOnRerender;
			children = Component(props, secondArg);
		} while (didScheduleRenderPhaseUpdateDuringThisPass);
		return children;
	}
	function TransitionAwareHostComponent() {
		var dispatcher = ReactSharedInternals.H, maybeThenable = dispatcher.useState()[0];
		maybeThenable = "function" === typeof maybeThenable.then ? useThenable(maybeThenable) : maybeThenable;
		dispatcher = dispatcher.useState()[0];
		(null !== currentHook ? currentHook.memoizedState : null) !== dispatcher && (currentlyRenderingFiber.flags |= 1024);
		return maybeThenable;
	}
	function checkDidRenderIdHook() {
		var didRenderIdHook = 0 !== localIdCounter;
		localIdCounter = 0;
		return didRenderIdHook;
	}
	function bailoutHooks(current, workInProgress, lanes) {
		workInProgress.updateQueue = current.updateQueue;
		workInProgress.flags &= -2053;
		current.lanes &= ~lanes;
	}
	function resetHooksOnUnwind(workInProgress) {
		if (didScheduleRenderPhaseUpdate) {
			for (workInProgress = workInProgress.memoizedState; null !== workInProgress;) {
				var queue = workInProgress.queue;
				null !== queue && (queue.pending = null);
				workInProgress = workInProgress.next;
			}
			didScheduleRenderPhaseUpdate = !1;
		}
		renderLanes = 0;
		workInProgressHook = currentHook = currentlyRenderingFiber = null;
		didScheduleRenderPhaseUpdateDuringThisPass = !1;
		thenableIndexCounter = localIdCounter = 0;
		thenableState = null;
	}
	function mountWorkInProgressHook() {
		var hook = {
			memoizedState: null,
			baseState: null,
			baseQueue: null,
			queue: null,
			next: null
		};
		null === workInProgressHook ? currentlyRenderingFiber.memoizedState = workInProgressHook = hook : workInProgressHook = workInProgressHook.next = hook;
		return workInProgressHook;
	}
	function updateWorkInProgressHook() {
		if (null === currentHook) {
			var nextCurrentHook = currentlyRenderingFiber.alternate;
			nextCurrentHook = null !== nextCurrentHook ? nextCurrentHook.memoizedState : null;
		} else nextCurrentHook = currentHook.next;
		var nextWorkInProgressHook = null === workInProgressHook ? currentlyRenderingFiber.memoizedState : workInProgressHook.next;
		if (null !== nextWorkInProgressHook) workInProgressHook = nextWorkInProgressHook, currentHook = nextCurrentHook;
		else {
			if (null === nextCurrentHook) {
				if (null === currentlyRenderingFiber.alternate) throw Error(formatProdErrorMessage(467));
				throw Error(formatProdErrorMessage(310));
			}
			currentHook = nextCurrentHook;
			nextCurrentHook = {
				memoizedState: currentHook.memoizedState,
				baseState: currentHook.baseState,
				baseQueue: currentHook.baseQueue,
				queue: currentHook.queue,
				next: null
			};
			null === workInProgressHook ? currentlyRenderingFiber.memoizedState = workInProgressHook = nextCurrentHook : workInProgressHook = workInProgressHook.next = nextCurrentHook;
		}
		return workInProgressHook;
	}
	function createFunctionComponentUpdateQueue() {
		return {
			lastEffect: null,
			events: null,
			stores: null,
			memoCache: null
		};
	}
	function useThenable(thenable) {
		var index = thenableIndexCounter;
		thenableIndexCounter += 1;
		null === thenableState && (thenableState = []);
		thenable = trackUsedThenable(thenableState, thenable, index);
		index = currentlyRenderingFiber;
		null === (null === workInProgressHook ? index.memoizedState : workInProgressHook.next) && (index = index.alternate, ReactSharedInternals.H = null === index || null === index.memoizedState ? HooksDispatcherOnMount : HooksDispatcherOnUpdate);
		return thenable;
	}
	function use(usable) {
		if (null !== usable && "object" === typeof usable) {
			if ("function" === typeof usable.then) return useThenable(usable);
			if (usable.$$typeof === REACT_CONTEXT_TYPE) return readContext(usable);
		}
		throw Error(formatProdErrorMessage(438, String(usable)));
	}
	function useMemoCache(size) {
		var memoCache = null, updateQueue = currentlyRenderingFiber.updateQueue;
		null !== updateQueue && (memoCache = updateQueue.memoCache);
		if (null == memoCache) {
			var current = currentlyRenderingFiber.alternate;
			null !== current && (current = current.updateQueue, null !== current && (current = current.memoCache, null != current && (memoCache = {
				data: current.data.map(function(array) {
					return array.slice();
				}),
				index: 0
			})));
		}
		memoCache ??= {
			data: [],
			index: 0
		};
		null === updateQueue && (updateQueue = createFunctionComponentUpdateQueue(), currentlyRenderingFiber.updateQueue = updateQueue);
		updateQueue.memoCache = memoCache;
		updateQueue = memoCache.data[memoCache.index];
		if (void 0 === updateQueue) for (updateQueue = memoCache.data[memoCache.index] = Array(size), current = 0; current < size; current++) updateQueue[current] = REACT_MEMO_CACHE_SENTINEL;
		memoCache.index++;
		return updateQueue;
	}
	function basicStateReducer(state, action) {
		return "function" === typeof action ? action(state) : action;
	}
	function updateReducer(reducer) {
		return updateReducerImpl(updateWorkInProgressHook(), currentHook, reducer);
	}
	function updateReducerImpl(hook, current, reducer) {
		var queue = hook.queue;
		if (null === queue) throw Error(formatProdErrorMessage(311));
		queue.lastRenderedReducer = reducer;
		var baseQueue = hook.baseQueue, pendingQueue = queue.pending;
		if (null !== pendingQueue) {
			if (null !== baseQueue) {
				var baseFirst = baseQueue.next;
				baseQueue.next = pendingQueue.next;
				pendingQueue.next = baseFirst;
			}
			current.baseQueue = baseQueue = pendingQueue;
			queue.pending = null;
		}
		pendingQueue = hook.baseState;
		if (null === baseQueue) hook.memoizedState = pendingQueue;
		else {
			current = baseQueue.next;
			var newBaseQueueFirst = baseFirst = null, newBaseQueueLast = null, update = current, didReadFromEntangledAsyncAction$60 = !1;
			do {
				var updateLane = update.lane & -536870913;
				if (updateLane !== update.lane ? (workInProgressRootRenderLanes & updateLane) === updateLane : (renderLanes & updateLane) === updateLane) {
					var revertLane = update.revertLane;
					if (0 === revertLane) null !== newBaseQueueLast && (newBaseQueueLast = newBaseQueueLast.next = {
						lane: 0,
						revertLane: 0,
						gesture: null,
						action: update.action,
						hasEagerState: update.hasEagerState,
						eagerState: update.eagerState,
						next: null
					}), updateLane === currentEntangledLane && (didReadFromEntangledAsyncAction$60 = !0);
					else if ((renderLanes & revertLane) === revertLane) {
						update = update.next;
						revertLane === currentEntangledLane && (didReadFromEntangledAsyncAction$60 = !0);
						continue;
					} else updateLane = {
						lane: 0,
						revertLane: update.revertLane,
						gesture: null,
						action: update.action,
						hasEagerState: update.hasEagerState,
						eagerState: update.eagerState,
						next: null
					}, null === newBaseQueueLast ? (newBaseQueueFirst = newBaseQueueLast = updateLane, baseFirst = pendingQueue) : newBaseQueueLast = newBaseQueueLast.next = updateLane, currentlyRenderingFiber.lanes |= revertLane, workInProgressRootSkippedLanes |= revertLane;
					updateLane = update.action;
					shouldDoubleInvokeUserFnsInHooksDEV && reducer(pendingQueue, updateLane);
					pendingQueue = update.hasEagerState ? update.eagerState : reducer(pendingQueue, updateLane);
				} else revertLane = {
					lane: updateLane,
					revertLane: update.revertLane,
					gesture: update.gesture,
					action: update.action,
					hasEagerState: update.hasEagerState,
					eagerState: update.eagerState,
					next: null
				}, null === newBaseQueueLast ? (newBaseQueueFirst = newBaseQueueLast = revertLane, baseFirst = pendingQueue) : newBaseQueueLast = newBaseQueueLast.next = revertLane, currentlyRenderingFiber.lanes |= updateLane, workInProgressRootSkippedLanes |= updateLane;
				update = update.next;
			} while (null !== update && update !== current);
			null === newBaseQueueLast ? baseFirst = pendingQueue : newBaseQueueLast.next = newBaseQueueFirst;
			if (!objectIs(pendingQueue, hook.memoizedState) && (didReceiveUpdate = !0, didReadFromEntangledAsyncAction$60 && (reducer = currentEntangledActionThenable, null !== reducer))) throw reducer;
			hook.memoizedState = pendingQueue;
			hook.baseState = baseFirst;
			hook.baseQueue = newBaseQueueLast;
			queue.lastRenderedState = pendingQueue;
		}
		null === baseQueue && (queue.lanes = 0);
		return [hook.memoizedState, queue.dispatch];
	}
	function rerenderReducer(reducer) {
		var hook = updateWorkInProgressHook(), queue = hook.queue;
		if (null === queue) throw Error(formatProdErrorMessage(311));
		queue.lastRenderedReducer = reducer;
		var dispatch = queue.dispatch, lastRenderPhaseUpdate = queue.pending, newState = hook.memoizedState;
		if (null !== lastRenderPhaseUpdate) {
			queue.pending = null;
			var update = lastRenderPhaseUpdate = lastRenderPhaseUpdate.next;
			do
				newState = reducer(newState, update.action), update = update.next;
			while (update !== lastRenderPhaseUpdate);
			objectIs(newState, hook.memoizedState) || (didReceiveUpdate = !0);
			hook.memoizedState = newState;
			null === hook.baseQueue && (hook.baseState = newState);
			queue.lastRenderedState = newState;
		}
		return [newState, dispatch];
	}
	function updateSyncExternalStore(subscribe, getSnapshot, getServerSnapshot) {
		var fiber = currentlyRenderingFiber, hook = updateWorkInProgressHook(), isHydrating$jscomp$0 = isHydrating;
		if (isHydrating$jscomp$0) {
			if (void 0 === getServerSnapshot) throw Error(formatProdErrorMessage(407));
			getServerSnapshot = getServerSnapshot();
		} else getServerSnapshot = getSnapshot();
		var snapshotChanged = !objectIs((currentHook || hook).memoizedState, getServerSnapshot);
		snapshotChanged && (hook.memoizedState = getServerSnapshot, didReceiveUpdate = !0);
		hook = hook.queue;
		updateEffect(subscribeToStore.bind(null, fiber, hook, subscribe), [subscribe]);
		if (hook.getSnapshot !== getSnapshot || snapshotChanged || null !== workInProgressHook && workInProgressHook.memoizedState.tag & 1) {
			fiber.flags |= 2048;
			pushSimpleEffect(9, { destroy: void 0 }, updateStoreInstance.bind(null, fiber, hook, getServerSnapshot, getSnapshot), null);
			if (null === workInProgressRoot) throw Error(formatProdErrorMessage(349));
			isHydrating$jscomp$0 || 0 !== (renderLanes & 127) || pushStoreConsistencyCheck(fiber, getSnapshot, getServerSnapshot);
		}
		return getServerSnapshot;
	}
	function pushStoreConsistencyCheck(fiber, getSnapshot, renderedSnapshot) {
		fiber.flags |= 16384;
		fiber = {
			getSnapshot,
			value: renderedSnapshot
		};
		getSnapshot = currentlyRenderingFiber.updateQueue;
		null === getSnapshot ? (getSnapshot = createFunctionComponentUpdateQueue(), currentlyRenderingFiber.updateQueue = getSnapshot, getSnapshot.stores = [fiber]) : (renderedSnapshot = getSnapshot.stores, null === renderedSnapshot ? getSnapshot.stores = [fiber] : renderedSnapshot.push(fiber));
	}
	function updateStoreInstance(fiber, inst, nextSnapshot, getSnapshot) {
		inst.value = nextSnapshot;
		inst.getSnapshot = getSnapshot;
		checkIfSnapshotChanged(inst) && forceStoreRerender(fiber);
	}
	function subscribeToStore(fiber, inst, subscribe) {
		return subscribe(function() {
			checkIfSnapshotChanged(inst) && forceStoreRerender(fiber);
		});
	}
	function checkIfSnapshotChanged(inst) {
		var latestGetSnapshot = inst.getSnapshot;
		inst = inst.value;
		try {
			var nextValue = latestGetSnapshot();
			return !objectIs(inst, nextValue);
		} catch (error) {
			return !0;
		}
	}
	function forceStoreRerender(fiber) {
		var root = enqueueConcurrentRenderForLane(fiber, 2);
		null !== root && scheduleUpdateOnFiber(root, fiber, 2);
	}
	function mountStateImpl(initialState) {
		var hook = mountWorkInProgressHook();
		if ("function" === typeof initialState) {
			var initialStateInitializer = initialState;
			initialState = initialStateInitializer();
			if (shouldDoubleInvokeUserFnsInHooksDEV) {
				setIsStrictModeForDevtools(!0);
				try {
					initialStateInitializer();
				} finally {
					setIsStrictModeForDevtools(!1);
				}
			}
		}
		hook.memoizedState = hook.baseState = initialState;
		hook.queue = {
			pending: null,
			lanes: 0,
			dispatch: null,
			lastRenderedReducer: basicStateReducer,
			lastRenderedState: initialState
		};
		return hook;
	}
	function updateOptimisticImpl(hook, current, passthrough, reducer) {
		hook.baseState = passthrough;
		return updateReducerImpl(hook, currentHook, "function" === typeof reducer ? reducer : basicStateReducer);
	}
	function dispatchActionState(fiber, actionQueue, setPendingState, setState, payload) {
		if (isRenderPhaseUpdate(fiber)) throw Error(formatProdErrorMessage(485));
		fiber = actionQueue.action;
		if (null !== fiber) {
			var actionNode = {
				payload,
				action: fiber,
				next: null,
				isTransition: !0,
				status: "pending",
				value: null,
				reason: null,
				listeners: [],
				then: function(listener) {
					actionNode.listeners.push(listener);
				}
			};
			null !== ReactSharedInternals.T ? setPendingState(!0) : actionNode.isTransition = !1;
			setState(actionNode);
			setPendingState = actionQueue.pending;
			null === setPendingState ? (actionNode.next = actionQueue.pending = actionNode, runActionStateAction(actionQueue, actionNode)) : (actionNode.next = setPendingState.next, actionQueue.pending = setPendingState.next = actionNode);
		}
	}
	function runActionStateAction(actionQueue, node) {
		var action = node.action, payload = node.payload, prevState = actionQueue.state;
		if (node.isTransition) {
			var prevTransition = ReactSharedInternals.T, currentTransition = {};
			ReactSharedInternals.T = currentTransition;
			try {
				var returnValue = action(prevState, payload), onStartTransitionFinish = ReactSharedInternals.S;
				null !== onStartTransitionFinish && onStartTransitionFinish(currentTransition, returnValue);
				handleActionReturnValue(actionQueue, node, returnValue);
			} catch (error) {
				onActionError(actionQueue, node, error);
			} finally {
				null !== prevTransition && null !== currentTransition.types && (prevTransition.types = currentTransition.types), ReactSharedInternals.T = prevTransition;
			}
		} else try {
			prevTransition = action(prevState, payload), handleActionReturnValue(actionQueue, node, prevTransition);
		} catch (error$66) {
			onActionError(actionQueue, node, error$66);
		}
	}
	function handleActionReturnValue(actionQueue, node, returnValue) {
		null !== returnValue && "object" === typeof returnValue && "function" === typeof returnValue.then ? returnValue.then(function(nextState) {
			onActionSuccess(actionQueue, node, nextState);
		}, function(error) {
			return onActionError(actionQueue, node, error);
		}) : onActionSuccess(actionQueue, node, returnValue);
	}
	function onActionSuccess(actionQueue, actionNode, nextState) {
		actionNode.status = "fulfilled";
		actionNode.value = nextState;
		notifyActionListeners(actionNode);
		actionQueue.state = nextState;
		actionNode = actionQueue.pending;
		null !== actionNode && (nextState = actionNode.next, nextState === actionNode ? actionQueue.pending = null : (nextState = nextState.next, actionNode.next = nextState, runActionStateAction(actionQueue, nextState)));
	}
	function onActionError(actionQueue, actionNode, error) {
		var last = actionQueue.pending;
		actionQueue.pending = null;
		if (null !== last) {
			last = last.next;
			do
				actionNode.status = "rejected", actionNode.reason = error, notifyActionListeners(actionNode), actionNode = actionNode.next;
			while (actionNode !== last);
		}
		actionQueue.action = null;
	}
	function notifyActionListeners(actionNode) {
		actionNode = actionNode.listeners;
		for (var i = 0; i < actionNode.length; i++) (0, actionNode[i])();
	}
	function actionStateReducer(oldState, newState) {
		return newState;
	}
	function mountActionState(action, initialStateProp) {
		if (isHydrating) {
			var ssrFormState = workInProgressRoot.formState;
			if (null !== ssrFormState) {
				a: {
					var JSCompiler_inline_result = currentlyRenderingFiber;
					if (isHydrating) {
						if (nextHydratableInstance) {
							b: {
								var JSCompiler_inline_result$jscomp$0 = nextHydratableInstance;
								for (var inRootOrSingleton = rootOrSingletonContext; 8 !== JSCompiler_inline_result$jscomp$0.nodeType;) {
									if (!inRootOrSingleton) {
										JSCompiler_inline_result$jscomp$0 = null;
										break b;
									}
									JSCompiler_inline_result$jscomp$0 = getNextHydratable(JSCompiler_inline_result$jscomp$0.nextSibling);
									if (null === JSCompiler_inline_result$jscomp$0) {
										JSCompiler_inline_result$jscomp$0 = null;
										break b;
									}
								}
								inRootOrSingleton = JSCompiler_inline_result$jscomp$0.data;
								JSCompiler_inline_result$jscomp$0 = "F!" === inRootOrSingleton || "F" === inRootOrSingleton ? JSCompiler_inline_result$jscomp$0 : null;
							}
							if (JSCompiler_inline_result$jscomp$0) {
								nextHydratableInstance = getNextHydratable(JSCompiler_inline_result$jscomp$0.nextSibling);
								JSCompiler_inline_result = "F!" === JSCompiler_inline_result$jscomp$0.data;
								break a;
							}
						}
						throwOnHydrationMismatch(JSCompiler_inline_result);
					}
					JSCompiler_inline_result = !1;
				}
				JSCompiler_inline_result && (initialStateProp = ssrFormState[0]);
			}
		}
		ssrFormState = mountWorkInProgressHook();
		ssrFormState.memoizedState = ssrFormState.baseState = initialStateProp;
		JSCompiler_inline_result = {
			pending: null,
			lanes: 0,
			dispatch: null,
			lastRenderedReducer: actionStateReducer,
			lastRenderedState: initialStateProp
		};
		ssrFormState.queue = JSCompiler_inline_result;
		ssrFormState = dispatchSetState.bind(null, currentlyRenderingFiber, JSCompiler_inline_result);
		JSCompiler_inline_result.dispatch = ssrFormState;
		JSCompiler_inline_result = mountStateImpl(!1);
		inRootOrSingleton = dispatchOptimisticSetState.bind(null, currentlyRenderingFiber, !1, JSCompiler_inline_result.queue);
		JSCompiler_inline_result = mountWorkInProgressHook();
		JSCompiler_inline_result$jscomp$0 = {
			state: initialStateProp,
			dispatch: null,
			action,
			pending: null
		};
		JSCompiler_inline_result.queue = JSCompiler_inline_result$jscomp$0;
		ssrFormState = dispatchActionState.bind(null, currentlyRenderingFiber, JSCompiler_inline_result$jscomp$0, inRootOrSingleton, ssrFormState);
		JSCompiler_inline_result$jscomp$0.dispatch = ssrFormState;
		JSCompiler_inline_result.memoizedState = action;
		return [
			initialStateProp,
			ssrFormState,
			!1
		];
	}
	function updateActionState(action) {
		return updateActionStateImpl(updateWorkInProgressHook(), currentHook, action);
	}
	function updateActionStateImpl(stateHook, currentStateHook, action) {
		currentStateHook = updateReducerImpl(stateHook, currentStateHook, actionStateReducer)[0];
		stateHook = updateReducer(basicStateReducer)[0];
		if ("object" === typeof currentStateHook && null !== currentStateHook && "function" === typeof currentStateHook.then) try {
			var state = useThenable(currentStateHook);
		} catch (x) {
			if (x === SuspenseException) throw SuspenseActionException;
			throw x;
		}
		else state = currentStateHook;
		currentStateHook = updateWorkInProgressHook();
		var actionQueue = currentStateHook.queue, dispatch = actionQueue.dispatch;
		action !== currentStateHook.memoizedState && (currentlyRenderingFiber.flags |= 2048, pushSimpleEffect(9, { destroy: void 0 }, actionStateActionEffect.bind(null, actionQueue, action), null));
		return [
			state,
			dispatch,
			stateHook
		];
	}
	function actionStateActionEffect(actionQueue, action) {
		actionQueue.action = action;
	}
	function rerenderActionState(action) {
		var stateHook = updateWorkInProgressHook(), currentStateHook = currentHook;
		if (null !== currentStateHook) return updateActionStateImpl(stateHook, currentStateHook, action);
		updateWorkInProgressHook();
		stateHook = stateHook.memoizedState;
		currentStateHook = updateWorkInProgressHook();
		var dispatch = currentStateHook.queue.dispatch;
		currentStateHook.memoizedState = action;
		return [
			stateHook,
			dispatch,
			!1
		];
	}
	function pushSimpleEffect(tag, inst, create, deps) {
		tag = {
			tag,
			create,
			deps,
			inst,
			next: null
		};
		inst = currentlyRenderingFiber.updateQueue;
		null === inst && (inst = createFunctionComponentUpdateQueue(), currentlyRenderingFiber.updateQueue = inst);
		create = inst.lastEffect;
		null === create ? inst.lastEffect = tag.next = tag : (deps = create.next, create.next = tag, tag.next = deps, inst.lastEffect = tag);
		return tag;
	}
	function updateRef() {
		return updateWorkInProgressHook().memoizedState;
	}
	function mountEffectImpl(fiberFlags, hookFlags, create, deps) {
		var hook = mountWorkInProgressHook();
		currentlyRenderingFiber.flags |= fiberFlags;
		hook.memoizedState = pushSimpleEffect(1 | hookFlags, { destroy: void 0 }, create, void 0 === deps ? null : deps);
	}
	function updateEffectImpl(fiberFlags, hookFlags, create, deps) {
		var hook = updateWorkInProgressHook();
		deps = void 0 === deps ? null : deps;
		var inst = hook.memoizedState.inst;
		null !== currentHook && null !== deps && areHookInputsEqual(deps, currentHook.memoizedState.deps) ? hook.memoizedState = pushSimpleEffect(hookFlags, inst, create, deps) : (currentlyRenderingFiber.flags |= fiberFlags, hook.memoizedState = pushSimpleEffect(1 | hookFlags, inst, create, deps));
	}
	function mountEffect(create, deps) {
		mountEffectImpl(8390656, 8, create, deps);
	}
	function updateEffect(create, deps) {
		updateEffectImpl(2048, 8, create, deps);
	}
	function useEffectEventImpl(payload) {
		currentlyRenderingFiber.flags |= 4;
		var componentUpdateQueue = currentlyRenderingFiber.updateQueue;
		if (null === componentUpdateQueue) componentUpdateQueue = createFunctionComponentUpdateQueue(), currentlyRenderingFiber.updateQueue = componentUpdateQueue, componentUpdateQueue.events = [payload];
		else {
			var events = componentUpdateQueue.events;
			null === events ? componentUpdateQueue.events = [payload] : events.push(payload);
		}
	}
	function updateEvent(callback) {
		var ref = updateWorkInProgressHook().memoizedState;
		useEffectEventImpl({
			ref,
			nextImpl: callback
		});
		return function() {
			if (0 !== (executionContext & 2)) throw Error(formatProdErrorMessage(440));
			return ref.impl.apply(void 0, arguments);
		};
	}
	function updateInsertionEffect(create, deps) {
		return updateEffectImpl(4, 2, create, deps);
	}
	function updateLayoutEffect(create, deps) {
		return updateEffectImpl(4, 4, create, deps);
	}
	function imperativeHandleEffect(create, ref) {
		if ("function" === typeof ref) {
			create = create();
			var refCleanup = ref(create);
			return function() {
				"function" === typeof refCleanup ? refCleanup() : ref(null);
			};
		}
		if (null !== ref && void 0 !== ref) return create = create(), ref.current = create, function() {
			ref.current = null;
		};
	}
	function updateImperativeHandle(ref, create, deps) {
		deps = null !== deps && void 0 !== deps ? deps.concat([ref]) : null;
		updateEffectImpl(4, 4, imperativeHandleEffect.bind(null, create, ref), deps);
	}
	function mountDebugValue() {}
	function updateCallback(callback, deps) {
		var hook = updateWorkInProgressHook();
		deps = void 0 === deps ? null : deps;
		var prevState = hook.memoizedState;
		if (null !== deps && areHookInputsEqual(deps, prevState[1])) return prevState[0];
		hook.memoizedState = [callback, deps];
		return callback;
	}
	function updateMemo(nextCreate, deps) {
		var hook = updateWorkInProgressHook();
		deps = void 0 === deps ? null : deps;
		var prevState = hook.memoizedState;
		if (null !== deps && areHookInputsEqual(deps, prevState[1])) return prevState[0];
		prevState = nextCreate();
		if (shouldDoubleInvokeUserFnsInHooksDEV) {
			setIsStrictModeForDevtools(!0);
			try {
				nextCreate();
			} finally {
				setIsStrictModeForDevtools(!1);
			}
		}
		hook.memoizedState = [prevState, deps];
		return prevState;
	}
	function mountDeferredValueImpl(hook, value, initialValue) {
		if (void 0 === initialValue || 0 !== (renderLanes & 1073741824) && 0 === (workInProgressRootRenderLanes & 261930)) return hook.memoizedState = value;
		hook.memoizedState = initialValue;
		hook = requestDeferredLane();
		currentlyRenderingFiber.lanes |= hook;
		workInProgressRootSkippedLanes |= hook;
		return initialValue;
	}
	function updateDeferredValueImpl(hook, prevValue, value, initialValue) {
		if (objectIs(value, prevValue)) return value;
		if (null !== currentTreeHiddenStackCursor.current) return hook = mountDeferredValueImpl(hook, value, initialValue), objectIs(hook, prevValue) || (didReceiveUpdate = !0), hook;
		if (0 === (renderLanes & 42) || 0 !== (renderLanes & 1073741824) && 0 === (workInProgressRootRenderLanes & 261930)) return didReceiveUpdate = !0, hook.memoizedState = value;
		hook = requestDeferredLane();
		currentlyRenderingFiber.lanes |= hook;
		workInProgressRootSkippedLanes |= hook;
		return prevValue;
	}
	function startTransition(fiber, queue, pendingState, finishedState, callback) {
		var previousPriority = ReactDOMSharedInternals.p;
		ReactDOMSharedInternals.p = 0 !== previousPriority && 8 > previousPriority ? previousPriority : 8;
		var prevTransition = ReactSharedInternals.T, currentTransition = {};
		ReactSharedInternals.T = currentTransition;
		dispatchOptimisticSetState(fiber, !1, queue, pendingState);
		try {
			var returnValue = callback(), onStartTransitionFinish = ReactSharedInternals.S;
			null !== onStartTransitionFinish && onStartTransitionFinish(currentTransition, returnValue);
			if (null !== returnValue && "object" === typeof returnValue && "function" === typeof returnValue.then) dispatchSetStateInternal(fiber, queue, chainThenableValue(returnValue, finishedState), requestUpdateLane(fiber));
			else dispatchSetStateInternal(fiber, queue, finishedState, requestUpdateLane(fiber));
		} catch (error) {
			dispatchSetStateInternal(fiber, queue, {
				then: function() {},
				status: "rejected",
				reason: error
			}, requestUpdateLane());
		} finally {
			ReactDOMSharedInternals.p = previousPriority, null !== prevTransition && null !== currentTransition.types && (prevTransition.types = currentTransition.types), ReactSharedInternals.T = prevTransition;
		}
	}
	function noop() {}
	function startHostTransition(formFiber, pendingState, action, formData) {
		if (5 !== formFiber.tag) throw Error(formatProdErrorMessage(476));
		var queue = ensureFormComponentIsStateful(formFiber).queue;
		startTransition(formFiber, queue, pendingState, sharedNotPendingObject, null === action ? noop : function() {
			requestFormReset$1(formFiber);
			return action(formData);
		});
	}
	function ensureFormComponentIsStateful(formFiber) {
		var existingStateHook = formFiber.memoizedState;
		if (null !== existingStateHook) return existingStateHook;
		existingStateHook = {
			memoizedState: sharedNotPendingObject,
			baseState: sharedNotPendingObject,
			baseQueue: null,
			queue: {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: basicStateReducer,
				lastRenderedState: sharedNotPendingObject
			},
			next: null
		};
		var initialResetState = {};
		existingStateHook.next = {
			memoizedState: initialResetState,
			baseState: initialResetState,
			baseQueue: null,
			queue: {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: basicStateReducer,
				lastRenderedState: initialResetState
			},
			next: null
		};
		formFiber.memoizedState = existingStateHook;
		formFiber = formFiber.alternate;
		null !== formFiber && (formFiber.memoizedState = existingStateHook);
		return existingStateHook;
	}
	function requestFormReset$1(formFiber) {
		var stateHook = ensureFormComponentIsStateful(formFiber);
		null === stateHook.next && (stateHook = formFiber.alternate.memoizedState);
		dispatchSetStateInternal(formFiber, stateHook.next.queue, {}, requestUpdateLane());
	}
	function useHostTransitionStatus() {
		return readContext(HostTransitionContext);
	}
	function updateId() {
		return updateWorkInProgressHook().memoizedState;
	}
	function updateRefresh() {
		return updateWorkInProgressHook().memoizedState;
	}
	function refreshCache(fiber) {
		for (var provider = fiber.return; null !== provider;) {
			switch (provider.tag) {
				case 24:
				case 3:
					var lane = requestUpdateLane();
					fiber = createUpdate(lane);
					var root$69 = enqueueUpdate(provider, fiber, lane);
					null !== root$69 && (scheduleUpdateOnFiber(root$69, provider, lane), entangleTransitions(root$69, provider, lane));
					provider = { cache: createCache() };
					fiber.payload = provider;
					return;
			}
			provider = provider.return;
		}
	}
	function dispatchReducerAction(fiber, queue, action) {
		var lane = requestUpdateLane();
		action = {
			lane,
			revertLane: 0,
			gesture: null,
			action,
			hasEagerState: !1,
			eagerState: null,
			next: null
		};
		isRenderPhaseUpdate(fiber) ? enqueueRenderPhaseUpdate(queue, action) : (action = enqueueConcurrentHookUpdate(fiber, queue, action, lane), null !== action && (scheduleUpdateOnFiber(action, fiber, lane), entangleTransitionUpdate(action, queue, lane)));
	}
	function dispatchSetState(fiber, queue, action) {
		dispatchSetStateInternal(fiber, queue, action, requestUpdateLane());
	}
	function dispatchSetStateInternal(fiber, queue, action, lane) {
		var update = {
			lane,
			revertLane: 0,
			gesture: null,
			action,
			hasEagerState: !1,
			eagerState: null,
			next: null
		};
		if (isRenderPhaseUpdate(fiber)) enqueueRenderPhaseUpdate(queue, update);
		else {
			var alternate = fiber.alternate;
			if (0 === fiber.lanes && (null === alternate || 0 === alternate.lanes) && (alternate = queue.lastRenderedReducer, null !== alternate)) try {
				var currentState = queue.lastRenderedState, eagerState = alternate(currentState, action);
				update.hasEagerState = !0;
				update.eagerState = eagerState;
				if (objectIs(eagerState, currentState)) return enqueueUpdate$1(fiber, queue, update, 0), null === workInProgressRoot && finishQueueingConcurrentUpdates(), !1;
			} catch (error) {}
			action = enqueueConcurrentHookUpdate(fiber, queue, update, lane);
			if (null !== action) return scheduleUpdateOnFiber(action, fiber, lane), entangleTransitionUpdate(action, queue, lane), !0;
		}
		return !1;
	}
	function dispatchOptimisticSetState(fiber, throwIfDuringRender, queue, action) {
		action = {
			lane: 2,
			revertLane: requestTransitionLane(),
			gesture: null,
			action,
			hasEagerState: !1,
			eagerState: null,
			next: null
		};
		if (isRenderPhaseUpdate(fiber)) {
			if (throwIfDuringRender) throw Error(formatProdErrorMessage(479));
		} else throwIfDuringRender = enqueueConcurrentHookUpdate(fiber, queue, action, 2), null !== throwIfDuringRender && scheduleUpdateOnFiber(throwIfDuringRender, fiber, 2);
	}
	function isRenderPhaseUpdate(fiber) {
		var alternate = fiber.alternate;
		return fiber === currentlyRenderingFiber || null !== alternate && alternate === currentlyRenderingFiber;
	}
	function enqueueRenderPhaseUpdate(queue, update) {
		didScheduleRenderPhaseUpdateDuringThisPass = didScheduleRenderPhaseUpdate = !0;
		var pending = queue.pending;
		null === pending ? update.next = update : (update.next = pending.next, pending.next = update);
		queue.pending = update;
	}
	function entangleTransitionUpdate(root, queue, lane) {
		if (0 !== (lane & 4194048)) {
			var queueLanes = queue.lanes;
			queueLanes &= root.pendingLanes;
			lane |= queueLanes;
			queue.lanes = lane;
			markRootEntangled(root, lane);
		}
	}
	var ContextOnlyDispatcher = {
		readContext,
		use,
		useCallback: throwInvalidHookError,
		useContext: throwInvalidHookError,
		useEffect: throwInvalidHookError,
		useImperativeHandle: throwInvalidHookError,
		useLayoutEffect: throwInvalidHookError,
		useInsertionEffect: throwInvalidHookError,
		useMemo: throwInvalidHookError,
		useReducer: throwInvalidHookError,
		useRef: throwInvalidHookError,
		useState: throwInvalidHookError,
		useDebugValue: throwInvalidHookError,
		useDeferredValue: throwInvalidHookError,
		useTransition: throwInvalidHookError,
		useSyncExternalStore: throwInvalidHookError,
		useId: throwInvalidHookError,
		useHostTransitionStatus: throwInvalidHookError,
		useFormState: throwInvalidHookError,
		useActionState: throwInvalidHookError,
		useOptimistic: throwInvalidHookError,
		useMemoCache: throwInvalidHookError,
		useCacheRefresh: throwInvalidHookError
	};
	ContextOnlyDispatcher.useEffectEvent = throwInvalidHookError;
	var HooksDispatcherOnMount = {
		readContext,
		use,
		useCallback: function(callback, deps) {
			mountWorkInProgressHook().memoizedState = [callback, void 0 === deps ? null : deps];
			return callback;
		},
		useContext: readContext,
		useEffect: mountEffect,
		useImperativeHandle: function(ref, create, deps) {
			deps = null !== deps && void 0 !== deps ? deps.concat([ref]) : null;
			mountEffectImpl(4194308, 4, imperativeHandleEffect.bind(null, create, ref), deps);
		},
		useLayoutEffect: function(create, deps) {
			return mountEffectImpl(4194308, 4, create, deps);
		},
		useInsertionEffect: function(create, deps) {
			mountEffectImpl(4, 2, create, deps);
		},
		useMemo: function(nextCreate, deps) {
			var hook = mountWorkInProgressHook();
			deps = void 0 === deps ? null : deps;
			var nextValue = nextCreate();
			if (shouldDoubleInvokeUserFnsInHooksDEV) {
				setIsStrictModeForDevtools(!0);
				try {
					nextCreate();
				} finally {
					setIsStrictModeForDevtools(!1);
				}
			}
			hook.memoizedState = [nextValue, deps];
			return nextValue;
		},
		useReducer: function(reducer, initialArg, init) {
			var hook = mountWorkInProgressHook();
			if (void 0 !== init) {
				var initialState = init(initialArg);
				if (shouldDoubleInvokeUserFnsInHooksDEV) {
					setIsStrictModeForDevtools(!0);
					try {
						init(initialArg);
					} finally {
						setIsStrictModeForDevtools(!1);
					}
				}
			} else initialState = initialArg;
			hook.memoizedState = hook.baseState = initialState;
			reducer = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: reducer,
				lastRenderedState: initialState
			};
			hook.queue = reducer;
			reducer = reducer.dispatch = dispatchReducerAction.bind(null, currentlyRenderingFiber, reducer);
			return [hook.memoizedState, reducer];
		},
		useRef: function(initialValue) {
			var hook = mountWorkInProgressHook();
			initialValue = { current: initialValue };
			return hook.memoizedState = initialValue;
		},
		useState: function(initialState) {
			initialState = mountStateImpl(initialState);
			var queue = initialState.queue, dispatch = dispatchSetState.bind(null, currentlyRenderingFiber, queue);
			queue.dispatch = dispatch;
			return [initialState.memoizedState, dispatch];
		},
		useDebugValue: mountDebugValue,
		useDeferredValue: function(value, initialValue) {
			return mountDeferredValueImpl(mountWorkInProgressHook(), value, initialValue);
		},
		useTransition: function() {
			var stateHook = mountStateImpl(!1);
			stateHook = startTransition.bind(null, currentlyRenderingFiber, stateHook.queue, !0, !1);
			mountWorkInProgressHook().memoizedState = stateHook;
			return [!1, stateHook];
		},
		useSyncExternalStore: function(subscribe, getSnapshot, getServerSnapshot) {
			var fiber = currentlyRenderingFiber, hook = mountWorkInProgressHook();
			if (isHydrating) {
				if (void 0 === getServerSnapshot) throw Error(formatProdErrorMessage(407));
				getServerSnapshot = getServerSnapshot();
			} else {
				getServerSnapshot = getSnapshot();
				if (null === workInProgressRoot) throw Error(formatProdErrorMessage(349));
				0 !== (workInProgressRootRenderLanes & 127) || pushStoreConsistencyCheck(fiber, getSnapshot, getServerSnapshot);
			}
			hook.memoizedState = getServerSnapshot;
			var inst = {
				value: getServerSnapshot,
				getSnapshot
			};
			hook.queue = inst;
			mountEffect(subscribeToStore.bind(null, fiber, inst, subscribe), [subscribe]);
			fiber.flags |= 2048;
			pushSimpleEffect(9, { destroy: void 0 }, updateStoreInstance.bind(null, fiber, inst, getServerSnapshot, getSnapshot), null);
			return getServerSnapshot;
		},
		useId: function() {
			var hook = mountWorkInProgressHook(), identifierPrefix = workInProgressRoot.identifierPrefix;
			if (isHydrating) {
				var JSCompiler_inline_result = treeContextOverflow;
				var idWithLeadingBit = treeContextId;
				JSCompiler_inline_result = (idWithLeadingBit & ~(1 << 32 - clz32(idWithLeadingBit) - 1)).toString(32) + JSCompiler_inline_result;
				identifierPrefix = "_" + identifierPrefix + "R_" + JSCompiler_inline_result;
				JSCompiler_inline_result = localIdCounter++;
				0 < JSCompiler_inline_result && (identifierPrefix += "H" + JSCompiler_inline_result.toString(32));
				identifierPrefix += "_";
			} else JSCompiler_inline_result = globalClientIdCounter++, identifierPrefix = "_" + identifierPrefix + "r_" + JSCompiler_inline_result.toString(32) + "_";
			return hook.memoizedState = identifierPrefix;
		},
		useHostTransitionStatus,
		useFormState: mountActionState,
		useActionState: mountActionState,
		useOptimistic: function(passthrough) {
			var hook = mountWorkInProgressHook();
			hook.memoizedState = hook.baseState = passthrough;
			var queue = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: null,
				lastRenderedState: null
			};
			hook.queue = queue;
			hook = dispatchOptimisticSetState.bind(null, currentlyRenderingFiber, !0, queue);
			queue.dispatch = hook;
			return [passthrough, hook];
		},
		useMemoCache,
		useCacheRefresh: function() {
			return mountWorkInProgressHook().memoizedState = refreshCache.bind(null, currentlyRenderingFiber);
		},
		useEffectEvent: function(callback) {
			var hook = mountWorkInProgressHook(), ref = { impl: callback };
			hook.memoizedState = ref;
			return function() {
				if (0 !== (executionContext & 2)) throw Error(formatProdErrorMessage(440));
				return ref.impl.apply(void 0, arguments);
			};
		}
	}, HooksDispatcherOnUpdate = {
		readContext,
		use,
		useCallback: updateCallback,
		useContext: readContext,
		useEffect: updateEffect,
		useImperativeHandle: updateImperativeHandle,
		useInsertionEffect: updateInsertionEffect,
		useLayoutEffect: updateLayoutEffect,
		useMemo: updateMemo,
		useReducer: updateReducer,
		useRef: updateRef,
		useState: function() {
			return updateReducer(basicStateReducer);
		},
		useDebugValue: mountDebugValue,
		useDeferredValue: function(value, initialValue) {
			return updateDeferredValueImpl(updateWorkInProgressHook(), currentHook.memoizedState, value, initialValue);
		},
		useTransition: function() {
			var booleanOrThenable = updateReducer(basicStateReducer)[0], start = updateWorkInProgressHook().memoizedState;
			return ["boolean" === typeof booleanOrThenable ? booleanOrThenable : useThenable(booleanOrThenable), start];
		},
		useSyncExternalStore: updateSyncExternalStore,
		useId: updateId,
		useHostTransitionStatus,
		useFormState: updateActionState,
		useActionState: updateActionState,
		useOptimistic: function(passthrough, reducer) {
			return updateOptimisticImpl(updateWorkInProgressHook(), currentHook, passthrough, reducer);
		},
		useMemoCache,
		useCacheRefresh: updateRefresh
	};
	HooksDispatcherOnUpdate.useEffectEvent = updateEvent;
	var HooksDispatcherOnRerender = {
		readContext,
		use,
		useCallback: updateCallback,
		useContext: readContext,
		useEffect: updateEffect,
		useImperativeHandle: updateImperativeHandle,
		useInsertionEffect: updateInsertionEffect,
		useLayoutEffect: updateLayoutEffect,
		useMemo: updateMemo,
		useReducer: rerenderReducer,
		useRef: updateRef,
		useState: function() {
			return rerenderReducer(basicStateReducer);
		},
		useDebugValue: mountDebugValue,
		useDeferredValue: function(value, initialValue) {
			var hook = updateWorkInProgressHook();
			return null === currentHook ? mountDeferredValueImpl(hook, value, initialValue) : updateDeferredValueImpl(hook, currentHook.memoizedState, value, initialValue);
		},
		useTransition: function() {
			var booleanOrThenable = rerenderReducer(basicStateReducer)[0], start = updateWorkInProgressHook().memoizedState;
			return ["boolean" === typeof booleanOrThenable ? booleanOrThenable : useThenable(booleanOrThenable), start];
		},
		useSyncExternalStore: updateSyncExternalStore,
		useId: updateId,
		useHostTransitionStatus,
		useFormState: rerenderActionState,
		useActionState: rerenderActionState,
		useOptimistic: function(passthrough, reducer) {
			var hook = updateWorkInProgressHook();
			if (null !== currentHook) return updateOptimisticImpl(hook, currentHook, passthrough, reducer);
			hook.baseState = passthrough;
			return [passthrough, hook.queue.dispatch];
		},
		useMemoCache,
		useCacheRefresh: updateRefresh
	};
	HooksDispatcherOnRerender.useEffectEvent = updateEvent;
	function applyDerivedStateFromProps(workInProgress, ctor, getDerivedStateFromProps, nextProps) {
		ctor = workInProgress.memoizedState;
		getDerivedStateFromProps = getDerivedStateFromProps(nextProps, ctor);
		getDerivedStateFromProps = null === getDerivedStateFromProps || void 0 === getDerivedStateFromProps ? ctor : assign({}, ctor, getDerivedStateFromProps);
		workInProgress.memoizedState = getDerivedStateFromProps;
		0 === workInProgress.lanes && (workInProgress.updateQueue.baseState = getDerivedStateFromProps);
	}
	var classComponentUpdater = {
		enqueueSetState: function(inst, payload, callback) {
			inst = inst._reactInternals;
			var lane = requestUpdateLane(), update = createUpdate(lane);
			update.payload = payload;
			void 0 !== callback && null !== callback && (update.callback = callback);
			payload = enqueueUpdate(inst, update, lane);
			null !== payload && (scheduleUpdateOnFiber(payload, inst, lane), entangleTransitions(payload, inst, lane));
		},
		enqueueReplaceState: function(inst, payload, callback) {
			inst = inst._reactInternals;
			var lane = requestUpdateLane(), update = createUpdate(lane);
			update.tag = 1;
			update.payload = payload;
			void 0 !== callback && null !== callback && (update.callback = callback);
			payload = enqueueUpdate(inst, update, lane);
			null !== payload && (scheduleUpdateOnFiber(payload, inst, lane), entangleTransitions(payload, inst, lane));
		},
		enqueueForceUpdate: function(inst, callback) {
			inst = inst._reactInternals;
			var lane = requestUpdateLane(), update = createUpdate(lane);
			update.tag = 2;
			void 0 !== callback && null !== callback && (update.callback = callback);
			callback = enqueueUpdate(inst, update, lane);
			null !== callback && (scheduleUpdateOnFiber(callback, inst, lane), entangleTransitions(callback, inst, lane));
		}
	};
	function checkShouldComponentUpdate(workInProgress, ctor, oldProps, newProps, oldState, newState, nextContext) {
		workInProgress = workInProgress.stateNode;
		return "function" === typeof workInProgress.shouldComponentUpdate ? workInProgress.shouldComponentUpdate(newProps, newState, nextContext) : ctor.prototype && ctor.prototype.isPureReactComponent ? !shallowEqual(oldProps, newProps) || !shallowEqual(oldState, newState) : !0;
	}
	function callComponentWillReceiveProps(workInProgress, instance, newProps, nextContext) {
		workInProgress = instance.state;
		"function" === typeof instance.componentWillReceiveProps && instance.componentWillReceiveProps(newProps, nextContext);
		"function" === typeof instance.UNSAFE_componentWillReceiveProps && instance.UNSAFE_componentWillReceiveProps(newProps, nextContext);
		instance.state !== workInProgress && classComponentUpdater.enqueueReplaceState(instance, instance.state, null);
	}
	function resolveClassComponentProps(Component, baseProps) {
		var newProps = baseProps;
		if ("ref" in baseProps) {
			newProps = {};
			for (var propName in baseProps) "ref" !== propName && (newProps[propName] = baseProps[propName]);
		}
		if (Component = Component.defaultProps) {
			newProps === baseProps && (newProps = assign({}, newProps));
			for (var propName$73 in Component) void 0 === newProps[propName$73] && (newProps[propName$73] = Component[propName$73]);
		}
		return newProps;
	}
	function defaultOnUncaughtError(error) {
		reportGlobalError(error);
	}
	function defaultOnCaughtError(error) {
		console.error(error);
	}
	function defaultOnRecoverableError(error) {
		reportGlobalError(error);
	}
	function logUncaughtError(root, errorInfo) {
		try {
			var onUncaughtError = root.onUncaughtError;
			onUncaughtError(errorInfo.value, { componentStack: errorInfo.stack });
		} catch (e$74) {
			setTimeout(function() {
				throw e$74;
			});
		}
	}
	function logCaughtError(root, boundary, errorInfo) {
		try {
			var onCaughtError = root.onCaughtError;
			onCaughtError(errorInfo.value, {
				componentStack: errorInfo.stack,
				errorBoundary: 1 === boundary.tag ? boundary.stateNode : null
			});
		} catch (e$75) {
			setTimeout(function() {
				throw e$75;
			});
		}
	}
	function createRootErrorUpdate(root, errorInfo, lane) {
		lane = createUpdate(lane);
		lane.tag = 3;
		lane.payload = { element: null };
		lane.callback = function() {
			logUncaughtError(root, errorInfo);
		};
		return lane;
	}
	function createClassErrorUpdate(lane) {
		lane = createUpdate(lane);
		lane.tag = 3;
		return lane;
	}
	function initializeClassErrorUpdate(update, root, fiber, errorInfo) {
		var getDerivedStateFromError = fiber.type.getDerivedStateFromError;
		if ("function" === typeof getDerivedStateFromError) {
			var error = errorInfo.value;
			update.payload = function() {
				return getDerivedStateFromError(error);
			};
			update.callback = function() {
				logCaughtError(root, fiber, errorInfo);
			};
		}
		var inst = fiber.stateNode;
		null !== inst && "function" === typeof inst.componentDidCatch && (update.callback = function() {
			logCaughtError(root, fiber, errorInfo);
			"function" !== typeof getDerivedStateFromError && (null === legacyErrorBoundariesThatAlreadyFailed ? legacyErrorBoundariesThatAlreadyFailed = new Set([this]) : legacyErrorBoundariesThatAlreadyFailed.add(this));
			var stack = errorInfo.stack;
			this.componentDidCatch(errorInfo.value, { componentStack: null !== stack ? stack : "" });
		});
	}
	function throwException(root, returnFiber, sourceFiber, value, rootRenderLanes) {
		sourceFiber.flags |= 32768;
		if (null !== value && "object" === typeof value && "function" === typeof value.then) {
			returnFiber = sourceFiber.alternate;
			null !== returnFiber && propagateParentContextChanges(returnFiber, sourceFiber, rootRenderLanes, !0);
			sourceFiber = suspenseHandlerStackCursor.current;
			if (null !== sourceFiber) {
				switch (sourceFiber.tag) {
					case 31:
					case 13: return null === shellBoundary ? renderDidSuspendDelayIfPossible() : null === sourceFiber.alternate && 0 === workInProgressRootExitStatus && (workInProgressRootExitStatus = 3), sourceFiber.flags &= -257, sourceFiber.flags |= 65536, sourceFiber.lanes = rootRenderLanes, value === noopSuspenseyCommitThenable ? sourceFiber.flags |= 16384 : (returnFiber = sourceFiber.updateQueue, null === returnFiber ? sourceFiber.updateQueue = new Set([value]) : returnFiber.add(value), attachPingListener(root, value, rootRenderLanes)), !1;
					case 22: return sourceFiber.flags |= 65536, value === noopSuspenseyCommitThenable ? sourceFiber.flags |= 16384 : (returnFiber = sourceFiber.updateQueue, null === returnFiber ? (returnFiber = {
						transitions: null,
						markerInstances: null,
						retryQueue: new Set([value])
					}, sourceFiber.updateQueue = returnFiber) : (sourceFiber = returnFiber.retryQueue, null === sourceFiber ? returnFiber.retryQueue = new Set([value]) : sourceFiber.add(value)), attachPingListener(root, value, rootRenderLanes)), !1;
				}
				throw Error(formatProdErrorMessage(435, sourceFiber.tag));
			}
			attachPingListener(root, value, rootRenderLanes);
			renderDidSuspendDelayIfPossible();
			return !1;
		}
		if (isHydrating) return returnFiber = suspenseHandlerStackCursor.current, null !== returnFiber ? (0 === (returnFiber.flags & 65536) && (returnFiber.flags |= 256), returnFiber.flags |= 65536, returnFiber.lanes = rootRenderLanes, value !== HydrationMismatchException && (root = Error(formatProdErrorMessage(422), { cause: value }), queueHydrationError(createCapturedValueAtFiber(root, sourceFiber)))) : (value !== HydrationMismatchException && (returnFiber = Error(formatProdErrorMessage(423), { cause: value }), queueHydrationError(createCapturedValueAtFiber(returnFiber, sourceFiber))), root = root.current.alternate, root.flags |= 65536, rootRenderLanes &= -rootRenderLanes, root.lanes |= rootRenderLanes, value = createCapturedValueAtFiber(value, sourceFiber), rootRenderLanes = createRootErrorUpdate(root.stateNode, value, rootRenderLanes), enqueueCapturedUpdate(root, rootRenderLanes), 4 !== workInProgressRootExitStatus && (workInProgressRootExitStatus = 2)), !1;
		var wrapperError = Error(formatProdErrorMessage(520), { cause: value });
		wrapperError = createCapturedValueAtFiber(wrapperError, sourceFiber);
		null === workInProgressRootConcurrentErrors ? workInProgressRootConcurrentErrors = [wrapperError] : workInProgressRootConcurrentErrors.push(wrapperError);
		4 !== workInProgressRootExitStatus && (workInProgressRootExitStatus = 2);
		if (null === returnFiber) return !0;
		value = createCapturedValueAtFiber(value, sourceFiber);
		sourceFiber = returnFiber;
		do {
			switch (sourceFiber.tag) {
				case 3: return sourceFiber.flags |= 65536, root = rootRenderLanes & -rootRenderLanes, sourceFiber.lanes |= root, root = createRootErrorUpdate(sourceFiber.stateNode, value, root), enqueueCapturedUpdate(sourceFiber, root), !1;
				case 1: if (returnFiber = sourceFiber.type, wrapperError = sourceFiber.stateNode, 0 === (sourceFiber.flags & 128) && ("function" === typeof returnFiber.getDerivedStateFromError || null !== wrapperError && "function" === typeof wrapperError.componentDidCatch && (null === legacyErrorBoundariesThatAlreadyFailed || !legacyErrorBoundariesThatAlreadyFailed.has(wrapperError)))) return sourceFiber.flags |= 65536, rootRenderLanes &= -rootRenderLanes, sourceFiber.lanes |= rootRenderLanes, rootRenderLanes = createClassErrorUpdate(rootRenderLanes), initializeClassErrorUpdate(rootRenderLanes, root, sourceFiber, value), enqueueCapturedUpdate(sourceFiber, rootRenderLanes), !1;
			}
			sourceFiber = sourceFiber.return;
		} while (null !== sourceFiber);
		return !1;
	}
	var SelectiveHydrationException = Error(formatProdErrorMessage(461)), didReceiveUpdate = !1;
	function reconcileChildren(current, workInProgress, nextChildren, renderLanes) {
		workInProgress.child = null === current ? mountChildFibers(workInProgress, null, nextChildren, renderLanes) : reconcileChildFibers(workInProgress, current.child, nextChildren, renderLanes);
	}
	function updateForwardRef(current, workInProgress, Component, nextProps, renderLanes) {
		Component = Component.render;
		var ref = workInProgress.ref;
		if ("ref" in nextProps) {
			var propsWithoutRef = {};
			for (var key in nextProps) "ref" !== key && (propsWithoutRef[key] = nextProps[key]);
		} else propsWithoutRef = nextProps;
		prepareToReadContext(workInProgress);
		nextProps = renderWithHooks(current, workInProgress, Component, propsWithoutRef, ref, renderLanes);
		key = checkDidRenderIdHook();
		if (null !== current && !didReceiveUpdate) return bailoutHooks(current, workInProgress, renderLanes), bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes);
		isHydrating && key && pushMaterializedTreeId(workInProgress);
		workInProgress.flags |= 1;
		reconcileChildren(current, workInProgress, nextProps, renderLanes);
		return workInProgress.child;
	}
	function updateMemoComponent(current, workInProgress, Component, nextProps, renderLanes) {
		if (null === current) {
			var type = Component.type;
			if ("function" === typeof type && !shouldConstruct(type) && void 0 === type.defaultProps && null === Component.compare) return workInProgress.tag = 15, workInProgress.type = type, updateSimpleMemoComponent(current, workInProgress, type, nextProps, renderLanes);
			current = createFiberFromTypeAndProps(Component.type, null, nextProps, workInProgress, workInProgress.mode, renderLanes);
			current.ref = workInProgress.ref;
			current.return = workInProgress;
			return workInProgress.child = current;
		}
		type = current.child;
		if (!checkScheduledUpdateOrContext(current, renderLanes)) {
			var prevProps = type.memoizedProps;
			Component = Component.compare;
			Component = null !== Component ? Component : shallowEqual;
			if (Component(prevProps, nextProps) && current.ref === workInProgress.ref) return bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes);
		}
		workInProgress.flags |= 1;
		current = createWorkInProgress(type, nextProps);
		current.ref = workInProgress.ref;
		current.return = workInProgress;
		return workInProgress.child = current;
	}
	function updateSimpleMemoComponent(current, workInProgress, Component, nextProps, renderLanes) {
		if (null !== current) {
			var prevProps = current.memoizedProps;
			if (shallowEqual(prevProps, nextProps) && current.ref === workInProgress.ref) if (didReceiveUpdate = !1, workInProgress.pendingProps = nextProps = prevProps, checkScheduledUpdateOrContext(current, renderLanes)) 0 !== (current.flags & 131072) && (didReceiveUpdate = !0);
			else return workInProgress.lanes = current.lanes, bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes);
		}
		return updateFunctionComponent(current, workInProgress, Component, nextProps, renderLanes);
	}
	function updateOffscreenComponent(current, workInProgress, renderLanes, nextProps) {
		var nextChildren = nextProps.children, prevState = null !== current ? current.memoizedState : null;
		null === current && null === workInProgress.stateNode && (workInProgress.stateNode = {
			_visibility: 1,
			_pendingMarkers: null,
			_retryCache: null,
			_transitions: null
		});
		if ("hidden" === nextProps.mode) {
			if (0 !== (workInProgress.flags & 128)) {
				prevState = null !== prevState ? prevState.baseLanes | renderLanes : renderLanes;
				if (null !== current) {
					nextProps = workInProgress.child = current.child;
					for (nextChildren = 0; null !== nextProps;) nextChildren = nextChildren | nextProps.lanes | nextProps.childLanes, nextProps = nextProps.sibling;
					nextProps = nextChildren & ~prevState;
				} else nextProps = 0, workInProgress.child = null;
				return deferHiddenOffscreenComponent(current, workInProgress, prevState, renderLanes, nextProps);
			}
			if (0 !== (renderLanes & 536870912)) workInProgress.memoizedState = {
				baseLanes: 0,
				cachePool: null
			}, null !== current && pushTransition(workInProgress, null !== prevState ? prevState.cachePool : null), null !== prevState ? pushHiddenContext(workInProgress, prevState) : reuseHiddenContextOnStack(), pushOffscreenSuspenseHandler(workInProgress);
			else return nextProps = workInProgress.lanes = 536870912, deferHiddenOffscreenComponent(current, workInProgress, null !== prevState ? prevState.baseLanes | renderLanes : renderLanes, renderLanes, nextProps);
		} else null !== prevState ? (pushTransition(workInProgress, prevState.cachePool), pushHiddenContext(workInProgress, prevState), reuseSuspenseHandlerOnStack(workInProgress), workInProgress.memoizedState = null) : (null !== current && pushTransition(workInProgress, null), reuseHiddenContextOnStack(), reuseSuspenseHandlerOnStack(workInProgress));
		reconcileChildren(current, workInProgress, nextChildren, renderLanes);
		return workInProgress.child;
	}
	function bailoutOffscreenComponent(current, workInProgress) {
		null !== current && 22 === current.tag || null !== workInProgress.stateNode || (workInProgress.stateNode = {
			_visibility: 1,
			_pendingMarkers: null,
			_retryCache: null,
			_transitions: null
		});
		return workInProgress.sibling;
	}
	function deferHiddenOffscreenComponent(current, workInProgress, nextBaseLanes, renderLanes, remainingChildLanes) {
		var JSCompiler_inline_result = peekCacheFromPool();
		JSCompiler_inline_result = null === JSCompiler_inline_result ? null : {
			parent: CacheContext._currentValue,
			pool: JSCompiler_inline_result
		};
		workInProgress.memoizedState = {
			baseLanes: nextBaseLanes,
			cachePool: JSCompiler_inline_result
		};
		null !== current && pushTransition(workInProgress, null);
		reuseHiddenContextOnStack();
		pushOffscreenSuspenseHandler(workInProgress);
		null !== current && propagateParentContextChanges(current, workInProgress, renderLanes, !0);
		workInProgress.childLanes = remainingChildLanes;
		return null;
	}
	function mountActivityChildren(workInProgress, nextProps) {
		nextProps = mountWorkInProgressOffscreenFiber({
			mode: nextProps.mode,
			children: nextProps.children
		}, workInProgress.mode);
		nextProps.ref = workInProgress.ref;
		workInProgress.child = nextProps;
		nextProps.return = workInProgress;
		return nextProps;
	}
	function retryActivityComponentWithoutHydrating(current, workInProgress, renderLanes) {
		reconcileChildFibers(workInProgress, current.child, null, renderLanes);
		current = mountActivityChildren(workInProgress, workInProgress.pendingProps);
		current.flags |= 2;
		popSuspenseHandler(workInProgress);
		workInProgress.memoizedState = null;
		return current;
	}
	function updateActivityComponent(current, workInProgress, renderLanes) {
		var nextProps = workInProgress.pendingProps, didSuspend = 0 !== (workInProgress.flags & 128);
		workInProgress.flags &= -129;
		if (null === current) {
			if (isHydrating) {
				if ("hidden" === nextProps.mode) return current = mountActivityChildren(workInProgress, nextProps), workInProgress.lanes = 536870912, bailoutOffscreenComponent(null, current);
				pushDehydratedActivitySuspenseHandler(workInProgress);
				(current = nextHydratableInstance) ? (current = canHydrateHydrationBoundary(current, rootOrSingletonContext), current = null !== current && "&" === current.data ? current : null, null !== current && (workInProgress.memoizedState = {
					dehydrated: current,
					treeContext: null !== treeContextProvider ? {
						id: treeContextId,
						overflow: treeContextOverflow
					} : null,
					retryLane: 536870912,
					hydrationErrors: null
				}, renderLanes = createFiberFromDehydratedFragment(current), renderLanes.return = workInProgress, workInProgress.child = renderLanes, hydrationParentFiber = workInProgress, nextHydratableInstance = null)) : current = null;
				if (null === current) throw throwOnHydrationMismatch(workInProgress);
				workInProgress.lanes = 536870912;
				return null;
			}
			return mountActivityChildren(workInProgress, nextProps);
		}
		var prevState = current.memoizedState;
		if (null !== prevState) {
			var dehydrated = prevState.dehydrated;
			pushDehydratedActivitySuspenseHandler(workInProgress);
			if (didSuspend) if (workInProgress.flags & 256) workInProgress.flags &= -257, workInProgress = retryActivityComponentWithoutHydrating(current, workInProgress, renderLanes);
			else if (null !== workInProgress.memoizedState) workInProgress.child = current.child, workInProgress.flags |= 128, workInProgress = null;
			else throw Error(formatProdErrorMessage(558));
			else if (didReceiveUpdate || propagateParentContextChanges(current, workInProgress, renderLanes, !1), didSuspend = 0 !== (renderLanes & current.childLanes), didReceiveUpdate || didSuspend) {
				nextProps = workInProgressRoot;
				if (null !== nextProps && (dehydrated = getBumpedLaneForHydration(nextProps, renderLanes), 0 !== dehydrated && dehydrated !== prevState.retryLane)) throw prevState.retryLane = dehydrated, enqueueConcurrentRenderForLane(current, dehydrated), scheduleUpdateOnFiber(nextProps, current, dehydrated), SelectiveHydrationException;
				renderDidSuspendDelayIfPossible();
				workInProgress = retryActivityComponentWithoutHydrating(current, workInProgress, renderLanes);
			} else current = prevState.treeContext, nextHydratableInstance = getNextHydratable(dehydrated.nextSibling), hydrationParentFiber = workInProgress, isHydrating = !0, hydrationErrors = null, rootOrSingletonContext = !1, null !== current && restoreSuspendedTreeContext(workInProgress, current), workInProgress = mountActivityChildren(workInProgress, nextProps), workInProgress.flags |= 4096;
			return workInProgress;
		}
		current = createWorkInProgress(current.child, {
			mode: nextProps.mode,
			children: nextProps.children
		});
		current.ref = workInProgress.ref;
		workInProgress.child = current;
		current.return = workInProgress;
		return current;
	}
	function markRef(current, workInProgress) {
		var ref = workInProgress.ref;
		if (null === ref) null !== current && null !== current.ref && (workInProgress.flags |= 4194816);
		else {
			if ("function" !== typeof ref && "object" !== typeof ref) throw Error(formatProdErrorMessage(284));
			if (null === current || current.ref !== ref) workInProgress.flags |= 4194816;
		}
	}
	function updateFunctionComponent(current, workInProgress, Component, nextProps, renderLanes) {
		prepareToReadContext(workInProgress);
		Component = renderWithHooks(current, workInProgress, Component, nextProps, void 0, renderLanes);
		nextProps = checkDidRenderIdHook();
		if (null !== current && !didReceiveUpdate) return bailoutHooks(current, workInProgress, renderLanes), bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes);
		isHydrating && nextProps && pushMaterializedTreeId(workInProgress);
		workInProgress.flags |= 1;
		reconcileChildren(current, workInProgress, Component, renderLanes);
		return workInProgress.child;
	}
	function replayFunctionComponent(current, workInProgress, nextProps, Component, secondArg, renderLanes) {
		prepareToReadContext(workInProgress);
		workInProgress.updateQueue = null;
		nextProps = renderWithHooksAgain(workInProgress, Component, nextProps, secondArg);
		finishRenderingHooks(current);
		Component = checkDidRenderIdHook();
		if (null !== current && !didReceiveUpdate) return bailoutHooks(current, workInProgress, renderLanes), bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes);
		isHydrating && Component && pushMaterializedTreeId(workInProgress);
		workInProgress.flags |= 1;
		reconcileChildren(current, workInProgress, nextProps, renderLanes);
		return workInProgress.child;
	}
	function updateClassComponent(current, workInProgress, Component, nextProps, renderLanes) {
		prepareToReadContext(workInProgress);
		if (null === workInProgress.stateNode) {
			var context = emptyContextObject, contextType = Component.contextType;
			"object" === typeof contextType && null !== contextType && (context = readContext(contextType));
			context = new Component(nextProps, context);
			workInProgress.memoizedState = null !== context.state && void 0 !== context.state ? context.state : null;
			context.updater = classComponentUpdater;
			workInProgress.stateNode = context;
			context._reactInternals = workInProgress;
			context = workInProgress.stateNode;
			context.props = nextProps;
			context.state = workInProgress.memoizedState;
			context.refs = {};
			initializeUpdateQueue(workInProgress);
			contextType = Component.contextType;
			context.context = "object" === typeof contextType && null !== contextType ? readContext(contextType) : emptyContextObject;
			context.state = workInProgress.memoizedState;
			contextType = Component.getDerivedStateFromProps;
			"function" === typeof contextType && (applyDerivedStateFromProps(workInProgress, Component, contextType, nextProps), context.state = workInProgress.memoizedState);
			"function" === typeof Component.getDerivedStateFromProps || "function" === typeof context.getSnapshotBeforeUpdate || "function" !== typeof context.UNSAFE_componentWillMount && "function" !== typeof context.componentWillMount || (contextType = context.state, "function" === typeof context.componentWillMount && context.componentWillMount(), "function" === typeof context.UNSAFE_componentWillMount && context.UNSAFE_componentWillMount(), contextType !== context.state && classComponentUpdater.enqueueReplaceState(context, context.state, null), processUpdateQueue(workInProgress, nextProps, context, renderLanes), suspendIfUpdateReadFromEntangledAsyncAction(), context.state = workInProgress.memoizedState);
			"function" === typeof context.componentDidMount && (workInProgress.flags |= 4194308);
			nextProps = !0;
		} else if (null === current) {
			context = workInProgress.stateNode;
			var unresolvedOldProps = workInProgress.memoizedProps, oldProps = resolveClassComponentProps(Component, unresolvedOldProps);
			context.props = oldProps;
			var oldContext = context.context, contextType$jscomp$0 = Component.contextType;
			contextType = emptyContextObject;
			"object" === typeof contextType$jscomp$0 && null !== contextType$jscomp$0 && (contextType = readContext(contextType$jscomp$0));
			var getDerivedStateFromProps = Component.getDerivedStateFromProps;
			contextType$jscomp$0 = "function" === typeof getDerivedStateFromProps || "function" === typeof context.getSnapshotBeforeUpdate;
			unresolvedOldProps = workInProgress.pendingProps !== unresolvedOldProps;
			contextType$jscomp$0 || "function" !== typeof context.UNSAFE_componentWillReceiveProps && "function" !== typeof context.componentWillReceiveProps || (unresolvedOldProps || oldContext !== contextType) && callComponentWillReceiveProps(workInProgress, context, nextProps, contextType);
			hasForceUpdate = !1;
			var oldState = workInProgress.memoizedState;
			context.state = oldState;
			processUpdateQueue(workInProgress, nextProps, context, renderLanes);
			suspendIfUpdateReadFromEntangledAsyncAction();
			oldContext = workInProgress.memoizedState;
			unresolvedOldProps || oldState !== oldContext || hasForceUpdate ? ("function" === typeof getDerivedStateFromProps && (applyDerivedStateFromProps(workInProgress, Component, getDerivedStateFromProps, nextProps), oldContext = workInProgress.memoizedState), (oldProps = hasForceUpdate || checkShouldComponentUpdate(workInProgress, Component, oldProps, nextProps, oldState, oldContext, contextType)) ? (contextType$jscomp$0 || "function" !== typeof context.UNSAFE_componentWillMount && "function" !== typeof context.componentWillMount || ("function" === typeof context.componentWillMount && context.componentWillMount(), "function" === typeof context.UNSAFE_componentWillMount && context.UNSAFE_componentWillMount()), "function" === typeof context.componentDidMount && (workInProgress.flags |= 4194308)) : ("function" === typeof context.componentDidMount && (workInProgress.flags |= 4194308), workInProgress.memoizedProps = nextProps, workInProgress.memoizedState = oldContext), context.props = nextProps, context.state = oldContext, context.context = contextType, nextProps = oldProps) : ("function" === typeof context.componentDidMount && (workInProgress.flags |= 4194308), nextProps = !1);
		} else {
			context = workInProgress.stateNode;
			cloneUpdateQueue(current, workInProgress);
			contextType = workInProgress.memoizedProps;
			contextType$jscomp$0 = resolveClassComponentProps(Component, contextType);
			context.props = contextType$jscomp$0;
			getDerivedStateFromProps = workInProgress.pendingProps;
			oldState = context.context;
			oldContext = Component.contextType;
			oldProps = emptyContextObject;
			"object" === typeof oldContext && null !== oldContext && (oldProps = readContext(oldContext));
			unresolvedOldProps = Component.getDerivedStateFromProps;
			(oldContext = "function" === typeof unresolvedOldProps || "function" === typeof context.getSnapshotBeforeUpdate) || "function" !== typeof context.UNSAFE_componentWillReceiveProps && "function" !== typeof context.componentWillReceiveProps || (contextType !== getDerivedStateFromProps || oldState !== oldProps) && callComponentWillReceiveProps(workInProgress, context, nextProps, oldProps);
			hasForceUpdate = !1;
			oldState = workInProgress.memoizedState;
			context.state = oldState;
			processUpdateQueue(workInProgress, nextProps, context, renderLanes);
			suspendIfUpdateReadFromEntangledAsyncAction();
			var newState = workInProgress.memoizedState;
			contextType !== getDerivedStateFromProps || oldState !== newState || hasForceUpdate || null !== current && null !== current.dependencies && checkIfContextChanged(current.dependencies) ? ("function" === typeof unresolvedOldProps && (applyDerivedStateFromProps(workInProgress, Component, unresolvedOldProps, nextProps), newState = workInProgress.memoizedState), (contextType$jscomp$0 = hasForceUpdate || checkShouldComponentUpdate(workInProgress, Component, contextType$jscomp$0, nextProps, oldState, newState, oldProps) || null !== current && null !== current.dependencies && checkIfContextChanged(current.dependencies)) ? (oldContext || "function" !== typeof context.UNSAFE_componentWillUpdate && "function" !== typeof context.componentWillUpdate || ("function" === typeof context.componentWillUpdate && context.componentWillUpdate(nextProps, newState, oldProps), "function" === typeof context.UNSAFE_componentWillUpdate && context.UNSAFE_componentWillUpdate(nextProps, newState, oldProps)), "function" === typeof context.componentDidUpdate && (workInProgress.flags |= 4), "function" === typeof context.getSnapshotBeforeUpdate && (workInProgress.flags |= 1024)) : ("function" !== typeof context.componentDidUpdate || contextType === current.memoizedProps && oldState === current.memoizedState || (workInProgress.flags |= 4), "function" !== typeof context.getSnapshotBeforeUpdate || contextType === current.memoizedProps && oldState === current.memoizedState || (workInProgress.flags |= 1024), workInProgress.memoizedProps = nextProps, workInProgress.memoizedState = newState), context.props = nextProps, context.state = newState, context.context = oldProps, nextProps = contextType$jscomp$0) : ("function" !== typeof context.componentDidUpdate || contextType === current.memoizedProps && oldState === current.memoizedState || (workInProgress.flags |= 4), "function" !== typeof context.getSnapshotBeforeUpdate || contextType === current.memoizedProps && oldState === current.memoizedState || (workInProgress.flags |= 1024), nextProps = !1);
		}
		context = nextProps;
		markRef(current, workInProgress);
		nextProps = 0 !== (workInProgress.flags & 128);
		context || nextProps ? (context = workInProgress.stateNode, Component = nextProps && "function" !== typeof Component.getDerivedStateFromError ? null : context.render(), workInProgress.flags |= 1, null !== current && nextProps ? (workInProgress.child = reconcileChildFibers(workInProgress, current.child, null, renderLanes), workInProgress.child = reconcileChildFibers(workInProgress, null, Component, renderLanes)) : reconcileChildren(current, workInProgress, Component, renderLanes), workInProgress.memoizedState = context.state, current = workInProgress.child) : current = bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes);
		return current;
	}
	function mountHostRootWithoutHydrating(current, workInProgress, nextChildren, renderLanes) {
		resetHydrationState();
		workInProgress.flags |= 256;
		reconcileChildren(current, workInProgress, nextChildren, renderLanes);
		return workInProgress.child;
	}
	var SUSPENDED_MARKER = {
		dehydrated: null,
		treeContext: null,
		retryLane: 0,
		hydrationErrors: null
	};
	function mountSuspenseOffscreenState(renderLanes) {
		return {
			baseLanes: renderLanes,
			cachePool: getSuspendedCache()
		};
	}
	function getRemainingWorkInPrimaryTree(current, primaryTreeDidDefer, renderLanes) {
		current = null !== current ? current.childLanes & ~renderLanes : 0;
		primaryTreeDidDefer && (current |= workInProgressDeferredLane);
		return current;
	}
	function updateSuspenseComponent(current, workInProgress, renderLanes) {
		var nextProps = workInProgress.pendingProps, showFallback = !1, didSuspend = 0 !== (workInProgress.flags & 128), JSCompiler_temp;
		(JSCompiler_temp = didSuspend) || (JSCompiler_temp = null !== current && null === current.memoizedState ? !1 : 0 !== (suspenseStackCursor.current & 2));
		JSCompiler_temp && (showFallback = !0, workInProgress.flags &= -129);
		JSCompiler_temp = 0 !== (workInProgress.flags & 32);
		workInProgress.flags &= -33;
		if (null === current) {
			if (isHydrating) {
				showFallback ? pushPrimaryTreeSuspenseHandler(workInProgress) : reuseSuspenseHandlerOnStack(workInProgress);
				(current = nextHydratableInstance) ? (current = canHydrateHydrationBoundary(current, rootOrSingletonContext), current = null !== current && "&" !== current.data ? current : null, null !== current && (workInProgress.memoizedState = {
					dehydrated: current,
					treeContext: null !== treeContextProvider ? {
						id: treeContextId,
						overflow: treeContextOverflow
					} : null,
					retryLane: 536870912,
					hydrationErrors: null
				}, renderLanes = createFiberFromDehydratedFragment(current), renderLanes.return = workInProgress, workInProgress.child = renderLanes, hydrationParentFiber = workInProgress, nextHydratableInstance = null)) : current = null;
				if (null === current) throw throwOnHydrationMismatch(workInProgress);
				isSuspenseInstanceFallback(current) ? workInProgress.lanes = 32 : workInProgress.lanes = 536870912;
				return null;
			}
			var nextPrimaryChildren = nextProps.children;
			nextProps = nextProps.fallback;
			if (showFallback) return reuseSuspenseHandlerOnStack(workInProgress), showFallback = workInProgress.mode, nextPrimaryChildren = mountWorkInProgressOffscreenFiber({
				mode: "hidden",
				children: nextPrimaryChildren
			}, showFallback), nextProps = createFiberFromFragment(nextProps, showFallback, renderLanes, null), nextPrimaryChildren.return = workInProgress, nextProps.return = workInProgress, nextPrimaryChildren.sibling = nextProps, workInProgress.child = nextPrimaryChildren, nextProps = workInProgress.child, nextProps.memoizedState = mountSuspenseOffscreenState(renderLanes), nextProps.childLanes = getRemainingWorkInPrimaryTree(current, JSCompiler_temp, renderLanes), workInProgress.memoizedState = SUSPENDED_MARKER, bailoutOffscreenComponent(null, nextProps);
			pushPrimaryTreeSuspenseHandler(workInProgress);
			return mountSuspensePrimaryChildren(workInProgress, nextPrimaryChildren);
		}
		var prevState = current.memoizedState;
		if (null !== prevState && (nextPrimaryChildren = prevState.dehydrated, null !== nextPrimaryChildren)) {
			if (didSuspend) workInProgress.flags & 256 ? (pushPrimaryTreeSuspenseHandler(workInProgress), workInProgress.flags &= -257, workInProgress = retrySuspenseComponentWithoutHydrating(current, workInProgress, renderLanes)) : null !== workInProgress.memoizedState ? (reuseSuspenseHandlerOnStack(workInProgress), workInProgress.child = current.child, workInProgress.flags |= 128, workInProgress = null) : (reuseSuspenseHandlerOnStack(workInProgress), nextPrimaryChildren = nextProps.fallback, showFallback = workInProgress.mode, nextProps = mountWorkInProgressOffscreenFiber({
				mode: "visible",
				children: nextProps.children
			}, showFallback), nextPrimaryChildren = createFiberFromFragment(nextPrimaryChildren, showFallback, renderLanes, null), nextPrimaryChildren.flags |= 2, nextProps.return = workInProgress, nextPrimaryChildren.return = workInProgress, nextProps.sibling = nextPrimaryChildren, workInProgress.child = nextProps, reconcileChildFibers(workInProgress, current.child, null, renderLanes), nextProps = workInProgress.child, nextProps.memoizedState = mountSuspenseOffscreenState(renderLanes), nextProps.childLanes = getRemainingWorkInPrimaryTree(current, JSCompiler_temp, renderLanes), workInProgress.memoizedState = SUSPENDED_MARKER, workInProgress = bailoutOffscreenComponent(null, nextProps));
			else if (pushPrimaryTreeSuspenseHandler(workInProgress), isSuspenseInstanceFallback(nextPrimaryChildren)) {
				JSCompiler_temp = nextPrimaryChildren.nextSibling && nextPrimaryChildren.nextSibling.dataset;
				if (JSCompiler_temp) var digest = JSCompiler_temp.dgst;
				JSCompiler_temp = digest;
				nextProps = Error(formatProdErrorMessage(419));
				nextProps.stack = "";
				nextProps.digest = JSCompiler_temp;
				queueHydrationError({
					value: nextProps,
					source: null,
					stack: null
				});
				workInProgress = retrySuspenseComponentWithoutHydrating(current, workInProgress, renderLanes);
			} else if (didReceiveUpdate || propagateParentContextChanges(current, workInProgress, renderLanes, !1), JSCompiler_temp = 0 !== (renderLanes & current.childLanes), didReceiveUpdate || JSCompiler_temp) {
				JSCompiler_temp = workInProgressRoot;
				if (null !== JSCompiler_temp && (nextProps = getBumpedLaneForHydration(JSCompiler_temp, renderLanes), 0 !== nextProps && nextProps !== prevState.retryLane)) throw prevState.retryLane = nextProps, enqueueConcurrentRenderForLane(current, nextProps), scheduleUpdateOnFiber(JSCompiler_temp, current, nextProps), SelectiveHydrationException;
				isSuspenseInstancePending(nextPrimaryChildren) || renderDidSuspendDelayIfPossible();
				workInProgress = retrySuspenseComponentWithoutHydrating(current, workInProgress, renderLanes);
			} else isSuspenseInstancePending(nextPrimaryChildren) ? (workInProgress.flags |= 192, workInProgress.child = current.child, workInProgress = null) : (current = prevState.treeContext, nextHydratableInstance = getNextHydratable(nextPrimaryChildren.nextSibling), hydrationParentFiber = workInProgress, isHydrating = !0, hydrationErrors = null, rootOrSingletonContext = !1, null !== current && restoreSuspendedTreeContext(workInProgress, current), workInProgress = mountSuspensePrimaryChildren(workInProgress, nextProps.children), workInProgress.flags |= 4096);
			return workInProgress;
		}
		if (showFallback) return reuseSuspenseHandlerOnStack(workInProgress), nextPrimaryChildren = nextProps.fallback, showFallback = workInProgress.mode, prevState = current.child, digest = prevState.sibling, nextProps = createWorkInProgress(prevState, {
			mode: "hidden",
			children: nextProps.children
		}), nextProps.subtreeFlags = prevState.subtreeFlags & 65011712, null !== digest ? nextPrimaryChildren = createWorkInProgress(digest, nextPrimaryChildren) : (nextPrimaryChildren = createFiberFromFragment(nextPrimaryChildren, showFallback, renderLanes, null), nextPrimaryChildren.flags |= 2), nextPrimaryChildren.return = workInProgress, nextProps.return = workInProgress, nextProps.sibling = nextPrimaryChildren, workInProgress.child = nextProps, bailoutOffscreenComponent(null, nextProps), nextProps = workInProgress.child, nextPrimaryChildren = current.child.memoizedState, null === nextPrimaryChildren ? nextPrimaryChildren = mountSuspenseOffscreenState(renderLanes) : (showFallback = nextPrimaryChildren.cachePool, null !== showFallback ? (prevState = CacheContext._currentValue, showFallback = showFallback.parent !== prevState ? {
			parent: prevState,
			pool: prevState
		} : showFallback) : showFallback = getSuspendedCache(), nextPrimaryChildren = {
			baseLanes: nextPrimaryChildren.baseLanes | renderLanes,
			cachePool: showFallback
		}), nextProps.memoizedState = nextPrimaryChildren, nextProps.childLanes = getRemainingWorkInPrimaryTree(current, JSCompiler_temp, renderLanes), workInProgress.memoizedState = SUSPENDED_MARKER, bailoutOffscreenComponent(current.child, nextProps);
		pushPrimaryTreeSuspenseHandler(workInProgress);
		renderLanes = current.child;
		current = renderLanes.sibling;
		renderLanes = createWorkInProgress(renderLanes, {
			mode: "visible",
			children: nextProps.children
		});
		renderLanes.return = workInProgress;
		renderLanes.sibling = null;
		null !== current && (JSCompiler_temp = workInProgress.deletions, null === JSCompiler_temp ? (workInProgress.deletions = [current], workInProgress.flags |= 16) : JSCompiler_temp.push(current));
		workInProgress.child = renderLanes;
		workInProgress.memoizedState = null;
		return renderLanes;
	}
	function mountSuspensePrimaryChildren(workInProgress, primaryChildren) {
		primaryChildren = mountWorkInProgressOffscreenFiber({
			mode: "visible",
			children: primaryChildren
		}, workInProgress.mode);
		primaryChildren.return = workInProgress;
		return workInProgress.child = primaryChildren;
	}
	function mountWorkInProgressOffscreenFiber(offscreenProps, mode) {
		offscreenProps = createFiberImplClass(22, offscreenProps, null, mode);
		offscreenProps.lanes = 0;
		return offscreenProps;
	}
	function retrySuspenseComponentWithoutHydrating(current, workInProgress, renderLanes) {
		reconcileChildFibers(workInProgress, current.child, null, renderLanes);
		current = mountSuspensePrimaryChildren(workInProgress, workInProgress.pendingProps.children);
		current.flags |= 2;
		workInProgress.memoizedState = null;
		return current;
	}
	function scheduleSuspenseWorkOnFiber(fiber, renderLanes, propagationRoot) {
		fiber.lanes |= renderLanes;
		var alternate = fiber.alternate;
		null !== alternate && (alternate.lanes |= renderLanes);
		scheduleContextWorkOnParentPath(fiber.return, renderLanes, propagationRoot);
	}
	function initSuspenseListRenderState(workInProgress, isBackwards, tail, lastContentRow, tailMode, treeForkCount) {
		var renderState = workInProgress.memoizedState;
		null === renderState ? workInProgress.memoizedState = {
			isBackwards,
			rendering: null,
			renderingStartTime: 0,
			last: lastContentRow,
			tail,
			tailMode,
			treeForkCount
		} : (renderState.isBackwards = isBackwards, renderState.rendering = null, renderState.renderingStartTime = 0, renderState.last = lastContentRow, renderState.tail = tail, renderState.tailMode = tailMode, renderState.treeForkCount = treeForkCount);
	}
	function updateSuspenseListComponent(current, workInProgress, renderLanes) {
		var nextProps = workInProgress.pendingProps, revealOrder = nextProps.revealOrder, tailMode = nextProps.tail;
		nextProps = nextProps.children;
		var suspenseContext = suspenseStackCursor.current, shouldForceFallback = 0 !== (suspenseContext & 2);
		shouldForceFallback ? (suspenseContext = suspenseContext & 1 | 2, workInProgress.flags |= 128) : suspenseContext &= 1;
		push(suspenseStackCursor, suspenseContext);
		reconcileChildren(current, workInProgress, nextProps, renderLanes);
		nextProps = isHydrating ? treeForkCount : 0;
		if (!shouldForceFallback && null !== current && 0 !== (current.flags & 128)) a: for (current = workInProgress.child; null !== current;) {
			if (13 === current.tag) null !== current.memoizedState && scheduleSuspenseWorkOnFiber(current, renderLanes, workInProgress);
			else if (19 === current.tag) scheduleSuspenseWorkOnFiber(current, renderLanes, workInProgress);
			else if (null !== current.child) {
				current.child.return = current;
				current = current.child;
				continue;
			}
			if (current === workInProgress) break a;
			for (; null === current.sibling;) {
				if (null === current.return || current.return === workInProgress) break a;
				current = current.return;
			}
			current.sibling.return = current.return;
			current = current.sibling;
		}
		switch (revealOrder) {
			case "forwards":
				renderLanes = workInProgress.child;
				for (revealOrder = null; null !== renderLanes;) current = renderLanes.alternate, null !== current && null === findFirstSuspended(current) && (revealOrder = renderLanes), renderLanes = renderLanes.sibling;
				renderLanes = revealOrder;
				null === renderLanes ? (revealOrder = workInProgress.child, workInProgress.child = null) : (revealOrder = renderLanes.sibling, renderLanes.sibling = null);
				initSuspenseListRenderState(workInProgress, !1, revealOrder, renderLanes, tailMode, nextProps);
				break;
			case "backwards":
			case "unstable_legacy-backwards":
				renderLanes = null;
				revealOrder = workInProgress.child;
				for (workInProgress.child = null; null !== revealOrder;) {
					current = revealOrder.alternate;
					if (null !== current && null === findFirstSuspended(current)) {
						workInProgress.child = revealOrder;
						break;
					}
					current = revealOrder.sibling;
					revealOrder.sibling = renderLanes;
					renderLanes = revealOrder;
					revealOrder = current;
				}
				initSuspenseListRenderState(workInProgress, !0, renderLanes, null, tailMode, nextProps);
				break;
			case "together":
				initSuspenseListRenderState(workInProgress, !1, null, null, void 0, nextProps);
				break;
			default: workInProgress.memoizedState = null;
		}
		return workInProgress.child;
	}
	function bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes) {
		null !== current && (workInProgress.dependencies = current.dependencies);
		workInProgressRootSkippedLanes |= workInProgress.lanes;
		if (0 === (renderLanes & workInProgress.childLanes)) if (null !== current) {
			if (propagateParentContextChanges(current, workInProgress, renderLanes, !1), 0 === (renderLanes & workInProgress.childLanes)) return null;
		} else return null;
		if (null !== current && workInProgress.child !== current.child) throw Error(formatProdErrorMessage(153));
		if (null !== workInProgress.child) {
			current = workInProgress.child;
			renderLanes = createWorkInProgress(current, current.pendingProps);
			workInProgress.child = renderLanes;
			for (renderLanes.return = workInProgress; null !== current.sibling;) current = current.sibling, renderLanes = renderLanes.sibling = createWorkInProgress(current, current.pendingProps), renderLanes.return = workInProgress;
			renderLanes.sibling = null;
		}
		return workInProgress.child;
	}
	function checkScheduledUpdateOrContext(current, renderLanes) {
		if (0 !== (current.lanes & renderLanes)) return !0;
		current = current.dependencies;
		return null !== current && checkIfContextChanged(current) ? !0 : !1;
	}
	function attemptEarlyBailoutIfNoScheduledUpdate(current, workInProgress, renderLanes) {
		switch (workInProgress.tag) {
			case 3:
				pushHostContainer(workInProgress, workInProgress.stateNode.containerInfo);
				pushProvider(workInProgress, CacheContext, current.memoizedState.cache);
				resetHydrationState();
				break;
			case 27:
			case 5:
				pushHostContext(workInProgress);
				break;
			case 4:
				pushHostContainer(workInProgress, workInProgress.stateNode.containerInfo);
				break;
			case 10:
				pushProvider(workInProgress, workInProgress.type, workInProgress.memoizedProps.value);
				break;
			case 31:
				if (null !== workInProgress.memoizedState) return workInProgress.flags |= 128, pushDehydratedActivitySuspenseHandler(workInProgress), null;
				break;
			case 13:
				var state$102 = workInProgress.memoizedState;
				if (null !== state$102) {
					if (null !== state$102.dehydrated) return pushPrimaryTreeSuspenseHandler(workInProgress), workInProgress.flags |= 128, null;
					if (0 !== (renderLanes & workInProgress.child.childLanes)) return updateSuspenseComponent(current, workInProgress, renderLanes);
					pushPrimaryTreeSuspenseHandler(workInProgress);
					current = bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes);
					return null !== current ? current.sibling : null;
				}
				pushPrimaryTreeSuspenseHandler(workInProgress);
				break;
			case 19:
				var didSuspendBefore = 0 !== (current.flags & 128);
				state$102 = 0 !== (renderLanes & workInProgress.childLanes);
				state$102 || (propagateParentContextChanges(current, workInProgress, renderLanes, !1), state$102 = 0 !== (renderLanes & workInProgress.childLanes));
				if (didSuspendBefore) {
					if (state$102) return updateSuspenseListComponent(current, workInProgress, renderLanes);
					workInProgress.flags |= 128;
				}
				didSuspendBefore = workInProgress.memoizedState;
				null !== didSuspendBefore && (didSuspendBefore.rendering = null, didSuspendBefore.tail = null, didSuspendBefore.lastEffect = null);
				push(suspenseStackCursor, suspenseStackCursor.current);
				if (state$102) break;
				else return null;
			case 22: return workInProgress.lanes = 0, updateOffscreenComponent(current, workInProgress, renderLanes, workInProgress.pendingProps);
			case 24: pushProvider(workInProgress, CacheContext, current.memoizedState.cache);
		}
		return bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes);
	}
	function beginWork(current, workInProgress, renderLanes) {
		if (null !== current) if (current.memoizedProps !== workInProgress.pendingProps) didReceiveUpdate = !0;
		else {
			if (!checkScheduledUpdateOrContext(current, renderLanes) && 0 === (workInProgress.flags & 128)) return didReceiveUpdate = !1, attemptEarlyBailoutIfNoScheduledUpdate(current, workInProgress, renderLanes);
			didReceiveUpdate = 0 !== (current.flags & 131072) ? !0 : !1;
		}
		else didReceiveUpdate = !1, isHydrating && 0 !== (workInProgress.flags & 1048576) && pushTreeId(workInProgress, treeForkCount, workInProgress.index);
		workInProgress.lanes = 0;
		switch (workInProgress.tag) {
			case 16:
				a: {
					var props = workInProgress.pendingProps;
					current = resolveLazy(workInProgress.elementType);
					workInProgress.type = current;
					if ("function" === typeof current) shouldConstruct(current) ? (props = resolveClassComponentProps(current, props), workInProgress.tag = 1, workInProgress = updateClassComponent(null, workInProgress, current, props, renderLanes)) : (workInProgress.tag = 0, workInProgress = updateFunctionComponent(null, workInProgress, current, props, renderLanes));
					else {
						if (void 0 !== current && null !== current) {
							var $$typeof = current.$$typeof;
							if ($$typeof === REACT_FORWARD_REF_TYPE) {
								workInProgress.tag = 11;
								workInProgress = updateForwardRef(null, workInProgress, current, props, renderLanes);
								break a;
							} else if ($$typeof === REACT_MEMO_TYPE) {
								workInProgress.tag = 14;
								workInProgress = updateMemoComponent(null, workInProgress, current, props, renderLanes);
								break a;
							}
						}
						workInProgress = getComponentNameFromType(current) || current;
						throw Error(formatProdErrorMessage(306, workInProgress, ""));
					}
				}
				return workInProgress;
			case 0: return updateFunctionComponent(current, workInProgress, workInProgress.type, workInProgress.pendingProps, renderLanes);
			case 1: return props = workInProgress.type, $$typeof = resolveClassComponentProps(props, workInProgress.pendingProps), updateClassComponent(current, workInProgress, props, $$typeof, renderLanes);
			case 3:
				a: {
					pushHostContainer(workInProgress, workInProgress.stateNode.containerInfo);
					if (null === current) throw Error(formatProdErrorMessage(387));
					props = workInProgress.pendingProps;
					var prevState = workInProgress.memoizedState;
					$$typeof = prevState.element;
					cloneUpdateQueue(current, workInProgress);
					processUpdateQueue(workInProgress, props, null, renderLanes);
					var nextState = workInProgress.memoizedState;
					props = nextState.cache;
					pushProvider(workInProgress, CacheContext, props);
					props !== prevState.cache && propagateContextChanges(workInProgress, [CacheContext], renderLanes, !0);
					suspendIfUpdateReadFromEntangledAsyncAction();
					props = nextState.element;
					if (prevState.isDehydrated) if (prevState = {
						element: props,
						isDehydrated: !1,
						cache: nextState.cache
					}, workInProgress.updateQueue.baseState = prevState, workInProgress.memoizedState = prevState, workInProgress.flags & 256) {
						workInProgress = mountHostRootWithoutHydrating(current, workInProgress, props, renderLanes);
						break a;
					} else if (props !== $$typeof) {
						$$typeof = createCapturedValueAtFiber(Error(formatProdErrorMessage(424)), workInProgress);
						queueHydrationError($$typeof);
						workInProgress = mountHostRootWithoutHydrating(current, workInProgress, props, renderLanes);
						break a;
					} else {
						current = workInProgress.stateNode.containerInfo;
						switch (current.nodeType) {
							case 9:
								current = current.body;
								break;
							default: current = "HTML" === current.nodeName ? current.ownerDocument.body : current;
						}
						nextHydratableInstance = getNextHydratable(current.firstChild);
						hydrationParentFiber = workInProgress;
						isHydrating = !0;
						hydrationErrors = null;
						rootOrSingletonContext = !0;
						renderLanes = mountChildFibers(workInProgress, null, props, renderLanes);
						for (workInProgress.child = renderLanes; renderLanes;) renderLanes.flags = renderLanes.flags & -3 | 4096, renderLanes = renderLanes.sibling;
					}
					else {
						resetHydrationState();
						if (props === $$typeof) {
							workInProgress = bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes);
							break a;
						}
						reconcileChildren(current, workInProgress, props, renderLanes);
					}
					workInProgress = workInProgress.child;
				}
				return workInProgress;
			case 26: return markRef(current, workInProgress), null === current ? (renderLanes = getResource(workInProgress.type, null, workInProgress.pendingProps, null)) ? workInProgress.memoizedState = renderLanes : isHydrating || (renderLanes = workInProgress.type, current = workInProgress.pendingProps, props = getOwnerDocumentFromRootContainer(rootInstanceStackCursor.current).createElement(renderLanes), props[internalInstanceKey] = workInProgress, props[internalPropsKey] = current, setInitialProperties(props, renderLanes, current), markNodeAsHoistable(props), workInProgress.stateNode = props) : workInProgress.memoizedState = getResource(workInProgress.type, current.memoizedProps, workInProgress.pendingProps, current.memoizedState), null;
			case 27: return pushHostContext(workInProgress), null === current && isHydrating && (props = workInProgress.stateNode = resolveSingletonInstance(workInProgress.type, workInProgress.pendingProps, rootInstanceStackCursor.current), hydrationParentFiber = workInProgress, rootOrSingletonContext = !0, $$typeof = nextHydratableInstance, isSingletonScope(workInProgress.type) ? (previousHydratableOnEnteringScopedSingleton = $$typeof, nextHydratableInstance = getNextHydratable(props.firstChild)) : nextHydratableInstance = $$typeof), reconcileChildren(current, workInProgress, workInProgress.pendingProps.children, renderLanes), markRef(current, workInProgress), null === current && (workInProgress.flags |= 4194304), workInProgress.child;
			case 5:
				if (null === current && isHydrating) {
					if ($$typeof = props = nextHydratableInstance) props = canHydrateInstance(props, workInProgress.type, workInProgress.pendingProps, rootOrSingletonContext), null !== props ? (workInProgress.stateNode = props, hydrationParentFiber = workInProgress, nextHydratableInstance = getNextHydratable(props.firstChild), rootOrSingletonContext = !1, $$typeof = !0) : $$typeof = !1;
					$$typeof || throwOnHydrationMismatch(workInProgress);
				}
				pushHostContext(workInProgress);
				$$typeof = workInProgress.type;
				prevState = workInProgress.pendingProps;
				nextState = null !== current ? current.memoizedProps : null;
				props = prevState.children;
				shouldSetTextContent($$typeof, prevState) ? props = null : null !== nextState && shouldSetTextContent($$typeof, nextState) && (workInProgress.flags |= 32);
				null !== workInProgress.memoizedState && ($$typeof = renderWithHooks(current, workInProgress, TransitionAwareHostComponent, null, null, renderLanes), HostTransitionContext._currentValue = $$typeof);
				markRef(current, workInProgress);
				reconcileChildren(current, workInProgress, props, renderLanes);
				return workInProgress.child;
			case 6:
				if (null === current && isHydrating) {
					if (current = renderLanes = nextHydratableInstance) renderLanes = canHydrateTextInstance(renderLanes, workInProgress.pendingProps, rootOrSingletonContext), null !== renderLanes ? (workInProgress.stateNode = renderLanes, hydrationParentFiber = workInProgress, nextHydratableInstance = null, current = !0) : current = !1;
					current || throwOnHydrationMismatch(workInProgress);
				}
				return null;
			case 13: return updateSuspenseComponent(current, workInProgress, renderLanes);
			case 4: return pushHostContainer(workInProgress, workInProgress.stateNode.containerInfo), props = workInProgress.pendingProps, null === current ? workInProgress.child = reconcileChildFibers(workInProgress, null, props, renderLanes) : reconcileChildren(current, workInProgress, props, renderLanes), workInProgress.child;
			case 11: return updateForwardRef(current, workInProgress, workInProgress.type, workInProgress.pendingProps, renderLanes);
			case 7: return reconcileChildren(current, workInProgress, workInProgress.pendingProps, renderLanes), workInProgress.child;
			case 8: return reconcileChildren(current, workInProgress, workInProgress.pendingProps.children, renderLanes), workInProgress.child;
			case 12: return reconcileChildren(current, workInProgress, workInProgress.pendingProps.children, renderLanes), workInProgress.child;
			case 10: return props = workInProgress.pendingProps, pushProvider(workInProgress, workInProgress.type, props.value), reconcileChildren(current, workInProgress, props.children, renderLanes), workInProgress.child;
			case 9: return $$typeof = workInProgress.type._context, props = workInProgress.pendingProps.children, prepareToReadContext(workInProgress), $$typeof = readContext($$typeof), props = props($$typeof), workInProgress.flags |= 1, reconcileChildren(current, workInProgress, props, renderLanes), workInProgress.child;
			case 14: return updateMemoComponent(current, workInProgress, workInProgress.type, workInProgress.pendingProps, renderLanes);
			case 15: return updateSimpleMemoComponent(current, workInProgress, workInProgress.type, workInProgress.pendingProps, renderLanes);
			case 19: return updateSuspenseListComponent(current, workInProgress, renderLanes);
			case 31: return updateActivityComponent(current, workInProgress, renderLanes);
			case 22: return updateOffscreenComponent(current, workInProgress, renderLanes, workInProgress.pendingProps);
			case 24: return prepareToReadContext(workInProgress), props = readContext(CacheContext), null === current ? ($$typeof = peekCacheFromPool(), null === $$typeof && ($$typeof = workInProgressRoot, prevState = createCache(), $$typeof.pooledCache = prevState, prevState.refCount++, null !== prevState && ($$typeof.pooledCacheLanes |= renderLanes), $$typeof = prevState), workInProgress.memoizedState = {
				parent: props,
				cache: $$typeof
			}, initializeUpdateQueue(workInProgress), pushProvider(workInProgress, CacheContext, $$typeof)) : (0 !== (current.lanes & renderLanes) && (cloneUpdateQueue(current, workInProgress), processUpdateQueue(workInProgress, null, null, renderLanes), suspendIfUpdateReadFromEntangledAsyncAction()), $$typeof = current.memoizedState, prevState = workInProgress.memoizedState, $$typeof.parent !== props ? ($$typeof = {
				parent: props,
				cache: props
			}, workInProgress.memoizedState = $$typeof, 0 === workInProgress.lanes && (workInProgress.memoizedState = workInProgress.updateQueue.baseState = $$typeof), pushProvider(workInProgress, CacheContext, props)) : (props = prevState.cache, pushProvider(workInProgress, CacheContext, props), props !== $$typeof.cache && propagateContextChanges(workInProgress, [CacheContext], renderLanes, !0))), reconcileChildren(current, workInProgress, workInProgress.pendingProps.children, renderLanes), workInProgress.child;
			case 29: throw workInProgress.pendingProps;
		}
		throw Error(formatProdErrorMessage(156, workInProgress.tag));
	}
	function markUpdate(workInProgress) {
		workInProgress.flags |= 4;
	}
	function preloadInstanceAndSuspendIfNeeded(workInProgress, type, oldProps, newProps, renderLanes) {
		if (type = 0 !== (workInProgress.mode & 32)) type = !1;
		if (type) {
			if (workInProgress.flags |= 16777216, (renderLanes & 335544128) === renderLanes) if (workInProgress.stateNode.complete) workInProgress.flags |= 8192;
			else if (shouldRemainOnPreviousScreen()) workInProgress.flags |= 8192;
			else throw suspendedThenable = noopSuspenseyCommitThenable, SuspenseyCommitException;
		} else workInProgress.flags &= -16777217;
	}
	function preloadResourceAndSuspendIfNeeded(workInProgress, resource) {
		if ("stylesheet" !== resource.type || 0 !== (resource.state.loading & 4)) workInProgress.flags &= -16777217;
		else if (workInProgress.flags |= 16777216, !preloadResource(resource)) if (shouldRemainOnPreviousScreen()) workInProgress.flags |= 8192;
		else throw suspendedThenable = noopSuspenseyCommitThenable, SuspenseyCommitException;
	}
	function scheduleRetryEffect(workInProgress, retryQueue) {
		null !== retryQueue && (workInProgress.flags |= 4);
		workInProgress.flags & 16384 && (retryQueue = 22 !== workInProgress.tag ? claimNextRetryLane() : 536870912, workInProgress.lanes |= retryQueue, workInProgressSuspendedRetryLanes |= retryQueue);
	}
	function cutOffTailIfNeeded(renderState, hasRenderedATailFallback) {
		if (!isHydrating) switch (renderState.tailMode) {
			case "hidden":
				hasRenderedATailFallback = renderState.tail;
				for (var lastTailNode = null; null !== hasRenderedATailFallback;) null !== hasRenderedATailFallback.alternate && (lastTailNode = hasRenderedATailFallback), hasRenderedATailFallback = hasRenderedATailFallback.sibling;
				null === lastTailNode ? renderState.tail = null : lastTailNode.sibling = null;
				break;
			case "collapsed":
				lastTailNode = renderState.tail;
				for (var lastTailNode$106 = null; null !== lastTailNode;) null !== lastTailNode.alternate && (lastTailNode$106 = lastTailNode), lastTailNode = lastTailNode.sibling;
				null === lastTailNode$106 ? hasRenderedATailFallback || null === renderState.tail ? renderState.tail = null : renderState.tail.sibling = null : lastTailNode$106.sibling = null;
		}
	}
	function bubbleProperties(completedWork) {
		var didBailout = null !== completedWork.alternate && completedWork.alternate.child === completedWork.child, newChildLanes = 0, subtreeFlags = 0;
		if (didBailout) for (var child$107 = completedWork.child; null !== child$107;) newChildLanes |= child$107.lanes | child$107.childLanes, subtreeFlags |= child$107.subtreeFlags & 65011712, subtreeFlags |= child$107.flags & 65011712, child$107.return = completedWork, child$107 = child$107.sibling;
		else for (child$107 = completedWork.child; null !== child$107;) newChildLanes |= child$107.lanes | child$107.childLanes, subtreeFlags |= child$107.subtreeFlags, subtreeFlags |= child$107.flags, child$107.return = completedWork, child$107 = child$107.sibling;
		completedWork.subtreeFlags |= subtreeFlags;
		completedWork.childLanes = newChildLanes;
		return didBailout;
	}
	function completeWork(current, workInProgress, renderLanes) {
		var newProps = workInProgress.pendingProps;
		popTreeContext(workInProgress);
		switch (workInProgress.tag) {
			case 16:
			case 15:
			case 0:
			case 11:
			case 7:
			case 8:
			case 12:
			case 9:
			case 14: return bubbleProperties(workInProgress), null;
			case 1: return bubbleProperties(workInProgress), null;
			case 3:
				renderLanes = workInProgress.stateNode;
				newProps = null;
				null !== current && (newProps = current.memoizedState.cache);
				workInProgress.memoizedState.cache !== newProps && (workInProgress.flags |= 2048);
				popProvider(CacheContext);
				popHostContainer();
				renderLanes.pendingContext && (renderLanes.context = renderLanes.pendingContext, renderLanes.pendingContext = null);
				if (null === current || null === current.child) popHydrationState(workInProgress) ? markUpdate(workInProgress) : null === current || current.memoizedState.isDehydrated && 0 === (workInProgress.flags & 256) || (workInProgress.flags |= 1024, upgradeHydrationErrorsToRecoverable());
				bubbleProperties(workInProgress);
				return null;
			case 26:
				var type = workInProgress.type, nextResource = workInProgress.memoizedState;
				null === current ? (markUpdate(workInProgress), null !== nextResource ? (bubbleProperties(workInProgress), preloadResourceAndSuspendIfNeeded(workInProgress, nextResource)) : (bubbleProperties(workInProgress), preloadInstanceAndSuspendIfNeeded(workInProgress, type, null, newProps, renderLanes))) : nextResource ? nextResource !== current.memoizedState ? (markUpdate(workInProgress), bubbleProperties(workInProgress), preloadResourceAndSuspendIfNeeded(workInProgress, nextResource)) : (bubbleProperties(workInProgress), workInProgress.flags &= -16777217) : (current = current.memoizedProps, current !== newProps && markUpdate(workInProgress), bubbleProperties(workInProgress), preloadInstanceAndSuspendIfNeeded(workInProgress, type, current, newProps, renderLanes));
				return null;
			case 27:
				popHostContext(workInProgress);
				renderLanes = rootInstanceStackCursor.current;
				type = workInProgress.type;
				if (null !== current && null != workInProgress.stateNode) current.memoizedProps !== newProps && markUpdate(workInProgress);
				else {
					if (!newProps) {
						if (null === workInProgress.stateNode) throw Error(formatProdErrorMessage(166));
						bubbleProperties(workInProgress);
						return null;
					}
					current = contextStackCursor.current;
					popHydrationState(workInProgress) ? prepareToHydrateHostInstance(workInProgress, current) : (current = resolveSingletonInstance(type, newProps, renderLanes), workInProgress.stateNode = current, markUpdate(workInProgress));
				}
				bubbleProperties(workInProgress);
				return null;
			case 5:
				popHostContext(workInProgress);
				type = workInProgress.type;
				if (null !== current && null != workInProgress.stateNode) current.memoizedProps !== newProps && markUpdate(workInProgress);
				else {
					if (!newProps) {
						if (null === workInProgress.stateNode) throw Error(formatProdErrorMessage(166));
						bubbleProperties(workInProgress);
						return null;
					}
					nextResource = contextStackCursor.current;
					if (popHydrationState(workInProgress)) prepareToHydrateHostInstance(workInProgress, nextResource);
					else {
						var ownerDocument = getOwnerDocumentFromRootContainer(rootInstanceStackCursor.current);
						switch (nextResource) {
							case 1:
								nextResource = ownerDocument.createElementNS("http://www.w3.org/2000/svg", type);
								break;
							case 2:
								nextResource = ownerDocument.createElementNS("http://www.w3.org/1998/Math/MathML", type);
								break;
							default: switch (type) {
								case "svg":
									nextResource = ownerDocument.createElementNS("http://www.w3.org/2000/svg", type);
									break;
								case "math":
									nextResource = ownerDocument.createElementNS("http://www.w3.org/1998/Math/MathML", type);
									break;
								case "script":
									nextResource = ownerDocument.createElement("div");
									nextResource.innerHTML = "<script><\/script>";
									nextResource = nextResource.removeChild(nextResource.firstChild);
									break;
								case "select":
									nextResource = "string" === typeof newProps.is ? ownerDocument.createElement("select", { is: newProps.is }) : ownerDocument.createElement("select");
									newProps.multiple ? nextResource.multiple = !0 : newProps.size && (nextResource.size = newProps.size);
									break;
								default: nextResource = "string" === typeof newProps.is ? ownerDocument.createElement(type, { is: newProps.is }) : ownerDocument.createElement(type);
							}
						}
						nextResource[internalInstanceKey] = workInProgress;
						nextResource[internalPropsKey] = newProps;
						a: for (ownerDocument = workInProgress.child; null !== ownerDocument;) {
							if (5 === ownerDocument.tag || 6 === ownerDocument.tag) nextResource.appendChild(ownerDocument.stateNode);
							else if (4 !== ownerDocument.tag && 27 !== ownerDocument.tag && null !== ownerDocument.child) {
								ownerDocument.child.return = ownerDocument;
								ownerDocument = ownerDocument.child;
								continue;
							}
							if (ownerDocument === workInProgress) break a;
							for (; null === ownerDocument.sibling;) {
								if (null === ownerDocument.return || ownerDocument.return === workInProgress) break a;
								ownerDocument = ownerDocument.return;
							}
							ownerDocument.sibling.return = ownerDocument.return;
							ownerDocument = ownerDocument.sibling;
						}
						workInProgress.stateNode = nextResource;
						a: switch (setInitialProperties(nextResource, type, newProps), type) {
							case "button":
							case "input":
							case "select":
							case "textarea":
								newProps = !!newProps.autoFocus;
								break a;
							case "img":
								newProps = !0;
								break a;
							default: newProps = !1;
						}
						newProps && markUpdate(workInProgress);
					}
				}
				bubbleProperties(workInProgress);
				preloadInstanceAndSuspendIfNeeded(workInProgress, workInProgress.type, null === current ? null : current.memoizedProps, workInProgress.pendingProps, renderLanes);
				return null;
			case 6:
				if (current && null != workInProgress.stateNode) current.memoizedProps !== newProps && markUpdate(workInProgress);
				else {
					if ("string" !== typeof newProps && null === workInProgress.stateNode) throw Error(formatProdErrorMessage(166));
					current = rootInstanceStackCursor.current;
					if (popHydrationState(workInProgress)) {
						current = workInProgress.stateNode;
						renderLanes = workInProgress.memoizedProps;
						newProps = null;
						type = hydrationParentFiber;
						if (null !== type) switch (type.tag) {
							case 27:
							case 5: newProps = type.memoizedProps;
						}
						current[internalInstanceKey] = workInProgress;
						current = current.nodeValue === renderLanes || null !== newProps && !0 === newProps.suppressHydrationWarning || checkForUnmatchedText(current.nodeValue, renderLanes) ? !0 : !1;
						current || throwOnHydrationMismatch(workInProgress, !0);
					} else current = getOwnerDocumentFromRootContainer(current).createTextNode(newProps), current[internalInstanceKey] = workInProgress, workInProgress.stateNode = current;
				}
				bubbleProperties(workInProgress);
				return null;
			case 31:
				renderLanes = workInProgress.memoizedState;
				if (null === current || null !== current.memoizedState) {
					newProps = popHydrationState(workInProgress);
					if (null !== renderLanes) {
						if (null === current) {
							if (!newProps) throw Error(formatProdErrorMessage(318));
							current = workInProgress.memoizedState;
							current = null !== current ? current.dehydrated : null;
							if (!current) throw Error(formatProdErrorMessage(557));
							current[internalInstanceKey] = workInProgress;
						} else resetHydrationState(), 0 === (workInProgress.flags & 128) && (workInProgress.memoizedState = null), workInProgress.flags |= 4;
						bubbleProperties(workInProgress);
						current = !1;
					} else renderLanes = upgradeHydrationErrorsToRecoverable(), null !== current && null !== current.memoizedState && (current.memoizedState.hydrationErrors = renderLanes), current = !0;
					if (!current) {
						if (workInProgress.flags & 256) return popSuspenseHandler(workInProgress), workInProgress;
						popSuspenseHandler(workInProgress);
						return null;
					}
					if (0 !== (workInProgress.flags & 128)) throw Error(formatProdErrorMessage(558));
				}
				bubbleProperties(workInProgress);
				return null;
			case 13:
				newProps = workInProgress.memoizedState;
				if (null === current || null !== current.memoizedState && null !== current.memoizedState.dehydrated) {
					type = popHydrationState(workInProgress);
					if (null !== newProps && null !== newProps.dehydrated) {
						if (null === current) {
							if (!type) throw Error(formatProdErrorMessage(318));
							type = workInProgress.memoizedState;
							type = null !== type ? type.dehydrated : null;
							if (!type) throw Error(formatProdErrorMessage(317));
							type[internalInstanceKey] = workInProgress;
						} else resetHydrationState(), 0 === (workInProgress.flags & 128) && (workInProgress.memoizedState = null), workInProgress.flags |= 4;
						bubbleProperties(workInProgress);
						type = !1;
					} else type = upgradeHydrationErrorsToRecoverable(), null !== current && null !== current.memoizedState && (current.memoizedState.hydrationErrors = type), type = !0;
					if (!type) {
						if (workInProgress.flags & 256) return popSuspenseHandler(workInProgress), workInProgress;
						popSuspenseHandler(workInProgress);
						return null;
					}
				}
				popSuspenseHandler(workInProgress);
				if (0 !== (workInProgress.flags & 128)) return workInProgress.lanes = renderLanes, workInProgress;
				renderLanes = null !== newProps;
				current = null !== current && null !== current.memoizedState;
				renderLanes && (newProps = workInProgress.child, type = null, null !== newProps.alternate && null !== newProps.alternate.memoizedState && null !== newProps.alternate.memoizedState.cachePool && (type = newProps.alternate.memoizedState.cachePool.pool), nextResource = null, null !== newProps.memoizedState && null !== newProps.memoizedState.cachePool && (nextResource = newProps.memoizedState.cachePool.pool), nextResource !== type && (newProps.flags |= 2048));
				renderLanes !== current && renderLanes && (workInProgress.child.flags |= 8192);
				scheduleRetryEffect(workInProgress, workInProgress.updateQueue);
				bubbleProperties(workInProgress);
				return null;
			case 4: return popHostContainer(), null === current && listenToAllSupportedEvents(workInProgress.stateNode.containerInfo), bubbleProperties(workInProgress), null;
			case 10: return popProvider(workInProgress.type), bubbleProperties(workInProgress), null;
			case 19:
				pop(suspenseStackCursor);
				newProps = workInProgress.memoizedState;
				if (null === newProps) return bubbleProperties(workInProgress), null;
				type = 0 !== (workInProgress.flags & 128);
				nextResource = newProps.rendering;
				if (null === nextResource) if (type) cutOffTailIfNeeded(newProps, !1);
				else {
					if (0 !== workInProgressRootExitStatus || null !== current && 0 !== (current.flags & 128)) for (current = workInProgress.child; null !== current;) {
						nextResource = findFirstSuspended(current);
						if (null !== nextResource) {
							workInProgress.flags |= 128;
							cutOffTailIfNeeded(newProps, !1);
							current = nextResource.updateQueue;
							workInProgress.updateQueue = current;
							scheduleRetryEffect(workInProgress, current);
							workInProgress.subtreeFlags = 0;
							current = renderLanes;
							for (renderLanes = workInProgress.child; null !== renderLanes;) resetWorkInProgress(renderLanes, current), renderLanes = renderLanes.sibling;
							push(suspenseStackCursor, suspenseStackCursor.current & 1 | 2);
							isHydrating && pushTreeFork(workInProgress, newProps.treeForkCount);
							return workInProgress.child;
						}
						current = current.sibling;
					}
					null !== newProps.tail && now() > workInProgressRootRenderTargetTime && (workInProgress.flags |= 128, type = !0, cutOffTailIfNeeded(newProps, !1), workInProgress.lanes = 4194304);
				}
				else {
					if (!type) if (current = findFirstSuspended(nextResource), null !== current) {
						if (workInProgress.flags |= 128, type = !0, current = current.updateQueue, workInProgress.updateQueue = current, scheduleRetryEffect(workInProgress, current), cutOffTailIfNeeded(newProps, !0), null === newProps.tail && "hidden" === newProps.tailMode && !nextResource.alternate && !isHydrating) return bubbleProperties(workInProgress), null;
					} else 2 * now() - newProps.renderingStartTime > workInProgressRootRenderTargetTime && 536870912 !== renderLanes && (workInProgress.flags |= 128, type = !0, cutOffTailIfNeeded(newProps, !1), workInProgress.lanes = 4194304);
					newProps.isBackwards ? (nextResource.sibling = workInProgress.child, workInProgress.child = nextResource) : (current = newProps.last, null !== current ? current.sibling = nextResource : workInProgress.child = nextResource, newProps.last = nextResource);
				}
				if (null !== newProps.tail) return current = newProps.tail, newProps.rendering = current, newProps.tail = current.sibling, newProps.renderingStartTime = now(), current.sibling = null, renderLanes = suspenseStackCursor.current, push(suspenseStackCursor, type ? renderLanes & 1 | 2 : renderLanes & 1), isHydrating && pushTreeFork(workInProgress, newProps.treeForkCount), current;
				bubbleProperties(workInProgress);
				return null;
			case 22:
			case 23: return popSuspenseHandler(workInProgress), popHiddenContext(), newProps = null !== workInProgress.memoizedState, null !== current ? null !== current.memoizedState !== newProps && (workInProgress.flags |= 8192) : newProps && (workInProgress.flags |= 8192), newProps ? 0 !== (renderLanes & 536870912) && 0 === (workInProgress.flags & 128) && (bubbleProperties(workInProgress), workInProgress.subtreeFlags & 6 && (workInProgress.flags |= 8192)) : bubbleProperties(workInProgress), renderLanes = workInProgress.updateQueue, null !== renderLanes && scheduleRetryEffect(workInProgress, renderLanes.retryQueue), renderLanes = null, null !== current && null !== current.memoizedState && null !== current.memoizedState.cachePool && (renderLanes = current.memoizedState.cachePool.pool), newProps = null, null !== workInProgress.memoizedState && null !== workInProgress.memoizedState.cachePool && (newProps = workInProgress.memoizedState.cachePool.pool), newProps !== renderLanes && (workInProgress.flags |= 2048), null !== current && pop(resumedCache), null;
			case 24: return renderLanes = null, null !== current && (renderLanes = current.memoizedState.cache), workInProgress.memoizedState.cache !== renderLanes && (workInProgress.flags |= 2048), popProvider(CacheContext), bubbleProperties(workInProgress), null;
			case 25: return null;
			case 30: return null;
		}
		throw Error(formatProdErrorMessage(156, workInProgress.tag));
	}
	function unwindWork(current, workInProgress) {
		popTreeContext(workInProgress);
		switch (workInProgress.tag) {
			case 1: return current = workInProgress.flags, current & 65536 ? (workInProgress.flags = current & -65537 | 128, workInProgress) : null;
			case 3: return popProvider(CacheContext), popHostContainer(), current = workInProgress.flags, 0 !== (current & 65536) && 0 === (current & 128) ? (workInProgress.flags = current & -65537 | 128, workInProgress) : null;
			case 26:
			case 27:
			case 5: return popHostContext(workInProgress), null;
			case 31:
				if (null !== workInProgress.memoizedState) {
					popSuspenseHandler(workInProgress);
					if (null === workInProgress.alternate) throw Error(formatProdErrorMessage(340));
					resetHydrationState();
				}
				current = workInProgress.flags;
				return current & 65536 ? (workInProgress.flags = current & -65537 | 128, workInProgress) : null;
			case 13:
				popSuspenseHandler(workInProgress);
				current = workInProgress.memoizedState;
				if (null !== current && null !== current.dehydrated) {
					if (null === workInProgress.alternate) throw Error(formatProdErrorMessage(340));
					resetHydrationState();
				}
				current = workInProgress.flags;
				return current & 65536 ? (workInProgress.flags = current & -65537 | 128, workInProgress) : null;
			case 19: return pop(suspenseStackCursor), null;
			case 4: return popHostContainer(), null;
			case 10: return popProvider(workInProgress.type), null;
			case 22:
			case 23: return popSuspenseHandler(workInProgress), popHiddenContext(), null !== current && pop(resumedCache), current = workInProgress.flags, current & 65536 ? (workInProgress.flags = current & -65537 | 128, workInProgress) : null;
			case 24: return popProvider(CacheContext), null;
			case 25: return null;
			default: return null;
		}
	}
	function unwindInterruptedWork(current, interruptedWork) {
		popTreeContext(interruptedWork);
		switch (interruptedWork.tag) {
			case 3:
				popProvider(CacheContext);
				popHostContainer();
				break;
			case 26:
			case 27:
			case 5:
				popHostContext(interruptedWork);
				break;
			case 4:
				popHostContainer();
				break;
			case 31:
				null !== interruptedWork.memoizedState && popSuspenseHandler(interruptedWork);
				break;
			case 13:
				popSuspenseHandler(interruptedWork);
				break;
			case 19:
				pop(suspenseStackCursor);
				break;
			case 10:
				popProvider(interruptedWork.type);
				break;
			case 22:
			case 23:
				popSuspenseHandler(interruptedWork);
				popHiddenContext();
				null !== current && pop(resumedCache);
				break;
			case 24: popProvider(CacheContext);
		}
	}
	function commitHookEffectListMount(flags, finishedWork) {
		try {
			var updateQueue = finishedWork.updateQueue, lastEffect = null !== updateQueue ? updateQueue.lastEffect : null;
			if (null !== lastEffect) {
				var firstEffect = lastEffect.next;
				updateQueue = firstEffect;
				do {
					if ((updateQueue.tag & flags) === flags) {
						lastEffect = void 0;
						var create = updateQueue.create, inst = updateQueue.inst;
						lastEffect = create();
						inst.destroy = lastEffect;
					}
					updateQueue = updateQueue.next;
				} while (updateQueue !== firstEffect);
			}
		} catch (error) {
			captureCommitPhaseError(finishedWork, finishedWork.return, error);
		}
	}
	function commitHookEffectListUnmount(flags, finishedWork, nearestMountedAncestor$jscomp$0) {
		try {
			var updateQueue = finishedWork.updateQueue, lastEffect = null !== updateQueue ? updateQueue.lastEffect : null;
			if (null !== lastEffect) {
				var firstEffect = lastEffect.next;
				updateQueue = firstEffect;
				do {
					if ((updateQueue.tag & flags) === flags) {
						var inst = updateQueue.inst, destroy = inst.destroy;
						if (void 0 !== destroy) {
							inst.destroy = void 0;
							lastEffect = finishedWork;
							var nearestMountedAncestor = nearestMountedAncestor$jscomp$0, destroy_ = destroy;
							try {
								destroy_();
							} catch (error) {
								captureCommitPhaseError(lastEffect, nearestMountedAncestor, error);
							}
						}
					}
					updateQueue = updateQueue.next;
				} while (updateQueue !== firstEffect);
			}
		} catch (error) {
			captureCommitPhaseError(finishedWork, finishedWork.return, error);
		}
	}
	function commitClassCallbacks(finishedWork) {
		var updateQueue = finishedWork.updateQueue;
		if (null !== updateQueue) {
			var instance = finishedWork.stateNode;
			try {
				commitCallbacks(updateQueue, instance);
			} catch (error) {
				captureCommitPhaseError(finishedWork, finishedWork.return, error);
			}
		}
	}
	function safelyCallComponentWillUnmount(current, nearestMountedAncestor, instance) {
		instance.props = resolveClassComponentProps(current.type, current.memoizedProps);
		instance.state = current.memoizedState;
		try {
			instance.componentWillUnmount();
		} catch (error) {
			captureCommitPhaseError(current, nearestMountedAncestor, error);
		}
	}
	function safelyAttachRef(current, nearestMountedAncestor) {
		try {
			var ref = current.ref;
			if (null !== ref) {
				switch (current.tag) {
					case 26:
					case 27:
					case 5:
						var instanceToUse = current.stateNode;
						break;
					case 30:
						instanceToUse = current.stateNode;
						break;
					default: instanceToUse = current.stateNode;
				}
				"function" === typeof ref ? current.refCleanup = ref(instanceToUse) : ref.current = instanceToUse;
			}
		} catch (error) {
			captureCommitPhaseError(current, nearestMountedAncestor, error);
		}
	}
	function safelyDetachRef(current, nearestMountedAncestor) {
		var ref = current.ref, refCleanup = current.refCleanup;
		if (null !== ref) if ("function" === typeof refCleanup) try {
			refCleanup();
		} catch (error) {
			captureCommitPhaseError(current, nearestMountedAncestor, error);
		} finally {
			current.refCleanup = null, current = current.alternate, null != current && (current.refCleanup = null);
		}
		else if ("function" === typeof ref) try {
			ref(null);
		} catch (error$140) {
			captureCommitPhaseError(current, nearestMountedAncestor, error$140);
		}
		else ref.current = null;
	}
	function commitHostMount(finishedWork) {
		var type = finishedWork.type, props = finishedWork.memoizedProps, instance = finishedWork.stateNode;
		try {
			a: switch (type) {
				case "button":
				case "input":
				case "select":
				case "textarea":
					props.autoFocus && instance.focus();
					break a;
				case "img": props.src ? instance.src = props.src : props.srcSet && (instance.srcset = props.srcSet);
			}
		} catch (error) {
			captureCommitPhaseError(finishedWork, finishedWork.return, error);
		}
	}
	function commitHostUpdate(finishedWork, newProps, oldProps) {
		try {
			var domElement = finishedWork.stateNode;
			updateProperties(domElement, finishedWork.type, oldProps, newProps);
			domElement[internalPropsKey] = newProps;
		} catch (error) {
			captureCommitPhaseError(finishedWork, finishedWork.return, error);
		}
	}
	function isHostParent(fiber) {
		return 5 === fiber.tag || 3 === fiber.tag || 26 === fiber.tag || 27 === fiber.tag && isSingletonScope(fiber.type) || 4 === fiber.tag;
	}
	function getHostSibling(fiber) {
		a: for (;;) {
			for (; null === fiber.sibling;) {
				if (null === fiber.return || isHostParent(fiber.return)) return null;
				fiber = fiber.return;
			}
			fiber.sibling.return = fiber.return;
			for (fiber = fiber.sibling; 5 !== fiber.tag && 6 !== fiber.tag && 18 !== fiber.tag;) {
				if (27 === fiber.tag && isSingletonScope(fiber.type)) continue a;
				if (fiber.flags & 2) continue a;
				if (null === fiber.child || 4 === fiber.tag) continue a;
				else fiber.child.return = fiber, fiber = fiber.child;
			}
			if (!(fiber.flags & 2)) return fiber.stateNode;
		}
	}
	function insertOrAppendPlacementNodeIntoContainer(node, before, parent) {
		var tag = node.tag;
		if (5 === tag || 6 === tag) node = node.stateNode, before ? (9 === parent.nodeType ? parent.body : "HTML" === parent.nodeName ? parent.ownerDocument.body : parent).insertBefore(node, before) : (before = 9 === parent.nodeType ? parent.body : "HTML" === parent.nodeName ? parent.ownerDocument.body : parent, before.appendChild(node), parent = parent._reactRootContainer, null !== parent && void 0 !== parent || null !== before.onclick || (before.onclick = noop$1));
		else if (4 !== tag && (27 === tag && isSingletonScope(node.type) && (parent = node.stateNode, before = null), node = node.child, null !== node)) for (insertOrAppendPlacementNodeIntoContainer(node, before, parent), node = node.sibling; null !== node;) insertOrAppendPlacementNodeIntoContainer(node, before, parent), node = node.sibling;
	}
	function insertOrAppendPlacementNode(node, before, parent) {
		var tag = node.tag;
		if (5 === tag || 6 === tag) node = node.stateNode, before ? parent.insertBefore(node, before) : parent.appendChild(node);
		else if (4 !== tag && (27 === tag && isSingletonScope(node.type) && (parent = node.stateNode), node = node.child, null !== node)) for (insertOrAppendPlacementNode(node, before, parent), node = node.sibling; null !== node;) insertOrAppendPlacementNode(node, before, parent), node = node.sibling;
	}
	function commitHostSingletonAcquisition(finishedWork) {
		var singleton = finishedWork.stateNode, props = finishedWork.memoizedProps;
		try {
			for (var type = finishedWork.type, attributes = singleton.attributes; attributes.length;) singleton.removeAttributeNode(attributes[0]);
			setInitialProperties(singleton, type, props);
			singleton[internalInstanceKey] = finishedWork;
			singleton[internalPropsKey] = props;
		} catch (error) {
			captureCommitPhaseError(finishedWork, finishedWork.return, error);
		}
	}
	var offscreenSubtreeIsHidden = !1, offscreenSubtreeWasHidden = !1, needsFormReset = !1, PossiblyWeakSet = "function" === typeof WeakSet ? WeakSet : Set, nextEffect = null;
	function commitBeforeMutationEffects(root, firstChild) {
		root = root.containerInfo;
		eventsEnabled = _enabled;
		root = getActiveElementDeep(root);
		if (hasSelectionCapabilities(root)) {
			if ("selectionStart" in root) var JSCompiler_temp = {
				start: root.selectionStart,
				end: root.selectionEnd
			};
			else a: {
				JSCompiler_temp = (JSCompiler_temp = root.ownerDocument) && JSCompiler_temp.defaultView || window;
				var selection = JSCompiler_temp.getSelection && JSCompiler_temp.getSelection();
				if (selection && 0 !== selection.rangeCount) {
					JSCompiler_temp = selection.anchorNode;
					var anchorOffset = selection.anchorOffset, focusNode = selection.focusNode;
					selection = selection.focusOffset;
					try {
						JSCompiler_temp.nodeType, focusNode.nodeType;
					} catch (e$20) {
						JSCompiler_temp = null;
						break a;
					}
					var length = 0, start = -1, end = -1, indexWithinAnchor = 0, indexWithinFocus = 0, node = root, parentNode = null;
					b: for (;;) {
						for (var next;;) {
							node !== JSCompiler_temp || 0 !== anchorOffset && 3 !== node.nodeType || (start = length + anchorOffset);
							node !== focusNode || 0 !== selection && 3 !== node.nodeType || (end = length + selection);
							3 === node.nodeType && (length += node.nodeValue.length);
							if (null === (next = node.firstChild)) break;
							parentNode = node;
							node = next;
						}
						for (;;) {
							if (node === root) break b;
							parentNode === JSCompiler_temp && ++indexWithinAnchor === anchorOffset && (start = length);
							parentNode === focusNode && ++indexWithinFocus === selection && (end = length);
							if (null !== (next = node.nextSibling)) break;
							node = parentNode;
							parentNode = node.parentNode;
						}
						node = next;
					}
					JSCompiler_temp = -1 === start || -1 === end ? null : {
						start,
						end
					};
				} else JSCompiler_temp = null;
			}
			JSCompiler_temp = JSCompiler_temp || {
				start: 0,
				end: 0
			};
		} else JSCompiler_temp = null;
		selectionInformation = {
			focusedElem: root,
			selectionRange: JSCompiler_temp
		};
		_enabled = !1;
		for (nextEffect = firstChild; null !== nextEffect;) if (firstChild = nextEffect, root = firstChild.child, 0 !== (firstChild.subtreeFlags & 1028) && null !== root) root.return = firstChild, nextEffect = root;
		else for (; null !== nextEffect;) {
			firstChild = nextEffect;
			focusNode = firstChild.alternate;
			root = firstChild.flags;
			switch (firstChild.tag) {
				case 0:
					if (0 !== (root & 4) && (root = firstChild.updateQueue, root = null !== root ? root.events : null, null !== root)) for (JSCompiler_temp = 0; JSCompiler_temp < root.length; JSCompiler_temp++) anchorOffset = root[JSCompiler_temp], anchorOffset.ref.impl = anchorOffset.nextImpl;
					break;
				case 11:
				case 15: break;
				case 1:
					if (0 !== (root & 1024) && null !== focusNode) {
						root = void 0;
						JSCompiler_temp = firstChild;
						anchorOffset = focusNode.memoizedProps;
						focusNode = focusNode.memoizedState;
						selection = JSCompiler_temp.stateNode;
						try {
							var resolvedPrevProps = resolveClassComponentProps(JSCompiler_temp.type, anchorOffset);
							root = selection.getSnapshotBeforeUpdate(resolvedPrevProps, focusNode);
							selection.__reactInternalSnapshotBeforeUpdate = root;
						} catch (error) {
							captureCommitPhaseError(JSCompiler_temp, JSCompiler_temp.return, error);
						}
					}
					break;
				case 3:
					if (0 !== (root & 1024)) {
						if (root = firstChild.stateNode.containerInfo, JSCompiler_temp = root.nodeType, 9 === JSCompiler_temp) clearContainerSparingly(root);
						else if (1 === JSCompiler_temp) switch (root.nodeName) {
							case "HEAD":
							case "HTML":
							case "BODY":
								clearContainerSparingly(root);
								break;
							default: root.textContent = "";
						}
					}
					break;
				case 5:
				case 26:
				case 27:
				case 6:
				case 4:
				case 17: break;
				default: if (0 !== (root & 1024)) throw Error(formatProdErrorMessage(163));
			}
			root = firstChild.sibling;
			if (null !== root) {
				root.return = firstChild.return;
				nextEffect = root;
				break;
			}
			nextEffect = firstChild.return;
		}
	}
	function commitLayoutEffectOnFiber(finishedRoot, current, finishedWork) {
		var flags = finishedWork.flags;
		switch (finishedWork.tag) {
			case 0:
			case 11:
			case 15:
				recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
				flags & 4 && commitHookEffectListMount(5, finishedWork);
				break;
			case 1:
				recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
				if (flags & 4) if (finishedRoot = finishedWork.stateNode, null === current) try {
					finishedRoot.componentDidMount();
				} catch (error) {
					captureCommitPhaseError(finishedWork, finishedWork.return, error);
				}
				else {
					var prevProps = resolveClassComponentProps(finishedWork.type, current.memoizedProps);
					current = current.memoizedState;
					try {
						finishedRoot.componentDidUpdate(prevProps, current, finishedRoot.__reactInternalSnapshotBeforeUpdate);
					} catch (error$139) {
						captureCommitPhaseError(finishedWork, finishedWork.return, error$139);
					}
				}
				flags & 64 && commitClassCallbacks(finishedWork);
				flags & 512 && safelyAttachRef(finishedWork, finishedWork.return);
				break;
			case 3:
				recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
				if (flags & 64 && (finishedRoot = finishedWork.updateQueue, null !== finishedRoot)) {
					current = null;
					if (null !== finishedWork.child) switch (finishedWork.child.tag) {
						case 27:
						case 5:
							current = finishedWork.child.stateNode;
							break;
						case 1: current = finishedWork.child.stateNode;
					}
					try {
						commitCallbacks(finishedRoot, current);
					} catch (error) {
						captureCommitPhaseError(finishedWork, finishedWork.return, error);
					}
				}
				break;
			case 27: null === current && flags & 4 && commitHostSingletonAcquisition(finishedWork);
			case 26:
			case 5:
				recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
				null === current && flags & 4 && commitHostMount(finishedWork);
				flags & 512 && safelyAttachRef(finishedWork, finishedWork.return);
				break;
			case 12:
				recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
				break;
			case 31:
				recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
				flags & 4 && commitActivityHydrationCallbacks(finishedRoot, finishedWork);
				break;
			case 13:
				recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
				flags & 4 && commitSuspenseHydrationCallbacks(finishedRoot, finishedWork);
				flags & 64 && (finishedRoot = finishedWork.memoizedState, null !== finishedRoot && (finishedRoot = finishedRoot.dehydrated, null !== finishedRoot && (finishedWork = retryDehydratedSuspenseBoundary.bind(null, finishedWork), registerSuspenseInstanceRetry(finishedRoot, finishedWork))));
				break;
			case 22:
				flags = null !== finishedWork.memoizedState || offscreenSubtreeIsHidden;
				if (!flags) {
					current = null !== current && null !== current.memoizedState || offscreenSubtreeWasHidden;
					prevProps = offscreenSubtreeIsHidden;
					var prevOffscreenSubtreeWasHidden = offscreenSubtreeWasHidden;
					offscreenSubtreeIsHidden = flags;
					(offscreenSubtreeWasHidden = current) && !prevOffscreenSubtreeWasHidden ? recursivelyTraverseReappearLayoutEffects(finishedRoot, finishedWork, 0 !== (finishedWork.subtreeFlags & 8772)) : recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
					offscreenSubtreeIsHidden = prevProps;
					offscreenSubtreeWasHidden = prevOffscreenSubtreeWasHidden;
				}
				break;
			case 30: break;
			default: recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
		}
	}
	function detachFiberAfterEffects(fiber) {
		var alternate = fiber.alternate;
		null !== alternate && (fiber.alternate = null, detachFiberAfterEffects(alternate));
		fiber.child = null;
		fiber.deletions = null;
		fiber.sibling = null;
		5 === fiber.tag && (alternate = fiber.stateNode, null !== alternate && detachDeletedInstance(alternate));
		fiber.stateNode = null;
		fiber.return = null;
		fiber.dependencies = null;
		fiber.memoizedProps = null;
		fiber.memoizedState = null;
		fiber.pendingProps = null;
		fiber.stateNode = null;
		fiber.updateQueue = null;
	}
	var hostParent = null, hostParentIsContainer = !1;
	function recursivelyTraverseDeletionEffects(finishedRoot, nearestMountedAncestor, parent) {
		for (parent = parent.child; null !== parent;) commitDeletionEffectsOnFiber(finishedRoot, nearestMountedAncestor, parent), parent = parent.sibling;
	}
	function commitDeletionEffectsOnFiber(finishedRoot, nearestMountedAncestor, deletedFiber) {
		if (injectedHook && "function" === typeof injectedHook.onCommitFiberUnmount) try {
			injectedHook.onCommitFiberUnmount(rendererID, deletedFiber);
		} catch (err) {}
		switch (deletedFiber.tag) {
			case 26:
				offscreenSubtreeWasHidden || safelyDetachRef(deletedFiber, nearestMountedAncestor);
				recursivelyTraverseDeletionEffects(finishedRoot, nearestMountedAncestor, deletedFiber);
				deletedFiber.memoizedState ? deletedFiber.memoizedState.count-- : deletedFiber.stateNode && (deletedFiber = deletedFiber.stateNode, deletedFiber.parentNode.removeChild(deletedFiber));
				break;
			case 27:
				offscreenSubtreeWasHidden || safelyDetachRef(deletedFiber, nearestMountedAncestor);
				var prevHostParent = hostParent, prevHostParentIsContainer = hostParentIsContainer;
				isSingletonScope(deletedFiber.type) && (hostParent = deletedFiber.stateNode, hostParentIsContainer = !1);
				recursivelyTraverseDeletionEffects(finishedRoot, nearestMountedAncestor, deletedFiber);
				releaseSingletonInstance(deletedFiber.stateNode);
				hostParent = prevHostParent;
				hostParentIsContainer = prevHostParentIsContainer;
				break;
			case 5: offscreenSubtreeWasHidden || safelyDetachRef(deletedFiber, nearestMountedAncestor);
			case 6:
				prevHostParent = hostParent;
				prevHostParentIsContainer = hostParentIsContainer;
				hostParent = null;
				recursivelyTraverseDeletionEffects(finishedRoot, nearestMountedAncestor, deletedFiber);
				hostParent = prevHostParent;
				hostParentIsContainer = prevHostParentIsContainer;
				if (null !== hostParent) if (hostParentIsContainer) try {
					(9 === hostParent.nodeType ? hostParent.body : "HTML" === hostParent.nodeName ? hostParent.ownerDocument.body : hostParent).removeChild(deletedFiber.stateNode);
				} catch (error) {
					captureCommitPhaseError(deletedFiber, nearestMountedAncestor, error);
				}
				else try {
					hostParent.removeChild(deletedFiber.stateNode);
				} catch (error) {
					captureCommitPhaseError(deletedFiber, nearestMountedAncestor, error);
				}
				break;
			case 18:
				null !== hostParent && (hostParentIsContainer ? (finishedRoot = hostParent, clearHydrationBoundary(9 === finishedRoot.nodeType ? finishedRoot.body : "HTML" === finishedRoot.nodeName ? finishedRoot.ownerDocument.body : finishedRoot, deletedFiber.stateNode), retryIfBlockedOn(finishedRoot)) : clearHydrationBoundary(hostParent, deletedFiber.stateNode));
				break;
			case 4:
				prevHostParent = hostParent;
				prevHostParentIsContainer = hostParentIsContainer;
				hostParent = deletedFiber.stateNode.containerInfo;
				hostParentIsContainer = !0;
				recursivelyTraverseDeletionEffects(finishedRoot, nearestMountedAncestor, deletedFiber);
				hostParent = prevHostParent;
				hostParentIsContainer = prevHostParentIsContainer;
				break;
			case 0:
			case 11:
			case 14:
			case 15:
				commitHookEffectListUnmount(2, deletedFiber, nearestMountedAncestor);
				offscreenSubtreeWasHidden || commitHookEffectListUnmount(4, deletedFiber, nearestMountedAncestor);
				recursivelyTraverseDeletionEffects(finishedRoot, nearestMountedAncestor, deletedFiber);
				break;
			case 1:
				offscreenSubtreeWasHidden || (safelyDetachRef(deletedFiber, nearestMountedAncestor), prevHostParent = deletedFiber.stateNode, "function" === typeof prevHostParent.componentWillUnmount && safelyCallComponentWillUnmount(deletedFiber, nearestMountedAncestor, prevHostParent));
				recursivelyTraverseDeletionEffects(finishedRoot, nearestMountedAncestor, deletedFiber);
				break;
			case 21:
				recursivelyTraverseDeletionEffects(finishedRoot, nearestMountedAncestor, deletedFiber);
				break;
			case 22:
				offscreenSubtreeWasHidden = (prevHostParent = offscreenSubtreeWasHidden) || null !== deletedFiber.memoizedState;
				recursivelyTraverseDeletionEffects(finishedRoot, nearestMountedAncestor, deletedFiber);
				offscreenSubtreeWasHidden = prevHostParent;
				break;
			default: recursivelyTraverseDeletionEffects(finishedRoot, nearestMountedAncestor, deletedFiber);
		}
	}
	function commitActivityHydrationCallbacks(finishedRoot, finishedWork) {
		if (null === finishedWork.memoizedState && (finishedRoot = finishedWork.alternate, null !== finishedRoot && (finishedRoot = finishedRoot.memoizedState, null !== finishedRoot))) {
			finishedRoot = finishedRoot.dehydrated;
			try {
				retryIfBlockedOn(finishedRoot);
			} catch (error) {
				captureCommitPhaseError(finishedWork, finishedWork.return, error);
			}
		}
	}
	function commitSuspenseHydrationCallbacks(finishedRoot, finishedWork) {
		if (null === finishedWork.memoizedState && (finishedRoot = finishedWork.alternate, null !== finishedRoot && (finishedRoot = finishedRoot.memoizedState, null !== finishedRoot && (finishedRoot = finishedRoot.dehydrated, null !== finishedRoot)))) try {
			retryIfBlockedOn(finishedRoot);
		} catch (error) {
			captureCommitPhaseError(finishedWork, finishedWork.return, error);
		}
	}
	function getRetryCache(finishedWork) {
		switch (finishedWork.tag) {
			case 31:
			case 13:
			case 19:
				var retryCache = finishedWork.stateNode;
				null === retryCache && (retryCache = finishedWork.stateNode = new PossiblyWeakSet());
				return retryCache;
			case 22: return finishedWork = finishedWork.stateNode, retryCache = finishedWork._retryCache, null === retryCache && (retryCache = finishedWork._retryCache = new PossiblyWeakSet()), retryCache;
			default: throw Error(formatProdErrorMessage(435, finishedWork.tag));
		}
	}
	function attachSuspenseRetryListeners(finishedWork, wakeables) {
		var retryCache = getRetryCache(finishedWork);
		wakeables.forEach(function(wakeable) {
			if (!retryCache.has(wakeable)) {
				retryCache.add(wakeable);
				var retry = resolveRetryWakeable.bind(null, finishedWork, wakeable);
				wakeable.then(retry, retry);
			}
		});
	}
	function recursivelyTraverseMutationEffects(root$jscomp$0, parentFiber) {
		var deletions = parentFiber.deletions;
		if (null !== deletions) for (var i = 0; i < deletions.length; i++) {
			var childToDelete = deletions[i], root = root$jscomp$0, returnFiber = parentFiber, parent = returnFiber;
			a: for (; null !== parent;) {
				switch (parent.tag) {
					case 27:
						if (isSingletonScope(parent.type)) {
							hostParent = parent.stateNode;
							hostParentIsContainer = !1;
							break a;
						}
						break;
					case 5:
						hostParent = parent.stateNode;
						hostParentIsContainer = !1;
						break a;
					case 3:
					case 4:
						hostParent = parent.stateNode.containerInfo;
						hostParentIsContainer = !0;
						break a;
				}
				parent = parent.return;
			}
			if (null === hostParent) throw Error(formatProdErrorMessage(160));
			commitDeletionEffectsOnFiber(root, returnFiber, childToDelete);
			hostParent = null;
			hostParentIsContainer = !1;
			root = childToDelete.alternate;
			null !== root && (root.return = null);
			childToDelete.return = null;
		}
		if (parentFiber.subtreeFlags & 13886) for (parentFiber = parentFiber.child; null !== parentFiber;) commitMutationEffectsOnFiber(parentFiber, root$jscomp$0), parentFiber = parentFiber.sibling;
	}
	var currentHoistableRoot = null;
	function commitMutationEffectsOnFiber(finishedWork, root) {
		var current = finishedWork.alternate, flags = finishedWork.flags;
		switch (finishedWork.tag) {
			case 0:
			case 11:
			case 14:
			case 15:
				recursivelyTraverseMutationEffects(root, finishedWork);
				commitReconciliationEffects(finishedWork);
				flags & 4 && (commitHookEffectListUnmount(3, finishedWork, finishedWork.return), commitHookEffectListMount(3, finishedWork), commitHookEffectListUnmount(5, finishedWork, finishedWork.return));
				break;
			case 1:
				recursivelyTraverseMutationEffects(root, finishedWork);
				commitReconciliationEffects(finishedWork);
				flags & 512 && (offscreenSubtreeWasHidden || null === current || safelyDetachRef(current, current.return));
				flags & 64 && offscreenSubtreeIsHidden && (finishedWork = finishedWork.updateQueue, null !== finishedWork && (flags = finishedWork.callbacks, null !== flags && (current = finishedWork.shared.hiddenCallbacks, finishedWork.shared.hiddenCallbacks = null === current ? flags : current.concat(flags))));
				break;
			case 26:
				var hoistableRoot = currentHoistableRoot;
				recursivelyTraverseMutationEffects(root, finishedWork);
				commitReconciliationEffects(finishedWork);
				flags & 512 && (offscreenSubtreeWasHidden || null === current || safelyDetachRef(current, current.return));
				if (flags & 4) {
					var currentResource = null !== current ? current.memoizedState : null;
					flags = finishedWork.memoizedState;
					if (null === current) if (null === flags) if (null === finishedWork.stateNode) {
						a: {
							flags = finishedWork.type;
							current = finishedWork.memoizedProps;
							hoistableRoot = hoistableRoot.ownerDocument || hoistableRoot;
							b: switch (flags) {
								case "title":
									currentResource = hoistableRoot.getElementsByTagName("title")[0];
									if (!currentResource || currentResource[internalHoistableMarker] || currentResource[internalInstanceKey] || "http://www.w3.org/2000/svg" === currentResource.namespaceURI || currentResource.hasAttribute("itemprop")) currentResource = hoistableRoot.createElement(flags), hoistableRoot.head.insertBefore(currentResource, hoistableRoot.querySelector("head > title"));
									setInitialProperties(currentResource, flags, current);
									currentResource[internalInstanceKey] = finishedWork;
									markNodeAsHoistable(currentResource);
									flags = currentResource;
									break a;
								case "link":
									var maybeNodes = getHydratableHoistableCache("link", "href", hoistableRoot).get(flags + (current.href || ""));
									if (maybeNodes) {
										for (var i = 0; i < maybeNodes.length; i++) if (currentResource = maybeNodes[i], currentResource.getAttribute("href") === (null == current.href || "" === current.href ? null : current.href) && currentResource.getAttribute("rel") === (null == current.rel ? null : current.rel) && currentResource.getAttribute("title") === (null == current.title ? null : current.title) && currentResource.getAttribute("crossorigin") === (null == current.crossOrigin ? null : current.crossOrigin)) {
											maybeNodes.splice(i, 1);
											break b;
										}
									}
									currentResource = hoistableRoot.createElement(flags);
									setInitialProperties(currentResource, flags, current);
									hoistableRoot.head.appendChild(currentResource);
									break;
								case "meta":
									if (maybeNodes = getHydratableHoistableCache("meta", "content", hoistableRoot).get(flags + (current.content || ""))) {
										for (i = 0; i < maybeNodes.length; i++) if (currentResource = maybeNodes[i], currentResource.getAttribute("content") === (null == current.content ? null : "" + current.content) && currentResource.getAttribute("name") === (null == current.name ? null : current.name) && currentResource.getAttribute("property") === (null == current.property ? null : current.property) && currentResource.getAttribute("http-equiv") === (null == current.httpEquiv ? null : current.httpEquiv) && currentResource.getAttribute("charset") === (null == current.charSet ? null : current.charSet)) {
											maybeNodes.splice(i, 1);
											break b;
										}
									}
									currentResource = hoistableRoot.createElement(flags);
									setInitialProperties(currentResource, flags, current);
									hoistableRoot.head.appendChild(currentResource);
									break;
								default: throw Error(formatProdErrorMessage(468, flags));
							}
							currentResource[internalInstanceKey] = finishedWork;
							markNodeAsHoistable(currentResource);
							flags = currentResource;
						}
						finishedWork.stateNode = flags;
					} else mountHoistable(hoistableRoot, finishedWork.type, finishedWork.stateNode);
					else finishedWork.stateNode = acquireResource(hoistableRoot, flags, finishedWork.memoizedProps);
					else currentResource !== flags ? (null === currentResource ? null !== current.stateNode && (current = current.stateNode, current.parentNode.removeChild(current)) : currentResource.count--, null === flags ? mountHoistable(hoistableRoot, finishedWork.type, finishedWork.stateNode) : acquireResource(hoistableRoot, flags, finishedWork.memoizedProps)) : null === flags && null !== finishedWork.stateNode && commitHostUpdate(finishedWork, finishedWork.memoizedProps, current.memoizedProps);
				}
				break;
			case 27:
				recursivelyTraverseMutationEffects(root, finishedWork);
				commitReconciliationEffects(finishedWork);
				flags & 512 && (offscreenSubtreeWasHidden || null === current || safelyDetachRef(current, current.return));
				null !== current && flags & 4 && commitHostUpdate(finishedWork, finishedWork.memoizedProps, current.memoizedProps);
				break;
			case 5:
				recursivelyTraverseMutationEffects(root, finishedWork);
				commitReconciliationEffects(finishedWork);
				flags & 512 && (offscreenSubtreeWasHidden || null === current || safelyDetachRef(current, current.return));
				if (finishedWork.flags & 32) {
					hoistableRoot = finishedWork.stateNode;
					try {
						setTextContent(hoistableRoot, "");
					} catch (error) {
						captureCommitPhaseError(finishedWork, finishedWork.return, error);
					}
				}
				flags & 4 && null != finishedWork.stateNode && (hoistableRoot = finishedWork.memoizedProps, commitHostUpdate(finishedWork, hoistableRoot, null !== current ? current.memoizedProps : hoistableRoot));
				flags & 1024 && (needsFormReset = !0);
				break;
			case 6:
				recursivelyTraverseMutationEffects(root, finishedWork);
				commitReconciliationEffects(finishedWork);
				if (flags & 4) {
					if (null === finishedWork.stateNode) throw Error(formatProdErrorMessage(162));
					flags = finishedWork.memoizedProps;
					current = finishedWork.stateNode;
					try {
						current.nodeValue = flags;
					} catch (error) {
						captureCommitPhaseError(finishedWork, finishedWork.return, error);
					}
				}
				break;
			case 3:
				tagCaches = null;
				hoistableRoot = currentHoistableRoot;
				currentHoistableRoot = getHoistableRoot(root.containerInfo);
				recursivelyTraverseMutationEffects(root, finishedWork);
				currentHoistableRoot = hoistableRoot;
				commitReconciliationEffects(finishedWork);
				if (flags & 4 && null !== current && current.memoizedState.isDehydrated) try {
					retryIfBlockedOn(root.containerInfo);
				} catch (error) {
					captureCommitPhaseError(finishedWork, finishedWork.return, error);
				}
				needsFormReset && (needsFormReset = !1, recursivelyResetForms(finishedWork));
				break;
			case 4:
				flags = currentHoistableRoot;
				currentHoistableRoot = getHoistableRoot(finishedWork.stateNode.containerInfo);
				recursivelyTraverseMutationEffects(root, finishedWork);
				commitReconciliationEffects(finishedWork);
				currentHoistableRoot = flags;
				break;
			case 12:
				recursivelyTraverseMutationEffects(root, finishedWork);
				commitReconciliationEffects(finishedWork);
				break;
			case 31:
				recursivelyTraverseMutationEffects(root, finishedWork);
				commitReconciliationEffects(finishedWork);
				flags & 4 && (flags = finishedWork.updateQueue, null !== flags && (finishedWork.updateQueue = null, attachSuspenseRetryListeners(finishedWork, flags)));
				break;
			case 13:
				recursivelyTraverseMutationEffects(root, finishedWork);
				commitReconciliationEffects(finishedWork);
				finishedWork.child.flags & 8192 && null !== finishedWork.memoizedState !== (null !== current && null !== current.memoizedState) && (globalMostRecentFallbackTime = now());
				flags & 4 && (flags = finishedWork.updateQueue, null !== flags && (finishedWork.updateQueue = null, attachSuspenseRetryListeners(finishedWork, flags)));
				break;
			case 22:
				hoistableRoot = null !== finishedWork.memoizedState;
				var wasHidden = null !== current && null !== current.memoizedState, prevOffscreenSubtreeIsHidden = offscreenSubtreeIsHidden, prevOffscreenSubtreeWasHidden = offscreenSubtreeWasHidden;
				offscreenSubtreeIsHidden = prevOffscreenSubtreeIsHidden || hoistableRoot;
				offscreenSubtreeWasHidden = prevOffscreenSubtreeWasHidden || wasHidden;
				recursivelyTraverseMutationEffects(root, finishedWork);
				offscreenSubtreeWasHidden = prevOffscreenSubtreeWasHidden;
				offscreenSubtreeIsHidden = prevOffscreenSubtreeIsHidden;
				commitReconciliationEffects(finishedWork);
				if (flags & 8192) a: for (root = finishedWork.stateNode, root._visibility = hoistableRoot ? root._visibility & -2 : root._visibility | 1, hoistableRoot && (null === current || wasHidden || offscreenSubtreeIsHidden || offscreenSubtreeWasHidden || recursivelyTraverseDisappearLayoutEffects(finishedWork)), current = null, root = finishedWork;;) {
					if (5 === root.tag || 26 === root.tag) {
						if (null === current) {
							wasHidden = current = root;
							try {
								if (currentResource = wasHidden.stateNode, hoistableRoot) maybeNodes = currentResource.style, "function" === typeof maybeNodes.setProperty ? maybeNodes.setProperty("display", "none", "important") : maybeNodes.display = "none";
								else {
									i = wasHidden.stateNode;
									var styleProp = wasHidden.memoizedProps.style, display = void 0 !== styleProp && null !== styleProp && styleProp.hasOwnProperty("display") ? styleProp.display : null;
									i.style.display = null == display || "boolean" === typeof display ? "" : ("" + display).trim();
								}
							} catch (error) {
								captureCommitPhaseError(wasHidden, wasHidden.return, error);
							}
						}
					} else if (6 === root.tag) {
						if (null === current) {
							wasHidden = root;
							try {
								wasHidden.stateNode.nodeValue = hoistableRoot ? "" : wasHidden.memoizedProps;
							} catch (error) {
								captureCommitPhaseError(wasHidden, wasHidden.return, error);
							}
						}
					} else if (18 === root.tag) {
						if (null === current) {
							wasHidden = root;
							try {
								var instance = wasHidden.stateNode;
								hoistableRoot ? hideOrUnhideDehydratedBoundary(instance, !0) : hideOrUnhideDehydratedBoundary(wasHidden.stateNode, !1);
							} catch (error) {
								captureCommitPhaseError(wasHidden, wasHidden.return, error);
							}
						}
					} else if ((22 !== root.tag && 23 !== root.tag || null === root.memoizedState || root === finishedWork) && null !== root.child) {
						root.child.return = root;
						root = root.child;
						continue;
					}
					if (root === finishedWork) break a;
					for (; null === root.sibling;) {
						if (null === root.return || root.return === finishedWork) break a;
						current === root && (current = null);
						root = root.return;
					}
					current === root && (current = null);
					root.sibling.return = root.return;
					root = root.sibling;
				}
				flags & 4 && (flags = finishedWork.updateQueue, null !== flags && (current = flags.retryQueue, null !== current && (flags.retryQueue = null, attachSuspenseRetryListeners(finishedWork, current))));
				break;
			case 19:
				recursivelyTraverseMutationEffects(root, finishedWork);
				commitReconciliationEffects(finishedWork);
				flags & 4 && (flags = finishedWork.updateQueue, null !== flags && (finishedWork.updateQueue = null, attachSuspenseRetryListeners(finishedWork, flags)));
				break;
			case 30: break;
			case 21: break;
			default: recursivelyTraverseMutationEffects(root, finishedWork), commitReconciliationEffects(finishedWork);
		}
	}
	function commitReconciliationEffects(finishedWork) {
		var flags = finishedWork.flags;
		if (flags & 2) {
			try {
				for (var hostParentFiber, parentFiber = finishedWork.return; null !== parentFiber;) {
					if (isHostParent(parentFiber)) {
						hostParentFiber = parentFiber;
						break;
					}
					parentFiber = parentFiber.return;
				}
				if (null == hostParentFiber) throw Error(formatProdErrorMessage(160));
				switch (hostParentFiber.tag) {
					case 27:
						var parent = hostParentFiber.stateNode;
						insertOrAppendPlacementNode(finishedWork, getHostSibling(finishedWork), parent);
						break;
					case 5:
						var parent$141 = hostParentFiber.stateNode;
						hostParentFiber.flags & 32 && (setTextContent(parent$141, ""), hostParentFiber.flags &= -33);
						insertOrAppendPlacementNode(finishedWork, getHostSibling(finishedWork), parent$141);
						break;
					case 3:
					case 4:
						var parent$143 = hostParentFiber.stateNode.containerInfo;
						insertOrAppendPlacementNodeIntoContainer(finishedWork, getHostSibling(finishedWork), parent$143);
						break;
					default: throw Error(formatProdErrorMessage(161));
				}
			} catch (error) {
				captureCommitPhaseError(finishedWork, finishedWork.return, error);
			}
			finishedWork.flags &= -3;
		}
		flags & 4096 && (finishedWork.flags &= -4097);
	}
	function recursivelyResetForms(parentFiber) {
		if (parentFiber.subtreeFlags & 1024) for (parentFiber = parentFiber.child; null !== parentFiber;) {
			var fiber = parentFiber;
			recursivelyResetForms(fiber);
			5 === fiber.tag && fiber.flags & 1024 && fiber.stateNode.reset();
			parentFiber = parentFiber.sibling;
		}
	}
	function recursivelyTraverseLayoutEffects(root, parentFiber) {
		if (parentFiber.subtreeFlags & 8772) for (parentFiber = parentFiber.child; null !== parentFiber;) commitLayoutEffectOnFiber(root, parentFiber.alternate, parentFiber), parentFiber = parentFiber.sibling;
	}
	function recursivelyTraverseDisappearLayoutEffects(parentFiber) {
		for (parentFiber = parentFiber.child; null !== parentFiber;) {
			var finishedWork = parentFiber;
			switch (finishedWork.tag) {
				case 0:
				case 11:
				case 14:
				case 15:
					commitHookEffectListUnmount(4, finishedWork, finishedWork.return);
					recursivelyTraverseDisappearLayoutEffects(finishedWork);
					break;
				case 1:
					safelyDetachRef(finishedWork, finishedWork.return);
					var instance = finishedWork.stateNode;
					"function" === typeof instance.componentWillUnmount && safelyCallComponentWillUnmount(finishedWork, finishedWork.return, instance);
					recursivelyTraverseDisappearLayoutEffects(finishedWork);
					break;
				case 27: releaseSingletonInstance(finishedWork.stateNode);
				case 26:
				case 5:
					safelyDetachRef(finishedWork, finishedWork.return);
					recursivelyTraverseDisappearLayoutEffects(finishedWork);
					break;
				case 22:
					null === finishedWork.memoizedState && recursivelyTraverseDisappearLayoutEffects(finishedWork);
					break;
				case 30:
					recursivelyTraverseDisappearLayoutEffects(finishedWork);
					break;
				default: recursivelyTraverseDisappearLayoutEffects(finishedWork);
			}
			parentFiber = parentFiber.sibling;
		}
	}
	function recursivelyTraverseReappearLayoutEffects(finishedRoot$jscomp$0, parentFiber, includeWorkInProgressEffects) {
		includeWorkInProgressEffects = includeWorkInProgressEffects && 0 !== (parentFiber.subtreeFlags & 8772);
		for (parentFiber = parentFiber.child; null !== parentFiber;) {
			var current = parentFiber.alternate, finishedRoot = finishedRoot$jscomp$0, finishedWork = parentFiber, flags = finishedWork.flags;
			switch (finishedWork.tag) {
				case 0:
				case 11:
				case 15:
					recursivelyTraverseReappearLayoutEffects(finishedRoot, finishedWork, includeWorkInProgressEffects);
					commitHookEffectListMount(4, finishedWork);
					break;
				case 1:
					recursivelyTraverseReappearLayoutEffects(finishedRoot, finishedWork, includeWorkInProgressEffects);
					current = finishedWork;
					finishedRoot = current.stateNode;
					if ("function" === typeof finishedRoot.componentDidMount) try {
						finishedRoot.componentDidMount();
					} catch (error) {
						captureCommitPhaseError(current, current.return, error);
					}
					current = finishedWork;
					finishedRoot = current.updateQueue;
					if (null !== finishedRoot) {
						var instance = current.stateNode;
						try {
							var hiddenCallbacks = finishedRoot.shared.hiddenCallbacks;
							if (null !== hiddenCallbacks) for (finishedRoot.shared.hiddenCallbacks = null, finishedRoot = 0; finishedRoot < hiddenCallbacks.length; finishedRoot++) callCallback(hiddenCallbacks[finishedRoot], instance);
						} catch (error) {
							captureCommitPhaseError(current, current.return, error);
						}
					}
					includeWorkInProgressEffects && flags & 64 && commitClassCallbacks(finishedWork);
					safelyAttachRef(finishedWork, finishedWork.return);
					break;
				case 27: commitHostSingletonAcquisition(finishedWork);
				case 26:
				case 5:
					recursivelyTraverseReappearLayoutEffects(finishedRoot, finishedWork, includeWorkInProgressEffects);
					includeWorkInProgressEffects && null === current && flags & 4 && commitHostMount(finishedWork);
					safelyAttachRef(finishedWork, finishedWork.return);
					break;
				case 12:
					recursivelyTraverseReappearLayoutEffects(finishedRoot, finishedWork, includeWorkInProgressEffects);
					break;
				case 31:
					recursivelyTraverseReappearLayoutEffects(finishedRoot, finishedWork, includeWorkInProgressEffects);
					includeWorkInProgressEffects && flags & 4 && commitActivityHydrationCallbacks(finishedRoot, finishedWork);
					break;
				case 13:
					recursivelyTraverseReappearLayoutEffects(finishedRoot, finishedWork, includeWorkInProgressEffects);
					includeWorkInProgressEffects && flags & 4 && commitSuspenseHydrationCallbacks(finishedRoot, finishedWork);
					break;
				case 22:
					null === finishedWork.memoizedState && recursivelyTraverseReappearLayoutEffects(finishedRoot, finishedWork, includeWorkInProgressEffects);
					safelyAttachRef(finishedWork, finishedWork.return);
					break;
				case 30: break;
				default: recursivelyTraverseReappearLayoutEffects(finishedRoot, finishedWork, includeWorkInProgressEffects);
			}
			parentFiber = parentFiber.sibling;
		}
	}
	function commitOffscreenPassiveMountEffects(current, finishedWork) {
		var previousCache = null;
		null !== current && null !== current.memoizedState && null !== current.memoizedState.cachePool && (previousCache = current.memoizedState.cachePool.pool);
		current = null;
		null !== finishedWork.memoizedState && null !== finishedWork.memoizedState.cachePool && (current = finishedWork.memoizedState.cachePool.pool);
		current !== previousCache && (null != current && current.refCount++, null != previousCache && releaseCache(previousCache));
	}
	function commitCachePassiveMountEffect(current, finishedWork) {
		current = null;
		null !== finishedWork.alternate && (current = finishedWork.alternate.memoizedState.cache);
		finishedWork = finishedWork.memoizedState.cache;
		finishedWork !== current && (finishedWork.refCount++, null != current && releaseCache(current));
	}
	function recursivelyTraversePassiveMountEffects(root, parentFiber, committedLanes, committedTransitions) {
		if (parentFiber.subtreeFlags & 10256) for (parentFiber = parentFiber.child; null !== parentFiber;) commitPassiveMountOnFiber(root, parentFiber, committedLanes, committedTransitions), parentFiber = parentFiber.sibling;
	}
	function commitPassiveMountOnFiber(finishedRoot, finishedWork, committedLanes, committedTransitions) {
		var flags = finishedWork.flags;
		switch (finishedWork.tag) {
			case 0:
			case 11:
			case 15:
				recursivelyTraversePassiveMountEffects(finishedRoot, finishedWork, committedLanes, committedTransitions);
				flags & 2048 && commitHookEffectListMount(9, finishedWork);
				break;
			case 1:
				recursivelyTraversePassiveMountEffects(finishedRoot, finishedWork, committedLanes, committedTransitions);
				break;
			case 3:
				recursivelyTraversePassiveMountEffects(finishedRoot, finishedWork, committedLanes, committedTransitions);
				flags & 2048 && (finishedRoot = null, null !== finishedWork.alternate && (finishedRoot = finishedWork.alternate.memoizedState.cache), finishedWork = finishedWork.memoizedState.cache, finishedWork !== finishedRoot && (finishedWork.refCount++, null != finishedRoot && releaseCache(finishedRoot)));
				break;
			case 12:
				if (flags & 2048) {
					recursivelyTraversePassiveMountEffects(finishedRoot, finishedWork, committedLanes, committedTransitions);
					finishedRoot = finishedWork.stateNode;
					try {
						var _finishedWork$memoize2 = finishedWork.memoizedProps, id = _finishedWork$memoize2.id, onPostCommit = _finishedWork$memoize2.onPostCommit;
						"function" === typeof onPostCommit && onPostCommit(id, null === finishedWork.alternate ? "mount" : "update", finishedRoot.passiveEffectDuration, -0);
					} catch (error) {
						captureCommitPhaseError(finishedWork, finishedWork.return, error);
					}
				} else recursivelyTraversePassiveMountEffects(finishedRoot, finishedWork, committedLanes, committedTransitions);
				break;
			case 31:
				recursivelyTraversePassiveMountEffects(finishedRoot, finishedWork, committedLanes, committedTransitions);
				break;
			case 13:
				recursivelyTraversePassiveMountEffects(finishedRoot, finishedWork, committedLanes, committedTransitions);
				break;
			case 23: break;
			case 22:
				_finishedWork$memoize2 = finishedWork.stateNode;
				id = finishedWork.alternate;
				null !== finishedWork.memoizedState ? _finishedWork$memoize2._visibility & 2 ? recursivelyTraversePassiveMountEffects(finishedRoot, finishedWork, committedLanes, committedTransitions) : recursivelyTraverseAtomicPassiveEffects(finishedRoot, finishedWork) : _finishedWork$memoize2._visibility & 2 ? recursivelyTraversePassiveMountEffects(finishedRoot, finishedWork, committedLanes, committedTransitions) : (_finishedWork$memoize2._visibility |= 2, recursivelyTraverseReconnectPassiveEffects(finishedRoot, finishedWork, committedLanes, committedTransitions, 0 !== (finishedWork.subtreeFlags & 10256) || !1));
				flags & 2048 && commitOffscreenPassiveMountEffects(id, finishedWork);
				break;
			case 24:
				recursivelyTraversePassiveMountEffects(finishedRoot, finishedWork, committedLanes, committedTransitions);
				flags & 2048 && commitCachePassiveMountEffect(finishedWork.alternate, finishedWork);
				break;
			default: recursivelyTraversePassiveMountEffects(finishedRoot, finishedWork, committedLanes, committedTransitions);
		}
	}
	function recursivelyTraverseReconnectPassiveEffects(finishedRoot$jscomp$0, parentFiber, committedLanes$jscomp$0, committedTransitions$jscomp$0, includeWorkInProgressEffects) {
		includeWorkInProgressEffects = includeWorkInProgressEffects && (0 !== (parentFiber.subtreeFlags & 10256) || !1);
		for (parentFiber = parentFiber.child; null !== parentFiber;) {
			var finishedRoot = finishedRoot$jscomp$0, finishedWork = parentFiber, committedLanes = committedLanes$jscomp$0, committedTransitions = committedTransitions$jscomp$0, flags = finishedWork.flags;
			switch (finishedWork.tag) {
				case 0:
				case 11:
				case 15:
					recursivelyTraverseReconnectPassiveEffects(finishedRoot, finishedWork, committedLanes, committedTransitions, includeWorkInProgressEffects);
					commitHookEffectListMount(8, finishedWork);
					break;
				case 23: break;
				case 22:
					var instance = finishedWork.stateNode;
					null !== finishedWork.memoizedState ? instance._visibility & 2 ? recursivelyTraverseReconnectPassiveEffects(finishedRoot, finishedWork, committedLanes, committedTransitions, includeWorkInProgressEffects) : recursivelyTraverseAtomicPassiveEffects(finishedRoot, finishedWork) : (instance._visibility |= 2, recursivelyTraverseReconnectPassiveEffects(finishedRoot, finishedWork, committedLanes, committedTransitions, includeWorkInProgressEffects));
					includeWorkInProgressEffects && flags & 2048 && commitOffscreenPassiveMountEffects(finishedWork.alternate, finishedWork);
					break;
				case 24:
					recursivelyTraverseReconnectPassiveEffects(finishedRoot, finishedWork, committedLanes, committedTransitions, includeWorkInProgressEffects);
					includeWorkInProgressEffects && flags & 2048 && commitCachePassiveMountEffect(finishedWork.alternate, finishedWork);
					break;
				default: recursivelyTraverseReconnectPassiveEffects(finishedRoot, finishedWork, committedLanes, committedTransitions, includeWorkInProgressEffects);
			}
			parentFiber = parentFiber.sibling;
		}
	}
	function recursivelyTraverseAtomicPassiveEffects(finishedRoot$jscomp$0, parentFiber) {
		if (parentFiber.subtreeFlags & 10256) for (parentFiber = parentFiber.child; null !== parentFiber;) {
			var finishedRoot = finishedRoot$jscomp$0, finishedWork = parentFiber, flags = finishedWork.flags;
			switch (finishedWork.tag) {
				case 22:
					recursivelyTraverseAtomicPassiveEffects(finishedRoot, finishedWork);
					flags & 2048 && commitOffscreenPassiveMountEffects(finishedWork.alternate, finishedWork);
					break;
				case 24:
					recursivelyTraverseAtomicPassiveEffects(finishedRoot, finishedWork);
					flags & 2048 && commitCachePassiveMountEffect(finishedWork.alternate, finishedWork);
					break;
				default: recursivelyTraverseAtomicPassiveEffects(finishedRoot, finishedWork);
			}
			parentFiber = parentFiber.sibling;
		}
	}
	var suspenseyCommitFlag = 8192;
	function recursivelyAccumulateSuspenseyCommit(parentFiber, committedLanes, suspendedState) {
		if (parentFiber.subtreeFlags & suspenseyCommitFlag) for (parentFiber = parentFiber.child; null !== parentFiber;) accumulateSuspenseyCommitOnFiber(parentFiber, committedLanes, suspendedState), parentFiber = parentFiber.sibling;
	}
	function accumulateSuspenseyCommitOnFiber(fiber, committedLanes, suspendedState) {
		switch (fiber.tag) {
			case 26:
				recursivelyAccumulateSuspenseyCommit(fiber, committedLanes, suspendedState);
				fiber.flags & suspenseyCommitFlag && null !== fiber.memoizedState && suspendResource(suspendedState, currentHoistableRoot, fiber.memoizedState, fiber.memoizedProps);
				break;
			case 5:
				recursivelyAccumulateSuspenseyCommit(fiber, committedLanes, suspendedState);
				break;
			case 3:
			case 4:
				var previousHoistableRoot = currentHoistableRoot;
				currentHoistableRoot = getHoistableRoot(fiber.stateNode.containerInfo);
				recursivelyAccumulateSuspenseyCommit(fiber, committedLanes, suspendedState);
				currentHoistableRoot = previousHoistableRoot;
				break;
			case 22:
				null === fiber.memoizedState && (previousHoistableRoot = fiber.alternate, null !== previousHoistableRoot && null !== previousHoistableRoot.memoizedState ? (previousHoistableRoot = suspenseyCommitFlag, suspenseyCommitFlag = 16777216, recursivelyAccumulateSuspenseyCommit(fiber, committedLanes, suspendedState), suspenseyCommitFlag = previousHoistableRoot) : recursivelyAccumulateSuspenseyCommit(fiber, committedLanes, suspendedState));
				break;
			default: recursivelyAccumulateSuspenseyCommit(fiber, committedLanes, suspendedState);
		}
	}
	function detachAlternateSiblings(parentFiber) {
		var previousFiber = parentFiber.alternate;
		if (null !== previousFiber && (parentFiber = previousFiber.child, null !== parentFiber)) {
			previousFiber.child = null;
			do
				previousFiber = parentFiber.sibling, parentFiber.sibling = null, parentFiber = previousFiber;
			while (null !== parentFiber);
		}
	}
	function recursivelyTraversePassiveUnmountEffects(parentFiber) {
		var deletions = parentFiber.deletions;
		if (0 !== (parentFiber.flags & 16)) {
			if (null !== deletions) for (var i = 0; i < deletions.length; i++) {
				var childToDelete = deletions[i];
				nextEffect = childToDelete;
				commitPassiveUnmountEffectsInsideOfDeletedTree_begin(childToDelete, parentFiber);
			}
			detachAlternateSiblings(parentFiber);
		}
		if (parentFiber.subtreeFlags & 10256) for (parentFiber = parentFiber.child; null !== parentFiber;) commitPassiveUnmountOnFiber(parentFiber), parentFiber = parentFiber.sibling;
	}
	function commitPassiveUnmountOnFiber(finishedWork) {
		switch (finishedWork.tag) {
			case 0:
			case 11:
			case 15:
				recursivelyTraversePassiveUnmountEffects(finishedWork);
				finishedWork.flags & 2048 && commitHookEffectListUnmount(9, finishedWork, finishedWork.return);
				break;
			case 3:
				recursivelyTraversePassiveUnmountEffects(finishedWork);
				break;
			case 12:
				recursivelyTraversePassiveUnmountEffects(finishedWork);
				break;
			case 22:
				var instance = finishedWork.stateNode;
				null !== finishedWork.memoizedState && instance._visibility & 2 && (null === finishedWork.return || 13 !== finishedWork.return.tag) ? (instance._visibility &= -3, recursivelyTraverseDisconnectPassiveEffects(finishedWork)) : recursivelyTraversePassiveUnmountEffects(finishedWork);
				break;
			default: recursivelyTraversePassiveUnmountEffects(finishedWork);
		}
	}
	function recursivelyTraverseDisconnectPassiveEffects(parentFiber) {
		var deletions = parentFiber.deletions;
		if (0 !== (parentFiber.flags & 16)) {
			if (null !== deletions) for (var i = 0; i < deletions.length; i++) {
				var childToDelete = deletions[i];
				nextEffect = childToDelete;
				commitPassiveUnmountEffectsInsideOfDeletedTree_begin(childToDelete, parentFiber);
			}
			detachAlternateSiblings(parentFiber);
		}
		for (parentFiber = parentFiber.child; null !== parentFiber;) {
			deletions = parentFiber;
			switch (deletions.tag) {
				case 0:
				case 11:
				case 15:
					commitHookEffectListUnmount(8, deletions, deletions.return);
					recursivelyTraverseDisconnectPassiveEffects(deletions);
					break;
				case 22:
					i = deletions.stateNode;
					i._visibility & 2 && (i._visibility &= -3, recursivelyTraverseDisconnectPassiveEffects(deletions));
					break;
				default: recursivelyTraverseDisconnectPassiveEffects(deletions);
			}
			parentFiber = parentFiber.sibling;
		}
	}
	function commitPassiveUnmountEffectsInsideOfDeletedTree_begin(deletedSubtreeRoot, nearestMountedAncestor) {
		for (; null !== nextEffect;) {
			var fiber = nextEffect;
			switch (fiber.tag) {
				case 0:
				case 11:
				case 15:
					commitHookEffectListUnmount(8, fiber, nearestMountedAncestor);
					break;
				case 23:
				case 22:
					if (null !== fiber.memoizedState && null !== fiber.memoizedState.cachePool) {
						var cache = fiber.memoizedState.cachePool.pool;
						null != cache && cache.refCount++;
					}
					break;
				case 24: releaseCache(fiber.memoizedState.cache);
			}
			cache = fiber.child;
			if (null !== cache) cache.return = fiber, nextEffect = cache;
			else a: for (fiber = deletedSubtreeRoot; null !== nextEffect;) {
				cache = nextEffect;
				var sibling = cache.sibling, returnFiber = cache.return;
				detachFiberAfterEffects(cache);
				if (cache === fiber) {
					nextEffect = null;
					break a;
				}
				if (null !== sibling) {
					sibling.return = returnFiber;
					nextEffect = sibling;
					break a;
				}
				nextEffect = returnFiber;
			}
		}
	}
	var DefaultAsyncDispatcher = {
		getCacheForType: function(resourceType) {
			var cache = readContext(CacheContext), cacheForType = cache.data.get(resourceType);
			void 0 === cacheForType && (cacheForType = resourceType(), cache.data.set(resourceType, cacheForType));
			return cacheForType;
		},
		cacheSignal: function() {
			return readContext(CacheContext).controller.signal;
		}
	}, PossiblyWeakMap = "function" === typeof WeakMap ? WeakMap : Map, executionContext = 0, workInProgressRoot = null, workInProgress = null, workInProgressRootRenderLanes = 0, workInProgressSuspendedReason = 0, workInProgressThrownValue = null, workInProgressRootDidSkipSuspendedSiblings = !1, workInProgressRootIsPrerendering = !1, workInProgressRootDidAttachPingListener = !1, entangledRenderLanes = 0, workInProgressRootExitStatus = 0, workInProgressRootSkippedLanes = 0, workInProgressRootInterleavedUpdatedLanes = 0, workInProgressRootPingedLanes = 0, workInProgressDeferredLane = 0, workInProgressSuspendedRetryLanes = 0, workInProgressRootConcurrentErrors = null, workInProgressRootRecoverableErrors = null, workInProgressRootDidIncludeRecursiveRenderUpdate = !1, globalMostRecentFallbackTime = 0, globalMostRecentTransitionTime = 0, workInProgressRootRenderTargetTime = Infinity, workInProgressTransitions = null, legacyErrorBoundariesThatAlreadyFailed = null, pendingEffectsStatus = 0, pendingEffectsRoot = null, pendingFinishedWork = null, pendingEffectsLanes = 0, pendingEffectsRemainingLanes = 0, pendingPassiveTransitions = null, pendingRecoverableErrors = null, nestedUpdateCount = 0, rootWithNestedUpdates = null;
	function requestUpdateLane() {
		return 0 !== (executionContext & 2) && 0 !== workInProgressRootRenderLanes ? workInProgressRootRenderLanes & -workInProgressRootRenderLanes : null !== ReactSharedInternals.T ? requestTransitionLane() : resolveUpdatePriority();
	}
	function requestDeferredLane() {
		if (0 === workInProgressDeferredLane) if (0 === (workInProgressRootRenderLanes & 536870912) || isHydrating) {
			var lane = nextTransitionDeferredLane;
			nextTransitionDeferredLane <<= 1;
			0 === (nextTransitionDeferredLane & 3932160) && (nextTransitionDeferredLane = 262144);
			workInProgressDeferredLane = lane;
		} else workInProgressDeferredLane = 536870912;
		lane = suspenseHandlerStackCursor.current;
		null !== lane && (lane.flags |= 32);
		return workInProgressDeferredLane;
	}
	function scheduleUpdateOnFiber(root, fiber, lane) {
		if (root === workInProgressRoot && (2 === workInProgressSuspendedReason || 9 === workInProgressSuspendedReason) || null !== root.cancelPendingCommit) prepareFreshStack(root, 0), markRootSuspended(root, workInProgressRootRenderLanes, workInProgressDeferredLane, !1);
		markRootUpdated$1(root, lane);
		if (0 === (executionContext & 2) || root !== workInProgressRoot) root === workInProgressRoot && (0 === (executionContext & 2) && (workInProgressRootInterleavedUpdatedLanes |= lane), 4 === workInProgressRootExitStatus && markRootSuspended(root, workInProgressRootRenderLanes, workInProgressDeferredLane, !1)), ensureRootIsScheduled(root);
	}
	function performWorkOnRoot(root$jscomp$0, lanes, forceSync) {
		if (0 !== (executionContext & 6)) throw Error(formatProdErrorMessage(327));
		var shouldTimeSlice = !forceSync && 0 === (lanes & 127) && 0 === (lanes & root$jscomp$0.expiredLanes) || checkIfRootIsPrerendering(root$jscomp$0, lanes), exitStatus = shouldTimeSlice ? renderRootConcurrent(root$jscomp$0, lanes) : renderRootSync(root$jscomp$0, lanes, !0), renderWasConcurrent = shouldTimeSlice;
		do {
			if (0 === exitStatus) {
				workInProgressRootIsPrerendering && !shouldTimeSlice && markRootSuspended(root$jscomp$0, lanes, 0, !1);
				break;
			} else {
				forceSync = root$jscomp$0.current.alternate;
				if (renderWasConcurrent && !isRenderConsistentWithExternalStores(forceSync)) {
					exitStatus = renderRootSync(root$jscomp$0, lanes, !1);
					renderWasConcurrent = !1;
					continue;
				}
				if (2 === exitStatus) {
					renderWasConcurrent = lanes;
					if (root$jscomp$0.errorRecoveryDisabledLanes & renderWasConcurrent) var JSCompiler_inline_result = 0;
					else JSCompiler_inline_result = root$jscomp$0.pendingLanes & -536870913, JSCompiler_inline_result = 0 !== JSCompiler_inline_result ? JSCompiler_inline_result : JSCompiler_inline_result & 536870912 ? 536870912 : 0;
					if (0 !== JSCompiler_inline_result) {
						lanes = JSCompiler_inline_result;
						a: {
							var root = root$jscomp$0;
							exitStatus = workInProgressRootConcurrentErrors;
							var wasRootDehydrated = root.current.memoizedState.isDehydrated;
							wasRootDehydrated && (prepareFreshStack(root, JSCompiler_inline_result).flags |= 256);
							JSCompiler_inline_result = renderRootSync(root, JSCompiler_inline_result, !1);
							if (2 !== JSCompiler_inline_result) {
								if (workInProgressRootDidAttachPingListener && !wasRootDehydrated) {
									root.errorRecoveryDisabledLanes |= renderWasConcurrent;
									workInProgressRootInterleavedUpdatedLanes |= renderWasConcurrent;
									exitStatus = 4;
									break a;
								}
								renderWasConcurrent = workInProgressRootRecoverableErrors;
								workInProgressRootRecoverableErrors = exitStatus;
								null !== renderWasConcurrent && (null === workInProgressRootRecoverableErrors ? workInProgressRootRecoverableErrors = renderWasConcurrent : workInProgressRootRecoverableErrors.push.apply(workInProgressRootRecoverableErrors, renderWasConcurrent));
							}
							exitStatus = JSCompiler_inline_result;
						}
						renderWasConcurrent = !1;
						if (2 !== exitStatus) continue;
					}
				}
				if (1 === exitStatus) {
					prepareFreshStack(root$jscomp$0, 0);
					markRootSuspended(root$jscomp$0, lanes, 0, !0);
					break;
				}
				a: {
					shouldTimeSlice = root$jscomp$0;
					renderWasConcurrent = exitStatus;
					switch (renderWasConcurrent) {
						case 0:
						case 1: throw Error(formatProdErrorMessage(345));
						case 4: if ((lanes & 4194048) !== lanes) break;
						case 6:
							markRootSuspended(shouldTimeSlice, lanes, workInProgressDeferredLane, !workInProgressRootDidSkipSuspendedSiblings);
							break a;
						case 2:
							workInProgressRootRecoverableErrors = null;
							break;
						case 3:
						case 5: break;
						default: throw Error(formatProdErrorMessage(329));
					}
					if ((lanes & 62914560) === lanes && (exitStatus = globalMostRecentFallbackTime + 300 - now(), 10 < exitStatus)) {
						markRootSuspended(shouldTimeSlice, lanes, workInProgressDeferredLane, !workInProgressRootDidSkipSuspendedSiblings);
						if (0 !== getNextLanes(shouldTimeSlice, 0, !0)) break a;
						pendingEffectsLanes = lanes;
						shouldTimeSlice.timeoutHandle = scheduleTimeout(commitRootWhenReady.bind(null, shouldTimeSlice, forceSync, workInProgressRootRecoverableErrors, workInProgressTransitions, workInProgressRootDidIncludeRecursiveRenderUpdate, lanes, workInProgressDeferredLane, workInProgressRootInterleavedUpdatedLanes, workInProgressSuspendedRetryLanes, workInProgressRootDidSkipSuspendedSiblings, renderWasConcurrent, "Throttled", -0, 0), exitStatus);
						break a;
					}
					commitRootWhenReady(shouldTimeSlice, forceSync, workInProgressRootRecoverableErrors, workInProgressTransitions, workInProgressRootDidIncludeRecursiveRenderUpdate, lanes, workInProgressDeferredLane, workInProgressRootInterleavedUpdatedLanes, workInProgressSuspendedRetryLanes, workInProgressRootDidSkipSuspendedSiblings, renderWasConcurrent, null, -0, 0);
				}
			}
			break;
		} while (1);
		ensureRootIsScheduled(root$jscomp$0);
	}
	function commitRootWhenReady(root, finishedWork, recoverableErrors, transitions, didIncludeRenderPhaseUpdate, lanes, spawnedLane, updatedLanes, suspendedRetryLanes, didSkipSuspendedSiblings, exitStatus, suspendedCommitReason, completedRenderStartTime, completedRenderEndTime) {
		root.timeoutHandle = -1;
		suspendedCommitReason = finishedWork.subtreeFlags;
		if (suspendedCommitReason & 8192 || 16785408 === (suspendedCommitReason & 16785408)) {
			suspendedCommitReason = {
				stylesheets: null,
				count: 0,
				imgCount: 0,
				imgBytes: 0,
				suspenseyImages: [],
				waitingForImages: !0,
				waitingForViewTransition: !1,
				unsuspend: noop$1
			};
			accumulateSuspenseyCommitOnFiber(finishedWork, lanes, suspendedCommitReason);
			var timeoutOffset = (lanes & 62914560) === lanes ? globalMostRecentFallbackTime - now() : (lanes & 4194048) === lanes ? globalMostRecentTransitionTime - now() : 0;
			timeoutOffset = waitForCommitToBeReady(suspendedCommitReason, timeoutOffset);
			if (null !== timeoutOffset) {
				pendingEffectsLanes = lanes;
				root.cancelPendingCommit = timeoutOffset(commitRoot.bind(null, root, finishedWork, lanes, recoverableErrors, transitions, didIncludeRenderPhaseUpdate, spawnedLane, updatedLanes, suspendedRetryLanes, exitStatus, suspendedCommitReason, null, completedRenderStartTime, completedRenderEndTime));
				markRootSuspended(root, lanes, spawnedLane, !didSkipSuspendedSiblings);
				return;
			}
		}
		commitRoot(root, finishedWork, lanes, recoverableErrors, transitions, didIncludeRenderPhaseUpdate, spawnedLane, updatedLanes, suspendedRetryLanes);
	}
	function isRenderConsistentWithExternalStores(finishedWork) {
		for (var node = finishedWork;;) {
			var tag = node.tag;
			if ((0 === tag || 11 === tag || 15 === tag) && node.flags & 16384 && (tag = node.updateQueue, null !== tag && (tag = tag.stores, null !== tag))) for (var i = 0; i < tag.length; i++) {
				var check = tag[i], getSnapshot = check.getSnapshot;
				check = check.value;
				try {
					if (!objectIs(getSnapshot(), check)) return !1;
				} catch (error) {
					return !1;
				}
			}
			tag = node.child;
			if (node.subtreeFlags & 16384 && null !== tag) tag.return = node, node = tag;
			else {
				if (node === finishedWork) break;
				for (; null === node.sibling;) {
					if (null === node.return || node.return === finishedWork) return !0;
					node = node.return;
				}
				node.sibling.return = node.return;
				node = node.sibling;
			}
		}
		return !0;
	}
	function markRootSuspended(root, suspendedLanes, spawnedLane, didAttemptEntireTree) {
		suspendedLanes &= ~workInProgressRootPingedLanes;
		suspendedLanes &= ~workInProgressRootInterleavedUpdatedLanes;
		root.suspendedLanes |= suspendedLanes;
		root.pingedLanes &= ~suspendedLanes;
		didAttemptEntireTree && (root.warmLanes |= suspendedLanes);
		didAttemptEntireTree = root.expirationTimes;
		for (var lanes = suspendedLanes; 0 < lanes;) {
			var index$6 = 31 - clz32(lanes), lane = 1 << index$6;
			didAttemptEntireTree[index$6] = -1;
			lanes &= ~lane;
		}
		0 !== spawnedLane && markSpawnedDeferredLane(root, spawnedLane, suspendedLanes);
	}
	function flushSyncWork$1() {
		return 0 === (executionContext & 6) ? (flushSyncWorkAcrossRoots_impl(0, !1), !1) : !0;
	}
	function resetWorkInProgressStack() {
		if (null !== workInProgress) {
			if (0 === workInProgressSuspendedReason) var interruptedWork = workInProgress.return;
			else interruptedWork = workInProgress, lastContextDependency = currentlyRenderingFiber$1 = null, resetHooksOnUnwind(interruptedWork), thenableState$1 = null, thenableIndexCounter$1 = 0, interruptedWork = workInProgress;
			for (; null !== interruptedWork;) unwindInterruptedWork(interruptedWork.alternate, interruptedWork), interruptedWork = interruptedWork.return;
			workInProgress = null;
		}
	}
	function prepareFreshStack(root, lanes) {
		var timeoutHandle = root.timeoutHandle;
		-1 !== timeoutHandle && (root.timeoutHandle = -1, cancelTimeout(timeoutHandle));
		timeoutHandle = root.cancelPendingCommit;
		null !== timeoutHandle && (root.cancelPendingCommit = null, timeoutHandle());
		pendingEffectsLanes = 0;
		resetWorkInProgressStack();
		workInProgressRoot = root;
		workInProgress = timeoutHandle = createWorkInProgress(root.current, null);
		workInProgressRootRenderLanes = lanes;
		workInProgressSuspendedReason = 0;
		workInProgressThrownValue = null;
		workInProgressRootDidSkipSuspendedSiblings = !1;
		workInProgressRootIsPrerendering = checkIfRootIsPrerendering(root, lanes);
		workInProgressRootDidAttachPingListener = !1;
		workInProgressSuspendedRetryLanes = workInProgressDeferredLane = workInProgressRootPingedLanes = workInProgressRootInterleavedUpdatedLanes = workInProgressRootSkippedLanes = workInProgressRootExitStatus = 0;
		workInProgressRootRecoverableErrors = workInProgressRootConcurrentErrors = null;
		workInProgressRootDidIncludeRecursiveRenderUpdate = !1;
		0 !== (lanes & 8) && (lanes |= lanes & 32);
		var allEntangledLanes = root.entangledLanes;
		if (0 !== allEntangledLanes) for (root = root.entanglements, allEntangledLanes &= lanes; 0 < allEntangledLanes;) {
			var index$4 = 31 - clz32(allEntangledLanes), lane = 1 << index$4;
			lanes |= root[index$4];
			allEntangledLanes &= ~lane;
		}
		entangledRenderLanes = lanes;
		finishQueueingConcurrentUpdates();
		return timeoutHandle;
	}
	function handleThrow(root, thrownValue) {
		currentlyRenderingFiber = null;
		ReactSharedInternals.H = ContextOnlyDispatcher;
		thrownValue === SuspenseException || thrownValue === SuspenseActionException ? (thrownValue = getSuspendedThenable(), workInProgressSuspendedReason = 3) : thrownValue === SuspenseyCommitException ? (thrownValue = getSuspendedThenable(), workInProgressSuspendedReason = 4) : workInProgressSuspendedReason = thrownValue === SelectiveHydrationException ? 8 : null !== thrownValue && "object" === typeof thrownValue && "function" === typeof thrownValue.then ? 6 : 1;
		workInProgressThrownValue = thrownValue;
		null === workInProgress && (workInProgressRootExitStatus = 1, logUncaughtError(root, createCapturedValueAtFiber(thrownValue, root.current)));
	}
	function shouldRemainOnPreviousScreen() {
		var handler = suspenseHandlerStackCursor.current;
		return null === handler ? !0 : (workInProgressRootRenderLanes & 4194048) === workInProgressRootRenderLanes ? null === shellBoundary ? !0 : !1 : (workInProgressRootRenderLanes & 62914560) === workInProgressRootRenderLanes || 0 !== (workInProgressRootRenderLanes & 536870912) ? handler === shellBoundary : !1;
	}
	function pushDispatcher() {
		var prevDispatcher = ReactSharedInternals.H;
		ReactSharedInternals.H = ContextOnlyDispatcher;
		return null === prevDispatcher ? ContextOnlyDispatcher : prevDispatcher;
	}
	function pushAsyncDispatcher() {
		var prevAsyncDispatcher = ReactSharedInternals.A;
		ReactSharedInternals.A = DefaultAsyncDispatcher;
		return prevAsyncDispatcher;
	}
	function renderDidSuspendDelayIfPossible() {
		workInProgressRootExitStatus = 4;
		workInProgressRootDidSkipSuspendedSiblings || (workInProgressRootRenderLanes & 4194048) !== workInProgressRootRenderLanes && null !== suspenseHandlerStackCursor.current || (workInProgressRootIsPrerendering = !0);
		0 === (workInProgressRootSkippedLanes & 134217727) && 0 === (workInProgressRootInterleavedUpdatedLanes & 134217727) || null === workInProgressRoot || markRootSuspended(workInProgressRoot, workInProgressRootRenderLanes, workInProgressDeferredLane, !1);
	}
	function renderRootSync(root, lanes, shouldYieldForPrerendering) {
		var prevExecutionContext = executionContext;
		executionContext |= 2;
		var prevDispatcher = pushDispatcher(), prevAsyncDispatcher = pushAsyncDispatcher();
		if (workInProgressRoot !== root || workInProgressRootRenderLanes !== lanes) workInProgressTransitions = null, prepareFreshStack(root, lanes);
		lanes = !1;
		var exitStatus = workInProgressRootExitStatus;
		a: do
			try {
				if (0 !== workInProgressSuspendedReason && null !== workInProgress) {
					var unitOfWork = workInProgress, thrownValue = workInProgressThrownValue;
					switch (workInProgressSuspendedReason) {
						case 8:
							resetWorkInProgressStack();
							exitStatus = 6;
							break a;
						case 3:
						case 2:
						case 9:
						case 6:
							null === suspenseHandlerStackCursor.current && (lanes = !0);
							var reason = workInProgressSuspendedReason;
							workInProgressSuspendedReason = 0;
							workInProgressThrownValue = null;
							throwAndUnwindWorkLoop(root, unitOfWork, thrownValue, reason);
							if (shouldYieldForPrerendering && workInProgressRootIsPrerendering) {
								exitStatus = 0;
								break a;
							}
							break;
						default: reason = workInProgressSuspendedReason, workInProgressSuspendedReason = 0, workInProgressThrownValue = null, throwAndUnwindWorkLoop(root, unitOfWork, thrownValue, reason);
					}
				}
				workLoopSync();
				exitStatus = workInProgressRootExitStatus;
				break;
			} catch (thrownValue$165) {
				handleThrow(root, thrownValue$165);
			}
		while (1);
		lanes && root.shellSuspendCounter++;
		lastContextDependency = currentlyRenderingFiber$1 = null;
		executionContext = prevExecutionContext;
		ReactSharedInternals.H = prevDispatcher;
		ReactSharedInternals.A = prevAsyncDispatcher;
		null === workInProgress && (workInProgressRoot = null, workInProgressRootRenderLanes = 0, finishQueueingConcurrentUpdates());
		return exitStatus;
	}
	function workLoopSync() {
		for (; null !== workInProgress;) performUnitOfWork(workInProgress);
	}
	function renderRootConcurrent(root, lanes) {
		var prevExecutionContext = executionContext;
		executionContext |= 2;
		var prevDispatcher = pushDispatcher(), prevAsyncDispatcher = pushAsyncDispatcher();
		workInProgressRoot !== root || workInProgressRootRenderLanes !== lanes ? (workInProgressTransitions = null, workInProgressRootRenderTargetTime = now() + 500, prepareFreshStack(root, lanes)) : workInProgressRootIsPrerendering = checkIfRootIsPrerendering(root, lanes);
		a: do
			try {
				if (0 !== workInProgressSuspendedReason && null !== workInProgress) {
					lanes = workInProgress;
					var thrownValue = workInProgressThrownValue;
					b: switch (workInProgressSuspendedReason) {
						case 1:
							workInProgressSuspendedReason = 0;
							workInProgressThrownValue = null;
							throwAndUnwindWorkLoop(root, lanes, thrownValue, 1);
							break;
						case 2:
						case 9:
							if (isThenableResolved(thrownValue)) {
								workInProgressSuspendedReason = 0;
								workInProgressThrownValue = null;
								replaySuspendedUnitOfWork(lanes);
								break;
							}
							lanes = function() {
								2 !== workInProgressSuspendedReason && 9 !== workInProgressSuspendedReason || workInProgressRoot !== root || (workInProgressSuspendedReason = 7);
								ensureRootIsScheduled(root);
							};
							thrownValue.then(lanes, lanes);
							break a;
						case 3:
							workInProgressSuspendedReason = 7;
							break a;
						case 4:
							workInProgressSuspendedReason = 5;
							break a;
						case 7:
							isThenableResolved(thrownValue) ? (workInProgressSuspendedReason = 0, workInProgressThrownValue = null, replaySuspendedUnitOfWork(lanes)) : (workInProgressSuspendedReason = 0, workInProgressThrownValue = null, throwAndUnwindWorkLoop(root, lanes, thrownValue, 7));
							break;
						case 5:
							var resource = null;
							switch (workInProgress.tag) {
								case 26: resource = workInProgress.memoizedState;
								case 5:
								case 27:
									var hostFiber = workInProgress;
									if (resource ? preloadResource(resource) : hostFiber.stateNode.complete) {
										workInProgressSuspendedReason = 0;
										workInProgressThrownValue = null;
										var sibling = hostFiber.sibling;
										if (null !== sibling) workInProgress = sibling;
										else {
											var returnFiber = hostFiber.return;
											null !== returnFiber ? (workInProgress = returnFiber, completeUnitOfWork(returnFiber)) : workInProgress = null;
										}
										break b;
									}
							}
							workInProgressSuspendedReason = 0;
							workInProgressThrownValue = null;
							throwAndUnwindWorkLoop(root, lanes, thrownValue, 5);
							break;
						case 6:
							workInProgressSuspendedReason = 0;
							workInProgressThrownValue = null;
							throwAndUnwindWorkLoop(root, lanes, thrownValue, 6);
							break;
						case 8:
							resetWorkInProgressStack();
							workInProgressRootExitStatus = 6;
							break a;
						default: throw Error(formatProdErrorMessage(462));
					}
				}
				workLoopConcurrentByScheduler();
				break;
			} catch (thrownValue$167) {
				handleThrow(root, thrownValue$167);
			}
		while (1);
		lastContextDependency = currentlyRenderingFiber$1 = null;
		ReactSharedInternals.H = prevDispatcher;
		ReactSharedInternals.A = prevAsyncDispatcher;
		executionContext = prevExecutionContext;
		if (null !== workInProgress) return 0;
		workInProgressRoot = null;
		workInProgressRootRenderLanes = 0;
		finishQueueingConcurrentUpdates();
		return workInProgressRootExitStatus;
	}
	function workLoopConcurrentByScheduler() {
		for (; null !== workInProgress && !shouldYield();) performUnitOfWork(workInProgress);
	}
	function performUnitOfWork(unitOfWork) {
		var next = beginWork(unitOfWork.alternate, unitOfWork, entangledRenderLanes);
		unitOfWork.memoizedProps = unitOfWork.pendingProps;
		null === next ? completeUnitOfWork(unitOfWork) : workInProgress = next;
	}
	function replaySuspendedUnitOfWork(unitOfWork) {
		var next = unitOfWork;
		var current = next.alternate;
		switch (next.tag) {
			case 15:
			case 0:
				next = replayFunctionComponent(current, next, next.pendingProps, next.type, void 0, workInProgressRootRenderLanes);
				break;
			case 11:
				next = replayFunctionComponent(current, next, next.pendingProps, next.type.render, next.ref, workInProgressRootRenderLanes);
				break;
			case 5: resetHooksOnUnwind(next);
			default: unwindInterruptedWork(current, next), next = workInProgress = resetWorkInProgress(next, entangledRenderLanes), next = beginWork(current, next, entangledRenderLanes);
		}
		unitOfWork.memoizedProps = unitOfWork.pendingProps;
		null === next ? completeUnitOfWork(unitOfWork) : workInProgress = next;
	}
	function throwAndUnwindWorkLoop(root, unitOfWork, thrownValue, suspendedReason) {
		lastContextDependency = currentlyRenderingFiber$1 = null;
		resetHooksOnUnwind(unitOfWork);
		thenableState$1 = null;
		thenableIndexCounter$1 = 0;
		var returnFiber = unitOfWork.return;
		try {
			if (throwException(root, returnFiber, unitOfWork, thrownValue, workInProgressRootRenderLanes)) {
				workInProgressRootExitStatus = 1;
				logUncaughtError(root, createCapturedValueAtFiber(thrownValue, root.current));
				workInProgress = null;
				return;
			}
		} catch (error) {
			if (null !== returnFiber) throw workInProgress = returnFiber, error;
			workInProgressRootExitStatus = 1;
			logUncaughtError(root, createCapturedValueAtFiber(thrownValue, root.current));
			workInProgress = null;
			return;
		}
		if (unitOfWork.flags & 32768) {
			if (isHydrating || 1 === suspendedReason) root = !0;
			else if (workInProgressRootIsPrerendering || 0 !== (workInProgressRootRenderLanes & 536870912)) root = !1;
			else if (workInProgressRootDidSkipSuspendedSiblings = root = !0, 2 === suspendedReason || 9 === suspendedReason || 3 === suspendedReason || 6 === suspendedReason) suspendedReason = suspenseHandlerStackCursor.current, null !== suspendedReason && 13 === suspendedReason.tag && (suspendedReason.flags |= 16384);
			unwindUnitOfWork(unitOfWork, root);
		} else completeUnitOfWork(unitOfWork);
	}
	function completeUnitOfWork(unitOfWork) {
		var completedWork = unitOfWork;
		do {
			if (0 !== (completedWork.flags & 32768)) {
				unwindUnitOfWork(completedWork, workInProgressRootDidSkipSuspendedSiblings);
				return;
			}
			unitOfWork = completedWork.return;
			var next = completeWork(completedWork.alternate, completedWork, entangledRenderLanes);
			if (null !== next) {
				workInProgress = next;
				return;
			}
			completedWork = completedWork.sibling;
			if (null !== completedWork) {
				workInProgress = completedWork;
				return;
			}
			workInProgress = completedWork = unitOfWork;
		} while (null !== completedWork);
		0 === workInProgressRootExitStatus && (workInProgressRootExitStatus = 5);
	}
	function unwindUnitOfWork(unitOfWork, skipSiblings) {
		do {
			var next = unwindWork(unitOfWork.alternate, unitOfWork);
			if (null !== next) {
				next.flags &= 32767;
				workInProgress = next;
				return;
			}
			next = unitOfWork.return;
			null !== next && (next.flags |= 32768, next.subtreeFlags = 0, next.deletions = null);
			if (!skipSiblings && (unitOfWork = unitOfWork.sibling, null !== unitOfWork)) {
				workInProgress = unitOfWork;
				return;
			}
			workInProgress = unitOfWork = next;
		} while (null !== unitOfWork);
		workInProgressRootExitStatus = 6;
		workInProgress = null;
	}
	function commitRoot(root, finishedWork, lanes, recoverableErrors, transitions, didIncludeRenderPhaseUpdate, spawnedLane, updatedLanes, suspendedRetryLanes) {
		root.cancelPendingCommit = null;
		do
			flushPendingEffects();
		while (0 !== pendingEffectsStatus);
		if (0 !== (executionContext & 6)) throw Error(formatProdErrorMessage(327));
		if (null !== finishedWork) {
			if (finishedWork === root.current) throw Error(formatProdErrorMessage(177));
			didIncludeRenderPhaseUpdate = finishedWork.lanes | finishedWork.childLanes;
			didIncludeRenderPhaseUpdate |= concurrentlyUpdatedLanes;
			markRootFinished(root, lanes, didIncludeRenderPhaseUpdate, spawnedLane, updatedLanes, suspendedRetryLanes);
			root === workInProgressRoot && (workInProgress = workInProgressRoot = null, workInProgressRootRenderLanes = 0);
			pendingFinishedWork = finishedWork;
			pendingEffectsRoot = root;
			pendingEffectsLanes = lanes;
			pendingEffectsRemainingLanes = didIncludeRenderPhaseUpdate;
			pendingPassiveTransitions = transitions;
			pendingRecoverableErrors = recoverableErrors;
			0 !== (finishedWork.subtreeFlags & 10256) || 0 !== (finishedWork.flags & 10256) ? (root.callbackNode = null, root.callbackPriority = 0, scheduleCallback$1(NormalPriority$1, function() {
				flushPassiveEffects();
				return null;
			})) : (root.callbackNode = null, root.callbackPriority = 0);
			recoverableErrors = 0 !== (finishedWork.flags & 13878);
			if (0 !== (finishedWork.subtreeFlags & 13878) || recoverableErrors) {
				recoverableErrors = ReactSharedInternals.T;
				ReactSharedInternals.T = null;
				transitions = ReactDOMSharedInternals.p;
				ReactDOMSharedInternals.p = 2;
				spawnedLane = executionContext;
				executionContext |= 4;
				try {
					commitBeforeMutationEffects(root, finishedWork, lanes);
				} finally {
					executionContext = spawnedLane, ReactDOMSharedInternals.p = transitions, ReactSharedInternals.T = recoverableErrors;
				}
			}
			pendingEffectsStatus = 1;
			flushMutationEffects();
			flushLayoutEffects();
			flushSpawnedWork();
		}
	}
	function flushMutationEffects() {
		if (1 === pendingEffectsStatus) {
			pendingEffectsStatus = 0;
			var root = pendingEffectsRoot, finishedWork = pendingFinishedWork, rootMutationHasEffect = 0 !== (finishedWork.flags & 13878);
			if (0 !== (finishedWork.subtreeFlags & 13878) || rootMutationHasEffect) {
				rootMutationHasEffect = ReactSharedInternals.T;
				ReactSharedInternals.T = null;
				var previousPriority = ReactDOMSharedInternals.p;
				ReactDOMSharedInternals.p = 2;
				var prevExecutionContext = executionContext;
				executionContext |= 4;
				try {
					commitMutationEffectsOnFiber(finishedWork, root);
					var priorSelectionInformation = selectionInformation, curFocusedElem = getActiveElementDeep(root.containerInfo), priorFocusedElem = priorSelectionInformation.focusedElem, priorSelectionRange = priorSelectionInformation.selectionRange;
					if (curFocusedElem !== priorFocusedElem && priorFocusedElem && priorFocusedElem.ownerDocument && containsNode(priorFocusedElem.ownerDocument.documentElement, priorFocusedElem)) {
						if (null !== priorSelectionRange && hasSelectionCapabilities(priorFocusedElem)) {
							var start = priorSelectionRange.start, end = priorSelectionRange.end;
							void 0 === end && (end = start);
							if ("selectionStart" in priorFocusedElem) priorFocusedElem.selectionStart = start, priorFocusedElem.selectionEnd = Math.min(end, priorFocusedElem.value.length);
							else {
								var doc = priorFocusedElem.ownerDocument || document, win = doc && doc.defaultView || window;
								if (win.getSelection) {
									var selection = win.getSelection(), length = priorFocusedElem.textContent.length, start$jscomp$0 = Math.min(priorSelectionRange.start, length), end$jscomp$0 = void 0 === priorSelectionRange.end ? start$jscomp$0 : Math.min(priorSelectionRange.end, length);
									!selection.extend && start$jscomp$0 > end$jscomp$0 && (curFocusedElem = end$jscomp$0, end$jscomp$0 = start$jscomp$0, start$jscomp$0 = curFocusedElem);
									var startMarker = getNodeForCharacterOffset(priorFocusedElem, start$jscomp$0), endMarker = getNodeForCharacterOffset(priorFocusedElem, end$jscomp$0);
									if (startMarker && endMarker && (1 !== selection.rangeCount || selection.anchorNode !== startMarker.node || selection.anchorOffset !== startMarker.offset || selection.focusNode !== endMarker.node || selection.focusOffset !== endMarker.offset)) {
										var range = doc.createRange();
										range.setStart(startMarker.node, startMarker.offset);
										selection.removeAllRanges();
										start$jscomp$0 > end$jscomp$0 ? (selection.addRange(range), selection.extend(endMarker.node, endMarker.offset)) : (range.setEnd(endMarker.node, endMarker.offset), selection.addRange(range));
									}
								}
							}
						}
						doc = [];
						for (selection = priorFocusedElem; selection = selection.parentNode;) 1 === selection.nodeType && doc.push({
							element: selection,
							left: selection.scrollLeft,
							top: selection.scrollTop
						});
						"function" === typeof priorFocusedElem.focus && priorFocusedElem.focus();
						for (priorFocusedElem = 0; priorFocusedElem < doc.length; priorFocusedElem++) {
							var info = doc[priorFocusedElem];
							info.element.scrollLeft = info.left;
							info.element.scrollTop = info.top;
						}
					}
					_enabled = !!eventsEnabled;
					selectionInformation = eventsEnabled = null;
				} finally {
					executionContext = prevExecutionContext, ReactDOMSharedInternals.p = previousPriority, ReactSharedInternals.T = rootMutationHasEffect;
				}
			}
			root.current = finishedWork;
			pendingEffectsStatus = 2;
		}
	}
	function flushLayoutEffects() {
		if (2 === pendingEffectsStatus) {
			pendingEffectsStatus = 0;
			var root = pendingEffectsRoot, finishedWork = pendingFinishedWork, rootHasLayoutEffect = 0 !== (finishedWork.flags & 8772);
			if (0 !== (finishedWork.subtreeFlags & 8772) || rootHasLayoutEffect) {
				rootHasLayoutEffect = ReactSharedInternals.T;
				ReactSharedInternals.T = null;
				var previousPriority = ReactDOMSharedInternals.p;
				ReactDOMSharedInternals.p = 2;
				var prevExecutionContext = executionContext;
				executionContext |= 4;
				try {
					commitLayoutEffectOnFiber(root, finishedWork.alternate, finishedWork);
				} finally {
					executionContext = prevExecutionContext, ReactDOMSharedInternals.p = previousPriority, ReactSharedInternals.T = rootHasLayoutEffect;
				}
			}
			pendingEffectsStatus = 3;
		}
	}
	function flushSpawnedWork() {
		if (4 === pendingEffectsStatus || 3 === pendingEffectsStatus) {
			pendingEffectsStatus = 0;
			requestPaint();
			var root = pendingEffectsRoot, finishedWork = pendingFinishedWork, lanes = pendingEffectsLanes, recoverableErrors = pendingRecoverableErrors;
			0 !== (finishedWork.subtreeFlags & 10256) || 0 !== (finishedWork.flags & 10256) ? pendingEffectsStatus = 5 : (pendingEffectsStatus = 0, pendingFinishedWork = pendingEffectsRoot = null, releaseRootPooledCache(root, root.pendingLanes));
			var remainingLanes = root.pendingLanes;
			0 === remainingLanes && (legacyErrorBoundariesThatAlreadyFailed = null);
			lanesToEventPriority(lanes);
			finishedWork = finishedWork.stateNode;
			if (injectedHook && "function" === typeof injectedHook.onCommitFiberRoot) try {
				injectedHook.onCommitFiberRoot(rendererID, finishedWork, void 0, 128 === (finishedWork.current.flags & 128));
			} catch (err) {}
			if (null !== recoverableErrors) {
				finishedWork = ReactSharedInternals.T;
				remainingLanes = ReactDOMSharedInternals.p;
				ReactDOMSharedInternals.p = 2;
				ReactSharedInternals.T = null;
				try {
					for (var onRecoverableError = root.onRecoverableError, i = 0; i < recoverableErrors.length; i++) {
						var recoverableError = recoverableErrors[i];
						onRecoverableError(recoverableError.value, { componentStack: recoverableError.stack });
					}
				} finally {
					ReactSharedInternals.T = finishedWork, ReactDOMSharedInternals.p = remainingLanes;
				}
			}
			0 !== (pendingEffectsLanes & 3) && flushPendingEffects();
			ensureRootIsScheduled(root);
			remainingLanes = root.pendingLanes;
			0 !== (lanes & 261930) && 0 !== (remainingLanes & 42) ? root === rootWithNestedUpdates ? nestedUpdateCount++ : (nestedUpdateCount = 0, rootWithNestedUpdates = root) : nestedUpdateCount = 0;
			flushSyncWorkAcrossRoots_impl(0, !1);
		}
	}
	function releaseRootPooledCache(root, remainingLanes) {
		0 === (root.pooledCacheLanes &= remainingLanes) && (remainingLanes = root.pooledCache, null != remainingLanes && (root.pooledCache = null, releaseCache(remainingLanes)));
	}
	function flushPendingEffects() {
		flushMutationEffects();
		flushLayoutEffects();
		flushSpawnedWork();
		return flushPassiveEffects();
	}
	function flushPassiveEffects() {
		if (5 !== pendingEffectsStatus) return !1;
		var root = pendingEffectsRoot, remainingLanes = pendingEffectsRemainingLanes;
		pendingEffectsRemainingLanes = 0;
		var renderPriority = lanesToEventPriority(pendingEffectsLanes), prevTransition = ReactSharedInternals.T, previousPriority = ReactDOMSharedInternals.p;
		try {
			ReactDOMSharedInternals.p = 32 > renderPriority ? 32 : renderPriority;
			ReactSharedInternals.T = null;
			renderPriority = pendingPassiveTransitions;
			pendingPassiveTransitions = null;
			var root$jscomp$0 = pendingEffectsRoot, lanes = pendingEffectsLanes;
			pendingEffectsStatus = 0;
			pendingFinishedWork = pendingEffectsRoot = null;
			pendingEffectsLanes = 0;
			if (0 !== (executionContext & 6)) throw Error(formatProdErrorMessage(331));
			var prevExecutionContext = executionContext;
			executionContext |= 4;
			commitPassiveUnmountOnFiber(root$jscomp$0.current);
			commitPassiveMountOnFiber(root$jscomp$0, root$jscomp$0.current, lanes, renderPriority);
			executionContext = prevExecutionContext;
			flushSyncWorkAcrossRoots_impl(0, !1);
			if (injectedHook && "function" === typeof injectedHook.onPostCommitFiberRoot) try {
				injectedHook.onPostCommitFiberRoot(rendererID, root$jscomp$0);
			} catch (err) {}
			return !0;
		} finally {
			ReactDOMSharedInternals.p = previousPriority, ReactSharedInternals.T = prevTransition, releaseRootPooledCache(root, remainingLanes);
		}
	}
	function captureCommitPhaseErrorOnRoot(rootFiber, sourceFiber, error) {
		sourceFiber = createCapturedValueAtFiber(error, sourceFiber);
		sourceFiber = createRootErrorUpdate(rootFiber.stateNode, sourceFiber, 2);
		rootFiber = enqueueUpdate(rootFiber, sourceFiber, 2);
		null !== rootFiber && (markRootUpdated$1(rootFiber, 2), ensureRootIsScheduled(rootFiber));
	}
	function captureCommitPhaseError(sourceFiber, nearestMountedAncestor, error) {
		if (3 === sourceFiber.tag) captureCommitPhaseErrorOnRoot(sourceFiber, sourceFiber, error);
		else for (; null !== nearestMountedAncestor;) {
			if (3 === nearestMountedAncestor.tag) {
				captureCommitPhaseErrorOnRoot(nearestMountedAncestor, sourceFiber, error);
				break;
			} else if (1 === nearestMountedAncestor.tag) {
				var instance = nearestMountedAncestor.stateNode;
				if ("function" === typeof nearestMountedAncestor.type.getDerivedStateFromError || "function" === typeof instance.componentDidCatch && (null === legacyErrorBoundariesThatAlreadyFailed || !legacyErrorBoundariesThatAlreadyFailed.has(instance))) {
					sourceFiber = createCapturedValueAtFiber(error, sourceFiber);
					error = createClassErrorUpdate(2);
					instance = enqueueUpdate(nearestMountedAncestor, error, 2);
					null !== instance && (initializeClassErrorUpdate(error, instance, nearestMountedAncestor, sourceFiber), markRootUpdated$1(instance, 2), ensureRootIsScheduled(instance));
					break;
				}
			}
			nearestMountedAncestor = nearestMountedAncestor.return;
		}
	}
	function attachPingListener(root, wakeable, lanes) {
		var pingCache = root.pingCache;
		if (null === pingCache) {
			pingCache = root.pingCache = new PossiblyWeakMap();
			var threadIDs = /* @__PURE__ */ new Set();
			pingCache.set(wakeable, threadIDs);
		} else threadIDs = pingCache.get(wakeable), void 0 === threadIDs && (threadIDs = /* @__PURE__ */ new Set(), pingCache.set(wakeable, threadIDs));
		threadIDs.has(lanes) || (workInProgressRootDidAttachPingListener = !0, threadIDs.add(lanes), root = pingSuspendedRoot.bind(null, root, wakeable, lanes), wakeable.then(root, root));
	}
	function pingSuspendedRoot(root, wakeable, pingedLanes) {
		var pingCache = root.pingCache;
		null !== pingCache && pingCache.delete(wakeable);
		root.pingedLanes |= root.suspendedLanes & pingedLanes;
		root.warmLanes &= ~pingedLanes;
		workInProgressRoot === root && (workInProgressRootRenderLanes & pingedLanes) === pingedLanes && (4 === workInProgressRootExitStatus || 3 === workInProgressRootExitStatus && (workInProgressRootRenderLanes & 62914560) === workInProgressRootRenderLanes && 300 > now() - globalMostRecentFallbackTime ? 0 === (executionContext & 2) && prepareFreshStack(root, 0) : workInProgressRootPingedLanes |= pingedLanes, workInProgressSuspendedRetryLanes === workInProgressRootRenderLanes && (workInProgressSuspendedRetryLanes = 0));
		ensureRootIsScheduled(root);
	}
	function retryTimedOutBoundary(boundaryFiber, retryLane) {
		0 === retryLane && (retryLane = claimNextRetryLane());
		boundaryFiber = enqueueConcurrentRenderForLane(boundaryFiber, retryLane);
		null !== boundaryFiber && (markRootUpdated$1(boundaryFiber, retryLane), ensureRootIsScheduled(boundaryFiber));
	}
	function retryDehydratedSuspenseBoundary(boundaryFiber) {
		var suspenseState = boundaryFiber.memoizedState, retryLane = 0;
		null !== suspenseState && (retryLane = suspenseState.retryLane);
		retryTimedOutBoundary(boundaryFiber, retryLane);
	}
	function resolveRetryWakeable(boundaryFiber, wakeable) {
		var retryLane = 0;
		switch (boundaryFiber.tag) {
			case 31:
			case 13:
				var retryCache = boundaryFiber.stateNode;
				var suspenseState = boundaryFiber.memoizedState;
				null !== suspenseState && (retryLane = suspenseState.retryLane);
				break;
			case 19:
				retryCache = boundaryFiber.stateNode;
				break;
			case 22:
				retryCache = boundaryFiber.stateNode._retryCache;
				break;
			default: throw Error(formatProdErrorMessage(314));
		}
		null !== retryCache && retryCache.delete(wakeable);
		retryTimedOutBoundary(boundaryFiber, retryLane);
	}
	function scheduleCallback$1(priorityLevel, callback) {
		return scheduleCallback$3(priorityLevel, callback);
	}
	var firstScheduledRoot = null, lastScheduledRoot = null, didScheduleMicrotask = !1, mightHavePendingSyncWork = !1, isFlushingWork = !1, currentEventTransitionLane = 0;
	function ensureRootIsScheduled(root) {
		root !== lastScheduledRoot && null === root.next && (null === lastScheduledRoot ? firstScheduledRoot = lastScheduledRoot = root : lastScheduledRoot = lastScheduledRoot.next = root);
		mightHavePendingSyncWork = !0;
		didScheduleMicrotask || (didScheduleMicrotask = !0, scheduleImmediateRootScheduleTask());
	}
	function flushSyncWorkAcrossRoots_impl(syncTransitionLanes, onlyLegacy) {
		if (!isFlushingWork && mightHavePendingSyncWork) {
			isFlushingWork = !0;
			do {
				var didPerformSomeWork = !1;
				for (var root$170 = firstScheduledRoot; null !== root$170;) {
					if (!onlyLegacy) if (0 !== syncTransitionLanes) {
						var pendingLanes = root$170.pendingLanes;
						if (0 === pendingLanes) var JSCompiler_inline_result = 0;
						else {
							var suspendedLanes = root$170.suspendedLanes, pingedLanes = root$170.pingedLanes;
							JSCompiler_inline_result = (1 << 31 - clz32(42 | syncTransitionLanes) + 1) - 1;
							JSCompiler_inline_result &= pendingLanes & ~(suspendedLanes & ~pingedLanes);
							JSCompiler_inline_result = JSCompiler_inline_result & 201326741 ? JSCompiler_inline_result & 201326741 | 1 : JSCompiler_inline_result ? JSCompiler_inline_result | 2 : 0;
						}
						0 !== JSCompiler_inline_result && (didPerformSomeWork = !0, performSyncWorkOnRoot(root$170, JSCompiler_inline_result));
					} else JSCompiler_inline_result = workInProgressRootRenderLanes, JSCompiler_inline_result = getNextLanes(root$170, root$170 === workInProgressRoot ? JSCompiler_inline_result : 0, null !== root$170.cancelPendingCommit || -1 !== root$170.timeoutHandle), 0 === (JSCompiler_inline_result & 3) || checkIfRootIsPrerendering(root$170, JSCompiler_inline_result) || (didPerformSomeWork = !0, performSyncWorkOnRoot(root$170, JSCompiler_inline_result));
					root$170 = root$170.next;
				}
			} while (didPerformSomeWork);
			isFlushingWork = !1;
		}
	}
	function processRootScheduleInImmediateTask() {
		processRootScheduleInMicrotask();
	}
	function processRootScheduleInMicrotask() {
		mightHavePendingSyncWork = didScheduleMicrotask = !1;
		var syncTransitionLanes = 0;
		0 !== currentEventTransitionLane && shouldAttemptEagerTransition() && (syncTransitionLanes = currentEventTransitionLane);
		for (var currentTime = now(), prev = null, root = firstScheduledRoot; null !== root;) {
			var next = root.next, nextLanes = scheduleTaskForRootDuringMicrotask(root, currentTime);
			if (0 === nextLanes) root.next = null, null === prev ? firstScheduledRoot = next : prev.next = next, null === next && (lastScheduledRoot = prev);
			else if (prev = root, 0 !== syncTransitionLanes || 0 !== (nextLanes & 3)) mightHavePendingSyncWork = !0;
			root = next;
		}
		0 !== pendingEffectsStatus && 5 !== pendingEffectsStatus || flushSyncWorkAcrossRoots_impl(syncTransitionLanes, !1);
		0 !== currentEventTransitionLane && (currentEventTransitionLane = 0);
	}
	function scheduleTaskForRootDuringMicrotask(root, currentTime) {
		for (var suspendedLanes = root.suspendedLanes, pingedLanes = root.pingedLanes, expirationTimes = root.expirationTimes, lanes = root.pendingLanes & -62914561; 0 < lanes;) {
			var index$5 = 31 - clz32(lanes), lane = 1 << index$5, expirationTime = expirationTimes[index$5];
			if (-1 === expirationTime) {
				if (0 === (lane & suspendedLanes) || 0 !== (lane & pingedLanes)) expirationTimes[index$5] = computeExpirationTime(lane, currentTime);
			} else expirationTime <= currentTime && (root.expiredLanes |= lane);
			lanes &= ~lane;
		}
		currentTime = workInProgressRoot;
		suspendedLanes = workInProgressRootRenderLanes;
		suspendedLanes = getNextLanes(root, root === currentTime ? suspendedLanes : 0, null !== root.cancelPendingCommit || -1 !== root.timeoutHandle);
		pingedLanes = root.callbackNode;
		if (0 === suspendedLanes || root === currentTime && (2 === workInProgressSuspendedReason || 9 === workInProgressSuspendedReason) || null !== root.cancelPendingCommit) return null !== pingedLanes && null !== pingedLanes && cancelCallback$1(pingedLanes), root.callbackNode = null, root.callbackPriority = 0;
		if (0 === (suspendedLanes & 3) || checkIfRootIsPrerendering(root, suspendedLanes)) {
			currentTime = suspendedLanes & -suspendedLanes;
			if (currentTime === root.callbackPriority) return currentTime;
			null !== pingedLanes && cancelCallback$1(pingedLanes);
			switch (lanesToEventPriority(suspendedLanes)) {
				case 2:
				case 8:
					suspendedLanes = UserBlockingPriority;
					break;
				case 32:
					suspendedLanes = NormalPriority$1;
					break;
				case 268435456:
					suspendedLanes = IdlePriority;
					break;
				default: suspendedLanes = NormalPriority$1;
			}
			pingedLanes = performWorkOnRootViaSchedulerTask.bind(null, root);
			suspendedLanes = scheduleCallback$3(suspendedLanes, pingedLanes);
			root.callbackPriority = currentTime;
			root.callbackNode = suspendedLanes;
			return currentTime;
		}
		null !== pingedLanes && null !== pingedLanes && cancelCallback$1(pingedLanes);
		root.callbackPriority = 2;
		root.callbackNode = null;
		return 2;
	}
	function performWorkOnRootViaSchedulerTask(root, didTimeout) {
		if (0 !== pendingEffectsStatus && 5 !== pendingEffectsStatus) return root.callbackNode = null, root.callbackPriority = 0, null;
		var originalCallbackNode = root.callbackNode;
		if (flushPendingEffects() && root.callbackNode !== originalCallbackNode) return null;
		var workInProgressRootRenderLanes$jscomp$0 = workInProgressRootRenderLanes;
		workInProgressRootRenderLanes$jscomp$0 = getNextLanes(root, root === workInProgressRoot ? workInProgressRootRenderLanes$jscomp$0 : 0, null !== root.cancelPendingCommit || -1 !== root.timeoutHandle);
		if (0 === workInProgressRootRenderLanes$jscomp$0) return null;
		performWorkOnRoot(root, workInProgressRootRenderLanes$jscomp$0, didTimeout);
		scheduleTaskForRootDuringMicrotask(root, now());
		return null != root.callbackNode && root.callbackNode === originalCallbackNode ? performWorkOnRootViaSchedulerTask.bind(null, root) : null;
	}
	function performSyncWorkOnRoot(root, lanes) {
		if (flushPendingEffects()) return null;
		performWorkOnRoot(root, lanes, !0);
	}
	function scheduleImmediateRootScheduleTask() {
		scheduleMicrotask(function() {
			0 !== (executionContext & 6) ? scheduleCallback$3(ImmediatePriority, processRootScheduleInImmediateTask) : processRootScheduleInMicrotask();
		});
	}
	function requestTransitionLane() {
		if (0 === currentEventTransitionLane) {
			var actionScopeLane = currentEntangledLane;
			0 === actionScopeLane && (actionScopeLane = nextTransitionUpdateLane, nextTransitionUpdateLane <<= 1, 0 === (nextTransitionUpdateLane & 261888) && (nextTransitionUpdateLane = 256));
			currentEventTransitionLane = actionScopeLane;
		}
		return currentEventTransitionLane;
	}
	function coerceFormActionProp(actionProp) {
		return null == actionProp || "symbol" === typeof actionProp || "boolean" === typeof actionProp ? null : "function" === typeof actionProp ? actionProp : sanitizeURL("" + actionProp);
	}
	function createFormDataWithSubmitter(form, submitter) {
		var temp = submitter.ownerDocument.createElement("input");
		temp.name = submitter.name;
		temp.value = submitter.value;
		form.id && temp.setAttribute("form", form.id);
		submitter.parentNode.insertBefore(temp, submitter);
		form = new FormData(form);
		temp.parentNode.removeChild(temp);
		return form;
	}
	function extractEvents$1(dispatchQueue, domEventName, maybeTargetInst, nativeEvent, nativeEventTarget) {
		if ("submit" === domEventName && maybeTargetInst && maybeTargetInst.stateNode === nativeEventTarget) {
			var action = coerceFormActionProp((nativeEventTarget[internalPropsKey] || null).action), submitter = nativeEvent.submitter;
			submitter && (domEventName = (domEventName = submitter[internalPropsKey] || null) ? coerceFormActionProp(domEventName.formAction) : submitter.getAttribute("formAction"), null !== domEventName && (action = domEventName, submitter = null));
			var event = new SyntheticEvent("action", "action", null, nativeEvent, nativeEventTarget);
			dispatchQueue.push({
				event,
				listeners: [{
					instance: null,
					listener: function() {
						if (nativeEvent.defaultPrevented) {
							if (0 !== currentEventTransitionLane) {
								var formData = submitter ? createFormDataWithSubmitter(nativeEventTarget, submitter) : new FormData(nativeEventTarget);
								startHostTransition(maybeTargetInst, {
									pending: !0,
									data: formData,
									method: nativeEventTarget.method,
									action
								}, null, formData);
							}
						} else "function" === typeof action && (event.preventDefault(), formData = submitter ? createFormDataWithSubmitter(nativeEventTarget, submitter) : new FormData(nativeEventTarget), startHostTransition(maybeTargetInst, {
							pending: !0,
							data: formData,
							method: nativeEventTarget.method,
							action
						}, action, formData));
					},
					currentTarget: nativeEventTarget
				}]
			});
		}
	}
	for (var i$jscomp$inline_1577 = 0; i$jscomp$inline_1577 < simpleEventPluginEvents.length; i$jscomp$inline_1577++) {
		var eventName$jscomp$inline_1578 = simpleEventPluginEvents[i$jscomp$inline_1577];
		registerSimpleEvent(eventName$jscomp$inline_1578.toLowerCase(), "on" + (eventName$jscomp$inline_1578[0].toUpperCase() + eventName$jscomp$inline_1578.slice(1)));
	}
	registerSimpleEvent(ANIMATION_END, "onAnimationEnd");
	registerSimpleEvent(ANIMATION_ITERATION, "onAnimationIteration");
	registerSimpleEvent(ANIMATION_START, "onAnimationStart");
	registerSimpleEvent("dblclick", "onDoubleClick");
	registerSimpleEvent("focusin", "onFocus");
	registerSimpleEvent("focusout", "onBlur");
	registerSimpleEvent(TRANSITION_RUN, "onTransitionRun");
	registerSimpleEvent(TRANSITION_START, "onTransitionStart");
	registerSimpleEvent(TRANSITION_CANCEL, "onTransitionCancel");
	registerSimpleEvent(TRANSITION_END, "onTransitionEnd");
	registerDirectEvent("onMouseEnter", ["mouseout", "mouseover"]);
	registerDirectEvent("onMouseLeave", ["mouseout", "mouseover"]);
	registerDirectEvent("onPointerEnter", ["pointerout", "pointerover"]);
	registerDirectEvent("onPointerLeave", ["pointerout", "pointerover"]);
	registerTwoPhaseEvent("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
	registerTwoPhaseEvent("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
	registerTwoPhaseEvent("onBeforeInput", [
		"compositionend",
		"keypress",
		"textInput",
		"paste"
	]);
	registerTwoPhaseEvent("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
	registerTwoPhaseEvent("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
	registerTwoPhaseEvent("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
	var mediaEventTypes = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), nonDelegatedEvents = new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(mediaEventTypes));
	function processDispatchQueue(dispatchQueue, eventSystemFlags) {
		eventSystemFlags = 0 !== (eventSystemFlags & 4);
		for (var i = 0; i < dispatchQueue.length; i++) {
			var _dispatchQueue$i = dispatchQueue[i], event = _dispatchQueue$i.event;
			_dispatchQueue$i = _dispatchQueue$i.listeners;
			a: {
				var previousInstance = void 0;
				if (eventSystemFlags) for (var i$jscomp$0 = _dispatchQueue$i.length - 1; 0 <= i$jscomp$0; i$jscomp$0--) {
					var _dispatchListeners$i = _dispatchQueue$i[i$jscomp$0], instance = _dispatchListeners$i.instance, currentTarget = _dispatchListeners$i.currentTarget;
					_dispatchListeners$i = _dispatchListeners$i.listener;
					if (instance !== previousInstance && event.isPropagationStopped()) break a;
					previousInstance = _dispatchListeners$i;
					event.currentTarget = currentTarget;
					try {
						previousInstance(event);
					} catch (error) {
						reportGlobalError(error);
					}
					event.currentTarget = null;
					previousInstance = instance;
				}
				else for (i$jscomp$0 = 0; i$jscomp$0 < _dispatchQueue$i.length; i$jscomp$0++) {
					_dispatchListeners$i = _dispatchQueue$i[i$jscomp$0];
					instance = _dispatchListeners$i.instance;
					currentTarget = _dispatchListeners$i.currentTarget;
					_dispatchListeners$i = _dispatchListeners$i.listener;
					if (instance !== previousInstance && event.isPropagationStopped()) break a;
					previousInstance = _dispatchListeners$i;
					event.currentTarget = currentTarget;
					try {
						previousInstance(event);
					} catch (error) {
						reportGlobalError(error);
					}
					event.currentTarget = null;
					previousInstance = instance;
				}
			}
		}
	}
	function listenToNonDelegatedEvent(domEventName, targetElement) {
		var JSCompiler_inline_result = targetElement[internalEventHandlersKey];
		void 0 === JSCompiler_inline_result && (JSCompiler_inline_result = targetElement[internalEventHandlersKey] = /* @__PURE__ */ new Set());
		var listenerSetKey = domEventName + "__bubble";
		JSCompiler_inline_result.has(listenerSetKey) || (addTrappedEventListener(targetElement, domEventName, 2, !1), JSCompiler_inline_result.add(listenerSetKey));
	}
	function listenToNativeEvent(domEventName, isCapturePhaseListener, target) {
		var eventSystemFlags = 0;
		isCapturePhaseListener && (eventSystemFlags |= 4);
		addTrappedEventListener(target, domEventName, eventSystemFlags, isCapturePhaseListener);
	}
	var listeningMarker = "_reactListening" + Math.random().toString(36).slice(2);
	function listenToAllSupportedEvents(rootContainerElement) {
		if (!rootContainerElement[listeningMarker]) {
			rootContainerElement[listeningMarker] = !0;
			allNativeEvents.forEach(function(domEventName) {
				"selectionchange" !== domEventName && (nonDelegatedEvents.has(domEventName) || listenToNativeEvent(domEventName, !1, rootContainerElement), listenToNativeEvent(domEventName, !0, rootContainerElement));
			});
			var ownerDocument = 9 === rootContainerElement.nodeType ? rootContainerElement : rootContainerElement.ownerDocument;
			null === ownerDocument || ownerDocument[listeningMarker] || (ownerDocument[listeningMarker] = !0, listenToNativeEvent("selectionchange", !1, ownerDocument));
		}
	}
	function addTrappedEventListener(targetContainer, domEventName, eventSystemFlags, isCapturePhaseListener) {
		switch (getEventPriority(domEventName)) {
			case 2:
				var listenerWrapper = dispatchDiscreteEvent;
				break;
			case 8:
				listenerWrapper = dispatchContinuousEvent;
				break;
			default: listenerWrapper = dispatchEvent;
		}
		eventSystemFlags = listenerWrapper.bind(null, domEventName, eventSystemFlags, targetContainer);
		listenerWrapper = void 0;
		!passiveBrowserEventsSupported || "touchstart" !== domEventName && "touchmove" !== domEventName && "wheel" !== domEventName || (listenerWrapper = !0);
		isCapturePhaseListener ? void 0 !== listenerWrapper ? targetContainer.addEventListener(domEventName, eventSystemFlags, {
			capture: !0,
			passive: listenerWrapper
		}) : targetContainer.addEventListener(domEventName, eventSystemFlags, !0) : void 0 !== listenerWrapper ? targetContainer.addEventListener(domEventName, eventSystemFlags, { passive: listenerWrapper }) : targetContainer.addEventListener(domEventName, eventSystemFlags, !1);
	}
	function dispatchEventForPluginEventSystem(domEventName, eventSystemFlags, nativeEvent, targetInst$jscomp$0, targetContainer) {
		var ancestorInst = targetInst$jscomp$0;
		if (0 === (eventSystemFlags & 1) && 0 === (eventSystemFlags & 2) && null !== targetInst$jscomp$0) a: for (;;) {
			if (null === targetInst$jscomp$0) return;
			var nodeTag = targetInst$jscomp$0.tag;
			if (3 === nodeTag || 4 === nodeTag) {
				var container = targetInst$jscomp$0.stateNode.containerInfo;
				if (container === targetContainer) break;
				if (4 === nodeTag) for (nodeTag = targetInst$jscomp$0.return; null !== nodeTag;) {
					var grandTag = nodeTag.tag;
					if ((3 === grandTag || 4 === grandTag) && nodeTag.stateNode.containerInfo === targetContainer) return;
					nodeTag = nodeTag.return;
				}
				for (; null !== container;) {
					nodeTag = getClosestInstanceFromNode(container);
					if (null === nodeTag) return;
					grandTag = nodeTag.tag;
					if (5 === grandTag || 6 === grandTag || 26 === grandTag || 27 === grandTag) {
						targetInst$jscomp$0 = ancestorInst = nodeTag;
						continue a;
					}
					container = container.parentNode;
				}
			}
			targetInst$jscomp$0 = targetInst$jscomp$0.return;
		}
		batchedUpdates$1(function() {
			var targetInst = ancestorInst, nativeEventTarget = getEventTarget(nativeEvent), dispatchQueue = [];
			a: {
				var reactName = topLevelEventsToReactNames.get(domEventName);
				if (void 0 !== reactName) {
					var SyntheticEventCtor = SyntheticEvent, reactEventType = domEventName;
					switch (domEventName) {
						case "keypress": if (0 === getEventCharCode(nativeEvent)) break a;
						case "keydown":
						case "keyup":
							SyntheticEventCtor = SyntheticKeyboardEvent;
							break;
						case "focusin":
							reactEventType = "focus";
							SyntheticEventCtor = SyntheticFocusEvent;
							break;
						case "focusout":
							reactEventType = "blur";
							SyntheticEventCtor = SyntheticFocusEvent;
							break;
						case "beforeblur":
						case "afterblur":
							SyntheticEventCtor = SyntheticFocusEvent;
							break;
						case "click": if (2 === nativeEvent.button) break a;
						case "auxclick":
						case "dblclick":
						case "mousedown":
						case "mousemove":
						case "mouseup":
						case "mouseout":
						case "mouseover":
						case "contextmenu":
							SyntheticEventCtor = SyntheticMouseEvent;
							break;
						case "drag":
						case "dragend":
						case "dragenter":
						case "dragexit":
						case "dragleave":
						case "dragover":
						case "dragstart":
						case "drop":
							SyntheticEventCtor = SyntheticDragEvent;
							break;
						case "touchcancel":
						case "touchend":
						case "touchmove":
						case "touchstart":
							SyntheticEventCtor = SyntheticTouchEvent;
							break;
						case ANIMATION_END:
						case ANIMATION_ITERATION:
						case ANIMATION_START:
							SyntheticEventCtor = SyntheticAnimationEvent;
							break;
						case TRANSITION_END:
							SyntheticEventCtor = SyntheticTransitionEvent;
							break;
						case "scroll":
						case "scrollend":
							SyntheticEventCtor = SyntheticUIEvent;
							break;
						case "wheel":
							SyntheticEventCtor = SyntheticWheelEvent;
							break;
						case "copy":
						case "cut":
						case "paste":
							SyntheticEventCtor = SyntheticClipboardEvent;
							break;
						case "gotpointercapture":
						case "lostpointercapture":
						case "pointercancel":
						case "pointerdown":
						case "pointermove":
						case "pointerout":
						case "pointerover":
						case "pointerup":
							SyntheticEventCtor = SyntheticPointerEvent;
							break;
						case "toggle":
						case "beforetoggle": SyntheticEventCtor = SyntheticToggleEvent;
					}
					var inCapturePhase = 0 !== (eventSystemFlags & 4), accumulateTargetOnly = !inCapturePhase && ("scroll" === domEventName || "scrollend" === domEventName), reactEventName = inCapturePhase ? null !== reactName ? reactName + "Capture" : null : reactName;
					inCapturePhase = [];
					for (var instance = targetInst, lastHostComponent; null !== instance;) {
						var _instance = instance;
						lastHostComponent = _instance.stateNode;
						_instance = _instance.tag;
						5 !== _instance && 26 !== _instance && 27 !== _instance || null === lastHostComponent || null === reactEventName || (_instance = getListener(instance, reactEventName), null != _instance && inCapturePhase.push(createDispatchListener(instance, _instance, lastHostComponent)));
						if (accumulateTargetOnly) break;
						instance = instance.return;
					}
					0 < inCapturePhase.length && (reactName = new SyntheticEventCtor(reactName, reactEventType, null, nativeEvent, nativeEventTarget), dispatchQueue.push({
						event: reactName,
						listeners: inCapturePhase
					}));
				}
			}
			if (0 === (eventSystemFlags & 7)) {
				a: {
					reactName = "mouseover" === domEventName || "pointerover" === domEventName;
					SyntheticEventCtor = "mouseout" === domEventName || "pointerout" === domEventName;
					if (reactName && nativeEvent !== currentReplayingEvent && (reactEventType = nativeEvent.relatedTarget || nativeEvent.fromElement) && (getClosestInstanceFromNode(reactEventType) || reactEventType[internalContainerInstanceKey])) break a;
					if (SyntheticEventCtor || reactName) {
						reactName = nativeEventTarget.window === nativeEventTarget ? nativeEventTarget : (reactName = nativeEventTarget.ownerDocument) ? reactName.defaultView || reactName.parentWindow : window;
						if (SyntheticEventCtor) {
							if (reactEventType = nativeEvent.relatedTarget || nativeEvent.toElement, SyntheticEventCtor = targetInst, reactEventType = reactEventType ? getClosestInstanceFromNode(reactEventType) : null, null !== reactEventType && (accumulateTargetOnly = getNearestMountedFiber(reactEventType), inCapturePhase = reactEventType.tag, reactEventType !== accumulateTargetOnly || 5 !== inCapturePhase && 27 !== inCapturePhase && 6 !== inCapturePhase)) reactEventType = null;
						} else SyntheticEventCtor = null, reactEventType = targetInst;
						if (SyntheticEventCtor !== reactEventType) {
							inCapturePhase = SyntheticMouseEvent;
							_instance = "onMouseLeave";
							reactEventName = "onMouseEnter";
							instance = "mouse";
							if ("pointerout" === domEventName || "pointerover" === domEventName) inCapturePhase = SyntheticPointerEvent, _instance = "onPointerLeave", reactEventName = "onPointerEnter", instance = "pointer";
							accumulateTargetOnly = null == SyntheticEventCtor ? reactName : getNodeFromInstance(SyntheticEventCtor);
							lastHostComponent = null == reactEventType ? reactName : getNodeFromInstance(reactEventType);
							reactName = new inCapturePhase(_instance, instance + "leave", SyntheticEventCtor, nativeEvent, nativeEventTarget);
							reactName.target = accumulateTargetOnly;
							reactName.relatedTarget = lastHostComponent;
							_instance = null;
							getClosestInstanceFromNode(nativeEventTarget) === targetInst && (inCapturePhase = new inCapturePhase(reactEventName, instance + "enter", reactEventType, nativeEvent, nativeEventTarget), inCapturePhase.target = lastHostComponent, inCapturePhase.relatedTarget = accumulateTargetOnly, _instance = inCapturePhase);
							accumulateTargetOnly = _instance;
							if (SyntheticEventCtor && reactEventType) b: {
								inCapturePhase = getParent;
								reactEventName = SyntheticEventCtor;
								instance = reactEventType;
								lastHostComponent = 0;
								for (_instance = reactEventName; _instance; _instance = inCapturePhase(_instance)) lastHostComponent++;
								_instance = 0;
								for (var tempB = instance; tempB; tempB = inCapturePhase(tempB)) _instance++;
								for (; 0 < lastHostComponent - _instance;) reactEventName = inCapturePhase(reactEventName), lastHostComponent--;
								for (; 0 < _instance - lastHostComponent;) instance = inCapturePhase(instance), _instance--;
								for (; lastHostComponent--;) {
									if (reactEventName === instance || null !== instance && reactEventName === instance.alternate) {
										inCapturePhase = reactEventName;
										break b;
									}
									reactEventName = inCapturePhase(reactEventName);
									instance = inCapturePhase(instance);
								}
								inCapturePhase = null;
							}
							else inCapturePhase = null;
							null !== SyntheticEventCtor && accumulateEnterLeaveListenersForEvent(dispatchQueue, reactName, SyntheticEventCtor, inCapturePhase, !1);
							null !== reactEventType && null !== accumulateTargetOnly && accumulateEnterLeaveListenersForEvent(dispatchQueue, accumulateTargetOnly, reactEventType, inCapturePhase, !0);
						}
					}
				}
				a: {
					reactName = targetInst ? getNodeFromInstance(targetInst) : window;
					SyntheticEventCtor = reactName.nodeName && reactName.nodeName.toLowerCase();
					if ("select" === SyntheticEventCtor || "input" === SyntheticEventCtor && "file" === reactName.type) var getTargetInstFunc = getTargetInstForChangeEvent;
					else if (isTextInputElement(reactName)) if (isInputEventSupported) getTargetInstFunc = getTargetInstForInputOrChangeEvent;
					else {
						getTargetInstFunc = getTargetInstForInputEventPolyfill;
						var handleEventFunc = handleEventsForInputEventPolyfill;
					}
					else SyntheticEventCtor = reactName.nodeName, !SyntheticEventCtor || "input" !== SyntheticEventCtor.toLowerCase() || "checkbox" !== reactName.type && "radio" !== reactName.type ? targetInst && isCustomElement(targetInst.elementType) && (getTargetInstFunc = getTargetInstForChangeEvent) : getTargetInstFunc = getTargetInstForClickEvent;
					if (getTargetInstFunc && (getTargetInstFunc = getTargetInstFunc(domEventName, targetInst))) {
						createAndAccumulateChangeEvent(dispatchQueue, getTargetInstFunc, nativeEvent, nativeEventTarget);
						break a;
					}
					handleEventFunc && handleEventFunc(domEventName, reactName, targetInst);
					"focusout" === domEventName && targetInst && "number" === reactName.type && null != targetInst.memoizedProps.value && setDefaultValue(reactName, "number", reactName.value);
				}
				handleEventFunc = targetInst ? getNodeFromInstance(targetInst) : window;
				switch (domEventName) {
					case "focusin":
						if (isTextInputElement(handleEventFunc) || "true" === handleEventFunc.contentEditable) activeElement = handleEventFunc, activeElementInst = targetInst, lastSelection = null;
						break;
					case "focusout":
						lastSelection = activeElementInst = activeElement = null;
						break;
					case "mousedown":
						mouseDown = !0;
						break;
					case "contextmenu":
					case "mouseup":
					case "dragend":
						mouseDown = !1;
						constructSelectEvent(dispatchQueue, nativeEvent, nativeEventTarget);
						break;
					case "selectionchange": if (skipSelectionChangeEvent) break;
					case "keydown":
					case "keyup": constructSelectEvent(dispatchQueue, nativeEvent, nativeEventTarget);
				}
				var fallbackData;
				if (canUseCompositionEvent) b: {
					switch (domEventName) {
						case "compositionstart":
							var eventType = "onCompositionStart";
							break b;
						case "compositionend":
							eventType = "onCompositionEnd";
							break b;
						case "compositionupdate":
							eventType = "onCompositionUpdate";
							break b;
					}
					eventType = void 0;
				}
				else isComposing ? isFallbackCompositionEnd(domEventName, nativeEvent) && (eventType = "onCompositionEnd") : "keydown" === domEventName && 229 === nativeEvent.keyCode && (eventType = "onCompositionStart");
				eventType && (useFallbackCompositionData && "ko" !== nativeEvent.locale && (isComposing || "onCompositionStart" !== eventType ? "onCompositionEnd" === eventType && isComposing && (fallbackData = getData()) : (root = nativeEventTarget, startText = "value" in root ? root.value : root.textContent, isComposing = !0)), handleEventFunc = accumulateTwoPhaseListeners(targetInst, eventType), 0 < handleEventFunc.length && (eventType = new SyntheticCompositionEvent(eventType, domEventName, null, nativeEvent, nativeEventTarget), dispatchQueue.push({
					event: eventType,
					listeners: handleEventFunc
				}), fallbackData ? eventType.data = fallbackData : (fallbackData = getDataFromCustomEvent(nativeEvent), null !== fallbackData && (eventType.data = fallbackData))));
				if (fallbackData = canUseTextInputEvent ? getNativeBeforeInputChars(domEventName, nativeEvent) : getFallbackBeforeInputChars(domEventName, nativeEvent)) eventType = accumulateTwoPhaseListeners(targetInst, "onBeforeInput"), 0 < eventType.length && (handleEventFunc = new SyntheticCompositionEvent("onBeforeInput", "beforeinput", null, nativeEvent, nativeEventTarget), dispatchQueue.push({
					event: handleEventFunc,
					listeners: eventType
				}), handleEventFunc.data = fallbackData);
				extractEvents$1(dispatchQueue, domEventName, targetInst, nativeEvent, nativeEventTarget);
			}
			processDispatchQueue(dispatchQueue, eventSystemFlags);
		});
	}
	function createDispatchListener(instance, listener, currentTarget) {
		return {
			instance,
			listener,
			currentTarget
		};
	}
	function accumulateTwoPhaseListeners(targetFiber, reactName) {
		for (var captureName = reactName + "Capture", listeners = []; null !== targetFiber;) {
			var _instance2 = targetFiber, stateNode = _instance2.stateNode;
			_instance2 = _instance2.tag;
			5 !== _instance2 && 26 !== _instance2 && 27 !== _instance2 || null === stateNode || (_instance2 = getListener(targetFiber, captureName), null != _instance2 && listeners.unshift(createDispatchListener(targetFiber, _instance2, stateNode)), _instance2 = getListener(targetFiber, reactName), null != _instance2 && listeners.push(createDispatchListener(targetFiber, _instance2, stateNode)));
			if (3 === targetFiber.tag) return listeners;
			targetFiber = targetFiber.return;
		}
		return [];
	}
	function getParent(inst) {
		if (null === inst) return null;
		do
			inst = inst.return;
		while (inst && 5 !== inst.tag && 27 !== inst.tag);
		return inst ? inst : null;
	}
	function accumulateEnterLeaveListenersForEvent(dispatchQueue, event, target, common, inCapturePhase) {
		for (var registrationName = event._reactName, listeners = []; null !== target && target !== common;) {
			var _instance3 = target, alternate = _instance3.alternate, stateNode = _instance3.stateNode;
			_instance3 = _instance3.tag;
			if (null !== alternate && alternate === common) break;
			5 !== _instance3 && 26 !== _instance3 && 27 !== _instance3 || null === stateNode || (alternate = stateNode, inCapturePhase ? (stateNode = getListener(target, registrationName), null != stateNode && listeners.unshift(createDispatchListener(target, stateNode, alternate))) : inCapturePhase || (stateNode = getListener(target, registrationName), null != stateNode && listeners.push(createDispatchListener(target, stateNode, alternate))));
			target = target.return;
		}
		0 !== listeners.length && dispatchQueue.push({
			event,
			listeners
		});
	}
	var NORMALIZE_NEWLINES_REGEX = /\r\n?/g, NORMALIZE_NULL_AND_REPLACEMENT_REGEX = /\u0000|\uFFFD/g;
	function normalizeMarkupForTextOrAttribute(markup) {
		return ("string" === typeof markup ? markup : "" + markup).replace(NORMALIZE_NEWLINES_REGEX, "\n").replace(NORMALIZE_NULL_AND_REPLACEMENT_REGEX, "");
	}
	function checkForUnmatchedText(serverText, clientText) {
		clientText = normalizeMarkupForTextOrAttribute(clientText);
		return normalizeMarkupForTextOrAttribute(serverText) === clientText ? !0 : !1;
	}
	function setProp(domElement, tag, key, value, props, prevValue) {
		switch (key) {
			case "children":
				"string" === typeof value ? "body" === tag || "textarea" === tag && "" === value || setTextContent(domElement, value) : ("number" === typeof value || "bigint" === typeof value) && "body" !== tag && setTextContent(domElement, "" + value);
				break;
			case "className":
				setValueForKnownAttribute(domElement, "class", value);
				break;
			case "tabIndex":
				setValueForKnownAttribute(domElement, "tabindex", value);
				break;
			case "dir":
			case "role":
			case "viewBox":
			case "width":
			case "height":
				setValueForKnownAttribute(domElement, key, value);
				break;
			case "style":
				setValueForStyles(domElement, value, prevValue);
				break;
			case "data": if ("object" !== tag) {
				setValueForKnownAttribute(domElement, "data", value);
				break;
			}
			case "src":
			case "href":
				if ("" === value && ("a" !== tag || "href" !== key)) {
					domElement.removeAttribute(key);
					break;
				}
				if (null == value || "function" === typeof value || "symbol" === typeof value || "boolean" === typeof value) {
					domElement.removeAttribute(key);
					break;
				}
				value = sanitizeURL("" + value);
				domElement.setAttribute(key, value);
				break;
			case "action":
			case "formAction":
				if ("function" === typeof value) {
					domElement.setAttribute(key, "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");
					break;
				} else "function" === typeof prevValue && ("formAction" === key ? ("input" !== tag && setProp(domElement, tag, "name", props.name, props, null), setProp(domElement, tag, "formEncType", props.formEncType, props, null), setProp(domElement, tag, "formMethod", props.formMethod, props, null), setProp(domElement, tag, "formTarget", props.formTarget, props, null)) : (setProp(domElement, tag, "encType", props.encType, props, null), setProp(domElement, tag, "method", props.method, props, null), setProp(domElement, tag, "target", props.target, props, null)));
				if (null == value || "symbol" === typeof value || "boolean" === typeof value) {
					domElement.removeAttribute(key);
					break;
				}
				value = sanitizeURL("" + value);
				domElement.setAttribute(key, value);
				break;
			case "onClick":
				null != value && (domElement.onclick = noop$1);
				break;
			case "onScroll":
				null != value && listenToNonDelegatedEvent("scroll", domElement);
				break;
			case "onScrollEnd":
				null != value && listenToNonDelegatedEvent("scrollend", domElement);
				break;
			case "dangerouslySetInnerHTML":
				if (null != value) {
					if ("object" !== typeof value || !("__html" in value)) throw Error(formatProdErrorMessage(61));
					key = value.__html;
					if (null != key) {
						if (null != props.children) throw Error(formatProdErrorMessage(60));
						domElement.innerHTML = key;
					}
				}
				break;
			case "multiple":
				domElement.multiple = value && "function" !== typeof value && "symbol" !== typeof value;
				break;
			case "muted":
				domElement.muted = value && "function" !== typeof value && "symbol" !== typeof value;
				break;
			case "suppressContentEditableWarning":
			case "suppressHydrationWarning":
			case "defaultValue":
			case "defaultChecked":
			case "innerHTML":
			case "ref": break;
			case "autoFocus": break;
			case "xlinkHref":
				if (null == value || "function" === typeof value || "boolean" === typeof value || "symbol" === typeof value) {
					domElement.removeAttribute("xlink:href");
					break;
				}
				key = sanitizeURL("" + value);
				domElement.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", key);
				break;
			case "contentEditable":
			case "spellCheck":
			case "draggable":
			case "value":
			case "autoReverse":
			case "externalResourcesRequired":
			case "focusable":
			case "preserveAlpha":
				null != value && "function" !== typeof value && "symbol" !== typeof value ? domElement.setAttribute(key, "" + value) : domElement.removeAttribute(key);
				break;
			case "inert":
			case "allowFullScreen":
			case "async":
			case "autoPlay":
			case "controls":
			case "default":
			case "defer":
			case "disabled":
			case "disablePictureInPicture":
			case "disableRemotePlayback":
			case "formNoValidate":
			case "hidden":
			case "loop":
			case "noModule":
			case "noValidate":
			case "open":
			case "playsInline":
			case "readOnly":
			case "required":
			case "reversed":
			case "scoped":
			case "seamless":
			case "itemScope":
				value && "function" !== typeof value && "symbol" !== typeof value ? domElement.setAttribute(key, "") : domElement.removeAttribute(key);
				break;
			case "capture":
			case "download":
				!0 === value ? domElement.setAttribute(key, "") : !1 !== value && null != value && "function" !== typeof value && "symbol" !== typeof value ? domElement.setAttribute(key, value) : domElement.removeAttribute(key);
				break;
			case "cols":
			case "rows":
			case "size":
			case "span":
				null != value && "function" !== typeof value && "symbol" !== typeof value && !isNaN(value) && 1 <= value ? domElement.setAttribute(key, value) : domElement.removeAttribute(key);
				break;
			case "rowSpan":
			case "start":
				null == value || "function" === typeof value || "symbol" === typeof value || isNaN(value) ? domElement.removeAttribute(key) : domElement.setAttribute(key, value);
				break;
			case "popover":
				listenToNonDelegatedEvent("beforetoggle", domElement);
				listenToNonDelegatedEvent("toggle", domElement);
				setValueForAttribute(domElement, "popover", value);
				break;
			case "xlinkActuate":
				setValueForNamespacedAttribute(domElement, "http://www.w3.org/1999/xlink", "xlink:actuate", value);
				break;
			case "xlinkArcrole":
				setValueForNamespacedAttribute(domElement, "http://www.w3.org/1999/xlink", "xlink:arcrole", value);
				break;
			case "xlinkRole":
				setValueForNamespacedAttribute(domElement, "http://www.w3.org/1999/xlink", "xlink:role", value);
				break;
			case "xlinkShow":
				setValueForNamespacedAttribute(domElement, "http://www.w3.org/1999/xlink", "xlink:show", value);
				break;
			case "xlinkTitle":
				setValueForNamespacedAttribute(domElement, "http://www.w3.org/1999/xlink", "xlink:title", value);
				break;
			case "xlinkType":
				setValueForNamespacedAttribute(domElement, "http://www.w3.org/1999/xlink", "xlink:type", value);
				break;
			case "xmlBase":
				setValueForNamespacedAttribute(domElement, "http://www.w3.org/XML/1998/namespace", "xml:base", value);
				break;
			case "xmlLang":
				setValueForNamespacedAttribute(domElement, "http://www.w3.org/XML/1998/namespace", "xml:lang", value);
				break;
			case "xmlSpace":
				setValueForNamespacedAttribute(domElement, "http://www.w3.org/XML/1998/namespace", "xml:space", value);
				break;
			case "is":
				setValueForAttribute(domElement, "is", value);
				break;
			case "innerText":
			case "textContent": break;
			default: if (!(2 < key.length) || "o" !== key[0] && "O" !== key[0] || "n" !== key[1] && "N" !== key[1]) key = aliases.get(key) || key, setValueForAttribute(domElement, key, value);
		}
	}
	function setPropOnCustomElement(domElement, tag, key, value, props, prevValue) {
		switch (key) {
			case "style":
				setValueForStyles(domElement, value, prevValue);
				break;
			case "dangerouslySetInnerHTML":
				if (null != value) {
					if ("object" !== typeof value || !("__html" in value)) throw Error(formatProdErrorMessage(61));
					key = value.__html;
					if (null != key) {
						if (null != props.children) throw Error(formatProdErrorMessage(60));
						domElement.innerHTML = key;
					}
				}
				break;
			case "children":
				"string" === typeof value ? setTextContent(domElement, value) : ("number" === typeof value || "bigint" === typeof value) && setTextContent(domElement, "" + value);
				break;
			case "onScroll":
				null != value && listenToNonDelegatedEvent("scroll", domElement);
				break;
			case "onScrollEnd":
				null != value && listenToNonDelegatedEvent("scrollend", domElement);
				break;
			case "onClick":
				null != value && (domElement.onclick = noop$1);
				break;
			case "suppressContentEditableWarning":
			case "suppressHydrationWarning":
			case "innerHTML":
			case "ref": break;
			case "innerText":
			case "textContent": break;
			default: if (!registrationNameDependencies.hasOwnProperty(key)) a: {
				if ("o" === key[0] && "n" === key[1] && (props = key.endsWith("Capture"), tag = key.slice(2, props ? key.length - 7 : void 0), prevValue = domElement[internalPropsKey] || null, prevValue = null != prevValue ? prevValue[key] : null, "function" === typeof prevValue && domElement.removeEventListener(tag, prevValue, props), "function" === typeof value)) {
					"function" !== typeof prevValue && null !== prevValue && (key in domElement ? domElement[key] = null : domElement.hasAttribute(key) && domElement.removeAttribute(key));
					domElement.addEventListener(tag, value, props);
					break a;
				}
				key in domElement ? domElement[key] = value : !0 === value ? domElement.setAttribute(key, "") : setValueForAttribute(domElement, key, value);
			}
		}
	}
	function setInitialProperties(domElement, tag, props) {
		switch (tag) {
			case "div":
			case "span":
			case "svg":
			case "path":
			case "a":
			case "g":
			case "p":
			case "li": break;
			case "img":
				listenToNonDelegatedEvent("error", domElement);
				listenToNonDelegatedEvent("load", domElement);
				var hasSrc = !1, hasSrcSet = !1, propKey;
				for (propKey in props) if (props.hasOwnProperty(propKey)) {
					var propValue = props[propKey];
					if (null != propValue) switch (propKey) {
						case "src":
							hasSrc = !0;
							break;
						case "srcSet":
							hasSrcSet = !0;
							break;
						case "children":
						case "dangerouslySetInnerHTML": throw Error(formatProdErrorMessage(137, tag));
						default: setProp(domElement, tag, propKey, propValue, props, null);
					}
				}
				hasSrcSet && setProp(domElement, tag, "srcSet", props.srcSet, props, null);
				hasSrc && setProp(domElement, tag, "src", props.src, props, null);
				return;
			case "input":
				listenToNonDelegatedEvent("invalid", domElement);
				var defaultValue = propKey = propValue = hasSrcSet = null, checked = null, defaultChecked = null;
				for (hasSrc in props) if (props.hasOwnProperty(hasSrc)) {
					var propValue$184 = props[hasSrc];
					if (null != propValue$184) switch (hasSrc) {
						case "name":
							hasSrcSet = propValue$184;
							break;
						case "type":
							propValue = propValue$184;
							break;
						case "checked":
							checked = propValue$184;
							break;
						case "defaultChecked":
							defaultChecked = propValue$184;
							break;
						case "value":
							propKey = propValue$184;
							break;
						case "defaultValue":
							defaultValue = propValue$184;
							break;
						case "children":
						case "dangerouslySetInnerHTML":
							if (null != propValue$184) throw Error(formatProdErrorMessage(137, tag));
							break;
						default: setProp(domElement, tag, hasSrc, propValue$184, props, null);
					}
				}
				initInput(domElement, propKey, defaultValue, checked, defaultChecked, propValue, hasSrcSet, !1);
				return;
			case "select":
				listenToNonDelegatedEvent("invalid", domElement);
				hasSrc = propValue = propKey = null;
				for (hasSrcSet in props) if (props.hasOwnProperty(hasSrcSet) && (defaultValue = props[hasSrcSet], null != defaultValue)) switch (hasSrcSet) {
					case "value":
						propKey = defaultValue;
						break;
					case "defaultValue":
						propValue = defaultValue;
						break;
					case "multiple": hasSrc = defaultValue;
					default: setProp(domElement, tag, hasSrcSet, defaultValue, props, null);
				}
				tag = propKey;
				props = propValue;
				domElement.multiple = !!hasSrc;
				null != tag ? updateOptions(domElement, !!hasSrc, tag, !1) : null != props && updateOptions(domElement, !!hasSrc, props, !0);
				return;
			case "textarea":
				listenToNonDelegatedEvent("invalid", domElement);
				propKey = hasSrcSet = hasSrc = null;
				for (propValue in props) if (props.hasOwnProperty(propValue) && (defaultValue = props[propValue], null != defaultValue)) switch (propValue) {
					case "value":
						hasSrc = defaultValue;
						break;
					case "defaultValue":
						hasSrcSet = defaultValue;
						break;
					case "children":
						propKey = defaultValue;
						break;
					case "dangerouslySetInnerHTML":
						if (null != defaultValue) throw Error(formatProdErrorMessage(91));
						break;
					default: setProp(domElement, tag, propValue, defaultValue, props, null);
				}
				initTextarea(domElement, hasSrc, hasSrcSet, propKey);
				return;
			case "option":
				for (checked in props) if (props.hasOwnProperty(checked) && (hasSrc = props[checked], null != hasSrc)) switch (checked) {
					case "selected":
						domElement.selected = hasSrc && "function" !== typeof hasSrc && "symbol" !== typeof hasSrc;
						break;
					default: setProp(domElement, tag, checked, hasSrc, props, null);
				}
				return;
			case "dialog":
				listenToNonDelegatedEvent("beforetoggle", domElement);
				listenToNonDelegatedEvent("toggle", domElement);
				listenToNonDelegatedEvent("cancel", domElement);
				listenToNonDelegatedEvent("close", domElement);
				break;
			case "iframe":
			case "object":
				listenToNonDelegatedEvent("load", domElement);
				break;
			case "video":
			case "audio":
				for (hasSrc = 0; hasSrc < mediaEventTypes.length; hasSrc++) listenToNonDelegatedEvent(mediaEventTypes[hasSrc], domElement);
				break;
			case "image":
				listenToNonDelegatedEvent("error", domElement);
				listenToNonDelegatedEvent("load", domElement);
				break;
			case "details":
				listenToNonDelegatedEvent("toggle", domElement);
				break;
			case "embed":
			case "source":
			case "link": listenToNonDelegatedEvent("error", domElement), listenToNonDelegatedEvent("load", domElement);
			case "area":
			case "base":
			case "br":
			case "col":
			case "hr":
			case "keygen":
			case "meta":
			case "param":
			case "track":
			case "wbr":
			case "menuitem":
				for (defaultChecked in props) if (props.hasOwnProperty(defaultChecked) && (hasSrc = props[defaultChecked], null != hasSrc)) switch (defaultChecked) {
					case "children":
					case "dangerouslySetInnerHTML": throw Error(formatProdErrorMessage(137, tag));
					default: setProp(domElement, tag, defaultChecked, hasSrc, props, null);
				}
				return;
			default: if (isCustomElement(tag)) {
				for (propValue$184 in props) props.hasOwnProperty(propValue$184) && (hasSrc = props[propValue$184], void 0 !== hasSrc && setPropOnCustomElement(domElement, tag, propValue$184, hasSrc, props, void 0));
				return;
			}
		}
		for (defaultValue in props) props.hasOwnProperty(defaultValue) && (hasSrc = props[defaultValue], null != hasSrc && setProp(domElement, tag, defaultValue, hasSrc, props, null));
	}
	function updateProperties(domElement, tag, lastProps, nextProps) {
		switch (tag) {
			case "div":
			case "span":
			case "svg":
			case "path":
			case "a":
			case "g":
			case "p":
			case "li": break;
			case "input":
				var name = null, type = null, value = null, defaultValue = null, lastDefaultValue = null, checked = null, defaultChecked = null;
				for (propKey in lastProps) {
					var lastProp = lastProps[propKey];
					if (lastProps.hasOwnProperty(propKey) && null != lastProp) switch (propKey) {
						case "checked": break;
						case "value": break;
						case "defaultValue": lastDefaultValue = lastProp;
						default: nextProps.hasOwnProperty(propKey) || setProp(domElement, tag, propKey, null, nextProps, lastProp);
					}
				}
				for (var propKey$201 in nextProps) {
					var propKey = nextProps[propKey$201];
					lastProp = lastProps[propKey$201];
					if (nextProps.hasOwnProperty(propKey$201) && (null != propKey || null != lastProp)) switch (propKey$201) {
						case "type":
							type = propKey;
							break;
						case "name":
							name = propKey;
							break;
						case "checked":
							checked = propKey;
							break;
						case "defaultChecked":
							defaultChecked = propKey;
							break;
						case "value":
							value = propKey;
							break;
						case "defaultValue":
							defaultValue = propKey;
							break;
						case "children":
						case "dangerouslySetInnerHTML":
							if (null != propKey) throw Error(formatProdErrorMessage(137, tag));
							break;
						default: propKey !== lastProp && setProp(domElement, tag, propKey$201, propKey, nextProps, lastProp);
					}
				}
				updateInput(domElement, value, defaultValue, lastDefaultValue, checked, defaultChecked, type, name);
				return;
			case "select":
				propKey = value = defaultValue = propKey$201 = null;
				for (type in lastProps) if (lastDefaultValue = lastProps[type], lastProps.hasOwnProperty(type) && null != lastDefaultValue) switch (type) {
					case "value": break;
					case "multiple": propKey = lastDefaultValue;
					default: nextProps.hasOwnProperty(type) || setProp(domElement, tag, type, null, nextProps, lastDefaultValue);
				}
				for (name in nextProps) if (type = nextProps[name], lastDefaultValue = lastProps[name], nextProps.hasOwnProperty(name) && (null != type || null != lastDefaultValue)) switch (name) {
					case "value":
						propKey$201 = type;
						break;
					case "defaultValue":
						defaultValue = type;
						break;
					case "multiple": value = type;
					default: type !== lastDefaultValue && setProp(domElement, tag, name, type, nextProps, lastDefaultValue);
				}
				tag = defaultValue;
				lastProps = value;
				nextProps = propKey;
				null != propKey$201 ? updateOptions(domElement, !!lastProps, propKey$201, !1) : !!nextProps !== !!lastProps && (null != tag ? updateOptions(domElement, !!lastProps, tag, !0) : updateOptions(domElement, !!lastProps, lastProps ? [] : "", !1));
				return;
			case "textarea":
				propKey = propKey$201 = null;
				for (defaultValue in lastProps) if (name = lastProps[defaultValue], lastProps.hasOwnProperty(defaultValue) && null != name && !nextProps.hasOwnProperty(defaultValue)) switch (defaultValue) {
					case "value": break;
					case "children": break;
					default: setProp(domElement, tag, defaultValue, null, nextProps, name);
				}
				for (value in nextProps) if (name = nextProps[value], type = lastProps[value], nextProps.hasOwnProperty(value) && (null != name || null != type)) switch (value) {
					case "value":
						propKey$201 = name;
						break;
					case "defaultValue":
						propKey = name;
						break;
					case "children": break;
					case "dangerouslySetInnerHTML":
						if (null != name) throw Error(formatProdErrorMessage(91));
						break;
					default: name !== type && setProp(domElement, tag, value, name, nextProps, type);
				}
				updateTextarea(domElement, propKey$201, propKey);
				return;
			case "option":
				for (var propKey$217 in lastProps) if (propKey$201 = lastProps[propKey$217], lastProps.hasOwnProperty(propKey$217) && null != propKey$201 && !nextProps.hasOwnProperty(propKey$217)) switch (propKey$217) {
					case "selected":
						domElement.selected = !1;
						break;
					default: setProp(domElement, tag, propKey$217, null, nextProps, propKey$201);
				}
				for (lastDefaultValue in nextProps) if (propKey$201 = nextProps[lastDefaultValue], propKey = lastProps[lastDefaultValue], nextProps.hasOwnProperty(lastDefaultValue) && propKey$201 !== propKey && (null != propKey$201 || null != propKey)) switch (lastDefaultValue) {
					case "selected":
						domElement.selected = propKey$201 && "function" !== typeof propKey$201 && "symbol" !== typeof propKey$201;
						break;
					default: setProp(domElement, tag, lastDefaultValue, propKey$201, nextProps, propKey);
				}
				return;
			case "img":
			case "link":
			case "area":
			case "base":
			case "br":
			case "col":
			case "embed":
			case "hr":
			case "keygen":
			case "meta":
			case "param":
			case "source":
			case "track":
			case "wbr":
			case "menuitem":
				for (var propKey$222 in lastProps) propKey$201 = lastProps[propKey$222], lastProps.hasOwnProperty(propKey$222) && null != propKey$201 && !nextProps.hasOwnProperty(propKey$222) && setProp(domElement, tag, propKey$222, null, nextProps, propKey$201);
				for (checked in nextProps) if (propKey$201 = nextProps[checked], propKey = lastProps[checked], nextProps.hasOwnProperty(checked) && propKey$201 !== propKey && (null != propKey$201 || null != propKey)) switch (checked) {
					case "children":
					case "dangerouslySetInnerHTML":
						if (null != propKey$201) throw Error(formatProdErrorMessage(137, tag));
						break;
					default: setProp(domElement, tag, checked, propKey$201, nextProps, propKey);
				}
				return;
			default: if (isCustomElement(tag)) {
				for (var propKey$227 in lastProps) propKey$201 = lastProps[propKey$227], lastProps.hasOwnProperty(propKey$227) && void 0 !== propKey$201 && !nextProps.hasOwnProperty(propKey$227) && setPropOnCustomElement(domElement, tag, propKey$227, void 0, nextProps, propKey$201);
				for (defaultChecked in nextProps) propKey$201 = nextProps[defaultChecked], propKey = lastProps[defaultChecked], !nextProps.hasOwnProperty(defaultChecked) || propKey$201 === propKey || void 0 === propKey$201 && void 0 === propKey || setPropOnCustomElement(domElement, tag, defaultChecked, propKey$201, nextProps, propKey);
				return;
			}
		}
		for (var propKey$232 in lastProps) propKey$201 = lastProps[propKey$232], lastProps.hasOwnProperty(propKey$232) && null != propKey$201 && !nextProps.hasOwnProperty(propKey$232) && setProp(domElement, tag, propKey$232, null, nextProps, propKey$201);
		for (lastProp in nextProps) propKey$201 = nextProps[lastProp], propKey = lastProps[lastProp], !nextProps.hasOwnProperty(lastProp) || propKey$201 === propKey || null == propKey$201 && null == propKey || setProp(domElement, tag, lastProp, propKey$201, nextProps, propKey);
	}
	function isLikelyStaticResource(initiatorType) {
		switch (initiatorType) {
			case "css":
			case "script":
			case "font":
			case "img":
			case "image":
			case "input":
			case "link": return !0;
			default: return !1;
		}
	}
	function estimateBandwidth() {
		if ("function" === typeof performance.getEntriesByType) {
			for (var count = 0, bits = 0, resourceEntries = performance.getEntriesByType("resource"), i = 0; i < resourceEntries.length; i++) {
				var entry = resourceEntries[i], transferSize = entry.transferSize, initiatorType = entry.initiatorType, duration = entry.duration;
				if (transferSize && duration && isLikelyStaticResource(initiatorType)) {
					initiatorType = 0;
					duration = entry.responseEnd;
					for (i += 1; i < resourceEntries.length; i++) {
						var overlapEntry = resourceEntries[i], overlapStartTime = overlapEntry.startTime;
						if (overlapStartTime > duration) break;
						var overlapTransferSize = overlapEntry.transferSize, overlapInitiatorType = overlapEntry.initiatorType;
						overlapTransferSize && isLikelyStaticResource(overlapInitiatorType) && (overlapEntry = overlapEntry.responseEnd, initiatorType += overlapTransferSize * (overlapEntry < duration ? 1 : (duration - overlapStartTime) / (overlapEntry - overlapStartTime)));
					}
					--i;
					bits += 8 * (transferSize + initiatorType) / (entry.duration / 1e3);
					count++;
					if (10 < count) break;
				}
			}
			if (0 < count) return bits / count / 1e6;
		}
		return navigator.connection && (count = navigator.connection.downlink, "number" === typeof count) ? count : 5;
	}
	var eventsEnabled = null, selectionInformation = null;
	function getOwnerDocumentFromRootContainer(rootContainerElement) {
		return 9 === rootContainerElement.nodeType ? rootContainerElement : rootContainerElement.ownerDocument;
	}
	function getOwnHostContext(namespaceURI) {
		switch (namespaceURI) {
			case "http://www.w3.org/2000/svg": return 1;
			case "http://www.w3.org/1998/Math/MathML": return 2;
			default: return 0;
		}
	}
	function getChildHostContextProd(parentNamespace, type) {
		if (0 === parentNamespace) switch (type) {
			case "svg": return 1;
			case "math": return 2;
			default: return 0;
		}
		return 1 === parentNamespace && "foreignObject" === type ? 0 : parentNamespace;
	}
	function shouldSetTextContent(type, props) {
		return "textarea" === type || "noscript" === type || "string" === typeof props.children || "number" === typeof props.children || "bigint" === typeof props.children || "object" === typeof props.dangerouslySetInnerHTML && null !== props.dangerouslySetInnerHTML && null != props.dangerouslySetInnerHTML.__html;
	}
	var currentPopstateTransitionEvent = null;
	function shouldAttemptEagerTransition() {
		var event = window.event;
		if (event && "popstate" === event.type) {
			if (event === currentPopstateTransitionEvent) return !1;
			currentPopstateTransitionEvent = event;
			return !0;
		}
		currentPopstateTransitionEvent = null;
		return !1;
	}
	var scheduleTimeout = "function" === typeof setTimeout ? setTimeout : void 0, cancelTimeout = "function" === typeof clearTimeout ? clearTimeout : void 0, localPromise = "function" === typeof Promise ? Promise : void 0, scheduleMicrotask = "function" === typeof queueMicrotask ? queueMicrotask : "undefined" !== typeof localPromise ? function(callback) {
		return localPromise.resolve(null).then(callback).catch(handleErrorInNextTick);
	} : scheduleTimeout;
	function handleErrorInNextTick(error) {
		setTimeout(function() {
			throw error;
		});
	}
	function isSingletonScope(type) {
		return "head" === type;
	}
	function clearHydrationBoundary(parentInstance, hydrationInstance) {
		var node = hydrationInstance, depth = 0;
		do {
			var nextNode = node.nextSibling;
			parentInstance.removeChild(node);
			if (nextNode && 8 === nextNode.nodeType) if (node = nextNode.data, "/$" === node || "/&" === node) {
				if (0 === depth) {
					parentInstance.removeChild(nextNode);
					retryIfBlockedOn(hydrationInstance);
					return;
				}
				depth--;
			} else if ("$" === node || "$?" === node || "$~" === node || "$!" === node || "&" === node) depth++;
			else if ("html" === node) releaseSingletonInstance(parentInstance.ownerDocument.documentElement);
			else if ("head" === node) {
				node = parentInstance.ownerDocument.head;
				releaseSingletonInstance(node);
				for (var node$jscomp$0 = node.firstChild; node$jscomp$0;) {
					var nextNode$jscomp$0 = node$jscomp$0.nextSibling, nodeName = node$jscomp$0.nodeName;
					node$jscomp$0[internalHoistableMarker] || "SCRIPT" === nodeName || "STYLE" === nodeName || "LINK" === nodeName && "stylesheet" === node$jscomp$0.rel.toLowerCase() || node.removeChild(node$jscomp$0);
					node$jscomp$0 = nextNode$jscomp$0;
				}
			} else "body" === node && releaseSingletonInstance(parentInstance.ownerDocument.body);
			node = nextNode;
		} while (node);
		retryIfBlockedOn(hydrationInstance);
	}
	function hideOrUnhideDehydratedBoundary(suspenseInstance, isHidden) {
		var node = suspenseInstance;
		suspenseInstance = 0;
		do {
			var nextNode = node.nextSibling;
			1 === node.nodeType ? isHidden ? (node._stashedDisplay = node.style.display, node.style.display = "none") : (node.style.display = node._stashedDisplay || "", "" === node.getAttribute("style") && node.removeAttribute("style")) : 3 === node.nodeType && (isHidden ? (node._stashedText = node.nodeValue, node.nodeValue = "") : node.nodeValue = node._stashedText || "");
			if (nextNode && 8 === nextNode.nodeType) if (node = nextNode.data, "/$" === node) if (0 === suspenseInstance) break;
			else suspenseInstance--;
			else "$" !== node && "$?" !== node && "$~" !== node && "$!" !== node || suspenseInstance++;
			node = nextNode;
		} while (node);
	}
	function clearContainerSparingly(container) {
		var nextNode = container.firstChild;
		nextNode && 10 === nextNode.nodeType && (nextNode = nextNode.nextSibling);
		for (; nextNode;) {
			var node = nextNode;
			nextNode = nextNode.nextSibling;
			switch (node.nodeName) {
				case "HTML":
				case "HEAD":
				case "BODY":
					clearContainerSparingly(node);
					detachDeletedInstance(node);
					continue;
				case "SCRIPT":
				case "STYLE": continue;
				case "LINK": if ("stylesheet" === node.rel.toLowerCase()) continue;
			}
			container.removeChild(node);
		}
	}
	function canHydrateInstance(instance, type, props, inRootOrSingleton) {
		for (; 1 === instance.nodeType;) {
			var anyProps = props;
			if (instance.nodeName.toLowerCase() !== type.toLowerCase()) {
				if (!inRootOrSingleton && ("INPUT" !== instance.nodeName || "hidden" !== instance.type)) break;
			} else if (!inRootOrSingleton) if ("input" === type && "hidden" === instance.type) {
				var name = null == anyProps.name ? null : "" + anyProps.name;
				if ("hidden" === anyProps.type && instance.getAttribute("name") === name) return instance;
			} else return instance;
			else if (!instance[internalHoistableMarker]) switch (type) {
				case "meta":
					if (!instance.hasAttribute("itemprop")) break;
					return instance;
				case "link":
					name = instance.getAttribute("rel");
					if ("stylesheet" === name && instance.hasAttribute("data-precedence")) break;
					else if (name !== anyProps.rel || instance.getAttribute("href") !== (null == anyProps.href || "" === anyProps.href ? null : anyProps.href) || instance.getAttribute("crossorigin") !== (null == anyProps.crossOrigin ? null : anyProps.crossOrigin) || instance.getAttribute("title") !== (null == anyProps.title ? null : anyProps.title)) break;
					return instance;
				case "style":
					if (instance.hasAttribute("data-precedence")) break;
					return instance;
				case "script":
					name = instance.getAttribute("src");
					if ((name !== (null == anyProps.src ? null : anyProps.src) || instance.getAttribute("type") !== (null == anyProps.type ? null : anyProps.type) || instance.getAttribute("crossorigin") !== (null == anyProps.crossOrigin ? null : anyProps.crossOrigin)) && name && instance.hasAttribute("async") && !instance.hasAttribute("itemprop")) break;
					return instance;
				default: return instance;
			}
			instance = getNextHydratable(instance.nextSibling);
			if (null === instance) break;
		}
		return null;
	}
	function canHydrateTextInstance(instance, text, inRootOrSingleton) {
		if ("" === text) return null;
		for (; 3 !== instance.nodeType;) {
			if ((1 !== instance.nodeType || "INPUT" !== instance.nodeName || "hidden" !== instance.type) && !inRootOrSingleton) return null;
			instance = getNextHydratable(instance.nextSibling);
			if (null === instance) return null;
		}
		return instance;
	}
	function canHydrateHydrationBoundary(instance, inRootOrSingleton) {
		for (; 8 !== instance.nodeType;) {
			if ((1 !== instance.nodeType || "INPUT" !== instance.nodeName || "hidden" !== instance.type) && !inRootOrSingleton) return null;
			instance = getNextHydratable(instance.nextSibling);
			if (null === instance) return null;
		}
		return instance;
	}
	function isSuspenseInstancePending(instance) {
		return "$?" === instance.data || "$~" === instance.data;
	}
	function isSuspenseInstanceFallback(instance) {
		return "$!" === instance.data || "$?" === instance.data && "loading" !== instance.ownerDocument.readyState;
	}
	function registerSuspenseInstanceRetry(instance, callback) {
		var ownerDocument = instance.ownerDocument;
		if ("$~" === instance.data) instance._reactRetry = callback;
		else if ("$?" !== instance.data || "loading" !== ownerDocument.readyState) callback();
		else {
			var listener = function() {
				callback();
				ownerDocument.removeEventListener("DOMContentLoaded", listener);
			};
			ownerDocument.addEventListener("DOMContentLoaded", listener);
			instance._reactRetry = listener;
		}
	}
	function getNextHydratable(node) {
		for (; null != node; node = node.nextSibling) {
			var nodeType = node.nodeType;
			if (1 === nodeType || 3 === nodeType) break;
			if (8 === nodeType) {
				nodeType = node.data;
				if ("$" === nodeType || "$!" === nodeType || "$?" === nodeType || "$~" === nodeType || "&" === nodeType || "F!" === nodeType || "F" === nodeType) break;
				if ("/$" === nodeType || "/&" === nodeType) return null;
			}
		}
		return node;
	}
	var previousHydratableOnEnteringScopedSingleton = null;
	function getNextHydratableInstanceAfterHydrationBoundary(hydrationInstance) {
		hydrationInstance = hydrationInstance.nextSibling;
		for (var depth = 0; hydrationInstance;) {
			if (8 === hydrationInstance.nodeType) {
				var data = hydrationInstance.data;
				if ("/$" === data || "/&" === data) {
					if (0 === depth) return getNextHydratable(hydrationInstance.nextSibling);
					depth--;
				} else "$" !== data && "$!" !== data && "$?" !== data && "$~" !== data && "&" !== data || depth++;
			}
			hydrationInstance = hydrationInstance.nextSibling;
		}
		return null;
	}
	function getParentHydrationBoundary(targetInstance) {
		targetInstance = targetInstance.previousSibling;
		for (var depth = 0; targetInstance;) {
			if (8 === targetInstance.nodeType) {
				var data = targetInstance.data;
				if ("$" === data || "$!" === data || "$?" === data || "$~" === data || "&" === data) {
					if (0 === depth) return targetInstance;
					depth--;
				} else "/$" !== data && "/&" !== data || depth++;
			}
			targetInstance = targetInstance.previousSibling;
		}
		return null;
	}
	function resolveSingletonInstance(type, props, rootContainerInstance) {
		props = getOwnerDocumentFromRootContainer(rootContainerInstance);
		switch (type) {
			case "html":
				type = props.documentElement;
				if (!type) throw Error(formatProdErrorMessage(452));
				return type;
			case "head":
				type = props.head;
				if (!type) throw Error(formatProdErrorMessage(453));
				return type;
			case "body":
				type = props.body;
				if (!type) throw Error(formatProdErrorMessage(454));
				return type;
			default: throw Error(formatProdErrorMessage(451));
		}
	}
	function releaseSingletonInstance(instance) {
		for (var attributes = instance.attributes; attributes.length;) instance.removeAttributeNode(attributes[0]);
		detachDeletedInstance(instance);
	}
	var preloadPropsMap = /* @__PURE__ */ new Map(), preconnectsSet = /* @__PURE__ */ new Set();
	function getHoistableRoot(container) {
		return "function" === typeof container.getRootNode ? container.getRootNode() : 9 === container.nodeType ? container : container.ownerDocument;
	}
	var previousDispatcher = ReactDOMSharedInternals.d;
	ReactDOMSharedInternals.d = {
		f: flushSyncWork,
		r: requestFormReset,
		D: prefetchDNS,
		C: preconnect,
		L: preload,
		m: preloadModule,
		X: preinitScript,
		S: preinitStyle,
		M: preinitModuleScript
	};
	function flushSyncWork() {
		var previousWasRendering = previousDispatcher.f(), wasRendering = flushSyncWork$1();
		return previousWasRendering || wasRendering;
	}
	function requestFormReset(form) {
		var formInst = getInstanceFromNode(form);
		null !== formInst && 5 === formInst.tag && "form" === formInst.type ? requestFormReset$1(formInst) : previousDispatcher.r(form);
	}
	var globalDocument = "undefined" === typeof document ? null : document;
	function preconnectAs(rel, href, crossOrigin) {
		var ownerDocument = globalDocument;
		if (ownerDocument && "string" === typeof href && href) {
			var limitedEscapedHref = escapeSelectorAttributeValueInsideDoubleQuotes(href);
			limitedEscapedHref = "link[rel=\"" + rel + "\"][href=\"" + limitedEscapedHref + "\"]";
			"string" === typeof crossOrigin && (limitedEscapedHref += "[crossorigin=\"" + crossOrigin + "\"]");
			preconnectsSet.has(limitedEscapedHref) || (preconnectsSet.add(limitedEscapedHref), rel = {
				rel,
				crossOrigin,
				href
			}, null === ownerDocument.querySelector(limitedEscapedHref) && (href = ownerDocument.createElement("link"), setInitialProperties(href, "link", rel), markNodeAsHoistable(href), ownerDocument.head.appendChild(href)));
		}
	}
	function prefetchDNS(href) {
		previousDispatcher.D(href);
		preconnectAs("dns-prefetch", href, null);
	}
	function preconnect(href, crossOrigin) {
		previousDispatcher.C(href, crossOrigin);
		preconnectAs("preconnect", href, crossOrigin);
	}
	function preload(href, as, options) {
		previousDispatcher.L(href, as, options);
		var ownerDocument = globalDocument;
		if (ownerDocument && href && as) {
			var preloadSelector = "link[rel=\"preload\"][as=\"" + escapeSelectorAttributeValueInsideDoubleQuotes(as) + "\"]";
			"image" === as ? options && options.imageSrcSet ? (preloadSelector += "[imagesrcset=\"" + escapeSelectorAttributeValueInsideDoubleQuotes(options.imageSrcSet) + "\"]", "string" === typeof options.imageSizes && (preloadSelector += "[imagesizes=\"" + escapeSelectorAttributeValueInsideDoubleQuotes(options.imageSizes) + "\"]")) : preloadSelector += "[href=\"" + escapeSelectorAttributeValueInsideDoubleQuotes(href) + "\"]" : preloadSelector += "[href=\"" + escapeSelectorAttributeValueInsideDoubleQuotes(href) + "\"]";
			var key = preloadSelector;
			switch (as) {
				case "style":
					key = getStyleKey(href);
					break;
				case "script": key = getScriptKey(href);
			}
			preloadPropsMap.has(key) || (href = assign({
				rel: "preload",
				href: "image" === as && options && options.imageSrcSet ? void 0 : href,
				as
			}, options), preloadPropsMap.set(key, href), null !== ownerDocument.querySelector(preloadSelector) || "style" === as && ownerDocument.querySelector(getStylesheetSelectorFromKey(key)) || "script" === as && ownerDocument.querySelector(getScriptSelectorFromKey(key)) || (as = ownerDocument.createElement("link"), setInitialProperties(as, "link", href), markNodeAsHoistable(as), ownerDocument.head.appendChild(as)));
		}
	}
	function preloadModule(href, options) {
		previousDispatcher.m(href, options);
		var ownerDocument = globalDocument;
		if (ownerDocument && href) {
			var as = options && "string" === typeof options.as ? options.as : "script", preloadSelector = "link[rel=\"modulepreload\"][as=\"" + escapeSelectorAttributeValueInsideDoubleQuotes(as) + "\"][href=\"" + escapeSelectorAttributeValueInsideDoubleQuotes(href) + "\"]", key = preloadSelector;
			switch (as) {
				case "audioworklet":
				case "paintworklet":
				case "serviceworker":
				case "sharedworker":
				case "worker":
				case "script": key = getScriptKey(href);
			}
			if (!preloadPropsMap.has(key) && (href = assign({
				rel: "modulepreload",
				href
			}, options), preloadPropsMap.set(key, href), null === ownerDocument.querySelector(preloadSelector))) {
				switch (as) {
					case "audioworklet":
					case "paintworklet":
					case "serviceworker":
					case "sharedworker":
					case "worker":
					case "script": if (ownerDocument.querySelector(getScriptSelectorFromKey(key))) return;
				}
				as = ownerDocument.createElement("link");
				setInitialProperties(as, "link", href);
				markNodeAsHoistable(as);
				ownerDocument.head.appendChild(as);
			}
		}
	}
	function preinitStyle(href, precedence, options) {
		previousDispatcher.S(href, precedence, options);
		var ownerDocument = globalDocument;
		if (ownerDocument && href) {
			var styles = getResourcesFromRoot(ownerDocument).hoistableStyles, key = getStyleKey(href);
			precedence = precedence || "default";
			var resource = styles.get(key);
			if (!resource) {
				var state = {
					loading: 0,
					preload: null
				};
				if (resource = ownerDocument.querySelector(getStylesheetSelectorFromKey(key))) state.loading = 5;
				else {
					href = assign({
						rel: "stylesheet",
						href,
						"data-precedence": precedence
					}, options);
					(options = preloadPropsMap.get(key)) && adoptPreloadPropsForStylesheet(href, options);
					var link = resource = ownerDocument.createElement("link");
					markNodeAsHoistable(link);
					setInitialProperties(link, "link", href);
					link._p = new Promise(function(resolve, reject) {
						link.onload = resolve;
						link.onerror = reject;
					});
					link.addEventListener("load", function() {
						state.loading |= 1;
					});
					link.addEventListener("error", function() {
						state.loading |= 2;
					});
					state.loading |= 4;
					insertStylesheet(resource, precedence, ownerDocument);
				}
				resource = {
					type: "stylesheet",
					instance: resource,
					count: 1,
					state
				};
				styles.set(key, resource);
			}
		}
	}
	function preinitScript(src, options) {
		previousDispatcher.X(src, options);
		var ownerDocument = globalDocument;
		if (ownerDocument && src) {
			var scripts = getResourcesFromRoot(ownerDocument).hoistableScripts, key = getScriptKey(src), resource = scripts.get(key);
			resource || (resource = ownerDocument.querySelector(getScriptSelectorFromKey(key)), resource || (src = assign({
				src,
				async: !0
			}, options), (options = preloadPropsMap.get(key)) && adoptPreloadPropsForScript(src, options), resource = ownerDocument.createElement("script"), markNodeAsHoistable(resource), setInitialProperties(resource, "link", src), ownerDocument.head.appendChild(resource)), resource = {
				type: "script",
				instance: resource,
				count: 1,
				state: null
			}, scripts.set(key, resource));
		}
	}
	function preinitModuleScript(src, options) {
		previousDispatcher.M(src, options);
		var ownerDocument = globalDocument;
		if (ownerDocument && src) {
			var scripts = getResourcesFromRoot(ownerDocument).hoistableScripts, key = getScriptKey(src), resource = scripts.get(key);
			resource || (resource = ownerDocument.querySelector(getScriptSelectorFromKey(key)), resource || (src = assign({
				src,
				async: !0,
				type: "module"
			}, options), (options = preloadPropsMap.get(key)) && adoptPreloadPropsForScript(src, options), resource = ownerDocument.createElement("script"), markNodeAsHoistable(resource), setInitialProperties(resource, "link", src), ownerDocument.head.appendChild(resource)), resource = {
				type: "script",
				instance: resource,
				count: 1,
				state: null
			}, scripts.set(key, resource));
		}
	}
	function getResource(type, currentProps, pendingProps, currentResource) {
		var JSCompiler_inline_result = (JSCompiler_inline_result = rootInstanceStackCursor.current) ? getHoistableRoot(JSCompiler_inline_result) : null;
		if (!JSCompiler_inline_result) throw Error(formatProdErrorMessage(446));
		switch (type) {
			case "meta":
			case "title": return null;
			case "style": return "string" === typeof pendingProps.precedence && "string" === typeof pendingProps.href ? (currentProps = getStyleKey(pendingProps.href), pendingProps = getResourcesFromRoot(JSCompiler_inline_result).hoistableStyles, currentResource = pendingProps.get(currentProps), currentResource || (currentResource = {
				type: "style",
				instance: null,
				count: 0,
				state: null
			}, pendingProps.set(currentProps, currentResource)), currentResource) : {
				type: "void",
				instance: null,
				count: 0,
				state: null
			};
			case "link":
				if ("stylesheet" === pendingProps.rel && "string" === typeof pendingProps.href && "string" === typeof pendingProps.precedence) {
					type = getStyleKey(pendingProps.href);
					var styles$243 = getResourcesFromRoot(JSCompiler_inline_result).hoistableStyles, resource$244 = styles$243.get(type);
					resource$244 || (JSCompiler_inline_result = JSCompiler_inline_result.ownerDocument || JSCompiler_inline_result, resource$244 = {
						type: "stylesheet",
						instance: null,
						count: 0,
						state: {
							loading: 0,
							preload: null
						}
					}, styles$243.set(type, resource$244), (styles$243 = JSCompiler_inline_result.querySelector(getStylesheetSelectorFromKey(type))) && !styles$243._p && (resource$244.instance = styles$243, resource$244.state.loading = 5), preloadPropsMap.has(type) || (pendingProps = {
						rel: "preload",
						as: "style",
						href: pendingProps.href,
						crossOrigin: pendingProps.crossOrigin,
						integrity: pendingProps.integrity,
						media: pendingProps.media,
						hrefLang: pendingProps.hrefLang,
						referrerPolicy: pendingProps.referrerPolicy
					}, preloadPropsMap.set(type, pendingProps), styles$243 || preloadStylesheet(JSCompiler_inline_result, type, pendingProps, resource$244.state)));
					if (currentProps && null === currentResource) throw Error(formatProdErrorMessage(528, ""));
					return resource$244;
				}
				if (currentProps && null !== currentResource) throw Error(formatProdErrorMessage(529, ""));
				return null;
			case "script": return currentProps = pendingProps.async, pendingProps = pendingProps.src, "string" === typeof pendingProps && currentProps && "function" !== typeof currentProps && "symbol" !== typeof currentProps ? (currentProps = getScriptKey(pendingProps), pendingProps = getResourcesFromRoot(JSCompiler_inline_result).hoistableScripts, currentResource = pendingProps.get(currentProps), currentResource || (currentResource = {
				type: "script",
				instance: null,
				count: 0,
				state: null
			}, pendingProps.set(currentProps, currentResource)), currentResource) : {
				type: "void",
				instance: null,
				count: 0,
				state: null
			};
			default: throw Error(formatProdErrorMessage(444, type));
		}
	}
	function getStyleKey(href) {
		return "href=\"" + escapeSelectorAttributeValueInsideDoubleQuotes(href) + "\"";
	}
	function getStylesheetSelectorFromKey(key) {
		return "link[rel=\"stylesheet\"][" + key + "]";
	}
	function stylesheetPropsFromRawProps(rawProps) {
		return assign({}, rawProps, {
			"data-precedence": rawProps.precedence,
			precedence: null
		});
	}
	function preloadStylesheet(ownerDocument, key, preloadProps, state) {
		ownerDocument.querySelector("link[rel=\"preload\"][as=\"style\"][" + key + "]") ? state.loading = 1 : (key = ownerDocument.createElement("link"), state.preload = key, key.addEventListener("load", function() {
			return state.loading |= 1;
		}), key.addEventListener("error", function() {
			return state.loading |= 2;
		}), setInitialProperties(key, "link", preloadProps), markNodeAsHoistable(key), ownerDocument.head.appendChild(key));
	}
	function getScriptKey(src) {
		return "[src=\"" + escapeSelectorAttributeValueInsideDoubleQuotes(src) + "\"]";
	}
	function getScriptSelectorFromKey(key) {
		return "script[async]" + key;
	}
	function acquireResource(hoistableRoot, resource, props) {
		resource.count++;
		if (null === resource.instance) switch (resource.type) {
			case "style":
				var instance = hoistableRoot.querySelector("style[data-href~=\"" + escapeSelectorAttributeValueInsideDoubleQuotes(props.href) + "\"]");
				if (instance) return resource.instance = instance, markNodeAsHoistable(instance), instance;
				var styleProps = assign({}, props, {
					"data-href": props.href,
					"data-precedence": props.precedence,
					href: null,
					precedence: null
				});
				instance = (hoistableRoot.ownerDocument || hoistableRoot).createElement("style");
				markNodeAsHoistable(instance);
				setInitialProperties(instance, "style", styleProps);
				insertStylesheet(instance, props.precedence, hoistableRoot);
				return resource.instance = instance;
			case "stylesheet":
				styleProps = getStyleKey(props.href);
				var instance$249 = hoistableRoot.querySelector(getStylesheetSelectorFromKey(styleProps));
				if (instance$249) return resource.state.loading |= 4, resource.instance = instance$249, markNodeAsHoistable(instance$249), instance$249;
				instance = stylesheetPropsFromRawProps(props);
				(styleProps = preloadPropsMap.get(styleProps)) && adoptPreloadPropsForStylesheet(instance, styleProps);
				instance$249 = (hoistableRoot.ownerDocument || hoistableRoot).createElement("link");
				markNodeAsHoistable(instance$249);
				var linkInstance = instance$249;
				linkInstance._p = new Promise(function(resolve, reject) {
					linkInstance.onload = resolve;
					linkInstance.onerror = reject;
				});
				setInitialProperties(instance$249, "link", instance);
				resource.state.loading |= 4;
				insertStylesheet(instance$249, props.precedence, hoistableRoot);
				return resource.instance = instance$249;
			case "script":
				instance$249 = getScriptKey(props.src);
				if (styleProps = hoistableRoot.querySelector(getScriptSelectorFromKey(instance$249))) return resource.instance = styleProps, markNodeAsHoistable(styleProps), styleProps;
				instance = props;
				if (styleProps = preloadPropsMap.get(instance$249)) instance = assign({}, props), adoptPreloadPropsForScript(instance, styleProps);
				hoistableRoot = hoistableRoot.ownerDocument || hoistableRoot;
				styleProps = hoistableRoot.createElement("script");
				markNodeAsHoistable(styleProps);
				setInitialProperties(styleProps, "link", instance);
				hoistableRoot.head.appendChild(styleProps);
				return resource.instance = styleProps;
			case "void": return null;
			default: throw Error(formatProdErrorMessage(443, resource.type));
		}
		else "stylesheet" === resource.type && 0 === (resource.state.loading & 4) && (instance = resource.instance, resource.state.loading |= 4, insertStylesheet(instance, props.precedence, hoistableRoot));
		return resource.instance;
	}
	function insertStylesheet(instance, precedence, root) {
		for (var nodes = root.querySelectorAll("link[rel=\"stylesheet\"][data-precedence],style[data-precedence]"), last = nodes.length ? nodes[nodes.length - 1] : null, prior = last, i = 0; i < nodes.length; i++) {
			var node = nodes[i];
			if (node.dataset.precedence === precedence) prior = node;
			else if (prior !== last) break;
		}
		prior ? prior.parentNode.insertBefore(instance, prior.nextSibling) : (precedence = 9 === root.nodeType ? root.head : root, precedence.insertBefore(instance, precedence.firstChild));
	}
	function adoptPreloadPropsForStylesheet(stylesheetProps, preloadProps) {
		stylesheetProps.crossOrigin ??= preloadProps.crossOrigin;
		stylesheetProps.referrerPolicy ??= preloadProps.referrerPolicy;
		stylesheetProps.title ??= preloadProps.title;
	}
	function adoptPreloadPropsForScript(scriptProps, preloadProps) {
		scriptProps.crossOrigin ??= preloadProps.crossOrigin;
		scriptProps.referrerPolicy ??= preloadProps.referrerPolicy;
		scriptProps.integrity ??= preloadProps.integrity;
	}
	var tagCaches = null;
	function getHydratableHoistableCache(type, keyAttribute, ownerDocument) {
		if (null === tagCaches) {
			var cache = /* @__PURE__ */ new Map();
			var caches = tagCaches = /* @__PURE__ */ new Map();
			caches.set(ownerDocument, cache);
		} else caches = tagCaches, cache = caches.get(ownerDocument), cache || (cache = /* @__PURE__ */ new Map(), caches.set(ownerDocument, cache));
		if (cache.has(type)) return cache;
		cache.set(type, null);
		ownerDocument = ownerDocument.getElementsByTagName(type);
		for (caches = 0; caches < ownerDocument.length; caches++) {
			var node = ownerDocument[caches];
			if (!(node[internalHoistableMarker] || node[internalInstanceKey] || "link" === type && "stylesheet" === node.getAttribute("rel")) && "http://www.w3.org/2000/svg" !== node.namespaceURI) {
				var nodeKey = node.getAttribute(keyAttribute) || "";
				nodeKey = type + nodeKey;
				var existing = cache.get(nodeKey);
				existing ? existing.push(node) : cache.set(nodeKey, [node]);
			}
		}
		return cache;
	}
	function mountHoistable(hoistableRoot, type, instance) {
		hoistableRoot = hoistableRoot.ownerDocument || hoistableRoot;
		hoistableRoot.head.insertBefore(instance, "title" === type ? hoistableRoot.querySelector("head > title") : null);
	}
	function isHostHoistableType(type, props, hostContext) {
		if (1 === hostContext || null != props.itemProp) return !1;
		switch (type) {
			case "meta":
			case "title": return !0;
			case "style":
				if ("string" !== typeof props.precedence || "string" !== typeof props.href || "" === props.href) break;
				return !0;
			case "link":
				if ("string" !== typeof props.rel || "string" !== typeof props.href || "" === props.href || props.onLoad || props.onError) break;
				switch (props.rel) {
					case "stylesheet": return type = props.disabled, "string" === typeof props.precedence && null == type;
					default: return !0;
				}
			case "script": if (props.async && "function" !== typeof props.async && "symbol" !== typeof props.async && !props.onLoad && !props.onError && props.src && "string" === typeof props.src) return !0;
		}
		return !1;
	}
	function preloadResource(resource) {
		return "stylesheet" === resource.type && 0 === (resource.state.loading & 3) ? !1 : !0;
	}
	function suspendResource(state, hoistableRoot, resource, props) {
		if ("stylesheet" === resource.type && ("string" !== typeof props.media || !1 !== matchMedia(props.media).matches) && 0 === (resource.state.loading & 4)) {
			if (null === resource.instance) {
				var key = getStyleKey(props.href), instance = hoistableRoot.querySelector(getStylesheetSelectorFromKey(key));
				if (instance) {
					hoistableRoot = instance._p;
					null !== hoistableRoot && "object" === typeof hoistableRoot && "function" === typeof hoistableRoot.then && (state.count++, state = onUnsuspend.bind(state), hoistableRoot.then(state, state));
					resource.state.loading |= 4;
					resource.instance = instance;
					markNodeAsHoistable(instance);
					return;
				}
				instance = hoistableRoot.ownerDocument || hoistableRoot;
				props = stylesheetPropsFromRawProps(props);
				(key = preloadPropsMap.get(key)) && adoptPreloadPropsForStylesheet(props, key);
				instance = instance.createElement("link");
				markNodeAsHoistable(instance);
				var linkInstance = instance;
				linkInstance._p = new Promise(function(resolve, reject) {
					linkInstance.onload = resolve;
					linkInstance.onerror = reject;
				});
				setInitialProperties(instance, "link", props);
				resource.instance = instance;
			}
			null === state.stylesheets && (state.stylesheets = /* @__PURE__ */ new Map());
			state.stylesheets.set(resource, hoistableRoot);
			(hoistableRoot = resource.state.preload) && 0 === (resource.state.loading & 3) && (state.count++, resource = onUnsuspend.bind(state), hoistableRoot.addEventListener("load", resource), hoistableRoot.addEventListener("error", resource));
		}
	}
	var estimatedBytesWithinLimit = 0;
	function waitForCommitToBeReady(state, timeoutOffset) {
		state.stylesheets && 0 === state.count && insertSuspendedStylesheets(state, state.stylesheets);
		return 0 < state.count || 0 < state.imgCount ? function(commit) {
			var stylesheetTimer = setTimeout(function() {
				state.stylesheets && insertSuspendedStylesheets(state, state.stylesheets);
				if (state.unsuspend) {
					var unsuspend = state.unsuspend;
					state.unsuspend = null;
					unsuspend();
				}
			}, 6e4 + timeoutOffset);
			0 < state.imgBytes && 0 === estimatedBytesWithinLimit && (estimatedBytesWithinLimit = 62500 * estimateBandwidth());
			var imgTimer = setTimeout(function() {
				state.waitingForImages = !1;
				if (0 === state.count && (state.stylesheets && insertSuspendedStylesheets(state, state.stylesheets), state.unsuspend)) {
					var unsuspend = state.unsuspend;
					state.unsuspend = null;
					unsuspend();
				}
			}, (state.imgBytes > estimatedBytesWithinLimit ? 50 : 800) + timeoutOffset);
			state.unsuspend = commit;
			return function() {
				state.unsuspend = null;
				clearTimeout(stylesheetTimer);
				clearTimeout(imgTimer);
			};
		} : null;
	}
	function onUnsuspend() {
		this.count--;
		if (0 === this.count && (0 === this.imgCount || !this.waitingForImages)) {
			if (this.stylesheets) insertSuspendedStylesheets(this, this.stylesheets);
			else if (this.unsuspend) {
				var unsuspend = this.unsuspend;
				this.unsuspend = null;
				unsuspend();
			}
		}
	}
	var precedencesByRoot = null;
	function insertSuspendedStylesheets(state, resources) {
		state.stylesheets = null;
		null !== state.unsuspend && (state.count++, precedencesByRoot = /* @__PURE__ */ new Map(), resources.forEach(insertStylesheetIntoRoot, state), precedencesByRoot = null, onUnsuspend.call(state));
	}
	function insertStylesheetIntoRoot(root, resource) {
		if (!(resource.state.loading & 4)) {
			var precedences = precedencesByRoot.get(root);
			if (precedences) var last = precedences.get(null);
			else {
				precedences = /* @__PURE__ */ new Map();
				precedencesByRoot.set(root, precedences);
				for (var nodes = root.querySelectorAll("link[data-precedence],style[data-precedence]"), i = 0; i < nodes.length; i++) {
					var node = nodes[i];
					if ("LINK" === node.nodeName || "not all" !== node.getAttribute("media")) precedences.set(node.dataset.precedence, node), last = node;
				}
				last && precedences.set(null, last);
			}
			nodes = resource.instance;
			node = nodes.getAttribute("data-precedence");
			i = precedences.get(node) || last;
			i === last && precedences.set(null, nodes);
			precedences.set(node, nodes);
			this.count++;
			last = onUnsuspend.bind(this);
			nodes.addEventListener("load", last);
			nodes.addEventListener("error", last);
			i ? i.parentNode.insertBefore(nodes, i.nextSibling) : (root = 9 === root.nodeType ? root.head : root, root.insertBefore(nodes, root.firstChild));
			resource.state.loading |= 4;
		}
	}
	var HostTransitionContext = {
		$$typeof: REACT_CONTEXT_TYPE,
		Provider: null,
		Consumer: null,
		_currentValue: sharedNotPendingObject,
		_currentValue2: sharedNotPendingObject,
		_threadCount: 0
	};
	function FiberRootNode(containerInfo, tag, hydrate, identifierPrefix, onUncaughtError, onCaughtError, onRecoverableError, onDefaultTransitionIndicator, formState) {
		this.tag = 1;
		this.containerInfo = containerInfo;
		this.pingCache = this.current = this.pendingChildren = null;
		this.timeoutHandle = -1;
		this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null;
		this.callbackPriority = 0;
		this.expirationTimes = createLaneMap(-1);
		this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0;
		this.entanglements = createLaneMap(0);
		this.hiddenUpdates = createLaneMap(null);
		this.identifierPrefix = identifierPrefix;
		this.onUncaughtError = onUncaughtError;
		this.onCaughtError = onCaughtError;
		this.onRecoverableError = onRecoverableError;
		this.pooledCache = null;
		this.pooledCacheLanes = 0;
		this.formState = formState;
		this.incompleteTransitions = /* @__PURE__ */ new Map();
	}
	function createFiberRoot(containerInfo, tag, hydrate, initialChildren, hydrationCallbacks, isStrictMode, identifierPrefix, formState, onUncaughtError, onCaughtError, onRecoverableError, onDefaultTransitionIndicator) {
		containerInfo = new FiberRootNode(containerInfo, tag, hydrate, identifierPrefix, onUncaughtError, onCaughtError, onRecoverableError, onDefaultTransitionIndicator, formState);
		tag = 1;
		!0 === isStrictMode && (tag |= 24);
		isStrictMode = createFiberImplClass(3, null, null, tag);
		containerInfo.current = isStrictMode;
		isStrictMode.stateNode = containerInfo;
		tag = createCache();
		tag.refCount++;
		containerInfo.pooledCache = tag;
		tag.refCount++;
		isStrictMode.memoizedState = {
			element: initialChildren,
			isDehydrated: hydrate,
			cache: tag
		};
		initializeUpdateQueue(isStrictMode);
		return containerInfo;
	}
	function getContextForSubtree(parentComponent) {
		if (!parentComponent) return emptyContextObject;
		parentComponent = emptyContextObject;
		return parentComponent;
	}
	function updateContainerImpl(rootFiber, lane, element, container, parentComponent, callback) {
		parentComponent = getContextForSubtree(parentComponent);
		null === container.context ? container.context = parentComponent : container.pendingContext = parentComponent;
		container = createUpdate(lane);
		container.payload = { element };
		callback = void 0 === callback ? null : callback;
		null !== callback && (container.callback = callback);
		element = enqueueUpdate(rootFiber, container, lane);
		null !== element && (scheduleUpdateOnFiber(element, rootFiber, lane), entangleTransitions(element, rootFiber, lane));
	}
	function markRetryLaneImpl(fiber, retryLane) {
		fiber = fiber.memoizedState;
		if (null !== fiber && null !== fiber.dehydrated) {
			var a = fiber.retryLane;
			fiber.retryLane = 0 !== a && a < retryLane ? a : retryLane;
		}
	}
	function markRetryLaneIfNotHydrated(fiber, retryLane) {
		markRetryLaneImpl(fiber, retryLane);
		(fiber = fiber.alternate) && markRetryLaneImpl(fiber, retryLane);
	}
	function attemptContinuousHydration(fiber) {
		if (13 === fiber.tag || 31 === fiber.tag) {
			var root = enqueueConcurrentRenderForLane(fiber, 67108864);
			null !== root && scheduleUpdateOnFiber(root, fiber, 67108864);
			markRetryLaneIfNotHydrated(fiber, 67108864);
		}
	}
	function attemptHydrationAtCurrentPriority(fiber) {
		if (13 === fiber.tag || 31 === fiber.tag) {
			var lane = requestUpdateLane();
			lane = getBumpedLaneForHydrationByLane(lane);
			var root = enqueueConcurrentRenderForLane(fiber, lane);
			null !== root && scheduleUpdateOnFiber(root, fiber, lane);
			markRetryLaneIfNotHydrated(fiber, lane);
		}
	}
	var _enabled = !0;
	function dispatchDiscreteEvent(domEventName, eventSystemFlags, container, nativeEvent) {
		var prevTransition = ReactSharedInternals.T;
		ReactSharedInternals.T = null;
		var previousPriority = ReactDOMSharedInternals.p;
		try {
			ReactDOMSharedInternals.p = 2, dispatchEvent(domEventName, eventSystemFlags, container, nativeEvent);
		} finally {
			ReactDOMSharedInternals.p = previousPriority, ReactSharedInternals.T = prevTransition;
		}
	}
	function dispatchContinuousEvent(domEventName, eventSystemFlags, container, nativeEvent) {
		var prevTransition = ReactSharedInternals.T;
		ReactSharedInternals.T = null;
		var previousPriority = ReactDOMSharedInternals.p;
		try {
			ReactDOMSharedInternals.p = 8, dispatchEvent(domEventName, eventSystemFlags, container, nativeEvent);
		} finally {
			ReactDOMSharedInternals.p = previousPriority, ReactSharedInternals.T = prevTransition;
		}
	}
	function dispatchEvent(domEventName, eventSystemFlags, targetContainer, nativeEvent) {
		if (_enabled) {
			var blockedOn = findInstanceBlockingEvent(nativeEvent);
			if (null === blockedOn) dispatchEventForPluginEventSystem(domEventName, eventSystemFlags, nativeEvent, return_targetInst, targetContainer), clearIfContinuousEvent(domEventName, nativeEvent);
			else if (queueIfContinuousEvent(blockedOn, domEventName, eventSystemFlags, targetContainer, nativeEvent)) nativeEvent.stopPropagation();
			else if (clearIfContinuousEvent(domEventName, nativeEvent), eventSystemFlags & 4 && -1 < discreteReplayableEvents.indexOf(domEventName)) {
				for (; null !== blockedOn;) {
					var fiber = getInstanceFromNode(blockedOn);
					if (null !== fiber) switch (fiber.tag) {
						case 3:
							fiber = fiber.stateNode;
							if (fiber.current.memoizedState.isDehydrated) {
								var lanes = getHighestPriorityLanes(fiber.pendingLanes);
								if (0 !== lanes) {
									var root = fiber;
									root.pendingLanes |= 2;
									for (root.entangledLanes |= 2; lanes;) {
										var lane = 1 << 31 - clz32(lanes);
										root.entanglements[1] |= lane;
										lanes &= ~lane;
									}
									ensureRootIsScheduled(fiber);
									0 === (executionContext & 6) && (workInProgressRootRenderTargetTime = now() + 500, flushSyncWorkAcrossRoots_impl(0, !1));
								}
							}
							break;
						case 31:
						case 13: root = enqueueConcurrentRenderForLane(fiber, 2), null !== root && scheduleUpdateOnFiber(root, fiber, 2), flushSyncWork$1(), markRetryLaneIfNotHydrated(fiber, 2);
					}
					fiber = findInstanceBlockingEvent(nativeEvent);
					null === fiber && dispatchEventForPluginEventSystem(domEventName, eventSystemFlags, nativeEvent, return_targetInst, targetContainer);
					if (fiber === blockedOn) break;
					blockedOn = fiber;
				}
				null !== blockedOn && nativeEvent.stopPropagation();
			} else dispatchEventForPluginEventSystem(domEventName, eventSystemFlags, nativeEvent, null, targetContainer);
		}
	}
	function findInstanceBlockingEvent(nativeEvent) {
		nativeEvent = getEventTarget(nativeEvent);
		return findInstanceBlockingTarget(nativeEvent);
	}
	var return_targetInst = null;
	function findInstanceBlockingTarget(targetNode) {
		return_targetInst = null;
		targetNode = getClosestInstanceFromNode(targetNode);
		if (null !== targetNode) {
			var nearestMounted = getNearestMountedFiber(targetNode);
			if (null === nearestMounted) targetNode = null;
			else {
				var tag = nearestMounted.tag;
				if (13 === tag) {
					targetNode = getSuspenseInstanceFromFiber(nearestMounted);
					if (null !== targetNode) return targetNode;
					targetNode = null;
				} else if (31 === tag) {
					targetNode = getActivityInstanceFromFiber(nearestMounted);
					if (null !== targetNode) return targetNode;
					targetNode = null;
				} else if (3 === tag) {
					if (nearestMounted.stateNode.current.memoizedState.isDehydrated) return 3 === nearestMounted.tag ? nearestMounted.stateNode.containerInfo : null;
					targetNode = null;
				} else nearestMounted !== targetNode && (targetNode = null);
			}
		}
		return_targetInst = targetNode;
		return null;
	}
	function getEventPriority(domEventName) {
		switch (domEventName) {
			case "beforetoggle":
			case "cancel":
			case "click":
			case "close":
			case "contextmenu":
			case "copy":
			case "cut":
			case "auxclick":
			case "dblclick":
			case "dragend":
			case "dragstart":
			case "drop":
			case "focusin":
			case "focusout":
			case "input":
			case "invalid":
			case "keydown":
			case "keypress":
			case "keyup":
			case "mousedown":
			case "mouseup":
			case "paste":
			case "pause":
			case "play":
			case "pointercancel":
			case "pointerdown":
			case "pointerup":
			case "ratechange":
			case "reset":
			case "resize":
			case "seeked":
			case "submit":
			case "toggle":
			case "touchcancel":
			case "touchend":
			case "touchstart":
			case "volumechange":
			case "change":
			case "selectionchange":
			case "textInput":
			case "compositionstart":
			case "compositionend":
			case "compositionupdate":
			case "beforeblur":
			case "afterblur":
			case "beforeinput":
			case "blur":
			case "fullscreenchange":
			case "focus":
			case "hashchange":
			case "popstate":
			case "select":
			case "selectstart": return 2;
			case "drag":
			case "dragenter":
			case "dragexit":
			case "dragleave":
			case "dragover":
			case "mousemove":
			case "mouseout":
			case "mouseover":
			case "pointermove":
			case "pointerout":
			case "pointerover":
			case "scroll":
			case "touchmove":
			case "wheel":
			case "mouseenter":
			case "mouseleave":
			case "pointerenter":
			case "pointerleave": return 8;
			case "message": switch (getCurrentPriorityLevel()) {
				case ImmediatePriority: return 2;
				case UserBlockingPriority: return 8;
				case NormalPriority$1:
				case LowPriority: return 32;
				case IdlePriority: return 268435456;
				default: return 32;
			}
			default: return 32;
		}
	}
	var hasScheduledReplayAttempt = !1, queuedFocus = null, queuedDrag = null, queuedMouse = null, queuedPointers = /* @__PURE__ */ new Map(), queuedPointerCaptures = /* @__PURE__ */ new Map(), queuedExplicitHydrationTargets = [], discreteReplayableEvents = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");
	function clearIfContinuousEvent(domEventName, nativeEvent) {
		switch (domEventName) {
			case "focusin":
			case "focusout":
				queuedFocus = null;
				break;
			case "dragenter":
			case "dragleave":
				queuedDrag = null;
				break;
			case "mouseover":
			case "mouseout":
				queuedMouse = null;
				break;
			case "pointerover":
			case "pointerout":
				queuedPointers.delete(nativeEvent.pointerId);
				break;
			case "gotpointercapture":
			case "lostpointercapture": queuedPointerCaptures.delete(nativeEvent.pointerId);
		}
	}
	function accumulateOrCreateContinuousQueuedReplayableEvent(existingQueuedEvent, blockedOn, domEventName, eventSystemFlags, targetContainer, nativeEvent) {
		if (null === existingQueuedEvent || existingQueuedEvent.nativeEvent !== nativeEvent) return existingQueuedEvent = {
			blockedOn,
			domEventName,
			eventSystemFlags,
			nativeEvent,
			targetContainers: [targetContainer]
		}, null !== blockedOn && (blockedOn = getInstanceFromNode(blockedOn), null !== blockedOn && attemptContinuousHydration(blockedOn)), existingQueuedEvent;
		existingQueuedEvent.eventSystemFlags |= eventSystemFlags;
		blockedOn = existingQueuedEvent.targetContainers;
		null !== targetContainer && -1 === blockedOn.indexOf(targetContainer) && blockedOn.push(targetContainer);
		return existingQueuedEvent;
	}
	function queueIfContinuousEvent(blockedOn, domEventName, eventSystemFlags, targetContainer, nativeEvent) {
		switch (domEventName) {
			case "focusin": return queuedFocus = accumulateOrCreateContinuousQueuedReplayableEvent(queuedFocus, blockedOn, domEventName, eventSystemFlags, targetContainer, nativeEvent), !0;
			case "dragenter": return queuedDrag = accumulateOrCreateContinuousQueuedReplayableEvent(queuedDrag, blockedOn, domEventName, eventSystemFlags, targetContainer, nativeEvent), !0;
			case "mouseover": return queuedMouse = accumulateOrCreateContinuousQueuedReplayableEvent(queuedMouse, blockedOn, domEventName, eventSystemFlags, targetContainer, nativeEvent), !0;
			case "pointerover":
				var pointerId = nativeEvent.pointerId;
				queuedPointers.set(pointerId, accumulateOrCreateContinuousQueuedReplayableEvent(queuedPointers.get(pointerId) || null, blockedOn, domEventName, eventSystemFlags, targetContainer, nativeEvent));
				return !0;
			case "gotpointercapture": return pointerId = nativeEvent.pointerId, queuedPointerCaptures.set(pointerId, accumulateOrCreateContinuousQueuedReplayableEvent(queuedPointerCaptures.get(pointerId) || null, blockedOn, domEventName, eventSystemFlags, targetContainer, nativeEvent)), !0;
		}
		return !1;
	}
	function attemptExplicitHydrationTarget(queuedTarget) {
		var targetInst = getClosestInstanceFromNode(queuedTarget.target);
		if (null !== targetInst) {
			var nearestMounted = getNearestMountedFiber(targetInst);
			if (null !== nearestMounted) {
				if (targetInst = nearestMounted.tag, 13 === targetInst) {
					if (targetInst = getSuspenseInstanceFromFiber(nearestMounted), null !== targetInst) {
						queuedTarget.blockedOn = targetInst;
						runWithPriority(queuedTarget.priority, function() {
							attemptHydrationAtCurrentPriority(nearestMounted);
						});
						return;
					}
				} else if (31 === targetInst) {
					if (targetInst = getActivityInstanceFromFiber(nearestMounted), null !== targetInst) {
						queuedTarget.blockedOn = targetInst;
						runWithPriority(queuedTarget.priority, function() {
							attemptHydrationAtCurrentPriority(nearestMounted);
						});
						return;
					}
				} else if (3 === targetInst && nearestMounted.stateNode.current.memoizedState.isDehydrated) {
					queuedTarget.blockedOn = 3 === nearestMounted.tag ? nearestMounted.stateNode.containerInfo : null;
					return;
				}
			}
		}
		queuedTarget.blockedOn = null;
	}
	function attemptReplayContinuousQueuedEvent(queuedEvent) {
		if (null !== queuedEvent.blockedOn) return !1;
		for (var targetContainers = queuedEvent.targetContainers; 0 < targetContainers.length;) {
			var nextBlockedOn = findInstanceBlockingEvent(queuedEvent.nativeEvent);
			if (null === nextBlockedOn) {
				nextBlockedOn = queuedEvent.nativeEvent;
				var nativeEventClone = new nextBlockedOn.constructor(nextBlockedOn.type, nextBlockedOn);
				currentReplayingEvent = nativeEventClone;
				nextBlockedOn.target.dispatchEvent(nativeEventClone);
				currentReplayingEvent = null;
			} else return targetContainers = getInstanceFromNode(nextBlockedOn), null !== targetContainers && attemptContinuousHydration(targetContainers), queuedEvent.blockedOn = nextBlockedOn, !1;
			targetContainers.shift();
		}
		return !0;
	}
	function attemptReplayContinuousQueuedEventInMap(queuedEvent, key, map) {
		attemptReplayContinuousQueuedEvent(queuedEvent) && map.delete(key);
	}
	function replayUnblockedEvents() {
		hasScheduledReplayAttempt = !1;
		null !== queuedFocus && attemptReplayContinuousQueuedEvent(queuedFocus) && (queuedFocus = null);
		null !== queuedDrag && attemptReplayContinuousQueuedEvent(queuedDrag) && (queuedDrag = null);
		null !== queuedMouse && attemptReplayContinuousQueuedEvent(queuedMouse) && (queuedMouse = null);
		queuedPointers.forEach(attemptReplayContinuousQueuedEventInMap);
		queuedPointerCaptures.forEach(attemptReplayContinuousQueuedEventInMap);
	}
	function scheduleCallbackIfUnblocked(queuedEvent, unblocked) {
		queuedEvent.blockedOn === unblocked && (queuedEvent.blockedOn = null, hasScheduledReplayAttempt || (hasScheduledReplayAttempt = !0, Scheduler.unstable_scheduleCallback(Scheduler.unstable_NormalPriority, replayUnblockedEvents)));
	}
	var lastScheduledReplayQueue = null;
	function scheduleReplayQueueIfNeeded(formReplayingQueue) {
		lastScheduledReplayQueue !== formReplayingQueue && (lastScheduledReplayQueue = formReplayingQueue, Scheduler.unstable_scheduleCallback(Scheduler.unstable_NormalPriority, function() {
			lastScheduledReplayQueue === formReplayingQueue && (lastScheduledReplayQueue = null);
			for (var i = 0; i < formReplayingQueue.length; i += 3) {
				var form = formReplayingQueue[i], submitterOrAction = formReplayingQueue[i + 1], formData = formReplayingQueue[i + 2];
				if ("function" !== typeof submitterOrAction) if (null === findInstanceBlockingTarget(submitterOrAction || form)) continue;
				else break;
				var formInst = getInstanceFromNode(form);
				null !== formInst && (formReplayingQueue.splice(i, 3), i -= 3, startHostTransition(formInst, {
					pending: !0,
					data: formData,
					method: form.method,
					action: submitterOrAction
				}, submitterOrAction, formData));
			}
		}));
	}
	function retryIfBlockedOn(unblocked) {
		function unblock(queuedEvent) {
			return scheduleCallbackIfUnblocked(queuedEvent, unblocked);
		}
		null !== queuedFocus && scheduleCallbackIfUnblocked(queuedFocus, unblocked);
		null !== queuedDrag && scheduleCallbackIfUnblocked(queuedDrag, unblocked);
		null !== queuedMouse && scheduleCallbackIfUnblocked(queuedMouse, unblocked);
		queuedPointers.forEach(unblock);
		queuedPointerCaptures.forEach(unblock);
		for (var i = 0; i < queuedExplicitHydrationTargets.length; i++) {
			var queuedTarget = queuedExplicitHydrationTargets[i];
			queuedTarget.blockedOn === unblocked && (queuedTarget.blockedOn = null);
		}
		for (; 0 < queuedExplicitHydrationTargets.length && (i = queuedExplicitHydrationTargets[0], null === i.blockedOn);) attemptExplicitHydrationTarget(i), null === i.blockedOn && queuedExplicitHydrationTargets.shift();
		i = (unblocked.ownerDocument || unblocked).$$reactFormReplay;
		if (null != i) for (queuedTarget = 0; queuedTarget < i.length; queuedTarget += 3) {
			var form = i[queuedTarget], submitterOrAction = i[queuedTarget + 1], formProps = form[internalPropsKey] || null;
			if ("function" === typeof submitterOrAction) formProps || scheduleReplayQueueIfNeeded(i);
			else if (formProps) {
				var action = null;
				if (submitterOrAction && submitterOrAction.hasAttribute("formAction")) {
					if (form = submitterOrAction, formProps = submitterOrAction[internalPropsKey] || null) action = formProps.formAction;
					else if (null !== findInstanceBlockingTarget(form)) continue;
				} else action = formProps.action;
				"function" === typeof action ? i[queuedTarget + 1] = action : (i.splice(queuedTarget, 3), queuedTarget -= 3);
				scheduleReplayQueueIfNeeded(i);
			}
		}
	}
	function defaultOnDefaultTransitionIndicator() {
		function handleNavigate(event) {
			event.canIntercept && "react-transition" === event.info && event.intercept({
				handler: function() {
					return new Promise(function(resolve) {
						return pendingResolve = resolve;
					});
				},
				focusReset: "manual",
				scroll: "manual"
			});
		}
		function handleNavigateComplete() {
			null !== pendingResolve && (pendingResolve(), pendingResolve = null);
			isCancelled || setTimeout(startFakeNavigation, 20);
		}
		function startFakeNavigation() {
			if (!isCancelled && !navigation.transition) {
				var currentEntry = navigation.currentEntry;
				currentEntry && null != currentEntry.url && navigation.navigate(currentEntry.url, {
					state: currentEntry.getState(),
					info: "react-transition",
					history: "replace"
				});
			}
		}
		if ("object" === typeof navigation) {
			var isCancelled = !1, pendingResolve = null;
			navigation.addEventListener("navigate", handleNavigate);
			navigation.addEventListener("navigatesuccess", handleNavigateComplete);
			navigation.addEventListener("navigateerror", handleNavigateComplete);
			setTimeout(startFakeNavigation, 100);
			return function() {
				isCancelled = !0;
				navigation.removeEventListener("navigate", handleNavigate);
				navigation.removeEventListener("navigatesuccess", handleNavigateComplete);
				navigation.removeEventListener("navigateerror", handleNavigateComplete);
				null !== pendingResolve && (pendingResolve(), pendingResolve = null);
			};
		}
	}
	function ReactDOMRoot(internalRoot) {
		this._internalRoot = internalRoot;
	}
	ReactDOMHydrationRoot.prototype.render = ReactDOMRoot.prototype.render = function(children) {
		var root = this._internalRoot;
		if (null === root) throw Error(formatProdErrorMessage(409));
		var current = root.current;
		updateContainerImpl(current, requestUpdateLane(), children, root, null, null);
	};
	ReactDOMHydrationRoot.prototype.unmount = ReactDOMRoot.prototype.unmount = function() {
		var root = this._internalRoot;
		if (null !== root) {
			this._internalRoot = null;
			var container = root.containerInfo;
			updateContainerImpl(root.current, 2, null, root, null, null);
			flushSyncWork$1();
			container[internalContainerInstanceKey] = null;
		}
	};
	function ReactDOMHydrationRoot(internalRoot) {
		this._internalRoot = internalRoot;
	}
	ReactDOMHydrationRoot.prototype.unstable_scheduleHydration = function(target) {
		if (target) {
			var updatePriority = resolveUpdatePriority();
			target = {
				blockedOn: null,
				target,
				priority: updatePriority
			};
			for (var i = 0; i < queuedExplicitHydrationTargets.length && 0 !== updatePriority && updatePriority < queuedExplicitHydrationTargets[i].priority; i++);
			queuedExplicitHydrationTargets.splice(i, 0, target);
			0 === i && attemptExplicitHydrationTarget(target);
		}
	};
	var isomorphicReactPackageVersion$jscomp$inline_1840 = React.version;
	if ("19.2.6" !== isomorphicReactPackageVersion$jscomp$inline_1840) throw Error(formatProdErrorMessage(527, isomorphicReactPackageVersion$jscomp$inline_1840, "19.2.6"));
	ReactDOMSharedInternals.findDOMNode = function(componentOrElement) {
		var fiber = componentOrElement._reactInternals;
		if (void 0 === fiber) {
			if ("function" === typeof componentOrElement.render) throw Error(formatProdErrorMessage(188));
			componentOrElement = Object.keys(componentOrElement).join(",");
			throw Error(formatProdErrorMessage(268, componentOrElement));
		}
		componentOrElement = findCurrentFiberUsingSlowPath(fiber);
		componentOrElement = null !== componentOrElement ? findCurrentHostFiberImpl(componentOrElement) : null;
		componentOrElement = null === componentOrElement ? null : componentOrElement.stateNode;
		return componentOrElement;
	};
	var internals$jscomp$inline_2347 = {
		bundleType: 0,
		version: "19.2.6",
		rendererPackageName: "react-dom",
		currentDispatcherRef: ReactSharedInternals,
		reconcilerVersion: "19.2.6"
	};
	if ("undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) {
		var hook$jscomp$inline_2348 = __REACT_DEVTOOLS_GLOBAL_HOOK__;
		if (!hook$jscomp$inline_2348.isDisabled && hook$jscomp$inline_2348.supportsFiber) try {
			rendererID = hook$jscomp$inline_2348.inject(internals$jscomp$inline_2347), injectedHook = hook$jscomp$inline_2348;
		} catch (err) {}
	}
	exports.createRoot = function(container, options) {
		if (!isValidContainer(container)) throw Error(formatProdErrorMessage(299));
		var isStrictMode = !1, identifierPrefix = "", onUncaughtError = defaultOnUncaughtError, onCaughtError = defaultOnCaughtError, onRecoverableError = defaultOnRecoverableError;
		null !== options && void 0 !== options && (!0 === options.unstable_strictMode && (isStrictMode = !0), void 0 !== options.identifierPrefix && (identifierPrefix = options.identifierPrefix), void 0 !== options.onUncaughtError && (onUncaughtError = options.onUncaughtError), void 0 !== options.onCaughtError && (onCaughtError = options.onCaughtError), void 0 !== options.onRecoverableError && (onRecoverableError = options.onRecoverableError));
		options = createFiberRoot(container, 1, !1, null, null, isStrictMode, identifierPrefix, null, onUncaughtError, onCaughtError, onRecoverableError, defaultOnDefaultTransitionIndicator);
		container[internalContainerInstanceKey] = options.current;
		listenToAllSupportedEvents(container);
		return new ReactDOMRoot(options);
	};
}));
//#endregion
//#region node_modules/react-dom/client.js
var require_client = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	function checkDCE() {
		if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === "undefined" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== "function") return;
		try {
			__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
		} catch (err) {
			console.error(err);
		}
	}
	checkDCE();
	module.exports = require_react_dom_client_production();
}));
//#endregion
//#region src/index.css
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_client = require_client();
//#endregion
//#region node_modules/react/cjs/react-jsx-runtime.production.js
/**
* @license React
* react-jsx-runtime.production.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var require_react_jsx_runtime_production = /* @__PURE__ */ __commonJSMin(((exports) => {
	var REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
	function jsxProd(type, config, maybeKey) {
		var key = null;
		void 0 !== maybeKey && (key = "" + maybeKey);
		void 0 !== config.key && (key = "" + config.key);
		if ("key" in config) {
			maybeKey = {};
			for (var propName in config) "key" !== propName && (maybeKey[propName] = config[propName]);
		} else maybeKey = config;
		config = maybeKey.ref;
		return {
			$$typeof: REACT_ELEMENT_TYPE,
			type,
			key,
			ref: void 0 !== config ? config : null,
			props: maybeKey
		};
	}
	exports.Fragment = REACT_FRAGMENT_TYPE;
	exports.jsx = jsxProd;
	exports.jsxs = jsxProd;
}));
//#endregion
//#region src/App.jsx
var import_jsx_runtime = (/* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_react_jsx_runtime_production();
})))();
var apiKey = "AIzaSyAD_EXu68DfJadGU4XXsyeuV0nwFmqeCio";
var geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
async function geminiJSON(prompt) {
	const data = await (await fetch(geminiUrl, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			contents: [{
				role: "user",
				parts: [{ text: prompt }]
			}],
			generationConfig: { responseMimeType: "application/json" }
		})
	})).json();
	if (!data.candidates?.[0]?.content?.parts?.[0]?.text) throw new Error(data.error?.message || "No response from Gemini");
	return JSON.parse(data.candidates[0].content.parts[0].text);
}
var vocabData = [
	{
		cat: "Tài chính",
		word: "Substantial",
		ipa: "/səbˈstæn.ʃəl/",
		vi: "Đáng kể",
		ex: "A substantial increase in P&L.",
		hint: "Gợi ý: Thường đi kèm với 'increase' hoặc 'decrease', chỉ sự thay đổi về lượng rất lớn."
	},
	{
		cat: "Tài chính",
		word: "Deficit",
		ipa: "/ˈdef.ɪ.sɪt/",
		vi: "Thâm hụt",
		ex: "The trade deficit reached a record high.",
		hint: "Gợi ý: Trái ngược với thặng dư (Surplus), tình trạng khi chi tiêu vượt quá mức thu nhập."
	},
	{
		cat: "Vận hành",
		word: "Discrepancy",
		ipa: "/dɪˈskrep.ən.si/",
		vi: "Sự sai lệch",
		ex: "A discrepancy in the financial report.",
		hint: "Gợi ý: Bắt đầu bằng chữ 'D', dùng khi 2 bản báo cáo/dữ liệu không khớp nhau."
	},
	{
		cat: "Hợp đồng",
		word: "Stipulate",
		ipa: "/ˈstɪp.jə.leɪt/",
		vi: "Quy định",
		ex: "The contract stipulates the deadline.",
		hint: "Gợi ý: Động từ chuyên dùng trong hợp đồng, mang nghĩa 'nêu rõ điều kiện'."
	},
	{
		cat: "Đàm phán",
		word: "Intermediary",
		ipa: "/ˌɪn.təˈmiː.di.ə.ri/",
		vi: "Trung gian",
		ex: "The company acts as an intermediary.",
		hint: "Gợi ý: Người/bên thứ 3 đứng giữa để kết nối 2 bên."
	},
	{
		cat: "Pháp lý",
		word: "Compliance",
		ipa: "/kəmˈplaɪ.əns/",
		vi: "Sự tuân thủ",
		ex: "Ensure legal compliance for fintech.",
		hint: "Gợi ý: Làm đúng theo luật, quy chế (Compliance team)."
	},
	{
		cat: "Tài chính",
		word: "EBITDA",
		ipa: "/ˈiː.bɪt.dɑː/",
		vi: "Lợi nhuận gộp",
		ex: "Analyze the EBITDA margin.",
		hint: "Gợi ý: Một chỉ số tài chính quen thuộc, viết tắt của Earning Before Interest, Taxes..."
	},
	{
		cat: "Vận hành",
		word: "Overhead",
		ipa: "/ˈəʊ.və.hed/",
		vi: "Chi phí cố định",
		ex: "Reduce overhead costs.",
		hint: "Gợi ý: Chi phí vận hành không sinh lời trực tiếp (điện, nước, mặt bằng...)."
	},
	{
		cat: "Đàm phán",
		word: "Acquisition",
		ipa: "/ˌæk.wɪˈzɪʃ.ən/",
		vi: "Sự thâu tóm",
		ex: "An aggressive acquisition strategy.",
		hint: "Gợi ý: Chữ 'A' trong thuật ngữ M&A (Mua bán và sáp nhập)."
	},
	{
		cat: "Thị trường",
		word: "Fluctuate",
		ipa: "/ˈflʌk.tʃu.eɪt/",
		vi: "Dao động",
		ex: "Transaction volumes fluctuate daily.",
		hint: "Gợi ý: Động từ chỉ sự biến động, lên xuống thất thường như biểu đồ hình sin."
	},
	{
		cat: "Kỹ thuật",
		word: "Congestion",
		ipa: "/kənˈdʒes.tʃən/",
		vi: "Sự tắc nghẽn",
		ex: "Network congestion caused the delay.",
		hint: "Gợi ý: Thường dùng cho kẹt xe (Traffic), trong IT dùng cho nghẽn mạng."
	},
	{
		cat: "Tài chính",
		word: "Reconciliation",
		ipa: "/ˌrek.ənˌsɪl.iˈeɪ.ʃən/",
		vi: "Sự đối soát",
		ex: "Automated reconciliation saves time.",
		hint: "Gợi ý: Quá trình kế toán dò lại 2 sổ sách xem dòng tiền có khớp nhau không."
	},
	{
		cat: "Tài chính",
		word: "Leverage",
		ipa: "/ˈlev.ər.ɪdʒ/",
		vi: "Đòn bẩy tài chính",
		ex: "Use leverage wisely to maximize returns.",
		hint: "Gợi ý: Dùng vốn vay để khuếch đại lợi nhuận — lợi khi thị trường tốt, rủi ro cao khi thị trường xấu."
	},
	{
		cat: "Tài chính",
		word: "Collateral",
		ipa: "/kəˈlæt.ər.əl/",
		vi: "Tài sản thế chấp",
		ex: "The loan requires collateral of $500,000.",
		hint: "Gợi ý: Tài sản anh đặt cọc khi vay — nếu không trả được nợ thì mất tài sản đó."
	},
	{
		cat: "Tài chính",
		word: "Volatility",
		ipa: "/ˌvɒl.əˈtɪl.ɪ.ti/",
		vi: "Tính biến động",
		ex: "Market volatility increased after the announcement.",
		hint: "Gợi ý: Chỉ mức độ giá dao động mạnh — thị trường crypto có volatility rất cao."
	},
	{
		cat: "Thanh toán",
		word: "Chargeback",
		ipa: "/ˈtʃɑːdʒ.bæk/",
		vi: "Hoàn tiền tranh chấp",
		ex: "The chargeback rate exceeded 1% this month.",
		hint: "Gợi ý: Khi khách hàng khiếu nại với ngân hàng để lấy lại tiền — nỗi ám ảnh của mọi merchant."
	},
	{
		cat: "Thanh toán",
		word: "Settlement",
		ipa: "/ˈset.əl.mənt/",
		vi: "Quyết toán",
		ex: "The settlement cycle takes two business days.",
		hint: "Gợi ý: Quá trình tiền thực sự được chuyển sau khi giao dịch được approved."
	},
	{
		cat: "Vận hành",
		word: "Throughput",
		ipa: "/ˈθruː.pʊt/",
		vi: "Công suất xử lý",
		ex: "The system's throughput is 10,000 TPS.",
		hint: "Gợi ý: Số lượng giao dịch/công việc hoàn thành trong một đơn vị thời gian."
	},
	{
		cat: "Chiến lược",
		word: "Scalable",
		ipa: "/ˈskeɪ.lə.bəl/",
		vi: "Có thể mở rộng quy mô",
		ex: "We need a scalable architecture for growth.",
		hint: "Gợi ý: Hệ thống có thể phục vụ 1000 hay 10 triệu user mà không cần thiết kế lại."
	},
	{
		cat: "Chiến lược",
		word: "Stakeholder",
		ipa: "/ˈsteɪk.həʊl.dər/",
		vi: "Bên liên quan",
		ex: "All stakeholders must approve the roadmap.",
		hint: "Gợi ý: Bất kỳ ai bị ảnh hưởng bởi dự án — từ CEO đến đối tác, nhân viên, nhà đầu tư."
	},
	{
		cat: "Chiến lược",
		word: "Milestone",
		ipa: "/ˈmaɪl.stəʊn/",
		vi: "Mốc quan trọng",
		ex: "Reaching 1 million users is a key milestone.",
		hint: "Gợi ý: Mốc đánh dấu tiến độ quan trọng trong dự án, thường gắn với deadline hoặc KPI."
	},
	{
		cat: "Vận hành",
		word: "Onboarding",
		ipa: "/ˈɒn.bɔːr.dɪŋ/",
		vi: "Tiếp nhận/Khởi động",
		ex: "The merchant onboarding process takes 3 days.",
		hint: "Gợi ý: Quá trình đưa merchant hoặc nhân viên mới vào hệ thống/công ty."
	},
	{
		cat: "Vận hành",
		word: "Procurement",
		ipa: "/prəˈkjʊər.mənt/",
		vi: "Thu mua",
		ex: "The IT procurement process takes two weeks.",
		hint: "Gợi ý: Toàn bộ quy trình mua sắm chính thức của doanh nghiệp — từ RFP đến ký hợp đồng."
	},
	{
		cat: "Kỹ thuật",
		word: "Deployment",
		ipa: "/dɪˈplɔɪ.mənt/",
		vi: "Triển khai",
		ex: "The deployment was rolled back due to a bug.",
		hint: "Gợi ý: Đưa code mới lên môi trường production — deploy xong mà app lỗi thì rollback."
	},
	{
		cat: "Pháp lý",
		word: "Mandate",
		ipa: "/ˈmæn.deɪt/",
		vi: "Ủy quyền/Nhiệm vụ bắt buộc",
		ex: "The new regulation mandates KYC verification.",
		hint: "Gợi ý: Quy định/lệnh bắt buộc phải thực hiện, thường từ cơ quan nhà nước hoặc cấp trên."
	},
	{
		cat: "Tài chính",
		word: "Liquidity",
		ipa: "/lɪˈkwɪd.ɪ.ti/",
		vi: "Tính thanh khoản",
		ex: "The startup struggled with liquidity issues.",
		hint: "Gợi ý: Khả năng chuyển tài sản thành tiền mặt nhanh chóng — tiền mặt có liquidity cao nhất."
	},
	{
		cat: "Thị trường",
		word: "Benchmark",
		ipa: "/ˈbentʃ.mɑːk/",
		vi: "Chuẩn so sánh",
		ex: "Our NPS score exceeds the industry benchmark.",
		hint: "Gợi ý: Tiêu chuẩn/mức tham chiếu để so sánh hiệu suất — như VN-Index là benchmark cho chứng khoán VN."
	},
	{
		cat: "Chiến lược",
		word: "Iterate",
		ipa: "/ˈɪt.ər.eɪt/",
		vi: "Cải tiến liên tục",
		ex: "We iterate the product based on user feedback.",
		hint: "Gợi ý: Liên tục cải thiện sản phẩm qua nhiều vòng lặp — phương pháp Agile dựa trên nguyên lý này."
	},
	{
		cat: "Tài chính",
		word: "Arbitrage",
		ipa: "/ˈɑː.bɪ.trɑːʒ/",
		vi: "Kinh doanh chênh lệch giá",
		ex: "Traders exploit arbitrage opportunities between exchanges.",
		hint: "Gợi ý: Mua rẻ ở nơi này, bán đắt ở nơi khác cùng lúc — khai thác chênh lệch giá không rủi ro."
	},
	{
		cat: "Pháp lý",
		word: "Due Diligence",
		ipa: "/ˌdjuː ˈdɪl.ɪ.dʒəns/",
		vi: "Thẩm định kỹ lưỡng",
		ex: "Investors conduct due diligence before funding.",
		hint: "Gợi ý: Điều tra toàn diện trước khi đầu tư/M&A — kiểm tra tài chính, pháp lý, vận hành."
	},
	{
		cat: "Chiến lược",
		word: "Traction",
		ipa: "/ˈtræk.ʃən/",
		vi: "Đà tăng trưởng",
		ex: "The startup showed strong traction with 50k users.",
		hint: "Gợi ý: Bằng chứng thực tế cho thấy sản phẩm đang được thị trường chấp nhận — số liệu, user, revenue."
	},
	{
		cat: "Chiến lược",
		word: "Momentum",
		ipa: "/məˈmen.təm/",
		vi: "Đà phát triển",
		ex: "The product gained momentum after the viral campaign.",
		hint: "Gợi ý: Giống như quả bóng lăn — một khi đã có momentum thì rất khó dừng lại."
	},
	{
		cat: "Tài chính",
		word: "Portfolio",
		ipa: "/pɔːtˈfəʊ.li.əʊ/",
		vi: "Danh mục đầu tư",
		ex: "The VC firm manages a diverse fintech portfolio.",
		hint: "Gợi ý: Tập hợp tất cả các khoản đầu tư hoặc sản phẩm — không bỏ hết trứng vào một giỏ."
	},
	{
		cat: "Tài chính",
		word: "Escrow",
		ipa: "/ˈes.krəʊ/",
		vi: "Tài khoản ký quỹ",
		ex: "Funds are held in escrow until both parties fulfill the contract.",
		hint: "Gợi ý: Tiền được giữ bởi bên thứ 3 trung lập cho đến khi điều kiện hợp đồng được thỏa mãn."
	},
	{
		cat: "Tài chính",
		word: "Amortize",
		ipa: "/ˈæm.ə.taɪz/",
		vi: "Khấu hao dần",
		ex: "The company amortizes its software development costs over five years.",
		hint: "Gợi ý: Phân bổ chi phí lớn ra nhiều kỳ kế toán thay vì ghi nhận một lần."
	},
	{
		cat: "Tài chính",
		word: "Accrue",
		ipa: "/əˈkruː/",
		vi: "Tích lũy (lãi/nợ)",
		ex: "Interest accrues daily on the outstanding loan balance.",
		hint: "Gợi ý: Lãi hoặc nợ tự động tăng lên theo thời gian dù chưa thanh toán."
	},
	{
		cat: "Tài chính",
		word: "Underwrite",
		ipa: "/ˈʌn.də.raɪt/",
		vi: "Bảo lãnh phát hành",
		ex: "The bank agreed to underwrite the $50M bond issuance.",
		hint: "Gợi ý: Cam kết mua toàn bộ cổ phiếu/trái phiếu nếu không ai mua — chịu rủi ro thay cho công ty."
	},
	{
		cat: "Tài chính",
		word: "Dilution",
		ipa: "/daɪˈluː.ʃən/",
		vi: "Pha loãng cổ phần",
		ex: "Issuing new shares caused significant dilution for early investors.",
		hint: "Gợi ý: Khi phát hành thêm cổ phiếu, phần trăm sở hữu của cổ đông cũ bị giảm xuống."
	},
	{
		cat: "Chiến lược",
		word: "Burn Rate",
		ipa: "/bɜːn reɪt/",
		vi: "Tốc độ đốt tiền",
		ex: "With a $200K monthly burn rate, the startup has 10 months of runway.",
		hint: "Gợi ý: Số tiền startup tiêu hàng tháng trước khi có lợi nhuận — burn rate cao thì runway ngắn."
	},
	{
		cat: "Chiến lược",
		word: "Runway",
		ipa: "/ˈrʌn.weɪ/",
		vi: "Thời gian tồn tại còn lại",
		ex: "After the funding round, they have 18 months of runway.",
		hint: "Gợi ý: Số tháng công ty còn tiền để hoạt động — như đường băng cho máy bay cất cánh."
	},
	{
		cat: "Chiến lược",
		word: "Pivot",
		ipa: "/ˈpɪv.ət/",
		vi: "Chuyển hướng chiến lược",
		ex: "After poor market feedback, they pivoted from B2C to B2B.",
		hint: "Gợi ý: Thay đổi căn bản hướng đi của sản phẩm/mô hình kinh doanh khi model cũ không hiệu quả."
	},
	{
		cat: "Chiến lược",
		word: "MVP",
		ipa: "/ˌem.viːˈpiː/",
		vi: "Sản phẩm khả dụng tối thiểu",
		ex: "The team launched an MVP in two weeks to validate the market.",
		hint: "Gợi ý: Minimum Viable Product — phiên bản đơn giản nhất đủ để kiểm nghiệm ý tưởng với người dùng thực."
	},
	{
		cat: "Thị trường",
		word: "Churn",
		ipa: "/tʃɜːn/",
		vi: "Tỷ lệ rời bỏ dịch vụ",
		ex: "High churn is a warning sign that product-market fit is weak.",
		hint: "Gợi ý: Tỷ lệ khách hàng ngừng sử dụng dịch vụ — churn cao nghĩa là giữ chân khách kém."
	},
	{
		cat: "Thị trường",
		word: "Retention",
		ipa: "/rɪˈten.ʃən/",
		vi: "Tỷ lệ giữ chân khách hàng",
		ex: "A 90-day retention rate of 60% is strong for a fintech app.",
		hint: "Gợi ý: Ngược lại với churn — đo xem bao nhiêu % người dùng tiếp tục dùng sản phẩm sau một khoảng thời gian."
	},
	{
		cat: "Marketing",
		word: "Conversion Rate",
		ipa: "/kənˈvɜː.ʃən reɪt/",
		vi: "Tỷ lệ chuyển đổi",
		ex: "Improving the checkout UX increased our conversion rate by 15%.",
		hint: "Gợi ý: Tỷ lệ người dùng thực hiện hành động mong muốn (mua hàng, đăng ký...) trên tổng số người truy cập."
	},
	{
		cat: "Marketing",
		word: "Funnel",
		ipa: "/ˈfʌn.əl/",
		vi: "Phễu chuyển đổi",
		ex: "Analyze each stage of the sales funnel to identify drop-off points.",
		hint: "Gợi ý: Hành trình từ khách lạ đến khách mua hàng — như cái phễu, càng xuống dưới càng ít người."
	},
	{
		cat: "Pháp lý",
		word: "KYC",
		ipa: "/ˌkeɪ.waɪˈsiː/",
		vi: "Xác thực danh tính khách hàng",
		ex: "All users must pass KYC before making their first transaction.",
		hint: "Gợi ý: Know Your Customer — quy trình bắt buộc trong fintech để xác minh danh tính, chống rửa tiền."
	},
	{
		cat: "Pháp lý",
		word: "AML",
		ipa: "/ˌeɪ.emˈel/",
		vi: "Chống rửa tiền",
		ex: "Our AML system flags suspicious transactions above $10,000.",
		hint: "Gợi ý: Anti-Money Laundering — hệ thống phát hiện và ngăn chặn các giao dịch rửa tiền bất hợp pháp."
	},
	{
		cat: "Kỹ thuật",
		word: "API",
		ipa: "/ˌeɪ.piːˈaɪ/",
		vi: "Giao diện lập trình ứng dụng",
		ex: "We expose a REST API so partners can integrate our payment gateway.",
		hint: "Gợi ý: Application Programming Interface — 'hợp đồng' kỹ thuật cho phép 2 hệ thống giao tiếp với nhau."
	},
	{
		cat: "Kỹ thuật",
		word: "Latency",
		ipa: "/ˈleɪ.tən.si/",
		vi: "Độ trễ",
		ex: "Payment latency must stay below 200ms for a smooth user experience.",
		hint: "Gợi ý: Thời gian từ lúc gửi yêu cầu đến lúc nhận phản hồi — latency thấp = hệ thống nhanh."
	},
	{
		cat: "Kỹ thuật",
		word: "Uptime",
		ipa: "/ˈʌp.taɪm/",
		vi: "Thời gian hoạt động",
		ex: "Our SLA guarantees 99.9% uptime for the payment processing service.",
		hint: "Gợi ý: Phần trăm thời gian hệ thống hoạt động bình thường — 99.9% uptime = chỉ ~8.7 giờ downtime/năm."
	},
	{
		cat: "Kỹ thuật",
		word: "Sandbox",
		ipa: "/ˈsænd.bɒks/",
		vi: "Môi trường thử nghiệm",
		ex: "Test your API integration in the sandbox before going live.",
		hint: "Gợi ý: Môi trường giả lập an toàn để dev test mà không ảnh hưởng hệ thống thực."
	},
	{
		cat: "Kỹ thuật",
		word: "Rollback",
		ipa: "/ˈrəʊl.bæk/",
		vi: "Hoàn tác triển khai",
		ex: "The team triggered a rollback after the new release caused errors.",
		hint: "Gợi ý: Quay lại phiên bản trước khi có lỗi nghiêm trọng sau khi deploy — bước cứu cánh cuối cùng."
	},
	{
		cat: "Vận hành",
		word: "SLA",
		ipa: "/ˌes.elˈeɪ/",
		vi: "Thỏa thuận mức dịch vụ",
		ex: "Breaching the SLA triggers a penalty clause in the contract.",
		hint: "Gợi ý: Service Level Agreement — hợp đồng cam kết chất lượng dịch vụ (uptime, response time...)."
	},
	{
		cat: "Vận hành",
		word: "KPI",
		ipa: "/ˌkeɪ.piːˈaɪ/",
		vi: "Chỉ số hiệu suất then chốt",
		ex: "Monthly active users is our primary KPI for the consumer app.",
		hint: "Gợi ý: Key Performance Indicator — thước đo cụ thể để biết team/sản phẩm có đang đi đúng hướng không."
	},
	{
		cat: "Chiến lược",
		word: "OKR",
		ipa: "/ˌəʊ.keɪˈɑːr/",
		vi: "Mục tiêu và kết quả then chốt",
		ex: "Each team sets OKRs at the start of every quarter.",
		hint: "Gợi ý: Objectives and Key Results — khung quản lý mục tiêu của Google/Intel: 1 mục tiêu lớn + 3-5 kết quả đo được."
	},
	{
		cat: "Chiến lược",
		word: "Roadmap",
		ipa: "/ˈrəʊd.mæp/",
		vi: "Lộ trình sản phẩm",
		ex: "The Q3 roadmap prioritizes compliance features over new integrations.",
		hint: "Gợi ý: Kế hoạch tổng thể theo thời gian cho sản phẩm/dự án — cho thấy sẽ làm gì, khi nào."
	},
	{
		cat: "Chiến lược",
		word: "Agile",
		ipa: "/ˈædʒ.aɪl/",
		vi: "Linh hoạt/Phương pháp Agile",
		ex: "We use Agile sprints to ship new features every two weeks.",
		hint: "Gợi ý: Phương pháp phát triển phần mềm chia công việc thành các sprint ngắn, liên tục cải tiến."
	},
	{
		cat: "Kỹ thuật",
		word: "Tokenization",
		ipa: "/ˌtəʊ.kən.aɪˈzeɪ.ʃən/",
		vi: "Mã hóa dữ liệu thẻ",
		ex: "Tokenization replaces card numbers with secure tokens during transactions.",
		hint: "Gợi ý: Thay thế thông tin thẻ thật bằng mã token vô nghĩa — nếu bị hack cũng không lấy được số thẻ thật."
	},
	{
		cat: "Kỹ thuật",
		word: "Encryption",
		ipa: "/ɪnˈkrɪp.ʃən/",
		vi: "Mã hóa dữ liệu",
		ex: "All data in transit is protected by end-to-end encryption.",
		hint: "Gợi ý: Biến dữ liệu thành mật mã không đọc được nếu không có chìa khóa — bảo mật thông tin tuyệt đối."
	},
	{
		cat: "Thanh toán",
		word: "Fraud Detection",
		ipa: "/frɔːd dɪˈtek.ʃən/",
		vi: "Phát hiện gian lận",
		ex: "Our AI-powered fraud detection blocks 99.5% of suspicious transactions.",
		hint: "Gợi ý: Hệ thống tự động nhận diện và chặn các giao dịch bất thường — xương sống của mọi platform thanh toán."
	},
	{
		cat: "Đàm phán",
		word: "Partnership",
		ipa: "/ˈpɑːt.nə.ʃɪp/",
		vi: "Quan hệ đối tác",
		ex: "We signed a strategic partnership with three major Vietnamese banks.",
		hint: "Gợi ý: Quan hệ hợp tác chính thức giữa hai tổ chức — khác với vendor là có lợi ích chia sẻ 2 chiều."
	},
	{
		cat: "Tài chính",
		word: "Hedge",
		ipa: "/hedʒ/",
		vi: "Phòng ngừa rủi ro",
		ex: "The company uses currency forwards to hedge against exchange rate fluctuations.",
		hint: "Gợi ý: Dùng công cụ tài chính (futures, options...) để giảm thiểu rủi ro biến động giá — như mua bảo hiểm cho danh mục đầu tư."
	},
	{
		cat: "Tài chính",
		word: "Perpetual",
		ipa: "/pəˈpetʃ.u.əl/",
		vi: "Vĩnh viễn/Không kỳ hạn",
		ex: "They issued perpetual bonds to raise long-term capital without a maturity date.",
		hint: "Gợi ý: Không có ngày đáo hạn — trái phiếu perpetual trả lãi mãi mãi nhưng không hoàn vốn gốc."
	},
	{
		cat: "Chiến lược",
		word: "Bootstrapped",
		ipa: "/ˈbuːt.stræpt/",
		vi: "Tự lực khởi nghiệp",
		ex: "The founders bootstrapped the company for two years before seeking external funding.",
		hint: "Gợi ý: Tự bỏ tiền túi ra xây dựng startup mà không cần vốn bên ngoài — kiểm soát hoàn toàn nhưng rủi ro cao."
	},
	{
		cat: "Chiến lược",
		word: "Cap Table",
		ipa: "/kæp ˈteɪ.bəl/",
		vi: "Bảng phân bổ cổ phần",
		ex: "The investors reviewed the cap table before signing the term sheet.",
		hint: "Gợi ý: Bảng ghi ai sở hữu bao nhiêu % công ty — nhà đầu tư Series A thường nhìn vào đây trước tiên."
	},
	{
		cat: "Kỹ thuật",
		word: "Fallback",
		ipa: "/ˈfɔːl.bæk/",
		vi: "Phương án dự phòng",
		ex: "The payment system has a fallback to manual processing if the API fails.",
		hint: "Gợi ý: Kế hoạch B khi hệ thống chính gặp sự cố — critical cho mọi fintech platform."
	},
	{
		cat: "Kỹ thuật",
		word: "Circuit Breaker",
		ipa: "/ˈsɜː.kɪt ˌbreɪ.kər/",
		vi: "Cầu dao ngắt mạch",
		ex: "The circuit breaker pattern prevents cascading failures across microservices.",
		hint: "Gợi ý: Khi một service bị lỗi, circuit breaker ngắt kết nối để tránh lỗi lan rộng toàn hệ thống."
	},
	{
		cat: "Kỹ thuật",
		word: "Microservice",
		ipa: "/ˈmaɪ.krəʊˌsɜː.vɪs/",
		vi: "Kiến trúc vi dịch vụ",
		ex: "We decomposed the monolith into microservices to improve scalability and deployment speed.",
		hint: "Gợi ý: Chia ứng dụng lớn thành nhiều service nhỏ độc lập — mỗi team quản lý 1 service, deploy nhanh hơn."
	},
	{
		cat: "Kỹ thuật",
		word: "Incident",
		ipa: "/ˈɪn.sɪ.dənt/",
		vi: "Sự cố hệ thống",
		ex: "The on-call engineer resolved the P1 incident within 15 minutes, meeting the SLA.",
		hint: "Gợi ý: Sự cố làm gián đoạn dịch vụ — P1 là nghiêm trọng nhất, cần xử lý ngay lập tức."
	},
	{
		cat: "Kỹ thuật",
		word: "Go-live",
		ipa: "/ˌɡəʊ ˈlaɪv/",
		vi: "Chính thức ra mắt",
		ex: "The go-live date for the new payment module is scheduled for next Monday.",
		hint: "Gợi ý: Thời điểm hệ thống/tính năng mới được đưa vào production và phục vụ người dùng thực."
	},
	{
		cat: "Chiến lược",
		word: "Backlog",
		ipa: "/ˈbæk.lɒɡ/",
		vi: "Danh sách tồn đọng công việc",
		ex: "The product manager prioritized the backlog before the sprint planning session.",
		hint: "Gợi ý: Danh sách tất cả các tính năng/bug cần làm, được sắp xếp theo độ ưu tiên — xương sống của Agile."
	},
	{
		cat: "Chiến lược",
		word: "Sprint",
		ipa: "/sprɪnt/",
		vi: "Chu kỳ phát triển ngắn",
		ex: "Each sprint lasts two weeks and results in a shippable product increment.",
		hint: "Gợi ý: Khoảng thời gian cố định (thường 1-2 tuần) để team hoàn thành một lượng công việc đã cam kết."
	},
	{
		cat: "Vận hành",
		word: "Vendor",
		ipa: "/ˈven.dər/",
		vi: "Nhà cung cấp",
		ex: "We evaluated three vendors before selecting the cloud infrastructure provider.",
		hint: "Gợi ý: Bên bán hàng/dịch vụ cho doanh nghiệp — không có lợi ích chung như partner, chỉ là quan hệ mua bán."
	},
	{
		cat: "Đàm phán",
		word: "Negotiation",
		ipa: "/nɪˌɡəʊ.ʃiˈeɪ.ʃən/",
		vi: "Đàm phán",
		ex: "Successful fee negotiation with the card network saved us $2M annually.",
		hint: "Gợi ý: Quá trình thương lượng để đạt thỏa thuận có lợi — BATNA là khái niệm quan trọng trong negotiation."
	},
	{
		cat: "Kỹ thuật",
		word: "Integration",
		ipa: "/ˌɪn.tɪˈɡreɪ.ʃən/",
		vi: "Tích hợp hệ thống",
		ex: "The bank API integration took three months and required extensive testing in sandbox.",
		hint: "Gợi ý: Kết nối hai hệ thống để chúng hoạt động cùng nhau — REST API hay webhook là cách phổ biến nhất."
	},
	{
		cat: "Thanh toán",
		word: "Risk Score",
		ipa: "/rɪsk skɔːr/",
		vi: "Điểm rủi ro",
		ex: "Each transaction is assigned a risk score to determine if it requires additional verification.",
		hint: "Gợi ý: Điểm số tự động tính toán mức độ nguy hiểm của giao dịch — score cao = cần xem xét thêm."
	},
	{
		cat: "Pháp lý",
		word: "Whitelist",
		ipa: "/ˈwaɪt.lɪst/",
		vi: "Danh sách trắng (được phép)",
		ex: "Only whitelisted IP addresses can access the admin payment dashboard.",
		hint: "Gợi ý: Danh sách những gì được phép (người dùng, IP, merchant...) — ngược lại với blacklist."
	},
	{
		cat: "Pháp lý",
		word: "Blacklist",
		ipa: "/ˈblæk.lɪst/",
		vi: "Danh sách đen (bị cấm)",
		ex: "The AML system automatically blacklists accounts linked to suspicious activity.",
		hint: "Gợi ý: Danh sách các thực thể bị cấm giao dịch — do gian lận, rửa tiền, hoặc vi phạm pháp luật."
	},
	{
		cat: "Tài chính",
		word: "Syndicate",
		ipa: "/ˈsɪn.dɪ.kət/",
		vi: "Tổ hợp đầu tư",
		ex: "A syndicate of five banks co-financed the infrastructure project.",
		hint: "Gợi ý: Nhóm các tổ chức tài chính cùng nhau tham gia vào một thương vụ lớn — chia sẻ rủi ro và lợi nhuận."
	},
	{
		cat: "Nhân sự",
		word: "Headcount",
		ipa: "/ˈhed.kaʊnt/",
		vi: "Số lượng nhân sự",
		ex: "The CFO approved a headcount increase of 20 engineers for the next fiscal year.",
		hint: "Gợi ý: Tổng số nhân viên trong một tổ chức hoặc bộ phận — HR thường quản lý headcount theo budget."
	},
	{
		cat: "Nhân sự",
		word: "Attrition",
		ipa: "/əˈtrɪʃ.ən/",
		vi: "Tỷ lệ nghỉ việc tự nhiên",
		ex: "High attrition in the engineering team is increasing recruitment and onboarding costs.",
		hint: "Gợi ý: Nhân viên rời công ty theo ý nguyện (khác với layoff) — attrition cao làm mất knowledge và tốn chi phí tuyển dụng."
	}
];
var runningPlaylistBase = [
	{
		id: 1,
		en: "Digital payments are replacing cash transactions in many countries around the world.",
		vi: "Thanh toán kỹ thuật số đang thay thế giao dịch tiền mặt ở nhiều quốc gia trên thế giới."
	},
	{
		id: 2,
		en: "A substantial increase in revenue indicates that our new payment gateway strategy is working.",
		vi: "Doanh thu tăng đáng kể cho thấy chiến lược cổng thanh toán mới của chúng ta đang có hiệu quả."
	},
	{
		id: 3,
		en: "Blockchain technology provides a secure and transparent way to record financial transactions.",
		vi: "Công nghệ blockchain cung cấp cách ghi lại giao dịch tài chính an toàn và minh bạch."
	},
	{
		id: 4,
		en: "The compliance team must ensure that all fintech operations adhere to local regulations.",
		vi: "Đội ngũ tuân thủ phải đảm bảo rằng tất cả hoạt động fintech tuân thủ các quy định địa phương."
	},
	{
		id: 5,
		en: "There is a discrepancy between the settlement report and the actual transaction data.",
		vi: "Có sự sai lệch giữa báo cáo quyết toán và dữ liệu giao dịch thực tế."
	},
	{
		id: 6,
		en: "Venture capital firms invest in early-stage companies with high growth potential.",
		vi: "Các công ty đầu tư mạo hiểm đầu tư vào các công ty giai đoạn đầu có tiềm năng tăng trưởng cao."
	},
	{
		id: 7,
		en: "Mobile banking allows customers to manage their accounts and transfer funds from anywhere.",
		vi: "Ngân hàng di động cho phép khách hàng quản lý tài khoản và chuyển tiền từ bất cứ đâu."
	},
	{
		id: 8,
		en: "Overhead costs have fluctuated substantially during this quarter, affecting our EBITDA margin.",
		vi: "Chi phí cố định đã dao động đáng kể trong quý này, ảnh hưởng đến biên lợi nhuận EBITDA của chúng ta."
	},
	{
		id: 9,
		en: "The contract stipulates a penalty clause if the service level agreement is breached.",
		vi: "Hợp đồng quy định điều khoản phạt nếu thỏa thuận mức dịch vụ bị vi phạm."
	},
	{
		id: 10,
		en: "Interest rates set by central banks influence borrowing costs for businesses and consumers.",
		vi: "Lãi suất do ngân hàng trung ương đặt ra ảnh hưởng đến chi phí vay vốn cho doanh nghiệp và người tiêu dùng."
	},
	{
		id: 11,
		en: "Due diligence is the process of thoroughly investigating a business before making an acquisition.",
		vi: "Thẩm định là quá trình điều tra kỹ lưỡng một doanh nghiệp trước khi tiến hành thâu tóm."
	},
	{
		id: 12,
		en: "A trade deficit occurs when a country imports more goods and services than it exports.",
		vi: "Thâm hụt thương mại xảy ra khi một quốc gia nhập khẩu nhiều hàng hóa và dịch vụ hơn xuất khẩu."
	},
	{
		id: 13,
		en: "Inflation erodes the purchasing power of money over time, affecting savings and investments.",
		vi: "Lạm phát làm xói mòn sức mua của tiền theo thời gian, ảnh hưởng đến tiết kiệm và đầu tư."
	},
	{
		id: 14,
		en: "The company acts as an intermediary between merchants and payment processors.",
		vi: "Công ty hoạt động như một trung gian giữa các nhà bán hàng và bộ xử lý thanh toán."
	},
	{
		id: 15,
		en: "Automated reconciliation saves time and reduces human error in financial reporting.",
		vi: "Đối soát tự động tiết kiệm thời gian và giảm sai sót của con người trong báo cáo tài chính."
	},
	{
		id: 16,
		en: "Network congestion during peak hours can delay transaction processing and hurt user experience.",
		vi: "Nghẽn mạng trong giờ cao điểm có thể làm chậm xử lý giao dịch và ảnh hưởng trải nghiệm người dùng."
	},
	{
		id: 17,
		en: "E-commerce platforms have made it easier for small businesses to reach global customers.",
		vi: "Các nền tảng thương mại điện tử đã giúp các doanh nghiệp nhỏ tiếp cận khách hàng toàn cầu dễ dàng hơn."
	},
	{
		id: 18,
		en: "Liquidity refers to how quickly and easily an asset can be converted into cash.",
		vi: "Tính thanh khoản đề cập đến mức độ nhanh chóng và dễ dàng mà một tài sản có thể được chuyển đổi thành tiền mặt."
	},
	{
		id: 19,
		en: "Artificial intelligence is being used in fintech to detect fraud and automate customer service.",
		vi: "Trí tuệ nhân tạo đang được sử dụng trong fintech để phát hiện gian lận và tự động hóa dịch vụ khách hàng."
	},
	{
		id: 20,
		en: "A strong business strategy requires understanding both the competitive landscape and regulatory environment.",
		vi: "Một chiến lược kinh doanh mạnh cần hiểu cả bối cảnh cạnh tranh lẫn môi trường pháp lý."
	},
	{
		id: 21,
		en: "High market volatility makes it difficult to set accurate revenue forecasts for the next quarter.",
		vi: "Biến động thị trường cao khiến việc dự báo doanh thu chính xác cho quý tới trở nên khó khăn."
	},
	{
		id: 22,
		en: "We must use leverage wisely, ensuring our collateral covers at least twice the loan value.",
		vi: "Chúng ta phải dùng đòn bẩy một cách khôn ngoan, đảm bảo tài sản thế chấp bao phủ ít nhất gấp đôi giá trị khoản vay."
	},
	{
		id: 23,
		en: "The chargeback rate is approaching the Visa threshold, so we need to tighten fraud detection immediately.",
		vi: "Tỷ lệ hoàn tiền tranh chấp đang tiệm cận ngưỡng Visa, vì vậy chúng ta cần siết chặt phát hiện gian lận ngay lập tức."
	},
	{
		id: 24,
		en: "Our settlement cycle has been reduced from three days to same-day, improving merchant cash flow substantially.",
		vi: "Chu kỳ quyết toán của chúng ta đã được rút ngắn từ ba ngày xuống còn trong ngày, cải thiện đáng kể dòng tiền cho merchant."
	},
	{
		id: 25,
		en: "Scalable infrastructure is critical for fintech companies that expect rapid user growth.",
		vi: "Cơ sở hạ tầng có thể mở rộng rất quan trọng với các công ty fintech dự kiến tăng trưởng người dùng nhanh."
	},
	{
		id: 26,
		en: "All stakeholders must align on the product roadmap before we commit to the Q4 milestones.",
		vi: "Tất cả các bên liên quan phải đồng thuận về lộ trình sản phẩm trước khi chúng ta cam kết các mốc Q4."
	},
	{
		id: 27,
		en: "Procurement costs can be reduced significantly by consolidating vendors and renegotiating contracts annually.",
		vi: "Chi phí thu mua có thể giảm đáng kể bằng cách gộp nhà cung cấp và đàm phán lại hợp đồng hàng năm."
	},
	{
		id: 28,
		en: "The startup demonstrated strong traction with fifty thousand active users just three months after launch.",
		vi: "Startup cho thấy đà tăng trưởng mạnh với 50 nghìn người dùng tích cực chỉ ba tháng sau khi ra mắt."
	},
	{
		id: 29,
		en: "Arbitrage opportunities between payment networks allow merchants to reduce transaction fees by up to forty percent.",
		vi: "Cơ hội kinh doanh chênh lệch giá giữa các mạng thanh toán giúp merchant giảm phí giao dịch tới 40 phần trăm."
	},
	{
		id: 30,
		en: "Before closing the acquisition, the legal team conducted due diligence on all outstanding liabilities and compliance issues.",
		vi: "Trước khi hoàn tất thâu tóm, đội pháp lý đã thẩm định kỹ lưỡng tất cả các khoản nợ tồn đọng và vấn đề tuân thủ."
	},
	{
		id: 31,
		en: "The startup's monthly burn rate is two hundred thousand dollars, leaving only eight months of runway.",
		vi: "Tốc độ đốt tiền hàng tháng của startup là 200 nghìn đô la, chỉ còn tám tháng thời gian tồn tại."
	},
	{
		id: 32,
		en: "KYC verification must be completed before a user can initiate any cross-border transaction.",
		vi: "Xác thực KYC phải được hoàn thành trước khi người dùng có thể thực hiện bất kỳ giao dịch xuyên biên giới nào."
	},
	{
		id: 33,
		en: "The fraud detection algorithm flagged over three hundred suspicious transactions within a single hour.",
		vi: "Thuật toán phát hiện gian lận đã gắn cờ hơn 300 giao dịch đáng ngờ trong vòng một giờ."
	},
	{
		id: 34,
		en: "Tokenization ensures that actual card numbers are never stored on our servers, reducing PCI compliance scope.",
		vi: "Mã hóa token đảm bảo rằng số thẻ thực sự không bao giờ được lưu trữ trên máy chủ của chúng ta, thu hẹp phạm vi tuân thủ PCI."
	},
	{
		id: 35,
		en: "After the pivot from B2C to B2B, the company's churn rate dropped from fifteen percent to just three percent.",
		vi: "Sau khi chuyển hướng từ B2C sang B2B, tỷ lệ rời bỏ dịch vụ của công ty giảm từ 15% xuống chỉ còn 3%."
	},
	{
		id: 36,
		en: "The API latency must remain below two hundred milliseconds to maintain a smooth checkout experience.",
		vi: "Độ trễ API phải duy trì dưới 200 mili giây để đảm bảo trải nghiệm thanh toán mượt mà."
	},
	{
		id: 37,
		en: "Our AML system uses machine learning to detect patterns of money laundering across millions of daily transactions.",
		vi: "Hệ thống AML của chúng ta sử dụng học máy để phát hiện các mô hình rửa tiền qua hàng triệu giao dịch mỗi ngày."
	},
	{
		id: 38,
		en: "The product team ran three sprints to deliver the MVP before the investor demo at the end of the month.",
		vi: "Đội sản phẩm đã chạy ba sprint để ra mắt MVP trước buổi demo cho nhà đầu tư vào cuối tháng."
	},
	{
		id: 39,
		en: "A well-maintained cap table is essential for transparent communication with existing and potential investors.",
		vi: "Bảng phân bổ cổ phần được quản lý tốt là điều thiết yếu cho giao tiếp minh bạch với các nhà đầu tư hiện tại và tiềm năng."
	},
	{
		id: 40,
		en: "The vendor's SLA guarantees ninety-nine point nine percent uptime and a maximum response time of four hours for critical incidents.",
		vi: "SLA của nhà cung cấp đảm bảo uptime 99,9% và thời gian phản hồi tối đa bốn giờ cho các sự cố nghiêm trọng."
	},
	{
		id: 41,
		en: "Equity dilution from the Series B round reduced the founders' combined ownership from sixty to forty-two percent.",
		vi: "Pha loãng cổ phần từ vòng Series B đã giảm tổng quyền sở hữu của các nhà sáng lập từ 60 xuống còn 42 phần trăm."
	},
	{
		id: 42,
		en: "The engineering team implemented a circuit breaker pattern to prevent any single microservice failure from taking down the entire platform.",
		vi: "Đội kỹ thuật triển khai mô hình cầu dao ngắt mạch để ngăn bất kỳ lỗi microservice đơn lẻ nào làm sập toàn bộ nền tảng."
	},
	{
		id: 43,
		en: "Our conversion rate improved by twenty-two percent after we simplified the onboarding flow from seven steps to three.",
		vi: "Tỷ lệ chuyển đổi của chúng ta tăng 22% sau khi chúng ta đơn giản hóa quy trình onboarding từ bảy bước xuống còn ba bước."
	},
	{
		id: 44,
		en: "Funds held in escrow are released to the seller only after the buyer confirms satisfactory delivery of services.",
		vi: "Tiền giữ trong tài khoản ký quỹ chỉ được giải phóng cho người bán sau khi người mua xác nhận dịch vụ được giao thỏa đáng."
	},
	{
		id: 45,
		en: "The product roadmap for the next two quarters focuses on compliance automation and reducing manual reconciliation effort.",
		vi: "Lộ trình sản phẩm cho hai quý tới tập trung vào tự động hóa tuân thủ và giảm thiểu nỗ lực đối soát thủ công."
	},
	{
		id: 46,
		en: "Hedging currency risk through forward contracts helped us protect margins during the recent exchange rate volatility.",
		vi: "Phòng ngừa rủi ro tỷ giá thông qua hợp đồng kỳ hạn đã giúp chúng ta bảo vệ biên lợi nhuận trong đợt biến động tỷ giá vừa qua."
	},
	{
		id: 47,
		en: "The OKRs for this quarter are aligned with our strategic goal of achieving breakeven in the consumer lending product.",
		vi: "Các OKR trong quý này được căn chỉnh với mục tiêu chiến lược đạt điểm hòa vốn trong sản phẩm cho vay tiêu dùng."
	},
	{
		id: 48,
		en: "Integration with the national payment switch required six months of sandbox testing before the go-live date.",
		vi: "Tích hợp với hệ thống thanh toán quốc gia yêu cầu sáu tháng kiểm thử trong sandbox trước ngày chính thức ra mắt."
	},
	{
		id: 49,
		en: "High customer attrition in the first quarter prompted us to redesign the user retention strategy entirely.",
		vi: "Tỷ lệ rời bỏ khách hàng cao trong quý một đã thúc đẩy chúng ta thiết kế lại hoàn toàn chiến lược giữ chân người dùng."
	},
	{
		id: 50,
		en: "The bootstrapped startup reached profitability in eighteen months without raising a single dollar from external investors.",
		vi: "Startup tự lực đã đạt được lợi nhuận trong 18 tháng mà không cần huy động một đô la nào từ nhà đầu tư bên ngoài."
	}
];
var initialWritingData = [
	{
		title: "Merchant Discontent: Interchange Fee",
		context: "Đối tác chuỗi rạp chiếu phim phàn nàn phí giao dịch qua cổng của bên mình quá cao (3.5%). P&L nội bộ lại báo cáo 'discrepancy' ở dòng tiền đối soát.",
		task: "Viết email từ chối giảm phí, dùng hệ thống đối soát tự động làm vũ khí giữ chân. Dùng các từ: discrepancy, reconciliation, compliance.",
		visualType: "invoice"
	},
	{
		title: "Revenue Deficit Notification",
		context: "Báo cáo Q3 ghi nhận khoản 'Substantial Deficit' (Thâm hụt) do 'Overhead costs' của team Vận hành vượt ngân sách 30%.",
		task: "Viết đoạn tóm tắt đề xuất cắt giảm chi phí hoặc tối ưu quy trình. Dùng: deficit, overhead, substantial, EBITDA.",
		visualType: "chartDown"
	},
	{
		title: "Chargeback Crisis Response",
		context: "Tỷ lệ chargeback tháng này tăng đột biến lên 2.3%, vượt ngưỡng cho phép của Visa/Mastercard (1%). Nếu không xử lý, bên mình có thể bị đình chỉ tư cách merchant.",
		task: "Viết email khẩn tới team Risk & Compliance trình bày kế hoạch xử lý trong 72 giờ. Dùng: chargeback, compliance, settlement, threshold.",
		visualType: "dashboardAlert"
	},
	{
		title: "Investor Due Diligence Request",
		context: "Quỹ đầu tư Series B yêu cầu tài liệu thẩm định (due diligence) trước khi rót vốn. Họ muốn hiểu rõ về scalability, liquidity runway và compliance roadmap.",
		task: "Viết email phản hồi xác nhận cung cấp đủ tài liệu, nêu rõ timeline. Dùng: due diligence, scalable, liquidity, milestone.",
		visualType: "invoice"
	},
	{
		title: "Procurement Policy Update",
		context: "Ban lãnh đạo yêu cầu cập nhật quy trình procurement để tất cả hợp đồng trên $10,000 phải qua 3 bước phê duyệt, nhằm kiểm soát overhead costs.",
		task: "Viết internal memo thông báo chính sách mới tới toàn bộ team. Dùng: procurement, overhead, stipulate, compliance, mandate.",
		visualType: "chartDown"
	},
	{
		title: "KYC Rejection Notice to Partner",
		context: "Một đối tác muốn onboard lên nền tảng nhưng tài liệu KYC họ nộp bị hệ thống AML từ chối vì thiếu giấy phép kinh doanh hợp lệ.",
		task: "Viết email lịch sự thông báo từ chối và hướng dẫn các bước cần bổ sung. Dùng: KYC, AML, compliance, onboarding, mandate.",
		visualType: "dashboardAlert"
	},
	{
		title: "API Latency Incident Post-Mortem",
		context: "Hệ thống thanh toán bị tăng đột biến latency lên 3 giây vào giờ cao điểm hôm qua, gây ra nhiều giao dịch thất bại và khách hàng phàn nàn.",
		task: "Viết báo cáo post-mortem gửi cho management. Nêu nguyên nhân, tác động và hành động khắc phục. Dùng: latency, incident, SLA, uptime, rollback.",
		visualType: "dashboardAlert"
	},
	{
		title: "Series B Cap Table Summary Email",
		context: "Nhà đầu tư lead trong vòng Series B yêu cầu bản tóm tắt cap table hiện tại trước khi ký term sheet, bao gồm thông tin về dilution cho founders.",
		task: "Viết email đính kèm cap table và giải thích tác động dilution. Dùng: cap table, dilution, Series B, equity, stakeholder.",
		visualType: "invoice"
	},
	{
		title: "Burn Rate Alert to Board of Directors",
		context: "Burn rate tháng này tăng 40% so với kế hoạch do chi phí nhân sự và cơ sở hạ tầng cloud tăng đột biến. Runway hiện tại chỉ còn 6 tháng.",
		task: "Viết email khẩn gửi Board of Directors trình bày tình hình và đề xuất ít nhất 2 phương án cắt giảm. Dùng: burn rate, runway, overhead, headcount, pivot.",
		visualType: "chartDown"
	},
	{
		title: "Fraud Detection System Upgrade Proposal",
		context: "Hệ thống phát hiện gian lận hiện tại có tỷ lệ false positive cao (15%), làm block nhầm nhiều giao dịch hợp lệ và gây khó chịu cho merchant.",
		task: "Viết đề xuất nâng cấp hệ thống lên mô hình ML mới, ước tính ROI. Dùng: fraud detection, risk score, false positive, AML, SLA.",
		visualType: "dashboardAlert"
	},
	{
		title: "Settlement Delay Explanation to Merchant",
		context: "Một merchant lớn phàn nàn rằng tiền từ giao dịch tuần trước vẫn chưa về tài khoản do hệ thống settlement đang trong quá trình nâng cấp.",
		task: "Viết email xin lỗi và giải thích timeline. Dùng: settlement, reconciliation, SLA, throughput, go-live.",
		visualType: "invoice"
	},
	{
		title: "Churn Analysis Report to Product Team",
		context: "Phân tích dữ liệu tháng qua cho thấy churn rate của phân khúc SME tăng lên 8%, cao hơn mức trung bình ngành (3%). Nguyên nhân chính là UX phức tạp.",
		task: "Viết báo cáo phân tích gửi Product team, đề xuất ưu tiên trong backlog. Dùng: churn, retention, conversion rate, funnel, MVP.",
		visualType: "chartDown"
	},
	{
		title: "Vendor Contract Renegotiation Email",
		context: "Hợp đồng với nhà cung cấp cloud sắp hết hạn. Anh cần đàm phán lại để giảm chi phí ít nhất 20% dựa trên mức sử dụng thực tế thấp hơn dự kiến.",
		task: "Viết email mở đầu cuộc đàm phán với vendor, đặt vấn đề và nêu điều kiện mong muốn. Dùng: vendor, negotiation, SLA, procurement, overhead.",
		visualType: "invoice"
	},
	{
		title: "AML Compliance Quarterly Report",
		context: "Cuối quý, team Compliance phải nộp báo cáo AML định kỳ cho Ngân hàng Nhà nước, bao gồm số lượng giao dịch bị flag và kết quả điều tra.",
		task: "Viết phần tóm tắt điều hành (executive summary) của báo cáo AML. Dùng: AML, KYC, blacklist, compliance, threshold.",
		visualType: "dashboardAlert"
	},
	{
		title: "Microservice Migration Roadmap Memo",
		context: "CTO quyết định chuyển đổi kiến trúc monolith hiện tại sang microservice trong 12 tháng để tăng scalability và giảm deployment risk.",
		task: "Viết internal memo thông báo kế hoạch migration cho toàn bộ engineering team. Dùng: microservice, deployment, rollback, circuit breaker, milestone.",
		visualType: "presentation"
	},
	{
		title: "Partnership Announcement to Merchants",
		context: "Công ty vừa ký kết partnership chiến lược với một ngân hàng lớn, cho phép merchant của mình tiếp cận hạn mức tín dụng ưu đãi thông qua nền tảng.",
		task: "Viết email thông báo partnership tới toàn bộ merchant network, nêu rõ lợi ích. Dùng: partnership, integration, collateral, liquidity, onboarding.",
		visualType: "videoCall"
	},
	{
		title: "OKR Review Email to Department Heads",
		context: "Cuối quý, CEO muốn các trưởng bộ phận báo cáo tiến độ OKR, xác định key result nào đạt, chưa đạt và lý do.",
		task: "Viết email yêu cầu báo cáo OKR từ các department head, kèm template cần điền. Dùng: OKR, KPI, milestone, roadmap, stakeholder.",
		visualType: "presentation"
	},
	{
		title: "Sandbox Environment Access Request",
		context: "Một partner fintech mới muốn được cấp quyền truy cập môi trường sandbox để thử nghiệm API tích hợp trước khi ký hợp đồng chính thức.",
		task: "Viết email hướng dẫn partner về quy trình đăng ký sandbox access và các bước integration test. Dùng: sandbox, API, integration, go-live, SLA.",
		visualType: "dashboardAlert"
	},
	{
		title: "Investor Update: Traction & Retention Metrics",
		context: "Tháng này là tháng gửi báo cáo định kỳ cho nhà đầu tư. Các chỉ số tháng này rất tốt: retention tăng 15%, conversion rate tăng 8%.",
		task: "Viết investor update email ngắn gọn, trình bày các chỉ số tăng trưởng. Dùng: traction, retention, conversion rate, churn, KPI.",
		visualType: "chartDown"
	},
	{
		title: "Escrow Account Setup Instructions",
		context: "Công ty chuẩn bị triển khai tính năng thanh toán escrow cho các giao dịch B2B lớn. Merchant cần được hướng dẫn cách thức hoạt động.",
		task: "Viết hướng dẫn sử dụng tính năng escrow gửi cho merchant. Dùng: escrow, settlement, compliance, threshold, reconciliation.",
		visualType: "invoice"
	},
	{
		title: "Risk Score Model Documentation",
		context: "Team Data Science vừa ra mắt mô hình risk score mới với độ chính xác 94%. Cần ghi lại tài liệu kỹ thuật và gửi cho team Compliance review.",
		task: "Viết tài liệu mô tả mô hình risk score: các yếu tố đầu vào, ngưỡng quyết định, và quy trình review. Dùng: risk score, fraud detection, AML, whitelist, threshold.",
		visualType: "dashboardAlert"
	},
	{
		title: "Agile Sprint Retrospective Summary",
		context: "Kết thúc sprint 12, team cần tổng kết những gì đã làm tốt, những vấn đề gặp phải và các cải tiến cho sprint tiếp theo.",
		task: "Viết email tổng kết sprint retrospective gửi cho team và product stakeholders. Dùng: sprint, backlog, agile, milestone, KPI.",
		visualType: "presentation"
	},
	{
		title: "Headcount Budget Request for Engineering",
		context: "Roadmap Q3 yêu cầu mở rộng đội engineering thêm 5 senior developer, nhưng HR cần COO phê duyệt ngân sách tuyển dụng bổ sung.",
		task: "Viết đề xuất ngân sách headcount gửi COO, nêu rõ ROI và timeline onboarding. Dùng: headcount, onboarding, roadmap, OKR, burn rate.",
		visualType: "presentation"
	},
	{
		title: "Tokenization Compliance Briefing",
		context: "Nhóm kiểm toán nội bộ yêu cầu giải trình về cách hệ thống tokenization đảm bảo tuân thủ tiêu chuẩn PCI DSS trong lưu trữ và xử lý dữ liệu thẻ.",
		task: "Viết briefing document giải thích cơ chế tokenization và encryption. Dùng: tokenization, encryption, compliance, sandbox, whitelist.",
		visualType: "invoice"
	},
	{
		title: "Perpetual Bond Issuance Announcement",
		context: "CFO quyết định phát hành trái phiếu không kỳ hạn (perpetual bond) trị giá $20M để huy động vốn dài hạn mà không pha loãng cổ phần.",
		task: "Viết thông báo nội bộ về quyết định phát hành trái phiếu, giải thích lợi ích so với equity financing. Dùng: perpetual, dilution, underwrite, collateral, portfolio.",
		visualType: "chartDown"
	},
	{
		title: "Pivot Decision Memo to All Staff",
		context: "Sau 6 tháng thử nghiệm, CEO quyết định pivot mô hình kinh doanh từ B2C lending sang B2B supply chain finance do tỷ lệ NPL (nợ xấu) quá cao.",
		task: "Viết memo toàn công ty thông báo quyết định pivot, giải thích lý do và hướng đi mới. Dùng: pivot, churn, runway, MVP, stakeholder.",
		visualType: "presentation"
	},
	{
		title: "Hedge Strategy Proposal for FX Risk",
		context: "Công ty có doanh thu bằng USD nhưng chi phí vận hành bằng VND. Sự biến động tỷ giá gần đây đã ăn mòn biên lợi nhuận 3%.",
		task: "Viết đề xuất chiến lược phòng ngừa rủi ro tỷ giá gửi CFO. Dùng: hedge, volatility, collateral, leverage, arbitrage.",
		visualType: "chartDown"
	},
	{
		title: "Go-live Checklist Communication",
		context: "Tính năng thanh toán qua QR code sắp được go-live vào tuần tới. Cần gửi checklist cuối cùng cho tất cả các team liên quan.",
		task: "Viết email checklist go-live, liệt kê các hạng mục cần xác nhận từ từng bộ phận. Dùng: go-live, SLA, uptime, rollback, fallback.",
		visualType: "dashboardAlert"
	},
	{
		title: "Bootstrapped Startup Acquisition Offer",
		context: "Công ty đang xem xét mua lại một startup bootstrapped trong lĩnh vực SME lending có 20k user và revenue $500K ARR, nhưng chưa gọi vốn bên ngoài.",
		task: "Viết letter of intent (LOI) sơ bộ đề xuất thâu tóm, nêu mức giá tham chiếu và điều kiện due diligence. Dùng: bootstrapped, acquisition, due diligence, traction, escrow.",
		visualType: "invoice"
	},
	{
		title: "Attrition Report and Retention Plan",
		context: "Tỷ lệ nghỉ việc trong engineering team đạt 25% trong năm nay, cao hơn gấp đôi mức trung bình ngành. CFO yêu cầu phân tích nguyên nhân và kế hoạch cải thiện.",
		task: "Viết báo cáo phân tích nguyên nhân attrition và đề xuất 3 giải pháp giữ chân nhân tài. Dùng: attrition, headcount, onboarding, OKR, burn rate.",
		visualType: "chartDown"
	},
	{
		title: "Amortization Schedule for Software Costs",
		context: "Team kế toán cần lập lịch khấu hao cho khoản đầu tư phát triển phần mềm $1.2M, được phân bổ đều trong 3 năm theo chuẩn kế toán IFRS.",
		task: "Viết email hướng dẫn cách ghi nhận chi phí amortization theo từng kỳ. Dùng: amortize, EBITDA, accrual, overhead, reconciliation.",
		visualType: "invoice"
	},
	{
		title: "Accrued Interest Notification to Borrowers",
		context: "Hệ thống lending tự động tính lãi tích lũy hàng ngày cho các khoản vay quá hạn. Cần gửi thông báo tự động cho borrower trước khi trừ tiền.",
		task: "Viết mẫu email thông báo tự động về lãi tích lũy. Dùng: accrue, settlement, threshold, compliance, SLA.",
		visualType: "dashboardAlert"
	},
	{
		title: "Underwriting Criteria Update Memo",
		context: "Sau khi phân tích dữ liệu NPL, team Risk quyết định siết chặt tiêu chí bảo lãnh cho vay, đặc biệt với phân khúc khách hàng dưới 25 tuổi.",
		task: "Viết memo cập nhật tiêu chí underwriting mới cho toàn bộ team Risk và Sales. Dùng: underwrite, risk score, collateral, AML, KYC.",
		visualType: "dashboardAlert"
	},
	{
		title: "Syndicate Loan Proposal to Partner Banks",
		context: "Công ty muốn tổ chức một tổ hợp cho vay (syndicate) với 3 ngân hàng đối tác để cùng tài trợ cho một dự án cơ sở hạ tầng trị giá $50M.",
		task: "Viết proposal email gửi các ngân hàng đối tác, trình bày cấu trúc syndicate và điều kiện tham gia. Dùng: syndicate, underwrite, escrow, collateral, due diligence.",
		visualType: "presentation"
	},
	{
		title: "Whitelist Application for New Merchant",
		context: "Một merchant mới trong lĩnh vực crypto exchange muốn được đưa vào whitelist để có thể xử lý giao dịch trên nền tảng. AML team cần review kỹ.",
		task: "Viết email nội bộ yêu cầu AML team review và quyết định whitelist/blacklist merchant này. Dùng: whitelist, blacklist, AML, KYC, risk score.",
		visualType: "dashboardAlert"
	},
	{
		title: "Negotiation Summary After Partnership Deal",
		context: "Vừa kết thúc 3 buổi đàm phán với đối tác ngân hàng. Kết quả: phí interchange giảm từ 1.8% xuống 1.2%, SLA được cải thiện. Cần báo cáo lại với CEO.",
		task: "Viết email tóm tắt kết quả đàm phán và các điều khoản chính đã thống nhất. Dùng: negotiation, partnership, SLA, compliance, stakeholder.",
		visualType: "videoCall"
	},
	{
		title: "Retention Campaign Brief for Marketing",
		context: "Sau khi phân tích funnel, phát hiện 40% user rời bỏ sau 30 ngày do thiếu engagement. Marketing team cần thiết kế campaign giữ chân user.",
		task: "Viết creative brief gửi Marketing team, xác định mục tiêu retention và các KPI cần đạt. Dùng: retention, churn, funnel, conversion rate, KPI.",
		visualType: "chartDown"
	},
	{
		title: "Integration Failure Escalation Email",
		context: "API integration với đối tác ngân hàng bị lỗi từ sáng nay, ảnh hưởng đến 15% giao dịch của merchant. Đội kỹ thuật đang điều tra nhưng chưa tìm ra nguyên nhân.",
		task: "Viết escalation email tới CTO và team trưởng, trình bày tình hình và yêu cầu ưu tiên xử lý. Dùng: integration, incident, SLA, fallback, rollback.",
		visualType: "dashboardAlert"
	},
	{
		title: "Momentum Marketing Report to CEO",
		context: "Sau chiến dịch marketing tháng trước, các chỉ số tăng trưởng rất ấn tượng: user mới tăng 3x, organic traffic tăng 250%, và có dấu hiệu viral rõ rệt.",
		task: "Viết báo cáo marketing tháng gửi CEO, phân tích nguồn gốc momentum và kế hoạch duy trì. Dùng: momentum, traction, conversion rate, funnel, retention.",
		visualType: "presentation"
	},
	{
		title: "Rollback Decision During Go-live",
		context: "Tính năng mới vừa được deploy nhưng phát sinh bug nghiêm trọng khiến 5% giao dịch bị fail. CTO phải quyết định rollback ngay trong 30 phút.",
		task: "Viết incident communication nhanh gửi toàn bộ stakeholders về quyết định rollback và timeline khắc phục. Dùng: rollback, incident, go-live, SLA, uptime.",
		visualType: "dashboardAlert"
	},
	{
		title: "Benchmark Analysis Report for Investors",
		context: "Nhà đầu tư yêu cầu so sánh các chỉ số hoạt động của công ty với benchmark ngành fintech ASEAN để đánh giá khả năng cạnh tranh.",
		task: "Viết phần benchmark analysis trong investor deck, so sánh KPI với đối thủ. Dùng: benchmark, KPI, churn, retention, conversion rate.",
		visualType: "chartDown"
	},
	{
		title: "Liquidity Management Plan Email",
		context: "Cuối quý, một đối tác lớn thanh toán chậm 45 ngày khiến công ty đối mặt với gap thanh khoản $2M. CFO cần triển khai kế hoạch ứng phó.",
		task: "Viết kế hoạch quản lý thanh khoản ngắn hạn gửi CFO và Board, bao gồm các phương án tài trợ. Dùng: liquidity, leverage, collateral, runway, deficit.",
		visualType: "chartDown"
	},
	{
		title: "Scalability Test Results Summary",
		context: "Đội engineering vừa hoàn thành load test với kết quả: hệ thống có thể xử lý 25,000 TPS trước khi latency vượt ngưỡng SLA. Cần báo cáo cho CTO.",
		task: "Viết email tóm tắt kết quả test và đề xuất các bước nâng cấp tiếp theo. Dùng: scalable, throughput, latency, SLA, microservice.",
		visualType: "presentation"
	},
	{
		title: "KPI Dashboard Redesign Proposal",
		context: "Dashboard KPI hiện tại quá phức tạp, mỗi bộ phận có KPI riêng lẻ và không liên kết với nhau. CEO muốn một dashboard thống nhất.",
		task: "Viết đề xuất thiết kế lại KPI dashboard, xác định các chỉ số north star. Dùng: KPI, OKR, roadmap, stakeholder, benchmark.",
		visualType: "presentation"
	},
	{
		title: "Backlog Grooming Session Invitation",
		context: "Product Manager cần tổ chức buổi backlog grooming để sắp xếp lại priority cho sprint tiếp theo, sau khi nhận được feedback từ khách hàng quan trọng.",
		task: "Viết email mời toàn bộ team tham gia buổi backlog grooming, kèm agenda và chuẩn bị cần thiết. Dùng: backlog, sprint, agile, roadmap, OKR.",
		visualType: "videoCall"
	},
	{
		title: "Cross-border Payment Launch Announcement",
		context: "Công ty sắp ra mắt tính năng thanh toán xuyên biên giới cho 5 thị trường ASEAN. Đây là milestone quan trọng trong roadmap quốc tế hóa.",
		task: "Viết announcement email gửi toàn bộ merchant network về tính năng mới. Dùng: integration, KYC, compliance, go-live, milestone.",
		visualType: "presentation"
	},
	{
		title: "Portfolio Performance Review for Board",
		context: "Quý này, danh mục đầu tư của công ty có một số khoản tăng trưởng tốt nhưng cũng có khoản lỗ do market volatility. Board cần báo cáo đầy đủ.",
		task: "Viết báo cáo portfolio review gửi Board of Directors, phân tích hiệu suất và rủi ro. Dùng: portfolio, volatility, hedge, benchmark, arbitrage.",
		visualType: "chartDown"
	},
	{
		title: "Encryption Key Rotation Notice to Partners",
		context: "Theo lịch tuân thủ PCI DSS, tất cả khóa mã hóa phải được xoay trước ngày 30/11. Các API partner sẽ bị ảnh hưởng và cần được thông báo trước.",
		task: "Viết email thông báo cho toàn bộ API partner về việc xoay khóa mã hóa và các bước re-authentication cần thực hiện. Dùng: encryption, tokenization, API, compliance, go-live.",
		visualType: "dashboardAlert"
	},
	{
		title: "Embedded Lending Full Rollout Proposal",
		context: "MVP embedded lending đã hoàn thành giai đoạn pilot với 100 merchant và kết quả rất khả quan. CEO muốn anh chuẩn bị đề xuất triển khai rộng rãi.",
		task: "Viết đề xuất business case cho full rollout, nêu kết quả pilot, dự báo doanh thu và roadmap triển khai. Dùng: MVP, traction, underwrite, collateral, milestone.",
		visualType: "presentation"
	},
	{
		title: "Incident Post-Mortem: Cloud Vendor Outage",
		context: "Nhà cung cấp cloud bị outage 4,5 giờ làm suy giảm dịch vụ. Vi phạm SLA dẫn đến credit 20% hóa đơn. Engineering team đã kích hoạt fallback thành công.",
		task: "Viết báo cáo post-mortem gửi leadership, gồm timeline sự cố, tác động kinh doanh và các hành động phòng ngừa. Dùng: incident, SLA, fallback, uptime, rollback.",
		visualType: "dashboardAlert"
	}
];
var initialSpeakingData = [
	{
		title: "SLA Renegotiation",
		context: "Đối tác e-commerce bị sập gateway hôm qua do lỗi bên mình. Bạn đang họp online với họ.",
		role: "Khách hàng đang rất tức giận. Bạn cần xoa dịu và cam kết SLA uptime mới (99.99%). Dùng: compliance, stipulate, reconciliation.",
		visualType: "videoCall"
	},
	{
		title: "Pitching New Payment Gateway",
		context: "Trình bày với CFO về việc chuyển sang dùng cổng thanh toán mới rẻ hơn nhưng tích hợp khó hơn.",
		role: "CFO sẽ hỏi khó về ROI và rủi ro downtime lúc chuyển đổi. Dùng: EBITDA, overhead, scalable, leverage.",
		visualType: "presentation"
	},
	{
		title: "Explaining Chargeback to Merchant",
		context: "Một merchant nhỏ không hiểu tại sao tiền bị giữ lại 30 ngày sau khi bán hàng. Họ đang gọi điện phàn nàn về settlement cycle.",
		role: "Giải thích cho merchant hiểu về settlement, chargeback risk và tại sao cần holding period. Dùng: chargeback, settlement, compliance.",
		visualType: "videoCall"
	},
	{
		title: "Acquisition Proposal Pitch",
		context: "Công ty đang xem xét mua lại (acquire) một startup fintech nhỏ có 50k user. Bạn đang thuyết phục Board rằng đây là cơ hội tốt.",
		role: "Board sẽ hỏi về giá trị thực, due diligence và rủi ro tích hợp. Dùng: acquisition, due diligence, traction, scalable, milestone.",
		visualType: "presentation"
	},
	{
		title: "Liquidity Crisis Management",
		context: "Công ty gặp vấn đề thanh khoản ngắn hạn sau khi một đối tác lớn trì hoãn thanh toán. CFO đang họp khẩn với team.",
		role: "Trình bày phương án xử lý: vay ngắn hạn, cắt overhead, hoặc dùng leverage. Dùng: liquidity, overhead, collateral, deficit.",
		visualType: "videoCall"
	},
	{
		title: "Defending KYC Process to Regulator",
		context: "Thanh tra Ngân hàng Nhà nước đang audit quy trình KYC của công ty và đặt câu hỏi về tỷ lệ giao dịch bị AML flag nhưng không bị chặn.",
		role: "Anh cần trình bày quy trình KYC, giải thích tại sao một số giao dịch được pass qua và chứng minh sự tuân thủ. Dùng: KYC, AML, compliance, whitelist, risk score.",
		visualType: "videoCall"
	},
	{
		title: "Presenting Burn Rate to Lead Investor",
		context: "Nhà đầu tư lead trong vòng Series A đang lo ngại về burn rate và hỏi về chiến lược để kéo dài runway thêm ít nhất 6 tháng.",
		role: "Thuyết phục nhà đầu tư bằng cách trình bày kế hoạch cụ thể giảm burn rate và tăng revenue. Dùng: burn rate, runway, overhead, pivot, KPI.",
		visualType: "videoCall"
	},
	{
		title: "Sprint Review with Product Stakeholders",
		context: "Cuối sprint, team cần báo cáo những gì đã hoàn thành và demo tính năng mới cho các stakeholders nội bộ và đại diện khách hàng.",
		role: "Trình bày kết quả sprint, xử lý phản hồi và thảo luận priority cho backlog tiếp theo. Dùng: sprint, backlog, agile, milestone, roadmap.",
		visualType: "presentation"
	},
	{
		title: "API Integration Demo to Enterprise Client",
		context: "Một doanh nghiệp lớn đang xem xét tích hợp payment gateway của mình. Anh đang demo API trong môi trường sandbox trực tiếp với CTO của họ.",
		role: "Giải thích cách API hoạt động, đề cập latency, uptime SLA và quy trình go-live. Dùng: API, sandbox, latency, uptime, SLA, integration.",
		visualType: "presentation"
	},
	{
		title: "Explaining Tokenization to Security Team",
		context: "Đội Security của đối tác ngân hàng đang đặt câu hỏi về cơ chế bảo mật dữ liệu thẻ trong hệ thống của mình. Họ lo ngại về rủi ro data breach.",
		role: "Giải thích cơ chế tokenization và encryption, thuyết phục họ rằng dữ liệu thẻ được bảo vệ an toàn. Dùng: tokenization, encryption, compliance, whitelist, sandbox.",
		visualType: "videoCall"
	},
	{
		title: "Negotiating SLA with Cloud Vendor",
		context: "Nhà cung cấp cloud muốn tăng giá 25% khi gia hạn hợp đồng. Anh cần đàm phán giữ giá hoặc cải thiện SLA để justify chi phí.",
		role: "Dùng dữ liệu uptime thực tế và benchmark thị trường để lập luận. Đề xuất phương án win-win. Dùng: SLA, uptime, vendor, negotiation, benchmark.",
		visualType: "videoCall"
	},
	{
		title: "Incident Communication During Outage",
		context: "Hệ thống thanh toán đang bị outage nghiêm trọng, ảnh hưởng đến 30% giao dịch. Anh là on-call manager phải báo cáo real-time cho CEO và khách hàng.",
		role: "Cập nhật tình hình incident mỗi 15 phút, nêu nguyên nhân tạm thời và timeline dự kiến khắc phục. Dùng: incident, uptime, SLA, rollback, fallback.",
		visualType: "dashboardAlert"
	},
	{
		title: "Pitching MVP to Potential Partner",
		context: "Công ty đang pitching MVP của tính năng embedded lending mới cho một chuỗi bán lẻ lớn. Đây là buổi gặp mặt đầu tiên.",
		role: "Trình bày MVP trong 5 phút, nhấn mạnh traction sơ bộ và lộ trình scale. Xử lý câu hỏi về compliance. Dùng: MVP, traction, pivot, scalable, compliance.",
		visualType: "presentation"
	},
	{
		title: "Fraud Alert Review with Risk Team",
		context: "Hệ thống fraud detection vừa phát ra alert về một cluster 50 tài khoản có behavior bất thường. Risk team họp khẩn để quyết định có blacklist không.",
		role: "Dẫn dắt cuộc thảo luận, phân tích risk score của từng tài khoản và đề xuất hành động. Dùng: fraud detection, risk score, blacklist, AML, threshold.",
		visualType: "dashboardAlert"
	},
	{
		title: "Presenting Churn Analysis to CEO",
		context: "CEO yêu cầu phân tích tại sao churn tăng 5% trong quý vừa qua và đề xuất giải pháp cụ thể trong cuộc họp 1-on-1.",
		role: "Trình bày phân tích nguyên nhân churn, funnel drop-off và kế hoạch cải thiện retention. Dùng: churn, retention, funnel, conversion rate, OKR.",
		visualType: "presentation"
	},
	{
		title: "Acquisition Target Evaluation Meeting",
		context: "Board of Directors họp để đánh giá 3 startup fintech tiềm năng cho thương vụ M&A. Anh là người dẫn dắt phần đánh giá tài chính.",
		role: "Trình bày phân tích về traction, cap table và rủi ro dilution cho từng ứng viên. Dùng: acquisition, due diligence, cap table, dilution, traction.",
		visualType: "presentation"
	},
	{
		title: "Onboarding New Enterprise Merchant",
		context: "Một chuỗi siêu thị lớn với 200 cửa hàng vừa ký hợp đồng. Anh đang dẫn dắt buổi onboarding kick-off với team vận hành của họ.",
		role: "Giải thích quy trình onboarding, timeline và các yêu cầu về KYC, integration. Dùng: onboarding, KYC, integration, SLA, go-live.",
		visualType: "videoCall"
	},
	{
		title: "Defending Roadmap Priority to Sales Team",
		context: "Sales team yêu cầu Product team ưu tiên tính năng mà một khách hàng lớn đang yêu cầu, nhưng tính năng này không có trong roadmap hiện tại.",
		role: "Giải thích lý do ưu tiên và đề xuất phương án trade-off, giữ được mối quan hệ với Sales. Dùng: roadmap, backlog, OKR, stakeholder, milestone.",
		visualType: "presentation"
	},
	{
		title: "Explaining Escrow to B2B Client",
		context: "Khách hàng doanh nghiệp đang lo ngại về rủi ro khi phải thanh toán trước cho nhà cung cấp trong giao dịch B2B lớn. Anh đề xuất giải pháp escrow.",
		role: "Giải thích cơ chế escrow, quy trình giải phóng tiền và lợi ích bảo vệ cả 2 bên. Dùng: escrow, settlement, compliance, threshold, SLA.",
		visualType: "videoCall"
	},
	{
		title: "Microservice Architecture Presentation to CTO",
		context: "Anh đang thuyết phục CTO phê duyệt kế hoạch chuyển đổi kiến trúc từ monolith sang microservices với ngân sách $500K và timeline 12 tháng.",
		role: "Trình bày lợi ích về scalability, deployment speed và cost. Xử lý lo ngại về rủi ro migration. Dùng: microservice, scalable, deployment, circuit breaker, milestone.",
		visualType: "presentation"
	},
	{
		title: "OKR Setting Session with Direct Reports",
		context: "Đầu quý, anh cần dẫn dắt buổi OKR setting với team trực tiếp của mình, đảm bảo OKR của team align với OKR cấp công ty.",
		role: "Hướng dẫn team đặt objective rõ ràng và key result có thể đo lường. Xử lý bất đồng về target. Dùng: OKR, KPI, milestone, roadmap, stakeholder.",
		visualType: "videoCall"
	},
	{
		title: "Chargeback Dispute Call with Acquirer",
		context: "Acquirer bank đang yêu cầu giải trình về tỷ lệ chargeback tăng đột biến trong tháng qua và đe dọa tăng reserve requirement.",
		role: "Trình bày nguyên nhân, các biện pháp đã triển khai và cam kết giảm chargeback trong 30 ngày. Dùng: chargeback, fraud detection, compliance, threshold, reconciliation.",
		visualType: "videoCall"
	},
	{
		title: "Bootstrapped Startup Pitch to VC",
		context: "Startup của anh đã bootstrapped 2 năm và đang có lợi nhuận. Anh đang pitching lần đầu cho VC để gọi vốn Series A nhằm mở rộng thị trường.",
		role: "Nêu bật lợi thế của việc bootstrapped (kiểm soát tốt, không dilution sớm), trình bày kế hoạch dùng vốn. Dùng: bootstrapped, runway, burn rate, traction, cap table.",
		visualType: "presentation"
	},
	{
		title: "Settlement Cycle Improvement Proposal",
		context: "Merchant lớn đang yêu cầu rút ngắn settlement cycle từ T+2 xuống same-day. Anh phải đánh giá tính khả thi và trình bày với team Vận hành.",
		role: "Phân tích tác động đến liquidity, hệ thống reconciliation và đề xuất lộ trình thực hiện. Dùng: settlement, reconciliation, liquidity, throughput, SLA.",
		visualType: "videoCall"
	},
	{
		title: "Vendor Performance Review Meeting",
		context: "Cuối năm, anh cần review hiệu suất của nhà cung cấp dịch vụ outsource key account management, đối chiếu với SLA đã ký.",
		role: "Trình bày dữ liệu hiệu suất, chỉ ra các vi phạm SLA và đàm phán điều khoản cải thiện cho năm tới. Dùng: vendor, SLA, KPI, negotiation, procurement.",
		visualType: "videoCall"
	},
	{
		title: "Explaining Hedge Strategy to CFO",
		context: "CFO muốn hiểu tại sao Finance team đề xuất dùng currency forward contracts để hedge rủi ro tỷ giá, thay vì để tự nhiên như trước đây.",
		role: "Giải thích rõ cơ chế hedge, chi phí và lợi ích bảo vệ EBITDA trong môi trường tỷ giá biến động. Dùng: hedge, volatility, EBITDA, collateral, arbitrage.",
		visualType: "presentation"
	},
	{
		title: "Risk Score Calibration Review",
		context: "Mô hình risk score đang có false positive rate quá cao (20%), chặn nhầm nhiều giao dịch hợp lệ. Anh phải giải trình với Fraud & Risk committee.",
		role: "Phân tích nguyên nhân, đề xuất điều chỉnh ngưỡng và trình bày kế hoạch test mô hình mới. Dùng: risk score, fraud detection, threshold, whitelist, AML.",
		visualType: "dashboardAlert"
	},
	{
		title: "Partnership Proposal Call with Bank",
		context: "Anh đang trong cuộc gọi khám phá khả năng hợp tác với một ngân hàng quốc doanh lớn. Mục tiêu là tích hợp API để cung cấp dịch vụ vay tiêu dùng qua app ngân hàng.",
		role: "Trình bày giá trị hợp tác, mô hình doanh thu và yêu cầu kỹ thuật. Xử lý lo ngại về compliance. Dùng: partnership, API, integration, compliance, KYC.",
		visualType: "videoCall"
	},
	{
		title: "Explaining Amortization to Non-Finance Team",
		context: "CEO muốn team Product hiểu tại sao chi phí phát triển $1.2M không xuất hiện một lần trong P&L mà được trải đều trong 3 năm.",
		role: "Giải thích khái niệm amortization bằng ngôn ngữ đơn giản, kết nối với tác động lên EBITDA. Dùng: amortize, EBITDA, overhead, reconciliation, stakeholder.",
		visualType: "presentation"
	},
	{
		title: "Rollback Decision Making Under Pressure",
		context: "Tính năng mới vừa được deploy 2 giờ trước nhưng error rate đang tăng lên 8%. Anh là incident commander phải quyết định rollback hay tiếp tục fix trong 10 phút.",
		role: "Phân tích dữ liệu, cân nhắc rủi ro và ra quyết định rollback với justification rõ ràng. Dùng: rollback, incident, go-live, SLA, fallback.",
		visualType: "dashboardAlert"
	},
	{
		title: "Explaining Dilution to Founding Team",
		context: "Sau vòng Series B, một co-founder lo lắng vì tỷ lệ sở hữu của mình giảm từ 30% xuống 19%. Anh cần giải thích tại sao dilution này là chấp nhận được.",
		role: "Giải thích tại sao giá trị tuyệt đối tăng lên dù tỷ lệ % giảm, và so sánh trước/sau vòng đầu tư. Dùng: dilution, cap table, valuation, runway, traction.",
		visualType: "videoCall"
	},
	{
		title: "AML Investigation Briefing",
		context: "Hệ thống AML phát hiện một nhóm tài khoản có dấu hiệu structuring (chia nhỏ giao dịch để tránh reporting threshold). Anh phải briefing cho CEO.",
		role: "Trình bày kết quả điều tra, các tài khoản bị ảnh hưởng và kế hoạch báo cáo cho cơ quan chức năng. Dùng: AML, threshold, blacklist, compliance, KYC.",
		visualType: "dashboardAlert"
	},
	{
		title: "Iterative Product Improvement Session",
		context: "Sau khi thu thập feedback từ 100 user, team Product họp để quyết định những thay đổi ưu tiên nhất cho phiên bản tiếp theo của app.",
		role: "Dẫn dắt thảo luận về các cải tiến cần làm, dùng data để justify priority trong backlog. Dùng: iterate, backlog, sprint, MVP, retention.",
		visualType: "presentation"
	},
	{
		title: "Scalability Discussion with Infrastructure Team",
		context: "Một đối tác lớn vừa ký hợp đồng sẽ tăng gấp 5 lần traffic trong 3 tháng tới. Infrastructure team cần lên kế hoạch scale hệ thống.",
		role: "Dẫn dắt buổi planning, xác định bottleneck và phân bổ nguồn lực. Dùng: scalable, throughput, latency, microservice, circuit breaker.",
		visualType: "presentation"
	},
	{
		title: "Perpetual Bond Investment Pitch",
		context: "CFO đang trình bày với Board về đề xuất đầu tư vào trái phiếu vĩnh viễn (perpetual bond) của một ngân hàng ASEAN như một phần của chiến lược diversify portfolio.",
		role: "Trình bày lợi ích, rủi ro của perpetual bond và so sánh với các lựa chọn đầu tư khác. Dùng: perpetual, portfolio, hedge, volatility, liquidity.",
		visualType: "presentation"
	},
	{
		title: "Merchant Funnel Optimization Workshop",
		context: "Tỷ lệ merchant hoàn thành onboarding chỉ đạt 45%, với nhiều drop-off ở bước KYC. Team cần workshop để tìm nguyên nhân và giải pháp.",
		role: "Dẫn dắt workshop, phân tích từng bước trong funnel và đề xuất A/B test để cải thiện conversion. Dùng: funnel, conversion rate, KYC, onboarding, retention.",
		visualType: "presentation"
	},
	{
		title: "Underwriting Decision Explanation to Borrower",
		context: "Một SME khách hàng bị từ chối vay vì risk score thấp. Họ yêu cầu giải thích lý do và muốn biết cách cải thiện để apply lại.",
		role: "Giải thích quy trình underwriting một cách dễ hiểu, hướng dẫn khách hàng các bước cải thiện hồ sơ. Dùng: underwrite, risk score, collateral, KYC, compliance.",
		visualType: "videoCall"
	},
	{
		title: "Syndicate Investment Committee Presentation",
		context: "Anh đang trình bày cơ hội đầu tư syndicate vào một startup fintech cho một nhóm angel investors. Mục tiêu huy động $3M trong 2 tuần.",
		role: "Trình bày thesis đầu tư, traction của startup và cấu trúc deal. Xử lý câu hỏi về due diligence. Dùng: syndicate, due diligence, traction, cap table, runway.",
		visualType: "presentation"
	},
	{
		title: "Sprint Planning with Engineering Team",
		context: "Đầu sprint mới, Product Manager và Engineering Lead ngồi lại để chọn items từ backlog và ước tính effort cho sprint 2 tuần tới.",
		role: "Đàm phán về scope, giải thích ưu tiên business và đảm bảo team cam kết delivery milestone. Dùng: sprint, backlog, agile, milestone, OKR.",
		visualType: "videoCall"
	},
	{
		title: "Explaining Portfolio Risk to Board",
		context: "Biến động thị trường gần đây làm một số khoản đầu tư trong danh mục giảm giá trị. Board muốn nghe chiến lược risk management.",
		role: "Trình bày chiến lược diversification và hedge hiện tại, thuyết phục Board không cần hành động vội vàng. Dùng: portfolio, hedge, volatility, arbitrage, benchmark.",
		visualType: "presentation"
	},
	{
		title: "Go-live Countdown Meeting",
		context: "48 giờ trước go-live của hệ thống mới, anh tổ chức họp final check với tất cả team: Engineering, Operations, Compliance và Customer Support.",
		role: "Chủ trì cuộc họp, kiểm tra từng hạng mục checklist và quyết định go/no-go. Dùng: go-live, SLA, rollback, fallback, incident.",
		visualType: "dashboardAlert"
	},
	{
		title: "Accrued Liability Explanation to Auditor",
		context: "Kiểm toán viên đang hỏi về một khoản accrued liability lớn trong bảng cân đối kế toán liên quan đến lãi tích lũy từ các khoản vay chưa đến hạn.",
		role: "Giải thích cơ sở ghi nhận accrual, phương pháp tính toán và tác động lên báo cáo tài chính. Dùng: accrue, reconciliation, compliance, amortize, EBITDA.",
		visualType: "videoCall"
	},
	{
		title: "Cross-sell Pitch to Existing Merchant",
		context: "Merchant hiện tại đang dùng payment gateway của mình. Anh muốn pitch thêm sản phẩm working capital loan và dịch vụ FX cho họ.",
		role: "Giới thiệu sản phẩm mới một cách tự nhiên, kết nối với pain point hiện tại của merchant. Dùng: liquidity, collateral, settlement, conversion rate, partnership.",
		visualType: "videoCall"
	},
	{
		title: "Data Breach Incident Response Call",
		context: "Security team phát hiện dấu hiệu data breach tiềm năng ảnh hưởng đến thông tin thẻ của 5,000 user. Cuộc họp khẩn cấp được triệu tập.",
		role: "Điều phối response, đảm bảo tokenization đã bảo vệ dữ liệu thẻ và lên kế hoạch thông báo cho user và cơ quan quản lý. Dùng: tokenization, encryption, incident, compliance, AML.",
		visualType: "dashboardAlert"
	},
	{
		title: "Negotiating Payment Terms with Supplier",
		context: "Nhà cung cấp dịch vụ đang yêu cầu thanh toán 100% trước khi cung cấp dịch vụ. Anh muốn đàm phán để được trả 50% trước và 50% sau khi nhận dịch vụ.",
		role: "Đàm phán điều khoản thanh toán, đề xuất phương án escrow như bảo đảm trung gian. Dùng: negotiation, escrow, settlement, compliance, stakeholder.",
		visualType: "videoCall"
	},
	{
		title: "Defending Roadmap Against Scope Creep",
		context: "Một khách hàng Enterprise VIP đang trực tiếp gọi điện cho CEO yêu cầu thêm tính năng custom không có trong roadmap Q4. CEO yêu cầu anh giải thích.",
		role: "Giải thích cho CEO và khách hàng tại sao không thể thêm vào sprint hiện tại, đề xuất phương án backlog. Dùng: roadmap, backlog, sprint, OKR, milestone.",
		visualType: "videoCall"
	},
	{
		title: "Explaining Accrual Accounting to Merchant",
		context: "Merchant đang thắc mắc tại sao dashboard hiển thị revenue cao hơn số tiền thực tế về tài khoản của họ. Anh cần giải thích cơ chế accrual trong hệ thống.",
		role: "Giải thích sự khác biệt giữa accrued revenue và cash received bằng ngôn ngữ đơn giản. Dùng: accrue, settlement, reconciliation, SLA, throughput.",
		visualType: "videoCall"
	},
	{
		title: "Presenting Portfolio Diversification Strategy",
		context: "CFO muốn anh trình bày chiến lược đa dạng hóa danh mục đầu tư để giảm rủi ro tập trung sau khi một khoản đầu tư lớn bị lỗ do thị trường biến động.",
		role: "Trình bày chiến lược phân bổ danh mục mới, bao gồm tỷ trọng từng loại tài sản và các công cụ hedge. Dùng: portfolio, hedge, volatility, benchmark, arbitrage.",
		visualType: "presentation"
	},
	{
		title: "Explaining Syndicate Structure to Junior Team",
		context: "Team tài chính cần hiểu cách hoạt động của cấu trúc đồng tài trợ (syndicate lending) mà công ty vừa ký kết với 3 ngân hàng đối tác.",
		role: "Giải thích cơ chế chia sẻ rủi ro và lợi nhuận trong syndicate, tại sao nó tốt hơn so với cho vay đơn lẻ. Dùng: syndicate, underwrite, collateral, portfolio, due diligence.",
		visualType: "presentation"
	},
	{
		title: "Headcount Reduction Discussion with Team Lead",
		context: "Do burn rate vượt ngân sách, COO yêu cầu anh đề xuất kế hoạch giảm headcount trong engineering team mà vẫn giữ được velocity sản phẩm.",
		role: "Thảo luận với Team Lead về ai nên được ưu tiên giữ lại dựa trên OKR đóng góp và kế hoạch roadmap. Dùng: headcount, burn rate, OKR, roadmap, attrition.",
		visualType: "videoCall"
	}
];
var readingData = [
	{
		title: "Memo: Spike in Chargeback Rates",
		content: "Team, we've observed a substantial spike in chargeback requests over the last 72 hours, primarily originating from the newly onboarded gaming merchants. The discrepancy between approved transactions and settled amounts suggests a potential flaw in our anti-fraud intermediary layer. Please initiate a comprehensive reconciliation process immediately.",
		question: "What is the main cause suspected for the chargeback spike?",
		options: [
			"A flaw in the reconciliation protocol.",
			"A potential flaw in the anti-fraud intermediary layer.",
			"High overhead costs from gaming merchants.",
			"Network congestion during onboarding."
		],
		answerIdx: 1,
		explanation: "Câu trả lời đúng là B. Đoạn văn nêu rõ: 'The discrepancy... suggests a potential flaw in our anti-fraud intermediary layer' — sự sai lệch số liệu chỉ ra lỗ hổng ở lớp trung gian chống gian lận, không phải ở quy trình đối soát hay chi phí overhead.",
		sampleSentence: "Our compliance team flagged a discrepancy in the anti-fraud intermediary layer, triggering an immediate reconciliation audit.",
		visualType: "dashboardAlert"
	},
	{
		title: "Report: Q3 EBITDA Pressure",
		content: "Our Q3 EBITDA margin declined substantially, falling from 28% to 19% quarter-on-quarter. The primary driver was a 34% surge in overhead costs following the aggressive regional expansion in Southeast Asia. The CFO has mandated a comprehensive procurement review and stipulated that all vendor contracts exceeding $50,000 must go through a three-level approval process to restore compliance with our cost governance framework.",
		question: "What did the CFO mandate in response to the EBITDA decline?",
		options: [
			"Layoffs to reduce overhead costs immediately.",
			"A procurement review and stricter contract approval process.",
			"Cancellation of the Southeast Asia expansion.",
			"An emergency acquisition to boost revenue."
		],
		answerIdx: 1,
		explanation: "Câu trả lời đúng là B. CFO 'mandated a comprehensive procurement review and stipulated that all vendor contracts exceeding $50,000 must go through a three-level approval process' — yêu cầu rà soát thu mua và siết quy trình phê duyệt hợp đồng.",
		sampleSentence: "The CFO stipulated a three-level approval mandate for all procurement contracts to restore EBITDA margins.",
		visualType: "chartDown"
	},
	{
		title: "Memo: Scalability Roadmap for Series B",
		content: "To support our Series B fundraising, the engineering team has completed due diligence on our current infrastructure. Our payment processing throughput stands at 8,000 TPS with a scalable architecture that can reach 50,000 TPS with a 3x cost increase. Key milestones include launching collateral-backed lending by Q2 and achieving full regulatory compliance across 5 Southeast Asian markets by Q4.",
		question: "What is the current transaction processing throughput?",
		options: [
			"50,000 TPS at full capacity.",
			"8,000 TPS with room to scale.",
			"3,000 TPS limited by compliance requirements.",
			"The memo does not mention throughput."
		],
		answerIdx: 1,
		explanation: "Câu trả lời đúng là B. Đoạn văn ghi rõ 'payment processing throughput stands at 8,000 TPS with a scalable architecture that can reach 50,000 TPS' — hiện tại 8,000 TPS, có thể scale lên 50,000.",
		sampleSentence: "Our scalable architecture currently handles 8,000 TPS throughput and has clear milestones to reach 50,000 TPS before Series B closes.",
		visualType: "dashboardAlert"
	},
	{
		title: "Report: Chargeback & Settlement Cycle Audit",
		content: "Following a regulatory mandate from the State Bank, we conducted a full audit of our chargeback and settlement processes. Our average settlement cycle is 2.1 business days, which is compliant with the T+2 requirement. However, our chargeback rate of 0.9% is approaching the 1% Visa threshold, primarily due to fluctuating fraud patterns from newly acquired merchants. The intermediary reconciliation layer has been flagged for an immediate upgrade to reduce discrepancies.",
		question: "Why is the chargeback rate considered a concern in the report?",
		options: [
			"It already exceeds the Visa 1% threshold.",
			"It is approaching the 1% Visa threshold due to fraud from new merchants.",
			"The settlement cycle is too slow, causing chargebacks to accumulate.",
			"The reconciliation layer generated false positives."
		],
		answerIdx: 1,
		explanation: "Câu trả lời đúng là B. Báo cáo nêu 'chargeback rate of 0.9% is approaching the 1% Visa threshold, primarily due to fluctuating fraud patterns from newly acquired merchants' — tỷ lệ đang gần chạm ngưỡng, nguyên nhân từ merchant mới có fraud pattern bất thường.",
		sampleSentence: "The fluctuating chargeback rate from newly acquired merchants is approaching the compliance threshold, requiring an immediate reconciliation audit.",
		visualType: "invoice"
	},
	{
		title: "Memo: KYC Backlog Causing Onboarding Delay",
		content: "The compliance team reports a backlog of over 1,200 pending KYC verifications due to a surge in new merchant sign-ups. The current manual review process cannot handle the volume, causing average onboarding time to increase from 3 to 11 days. Management has approved budget for an AI-powered KYC automation tool to reduce the backlog within 30 days.",
		question: "What is the main reason for the increased onboarding time?",
		options: [
			"The AML system is blocking too many applications.",
			"The manual KYC review process cannot handle the high volume of applications.",
			"The new automation tool is slowing down the workflow.",
			"New regulation requires more documents for each merchant."
		],
		answerIdx: 1,
		explanation: "Câu trả lời đúng là B. Memo nêu rõ 'The current manual review process cannot handle the volume' — quy trình xét duyệt thủ công không đáp ứng được số lượng, khiến thời gian onboarding tăng từ 3 lên 11 ngày.",
		sampleSentence: "Automating our KYC onboarding process will reduce the backlog and restore compliance with our 3-day merchant onboarding SLA.",
		visualType: "dashboardAlert"
	},
	{
		title: "Alert: Burn Rate Exceeds Monthly Budget",
		content: "Finance has flagged that our October burn rate reached $340,000, which is 70% above the planned $200,000. The primary drivers are unexpected cloud infrastructure costs and the accelerated headcount plan. At this rate, our runway shortens from 14 months to just 8 months. The CFO is convening an emergency budget review to identify immediate cost reduction measures.",
		question: "By how many months did the runway shorten due to the high burn rate?",
		options: [
			"From 14 months to 10 months.",
			"From 14 months to 8 months.",
			"From 8 months to 4 months.",
			"The memo does not specify the runway impact."
		],
		answerIdx: 1,
		explanation: "Câu trả lời đúng là B. Memo nêu rõ 'our runway shortens from 14 months to just 8 months' — do burn rate vượt ngân sách, thời gian tồn tại giảm từ 14 xuống còn 8 tháng.",
		sampleSentence: "The elevated burn rate has compressed our runway from 14 to 8 months, making the emergency budget review a critical priority.",
		visualType: "chartDown"
	},
	{
		title: "Report: API Integration Performance Review",
		content: "Following the go-live of our banking API integration last quarter, we have recorded an average latency of 180ms, which is within the 200ms SLA threshold. Uptime stood at 99.91%, marginally exceeding our 99.9% commitment. However, two incidents during peak hours caused brief latency spikes to 900ms, which has been flagged for investigation by the infrastructure team.",
		question: "What issue was flagged for further investigation?",
		options: [
			"The average latency consistently exceeds the SLA threshold.",
			"Two incidents caused latency spikes to 900ms during peak hours.",
			"Uptime fell below the 99.9% SLA commitment.",
			"The API integration failed to go live on schedule."
		],
		answerIdx: 1,
		explanation: "Câu trả lời đúng là B. Báo cáo nêu 'two incidents during peak hours caused brief latency spikes to 900ms, which has been flagged for investigation' — hai sự cố làm latency tăng vọt, cần điều tra.",
		sampleSentence: "Despite meeting our average latency SLA, the two peak-hour incidents revealed a fallback weakness that the infrastructure team must address before the next go-live.",
		visualType: "dashboardAlert"
	},
	{
		title: "Memo: Pivot Decision – B2C to B2B",
		content: "After six months of data analysis, the leadership team has decided to pivot our lending product from direct B2C consumer loans to B2B supply chain financing. Our B2C churn rate of 22% and high default rate proved the market fit was weak, while early B2B pilots showed a churn rate of just 4% and stronger retention metrics. The MVP for the B2B product will be launched in Q2.",
		question: "What data supported the decision to pivot to B2B?",
		options: [
			"B2C had a lower default rate than expected.",
			"B2B pilots showed lower churn and stronger retention than B2C.",
			"The B2B MVP was already ready for launch.",
			"Regulators mandated the shift away from B2C lending."
		],
		answerIdx: 1,
		explanation: "Câu trả lời đúng là B. Memo nêu 'B2B pilots showed a churn rate of just 4% and stronger retention metrics' — kết quả pilot B2B tốt hơn B2C về churn và retention, xác nhận quyết định pivot.",
		sampleSentence: "The B2B pivot was validated by pilot data showing a 4% churn rate, compared to the unsustainable 22% churn in our B2C lending product.",
		visualType: "presentation"
	},
	{
		title: "Report: Fraud Detection Model Accuracy",
		content: "Our updated machine learning fraud detection model achieved a 97.3% accuracy rate in the latest evaluation, up from 91.2% in the previous version. The false positive rate dropped from 15% to 4.8%, significantly reducing friction for legitimate customers. However, the model still struggles with novel fraud patterns not present in the training data, and requires monthly retraining to maintain performance.",
		question: "What improvement was noted in the false positive rate?",
		options: [
			"It increased from 4.8% to 15%, blocking more fraud.",
			"It decreased from 15% to 4.8%, reducing friction for legitimate users.",
			"It remained stable at 97.3%, matching overall model accuracy.",
			"The report does not mention the false positive rate."
		],
		answerIdx: 1,
		explanation: "Câu trả lời đúng là B. Báo cáo nêu 'The false positive rate dropped from 15% to 4.8%' — tỷ lệ chặn nhầm giảm từ 15% xuống 4.8%, giảm ma sát cho khách hàng hợp lệ.",
		sampleSentence: "The new fraud detection model's reduced false positive rate means fewer legitimate transactions are blocked, improving both security and customer experience.",
		visualType: "dashboardAlert"
	},
	{
		title: "Memo: Tokenization Audit Results",
		content: "The annual PCI DSS audit confirmed that our tokenization system successfully prevents storage of raw card data on our servers. All 47 million card-on-file records are stored as secure tokens. The auditor recommended strengthening encryption key rotation from annual to quarterly to further reduce risk. No compliance violations were identified during the review.",
		question: "What did the auditor recommend to improve security?",
		options: [
			"Replacing tokenization with a more advanced encryption algorithm.",
			"Rotating encryption keys more frequently, from annually to quarterly.",
			"Reducing the number of card-on-file records stored.",
			"Moving card data to an external compliance-certified vendor."
		],
		answerIdx: 1,
		explanation: "Câu trả lời đúng là B. Kiểm toán viên 'recommended strengthening encryption key rotation from annual to quarterly' — đề xuất tăng tần suất xoay khóa mã hóa từ hàng năm lên hàng quý.",
		sampleSentence: "Following the audit, we will implement quarterly encryption key rotation to complement our tokenization system and maintain PCI DSS compliance.",
		visualType: "invoice"
	},
	{
		title: "Report: Series B Fundraising Update",
		content: "We are pleased to report that our Series B fundraising process is progressing well, with three term sheets received from top-tier VC firms. The lead investor has completed initial due diligence and expressed strong confidence in our traction metrics, including 180,000 active merchants and $4.2M monthly revenue. Closing is expected within 45 days, after which dilution for existing shareholders will be approximately 18%.",
		question: "What is the expected impact of the Series B closing on existing shareholders?",
		options: [
			"Shareholders will receive a cash distribution of 18%.",
			"Existing shareholders will experience approximately 18% dilution.",
			"The company will buy back 18% of outstanding shares.",
			"New shares will be issued at an 18% discount to current valuation."
		],
		answerIdx: 1,
		explanation: "Câu trả lời đúng là B. Báo cáo nêu 'dilution for existing shareholders will be approximately 18%' — cổ đông hiện tại sẽ bị pha loãng khoảng 18% sau khi vòng Series B hoàn tất.",
		sampleSentence: "The 18% dilution from the Series B round is justified by the strong traction metrics that supported three competing term sheets.",
		visualType: "presentation"
	},
	{
		title: "Alert: AML System Flags Suspicious Cluster",
		content: "Our AML monitoring system has identified a cluster of 73 accounts exhibiting structuring behavior — making multiple transactions just below the $10,000 reporting threshold. These accounts have been temporarily suspended pending manual review by the compliance team. All flagged accounts have been placed on the internal blacklist, and a Suspicious Activity Report (SAR) will be filed within 24 hours.",
		question: "What behavior did the AML system detect in the flagged accounts?",
		options: [
			"Accounts making single large transactions above $10,000.",
			"Accounts making multiple transactions just below the $10,000 threshold to avoid reporting.",
			"Accounts with insufficient KYC documentation.",
			"Accounts attempting to whitelist themselves without authorization."
		],
		answerIdx: 1,
		explanation: "Câu trả lời đúng là B. Hệ thống AML phát hiện 'structuring behavior — making multiple transactions just below the $10,000 reporting threshold' — chia nhỏ giao dịch để tránh ngưỡng báo cáo bắt buộc.",
		sampleSentence: "The AML system's detection of structuring behavior prevented a potential money laundering operation involving 73 blacklisted accounts.",
		visualType: "dashboardAlert"
	},
	{
		title: "Memo: OKR Mid-Quarter Check-in",
		content: "At the midpoint of Q3, three out of five company-level OKRs are on track, while two are at risk. Our key result of reaching $5M monthly GMV is currently at 78% completion. The customer acquisition KPI is lagging at 52% due to higher-than-expected CAC in the new markets. The product team has been asked to iterate on the onboarding funnel to improve conversion rates before the end of the quarter.",
		question: "What is the status of the customer acquisition KPI?",
		options: [
			"It is ahead of schedule at 78% completion.",
			"It is lagging at 52% due to higher customer acquisition costs.",
			"It has been removed from the OKR framework this quarter.",
			"It exceeded the target, reaching 110% of the goal."
		],
		answerIdx: 1,
		explanation: "Câu trả lời đúng là B. Memo nêu 'The customer acquisition KPI is lagging at 52% due to higher-than-expected CAC' — chỉ số mới đạt 52%, chậm so với mục tiêu do chi phí mua khách cao hơn dự kiến.",
		sampleSentence: "The lagging customer acquisition KPI signals that we need to iterate on the top of the onboarding funnel to reduce CAC before the OKR deadline.",
		visualType: "chartDown"
	},
	{
		title: "Report: Infrastructure Scalability Test",
		content: "The engineering team completed a load test simulating 5x peak traffic to assess our system's scalability before the major retail partnership go-live. Results showed stable performance up to 18,000 TPS with latency remaining below 150ms. Above 18,000 TPS, the system experienced cascading failures across three microservices, triggering the circuit breaker pattern. We recommend upgrading the database layer before go-live to support 25,000 TPS safely.",
		question: "At what throughput level did the system begin to experience failures?",
		options: [
			"At 5,000 TPS during the initial warm-up phase.",
			"Above 18,000 TPS, where cascading microservice failures occurred.",
			"At 25,000 TPS, after the recommended database upgrade.",
			"The system did not fail during any phase of the test."
		],
		answerIdx: 1,
		explanation: "Câu trả lời đúng là B. Báo cáo nêu 'Above 18,000 TPS, the system experienced cascading failures across three microservices' — hệ thống bắt đầu có vấn đề khi vượt quá 18,000 TPS.",
		sampleSentence: "The load test revealed that our circuit breaker pattern prevents full outages, but the database layer must be upgraded to handle 25,000 TPS before go-live.",
		visualType: "dashboardAlert"
	},
	{
		title: "Memo: Vendor Contract Renegotiation Outcome",
		content: "Following three rounds of negotiation, we have successfully renegotiated our cloud infrastructure contract, reducing annual costs by 22% in exchange for a three-year commitment. The new SLA includes a 99.95% uptime guarantee and a four-hour response time for P1 incidents, improvements over the previous 99.9% uptime and eight-hour response commitments. Total savings over the contract term are estimated at $1.8M.",
		question: "What improvement was made to the incident response time in the new SLA?",
		options: [
			"Response time for P1 incidents improved from four hours to two hours.",
			"Response time for P1 incidents improved from eight hours to four hours.",
			"The SLA now covers P2 incidents that were previously excluded.",
			"Uptime was reduced to 99.9% to accommodate faster response times."
		],
		answerIdx: 1,
		explanation: "Câu trả lời đúng là B. Memo nêu 'a four-hour response time for P1 incidents, improvements over the previous... eight-hour response commitments' — thời gian phản hồi sự cố P1 cải thiện từ 8 giờ xuống 4 giờ.",
		sampleSentence: "The renegotiated vendor SLA cuts P1 incident response time from eight to four hours, significantly improving our operational resilience.",
		visualType: "invoice"
	},
	{
		title: "Report: Merchant Retention Analysis Q3",
		content: "Merchant retention analysis for Q3 reveals a 90-day retention rate of 82%, up from 74% in Q2 following the launch of our same-day settlement feature. However, the conversion rate from trial to paid subscription dropped to 31%, below our 40% target. The primary reason cited by merchants who did not convert was the complexity of the KYC documentation requirements. The product team is prioritizing a streamlined KYC flow in the next sprint.",
		question: "Why did the trial-to-paid conversion rate fall short of the target?",
		options: [
			"The same-day settlement feature was not available to trial users.",
			"Merchants found the KYC documentation requirements too complex.",
			"The 90-day retention rate was too low to support conversion.",
			"Pricing was higher than competing products in the market."
		],
		answerIdx: 1,
		explanation: "Câu trả lời đúng là B. Phân tích nêu 'The primary reason cited by merchants who did not convert was the complexity of the KYC documentation requirements' — yêu cầu KYC phức tạp là nguyên nhân chính gây ra tỷ lệ chuyển đổi thấp.",
		sampleSentence: "Simplifying the KYC flow in the next sprint is critical to recovering the trial conversion rate and hitting our Q4 retention targets.",
		visualType: "chartDown"
	},
	{
		title: "Alert: Rollback Executed After Deployment",
		content: "At 14:32 today, the engineering team executed a rollback of the v4.2.1 payment processing module after observing a 12% transaction failure rate within 90 minutes of deployment. The root cause was identified as an incompatibility between the new fraud scoring logic and the legacy settlement engine. The fallback to v4.1.9 restored normal operations within 8 minutes. A hotfix is being developed and will undergo full regression testing before the next deployment.",
		question: "What caused the rollback to be triggered?",
		options: [
			"The deployment exceeded the scheduled maintenance window.",
			"A 12% transaction failure rate was observed due to a fraud scoring incompatibility.",
			"The fallback system automatically detected an SLA breach.",
			"The legacy settlement engine was accidentally deleted during deployment."
		],
		answerIdx: 1,
		explanation: "Câu trả lời đúng là B. Alert nêu 'the engineering team executed a rollback... after observing a 12% transaction failure rate... due to an incompatibility between the new fraud scoring logic and the legacy settlement engine'.",
		sampleSentence: "The rapid rollback to v4.1.9 limited the blast radius to 90 minutes, but the fraud scoring incompatibility must be resolved before the next go-live attempt.",
		visualType: "dashboardAlert"
	},
	{
		title: "Memo: Cap Table Update After Series B",
		content: "Following the successful close of our $25M Series B round led by Southeast Asia Growth Fund, the updated cap table reflects new ownership distribution. Founders' combined stake has decreased from 52% to 38% due to the 18% dilution. The Employee Stock Option Pool (ESOP) has been increased from 8% to 12% as part of the agreement. All shareholders have been notified and updated legal documents are being prepared.",
		question: "What happened to the founders' ownership stake after the Series B close?",
		options: [
			"It increased from 38% to 52% due to new share issuance.",
			"It decreased from 52% to 38% due to dilution from the new funding round.",
			"It remained unchanged at 52% as dilution only affected early investors.",
			"It was entirely transferred to the ESOP pool as part of the agreement."
		],
		answerIdx: 1,
		explanation: "Câu trả lời đúng là B. Memo nêu 'Founders' combined stake has decreased from 52% to 38% due to the 18% dilution' — vòng Series B gây ra dilution khiến tỷ lệ sở hữu của founders giảm từ 52% xuống 38%.",
		sampleSentence: "While the Series B dilution reduced founders' stake from 52% to 38%, the increased ESOP pool will help attract senior talent for the next growth phase.",
		visualType: "invoice"
	},
	{
		title: "Report: AML Program Annual Assessment",
		content: "Our annual AML program assessment confirms full compliance with State Bank of Vietnam Circular 09 requirements. During the year, the system processed 42 million transactions and flagged 8,340 for enhanced review. Of these, 127 resulted in Suspicious Activity Reports (SARs) filed with authorities. The blacklist database was updated monthly and cross-referenced with FATF watchlists. No regulatory penalties were incurred.",
		question: "How many Suspicious Activity Reports were filed with authorities?",
		options: [
			"42 million, representing all processed transactions.",
			"127 SARs were filed out of 8,340 flagged transactions.",
			"8,340 SARs covering all enhanced review cases.",
			"No SARs were filed because no violations were found."
		],
		answerIdx: 1,
		explanation: "Câu trả lời đúng là B. Báo cáo nêu '127 resulted in Suspicious Activity Reports (SARs) filed with authorities' — trong số 8,340 giao dịch bị flag, chỉ 127 trường hợp dẫn đến việc nộp SAR.",
		sampleSentence: "Filing 127 SARs from over 42 million transactions demonstrates that our AML system strikes the right balance between detection sensitivity and compliance accuracy.",
		visualType: "chartDown"
	},
	{
		title: "Memo: Escrow Feature Launch for B2B",
		content: "The B2B escrow payment feature will go live on December 1st, allowing buyers to hold funds in a secure escrow account until delivery is confirmed. Funds are released automatically upon digital confirmation, or manually after a 5-business-day dispute window. The feature targets enterprise clients with transaction values above $50,000 and is expected to reduce payment disputes by 60% in the B2B segment.",
		question: "What triggers the automatic release of escrow funds?",
		options: [
			"Funds are released after a fixed 5-business-day holding period.",
			"Funds are released upon digital delivery confirmation from the buyer.",
			"Funds are released when the seller initiates a manual withdrawal request.",
			"Funds are released after compliance team approval for each transaction."
		],
		answerIdx: 1,
		explanation: "Câu trả lời đúng là B. Memo nêu 'Funds are released automatically upon digital confirmation' — tiền được giải phóng tự động khi người mua xác nhận giao hàng kỹ thuật số.",
		sampleSentence: "The escrow feature's automatic release mechanism upon digital confirmation removes the need for manual settlement intervention in B2B transactions above $50,000.",
		visualType: "invoice"
	},
	{
		title: "Report: Agile Transformation Results",
		content: "After six months of Agile transformation, deployment frequency has increased from monthly to bi-weekly, and the average time to resolve P2 incidents dropped from 72 to 18 hours. Sprint velocity improved by 40% following the introduction of structured backlog grooming sessions. However, stakeholder satisfaction scores remain at 6.2 out of 10, indicating that expectation alignment between product and business teams still needs improvement.",
		question: "What was the impact of Agile transformation on deployment frequency?",
		options: [
			"Deployments became less frequent, moving from bi-weekly to monthly.",
			"Deployment frequency increased from monthly to bi-weekly.",
			"Deployment frequency tripled from bi-weekly to three times per week.",
			"The transformation had no measurable impact on deployment frequency."
		],
		answerIdx: 1,
		explanation: "Câu trả lời đúng là B. Báo cáo nêu 'deployment frequency has increased from monthly to bi-weekly' — tần suất deploy tăng từ hàng tháng lên hai tuần một lần sau khi áp dụng Agile.",
		sampleSentence: "The Agile transformation doubled our deployment frequency to bi-weekly sprints, but stakeholder alignment remains the key challenge for the next phase.",
		visualType: "presentation"
	},
	{
		title: "Alert: Perpetual Bond Coupon Payment Due",
		content: "Finance alerts that the annual coupon payment of $1.4M on our perpetual bonds is due on November 30th. Unlike standard bonds, these instruments have no maturity date, meaning the coupon obligation continues indefinitely. The treasury team has confirmed sufficient liquidity to cover the payment without accessing the credit facility. Accounting will record the payment as interest expense, separate from principal amortization.",
		question: "Why does the company's coupon obligation on these bonds continue indefinitely?",
		options: [
			"The company failed to repay the principal, extending the obligation.",
			"These are perpetual bonds, which have no maturity date.",
			"The bond agreement includes automatic rollover at the investor's discretion.",
			"Regulatory requirements mandate a 10-year minimum holding period."
		],
		answerIdx: 1,
		explanation: "Câu trả lời đúng là B. Alert giải thích 'these instruments have no maturity date, meaning the coupon obligation continues indefinitely' — trái phiếu vĩnh viễn không có ngày đáo hạn nên nghĩa vụ trả lãi kéo dài mãi.",
		sampleSentence: "The perpetual bond structure provides long-term capital without dilution, but commits the company to an indefinite annual coupon obligation of $1.4M.",
		visualType: "chartDown"
	},
	{
		title: "Memo: Microservice Migration Milestone",
		content: "The engineering team has successfully migrated six of the twelve planned microservices in Phase 1 of our architecture transformation. The payment routing service and fraud scoring engine are now running as independent microservices, reducing deployment coupling by 80%. The circuit breaker pattern has been implemented across all active services, with zero cascading failures recorded since migration. Phase 2 targets the settlement and reconciliation modules, with completion expected by Q2.",
		question: "What benefit was achieved by migrating to independent microservices?",
		options: [
			"Total system latency was reduced below 100ms for all transactions.",
			"Deployment coupling was reduced by 80%, lowering the risk of cascading failures.",
			"The number of microservices was cut from twelve to six for simplicity.",
			"The circuit breaker pattern was removed as it was no longer needed."
		],
		answerIdx: 1,
		explanation: "Câu trả lời đúng là B. Memo nêu 'reducing deployment coupling by 80%' — chuyển sang microservice độc lập giảm 80% sự phụ thuộc giữa các thành phần, hạn chế lỗi lan rộng.",
		sampleSentence: "Phase 1 of the microservice migration reduced deployment coupling by 80%, and zero cascading failures since go-live validates the circuit breaker implementation.",
		visualType: "presentation"
	},
	{
		title: "Report: Hedging Program Performance",
		content: "Our FX hedging program, initiated in Q1, has successfully protected $3.2M in revenue from currency volatility during the USD/VND fluctuation this quarter. The program uses 90-day forward contracts to lock in exchange rates for projected USD inflows. The net cost of the hedging program is $185,000 in premiums, resulting in a net protection benefit of $3.0M. The treasury team recommends expanding coverage to 80% of projected foreign currency revenue.",
		question: "What is the net protection benefit of the hedging program this quarter?",
		options: [
			"$3.2M, representing the full value of revenue protected.",
			"$3.0M, after deducting $185,000 in hedging premiums.",
			"$185,000, which is the cost of the forward contracts.",
			"The program resulted in a net loss due to premium costs."
		],
		answerIdx: 1,
		explanation: "Câu trả lời đúng là B. Báo cáo nêu 'net cost of the hedging program is $185,000 in premiums, resulting in a net protection benefit of $3.0M' — lợi ích ròng là $3.0M sau khi trừ phí $185,000.",
		sampleSentence: "The FX hedging program's $3.0M net protection benefit far outweighs the $185,000 premium cost, making expansion to 80% coverage a sound treasury decision.",
		visualType: "chartDown"
	},
	{
		title: "Memo: Sandbox Environment Upgrade",
		content: "Effective immediately, the sandbox environment has been upgraded to mirror production data volumes and API response behavior. This change allows partners to conduct more realistic integration testing before go-live. All API keys issued in sandbox will need to be regenerated as part of the upgrade. Partners are advised to complete re-testing within 21 days to stay on schedule for their planned go-live dates.",
		question: "Why do partners need to regenerate their sandbox API keys?",
		options: [
			"The sandbox URL has changed and old keys will no longer route correctly.",
			"API keys must be regenerated as part of the sandbox environment upgrade.",
			"Keys expired automatically after the 90-day sandbox trial period.",
			"The upgrade requires partners to switch from REST to GraphQL APIs."
		],
		answerIdx: 1,
		explanation: "Câu trả lời đúng là B. Memo nêu 'All API keys issued in sandbox will need to be regenerated as part of the upgrade' — đây là yêu cầu bắt buộc của quá trình nâng cấp môi trường sandbox.",
		sampleSentence: "Partners must regenerate their sandbox API keys within 21 days to ensure their integration testing remains on schedule for the planned go-live.",
		visualType: "dashboardAlert"
	},
	{
		title: "Report: Working Capital Lending Portfolio Q3",
		content: "The working capital lending portfolio grew to $45M in outstanding loans this quarter, with an NPL ratio of 2.1%, within our 3% risk appetite. The average loan size is $22,500, with a 90-day term. Collateral coverage stands at 1.4x, providing adequate buffer against default risk. The underwriting team tightened risk score thresholds for applicants with less than 12 months of transaction history, reducing new NPL formation by 35%.",
		question: "What action did the underwriting team take to reduce new NPL formation?",
		options: [
			"They increased collateral requirements from 1.4x to 2.0x for all borrowers.",
			"They tightened risk score thresholds for borrowers with less than 12 months of transaction history.",
			"They reduced the maximum loan size from $22,500 to $15,000.",
			"They partnered with a third-party KYC provider to improve identity verification."
		],
		answerIdx: 1,
		explanation: "Câu trả lời đúng là B. Báo cáo nêu 'The underwriting team tightened risk score thresholds for applicants with less than 12 months of transaction history' — siết ngưỡng risk score với borrower ít lịch sử giao dịch.",
		sampleSentence: "Tightening underwriting risk score thresholds for thin-file borrowers has reduced new NPL formation by 35% while keeping collateral coverage at a healthy 1.4x.",
		visualType: "invoice"
	},
	{
		title: "Alert: Chargeback Threshold Breached",
		content: "URGENT: Our October chargeback rate reached 1.08%, breaching Visa's 1.0% threshold. Visa has placed us on the High Chargeback Merchant monitoring program, which requires monthly reporting and a remediation plan within 30 days. Failure to reduce the rate below 0.9% within 90 days may result in fines of up to $25,000 per month and potential suspension of card acceptance privileges. Risk team is convening an emergency session at 14:00 today.",
		question: "What could happen if the chargeback rate is not reduced within 90 days?",
		options: [
			"Visa will automatically block all transactions above $500.",
			"The company may face fines of up to $25,000 per month and potential card acceptance suspension.",
			"The company will be required to undergo a full KYC re-verification process.",
			"The settlement cycle will be extended from T+2 to T+5 as a penalty."
		],
		answerIdx: 1,
		explanation: "Câu trả lời đúng là B. Alert nêu rõ 'fines of up to $25,000 per month and potential suspension of card acceptance privileges' — đây là các hậu quả pháp lý và vận hành nghiêm trọng nếu không cải thiện.",
		sampleSentence: "The chargeback threshold breach puts us at risk of $25,000 monthly fines, making fraud detection improvements the most urgent operational priority.",
		visualType: "dashboardAlert"
	},
	{
		title: "Memo: Bootstrapped Acquisition Rationale",
		content: "The proposed acquisition of PayFlow, a bootstrapped SME lending startup, presents a strategic opportunity to accelerate our entry into the supply chain finance market. PayFlow has reached profitability without external funding, demonstrating strong unit economics with an LTV/CAC ratio of 4.2x. Their 18,000 active SME clients and $8M ARR will add immediate revenue traction to our portfolio. Due diligence is expected to complete within 45 days, with escrow funds held pending regulatory approval.",
		question: "What makes PayFlow's financial model particularly attractive to the acquirer?",
		options: [
			"PayFlow has raised three funding rounds from top-tier VCs.",
			"PayFlow reached profitability without external funding, showing strong unit economics.",
			"PayFlow's ARR is entirely from recurring subscription fees with no chargeback risk.",
			"PayFlow's 18,000 clients are all enterprise accounts with average deal sizes above $100K."
		],
		answerIdx: 1,
		explanation: "Câu trả lời đúng là B. Memo nêu 'PayFlow has reached profitability without external funding, demonstrating strong unit economics' — khả năng đạt lợi nhuận mà không cần vốn bên ngoài là dấu hiệu của mô hình kinh doanh lành mạnh.",
		sampleSentence: "PayFlow's bootstrapped path to profitability and 4.2x LTV/CAC ratio are the strongest indicators of sustainable unit economics in our due diligence findings.",
		visualType: "invoice"
	},
	{
		title: "Report: Attrition Impact on Engineering Team",
		content: "Engineering attrition reached 28% in the past 12 months, resulting in the loss of 14 experienced engineers. The total cost of attrition is estimated at $1.4M, including recruitment, onboarding, and productivity ramp-up costs. Exit interview data indicates that primary drivers are compensation below market benchmark and limited career growth visibility. HR recommends a retention program including equity refreshes and structured career progression OKRs.",
		question: "What are the primary drivers of engineering attrition identified in exit interviews?",
		options: [
			"Poor working conditions and a toxic team culture.",
			"Below-market compensation and limited career growth visibility.",
			"Excessive overtime requirements and unclear OKRs.",
			"Dissatisfaction with the technical stack and tooling choices."
		],
		answerIdx: 1,
		explanation: "Câu trả lời đúng là B. Báo cáo nêu 'primary drivers are compensation below market benchmark and limited career growth visibility' — lương thấp hơn thị trường và thiếu lộ trình thăng tiến rõ ràng là nguyên nhân chính.",
		sampleSentence: "Addressing the two primary attrition drivers — below-benchmark compensation and unclear career OKRs — is essential to reducing the $1.4M annual cost of engineering turnover.",
		visualType: "chartDown"
	},
	{
		title: "Memo: Q4 Roadmap Prioritization",
		content: "Following the Q3 OKR review and stakeholder input sessions, the Q4 product roadmap has been finalized with three priority tracks. First, compliance automation will reduce manual KYC review time by 70%. Second, the merchant analytics dashboard will deliver real-time settlement and chargeback data. Third, the embedded lending MVP will be released to 100 pilot merchants. Items not included in Q4 have been moved to the backlog for Q1 re-prioritization.",
		question: "What will the merchant analytics dashboard provide according to the Q4 roadmap?",
		options: [
			"Predictive revenue forecasting using AI-powered models.",
			"Real-time settlement and chargeback data for merchants.",
			"Automated KYC document collection from merchant partners.",
			"Integration with third-party accounting software for reconciliation."
		],
		answerIdx: 1,
		explanation: "Câu trả lời đúng là B. Memo nêu 'the merchant analytics dashboard will deliver real-time settlement and chargeback data' — tính năng này cung cấp dữ liệu thời gian thực về quyết toán và hoàn tiền cho merchant.",
		sampleSentence: "The Q4 merchant analytics dashboard will give merchants real-time visibility into settlement cycles and chargeback trends, directly addressing their top pain points.",
		visualType: "presentation"
	},
	{
		title: "Report: Conversion Funnel Optimization Results",
		content: "Following a 6-week A/B test on our merchant onboarding funnel, the redesigned 3-step KYC flow achieved a 67% completion rate, up from 41% with the previous 7-step flow. The overall trial-to-activation conversion rate improved from 28% to 44%, exceeding our 40% OKR target by 10%. The simplified funnel is now being rolled out to all new merchant sign-ups, and the old flow has been deprecated.",
		question: "By how much did the trial-to-activation conversion rate improve?",
		options: [
			"From 41% to 67%, an improvement of 26 percentage points.",
			"From 28% to 44%, an improvement of 16 percentage points.",
			"From 40% to 44%, just slightly above the OKR target.",
			"From 28% to 67%, more than doubling the original rate."
		],
		answerIdx: 1,
		explanation: "Câu trả lời đúng là B. Báo cáo nêu 'trial-to-activation conversion rate improved from 28% to 44%' — đây là tỷ lệ chuyển đổi từ trial sang activation, tăng 16 điểm phần trăm và vượt mục tiêu OKR.",
		sampleSentence: "The 28% to 44% improvement in trial-to-activation conversion rate validates our decision to simplify the KYC funnel from seven steps to three.",
		visualType: "chartDown"
	},
	{
		title: "Alert: Go-live Delayed Due to Compliance Gap",
		content: "The planned December 1st go-live of the cross-border payment feature has been postponed following a compliance review that identified gaps in our AML screening for non-resident users. The State Bank of Vietnam requires enhanced due diligence for all cross-border transactions above $5,000, which our current system does not fully support. Engineering has been tasked with implementing the required controls within 21 days. A revised go-live date of December 22nd has been proposed.",
		question: "Why was the go-live of the cross-border payment feature postponed?",
		options: [
			"Engineering could not complete API integration within the original timeline.",
			"A compliance gap was identified in AML screening for non-resident users.",
			"The State Bank revoked the company's cross-border payment license.",
			"Merchant demand for the feature was lower than expected."
		],
		answerIdx: 1,
		explanation: "Câu trả lời đúng là B. Alert nêu 'a compliance review that identified gaps in our AML screening for non-resident users' — lỗ hổng trong hệ thống AML là nguyên nhân trì hoãn go-live.",
		sampleSentence: "The AML compliance gap for non-resident transactions is a critical blocker that must be resolved before the revised December 22nd go-live can proceed.",
		visualType: "dashboardAlert"
	},
	{
		title: "Memo: Risk Score Model Deployment",
		content: "The new risk scoring model v3.0 will be deployed to production on November 15th following successful sandbox validation. The model uses 47 behavioral and transactional features to assign a risk score between 0 and 1,000 to each transaction. Transactions scoring above 750 will be automatically declined, while those between 500 and 750 will require step-up authentication. All merchants have been informed that decline rates may temporarily increase by 2-3% during the initial calibration period.",
		question: "What happens to transactions that score between 500 and 750 in the new model?",
		options: [
			"They are automatically approved without any additional checks.",
			"They require step-up authentication before being processed.",
			"They are automatically declined, the same as scores above 750.",
			"They are flagged for manual review by the compliance team."
		],
		answerIdx: 1,
		explanation: "Câu trả lời đúng là B. Memo nêu 'those between 500 and 750 will require step-up authentication' — giao dịch trong khoảng trung bình không tự động bị từ chối mà yêu cầu xác thực thêm.",
		sampleSentence: "The risk score model's step-up authentication for mid-range scores balances fraud prevention with a smooth experience for legitimate customers.",
		visualType: "dashboardAlert"
	},
	{
		title: "Report: Liquidity Management Q3 Review",
		content: "Treasury reports that our liquidity position remains strong, with $12.4M in unrestricted cash and a current ratio of 2.3x. The revolving credit facility of $10M remains undrawn, providing additional buffer. Receivables from three enterprise clients totaling $3.8M are now 45 days overdue, creating a near-term liquidity gap that is being managed through accelerated collection and a $2M short-term drawdown from the credit facility. The CFO does not anticipate any impact on our 12-month runway.",
		question: "How is the company managing the near-term liquidity gap from overdue receivables?",
		options: [
			"By issuing new equity to raise emergency capital from existing shareholders.",
			"Through accelerated collection and a $2M short-term credit facility drawdown.",
			"By selling portions of the investment portfolio to generate immediate cash.",
			"By extending payment terms with vendors to defer outflows."
		],
		answerIdx: 1,
		explanation: "Câu trả lời đúng là B. Báo cáo nêu 'being managed through accelerated collection and a $2M short-term drawdown from the credit facility' — hai biện pháp kết hợp để xử lý gap thanh khoản ngắn hạn.",
		sampleSentence: "The $2M credit facility drawdown bridges the liquidity gap from overdue enterprise receivables without impacting our overall 12-month runway.",
		visualType: "chartDown"
	},
	{
		title: "Memo: Syndicate Lending Program Launch",
		content: "We are pleased to announce the launch of our co-lending syndicate program in partnership with three commercial banks. Under the program, we will originate SME loans and syndicate 70% of the principal to partner banks, retaining 30% on our own balance sheet. This structure allows us to scale the lending portfolio to $100M without proportional increases in capital requirements. The underwriting standards and risk scoring model will be jointly maintained by all syndicate members.",
		question: "What is the key benefit of the syndicate structure for our capital requirements?",
		options: [
			"It eliminates the need for collateral in the underwriting process.",
			"It allows loan portfolio scaling without proportional increases in capital requirements.",
			"It transfers all credit risk to the partner banks, removing it from our balance sheet.",
			"It qualifies the company for preferential regulatory treatment on capital ratios."
		],
		answerIdx: 1,
		explanation: "Câu trả lời đúng là B. Memo nêu 'allows us to scale the lending portfolio to $100M without proportional increases in capital requirements' — cấu trúc syndicate cho phép mở rộng danh mục mà không cần tăng vốn tương ứng.",
		sampleSentence: "The 70/30 syndicate structure is a capital-efficient way to scale the lending portfolio to $100M while keeping risk concentrated at the 30% retention level.",
		visualType: "presentation"
	},
	{
		title: "Alert: Uptime SLA Breach Notification",
		content: "We are issuing this alert to notify all stakeholders that our payment processing service experienced 4.2 hours of downtime across three separate incidents in October, resulting in a monthly uptime of 99.43%. This is below our contractual SLA commitment of 99.9%, which translates to a maximum allowable downtime of 43.8 minutes per month. Under the SLA penalty clause, affected merchants are entitled to a 15% service credit for October. The engineering team has completed a root cause analysis and implemented a new circuit breaker configuration to prevent recurrence.",
		question: "What are merchants entitled to receive due to the SLA breach?",
		options: [
			"A full refund of all transaction fees paid in October.",
			"A 15% service credit for October under the SLA penalty clause.",
			"An extended settlement cycle of T+3 as compensation.",
			"Priority customer support for the next three months."
		],
		answerIdx: 1,
		explanation: "Câu trả lời đúng là B. Alert nêu 'affected merchants are entitled to a 15% service credit for October' — đây là điều khoản phạt trong SLA khi uptime cam kết bị vi phạm.",
		sampleSentence: "The 99.43% uptime in October triggered the SLA penalty clause, entitling affected merchants to a 15% service credit and requiring a root cause action plan.",
		visualType: "dashboardAlert"
	},
	{
		title: "Memo: Q4 Sprint Planning Complete",
		content: "The product team has completed Q4 sprint planning with twelve two-week sprints mapped to roadmap deliverables. The highest priority items in the backlog are the AML automation module, the merchant analytics dashboard, and the embedded lending API. Each sprint will be reviewed by stakeholders in a bi-weekly demo session. Incomplete backlog items will be carried forward with revised priority scores.",
		question: "How often will stakeholders review sprint progress?",
		options: [
			"Once per month at the end of each sprint cycle.",
			"In bi-weekly demo sessions after each sprint.",
			"Quarterly, aligned with the OKR review schedule.",
			"Only at the end of the Q4 roadmap delivery."
		],
		answerIdx: 1,
		explanation: "Câu trả lời đúng là B. Memo nêu 'Each sprint will be reviewed by stakeholders in a bi-weekly demo session' — các stakeholders sẽ xem xét tiến độ mỗi 2 tuần sau mỗi sprint.",
		sampleSentence: "The bi-weekly stakeholder demo sessions create accountability for each sprint delivery and align the roadmap with changing business priorities.",
		visualType: "presentation"
	},
	{
		title: "Alert: High Attrition in Compliance Team",
		content: "HR reports that the compliance team has experienced a 35% attrition rate in the past six months, driven primarily by compensation gaps with major banks and limited remote work flexibility. The loss of three senior AML analysts has created a critical knowledge gap that is delaying the quarterly regulatory report. Management has approved emergency retention bonuses and a revised headcount plan to hire five new compliance officers.",
		question: "What immediate action did management take in response to the attrition?",
		options: [
			"Management outsourced the AML function to a third-party vendor.",
			"Management approved retention bonuses and a new headcount plan.",
			"Management decided to automate the compliance function entirely.",
			"Management merged the compliance team with the risk team."
		],
		answerIdx: 1,
		explanation: "Câu trả lời đúng là B. Alert nêu 'Management has approved emergency retention bonuses and a revised headcount plan' — phản ứng ngay lập tức là thưởng giữ chân và kế hoạch tuyển dụng bổ sung.",
		sampleSentence: "Emergency retention bonuses can slow attrition in the short term, but long-term headcount stability requires addressing the root causes of compensation gaps.",
		visualType: "dashboardAlert"
	},
	{
		title: "Report: Arbitrage Savings from Multi-Network Routing",
		content: "By implementing intelligent transaction routing across four payment networks, our merchants saved a total of $2.1M in processing fees during Q3. The routing engine selects the lowest-cost network for each transaction based on card type, geography, and real-time network rates. The arbitrage opportunity was largest for cross-border transactions, where fee differences between networks ranged from 0.4% to 1.2%. The system processes routing decisions in under 15 milliseconds.",
		question: "What factors does the routing engine use to select a payment network?",
		options: [
			"Card type, merchant category code, and transaction time of day.",
			"Card type, geography, and real-time network rates.",
			"Transaction amount, chargeback history, and AML risk score.",
			"Only network uptime and SLA performance metrics."
		],
		answerIdx: 1,
		explanation: "Câu trả lời đúng là B. Báo cáo nêu 'The routing engine selects the lowest-cost network for each transaction based on card type, geography, and real-time network rates' — ba yếu tố để tối ưu chi phí.",
		sampleSentence: "Intelligent multi-network routing leverages arbitrage opportunities between payment networks to save merchants up to 1.2% on cross-border transaction fees.",
		visualType: "chartDown"
	},
	{
		title: "Memo: Accrual Accounting Policy for Loan Interest",
		content: "Effective this quarter, all loan interest will be recognized on an accrual basis, meaning interest income is recorded as it is earned daily, regardless of when cash is received. This change aligns our accounting with IFRS 9 requirements and provides a more accurate picture of monthly profitability. The reconciliation between accrued and cash-received interest will be reported in the monthly finance dashboard. Controllers should flag any discrepancies above $10,000 for immediate review.",
		question: "Why is the company switching to accrual accounting for loan interest?",
		options: [
			"To reduce taxable income by deferring interest recognition.",
			"To align with IFRS 9 and more accurately reflect monthly profitability.",
			"To simplify reconciliation by eliminating accrued interest entries.",
			"To comply with a new State Bank mandate requiring cash-basis reporting."
		],
		answerIdx: 1,
		explanation: "Câu trả lời đúng là B. Memo nêu 'This change aligns our accounting with IFRS 9 requirements and provides a more accurate picture of monthly profitability' — mục đích chính là tuân thủ chuẩn mực kế toán và phản ánh lợi nhuận chính xác hơn.",
		sampleSentence: "Switching to accrual-basis interest recognition ensures our monthly P&L reflects the true economic earnings of the lending portfolio, not just cash receipts.",
		visualType: "invoice"
	},
	{
		title: "Alert: Vendor SLA Breach – Cloud Provider",
		content: "Our primary cloud infrastructure provider experienced a regional outage from 02:14 to 06:47 today, resulting in 4.5 hours of degraded service. Under our SLA terms, this constitutes a Level 1 breach, triggering a 20% credit on the monthly invoice. The vendor has provided a preliminary root cause analysis citing a misconfigured network routing update. Our engineering team activated the fallback infrastructure, which maintained 80% capacity throughout the incident.",
		question: "How did the company's system respond during the cloud vendor outage?",
		options: [
			"All services went offline and were restored only after the vendor fixed the issue.",
			"The fallback infrastructure maintained 80% capacity throughout the incident.",
			"Engineering manually rerouted traffic, causing a 2-hour complete outage.",
			"The circuit breaker pattern shut down all non-essential microservices."
		],
		answerIdx: 1,
		explanation: "Câu trả lời đúng là B. Alert nêu 'Our engineering team activated the fallback infrastructure, which maintained 80% capacity throughout the incident' — hệ thống dự phòng đảm bảo dịch vụ tiếp tục ở mức 80%.",
		sampleSentence: "The fallback infrastructure's ability to sustain 80% capacity during the cloud outage validated our resilience investment and limited the SLA breach impact.",
		visualType: "dashboardAlert"
	},
	{
		title: "Report: Perpetual Bond Market Analysis",
		content: "The treasury team has completed a market analysis of perpetual bond opportunities from investment-grade ASEAN financial institutions. Yields range from 4.2% to 6.8% annually, offering attractive returns relative to the regional benchmark rate of 3.5%. As perpetual bonds carry no maturity date, the primary risk is the issuer's ability to sustain coupon payments indefinitely. The analysis recommends allocating 15% of the portfolio to perpetual bonds, hedged against interest rate volatility.",
		question: "What is the primary risk associated with perpetual bonds according to the analysis?",
		options: [
			"The bonds may be called early, forcing reinvestment at lower rates.",
			"The issuer may be unable to sustain indefinite coupon payments.",
			"Perpetual bonds are not eligible for hedging against interest rate risk.",
			"The bonds are below investment grade and carry excessive credit risk."
		],
		answerIdx: 1,
		explanation: "Câu trả lời đúng là B. Phân tích nêu 'the primary risk is the issuer's ability to sustain coupon payments indefinitely' — vì không có ngày đáo hạn, rủi ro chính là tổ chức phát hành có thể không trả lãi mãi mãi.",
		sampleSentence: "Before allocating 15% of the portfolio to perpetual bonds, the treasury team must thoroughly assess each issuer's long-term capacity to sustain coupon payments.",
		visualType: "chartDown"
	},
	{
		title: "Memo: Bootstrapped Startup Integration Plan",
		content: "Following the acquisition of PayFlow, a bootstrapped SME lending startup, the integration team has outlined a 90-day plan. In the first 30 days, we will consolidate KYC and AML systems to ensure compliance continuity. Between days 31-60, the PayFlow API will be migrated to our microservice architecture. The final phase covers data migration and merchant onboarding to our unified platform. PayFlow's cap table has been fully settled and all escrow funds released.",
		question: "What is the focus of the first 30 days of the integration plan?",
		options: [
			"Migrating the PayFlow API to the microservice architecture.",
			"Consolidating KYC and AML systems for compliance continuity.",
			"Onboarding PayFlow merchants to the unified platform.",
			"Releasing escrow funds and settling the cap table obligations."
		],
		answerIdx: 1,
		explanation: "Câu trả lời đúng là B. Memo nêu 'In the first 30 days, we will consolidate KYC and AML systems to ensure compliance continuity' — ưu tiên đầu tiên là đảm bảo tuân thủ trước khi làm bất cứ điều gì khác.",
		sampleSentence: "Prioritizing KYC and AML consolidation in the first 30 days of the PayFlow integration ensures we maintain full compliance continuity during the transition.",
		visualType: "invoice"
	},
	{
		title: "Report: Conversion Funnel by Merchant Segment",
		content: "Funnel analysis by merchant segment reveals significant differences in conversion rates. Enterprise merchants convert at 71%, while SME merchants convert at only 34%, and micro-merchants at 19%. The primary drop-off point for SME and micro-merchants is the document upload stage of KYC, where 58% of applicants abandon the process. The product team plans to introduce OCR-powered document capture and a simplified KYC flow targeted at these segments in the next sprint.",
		question: "Where in the funnel do most SME and micro-merchant drop-offs occur?",
		options: [
			"At the pricing page, where fees are perceived as too high.",
			"At the document upload stage of the KYC process.",
			"At the sandbox API testing phase before go-live.",
			"At the settlement configuration step after onboarding."
		],
		answerIdx: 1,
		explanation: "Câu trả lời đúng là B. Báo cáo nêu 'The primary drop-off point for SME and micro-merchants is the document upload stage of KYC, where 58% of applicants abandon the process'.",
		sampleSentence: "Simplifying the KYC document upload experience for SME merchants could recover a significant portion of the 58% funnel drop-off in that segment.",
		visualType: "chartDown"
	},
	{
		title: "Alert: Encryption Key Rotation Required",
		content: "As per the PCI DSS compliance schedule and auditor recommendations, all active encryption keys must be rotated by November 30th. Keys older than 12 months are currently flagged as non-compliant. The security team has prepared an automated rotation script that will update all keys without service interruption. All API partners using tokenized card data must re-authenticate after the rotation is complete. Failure to rotate before the deadline risks a compliance finding in the next audit.",
		question: "What happens to API partners after the encryption key rotation?",
		options: [
			"Partners will need to regenerate their tokenized card data from scratch.",
			"Partners must re-authenticate after the rotation is complete.",
			"Partners will be temporarily blacklisted until they update their integration.",
			"Partners will receive a 30-day grace period before re-authentication is required."
		],
		answerIdx: 1,
		explanation: "Câu trả lời đúng là B. Alert nêu 'All API partners using tokenized card data must re-authenticate after the rotation is complete' — đây là bước bắt buộc sau khi xoay khóa mã hóa.",
		sampleSentence: "Coordinating with API partners on re-authentication timelines is critical to ensuring the encryption key rotation completes without disrupting live integrations.",
		visualType: "dashboardAlert"
	},
	{
		title: "Memo: Runway Extension After Cost Optimization",
		content: "Following the emergency budget review, the finance team has identified $420,000 in monthly savings through three initiatives: renegotiating the cloud vendor contract ($180K), reducing discretionary marketing spend ($150K), and deferring two senior hires ($90K). These measures extend our runway from 8 months to 14 months, giving the team sufficient time to close the Series B round. The CFO cautions that further cuts would affect product velocity and retention.",
		question: "How did the cost optimization measures affect the company's runway?",
		options: [
			"Runway decreased from 14 months to 8 months due to reduced revenue.",
			"Runway extended from 8 months to 14 months through identified savings.",
			"Runway remained at 8 months as the savings offset new spending increases.",
			"Runway extended to 24 months, removing the urgency of the Series B raise."
		],
		answerIdx: 1,
		explanation: "Câu trả lời đúng là B. Memo nêu 'These measures extend our runway from 8 months to 14 months' — ba biện pháp tiết kiệm cộng lại $420K/tháng, kéo dài runway thêm 6 tháng.",
		sampleSentence: "The $420K monthly cost reduction extends our runway from 8 to 14 months, providing enough buffer to close the Series B before funds are depleted.",
		visualType: "chartDown"
	},
	{
		title: "Report: KPI Benchmarking Against ASEAN Peers",
		content: "Our annual benchmarking analysis comparing key performance indicators against eight ASEAN fintech peers reveals that our chargeback rate of 0.6% is best-in-class, while our 90-day merchant retention rate of 78% is below the peer median of 85%. Our API latency of 165ms is competitive but lags behind the top performer at 88ms. The analysis recommends prioritizing retention improvement initiatives and infrastructure upgrades to latency in the next roadmap cycle.",
		question: "In which KPI does the company lead its ASEAN peers?",
		options: [
			"90-day merchant retention rate, at the highest in the peer group.",
			"Chargeback rate of 0.6%, which is best-in-class among peers.",
			"API latency of 88ms, the fastest in the benchmarking group.",
			"Monthly GMV growth rate, which exceeds the peer median."
		],
		answerIdx: 1,
		explanation: "Câu trả lời đúng là B. Báo cáo nêu 'our chargeback rate of 0.6% is best-in-class' — đây là chỉ số duy nhất đứng đầu so với các đối thủ ASEAN.",
		sampleSentence: "While our best-in-class 0.6% chargeback rate demonstrates strong fraud detection, closing the retention gap to the 85% peer median is the top priority for the next roadmap cycle.",
		visualType: "presentation"
	},
	{
		title: "Memo: Hedging Program Expansion Approved",
		content: "The Board has approved expanding our FX hedging program from covering 40% to 80% of projected USD revenue exposure. The expanded program will use a combination of 90-day forward contracts and options to provide both floor protection and upside participation. The net cost of the expansion is estimated at $95,000 per quarter in premiums. The treasury team will implement the new positions before the start of Q1 to fully protect next year's budgeted revenue.",
		question: "What financial instruments will the expanded hedging program use?",
		options: [
			"Perpetual bonds and equity derivatives to offset currency risk.",
			"A combination of 90-day forward contracts and options.",
			"Only currency options to maximize upside participation.",
			"Short-term syndicated loans denominated in USD."
		],
		answerIdx: 1,
		explanation: "Câu trả lời đúng là B. Memo nêu 'The expanded program will use a combination of 90-day forward contracts and options' — kết hợp hai công cụ cho phép bảo vệ downside và vẫn hưởng upside.",
		sampleSentence: "Combining forward contracts with options in the expanded hedging program provides both guaranteed floor protection and the flexibility to benefit from favorable exchange rate movements.",
		visualType: "invoice"
	},
	{
		title: "Alert: Risk Score Threshold Adjustment",
		content: "Effective immediately, the fraud risk score threshold for automatic transaction decline has been raised from 700 to 750. This adjustment follows a two-week analysis showing that transactions scoring 700-749 had a fraud rate of only 0.8%, well below the 5% rate at which decline is operationally justified. The change is expected to reduce false positives by 18% and improve merchant revenue by approximately $340,000 per month. The whitelist for strategic enterprise merchants remains unchanged.",
		question: "Why was the decline threshold raised from 700 to 750?",
		options: [
			"A regulatory mandate required raising the threshold to reduce discrimination.",
			"Transactions scoring 700-749 had a low 0.8% fraud rate that did not justify decline.",
			"The fraud model was recalibrated and all existing scores increased by 50 points.",
			"Strategic merchants lobbied to have the threshold raised for their transaction types."
		],
		answerIdx: 1,
		explanation: "Câu trả lời đúng là B. Alert nêu 'transactions scoring 700-749 had a fraud rate of only 0.8%, well below the 5% rate at which decline is operationally justified' — tỷ lệ gian lận thấp không đủ để justify việc từ chối giao dịch.",
		sampleSentence: "Raising the decline threshold based on data showing a 0.8% fraud rate at 700-749 reduces false positives by 18% while maintaining effective fraud protection above 750.",
		visualType: "dashboardAlert"
	},
	{
		title: "Report: Embedded Lending MVP Results",
		content: "The embedded lending MVP, deployed to 100 pilot merchants over 60 days, generated $1.8M in loan originations with an NPL rate of 1.4%, significantly below our 3% risk appetite. Merchant satisfaction scores averaged 8.6 out of 10, with the primary concern being the collateral documentation process. The underwriting model approved 67% of applications, with rejection rates highest among merchants with less than 6 months of transaction history on our platform. Full rollout is recommended for Q1.",
		question: "What was the primary merchant concern during the MVP pilot?",
		options: [
			"The interest rates offered were higher than traditional bank loans.",
			"The collateral documentation process was the main pain point.",
			"Loan approval times were too long, averaging five business days.",
			"The maximum loan size of $50,000 was insufficient for their needs."
		],
		answerIdx: 1,
		explanation: "Câu trả lời đúng là B. Báo cáo nêu 'with the primary concern being the collateral documentation process' — quy trình nộp tài liệu tài sản thế chấp là điểm đau chính của merchant trong giai đoạn pilot.",
		sampleSentence: "Simplifying the collateral documentation process before the Q1 full rollout will address the primary merchant concern identified during the 60-day MVP pilot.",
		visualType: "invoice"
	}
];
var IconZap = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
	className: "w-6 h-6",
	fill: "none",
	stroke: "currentColor",
	viewBox: "0 0 24 24",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
		strokeLinecap: "round",
		strokeLinejoin: "round",
		strokeWidth: "2",
		d: "M13 10V3L4 14h7v7l9-11h-7z"
	})
});
var IconVocab = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
	className: "w-6 h-6",
	fill: "none",
	stroke: "currentColor",
	viewBox: "0 0 24 24",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
		strokeLinecap: "round",
		strokeLinejoin: "round",
		strokeWidth: "2",
		d: "M4 6h16M4 12h16M4 18h7"
	})
});
var IconListen = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
	className: "w-6 h-6",
	fill: "none",
	stroke: "currentColor",
	viewBox: "0 0 24 24",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
		strokeLinecap: "round",
		strokeLinejoin: "round",
		strokeWidth: "2",
		d: "M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
	})
});
var IconSpeak = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
	className: "w-6 h-6",
	fill: "none",
	stroke: "currentColor",
	viewBox: "0 0 24 24",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
		strokeLinecap: "round",
		strokeLinejoin: "round",
		strokeWidth: "2",
		d: "M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
	})
});
var IconRead = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
	className: "w-6 h-6",
	fill: "none",
	stroke: "currentColor",
	viewBox: "0 0 24 24",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
		strokeLinecap: "round",
		strokeLinejoin: "round",
		strokeWidth: "2",
		d: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477-4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
	})
});
var IconWrite = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
	className: "w-6 h-6",
	fill: "none",
	stroke: "currentColor",
	viewBox: "0 0 24 24",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
		strokeLinecap: "round",
		strokeLinejoin: "round",
		strokeWidth: "2",
		d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
	})
});
var IconRandom = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
	className: "w-5 h-5",
	fill: "none",
	stroke: "currentColor",
	viewBox: "0 0 24 24",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
		strokeLinecap: "round",
		strokeLinejoin: "round",
		strokeWidth: "2",
		d: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
	})
});
var IconPlay = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
	className: "w-5 h-5",
	fill: "none",
	stroke: "currentColor",
	viewBox: "0 0 24 24",
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
		strokeLinecap: "round",
		strokeLinejoin: "round",
		strokeWidth: "2",
		d: "M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
		strokeLinecap: "round",
		strokeLinejoin: "round",
		strokeWidth: "2",
		d: "M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
	})]
});
var IconCheck = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
	className: "w-6 h-6 text-green-500",
	fill: "none",
	stroke: "currentColor",
	viewBox: "0 0 24 24",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
		strokeLinecap: "round",
		strokeLinejoin: "round",
		strokeWidth: "2",
		d: "M5 13l4 4L19 7"
	})
});
var IconX = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
	className: "w-6 h-6 text-red-500",
	fill: "none",
	stroke: "currentColor",
	viewBox: "0 0 24 24",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
		strokeLinecap: "round",
		strokeLinejoin: "round",
		strokeWidth: "2",
		d: "M6 18L18 6M6 6l12 12"
	})
});
var IconSparkles = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
	className: "w-5 h-5",
	fill: "none",
	stroke: "currentColor",
	viewBox: "0 0 24 24",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
		strokeLinecap: "round",
		strokeLinejoin: "round",
		strokeWidth: "2",
		d: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
	})
});
var IconLoading = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
	className: "w-5 h-5 animate-spin",
	fill: "none",
	stroke: "currentColor",
	viewBox: "0 0 24 24",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
		strokeLinecap: "round",
		strokeLinejoin: "round",
		strokeWidth: "2",
		d: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
	})
});
var IconLightbulb = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
	className: "w-5 h-5",
	fill: "none",
	stroke: "currentColor",
	viewBox: "0 0 24 24",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
		strokeLinecap: "round",
		strokeLinejoin: "round",
		strokeWidth: "2",
		d: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
	})
});
var IconMicOutline = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
	className: "w-6 h-6",
	fill: "none",
	stroke: "currentColor",
	viewBox: "0 0 24 24",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
		strokeLinecap: "round",
		strokeLinejoin: "round",
		strokeWidth: "2",
		d: "M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
	})
});
var IconPlus = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
	className: "w-4 h-4",
	fill: "none",
	stroke: "currentColor",
	viewBox: "0 0 24 24",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
		strokeLinecap: "round",
		strokeLinejoin: "round",
		strokeWidth: "2",
		d: "M12 4v16m8-8H4"
	})
});
var IconClose = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
	className: "w-5 h-5",
	fill: "none",
	stroke: "currentColor",
	viewBox: "0 0 24 24",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
		strokeLinecap: "round",
		strokeLinejoin: "round",
		strokeWidth: "2",
		d: "M6 18L18 6M6 6l12 12"
	})
});
var VisualInvoice = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
	className: "w-full h-full bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex flex-col font-mono text-xs text-gray-600 relative overflow-hidden shrink-0 min-h-[150px]",
	children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex justify-between border-b border-dashed border-gray-300 pb-2 mb-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-bold",
				children: "INVOICE #892"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "05/18/2026" })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex justify-between py-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Gateway Setup" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "$500.00" })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex justify-between py-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Monthly Maint." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "$100.00" })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex justify-between py-1 bg-red-50 text-red-700 font-bold px-1 rounded mt-1 border border-red-100",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Interchange Fee (3.5%)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "$12,450.00" })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-auto pt-2 border-t border-gray-300 flex justify-between font-bold text-gray-900 text-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "TOTAL DUE" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "$13,050.00" })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-[-20deg] border-4 border-red-500 text-red-500 text-xl font-black p-1 opacity-20 uppercase tracking-widest",
			children: "Disputed"
		})
	]
});
var VisualChartDown = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
	className: "w-full h-full bg-gray-900 rounded-xl shadow-inner p-4 flex flex-col relative overflow-hidden shrink-0 min-h-[150px]",
	children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
			className: "text-gray-400 text-xs font-bold uppercase mb-2",
			children: "Q3 Revenue vs Overhead"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex-1 w-full flex items-end gap-2 pb-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "w-1/4 bg-blue-500/20 rounded-t h-[80%] relative",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute bottom-0 w-full bg-blue-500 rounded-t h-[60%]" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "w-1/4 bg-blue-500/20 rounded-t h-[70%] relative",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute bottom-0 w-full bg-blue-500 rounded-t h-[50%]" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "w-1/4 bg-red-500/20 rounded-t h-[90%] relative",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute bottom-0 w-full bg-red-500 rounded-t h-[100%] shadow-[0_0_15px_rgba(239,68,68,0.5)]" })
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			className: "absolute inset-0 w-full h-full z-10 drop-shadow-md",
			preserveAspectRatio: "none",
			viewBox: "0 0 100 100",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M 0,40 L 33,50 L 66,20 L 100,80",
				fill: "none",
				stroke: "#ef4444",
				strokeWidth: "3",
				strokeDasharray: "4 4"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "100",
				cy: "80",
				r: "4",
				fill: "#ef4444"
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "absolute bottom-2 right-2 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded",
			children: "-30% Deficit"
		})
	]
});
var VisualVideoCall = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
	className: "w-full h-full bg-gray-900 rounded-xl shadow-lg flex flex-col overflow-hidden relative shrink-0 min-h-[180px]",
	children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-3 left-3 bg-red-600 animate-pulse w-2 h-2 rounded-full" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "absolute top-2 left-7 text-gray-300 text-[10px]",
			children: "REC 14:02"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex-1 flex items-center justify-center p-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "w-20 h-20 bg-red-900/50 rounded-full border-2 border-red-500 flex items-center justify-center text-4xl shadow-[0_0_30px_rgba(239,68,68,0.2)]",
				children: "😡"
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "h-10 bg-gray-800 flex justify-center items-center gap-4 px-4 shrink-0",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "w-6 h-6 rounded-full bg-red-500 flex items-center justify-center text-white",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconX, {})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "w-6 h-6 rounded-full bg-gray-600 flex items-center justify-center text-[10px]",
					children: "📷"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "w-6 h-6 rounded-full bg-gray-600 flex items-center justify-center text-[10px]",
					children: "🎤"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "absolute bottom-12 left-4 bg-black/60 px-2 py-1 rounded text-white text-[10px] backdrop-blur-sm",
			children: "VP of E-commerce"
		})
	]
});
var VisualPresentation = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
	className: "w-full h-full bg-slate-100 rounded-xl border-4 border-gray-800 shadow-md p-4 flex flex-col justify-center items-center relative shrink-0 min-h-[180px]",
	children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
			className: "text-blue-800 font-black text-sm mb-2 uppercase tracking-wide",
			children: "Migration ROI"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-[100px] aspect-square rounded-full border-8 border-gray-200 relative mb-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 rounded-full border-8 border-green-500",
				style: { clipPath: "polygon(50% 50%, 100% 0, 100% 100%, 0 100%, 0 50%)" }
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 flex items-center justify-center font-black text-xl text-gray-800",
				children: "+65%"
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex gap-2 text-[10px] font-bold text-gray-500",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "flex items-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-2 h-2 bg-green-500 inline-block mr-1" }), "Savings"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "flex items-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-2 h-2 bg-gray-300 inline-block mr-1" }), "Cost"]
			})]
		})
	]
});
var VisualDashboardAlert = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
	className: "w-full h-full bg-slate-50 rounded-xl border border-gray-200 p-4 flex flex-col gap-2 shrink-0 min-h-[180px]",
	children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "w-7 h-7 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600 text-xs",
					children: "🛡️"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-bold text-gray-700 text-sm",
					children: "Fraud Alert"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-[10px] text-gray-400",
				children: "Just now"
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "bg-red-50 border border-red-200 rounded-lg p-3 flex-1 flex flex-col justify-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-red-500 text-[10px] font-bold uppercase mb-1",
					children: "Spike Detected"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-2xl font-black text-red-700",
					children: "420% 📈"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-red-600 text-[10px]",
					children: "Chargeback rate (72h)"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex gap-2 h-1.5 mt-1",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-full flex-1 bg-gray-200 rounded-full overflow-hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-full bg-red-500 w-[85%]" })
			})
		})
	]
});
var renderVisual = (type) => {
	switch (type) {
		case "invoice": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VisualInvoice, {});
		case "chartDown": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VisualChartDown, {});
		case "videoCall": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VisualVideoCall, {});
		case "presentation": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VisualPresentation, {});
		case "dashboardAlert": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VisualDashboardAlert, {});
		default: return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "w-full h-full min-h-[150px] bg-gray-100 rounded-xl flex items-center justify-center text-gray-400 text-xs",
			children: "No Visual"
		});
	}
};
var listeningDataBase = [
	{
		text: "The recent discrepancy in the settlement report requires immediate attention from the compliance team.",
		hint: "Sự sai lệch gần đây trong báo cáo quyết toán cần sự chú ý ngay lập tức từ team tuân thủ.",
		explanation: "3 từ khóa quan trọng:\n• Discrepancy (n): Sự sai lệch, không khớp số liệu.\n• Settlement report: Báo cáo quyết toán (nơi chốt dòng tiền).\n• Compliance team: Đội ngũ tuân thủ pháp lý."
	},
	{
		text: "Our overhead costs have fluctuated substantially during this quarter.",
		hint: "Chi phí cố định của chúng ta đã dao động đáng kể trong quý này.",
		explanation: "3 cụm quan trọng:\n• Overhead costs: Chi phí cố định (mặt bằng, điện nước, vận hành...).\n• Fluctuate (v): Biến động, dao động lên xuống.\n• Substantially (adv): Một cách đáng kể, mức độ lớn."
	},
	{
		text: "The chargeback rate exceeded our threshold, triggering an immediate reconciliation audit.",
		hint: "Tỷ lệ hoàn tiền tranh chấp vượt ngưỡng cho phép, kích hoạt kiểm toán đối soát khẩn cấp.",
		explanation: "3 từ quan trọng:\n• Chargeback rate: Tỷ lệ hoàn tiền khi khách tranh chấp với ngân hàng.\n• Threshold: Ngưỡng giới hạn (Visa/Mastercard quy định tối đa 1%).\n• Reconciliation audit: Kiểm toán đối soát — xem xét lại toàn bộ giao dịch."
	},
	{
		text: "We need a scalable architecture to handle throughput of fifty thousand transactions per second.",
		hint: "Chúng ta cần kiến trúc có thể mở rộng để xử lý công suất 50,000 giao dịch mỗi giây.",
		explanation: "Từ khóa kỹ thuật quan trọng:\n• Scalable architecture: Kiến trúc hệ thống có thể mở rộng khi nhu cầu tăng.\n• Throughput: Công suất xử lý — số giao dịch hoàn thành trong 1 giây (TPS).\n• Transactions per second (TPS): Đơn vị đo hiệu suất hệ thống thanh toán."
	},
	{
		text: "The acquisition requires thorough due diligence on the target company's liquidity and compliance status.",
		hint: "Việc thâu tóm yêu cầu thẩm định kỹ lưỡng về tình trạng thanh khoản và tuân thủ của công ty mục tiêu.",
		explanation: "Từ khóa M&A quan trọng:\n• Acquisition: Thâu tóm, mua lại — chữ A trong M&A.\n• Due diligence: Thẩm định toàn diện trước khi đầu tư/mua lại.\n• Liquidity: Khả năng chuyển đổi tài sản thành tiền mặt nhanh chóng."
	},
	{
		text: "Investors expect us to hit key milestones before the Series B funding round closes.",
		hint: "Nhà đầu tư kỳ vọng chúng ta đạt được các mốc quan trọng trước khi vòng gọi vốn Series B kết thúc.",
		explanation: "Startup/đầu tư từ vựng:\n• Milestone: Mốc quan trọng — mục tiêu cụ thể phải đạt (ví dụ: 1M users, break-even).\n• Series B: Vòng gọi vốn thứ 2 lớn, thường từ $10M–$50M.\n• Funding round: Vòng gọi vốn — Seed, Series A, B, C..."
	},
	{
		text: "Our burn rate this month reached $340,000, which is 70% above our planned budget.",
		hint: "Tốc độ đốt tiền tháng này đạt 340.000 đô la, cao hơn 70% so với ngân sách kế hoạch.",
		explanation: "Từ vựng startup quan trọng:\n• Burn rate: Số tiền công ty tiêu mỗi tháng trước khi có lợi nhuận — cao là dấu hiệu nguy hiểm.\n• Above budget: Vượt ngân sách — khi chi tiêu thực tế cao hơn kế hoạch.\n• Planned budget: Ngân sách kế hoạch — mức chi tiêu được phê duyệt trước."
	},
	{
		text: "The pivot from B2C to B2B lending reduced our churn rate from twenty-two percent to just four percent.",
		hint: "Việc chuyển hướng từ cho vay B2C sang B2B đã giảm tỷ lệ rời bỏ từ 22% xuống còn 4%.",
		explanation: "Ba khái niệm chiến lược cốt lõi:\n• Pivot: Chuyển hướng chiến lược căn bản khi model cũ không hiệu quả.\n• B2C/B2B: Business-to-Consumer và Business-to-Business — hai mô hình kinh doanh khác nhau.\n• Churn rate: Tỷ lệ khách hàng ngừng sử dụng dịch vụ — giảm churn là mục tiêu quan trọng."
	},
	{
		text: "All user card data is protected by tokenization, so no raw card numbers are stored on our servers.",
		hint: "Tất cả dữ liệu thẻ người dùng được bảo vệ bằng mã hóa token, vì vậy không có số thẻ thực nào được lưu trên máy chủ của chúng ta.",
		explanation: "Bảo mật thanh toán:\n• Tokenization: Thay thế dữ liệu thẻ thật bằng token vô nghĩa — tiêu chuẩn bảo mật PCI DSS.\n• Raw card numbers: Số thẻ thực — tuyệt đối không được lưu trữ trực tiếp.\n• Stored on servers: Lưu trữ trên máy chủ — nơi hacker nhắm đến khi tấn công."
	},
	{
		text: "The founding team's equity stake was diluted from fifty-two to thirty-eight percent after the Series B round.",
		hint: "Phần cổ phần của đội sáng lập bị pha loãng từ 52% xuống còn 38% sau vòng Series B.",
		explanation: "Thuật ngữ cổ phần startup:\n• Equity stake: Tỷ lệ cổ phần sở hữu trong công ty.\n• Diluted: Bị pha loãng — khi phát hành thêm cổ phần, tỷ lệ % của cổ đông cũ giảm xuống.\n• Series B round: Vòng gọi vốn lớn thứ hai — thường phát sinh dilution 15–25% cho cổ đông hiện tại."
	},
	{
		text: "We implemented a circuit breaker pattern to prevent any single microservice failure from causing a full system outage.",
		hint: "Chúng ta triển khai mô hình cầu dao ngắt mạch để ngăn bất kỳ lỗi microservice đơn lẻ nào gây ra sập toàn hệ thống.",
		explanation: "Kiến trúc phần mềm hiện đại:\n• Circuit breaker pattern: Mô hình thiết kế — ngắt kết nối với service lỗi để tránh lỗi lan rộng.\n• Microservice: Kiến trúc chia nhỏ ứng dụng thành các service độc lập.\n• System outage: Toàn hệ thống ngừng hoạt động — tình huống tệ nhất cần tránh bằng mọi giá."
	},
	{
		text: "Our AML system detected structuring behavior in seventy-three accounts and filed suspicious activity reports.",
		hint: "Hệ thống AML của chúng ta phát hiện hành vi chia nhỏ giao dịch ở 73 tài khoản và nộp báo cáo hoạt động đáng ngờ.",
		explanation: "Chống rửa tiền:\n• AML: Anti-Money Laundering — hệ thống phát hiện và ngăn chặn rửa tiền.\n• Structuring behavior: Hành vi chia nhỏ giao dịch cố ý để tránh ngưỡng báo cáo bắt buộc (thường $10,000).\n• Suspicious activity report (SAR): Báo cáo hoạt động đáng ngờ — phải nộp cho cơ quan quản lý khi phát hiện dấu hiệu rửa tiền."
	},
	{
		text: "The merchant conversion rate improved by sixteen percentage points after we simplified the KYC onboarding flow.",
		hint: "Tỷ lệ chuyển đổi merchant cải thiện 16 điểm phần trăm sau khi chúng ta đơn giản hóa quy trình KYC onboarding.",
		explanation: "Growth metrics:\n• Conversion rate: Tỷ lệ người dùng hoàn thành hành động mong muốn (đăng ký, mua hàng...).\n• Percentage points (pp): Điểm phần trăm — đơn vị đo sự thay đổi giữa hai tỷ lệ phần trăm.\n• KYC onboarding flow: Quy trình tiếp nhận khách hàng mới, bao gồm xác minh danh tính."
	},
	{
		text: "Funds deposited into the escrow account will be released only after both parties confirm successful delivery.",
		hint: "Tiền được nạp vào tài khoản ký quỹ sẽ chỉ được giải phóng sau khi cả hai bên xác nhận giao hàng thành công.",
		explanation: "Thanh toán B2B:\n• Escrow account: Tài khoản ký quỹ — tiền được giữ bởi bên thứ 3 trung lập.\n• Both parties: Cả hai bên — người mua và người bán cùng phải đồng ý.\n• Successful delivery: Giao hàng thành công — điều kiện để giải phóng tiền từ escrow."
	},
	{
		text: "The engineering team executed a rollback within eight minutes, restoring normal payment processing operations.",
		hint: "Đội kỹ thuật đã thực hiện hoàn tác triển khai trong vòng tám phút, khôi phục hoạt động xử lý thanh toán bình thường.",
		explanation: "DevOps và vận hành:\n• Rollback: Quay lại phiên bản phần mềm trước đó khi phiên bản mới gặp lỗi nghiêm trọng.\n• Within eight minutes: Trong vòng 8 phút — thời gian phản ứng nhanh, thường được đo trong SLA.\n• Restoring operations: Khôi phục hoạt động — mục tiêu chính sau khi xử lý incident."
	},
	{
		text: "Our KPI dashboard now shows real-time settlement data and chargeback trends for all merchant partners.",
		hint: "Bảng KPI của chúng ta hiện hiển thị dữ liệu quyết toán thời gian thực và xu hướng hoàn tiền tranh chấp cho tất cả đối tác merchant.",
		explanation: "Quản lý hiệu suất:\n• KPI dashboard: Bảng điều khiển chỉ số hiệu suất then chốt — hiển thị trực quan dữ liệu quan trọng.\n• Real-time: Thời gian thực — dữ liệu được cập nhật ngay lập tức, không có độ trễ.\n• Chargeback trends: Xu hướng hoàn tiền tranh chấp — dữ liệu quan trọng để phát hiện vấn đề sớm."
	},
	{
		text: "The sandbox environment has been upgraded to mirror production traffic volumes for more realistic integration testing.",
		hint: "Môi trường thử nghiệm đã được nâng cấp để phản ánh khối lượng traffic thực tế cho việc kiểm thử tích hợp thực tế hơn.",
		explanation: "Phát triển phần mềm:\n• Sandbox environment: Môi trường giả lập an toàn để kiểm thử mà không ảnh hưởng production.\n• Mirror production: Sao chép môi trường thực — giúp phát hiện lỗi trước khi go-live.\n• Integration testing: Kiểm thử tích hợp — đảm bảo các hệ thống hoạt động đúng khi kết nối với nhau."
	},
	{
		text: "After tightening underwriting risk score thresholds, new non-performing loan formation decreased by thirty-five percent.",
		hint: "Sau khi siết chặt ngưỡng điểm rủi ro bảo lãnh, việc hình thành khoản vay không hiệu quả mới đã giảm 35%.",
		explanation: "Quản lý rủi ro tín dụng:\n• Underwriting: Quy trình đánh giá và phê duyệt khoản vay — ai cho vay, cho vay bao nhiêu.\n• Risk score thresholds: Ngưỡng điểm rủi ro — điểm tối thiểu để được chấp thuận.\n• Non-performing loan (NPL): Khoản vay không hiệu quả — quá hạn và không được thanh toán đúng hạn."
	},
	{
		text: "Our OKRs for this quarter are directly aligned with the company-level goal of achieving product-market fit in Vietnam.",
		hint: "OKR của chúng ta trong quý này được căn chỉnh trực tiếp với mục tiêu cấp công ty là đạt được product-market fit tại Việt Nam.",
		explanation: "Quản lý mục tiêu:\n• OKRs: Objectives and Key Results — khung quản lý mục tiêu phổ biến (Google, Intel, Grab...).\n• Aligned with: Được căn chỉnh với — OKR cấp team phải hỗ trợ OKR cấp công ty.\n• Product-market fit: Sự phù hợp giữa sản phẩm và nhu cầu thị trường — mục tiêu sống còn của startup."
	},
	{
		text: "The vendor's SLA was breached this month, entitling us to a fifteen percent service credit on the monthly invoice.",
		hint: "SLA của nhà cung cấp đã bị vi phạm tháng này, cho phép chúng ta được hưởng tín dụng dịch vụ 15% trên hóa đơn hàng tháng.",
		explanation: "Quản lý nhà cung cấp:\n• SLA breach: Vi phạm thỏa thuận mức dịch vụ — khi nhà cung cấp không đáp ứng cam kết.\n• Entitling: Cho phép hưởng quyền lợi — khi một điều kiện được thỏa mãn.\n• Service credit: Tín dụng dịch vụ — khoản bồi thường được khấu trừ vào hóa đơn tiếp theo."
	},
	{
		text: "The company bootstrapped for two years before raising Series A, which helped maintain a clean cap table.",
		hint: "Công ty tự lực trong hai năm trước khi gọi vốn Series A, điều này giúp duy trì bảng phân bổ cổ phần gọn gàng.",
		explanation: "Chiến lược gọi vốn:\n• Bootstrapped: Tự tài trợ hoạt động mà không cần vốn bên ngoài — kiểm soát cao hơn.\n• Clean cap table: Bảng cổ phần đơn giản, ít nhà đầu tư — dễ giao dịch M&A và gọi vốn sau này.\n• Raising Series A: Gọi vốn vòng Series A — thường là vòng đầu tiên từ VC chuyên nghiệp."
	},
	{
		text: "The agile sprint retrospective revealed that backlog grooming sessions need to happen more frequently to reduce scope creep.",
		hint: "Buổi tổng kết sprint agile cho thấy các buổi backlog grooming cần diễn ra thường xuyên hơn để giảm thiểu mở rộng phạm vi.",
		explanation: "Phương pháp Agile:\n• Sprint retrospective: Buổi họp cuối sprint để rút kinh nghiệm — what went well, what to improve.\n• Backlog grooming: Sắp xếp và làm rõ các công việc trong backlog trước sprint.\n• Scope creep: Phạm vi công việc tăng dần không kiểm soát — kẻ thù của mọi dự án phần mềm."
	},
	{
		text: "Collateral coverage of one point four times provides adequate buffer against default risk in our lending portfolio.",
		hint: "Mức bảo đảm tài sản thế chấp 1,4 lần cung cấp đệm đủ để chống lại rủi ro vỡ nợ trong danh mục cho vay.",
		explanation: "Rủi ro tín dụng:\n• Collateral coverage: Tỷ lệ bảo đảm — giá trị tài sản thế chấp so với giá trị khoản vay.\n• Buffer against default risk: Đệm bảo vệ trước rủi ro vỡ nợ — dự phòng khi borrower không trả được.\n• Lending portfolio: Danh mục cho vay — tập hợp tất cả các khoản vay đang có."
	},
	{
		text: "Accrued interest on overdue loans is calculated daily and added to the outstanding balance until repayment is made.",
		hint: "Lãi tích lũy trên các khoản vay quá hạn được tính hàng ngày và cộng vào số dư còn lại cho đến khi thanh toán.",
		explanation: "Kế toán cho vay:\n• Accrued interest: Lãi tích lũy — lãi đã phát sinh nhưng chưa được thanh toán.\n• Overdue loans: Khoản vay quá hạn — không được thanh toán đúng hạn.\n• Outstanding balance: Số dư còn lại — tổng số tiền gốc và lãi chưa được thanh toán."
	},
	{
		text: "Expanding the syndicate to include two more partner banks allows us to scale the lending portfolio without additional capital.",
		hint: "Mở rộng tổ hợp thêm hai ngân hàng đối tác cho phép chúng ta mở rộng danh mục cho vay mà không cần thêm vốn.",
		explanation: "Cấu trúc tài chính:\n• Syndicate: Tổ hợp tài chính — nhiều tổ chức cùng tham gia vào một thương vụ.\n• Partner banks: Ngân hàng đối tác — các tổ chức tài chính đồng tham gia cho vay.\n• Scale without additional capital: Mở rộng mà không cần vốn thêm — lợi thế cạnh tranh quan trọng."
	},
	{
		text: "The go-live checklist must be signed off by engineering, compliance, and operations before we can deploy to production.",
		hint: "Danh sách kiểm tra go-live phải được phê duyệt bởi kỹ thuật, tuân thủ và vận hành trước khi chúng ta có thể triển khai lên production.",
		explanation: "Quản trị triển khai:\n• Go-live checklist: Danh sách kiểm tra trước khi ra mắt — đảm bảo không bỏ sót hạng mục quan trọng.\n• Sign off: Ký duyệt, phê chuẩn — xác nhận rằng phần trách nhiệm của mình đã hoàn tất.\n• Deploy to production: Đưa code lên môi trường thực — bước cuối cùng và quan trọng nhất."
	},
	{
		text: "The risk scoring model assigns a score between zero and one thousand to every incoming transaction in real time.",
		hint: "Mô hình điểm rủi ro gán điểm từ 0 đến 1.000 cho mỗi giao dịch đến trong thời gian thực.",
		explanation: "Hệ thống phát hiện gian lận:\n• Risk scoring model: Mô hình chấm điểm rủi ro — tự động đánh giá mức độ nguy hiểm của giao dịch.\n• Assigns a score: Gán điểm số — kết quả đầu ra của mô hình ML.\n• Real time: Thời gian thực — quyết định phải được đưa ra trong mili giây khi giao dịch đang xử lý."
	},
	{
		text: "Our FX hedging program protected three point two million dollars in revenue from exchange rate volatility this quarter.",
		hint: "Chương trình phòng ngừa rủi ro tỷ giá của chúng ta đã bảo vệ 3,2 triệu đô la doanh thu khỏi biến động tỷ giá trong quý này.",
		explanation: "Quản lý rủi ro tài chính:\n• FX hedging program: Chương trình phòng ngừa rủi ro ngoại hối — dùng công cụ tài chính để khóa tỷ giá.\n• Protected revenue: Bảo vệ doanh thu — giữ doanh thu không bị ảnh hưởng bởi biến động tỷ giá.\n• Exchange rate volatility: Biến động tỷ giá — rủi ro lớn với công ty có doanh thu bằng ngoại tệ."
	},
	{
		text: "The product backlog contains over two hundred items, so regular grooming sessions are essential to maintain focus.",
		hint: "Danh sách công việc tồn đọng chứa hơn 200 hạng mục, vì vậy các buổi sắp xếp định kỳ rất cần thiết để duy trì sự tập trung.",
		explanation: "Quản lý sản phẩm Agile:\n• Product backlog: Danh sách tất cả công việc cần làm cho sản phẩm — sắp xếp theo độ ưu tiên.\n• Over two hundred items: Hơn 200 hạng mục — backlog lớn cần được quản lý chặt chẽ.\n• Regular grooming sessions: Buổi rà soát định kỳ — làm rõ, ước tính và sắp xếp lại ưu tiên backlog."
	},
	{
		text: "The momentum from our viral referral campaign drove a three hundred percent increase in new user sign-ups last month.",
		hint: "Đà phát triển từ chiến dịch giới thiệu lan truyền đã tạo ra mức tăng 300% trong số lượng người dùng mới đăng ký tháng trước.",
		explanation: "Tăng trưởng và marketing:\n• Momentum: Đà tăng trưởng — khi sản phẩm đang tăng trưởng nhanh và mạnh như một quả bóng lăn.\n• Viral referral campaign: Chiến dịch giới thiệu lan truyền — khách hàng cũ mời khách hàng mới.\n• Three hundred percent increase: Tăng 300% — mức tăng trưởng ấn tượng cần duy trì đà."
	},
	{
		text: "Perpetual bonds offer capital without diluting equity, but the coupon obligation continues indefinitely.",
		hint: "Trái phiếu vĩnh viễn cung cấp vốn mà không pha loãng cổ phần, nhưng nghĩa vụ trả lãi kéo dài vô thời hạn.",
		explanation: "Công cụ tài chính:\n• Perpetual bonds: Trái phiếu vĩnh viễn — không có ngày đáo hạn, trả lãi mãi mãi.\n• Without diluting equity: Không pha loãng cổ phần — lợi thế so với phát hành cổ phiếu mới.\n• Coupon obligation: Nghĩa vụ trả lãi coupon — khoản thanh toán định kỳ cho người nắm giữ trái phiếu."
	},
	{
		text: "Attrition in the sales team reached twenty percent this year, significantly impacting our revenue conversion pipeline.",
		hint: "Tỷ lệ nghỉ việc trong đội sales đạt 20% năm nay, ảnh hưởng đáng kể đến phễu chuyển đổi doanh thu.",
		explanation: "Quản lý nhân sự:\n• Attrition: Tỷ lệ nhân viên rời công ty tự nguyện — chỉ số sức khỏe nhân sự quan trọng.\n• Sales team: Đội kinh doanh — những người trực tiếp tạo ra doanh thu.\n• Revenue conversion pipeline: Phễu chuyển đổi doanh thu — từ lead đến deal đã ký."
	},
	{
		text: "Our iterative approach to product development means we ship improvements every two weeks based on user feedback.",
		hint: "Cách tiếp cận cải tiến liên tục trong phát triển sản phẩm của chúng ta có nghĩa là chúng ta ra mắt cải tiến mỗi hai tuần dựa trên phản hồi người dùng.",
		explanation: "Phương pháp phát triển sản phẩm:\n• Iterative approach: Phương pháp lặp lại — liên tục cải thiện qua nhiều vòng nhỏ thay vì một lần lớn.\n• Ship improvements: Ra mắt cải tiến — đưa tính năng mới hoặc sửa lỗi vào tay người dùng.\n• User feedback: Phản hồi người dùng — dữ liệu quan trọng nhất để quyết định cải tiến gì tiếp theo."
	},
	{
		text: "The arbitrage opportunity between two payment networks allowed merchants to reduce processing fees by up to forty percent.",
		hint: "Cơ hội kinh doanh chênh lệch giá giữa hai mạng thanh toán cho phép merchant giảm phí xử lý lên đến 40%.",
		explanation: "Kinh tế học thanh toán:\n• Arbitrage opportunity: Cơ hội kinh doanh chênh lệch — khai thác sự khác biệt giá giữa các thị trường.\n• Payment networks: Mạng thanh toán — Visa, Mastercard, JCB, UnionPay...\n• Processing fees: Phí xử lý giao dịch — chi phí mà merchant phải trả mỗi khi có giao dịch."
	},
	{
		text: "Headcount planning for next year must balance growth ambitions with the need to control our burn rate.",
		hint: "Kế hoạch nhân sự cho năm tới phải cân bằng giữa tham vọng tăng trưởng và nhu cầu kiểm soát tốc độ đốt tiền.",
		explanation: "Quản lý nguồn lực:\n• Headcount planning: Lập kế hoạch nhân sự — quyết định tuyển bao nhiêu người và vào thời điểm nào.\n• Growth ambitions: Tham vọng tăng trưởng — mục tiêu mở rộng về doanh thu, người dùng, thị trường.\n• Control burn rate: Kiểm soát tốc độ tiêu tiền — cân bằng giữa đầu tư tăng trưởng và bền vững tài chính."
	},
	{
		text: "The new deployment pipeline reduced our average release cycle from four weeks to just three days.",
		hint: "Pipeline triển khai mới đã rút ngắn chu kỳ phát hành trung bình từ bốn tuần xuống còn ba ngày.",
		explanation: "Kỹ thuật phần mềm:\n• Deployment pipeline: Quy trình tự động từ code đến production — build, test, deploy.\n• Release cycle: Chu kỳ phát hành — khoảng thời gian giữa các lần ra mắt phiên bản mới.\n• From four weeks to three days: Từ bốn tuần xuống ba ngày — cải tiến tốc độ đáng kể nhờ automation."
	},
	{
		text: "Partnership with the national payment switch requires our system to maintain latency below one hundred milliseconds.",
		hint: "Quan hệ đối tác với hệ thống thanh toán quốc gia yêu cầu hệ thống của chúng ta duy trì độ trễ dưới 100 mili giây.",
		explanation: "Kỹ thuật và partnership:\n• National payment switch: Hệ thống thanh toán quốc gia — cơ sở hạ tầng thanh toán trung tâm của một quốc gia.\n• Maintain latency below: Duy trì độ trễ dưới — cam kết hiệu suất kỹ thuật bắt buộc.\n• One hundred milliseconds: 100ms — ngưỡng độ trễ thông thường cho hệ thống thanh toán real-time."
	},
	{
		text: "A strong retention strategy is more cost-effective than acquiring new customers, especially in a competitive fintech market.",
		hint: "Chiến lược giữ chân khách hàng mạnh mẽ hiệu quả về chi phí hơn việc thu hút khách hàng mới, đặc biệt trong thị trường fintech cạnh tranh.",
		explanation: "Chiến lược tăng trưởng:\n• Retention strategy: Chiến lược giữ chân khách hàng — giữ user hiện tại thường rẻ hơn 5-7 lần so với tìm user mới.\n• Cost-effective: Hiệu quả về chi phí — đạt kết quả tốt với chi phí thấp hơn.\n• Competitive fintech market: Thị trường fintech cạnh tranh — nơi chi phí mua khách (CAC) ngày càng tăng."
	},
	{
		text: "The underwriting team will not approve any loan application with a risk score below five hundred under the new policy.",
		hint: "Đội bảo lãnh sẽ không phê duyệt bất kỳ đơn vay nào có điểm rủi ro dưới 500 theo chính sách mới.",
		explanation: "Chính sách tín dụng:\n• Underwriting team: Đội bảo lãnh tín dụng — người quyết định có cho vay hay không và với điều kiện gì.\n• Approve loan application: Phê duyệt đơn vay — quyết định cho phép giải ngân.\n• Risk score below five hundred: Điểm rủi ro dưới 500 — ngưỡng phân loại khách hàng rủi ro cao."
	},
	{
		text: "Benchmarking our chargeback rates against industry standards helps us identify improvement opportunities proactively.",
		hint: "So sánh tỷ lệ hoàn tiền tranh chấp của chúng ta với tiêu chuẩn ngành giúp chúng ta chủ động xác định cơ hội cải thiện.",
		explanation: "Phân tích hiệu suất:\n• Benchmarking: So sánh với tiêu chuẩn — đối chiếu hiệu suất với đối thủ hoặc chuẩn ngành.\n• Chargeback rates: Tỷ lệ hoàn tiền tranh chấp — chỉ số sức khỏe thanh toán quan trọng.\n• Proactively: Một cách chủ động — hành động trước khi vấn đề trở nên nghiêm trọng."
	},
	{
		text: "All accounts flagged by the AML system are placed on a temporary blacklist pending a manual compliance review.",
		hint: "Tất cả tài khoản bị hệ thống AML gắn cờ sẽ được đưa vào danh sách đen tạm thời chờ xem xét tuân thủ thủ công.",
		explanation: "Quy trình AML:\n• Flagged by the AML system: Bị hệ thống AML gắn cờ — được đánh dấu để xem xét thêm.\n• Temporary blacklist: Danh sách đen tạm thời — bị hạn chế giao dịch cho đến khi được làm rõ.\n• Manual compliance review: Xem xét tuân thủ thủ công — con người xem xét trường hợp mà AI không đủ tự tin."
	},
	{
		text: "The MVP launch allowed us to validate product-market fit with real users before committing to full development.",
		hint: "Việc ra mắt MVP cho phép chúng ta xác nhận sự phù hợp với thị trường với người dùng thực trước khi cam kết phát triển đầy đủ.",
		explanation: "Phát triển sản phẩm:\n• MVP launch: Ra mắt sản phẩm khả dụng tối thiểu — phiên bản đơn giản nhất để test ý tưởng.\n• Validate product-market fit: Xác nhận sự phù hợp với thị trường — kiểm chứng xem người dùng có thực sự cần sản phẩm không.\n• Committing to full development: Cam kết phát triển đầy đủ — đầu tư lớn hơn sau khi đã có bằng chứng."
	},
	{
		text: "Our scalable microservice architecture supports automatic horizontal scaling during transaction volume peaks.",
		hint: "Kiến trúc microservice có thể mở rộng của chúng ta hỗ trợ mở rộng ngang tự động trong các đợt cao điểm khối lượng giao dịch.",
		explanation: "Kiến trúc cloud:\n• Scalable microservice architecture: Kiến trúc vi dịch vụ có thể mở rộng — nền tảng của mọi fintech hiện đại.\n• Automatic horizontal scaling: Tự động mở rộng ngang — thêm server khi traffic tăng, giảm khi traffic giảm.\n• Transaction volume peaks: Đỉnh khối lượng giao dịch — giờ cao điểm khi hệ thống phải xử lý nhiều nhất."
	},
	{
		text: "Negotiating payment terms with suppliers can improve cash flow by extending payables without damaging relationships.",
		hint: "Đàm phán điều khoản thanh toán với nhà cung cấp có thể cải thiện dòng tiền bằng cách kéo dài khoản phải trả mà không làm tổn hại đến mối quan hệ.",
		explanation: "Quản lý dòng tiền:\n• Negotiating payment terms: Đàm phán điều khoản thanh toán — khi nào và bao nhiêu phải trả.\n• Improve cash flow: Cải thiện dòng tiền — giữ tiền mặt trong công ty lâu hơn.\n• Extending payables: Kéo dài khoản phải trả — thanh toán muộn hơn cho supplier."
	},
	{
		text: "The embedded lending MVP generated 1.8 million dollars in loan originations with an NPL rate well below our risk appetite.",
		hint: "MVP cho vay tích hợp tạo ra 1,8 triệu đô la giải ngân với tỷ lệ nợ xấu thấp hơn nhiều so với khẩu vị rủi ro của chúng ta.",
		explanation: "Fintech lending:\n• Embedded lending MVP: Tính năng cho vay nhúng ở giai đoạn thử nghiệm tối thiểu — tích hợp vào sản phẩm chính.\n• Loan originations: Tổng giá trị khoản vay được giải ngân — chỉ số quan trọng của business lending.\n• NPL rate: Tỷ lệ nợ xấu — khoản vay không được trả đúng hạn, cần giữ dưới ngưỡng risk appetite."
	},
	{
		text: "Encryption key rotation must be completed by November 30th to maintain PCI DSS compliance across all payment integrations.",
		hint: "Việc xoay khóa mã hóa phải được hoàn thành trước ngày 30/11 để duy trì tuân thủ PCI DSS trên tất cả tích hợp thanh toán.",
		explanation: "Bảo mật và tuân thủ:\n• Encryption key rotation: Xoay khóa mã hóa — thay thế khóa cũ bằng khóa mới theo lịch định kỳ.\n• PCI DSS compliance: Tuân thủ tiêu chuẩn bảo mật dữ liệu thẻ thanh toán — bắt buộc cho mọi fintech.\n• Payment integrations: Các tích hợp thanh toán — mọi kết nối với hệ thống bên ngoài xử lý dữ liệu thẻ."
	},
	{
		text: "The three-month runway extension from cost optimization gives us enough time to close the Series B funding round.",
		hint: "Việc gia hạn ba tháng từ tối ưu chi phí cho chúng ta đủ thời gian để hoàn tất vòng gọi vốn Series B.",
		explanation: "Quản lý tài chính startup:\n• Runway extension: Gia hạn thời gian tồn tại — kéo dài số tháng công ty còn tiền hoạt động.\n• Cost optimization: Tối ưu chi phí — giảm burn rate mà không ảnh hưởng velocity sản phẩm.\n• Close the Series B: Hoàn tất vòng Series B — ký kết và nhận tiền từ nhà đầu tư."
	},
	{
		text: "Benchmarking our API latency against the ASEAN peer group shows we need to close a gap of seventy-seven milliseconds.",
		hint: "So sánh độ trễ API của chúng ta với nhóm đồng nghiệp ASEAN cho thấy chúng ta cần thu hẹp khoảng cách 77 mili giây.",
		explanation: "Hiệu suất kỹ thuật:\n• Benchmarking: So sánh hiệu suất — đối chiếu với đối thủ hoặc chuẩn ngành.\n• API latency: Độ trễ API — thời gian hệ thống phản hồi một yêu cầu.\n• Close a gap: Thu hẹp khoảng cách — cải thiện để đạt mức của đối thủ tốt nhất."
	},
	{
		text: "The syndicate lending program allows us to originate one hundred million dollars in SME loans without proportional capital increases.",
		hint: "Chương trình cho vay tổ hợp cho phép chúng ta giải ngân 100 triệu đô la khoản vay SME mà không cần tăng vốn tương ứng.",
		explanation: "Cấu trúc tài chính:\n• Syndicate lending program: Chương trình cho vay tổ hợp — nhiều tổ chức cùng tài trợ một danh mục.\n• Originate loans: Giải ngân khoản vay — thực hiện cho vay ban đầu trước khi có thể bán/syndicate.\n• Without proportional capital increases: Không cần tăng vốn tương ứng — mô hình capital-light cho phép scale nhanh."
	},
	{
		text: "Our cap table has been restructured to include an expanded employee stock option pool ahead of the Series B close.",
		hint: "Bảng phân bổ cổ phần của chúng ta đã được cơ cấu lại để bao gồm quỹ quyền chọn cổ phiếu nhân viên mở rộng trước khi vòng Series B hoàn tất.",
		explanation: "Cổ phần và đầu tư:\n• Cap table restructured: Bảng cổ phần được cơ cấu lại — điều chỉnh tỷ lệ sở hữu của các bên.\n• Employee stock option pool (ESOP): Quỹ quyền chọn cổ phiếu cho nhân viên — công cụ thu hút và giữ chân nhân tài.\n• Ahead of the Series B close: Trước khi vòng Series B hoàn tất — thường phải cơ cấu lại cap table trước khi nhà đầu tư mới vào."
	}
];
var formatTime = (secs) => {
	return `${String(Math.floor(secs / 60)).padStart(2, "0")}:${String(secs % 60).padStart(2, "0")}`;
};
var parseVocabPaste = (text) => {
	let cat = "Mới thêm";
	const catMatch = text.match(/\d+\.\s*([^\n(\r]+)/);
	if (catMatch) cat = catMatch[1].trim();
	const blocks = text.split(/\n[ \t]*\n/);
	const blockResults = [];
	for (const block of blocks) {
		const lines = block.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
		if (lines.length === 0) continue;
		const firstLine = lines[0];
		const ipaMatch = firstLine.match(/\/[^/]+\//);
		if (!ipaMatch) continue;
		const ipaIndex = firstLine.indexOf(ipaMatch[0]);
		const beforeIpa = firstLine.substring(0, ipaIndex).trim();
		const afterIpa = firstLine.substring(ipaIndex + ipaMatch[0].length).trim();
		const wordMatch = beforeIpa.match(/^[\d\s]*([A-Za-z][a-zA-Z\s]{0,30}?)\s*$/);
		if (!wordMatch) continue;
		const word = wordMatch[1].trim();
		if (!word) continue;
		const viRaw = afterIpa.replace(/^\s*\([^)]+\)\s*[-–]?\s*/, "").replace(/^\s*[-–]\s*/, "").trim();
		const enSentenceIdx = viRaw.search(/[A-Z][^.!?]{4,}[.!?]/);
		const vi = enSentenceIdx > 0 ? viRaw.substring(0, enSentenceIdx).trim() : viRaw;
		let ex = "";
		for (let i = 1; i < lines.length; i++) {
			const exMatch = lines[i].match(/^(?:Ví dụ|Example|Ex)[:\s]+(.+)/i);
			if (exMatch) {
				ex = exMatch[1].trim();
				break;
			}
			if (!ex && /^[A-Z]/.test(lines[i]) && !/^[A-ZĐẮẶẦ]/.test(lines[i].replace(/[A-Za-z]/g, ""))) ex = lines[i];
		}
		if (!ex && enSentenceIdx > 0) ex = viRaw.substring(enSentenceIdx).trim();
		blockResults.push({
			cat,
			word,
			ipa: ipaMatch[0].trim(),
			vi,
			ex,
			hint: ""
		});
	}
	if (blockResults.length > 0) return blockResults;
	const results = [];
	const lines = text.split(/\r?\n/);
	for (const line of lines) {
		if (!line.trim() || line.match(/^STT|^Từ vựng/i)) continue;
		const ipaMatch = line.match(/\/[^/]+\//);
		if (!ipaMatch) continue;
		const ipaIndex = line.indexOf(ipaMatch[0]);
		const beforeIpa = line.substring(0, ipaIndex);
		const afterIpa = line.substring(ipaIndex + ipaMatch[0].length).trim();
		const wordMatch = beforeIpa.match(/\d+\s*([A-Za-z][a-zA-Z\s]{0,30}?)\s*$/);
		if (!wordMatch) continue;
		const word = wordMatch[1].trim();
		if (!word) continue;
		const exMatch = afterIpa.match(/([A-Z][^.!?]*[.!?])/);
		const viText = exMatch ? afterIpa.substring(0, afterIpa.indexOf(exMatch[0])).trim() : afterIpa.trim();
		const exText = exMatch ? exMatch[0].trim() : "";
		results.push({
			cat,
			word,
			ipa: ipaMatch[0].trim(),
			vi: viText,
			ex: exText,
			hint: ""
		});
	}
	return results;
};
function App() {
	const [activeModule, setActiveModule] = (0, import_react.useState)(() => {
		const modules = [
			"vocab",
			"listen",
			"speak",
			"read",
			"write"
		];
		return modules[Math.floor(Math.random() * modules.length)];
	});
	const [toastMsg, setToastMsg] = (0, import_react.useState)("");
	const [allVocab, setAllVocab] = (0, import_react.useState)(() => {
		try {
			const extra = JSON.parse(localStorage.getItem("extraVocab") || "[]");
			const base = [...vocabData];
			const seen = new Set(base.map((v) => v.word.toLowerCase()));
			for (const item of extra) if (!seen.has(item.word.toLowerCase())) {
				base.push(item);
				seen.add(item.word.toLowerCase());
			}
			return base;
		} catch {
			return [...vocabData];
		}
	});
	const [writingData, setWritingData] = (0, import_react.useState)(() => {
		try {
			const safe = JSON.parse(localStorage.getItem("extraWritingData") || "[]").filter((r) => r && typeof r.title === "string" && typeof r.context === "string" && typeof r.task === "string");
			return [...initialWritingData, ...safe];
		} catch {
			return [...initialWritingData];
		}
	});
	const [speakingData, setSpeakingData] = (0, import_react.useState)(() => {
		try {
			const safe = JSON.parse(localStorage.getItem("extraSpeakingData") || "[]").filter((r) => r && typeof r.title === "string" && typeof r.context === "string" && typeof r.role === "string");
			return [...initialSpeakingData, ...safe];
		} catch {
			return [...initialSpeakingData];
		}
	});
	const [isGeneratingNew, setIsGeneratingNew] = (0, import_react.useState)(false);
	const [allListeningData, setAllListeningData] = (0, import_react.useState)(() => {
		try {
			const safe = JSON.parse(localStorage.getItem("extraListeningData") || "[]").filter((r) => r && typeof r.text === "string");
			return [...listeningDataBase, ...safe];
		} catch {
			return [...listeningDataBase];
		}
	});
	const [allRunningPlaylist, setAllRunningPlaylist] = (0, import_react.useState)(() => {
		try {
			const safe = JSON.parse(localStorage.getItem("extraRunningPlaylist") || "[]").filter((r) => r && typeof r.en === "string");
			return [...runningPlaylistBase, ...safe];
		} catch {
			return [...runningPlaylistBase];
		}
	});
	const [allReadingData, setAllReadingData] = (0, import_react.useState)(() => {
		try {
			const safe = JSON.parse(localStorage.getItem("extraReadingData") || "[]").filter((r) => r && typeof r.title === "string" && typeof r.content === "string").map((r) => ({
				...r,
				options: Array.isArray(r.options) && r.options.length >= 2 ? r.options : [
					"A",
					"B",
					"C",
					"D"
				],
				answerIdx: typeof r.answerIdx === "number" ? r.answerIdx : 0,
				explanation: r.explanation || "",
				sampleSentence: r.sampleSentence || "",
				question: r.question || "What is the main topic?",
				visualType: r.visualType || "dashboardAlert"
			}));
			return [...readingData, ...safe];
		} catch {
			return [...readingData];
		}
	});
	const [injectProgress, setInjectProgress] = (0, import_react.useState)(null);
	const allRunningPlaylistRef = (0, import_react.useRef)([]);
	const [showAddVocab, setShowAddVocab] = (0, import_react.useState)(false);
	const [addVocabText, setAddVocabText] = (0, import_react.useState)("");
	const [parsedPreview, setParsedPreview] = (0, import_react.useState)(null);
	function showToast(msg) {
		setToastMsg(msg);
		setTimeout(() => setToastMsg(""), 3e3);
	}
	function handleRandomModule() {
		const modules = [
			"vocab",
			"listen",
			"speak",
			"read",
			"write"
		];
		const random = modules[Math.floor(Math.random() * modules.length)];
		setActiveModule(random);
		showToast(`Đã chuyển sang ngẫu nhiên: ${random.toUpperCase()}`);
	}
	function playAudio(text) {
		if ("speechSynthesis" in window) {
			window.speechSynthesis.cancel();
			const msg = new SpeechSynthesisUtterance(text);
			msg.lang = "en-US";
			msg.rate = .9;
			window.speechSynthesis.speak(msg);
		} else showToast("Trình duyệt không hỗ trợ phát âm.");
	}
	function formatAIResponse(text) {
		return text.split("\n").map((line, i) => {
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-2",
				children: line.split(/(\*\*.*?\*\*)/g).map((part, j) => {
					if (part.startsWith("**") && part.endsWith("**")) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
						className: "text-white font-bold",
						children: part.slice(2, -2)
					}, j);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: part }, j);
				})
			}, i);
		});
	}
	function handleParseVocab() {
		const parsed = parseVocabPaste(addVocabText);
		if (parsed.length === 0) showToast("Không tìm thấy từ nào. Kiểm tra format có IPA /.../ không?");
		setParsedPreview(parsed);
	}
	async function injectVocabIntoSkills(newItems) {
		const wordsWithEx = newItems.filter((v) => v.ex);
		const listenStartIdx = allListeningData.length;
		const readStartIdx = allReadingData.length;
		const speakStartIdx = speakingData.length;
		const writeStartIdx = writingData.length;
		if (wordsWithEx.length > 0) {
			const newListening = wordsWithEx.map((item) => ({
				text: item.ex,
				hint: item.vi,
				explanation: `• ${item.word} ${item.ipa}: ${item.vi}\nVí dụ: "${item.ex}"`
			}));
			const prev = JSON.parse(localStorage.getItem("extraListeningData") || "[]");
			localStorage.setItem("extraListeningData", JSON.stringify([...prev, ...newListening]));
			setAllListeningData((p) => [...p, ...newListening]);
			setListenIdx(listenStartIdx);
			setListenInput("");
			setShowListenAnswer(false);
			setInjectProgress((p) => ({
				...p,
				listen: `✅ Nghe: +${newListening.length} câu mới`
			}));
		}
		if (wordsWithEx.length > 0) {
			const prevRun = JSON.parse(localStorage.getItem("extraRunningPlaylist") || "[]");
			const nextId = runningPlaylistBase.length + prevRun.length + 1;
			const newRunning = wordsWithEx.map((item, i) => ({
				id: nextId + i,
				en: item.ex,
				vi: item.vi
			}));
			localStorage.setItem("extraRunningPlaylist", JSON.stringify([...prevRun, ...newRunning]));
			setAllRunningPlaylist((p) => [...p, ...newRunning]);
			setInjectProgress((p) => ({
				...p,
				running: `✅ Chạy bộ: +${newRunning.length} câu mới`
			}));
		}
		const vocabForPrompt = newItems.map((v) => `"${v.word}" (${v.vi}${v.ex ? ` — ví dụ: ${v.ex}` : ""})`).join("; ");
		const [readRes, speakRes, writeRes] = await Promise.allSettled([
			geminiJSON(`You are a Business English teacher. Create a reading comprehension exercise where the passage MUST naturally use these vocabulary words: ${vocabForPrompt}.
The passage should be a realistic business memo/email (3-5 sentences) that incorporates the words above.
Reply with ONLY valid JSON (no markdown, no code block):
{"title":"memo title","content":"passage using the vocab words","question":"comprehension question about the passage","options":["A: ...","B: ...","C: ...","D: ..."],"answerIdx":1,"explanation":"Giải thích bằng tiếng Việt tại sao đáp án đúng, highlight từ vựng liên quan","sampleSentence":"1 câu ví dụ dùng từ vựng chính","visualType":"dashboardAlert"}`),
			geminiJSON(`Bạn là giáo viên tiếng Anh thương mại. Tạo 1 tình huống giao tiếp (role-play) yêu cầu người học PHẢI dùng các từ vựng sau trong câu trả lời: ${vocabForPrompt}.
Chỉ trả về JSON hợp lệ (không markdown, không code block):
{"title":"Tên tình huống (5-7 từ)","context":"Mô tả bối cảnh tình huống bằng tiếng Việt (2-3 câu), đề cập tới các từ vựng cần dùng","role":"Nhiệm vụ cụ thể của người học bằng tiếng Việt, yêu cầu dùng các từ vựng trên","visualType":"videoCall"}`),
			geminiJSON(`Bạn là giáo viên tiếng Anh thương mại. Tạo 1 tình huống viết email yêu cầu người học PHẢI dùng các từ vựng sau trong email: ${vocabForPrompt}.
Chỉ trả về JSON hợp lệ (không markdown, không code block):
{"title":"Tên tình huống (5-7 từ)","context":"Mô tả bối cảnh bằng tiếng Việt (2-3 câu), đề cập từ vựng cần dùng","task":"Yêu cầu viết email cụ thể bằng tiếng Việt, nêu rõ phải dùng từ nào","visualType":"invoice"}`)
		]);
		if (readRes.status === "fulfilled") try {
			const r = readRes.value;
			if (!Array.isArray(r.options) || r.options.length < 2) r.options = [
				"Option A",
				"Option B",
				"Option C",
				"Option D"
			];
			if (typeof r.answerIdx !== "number") r.answerIdx = 0;
			const prev = JSON.parse(localStorage.getItem("extraReadingData") || "[]");
			localStorage.setItem("extraReadingData", JSON.stringify([...prev, r]));
			setAllReadingData((p) => [...p, r]);
			setReadIdx(readStartIdx);
			setReadAnswered(null);
			setInjectProgress((p) => ({
				...p,
				read: "✅ Đọc hiểu: Đã tạo bài mới"
			}));
		} catch (e) {
			setInjectProgress((p) => ({
				...p,
				read: `❌ Đọc hiểu: parse lỗi — ${e.message}`
			}));
		}
		else setInjectProgress((p) => ({
			...p,
			read: `❌ Đọc hiểu: ${readRes.reason?.message || "Lỗi API"}`
		}));
		if (speakRes.status === "fulfilled") try {
			const r = speakRes.value;
			const prev = JSON.parse(localStorage.getItem("extraSpeakingData") || "[]");
			localStorage.setItem("extraSpeakingData", JSON.stringify([...prev, r]));
			setSpeakingData((p) => [...p, r]);
			setSpeakIdx(speakStartIdx);
			setSpeakTranscript("");
			setSpeakFeedback(null);
			setInjectProgress((p) => ({
				...p,
				speak: "✅ Nói: Đã tạo tình huống mới"
			}));
		} catch (e) {
			setInjectProgress((p) => ({
				...p,
				speak: `❌ Nói: ${e.message}`
			}));
		}
		else setInjectProgress((p) => ({
			...p,
			speak: `❌ Nói: ${speakRes.reason?.message || "Lỗi API"}`
		}));
		if (writeRes.status === "fulfilled") try {
			const r = writeRes.value;
			const prev = JSON.parse(localStorage.getItem("extraWritingData") || "[]");
			localStorage.setItem("extraWritingData", JSON.stringify([...prev, r]));
			setWritingData((p) => [...p, r]);
			setWriteIdx(writeStartIdx);
			setWriteInput("");
			setWriteFeedback(null);
			setInjectProgress((p) => ({
				...p,
				write: "✅ Viết: Đã tạo tình huống mới"
			}));
		} catch (e) {
			setInjectProgress((p) => ({
				...p,
				write: `❌ Viết: ${e.message}`
			}));
		}
		else setInjectProgress((p) => ({
			...p,
			write: `❌ Viết: ${writeRes.reason?.message || "Lỗi API"}`
		}));
	}
	async function handleConfirmAddVocab() {
		if (!parsedPreview || parsedPreview.length === 0) return;
		const existing = new Set(allVocab.map((v) => v.word.toLowerCase()));
		const newItems = parsedPreview.filter((v) => !existing.has(v.word.toLowerCase()));
		const skipped = parsedPreview.length - newItems.length;
		if (newItems.length > 0) {
			try {
				const currentExtra = JSON.parse(localStorage.getItem("extraVocab") || "[]");
				localStorage.setItem("extraVocab", JSON.stringify([...currentExtra, ...newItems]));
			} catch {}
			setAllVocab((prev) => [...prev, ...newItems]);
		}
		const wordsWithEx = newItems.filter((v) => v.ex);
		setInjectProgress({
			vocab: `✅ Vocab: +${newItems.length} từ${skipped > 0 ? ` (bỏ ${skipped} trùng)` : ""}`,
			listen: wordsWithEx.length > 0 ? "⏳ Nghe: đang thêm..." : null,
			running: wordsWithEx.length > 0 ? "⏳ Chạy bộ: đang thêm..." : null,
			read: newItems.length > 0 ? "⏳ Đọc hiểu: Gemini đang tạo..." : null,
			speak: newItems.length > 0 ? "⏳ Nói: Gemini đang tạo..." : null,
			write: newItems.length > 0 ? "⏳ Viết: Gemini đang tạo..." : null
		});
		setParsedPreview(null);
		setAddVocabText("");
		if (newItems.length > 0) await injectVocabIntoSkills(newItems);
	}
	const [vocabMode, setVocabMode] = (0, import_react.useState)("flashcard");
	const [cardIdx, setCardIdx] = (0, import_react.useState)(0);
	const [isFlipped, setIsFlipped] = (0, import_react.useState)(false);
	const [showHint, setShowHint] = (0, import_react.useState)(false);
	const [quizScore, setQuizScore] = (0, import_react.useState)(0);
	const [quizOptions, setQuizOptions] = (0, import_react.useState)([]);
	const [quizAnswered, setQuizAnswered] = (0, import_react.useState)(null);
	function generateQuiz() {
		let options = [allVocab[cardIdx].word];
		let attempts = 0;
		while (options.length < 4 && attempts < 50) {
			const randomWord = allVocab[Math.floor(Math.random() * allVocab.length)].word;
			if (!options.includes(randomWord)) options.push(randomWord);
			attempts++;
		}
		setQuizOptions(options.sort(() => Math.random() - .5));
		setQuizAnswered(null);
	}
	(0, import_react.useEffect)(() => {
		if (activeModule === "vocab" && vocabMode === "quiz") generateQuiz();
	}, [
		cardIdx,
		activeModule,
		vocabMode
	]);
	function handleQuizAnswer(selected) {
		if (quizAnswered) return;
		setQuizAnswered(selected);
		if (selected === allVocab[cardIdx].word) setQuizScore((prev) => prev + 1);
	}
	const [listenTabMode, setListenTabMode] = (0, import_react.useState)("dictation");
	const [listenIdx, setListenIdx] = (0, import_react.useState)(() => {
		try {
			const saved = localStorage.getItem("lastListenIdx");
			if (saved !== null) {
				const extra = JSON.parse(localStorage.getItem("extraListeningData") || "[]");
				const max = listeningDataBase.length + extra.length - 1;
				const n = parseInt(saved, 10);
				return Math.min(isNaN(n) ? 0 : n, max);
			}
			const extra = JSON.parse(localStorage.getItem("extraListeningData") || "[]");
			return extra.length > 0 ? listeningDataBase.length + extra.length - 1 : 0;
		} catch {
			return 0;
		}
	});
	const [listenInput, setListenInput] = (0, import_react.useState)("");
	const [showListenAnswer, setShowListenAnswer] = (0, import_react.useState)(false);
	const [runIdx, setRunIdx] = (0, import_react.useState)(0);
	const [runPlaying, setRunPlaying] = (0, import_react.useState)(false);
	const [runSeconds, setRunSeconds] = (0, import_react.useState)(0);
	const [runFinished, setRunFinished] = (0, import_react.useState)(false);
	const runTimerRef = (0, import_react.useRef)(null);
	const runSpeakTimeoutRef = (0, import_react.useRef)(null);
	const runIdxRef = (0, import_react.useRef)(0);
	function speakAndAdvance(idx) {
		const playlist = allRunningPlaylistRef.current;
		if (idx >= playlist.length) {
			setRunPlaying(false);
			setRunFinished(true);
			clearInterval(runTimerRef.current);
			return;
		}
		const utterance = new SpeechSynthesisUtterance(playlist[idx].en);
		utterance.rate = .85;
		utterance.lang = "en-US";
		utterance.onend = () => {
			runSpeakTimeoutRef.current = setTimeout(() => {
				const next = runIdxRef.current + 1;
				runIdxRef.current = next;
				setRunIdx(next);
				speakAndAdvance(next);
			}, 5e3);
		};
		window.speechSynthesis.speak(utterance);
	}
	function handleRunPlay() {
		if (runFinished) {
			runIdxRef.current = 0;
			setRunIdx(0);
			setRunSeconds(0);
			setRunFinished(false);
		}
		setRunPlaying(true);
		runTimerRef.current = setInterval(() => setRunSeconds((s) => s + 1), 1e3);
		speakAndAdvance(runIdxRef.current);
	}
	function handleRunPause() {
		setRunPlaying(false);
		window.speechSynthesis.cancel();
		clearTimeout(runSpeakTimeoutRef.current);
		clearInterval(runTimerRef.current);
	}
	function handleRunSkip() {
		window.speechSynthesis.cancel();
		clearTimeout(runSpeakTimeoutRef.current);
		const next = runIdxRef.current + 1;
		runIdxRef.current = next;
		setRunIdx(next);
		if (runPlaying) speakAndAdvance(next);
	}
	function handleRunStop() {
		window.speechSynthesis.cancel();
		clearTimeout(runSpeakTimeoutRef.current);
		clearInterval(runTimerRef.current);
		setRunPlaying(false);
		runIdxRef.current = 0;
		setRunIdx(0);
		setRunSeconds(0);
		setRunFinished(false);
	}
	(0, import_react.useEffect)(() => {
		allRunningPlaylistRef.current = allRunningPlaylist;
	}, [allRunningPlaylist]);
	(0, import_react.useEffect)(() => {
		localStorage.setItem("lastListenIdx", listenIdx);
	}, [listenIdx]);
	(0, import_react.useEffect)(() => {
		return () => {
			window.speechSynthesis.cancel();
			clearTimeout(runSpeakTimeoutRef.current);
			clearInterval(runTimerRef.current);
		};
	}, []);
	const [readIdx, setReadIdx] = (0, import_react.useState)(() => {
		try {
			const saved = localStorage.getItem("lastReadIdx");
			if (saved !== null) {
				const extra = JSON.parse(localStorage.getItem("extraReadingData") || "[]");
				const max = readingData.length + extra.length - 1;
				const n = parseInt(saved, 10);
				return Math.min(isNaN(n) ? 0 : n, max);
			}
			const extra = JSON.parse(localStorage.getItem("extraReadingData") || "[]");
			return extra.length > 0 ? readingData.length + extra.length - 1 : 0;
		} catch {
			return 0;
		}
	});
	const [readAnswered, setReadAnswered] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		localStorage.setItem("lastReadIdx", readIdx);
	}, [readIdx]);
	const [speakIdx, setSpeakIdx] = (0, import_react.useState)(() => {
		try {
			const saved = localStorage.getItem("lastSpeakIdx");
			if (saved !== null) {
				const extra = JSON.parse(localStorage.getItem("extraSpeakingData") || "[]");
				const max = initialSpeakingData.length + extra.length - 1;
				const n = parseInt(saved, 10);
				return Math.min(isNaN(n) ? 0 : n, max);
			}
			const extra = JSON.parse(localStorage.getItem("extraSpeakingData") || "[]");
			return extra.length > 0 ? initialSpeakingData.length + extra.length - 1 : 0;
		} catch {
			return 0;
		}
	});
	(0, import_react.useEffect)(() => {
		localStorage.setItem("lastSpeakIdx", speakIdx);
	}, [speakIdx]);
	const [speakTranscript, setSpeakTranscript] = (0, import_react.useState)("");
	const [isRecording, setIsRecording] = (0, import_react.useState)(false);
	const [isSpeakingGrading, setIsSpeakingGrading] = (0, import_react.useState)(false);
	const [speakFeedback, setSpeakFeedback] = (0, import_react.useState)(null);
	const recognitionRef = (0, import_react.useRef)(null);
	function toggleRecording() {
		const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
		if (!SpeechRecognition) {
			showToast("Trình duyệt không hỗ trợ Mic. Anh gõ tạm nhé!");
			return;
		}
		if (isRecording) {
			recognitionRef.current?.stop();
			setIsRecording(false);
		} else {
			setSpeakTranscript("");
			setSpeakFeedback(null);
			recognitionRef.current = new SpeechRecognition();
			recognitionRef.current.lang = "en-US";
			recognitionRef.current.interimResults = true;
			recognitionRef.current.continuous = false;
			recognitionRef.current.onstart = () => setIsRecording(true);
			recognitionRef.current.onend = () => setIsRecording(false);
			recognitionRef.current.onresult = (event) => {
				setSpeakTranscript(Array.from(event.results).map((r) => r[0].transcript).join(""));
			};
			recognitionRef.current.start();
		}
	}
	async function handleGradeSpeaking() {
		if (!speakTranscript.trim()) {
			showToast("Anh chưa thu âm!");
			return;
		}
		setIsSpeakingGrading(true);
		setSpeakFeedback(null);
		try {
			const prompt = `Act as an expert Business English Coach evaluated spoken responses.
Context: ${speakingData[speakIdx].context}
User Role: ${speakingData[speakIdx].role}
User's spoken transcript: "${speakTranscript}"

Provide feedback in Vietnamese playing the role of a friendly female assistant named "Tiểu Nguyên".
Address the user as "anh" and use "em".
Format exactly like this:
Dạ anh, em Tiểu Nguyên đây. Về câu phản xạ của anh, em có vài nhận xét nha:
[1-2 sentences of friendly feedback]
Để mượt hơn và chuẩn sếp (Executive), anh nên nói thế này ạ:
**[Provide ONE polished, natural, executive-level English sentence to say in this situation]**`;
			const result = await (await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
			})).json();
			if (result.candidates?.[0]?.content) setSpeakFeedback(result.candidates[0].content.parts[0].text);
			else setSpeakFeedback("Hệ thống không thể chấm điểm lúc này. Anh thử lại sau nhé.");
		} catch {
			setSpeakFeedback("Dạ hệ thống AI đang bảo trì, anh thông cảm nhé!");
		}
		setIsSpeakingGrading(false);
	}
	async function handleGenerateSpeakingScenario() {
		setIsGeneratingNew(true);
		showToast("Tiểu Nguyên đang nghĩ tình huống giao tiếp mới...");
		try {
			const result = await (await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					contents: [{
						role: "user",
						parts: [{ text: `Tạo 1 tình huống giao tiếp (speaking) tiếng Anh thương mại về mảng Fintech/Business (khác với những cái đã có). Chỉ trả về JSON hợp lệ (không markdown):
{"title":"Tên tình huống (5-7 từ)","context":"Mô tả bối cảnh bằng tiếng Việt (2-3 câu)","role":"Nhiệm vụ người học bằng tiếng Việt","visualType":"videoCall"}` }]
					}],
					generationConfig: { responseMimeType: "application/json" }
				})
			})).json();
			if (result.candidates?.[0]?.content?.parts?.[0]?.text) {
				const newScenario = JSON.parse(result.candidates[0].content.parts[0].text);
				const prev = JSON.parse(localStorage.getItem("extraSpeakingData") || "[]");
				localStorage.setItem("extraSpeakingData", JSON.stringify([...prev, newScenario]));
				setSpeakingData((p) => [...p, newScenario]);
				setSpeakIdx(speakingData.length);
				setSpeakTranscript("");
				setSpeakFeedback(null);
				showToast("Đã tạo xong tình huống Giao Tiếp!");
			} else showToast("Có lỗi kết nối AI, anh thử lại nhé.");
		} catch {
			showToast("Có lỗi kết nối AI, anh thử lại nhé.");
		}
		setIsGeneratingNew(false);
	}
	const [writeIdx, setWriteIdx] = (0, import_react.useState)(() => {
		try {
			const saved = localStorage.getItem("lastWriteIdx");
			if (saved !== null) {
				const extra = JSON.parse(localStorage.getItem("extraWritingData") || "[]");
				const max = initialWritingData.length + extra.length - 1;
				const n = parseInt(saved, 10);
				return Math.min(isNaN(n) ? 0 : n, max);
			}
			const extra = JSON.parse(localStorage.getItem("extraWritingData") || "[]");
			return extra.length > 0 ? initialWritingData.length + extra.length - 1 : 0;
		} catch {
			return 0;
		}
	});
	(0, import_react.useEffect)(() => {
		localStorage.setItem("lastWriteIdx", writeIdx);
	}, [writeIdx]);
	const [writeInput, setWriteInput] = (0, import_react.useState)("");
	const [isGrading, setIsGrading] = (0, import_react.useState)(false);
	const [writeFeedback, setWriteFeedback] = (0, import_react.useState)(null);
	async function handleGradeWriting() {
		if (!writeInput.trim()) {
			showToast("Anh chưa nhập nội dung!");
			return;
		}
		setIsGrading(true);
		setWriteFeedback(null);
		try {
			const prompt = `Act as an expert Business English Coach.
Context: ${writingData[writeIdx].context}
Task: ${writingData[writeIdx].task}
User's Draft: "${writeInput}"

Provide feedback in Vietnamese acting as the assistant 'Tiểu Nguyên'.
Address user as 'anh' and use 'em'.
Format:
Dạ anh, em nhận được bản nháp rồi. Em xin phép góp ý:
1. **Đánh giá chung**: (Ưu/nhược điểm).
2. **Lỗi cần sửa**: (Lỗi ngữ pháp).
Bản sửa chuẩn Executive:
**[Provide full rewritten English text]**`;
			const result = await (await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
			})).json();
			if (result.candidates?.[0]?.content) setWriteFeedback(result.candidates[0].content.parts[0].text);
			else setWriteFeedback("Hệ thống lỗi. Vui lòng thử lại.");
		} catch {
			setWriteFeedback("Lỗi kết nối AI. Thử lại sau.");
		}
		setIsGrading(false);
	}
	async function handleGenerateWritingScenario() {
		setIsGeneratingNew(true);
		showToast("Tiểu Nguyên đang nghĩ chủ đề Email mới...");
		try {
			const result = await (await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					contents: [{
						role: "user",
						parts: [{ text: `Tạo 1 tình huống yêu cầu soạn email tiếng Anh thương mại về mảng Fintech/Business (khác với những cái đã có). Chỉ trả về JSON hợp lệ (không markdown):
{"title":"Tên tình huống (5-7 từ)","context":"Mô tả bối cảnh bằng tiếng Việt (2-3 câu)","task":"Yêu cầu viết email cụ thể bằng tiếng Việt","visualType":"invoice"}` }]
					}],
					generationConfig: { responseMimeType: "application/json" }
				})
			})).json();
			if (result.candidates?.[0]?.content?.parts?.[0]?.text) {
				const newScenario = JSON.parse(result.candidates[0].content.parts[0].text);
				const prev = JSON.parse(localStorage.getItem("extraWritingData") || "[]");
				localStorage.setItem("extraWritingData", JSON.stringify([...prev, newScenario]));
				setWritingData((p) => [...p, newScenario]);
				setWriteIdx(writingData.length);
				setWriteInput("");
				setWriteFeedback(null);
				showToast("Đã tạo xong tình huống Viết Email!");
			} else showToast("Có lỗi kết nối AI, anh thử lại nhé.");
		} catch {
			showToast("Có lỗi kết nối AI, anh thử lại nhé.");
		}
		setIsGeneratingNew(false);
	}
	function renderVocab() {
		if (!allVocab[cardIdx]) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex items-center justify-center h-full text-gray-400 text-sm",
			children: "Đang tải từ vựng..."
		});
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "animate-fade-in flex flex-col items-center justify-center h-full w-full max-w-lg mx-auto py-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex justify-between items-center w-full mb-3 shrink-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex bg-gray-100 p-1 rounded-xl border border-gray-200 flex-1 mr-3 shadow-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setVocabMode("flashcard"),
							className: `flex-1 py-1.5 rounded-lg text-sm font-semibold transition-all ${vocabMode === "flashcard" ? "bg-white text-blue-600 shadow" : "text-gray-500 hover:text-gray-800"}`,
							children: "Flashcard"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => {
								setVocabMode("quiz");
								setQuizScore(0);
							},
							className: `flex-1 py-1.5 rounded-lg text-sm font-semibold transition-all ${vocabMode === "quiz" ? "bg-white text-blue-600 shadow" : "text-gray-500 hover:text-gray-800"}`,
							children: "Quiz Test"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setShowAddVocab(true),
						className: "flex items-center gap-1 text-xs font-semibold text-blue-600 px-3 py-2 bg-blue-50 border border-blue-200 rounded-xl hover:bg-blue-100 transition shadow-sm shrink-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconPlus, {}), " Thêm từ"]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full flex justify-between items-end mb-2 shrink-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm font-bold text-gray-800",
						children: vocabMode === "flashcard" ? "Luyện Phản Xạ" : `Test Trí Nhớ (Điểm: ${quizScore})`
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded-md text-xs border border-blue-100",
						children: [
							cardIdx + 1,
							" / ",
							allVocab.length
						]
					})]
				}),
				vocabMode === "flashcard" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "w-full flex-1 min-h-[180px] cursor-pointer",
					style: { perspective: "1000px" },
					onClick: () => setIsFlipped(!isFlipped),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "w-full h-full relative transition-transform duration-500",
						style: {
							transformStyle: "preserve-3d",
							transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "absolute inset-0 bg-white border border-gray-200 rounded-3xl flex flex-col items-center justify-center p-4 hover:border-blue-300 shadow-md transition-colors",
							style: { backfaceVisibility: "hidden" },
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-bold uppercase text-gray-500 mb-2 bg-gray-100 px-2 py-0.5 rounded-full",
									children: allVocab[cardIdx].cat
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-2xl sm:text-3xl font-black text-gray-900 mb-1 text-center tracking-tight",
									children: allVocab[cardIdx].word
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-blue-500 font-mono mb-2",
									children: allVocab[cardIdx].ipa
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "absolute bottom-3 w-full px-4 flex justify-between items-center",
									onClick: (e) => e.stopPropagation(),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => setShowHint(!showHint),
										className: "text-xs font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded-lg flex items-center gap-1 hover:bg-amber-100 transition border border-amber-100",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconLightbulb, {}),
											" ",
											showHint ? "Ẩn gợi ý" : "Xem gợi ý"
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => playAudio(allVocab[cardIdx].word),
										className: "p-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-full transition-colors shadow-sm",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconPlay, {})
									})]
								}),
								showHint && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "absolute bottom-12 w-full px-4 text-center animate-fade-in",
									onClick: (e) => e.stopPropagation(),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-gray-600 bg-amber-50/50 p-2 rounded-xl border border-amber-100 italic font-medium",
										children: allVocab[cardIdx].hint
									})
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl flex flex-col items-center justify-center p-4 text-center shadow-lg",
							style: {
								backfaceVisibility: "hidden",
								transform: "rotateY(180deg)"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-xl font-bold text-white mb-3",
								children: allVocab[cardIdx].vi
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bg-white/10 backdrop-blur-sm p-3 rounded-2xl w-full text-left border border-white/20",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-blue-200 text-[10px] font-bold uppercase mb-1 tracking-wider",
									children: "Ví dụ"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-white font-medium text-sm leading-relaxed",
									children: [
										"\"",
										allVocab[cardIdx].ex,
										"\""
									]
								})]
							})]
						})]
					})
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full flex-1 flex flex-col bg-white border border-gray-200 rounded-3xl p-3 shadow-sm text-center overflow-y-auto min-h-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-gray-500 text-xs mb-1 font-medium shrink-0",
							children: "Chọn từ tiếng Anh có nghĩa là:"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
							className: "text-lg font-bold text-gray-900 mb-2 shrink-0",
							children: [
								"\"",
								allVocab[cardIdx].vi,
								"\""
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-1 gap-1.5 shrink-0",
							children: quizOptions.map((opt, i) => {
								let btnStyle = "bg-gray-50 hover:bg-blue-50 text-gray-800 hover:text-blue-700 border-gray-200 hover:border-blue-300";
								if (quizAnswered) if (opt === allVocab[cardIdx].word) btnStyle = "bg-green-100 border-green-500 text-green-800 shadow-sm font-bold";
								else if (opt === quizAnswered) btnStyle = "bg-red-100 border-red-400 text-red-800 shadow-sm";
								else btnStyle = "bg-gray-50 border-gray-200 text-gray-400 opacity-50";
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									disabled: quizAnswered !== null,
									onClick: () => handleQuizAnswer(opt),
									className: `py-2 rounded-xl transition-all border shadow-sm flex items-center justify-between px-3 text-xs ${btnStyle}`,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-semibold",
											children: opt
										}),
										quizAnswered && opt === allVocab[cardIdx].word && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconCheck, {}),
										quizAnswered && opt === quizAnswered && opt !== allVocab[cardIdx].word && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconX, {})
									]
								}, i);
							})
						}),
						quizAnswered && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2 text-left animate-fade-in bg-blue-50 border border-blue-100 rounded-2xl p-3 shadow-sm relative overflow-hidden shrink-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 mb-1.5 border-b border-blue-200 pb-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-sm border border-blue-200",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 font-black text-[10px]",
											children: "AI"
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
										className: "text-blue-800 font-bold text-xs",
										children: "Tiểu Nguyên giải thích:"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-gray-700 text-xs mb-1",
									children: [
										quizAnswered === allVocab[cardIdx].word ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-green-700 font-bold",
											children: "Chính xác! "
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-red-600 font-bold",
											children: "Chưa đúng. "
										}),
										"Từ đúng là ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
											className: "text-blue-700",
											children: allVocab[cardIdx].word
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-gray-500 ml-1.5 font-mono bg-white px-1 py-0.5 rounded border border-gray-200 text-[10px]",
											children: allVocab[cardIdx].ipa
										}),
										" ",
										"— ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-gray-600",
											children: allVocab[cardIdx].vi
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "bg-white p-2 rounded-lg border border-blue-100 flex justify-between items-center mt-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-gray-600 text-xs italic w-[85%]",
										children: [
											"\"",
											allVocab[cardIdx].ex,
											"\""
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => playAudio(allVocab[cardIdx].ex),
										className: "text-blue-500 hover:text-blue-700",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconPlay, {})
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setCardIdx((prev) => (prev + 1) % allVocab.length),
									className: "mt-2 w-full py-1.5 bg-blue-600 hover:bg-blue-700 rounded-xl text-white text-xs font-bold transition-colors shadow-md shadow-blue-500/30",
									children: "Làm câu tiếp theo"
								})
							]
						})
					]
				}),
				vocabMode === "flashcard" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex justify-center items-center gap-3 mt-2 shrink-0 w-full",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							setIsFlipped(false);
							setShowHint(false);
							setTimeout(() => setCardIdx((prev) => (prev - 1 + allVocab.length) % allVocab.length), 150);
						},
						className: "flex-1 py-2 bg-white border border-gray-200 hover:bg-gray-50 rounded-xl text-gray-700 font-bold text-xs transition-colors shadow-sm",
						children: "Trước"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							setIsFlipped(false);
							setShowHint(false);
							setTimeout(() => setCardIdx((prev) => (prev + 1) % allVocab.length), 150);
						},
						className: "flex-1 py-2 bg-blue-600 hover:bg-blue-700 rounded-xl text-white font-bold text-xs transition-colors shadow-md shadow-blue-500/30",
						children: "Tiếp theo"
					})]
				})
			]
		});
	}
	function renderListen() {
		if (!allListeningData[listenIdx]) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex items-center justify-center h-full text-gray-400 text-sm",
			children: "Đang tải bài nghe..."
		});
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "animate-fade-in flex flex-col h-full w-full max-w-3xl mx-auto py-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "text-sm font-bold text-gray-900 mb-2 flex items-center gap-2 shrink-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "p-1 bg-amber-100 text-amber-600 rounded-lg",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconListen, {})
					}), " Luyện Nghe"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex bg-gray-100 p-1 rounded-xl border border-gray-200 mb-2 shrink-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setListenTabMode("dictation"),
						className: `flex-1 py-1.5 rounded-lg text-sm font-semibold transition-all ${listenTabMode === "dictation" ? "bg-white text-amber-600 shadow" : "text-gray-500 hover:text-gray-800"}`,
						children: "Chép Chính Tả"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setListenTabMode("running"),
						className: `flex-1 py-1.5 rounded-lg text-sm font-semibold transition-all ${listenTabMode === "running" ? "bg-white text-green-600 shadow" : "text-gray-500 hover:text-gray-800"}`,
						children: "🏃 Chạy Bộ"
					})]
				}),
				listenTabMode === "dictation" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-white border border-gray-200 rounded-3xl p-4 shadow-sm mb-2 text-center relative overflow-hidden shrink-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 left-0 w-full h-1 bg-amber-400" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => playAudio(allListeningData[listenIdx].text),
								className: "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-full p-3 inline-flex items-center justify-center transition-transform hover:scale-105 shadow-lg shadow-amber-500/30 mb-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconPlay, {})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-gray-600 font-medium text-xs mb-1.5",
								children: "Bấm Play, nghe câu nói của đối tác và gõ lại chính xác nội dung."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-[11px] text-gray-500 italic bg-amber-50 inline-block px-3 py-1.5 rounded-full border border-amber-100",
								children: ["Hint: ", allListeningData[listenIdx].hint]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						value: listenInput,
						onChange: (e) => setListenInput(e.target.value),
						className: "w-full flex-1 min-h-[64px] bg-white border border-gray-200 rounded-2xl p-3 text-gray-900 text-sm resize-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 mb-2 outline-none shadow-inner",
						placeholder: "Type exactly what you hear here..."
					}),
					showListenAnswer && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-green-50 border border-green-200 rounded-2xl p-3 mb-2 animate-fade-in shadow-sm relative shrink-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 left-0 w-1 h-full bg-green-500" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between items-center mb-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-green-700 font-bold text-xs uppercase tracking-wide",
									children: "Đáp án:"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => playAudio(allListeningData[listenIdx].text),
									className: "text-green-700 hover:text-green-900",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconPlay, {})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-gray-900 text-sm font-medium mb-2",
								children: allListeningData[listenIdx].text
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bg-white rounded-xl p-2.5 border border-green-100 shadow-sm max-h-24 overflow-y-auto",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-1.5 mb-1 border-b border-green-50 pb-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "w-5 h-5 bg-green-100 rounded-full flex items-center justify-center shadow-sm border border-green-200",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-teal-600 font-black text-[9px]",
											children: "AI"
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
										className: "text-green-800 font-bold text-xs",
										children: "Góc phân tích:"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-gray-700 whitespace-pre-line text-xs leading-relaxed font-mono",
									children: allListeningData[listenIdx].explanation
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between gap-3 shrink-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setShowListenAnswer(!showListenAnswer),
							className: "flex-1 py-2 bg-white hover:bg-gray-50 rounded-xl text-gray-700 font-bold text-xs border border-gray-300 transition shadow-sm",
							children: showListenAnswer ? "Ẩn đáp án" : "Xem đáp án"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => {
								setListenIdx((prev) => (prev + 1) % allListeningData.length);
								setListenInput("");
								setShowListenAnswer(false);
							},
							className: "flex-1 py-2 bg-gray-900 hover:bg-gray-800 rounded-xl text-white font-bold text-xs transition shadow-md flex items-center justify-center gap-1.5",
							children: ["Câu tiếp ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconRandom, {})]
						})]
					})
				] }),
				listenTabMode === "running" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-2 flex-1 overflow-y-auto",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between bg-gray-50 border border-gray-200 rounded-2xl px-3 py-2 shrink-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-center",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[9px] text-gray-400 uppercase tracking-widest font-bold mb-0.5",
										children: "Thời gian"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-2xl font-mono font-black text-gray-800",
										children: formatTime(runSeconds)
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex-1 mx-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "w-full bg-gray-200 rounded-full h-2 mb-1 overflow-hidden",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "bg-green-500 h-2 rounded-full transition-all duration-700",
											style: { width: `${Math.min(runIdx, allRunningPlaylist.length) / allRunningPlaylist.length * 100}%` }
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs text-gray-500 text-center",
										children: [
											Math.min(runIdx + 1, allRunningPlaylist.length),
											" / ",
											allRunningPlaylist.length,
											" câu"
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-center",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[9px] text-gray-400 uppercase tracking-widest font-bold mb-0.5",
										children: "Trạng thái"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: `text-xs font-bold ${runFinished ? "text-blue-600" : runPlaying ? "text-green-600" : "text-gray-400"}`,
										children: runFinished ? "Xong!" : runPlaying ? "Đang phát" : "Tạm dừng"
									})]
								})
							]
						}),
						!runFinished && runIdx < allRunningPlaylist.length && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-white border-2 border-green-400 rounded-2xl p-3 shadow-md shrink-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[9px] font-bold text-green-600 uppercase tracking-widest mb-1",
									children: "Đang phát"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-base font-semibold text-gray-800 leading-relaxed mb-1.5",
									children: allRunningPlaylist[runIdx].en
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-blue-700 italic border-t border-green-100 pt-1.5",
									children: allRunningPlaylist[runIdx].vi
								})
							]
						}),
						!runFinished && runIdx + 1 < allRunningPlaylist.length && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-gray-50 border border-gray-200 rounded-2xl p-2.5 shrink-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1",
								children: "Câu tiếp theo"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-gray-500 leading-relaxed",
								children: allRunningPlaylist[runIdx + 1].en
							})]
						}),
						runFinished && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-gradient-to-br from-green-50 to-teal-50 border border-green-300 rounded-2xl p-4 text-center shadow-md shrink-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-3xl mb-2",
									children: "🎉"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-base font-black text-green-700 mb-1",
									children: "Session hoàn thành!"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-green-600",
									children: [
										"Thời gian: ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: formatTime(runSeconds) }),
										" — ",
										allRunningPlaylist.length,
										" câu"
									]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-3 shrink-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: runPlaying ? handleRunPause : handleRunPlay,
									className: `flex-1 h-12 rounded-2xl text-white font-bold text-sm shadow-lg active:scale-95 transition-transform ${runPlaying ? "bg-yellow-500 hover:bg-yellow-600" : "bg-green-500 hover:bg-green-600"}`,
									children: runPlaying ? "⏸ Tạm dừng" : runFinished ? "🔄 Chạy lại" : "▶ Bắt đầu"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: handleRunSkip,
									disabled: runFinished || runIdx >= allRunningPlaylist.length - 1,
									className: "w-12 h-12 rounded-2xl bg-blue-500 hover:bg-blue-600 text-white font-bold text-xl shadow-lg active:scale-95 transition-transform disabled:opacity-40 disabled:cursor-not-allowed",
									children: "⏭"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: handleRunStop,
									className: "w-12 h-12 rounded-2xl bg-red-500 hover:bg-red-600 text-white font-bold text-xl shadow-lg active:scale-95 transition-transform",
									children: "⏹"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
							className: "bg-gray-50 border border-gray-200 rounded-2xl overflow-hidden shrink-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("summary", {
								className: "px-4 py-3 cursor-pointer text-sm font-semibold text-gray-600 hover:bg-gray-100 select-none",
								children: [
									"Xem tất cả ",
									allRunningPlaylist.length,
									" câu"
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "max-h-56 overflow-y-auto px-4 pb-4",
								children: allRunningPlaylist.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: `py-2 border-b border-gray-100 last:border-0 text-sm ${i === runIdx && !runFinished ? "text-green-700 font-semibold" : i < runIdx ? "text-gray-400 line-through" : "text-gray-600"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-xs text-gray-400 mr-2 font-mono",
										children: [i + 1, "."]
									}), item.en]
								}, item.id))
							})]
						})
					]
				})
			]
		});
	}
	function renderRead() {
		if (!allReadingData[readIdx]) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex items-center justify-center h-full text-gray-400 text-sm",
			children: "Đang tải bài đọc..."
		});
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "animate-fade-in flex flex-col h-full w-full max-w-4xl mx-auto py-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "text-sm font-bold text-gray-900 mb-2 flex items-center gap-2 shrink-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "p-1 bg-indigo-100 text-indigo-600 rounded-lg",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconRead, {})
					}), " Đọc Hiểu Văn Bản"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-1 lg:grid-cols-5 gap-3 mb-2 shrink-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "lg:col-span-3 bg-white border border-gray-200 rounded-3xl p-4 shadow-sm relative overflow-hidden",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 left-0 w-full h-1 bg-indigo-400" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-sm font-bold text-gray-900 mb-2 border-b border-gray-100 pb-1.5",
								children: allReadingData[readIdx].title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-gray-700 leading-relaxed text-xs font-serif",
								children: allReadingData[readIdx].content
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "lg:col-span-2 hidden lg:block h-full",
						children: renderVisual(allReadingData[readIdx].visualType)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-1 bg-gray-50 border border-gray-200 rounded-3xl p-3 shadow-inner flex flex-col overflow-y-auto min-h-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-bold text-gray-900 mb-2 text-xs shrink-0",
							children: allReadingData[readIdx].question
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-col gap-2 shrink-0",
							children: allReadingData[readIdx].options.map((opt, i) => {
								const isCorrect = i === allReadingData[readIdx].answerIdx;
								const isSelected = readAnswered === i;
								let btnClass = "bg-white border-gray-200 text-gray-700 hover:bg-blue-50 hover:border-blue-200";
								let icon = null;
								if (readAnswered !== null) if (isCorrect) {
									btnClass = "bg-green-50 border-green-400 text-green-800 shadow-sm font-bold";
									icon = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconCheck, {});
								} else if (isSelected) {
									btnClass = "bg-red-50 border-red-300 text-red-800";
									icon = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconX, {});
								} else btnClass = "bg-white border-gray-200 text-gray-400 opacity-50";
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									disabled: readAnswered !== null,
									onClick: () => setReadAnswered(i),
									className: `text-left p-3 rounded-2xl border transition-all flex justify-between items-center text-sm ${btnClass}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-medium",
										children: opt
									}), icon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: icon })]
								}, i);
							})
						}),
						readAnswered !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 bg-blue-50 border border-blue-200 rounded-2xl p-5 animate-fade-in shadow-sm relative shrink-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 left-0 w-1 h-full bg-blue-500" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 mb-2 border-b border-blue-100 pb-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm border border-blue-200",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 font-black text-xs",
											children: "AI"
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
										className: "text-blue-800 font-bold text-sm",
										children: "Tiểu Nguyên giải thích:"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-gray-800 leading-relaxed mb-3 text-xs font-medium",
									children: allReadingData[readIdx].explanation
								}),
								allReadingData[readIdx].sampleSentence && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-2 bg-indigo-50 border-l-4 border-indigo-400 rounded-r-xl p-3 flex justify-between items-start gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[10px] font-bold text-indigo-500 uppercase tracking-wide mb-1",
										children: "Câu ví dụ thực chiến"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-sm italic text-indigo-800",
										children: [
											"\"",
											allReadingData[readIdx].sampleSentence,
											"\""
										]
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => playAudio(allReadingData[readIdx].sampleSentence),
										className: "text-indigo-400 hover:text-indigo-700 shrink-0 mt-1",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconPlay, {})
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex justify-end mt-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => {
											setReadIdx((prev) => (prev + 1) % allReadingData.length);
											setReadAnswered(null);
										},
										className: "px-5 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white text-xs font-bold shadow-md transition",
										children: "Bài tiếp theo"
									})
								})
							]
						})
					]
				})
			]
		});
	}
	function renderSpeak() {
		if (!speakingData[speakIdx]) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex items-center justify-center h-full text-gray-400 text-sm",
			children: "Đang tải tình huống..."
		});
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "animate-fade-in flex flex-col h-full w-full max-w-4xl mx-auto py-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex justify-between items-center mb-2 shrink-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "text-sm font-bold text-gray-900 flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "p-1 bg-rose-100 text-rose-600 rounded-lg",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconSpeak, {})
						}), " Luyện Nói (Voice AI)"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: handleGenerateSpeakingScenario,
						disabled: isGeneratingNew,
						className: "text-xs font-semibold text-rose-600 hover:text-rose-900 px-3 py-1.5 bg-rose-50 rounded-lg border border-rose-200 transition shadow-sm flex items-center gap-1",
						children: [isGeneratingNew ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconLoading, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconSparkles, {}), " Tạo Bằng AI"]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-1 md:grid-cols-5 gap-3 mb-2 shrink-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "md:col-span-3 bg-white border border-gray-200 rounded-3xl p-4 shadow-sm relative overflow-hidden flex flex-col justify-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 left-0 w-1.5 h-full bg-rose-400" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-sm font-bold text-gray-900 mb-1.5",
								children: speakingData[speakIdx].title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-gray-700 text-xs mb-2 leading-relaxed",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
										className: "text-gray-900",
										children: "Bối cảnh:"
									}),
									" ",
									speakingData[speakIdx].context
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "bg-rose-50 border border-rose-100 rounded-xl p-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-rose-800",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
											className: "text-rose-600 block mb-0.5",
											children: "Nhiệm vụ:"
										}),
										" ",
										speakingData[speakIdx].role
									]
								})
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "md:col-span-2 hidden md:block h-full",
						children: renderVisual(speakingData[speakIdx].visualType)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-1 bg-white rounded-3xl p-5 border border-gray-200 shadow-sm flex flex-col min-h-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between items-center mb-3 shrink-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-bold text-gray-500 uppercase tracking-wider",
								children: "🎙️ Thu âm phản hồi"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: toggleRecording,
								className: `flex items-center gap-1.5 px-4 py-2 rounded-full text-white text-sm font-bold transition-all shadow-md ${isRecording ? "bg-red-500 animate-pulse" : "bg-gray-800 hover:bg-gray-900"}`,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconMicOutline, {}),
									" ",
									isRecording ? "Đang thu âm..." : "Bấm để Nói"
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							value: speakTranscript,
							onChange: (e) => setSpeakTranscript(e.target.value),
							className: `w-full flex-1 bg-gray-50 border p-3 rounded-2xl text-gray-900 text-sm resize-none outline-none transition-colors ${isRecording ? "border-red-300 ring-2 ring-red-100" : "border-gray-200 focus:border-rose-400"}`,
							placeholder: "Nhấn nút Micro và nói tiếng Anh, hoặc anh có thể gõ trực tiếp..."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 flex justify-between items-center shrink-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => {
									setSpeakIdx((prev) => (prev + 1) % speakingData.length);
									setSpeakTranscript("");
									setSpeakFeedback(null);
								},
								className: "text-xs font-semibold text-gray-500 hover:text-gray-800 px-3 py-1.5 border border-gray-200 rounded-lg",
								children: "Đổi tình huống"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: handleGradeSpeaking,
								disabled: isSpeakingGrading || isRecording,
								className: `px-5 py-2.5 rounded-xl text-white text-sm font-bold flex items-center gap-2 shadow-md transition-colors ${isSpeakingGrading || isRecording ? "bg-gray-400 cursor-not-allowed" : "bg-rose-600 hover:bg-rose-700"}`,
								children: [isSpeakingGrading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconLoading, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconSparkles, {}), " Gửi AI Đánh Giá"]
							})]
						})
					]
				}),
				speakFeedback && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-2 bg-gradient-to-br from-rose-50 to-white border border-rose-200 rounded-3xl p-4 shadow-md animate-fade-in relative overflow-hidden shrink-0 max-h-52 overflow-y-auto",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute top-0 right-0 p-5 opacity-5 text-rose-500 transform scale-[2]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconSparkles, {})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 mb-3 border-b border-rose-100 pb-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm border border-rose-200",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-orange-500 font-black text-xs",
									children: "AI"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "text-rose-800 font-bold text-sm",
								children: "Tiểu Nguyên Feedback"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-gray-800 text-sm leading-relaxed font-medium",
							children: formatAIResponse(speakFeedback)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 pt-3 flex justify-between items-center border-t border-rose-100",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => {
									const match = speakFeedback.match(/\*\*(.*?)\*\*/);
									if (match?.[1]) playAudio(match[1]);
								},
								className: "px-4 py-2 bg-rose-100 hover:bg-rose-200 text-rose-700 rounded-full text-xs font-bold flex items-center gap-1.5 transition",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconPlay, {}), " Nghe AI đọc mẫu"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setSpeakFeedback(null),
								className: "px-3 py-1.5 text-gray-500 hover:text-gray-800 font-semibold text-xs",
								children: "Đóng"
							})]
						})
					]
				})
			]
		});
	}
	function renderWrite() {
		if (!writingData[writeIdx]) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex items-center justify-center h-full text-gray-400 text-sm",
			children: "Đang tải tình huống..."
		});
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "animate-fade-in flex flex-col h-full w-full max-w-4xl mx-auto py-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex justify-between items-center mb-2 shrink-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "text-sm font-bold text-gray-900 flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "p-1 bg-emerald-100 text-emerald-600 rounded-lg",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconWrite, {})
						}), " Viết Email"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: handleGenerateWritingScenario,
							disabled: isGeneratingNew,
							className: "text-xs font-semibold text-emerald-600 hover:text-emerald-900 px-3 py-1.5 bg-emerald-50 rounded-lg border border-emerald-200 transition shadow-sm flex items-center gap-1",
							children: [isGeneratingNew ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconLoading, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconSparkles, {}), " Tạo Bằng AI"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => {
								setWriteIdx((prev) => (prev + 1) % writingData.length);
								setWriteInput("");
								setWriteFeedback(null);
							},
							className: "text-xs font-semibold text-gray-600 hover:text-gray-900 px-3 py-1.5 bg-white rounded-lg border border-gray-200 transition shadow-sm",
							children: "Đổi Tình Huống"
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-1 md:grid-cols-5 gap-3 mb-2 shrink-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "md:col-span-3 bg-white border border-gray-200 rounded-3xl p-4 shadow-sm relative overflow-hidden flex flex-col justify-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 left-0 w-1.5 h-full bg-emerald-400" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-sm font-bold text-gray-900 mb-1.5",
								children: writingData[writeIdx].title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-gray-700 text-xs mb-2 leading-relaxed",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
										className: "text-gray-900",
										children: "Bối cảnh:"
									}),
									" ",
									writingData[writeIdx].context
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-emerald-800 bg-emerald-50 border border-emerald-100 p-2 rounded-xl",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
										className: "text-emerald-700 block mb-0.5",
										children: "Nhiệm vụ:"
									}),
									" ",
									writingData[writeIdx].task
								]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "md:col-span-2 hidden md:block h-full",
						children: renderVisual(writingData[writeIdx].visualType)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-1 flex flex-col bg-white border border-gray-200 rounded-3xl shadow-sm overflow-hidden min-h-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "bg-gray-50 p-3 border-b border-gray-200 flex items-center gap-2 shrink-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-bold text-gray-600 uppercase tracking-wider",
								children: "✍️ Khung soạn thảo"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							value: writeInput,
							onChange: (e) => setWriteInput(e.target.value),
							disabled: isGrading,
							className: "flex-1 w-full bg-transparent p-3 text-gray-900 text-sm resize-none outline-none",
							placeholder: "Gõ bản nháp tiếng Anh của anh vào đây..."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-3 bg-gray-50 border-t border-gray-200 flex flex-row justify-between items-center gap-4 shrink-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-xs text-gray-500 font-mono bg-white px-2 py-1 rounded border border-gray-200",
								children: [writeInput.length, " chars"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: handleGradeWriting,
								disabled: isGrading,
								className: `text-white font-bold py-2 px-5 rounded-xl transition-colors text-sm shadow-md flex items-center gap-1.5 ${isGrading ? "bg-gray-400 cursor-not-allowed" : "bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"}`,
								children: [isGrading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconLoading, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconSparkles, {}), isGrading ? "Đang đọc..." : "Gửi AI Chấm"]
							})]
						})
					]
				}),
				writeFeedback && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-2 bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-4 shadow-lg text-gray-300 animate-fade-in relative overflow-hidden shrink-0 max-h-52 overflow-y-auto",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute top-0 right-0 p-6 opacity-10 text-emerald-500 transform scale-[2]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconSparkles, {})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
							className: "flex items-center gap-2 text-emerald-400 font-bold mb-4 text-sm border-b border-gray-700 pb-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconSparkles, {}), " Tiểu Nguyên Feedback"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-gray-300 text-sm leading-relaxed font-medium",
							children: formatAIResponse(writeFeedback)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 border-t border-gray-700 pt-3 flex justify-between items-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => {
									const match = writeFeedback.match(/\*\*(.*?)\*\*/);
									if (match?.[1]) playAudio(match[1]);
								},
								className: "px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-full font-bold flex items-center gap-1.5 transition text-xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconPlay, {}), " Nghe giọng đọc"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setWriteFeedback(null),
								className: "px-4 py-1.5 bg-gray-700 hover:bg-gray-600 rounded-lg text-white font-semibold transition text-xs",
								children: "Đóng"
							})]
						})
					]
				})
			]
		});
	}
	function NavItem({ module, icon, label, activeColorClass }) {
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			onClick: () => {
				setActiveModule(module);
				showToast(`Đã chọn: ${label}`);
			},
			className: `relative group flex flex-col items-center justify-center w-14 h-14 rounded-2xl transition-all duration-300 ${activeModule === module ? activeColorClass + " shadow-md" : "text-gray-400 hover:bg-gray-50 hover:text-gray-600"}`,
			children: [icon, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-[9px] font-bold mt-1 opacity-0 group-hover:opacity-100 transition-opacity absolute -bottom-4 whitespace-nowrap",
				children: label
			})]
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "h-screen w-full bg-[#f8f9fa] text-gray-800 font-sans flex overflow-hidden selection:bg-blue-200 selection:text-blue-900",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "w-20 md:w-24 bg-white border-r border-gray-200 flex flex-col items-center py-6 gap-3 z-20 shadow-[4px_0_24px_rgba(0,0,0,0.02)] shrink-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "bg-gradient-to-br from-blue-600 to-indigo-600 text-white p-3 rounded-2xl shadow-md shadow-blue-500/20 flex items-center justify-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconZap, {})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-8 h-px bg-gray-100 mb-2" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavItem, {
						module: "vocab",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconVocab, {}),
						label: "Từ Vựng",
						activeColorClass: "bg-blue-100 text-blue-600"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavItem, {
						module: "listen",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconListen, {}),
						label: "Nghe",
						activeColorClass: "bg-amber-100 text-amber-600"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavItem, {
						module: "read",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconRead, {}),
						label: "Đọc",
						activeColorClass: "bg-indigo-100 text-indigo-600"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavItem, {
						module: "speak",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconSpeak, {}),
						label: "Nói",
						activeColorClass: "bg-rose-100 text-rose-600"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavItem, {
						module: "write",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconWrite, {}),
						label: "Viết",
						activeColorClass: "bg-emerald-100 text-emerald-600"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex-1" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-8 h-px bg-gray-100 mb-2" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: handleRandomModule,
						className: "relative group flex flex-col items-center justify-center w-14 h-14 rounded-2xl transition-all duration-300 text-purple-500 hover:bg-purple-50",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconRandom, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[9px] font-bold mt-1 opacity-0 group-hover:opacity-100 transition-opacity absolute -bottom-4 whitespace-nowrap",
							children: "Ngẫu Hứng"
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "flex-1 flex flex-col h-full relative overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "h-10 flex items-center justify-between px-4 border-b border-gray-100 bg-white/80 backdrop-blur-md shrink-0 z-10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-sm font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-700 to-gray-900 tracking-tight hidden sm:block",
						children: "FINTECH REFLEX"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-center gap-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-xs font-bold px-3 py-1 bg-gray-100 text-gray-500 rounded-full border border-gray-200",
							children: [
								activeModule === "vocab" && `Từ Vựng Doanh Nghiệp (${allVocab.length} từ)`,
								activeModule === "listen" && "Luyện Nghe",
								activeModule === "read" && "Đọc Hiểu Tình Huống",
								activeModule === "speak" && "Giao Tiếp Voice AI",
								activeModule === "write" && "Soạn Email Thực Chiến"
							]
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-1 p-4 md:p-6 overflow-hidden",
					children: [
						activeModule === "vocab" && renderVocab(),
						activeModule === "listen" && renderListen(),
						activeModule === "read" && renderRead(),
						activeModule === "speak" && renderSpeak(),
						activeModule === "write" && renderWrite()
					]
				})]
			}),
			showAddVocab && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-white rounded-3xl shadow-2xl w-full max-w-lg flex flex-col max-h-[90vh]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between p-5 border-b border-gray-100",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-lg font-black text-gray-900",
							children: "Thêm Từ Vựng Mới"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => {
								setShowAddVocab(false);
								setAddVocabText("");
								setParsedPreview(null);
							},
							className: "p-2 hover:bg-gray-100 rounded-xl text-gray-500 transition",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconClose, {})
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "p-5 flex flex-col gap-3 overflow-y-auto flex-1",
						children: injectProgress ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "animate-fade-in flex flex-col gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-bold text-gray-500 uppercase tracking-wide mb-1",
									children: "Kết quả cập nhật:"
								}),
								Object.values(injectProgress).filter(Boolean).map((line, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: `text-xs font-medium px-3 py-2 rounded-lg ${line.startsWith("✅") ? "bg-green-50 text-green-700" : line.startsWith("❌") ? "bg-red-50 text-red-600" : "bg-gray-50 text-gray-500"}`,
									children: line
								}, i)),
								Object.values(injectProgress).every((v) => !v || !v.startsWith("⏳")) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => {
										setShowAddVocab(false);
										setInjectProgress(null);
									},
									className: "mt-2 w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition",
									children: "Đóng & Xem kết quả trong từng kỹ năng"
								})
							]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide",
								children: "Dán nội dung từ vựng (hỗ trợ nhiều format có IPA /.../):"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								value: addVocabText,
								onChange: (e) => {
									setAddVocabText(e.target.value);
									setParsedPreview(null);
								},
								className: "w-full min-h-[80px] bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm text-gray-800 resize-none outline-none focus:ring-2 focus:ring-blue-400 font-mono",
								placeholder: "Procurement /prəˈkjʊə.mənt/ (n) - Sự thu mua\nVí dụ: The IT procurement process takes two weeks.\n\n16Persuade/pəˈsweɪd/Thuyết phụcPersuade customers..."
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: handleParseVocab,
								className: "w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm transition shadow-md",
								children: "Phân tích & Xem trước"
							}),
							parsedPreview !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "animate-fade-in",
								children: parsedPreview.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-center text-red-500 text-sm font-medium py-3",
									children: "Không parse được từ nào. Kiểm tra format có đúng không ạ?"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide",
										children: [
											"Xem trước (",
											parsedPreview.length,
											" từ):"
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "border border-gray-200 rounded-xl overflow-hidden max-h-44 overflow-y-auto",
										children: parsedPreview.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-start gap-2 p-2.5 border-b border-gray-100 last:border-0 text-sm",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5",
												children: i + 1
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-bold text-gray-900",
													children: item.word
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-blue-500 font-mono text-xs ml-1.5",
													children: item.ipa
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "text-gray-500 ml-1.5",
													children: ["— ", item.vi]
												}),
												item.ex && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
													className: "text-gray-400 text-xs italic mt-0.5",
													children: [
														"\"",
														item.ex,
														"\""
													]
												})
											] })]
										}, i))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: handleConfirmAddVocab,
										className: "w-full mt-2 py-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl text-sm transition shadow-md",
										children: [
											"Xác nhận thêm ",
											parsedPreview.length,
											" từ → tất cả kỹ năng"
										]
									})
								] })
							})
						] })
					})]
				})
			}),
			toastMsg && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-5 py-2.5 rounded-full text-xs font-bold shadow-2xl z-50 animate-fade-in flex items-center gap-2 border border-gray-700",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconCheck, {}),
					" ",
					toastMsg
				]
			})
		]
	});
}
//#endregion
//#region src/main.jsx
var ErrorBoundary = class extends import_react.Component {
	constructor(props) {
		super(props);
		this.state = { error: null };
	}
	static getDerivedStateFromError(error) {
		return { error };
	}
	render() {
		if (this.state.error) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: {
				padding: "2rem",
				fontFamily: "monospace",
				background: "#1a1a1a",
				color: "#fff",
				minHeight: "100vh"
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					style: { color: "#f87171" },
					children: "⚠️ App crashed — lỗi runtime"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("pre", {
					style: {
						background: "#2a2a2a",
						padding: "1rem",
						borderRadius: "8px",
						overflowX: "auto",
						fontSize: "13px",
						color: "#fca5a5"
					},
					children: [
						this.state.error.toString(),
						"\n",
						this.state.error.stack
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => {
						localStorage.clear();
						window.location.reload();
					},
					style: {
						marginTop: "1rem",
						padding: "0.75rem 1.5rem",
						background: "#3b82f6",
						color: "#fff",
						border: "none",
						borderRadius: "8px",
						cursor: "pointer",
						fontWeight: "bold"
					},
					children: "Xóa cache & tải lại"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => this.setState({ error: null }),
					style: {
						marginTop: "1rem",
						marginLeft: "1rem",
						padding: "0.75rem 1.5rem",
						background: "#6b7280",
						color: "#fff",
						border: "none",
						borderRadius: "8px",
						cursor: "pointer",
						fontWeight: "bold"
					},
					children: "Thử lại"
				})
			]
		});
		return this.props.children;
	}
};
(0, import_client.createRoot)(document.getElementById("root")).render(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.StrictMode, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorBoundary, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(App, {}) }) }));
//#endregion
