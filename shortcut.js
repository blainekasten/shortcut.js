/**
 * Shorcut.js library
 *
 * Released under the MIT license
 * Copyright 2014 Blaine Kasten
 */

;(function(window){
  var mappings, pausedMappings, shortcuts, downkeys, shortcut, globalPause,
      _noConflict, DOM_LOADED;

  /*
   * if window.shortcut previously existed, we can use a noConflict method
   * to return the shortcut namespace
   */

  _noConflict = window.shortcut;


  /*
   * Boolean to know when the dom is loaded
   *
   * @defaults false
   */

  DOM_LOADED = false;


  /*
   * The actual event binding logic. Detects if the keys are being pressed
   * at the same time, in the correct object
   */

  window.addEventListener('keydown', onKeyDown);
  window.addEventListener('keyup', onKeyUp);


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

  mappings = {};


  /*
   * A hash of paused shortcut strings to element selectors
   * A set in here is considered paused
   *
   * @type {Object}
   */

  pausedMappings = {};


  /*
   * This array of selectors is used to save computation on keydowns.
   * We can iterate through the list here to find selectors that need to be fired
   *
   * @type {Array}
   */

  shortcuts = [];


  /*
   * An array of keys that are being pressed down at any one time.
   *
   * @type {Array}
   */

  downKeys = [];


  /*
   * Function which accepts a string of keys that should be pressed in unison
   * and an element selector to bind the keys to
   *
   * @params {String}
   * @params {String} optional. If none is selected, selector defaults to window object
   * @returns {Object}
   */

  shortcut = function(shortcutStr, selector){
    var el, isPaused;
    if (!shortcutStr || typeof shortcutStr !== 'string') return false;

    selector = selector || 'body';

    // check if element and keys exists in mappings
    if (mappings[shortcutStr] === undefined) mappings[shortcutStr] = {};
    if (mappings[shortcutStr][selector] === undefined) mappings[shortcutStr][selector] = [];

    // Push shortcut into array
    shortcuts.push(shortcutStr);

    if (DOM_LOADED){
      el = findElement(selector);
      if (el) el.selector = selector;
    }

    isPaused = pausedMappings[shortcutStr] === selector ? true : false;

    // Chaining methods
    return {
      bindsTo: _bindsTo,
      preventDefault: _preventDefault,
      pause: _pause,
      resume: _resume,
      trigger: _trigger,
      unbind: _unbind,
      isPaused: isPaused,
      keys: shortcutStr,
      selector: selector,
      get functions() {
        return mappings[shortcutStr][selector];
      },
    };

  };


  /*
   * NO CONFLICT function
   *
   * @chainable
   */

  shortcut.noConflict = function(){
    window.shortcut = _noConflict;
    return this;
  };


  /*
   * A pause function. This prevents anything from being registered or called
   * until shortcut.resume() is called
   *
   * @chainable
   */

  shortcut.pause = function(){
    globalPause = true;

    return shortcut;
  };


  /*
   * Resume function. This will make undo shortcut.pause()
   *
   * @chainable
   */

  shortcut.resume = function(){
    globalPause = false;

    return shortcut;
  };


  /*
   * Pauses dispatching for the associated keyboard shortcut
   *
   * @chainable
   */

  function _pause(){
    // check if element and keys exists in mappings

    if (pausedMappings[this.keys] === undefined) pausedMappings[this.keys] = this.selector;
    this.isPaused = true;

    // Drops the functions from the mappings
    return this;
  }


  /*
   * Resumes dispatching for the associated keyboard shortcut
   *
   * @chainable
   */

  function _resume(){
    // destroy key/value of this.keys
    if (pausedMappings[this.keys]) delete pausedMappings[this.keys];

    this.isPaused = false;

    return this;
  }

  /*
   * Triggering function. It will call the functions
   * associated to the shortcut assigned
   *
   * @chainable
   */

  function _trigger(){
    if (globalPause || this.isPaused) return;

    var fns = this.functions,
        fakeEvent = {preventDefault: function(){}}; // TODO: Expand this

    for (var i in fns){
      fns[i](fakeEvent);
    }

    return this;
  }


  /*
   * unbind functions for a shortcut!
   *
   * @chainable
   */

  function _unbind(){
    mappings[this.keys][this.selector] = [];

    return this;
  }


  /*
   * Makes a key binding preventDefault
   *
   * @chainable
   */

  function _preventDefault(){
    var preventDefault = function(e){
      e.preventDefault();
      return false;
    };
    this.bindsTo(preventDefault);

    return this;
  }


  /*
   * This function is the chainable function typically called to add a function to the internal
   * array of functions bound to an element
   *
   * @params {Function}
   * @returns {Object} Chainable.
   */

  function _bindsTo(fn){
    // Stop if not a function
    if (typeof fn !== 'function') return error("You must pass a function to the bindsTo functoin");

    // Add function to array
    mappings[this.keys][this.selector].push(fn);

    // Return this for chaning
    return this;
  }


  /*
   * Internal function to find Elements in the DOM
   * via query selector
   *
   * @params {String}
   * @returns {HTMLElement}
   */

  function findElement(selector){
    // Should be more elaborate to work accross browsers
    return document.querySelector(selector);
  }


  /*
   * Internal IE 8 approved error messaging
   *
   * @params {String}
   */

  function error(msg){
    throw new Error(msg);
  }


  /*
   * When a key is pressed, we add it to the internal array, and check if we have any matches to fire functions
   *
   * @params {EventData}
   */

  function onKeyDown(e){
    downKeys.push(evaluateKey(e));
    var _shortcut,
        downKeyString = downKeys.join(' ');

    // Do nothing during globalPause
    if (globalPause) return;

    _shortcut = shortcut(downKeyString, e.target.selector);

    if (_shortcut.functions && _shortcut.functions.length){
      downKeys = [];
      if (_shortcut.isPaused) return;

      // Call functions
      for (var _i in _shortcut.functions){
        _shortcut.functions[_i](e);
      }
    }
  }


  /*
   * When a key is lifted up, we remove it from the internal hash
   *
   * @params {EventData}
   */

  function onKeyUp(e){
    index = downKeys.indexOf(evaluateKey(e));
    if (index !== -1)
      downKeys.splice(index, 1);
  }

  /*
   * Takes EventData and returns a character string
   *
   * @params {Event}
   * @returns {String}
   */

  function evaluateKey(e){
    var char;
    switch(e.keyCode){
      case 224: //firefox meta
        char = 'meta'; 
        break;
      case 91:
        char = 'meta';
        break;
      case 16:
        char = 'shift';
        break;
      case 18:
        char = 'optn';
        break;
      case 17:
        char = 'ctrl';
        break;
      case 32:
        char = 'space';
        break;
      case 40:
        char = 'down';
        break;
      case 39:
        char = 'right';
        break;
      case 38:
        char = 'up';
        break;
      case 37:
        char = 'left';
        break;
      case 9:
        char = 'tab';
        break;
      case 13:
        char = 'rtn';
        break;
    }

    if (!char)
      char = String.fromCharCode(e.keyCode || e.charCode).toLowerCase();
    return char;
  }


  /*
   * DOM Ready function
   *
   * @params {Function}
   */

  (function(){
    var called = false;

    function ready() { 
      DOM_LOADED = true;

      if (called) return;
      called = true;
      // Set up dom selectors
      document.querySelector('body').selector = 'body';

      // Iterate through shortcuts
      for (var key in mappings){
        var elSelectors = mappings[key];

        // Iterate through DOM selectors
        for (var selectorKey in elSelectors){
          var el = findElement(selectorKey);

          // Report error if no element was not found. 
          if (!el){
            error("An element was not found for selector: " + selector);
            return;
          }

          // Assign selector to the selectorKey, for future grabbing
          el.selector = selectorKey;
        }
      }
    }


    if ( document.addEventListener ) { // native event
        document.addEventListener( "DOMContentLoaded", ready, false );
    } else if ( document.attachEvent ) {  // IE
        var isFrame;

        try {
            isFrame = window.frameElement !== null;
        } catch(e) {}

        // IE, the document is not inside a frame
        if ( document.documentElement.doScroll && !isFrame ) {
            var tryScroll = function(){
                if (called) return;
                try {
                    document.documentElement.doScroll("left");
                    ready();
                } catch(e) {
                    setTimeout(tryScroll, 10);
                }
            };
            tryScroll();
        }

        // IE, the document is inside a frame
        document.attachEvent("onreadystatechange", function(){
            if ( document.readyState === "complete" ) {
                ready();
            }
        });
    }

    // Old browsers
    if (window.addEventListener)
        window.addEventListener('load', ready, false);
    else if (window.attachEvent)
        window.attachEvent('onload', ready);
    else {
        var fn = window.onload; // very old browser, copy old onload
        window.onload = function() { // replace by new onload and call the old one
            fn && fn();
            ready();
        };
    }
  })();


  // Export to window object
  window.shortcut = shortcut;


  // Export shortcut as an AMD module
  if (typeof define === 'function' && define.amd) {
    define(shortcut);
  }

})(window);
