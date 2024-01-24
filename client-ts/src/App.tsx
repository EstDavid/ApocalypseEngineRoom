import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

import { FaUserPlus } from 'react-icons/fa6';
import { FaHome, FaSignOutAlt } from 'react-icons/fa';
import { FaVolumeXmark, FaVolumeHigh } from 'react-icons/fa6';

import CharSheet from './CharSheet/CharSheet';
import MyChars from './MyChars/MyChars';
import NewChar from './NewChar/NewChar';
import Login from './Login/Login';
import './App.css';
import usersService from './services/users.ts';

const client = axios.create({
  baseURL: 'http://localhost:3000'
});

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginIssue, setLoginIssue] = useState('');
  const [volume, setVolume] = useState(true);

  useEffect(() => {
    const cookieID = Cookies.get('sid');
    if (cookieID) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = async (username: string, password: string) => {
    try {
      await usersService.login(username, password);

      setIsAuthenticated(true);
    } catch (error) {
      setLoginIssue(error as string);
    }
  };

  const handleSignup = async (username: string, password: string) => {
    try {
      await usersService.signup(username, password);

      setIsAuthenticated(true);
    } catch (error) {
      setLoginIssue(error as string);
    }
  };

  const handleLogout = async () => {
    try {
      await usersService.logout();

      setIsAuthenticated(false);
    } catch (error) {
      setLoginIssue(error as string);
    }
  };

  const handleVolume = () => {
    setVolume((prev) => !prev);
  };

  return (
    <>
      <BrowserRouter>
        {isAuthenticated ? (
          <div className="NavBar">
            <Link to="/">
              <div
                className="NavBtn"
                role="button"
                aria-description="Character page"
              >
                <FaHome />
              </div>
            </Link>
            <Link to="NewCharacter">
              <div
                className="NavBtn"
                role="button"
                aria-description="Add a new character"
              >
                <FaUserPlus />
              </div>
            </Link>
            <Link to="/">
              <div
                className="NavBtn"
                onClick={handleLogout}
                role="button"
                aria-description="Log out"
              >
                <FaSignOutAlt />
              </div>
            </Link>
            <div
              className="NavBtn MuteBtn"
              onClick={handleVolume}
              role="button"
              aria-description="Mutes dice rolling sound"
            >
              {volume ? <FaVolumeHigh /> : <FaVolumeXmark />}
            </div>
          </div>
        ) : (
          ''
        )}
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <MyChars />
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
            element={<CharSheet client={client} volume={volume} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
