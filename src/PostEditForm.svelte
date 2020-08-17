<script>
    export let post = {
        title: "",
        content: ""
    };
</script>

<style>
    .post__edit__form {
        display: grid;
        grid-template-rows: auto 1fr;
        gap: var(--space);
    }
    
    .post__edit__form > textarea.form-control {
        resize: none;
        min-height: calc(var(--space) * 24);
    }

    @media (min-width: 768px) {

    }
</style>

<div class="post__edit__form">
    <input name="title" id="title" type="text" class="form-control" placeholder="title" bind:value={post.title}>
    <textarea name="content" id="content" class="form-control" bind:value={post.content}></textarea>
</div>