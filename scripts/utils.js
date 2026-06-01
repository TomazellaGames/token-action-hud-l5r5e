import { MODULE } from './constants.js'

export class Utils {
    static getSetting(settingName) {
        return game.settings.get(MODULE.ID, settingName)
    }

    static async setSetting(settingName, value) {
        return game.settings.set(MODULE.ID, settingName, value)
    }
}
