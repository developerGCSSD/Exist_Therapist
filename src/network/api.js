import axios from 'axios';
export const api = axios.create({
  baseURL: 'https://exist-api.itech-llc.com/api',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 60000,
});

api.interceptors.request.use(request => {
  // console.log('Starting Request', JSON.stringify(request.url, null, 2));
  return request;
});

api.interceptors.response.use(response => {
  // console.log('Starting Response', JSON.stringify(response.data, null, 2));
  return response;
});
