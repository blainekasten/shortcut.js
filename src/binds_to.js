/*
 * This function is the chainable function typically called to add a function to the internal
 * array of functions bound to an element
 *
 * @params {Function}
 * @returns {Object} Chainable.
 */

import mappings from './mappings';
import error from './error';

export default function (fn){
  // Stop if not a function
  if (typeof fn !== 'function'){
    return error(`You must pass a function to the bindsTo method, check the call for the shortcut('${this.keys}', '${this.domNode.name}') method`);
  }


  mappings[this.keys][this.domNode].push(fn);

  // Return this for chaning
  return this;
}
