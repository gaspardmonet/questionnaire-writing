// import axios from "axios";

// export default axios.create({
//   baseURL: "http://localhost:5000/api",
//   headers: {
//     "Content-Type": "application/json",
//     "Authorization": `Bearer ${localStorage.getItem("token")}`
//   }
// });

import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:5000/api",
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