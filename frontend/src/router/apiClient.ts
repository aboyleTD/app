import axios from 'axios';

export const BASE_URL = 'http://localhost:8080';


export const axiosClient_reader = axios.create({
    baseURL: BASE_URL,
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});

export const axiosClient_writer = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});

