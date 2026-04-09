import axios from 'axios';

const BASE_URL = "http://localhost:8080/sahara";

const api = axios.create({
    baseURL: BASE_URL,
});

export default api;