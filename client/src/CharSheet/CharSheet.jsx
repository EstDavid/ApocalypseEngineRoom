import { DiceRoll } from '@dice-roller/rpg-dice-roller';
import axios from "axios";
import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import StatView from './StatView'
import Move from './Move'
import Tracker from './Tracker'
import './CharSheet.css'
import RollResultView from './RollResultView'; 

const client = axios.create({
    baseURL: "http://localhost:3000" 
});

function CharSheet() {
    const [charInfo, setCharInfo] = useState({})
    const [moves, setMoves] = useState([])
    const [trackers, setTrackers] = useState([]) 
    const [stats, setStats] = useState([])
    const [queryParameters] = useSearchParams()
    const [rolls, setRolls] = useState([])

    useEffect(()=> {
        if (queryParameters.get("CharID")) {
            client.get(`/character/${queryParameters.get("CharID")}`).then((response) => {
                const partialCharInfo = response.data

                const playbook_full = client.get(`/playbook/${partialCharInfo.system}/${partialCharInfo.playbook}`)
                const moves_full = client.get(`/moves/${partialCharInfo.system}/${partialCharInfo.playbook}`)
                const trackers_full = client.get(`/trackers/${partialCharInfo.system}/${partialCharInfo.playbook}`)

                Promise.all([playbook_full, moves_full, trackers_full]).then(function([playbook_full, moves_full, trackers_full]) {
                    const [pb, mvs, trks] = [playbook_full.data, moves_full.data, trackers_full.data]
                    setCharInfo({
                        "name": partialCharInfo.name,
                        "systemName": partialCharInfo.system,
                        "available_at": pb.available_at,
                        "madeBy": pb.madeBy,
                        "playbook": pb.name,
                        "charDescription": partialCharInfo.charDescription,
                        "playingThis": pb.playingThis,
                        "playbookDescription" : pb.description,
                        "movesText": pb.movesText
                    });
                    setStats(partialCharInfo.stats)
                    setMoves(mvs.map((m) => {return {...m, isAvailable: partialCharInfo.moves.find(charM => charM._id == m._id).isAvailable}}))
                    setTrackers(trks.map(t => {return {...t, value: partialCharInfo.trackers.find(charT => charT._id == t._id).value}}))
                })
            })
        }
    }, [queryParameters])

    const updateCharDesc = (newText) => {
        client.post(`character/${queryParameters.get("CharID")}`, {
            "updatedField": "charDescription",
            "newVal": newText
        })
        .then(function (response) {
            setCharInfo({
                ...charInfo,
                "charDescription": response.data.charDescription
            })
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    const updateStat = (statName, newVal) => {
        client.post(`character/${queryParameters.get("CharID")}`, {
            "updatedField": "stats",
            "newVal": stats.map((s) => {
                if (s.name == statName) s.value = newVal
                return s
            })
        })
        .then(function (response) {
            setStats(response.data.stats)
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    const updateTextTracker = (trackerName, newText) => {
        client.post(`character/${queryParameters.get("CharID")}`, {
            "updatedField": "trackers",
            "newVal": trackers.map((t) => {
                if (t.name == trackerName) {t.value = newText}
                return {_id: t._id, value: t.value}
            })
        })
        .then(function (response) {
            setTrackers(trackers.map(t => {return {...t, value: response.data.trackers.find(charT => charT._id == t._id).value}}))
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    const updateCheckboxTracker = (trackerName, changedIndex) => {

        client.post(`character/${queryParameters.get("CharID")}`, {
            "updatedField": "trackers",
            "newVal":trackers.map((t) => {
                if (t.name == trackerName) {
                    t.value = t.value.map(item => {
                        if (item.index == changedIndex) {
                            item.value = !item.value
                        }
                        return item
                    })
                }
                return t
            })
        })
        .then(function (response) {
            setTrackers(trackers.map(t => {return {...t, value: response.data.trackers.find(charT => charT._id == t._id).value}}))
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    const trackerHandlers = {updateTextTracker, updateCheckboxTracker}

    const toggleMoveAvailable = (toggledMove) => {
        client.post(`character/${queryParameters.get("CharID")}`, {
            "updatedField": "moves",
            "newVal": moves.map(m => {
                if (m.name == toggledMove.name) m.isAvailable = !m.isAvailable
                return m
            })
        })
        .then(function (response) {
            setMoves(moves.map(m => {
                const newAvailable = response.data.moves.find(charM => charM._id == m._id).isAvailable
                return {...m, isAvailable: newAvailable, isModAdded: newAvailable && m.isModAdded}
            }))
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    const toggleMoveAddMod = (toggledMove) => {
        setMoves(moves.map(m => {
            if (m.name == toggledMove.name){ m.isModAdded = !m.isModAdded}
            return m
        }))
    }

    const modToText = (mod) => {
        if (typeof(mod) == 'number') return `${mod < 0 ? ' ': ' + '}${mod}`
        var modText = ''
        stats.forEach((stat) => {
            if(mod == stat.name) modText = `${stat.value < 0 ? ' ': ' + '}${stat.value}`
        })
        return modText
    }

    const rollDice = (baseRoll, rollMod) => {
        var roll = baseRoll
        if (rollMod) {
            roll += modToText(rollMod)
        }

        roll += moves.filter((m) => m.isAvailable && m.isModAdded).map((m) => modToText(m.mod)).join('')
        setRolls([...rolls, new DiceRoll(roll)])
        setMoves(moves.map(m => {m.isModAdded = false; return m}))
    }

    const removeRoll = (rollIndex) => {
        setRolls(rolls.toSpliced(rollIndex, 1))
    }

    return (
    <div className='CharSheet'>
        <div className='rollsView'>
            {rolls.map((r, i) => <RollResultView key={'roll-' + i} roll={r} index={i} removeRoll={removeRoll} />)}
        </div>
        <div className='CharSheetMain'>
        <div className='col' id='descCol'>
            <div>
                <h1>{charInfo.name}</h1>
                <h2>{charInfo.playbook}</h2>
            </div>
            <p>Description:</p>
            <textarea 
                name="CharDesc" 
                id="CharDesc" 
                rows="3" 
                defaultValue={charInfo.charDescription} 
                onChange={e => {updateCharDesc(e.target.value)}}
            />
            <h2>Stats:</h2>
            <div className='StatList'>
                {stats? stats.map(s => <StatView key={s.name} stat={s} handler={updateStat} rollDice={rollDice}></StatView>): ""}
            </div>
            {charInfo.playbookDescription ? charInfo.playbookDescription.map((par, i) => {return <p key={i}>{par}</p>}): ""}
            {charInfo.playingThis ? <div>
                <h2>Playing {charInfo.playbook}</h2>
                {charInfo.playingThis.map((par, i) => {return <p key={i}>{par}</p>})}
            </div> :""}
            <p>{charInfo.systemName} was made by {charInfo.madeBy}, and is available at: <a href={charInfo.available_at}>{charInfo.available_at}</a></p>
        </div>
        <div className='col' id='moveCol'>
            
            {moves ? 
            <>
                <h2>Basic Moves:</h2>
                {moves.filter((m) => m.playbook == 'basic').map(m => <Move key={m.name} move={m} toggleMoveAvailable={()=>{}} toggleMoveAddMod={toggleMoveAddMod} rollDice={rollDice}></Move>)}

                <h2>{charInfo.playbook} Moves:</h2>
                {charInfo.movesText? <p>{charInfo.movesText}</p> : ""}
                {moves.filter((m) => m.playbook != 'basic').map(m => <Move key={m.name} move={m} toggleMoveAvailable={toggleMoveAvailable} toggleMoveAddMod={toggleMoveAddMod} rollDice={rollDice}></Move>)}
            </>
            : ""}
        </div>
        <div className='col' id='trackerCol'>
            {trackers? trackers.map((t) => <Tracker tracker={t} key={t.name} trackerHandlers={trackerHandlers}/>) : ""}
        </div>
        </div>
    </div>
    )
}
export default CharSheet