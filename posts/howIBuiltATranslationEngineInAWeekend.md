{
  title: "How I built a translation engine in a weekend",
  date: "2014-03-03",
  description: "An ode to fast prototyping in JavaScript."
}

## and managed to go out on Friday and Saturday nights

Google Translate is powered by the technique called [machine translation](https://en.wikipedia.org/wiki/Machine_translation). It can translate sentences from one natural language to another, without human interactions.
I recently heard that Mozilla was starting a project to create an open source machine translation engine. That immediately resonated in me and I decided to give it a try and build my own English-Japanese translator in JavaScript.

## Day 1: Get ready
On the Friday late afternoon, I had a general idea of what I wanted to implement: a machine translation engine using syntax to translate sentences. I wanted something simple and couldn't wait to see it working. I realized I had this "fire in the belly" and jumped directly into the action.
I spent a small amount of time gathering what I needed: a corpus of translated pairs in English and Japanese and a part-of-speech tagger for these languages.
I started fiddling around with the tools with as few coding as possible.

## Day 2: Put it together
I had a late night and woke up on Saturday around 11 o'clock. I spent a few hours cleaning up what I had done the day before, creating a dedicated folder and project in my IDE. I started coding and refactor the code.
I also spent some time sketching solutions on paper, to make sure I hadn't missed an important point.

## Day 3: Make it work
I got back to the project in the early afternoon. I mostly did coding this day. I was so excited to see my translation engine work that I sat in front of my computer for ~10 hours. At the end of the day, I had something working. After a bit of cleaning, I created the repo on Github and pushed the code.

## After day 3
Whatever happened after day 3 is not important. Most of the work has been done over the weekend and I had a working prototype. Obviously, it is just a toy system, that is nothing comparable to Google Translate, but I'm happy I was able to do it in a rather limited amount of time. And most importantly, I can iterate on it and progressively make it better.

## Conclusion
I was able to achieve this because JavaScript is very suited for fast prototyping. If it were a business, I could have started generating profit from day 4. I really love the idea of hacking a quick and dirty prototype and see how it works. Next time you have an idea for a business, do some quick prototyping and launch it as early as possible!

And if you're wondering, I had dinner in a [lovely Italian restaurant](http://pastacibo.com/) on Saturday night :-)
