import App from './App.svelte';
import axios from 'axios';
import config from './config';

import { accessToken } from './stores';

axios.defaults.baseURL = config.apiUrl;
axios.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken;

const app = new App({
	target: document.body
});

export default app;