import axios from "axios"

const axiosClient = axios.create({
  baseURL: 'http://localhost:3000/api'
});

axios.interceptors.request.use(function (config) {
	return config;
}, function (error) {
	return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
	return response;
}, function (error) {
	return Promise.reject(error);
});

instance.defaults.headers.common['Authorization'] = localStorage.getItem('Atoken');
instance.defaults.headers.common['accept-language'] = 'en';

export { axiosClient };