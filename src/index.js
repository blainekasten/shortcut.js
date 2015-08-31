var global = self, noConflictShortcut;


import indexofPolyfill from './indexof_polyfill';
import globalPause from './global_pause';
import shortcut from './shortcut';
import eventBinding from './event_binding';

indexofPolyfill();



/*
 * NO CONFLICT function
 *
 * @chainable
 */

noConflictShortcut = global.shortcut;

shortcut.noConflict = function(){
  global.shortcut = noConflictShortcut;
  return this;
};


/*
 * A pause function. This prevents anything from being registered or called
 * until shortcut.resume() is called
 *
 * @chainable
 */

shortcut.pause = function(){
  globalPause(true);

  return shortcut;
};


/*
 * Resume function. This will make undo shortcut.pause()
 *
 * @chainable
 */

shortcut.resume = function(){
  globalPause(false);

  return shortcut;
};



eventBinding();
export default shortcut;
