require('dotenv').config();
module.exports = bot => {
  bot.on('guildCreate', (guild) => {
    let embed = {
      title: guild.name,
      color: 2940844,
      description: `Guild created: ${guild.createdAt}\nGuild Members: ${guild.memberCount}\nOwner ID: ${guild.ownerID}`,
      thumbnail: {
        url: guild.iconURL
      },
      footer: {
        text: `Joined: ${guild.joinedAt}`
      }
    };
    bot.createMessage(process.env.ADMIN_SERVER_CHANNEL, {
      content: '',
      embed: embed
    }).catch(console.log);
  })
}