/**
 * Copyright 2015-2016, Blaine Kasten
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule shortcut
 */

import indexOfPolyfill from './IndexOfPolyfill';
import globalPause from './GlobalPause';
import shortcut from './Shortcut';
import eventBinding from './EventBinding';

indexOfPolyfill();
eventBinding();

/*
 * A pause function. This prevents anything from being registered or called
 * until shortcut.resume() is called
 *
 * @chainable
 */

shortcut.pause = function pause() : Object {
  globalPause(true);

  return shortcut;
};


/*
 * Resume function. This will make undo shortcut.pause()
 *
 * @chainable
 */

shortcut.resume = function resume() : Object {
  globalPause(false);

  return shortcut;
};

export default shortcut;
