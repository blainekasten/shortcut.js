var downKeys = [];

import evaluateKey from './evaluate_key';
import globalPause from './global_pause';
import mappings from './mappings';
import shortcut from './shortcut';

/*
 * When a key is pressed, we add it to the internal array, and check if we have any matches to fire functions
 *
 * @params {EventData}
 */

function onKeyDown(e) {
  var selector = e.srcElement ? e.srcElement.selector : e.target.selector,
      downKeyString, i, shortcutInstance, shortcutFns;

  downKeys.push(evaluateKey(e));
  downKeyString = downKeys.join(' ');

  // Do nothing during globalPause
  // or if we do not have that mapping, return
  if (globalPause() ||
     mappings[downKeyString] === undefined){
    return;
  }


  shortcutInstance = shortcut(downKeyString, selector);
  shortcutFns = shortcutInstance.functions();

  if (shortcutFns.length){
    downKeys = []; // clear down keys
    if (shortcut.isPaused){ return; }

    // Call functions
    for (i in shortcutFns){
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
  var index = downKeys.indexOf(evaluateKey(e));

  if (index !== -1) {
    downKeys.splice(index, 1);
  }
}



/*
 * The actual event binding logic. Detects if the keys are being pressed
 * at the same time, in the correct object
 */

export default function() {
  if ( !/Mobi/.test(navigator.userAgent) ) {
    if (window.addEventListener){
      window.addEventListener('keydown', onKeyDown);
      window.addEventListener('keyup', onKeyUp);
    } else {
      document.attachEvent('onkeydown', onKeyDown);
      document.attachEvent('onkeyup', onKeyUp);
    }
  }

}
