import api from './config';
import { mockUser, delay } from '@/data/mockData';
import type { User, LoginCredentials, RegisterData, AuthResponse } from '@/types/api';

export type { User, LoginCredentials, RegisterData, AuthResponse };

export const authAPI = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    await delay(1000);
    
    // Mock login - accept any credentials
    if (credentials.username && credentials.password) {
      return {
        access: 'mock-jwt-token',
        refresh: 'mock-refresh-token',
        user: mockUser,
      };
    }
    
    throw new Error('Invalid credentials');
  },

  register: async (data: RegisterData): Promise<AuthResponse> => {
    await delay(1200);
    
    // Mock registration - accept any valid data
    if (data.username && data.email && data.password) {
      const newUser: User = {
        id: 999,
        username: data.username,
        email: data.email,
        first_name: data.first_name,
        last_name: data.last_name,
      };
      
      return {
        access: 'mock-jwt-token',
        refresh: 'mock-refresh-token',
        user: newUser,
      };
    }
    
    throw new Error('Registration failed');
  },

  logout: async (): Promise<void> => {
    await delay(300);
    // Mock logout - always succeeds
  },

  getCurrentUser: async (): Promise<User> => {
    await delay(400);
    return mockUser;
  },

  updateProfile: async (data: Partial<User>): Promise<User> => {
    await delay(800);
    
    const updatedUser: User = {
      ...mockUser,
      ...data,
    };
    
    return updatedUser;
  },
};