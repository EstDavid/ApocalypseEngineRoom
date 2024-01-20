import { useState, useEffect } from 'react';
import './NewChar.css';
import Select from 'react-select';
import { AxiosResponse } from 'axios';
import * as characterService from '../services/characters';
import { Playbook } from '../types';

function NewChar() {
  const [playbookList, setPlaybookList] = useState([]);
  const [systemsList, setSystemList] = useState<
    { value: string; label: string }[]
  >([]);
  const [selectedSystem, setSelectedSystem] = useState('');
  const [selectedPlaybook, setSelectedPlaybook] = useState<Playbook | null>(
    null
  );
  const [selectedStatsIndex, setSelectedStatsIndex] = useState(0);
  const [newCharName, setNewCharName] = useState('');

  useEffect(() => {
    characterService.getPlaybooks().then((response: AxiosResponse) => {
      setPlaybookList(response.data);
      const sysList = [
        ...new Set(response.data.map((pb: Playbook) => pb.systemName))
      ].map((s) => {
        return { value: s as string, label: s as string };
      });
      setSystemList(sysList);
    });
  }, []);

  const submitNewChar = async () => {
    if (selectedPlaybook !== null) {
      if (!selectedPlaybook.name || !newCharName.length) return;
      const newCharInfo = {
        system: selectedPlaybook.systemName,
        playbook: selectedPlaybook.name,
        name: newCharName,
        stats: selectedPlaybook.statsOptions[selectedStatsIndex]
      };

      const response = await characterService.create(newCharInfo);

      // TODO check this url creation
      window.location.replace(
        `http://localhost:5173/CharacterSheet?CharID=${response.data}`
      );
    }
  };

  return (
    <div className="NewChar">
      <h1>Create a new Character</h1>
      <div className="NameDiv">
        <h2>Character name</h2>
        <input
          className="textInput"
          type="text"
          name="name"
          defaultValue={newCharName}
          onChange={(e) => setNewCharName(e.target.value)}
          autoComplete="off"
        />
      </div>
      <div className="dropdownDiv">
        <h2>Systems</h2>
        <Select
          className="Select"
          options={systemsList}
          onChange={(selected) => {
            if (selected !== null) {
              setSelectedSystem(selected.value);
              setSelectedPlaybook(null);
            }
          }}
          autoFocus={true}
        />
        <h2>Playbooks</h2>
        <Select
          className="Select"
          options={playbookList
            .filter((pb: Playbook) => pb.systemName == selectedSystem)
            .map((pb: Playbook) => {
              return { value: pb, label: pb.name };
            })}
          onChange={(selected) => {
            if (selected !== null) {
              setSelectedPlaybook(selected.value), setSelectedStatsIndex(0);
            }
          }}
          autoFocus={true}
        />
      </div>
      {selectedPlaybook && selectedPlaybook.description ? (
        <div>
          <div className="descDiv">
            {selectedPlaybook.description.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
          <h2>Stat options:</h2>
          {selectedPlaybook.statOptionsText ? (
            <p className="optionText">{selectedPlaybook.statOptionsText}</p>
          ) : (
            ''
          )}
          <div className="OptionList">
            {selectedPlaybook.statsOptions.map((optionList, i) => (
              <div key={'option ' + i} className="StatOption">
                <input
                  type="radio"
                  className="radioInput"
                  checked={i === selectedStatsIndex}
                  onChange={() => {
                    setSelectedStatsIndex(i);
                  }}
                />
                {optionList.map((stat) => (
                  <div
                    className="statBlock"
                    key={'option-' + i + '-' + stat.name}
                  >
                    <p>{stat.name}</p>
                    <div className="statValue">{stat.value}</div>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="BtnDiv">
            <button id="Submit" onClick={submitNewChar}>
              Submit
            </button>
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
}

export default NewChar;
