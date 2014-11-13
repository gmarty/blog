{
  title: "The problem of user language lists in JavaScript",
  date: "2014-01-28",
  description: "The list of languages configured in the browser is never made available to JavaScript!"
}

[Edit: I wrote a followup post to this one at [Follow-up on navigator.languages](http://gu.illau.me/posts/follow-up-on-navigator-languages/)]

[I've always wondered](https://twitter.com/g_marty/status/412527722410553344) why it is not possible to get in JavaScript the list of all languages as configured in the browser. This list is made available to servers via a HTTP header.

On the other hand, JavaScript can only get the first language using:
```javascript
console.log(navigator.language); // 'en', 'fr', 'de' or whatever
```

## Browsers inconsistencies
Getting the language of the browser is part of the [HTML5 specifications](http://www.w3.org/TR/html5/webappapis.html#language-preferences), but implementations vary widely.

### Internet Explorer
Let's start with IE that has (surprisingly) the most complete set of (non standard) features about the environment language. `navigator.userLanguage` gets the first language set by the user (can be changed in Internet Options > General > Languages ; see [Internet Explorer Dev Center](http://msdn.microsoft.com/en-us/library/ie/ms534713%28v=vs.85%29.aspx)).

`navigator.browserLanguage` returns the language of the UI of the browser. You can't change this value, it is decided by the version of the executable you installed (This property and all its subtleties are described in [Internet Explorer Dev Center](http://msdn.microsoft.com/en-us/library/ie/ms533542%28v=vs.85%29.aspx)).

Finally, `navigator.systemLanguage` will give you the locale used by the OS (See [Internet Explorer Dev Center](http://msdn.microsoft.com/en-us/library/ie/ms534653%28v=vs.85%29.aspx).

### Firefox & Safari
`navigator.language` returns the first language in the list of languages.

In Firefox, you can define it in Options > Content > Languages.

Safari uses the language set at the system level (See `navigator.systemLanguage` of IE above). You cannot just override it in Safari.

Some details are available on the [navigator.language page on MDN](https://developer.mozilla.org/en-US/docs/Web/API/NavigatorLanguage.language).

### Chrome
Invariantly returns the language of the UI through `navigator.language` without a [possibility to change it](https://code.google.com/p/chromium/issues/detail?id=1862). The value is similar to `navigator.browserLanguage` of IE.

Chrome extensions can retrieve the full list of languages as set by the user thanks to `chrome.i18n.getAcceptLanguages()` (Not sure why this API is async):
```javascript
chrome.i18n.getAcceptLanguages(function(requestedLocales) {
  // 'requestedLocales' is an array of strings.
});
```

## What's wrong with the current approach?
Well, apart from the semantic inconsistencies, knowing only the main language is a serious limitation. Let's illustrate this with my personal experience. My browsers have the following configuration:

1. Japanese
2. English (GB)
3. English
4. English (US)
5. French
6. Spanish
7. Korean
8. German

(Yeah, I want to train my Japanese, so I listed it first!)

A website available in several languages will show the interface in Japanese and English if not available.

But a local app will only get the first language, Japanese. So if this language is not available, the UI will be shown in a totally random language that I may not understand.

Also, if the app knows the full list, it could use it to detect visitors speaking rare languages and ask them to collaborate on translation.

## How to fix it?

First of all, an easy cross browser way to get the preferred language is to do:
```javascript
/** @const */ DEFAULT_VALUE = 'en';
/** @const */ PREFERRED_LANGUAGE = navigator.language || navigator.userLanguage || navigator.browserLanguage || navigator.systemLanguage || DEFAULT_VALUE;
```

That's fine as long as your app supports this language.

If not, you could always ping a server, get the `accept-language` HTTP header, send the response back to JavaScript and parse it. That means that you need a scriptable server, so you cannot do it for, offline apps or for apps hosted on a static web server like Github Pages.
Oh and Mac have only one language configured at a time: you will never get more than 1 element in the list of this header on Safari.

## What to do next?

The good news is things are being worked on.

First, there is [this bug](https://www.w3.org/Bugs/Public/show_bug.cgi?id=23517) on the WHATWG bug tracker to discuss this feature, with all [the details here](https://github.com/marcoscaceres/Locale-Preferences-API/blob/master/proposal.md). Firefox is already [thinking of implementing it](https://bugzilla.mozilla.org/show_bug.cgi?id=889335).

To put it in a nutshell, the current consensus is to have a new JavaScript property called `navigator.languages` that returns an array of language codes sorted by preference order:
```javascript
console.log(navigator.languages);
// The configuration above would give something like:
// ['ja', 'en-GB', 'en', 'en-US', 'fr', 'es', 'ko', 'de'];
```

Also, firing an event when language changes is also being discussed. Firefox OS allows this on certified apps with a proprietary API:
```javascript
navigator.mozSettings.addObserver('language.current', function(event) {
  console.log('New language', event.settingValue); // Default value is 'en-US'.
});
```

## To conclude
Making the full list of languages configured in a browser available to JavaScript can't be done front-end at all and partially using back-end. But this information is stored in the OS/browser itself. Am I the only one to think something is wrong here?

This topic is hard and has been around for a while, so some of the resources I consulted might be outdated. Use the comments below if you spotted any error.
