const fs = require('fs')
class SettingService {
    constructor(){
        this.settings =  JSON.parse(fs.readFileSync('../setting.json', 'utf-8'))
    }
    initSetting (){
        try {
            for(const [key, value] of Object.entries(this.settings)){

            }
        } catch (error) {
            
        }
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