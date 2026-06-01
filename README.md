# Token Action HUD — Legend of the Five Rings 5e

A system module for [Token Action HUD Core](https://github.com/Larkinabout/fvtt-token-action-hud-core) that adds a repositionable HUD of common actions for selected tokens in the **Legend of the Five Rings 5th Edition** Foundry VTT system.

![Foundry v14](https://img.shields.io/badge/Foundry-v14-informational)
![L5R5e](https://img.shields.io/badge/System-l5r5e-orange)

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

Select any character or NPC token to see the HUD appear. It is divided into the following sections:

### Rings
One button per elemental ring. The badge shows the ring's current rank.

| Button | Action |
|--------|--------|
| Air, Earth, Fire, Water, Void | Opens the dice picker for a pure ring check |

### Skills
Skills grouped by category. The badge shows the skill rank. Zero-rank skills are shown by default (configurable in settings).

| Group | Skills |
|-------|--------|
| Artisan | Aesthetics, Composition, Design, Smithing |
| Martial | Fitness, Melee, Ranged, Unarmed, Meditation, Tactics |
| Scholar | Culture, Government, Medicine, Sentiment, Theology |
| Social | Command, Courtesy, Games, Performance |
| Trade | Commerce, Labor, Seafaring, Skulduggery, Survival |

Clicking a skill opens the dice picker pre-populated with that skill and its category.

### Weapons
All readied weapons (configurable to show unreadied). The badge shows **Damage/Deadliness**. Clicking opens the dice picker pre-populated with the weapon.

### Techniques
Techniques organised by type: Kata, Kiho, Invocations, Shuji, Rituals, Maho, Ninjutsu, and Other (school abilities, mastery abilities, title abilities, etc.). Clicking opens the dice picker pre-populated with the technique.

### Conflict
Quick access during combat scenes.

**Weapons** — same as the Weapons section, for fast access without switching tabs.

**Resources** — three tracker buttons:

| Button | Badge | Left-click | Right-click |
|--------|-------|-----------|-------------|
| Endurance | Fatigue / Endurance | +1 Fatigue (take a hit) | −1 Fatigue (recover) |
| Composure | Strife / Composure | +1 Strife (gain stress) | −1 Strife (calm down) |
| Void Points | Current / Max | +1 Void Point (recover) | −1 Void Point (spend) |

### Utility
- **End Turn** — ends the current combatant's turn (only visible when it is this token's turn in an active combat).

---

## Settings

Access via **Game Settings → Module Settings → Token Action HUD L5R5e**.

| Setting | Default | Description |
|---------|---------|-------------|
| Show Zero-Rank Skills | On | Show skills where the character has no ranks in the HUD |
| Show Unready Weapons | Off | Show weapons not currently marked as readied |

---

## Supported Actor Types

| Type | Rings | Skills | Weapons | Techniques | Conflict | Utility |
|------|-------|--------|---------|------------|---------|---------|
| Character | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| NPC | ✓ | — | ✓ | ✓ | ✓ | ✓ |
| Army | — | — | — | — | — | — |

---

## License

[MIT](LICENSE) © 2026 Tomazella Games
