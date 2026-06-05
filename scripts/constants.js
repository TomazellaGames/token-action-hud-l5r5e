export const MODULE = {
    ID: 'token-action-hud-l5r5e',
}

export const CORE_MODULE = {
    ID: 'token-action-hud-core',
}

export const REQUIRED_CORE_MODULE_VERSION = '2.1'

export const ACTION_TYPE = {
    stance:        'tokenActionHud.l5r5e.stance',
    initiative:    'tokenActionHud.l5r5e.initiative',
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
    conflictActions:    { id: 'conflict-actions',    name: 'tokenActionHud.l5r5e.conflictActions',    type: 'system' },
    conflictStance:     { id: 'conflict-stance',     name: 'tokenActionHud.l5r5e.conflictStance',     type: 'system' },
    conflictInitiative: { id: 'conflict-initiative', name: 'tokenActionHud.l5r5e.conflictInitiative', type: 'system' },
    conflictCombat:     { id: 'conflict-combat',     name: 'tokenActionHud.combat',                   type: 'system' },
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

export const CONFLICT_ACTIONS = {
    intrigue: [
        { id: 'intrigue-attack',       name: 'Attack',        check: 'Command/Performance/Courtesy', description: 'Verbally or socially target a character to inflict strife or influence their emotional state.' },
        { id: 'intrigue-scheme',       name: 'Scheme',        check: 'Sentiment/Skulduggery/Government', description: 'Gather information, uncover motives, or manipulate the social situation indirectly.' },
        { id: 'intrigue-support',      name: 'Support',       check: 'Any appropriate skill',        description: 'Assist another character by improving their next check.' },
        { id: 'intrigue-assist',       name: 'Assist',        check: 'No roll',                      description: 'Directly aid another character\'s check. Target adds 1 kept die to their next check.' },
        { id: 'intrigue-calm',         name: 'Calm Passions', check: 'Meditation/Courtesy/Performance', description: 'Reduce emotional intensity in a scene. Remove strife from target.' },
        { id: 'intrigue-charm',        name: 'Charm',         check: 'Courtesy (Air/Water)/Performance', description: 'Persuade using likability or appeal. Target becomes more agreeable.' },
        { id: 'intrigue-command',      name: 'Command',       check: 'Command (Fire/Earth)',         description: 'Issue orders or assert authority. Target follows orders if reasonable.' },
        { id: 'intrigue-courtesy',     name: 'Courtesy',      check: 'Courtesy',                     description: 'Navigate etiquette and social norms. Avoid offense or achieve polite objective.' },
        { id: 'intrigue-feign',        name: 'Feign',         check: 'Skulduggery/Performance (Air)', description: 'Deceive or mislead others. Target believes deception.' },
        { id: 'intrigue-intimidate',   name: 'Intimidate',    check: 'Command/Intimidation',         description: 'Coerce through fear or pressure. Target complies out of fear.' },
        { id: 'intrigue-manipulate',   name: 'Manipulate',    check: 'Skulduggery/Sentiment',        description: 'Subtly influence decisions. Shift target behavior subtly.' },
        { id: 'intrigue-performance',  name: 'Performance',   check: 'Performance',                  description: 'Entertain or emotionally sway a group. Engage audience or shift mood.' },
        { id: 'intrigue-sentiment',    name: 'Sentiment',     check: 'Sentiment',                    description: 'Read emotions and motivations. Learn target\'s emotional state.' },
        { id: 'intrigue-skulduggery',  name: 'Skulduggery',   check: 'Skulduggery',                  description: 'Engage in covert or underhanded actions. Achieve covert objective.' },
    ],
    duel: [
        { id: 'duel-attack',    name: 'Attack',    check: 'Weapon skill with Ring',    description: 'Strike opponent during duel. Inflict damage.' },
        { id: 'duel-center',    name: 'Center',    check: 'Meditation (Void)',          description: 'Focus and prepare for decisive strike. Store successes for next attack.' },
        { id: 'duel-predict',   name: 'Predict',   check: 'Sentiment',                 description: 'Anticipate opponent\'s move. Gain advantage vs opponent.' },
        { id: 'duel-assess',    name: 'Assess',    check: 'Sentiment/Martial skill',   description: 'Study opponent\'s capabilities. Learn stats or weaknesses.' },
        { id: 'duel-guard',     name: 'Guard',     check: 'Fitness/Martial skill',     description: 'Defend against incoming attacks. Increase defense TN.' },
        { id: 'duel-strike',    name: 'Strike',    check: 'Weapon skill',              description: 'Perform a decisive finishing attack. Inflict critical strike.' },
        { id: 'duel-challenge', name: 'Challenge', check: 'Command/Courtesy',          description: 'Initiate or escalate duel. Force engagement.' },
        { id: 'duel-focus',     name: 'Focus',     check: 'Meditation',                description: 'Prepare mentally for next action. Gain composure or readiness.' },
    ],
    skirmish: [
        { id: 'skirmish-attack',      name: 'Attack',       check: 'Weapon skill',          description: 'Standard combat attack. Inflict damage.' },
        { id: 'skirmish-move',        name: 'Move',         check: 'Fitness',               description: 'Change position on battlefield. Move 1+ range bands.' },
        { id: 'skirmish-guard',       name: 'Guard',        check: 'Fitness',               description: 'Adopt defensive stance. Increase TN to be hit.' },
        { id: 'skirmish-support',     name: 'Support',      check: 'Varies',                description: 'Aid allies in combat. Grant bonuses to allies.' },
        { id: 'skirmish-assist',      name: 'Assist',       check: 'No roll',               description: 'Help directly with a check. Target adds 1 kept die.' },
        { id: 'skirmish-prepare',     name: 'Prepare',      check: 'N/A',                   description: 'Ready an item or weapon.' },
        { id: 'skirmish-calm',        name: 'Calm Passions', check: 'Meditation',           description: 'Reduce strife in combat. Remove strife.' },
        { id: 'skirmish-rally',       name: 'Rally',        check: 'Command',               description: 'Bolster allies\' morale. Remove strife or grant bonuses.' },
        { id: 'skirmish-scheme',      name: 'Scheme',       check: 'Tactics',               description: 'Tactical planning mid-combat. Gain advantage.' },
        { id: 'skirmish-use-terrain', name: 'Use Terrain',  check: 'Fitness/Tactics',       description: 'Interact with environment. Gain cover or advantage.' },
    ],
    mass_battle: [
        { id: 'mass-battle-assault',   name: 'Assault',   check: 'TN 2 Tactics',   description: 'Move your cohort into position and directly attack an enemy leader\'s cohort. Deal attrition equal to Command ranks.' },
        { id: 'mass-battle-challenge', name: 'Challenge', check: 'TN 1 Command',   description: 'Call out an enemy leader to engage in a formal clash within the battle. Stake honor and glory.' },
        { id: 'mass-battle-rally',     name: 'Rally',     check: 'TN 1 Command',   description: 'Regroup and steady allied forces, reducing panic and improving coordination.' },
        { id: 'mass-battle-reinforce', name: 'Reinforce', check: 'TN 2 Tactics',   description: 'Order troops to fortify a position and improve defensive resilience. Increase TN of Attack checks targeting your cohort.' },
    ],
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
