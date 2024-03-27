---
title: 'Google Play Music on Firefox OS'
date: '2014-10-02'
description: 'How to enjoy Google Music on your Firefox OS device?'
cover: '@/assets/covers/google-play-music-on-firefox-os.png'
---

Unfortunately, HTML5 playback of Google Play Music doesn't work in Firefox desktop, let alone Firefox OS.

The only workaround on desktop is to deactivate HTML5 Audio (and enable Flash!) in `Settings` > `Lab`:

![How to deactivate HTML5 audio in Google Play Music Settings](/img/posts/google-play-music-on-firefox-os/google-play-music-flash.png 'Deactivate HTML5 playback in Google Play Music.')

The reasons why HTML5 playback doesn't work is probably because of browser sniffing. A couple of bugs are opened ([Google Play Music HTML5 Audio Feature broken](https://bugzilla.mozilla.org/show_bug.cgi?id=911837) and [Google Play Music not working on Firefox for Android/Firefox OS](https://bugzilla.mozilla.org/show_bug.cgi?id=902531)), but no clear solution was provided thus far.

I'm using Google Play Music to play my CD collection that I've encoded over the last few years and I want listen to it on Firefox OS.

## JavaScript API? Nay

There are no official APIs, but some unofficial ones are available. The risk of relying your product on unofficial API is that it can stop working because of a redesign or a protocol change of the original service. Before consider this as an option make sure to check how is the maintainer committed to the API maintenance!

I'm not enquiring further in this direction because a server is usually required. I want something that works offline.

## Offline mode? Yay

So, here's how I use Google Music on my Firefox OS devices:

- Install the official client on my desktop
- Download all of my library (warning: may take time and bandwidth)
- Copy to a memory card.

I get:

- My albums
- The songs metadata
- The art cover (I _really_ like that)

I don't get:

- Uploaded content since last library download
- My playlists

It's completely disconnected to the Google Music account, so whenever I upload new CDs, I have to download and copy them to the SD card. But to be honest I don't really mind and it works for me: I get the album covers and it works offline!

![Firefox OS Play app showing albums imported from Google Music](/img/posts/google-play-music-on-firefox-os/Firefox-OS-play-app.png 'Firefox OS Play app')
