import { ActionHandler } from './action-handler.js'
import { RollHandler as CoreRollHandler } from './roll-handler.js'
import { DEFAULTS } from './defaults.js'
import * as systemSettings from './settings.js'

export let SystemManager = null

Hooks.once('tokenActionHudCoreApiReady', async (coreModule) => {

    SystemManager = class SystemManager extends coreModule.api.SystemManager {

        getActionHandler () {
            return new ActionHandler()
        }

        getAvailableRollHandlers () {
            return { core: 'Core L5R5e' }
        }

        getRollHandler (rollHandlerId) {
            switch (rollHandlerId) {
                case 'core':
                default:
                    return new CoreRollHandler()
            }
        }

        async registerDefaults () {
            return DEFAULTS
        }

        registerSettings (coreUpdate) {
            systemSettings.register(coreUpdate)
        }
    }
})
