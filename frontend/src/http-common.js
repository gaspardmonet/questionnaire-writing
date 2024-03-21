import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://star55.net/api",
});

axiosInstance.interceptors.request.use(
    config => {
        const token = localStorage.getItem("token");   
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token;
        }

        // config.headers['Content-Type'] = 'application/json';
        return config
    },
    error => {
        Promise.reject(error)
    }
)

export default axiosInstance;