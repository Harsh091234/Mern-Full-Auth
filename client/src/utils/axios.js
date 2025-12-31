import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.MODE === "development"? "http://localhost:3000/api" : "/api",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 10000,
});

export default api;
