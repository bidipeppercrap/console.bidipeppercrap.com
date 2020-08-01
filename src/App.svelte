<script>
	import '../node_modules/plane.css';
	import { onMount } from 'svelte';
	import { Router, link, Route, navigate } from 'svelte-routing';
	import { accessToken } from './stores';

	import Login from './routes/Login.svelte';
	import Home from './routes/Home.svelte';

	export let url = '';

	let toggleMenu = false;

	onMount(() => {
		if(!$accessToken) {
			navigate('/login', { replace: true });
		}
	});

	function handleToggle() {
		toggleMenu = !toggleMenu;
	}

</script>

<Router {url}>
	<Route path="login" component={Login}/>
	{#if location.pathname != 'login'}
		<nav class="plane navbar">
			<a class="navbar-logo img btn plane" href="/" use:link><img src="logo_long.svg" alt="logo" height="24px"></a>
			<btn class="navbar-hamburger btn plane" on:click={handleToggle}>{toggleMenu ? 'x' : 'menu'}</btn>
			<a class="navbar-item btn plane" href="/posts" use:link>posts</a>
			<a class="navbar-item btn plane" href="/projects" use:link>projects</a>
			<a class="navbar-item btn plane" href="/favorites" use:link>favorites</a>
			<a class="navbar-item btn plane" href="/" use:link></a>
			<a class="navbar-item btn plane" href="/" use:link></a>
		</nav>
		<div class="wrapper">
			<Route path="favorites"/>
			<Route path="projects"/>
			<Route path="posts"/>
			<Route path="/" component={Home}/>
		</div>
	{/if}
</Router>