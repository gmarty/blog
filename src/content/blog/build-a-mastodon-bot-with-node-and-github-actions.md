---
title: 'Build a Mastodon bot with Node and Github Actions'
date: '2024-05-24'
description: 'Mastodon bots 🤖 are fun. You probably follow a few of them already. Today, we learn how to build one and host it for free.'
cover: '@/assets/covers/build-a-mastodon-bot-with-node-and-github-actions.jpg'
---

Bots sit at the intersection of technology and creativity in the social media space. They're fun to follow and fun to create. With Mastodon, bots are easier than ever to create and host for free.

## Why a Mastodon bot?

Bots are fully automated social media accounts that post [beautiful](https://botsin.space/@Stripey), [funny](https://botsin.space/@daily_emoji), [absurd](https://botsin.space/@gamecovevocemag) or [niche](https://botsin.space/@botequippedwith) content on a regular basis. They enrich your timeline with ephemeral beauty and quirkiness.

If you're not a programmer, there is _[Cheap Bots, Toot Sweet!](https://cheapbotstootsweet.com/)_ to host your bots for free. It uses [Tracery](http://tracery.io/), a user-friendly tool to generate text. You write a grammar which is used to randomly post statuses. As an example, here's a simple bot I made about emotions: [@emotions](https://botsin.space/@emotions).

I love how simple and immediate is this little bot, but I wanted to build something more elaborate. The open nature of Mastodon and the fediverse ecosystem encourages the creation of new and creative tools; I knew building a bot for it would be a pleasant experience. The question was a bot about what.

Back in January, I started learning ancient Sumerian. I'm still not sure why I got into it, apart from my interest in languages and ancient history. Sumerian was a language, spoken in the Middle East, that progressively disappeared around 1700 BCE to be used only in religious and ceremonial contexts. It is written with glyphs called cuneiforms that look like this:

```
𒀭𒈹
𒎏𒀀𒉌
𒌨𒀭𒇉
𒍑𒆗𒂵
𒈗𒋀𒀊𒆠𒈠
𒈗𒆠𒂗𒄀𒆠𒌵𒆤
𒂍𒀀𒉌
𒈬𒈾𒆕
```

The difficulty with dead languages is that you can't immerse yourself in the language or the culture. Generally speaking, increasing one's language exposure to a dead language is hard, even in this age of information abundance. This gave me the perfect occasion for a new project: a bot that posts one cuneiform glyph a day, in order to help me with my practice.

That's how [@sumerian](https://botsin.space/@sumerian) was born. Let's look at how [its source code](https://github.com/gmarty/sumerian-bot) works.

## Implementing the logic

Posting a status to Mastodon is easy thanks to the [masto.js](https://github.com/neet/masto.js) library. It is well written, maintained, and easy to use. Have a look at the files in the `examples` folder. It's comprehensive, but we'll only focus on the posting feature in this article.

Here's a quick breakdown of the API used to post a new status:

```js
import { createRestAPIClient } from 'masto'

// Instantiate the API with your Mastodon instance and access token.
const masto = createRestAPIClient({
  url: 'https://example.com',
  accessToken: 'MASTODON-ACC3SS-K3Y',
})

// Post a status.
await masto.v1.statuses.create({
  status: 'My bot status',
  visibility: 'public',
})
```

Attaching media is just as easy, once you get a blob of the image to get shared:

```js
// Create a media to be attached to a toot.
const media = await masto.v2.media.create({
  file: myImageBlob,
  description: 'Description of the media',
})

await masto.v1.statuses.create({
  status: 'My bot status',
  visibility: 'public',
  mediaIds: [media.id],
})
```

How you generate the image is up to you. I opted for generating a SVG containing the glyph. It makes it easy to center the sign inside the image. Unfortunately Mastodon doesn't support SVG, so I rasterise it to AVIF ([Baseline 2024](https://caniuse.com/?search=avif)) using [sharp](https://sharp.pixelplumbing.com/).

With this workflow, the image is created in memory and is not written to disc. The choice of AVIF is not random. Mastodon instances are often understaffed and underfunded projects. By optimising the size of the media you do the instance admin a favour by contributing to optimising storage and bandwidth costs.

I choosed a deterministic approach for this bot. Rather than being random, what cuneiform is getting picked up depends on the date. My corpus is sort of sorted by difficulty with the easiest, most common signs first. I wanted to preserve this order. It also enables to cycle each day through a palette colour.

Whatever you end up doing, don't forget to add a description to your media!

## Automate the posting

I recently used Github Actions a [fair](https://github.com/gmarty/blog/blob/master/.github/workflows/deploy.yml) [bit](https://github.com/gmarty/scumm-nes/blob/main/.github/workflows/deploy.yml) and I feel I'm getting the knack for it. If you're happy to host the code of your bot openly on Github, then you can use Actions too.

Github Actions are controlled by YAML files located in the `.github/workflows` folder in your source code. You can reuse [`post.yml` that I wrote](https://github.com/gmarty/sumerian-bot/blob/main/.github/workflows/post.yml). The frequency at which the workflow is executed is dictated by a cron on line 6. The action to be performed is `npm run post`, so configure your `package.json` accordingly.

Most of `post.yml` is concerned with defining the scheduled frequency, checking out the source code, and installing and caching the dependencies. The core of the process happens on lines 39-43:

```yml
- name: Post a status
  run: npm run post --if-present
  env:
    MASTODON_SERVER: ${{ secrets.MASTODON_SERVER }}
    MASTODON_TOKEN: ${{ secrets.MASTODON_TOKEN }}
```

Finally, to make it work, you will also have to configure Github secrets with your Mastodon instance and the access token. The [README.md file in my repo](https://github.com/gmarty/sumerian-bot?tab=readme-ov-file#sumerian-bot) gives more details on how to do that.

### A word of caution on Github Actions

Github Actions has limitations you need to be aware of before going down this route.

First of all, the frequency at which a workflow can be executed is capped. You can't, for example, get it run at intervals shorter than 5 minutes.

In times of high load, the tasks may be significantly delayed or dropped altogether. It is recommended to avoid running tasks on the hour, because that's what most people do. Instead choose a random number of minutes. 10:47 is likely to be less used for running cron tasks than 10.00.

If a task is dropped, you can always run the workflow manually. Go to the `Actions` tab on Github. Select the workflow (`Post a status on Mastodon.` in my case) and click on `Run workflow`.

Scheduled workflows are disabled after 60 days of inactivity on your repo. That's something to keep in mind if your bot suddenly stops. If that happens, you can push some code to your repo, or re-enable the workflow in the `Actions` tab. Make sure to set yourself a reminder!

## Finding a Mastodon instance for your bot

To be perfectly frank, it's been the hardest part of setting up this bot. I was already using [botsin.space](https://botsin.space) for my bot on emotions, and wanted to try another instance.

I applied to different instances. Some of them never activated my account after waiting for 10 days. Other just deleted it with no other form of acknowledgment, even after carefully reviewing their ToS to ensure bots aren't prohibited. In the end, in the face of such lack of accountability on those instances admin, I decided to create another account on botsin.space.

If you successfuly tried other instances that accept bots, let me know.

## In summary

`masto.js`, `sharp` and Github Actions are all the pieces needed to create automated Mastodon bots. If you want to create your own bot using Node.js, the easiest way is to fork the [Sumerian-bot](https://github.com/gmarty/sumerian-bot) repo and make changes according to your needs.

Above all, have fun with creating new bots!
