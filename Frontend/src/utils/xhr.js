import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;
axios.defaults.baseURL = API_URL;
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';


const currentLang = () => {
    return localStorage.getItem('lang');
}

const getAuthToken = () => {
    return sessionStorage.getItem('token');
}


axios.interceptors.request.use(
    (config) => {
        console.log("solicitud", config);

        const token = getAuthToken();

        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        const language = currentLang();
        config.headers['Accept-Language'] = `${language}`;
    
        return config;
    },

    (error) => {
        return Promise.reject(error);
    }
);

export const request = (config) => axios.request({ responseType: 'json', method: 'get', ...config });
export const get = request;
export const post = (config) => request({ ...config, method: 'post' });
export const put = (config) => request({ ...config, method: 'put' });
export const del = (config) => request({ ...config, method: 'delete' });
