/**
 * Copyright 2015-2016, Blaine Kasten
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule indexOf
 */

export default function indexOfPolyfill() : void {
  if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function indexOf(element) {
      const length = this.length >>> 0;

      let from = Number(arguments[1]) || 0;

      from = (from < 0) ? Math.ceil(from) : Math.floor(from);

      if (from < 0) {
        from += length;
      }

      for (; from < length; from++) {
        if (from in this && this[from] === element) {
          return from;
        }
      }

      return -1;
    };
  }
}
