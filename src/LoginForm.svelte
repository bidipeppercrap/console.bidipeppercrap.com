<script>
    import { navigate } from 'svelte-routing';
    import axios from 'axios';
    import { accessToken } from './stores';

    let identity = '';
    let key = '';

    async function login() {
        // let data = {
        //     identity,
        //     key
        // };
        // let token = await axios.post('/login', data);

        // if (token) {
        //     navigate('/', { replace: true });
        // }
    }

</script>

<div class="box">
    <label>
        <input name="identity" type="text" class="box" bind:value={identity}>
    </label>
    <label>
        <input name="key" type="password" class="box" bind:value={key}>
    </label>
    <button class="btn box" on:click={login()}>Sign In</button>
</div>