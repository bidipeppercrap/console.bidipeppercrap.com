<script>
import { onMount } from "svelte";
import { Router, Route, navigate } from "svelte-routing";
import axios from "axios";
import PostControl from '../PostControl.svelte';
import PostEdit from "./PostEdit.svelte";

    let posts = [];

    onMount(async () => {
        posts = (await axios.get("posts")).data.data;
    });

    function editPost(id) {
        navigate(`posts/${id}`);
    }
</script>

<Router>
    <div class="fluid__container">
        <div class="content__title">Posts</div>
        <div class="content plane">
            <Route path="/">
                <PostControl />
                <ul class="content__lists">
                    {#each posts as {id, title, content}, i}
                        <li class="content__list__item btn" on:click={editPost(id)}>
                            {title ?? content}
                        </li>
                    {/each}
                </ul>
            </Route>
            <Route path=":id" component={PostEdit} />
        </div>
    </div>
</Router>