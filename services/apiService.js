import axios  from 'axios';

const API_URL = 'https://one0-dollar-backend-service.onrender.com/';

const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance