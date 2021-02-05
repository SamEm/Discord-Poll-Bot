const fs = require('fs');
const path = require('path');
const commandList = new Set();

let getFiles = (subPath) => {
  let filePaths = path.join(__dirname, `../commands/${subPath}`);
  fs.readdirSync(filePaths).forEach((file) => {
    let re = /(\w+\.js)/gi;
    let check = re.exec(file)
    if (!!check) {
      let cleanPath = !!subPath ? `../commands/${subPath}/${file}` : `../commands/${file}`;
      let getFile = require(cleanPath)
      commandList.add({
        command: getFile.commands,
        permission: getFile.permission,
        useInDM: getFile.useInDM,
        path: cleanPath
      });
    } else {
      getFiles(file);
    }
  });
}

module.exports = () => {
  getFiles('');
  return commandList;
};