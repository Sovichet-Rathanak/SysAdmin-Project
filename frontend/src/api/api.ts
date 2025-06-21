import axios from "axios";

const PORT = import.meta.env.VITE_PORT;

const API = axios.create({
    baseURL: `http://localhost:${PORT}/api`
})

export const getAllColumns = () => API.get('/column')