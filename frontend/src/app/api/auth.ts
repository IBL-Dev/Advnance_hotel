// src/api/auth.ts or wherever you manage API functions

import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000'; // Change this if your backend is hosted elsewhere

export interface SignupData {
  name: string;
  email: string;
  password: string;
}

export async function signup(data: SignupData) {
  try {
    const response = await axios.post(`${API_BASE_URL}/user/register`, data);
    return response.data;
  } catch (error: any) {
    console.error('Signup error:', error.response?.data || error.message);
    throw error.response?.data || new Error('Signup failed');
  }
}
