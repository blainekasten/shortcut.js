/**
 * Copyright 2015-2016, Blaine Kasten
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * Pauses dispatching for the associated keyboard shortcut
 *
 * @providesModule Mapping
 */

import pausedMappings from './PausedMappings';

export default function pause() : Object {
  // check if element and keys exists in mappings
  if (pausedMappings[this.keys] === undefined){
    pausedMappings[this.keys] = this.domNode;
  }

  this.isPaused = true;

  // Drops the functions from the mappings
  return this;
}
