(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define(factory);
	else if(typeof exports === 'object')
		exports["shortcut"] = factory();
	else
		root["shortcut"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Object$defineProperty = __webpack_require__(2)['default'];

	var _interopRequireDefault = __webpack_require__(6)['default'];

	_Object$defineProperty(exports, '__esModule', {
	  value: true
	});

	var _indexof_polyfill = __webpack_require__(7);

	var _indexof_polyfill2 = _interopRequireDefault(_indexof_polyfill);

	var _global_pause = __webpack_require__(1);

	var _global_pause2 = _interopRequireDefault(_global_pause);

	var _shortcut = __webpack_require__(8);

	var _shortcut2 = _interopRequireDefault(_shortcut);

	var _event_binding = __webpack_require__(18);

	var _event_binding2 = _interopRequireDefault(_event_binding);

	(0, _indexof_polyfill2['default'])();

	/*
	 * A pause function. This prevents anything from being registered or called
	 * until shortcut.resume() is called
	 *
	 * @chainable
	 */

	_shortcut2['default'].pause = function () {
	  (0, _global_pause2['default'])(true);

	  return _shortcut2['default'];
	};

	/*
	 * Resume function. This will make undo shortcut.pause()
	 *
	 * @chainable
	 */

	_shortcut2['default'].resume = function () {
	  (0, _global_pause2['default'])(false);

	  return _shortcut2['default'];
	};

	(0, _event_binding2['default'])();
	exports['default'] = _shortcut2['default'];
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * defaults to false,
	 * essentially says if any fns should be emitted or not
	 */

	'use strict';

	var _Object$defineProperty = __webpack_require__(2)['default'];

	_Object$defineProperty(exports, '__esModule', {
	  value: true
	});

	var globalPause = false;

	exports['default'] = function (setter) {
	  if (typeof setter === 'boolean') {
	    globalPause = setter;
	  }

	  return globalPause;
	};

	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(3), __esModule: true };

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(4);
	module.exports = function defineProperty(it, key, desc){
	  return $.setDesc(it, key, desc);
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var global = typeof self != 'undefined' ? self : Function('return this')()
	  , core   = {}
	  , defineProperty = Object.defineProperty
	  , hasOwnProperty = {}.hasOwnProperty
	  , ceil  = Math.ceil
	  , floor = Math.floor
	  , max   = Math.max
	  , min   = Math.min;
	// The engine works fine with descriptors? Thank's IE8 for his funny defineProperty.
	var DESC = !!function(){
	  try {
	    return defineProperty({}, 'a', {get: function(){ return 2; }}).a == 2;
	  } catch(e){ /* empty */ }
	}();
	var hide = createDefiner(1);
	// 7.1.4 ToInteger
	function toInteger(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	}
	function desc(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	}
	function simpleSet(object, key, value){
	  object[key] = value;
	  return object;
	}
	function createDefiner(bitmap){
	  return DESC ? function(object, key, value){
	    return $.setDesc(object, key, desc(bitmap, value));
	  } : simpleSet;
	}

	function isObject(it){
	  return it !== null && (typeof it == 'object' || typeof it == 'function');
	}
	function isFunction(it){
	  return typeof it == 'function';
	}
	function assertDefined(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	}

	var $ = module.exports = __webpack_require__(5)({
	  g: global,
	  core: core,
	  html: global.document && document.documentElement,
	  // http://jsperf.com/core-js-isobject
	  isObject:   isObject,
	  isFunction: isFunction,
	  that: function(){
	    return this;
	  },
	  // 7.1.4 ToInteger
	  toInteger: toInteger,
	  // 7.1.15 ToLength
	  toLength: function(it){
	    return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	  },
	  toIndex: function(index, length){
	    index = toInteger(index);
	    return index < 0 ? max(index + length, 0) : min(index, length);
	  },
	  has: function(it, key){
	    return hasOwnProperty.call(it, key);
	  },
	  create:     Object.create,
	  getProto:   Object.getPrototypeOf,
	  DESC:       DESC,
	  desc:       desc,
	  getDesc:    Object.getOwnPropertyDescriptor,
	  setDesc:    defineProperty,
	  setDescs:   Object.defineProperties,
	  getKeys:    Object.keys,
	  getNames:   Object.getOwnPropertyNames,
	  getSymbols: Object.getOwnPropertySymbols,
	  assertDefined: assertDefined,
	  // Dummy, fix for not array-like ES3 string in es5 module
	  ES5Object: Object,
	  toObject: function(it){
	    return $.ES5Object(assertDefined(it));
	  },
	  hide: hide,
	  def: createDefiner(0),
	  set: global.Symbol ? simpleSet : hide,
	  each: [].forEach
	});
	/* eslint-disable no-undef */
	if(typeof __e != 'undefined')__e = core;
	if(typeof __g != 'undefined')__g = global;

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = function($){
	  $.FW   = false;
	  $.path = $.core;
	  return $;
	};

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";

	exports["default"] = function (obj) {
	  return obj && obj.__esModule ? obj : {
	    "default": obj
	  };
	};

	exports.__esModule = true;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	
	/* eslint-disable */
	"use strict";

	var _Object$defineProperty = __webpack_require__(2)["default"];

	_Object$defineProperty(exports, "__esModule", {
	  value: true
	});

	exports["default"] = function () {
	  if (!Array.prototype.indexOf) {
	    Array.prototype.indexOf = function (elt /*, from*/) {
	      var len = this.length >>> 0;

	      var from = Number(arguments[1]) || 0;
	      from = from < 0 ? Math.ceil(from) : Math.floor(from);
	      if (from < 0) {
	        from += len;
	      }

	      for (; from < len; from++) {
	        if (from in this && this[from] === elt) {
	          return from;
	        }
	      }
	      return -1;
	    };
	  }
	};

	;
	/* eslint-enable */
	module.exports = exports["default"];

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * Entry function.
	 *
	 * usage:
	 *  shortcut('a b', 'body').to(myMethod)
	 *
	 * @params {String} keys to press
	 * @params {String} dom selector
	 *
	 * @returns Object
	 */

	'use strict';

	var _Object$defineProperty = __webpack_require__(2)['default'];

	var _interopRequireDefault = __webpack_require__(6)['default'];

	_Object$defineProperty(exports, '__esModule', {
	  value: true
	});

	var _mappings = __webpack_require__(10);

	var _mappings2 = _interopRequireDefault(_mappings);

	var _paused_mappings = __webpack_require__(11);

	var _paused_mappings2 = _interopRequireDefault(_paused_mappings);

	var _binds_to = __webpack_require__(12);

	var _binds_to2 = _interopRequireDefault(_binds_to);

	var _prevent_default = __webpack_require__(9);

	var _prevent_default2 = _interopRequireDefault(_prevent_default);

	var _pause = __webpack_require__(14);

	var _pause2 = _interopRequireDefault(_pause);

	var _resume = __webpack_require__(15);

	var _resume2 = _interopRequireDefault(_resume);

	var _unbind = __webpack_require__(16);

	var _unbind2 = _interopRequireDefault(_unbind);

	var _trigger = __webpack_require__(17);

	var _trigger2 = _interopRequireDefault(_trigger);

	exports['default'] = function (shortcutStr, domNode) {
	  var isPaused;

	  if (!shortcutStr || typeof shortcutStr !== 'string') {
	    return false;
	  }

	  domNode = domNode || document.body;

	  // check if element and keys exists in mappings
	  if (_mappings2['default'][shortcutStr] === undefined) {
	    _mappings2['default'][shortcutStr] = {};
	  }
	  if (_mappings2['default'][shortcutStr][domNode] === undefined) {
	    _mappings2['default'][shortcutStr][domNode] = [];
	  }

	  // decides if the shortcut is paused
	  isPaused = _paused_mappings2['default'][shortcutStr] === domNode ? true : false;

	  // Chaining methods
	  return {
	    bindsTo: _binds_to2['default'],
	    preventDefault: _prevent_default2['default'],
	    pause: _pause2['default'],
	    resume: _resume2['default'],
	    trigger: _trigger2['default'],
	    unbind: _unbind2['default'],
	    isPaused: isPaused,
	    keys: shortcutStr,
	    domNode: domNode,
	    functions: function functions() {
	      return _mappings2['default'][shortcutStr][domNode];
	    }
	  };
	};

	module.exports = exports['default'];

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * Makes a key binding preventDefault
	 *
	 * @chainable
	 */

	"use strict";

	var _Object$defineProperty = __webpack_require__(2)["default"];

	_Object$defineProperty(exports, "__esModule", {
	  value: true
	});

	exports["default"] = function () {
	  var preventDefault = function preventDefault(e) {
	    if (e.preventDefault) {
	      e.preventDefault();
	    }
	    e.returnValue = false; // IE prevent Default
	    return false; // Safari Prevent Default
	  };

	  this.bindsTo(preventDefault);

	  return this;
	};

	module.exports = exports["default"];

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * A nested hash of element to keys to functions.
	 * For example this may look like (once populated)
	 *
	 * mappings = {
	 *   'meta shift 8' : {
	 *     DOMNode : [
	 *       function(){...},
	 *       function(){...}
	 *     ]
	 *   }
	 *
	 * @type {Object}
	 */

	"use strict";

	var _Object$defineProperty = __webpack_require__(2)["default"];

	_Object$defineProperty(exports, "__esModule", {
	  value: true
	});

	exports["default"] = {};
	module.exports = exports["default"];

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	
	/*
	 * A hash of paused shortcut strings to element selectors
	 * A set in here is considered paused
	 *
	 * @type {Object}
	 */

	"use strict";

	var _Object$defineProperty = __webpack_require__(2)["default"];

	_Object$defineProperty(exports, "__esModule", {
	  value: true
	});

	exports["default"] = {};
	module.exports = exports["default"];

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * This function is the chainable function typically called to add a function to the internal
	 * array of functions bound to an element
	 *
	 * @params {Function}
	 * @returns {Object} Chainable.
	 */

	'use strict';

	var _Object$defineProperty = __webpack_require__(2)['default'];

	var _interopRequireDefault = __webpack_require__(6)['default'];

	_Object$defineProperty(exports, '__esModule', {
	  value: true
	});

	var _mappings = __webpack_require__(10);

	var _mappings2 = _interopRequireDefault(_mappings);

	var _error = __webpack_require__(13);

	var _error2 = _interopRequireDefault(_error);

	exports['default'] = function (fn) {
	  // Stop if not a function
	  if (typeof fn !== 'function') {
	    return (0, _error2['default'])('You must pass a function to the bindsTo method, check the call for the shortcut(\'' + this.keys + '\', \'' + this.domNode.name + '\') method');
	  }

	  _mappings2['default'][this.keys][this.domNode].push(fn);

	  // Return this for chaning
	  return this;
	};

	module.exports = exports['default'];

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _Object$defineProperty = __webpack_require__(2)["default"];

	_Object$defineProperty(exports, "__esModule", {
	  value: true
	});

	exports["default"] = function (msg) {
	  throw new Error(msg);
	};

	module.exports = exports["default"];

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	
	/*
	 * Pauses dispatching for the associated keyboard shortcut
	 *
	 * @chainable
	 */

	'use strict';

	var _Object$defineProperty = __webpack_require__(2)['default'];

	var _interopRequireDefault = __webpack_require__(6)['default'];

	_Object$defineProperty(exports, '__esModule', {
	  value: true
	});

	var _paused_mappings = __webpack_require__(11);

	var _paused_mappings2 = _interopRequireDefault(_paused_mappings);

	exports['default'] = function () {
	  // check if element and keys exists in mappings
	  if (_paused_mappings2['default'][this.keys] === undefined) {
	    _paused_mappings2['default'][this.keys] = this.domNode;
	  }

	  this.isPaused = true;

	  // Drops the functions from the mappings
	  return this;
	};

	module.exports = exports['default'];

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	
	/*
	 * Resumes dispatching for the associated keyboard shortcut
	 *
	 * @chainable
	 */

	'use strict';

	var _Object$defineProperty = __webpack_require__(2)['default'];

	var _interopRequireDefault = __webpack_require__(6)['default'];

	_Object$defineProperty(exports, '__esModule', {
	  value: true
	});

	var _paused_mappings = __webpack_require__(11);

	var _paused_mappings2 = _interopRequireDefault(_paused_mappings);

	exports['default'] = function () {
	  // destroy key/value of this.keys
	  if (_paused_mappings2['default'][this.keys]) {
	    delete _paused_mappings2['default'][this.keys];
	  }

	  this.isPaused = false;

	  return this;
	};

	module.exports = exports['default'];

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	
	/*
	 * unbind functions for a shortcut!
	 *
	 * @chainable
	 */

	'use strict';

	var _Object$defineProperty = __webpack_require__(2)['default'];

	var _interopRequireDefault = __webpack_require__(6)['default'];

	_Object$defineProperty(exports, '__esModule', {
	  value: true
	});

	var _mappings = __webpack_require__(10);

	var _mappings2 = _interopRequireDefault(_mappings);

	exports['default'] = function () {
	  _mappings2['default'][this.keys][this.domNode] = [];

	  return this;
	};

	module.exports = exports['default'];

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	
	/*
	 * Triggering function. It will call the functions
	 * associated to the shortcut assigned
	 *
	 * @chainable
	 */

	'use strict';

	var _Object$defineProperty = __webpack_require__(2)['default'];

	var _interopRequireDefault = __webpack_require__(6)['default'];

	_Object$defineProperty(exports, '__esModule', {
	  value: true
	});

	var _global_pause = __webpack_require__(1);

	var _global_pause2 = _interopRequireDefault(_global_pause);

	exports['default'] = function () {
	  var fns = this.functions(),
	      fakeEvent = { preventDefault: function preventDefault() {} },
	      i;

	  if ((0, _global_pause2['default'])() || this.isPaused) {
	    return false;
	  }

	  for (i in fns) {
	    if (fns.hasOwnProperty(i)) {
	      fns[i](fakeEvent);
	    }
	  }

	  return this;
	};

	module.exports = exports['default'];

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Object$defineProperty = __webpack_require__(2)['default'];

	var _interopRequireDefault = __webpack_require__(6)['default'];

	_Object$defineProperty(exports, '__esModule', {
	  value: true
	});

	var _evaluate_key = __webpack_require__(19);

	var _evaluate_key2 = _interopRequireDefault(_evaluate_key);

	var _global_pause = __webpack_require__(1);

	var _global_pause2 = _interopRequireDefault(_global_pause);

	var _mappings = __webpack_require__(10);

	var _mappings2 = _interopRequireDefault(_mappings);

	var _shortcut = __webpack_require__(8);

	var _shortcut2 = _interopRequireDefault(_shortcut);

	var downKeys = [];

	/*
	 * When a key is pressed, we add it to the internal array, and check if we have any matches to fire functions
	 *
	 * @params {EventData}
	 */

	function onKeyDown(e) {
	  var domNode = e.srcElement || e.target.selector,
	      downKeyString,
	      i,
	      shortcutInstance,
	      shortcutFns;

	  downKeys.push((0, _evaluate_key2['default'])(e));
	  downKeyString = downKeys.join(' ');

	  // Do nothing during globalPause
	  // or if we do not have that mapping, return
	  if ((0, _global_pause2['default'])() || _mappings2['default'][downKeyString] === undefined) {
	    return;
	  }

	  shortcutInstance = (0, _shortcut2['default'])(downKeyString, domNode);
	  console.log(shortcutInstance);
	  shortcutFns = shortcutInstance.functions();

	  if (shortcutFns.length) {
	    downKeys = []; // clear down keys
	    if (_shortcut2['default'].isPaused) {
	      return;
	    }

	    // Call functions
	    for (i in shortcutFns) {
	      shortcutFns[i](e);
	    }
	  }
	}

	/*
	 * When a key is lifted up, we remove it from the internal hash
	 *
	 * @params {EventData}
	 */

	function onKeyUp(e) {
	  var index = downKeys.indexOf((0, _evaluate_key2['default'])(e));

	  if (index !== -1) {
	    downKeys.splice(index, 1);
	  }
	}

	/*
	 * The actual event binding logic. Detects if the keys are being pressed
	 * at the same time, in the correct object
	 */

	exports['default'] = function () {
	  if (!/Mobi/.test(navigator.userAgent)) {
	    if (window.addEventListener) {
	      window.addEventListener('keydown', onKeyDown);
	      window.addEventListener('keyup', onKeyUp);
	    } else {
	      document.attachEvent('onkeydown', onKeyDown);
	      document.attachEvent('onkeyup', onKeyUp);
	    }
	  }
	};

	module.exports = exports['default'];

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	
	/*
	 * Takes EventData and returns a character string
	 *
	 * @params {Event}
	 * @returns {String}
	 */

	'use strict';

	var _Object$defineProperty = __webpack_require__(2)['default'];

	_Object$defineProperty(exports, '__esModule', {
	  value: true
	});

	exports['default'] = function (e) {
	  var OS_MAP = {},
	      character;

	  OS_MAP[osModKeyName()] = 'mod';

	  // grap character for special cases
	  character = specialCases(e.keyCode);

	  if (OS_MAP[character]) {
	    // grap character for special cases
	    character = OS_MAP[character];
	  }

	  /*
	   * if the character doesnt match a special case
	   * we just can trust the charCode lookup method
	   */
	  if (!character) {
	    character = String.fromCharCode(e.keyCode || e.charCode).toLowerCase();
	  }

	  return character;
	};

	/*
	 * this maps to readable words that can be used for the shortcut
	 * library
	 */
	function specialCases(keyCode) {
	  var character;

	  switch (keyCode) {
	    case 190:
	      character = '.';
	      break;
	    case 224:
	      //firefox meta
	      character = 'meta';
	      break;
	    case 91:
	      character = 'meta';
	      break;
	    case 16:
	      character = 'shift';
	      break;
	    case 18:
	      character = 'optn';
	      break;
	    case 17:
	      character = 'ctrl';
	      break;
	    case 32:
	      character = 'space';
	      break;
	    case 40:
	      character = 'down';
	      break;
	    case 39:
	      character = 'right';
	      break;
	    case 38:
	      character = 'up';
	      break;
	    case 37:
	      character = 'left';
	      break;
	    case 9:
	      character = 'tab';
	      break;
	    case 13:
	      character = 'rtn';
	      break;
	  }

	  return character;
	}

	function osModKeyName() {
	  return /Mac|iPod|iPhone|iPad/.test(navigator.platform) ? 'meta' : 'ctrl';
	}
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;