module.exports = {
  commands: ['!ping'],
  permission: 'manageMessages', //Remove this for a more per-server approach
  useInDM: false,
  run: (bot, msg) => {
    let readyTime = (new Date).getTime();
    bot.createMessage(msg.channel.id, {
      content: '',
      embed: {
        title: "Pong!",
        description: `Ping time: ${(readyTime - msg.timestamp) / 10} ms`,
        timestamp: new Date(),
        color: 16750208,
      }
    });
  }
}