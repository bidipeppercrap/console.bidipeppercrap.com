<script>
    import PostEditControl from "../PostEditControl.svelte";
    import SaveControl from "../SaveControl.svelte"
    export let id;
</script>

<div class="post__form__control">
    <PostEditControl {id} />
    <input name="title" id="title" type="text" class="form-control" placeholder="title">
    <textarea name="content" id="content" class="form-control"></textarea>
    <SaveControl />
</div>