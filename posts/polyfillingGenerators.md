{
  title: "Polyfilling generators",
  date: "2013-11-05",
  description: "Exploring ES6 generators polyfills gives valuable insights about the internal mechanisms used by them."
}

I blogged a bit about ES6 generators lately. I think they are a great improvement to JavaScript and I can't wait to get them available in all environments.

But before this day arrives, we have to use polyfills to support older browsers.

## Polyfilling generators

First of all, generators introduce some syntactical changes:

* The `function*` notation
* The `yield` keyword

Because of that, you can't polyfill them. Running code with generator in a non supporting environment will cause a syntax error. You have to somehow parse the source code and generate code compliant with these environments. That means, first, get an AST representation of the code, apply changes and generate semantically equivalent code.

All existing generator polyfills work in a similar way. They use a finite-state machine. The internal state changes whenever a `yield` keyword is found in generator functions, and the yielded value is returned. Let's examine some over simplified examples:
```javascript
function* meaningOfLife() {
  yield 42;
}

var a = meaningOfLife(); a.next();
```

Is compiled to something like:
```javascript
function meaningOfLife() {
  var state = 0;
  return {
    next: function() {
      switch (state) {
        case 0:
          state = 1;
          return {
            value: 42, // The yielded value.
            done: false
          };
        case 1:
          return {
            value: undefined,
            done: true
          };
      }
    }
  };
}

var a = meaningOfLife(); a.next();
```

The variable `state` is initialized to `0`. Each time `next()` is called on the generator object `a`, the value of `state` changes. For the sake of simplicity, features like throwing at the end of the iteration are not implemented.

Here is a slightly more elaborated example:
```javascript
function* letters() {
  console.log('a');
  yield 'a';
  console.log('b');
  yield 'b';
  while (true) {
    console.log('c');
    yield 'c';
  }
}

var a = letters();
a.next(); a.next(); a.next(); a.next();
```

Becomes:
```javascript
function letters() {
  var state = 0;
  return {
    next: function() {
      switch (state) {
        case 0:
          console.log('a');
          state = 1;
          return {
            value: 'a', // Return the first yielded value.
            done: false
          };
        case 1:
          console.log('b');
          state = 2;
          return {
            value: 'b', // Return the second yielded value.
            done: false
          };
        case 2:
          console.log('c');
          return {
            value: 'c', // Return the third yielded value... forever.
            done: false
          };
      }
    }
  };
}

var a = letters();
a.next(); a.next(); a.next(); a.next();
```

All calls to `a.next()` will change the value of `state` until it receives `2`. Then the state won't change and the value `'c'` is always returned, mimicking the original `while(true)` loop.

Another thing to note here is the huge amount of code required to replicate the behaviour of generators. Generators are concise and powerful.

## Traceur

[Traceur](https://github.com/google/traceur-compiler) is a project maintained by Google. Its goal is to be a transcompiler from ES6 to ES3. It currently supports many features of the next JavaScript thus allowing developers to try, test and even use the code in production.

Generators are only one of the features supported by Traceur.

This project does a very good job at compiling functions from code using generators. However I have the feeling that it is a bit over-engineered. The output code is quite complex. Fortunately, you can generate sourcemap for debugging so that should not really be a problem.

You can [try Traceur](http://traceur-compiler.googlecode.com/git/demo/repl.html#function*%20letters%28%29%20{%0A%20%20console.log%28%27a%27%29%3B%0A%20%20yield%20%27a%27%3B%0A%20%20console.log%28%27b%27%29%3B%0A%20%20yield%20%27b%27%3B%0A%20%20while%20%28true%29%20{%0A%20%20%20%20console.log%28%27c%27%29%3B%0A%20%20%20%20yield%20%27c%27%3B%0A%20%20}%0A}%0A%0Avar%20a%20%3D%20letters%28%29%3B%0Aa.next%28%29%3B%20a.next%28%29%3B%20a.next%28%29%3B%20a.next%28%29%3B) on your browser!

## Regenerator

The scope of [Regenerator](https://github.com/facebook/regenerator) is limited because it only polyfills generators and not all of ES6. It was initiated by Facebook at the end of September 2013.

According to the [Regenerator website](http://facebook.github.io/regenerator/), it has several advantages over Traceur.

First, it supports the `yield` keyword everywhere, not only as the "right-hand sides of assignment statements and variable declarations" (i.e. `if (yield val)...` is not supported in Traceur).

It is said to be lighter. On a very simple example like `function* gen(){yield 5}`, it generates about 10 lines of code when Traceur outputs more than 100. They just omit to say that both projects require an external runtime library to work and the one of Regenerator has more than 200 lines! Come on Facebook, it doesn't hurt to be honest.

The last argument they have against Traceur is that this project is very big and you better use Regenerator if you just need to support generators. That's true, but if you compile offline with Traceur, you can restrain the set of features and activate the compilation of generators only.

Finally, Regenerator doesn't do sourcemap, but, unlike Traceur, it preserves comments from the original code. So that may help for matching original code with the one generated.

An [online REPL for Regenerator](http://facebook.github.io/regenerator/) is available.

## TypeScript

[TypeScrit](http://www.typescriptlang.org/) does not currently support generators, but there are in scope of future releases. You can follow the [status of the bug](https://typescript.codeplex.com/workitem/1363).

## To conclude

I can't really see any limitations to these polyfills (this term is probably not correct in this context). You can even use the generated code with native `for-of` loops, and on non-supporting browsers, Traceur can also polyfill these loops for you!

So give the generators a try today!

This article is part of a series about ES6 generators, together with:

* [Cross browser generator functions](http://gu.illau.me/posts/cross-browser-generator-functions/)
* [Generating generator functions](http://gu.illau.me/posts/generating-generator-functions/)
