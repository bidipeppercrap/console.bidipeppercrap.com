import { writable } from 'svelte/store';

export const accessToken = writable('');
export const isAuthenticated = writable(localStorage.getItem('isAuthenticated'));