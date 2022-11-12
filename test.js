const brightness = require('brightness')
async function test () {
    console.log(await brightness.get())
}
test()