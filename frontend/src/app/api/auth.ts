// src/api/auth.ts

import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000'; // Update if backend is deployed

// Interface for Signup
export interface SignupData {
  name: string;
  email: string;
  password: string;
}

// Interface for Login
export interface LoginData {
  email: string;
  password: string;
}

// Signup API function
export async function signup(data: SignupData) {
  try {
    const response = await axios.post(`${API_BASE_URL}/user/register`, data, {
      withCredentials: true, // Optional for signup; include if backend sets cookies here too
    });
    return response.data;
  } catch (error: any) {
    console.error('Signup error:', error.response?.data || error.message);
    throw error.response?.data || new Error('Signup failed');
  }
}

// Login API function using cookies
export async function login(data: LoginData) {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, data, {
      withCredentials: true, // IMPORTANT: enables cookies
    });
    return response.data;
  } catch (error: any) {
    console.error('Login error:', error.response?.data || error.message);
    throw error.response?.data || new Error('Login failed');
  }
}
