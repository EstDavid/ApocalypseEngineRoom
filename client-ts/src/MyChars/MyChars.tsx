import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Select from 'react-select';

import './MyChars.css';
import CharCard from './CharCard';
import charactersService from '../services/characters';
import { ICharacter } from '../types';

interface MyCharFilter {
  label: string;
  options: { value: string; label: string }[];
}

function MyChars({ userID }: { userID: string }) {
  const [charList, setCharList] = useState<ICharacter[]>([]);
  const [activeFilters, setActiveFilters] = useState<readonly MyCharFilter[]>(
    []
  );

  const optionsGroups: { label: string; options: 'system' | 'playbook' }[] = [
    {
      label: 'Systems',
      options: 'system'
    },
    {
      label: 'Playbooks',
      options: 'playbook'
    }
  ];

  useEffect(() => {
    if (userID) {
      charactersService.getAll().then((response) => {
        setCharList(response.data);
      });
      // TODO Add catch statement and send error to store
    }
  }, [userID]);

  const deleteChar = (id: string) => {
    charactersService.remove(id).then(() => {
      // TODO update status with the removed character
    });
  };

  const handleFilterChange = (selected: readonly MyCharFilter[] | null) => {
    if (selected) {
      setActiveFilters(selected);
    }
  };

  return (
    <div className="MyChars">
      <h1>My Characters</h1>
      <div className="filterDiv">
        <p>Include:</p>
        <Select
          isMulti
          name="filters"
          options={optionsGroups.map((group) => {
            return {
              label: group.label,
              options: [...new Set(charList.map((c) => c[group.options]))].map(
                (s) => {
                  return { value: s, label: s };
                }
              )
            };
          })}
          value={activeFilters}
          onChange={handleFilterChange}
          className="filterSelect"
        />
      </div>
      <div className="CharView">
        <Link to={'NewCharacter'}>
          <div className="CharCard AddChar">
            <h1>Add Character</h1>
            <h1>+</h1>
          </div>
        </Link>
        {charList
          // TODO: refactor update of this filter
          .filter((c) => {
            return (
              activeFilters.length == 0 ||
              activeFilters.some((f) =>
                f.options.some((option) => {
                  option.value == c.playbook || option.value == c.system;
                })
              )
            );
          })
          .map((c, i) => (
            <CharCard char={c} key={i} deleteChar={deleteChar} />
          ))}
      </div>
    </div>
  );
}

export default MyChars;
