module.exports = (validCommand, msg, db) => {
  return new Promise(resolve => {

    db.query('SELECT * FROM servers WHERE guild_id = ?', msg.guildID).then(res => {
      if (!!res[0]) {
        res = res[0];
        let DBRoles = JSON.parse(res.poll_roles);
        const userHasRole = msg.member.roles.some(r => DBRoles.includes(r));

        const isAdmin = msg.member.permissions.has('administrator');

        if (userHasRole || isAdmin) {
          resolve(true);
        } else {
          resolve(false);
        }
      } else {
        const hasPermission = msg.member.permissions.has(validCommand.permission);
        if (!!hasPermission) {
          resolve(true);
        } else {
          resolve(false);
        }
      }
    }).catch(console.log)
  })
}