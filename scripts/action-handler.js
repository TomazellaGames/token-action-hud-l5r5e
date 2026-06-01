import { ACTION_TYPE, GROUP, RINGS, SKILLS_BY_CATEGORY, TECHNIQUE_TYPE_TO_GROUP } from './constants.js'
import { Utils } from './utils.js'

export let ActionHandler = null

Hooks.once('tokenActionHudCoreApiReady', async (coreModule) => {

    ActionHandler = class ActionHandler extends coreModule.api.ActionHandler {
        actors = null
        actorType = null
        items = null

        async buildSystemActions (groupIds) {
            this.actors = this.actor ? [this.actor] : this.#getActors()
            this.actorType = this.actor?.type

            if (this.actor && !['character', 'npc'].includes(this.actorType)) return

            if (this.actor) {
                this.items = coreModule.api.Utils.sortItemsByName(Array.from(this.actor.items))
            }

            if (this.actorType === 'character') {
                await Promise.all([
                    this.#buildRings(),
                    this.#buildSkills(),
                    this.#buildWeapons(),
                    this.#buildTechniques(),
                    this.#buildCombat(),
                ])
            } else if (this.actorType === 'npc') {
                await Promise.all([
                    this.#buildRings(),
                    this.#buildWeapons(),
                    this.#buildTechniques(),
                    this.#buildCombat(),
                ])
            } else if (!this.actor) {
                await this.#buildCombat()
            }
        }

        async #buildRings () {
            const actorRings = this.actor.system.rings
            const actionTypeName = coreModule.api.Utils.i18n(ACTION_TYPE.ring)
            const groupData = GROUP.rings

            const actions = RINGS.map(ringId => {
                const rank = actorRings[ringId] ?? 0
                const name = coreModule.api.Utils.i18n(`tokenActionHud.l5r5e.rings.${ringId}`)
                return {
                    id: `ring-${ringId}`,
                    name,
                    listName: `${actionTypeName}: ${name}`,
                    info1: { text: String(rank) },
                    system: { actionType: 'ring', actionId: ringId },
                }
            })

            this.addActions(actions, groupData)
        }

        async #buildSkills () {
            const actorSkills = this.actor.system.skills
            const showZero = Utils.getSetting('showZeroRankSkills')
            const actionTypeName = coreModule.api.Utils.i18n(ACTION_TYPE.skill)

            for (const [catId, skillList] of Object.entries(SKILLS_BY_CATEGORY)) {
                const catSkills = actorSkills[catId] ?? {}
                const groupData = { id: `skills-${catId}`, type: 'system' }
                const actions = []

                for (const skillId of skillList) {
                    const rank = catSkills[skillId] ?? 0
                    if (!showZero && rank === 0) continue
                    const name = coreModule.api.Utils.i18n(`tokenActionHud.l5r5e.skills.${skillId}`)
                    actions.push({
                        id: `skill-${catId}-${skillId}`,
                        name,
                        listName: `${actionTypeName}: ${name}`,
                        info1: { text: String(rank) },
                        system: { actionType: 'skill', actionId: skillId, skillCatId: catId },
                    })
                }

                if (actions.length > 0) this.addActions(actions, groupData)
            }
        }

        async #buildWeapons () {
            if (!this.items) return
            const showUnready = Utils.getSetting('showUnreadyWeapons')
            const actionTypeName = coreModule.api.Utils.i18n(ACTION_TYPE.weapon)
            const groupData = GROUP.weapons

            const actions = this.items
                .filter(item => item.type === 'weapon' && (showUnready || item.system.readied))
                .map(item => {
                    const dmg = item.system.damage ?? 0
                    const dead = item.system.deadliness ?? 0
                    return {
                        id: `weapon-${item.id}`,
                        name: item.name,
                        listName: `${actionTypeName}: ${item.name}`,
                        img: coreModule.api.Utils.getImage(item),
                        info1: { text: `${dmg}/${dead}`, title: `Damage: ${dmg} / Deadliness: ${dead}` },
                        system: { actionType: 'weapon', actionId: item.id },
                    }
                })

            if (actions.length > 0) this.addActions(actions, groupData)
        }

        async #buildTechniques () {
            if (!this.items) return
            const actionTypeName = coreModule.api.Utils.i18n(ACTION_TYPE.technique)
            const byGroup = new Map()

            for (const item of this.items) {
                if (item.type !== 'technique') continue
                const techType = item.system.technique_type
                const groupId = TECHNIQUE_TYPE_TO_GROUP[techType] ?? 'techniques-other'
                if (!byGroup.has(groupId)) byGroup.set(groupId, [])
                byGroup.get(groupId).push(item)
            }

            for (const [groupId, items] of byGroup) {
                const groupData = { id: groupId, type: 'system' }
                const actions = items.map(item => ({
                    id: `technique-${item.id}`,
                    name: item.name,
                    listName: `${actionTypeName}: ${item.name}`,
                    img: coreModule.api.Utils.getImage(item),
                    system: { actionType: 'technique', actionId: item.id },
                }))
                this.addActions(actions, groupData)
            }
        }

        async #buildCombat () {
            const groupData = GROUP.combat
            const actions = []

            if (game.combat?.current?.tokenId === this.token?.id) {
                actions.push({
                    id: 'endTurn',
                    name: coreModule.api.Utils.i18n('tokenActionHud.endTurn'),
                    listName: coreModule.api.Utils.i18n('tokenActionHud.endTurn'),
                    system: { actionType: 'utility', actionId: 'endTurn' },
                })
            }

            if (actions.length > 0) this.addActions(actions, groupData)
        }

        #getActors () {
            const allowedTypes = ['character', 'npc']
            const actors = canvas.tokens.controlled.map(token => token.actor)
            if (actors.every(actor => allowedTypes.includes(actor?.type))) {
                return actors
            }
            return []
        }
    }
})
