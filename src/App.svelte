<script>
	import '../node_modules/plane.css';
	import { onMount } from 'svelte';
	import { Router, link, Route, navigate } from 'svelte-routing';
	import { accessToken } from './stores';

	import Login from './routes/Login.svelte';
	import Home from './routes/Home.svelte';

	import NavLink from './NavLink.svelte'

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