import { MODULE } from './constants.js'

export function register(coreUpdate) {
    game.settings.register(MODULE.ID, 'showZeroRankSkills', {
        name: game.i18n.localize('tokenActionHud.l5r5e.settings.showZeroRankSkills.name'),
        hint: game.i18n.localize('tokenActionHud.l5r5e.settings.showZeroRankSkills.hint'),
        scope: 'client',
        config: true,
        type: Boolean,
        default: true,
        onChange: (value) => coreUpdate(value),
    })

    game.settings.register(MODULE.ID, 'showUnreadyWeapons', {
        name: game.i18n.localize('tokenActionHud.l5r5e.settings.showUnreadyWeapons.name'),
        hint: game.i18n.localize('tokenActionHud.l5r5e.settings.showUnreadyWeapons.hint'),
        scope: 'client',
        config: true,
        type: Boolean,
        default: false,
        onChange: (value) => coreUpdate(value),
    })
}
