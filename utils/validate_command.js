module.exports = (msg, commandList) => {
  return new Promise(resolve => {
    return commandList.forEach(coms => {
      return coms.command.filter(com => {
        let re = new RegExp(`^${com}`, 'gi');
        if (!!msg.content.match(re)) {
          resolve(coms);
        }
      })
    });
  });
}