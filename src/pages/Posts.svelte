<script>
import { onMount, onDestroy } from "svelte";
import { Router, Route, navigate } from "svelte-routing";
import axios from "axios";
import PostControl from '../PostControl.svelte';
import PostEdit from "./PostEdit.svelte";

let posts = [];

let isLoading = true;
let errorMessage = "";

onMount(async () => {
    await getPosts();
});

async function getPosts() {
    try {
        posts = (await axios.get("posts")).data.data;
    } catch (error) {
        errorMessage = error.message;
    } finally {
        isLoading = false;
    }
}

function editPost(id) {
    navigate(`posts/${id}`, { replace: true });
}

</script>

<style>
    .content > h1,
    .content > .alert {
        justify-self: center;
        align-self: center;
    }
</style>

<Router>
    <div class="fluid__container">
        <div class="content__title">Posts</div>
        <div class="content plane">
            {#if isLoading}
                <h1>loading...</h1>
            {:else if errorMessage}
                <div class="alert">{errorMessage}</div>
            {:else}
                <Route path="/">
                    <div class="content__lists">
                        <PostControl />
                        <ul>
                            {#each posts as {id, title, content}, i}
                                <li class="content__list__item btn" on:click={editPost(id)}>
                                    {title ?? content}
                                </li>
                            {/each}
                        </ul>
                    </div>
                </Route>
                <Route path=":id" component={PostEdit} />
            {/if}
        </div>
    </div>
</Router>