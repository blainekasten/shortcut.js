var noConflictShortcut = window.shortcut,
    globalPause, shortcut;


import indexPolyfill from './indexof_polyfill';
import globalPause from './global_pause';
import shortcut from './shortcut';
import eventBinding from './event_binding';

indexPolyfill();


/*
 * NO CONFLICT function
 *
 * @chainable
 */

shortcut.noConflict = function(){
  window.shortcut = noConflictShortcut;
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
