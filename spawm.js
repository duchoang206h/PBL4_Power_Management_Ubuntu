const { spawn, exec } = require("child_process");

exec('./shell.sh', (error, stdout, stderr) =>{
    console.log(error, stdout)
 })