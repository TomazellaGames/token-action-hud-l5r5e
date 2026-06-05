export const MODULE = {
    ID: 'token-action-hud-l5r5e',
}

export const CORE_MODULE = {
    ID: 'token-action-hud-core',
}

export const REQUIRED_CORE_MODULE_VERSION = '2.1'

export const ACTION_TYPE = {
    ring:          'tokenActionHud.l5r5e.ring',
    skill:         'tokenActionHud.l5r5e.skill',
    skillGroup:    'tokenActionHud.l5r5e.skillGroup',
    weapon:        'tokenActionHud.l5r5e.weapon',
    technique:     'tokenActionHud.l5r5e.technique',
    peculiarity:   'tokenActionHud.l5r5e.peculiarity',
    bond:          'tokenActionHud.l5r5e.bond',
    narrativeText: 'tokenActionHud.l5r5e.narrativeText',
    resource:      'tokenActionHud.l5r5e.resource',
    stat:          'tokenActionHud.l5r5e.stat',
    utility:       'tokenActionHud.utility',
}

export const GROUP = {
    rings:                 { id: 'rings',                 name: 'tokenActionHud.l5r5e.rings',                 type: 'system' },
    skillsArtisan:         { id: 'skills-artisan',         name: 'tokenActionHud.l5r5e.skillsArtisan',         type: 'system' },
    skillsMartial:         { id: 'skills-martial',         name: 'tokenActionHud.l5r5e.skillsMartial',         type: 'system' },
    skillsScholar:         { id: 'skills-scholar',         name: 'tokenActionHud.l5r5e.skillsScholar',         type: 'system' },
    skillsSocial:          { id: 'skills-social',          name: 'tokenActionHud.l5r5e.skillsSocial',          type: 'system' },
    skillsTrade:           { id: 'skills-trade',           name: 'tokenActionHud.l5r5e.skillsTrade',           type: 'system' },
    weapons:               { id: 'weapons',               name: 'tokenActionHud.l5r5e.weapons',               type: 'system' },
    techniquesKata:        { id: 'techniques-kata',        name: 'tokenActionHud.l5r5e.techniquesKata',        type: 'system' },
    techniquesKiho:        { id: 'techniques-kiho',        name: 'tokenActionHud.l5r5e.techniquesKiho',        type: 'system' },
    techniquesInvocations: { id: 'techniques-invocations', name: 'tokenActionHud.l5r5e.techniquesInvocations', type: 'system' },
    techniquesShuji:       { id: 'techniques-shuji',       name: 'tokenActionHud.l5r5e.techniquesShuji',       type: 'system' },
    techniquesRituals:     { id: 'techniques-rituals',     name: 'tokenActionHud.l5r5e.techniquesRituals',     type: 'system' },
    techniquesMaho:        { id: 'techniques-maho',        name: 'tokenActionHud.l5r5e.techniquesMaho',        type: 'system' },
    techniquesNinjutsu:    { id: 'techniques-ninjutsu',    name: 'tokenActionHud.l5r5e.techniquesNinjutsu',    type: 'system' },
    techniquesOther:       { id: 'techniques-other',       name: 'tokenActionHud.l5r5e.techniquesOther',       type: 'system' },
    narrativeDistinctionsPassions: { id: 'narrative-distinctions-passions', name: 'tokenActionHud.l5r5e.narrativeDistinctionsPassions', type: 'system' },
    narrativeAdversitiesAnxieties: { id: 'narrative-adversities-anxieties', name: 'tokenActionHud.l5r5e.narrativeAdversitiesAnxieties', type: 'system' },
    narrativeBonds:                { id: 'narrative-bonds',                  name: 'tokenActionHud.l5r5e.narrativeBonds',                 type: 'system' },
    narrativeCharacter:            { id: 'narrative-character',              name: 'tokenActionHud.l5r5e.narrativeCharacter',             type: 'system' },
    resources:                     { id: 'resources',                        name: 'tokenActionHud.l5r5e.resources',                      type: 'system' },
    socialStanding:                { id: 'social-standing',                  name: 'tokenActionHud.l5r5e.socialStanding',                 type: 'system' },
    combat:                        { id: 'combat',                           name: 'tokenActionHud.combat',                               type: 'system' },
}

export const RINGS = ['air', 'earth', 'fire', 'water', 'void']

export const SKILLS_BY_CATEGORY = {
    artisan: ['aesthetics', 'composition', 'design', 'smithing'],
    martial: ['fitness', 'melee', 'ranged', 'unarmed', 'meditation', 'tactics'],
    scholar: ['culture', 'government', 'medicine', 'sentiment', 'theology'],
    social:  ['command', 'courtesy', 'games', 'performance'],
    trade:   ['commerce', 'labor', 'seafaring', 'skulduggery', 'survival'],
}

export const TECHNIQUE_TYPE_TO_GROUP = {
    kata:            'techniques-kata',
    kiho:            'techniques-kiho',
    inversion:       'techniques-other',
    invocation:      'techniques-invocations',
    ritual:          'techniques-rituals',
    shuji:           'techniques-shuji',
    maho:            'techniques-maho',
    ninjutsu:        'techniques-ninjutsu',
    mantra:          'techniques-other',
    school_ability:  'techniques-other',
    mastery_ability: 'techniques-other',
    title_ability:   'techniques-other',
    specificity:     'techniques-other',
}
