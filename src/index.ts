require('dotenv').config();
import path from 'path';
import fs from 'fs';
const Eris = require('eris');

import mariadb from 'mariadb';
const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
});

pool.getConnection().then(async db_conn => {
  let bot = new Eris(process.env.BOT_TOKEN_TEST);
  require('./utils/mysql_ping')(db_conn);

  let startTime = (new Date).getTime();
  let connecting = false;

  const SAFE_TO_IGNORE_ERROR_CODES = [1001, 1006, "ECONNRESET"];

  bot.on("error", (err:object) => {
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
        require('./events/' + file)(bot, commandList, db_conn);
      });

      connecting = true;
      console.log(Date(), 'live ' + ((readyTime - startTime) / 10) + 'ms');
    } else {
      console.log('Reconnected:', Date());
    }
  });

  bot.connect()
}).catch(console.log)
