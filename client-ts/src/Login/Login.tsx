import { useState } from 'react';
import './Login.css';
// import logo from '../assets/logo.png';
import { LoginIssue, ILogin, ISignup } from '../types';

function Login({
  login,
  signup,
  loginIssue
}: {
  login: ILogin;
  signup: ISignup;
  loginIssue: LoginIssue;
}) {
  const [username, setUsername] = useState('');
  const [password, setpassword] = useState('');
  return (
    //TODO add logo to logodiv without breaking tests
    <div className="Login">
      <h1>Apocalypse Engine Room</h1>
      <div className="LogoDiv">
        {/* { <div className='LogoDiv' style={{ backgroundImage: `url(${logo})`}}/> } */}
      </div>
      <div className="CredDiv">
        <div className="fieldDiv">
          <h2>User Name</h2>
          <input
            className="LoginInput"
            type="text"
            name="username"
            defaultValue={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="off"
            placeholder="enter username"
          />
        </div>
        <div className="fieldDiv">
          <h2>Password</h2>
          <input
            className="LoginInput"
            type="password"
            name="password"
            defaultValue={password}
            onChange={(e) => setpassword(e.target.value)}
            autoComplete="off"
            placeholder="enter password"
          />
        </div>
        {loginIssue.length ? <p className="WarningText">{loginIssue}</p> : ''}
        <div className="loginBtns">
          <button
            name="login"
            type="button"
            onClick={() => {
              login(username, password);
            }}
          >
            Log In
          </button>
          <button
            name="signup"
            onClick={() => {
              signup(username, password);
            }}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
