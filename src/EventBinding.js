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

/*
 * When a key is pressed, we add it to the internal array, and check if we have any matches to fire functions
 */
function onKeyDown(e: Event) : void {
  downKeys.push(evaluateKey(e));

  const downKeyString: String = downKeys.join(' ');
  const domNode: HTMLElement = e.target;

  // Do nothing during globalPause, shortcut pause
  // or if we do not have that mapping, return
  if (globalPause() ||
      mappings[downKeyString] === undefined
     ){
    return;
  }

  const shortcutInstance: Object = shortcut(downKeyString, domNode);
  const shortcutFns: Array<Function> = shortcutInstance.functions();

  // we have a match, time to react
  if (shortcutFns.length){
    if (shortcutInstance.isPaused){
      return;
    }

    // Call functions
    for (const i in shortcutFns){
      shortcutFns[i](e);
    }
  }
}


/*
 * When a key is lifted up, we remove it from the internal hash
 */

function onKeyUp(e: Event) : void {
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
