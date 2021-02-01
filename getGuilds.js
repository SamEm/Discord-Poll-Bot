require('dotenv').config();
const Eris = require('eris');
let bot = new Eris(process.env.BOT_TOKEN_LIVE);

const SAFE_TO_IGNORE_ERROR_CODES = [1001, 1006, "ECONNRESET"];

bot.on("error", err => {
  if (SAFE_TO_IGNORE_ERROR_CODES.includes(err.code)) {
    return;
  }

  throw err;
});

bot.on('ready', () => {
  console.log('Ready');
  const guilds = bot.guilds.map(e => {
    return e.name;
  })
  console.log(guilds);
});






bot.connect()