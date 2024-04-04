---
title: 'Generating generator functions'
date: '2013-11-01'
description: 'Use JavaScript to generate functions in general and generator functions in particular.'
related: ['polyfilling-generators', 'cross-browser-generator-functions']
---

Apparently, there is no native way to generate generator functions in JavaScript. So we have to use a workaround.

## A note on generating functions in JavaScript

Before diving into the subject, let's have a quick look at how to generate functions on-the-fly in JavaScript.

The obvious way to achieve this is to use `eval()`:

```javascript
eval('function dynamicFn() {/* Do crazy stuff here. */}')
```

However, as you may have heard:

> eval is evil

The reason is because it gives JavaScript VM a hard time optimising the generated function and can lead to security concerns.

A better approach is to use the `Function` constructor:

```javascript
var dynamicFn = new Function('/* Do crazy stuff here. */')
```

Just pass the body of the function as a string. You can also pass arguments before the code body:

```javascript
var dynamicFn = new Function(
  'arg1',
  'arg2',
  '/* Do crazy stuff with arg1 and arg2. */'
)
```

## Caveat 1: the scope

That said, you need to keep in mind that using `Function` always create functions in the global scope. You can't refer to variables used in the local lexical scope they were created. The following code will not work as expected:

```javascript
;(function () {
  var SCOPED_VAR = 'local'
  var dynamicFn = new Function('console.log(SCOPED_VAR)')
  dynamicFn() // ReferenceError: SCOPED_VAR is not defined
})()
```

So if you really need to expose `SCOPED_VAR` to `dynamicFn()`, the solution might be to wrap it inside another function created with the `Function` constructor and execute the latter immediately:

```javascript
;(function () {
  var SCOPED_VAR = 'local'
  var dynamicFn = new Function(
    'SCOPED_VAR',
    'return function() {console.log(SCOPED_VAR)}'
  )(SCOPED_VAR)
  dynamicFn() // "local"
})()
```

But, any updates to `SCOPED_VAR` in the outter scope won't reflect inside `dynamicFn()`. The value of `SCOPED_VAR` in the scope of `dynamicFn()` is bound forever to the one it had at creation.

This scoping behaviour can be confusing, but it is done by design. This is the reason why the functions generated this way are faster than with `eval`.

**Edit:** You can take advantage of this scoping behaviour to reference the global scope regardless of the environment you're running in and whatever your local scope is. Just use the code below and you'll be certain that `this` will always reference the global scope:

```javascript
var global = new Function('return this')()
```

## Caveat 2: named functions

Another issue with `new Function` is that it generates only anonymous functions:

```javascript
var dynamicFn = new Function('/* Do crazy stuff here. */')
console.log(dynamicFn.name) // "" (empty string)
```

Named functions are required for debugging in order to get meaningful stack traces.

A workaround is to use the solution presented above:

```javascript
var dynamicFn = new Function(
  'return function dynFn() {/* Do crazy stuff here. */}'
)()
console.log(dynamicFn.name) // "dynFn"
```

This is how [Shumway generates dynamic named functions](https://github.com/mbebenita/shumway/blob/master/src/avm2/runtime.js#L1384) and that causes [no performance issue](https://github.com/mozilla/shumway/issues/287#issuecomment-17507860).

## How to generate generator functions

Now, back to our main topic: generator functions.

**Edit:** In the future, we will have the [`GeneratorFunction` constructor](http://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorfunction) to create generator functions from a string, but this is not implemented anywhere AFAIK. So in the meantime...

We can simply use this technique again and execute immediately a function that returns a generator function. Sounds complicated but it's actually very easy:

```javascript
var generator = new Function('return function* () { yield 5 }')()
```

Of course, the scope issue remains but you can optionally get a named function generator for debugging purposes.

Now back to your code editor and have fun creating functions on the fly with JavaScript.

This article is part of a series about ES6 generators, together with:

- [Cross browser generator functions](/posts/cross-browser-generator-functions/)
- [Polyfilling generators](/posts/polyfilling-generators/)
