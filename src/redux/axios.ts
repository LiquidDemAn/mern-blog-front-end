import axios from 'axios';

export const customeAxios = axios.create({
	baseURL: 'http://localhost:4444',
});

customeAxios.interceptors.request.use((config) => {
	const token = window.localStorage.getItem('token');
	if (token) {
		// @ts-ignore
		config.headers.Authorization = token;
	}
	return config;
});
