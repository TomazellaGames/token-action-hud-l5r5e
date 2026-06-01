# Token Action HUD — Legend of the Five Rings 5e

A system module for [Token Action HUD Core](https://github.com/Larkinabout/fvtt-token-action-hud-core) that adds a repositionable HUD of common actions for selected tokens in the **Legend of the Five Rings 5th Edition** Foundry VTT system.

![Foundry v14](https://img.shields.io/badge/Foundry-v14-informational)
![L5R5e](https://img.shields.io/badge/System-l5r5e-orange)
![Version](https://img.shields.io/badge/Version-v1.1.0-blue)

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
- **End Turn** — ends the current combatant's turn (only visible when it is this token's turn in an active combat).

---

## Target Difficulty

When exactly **one target token** is selected, combat rolls automatically pre-set the starting difficulty in the dice picker based on the target's Air Ring:

| Condition | Starting Difficulty |
|-----------|-------------------|
| Non-combat roll (ring, social skill, etc.) | 1 |
| Combat roll — no target selected | 2 |
| Combat roll — target Air Ring 1–3 | 3 |
| Combat roll — target Air Ring 4+ | 4 |

**Combat rolls** are: weapons, Martial skill group (NPC), and any skill in the Martial category (character).

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

| Type | Rings | Skills | Weapons | Techniques | Narrative | Resources | Utility |
|------|-------|--------|---------|------------|-----------|-----------|---------|
| Character | ✓ | Individual skills | ✓ | ✓ | ✓ | ✓ | ✓ |
| NPC | ✓ | Skill groups | ✓ | ✓ | — | ✓ | ✓ |
| Army | — | — | — | — | — | — | — |

---

## Changelog

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
