import axiosInstance from './apiService';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Interface for the login response
export interface LoginResponse {
  token: string;
  user: {
    id: number;
    email: string;
    name: string;
  };
}

// Function to handle user login
export const login = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await axiosInstance.post('/auth/login', {
      email,
      password,
    });

    const loginData = response.data;
    
    // Save the token in AsyncStorage
    await AsyncStorage.setItem('token', loginData.token);

    return loginData;  // Return the login response data
  } catch (error) {
    throw new Error('Login failed');
  }
};

// Function to handle user registration
export const register = async (email: string, password: string, name: string): Promise<any> => {
  try {
    const response = await axiosInstance.post('/auth/register', {
      email,
      password,
      name,
    });
    return response.data;  // Return the registration response data
  } catch (error) {
    throw new Error('Registration failed');
  }
};

// Function to handle user logout
export const logout = async (): Promise<void> => {
  try {
    await axiosInstance.post('/auth/logout');
    
    // Remove the token from AsyncStorage on logout
    await AsyncStorage.removeItem('token');
  } catch (error) {
    throw new Error('Logout failed');
  }
};

// Function to check if the user is authenticated
export const checkAuthentication = async (): Promise<boolean> => {
  try {
    // Get the authentication token from AsyncStorage
    const token = await AsyncStorage.getItem('token');
    
    // Return true if the token exists, otherwise return false
    return !!token;
  } catch (error) {
    console.error('Error checking authentication:', error);
    return false;
  }
};
