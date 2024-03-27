---
title: 'The ideal blogging workflow'
date: '2013-11-12'
description: 'An overview of the behind-the-scenes of this blog.'
---

Before even starting this blog, I took some time to think about what would be my ideal workflow for publishing new posts. I decided it should be:

- Simple
- Hosted for free
- Editable from anywhere
- and of course based on open source tools

## Finding tools and solutions

I'm a lazy person and I find it very difficult to do things routinely. So, if I start a blog, I must make sure that nothing gets in my way. The writing/publishing process must be as easy as possible. It took me a while to love the simplicity of Markdown. But ever since I started working heavily with Github, I fell in love with its syntax. Markdown powers the simplicity I needed.

I admire the logic behind the static websites generators. They move the complexity of blogs from the server to your computer. The resulting blogs are incredible fast. We can then use Github as a web hosting platform for free! I choose [Cabin](http://www.cabinjs.com/) because it is simple and I wanted to experiment with Jade templates.

The mobile aspect was important to me. I wanted to start or edit posts directly from my mobile, wherever I am, whenever I have time. Also I always use several browsers on different computers all the time, sometime on a bad connexion, if any at all. That's why I needed something distributed and not dependent on network status. A few months ago I came upon [StackEdit](https://stackedit.io/) and was struck by its simplicity, beauty and powerfulness. It works on the browser, offline by default, can synchronise to many services (including Dropbox and Google Drive). The interface is split vertically with the original Markdown view on the left hand side next to the resulting formatted post, a UI pattern used by the [blogging platform Ghost](https://ghost.org/) that received a lot of attention lately.

## Putting it all together

A typical blog post starts like this. I launch a browser on the device available (laptop, mobile...), start StackEdit and open a new document. I've modified the default document to start with the metadata used by Cabin (Think of it as YAML front matter used by Jekyll, but in JSON):

```json
{
  "title": "Title",
  "date": "2013-11-01",
  "description": "Description"
}
```

I edit these metadata, start writing my draft and save it to Google Drive. I guess I could publish it directly to the Github repo as a draft (prefixed by `_`), but I prefer to keep my drafts private until they are ready for publication. Then I can synchronise and edit the posts from whatever device is available.

When the post is ready, I publish it to [my blog repo](https://github.com/gmarty/blog) on Github, in the `posts` folder. The tricky part now is that I need to launch the terminal, navigate to the blog folder on my computer and type:

```bash
git pull && grunt deploy
```

The Grunt task `deploy` of Cabin is responsible for generating a static version and push it to the `gh-pages` branch of the repo.

That's it.

## Wrapping up

This blog is powered by:

1. [Stackedit](https://stackedit.io/)
2. [Cabin](http://www.cabinjs.com/)
3. [Github](https://github.com/gmarty/blog)
4. [Love](https://www.google.co.uk/search?q=You're+not+looking+at+the+right+place)

I really wish I were able to optimise the pull/deploy step and call it from any device, but I can't really think of any free and easy alternative. Do you have any ideas? Use the comments box below and make my life easier :-)
