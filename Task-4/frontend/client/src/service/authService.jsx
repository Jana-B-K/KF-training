import axios from 'axios';

const API = "http://localhost:2000";

export async function login(data) {
  const res = await axios.post(`${API}/api/auth/login`, data);
  return res.data;
}

export async function register(data) {
  const res = await axios.post(`${API}/api/auth/register`, data);
  return res.data; 
}