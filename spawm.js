const { spawn, exec } = require("child_process");
const { shell } = require('electron')
exec('./shell.sh', (error, stdout, stderr) =>{
    console.log(error, stdout, stderr)
})