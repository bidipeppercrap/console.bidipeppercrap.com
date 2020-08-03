<script>
    import { onMount } from 'svelte';
    import { navigate } from 'svelte-routing';
    import axios from 'axios';
    import { accessToken } from './stores';

    let identity = '';
    let key = '';
    let error = '';
    let message = '';

    async function login() {
        error = '';
        message = 'loading...';
        try {
            let data = {
                identity,
                key
            };
            let { data: token } = await axios.post('/login', data);

            if (token) {
                localStorage.setItem('accessToken', token);
                accessToken.set(token);
                navigate('/', { replace: true });
            }
        } catch (e) {
            error = 'you got the wrong credentials';
        } finally {
            message = '';
        }
    }

    onMount(() => {
        if($accessToken) {
			navigate('/', { replace: true });
		}
    });

</script>

{#if error}
    <div class="login-messages">
        <div class="alert">{error}</div>
    </div>
{:else if message}
    <div class="login-messages">
        <div class="plane">{message}</div>
    </div>
{/if}
<div class="login-form plane">
    <label>
        <input placeholder="username" name="identity" type="text" class="form-control" bind:value={identity}>
    </label>
    <label>
        <input placeholder="password" name="key" type="password" class="form-control" bind:value={key}>
    </label>
    <button class="btn" on:click={login}>Sign In</button>
</div>