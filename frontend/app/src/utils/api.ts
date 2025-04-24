import axios from 'axios';

const api = axios.create({
  baseURL: 'https://internship-manager.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const register = (data: any) => api.post('/auth/register', data);
export const login = (data: any) => api.post('/auth/login', data);
export const createInternship = (token: string, data: any) =>
  api.post('/internships', data, { headers: { Authorization: `Bearer ${token}` } });
export const getInternships = (token: string) =>
  api.get('/internships', { headers: { Authorization: `Bearer ${token}` } });
export const getInternshipById = (token: string, id: string) =>
  api.get(`/internships/${id}`, { headers: { Authorization: `Bearer ${token}` } });  
export const updateInternship = (token: string, id: string, data: any) =>
  api.put(`/internships/${id}`, data, { headers: { Authorization: `Bearer ${token}` } });
export const deleteInternship = (token: string, id: string) =>
  api.delete(`/internships/${id}`, { headers: { Authorization: `Bearer ${token}` } });
