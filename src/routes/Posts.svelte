<script>
import { onMount } from "svelte";
import axios from "axios";
import PostControl from '../PostControl.svelte';

    let posts = [];

    onMount(async () => {
        posts = (await axios.get("posts")).data.data;
    });
</script>

<div class="fluid__container">
    <div class="content__title">Posts</div>
    <div class="content plane">
        <PostControl />
        <ul class="content__lists">
            {#each posts as {title, content}, i}
                <li class="content__list__item btn">
                    {title ?? content}
                </li>
            {/each}
        </ul>
    </div>
</div>