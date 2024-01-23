import Login from '../Login/Login.tsx';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

const user = userEvent.setup();

const login = jest.fn();
const signUp = jest.fn();
let loginIssue = '';

it('should render a password heading', () => {

  render(<Login login={login} signup={signUp} loginIssue={loginIssue} />);

  const passwordInput = screen.findByDisplayValue('Password');
  expect(passwordInput).toBeDefined();
});

it('should call the login function',async ()=>{
  render(<Login login={login} signup={signUp} loginIssue={loginIssue} />);
  const userNameInput = screen.getByPlaceholderText('enter username');
  const passwordInput = screen.getByPlaceholderText('enter password');

  const loginButton = screen.getByText('Log In');

  user.type(userNameInput, 'tim');
  user.type(passwordInput, 'sdhjskujdghnujhnsg');
  await user.click(loginButton);

  expect(login).toHaveBeenCalled();
});

it('should call the signup function',async ()=>{
  render(<Login login={login} signup={signUp} loginIssue={loginIssue} />);
  const userNameInput = screen.getByPlaceholderText('enter username');
  const passwordInput = screen.getByPlaceholderText('enter password');

  const signupButton = screen.getByText('Sign Up');

  user.type(userNameInput, 'tim');
  user.type(passwordInput, 'sdhjskujdghnujhnsg');
  await user.click(signupButton);

  expect(signUp).toHaveBeenCalled();
});

it('should render a login issue', () =>{

  loginIssue = 'There was a problem with your password';
  render(<Login login={login} signup={signUp} loginIssue={loginIssue} />);
  const issueText = screen.getByText('There was a problem with your password');

  expect(issueText).toBeDefined;
});