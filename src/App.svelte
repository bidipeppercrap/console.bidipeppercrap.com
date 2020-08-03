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
	<div class="navbar-wrapper">
		<nav class="plane navbar">
			<a class="navbar-logo img btn" href="/" use:link><img src="logo_long.svg" alt="logo" height="24px"></a>
			<btn class={(toggleMenu ? "alert " : "") + "navbar-hamburger btn"} on:click={handleToggle}>{toggleMenu ? 'x' : 'menu'}</btn>
			<div class={(toggleMenu ? "navbar-items-toggled " : "") + "navbar-items"}>
				<a class="navbar-item btn" href="/posts" use:link>posts</a>
				<a class="navbar-item btn" href="/projects" use:link>projects</a>
				<a class="navbar-item btn" href="/favorites" use:link>favorites</a>
				<a class="navbar-item btn" href="/" use:link>wishlist</a>
				<a class="navbar-item btn" href="/" use:link>contacts</a>
			</div>
		</nav>
	</div>
		<Route path="favorites"/>
		<Route path="projects"/>
		<Route path="posts"/>
		<Route path="/" component={Home}/>
	{/if}
</Router>