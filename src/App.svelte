<script>
	import '../node_modules/plane.css';
	import { onMount } from 'svelte';
	import { Router, link, Route, navigate } from 'svelte-routing';
	import { accessToken, isAuthenticated } from './stores';
    import createAuth0Client from '@auth0/auth0-spa-js';
	import config from './config';

	import Home from './routes/Home.svelte';

	import NavLink from './NavLink.svelte'

	export let url = '';
	let authZero;

	let toggleMenu = false;

	onMount(async () => {
		authZero = await createAuth0Client({
			audience: config.auth0.audience,
            domain: config.auth0.domain,
			client_id: config.auth0.client_id,
			useRefreshTokens: true
		});

		isAuthenticated.set(await authZero.isAuthenticated());

		if (!$isAuthenticated) {
			await authZero.loginWithPopup();
		}

		const token = await authZero.getTokenSilently();
		accessToken.set(token);

		localStorage.setItem('isAuthenticated', $isAuthenticated);
	});

	function handleToggle() {
		toggleMenu = !toggleMenu;
	}

</script>

<Router {url}>
	{#if !$isAuthenticated}
	<div class="notice">
		<div class="plane">
			Please log in
		</div>
	</div>
	{:else}
	<div class="navbar-wrapper">
		<nav class="plane navbar">
			<NavLink className="navbar-logo img btn" to="/"><img src="logo_long.svg" alt="logo" height="24px"></NavLink>
			<btn class={(toggleMenu ? "alert " : "") + "navbar-hamburger btn"} on:click={handleToggle}>{toggleMenu ? 'x' : 'menu'}</btn>
			<div class={(toggleMenu ? "navbar-items-toggled " : "") + "navbar-items"}>
				<NavLink className="navbar-item btn" to="/posts">posts</NavLink>
				<NavLink className="navbar-item btn" to="/projects">projects</NavLink>
				<NavLink className="navbar-item btn" to="/favorites">favorites</NavLink>
				<NavLink className="navbar-item btn" to="/wishlist">wishlist</NavLink>
				<NavLink className="navbar-item btn" to="/contacts">contacts</NavLink>
			</div>
		</nav>
	</div>
	<Route path="favorites"/>
	<Route path="projects"/>
	<Route path="posts"/>
	<Route path="/" component={Home}/>
	{/if}
</Router>