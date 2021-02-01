const validateCommand = require('../utils/validate_command');
const validatePermission = require('../utils/validate_permission');

module.exports = async (bot, msg, commandList, db) => {
  try {
    const validCommand = await validateCommand(msg, commandList()).then(r => { return r }).catch(console.log);
    if (!validCommand) return;

    let commandArgs = msg.content.replace(validCommand.command, '').trim();
    validCommand.args = commandArgs;

    if (!msg.guildID && !!validCommand.useInDM) {

      require(validCommand.path).run(bot, msg, validCommand);

    } else if (!!msg.guildID && !validCommand.useInDM) {

      if (!!validCommand.permission) {
        const validPermission = validatePermission(validCommand, msg, db);
        if (!validPermission) return;
      }

      require(validCommand.path).run(bot, msg, validCommand);
    }
  } catch (error) {
    console.log(error)
  }
}