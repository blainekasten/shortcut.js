
/*
 * Pauses dispatching for the associated keyboard shortcut
 *
 * @chainable
 */

import pausedMappings from './paused_mappings';

export default function() {
  // check if element and keys exists in mappings
  if (pausedMappings[this.keys] === undefined){
    pausedMappings[this.keys] = this.selector;
  }

  this.isPaused = true;

  // Drops the functions from the mappings
  return this;
}
