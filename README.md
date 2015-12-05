
shortcut.js [![Code Climate](https://codeclimate.com/github/blainekasten/shortcut.js/badges/gpa.svg)](https://codeclimate.com/github/blainekasten/shortcut.js) [![Circle CI](https://circleci.com/gh/blainekasten/shortcut.js.svg?style=svg&circle-token=b2b27495568119b977fcf8088c679c721c49792b)](https://circleci.com/gh/blainekasten/shortcut.js)
============

[Documentation for v1 is found here](https://github.com/blainekasten/shortcut.js/blob/v1.5.6/README.md)

Ever wanted to add keyboard shortcuts to your website, but couldnt justify the time to develop it?

Shortcut.js gives you easy access to add shortcuts to your already existing functions.

Features!
============

- Chainable
- Global and Individual pause/resume functions
- Cross OS Key Bindings ('mod' key)
- CrossBrowser (IE8+, Chrome, FF, Safari Tested)
- UMD compatibility

Installation
===========

`bower install shortcut`
`npm install shortcut.js`

How to use
===========

##### General

```js
function uppercaseInput(e){...}
function validateInput(e){...}

shortcut('mod =', document.querySelector('input#uppercase'))
  .bindsTo(uppercaseInput)
  .bindsTo(validateInput);
```

Here, when a user presses the the modifier key with the equals key, we run an uppercaseInput function, and then a `validateInput` function.

API
============

#### shortcut(shortcutKeys, DOMNode)

- `String shortcutKeys:` A space delimited set of keys to press. For special keys, use the following mappings:
`shift, meta, optn, ctrl, space, down, right, up, left, tab, rtn`

- `HTMLElement DOMNode:` The DOMNode you want the shortcuts to trigger on.

#### +pause()

This function globally pauses all shortcut function dispatching. Keyboard shortcuts pressed after this function will not fire their associated functions.

Useage:

```js
shortcut.pause();
```
 
#### +resume()

This function globally resumes all shortcut function dispatching. Keyboard shortcuts pressed after this function WILL fire their associated functions.

Useage:

```js
shortcut.resume();
```

#### -bindsTo(fn: Function)

- `Function fn:` A function which gets ran when the shortcutKeys are pressed in the appropriate selector.

#### -preventDefault()

A function that prevents default on the current shortcut. The normal `event.preventDefault()` is also respected.
Usage:

```js
shortcut('meta a', input).bindsTo(uppercaseInput).preventDefault();
```

This usage would cause cmd + a to not hightlight the input, but rather call the `uppercaseInput` functions.

#### -stopPropagation()

A function that prevents bubbling on the current node to the `document.body`. The normal `event.stopPropagation()` is also respected.
Usage:

```js
shortcut('meta a', input).bindsTo(uppercaseInput).stopPropagation();
shortcut('meta a', document.body).bindsTo(grabText);
```

This usage would cause cmd + a call the `uppercaseInput` function, but not the `grabText` function.

#### -trigger()

A function to trigger the functions associated to a shortcut.
Usage:

```js
shortcut('meta a', input).bindsTo(
  e => console.log('triggerMe!')
).trigger();
// Triggers the bindsTo function and outputs:
// "triggerMe!"
```

#### -unbind()

A function used to remove bindings to keyboard shortcuts.

Usage:

```js
shortcut('meta a', input).unbind();
```

Now when a user presses meta a in an input, it will not touch `shortcut` and run its normal native events.

#### -pause()

Pauses event dispatching for the associated shortcut.

Usage:

```js
shortcut('meta a', input).pause();
```

When a user presss meta a in an input, it will not fire associated functions. Once `-resume()` is called they will fire.

#### -resume()

Resumes event dispatching for the associated shortcut.

Usage:

```js
shortcut('meta a', input).pause();
// pressing meta a in an input does nothing
shortcut('meta a', input).resume();
// pressing meta a dispatches the functions again
```

When a user presss meta a in an input, it will not fire associated functions. Once `-resume()` is called they will fire.


License
===========
Licensed under the MIT license. Copyright 2014-2015 Blaine Kasten

