<script>
    import { onMount } from 'svelte';
    import { navigate } from 'svelte-routing';
    import axios from 'axios';
    import { accessToken } from './stores';

    let identity = '';
    let key = '';

    async function login() {
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
        } catch (error) {           
        }
    }

    onMount(() => {
        if($accessToken) {
			navigate('/', { replace: true });
		}
    });

</script>

<div class="login-form plane">
    <label>
        <input placeholder="username" name="identity" type="text" class="input plane" bind:value={identity}>
    </label>
    <label>
        <input placeholder="password" name="key" type="password" class="input plane" bind:value={key}>
    </label>
    <button class="btn plane" on:click={login}>Sign In</button>
</div>