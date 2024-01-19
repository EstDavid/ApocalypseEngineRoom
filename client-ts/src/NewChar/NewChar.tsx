import { useState, useEffect } from 'react';
import './NewChar.css';
import Select from 'react-select';
import { AxiosResponse } from 'axios';

function NewChar({userID, client}) {
  const [playbookList, setPlaybookList] = useState([]);
  const [systemsList, setSystemList] = useState([]);
  const [selectedSystem, setSelectedSystem] = useState('');
  const [selectedPlaybook, setSelectedPlaybook] = useState({});
  const [selectedStatsIndex, setSelectedStatsIndex] = useState(0);
  const [newCharName, setNewCharName] = useState('');

  useEffect(()=> {
    client.get('playbooks', {withCredentials: true}).then((response:AxiosResponse) => {
      setPlaybookList(response.data);
      const sysList = [...new Set(response.data.map(pb => pb.systemName))].map((s) => {return { value: s, label: s };});
      setSystemList(sysList);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitNewChar = () => {
    if (! selectedPlaybook.name || ! newCharName.length) return;
    const newCharInfo = {
      system: selectedPlaybook.systemName,
      playbook: selectedPlaybook.name,
      name: newCharName,
      stats: selectedPlaybook.statsOptions[selectedStatsIndex]
    };

    client.post('characters', newCharInfo, {withCredentials: true}).then((response:AxiosResponse) => {
      window.location.replace(`http://localhost:5173/CharacterSheet?CharID=${response.data}`,);
    });
  };

  return (
    <div className='NewChar'>
      <h1>Create a new Character</h1>
      <div className='NameDiv'>
        <h2>Character name</h2>
        <input className='textInput' type="text" name="name" defaultValue={newCharName} onChange={e => setNewCharName(e.target.value)} autoComplete="off"/>
      </div>
      <div className='dropdownDiv'>
        <h2>Systems</h2>
        <Select className='Select' options={systemsList} onChange={(selected) => {setSelectedSystem(selected.value); setSelectedPlaybook({});}} autoFocus={true}/>
        <h2>Playbooks</h2>
        <Select className='Select'
          options={playbookList.filter((pb) => pb.systemName == selectedSystem).map((pb) => {return { value: pb, label: pb.name };})}
          onChange={(selected) => {setSelectedPlaybook(selected.value), setSelectedStatsIndex(0);}}
          autoFocus={true}/>

      </div>

      {selectedPlaybook.description ?
        <div>
          <div className='descDiv'>
            {selectedPlaybook.description.map((line) => <p key={line}>{line}</p>)}
          </div>
          <h2>Stat options:</h2>
          {selectedPlaybook.statOptionsText? <p className='optionText'>{selectedPlaybook.statOptionsText}</p> : ''}
          <div className='OptionList'>
            {selectedPlaybook.statsOptions.map((optionList, i) =>
              <div key={'option ' + i} className='StatOption'>
                <input type="radio" className='radioInput' checked={i === selectedStatsIndex} onChange={()=>{setSelectedStatsIndex(i);}} />
                {optionList.map((stat) =>
                  <div className='statBlock' key={'option-' + i + '-' + stat.name}>
                    <p>{stat.name}</p>
                    <div className='statValue'>{stat.value}</div>
                  </div>)}
              </div>)}
          </div>
          <div className='BtnDiv'>
            <button id='Submit' onClick={submitNewChar}>Submit</button>
          </div>
        </div>:
        ''}
    </div>
  );
}

export default NewChar;