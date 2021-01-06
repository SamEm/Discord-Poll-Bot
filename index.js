require('dotenv').config();
const path = require('path');
const fs = require('fs');
const Eris = require('eris');

let bot = new Eris(process.env.BOT_TOKEN);

let startTime = (new Date).getTime();
let connecting = false;

bot.on('error', console.error);

bot.on('ready', () => {
  if (!connecting) {
    let readyTime = (new Date).getTime();

    const commandList = require('./utils/command_handler');
    let filePaths = path.join(__dirname, '/events/');
    fs.readdirSync(filePaths).forEach((file) => {
      console.log(file)
      require('./events/' + file)(bot, commandList);
    });

    connecting = true;
    console.log(Date(), 'live ' + ((readyTime - startTime) / 10) + 'ms');
  } else {
    console.log('Reconnected:', Date());
  }
});

bot.connect()