export let RollHandler = null

Hooks.once('tokenActionHudCoreApiReady', async (coreModule) => {

    RollHandler = class RollHandler extends coreModule.api.RollHandler {

        async handleActionClick (event) {
            const system = this.action.system
            const knownTypes = ['character', 'npc']

            if (this.actor) {
                await this.#handleAction(event, this.actor, this.token, system)
                return
            }

            for (const token of canvas.tokens.controlled) {
                if (!knownTypes.includes(token.actor?.type)) continue
                await this.#handleAction(event, token.actor, token, system)
            }
        }

        async #handleAction (event, actor, token, system) {
            switch (system.actionType) {
                case 'ring':
                    await this.#handleRingRoll(actor, system.actionId)
                    break
                case 'skill':
                    await this.#handleSkillRoll(actor, system.actionId, system.skillCatId)
                    break
                case 'weapon':
                    await this.#handleWeaponRoll(actor, system.actionId)
                    break
                case 'technique':
                    await this.#handleTechniqueRoll(actor, system.actionId)
                    break
                case 'resource':
                    await this.#handleResourceAction(event, actor, system.actionId)
                    break
                case 'utility':
                    await this.#handleUtilityAction(token, system.actionId)
                    break
            }
        }

        async #handleRingRoll (actor, ringId) {
            if (!game.l5r5e?.DicePickerDialog) {
                ui.notifications.error('L5R5e system: DicePickerDialog not available.')
                return
            }
            new game.l5r5e.DicePickerDialog({ actor, ringId }).render(true)
        }

        async #handleSkillRoll (actor, skillId, skillCatId) {
            if (!game.l5r5e?.DicePickerDialog) {
                ui.notifications.error('L5R5e system: DicePickerDialog not available.')
                return
            }
            new game.l5r5e.DicePickerDialog({ actor, skillId, skillCatId }).render(true)
        }

        async #handleWeaponRoll (actor, itemId) {
            if (!game.l5r5e?.DicePickerDialog) {
                ui.notifications.error('L5R5e system: DicePickerDialog not available.')
                return
            }
            const item = actor.items.get(itemId)
            if (!item) return
            new game.l5r5e.DicePickerDialog({ actor, itemUuid: item.uuid }).render(true)
        }

        async #handleTechniqueRoll (actor, itemId) {
            if (!game.l5r5e?.DicePickerDialog) {
                ui.notifications.error('L5R5e system: DicePickerDialog not available.')
                return
            }
            const item = actor.items.get(itemId)
            if (!item) return
            new game.l5r5e.DicePickerDialog({ actor, itemUuid: item.uuid }).render(true)
        }

        async #handleResourceAction (event, actor, resourceId) {
            const sys = actor.system
            let current, max, path

            switch (resourceId) {
                case 'fatigue':
                    // Left click = take fatigue (increases); shift+click = recover (decreases)
                    current = sys.fatigue?.value ?? 0
                    max     = sys.endurance ?? sys.fatigue?.max ?? 0
                    path    = 'system.fatigue.value'
                    break
                case 'strife':
                    // Left click = gain strife (increases); shift+click = remove strife (decreases)
                    current = sys.strife?.value ?? 0
                    max     = sys.composure ?? sys.strife?.max ?? 0
                    path    = 'system.strife.value'
                    break
                case 'voidPoints':
                    // Left click = spend void (decreases); shift+click = recover (increases)
                    current = sys.void_points?.value ?? 0
                    max     = sys.void_points?.max ?? 0
                    path    = 'system.void_points.value'
                    break
                default:
                    return
            }

            const recover = event.shiftKey
            let newValue
            if (resourceId === 'voidPoints') {
                newValue = recover
                    ? Math.min(current + 1, max)
                    : Math.max(current - 1, 0)
            } else {
                newValue = recover
                    ? Math.max(current - 1, 0)
                    : Math.min(current + 1, max)
            }

            await actor.update({ [path]: newValue })
        }

        async #handleUtilityAction (token, actionId) {
            switch (actionId) {
                case 'endTurn':
                    if (game.combat?.current?.tokenId === token.id) {
                        await game.combat.nextTurn()
                    }
                    break
            }
        }
    }
})
