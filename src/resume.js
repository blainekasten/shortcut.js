/**
 * Copyright 2015-2016, Blaine Kasten
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * Resumes dispatching for the associated keyboard shortcut
 * @chainable
 *
 * @providesModule Resume
 */

import pausedMappings from './PausedMappings';

export default function resume() : Object {
  // destroy key/value of this.keys
  if (pausedMappings[this.keys]) {
    delete pausedMappings[this.keys];
  }

  this.isPaused = false;

  return this;
}
