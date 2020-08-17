<script>
    export let post;
    export let isLoading;
    export let errorMessage;

    let toggleUpload = false;

    function upload() {
        toggleUpload = false;
    }

    async function savePost(id) {
        isLoading = true;

        try {
            await axios.put(`posts/${id}`, post);

            message = "success!";
        } catch (error) {
            errorMessage = error.message;
        } finally {
            isLoading = false;
        }
   }

</script>

<div>
    <div class="save__control">
        <button class="btn" on:click={() => toggleUpload = true}>upload</button>
        <button class="btn" on:click={() => savePost(post.id)}>save</button>
    </div>
    <div class="upload__form plane" style="display: {toggleUpload ? "block" : "none"}">
        <input class="form-control" type="file" name="file" id="file">
        <button class="btn" on:click={() => upload()}>upload</button>
    </div>
</div>