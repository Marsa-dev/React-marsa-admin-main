import axios from 'axios';

// export const API_URL = 'https://marsa-app.com:8900/api';
// export const IMAGE_BASEURL = 'https://marsa-app.com:8900';

// export const API_URL = 'http://16.16.215.202:8900/api';
// export const IMAGE_BASEURL = 'http://16.16.215.202:8900';

export const API_URL = 'https://54jr98p7-8900.inc1.devtunnels.ms/api';
export const IMAGE_BASEURL = 'https://54jr98p7-8900.inc1.devtunnels.ms';

export const callAPi = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-type': 'application/json',
  },
});

export const callAPiMultiPart = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-type': 'multipart/form-data',
  },
});

callAPiMultiPart.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('marsa_token');
    if (token && token !== undefined) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

callAPi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('marsa_token');
    if (token && token !== undefined) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
