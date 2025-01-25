---
title: 'Binary data and universal JavaScript'
date: '2024-05-15'
description: 'Tips to read and write data from and to binary files in JavaScript using code that runs on the client and the server.'
cover: '@/assets/covers/binary-data.jpg'
---

With Node.js 20, it has never been that easy to write code to create or process binary data that can run in both the browser and Node.js. No more polyfills needed! Let's take a look at what's new.

## ArrayBuffer support in Node.js

Traditionally, the way to deal with binary files in Node.js was to use the proprietary `Buffer` API. Thankfully, the standardised `BufferArray` API landed in Node.js 20 (the current LTS release). This unlocks cross-platform code compatible with both Node.js and the browser.

If you're used to working with `Buffer` in Node.js, here is a quick introduction to `ArrayBuffer`.

## What's an ArrayBuffer and how to work with it?

An `ArrayBuffer` is a very simple data structure. The name is confusing, you can't use any of the array methods. In fact, there is very little you can do with `ArrayBuffer` alone:

```js
const length = 8
const arrayBuffer = new ArrayBuffer(length)
arrayBuffer.byteLength // 8

const headerBuffer = arrayBuffer.slice(0, 4)
headerBuffer.byteLength // 4
```

Unlike a `Buffer` in Node.js, an `ArrayBuffer` can be resized, if defined as so at creation time:

```js
const arrayBuffer = new ArrayBuffer(8, { maxByteLength: 16 })
arrayBuffer.byteLength // 8

arrayBuffer.resize(12)
arrayBuffer.byteLength // 12
```

This is useful if you're writing data on the go (from a stream for example) and don't know in advance how big your `ArrayBuffer` will be.

## Buffer vs. DataView

As we saw above, an `ArrayBuffer` on its own is pretty useless. It becomes powerful when paired with a `DataView` to read and write to it:

```js
const arrayBuffer = new ArrayBuffer(8)
const view = new DataView(arrayBuffer)
view.setUint8(0, 64)
view.setUint16(1, 1024)
```

There are a few differences between Node's `Buffer` and `DataView` however. The methods to read data in both cases are similar but different, which can cause confusion. `Buffer` uses the verbs `read` and `write` (e.g. `buf.readUInt8(0)`), while in `DataView` the methods start with `get` and `set` (e.g. `view.getUint8(0)`). Also the case of the type you want to read is different (U**I**nt vs. U**i**nt).

The endianness is treated differently too. In Node.js, you have dedicated methods (`buf.readUInt16BE(0)` for big endian and `buf.readUInt16LE(0)` otherwise). In `DataView`, big endian is the default. You'll pass an additional parameter for little endian (e.g. `view.getInt16(0, true)`).

The good news is you can forget about the `Buffer` API now. Using `ArrayBuffer` and `DataView` not only reduces the cognitive strain required to remember the subtle differences between both APIs, it also allows your code to run, unchanged, on multiple enviromnents.

## Working with ArrayBuffer in Node.js

One thing to notice though, some methods of the file system API in Node.js will give you a `Buffer`. Thankfully `Buffer` is now a subclass of `ArrayBuffer`:

```js
import { readFile } from 'node:fs/promises'

const buf = await readFile('meme.avif')
const arrayBuffer = buf.buffer
```

## Other things you can do with an ArrayBuffer

In addition to `DataView`, you can use a typed array to read or modify an `ArrayBuffer`:

```js
const arrayBuffer = new ArrayBuffer(8)
const typedArray = new Uint8Array(arrayBuffer)

typedArray[0] = 64
typedArray[1] = 65
```

The different typed arrays come with all the usual array methods (`filter`, `map`, `reduce`...).

You can also create a `Blob` from an `ArrayBuffer` to represent a binary file for example:

```js
const blob = new Blob([arrayBuffer], { type: 'image/avif' })
postToTheFediverse(staus, { media: [blob] })
```

## Node's APIs getting closer to the browser

The availability of APIs like `ArrayBuffer` and `DataView` in Node.js is another step towards bridging the gap between the different JavaScript runtimes and reducing fragmentation. This is, for me, one of the most exciting develoment that recently happened to Node.js, together with the support for ESM!
