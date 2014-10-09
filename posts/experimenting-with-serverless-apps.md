{
  title: "Experimenting with serverless apps",
  date: "2014-10-09",
  description: "Can we dream of a serverless web?"
}

Servers are inherent to the web. The recent [unhosted](https://unhosted.org/) movement tends to reduce their importance to give the power back to the client applications.

But is a completely serverless web really achievable?

Let's stay very basic for now and let's not consider issues like security or version update.

(Note: the content of this post was inspired and developed during an [event](http://lanyrd.com/2014/decentralizejs/) and a [hack day](http://www.meetup.com/ORG-London/events/202557812/) I attended recently.)

## A dystopian example

Imagine you are demonstrating against the government in place in your country. They are powerful and control the communication. In order to slow and confuse you they cut all network. Without internet you can't communicate with your peers and can't organise the movement.

You want to be able to send and receive information. How can you do that when all you have is a web enabled device and no network?

## Distribute serverless apps

Let's see if it's possible to distribute apps from device to device, using web technologies only but without servers.

### file:// URI scheme

The most obvious and direct approach is to create a file on your computer and open it in your browser using the `file://` protocol.
It works for simple documents but comes with a huge list of limitations:

* [Same-origin policy limitations](https://developer.mozilla.org/en-US/docs/Same-origin_policy_for_file:_URIs)
* Can't open a `file://` URI from a `http://` web page
* The reference to the document is local and can't be shared
* Does it even work on mobile browsers?

### Data URI

Data URIs allow to package all of your app logic and resources in a string format that your browser can recognise and execute.
Rather than using a URL as a reference to a content located somewhere, the URL contains everything. The address IS the content.

A very simple example is the following:
<a href="data:text/html;utf-8,%3Cb%3EHello%2C%20world!%3C%2Fb%3E">data:text/html;utf-8,&lt;b>Hello, world!&lt;/b></a>

Clicking on the link will display the text "Hello, world!" in bold. Everything is self-contained.

There is a limitation, however, in the number of characters such a URI can contain: no more than 65535. Here is the function I use to convert HTML code to data URI:

```javascript
function dataUriEncode(string) {
  var encoded = 'data:text/html;utf-8,' + encodeURIComponent(string);
  if (encoded.length >= 65535) {
    console.error('The string generated is too long.')
  }
  return encoded;
}
```

## Abusing data Uris

Let's now abuse this simple mechanism to create web pages and distribute them without server.

For the sake of an example, I shamelessly stole [WOLF1K](http://www.p01.org/releases/WOLF1K/), a clone of Wolfenstein in JavaScript that only weights 1K. Here is the complete source code of the app that I'll try to distribute:

```
data:text/html;utf-8,<title>WOLF1K</title><canvas id=c></canvas><script>E="A=document.body.children.c;B=A.getContext('2d'~=1$&31$&992(E&19)?1;	n=@nB#[A#)onkeyup=0};D=[setInterval(@=innerWidth-30;A.heigh@/2;	n=@n=[t,n,S,8+$*S&8)|(X+y+t*s+t*c8&7]){w=X=x=;v=y=;z=2]z+n/@ a=s=yG=F,r=u;a=c=X	;$~)F<G?(F,F1/uS=c/u):(G,G1/rS=32*s/r)}	n=@i<15;i++){2];j=38;i?1X=(+,;Y=(,+;ji?random(8-42]=(b-t/16+9.42%6.28)-3.14;z-atan2(Y-=v,X-=w~i&&>.5?=[sqrt(X*X+Y*Y),@/2-@*b,i,0,++n]	D.sort(+x[-y[}~n)	a=[,a/@ F=@/2//[,c=8,u=v=+1=[3]=c=1,@,0%)'):a!ca)	'+v+'%)'atob('CBF+/p6f9AC9bsP/w/dqvdvb2NvD29sb'),y=8,@/4,b!yb)d>>y&1,v),9)]";"@A.widthMath.cos(b)B[i][function(x,y){B.fillStyle='hsl('+D[n][2]+'1,99%,%=1;u=a<0?-a:a,F=(a<0?d:1-d)/u;onkeydownMath.sin(b).charCodeAt(x++%73)	for(?B.fillRect(a,b,u:A[j]-A[j+2];D[n]A[x.which]=--;*t/8;x|=y<<5;,i=0;Math.+=0]1.1,return)*b=,d=:0}F/41]t= -.5,!-=F;#[n]=$(x~);,x".replace(/.([%-}]+)/g,function(x,y){E=E.split(x[0]).join(y)});eval(E)</script>
```

I will now run this web page and distribute it to other devices without using a server.
The tests below are based on the following browser/OS configuration:

* Firefox OS
* Firefox for Android
* Chrome for Android
* Firefox and Chrome desktop (on Ubuntu ; where it makes sense)

Feel free to test and send me the results on other OS configurations.

## Distribution strategies

### Link

This is the easier way of sharing a data URI app and it works everywhere! Just click the link below to start the app:
<a href="data:text/html;utf-8,%3Ctitle%3EWOLF1K%3C%2Ftitle%3E%3Ccanvas%20id%3Dc%3E%3C%2Fcanvas%3E%3Cscript%3EE%3D%22A%3Ddocument.body.children.c%3BB%3DA.getContext('2d'~%06%3D%03%0F1%12%18%24%2631%19%24%26992%19(E%08%2619)%3F1%1C%3B%09n%3D%40%13n%10B%23%5B%17%17%17A%23%16)onkeyup%3D%03%0F0%7D%3BD%3D%5BsetInterval(%03%40%3DinnerWidth-30%3BA.heigh%1F%40%2F2%3B%09n%3D%40%13n%10%0E%3D%5Bt%2Cn%2CS%2C8%2B%24*S%268)%7C(X%2By%2Bt*s%2Bt*c%198%267%5D)%7Bw%3DX%3Dx%3D%02%16%3Bv%3Dy%3D%02%1E%3Bz%3D%022%5D%12%1Az%2Bn%2F%40%20a%3Ds%3D%07%1By%05G%3DF%2Cr%3Du%3Ba%3Dc%3D%01%1BX%05%09%3B%06%24~)F%3CG%3F(%1FF%2CF%151%2Fu%7F%15S%3Dc%2Fu)%3A(%1FG%2CG%151%2Fr%7F%15S%3D32*s%2Fr)%7D%09n%3D%40%13i%3C15%3Bi%2B%2B)%7B%1A%022%5D%3Bj%3D38%3B%1Fi%3F1%0CX%3D%02%16%15%06(%02%16%2B%01%11%2C%02%1E%19%01%11%3BY%3D%02%1E%15%06(%02%16%2C%02%1E%2B%07%11%19%07%11%3Bj%10%1Fi%3F%14random(%198-4%0C%022%5D%3D(b-t%2F16%2B9.42%256.28)-3.14%3B%1Az-%14atan2(Y-%3Dv%2CX-%3Dw~i%26%26%01%3E.5%3F%0E%3D%5B%14sqrt(X*X%2BY*Y)%2C%40%2F2-%40*b%2Ci%2C0%2C%2B%2Bn%5D%1C%09D.sort(%03%18%2Bx%5B%16-y%5B%16%7D~n%10)%09a%3D%0E%5B%1E%2C%1Aa%2F%40%20F%3D%40%2F2%2F%01%2F%0E%5B%1A%16%2Cc%3D8%2Cu%3Dv%3D%1D%2B1%7F%3D%0E%5B3%5D%7F%0B%3Dc%3D1%2C%40%2C%040%25)')%3Aa!c%10a%15%1D)%09%04'%2Bv%2B'%25)'%1Batob('CBF%2B%2Fp6f9AC9bsP%2Fw%2Fdqvdvb2NvD29sb')%08%2Cy%3D8%2C%1A%40%2F4%2Cb!y%10b%15%1D)d%3E%3Ey%261%0B%2Cv)%1C%2C9)%5D%22%3B%22%40A.width%01Math.cos(b)%02B%5Bi%5D%5B%03function(x%2Cy)%7B%04B.fillStyle%3D'hsl('%2BD%5Bn%5D%5B2%5D%2B'1%2C99%25%2C%05%25%3D1%3Bu%3Da%3C0%3F-a%3Aa%2CF%3D(a%3C0%3Fd%3A1-d)%2Fu%3B%06onkeydown%07Math.sin(b)%08.charCodeAt(x%2B%2B%2573)%09for(%0B%3FB.fillRect(a%2Cb%2Cu%0C%3AA%5Bj%5D-A%5Bj%2B2%5D%3B%0ED%5Bn%5D%0FA%5Bx.which%5D%3D%10--%3B%11*t%2F8%12%3Bx%7C%3Dy%3C%3C5%3B%13%2Ci%3D0%3B%14Math.%15%2B%3D%160%5D%171.1%2C%18return%19)*%1Ab%3D%1B%2Cd%3D%1C%3A0%7D%1DF%2F4%1E1%5D%1Ft%3D%20-.5%2C!-%3DF%3B%23%5Bn%5D%3D%24(x~)%3B%7F%2Cx%22.replace(%2F.(%5B%25-%7D%5D%2B)%2Fg%2Cfunction(x%2Cy)%7BE%3DE.split(x%5B0%5D).join(y)%7D)%3Beval(E)%3C%2Fscript%3E">WOLF1K</a>

Obviously a link means that a web page is required and possibly a server to host it.

### Emails

I haven't been able to send or receive a data URI link from an email. This is due to security reasons.
What works though is to paste the source code of the app and ask the recipient to copy and paste it in her browser address bar.

### SMS

Likewise, copy/pasting content from a text message is the only way to use SMS to send such an app.

### Bluetooth and NFC

This methods were a major disappointment to me. I was really hoping that one can send a data URI app from a device to another. But it doesn't work due to "Can't open media type" (Bluetooth) and "Unknown tag type" (NFC) errors.
That said, I suspect it can be fixed on Firefox OS.

### QR Code

1084 characters are too much for QR Code and make it impossible to decode.

This is sad because this prevents us from using printed material to distribute apps.

If you don't believe me, try to scan that:
![WOLF1K](https://lh3.googleusercontent.com/b60QnpsZFq0_-xrxhrypM9Tj_rMjoSHWNZjshbtz3aq9=s0 "WOLF1K.png")

### Wifi Direct

This is a protocol to discover and communicate with devices connected to the same Wifi network, even if there is no Internet connection.
Though it is currently implemented in Firefox OS and Android, this needs to be tested to see if it's possible to send data URI web app via this channel.

## Bookmarking and adding to homescreen

Once the app received is running on your browser, you want to bookmark it so that you can use it later.

Desktop browsers permit bookmarking data URI apps, but not to add to homescreen.

On mobile browsers, things are slightly more complex:

* Firefox for Android: bookmark and add to homescreen both work OK
* Chrome for Android: can bookmark but app added to homescreen can't be opened ("App isn't installed" error message)
* Firefox OS: bookmark is replaced by add to homescreen, but this feature doesn't work as of version 2.1 with data URI (Here again I believe this can be fixed)

## So what now?

Ironically the only methods that work are the server based one (link, email, text messages). Distributing web documents encoded in data URI without a server is a bit tricky at the moment. OS UI don't always allow creating, sharing or opening such apps.
I understand this falls in a particular edge case, but if data URI apps were supported like URL based apps, things would be easier.

Now I'd love to see a discussion happening around what does the web need to achieve this. Are they any specifications currently being standardised that would go in this direction?

Let's move things forward and get a truly serverless web!
