const brightness = require('brightness');
class System {
    constructor(){

    }
    getCurrentBrightness (){
        return brightness.get()
    }
}
module.exports = {
    system: new System()
}