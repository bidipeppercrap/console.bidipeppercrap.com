import App from './App.svelte';
import axios from 'axios';

import { accessToken } from './stores';

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken;

const app = new App({
	target: document.body
});

export default app;