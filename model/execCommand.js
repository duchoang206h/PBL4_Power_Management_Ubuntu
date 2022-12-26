const { exec } = require("child_process");
const execCommand = (command) =>
  new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      } else resolve(stdout);
    });
  });
module.exports = {
  execCommand,
};
