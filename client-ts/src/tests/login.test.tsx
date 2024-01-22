// import { useState } from 'react';
import Login from '../Login/Login';
// import { Renderer } from 'react-dom';
// import renderer from 'react-test-renderer';

import { render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

// jest.mock('')

it('should render a title', () => {
  const login = jest.fn();
  const signUp = jest.fn();
  const loginIssue = 'you fucked up son';

  render(<Login login={login} signup={signUp} loginIssue={loginIssue} />);

  const passwordInput = screen.findByDisplayValue('Password');
  // const userNameInput = screen.find

  expect(passwordInput).toBeDefined();

  // const userNameInput =
});
