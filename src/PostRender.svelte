<script>
    import marked from "marked";
    import DOMPurify from "dompurify";

    export let post = {
        title: "",
        content: ""
    };
</script>

<article class="markdown plane">
    <header class="post__he">
        {#if post.thumbnail}
            <img src={post.thumbnail} alt="post thumbnail">
        {/if}
        {#if post.title}
            <h1>{DOMPurify.sanitize(post.title)}</h1>
        {/if}
    </header>
    {#if post.title && post.content}
    <hr>
    {/if}
    {#if post.content}
        {@html marked(DOMPurify.sanitize(post.content))}
    {/if}
</article>