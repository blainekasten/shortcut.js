/**
 * Copyright 2015-2016, Blaine Kasten
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * This function is the chainable function typically called to add a function to the internal
 * array of functions bound to an element
 *
 * @providesModule BindsTo
 */

import mappings from './Mappings';
import error from './Error';

export default function bindsTo(fn: Function) : Object {
  // Stop if not a function
  if (typeof fn !== 'function'){
    return error(`You must pass a function to the bindsTo method, check the call for the shortcut('${this.keys}', '${this.domNode.name}') method`);
  }

  mappings[this.keys][this.domNode].push(fn);

  // Return this for chaning
  return this;
}
