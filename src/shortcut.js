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

import mappings from './Mappings';
import pausedMappings from './PausedMappings';
import bindsTo from './BindsTo';
import preventDefault from './PreventDefault';
import stopPropagation from './StopPropagation';
import pause from './Pause';
import resume from './Resume';
import unbind from './Unbind';
import trigger from './Trigger';
import error from './Error';

export default function shortcut(shortcutStr: string, domNode: HTMLElement) : object {

  // Should we envify these?
  if (!domNode || domNode.ELEMENT_NODE !== 1) {
    return error(
      `You must pass a function as a second argument to 'shortcut(string, domNode)'. Check the definition of 'shortcut("${shortcutStr}", ${domNode})`
    );
  }

  if (!shortcutStr || typeof shortcutStr !== 'string'){
    return error(
      `You must pass a string as your first argument to 'shortcut(string, domNode)'. Check the definition of 'shortcut("${shortcutStr}", ${domNode})`
    );
  }

  // check if element and keys exists in mappings
  if (mappings[shortcutStr] === undefined){
    mappings[shortcutStr] = {};
  }

  if (mappings[shortcutStr][domNode] === undefined) {
    mappings[shortcutStr][domNode] = { keyDown: [], keyUp: [] };
  }

  // decides if the shortcut is paused
  const isPaused: boolean = pausedMappings[shortcutStr] === domNode ? true : false;

  // Chaining methods
  return {
    bindsTo: bindsTo.bind(null, 'keyUp'),
    domNode,
    functions: () => mappings[shortcutStr][domNode],
    isPaused,
    keys: shortcutStr,
    onKeyDown: bindsTo.bind(null, 'keyDown'),
    pause,
    preventDefault,
    stopPropagation,
    resume,
    trigger,
    unbind,
  };
}
