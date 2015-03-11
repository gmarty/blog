"Walk up and use anything" is the promise of the [Physical Web](http://google.github.io/physical-web/).
It is an open source project started by Google that allows you to access to online resource via physical objects.

## The concept

The physical web is based on hardware beacons that broadcast data using Bluetooth Low Energy (BLE) without the need to pair the device. In this case, the data is an URL. For now, it requires you to install an app on your mobile device. This app will scan in the background the surroundings for beacons and will inform you whenever you come across one. You'll then be presented with a list of URL, one per beacon. If the project is successful, this feature may be built-in your mobile OS in the future, thus removing the need for an external app.

There are already some beacons available. I bought a [physical web pack from Blesh](https://www.blesh.com/product/blesh-pack-3-beacons/), but there are more [providers](http://store.twocanoes.com/collections/physical-web-beacons). You can also turn your laptop or other devices into beacons using the [projects listed here](https://github.com/google/uribeacon/blob/master/beacons/README.md). There's even an implementation for Node.js.

![The Physical Web beacons by Blesh](https://lh3.googleusercontent.com/THMrcnE8cMC3H8ymn_HVIp1uyGZ7I58PcEiJfndWy9Ci=s600 "The Physical Web beacons by Blesh")

These projects allow you do to both reading and advertising. The app required to read physical web beacons is available on Android and iOS.

## mDNS support

Advertising URL on a local network is also supported thanks to [mDNS](https://github.com/google/physical-web/blob/master/documentation/mDNS_Support.md). It works essentially by using a `_http._tcp` service with an optional TXT record for the path.
As noted on the website, the advantage over BLE is that reading is limited to the devices connected to the local network and won't leak to unauthorised people. It also enables broadcasting longer URLs.

## Criticism

This project is really interesting because it helps discovering content useful locally using the P2P web.
Unfortunately I wish the concept had been taken further and instead of advertising URL that requires an Internet connection to be visited, it could have advertised content stored locally, on a embedded server. You can always advertise URL from a local network using mDNS, but how to make sure the visitors are connected to the correct local network if you use BLE?
I understand it is probably in Google's own interest to promote Internet and force users to remain connected at all time. They're not making money on local content completely disconnected from the Internet.

Also it looks like the main use case is to advertise products and services. I strongly think the web and the Internet of things shouldn't be about consumption and profit only. The P2P Web should reinforce local communities and make people to help each other. It should enable you to connect with local people (It sounds cheesy, I know...).
Anyway, the web being what you make of it, I still think the physical web is an interesting project.

## Next step

I've started building an app to implement the [Physical Web on Firefox OS](https://github.com/gmarty/fxos-physical-web). It will allow you to read and act as a physical web beacons. At the moment BLE is not implemented on B2G, but it's coming to v3, later this year. So in the meantime, I'm relaying on mDNS.

I've set up one of the physical web beacons to advertise the URL of this blog. I'm carrying this beacon with me most of the time. So if you come across it in the streets of London, you'll know I'm not far away!
