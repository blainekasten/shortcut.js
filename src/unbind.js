
/*
 * unbind functions for a shortcut!
 *
 * @chainable
 */

import mappings from './mappings';

export default function(){
  mappings[this.keys][this.selector] = [];

  return this;
}
