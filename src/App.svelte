<script>
	import { onMount } from 'svelte';
	import { Router, Link, Route, navigate } from 'svelte-routing';
	import { accessToken } from './stores';

	import Login from './routes/Login.svelte';

	export let url = '';

	onMount(() => {
		if(!$accessToken) {
			navigate('/login');
		}
	});

</script>

<Router {url}>
	<Route path="login" component={Login}/>
	<Route path="/"/>
</Router>