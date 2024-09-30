// src/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000'; // Backend API URL

export const registerUser = async (userData) => {
    return await axios.post(`${API_URL}/register`, userData);
};

export const loginUser = async (userData) => {
    return await axios.post(`${API_URL}/login`, userData);
};

// Todo işlemleri için API fonksiyonları burada tanımlanabilir
