const { rejects } = require("assert");
const { spawn, exec } = require("child_process");

const execCommand = (command) => new Promise((resolve, rejects) => {
    exec(command, (error, stdout, stderr) => {
        if (error) {
           rejects(error)
        }
        else
           resolve(stdout)
    })
})
module.exports = {
    execCommand
}
