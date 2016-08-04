(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
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

	/**
	 * Copyright 2015-2016, Blaine Kasten
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule shortcut
	 */

	'use strict';

	var _interopRequireDefault = __webpack_require__(1)['default'];

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _IndexOfPolyfill = __webpack_require__(2);

	var _IndexOfPolyfill2 = _interopRequireDefault(_IndexOfPolyfill);

	var _GlobalPause = __webpack_require__(3);

	var _GlobalPause2 = _interopRequireDefault(_GlobalPause);

	var _Shortcut = __webpack_require__(4);

	var _Shortcut2 = _interopRequireDefault(_Shortcut);

	var _EventBinding = __webpack_require__(15);

	var _EventBinding2 = _interopRequireDefault(_EventBinding);

	(0, _IndexOfPolyfill2['default'])();
	(0, _EventBinding2['default'])();

	/*
	 * A pause function. This prevents anything from being registered or called
	 * until shortcut.resume() is called
	 *
	 * @chainable
	 */

	_Shortcut2['default'].pause = function pause() {
	  (0, _GlobalPause2['default'])(true);

	  return _Shortcut2['default'];
	};

	/*
	 * Resume function. This will make undo shortcut.pause()
	 *
	 * @chainable
	 */

	_Shortcut2['default'].resume = function resume() {
	  (0, _GlobalPause2['default'])(false);

	  return _Shortcut2['default'];
	};

	exports['default'] = _Shortcut2['default'];
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	exports["default"] = function (obj) {
	  return obj && obj.__esModule ? obj : {
	    "default": obj
	  };
	};

	exports.__esModule = true;

/***/ },
/* 2 */
/***/ function(module, exports) {

	/**
	 * Copyright 2015-2016, Blaine Kasten
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule indexOf
	 */

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = indexOfPolyfill;

	function indexOfPolyfill() {
	  if (!Array.prototype.indexOf) {
	    Array.prototype.indexOf = function indexOf(element) {
	      // eslint-disable-line
	      var length = this.length >>> 0;

	      var from = Number(arguments[1]) || 0;

	      from = from < 0 ? Math.ceil(from) : Math.floor(from);

	      if (from < 0) {
	        from += length;
	      }

	      for (; from < length; from++) {
	        if (from in this && this[from] === element) {
	          return from;
	        }
	      }

	      return -1;
	    };
	  }
	}

	module.exports = exports["default"];

/***/ },
/* 3 */
/***/ function(module, exports) {

	/**
	 * Copyright 2015-2016, Blaine Kasten
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * defaults to false,
	 * essentially says if any fns should be emitted or not
	 *
	 * @providesModule Error
	 */

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = globalPause;
	var globalPause = false;

	function globalPause(setter) {
	  if (typeof setter === 'boolean') {
	    exports.globalPause = globalPause = setter;
	  }

	  return globalPause;
	}

	module.exports = exports['default'];

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2015-2016, Blaine Kasten
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * Entry function.
	 *
	 * usage:
	 *  shortcut('a b', HTMLElement).bindsTo(myMethod)
	 *
	 * @providesModule Resume
	 */

	'use strict';

	var _interopRequireDefault = __webpack_require__(1)['default'];

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = shortcut;

	var _Mappings = __webpack_require__(5);

	var _Mappings2 = _interopRequireDefault(_Mappings);

	var _PausedMappings = __webpack_require__(6);

	var _PausedMappings2 = _interopRequireDefault(_PausedMappings);

	var _BindsTo = __webpack_require__(7);

	var _BindsTo2 = _interopRequireDefault(_BindsTo);

	var _PreventDefault = __webpack_require__(9);

	var _PreventDefault2 = _interopRequireDefault(_PreventDefault);

	var _StopPropagation = __webpack_require__(10);

	var _StopPropagation2 = _interopRequireDefault(_StopPropagation);

	var _Pause = __webpack_require__(11);

	var _Pause2 = _interopRequireDefault(_Pause);

	var _Resume = __webpack_require__(12);

	var _Resume2 = _interopRequireDefault(_Resume);

	var _Unbind = __webpack_require__(13);

	var _Unbind2 = _interopRequireDefault(_Unbind);

	var _Trigger = __webpack_require__(14);

	var _Trigger2 = _interopRequireDefault(_Trigger);

	var _Error = __webpack_require__(8);

	var _Error2 = _interopRequireDefault(_Error);

	function shortcut(shortcutStr, domNode) {
	  // Should we envify these?
	  if (!domNode || domNode.ELEMENT_NODE !== 1) {
	    return (0, _Error2['default'])('You must pass a function as a second argument to \'shortcut(string, domNode)\'. Check the definition of \'shortcut("' + shortcutStr + '", ' + domNode + ')');
	  }

	  if (!shortcutStr || typeof shortcutStr !== 'string') {
	    return (0, _Error2['default'])('You must pass a string as your first argument to \'shortcut(string, domNode)\'. Check the definition of \'shortcut("' + shortcutStr + '", ' + domNode + ')');
	  }

	  // check if element and keys exists in mappings
	  if (_Mappings2['default'][shortcutStr] === undefined) {
	    _Mappings2['default'][shortcutStr] = {};
	  }

	  if (_Mappings2['default'][shortcutStr][domNode] === undefined) {
	    _Mappings2['default'][shortcutStr][domNode] = [];
	  }

	  // decides if the shortcut is paused
	  var isPaused = _PausedMappings2['default'][shortcutStr] === domNode ? true : false;

	  // Chaining methods
	  return {
	    bindsTo: _BindsTo2['default'],
	    domNode: domNode,
	    functions: function functions() {
	      return _Mappings2['default'][shortcutStr][domNode];
	    },
	    isPaused: isPaused,
	    keys: shortcutStr,
	    pause: _Pause2['default'],
	    preventDefault: _PreventDefault2['default'],
	    stopPropagation: _StopPropagation2['default'],
	    resume: _Resume2['default'],
	    trigger: _Trigger2['default'],
	    unbind: _Unbind2['default']
	  };
	}

	module.exports = exports['default'];

/***/ },
/* 5 */
/***/ function(module, exports) {

	/**
	 * Copyright 2015-2016, Blaine Kasten
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
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
	 *
	 * @providesModule Mapping
	 */

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = {};
	module.exports = exports["default"];

/***/ },
/* 6 */
/***/ function(module, exports) {

	/**
	 * Copyright 2015-2016, Blaine Kasten
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * A hash of paused shortcut strings to element selectors
	 * A set in here is considered paused
	 *
	 * @type {Object}
	 *
	 * @providesModule Mapping
	 */

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = {};
	module.exports = exports["default"];

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2015-2016, Blaine Kasten
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * This function is the chainable function typically called to add a function to the internal
	 * array of functions bound to an element
	 *
	 * @providesModule BindsTo
	 */

	'use strict';

	var _interopRequireDefault = __webpack_require__(1)['default'];

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = bindsTo;

	var _Mappings = __webpack_require__(5);

	var _Mappings2 = _interopRequireDefault(_Mappings);

	var _Error = __webpack_require__(8);

	var _Error2 = _interopRequireDefault(_Error);

	function bindsTo(fn) {
	  // Stop if not a function
	  if (typeof fn !== 'function') {
	    return (0, _Error2['default'])('You must pass a function to the bindsTo method, check the call for the shortcut(\'' + this.keys + '\', \'' + this.domNode.name + '\') method');
	  }

	  _Mappings2['default'][this.keys][this.domNode].push(fn);

	  // Return this for chaning
	  return this;
	}

	module.exports = exports['default'];

/***/ },
/* 8 */
/***/ function(module, exports) {

	/**
	 * Copyright 2015-2016, Blaine Kasten
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * This will get replaced by the invariant package
	 *
	 * @providesModule Error
	 */

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports["default"] = function (msg) {
	  throw new Error(msg);
	};

	module.exports = exports["default"];

/***/ },
/* 9 */
/***/ function(module, exports) {

	/**
	 * Copyright 2015-2016, Blaine Kasten
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * Makes a key binding preventDefault
	 * @chainable
	 *
	 * @providesModule PreventDefault
	 */

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = preventDefault;

	function preventDefault() {
	  function _preventDefault(e) {
	    if (e.preventDefault) {
	      e.preventDefault();
	    }

	    e.returnValue = false; // IE prevent Default
	    return false; // Safari Prevent Default
	  }

	  this.bindsTo(_preventDefault);

	  return this;
	}

	module.exports = exports["default"];

/***/ },
/* 10 */
/***/ function(module, exports) {

	/**
	 * Copyright 2015-2016, Blaine Kasten
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * Makes a key binding preventDefault
	 * @chainable
	 *
	 * @providesModule PreventDefault
	 */

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = stopPropagation;

	function stopPropagation() {
	  function _stopPropagation(e) {
	    if (e.stopPropagation) {
	      e.stopPropagation();
	    }
	    return false; // Safari Prevent Default
	  }

	  this.bindsTo(_stopPropagation);

	  return this;
	}

	module.exports = exports["default"];

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2015-2016, Blaine Kasten
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * Pauses dispatching for the associated keyboard shortcut
	 *
	 * @providesModule Mapping
	 */

	'use strict';

	var _interopRequireDefault = __webpack_require__(1)['default'];

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = pause;

	var _PausedMappings = __webpack_require__(6);

	var _PausedMappings2 = _interopRequireDefault(_PausedMappings);

	function pause() {
	  // check if element and keys exists in mappings
	  if (_PausedMappings2['default'][this.keys] === undefined) {
	    _PausedMappings2['default'][this.keys] = this.domNode;
	  }

	  this.isPaused = true;

	  // Drops the functions from the mappings
	  return this;
	}

	module.exports = exports['default'];

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2015-2016, Blaine Kasten
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * Resumes dispatching for the associated keyboard shortcut
	 * @chainable
	 *
	 * @providesModule Resume
	 */

	'use strict';

	var _interopRequireDefault = __webpack_require__(1)['default'];

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = resume;

	var _PausedMappings = __webpack_require__(6);

	var _PausedMappings2 = _interopRequireDefault(_PausedMappings);

	function resume() {
	  // destroy key/value of this.keys
	  if (_PausedMappings2['default'][this.keys]) {
	    delete _PausedMappings2['default'][this.keys];
	  }

	  this.isPaused = false;

	  return this;
	}

	module.exports = exports['default'];

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2015-2016, Blaine Kasten
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * Unbinds a shortcut
	 * @chainable
	 *
	 * @providesModule Unbind
	 */

	'use strict';

	var _interopRequireDefault = __webpack_require__(1)['default'];

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = unbind;

	var _Mappings = __webpack_require__(5);

	var _Mappings2 = _interopRequireDefault(_Mappings);

	function unbind() {
	  _Mappings2['default'][this.keys][this.domNode] = [];

	  return this;
	}

	module.exports = exports['default'];

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2015-2016, Blaine Kasten
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * Triggering function. It will call the functions
	 * associated to the shortcut assigned
	 * @chainable
	 *
	 * @providesModule Resume
	 */

	'use strict';

	var _interopRequireDefault = __webpack_require__(1)['default'];

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = trigger;

	var _GlobalPause = __webpack_require__(3);

	var _GlobalPause2 = _interopRequireDefault(_GlobalPause);

	var _EventBinding = __webpack_require__(15);

	function trigger() {
	  if ((0, _GlobalPause2['default'])() || this.isPaused) {
	    return this;
	  }

	  var event = new KeyboardEvent('keydown', {});

	  (0, _EventBinding.callShortcutFunctions)(this.keys, this.domNode, event);

	  return this;
	}

	module.exports = exports['default'];

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2015-2016, Blaine Kasten
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule EventBinding
	 */

	'use strict';

	var _interopRequireDefault = __webpack_require__(1)['default'];

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.callShortcutFunctions = callShortcutFunctions;
	exports['default'] = eventBinding;

	var _EvaluateKey = __webpack_require__(16);

	var _EvaluateKey2 = _interopRequireDefault(_EvaluateKey);

	var _GlobalPause = __webpack_require__(3);

	var _GlobalPause2 = _interopRequireDefault(_GlobalPause);

	var _Mappings = __webpack_require__(5);

	var _Mappings2 = _interopRequireDefault(_Mappings);

	var _Shortcut = __webpack_require__(4);

	var _Shortcut2 = _interopRequireDefault(_Shortcut);

	var downKeys = [];
	var clearDownKeysTimeout = undefined;

	/*
	 * When a key is pressed, we add it to the internal array, and check if we have any matches to fire functions
	 */
	function onKeyDown(e) {
	  if ((0, _GlobalPause2['default'])()) {
	    return;
	  }

	  downKeys.push((0, _EvaluateKey2['default'])(e));

	  clearTimeout(clearDownKeysTimeout);
	  clearDownKeysTimeout = setTimeout(function clearKeys() {
	    downKeys = [];
	  }, 500);

	  var downKeyString = downKeys.join(' ');
	  var domNode = e.target;

	  // there is no shortcut bound for this set of
	  // keys pressed, so stop
	  if (_Mappings2['default'][downKeyString] === undefined) {
	    return;
	  }

	  callShortcutFunctions(downKeyString, domNode, e);
	}

	/*
	 * When a key is lifted up, we remove it from the internal hash
	 */

	function onKeyUp(e) {
	  if ((0, _GlobalPause2['default'])()) {
	    return;
	  }

	  var index = downKeys.indexOf((0, _EvaluateKey2['default'])(e));

	  if (index !== -1) {
	    downKeys.splice(index, 1);
	  }
	}

	/*
	 * calls the shortcut function and bubbles
	 * to the document.body
	 *
	 * until we hear of a case for needing to do proper bubbling, I think
	 * this should be efficient and sufficient.
	 */

	function callShortcutFunctions(downKeyString, domNode, e) {
	  var shortcutInstance = (0, _Shortcut2['default'])(downKeyString, domNode);

	  // shortcut is paused, so stop
	  if (shortcutInstance.isPaused) {
	    return;
	  }

	  var shortcutFns = shortcutInstance.functions();
	  var allowPropagationToBody = true;

	  e.stopPropagation = function propagationStopper() {
	    allowPropagationToBody = false;
	  };

	  // Call functions
	  for (var i in shortcutFns) {
	    if (shortcutFns.hasOwnProperty(i)) {
	      shortcutFns[i](e);
	    }
	  }

	  // only bubble to document.body
	  if (domNode !== document.body && allowPropagationToBody) {
	    callShortcutFunctions(downKeyString, document.body, e);
	  }
	}

	/*
	 * The actual event binding logic. Detects if the keys are being pressed
	 * at the same time, in the correct object
	 */

	function eventBinding() {
	  if (typeof window === 'undefined') {
	    return;
	  }

	  if (!/Mobi/.test(navigator.userAgent)) {
	    if (window.addEventListener) {
	      window.addEventListener('keydown', onKeyDown);
	      window.addEventListener('keyup', onKeyUp);
	    } else {
	      document.attachEvent('onkeydown', onKeyDown);
	      document.attachEvent('onkeyup', onKeyUp);
	    }
	  }
	}

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2015-2016, Blaine Kasten
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * Takes EventData and returns a character string
	 *
	 * @providesModule EvaluateKey
	 */

	'use strict';

	var _defineProperty = __webpack_require__(17)['default'];

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = evaluateKey;

	function evaluateKey(e) {
	  var OS_MAP = _defineProperty({}, osModKeyName(), 'mod');

	  // grap character for special cases
	  var character = specialCases(e);

	  if (OS_MAP[character]) {
	    // grap character for special cases
	    character = OS_MAP[character];
	  }

	  return character;
	}

	/*
	 * this maps to readable words that can be used for the shortcut
	 * library
	 */
	function specialCases(_ref) {
	  var keyCode = _ref.keyCode;
	  var charCode = _ref.charCode;

	  var character = undefined;

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
	    default:
	      /*
	       * if the character doesnt match a special case
	       * we just can trust the charCode lookup method
	       */
	      character = String.fromCharCode(keyCode || charCode).toLowerCase();
	      break;
	  }

	  return character;
	}

	function osModKeyName() {
	  return (/Mac|iPod|iPhone|iPad/.test(navigator.platform) ? 'meta' : 'ctrl'
	  );
	}
	module.exports = exports['default'];

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _Object$defineProperty = __webpack_require__(18)["default"];

	exports["default"] = function (obj, key, value) {
	  if (key in obj) {
	    _Object$defineProperty(obj, key, {
	      value: value,
	      enumerable: true,
	      configurable: true,
	      writable: true
	    });
	  } else {
	    obj[key] = value;
	  }

	  return obj;
	};

	exports.__esModule = true;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(19), __esModule: true };

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(20);
	module.exports = function defineProperty(it, key, desc){
	  return $.setDesc(it, key, desc);
	};

/***/ },
/* 20 */
/***/ function(module, exports) {

	var $Object = Object;
	module.exports = {
	  create:     $Object.create,
	  getProto:   $Object.getPrototypeOf,
	  isEnum:     {}.propertyIsEnumerable,
	  getDesc:    $Object.getOwnPropertyDescriptor,
	  setDesc:    $Object.defineProperty,
	  setDescs:   $Object.defineProperties,
	  getKeys:    $Object.keys,
	  getNames:   $Object.getOwnPropertyNames,
	  getSymbols: $Object.getOwnPropertySymbols,
	  each:       [].forEach
	};

/***/ }
/******/ ])
});
;