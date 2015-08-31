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

import mappings from './mappings';
import pausedMappings from './paused_mappings';
import bindsTo from './binds_to';
import preventDefault from './prevent_default';
import pause from './pause';
import resume from './resume';
import unbind from './unbind';
import trigger from './trigger';


export default function(shortcutStr, domNode){
  var isPaused;

  if (!shortcutStr || typeof shortcutStr !== 'string'){ return false; }

  domNode = domNode || document.body;

  // check if element and keys exists in mappings
  if (mappings[shortcutStr] === undefined){ mappings[shortcutStr] = {}; }
  if (mappings[shortcutStr][domNode] === undefined){ mappings[shortcutStr][domNode] = []; }


  // decides if the shortcut is paused
  isPaused = pausedMappings[shortcutStr] === domNode ? true : false;

  // Chaining methods
  return {
    bindsTo,
    preventDefault,
    pause,
    resume,
    trigger,
    unbind,
    isPaused,
    keys: shortcutStr,
    domNode,
    functions: () => mappings[shortcutStr][domNode]
  };
}
