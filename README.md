# ApocalypseEngineRoom

## Backgound

Role-Playing Games (RPGs) are games where players play by roleplaying as their characters, and rolling dice to determine the outcome of their actions.

The most famous one is D&D, but there are many other games out there. One noteable group is Powered By the Apocalypse (PBtA) games. PBtA games span a wide spectrum of genres and tone, but are built around similer core mechanics.

### More in-depth explenation of PBtA games

Specific games are also refered to as "systems". In any system, there are diffrent archtypes of characters you can play (if you know D&D, think of classes). There are diffrent names in diffrent games- Skins, Playbooks... for simplicity, I only use the term "playbook" to refer to them across systems.

Each character has stats that are used as modifiers to a roll. Rolls happen when a "move" calls for them.

Moves are actions that character can take- some of them call for a roll, some add modifiers to a roll, while the rest may have a nerrative or mechanical affect that is not directly related to a roll. "Basic" moves are moves that are available for all playbooks in a system, and there are also unique moves for each playbook.

There are other things players need to keep track of- such as harm, XP, conditions, typically represented as an open text field or as a series of checkboxes.

## Goal

The goal of this app is to give players of PBtA games all of the tools they need to play a game online- some place to manage their character sheets, write notes, and roll dice.

## Usage

When a user opens the app, if they are not already logged in, they will be directed to a log-in\sign-up page.
Once they are logged in, their home page will display all of the characters they have already created. From there they can filter the shown characters by system and by playbook. They can from there either add a new character, delete characters, or view an exitsing character's character sheet.

In the "new character" page, user need to name their new charcter, as well as pick it's system and playbook. 
After selecting a playbook, the description of the playbook will show on screen, as well as a list of stat options with radio buttons to pick one. When the user clicks 'submit', a new character will be created, and the window will redirect to the character sheet of the new character.

The character sheet page displays all of the character information in the form of chekboxes and text-areas, and also shows all of the moves that a player might use. 

If a move has 'roll' buttons near it, when clicked 2 dice will be rolled, and the value of the stat associated with the move will be added. if the stat is modified, the roll will adjust. There are also 'A' and 'D' buttons for 'Advantage' and 'Disdadvantage', meaning 3 dice will be rolled, and the best\worst 2 will be used.

If a move has a checkbox near it, it means that this moves works as a modifier to a roll. When the boxed is checked, the next roll will add the modifier associated with the move.

Not all moves are available by default. Available moves are marked by the small circle on their left being filled in.
Basic moves are always available, playbook-specific ones can be togggled. When a move is unavailable, the buttons\checkbox on its right are hidden.

## Potential expensions

- letting users add pictures for characters
- creating groups, and having rolls pop-up for everyone in group