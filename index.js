require('dotenv').config();
const path = require('path');
const fs = require('fs');
const Eris = require('eris');

let bot = new Eris(process.env.BOT_TOKEN);

let startTime = (new Date).getTime();
let connecting = false;

const SAFE_TO_IGNORE_ERROR_CODES = [1001, 1006, "ECONNRESET"];

bot.on("error", err => {
  if (SAFE_TO_IGNORE_ERROR_CODES.includes(err.code)) {
    return;
  }

  throw err;
});

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