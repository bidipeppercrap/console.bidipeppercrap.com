<script>
  import { navigate } from "svelte-routing";

  export let id;

  function back() {
      navigate("/posts");
  }

  function deletePost(id) {

  }
</script>

<div class="post__edit__control">
    <button class="btn" on:click={() => back()}>back</button>
    <button class="btn alert" on:click={() => deletePost(id)}>delete</button>
</div>
