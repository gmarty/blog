{
  title: "Building a Voice Assistant in JavaScript",
  date: "2016-05-17",
  description: "An overview of voice and intelligence in JavaScript"
}

In the last couple of days, I explored the voice in the browser. Here's my findings (**tldr:** it works but sucks).

## What's available
Most of the voice related libraries in  JavaScript that I found are simple wrappers around the [Web Speech API](https://dvcs.w3.org/hg/speech-api/raw-file/tip/speechapi.html). Under the hood browsers use external services so I ruled out these libraries immediately as I wanted something that works offline.

What I found:

* [pocketsphinx.js](https://github.com/syl22-00/pocketsphinx.js) for voice recognition
* [speak.js](https://github.com/kripken/speak.js/) for voice synthesis (several forks available)

Both these projects are brought to the web thanks to Emscripten and asm.js.

## Building a (not so) intelligent voice assistant
Thanks to a discussion with my friend [Thomas](https://twitter.com/oncletom) this weekend, [CENode.js](http://cenode.io/) was brought to my attention. It's an open source project to enable human-machine conversation based on a human-friendly format. It can be used to simulate intelligence.

I had all the elements at hand to build a browser-based, offline voice assistant (Think Siri, OK Google, Amazon Echo...).

## Coding (or rather gluing)
Gluing all parts together was unsurprisingly easy. Pocketsphinx.js calls a function when the web worker has a final hypothesis:
```javascript
worker.onmessage = (evt) => {
  if (evt.data.hyp !== undefined && evt.data.final) {
    gotHypothesis(evt.data.hyp);
  }
};
```

I can feed this hypothesis to CENode.js by creating a new card:
```javascript
function gotHypothesis(hypothesis) {
  const card = "there is a nl card named '{uid}' that is to the agent 'agent1' and is from the individual 'User' and has the timestamp '{now}' as timestamp and has '" + hypothesis.replace(/'/g, "\\'") + "' as content.";
  node.add_sentence(card);
}
```

Then I just have to wait until the deck is polled for new cards to my attention (my name is `User`). The new card contains the answer to my request and I can just do:
```javascript
speak(card.content);
```

The function `speak` will call `espeak.synth()` of speak.js.

## Adding a grammar
This is it for the JavaScript code. But an important part is still missing. Pocketsphinx.js needs to be fed with a grammar and the pronunciation of all the words used in the grammar. This is used to reduce the scope of detected phrases. So I'll conveniently reuse all the possible requests supported by CENode.js.

Considering the [CENode.js demo](http://cenode.io/demo/) about astronomy, here's a list of some requests that it can understand (let me know if I missed any):
```
What orbits Mars?
What does Titan orbit?
What is Saturn?
What is a star?
List instances of type planet
```

The first step is to compute all the possible permutations that make sense in English and that CENode.js will understand. I found 124 of them. This is the corpus I'll use in the next steps.

The grammar used by pocketsphinx.js is a Finite State Grammar. Think of a finite state machine where each state adds a word to the phrase:
```
s = 0 // s is the state with initial value 0.

[]    -> [What] -> [does] -> [Titan] -> orbit?
s = 0    s = 1     s = 2     s = 3      s = 4
```

The grammar for this simple phrase is:
```javascript
const grammar = {
  numStates: 5,
  start: 0,
  end: 4,
  transitions: [
    { from: 0, to: 1, word: "WHAT" },
    { from: 1, to: 2, word: "DOES" },
    { from: 2, to: 3, word: "TITAN" },
    { from: 3, to: 4, word: "ORBIT" },
    { from: 4, to: 4, word: "<sil>" }
  ]
};
```

The more phrases you add, the more complex it gets. For each state, pocketsphinx.js uses the grammar to figure out what is a possible next step. If your grammar is correct, you cannot end up with meaningless sentences.

I wrote a small script to build grammars from a corpus of phrases that I may publish if anyone is interested.

## Adding pronunciation
For each word in the corpus, pocketsphinx.js needs to know how to pronounce it.

I fed my corpus to [Sphinx Knowledge Base Tool](http://www.speech.cs.cmu.edu/tools/lmtool-new.html). I simply took the `*.dic` file from the gz archive, split it on line breaks and split again each line on tabs and I got something like:
```javascript
const wordList = [
  ["WHAT","W AH T"],
  ["WHAT(2)","HH W AH T"],
  ["ORBIT","AO R B AH T"],
  ["MARS","M AA R Z"],
  ...
```

## The result
Et voila ! That's all I needed to get an astronomy centred voice assistant that can tell me what satellites orbit around what planets and other detailed infos. I have to say it's pretty cool, specially because I'm a big fan of astronomy and I got this project done in under 2 days.

As a side note I tested it only on Firefox Nightly on my laptop. Results may differ on Chrome or on mobile devices.

The result though is not really convincing. First of all pocketsphinx.js voice recognition is bad. I can probably blame it on  my accent (I'm French, remember), but it's so frustrating to say "What orbits Saturn?" hundreds of time with no results while my colleague got understood at the first try! The good thing at least is it can't return phrases out of the grammar, so it will always output something that makes sense.

CENode.js is also super limited and I don't really know how to improve it beyond the example provided (the format is well documented though). Some simple phrases, outside of the understanding scope, fail miserably:
```
What is orbited by Titan? --> fails
What does Titan orbit?    --> succeeds
```

But if you ask "What is Saturn?", you get:
```
Saturn is a planet. Saturn orbits the star 'sun' and is orbited by the moon 'Titan'...
```
The passive voice does not seem to be supported in requests.

Finally, what is output by speak.js is pretty terrifying. Whatever the voice you choose, they all sound robotic. They have a cool retro feeling if that's what you're after (and you can argue that it works better for something related to astronomy and space), but they're far from the quality of commercial products.

## Going further
This experimentations were limited in time so I didn't want to spend too much on it, but if I had had a real project to build, I'd had seriously looked at:

* Finding better language packages for pocketsphinx.js.
* Building better grammar files for pocketsphinx.js.
* Using CENode.js' advanced features.
* Using better voice packages in espeak.js.
* Supporting more languages outside of English

I don't think it's worth sharing the code that's messy and I'll leave it as an exercise to the reader, unless somebody is really interested.

What I can share though is the FSG generator from a corpus. It needs some cleaning but the code can run on node or in the browser.

There's probably tons of mistakes and approximations in this post, I'm by no means a voice expert, so please correct me if need be. Also if you have any ideas on how to improve it or if I missed an existing library, please do let me know in the comments. Thanks!
