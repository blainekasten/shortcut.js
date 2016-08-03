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

let downKeys: Array<string> = [];
let clearDownKeysTimeout;

/*
 * When a key is pressed, we add it to the internal array, and check if we have any matches to fire functions
 */
function onKeyDown(e: KeyboardEvent) : void {
  if (globalPause()) {
    return;
  }

  downKeys.push(evaluateKey(e));

  clearTimeout(clearDownKeysTimeout);
  clearDownKeysTimeout = setTimeout(function clearKeys() {
    downKeys = [];
  }, 500);

  const downKeyString: string = downKeys.join(' ');
  const domNode: HTMLElement = e.target;

  // there is no shortcut bound for this set of
  // keys pressed, so stop
  if (mappings[downKeyString] === undefined) {
    return;
  }

  callShortcutFunctions(downKeyString, domNode, e);
}


/*
 * When a key is lifted up, we remove it from the internal hash
 */

function onKeyUp(e: Event) : void {
  if (globalPause()) {
    return;
  }

  const index: number = downKeys.indexOf(evaluateKey(e));

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
export function callShortcutFunctions(downKeyString: string, domNode: HTMLElement, e: KeyboardEvent) : void {
  const shortcutInstance: Object = shortcut(downKeyString, domNode);

  // shortcut is paused, so stop
  if (shortcutInstance.isPaused) {
    return;
  }

  const shortcutFns: Array<Function> = shortcutInstance.functions();
  let allowPropagationToBody: boolean = true;

  e.stopPropagation = function propagationStopper() {
    allowPropagationToBody = false;
  };

  // Call functions
  for (const i in shortcutFns) {
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

export default function eventBinding() : void {
  if (typeof window === 'undefined') {
    return;
  }

  if ( !/Mobi/.test(navigator.userAgent)) {
    if (window.addEventListener) {
      window.addEventListener('keydown', onKeyDown);
      window.addEventListener('keyup', onKeyUp);
    } else {
      document.attachEvent('onkeydown', onKeyDown);
      document.attachEvent('onkeyup', onKeyUp);
    }
  }
}
