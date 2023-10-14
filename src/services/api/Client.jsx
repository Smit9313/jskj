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

export { axiosClient };