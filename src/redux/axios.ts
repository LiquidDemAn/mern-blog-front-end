import axios from 'axios';

export const customeAxios = axios.create({
	baseURL: 'http://localhost:4444',
});

const token = window.localStorage.getItem('token');

customeAxios.interceptors.request.use((config) => {
	if (token) {
		// @ts-ignore
		config.headers.Authorization = token;
		return config;
	}
});
