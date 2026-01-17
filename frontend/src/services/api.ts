import axios from 'axios';
import { 
  LoginRequest, 
  RegisterRequest, 
  AuthResponse, 
  User, 
  Note, 
  CreateNoteRequest, 
  UpdateNoteRequest 
} from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  register: async (userData: RegisterRequest): Promise<AuthResponse> => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  getProfile: async (): Promise<User> => {
    const response = await api.get('/auth/profile');
    return response.data;
  },
};

export const notesAPI = {
  getAllNotes: async (): Promise<Note[]> => {
    const response = await api.get('/notes');
    return response.data;
  },

  getNote: async (id: number): Promise<Note> => {
    const response = await api.get(`/notes/${id}`);
    return response.data;
  },

  createNote: async (noteData: CreateNoteRequest): Promise<Note> => {
    const response = await api.post('/notes', noteData);
    return response.data;
  },

  updateNote: async (id: number, noteData: UpdateNoteRequest): Promise<Note> => {
    const response = await api.patch(`/notes/${id}`, noteData);
    return response.data;
  },

  deleteNote: async (id: number): Promise<void> => {
    await api.delete(`/notes/${id}`);
  },

  archiveNote: async (id: number): Promise<Note> => {
    const response = await api.patch(`/notes/${id}/archive`);
    return response.data;
  },

  unarchiveNote: async (id: number): Promise<Note> => {
    const response = await api.patch(`/notes/${id}/unarchive`);
    return response.data;
  },
};

export default api;
