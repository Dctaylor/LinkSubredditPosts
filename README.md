# LinkSubredditPostsBot
A Discord bot that takes top posts from a given subreddit and randomly selects one, after which it posts the content link into discord. It does this once a day at 7pm PST.

## Features
* Can work with any subreddit provided
* Has the option to filter out NSFW content

## Installation

Refer to https://nodejs.org/en/, https://discord.js.org/#/, https://www.npmjs.com/package/cron, and https://github.com/not-an-aardvark/snoowrap for dependencies.  For getting your oAuth for accessing Reddit's api, see https://github.com/reddit-archive/reddit/wiki/OAuth2

## Deployment

Create a "config.json" within the root folder, with the layout:
```
{
  "token": "your_discord_bot_token_here",
  "secret": "your_secret_id_here",
  "clientId": "f6sw9qfBHoUz-Q",
  "access_token": "your_access_token_here",
  "token_type": "bearer",
  "expires_in": 3600,
  "refresh_token": "your_refresh_token",
  "scope": "read",
  "username": "your_reddit_username",
  "password": "your_reddit_password",
  "channelId": "your_chosen_channel_id_here" //get with \@channelName in discord
  "subreddit": "your_chosen_subreddit_name_here" //Just its name -> EX: gifs, not r/gifs
}
```

Run ```node bot.js``` from the folder location in cmd/terminal

