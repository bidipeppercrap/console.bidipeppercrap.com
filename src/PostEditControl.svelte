<script>
  import axios from "axios";
  import { navigate } from "svelte-routing";
  import { accessToken } from "./store/auth";

  export let post;
  export let togglePreview;
  export let errorMessage;
  export let isLoading;

  function back() {
      navigate("/posts", { replace: true });
  }

  async function deletePost(id) {
    isLoading = true;

    try {
      await axios({
        method: 'DELETE',
        url: `posts/${id}`,
        headers: {
          'Authorization': `Bearer ${$accessToken}`
        }
      });

      back();
    } catch (error) {
      errorMessage = error.message;
    } finally {
      isLoading = false;
    }
  }
</script>

<div class="post__edit__control">
    <button class="btn" on:click={() => back()}>back</button>
    <button class="btn" on:click={() => togglePreview = !togglePreview}>{togglePreview ? "editor" : "preview"}</button>
    <button class="btn alert" on:click={() => deletePost(post.id)}>delete</button>
</div>
