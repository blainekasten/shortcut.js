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

import globalPause from './GlobalPause';

export default function trigger() : object {
  const shorcutFunctions: Array<Function> = this.functions();
  const fakeEvent: Object = {
    preventDefault: function(){},
    target: this.domNode,
  }; // TODO: Expand Synethetic Event


  if (globalPause() || this.isPaused){
    return this;
  }

  for (const i: Function in shorcutFunctions){
    if (shorcutFunctions.hasOwnProperty(i)) {
      shorcutFunctions[i](fakeEvent);
    }
  }

  return this;
}
