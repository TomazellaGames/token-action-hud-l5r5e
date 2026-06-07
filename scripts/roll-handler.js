export let RollHandler = null

Hooks.once('tokenActionHudCoreApiReady', async (coreModule) => {

    RollHandler = class RollHandler extends coreModule.api.RollHandler {

        async handleActionClick (event) {
            const isRightClick = event.button === 2 || event.type === 'contextmenu'
            await this.#dispatch(event, isRightClick)
        }

        async #dispatch (event, isRightClick) {
            const system = this.action.system
            const knownTypes = ['character', 'npc']

            if (this.actor) {
                await this.#handleAction(event, this.actor, this.token, system, isRightClick)
                return
            }

            for (const token of canvas.tokens.controlled) {
                if (!knownTypes.includes(token.actor?.type)) continue
                await this.#handleAction(event, token.actor, token, system, isRightClick)
            }
        }

        async #handleAction (event, actor, token, system, isRightClick) {
            const difficulty = this.#computeDifficulty(system)

            switch (system.actionType) {
                case 'stance':
                    if (!isRightClick) await this.#handleStanceSet(actor, system.actionId)
                    break
                case 'initiative':
                    if (!isRightClick) await this.#handleInitiativeRoll(actor, token, system.actionId)
                    break
                case 'ring':
                    if (!isRightClick) await this.#handleRingRoll(actor, system.actionId, difficulty)
                    break
                case 'skill':
                    if (!isRightClick) await this.#handleSkillRoll(actor, system.actionId, system.skillCatId, difficulty)
                    break
                case 'skillGroup':
                    if (!isRightClick) await this.#handleSkillGroupRoll(actor, system.actionId, difficulty)
                    break
                case 'weapon':
                    if (!isRightClick) await this.#handleWeaponRoll(actor, system.actionId, difficulty)
                    break
                case 'technique':
                case 'peculiarity':
                case 'bond':
                    if (!isRightClick) await this.#handleTechniqueActivation(actor, system.actionId)
                    break
                case 'narrativeText':
                case 'stat':
                    break
                case 'resource':
                    await this.#handleResourceAction(actor, system.actionId, isRightClick)
                    break
                case 'utility':
                    if (!isRightClick) await this.#handleUtilityAction(token, system.actionId)
                    break
            }
        }

        #computeDifficulty (system) {
            const MARTIAL_ARTS_SKILLS = ['melee', 'ranged', 'unarmed']
            const isMartialArts = (
                system.actionType === 'weapon' ||
                (system.actionType === 'skill' && system.skillCatId === 'martial' && MARTIAL_ARTS_SKILLS.includes(system.actionId))
            )

            if (!isMartialArts) return 1

            const targets = game.user.targets
            if (targets.size !== 1) return 2

            const targetActor = [...targets][0].actor
            const stance = targetActor?.system?.stance ?? null

            if (stance === 'air') {
                const targetAir = targetActor?.system?.rings?.air ?? 0
                if (targetAir >= 4) return 4
                return 3
            }
            return 2
        }

        async #handleRingRoll (actor, ringId, difficulty) {
            if (!game.l5r5e?.DicePickerDialog) {
                ui.notifications.error('L5R5e system: DicePickerDialog not available.')
                return
            }
            new game.l5r5e.DicePickerDialog({ actor, ringId, difficulty }).render(true)
        }

        async #handleSkillRoll (actor, skillId, skillCatId, difficulty) {
            if (!game.l5r5e?.DicePickerDialog) {
                ui.notifications.error('L5R5e system: DicePickerDialog not available.')
                return
            }
            new game.l5r5e.DicePickerDialog({ actor, skillId, skillCatId, difficulty }).render(true)
        }

        async #handleSkillGroupRoll (actor, skillCatId, difficulty) {
            if (!game.l5r5e?.DicePickerDialog) {
                ui.notifications.error('L5R5e system: DicePickerDialog not available.')
                return
            }
            new game.l5r5e.DicePickerDialog({ actor, skillCatId, difficulty }).render(true)
        }

        async #handleWeaponRoll (actor, itemId, difficulty) {
            if (!game.l5r5e?.DicePickerDialog) {
                ui.notifications.error('L5R5e system: DicePickerDialog not available.')
                return
            }
            const item = actor.items.get(itemId)
            if (!item) return
            const skillId = item.system.skill || null
            new game.l5r5e.DicePickerDialog({
                actor,
                itemUuid:   item.uuid,
                skillId,
                skillCatId: skillId ? 'martial' : null,
                difficulty,
            }).render(true)
        }

        async #handleTechniqueActivation (actor, itemId) {
            const item = actor.items.get(itemId)
            if (!item?.system?.skill) return
            if (!game.l5r5e?.DicePickerDialog) {
                ui.notifications.error('L5R5e system: DicePickerDialog not available.')
                return
            }
            new game.l5r5e.DicePickerDialog({
                actor,
                ringId:     item.system.ring       || null,
                difficulty: item.system.difficulty  || 1,
                skillsList: item.system.skill       || null,
                itemUuid:   item.uuid,
            }).render(true)
        }

        async #handleResourceAction (actor, resourceId, isRightClick) {
            const sys = actor.system
            let current, max, path

            switch (resourceId) {
                case 'fatigue':
                    current = sys.fatigue?.value ?? 0
                    max     = sys.endurance ?? sys.fatigue?.max ?? 0
                    path    = 'system.fatigue.value'
                    break
                case 'strife':
                    current = sys.strife?.value ?? 0
                    max     = sys.composure ?? sys.strife?.max ?? 0
                    path    = 'system.strife.value'
                    break
                case 'voidPoints':
                    current = sys.void_points?.value ?? 0
                    max     = sys.void_points?.max ?? 0
                    path    = 'system.void_points.value'
                    break
                default:
                    return
            }

            // Left click = increase (take damage / gain strife / recover void)
            // Right click = decrease (recover / remove strife / spend void)
            const newValue = isRightClick
                ? Math.max(current - 1, 0)
                : Math.min(current + 1, max)

            await actor.update({ [path]: newValue })
        }

        async #handleStanceSet (actor, ringId) {
            await actor.update({ 'system.stance': ringId })
        }

        async #handleInitiativeRoll (actor, token, encounterType) {
            await game.settings.set('l5r5e', 'initiative-encounter', encounterType)
            if (!token) return
            const combatant = game.combat?.combatants.find(c => c.tokenId === token.id)
            if (combatant) {
                await game.combat.rollInitiative([combatant.id])
            }
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
