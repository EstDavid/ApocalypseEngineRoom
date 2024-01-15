import { useState, useEffect } from 'react'
import {
  BrowserRouter, Routes, Route, Link
} from "react-router-dom";

import CharSheet from './CharSheet/CharSheet'
import MyChars from './MyChars/MyChars';
import NewChar from './NewChar/NewChar';
import Login from './Login';
import './App.css'

function App() {
  const [userID, setUserID] = useState("")

  useEffect(() => {
    setUserID('65a292191cfa2479d19bad32')
  }, [])

  const login = (newUserID) => {
    setUserID(newUserID)
  }

  return (
    <>
      <BrowserRouter>
        <div className='NavBar'>
            <Link to="/">
              <div className='NavBtn'>
                <p>Home</p>
              </div>
            </Link>
            <Link to="NewCharacter">
              <div className='NavBtn'>
                <p>New Character</p>
              </div>
            </Link>
        </div>
        <Routes>
          <Route path="/" element={userID.length ? <MyChars userID={userID}/> : <Login login={login} />} />
          <Route path="/NewCharacter" element={<NewChar userID={userID} />} />
          <Route path="/CharacterSheet" element={<CharSheet/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App