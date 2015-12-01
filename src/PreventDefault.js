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

export default function preventDefault() : object {
  function _preventDefault(e){
    if (e.preventDefault){
      e.preventDefault();
    }

    e.returnValue = false; // IE prevent Default
    return false; // Safari Prevent Default
  };

  this.bindsTo(_preventDefault);

  return this;
}
