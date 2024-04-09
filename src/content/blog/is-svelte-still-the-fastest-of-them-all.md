---
title: 'Is Svelte still the fastest of them all?'
date: '2024-04-09'
description: "Let's take a look at a recent benchmark suite that includes popular JavaScript frameworks."
cover: '@/assets/covers/is-svelte-still-the-fastest-of-them-all.jpg'
---

Svelte has been my framework of choice for personal projects lately. I love the original approach of compiling to code that ships with a minimal runtime. I totally bought into the claim that it is the fastest framework out there. Until today, I realised I never questioned this statement.

> tl:dr: A new browser benchmark suite was recently released and it includes different popular JavaScript frameworks. Jump immediately to [the results](#the-results).

## Enter Speedometer 3

[browserbench](https://browserbench.org/), a collaborative initiative by Mozilla, Google and Apple, has released the version 3 of its browser performance benchmark suite called [Speedometer 3](https://browserbench.org/Speedometer3.0/).

As part of the things it measures, the suite includes a basic todo app implemented in different JavaScript frameworks. The choice of the framework is based on the popularity according to the HTTP Archive and the NPM monthly downloads. The announcement post on the WebKit blog gives [more details about this choice](https://webkit.org/blog/15131/speedometer-3-0-the-best-way-yet-to-measure-browser-performance/).

Among the 12 different frameworks selected, we can find:

- React (in different "flavours")
- Vue.js
- Angular
- Svelte

This new performance benchmarking suite is the perfect occasion to review the speed of Svelte and how it compares to its competitors.

## A word of warning

Before going into the details, let's make it clear. Using this benchmark suite to assess frameworks against each other is ultimately flawed! Even though the different versions of the todo app are functionally equivalent, their implementations differ. They were written to run as a suite on different browsers, not to be looked at individually.

If you inspect the code of these different versions, you will see that the approaches can vary.

Some of the TodoMVC implementations are "complex versions of these tests which are embedded into a bigger DOM tree with many complex CSS rules that more closely emulate the page weight and structure from popular webapps today." The 6 complex DOM implementations concern:

- Angular
- ES6-Webpack
- Lit
- Preact
- React
- Svelte

There is another point to pay attention to. These benchnarks measure the runtime performance. There are other aspects to consider when assessing the speed of an app, such as loading time and Core Web Vitals.

For now, let's accept that the result will have to be taken with a pinch of salt.

## The environment

I ran the benchmark on the following browsers:

- Firefox Nightly 124 (124.0b9)
- Chrome 122 (122.0.6261.112)
- Safari 17.4 (19618.1.15.11.12)

On a MacBook Air from 2020 (M1, Sonoma 14.4 (23E214)), all in incognito tabs, with no other apps opened.

### The results

![Graph of the results](/img/posts/is-svelte-still-the-fastest-of-them-all/aggregate.svg)

Svelte is the fastest framework overall, followed by Preact, the Web Components implementation and Lit.

The Web Components implementation is the only one from this top 4 that is not embedded in a complex DOM structure (see explanation above).

For the sake of exhaustivity, here are the graphs for the sub tests, with the description of what they do.

#### Adding 100 items

![Graph of the results](/img/posts/is-svelte-still-the-fastest-of-them-all/Adding100Items.svg)

#### Marking all the items as completed

![Graph of the results](/img/posts/is-svelte-still-the-fastest-of-them-all/CompletingAllItems.svg)

#### Deleting all items

![Graph of the results](/img/posts/is-svelte-still-the-fastest-of-them-all/DeletingAllItems.svg)

We could look into more details at these results, but as I said this suite wasn't built for that purpose. Let's not draw conclusions from these results.

## Conclusion

I tend to be passionate/obsessed about performance, but there are, of course, other aspects to consider when choosing a framework such as the community behind it, the ease of hiring skilled engineers, the ecosystem, the documentation...

Also there are plenty more JavaScript frameworks that could be assessed for performance. I'm thinking specifically of [Solid](https://www.solidjs.com/) which claims their benchmark beat Svelte.

Any thoughts on these results?
