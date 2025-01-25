---
title: 'Tokenization is the mother of NLP'
date: '2012-09-17'
description: 'About the importance of tokenization in NLP.'
---

I recently started contributing to [natural, a set of **natural language processing** tools (NLP) in JavaScript for node.js](https://github.com/NaturalNode/natural). Here's what I learned from this.

[Words tokenization](http://en.wikipedia.org/wiki/Tokenization) is a critical part of natural language processing. This is often neglected because it sounds so easy. You just need to split a string on spaces.
And that is enough... for most of the languages. However some languages don't actually use space to separate words, like Japanese or Chinese.
I was lucky enough to find out that there is [a tokenizer in JavaScript for Japanese by Kudo Taku](http://chasen.org/~taku/software/TinySegmenter/). The license allowed me to use it on natural. I'm fully satisfied: no dictionary to maintain and no heavy tools to develop! It is using a statistical model to determine where to cut tokens. And it turned out to be quite efficient given its light weight.

The only sentence that failed to be tokenized properly is the famous “すもももももももものうち。” (that can be written "李も桃も桃のうち。" meaning "plums and peaches are both types of peach"). But this one is a bit tricky.

Now that we can tokenize Japanese, we can also:

- Remove stop words
- Stem tokens
- Compute N-grams

I wanted to extend one of my previous NLP project to Japanese, but couldn't find a tokenizer at the time (it was developed in PHP). So I reluctantly discarded this idea. I hope I'll be able to help natural enough so that such decisions won't have to be taken in the future.

As a side note, there are also many tokenizers for Chinese out there in several programming languages. I will have to check their licenses on my spare time to see if they are compatible with that of natural. But I'm not sure how to benchmark their respective accuracies as I don't speak Chinese :-(
