import axiosInstance from './apiService';

export interface User {
  id: number;
  email: string;
  name: string;
}

export const getUserProfile = async (userId: number): Promise<User> => {
  try {
    const response = await axiosInstance.get(`/users/${userId}`);
    return response.data;  // Return the user's profile
  } catch (error) {
    throw new Error('Failed to retrieve user profile');
  }
};

export const updateUserProfile = async (userId: number, profileData: Partial<User>): Promise<User> => {
  try {
    const response = await axiosInstance.put(`/users/${userId}`, profileData);
    return response.data;  // Return the updated user profile
  } catch (error) {
    throw new Error('Failed to update user profile');
  }
};

export const deleteUser = async (userId: number): Promise<void> => {
  try {
    await axiosInstance.delete(`/users/${userId}`);
  } catch (error) {
    throw new Error('Failed to delete user');
  }
};
