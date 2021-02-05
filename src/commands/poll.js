module.exports = {
  commands: ['!poll', 'w/poll', 't/poll'],
  permission: '',
  permissionLocation: 'polls',
  useInDM: false,
  run: (bot, msg, CommandObj) => {
    let allLetters = ['🇦', '🇧', '🇨', '🇩', '🇪', '🇫', '🇬', '🇭', '🇮', '🇯', '🇰', '🇱', '🇲', '🇳', '🇴', '🇵', '🇶', '🇷', '🇸', '🇹', '🇺', '🇻', '🇼', '🇽', '🇾', '🇿'];
    let argSplit = /(?:{)(.+)(?:})(.+)/gi.exec(CommandObj.args);
    let pollName = argSplit[1];

    let split = argSplit[2].split(/\[(.+?)\]/gi)

    split = split.filter(e => !!e && e !== ' ');
    let options = [];
    let usedLetters = [];

    if (split.length >= 20) {
      bot.createMessage(msg.channel.id, 'You have too many options. Max reaction limit is 20.')
      return
    }

    split.forEach((e, i) => {
      options.push(`${allLetters[i]} ${e}`);
      usedLetters.push(allLetters[i]);
    })

    bot.createMessage(msg.channel.id, {
      content: '',
      embed: {
        title: pollName,
        description: `
          ${options.join('\n\n')}
        `,
        footer: {
          icon_url: msg.author.avatarURL,
          text: `Poll created by: ${msg.author.username}#${msg.author.discriminator}`
        },
        timestamp: new Date(),
        color: 16750208,
      },
    }).then(r => {
      usedLetters.forEach(e => {
        bot.addMessageReaction(r.channel.id, r.id, e).catch(() => { })
      })
    }).catch(console.log);
  }
}