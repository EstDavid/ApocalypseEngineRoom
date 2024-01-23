import axios from 'axios';
import { BASE_URL } from './servicesUtils';

const client = axios.create({
  baseURL: BASE_URL + '/playbooks'
});

export const getAll = async () => {
  const response = await client.get('/', { withCredentials: true });

  return response;
};