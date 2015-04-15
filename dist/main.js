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

	var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _indexPolyfill = __webpack_require__(1);

	var _indexPolyfill2 = _interopRequireWildcard(_indexPolyfill);

	var _globalPause = __webpack_require__(2);

	var _globalPause2 = _interopRequireWildcard(_globalPause);

	var _shortcut = __webpack_require__(3);

	var _shortcut2 = _interopRequireWildcard(_shortcut);

	var _eventBinding = __webpack_require__(4);

	var _eventBinding2 = _interopRequireWildcard(_eventBinding);

	var noConflictShortcut = window.shortcut,
	    globalPause,
	    shortcut;

	_indexPolyfill2['default']();

	/*
	 * NO CONFLICT function
	 *
	 * @chainable
	 */

	_shortcut2['default'].noConflict = function () {
	  window.shortcut = noConflictShortcut;
	  return this;
	};

	/*
	 * A pause function. This prevents anything from being registered or called
	 * until shortcut.resume() is called
	 *
	 * @chainable
	 */

	_shortcut2['default'].pause = function () {
	  _globalPause2['default'](true);

	  return _shortcut2['default'];
	};

	/*
	 * Resume function. This will make undo shortcut.pause()
	 *
	 * @chainable
	 */

	_shortcut2['default'].resume = function () {
	  _globalPause2['default'](false);

	  return _shortcut2['default'];
	};

	_eventBinding2['default']();
	exports['default'] = _shortcut2['default'];
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	/* eslint-disable */

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
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/*
	 * defaults to false,
	 * essentially says if any fns should be emitted or not
	 */

	var globalPause = false;

	exports["default"] = function (setter) {
	  if (setter) {
	    globalPause = setter;
	  }

	  return globalPause;
	};

	module.exports = exports["default"];

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
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

	var _domLoaded = __webpack_require__(5);

	var _domLoaded2 = _interopRequireWildcard(_domLoaded);

	var _mappings = __webpack_require__(6);

	var _mappings2 = _interopRequireWildcard(_mappings);

	var _pausedMappings = __webpack_require__(7);

	var _pausedMappings2 = _interopRequireWildcard(_pausedMappings);

	var _bindsToFn = __webpack_require__(8);

	var _bindsToFn2 = _interopRequireWildcard(_bindsToFn);

	var _preventDefaultFn = __webpack_require__(9);

	var _preventDefaultFn2 = _interopRequireWildcard(_preventDefaultFn);

	var _pauseFn = __webpack_require__(10);

	var _pauseFn2 = _interopRequireWildcard(_pauseFn);

	var _resumeFn = __webpack_require__(11);

	var _resumeFn2 = _interopRequireWildcard(_resumeFn);

	var _unbindFn = __webpack_require__(12);

	var _unbindFn2 = _interopRequireWildcard(_unbindFn);

	var _triggerFn = __webpack_require__(13);

	var _triggerFn2 = _interopRequireWildcard(_triggerFn);

	exports['default'] = function (shortcutStr, selector) {
	  var el, isPaused;

	  if (!shortcutStr || typeof shortcutStr !== 'string') {
	    return false;
	  }

	  selector = selector || 'body'; // Defaults to body

	  // check if element and keys exists in mappings
	  if (_mappings2['default'][shortcutStr] === undefined) {
	    _mappings2['default'][shortcutStr] = {};
	  }
	  if (_mappings2['default'][shortcutStr][selector] === undefined) {
	    _mappings2['default'][shortcutStr][selector] = [];
	  }

	  // Make sure elements get the selector tied to it
	  if (_domLoaded2['default']()) {
	    el = document.querySelector(selector);
	    if (el) {
	      el.selector = selector;
	    }
	  }

	  // decides if the shortcut is paused
	  isPaused = _pausedMappings2['default'][shortcutStr] === selector ? true : false;

	  // Chaining methods
	  return {
	    bindsTo: _bindsToFn2['default'],
	    preventDefault: _preventDefaultFn2['default'],
	    pause: _pauseFn2['default'],
	    resume: _resumeFn2['default'],
	    trigger: _triggerFn2['default'],
	    unbind: _unbindFn2['default'],
	    isPaused: isPaused,
	    keys: shortcutStr,
	    selector: selector,
	    functions: function functions() {
	      return _mappings2['default'][shortcutStr][selector];
	    }
	  };
	};

	module.exports = exports['default'];

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _evaluateKey = __webpack_require__(14);

	var _evaluateKey2 = _interopRequireWildcard(_evaluateKey);

	var _globalPause = __webpack_require__(2);

	var _globalPause2 = _interopRequireWildcard(_globalPause);

	var _mappings = __webpack_require__(6);

	var _mappings2 = _interopRequireWildcard(_mappings);

	var _shortcut = __webpack_require__(3);

	var _shortcut2 = _interopRequireWildcard(_shortcut);

	var downKeys = [];

	/*
	 * When a key is pressed, we add it to the internal array, and check if we have any matches to fire functions
	 *
	 * @params {EventData}
	 */

	function onKeyDown(e) {
	  var selector = e.srcElement ? e.srcElement.selector : e.target.selector,
	      downKeyString,
	      i,
	      shortcutInstance,
	      shortcutFns;

	  downKeys.push(_evaluateKey2['default'](e));
	  downKeyString = downKeys.join(' ');

	  // Do nothing during globalPause
	  // or if we do not have that mapping, return
	  if (_globalPause2['default']() || _mappings2['default'][downKeyString] === undefined) {
	    return;
	  }

	  shortcutInstance = _shortcut2['default'](downKeyString, selector);
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
	  var index = downKeys.indexOf(_evaluateKey2['default'](e));

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
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _error = __webpack_require__(15);

	var _error2 = _interopRequireWildcard(_error);

	var _mappings = __webpack_require__(6);

	var _mappings2 = _interopRequireWildcard(_mappings);

	var DOM_LOADED = false,
	    called = false,
	    key,
	    selectorKey,
	    el,
	    isFrame,
	    tryScroll,
	    fn,
	    elSelectors;

	(function () {
	  called = false;

	  function ready() {
	    DOM_LOADED = true;

	    if (called) {
	      return;
	    }
	    called = true;
	    // Set up dom selectors
	    document.querySelector('body').selector = 'body';

	    // Iterate through shortcuts
	    for (key in _mappings2['default']) {
	      elSelectors = _mappings2['default'][key];

	      // Iterate through DOM selectors
	      for (selectorKey in elSelectors) {
	        el = document.querySelector(selectorKey);

	        // Report error if no element was not found.
	        if (!el) {
	          _error2['default']('An element was not found for selector: ' + selectorKey);
	          return;
	        }

	        // Assign selector to the selectorKey, for future grabbing
	        el.selector = selectorKey;
	      }
	    }
	  }

	  if (document.addEventListener) {
	    // native event
	    document.addEventListener('DOMContentLoaded', ready, false);
	  } else if (document.attachEvent) {
	    // IE
	    try {
	      isFrame = window.frameElement !== null;
	      /* eslint-disable */
	    } catch (e) {}
	    /* eslint-enable */

	    // IE, the document is not inside a frame
	    if (document.documentElement.doScroll && !isFrame) {
	      tryScroll = function () {
	        if (called) {
	          return;
	        }
	        try {
	          document.documentElement.doScroll('left');
	          ready();
	        } catch (e) {
	          setTimeout(tryScroll, 10);
	        }
	      };
	      tryScroll();
	    }

	    // IE, the document is inside a frame
	    document.attachEvent('onreadystatechange', function () {
	      if (document.readyState === 'complete') {
	        ready();
	      }
	    });
	  }

	  // Old browsers
	  if (window.addEventListener) {
	    window.addEventListener('load', ready, false);
	  } else if (window.attachEvent) {
	    window.attachEvent('onload', ready);
	  } else {
	    fn = window.onload; // very old browser, copy old onload
	    window.onload = function () {
	      // replace by new onload and call the old one
	      if (fn) {
	        fn();
	      }
	      ready();
	    };
	  }
	})();

	exports['default'] = function () {
	  return DOM_LOADED;
	};

	module.exports = exports['default'];

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/*
	 * A nested hash of element to keys to functions.
	 * For example this may look like (once populated)
	 *
	 * mappings = {
	 *   'meta shift 8' : {
	 *     '.selector' : [
	 *       function(){...},
	 *       function(){...}
	 *     ]
	 *   }
	 *
	 * @type {Object}
	 */

	exports["default"] = {};
	module.exports = exports["default"];

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	/*
	 * A hash of paused shortcut strings to element selectors
	 * A set in here is considered paused
	 *
	 * @type {Object}
	 */

	exports["default"] = {};
	module.exports = exports["default"];

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	/*
	 * This function is the chainable function typically called to add a function to the internal
	 * array of functions bound to an element
	 *
	 * @params {Function}
	 * @returns {Object} Chainable.
	 */

	var _mappings = __webpack_require__(6);

	var _mappings2 = _interopRequireWildcard(_mappings);

	var _error = __webpack_require__(15);

	var _error2 = _interopRequireWildcard(_error);

	exports['default'] = function (fn) {
	  // Stop if not a function
	  if (typeof fn !== 'function') {
	    return _error2['default']('You must pass a function to the bindsTo functoin');
	  }

	  _mappings2['default'][this.keys][this.selector].push(fn);
	  // Return this for chaning
	  return this;
	};

	module.exports = exports['default'];

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/*
	 * Makes a key binding preventDefault
	 *
	 * @chainable
	 */

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

	'use strict';

	var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	/*
	 * Pauses dispatching for the associated keyboard shortcut
	 *
	 * @chainable
	 */

	var _pausedMappings = __webpack_require__(7);

	var _pausedMappings2 = _interopRequireWildcard(_pausedMappings);

	exports['default'] = function () {
	  // check if element and keys exists in mappings
	  if (_pausedMappings2['default'][this.keys] === undefined) {
	    _pausedMappings2['default'][this.keys] = this.selector;
	  }

	  this.isPaused = true;

	  // Drops the functions from the mappings
	  return this;
	};

	module.exports = exports['default'];

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	/*
	 * Resumes dispatching for the associated keyboard shortcut
	 *
	 * @chainable
	 */

	var _pausedMappings = __webpack_require__(7);

	var _pausedMappings2 = _interopRequireWildcard(_pausedMappings);

	exports['default'] = function () {
	  // destroy key/value of this.keys
	  if (_pausedMappings2['default'][this.keys]) {
	    delete _pausedMappings2['default'][this.keys];
	  }

	  this.isPaused = false;

	  return this;
	};

	module.exports = exports['default'];

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	/*
	 * unbind functions for a shortcut!
	 *
	 * @chainable
	 */

	var _mappings = __webpack_require__(6);

	var _mappings2 = _interopRequireWildcard(_mappings);

	exports['default'] = function () {
	  _mappings2['default'][this.keys][this.selector] = [];

	  return this;
	};

	module.exports = exports['default'];

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	/*
	 * Triggering function. It will call the functions
	 * associated to the shortcut assigned
	 *
	 * @chainable
	 */

	var _globalPause = __webpack_require__(2);

	var _globalPause2 = _interopRequireWildcard(_globalPause);

	exports['default'] = function () {
	  var fns = this.functions(),
	      fakeEvent = { preventDefault: function preventDefault() {} },
	      i;

	  if (_globalPause2['default'] || this.isPaused) {
	    return false;
	  }

	  for (i in fns) {
	    fns[i](fakeEvent);
	  }

	  return this;
	};

	module.exports = exports['default'];

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	/*
	 * Takes EventData and returns a character string
	 *
	 * @params {Event}
	 * @returns {String}
	 */

	exports['default'] = function (e) {
	  var OS_MOD_KEY_NAME = /Mac|iPod|iPhone|iPad/.test(navigator.platform) ? 'meta' : 'ctrl',
	      OS_MAP = {},
	      character;

	  OS_MAP[OS_MOD_KEY_NAME] = 'mod';

	  switch (e.keyCode) {
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

	  if (OS_MAP[character]) {
	    character = OS_MAP[character];
	  }

	  if (!character) {
	    character = String.fromCharCode(e.keyCode || e.charCode).toLowerCase();
	  }
	  return character;
	};

	module.exports = exports['default'];

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports["default"] = function (msg) {
	  throw new Error(msg);
	};

	module.exports = exports["default"];

/***/ }
/******/ ])
});
;