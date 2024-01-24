import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';

import { FaUserPlus } from 'react-icons/fa6';
import { FaHome, FaSignOutAlt } from 'react-icons/fa';
import { FaVolumeXmark, FaVolumeHigh  } from "react-icons/fa6";


import CharSheet from './CharSheet/CharSheet';
import MyChars from './MyChars/MyChars';
import NewChar from './NewChar/NewChar';
import Login from './Login/Login';
import './App.css';
import { User } from './types';
import usersService from './services/users.ts';

const client = axios.create({
  baseURL: 'http://localhost:3000'
});

const userLocalStorageKey = 'loggedAppocalypseUser';

function App() {
  const [userID, setUserID] = useState('');
  const [loginIssue, setLoginIssue] = useState('');
  const [volume, setVolume] = useState(true);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem(userLocalStorageKey);

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUserID(user);
    }
  }, []);

  const handleLogin = async (username: string, password: string) => {
    try {
      const user: User = await usersService.login(username, password);

      window.localStorage.setItem(userLocalStorageKey, JSON.stringify(user));

      setUserID(user._id);
    } catch (error) {
      setLoginIssue(error as string);
    }
  };

  const handleSignup = async (username: string, password: string) => {
    try {
      const user: User = await usersService.signup(username, password);

      window.localStorage.setItem(userLocalStorageKey, JSON.stringify(user));

      setUserID(user._id);
    } catch (error) {
      setLoginIssue(error as string);
    }
  };

  const handleLogout = async () => {
    try {
      await usersService.logout();

      window.localStorage.removeItem(userLocalStorageKey);

      setUserID('');
    } catch (error) {
      setLoginIssue(error as string);
    }
  };

  const handleVolume = () =>{
    setVolume(prev => !prev);
  };

  return (
    <>
      <BrowserRouter>
        {userID.length ? (
          <div className="NavBar">
            <Link to="/">
              <div className="NavBtn" role='button' aria-description='Character page'>
                <FaHome />
              </div>
            </Link>
            <Link to="NewCharacter">
              <div className="NavBtn" role='button' aria-description='Add a new character'>
                <FaUserPlus />
              </div>
            </Link>
            <Link to="/">
              <div className="NavBtn" onClick={handleLogout} role='button' aria-description='Log out'>
                <FaSignOutAlt />
              </div>
            </Link>
            <div className='NavBtn MuteBtn' onClick={handleVolume} role='button' aria-description='Mutes dice rolling sound'>

              {volume ? <FaVolumeHigh/> : <FaVolumeXmark/>}

            </div>
          </div>
        ) : (
          ''
        )}
        <Routes>
          <Route
            path="/"
            element={
              userID.length ? (
                <MyChars userID={userID} />
              ) : (
                <Login
                  login={handleLogin}
                  signup={handleSignup}
                  loginIssue={loginIssue}
                />
              )
            }
          />
          <Route path="/NewCharacter" element={<NewChar />} />
          <Route
            path="/CharacterSheet"
            element={<CharSheet client={client} volume={volume}/>}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
