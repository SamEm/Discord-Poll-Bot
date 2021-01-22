module.exports = {
  commands: ['!poll'],
  permission: '',
  useInDM: false,
  run: (bot, msg, CommandObj) => {
    let allLetters = ['🇦', '🇧', '🇨', '🇩', '🇪', '🇫', '🇬', '🇭', '🇮', '🇯', '🇰', '🇱', '🇲', '🇳', '🇴', '🇵', '🇶', '🇷', '🇸', '🇹', '🇺', '🇻', '🇼', '🇽', '🇾', '🇿'];
    let argSplit = /(?:{)(.+)(?:})(.+)/gi.exec(CommandObj.args);
    let pollName = argSplit[1];
    console.log(argSplit[2])

    let split = argSplit[2].split(/\[(.+?)\]/gi)

    split = split.filter(e => !!e && e !== ' ');
    let options = [];
    let usedLetters = [];

    split.forEach((e, i) => {
      console.log(allLetters[i], e)
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
      console.log(r.id)
      usedLetters.forEach(e => {
        bot.addMessageReaction(r.channel.id, r.id, e)
      })
    }).catch(console.log);
  }
}