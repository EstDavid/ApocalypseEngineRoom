import { useState, useEffect } from 'react'
import {
  BrowserRouter, Routes, Route, Link
} from "react-router-dom";
import axios from "axios";
import Cookies from 'js-cookie';

import { FaUserPlus } from "react-icons/fa6";
import { FaHome, FaSignOutAlt  } from "react-icons/fa";

import CharSheet from './CharSheet/CharSheet'
import MyChars from './MyChars/MyChars';
import NewChar from './NewChar/NewChar';
import Login from './Login/Login';
import './App.css'


const client = axios.create({
  baseURL: "http://localhost:3000" 
});

function App() {
  const [userID, setUserID] = useState("")

  useEffect(() => {
    const cookieID = Cookies.get('userID');
    if (cookieID) setUserID(cookieID.slice(3, -1))
  }, [])

  const login = (username, password) => {
    client.post(`login`, {username, password} , {withCredentials: true}).then((response) => {
      setUserID(response.data)
    })
  }

  const signup = (username, password) => {
    client.post(`signup`, {username, password} , {withCredentials: true}).then((response) => {
      setUserID(response.data)
    })
  }

  const logout = () => {
    client.post(`logout`, {}, {withCredentials: true}).then(() => {
      setUserID("")
    })
  }

  return (
    <>
    <BrowserRouter>
      { userID.length ? 
        <div className='NavBar'>
            <Link to="/">
              <div className='NavBtn'>
                <FaHome />
              </div>
            </Link>
            <Link to="NewCharacter">
              <div className='NavBtn'>
                <FaUserPlus />
              </div>
            </Link>
            <Link to="/">
              <div className='NavBtn' onClick={logout}>
                <FaSignOutAlt />
              </div>
            </Link>
        </div>: ""}
        <Routes>
          <Route path="/" element={userID.length ? <MyChars userID={userID} client={client}/> : <Login login={login} signup={signup} client={client}/>} />
          <Route path="/NewCharacter" element={<NewChar userID={userID} client={client}/>} />
          <Route path="/CharacterSheet" element={<CharSheet client={client}/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App