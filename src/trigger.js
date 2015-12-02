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
import { callShortcutFunctions } from './EventBinding';

export default function trigger() : object {
  if (globalPause() || this.isPaused){
    return this;
  }

  const keys: Array<string> = this.keys.split(' ');
  const event: KeyboardEvent = new KeyboardEvent('keydown', {});

  callShortcutFunctions(this.keys, this.domNode, event);

  return this;
}
