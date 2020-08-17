<script>
    import PostEditForm from "../PostEditForm.svelte";
    import PostEditControl from "../PostEditControl.svelte";
    import SaveControl from "../SaveControl.svelte";
    import PostRender from "../PostRender.svelte";
    import { onMount, onDestroy } from "svelte";
    import axios from "axios";

    export let id;

    let post = {
        id: null,
        title: "",
        content: ""
    };

    let togglePreview = false;
    let isLoading = true;
    let errorMessage = "";
    let message = "";

    onMount(async () => {
        const { data } = await axios.get(`posts/${id}`);

        post = data;

        isLoading = false;
    });

    onDestroy(() => clearForm());

    function clearForm() {
        post.title = "";
        post.content = "";
    }
</script>

<div class="post__form__control">
    {#if isLoading}
        <h1>loading...</h1>
    {:else}
        {#if errorMessage}
            <div class="alert">{errorMessage}</div>
        {:else if message}
            <div class="plane">{message}</div>
        {/if}

        <PostEditControl
            {post}
            bind:isLoading={isLoading}
            bind:message={message}
            bind:errorMessage={errorMessage}
            bind:togglePreview={togglePreview}
        />

        {#if !togglePreview}
            <PostEditForm {post}/>
        {:else}
            <PostRender {post}/>
        {/if}

        <SaveControl
            {post}
            bind:isLoading={isLoading}
            bind:message={message}
            bind:errorMessage={errorMessage}
        />
    {/if}
</div>