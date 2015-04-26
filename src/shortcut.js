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

import domLoaded from './dom_loaded.js';
import mappings from './mappings';
import pausedMappings from './paused_mappings';
import bindsTo from './binds_to';
import preventDefaultFn from './prevent_default';
import pauseFn from './pause';
import resumeFn from './resume';
import unbindFn from './unbind';
import triggerFn from './trigger';


export default function(shortcutStr, selector){
  var el, isPaused;

  if (!shortcutStr || typeof shortcutStr !== 'string'){ return false; }

  selector = selector || 'body'; // Defaults to body

  // check if element and keys exists in mappings
  if (mappings[shortcutStr] === undefined){ mappings[shortcutStr] = {}; }
  if (mappings[shortcutStr][selector] === undefined){ mappings[shortcutStr][selector] = []; }


  // Make sure elements get the selector tied to it
  if (domLoaded()){
    el = document.querySelector(selector);
    if (el){ el.selector = selector; }
  }

  // decides if the shortcut is paused
  isPaused = pausedMappings[shortcutStr] === selector ? true : false;

  // Chaining methods
  return {
    bindsTo: bindsTo,
    preventDefault: preventDefaultFn,
    pause: pauseFn,
    resume: resumeFn,
    trigger: triggerFn,
    unbind: unbindFn,
    isPaused: isPaused,
    keys: shortcutStr,
    selector: selector,
    functions: () => mappings[shortcutStr][selector]
  };
}
