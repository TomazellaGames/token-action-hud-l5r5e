import { ACTION_TYPE, CONFLICT_ACTIONS, GROUP, RINGS, SKILLS_BY_CATEGORY, TECHNIQUE_TYPE_TO_GROUP } from './constants.js'
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
                this.items = Array.from(this.actor.items).sort((a, b) =>
                    a.name.localeCompare(b.name, undefined, { sensitivity: 'base' })
                )
            }

            if (this.actorType === 'character') {
                await Promise.all([
                    this.#buildConflictTypeActions(),
                    this.#buildConflict(),
                    this.#buildRings(),
                    this.#buildSkills(),
                    this.#buildWeapons(),
                    this.#buildTechniques(),
                    this.#buildNarrative(),
                    this.#buildResources(),
                    this.#buildSocialStanding(),
                    this.#buildCombat(),
                ])
            } else if (this.actorType === 'npc') {
                await Promise.all([
                    this.#buildConflictTypeActions(),
                    this.#buildConflict(),
                    this.#buildRings(),
                    this.#buildNpcSkillGroups(),
                    this.#buildWeapons(),
                    this.#buildTechniques(),
                    this.#buildResources(),
                    this.#buildSocialStanding(),
                    this.#buildCombat(),
                ])
            } else if (!this.actor) {
                await Promise.all([
                    this.#buildConflictTypeActions(),
                    this.#buildConflict(),
                    this.#buildCombat(),
                ])
            }
        }

        async #buildConflictTypeActions () {
            if (!this.token) return
            const inCombat = game.combat?.combatants.find(c => c.tokenId === this.token.id)
            if (!inCombat) return

            let conflictType
            try { conflictType = game.settings.get('l5r5e', 'initiative-encounter') } catch { return }
            const typeActions = CONFLICT_ACTIONS[conflictType]
            if (!typeActions?.length) return

            const actions = typeActions.map(({ id, name, check, description }) => ({
                id: `conflict-action-${id}`,
                name,
                listName: name,
                info1: { text: check, title: check },
                tooltip: description,
                system: { actionType: 'narrativeText', actionId: id },
            }))
            this.addActions(actions, GROUP.conflictActions)
        }

        async #buildConflict () {
            const tasks = [this.#buildConflictEndTurn()]
            if (this.actor) {
                if (this.actorType === 'character') tasks.push(this.#buildConflictStance())
                tasks.push(this.#buildConflictInitiative())
            }
            await Promise.all(tasks)
        }

        async #buildConflictStance () {
            const actorRings = this.actor.system.rings
            const currentStance = this.actor.system.stance ?? null
            const actionTypeName = coreModule.api.Utils.i18n(ACTION_TYPE.stance)

            const actions = RINGS.map(ringId => {
                const rank = actorRings[ringId] ?? 0
                const name = coreModule.api.Utils.i18n(`tokenActionHud.l5r5e.ringNames.${ringId}`)
                return {
                    id: `stance-${ringId}`,
                    name,
                    listName: `${actionTypeName}: ${name}`,
                    info1: { text: currentStance === ringId ? `${rank}★` : String(rank) },
                    system: { actionType: 'stance', actionId: ringId },
                }
            })

            this.addActions(actions, GROUP.conflictStance)
        }

        async #buildConflictInitiative () {
            const i18n = (key) => coreModule.api.Utils.i18n(key)
            const actionTypeName = i18n(ACTION_TYPE.initiative)

            const types = [
                { id: 'intrigue',    name: i18n('tokenActionHud.l5r5e.initiativeIntrigue')    },
                { id: 'duel',        name: i18n('tokenActionHud.l5r5e.initiativeDuel')        },
                { id: 'skirmish',    name: i18n('tokenActionHud.l5r5e.initiativeSkirmish')    },
                { id: 'mass_battle', name: i18n('tokenActionHud.l5r5e.initiativeMassBattle')  },
            ]

            const actions = types.map(({ id, name }) => ({
                id: `initiative-${id}`,
                name,
                listName: `${actionTypeName}: ${name}`,
                system: { actionType: 'initiative', actionId: id },
            }))

            this.addActions(actions, GROUP.conflictInitiative)
        }

        async #buildConflictEndTurn () {
            if (game.combat?.current?.tokenId !== this.token?.id) return
            this.addActions([{
                id: 'conflict-endTurn',
                name: coreModule.api.Utils.i18n('tokenActionHud.endTurn'),
                listName: coreModule.api.Utils.i18n('tokenActionHud.endTurn'),
                system: { actionType: 'utility', actionId: 'endTurn' },
            }], GROUP.conflictCombat)
        }

        async #buildRings () {
            const actorRings = this.actor.system.rings
            const actionTypeName = coreModule.api.Utils.i18n(ACTION_TYPE.ring)
            const groupData = GROUP.rings

            const actions = RINGS.map(ringId => {
                const rank = actorRings[ringId] ?? 0
                const name = coreModule.api.Utils.i18n(`tokenActionHud.l5r5e.ringNames.${ringId}`)
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
                    const name = coreModule.api.Utils.i18n(`tokenActionHud.l5r5e.skillNames.${skillId}`)
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

        async #buildNpcSkillGroups () {
            const skillGroups = this.actor.system.skills ?? {}
            const actionTypeName = coreModule.api.Utils.i18n(ACTION_TYPE.skillGroup)

            for (const catId of Object.keys(SKILLS_BY_CATEGORY)) {
                const rank = skillGroups[catId] ?? 0
                const groupData = { id: `skills-${catId}`, type: 'system' }
                const name = coreModule.api.Utils.i18n(`tokenActionHud.l5r5e.skillGroupNames.${catId}`)
                this.addActions([{
                    id: `skill-group-${catId}`,
                    name,
                    listName: `${actionTypeName}: ${name}`,
                    info1: { text: String(rank) },
                    system: { actionType: 'skillGroup', actionId: catId },
                }], groupData)
            }
        }

        async #buildWeapons () {
            if (!this.items) return
            const actionTypeName = coreModule.api.Utils.i18n(ACTION_TYPE.weapon)
            const groupData = GROUP.weapons

            const actions = this.items
                .filter(item => item.type === 'weapon')
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
                const actions = items.map(item => {
                    const rawDesc = item.system.description ?? ''
                    const tooltip = rawDesc.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
                    return {
                        id: `technique-${item.id}`,
                        name: item.name,
                        listName: `${actionTypeName}: ${item.name}`,
                        img: coreModule.api.Utils.getImage(item),
                        tooltip,
                        system: { actionType: 'technique', actionId: item.id },
                    }
                })
                this.addActions(actions, groupData)
            }
        }

        async #buildNarrative () {
            const i18n = (key) => coreModule.api.Utils.i18n(key)
            const toTooltip = (html) => (html ?? '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()

            // Distinctions & Passions / Adversities & Anxieties
            const peculiarities = this.items.filter(i => i.type === 'peculiarity')
            for (const { types, group } of [
                { types: ['distinction', 'passion'], group: GROUP.narrativeDistinctionsPassions },
                { types: ['adversity',   'anxiety'], group: GROUP.narrativeAdversitiesAnxieties },
            ]) {
                const actions = peculiarities
                    .filter(i => types.includes(i.system.peculiarity_type))
                    .map(item => ({
                        id:       `peculiarity-${item.id}`,
                        name:     item.name,
                        listName: item.name,
                        img:      coreModule.api.Utils.getImage(item),
                        tooltip:  toTooltip(item.system.description),
                        system:   { actionType: 'peculiarity', actionId: item.id },
                    }))
                if (actions.length > 0) this.addActions(actions, group)
            }

            // Bonds
            const bondActions = this.items
                .filter(i => i.type === 'bond')
                .map(item => ({
                    id:       `bond-${item.id}`,
                    name:     item.name,
                    listName: item.name,
                    img:      coreModule.api.Utils.getImage(item),
                    info1:    { text: String(item.system.rank ?? '') },
                    tooltip:  toTooltip(item.system.description),
                    system:   { actionType: 'bond', actionId: item.id },
                }))
            if (bondActions.length > 0) this.addActions(bondActions, GROUP.narrativeBonds)

            // Ninjo, Giri, Paramount tenet, Less Significant tenet
            const social = this.actor.system.social ?? {}
            const tenets = social.bushido_tenets ?? {}
            const textActions = [
                { id: 'ninjo',            label: i18n('tokenActionHud.l5r5e.narrativeNinjo'),            value: social.ninjo               },
                { id: 'giri',             label: i18n('tokenActionHud.l5r5e.narrativeGiri'),             value: social.giri                },
                { id: 'paramount',        label: i18n('tokenActionHud.l5r5e.narrativeParamount'),        value: tenets.paramount           },
                { id: 'less-significant', label: i18n('tokenActionHud.l5r5e.narrativeLessSignificant'), value: tenets.less_significant    },
            ]
                .filter(({ value }) => value)
                .map(({ id, label, value }) => ({
                    id:       `narrative-${id}`,
                    name:     label,
                    listName: label,
                    tooltip:  value,
                    system:   { actionType: 'narrativeText', actionId: id },
                }))
            if (textActions.length > 0) this.addActions(textActions, GROUP.narrativeCharacter)
        }

        async #buildResources () {
            const sys = this.actor.system
            const i18n = (key) => coreModule.api.Utils.i18n(key)

            const fatigue    = sys.fatigue?.value ?? 0
            const endurance  = sys.endurance ?? sys.fatigue?.max ?? 0
            const strife     = sys.strife?.value ?? 0
            const composure  = sys.composure ?? sys.strife?.max ?? 0
            const voidValue  = sys.void_points?.value ?? 0
            const voidMax    = sys.void_points?.max ?? 0
            const focus      = sys.focus ?? 0
            const vigilance  = sys.vigilance ?? 0

            const actions = [
                {
                    id: 'resource-endurance',
                    name: i18n('tokenActionHud.l5r5e.endurance'),
                    listName: i18n('tokenActionHud.l5r5e.endurance'),
                    info1: { text: `${fatigue}/${endurance}`, title: `Fatigue: ${fatigue} / Endurance: ${endurance}` },
                    system: { actionType: 'resource', actionId: 'fatigue' },
                },
                {
                    id: 'resource-composure',
                    name: i18n('tokenActionHud.l5r5e.composure'),
                    listName: i18n('tokenActionHud.l5r5e.composure'),
                    info1: { text: `${strife}/${composure}`, title: `Strife: ${strife} / Composure: ${composure}` },
                    system: { actionType: 'resource', actionId: 'strife' },
                },
                {
                    id: 'resource-void',
                    name: i18n('tokenActionHud.l5r5e.voidPoints'),
                    listName: i18n('tokenActionHud.l5r5e.voidPoints'),
                    info1: { text: `${voidValue}/${voidMax}`, title: `Void Points: ${voidValue} / ${voidMax}` },
                    system: { actionType: 'resource', actionId: 'voidPoints' },
                },
                {
                    id: 'stat-focus',
                    name: i18n('tokenActionHud.l5r5e.focus'),
                    listName: i18n('tokenActionHud.l5r5e.focus'),
                    info1: { text: String(focus), title: `Focus: ${focus}` },
                    system: { actionType: 'stat', actionId: 'focus' },
                },
                {
                    id: 'stat-vigilance',
                    name: i18n('tokenActionHud.l5r5e.vigilance'),
                    listName: i18n('tokenActionHud.l5r5e.vigilance'),
                    info1: { text: String(vigilance), title: `Vigilance: ${vigilance}` },
                    system: { actionType: 'stat', actionId: 'vigilance' },
                },
            ]

            this.addActions(actions, GROUP.resources)
        }

        async #buildSocialStanding () {
            const sys = this.actor.system
            const i18n = (key) => coreModule.api.Utils.i18n(key)

            const honor  = sys.social?.honor  ?? 0
            const glory  = sys.social?.glory  ?? 0
            const status = sys.social?.status ?? 0

            const actions = [
                {
                    id: 'social-honor',
                    name: i18n('tokenActionHud.l5r5e.honor'),
                    listName: i18n('tokenActionHud.l5r5e.honor'),
                    info1: { text: String(honor), title: `Honor: ${honor}` },
                    system: { actionType: 'stat', actionId: 'honor' },
                },
                {
                    id: 'social-glory',
                    name: i18n('tokenActionHud.l5r5e.glory'),
                    listName: i18n('tokenActionHud.l5r5e.glory'),
                    info1: { text: String(glory), title: `Glory: ${glory}` },
                    system: { actionType: 'stat', actionId: 'glory' },
                },
                {
                    id: 'social-status',
                    name: i18n('tokenActionHud.l5r5e.status'),
                    listName: i18n('tokenActionHud.l5r5e.status'),
                    info1: { text: String(status), title: `Status: ${status}` },
                    system: { actionType: 'stat', actionId: 'status' },
                },
            ]

            this.addActions(actions, GROUP.socialStanding)
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
