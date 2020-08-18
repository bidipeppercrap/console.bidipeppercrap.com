import { writable } from "svelte/store";
import axios from "axios";

import { accessToken } from "./auth";

const POSTS = [];
const { subscribe, set } = writable(POSTS);

const fetchPost = async () => {
  set([]);

  const { data: { data } } = await axios({
    method: "GET",
    url: "posts",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  set(data);
};

export default {
  subscribe,
  fetchPost,
};
