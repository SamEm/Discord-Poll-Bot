
const runCommand = require('../utils/run_command');

module.exports = (bot, commandList, db) => {
  bot.on('messageCreate', async (msg) => {
    try {
      runCommand(bot, msg, commandList, db);
    } catch(err) {
      console.log(err)
    }
  });
}
