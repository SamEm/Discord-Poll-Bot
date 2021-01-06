# Simple reaction voting Discord bot

## Setup:
Install all dependencies with
```
npm i
```

Then create a `.env` file in the root directory with a `BOT_TOKEN`.
<br>
[This is a tutorial](https://github.com/reactiflux/discord-irc/wiki/Creating-a-discord-bot-&-getting-a-token) on how to get a Discord bot token.

## To Run:
```
npm start
```

<br>

## Custom command example

```js
module.exports = {
  commands: ['!command'],
  permission: '',
  useInDM: true,
  run: (bot, msg, channelID) => {

  }
}
```