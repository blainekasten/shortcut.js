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

import evaluateKey from './EvaluateKey';
import globalPause from './GlobalPause';
import mappings from './Mappings';
import shortcut from './Shortcut';

const downKeys: Array<string> = [];
let skipPush: boolean = false;

/*
 * When a key is pressed, we add it to the internal array, and check if we have any matches to fire functions
 */
function onKeyDown(e: Event) : void {
  if (globalPause()) {
    return bubble(e);
  }

  console.log(skipPush);

  if (!skipPush) {
    console.log('pushing keys');
    downKeys.push(evaluateKey(e));
  }

  const downKeyString: String = downKeys.join(' ');
  const domNode: HTMLElement = e.target;

  // there is no shortcut bound for this set of
  // keys pressed, so stop
  if (mappings[downKeyString] === undefined){
    return bubble(e);
  }

  const shortcutInstance: Object = shortcut(downKeyString, domNode);

  // shortcut is paused, so stop
  if (shortcutInstance.isPaused) {
    return bubble(e);
  }

  const shortcutFns: Array<Function> = shortcutInstance.functions();

  // Call functions
  for (const i in shortcutFns){
    if (shortcutFns.hasOwnProperty(i)) {
      shortcutFns[i](e);
    }
  }

  return bubble(e);
}


/*
 * Bubbles the event up the tree so multiple
 * listeners can be triggered by events
 *
 * TODO: Research if this will ever hit a case other than
 *   `document.body`. Potentially more performant to just bubble
 *   straight to `body`
 */
function bubble(e: Event) : void {
  skipPush = true;

  if (e.target.nodeName === 'BODY') {
    return;
  }

  const newEvent = document.createEvent('KeyboardEvent')
  const {
    key, code, location, ctrlKey, shiftKey,
    altKey, metaKey, isComposing, charCode,
    keyCode, which,
  } = e;


  const event: KeyboardEvent = new KeyboardEvent(
    'keydown', {
    key, code, location, ctrlKey, shiftKey,
    altKey, metaKey, isComposing, charCode,
    keyCode, which,
  });

  e.target.parentElement.dispatchEvent(event);
}


/*
 * When a key is lifted up, we remove it from the internal hash
 */

function onKeyUp(e: Event) : void {
  skipPush = false;
  if (globalPause()) {
    return;
  }

  const index: number = downKeys.indexOf(evaluateKey(e));

  if (index !== -1) {
    downKeys.splice(index, 1);
  }
}



/*
 * The actual event binding logic. Detects if the keys are being pressed
 * at the same time, in the correct object
 */

export default function eventBinding() : void {
  if (typeof window === 'undefined') {
    return;
  }

  if ( !/Mobi/.test(navigator.userAgent)) {
    if (window.addEventListener){
      window.addEventListener('keydown', onKeyDown);
      window.addEventListener('keyup', onKeyUp);
    } else {
      document.attachEvent('onkeydown', onKeyDown);
      document.attachEvent('onkeyup', onKeyUp);
    }
  }

}
