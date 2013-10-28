{
  title: "Cross browser generator functions",
  date: "2013-10-28",
  description: "Presentation of a cross browser way to allow generator functions in Firefox and Chrome."
}

## A quick word on generators

This post will not discuss generators as there are valuable resources all over the web. Just remember that generators can be used to create a set of iterable items (possibly a virtual or infinite set like sequences in mathematics) or to do step by step execution of a program.

## The current state of generators implementation

Chrome implements the [latest ES6 draft](http://wiki.ecmascript.org/doku.php?id=harmony:generators). So if you follow the spec, you should not have any troubles.

For Firefox, things are a bit more complicated because from version 2 to 25, an old version of the generators is implemented. Version 26 has generators on par with Chrome, so this post will be outdated in a very near future, but in the meantime, I wanted a way to use generators so that they work on the current version of both browsers.

## What Firefox needs

To use the generators, Firefox requires to switch to JavaScript version 1.7 mode:
```html
<script type="application/javascript;version=1.7">/* Code... */</script>
```

Otherwise, the keyword `yield` is not recognized.
Also, the syntax implemented doesn't accept the `function* myGenerator` as defined by the spec.

Of course, Chrome doesn't recognise script tags formatted like this and doesn't execute their content.

## A workaround

The solution I came with is not very clean, but it seems to work.

First, you need to develop your code using the latest draft, the one implemented in Chrome. Then wrap this code in a inactive tag. I used a custom `type` attribute to prevent its execution.

Then, this code is appended to the DOM in a newly created `script` element. In Firefox, we set the correct `type` attribute and transform the `function*` notation:
```html
<!DOCTYPE html>
<html>
<head>
<title>Cross-browser generator functions</title>
</head>
<body onload="executeGeneratorCode(document.getElementById('js-code').text)">
<script id="js-code" type="text/javascript-inert">
// Your code using a generator goes here:
// See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators
function* fibonacci() {
  var fn1 = 1;
  var fn2 = 1;
  while (1) {
    var current = fn2;
    fn2 = fn1;
    fn1 = fn1 + current;
    yield current;
  }
}

var sequence = fibonacci();
console.log(sequence.next()); // 1
console.log(sequence.next()); // 1
console.log(sequence.next()); // 2
console.log(sequence.next()); // 3
console.log(sequence.next()); // 5
console.log(sequence.next()); // 8
console.log(sequence.next()); // 13
</script>

<script>
var OLD_SYNTAX = false; // Default value.
var currentScript = document.currentScript;

function executeGeneratorCode(code) {
  var scriptElement = document.createElement('script');
  if (OLD_SYNTAX) {
    code = code.replace(/\bfunction *\* +/g, 'function ');
    scriptElement.setAttribute('type', 'application/javascript;version=1.7');
  }
  scriptElement.text = code;
  currentScript.parentNode.insertBefore(scriptElement, currentScript);
}
</script>
<script type="application/javascript;version=1.7">
// Here, we test the old syntax in Firefox only.
var OLD_SYNTAX = function() {
  try {
    eval('(function() { yield 5; }())');
    return true;
  } catch (e) {
    return false;
  }
}();
</script>
</body>
</html>
```

## Conclusion

This seems to work but I didn't do extensive testing and there might be other differences between both implementations. Also, using a regexp to remove the `function*` is not  the best way, but at this point, [Esprima doesn't support ES6](http://esprima.org/demo/parse.html?code=function*%20fibonacci()%20%7B%0D%0A%20%20var%20fn1%20%3D%201%3B%0D%0A%20%20var%20fn2%20%3D%201%3B%0D%0A%20%20while%20(1)%20%7B%0D%0A%20%20%20%20var%20current%20%3D%20fn2%3B%0D%0A%20%20%20%20fn2%20%3D%20fn1%3B%0D%0A%20%20%20%20fn1%20%3D%20fn1%20%2B%20current%3B%0D%0A%20%20%20%20yield%20current%3B%0D%0A%20%20%7D%0D%0A%7D%0D%0A), so there are no standalone parsers available.

Hopefully this code will continue to work when Firefox supports the new syntax.

I reckon this method is a bit complicated, so if you know better/cleaner way to achieve this, let me know via a comment!
