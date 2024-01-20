import { DiceRoll } from '@dice-roller/rpg-dice-roller';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import StatView from './StatView';
import Move from './Move';
import Tracker from './Tracker';
import './CharSheet.css';
import RollResultView from './RollResultView';
import roll_1 from '../assets/roll_1.mp3';
import roll_2 from '../assets/roll_2.mp3';
import roll_3 from '../assets/roll_3.mp3';
import roll_4 from '../assets/roll_4.mp3';
import roll_5 from '../assets/roll_5.mp3';
import { AxiosInstance, AxiosResponse } from 'axios';
import {
  IUpdateTextArea, Stat, IUpdateStat, ITracker,
  IUpdateTextTracker, IUpdateCheckboxTracker, ITrackerValueObj,
} from '../types';

function CharSheet({ client }: { client: AxiosInstance }) {
  const [charInfo, setCharInfo] = useState({});
  const [moves, setMoves] = useState<Move[]>([]);
  const [trackers, setTrackers] = useState<ITracker<ITrackerValueObj[] | string>[]>([]);
  const [stats, setStats] = useState<Stat[]>([]);
  const [queryParameters] = useSearchParams();
  const [rolls, setRolls] = useState([]);

  useEffect(() => {
    if (queryParameters.get('CharID')) {
      client.get(`/character/${queryParameters.get('CharID')}`, { withCredentials: true }).then((response: AxiosResponse) => {
        const partialCharInfo = response.data;

        const playbook_full = client.get(`/playbook/${partialCharInfo.system}/${partialCharInfo.playbook}`, { withCredentials: true });
        const moves_full = client.get(`/moves/${partialCharInfo.system}/${partialCharInfo.playbook}`, { withCredentials: true });
        const trackers_full = client.get(`/trackers/${partialCharInfo.system}/${partialCharInfo.playbook}`, { withCredentials: true });

        Promise.all([playbook_full, moves_full, trackers_full]).then(function ([playbook_full, moves_full, trackers_full]) {
          const [pb, mvs, trks] = [playbook_full.data, moves_full.data, trackers_full.data];
          setCharInfo({
            'name': partialCharInfo.name,
            'systemName': partialCharInfo.system,
            'available_at': pb.available_at,
            'madeBy': pb.madeBy,
            'playbook': pb.name,
            'charDescription': partialCharInfo.charDescription,
            'playingThis': pb.playingThis,
            'playbookDescription': pb.description,
            'movesText': pb.movesText,
            'notes': partialCharInfo.notes
          });
          setStats(partialCharInfo.stats);
          setMoves(mvs.map((m: Move) => { return { ...m, isAvailable: partialCharInfo.moves.find((charM: Move) => charM._id == m._id).isAvailable }; }));
          setTrackers(trks.map((t:ITracker<ITrackerValueObj[] | string>) => { return { ...t, value: partialCharInfo.trackers.find((charT:ITracker<ITrackerValueObj[] | string>) => charT._id == t._id).value }; }));
        });
      });
    }
  }, [queryParameters]);

  const updateTextArea: IUpdateTextArea = (newText, fieldName) => {
    client.post(`character/${queryParameters.get('CharID')}`, {
      'updatedField': fieldName,
      'newVal': newText
    }, { withCredentials: true })
      .then(function (response: AxiosResponse) {
        setCharInfo({
          ...charInfo,
          fieldName: response.data[fieldName]
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const updateStat: IUpdateStat = (statName, newVal) => {
    client.post(`character/${queryParameters.get('CharID')}`, {
      'updatedField': 'stats',
      'newVal': stats.map((s) => {
        if (s.name == statName) s.value = newVal;
        return s;
      }, { withCredentials: true })
    }, { withCredentials: true })
      .then(function (response: AxiosResponse) {
        setStats(response.data.stats);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const updateTextTracker: IUpdateTextTracker = (trackerName, newText) => {
    client.post(`character/${queryParameters.get('CharID')}`, {
      'updatedField': 'trackers',
      'newVal': trackers.map((t) => {
        if (t.name == trackerName) { t.value = newText; } //** */
        return { _id: t._id, value: t.value };
      })
    }, { withCredentials: true })
      .then(function (response: AxiosResponse) {
        setTrackers(trackers.map(t => { return { ...t, value: response.data.trackers.find((charT: ITracker<string>) => charT._id == t._id).value }; }));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const updateCheckboxTracker: IUpdateCheckboxTracker = (trackerName, changedIndex) => {

    client.post(`character/${queryParameters.get('CharID')}`, {
      'updatedField': 'trackers',
      'newVal': trackers.map((t) => {
        if (t.name == trackerName) {
          if (Array.isArray(t.value)) {
            t.value = t.value.map((item) => {
              if (item.index == changedIndex) {
                item.value = !item.value;
              }
              return item;
            });
          }
        }
        return t;
      })
    }, { withCredentials: true })
      .then(function (response: AxiosResponse) {
        setTrackers(trackers.map(t => { return { ...t, value: response.data.trackers.find((charT:ITracker<ITrackerValueObj[] | string>) => charT._id == t._id).value }; }));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const trackerHandlers = { updateTextTracker, updateCheckboxTracker };

  const toggleMoveAvailable = (toggledMove: Move) => {
    client.post(`character/${queryParameters.get('CharID')}`, {
      'updatedField': 'moves',
      'newVal': moves.map(m => {
        if (m.name == toggledMove.name) m.isAvailable = !m.isAvailable;
        return m;
      })
    }, { withCredentials: true })
      .then(function (response: AxiosResponse) {
        setMoves(moves.map(m => {
          const newAvailable = response.data.moves.find((charM: Move) => charM._id == m._id).isAvailable; //!!FIXME - find()=undefined??
          return { ...m, isAvailable: newAvailable, isModAdded: newAvailable && m.isModAdded };
        }));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const toggleMoveAddMod = (toggledMove: Move) => {
    setMoves(moves.map(m => {
      if (m.name == toggledMove.name) { m.isModAdded = !m.isModAdded; }
      return m;
    }));
  };

  const modToText = (mod) => {
    if (typeof (mod) == 'number') return `${mod < 0 ? ' ' : ' + '}${mod}`;
    let modText = '';
    stats.forEach((stat) => {
      if (mod == stat.name) modText = `${stat.value < 0 ? ' ' : ' + '}${stat.value}`;
    });
    return modText;
  };

  const rollSounds = [roll_1, roll_2, roll_3, roll_4, roll_5].map(r => new Audio(r));

  const rollDice = (baseRoll, rollMod) => {
    let roll = baseRoll;
    if (rollMod) {
      roll += modToText(rollMod);
    }

    roll += moves.filter((m) => m.isAvailable && m.isModAdded).map((m) => modToText(m.mod)).join('');
    setRolls([...rolls, new DiceRoll(roll)]);
    setMoves(moves.map(m => { m.isModAdded = false; return m; }));
    rollSounds[Math.floor(Math.random() * rollSounds.length)].play();
  };

  const removeRoll = (rollIndex) => {
    setRolls(rolls.toSpliced(rollIndex, 1));
  };

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
            rows={3}
            defaultValue={charInfo.charDescription}
            onChange={e => { updateTextArea(e.target.value, 'charDescription'); }}
          />
          <h2>Stats:</h2>
          <div className='StatList'>
            {stats ? stats.map(s => <StatView key={s.name} stat={s} handler={updateStat} rollDice={rollDice}></StatView>) : ''}
          </div>
          {charInfo.playbookDescription ? charInfo.playbookDescription.map((par, i) => { return <p key={i}>{par}</p>; }) : ''}
          {charInfo.playingThis && charInfo.playingThis.length ? <div>
            <h2>Playing {charInfo.playbook}</h2>
            {charInfo.playingThis.map((par, i) => { return <p key={i}>{par}</p>; })}
          </div> : ''}
          <div className='CreditDiv'>
            <p>{charInfo.systemName} was made by {charInfo.madeBy}, and is available at: <a href={charInfo.available_at}>{charInfo.available_at}</a></p>
          </div>
          <h2>Notes:</h2>
          <textarea
            name="Notes"
            id="Notes"
            rows={10}
            defaultValue={charInfo.notes}
            onChange={e => { updateTextArea(e.target.value, 'notes'); }}
          />
        </div>
        <div className='col' id='moveCol'>

          {moves ?
            <>
              <h2>Basic Moves:</h2>
              {moves.filter((m) => m.playbook == 'basic').map(m => <Move key={m.name} move={m} toggleMoveAvailable={() => { }} toggleMoveAddMod={toggleMoveAddMod} rollDice={rollDice}></Move>)}

              <h2>{charInfo.playbook} Moves:</h2>
              {charInfo.movesText ? <p>{charInfo.movesText}</p> : ''}
              {moves.filter((m) => m.playbook != 'basic').map(m => <Move key={m.name} move={m} toggleMoveAvailable={toggleMoveAvailable} toggleMoveAddMod={toggleMoveAddMod} rollDice={rollDice}></Move>)}
            </>
            : ''}
        </div>
        <div className='col' id='trackerCol'>
          {trackers ? trackers.map((t) => <Tracker tracker={t} key={t.name} trackerHandlers={trackerHandlers} />) : ''}
        </div>
      </div>
    </div>
  );
}

export default CharSheet;