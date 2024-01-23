import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';

import { FaUserPlus } from 'react-icons/fa6';
import { FaHome, FaSignOutAlt } from 'react-icons/fa';

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

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem(userLocalStorageKey);

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUserID(user._id);
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

  return (
    <>
      <BrowserRouter>
        {userID.length ? (
          <div className="NavBar">
            <Link to="/">
              <div className="NavBtn">
                <FaHome />
              </div>
            </Link>
            <Link to="NewCharacter">
              <div className="NavBtn">
                <FaUserPlus />
              </div>
            </Link>
            <Link to="/">
              <div className="NavBtn" onClick={handleLogout}>
                <FaSignOutAlt />
              </div>
            </Link>
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
            element={<CharSheet client={client} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
