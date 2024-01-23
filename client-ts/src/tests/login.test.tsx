
import Login from '../Login/Login.tsx';


import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

const user = userEvent.setup();

// jest.mock('')
const login = jest.fn();
const signUp = jest.fn();
const loginIssue = '';

it('should render a password heading', () => {

  render(<Login login={login} signup={signUp} loginIssue={loginIssue} />);

  const passwordInput = screen.findByDisplayValue('Password');
  expect(passwordInput).toBeDefined();

});

it('should call the login function',async ()=>{
  render(<Login login={login} signup={signUp} loginIssue={loginIssue} />);
  const userNameInput = screen.getByPlaceholderText('enter username');
  const passwordInput = screen.getByPlaceholderText('enter password');
  // const pw2 = screen.getByRole('textbox',{name:'password'});

  const loginButton = screen.getByRole('button',{name:'Log In'});

  user.type(userNameInput, 'tim');
  user.type(passwordInput, 'sdhjskujdghnujhnsg');
  await user.click(loginButton);

  expect(login).toHaveBeenCalled();

});