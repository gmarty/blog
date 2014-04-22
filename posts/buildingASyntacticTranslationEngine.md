{
  title: "Building a syntactic translation engine",
  date: "2014-04-21",
  description: "An indepth write up about a simple syntactic machine translation engine developped in JavaScript."
}

I recently blogged about how [I prototyped a very simplistic translation engine](http://gu.illau.me/posts/how-i-built-a-translation-engine-in-a-weekend/). Here's a follow up to describe the logic involved.

## Disclaimer

I wish I had a serious background in NLP and machine translation, but I don't and the logic described here is solely based on my scarce knowledge in this field and my experience as a foreign language speaker.

## Definition

I'm not sure if the word syntactic machine translation does really exist, but I found it describes what I mean very well. So let's start off by giving my personal definition of syntactic MT.

Unlike advanced techniques, the syntactic MT engine only takes the syntax of the languages into account. It doesn't try to understand the meaning of the phrases to translate. This is major limitation as it can't understand idiomatic expressions, such as proverbs...

Also a single word with different meanings will be translated the same way regardless of the context in the sentence to translate.

This is to be remembered when assessing the accuracy of the translated phrases.

However, the advantage of this method lays in the fact that it is very easy to develop, doesn't require a deep understanding of MT and can be hacked in a weekend!

## How doest it work?

I'll now describe the mechanism I implemented to hack a quick and dirty syntactic MT engine for English and Japanese.

This idea of syntactic MT is that elements in translated pairs bear the same class of Part of Speech (POS ; i.e. noun, verb, adverb...) in both languages, for example, an adjective remains an adjective in the resulting translation. A certain grammatical pattern will be the same in each pairs of the corpus and the resulting translation.

### Spring cleaning

First of all, I cleaned up the corpus a bit, applying the following steps:

* Removing incomplete sentences
* Unify punctuations (specially adding an optional question mark at the end of questions in Japanese)
* Normalising the Japanese to use half-width alphanumeric characters and full-width katakana and punctuation signs

I then normalise both languages to keep semantic equivalents while reducing inflected forms (e.g. `can't` -> `cannot` ; `します` -> `する` ; See `/utils/ja-normalizer.js` and `/utils/en-normalizer.js`). Doing so reduced noise and helped a lot on quality as the corpus is quite small.

### Tag the corpus

Then, the next thing to do is to tag the POS of all the pairs in the corpus.

The English sentences are tagged using [pos-js](https://github.com/fortnightlabs/pos-js) written in JavaScript (an in-browser and Node.JS versions both exist).

The Japanese is tagged using [ChaSen](http://en.wikipedia.org/wiki/ChaSen). ChaSen is a famous command line utility, but this is a serious limitation here. To make it work, the sentence to translate must be tagged too (more on this later). I wanted the app to work offline and use frontend code only, but the lack of a JavaScript implementation of a Japanese POS tagger forced me to reject Japanese to English translation. Only English to Japanese is supported.

The first problem arising here is the difference between the POS items in English and Japanese. Chasen is very comprehensive, so I had to simplify and match its POS items to the ones returned by pos-js (see `/utils/chasen2jspos-map.json` and `/utils/jspos2simplified-map.json`).

### Build a dictionary

At this stage, I have 2 corpus tagged, I can easily align classes of POS in both languages to build a dictionary. Let's say a pair has only one adjective in English and in Japanese, we can conclude that this adjective in English is likely to be translated by this other adjective in Japanese. The first pass consists of extracting terms whose class of POS appear only once in each pair.

For more ambiguous pairs containing more than one class of POS in both sentences, alignment is harder. The method I found makes use of the dictionary we are building.

Let's say a phrase has 2 adjectives in both languages. If one of them and its translation are already in the dictionary, we can assume that the remaining adjective matches the other one in the destination sentence. This is the second pass. I repeat this step a couple of times until no new translations are found.

This dictionary building method gives incredible results. Of course there is some noise, but for frequent words, the translations are very accurate. Here's an example for the word `already` and its frequency in Japanese translations:
```json
{
  "すでに": 23,
  "既に": 17,
  "もう": 8
}
```

It indeed contains all the translation for `already` that I know!

See `/build-dico.js` for the implementation.

### Build a POS converter

Now we're still using the POS tagged corpus to match patterns in both languages.

For each phrase with a certain POS pattern (e.g. Noun Verb Noun), we look for the most common pattern in the translated phrases. The idea is to determine which is the most frequent translated POS pattern of a language given the POS pattern of the source phrase.

At this stage I also generate what I called placeholders. They are generic sentences for this particular POS pattern where I replaced each word by the most common one (I know it's completely unscientific!). These are used as a base for translation. I just need to inject the right words (see below).

See the code at `/build-pos-converter.js`.

### Finally, translate

With all these static assets generated (dictionary, POS pattern matcher, POS pattern placeholders), I can try to translate from one language to another.

The user input in English is first normalised (see above), then POS tagged (Remember? That's why I can't use Japanese input on the browser as ChaSen is a command line tool). I then look for the most frequent POS pattern in Japanese.

Once found, I take the Japanese placeholder sentence for this POS pattern and inject into it the translations from the original English input. For words that don't have translations, the word is just ignored and the one from the placeholder is preserved (thus creating very weird translations at time, but at least giving complete and correct sentences). Of course this could be improved using a more comprehensive dictionary, but I didn't try it.

One of the problem not addressed by this script is the alignment of several identical classes of POS. In this case, I just assign them in order: the first adjective in English is matched to the first in Japanese, then the second... and so on. I know this is quite of an issue, but I just couldn't be bothered trying to fix it.

The script is located in `/en2ja.js`.

## The future

There is a lot of room for improvement in many places:

* Using an unified POS tagger for English and Japanese, ideally written in JavaScript, for a better quality.
* Using an external dictionary to enhance translations.
* Use statistics to reject the less significant pairs in the dictionary and the POS converter.
* Use a stemmer to group several inflections of the same nouns, verbs or adjectives and get a more complete dictionary.
* Use a bigger corpus.

But that's it for now, I may work on this later, but in the meantime, feel free to contribute!
