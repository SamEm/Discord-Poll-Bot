const validateCommand = require('../utils/validate_command');

module.exports = (bot, commandList) => {
  bot.on('messageCreate', async (msg) => {
    try {
      const validCommand = await validateCommand(msg, commandList()).then(r => { return r }).catch(console.log);
      if (!validCommand) return;

      let commandArgs = msg.content.replace(validCommand.command, '').trim();

      let CommandObj = {
        command: validCommand.command,
        permission: validCommand.permission,
        args: commandArgs
      }

      if (!msg.guildID && !!validCommand.useInDM) {

        require(validCommand.path).run(bot, msg, CommandObj);

      } else if (!!msg.guildID && !validCommand.useInDM) {

        if (!!validCommand.permission) {
          const hasPermission = msg.member.permissions.has(validCommand.permission);
          if (!hasPermission) return;
        }

        require(validCommand.path).run(bot, msg, CommandObj);
      }
    } catch (error) {
      console.log(error)
    }
  });
}
