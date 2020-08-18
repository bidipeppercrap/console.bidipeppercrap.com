import { writeable, readable } from "svelte/store";
import axios from "axios";

import { accessToken } from "./auth";

export const posts = writeable([]);

export const fetchPost = () => {
    const { data } = axios({
        method: "GET",
        url: "posts",
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    });
    
    posts.update(data);
}