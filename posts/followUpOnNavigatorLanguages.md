{
  title: "Follow-up on navigator.languages",
  date: "2014-09-09",
  description: "navigator.languages started to get implemented in browsers."
}

`navigator.languages` recently made its way to the stable versions of browsers: Firefox 32, Chrome 37 and Opera 24!

## Getting all the user languages

As explained in an [earlier post](http://gu.illau.me/posts/the-problem-of-user-language-lists-in-javascript/), `navigator.languages` gives us the complete list of languages as set by the user in her browser.

`navigator.languages` is an array of language codes sorted by priority (the lower the index, the higher the priority).

You can do cool things like:
```javascript
var langNum = new Set(navigator.languages.map(function(code) {
  return code.split('-').shift();
})).size;
console.log('It looks like you can read %i %s.', 
  langNum, langNum > 1 ? 'different languages' : 'language');
```

(`Set` is used here to dedupe the array.)

Use this to show the best matching language by comparing `navigator.languages` to the ones supported by your app. But of course, also offer an option to change the language.

## `languagechange` event

In addition to `navigator.languages`, browsers can now listen to the `languagechange` event fired by the `window` object to update the UI language accordingly:
```javascript
window.addEventListener('languagechange', function() {
  console.log('You updated your browser languages to "%s"', navigator.languages.join(', '));
});
```

I set up this quick demo that [lists the languages set in your browser](http://jsbin.com/difen/1/) and stays up to date.

This powerful event means web apps don't require to be reloaded to update their UI language and can integrate perfectly in the browser/OS.

## Polyfill

Polyfilling `navigator.languages` couldn't get any easier:
```javascript
if (!navigator.languages) {
  navigator.languages = [navigator.language];
}
```

## Setting the language independently to the OS

As a side note on this topic, on most mobile OSes (and some others like MacOS), the language of the browser is tied to that of the OS. Since last year, it's now possible to change the language of Firefox for Android independently (and without restarting the browser!).
Why is it important? See [this blog post](http://160.twinql.com/new-locale-related-work-in-firefox-for-android/) for more details.
