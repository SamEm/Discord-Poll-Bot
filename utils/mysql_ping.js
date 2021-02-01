const mysql_ping = (db) => {
  setTimeout(() => {
    let d = Date();
    db.query('select guild_id from servers where guild_id = ?', '190228401917919233').then(res => {

    }).catch(err => {
      console.log(d, 'mysql_ping', err)
    });
    mysql_ping(db);
  }, 550000);
}

module.exports = mysql_ping;