const { spawn, exec } = require("child_process");

exec('./shell.sh', (error, stdout, stderr) => {
    if (error) {
        console.log(error, stdout, stderr)
    }
    else
        console.log(stdout)

})