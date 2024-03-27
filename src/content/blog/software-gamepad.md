---
title: 'Software gamepad'
date: '2014-08-10'
description: 'Everything you need to write an efficient and performant gamepad in JavaScript for touch screens.'
---

I recently resumed my work on [jsSMS a JavaScript recompiler for Sega Master System and Game Gear](https://github.com/gmarty/jsSMS). Among the new features, I wanted to improve the software gamepad for touch screens.

### Naive implementation

When I started adding the software gamepad, I did something quick and dirty. I didn't really have time to waste developing a nice looking controller in canvas (though that would have been easier). So I just threw some `<div>` tags, styled them and attached a couple of event listeners.

To have a gamepad compatible with touch screens, I naturally listened to touch event on each key (<kbd>up</kbd>, <kbd>down</kbd>, <kbd>left</kbd>, <kbd>right</kbd>, <kbd>fire1</kbd>, <kbd>fire2</kbd> and <kbd>start</kbd>). `touchstart` and `touchmove` communicate the active key to the emulator and `touchend` release it.

The main issue I found was that if the user moves her finger, the JavaScript will recognise the activation of a particular key, but will release a different one. In other word, the key initially pressed will never be released.

Clearly, this was unusable.

### Better implementation

I looked for tutorials and references about how to build a gamepad using HTML5, but it looks like most HTML5 games use canvas and detect the currently touched key using the location of the touch.

The location of the finger relative to the screen is stored in `clientX` and `clientY` properties of the touch event. If you use jQuery, like myself, make sure to reference the original event using `originalEvent` property (i.e. `evt.originalEvent.clientX`).

To get the position of the currently touch key in HTML, I could have computed the position and size of each buttons, then loop through them to find the element touched. In my case, that wasn't possible because I use a complex layout made of rounded and rotated elements and not just square buttons.

Thanks to StackOverflow, the answer was actually quite easy and requires a single DOM method: `document.elementFromPoint`.

To get the currently touched element just pass the touch event coordinates to `document.elementFromPoint`:

```javascript
var touchedElement = document.elementFromPoint(evt.clientX, evt.clientY)
```

Then, you need to implement a mechanism to map back the DOM element touched to the emulated key (I personally use CSS class name and a map object).

Also, you'll want to iterate over the `changedTouches` array to properly activate all the buttons pressed on multi-touch devices.

To put it in a nutshell:

```javascript
function onTouch(evt) {
  emulator.releaseAllKeys()
  evt.changedTouches.forEach(function (touch) {
    var target = document.elementFromPoint(touch.clientX, touch.clientY)
    var key = getKeyFromElement(target)
    emulator.pressKey(key)
  })

  evt.preventDefault()
}

function onTouchEnd(evt) {
  emulator.releaseAllKeys()
}

padElement.addEventListener('touchstart', onTouch)
padElement.addEventListener('touchmove', onTouch)
padElement.addEventListener('touchend', onTouchEnd)
```

Obviously, you'll want to code your own `getKeyFromElement` and emulator communicating functions.

### How optimised?

The result is a nicely working touch optimised controller in HTML5. The finger can swipe from one key to another and the emulator reacts responsively.

I don't think you could do simpler and according to my coworker, the brilliant [Chris Lord](https://twitter.com/cwiiis), if your DOM tree is simple you shouldn't get any performance penalty from using `document.elementFromPoint`.

Happy gaming!
