import { useState, useEffect } from 'react'
//import { useSearchParams } from 'react-router-dom'
import { Link } from "react-router-dom";
import Select from 'react-select'
import axios from "axios";

import './MyChars.css'
import CharCard from './CharCard';

const client = axios.create({
    baseURL: "http://localhost:3000" 
});

function MyChars({userID}) {
    const [charList, setCharList] = useState([])
    const [activeFilters, setActiveFilters] = useState([])
    //const [queryParameters] = useSearchParams()

    useEffect(()=> {
        if (userID) {
            client.get(`/characters/${userID}`).then((response) => {
                setCharList(response.data)
            })
        }
    }, [userID])

    const deleteChar = (id) => {
        client.delete(`character/${id}`).then
            (client.get(`characters`).then((response) => {
                setCharList(response.data)
            })    
        )
    }

    return (
        <div className='MyChars'>
            <h1>My Characters</h1>
            <div className='filterDiv'>
                <p>Include:</p>
                <Select
                    isMulti
                    name="filters"
                    options={[
                      ...[...new Set(charList.map(c => c.system))].map((s) => {return {value: s, label: s}}),
                      ...[...new Set(charList.map(c => c.playbook))].map((p) => {return {value: p, label: p}})
                    ]}
                    value={activeFilters}
                    onChange={setActiveFilters}
                    className="filterSelect"
                />
            </div>
            <div className='CharView'>
                <Link to={"NewCharacter"}>
                    <div className='CharCard AddChar'>
                        <h1>Add Character</h1>
                        <h1>+</h1>
                    </div>
                </Link>
                {charList.filter((c) => {
                    return activeFilters.length == 0 || activeFilters.some((f) => f.value == c.playbook || f.value == c.system)
                }).map((c, i) => 
                    <CharCard char={c} key={i} deleteChar={deleteChar}/>
                )}
            </div>
        </div>
    )   
}

export default MyChars