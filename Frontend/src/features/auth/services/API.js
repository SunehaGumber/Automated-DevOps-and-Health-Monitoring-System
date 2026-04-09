import axios from 'axios'

export const API = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true,
    headers: {
        "Content-Type":"application/json"
    }
})

API.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
});

API.interceptors.response.use((response) => response, async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
            const res = await API.post('/api/auth/refresh-token');

            const newAccessToken = res.data.accessToken;
            
            localStorage.setItem("accessToken", newAccessToken);

            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
            return API(originalRequest);
        } catch (err) {
            localStorage.removeItem("accessToken");
            console.log("Session exipred, please login again");
            return Promise.reject(err);
        }
    }
    return Promise.reject(error);
})