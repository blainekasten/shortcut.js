/*
 * Makes a key binding preventDefault
 *
 * @chainable
 */

export default function() {
  var preventDefault = function(e){
    if (e.preventDefault){ e.preventDefault(); }
    e.returnValue = false; // IE prevent Default
    return false; // Safari Prevent Default
  };

  this.bindsTo(preventDefault);

  return this;
}
