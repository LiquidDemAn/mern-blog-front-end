import axios from 'axios';

export const customeAxios = axios.create({
	baseURL: 'http://localhost:4444',
});
