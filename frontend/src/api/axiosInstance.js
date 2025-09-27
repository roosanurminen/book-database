import axios from 'axios';

// https://medium.com/@velja/token-refresh-with-axios-interceptors-for-a-seamless-authentication-experience-854b06064bde
// https://medium.com/@eric_abell/the-struggle-managing-access-and-refresh-tokens-in-web-apps-1bd70a3a6f01
// https://stackoverflow.com/questions/75946973/how-to-run-axios-interceptor-once-for-multiple-request-on-401-error

const baseURL = import.meta.env.VITE_API_URL || 'http://backend:5000/api';

const axiosInstance = axios.create({
    baseURL,
    withCredentials: true
});

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry && originalRequest.url !== '/refresh') {
            originalRequest._retry = true;

            try {
                await axiosInstance.post('/refresh');
                return axiosInstance(originalRequest);
            } catch (err) {
                return Promise.reject(err);
            }   
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;