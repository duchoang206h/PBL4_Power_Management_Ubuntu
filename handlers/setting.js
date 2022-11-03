const fs = require('fs')
const path = require('path')
class SettingService {
    constructor(){
        this.settings =  JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', 'setting.json'), 'utf-8'))
        console.log(this.settings);
    }
    initSetting (){
        try {
            for(const [key, value] of Object.entries(this.settings)){

            }
        } catch (error) {
            
        }
    }
    getSetting (field) {
        return this.settings[field]
    }
    /**
     * 
     * @returns { Promise<Boolean> }
     */
    updateSetting  = async (field, value) => {
        try {
            if(this.settings.hasOwnProperty(field)){
                this.settings[field] = value;
                
            }
            // after handle update setting
            await fs.promises.writeFile(path.resolve(__dirname, '..', 'setting.json'), JSON.stringify(this.settings));
            return true;
        } catch (error) {
            console.log(error)
            return false;
        }
    }
}
module.exports = {
    settingService: new SettingService()
}