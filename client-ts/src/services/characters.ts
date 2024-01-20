import axios from 'axios';
import { NewCharacter } from '../types/index-d';

const client = axios.create({
  // baseURL: import.meta.env.VITE_API_URL_DEV
  baseURL: 'http://localhost:3000'
});

export const getPlaybooks = async () => {
  const response = await client.get('/api/playbooks', { withCredentials: true });

  return response;
};

export const getAll = async () => {
  const response = await client.get('/api/characters', { withCredentials: true });

  return response;
};

export const create = async (newChar: NewCharacter) => {
  const response = await client.post('/api/characters', newChar, { withCredentials: true });

  return response;
};
export const remove = async (id: string) => {
  const response = await client.delete(`/api/characters/${id}`, { withCredentials: true });

  return response;
};