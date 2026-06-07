# Token Action HUD — Legend of the Five Rings 5e

A system module for [Token Action HUD Core](https://github.com/Larkinabout/fvtt-token-action-hud-core) that adds a repositionable HUD of common actions for selected tokens in the **Legend of the Five Rings 5th Edition** Foundry VTT system.

![Foundry v14](https://img.shields.io/badge/Foundry-v14-informational)
![L5R5e](https://img.shields.io/badge/System-l5r5e-orange)
![Version](https://img.shields.io/badge/Version-v1.2.2-blue)

---

## Requirements

- [Foundry VTT](https://foundryvtt.com/) v14+
- [Legend of the Five Rings 5e](https://foundryvtt.com/packages/l5r5e/) system v1.14+
- [Token Action HUD Core](https://foundryvtt.com/packages/token-action-hud-core/) v2.1+

---

## Installation

1. Open Foundry VTT and go to **Add-on Modules**.
2. Click **Install Module**.
3. Paste the following URL into the **Manifest URL** field at the bottom:

```
https://raw.githubusercontent.com/TomazellaGames/token-action-hud-l5r5e/main/module.json
```

4. Click **Install**.
5. Make sure **Token Action HUD Core** is also installed and enabled.
6. Enable both modules in your world under **Manage Modules**.

---

## HUD Overview

Select any character or NPC token to see the HUD appear. It is divided into the following tabs:

### Conflict Actions *(during combat only)*
A tab that appears only when the token is a combatant in an active encounter. Shows the list of actions available for the current conflict type (set via the system's **Initiative Encounter** setting). The badge on each action shows its associated check(s). Hovering shows a description tooltip.

| Conflict Type | Example Actions |
|---------------|----------------|
| Intrigue | Attack, Scheme, Charm, Command, Feign, Intimidate, … |
| Duel | Attack, Center, Predict, Guard, Strike, Challenge, … |
| Skirmish | Attack, Move, Guard, Support, Rally, Use Terrain, … |
| Mass Battle | Assault, Challenge, Rally, Reinforce |

### Conflict *(during combat only)*
A tab that consolidates combat-related controls into three groups. Only appears while the token is participating in an active encounter.

**Stance** *(Characters only)* — One button per elemental ring. Clicking sets the character's current stance to that ring. The badge shows the ring's rank; the active stance is marked with a ★.

**Initiative** — Buttons to roll initiative for each conflict type (Intrigue, Duel, Skirmish, Mass Battle). Click to open the dice picker pre-filled for the chosen initiative type.

**End Turn** — Ends the current combatant's turn. Appears only when it is this token's turn.

### Rings
One button per elemental ring. The badge shows the ring's current rank. Clicking opens the dice picker for a pure ring check.

### Skills

**Characters** — Skills grouped by category. The badge shows the skill rank. Zero-rank skills can be hidden via settings.

| Group | Skills |
|-------|--------|
| Artisan | Aesthetics, Composition, Design, Smithing |
| Martial | Fitness, Melee, Ranged, Unarmed, Meditation, Tactics |
| Scholar | Culture, Government, Medicine, Sentiment, Theology |
| Social | Command, Courtesy, Games, Performance |
| Trade | Commerce, Labor, Seafaring, Skulduggery, Survival |

**NPCs** — One button per skill group (Artisan, Martial, Scholar, Social, Trade). The badge shows the group's rank. Clicking opens the dice picker for that skill group.

### Weapons
All weapons on the actor. The badge shows **Damage/Deadliness**. Clicking opens the dice picker pre-populated with the weapon.

### Techniques
Techniques organised by type: Kata, Kiho, Invocations, Shuji, Rituals, Maho, Ninjutsu, and Other (school abilities, mastery abilities, title abilities, etc.).

- **Active techniques** (those with a skill requirement) open the dice picker on click, pre-filled with the technique's ring, difficulty, and skill.
- **Passive techniques** (no skill requirement) show a description tooltip on hover only.

### Narrative *(Characters only)*
A dedicated tab for narrative and character identity elements, grouped into four sections:

| Group | Contents |
|-------|----------|
| Distinctions & Passions | All *distinction* and *passion* peculiarity items |
| Adversities & Anxieties | All *adversity* and *anxiety* peculiarity items |
| Bonds | All bond items — badge shows bond rank |
| Character | Ninjo, Giri, Paramount Tenet, Less Significant Tenet (hidden when empty) |

Hovering any entry shows its full description as a tooltip. Active peculiarities (with a skill) can also be clicked to open the dice picker.

### Resources
Three tracker buttons:

| Button | Badge | Left-click | Right-click |
|--------|-------|-----------|-------------|
| Endurance | Fatigue / Endurance | +1 Fatigue | −1 Fatigue |
| Composure | Strife / Composure | +1 Strife | −1 Strife |
| Void Points | Current / Max | +1 Void Point | −1 Void Point |

### Utility
- **End Turn** — ends the current combatant's turn (only visible when it is this token's turn in an active combat). Also accessible from the **Conflict** tab.

---

## Target Difficulty

When exactly **one target token** is selected, Martial Arts rolls automatically pre-set the starting difficulty in the dice picker based on the **target's current stance ring**:

| Condition | Starting Difficulty |
|-----------|-------------------|
| Non-combat roll (ring, non-martial skill, etc.) | 1 |
| Technique roll — technique has a defined difficulty | technique's difficulty |
| Technique roll — no difficulty defined | 1 |
| Martial Arts roll — no target selected | 2 |
| Martial Arts roll — target not in Air stance | 2 |
| Martial Arts roll — target in Air stance, Air Ring 1–3 | 3 |
| Martial Arts roll — target in Air stance, Air Ring 4+ | 4 |

**Martial Arts rolls** are: weapons, and the individual skills Melee, Ranged, and Unarmed. Other martial skills (Fitness, Meditation, Tactics) default to TN 1.

The difficulty field remains editable in the dice picker — this only sets the default.

---

## Settings

Access via **Game Settings → Module Settings → Token Action HUD L5R5e**.

| Setting | Default | Description |
|---------|---------|-------------|
| Show Zero-Rank Skills | On | Show skills where the character has no ranks in the HUD |
| Show Unready Weapons | Off | Show weapons not currently marked as readied |

---

## Supported Actor Types

| Type | Conflict Actions | Conflict | Rings | Skills | Weapons | Techniques | Narrative | Resources | Utility |
|------|-----------------|----------|-------|--------|---------|------------|-----------|-----------|---------|
| Character | ✓ (combat) | ✓ (combat) | ✓ | Individual skills | ✓ | ✓ | ✓ | ✓ | ✓ |
| NPC | ✓ (combat) | ✓ (combat) | ✓ | Skill groups | ✓ | ✓ | — | ✓ | ✓ |
| Army | — | — | — | — | — | — | — | — | — |

---

## Changelog

### v1.2.2
- **Weapon skill fix** — Clicking a weapon now correctly passes the weapon's linked skill (Melee, Ranged, or Unarmed) to the dice picker. Previously the skill field was omitted, so the dialog opened without the proper martial skill pre-selected.

### v1.2.1
- **Target Difficulty fix** — Martial Arts rolls (Melee, Ranged, Unarmed, and weapons) now derive the default TN from the **target's active stance ring** rather than always using the Air Ring. If the target is in Air stance the TN is 3 or 4 based on their Air Ring rank; any other stance defaults to TN 2. Fitness, Meditation, and Tactics are no longer treated as combat rolls and default to TN 1.
- **Technique TN** — Techniques without a defined difficulty now default to TN 1 instead of passing no default to the dice picker.

### v1.2.0
- **Conflict Actions Tab** — A new tab visible only during combat that lists the available actions for the current conflict type (Intrigue, Duel, Skirmish, or Mass Battle) as defined by the system's encounter setting. Each action shows its required check and a hover description.
- **Stance Changing** — A new Conflict tab (combat only) lets characters set their current stance by clicking any of the five elemental rings. The active stance is highlighted with a ★ on its badge.
- **Initiative Rolling** — The Conflict tab includes initiative buttons for all four conflict types (Intrigue, Duel, Skirmish, Mass Battle), opening the dice picker pre-filled for the chosen type.

### v1.1.0
- **NPC Skill Groups** — NPCs now have a Skills tab showing the five skill groups (Artisan, Martial, Scholar, Social, Trade) as rollable entries, each displaying the group's rank.
- **Narrative Tab** — Characters now have a dedicated Narrative tab with Distinctions & Passions, Adversities & Anxieties, Bonds, and the character's Ninjo, Giri, Paramount Tenet, and Less Significant Tenet.
- **Technique Activation** — Techniques with a skill requirement now open the dice picker on click. Passive techniques remain tooltip-only.
- **Target Difficulty** — When one target token is selected, combat rolls (weapons, Martial skill/skill group) automatically pre-set the starting difficulty based on the target's Air Ring.

### v1.0.0
- Initial release.

---

## License

[MIT](LICENSE) © 2026 Tomazella Games
