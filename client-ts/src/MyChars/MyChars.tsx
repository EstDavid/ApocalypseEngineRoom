import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Select from 'react-select';

import './MyChars.css';
import CharCard from './CharCard';
import { AxiosResponse } from 'axios';

function MyChars({userID, client}) {
  const [charList, setCharList] = useState([]);
  const [activeFilters, setActiveFilters] = useState([]);

  useEffect(()=> {
    if (userID) {
      client.get('/characters/', {withCredentials: true}).then((response) => {
        setCharList(response.data);
      });
    }
  }, [userID]);

  const deleteChar = (id) => {
    client.delete(`character/${id}`, {withCredentials: true})
      .then(client.get('characters', {withCredentials: true})
        .then((response:AxiosResponse) => {
          setCharList(response.data);
        })
      );
  };

  return (
    <div className='MyChars'>
      <h1>My Characters</h1>
      <div className='filterDiv'>
        <p>Include:</p>
        <Select
          isMulti
          name="filters"
          options={[
            {
              label: 'Systems',
              options: [...new Set(charList.map(c => c.system))].map((s) => {return {value: s, label: s};})
            },
            {
              label: 'Playbooks',
              options: [...new Set(charList.map(c => c.playbook))].map((p) => {return {value: p, label: p};})
            }
          ]}
          value={activeFilters}
          onChange={setActiveFilters}
          className="filterSelect"
        />
      </div>
      <div className='CharView'>
        <Link to={'NewCharacter'}>
          <div className='CharCard AddChar'>
            <h1>Add Character</h1>
            <h1>+</h1>
          </div>
        </Link>
        {charList.filter((c) => {
          return activeFilters.length == 0 || activeFilters.some((f) => f.value == c.playbook || f.value == c.system);
        }).map((c, i) =>
          <CharCard char={c} key={i} deleteChar={deleteChar}/>
        )}
      </div>
    </div>
  );
}

export default MyChars;