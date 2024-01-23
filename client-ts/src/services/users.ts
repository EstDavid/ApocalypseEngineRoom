import axios from 'axios';
import { BASE_URL } from './servicesUtils';

const client = axios.create({
  baseURL: BASE_URL + '/users'
});

const login = async (username: string, password: string) => {
  const response = await client.post(
    '/login',
    { username, password },
    { withCredentials: true }
  );

  return response.data;
};

const signup = async (username: string, password: string) => {
  const response = await client.post(
    '/signup',
    { username, password },
    { withCredentials: true }
  );

  return response.data;
};

const logout = async () => {
  const response = await client.post('/logout', {}, { withCredentials: true });

  return response.data;
};

export default {
  login,
  signup,
  logout
};