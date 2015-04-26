/*
 * defaults to false,
 * essentially says if any fns should be emitted or not
 */

var globalPause = false;

export default function(setter){
  if (typeof setter === 'boolean') {
    globalPause = setter;
  }

  return globalPause;
}
