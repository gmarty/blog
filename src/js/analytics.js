'use strict';

// Learn about privacy and Google Analytics in this post:
// https://gu.illau.me/posts/privacy-and-google-analytics/
if (navigator.doNotTrack !== '1') {
  (function(G,o,O,g,l){G.GoogleAnalyticsObject=O;G[O]||(G[O]=function(){(G[O].q=G[O].q||[]).push(arguments)});G[O].l=Date.now();g=o.createElement('script'),l=o.scripts[0];g.src='//www.google-analytics.com/analytics.js';l.parentNode.insertBefore(g,l)}(this,document,'ga'));
  ga('create', 'UA-207391-17', {
    'storage': 'none',
    'clientId': localStorage.getItem('gaClientId'),
    'siteSpeedSampleRate': 100,
    'forceSSL': true,
    'anonymizeIp': true
  });
  ga(function(tracker) {
    localStorage.setItem('gaClientId', tracker.get('clientId'));
  });
  ga('send', 'pageview');
}
