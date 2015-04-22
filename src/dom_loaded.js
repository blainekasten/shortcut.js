
var DOM_LOADED = false, called = false,
    key, selectorKey, el, isFrame, tryScroll, fn, elSelectors;

import error from './error';
import mappings from './mappings';

(function(){
  called = false;

  function ready() {
    DOM_LOADED = true;

    if (called){ return; }
    called = true;
    // Set up dom selectors
    document.querySelector('body').selector = 'body';

    // Iterate through shortcuts
    for (key in mappings){
      if (!mappings.hasOwnProperty(key)) { continue; }

      elSelectors = mappings[key];

      // Iterate through DOM selectors
      for (selectorKey in elSelectors){
        if (!elSelectors.hasOwnProperty(selectorKey)) { continue; }

        el = document.querySelector(selectorKey);

        // Report error if no element was not found.
        if (!el){
          error('An element was not found for selector: ' + selectorKey);
          return;
        }

        // Assign selector to the selectorKey, for future grabbing
        el.selector = selectorKey;
      }
    }
  }


  if ( document.addEventListener ) { // native event
    document.addEventListener( 'DOMContentLoaded', ready, false );
  } else if ( document.attachEvent ) {  // IE
    try {
      isFrame = window.frameElement !== null;
    /* eslint-disable */
    } catch(e) {}
    /* eslint-enable */

    // IE, the document is not inside a frame
    if ( document.documentElement.doScroll && !isFrame ) {
      tryScroll = function(){
        if (called){ return; }
        try {
          document.documentElement.doScroll('left');
          ready();
        } catch(e) {
          setTimeout(tryScroll, 10);
        }
      };
      tryScroll();
    }

    // IE, the document is inside a frame
    document.attachEvent('onreadystatechange', function(){
      if ( document.readyState === 'complete' ) {
        ready();
      }
    });
  }

  // Old browsers
  if (window.addEventListener){
    window.addEventListener('load', ready, false);
  } else if (window.attachEvent){
    window.attachEvent('onload', ready);
  } else {
    fn = window.onload; // very old browser, copy old onload
    window.onload = function() { // replace by new onload and call the old one
      if (fn){ fn(); }
      ready();
    };
  }
}());

export default () => DOM_LOADED;
