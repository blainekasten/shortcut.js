/**
 * Copyright 2015-2016, Blaine Kasten
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * Makes a key binding preventDefault
 * @chainable
 *
 * @providesModule PreventDefault
 */

export default function stopPropagation() : object {
  function _stopPropagation(e) {
    if (e.stopPropagation) {
      e.stopPropagation();
    }
    return false; // Safari Prevent Default
  }

  this.bindsTo(_stopPropagation);

  return this;
}
