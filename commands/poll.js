module.exports = {
  commands: ['!poll'],
  permission: '',
  useInDM: false,
  run: (bot, msg, CommandObj) => {
    let argSplit = /(?:{)(.+)(?:})(.+)/gi.exec(CommandObj.args);
    let pollName = argSplit[1];
    let options = /(?:\[)(.+)(?:\])/gi.exec(argSplit[2])[1].split('] [');
    let option1 = options[0];
    let option2 = options[1];

    bot.createMessage(msg.channel.id, {
      content: '',
      embed: {
        title: pollName,
        description: `
          🅰️ ${option1}\n
          🅱️ ${option2}
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
      bot.addMessageReaction(r.channel.id, r.id, '🅰️')
      bot.addMessageReaction(r.channel.id, r.id, '🅱️')
    }).catch(console.log);
  }
}