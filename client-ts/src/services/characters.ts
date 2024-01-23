import axios from 'axios';
import { NewCharacter } from '../types/index-d';
import { BASE_URL } from './servicesUtils';

const client = axios.create({
  baseURL: BASE_URL + '/characters'
});

export const getAll = async () => {
  const response = await client.get('/', { withCredentials: true });

  return response;
};

export const create = async (newChar: NewCharacter) => {
  const response = await client.post('/', newChar, { withCredentials: true });

  return response;
};
export const remove = async (id: string) => {
  const response = await client.delete(`/${id}`, { withCredentials: true });

  return response;
};