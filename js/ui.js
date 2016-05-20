'use strict';

if (['interactive', 'complete', 'loaded'].indexOf(document.readyState) > -1) {
  init();
} else {
  window.addEventListener('load', init);
}

function init() {
  // Activate the hamburger menu.
  var $navBar = document.querySelector('nav');
  var $menu = $navBar.querySelector('.menu');

  $menu.addEventListener('click', function() {
    $navBar.classList.toggle('nav-show');
  });

  document.querySelector('.content').addEventListener('click', function() {
    $navBar.classList.remove('nav-show');
  });

  $menu.removeAttribute('style');

  // For each post, add the estimated reading time.
  var headersElt = document.querySelectorAll('.post-head');
  Array.prototype.forEach.call(document.querySelectorAll('.post-body'),
    function(postElt, index) {
      var postEltClone = postElt.cloneNode(true);
      var codeEltList = postEltClone.querySelectorAll('code');
      for (var i = codeEltList.length - 1; i >= 0; i--) {
        var codeElt = codeEltList[i];
        codeElt.parentNode.removeChild(codeElt);
      }
      var text = postEltClone.textContent;
      var readingTime = Math.ceil((text.match(/\S+/g)).length / 200);
      headersElt[index].querySelector('span.post-reading-time').innerHTML =
        '<img src="/img/clock.svg" width="15" height="15" ' +
        'alt="Estimated reading time" title="Estimated reading time">' +
        (readingTime == 1 ? '1 minute' : readingTime + ' minutes');
    }
  );
}
