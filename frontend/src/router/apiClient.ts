import axios from 'axios';

export const BASE_URL = 'http://localhost:8080';


export const axiosClientReader = axios.create({
    baseURL: BASE_URL,
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});

export const axiosClientWriter = axios.create({
    baseURL: BASE_URL,
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});

