const { nativeTheme } = require('electron');
const handleDarkModeToggle = () => {
    if (nativeTheme.shouldUseDarkColors) {
        nativeTheme.themeSource = 'light'
      } else {
        nativeTheme.themeSource = 'dark'
      }
      return nativeTheme.shouldUseDarkColors
}
module.exports = {
    handleDarkModeToggle
}