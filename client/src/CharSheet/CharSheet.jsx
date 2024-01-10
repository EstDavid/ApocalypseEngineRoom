import { useState, useEffect } from 'react'
import StatView from './StatView'
import Move from './Move'
import Tracker from './Tracker'
import './CharSheet.css'


function CharSheet() {
  const [charInfo, setCharInfo] = useState({})
  useEffect(()=> {
    setCharInfo({
      "name": "Lea Brightleaf",
      "systemName": "Monsterhearts",
      "available_at": "https://buriedwithoutceremony.com/",
      "madeBy": "Avery Alder",
      "playbook": "The Fae",
      "charDescription": "A lithe, small girl with sharp eyes and a sharper smile.",
      "playingThis": [
          "Alluring, otherworldly, fickle, and vengeful. The Fae entices people into making promises, and wields faerie vengeance when those promises are broken. They also have the ability to commune with ethereal forces, just beyond the veil.",
          "When you play the Fae, promises matter. Use the Fae's allure and wit to tease those promises out of other characters. You can add mechanical incentive for others to make promises to you by spending Strings to tempt them to do what you want, or through the move Lure.",
          "Keep track of the promises that others make to you, in the margins of your character sheet or on scrap paper. Beyond the Veil, Guide, the option to join a Jury of Fae, and talk of faery justice all invite you to collaboratively imagine the world of faery. To do so, ask questions of the MC, anticipate questions being asked of you in return, and brace yourself for surprise.",
          "You wear your heart on your sleeve. Give everyone one String.",
          "You've captured someone's fancy. Gain 2 Strings on them."
      ],
      "playbookDescription" : [
          "At the edges of this world, just beyond the veil, there are colours that few mortals even dream of. Beauty enough to shatter any heart. The Fae live and breathe at the edges of this world. They keep a dusting of that magic tucked behind their ears, just in case.",
          "And the Fae are willing to share. They're nothing if not generous, asking for only one thing in return. A promise. Keep it, and the true beauty of the world will be revealed. Break it, and feel the wrath of faery vengeance."
      ],
      "movesText": "You get Faery Contract, and choose one more Fae move.",
      "moves": [
          {
              "system": "Monsterhearts",
              "playbook": "basic",
              "name": "Turn Someone On",
              "description": "When you turn someone on, roll with Hot. On a 10 up, gain a String on them and they choose a reaction from below. On a 7-9, they can either give you a String or choose one of the reactions. [I give myself to you, I promise something I think you want, or I get embarrassed and act awkward]",
              "isAvailable": true,
              "isRoll": true,
              "mod": "Hot"
          },
          {
              "system": "Monsterhearts",
              "playbook": "basic",
              "name": "Shut Someone Down",
              "description": "When you shut someone down, roll with Cold. On a 10 up, choose one from below. On a 7-9, choose one from below, but you come across poorly, and they give you a Condition in return. [They lose a String on you, If they have no Strings on you, gain one on them, They gain a Condition, or You take 1 Forward.",
              "isAvailable": true,
              "isRoll": true,
              "mod": "Cold"
          },
          {
              "system": "Monsterhearts",
              "playbook": "basic",
              "name": "Keep Your Cool",
              "description": "When you keep your cool and act despite fear, name what you`re afraid of and roll with Cold. On a 10 up, you keep your cool and gain insight: ask the MC a question about the situation and take 1 Forward to acting on that information. • On a 7-9, the MC will tell you how your actions would leave you vulnerable, and you can choose to back down or go through with it.",
              "isAvailable": true,
              "isRoll": true,
              "mod": "Cold"
          },
          {
              "system": "Monsterhearts",
              "playbook": "basic",
              "name": "Run Away",
              "description": "When you run away, roll with Volatile. On a 10 up, you get away to a safe place. On a 7-9, you get away but choose one: [You run into something worse, You cause a big scene, or You leave something behind]",
              "isAvailable": true,
              "isRoll": true,
              "mod": "Volatile"
          },
          {
              "system": "Monsterhearts",
              "playbook": "basic",
              "name": "Pulling Strings",
              "description": "When you spend a String on someone, choose one: [Tempt them to do what you want, Give them a Condition, Add 1 to your roll against them (mark checkbox to apply), or Add 1 to the harm you deal them]",
              "isAvailable": true,
              "isRoll": false,
              "mod": 1
          },
          {
              "system": "Monsterhearts",
              "playbook": "basic",
              "name": "Healing",
              "description": "When you take time to tend to your wounds, once per session you may heal 1 Harm. If someone else is there with you, tending to your wounds delicately and intimately - and perhaps with erotic subtext - you may heal an additional 1 Harm.",
              "isAvailable": true,
              "isRoll": false
          },
          {
              "system": "Monsterhearts",
              "playbook": "basic",
              "name": "Use Someone's Conditions",
              "description": "If you take advantage of someone's Condition while making a move against them, add 1 to your roll. A Condition goes away when the character suffering it takes appropriate action to alleviate it.",
              "isAvailable": true,
              "isRoll": false,
              "mod": 1
          },
          {
              "system": "Monsterhearts",
              "playbook": "basic",
              "name": "Skirting Death",
              "description": "To avoid death, erase all harm and choose one: [Become your Darkest Self, Lose all Strings you have on everybody]",
              "isAvailable": true,
              "isRoll": false
          },
          {
              "system": "Monsterhearts",
              "playbook": "basic",
              "name": "Gangs",
              "description": "Gangs add +1 to your rolls and harm as applicable.",
              "isAvailable": true,
              "isRoll": false,
              "mod": 1
          },
          {
              "system": "Monsterhearts",
              "playbook": "basic",
              "name": "Take 1 forward",
              "description": "Some moves will allow you to 'take 1 forward'- add +1 to the next roll. Mark this when a move calls for it.",
              "isAvailable": true,
              "isRoll": false,
              "mod": 1
          },
          {
              "system": "Monsterhearts",
              "playbook": "The Fae",
              "name": "Faery Contract",
              "description": "If someone breaks a promise or contract made to you, take a String on them. When spending a String to even out the score and get justice on a broken promise, add these options to Pulling Strings: [they fuck up something simple at a crucial moment, suffering 1 Harm if appropriate, add 2 to your roll on an act of vengeance (Check checkbox to add to roll)].",
              "isAvailable": true,
              "isRoll": false,
              "mod": 2
          },
          {
              "system": "Monsterhearts",
              "playbook": "The Fae",
              "name": "Unashamed",
              "description": "You can give someone a String on you to add 3 to your attempt to Turn Them On.",
              "isAvailable": false,
              "isRoll": false,
              "mod": 3
          },
          {
              "system": "Monsterhearts",
              "playbook": "The Fae",
              "name": "The Wild Hunt",
              "description": "When you draw upon your most feral manner, echoing the lithe movements of a cat or the voracity of a wolf, add 1 to your roll to Turn Someone On.",
              "isAvailable": true,
              "isRoll": false,
              "mod": 1
          },
          {
              "system": "Monsterhearts",
              "playbook": "The Fae",
              "name": "Lure",
              "description": "Whenever someone makes a promise to you, they mark experience. Whenever someone breaks a promise to you, you mark experience.",
              "isAvailable": false,
              "isRoll": false
          },
          {
              "system": "Monsterhearts",
              "playbook": "The Fae",
              "name": "Guide",
              "description": "If you spend a String on someone willing, you can bring them across the veil, into the faery realm. The spell lasts for a scene or two, before you're both returned to the mundane world.",
              "isAvailable": false,
              "isRoll": false
          },
          {
              "system": "Monsterhearts",
              "playbook": "The Fae",
              "name": "Beyond The Veil",
              "description": "To seek audience with the Faery King, Gaze Into the Abyss. On a 10 up, in addition to other results, the Faery King reveals to you a hidden String on someone. Gain it. • On a 7 to 9, in addition to other results, the Faery King demands a favour of you.",
              "isAvailable": false,
              "isRoll": false
          },
          {
              "system": "Monsterhearts",
              "playbook": "The Fae",
              "name": "Darkest Self",
              "description": "Everything you say seems a promise. Everything you hear seems a promise. If a promise is broken, justice must be wrought in trickery or blood. You aren't subject to the human rules of mercy. To escape your Darkest Self, you must in some way re-balance the scales of justice.",
              "isAvailable": true,
              "isRoll": false
          },
          {
              "system": "Monsterhearts",
              "playbook": "The Fae",
              "name": "Sex Move",
              "description": "When you lie naked with another, you can ask them for a promise. If they refuse, take 2 Strings on them.",
              "isAvailable": true,
              "isRoll": false
          }
      ],
      "trackers": [
          {
              "system": "Monsterhearts",
              "playbook": "basic",
              "name": "Strings",
              "type": "text",
              "value": "Jason"
          },
          {
              "system": "Monsterhearts",
              "playbook": "basic",
              "name": "Harm",
              "type": "horizontal",
              "value": [
                  { "index": 0, "value": true},
                  { "index": 1, "value": false},
                  { "index": 2, "value": false},
                  { "index": 3, "value": false}
              ]
          },
          {
              "system": "Monsterhearts",
              "playbook": "basic",
              "name": "Conditions",
              "type": "text",
              "value": "blinding rage"
          },
          {
              "system": "Monsterhearts",
              "playbook": "basic",
              "name": "Expirience",
              "type": "horizontal",
              "description": "Whenever you fail a roll, mark experience.",
              "value": [
                  { "index": 0, "value": true},
                  { "index": 1, "value": true},
                  { "index": 2, "value": true},
                  { "index": 3, "value": false},
                  { "index": 4, "value": false}
              ]
          },
          {
              "system": "Monsterhearts",
              "playbook": "The Fae",
              "name": "Advancments",
              "type": "vertical",
              "description": "When you mark 5 expirence, mark an advancment and umark all expirence",
              "value": [
                  { "index": 0, "value": true, "text": "Add +1 to one of your stats."},
                  { "index": 1, "value": false, "text": "Take another Fae move."},
                  { "index": 2, "value": false, "text": "Take another Fae move."},
                  { "index": 3, "value": false, "text": "Take a move from any Skin."},
                  { "index": 4, "value": false, "text": "Take a move from any Skin."},
                  { "index": 5, "value": false, "text": "You belong to a Jury of Fae."}
              ]
          },
          {
              "system": "Monsterhearts",
              "playbook": "The Fae",
              "name": "Contracts",
              "type": "text",
              "value": "Alice promised me to go to the party"
          }
      ],
      "stats": [
        {"name": "Hot", "value": 2}, 
        {"name": "Cold", "value": -1}, 
        {"name": "Volatile", "value": -1},
        {"name": "Dark", "value": 1}
      ]
    });
  }, 
  [])


  return (
    <div className='CharSheetMain'>
      <div className='col'>
        <h1>{charInfo.name}</h1>
        <h2>{charInfo.playbook}</h2>
        <p>Description:</p>
        <textarea name="CharDesc" id="CharDesc" rows="3" value={charInfo.charDescription}></textarea>
        <h2>Stats:</h2>
        <div className='StatList'>
            {charInfo.stats? charInfo.stats.map(s => <StatView key={s.name} stat={s}></StatView>): ""}
        </div>
        {charInfo.playbookDescription ? charInfo.playbookDescription.map((par, i) => {return <p key={i}>{par}</p>}): ""}
        {charInfo.playingThis ? <div>
            <h2>Playing {charInfo.playbook}</h2>
            {charInfo.playingThis.map((par, i) => {return <p key={i}>{par}</p>})}
        </div> :""}
        <p>{charInfo.systemName} was made by {charInfo.madeBy}, and is available at: <a href={charInfo.available_at}>{charInfo.available_at}</a></p>
        
      </div>
      <div className='col'>
        
        {charInfo.moves ? 
        <>
            <h2>Basic Moves:</h2>
            {charInfo.moves.filter((m) => m.playbook == 'basic').map(m => <Move key={m.name} move={m}></Move>)}

            <h2>{charInfo.playbook} Moves:</h2>
            {charInfo.movesText? <p>{charInfo.movesText}</p> : ""}
            {charInfo.moves.filter((m) => m.playbook != 'basic').map(m => <Move key={m.name} move={m}></Move>)}
        </>
        : ""}
      </div>
      <div className='col'>
        {charInfo.trackers? charInfo.trackers.map((t) => <Tracker tracker={t} key={t.name}/>) : ""}
      </div>
    </div>
  )
}
export default CharSheet