import axios from 'axios';
import { NewCharacter } from '../types/index-d';

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL_DEV
});

export const getPlaybooks = async () => {
  const response = await client.get('/playbooks', { withCredentials: true });

  return response;
};

export const create = async (newChar: NewCharacter) => {
  const response = await client.post('/characters', newChar, { withCredentials: true });

  return response;
};