{
  title: "Privacy and Google Analytics",
  date: "2014-12-08",
  description: "You can fine tune Google Analytics to protect the privacy of your visitors"
}

## The problem

After reading a post comparing analytics solutions, I realised most people ignore that Google Analytics can be fine tuned to comply with stricter privacy policies. In this post, I'll share the solutions I implemented to keep using Google Analytics without compromising my visitors (a.k.a. yourself) privacy.

Please note that the code only relates to the latest `analytics.js` API. Look for support pages for older versions of Google Analytics.

## The solutions

### Disable data sharing

By default, the data collected from Google Analytics are shared across several services like:

* Other Google products like AdWords
* Industries aggregate trends that allow comparing your result with web sites in the same sector
* Technical support...

Though this data sharing should be harmless most of the time, you can disable it in your account settings. You can read more about it on the [data sharing settings](https://support.google.com/analytics/answer/1011397?hl=en) support page.

### Anonymise IP address

Google Analytics has a built-in feature to anonymise IP address (see this [help page](https://support.google.com/analytics/answer/2763052?hl=en) for details). When enabled, the last few digits of the visitor's IP address are set to 0 (IPv6 is supported).
In theory it is not possible for Google to map an anonymised IP address to a specific user. Also, according to their documentation, the complete IP address is never logged.

However, I read the relevant document carefully and noticed it's not very clear to me if Google logs the IP address when the `analytics.js` file is requested from their server. If you're a bit paranoid, you may decide not to trust Google here. In such case, you'll want to proxy it on your own domain and refresh it as often as possible. I haven't tried myself, but if you're doing that, let me know as I'd love to read more.

Obviously, the down side of this setting is you get a less accurate geographic report as it is based on the IP address. But who needs a granularity to the level of a city?

### Implement an opt-out mechanism

You can easily give your users the ability to deactivate tracking. Just create a setting in your app that sets the following property to `true`:
```javascript
window['ga-disable-UA-XXXXXX-Y'] = true; // Replace UA-XXXXXX-Y by your Google Analytics ID
```

You can persist this setting in your user account, so that her preference is is kept whatever the device she's using to access your website. But for performance reason, I recommend not to load Google Analytics at all when your user has opted out.
You can read more about [user opt-out](https://developers.google.com/analytics/devguides/collection/analyticsjs/advanced#optout) in the help pages.

### Don't use cookies

Though not directly related to privacy, not setting cookies is likely to increase your visitors confidence while removing the need to display a message related to the [EU cookie directive](https://en.wikipedia.org/wiki/HTTP_cookie#EU_cookie_directive).

Instead of cookies, use local storage for storing the visitor identifier used by Google Analytics, the so called `clientId` parameter. This technique has a beneficial aspect on performance as well. The browser won't send all the cookie detail with every request made to an asset located in the same domain as the page.

Here is the code used in this blog:
```javascript
ga('create', 'UA-XXXXXX-Y', { // Use your own ID!
  'storage': 'none',
  'clientId': localStorage.getItem('gaClientId')
});
ga(function(tracker) {
  localStorage.setItem('gaClientId', tracker.get('clientId'));
});
ga('send','pageview')
```

### Comply with Do Not Track

The DNT is not only exposed to the client as a HTTP header but also as a property on the `navigator` object: `navigator.doNotTrack`. This returns:

* `'1'` (the visitor does not want to be tracked)
* `'0'` (the visitor wants to be tracked)
* `null` or `'unspecified'` (the visitor tells nothing about her preference)

You can wrap the code responsible for loading Google Analytics in a `if` statement like I do in this blog (examine the source for yourself if you don't believe me!):
```javascript
if (navigator.doNotTrack !== '1') {
  // Load Google Analytics and track user.
}
```

### Force SSL

This blog is hosted on Github pages. Unfortunately, https is not (yet?) supported. The least I could do was to force the `analytics.js` file and the beacon to be respectively received and sent encrypted.
More info about the [`forceSSL` setting](https://developers.google.com/analytics/devguides/collection/analyticsjs/field-reference#forceSSL) is available.

## The challenge

Some of the solutions presented here depend on your level of trust. I decided to trust Google even if I can never have the certitude that they really do what they say they do.
So after all, your trust level may be different and you can decide whether to apply the solutions mentioned above or turn to other analytics services, like [Piwik](http://piwik.org/).

Also, I would have loved to see Google making some of these options easier. For example, support of DNT could have been made an option in the account settings. Also, we can't create a custom IP masking function to push anonymisation even further.

Google Analytics offer some very basic privacy aware options, but they should offer more!
