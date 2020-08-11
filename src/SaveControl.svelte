<script>
    let toggleUpload = false;

    function upload() {
        toggleUpload = false;
    }
</script>

<div>
    <div class="save__control">
        <button class="btn" on:click={() => toggleUpload = true}>upload</button>
        <button class="btn">save</button>
    </div>
    <div class="upload__form plane" style="display: {toggleUpload ? "block" : "none"}">
        <input class="form-control" type="file" name="file" id="file">
        <button class="btn" on:click={() => upload()}>upload</button>
    </div>
</div>