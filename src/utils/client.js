
import axios from 'axios';


const client = () => {
  const instance = axios.create({
    baseURL: `https://iglace.eyanofinance.org/api/v1/`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      "Content-Type" : "application/json",
    },
  });
  return instance;
}

export default client;