export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
}

export interface Note {
  id: number;
  title: string;
  content: string;
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
  userId: number;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface AuthResponse {
  access_token: string;
  user: User;
}

export interface CreateNoteRequest {
  title: string;
  content: string;
  isArchived?: boolean;
}

export interface UpdateNoteRequest {
  title?: string;
  content?: string;
  isArchived?: boolean;
}
