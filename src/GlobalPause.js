/**
 * Copyright 2015-2016, Blaine Kasten
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * defaults to false,
 * essentially says if any fns should be emitted or not
 *
 * @providesModule Error
 */

let globalPause: boolean = false;

export default function globalPause(setter: boolean) : boolean {
  if (typeof setter === 'boolean') {
    globalPause = setter;
  }

  return globalPause;
}
