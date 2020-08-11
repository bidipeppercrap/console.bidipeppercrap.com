<script>
    import PostEditControl from "../PostEditControl.svelte";
    import SaveControl from "../SaveControl.svelte";
    import PostContent from "../PostContent.svelte";
    import { onMount } from "svelte";
    import axios from "axios";

    export let id;
    let post = {
        title: "",
        content: ""
    };
    let togglePreview = false;

    onMount(async () => {
        const { data } = await axios.get(`posts/${id}`);

        post = data;
    });
</script>

<div class="post__form__control">
    <PostEditControl {id} bind:togglePreview={togglePreview}/>

    {#if !togglePreview}
        <input name="title" id="title" type="text" class="form-control" placeholder="title" bind:value={post.title}>
        <textarea name="content" id="content" class="form-control" bind:value={post.content}></textarea>
    {:else}
        <PostContent {post}/>
    {/if}

    <SaveControl />
</div>