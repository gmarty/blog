---
title: 'Firefox OS: the Device Storage API'
date: '2013-11-25'
description: 'How to develop Firefox OS app using the Device Storage API via Firefox OS Simulator?'
---

Working with the [Device Storage API](https://developer.mozilla.org/en/docs/WebAPI/Device_Storage) of Firefox OS can be a bit complicated if you don't have a real device at hand. But if you use Firefox OS Simulator, the following advices can help you.

## SD Card

The SD Card location used by Firefox OS Simulator is mapped to a physical folder on your computer.

On Windows:

> C:\Users\<i>USERNAME</i>\AppData\Roaming\Mozilla\Firefox\Profiles\<i>PROFILEKEY</i>\extensions\r2d2b2g@mozilla.org\profile\fake-sdcard

On Ubuntu:

> /home/<i>USERNAME</i>/.mozilla/firefox/<i>PROFILEKEY</i>/extensions/r2d2b2g@mozilla.org/profile/fake-sdcard

On Mac:

> Let me know via a comment below where is this folder on Mac.

Of course, <i>USERNAME</i> and <i>PROFILEKEY</i> are specific to your configuration, so make sure to look into the right folder.

Place files in this folder and you’ll be able to access them from the Simulator using a privileged app.

If this folder doesn't exist, I believe it's safe to create it yourself first.

## The File objects

When you call `get` or `enumerate` on `navigator.getDeviceStorage('sdcard')` you get File objects.

For reference, these objects look like this (slightly different than the [File API page on MDN](https://developer.mozilla.org/en-US/docs/Web/API/File)):

```javascript
{
  name: 'file.txt',
  size: 32768, // In bytes
  type: 'text/plain', // MIME type
  lastModifiedDate: 'Fri Nov 22 2013 12:00:00 GMT+0000 (GMT Standard Time)', // Date object,
  mozFullPath: 'path/to/the/file' // Relative to the SD Card folder
}
```

They also have 2 methods: `slice()` and `mozSlice()`.

Then if you want to have access to the content of these files in JavaScript, you can just pass them to the FileReader API:

```javascript
var reader = new FileReader()
reader.onload = function (e) {
  // e.target.result is the content of the file.
}
reader.readAsText(file) // Or whatever method suits you best.
```

I found this API complex to work with. There are different way to access files depending on:

- what you do with (read only or write)
- whether you know the file location or not

I hope to write a more complete post or tutorial on the Device Storage API in the future, as accessing files is a common use case for web apps in Firefox OS.
