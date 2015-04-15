
/*
 * Triggering function. It will call the functions
 * associated to the shortcut assigned
 *
 * @chainable
 */

import globalPause from './global_pause';

export default function(){
  var fns = this.functions(),
      fakeEvent = {preventDefault: function(){}},
      i;

  if (globalPause || this.isPaused){
    return false;
  }

  for (i in fns){
    fns[i](fakeEvent);
  }

  return this;
}
