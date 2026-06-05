import { GROUP } from './constants.js'

export let DEFAULTS = null

Hooks.once('tokenActionHudCoreApiReady', async (coreModule) => {
    const i18n = (key) => coreModule.api.Utils.i18n(key)

    const groups = {}
    for (const [key, groupData] of Object.entries(GROUP)) {
        groups[key] = {
            ...groupData,
            name: i18n(groupData.name),
            listName: `Group: ${i18n(groupData.name)}`,
        }
    }

    const groupsArray = Object.values(groups)

    DEFAULTS = {
        layout: [
            {
                nestId: 'conflict',
                id: 'conflict',
                name: i18n('tokenActionHud.l5r5e.conflict'),
                groups: [
                    { ...groups.conflictStance,     nestId: 'conflict_stance'     },
                    { ...groups.conflictInitiative, nestId: 'conflict_initiative' },
                    { ...groups.conflictCombat,     nestId: 'conflict_combat'     },
                ],
            },
            {
                nestId: 'rings',
                id: 'rings',
                name: i18n('tokenActionHud.l5r5e.rings'),
                groups: [
                    { ...groups.rings, nestId: 'rings_rings' },
                ],
            },
            {
                nestId: 'skills',
                id: 'skills',
                name: i18n('tokenActionHud.l5r5e.skills'),
                groups: [
                    { ...groups.skillsArtisan, nestId: 'skills_artisan' },
                    { ...groups.skillsMartial, nestId: 'skills_martial' },
                    { ...groups.skillsScholar, nestId: 'skills_scholar' },
                    { ...groups.skillsSocial,  nestId: 'skills_social'  },
                    { ...groups.skillsTrade,   nestId: 'skills_trade'   },
                ],
            },
            {
                nestId: 'weapons',
                id: 'weapons',
                name: i18n('tokenActionHud.l5r5e.weapons'),
                groups: [
                    { ...groups.weapons, nestId: 'weapons_weapons' },
                ],
            },
            {
                nestId: 'techniques',
                id: 'techniques',
                name: i18n('tokenActionHud.l5r5e.techniques'),
                groups: [
                    { ...groups.techniquesKata,        nestId: 'techniques_kata'        },
                    { ...groups.techniquesKiho,        nestId: 'techniques_kiho'        },
                    { ...groups.techniquesInvocations, nestId: 'techniques_invocations' },
                    { ...groups.techniquesShuji,       nestId: 'techniques_shuji'       },
                    { ...groups.techniquesRituals,     nestId: 'techniques_rituals'     },
                    { ...groups.techniquesMaho,        nestId: 'techniques_maho'        },
                    { ...groups.techniquesNinjutsu,    nestId: 'techniques_ninjutsu'    },
                    { ...groups.techniquesOther,       nestId: 'techniques_other'       },
                ],
            },
            {
                nestId: 'narrative',
                id: 'narrative',
                name: i18n('tokenActionHud.l5r5e.narrative'),
                groups: [
                    { ...groups.narrativeDistinctionsPassions, nestId: 'narrative_distinctions-passions' },
                    { ...groups.narrativeAdversitiesAnxieties, nestId: 'narrative_adversities-anxieties' },
                    { ...groups.narrativeBonds,                nestId: 'narrative_bonds'                 },
                    { ...groups.narrativeCharacter,            nestId: 'narrative_character'             },
                ],
            },
            {
                nestId: 'stat-resources',
                id: 'stat-resources',
                name: i18n('tokenActionHud.l5r5e.resources'),
                groups: [
                    { ...groups.resources,      nestId: 'stat-resources_resources'      },
                    { ...groups.socialStanding, nestId: 'stat-resources_social-standing' },
                ],
            },
            {
                nestId: 'utility',
                id: 'utility',
                name: i18n('tokenActionHud.utility'),
                groups: [
                    { ...groups.combat, nestId: 'utility_combat' },
                ],
            },
        ],
        groups: groupsArray,
    }
})
