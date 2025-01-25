---
title: "Don't optimise JavaScript"
date: '2013-12-16'
description: 'JavaScript VM are fast nowadays. JavaScript is unlikely to be the cause of a slow web app.'
---

I've noticed lately a lot of confusion regarding performance of web applications. This post tries to clarify a few points while delivering a method for optimising your code.

> **tl;dr:** In case of slow web app:
>
> - Don't immediately jump into JavaScript optimisation; instead investigate network, DOM, rendering... and fix accordingly
> - Profile your application and optimise the code logic
> - Optimise JavaScript only when required

## Find the culprit

In modern browsers, JavaScript is rarely the cause of slow applications. There are many layers involved in web applications that are way slower.

The first thing to do is to investigate to find out where the performance issue is coming from. The causes can be multiple:

- Relying too much on the connexion
- Extensive DOM manipulation
- Rendering issues (forced layout...)
- io (e.g. repeated usage of `localStorage`)

Use the Network tab of your favourite browser's development tool. Make sure your requests don't have any impact on your application at start and run time. Repeated Ajax calls can slow down applications too.

Identifying slow DOM manipulation is a bit harder. The Timeline tab of Chrome's dev tools can help you pinpointing such issues. Of course, you must get familiar with the best practices. For example, when rendering a list of items in a templating engine, move the loop to the template and append all items to the DOM in one operation.

Rendering issues can also be [captured by Chrome's dev tools](https://developers.google.com/chrome-developer-tools/docs/demos/too-much-layout/) and starting from version 27, Firefox can now [log functions that trigger a reflow](https://hacks.mozilla.org/2013/11/firefox-developer-tools-episode-27-edit-as-html-codemirror-more/)!

There are a lot of valuable resources on the net about how to track down and fix these issues, so I won't cover them here. Once fixed, your application should work smoother. Not the case with yours? Keep reading then.

## Profile and improve logic. Rinse and repeat

So you made all these checks and you realised that JavaScript is actually what causes your application to perform badly.

Nice, my favourite part of the optimisation process starts here! You need to profile your application.

Grab your modern browser. Start the profiler then your app and interact with it like a normal user would. After a while, stop the profiler.

You can now drill down to the most frequently called functions. If you're using closures or generated functions, make sure to [name them to get meaningful results](/posts/generating-generator-functions/#caveat-2-named-functions).

Now, have a look at the logic of the calls. There is certainly room for optimisation. Common mistakes include:

- Calling a function too many times, where the result could be cached and reused
- Deeply nested loops
- Iterating too many times when you could stop the iteration prematurely

You also need to profile the memory used and track potential leak or heavy garbage collections.

By operating at the code logic level, you can improve the speed of your application. The fixes applied here are not directly related to the JavaScript language, but rather to the logic of your code.

You found and fixed these bottlenecks and now your application is running faster and smoother. You are now done, no need to read further.

## About JavaScript optimisation

You are still reading? I assume you are working on a signal processing tool, a game or a fundamental piece of software that must run fast.

Before looking into the optimisation of JavaScript, I must clarify a couple of things.

Keep in mind that JavaScript VMs are very good at running your code at a fast speed.

Trust the VM.

The second thing is using an alternate JavaScript syntax in your code is likely to never have any significant impact on speed. This belief dates back from the time browsers didn't have a JIT. Back then, using different syntaxes could make a difference. These kind of statements flourished over the web:

- `if` are faster than `switch`.
- bitwise operations are faster than mathematical operators.
- join array to do strings concatenation

Optimising JavaScript is not about the syntax. You can't base an optimisation strategy on syntax rewriting only. You'll end up wasting your time and get a little to no results. I'm not even mentioning the impact on readability and maintainability of your code.

Also, VM are constantly evolving. What perform best today might not tomorrow. VM implementors take code from the real world to see what developers do and what patterns to optimise. Using weird syntax is likely to never be optimised. Just write your code in a way that makes sense and that should be enough.

## Finally, you're ready to optimise JavaScript

After reading and understanding the statements above, you are now ready to improve your code using advanced optimisations. These crazy techniques include:

- Enforcing type stability
- Tracking deoptimisations
- Use web workers to do parrallel processing

In the 2nd part of [this talk](http://www.youtube.com/watch?v=65-RbBwZQdU), Vyacheslav shows a tool to inspect the code generated by V8. It's complex to dive into the VM internals, but that's the only way to gain some performance points.

To track deoptimisations, using Chrome or V8, you can pass some flags like `--trace_deopt` (trace deoptimization). You'll get a more or less descriptive message about why V8 is not able to optimise your code. Fix it if possible.

There are no such tools for Firefox (since [JIT inspector](https://addons.mozilla.org/ja/firefox/addon/jit-inspector/) is not working) or IE. So I have to recommend Chrome to optimise JavaScript this way. However, try as much as possible not to be too specific so that your code run fast, or at least not slower, on other browsers too.

Optimisation is a complex topic, but there are techniques we can apply to make your code run fast. I'd like to elaborate on each step described in this process in the form of blog posts. But for now, just take the time to locate the cause of slowness and don't incriminate JavaScript right away, the culprit can be hiding elsewhere!
