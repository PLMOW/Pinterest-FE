import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.process.env.REACT_APP_API_PINTEREST_ROUTE,
  header: {
    'Access-Control-Allow-Origin': '*',
  },
});

export default instance;
