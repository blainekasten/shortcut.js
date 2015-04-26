
/*
 * Resumes dispatching for the associated keyboard shortcut
 *
 * @chainable
 */

import pausedMappings from './paused_mappings';

export default function(){
  // destroy key/value of this.keys
  if (pausedMappings[this.keys]){
    delete pausedMappings[this.keys];
  }

  this.isPaused = false;

  return this;
}
