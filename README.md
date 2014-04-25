shortcut.js
============

Ever wanted to add keyboard shortcuts to your website? but couldnt justify the time to develop it?

Shortcut.js gives you easy access to add shortcuts to your already existing functions.

Features!
============

- Chainable
- noConflict mode
- Tested in latest Firefox/Chrome/Safari (IE8 support coming soon)
- AMD compatibility (coming soon)

Documentation
============

#### shortcut(shortcutKeys, /* optional selector */)

- `String shortcutKeys:` A space delimited set of keys to press. For special keys, use the following mappings:
`shift, meta, optn, ctrl, space, down, right, up, left, tab, rtn`

- `String selector:` a css selector used to specify if the shortcut should be bound to an element. For example, if you wanted a user to be able to press shift+g together in an input box to run a function to uppercase the entire input value, simply do something like: `shortcut('shift =', 'input#uppercase').bindsTo(uppercaseInput)`. When the selector argument is not supplied, the shortcut will get called on the window, meaning at any time the shortcut is pressed the functions will run.

#### bindsTo(fn)

- `function fn:` A function which gets ran when the shortcutKeys are pressed in the appropriate selector.

#### preventDefault()

A function that prevents default on the current shortcut.
Usage: 

    shortcut('meta a', 'input').bindsTo(uppercaseInput).preventDefault()
    
This usage would cause cmd + a to not hightlight the input, but rather call the uppercaseInput functions.

#### trigger()

A function to trigger the functions associated to a shortcut.
Usage:

    shortcut('meta a', 'input').bindsTo(function(e){console.log('triggerMe!');}).trigger();
    // Triggers the bindsTo function and outputs:
    // "triggerMe!"

#### unbind()

A function used to remove bindings to keyboard shortcuts.

Usage:

    shortcut('meta a', 'input').unbind()
    
Now when a user presses meta a in an input, it will not touch `shortcut` and run its normal native events.



How to use
===========

##### General

    function uppercaseInput(e){...}
    function validateInput(e){...}
    
    shortcut('shift =', 'input#uppercase').bindsTo(uppercaseInput).bindsTo(validateInput);
    
Here, when a user presses the + button, we run an uppercaseInput function, and then a validateInput function.

##### noConflict

If you want to return the global `shortcut` namespace to its previous use, follow this:

    var s = shortcut.noConflict();
    s('shift = ', 'input#uppercase').bindsTo(uppercaseInput);
    
    console.log(shorcut); 
    // outputs whatever window.shortcut was before the shortcut.js library was loaded
    

To Do
===========

- Build test suite.
- Complete CrossBrowser testing and compatibility.
- Verify AMD compatibility.
- normalize keycodes cross OS.

Functions to add:
- shortcut().pause(). With no argument, it globally pauses all shortcut functions. With argument, it pauses the specific shortcut globally, or for that specific element.
- shortcut().resume(). Same Rules Apply.


License
===========
Licensed under the MIT license. Copyright 2014 Blaine Kasten

