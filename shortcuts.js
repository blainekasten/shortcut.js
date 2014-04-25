/**
 * Shorcut.js library
 *
 * Released under the MIT license
 * Copyright 2014 Blaine Kasten
 */

;(function(window){
  var mappings, shortcuts, downkeys, shortcut;

  /*
   * if window.shortcut previously existed, we can use a noConflict method
   * to return the shortcut namespace
   */

  var _noConflict = window.shortcut;


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
   */

  mappings = {};


  /*
   * This array of selectors is used to save computation on keydowns.
   * We can iterate through the list here to find selectors that need to be fired
   */

  shortcuts = [];


  /*
   * An array of keys that are being pressed down at any one time.
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
    var keysInternallyExists = false, el;
    document.querySelector('body').selector = 'body';

    if (!selector)
      el = selector = 'body';
    else
      el = findElement(selector);

    // Report error if no element was not found. 
    if (!el){
      error("An element was not found for selector: " + selector);
      return;
    }

    // check if element and keys exists in mappings
    if (mappings[shortcutStr] === undefined) mappings[shortcutStr] = {};
    mappings[shortcutStr][selector] === undefined ? mappings[shortcutStr][selector] = [] : keysInternallyExists = true;

    // Attach the selector to the element for tracking
    el.selector = selector;

    // Push shortcut into array
    shortcuts.push(shortcutStr);

    // Chaining methods
    return {
      bindsTo: _bindsTo,
      keys: shortcutStr,
      el: el,
      selector: selector,
      get functions() {
        return mappings[selector][shortcutStr];
      }
    };

  };


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
    console === undefined ? "" : console.error === undefined ? console.log(msg) : console.error(msg);
  }


  /*
   * When a key is pressed, we add it to the internal array, and check if we have any matches to fire functions
   *
   * @params {EventData}
   */

  function onKeyDown(e){
    downKeys.push(evaluateKey(e));

    // Loop through array of shortcuts
    for (var i in shortcuts){
      var shortcut = shortcuts[i];

      // compare shortcut to array of pressed items
      if (isEqArrays(downKeys, shortcut.split(' '))){
        var fnForShorcut = mappings[shortcut][e.target.selector];

        // Clear the downKeys array so we can accept shortcuts again
        downKeys = [];

        for (var _fn in fnForShorcut){
          fnForShorcut[_fn](e);
        }

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


  function evaluateKey(e){
    var char;
    switch(e.keyCode){
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
   * Checks if a item is in an array
   *
   * @params {Array}
   * @params
   * @returns {Boolean}
   */

  function inArray(array, el) {
    for ( var i = array.length; i--; ) {
      if ( array[i] === el ) return true;
    }
    return false;
  }


  /*
   * Checks if two arrays are equal, ignorant
   * of order.
   *
   * @params {Array, Array}
   * @returns Boolean
   */

  function isEqArrays(arr1, arr2) {
    if ( arr1.length !== arr2.length ) {
      return false;
    }
    for ( var i = arr1.length; i--; ) {
      if ( !inArray( arr2, arr1[i] ) ) {
        return false;
      }
    }
    return true;
  }


  /*
   * Export to window object
   */

  window.shortcut = shortcut;


  /*
   * NO CONFLICT function
   */

  shortcut.noConflict = function(){
    window.shortcut = _noConflict;
    return this;
  };

})(window);
