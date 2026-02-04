import axios from "axios";

const API = "http://localhost:2000/";

export function getUsers(token) {
  return axios.get(`${API}api/user`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export function createUser(data, token) {
  return axios.post(`${API}api/user`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export function updateUser(id, data, token) {
  return axios.put(`${API}api/user/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export function deleteUser(id, token) {
  return axios.delete(`${API}api/user/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}
