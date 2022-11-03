const fs = require('fs')
const path = require('path')
class SettingService {
    constructor(){
        this.settings =  JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', 'setting.json'), 'utf-8'))
    }
    initSetting (){
        try {
            for(const [key, value] of Object.entries(this.settings)){

            }
        } catch (error) {
            
        }
    }
    getSetting (field) {
        return this.settings[field] || null
    }
    /**
     * 
     * @returns { Promise<Boolean> }
     */
    async updateSetting (field, value){
        try {
            if(this.settings.hasOwnProperty(field)){
                this.settings[field] = value;
                
            }
            // after handle update setting
            await fs.promises.writeFile('../setting.json', this.settings);
            return true;
        } catch (error) {
            return false;
        }
    }
}
module.exports = {
    settingService: new SettingService()
}