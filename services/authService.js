import axiosInstance from "./apiService"; //importing axios instance from apiService.js

export const login = async (email, password) => {
    try {
        const response = await axiosInstance.post('/auth/login', {
            email,
            password,
        });
        return response.data;
    }   catch (error) {
        throw error;
    }
};

export const register = async (email, password) => {
    try {
        const response = await axiosInstance.post('/auth/register', {
            email,
            password,
        });
        return response.data;
    }   catch (error) {
        throw error;
    }
};

export const logout = async () => {
    try {
        const response = await axiosInstance.post('/auth/logout');
        return response.data;
    }   catch (error) {
        throw error;
    }
};