var noConflictShortcut,
    globalPause, shortcut;


import indexofPolyfill from './indexof_polyfill';
import globalPause from './global_pause';
import shortcut from './shortcut';
import eventBinding from './event_binding';
import canUseDom from 'can-use-dom';

indexofPolyfill();



/*
 * NO CONFLICT function
 *
 * @chainable
 */

noConflictShortcut = canUseDom ? window.shortcut : this.shortcut;

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
