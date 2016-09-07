{
  title: "Japanese keyboard for Firefox OS",
  date: "2015-06-29",
  description: "There is not yet any good solution to input Japanese on Firefox OS"
}

> **tl;dr:** You can't efficiently type in Japanese on a Firefox OS device, unless you buy a fx0 device or you build Gaia yourself and are very patient!

Firefox OS is targeting a global audience. You can set your interface in 90 different languages and there are over 70 language specific keyboards!
But developing a keyboard is more challenging for some languages than others and Japanese is one of them.

I won't give much details about why is a Japanese IME hard to implement, but the main reason is that there is a massive amount of  suggestions that need to be stored on the device somehow. In Japanese, any word can be usually written in several different ways. Storing such a dictionary can cause serious issues on low-end devices with limited memory and processing power.

But that's not a reason to just giving up typing in Japanese on Firefox OS.

## fx0

Earlier this year, KDDI released the [fx0](http://au-fx.kddi.com/products/), a Firefox OS powered device, on the Japanese market. This phone comes with a Japanese keyboard called [iWnn IME](http://www.omronsoft.co.jp/product_text/iwnn-ime-for-firefox-os/) and developed by Omron Software.

The implementation is efficient and powerful. It comes with many options to configure the keyboard to perfectly suit your needs and habits. Such a high quality is not really surprising as the same keyboard is already available on other platforms (Android notably).

This keyboard has been open sourced in the [iwnn-ime-sample](https://github.com/mozilla-japan/iwnn-ime-sample) Github repo. However the licence is expiring on 30th September 2015 (not sure what's happening afterwards).

The readme file claims it's possible to flash it on a Flame running Firefox OS v2.0. So I tried and everything is working, except for the core feature: the words suggestion. To achieve this in an optimised way, a local server running on the device is used to query words. This part doesn't work. The keyboard however can still be used to input kana, but you won't get any word suggestions.

I then flashed it on a master (tried both on a Flame and Sony Z3C). I encountered the same issue with the words suggestion together with other few minor bugs. But if you use it as a kana only keyboard, then this is probably acceptable.

Drop me a comment below if you need help on how to install it.

![iWnn IME for Firefox OS](https://lh3.googleusercontent.com/LdqNqF5ny4xMumE8m9jSZQMrujhFDIGZBA1SUoxYAU0u=s0 "iWnn IME for Firefox OS")

## Gaia `jp-kanji` keyboard

There is already a [Japanese keyboard in Gaia](https://github.com/mozilla-b2g/gaia/tree/master/apps/keyboard/js/imes/jskanji). To install it, you must build Gaia yourself and flash your device. Here is the suggested command line:
```bash
$ GAIA_KEYBOARD_LAYOUTS=en,jp-kanji make reset-gaia
```

Once flashed, you must enable the new keyboard in `Settings` > `Keyboards`  > `Select keyboards`.

This IME comes with words suggestion, but it is neither as user-friendly nor as fast as the iWnn IME one.
That is the reason why it is not available to current builds. I love how the design fits in the Firefox OS UI though.

There are plans to build a better Japanese keyboard for Firefox OS, but nothing has happened yet.

![Gaia jp-kanji Keyboard](https://lh3.googleusercontent.com/HZ53_An9tjhWPoveJ4XCbOLdQ-DKCwOxY1hTrcneicTH=s0 "Gaia jp-kanji Keyboard")

So unfortunately, there is no easy way to install a Japanese keyboard on Firefox OS, but we're working on it!
If you're wondering what I'm doing with my device, I use the iWnn IME keyboard, but because of its limitations, I avoid typing in Japanese on my mobile whenever I can :-)