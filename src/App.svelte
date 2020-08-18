<script>
  import "../node_modules/plane.css";
  import createAuth0Client from "@auth0/auth0-spa-js";
  import axios from "axios";
  import config from "./config";

  import { onMount } from "svelte";
  import { Router, Route } from "svelte-routing";
  import { accessToken, isAuthenticated } from "./store/auth";

  import Home from "./pages/Home.svelte";
  import Posts from "./pages/Posts.svelte";

  import NavLink from "./NavLink.svelte";

  export let url = "";

  axios.defaults.baseURL = config.apiUrl;

  let params;
  let authZero;

  let toggleMenu = false;

  onMount(async () => {
    await promptLogin();
  });

  function handleToggle() {
    toggleMenu = !toggleMenu;
  }

  async function promptLogin() {
    authZero = await createAuth0Client({
      audience: config.auth0.audience,
      domain: config.auth0.domain,
      client_id: config.auth0.client_id,
      useRefreshTokens: true,
    });

    isAuthenticated.set(await authZero.isAuthenticated());

    if (!$isAuthenticated) {
      await authZero.loginWithPopup();
    }

    isAuthenticated.set(await authZero.isAuthenticated());

    const token = await authZero.getTokenSilently();
    accessToken.set(token);

    localStorage.setItem("isAuthenticated", $isAuthenticated);
    
    axios.defaults.headers.common["Authorization"] = `Bearer ${$accessToken}`;
  }
</script>

<Router {url}>
  {#if !$isAuthenticated}
    <style>
      body {
        margin: 0;
      }
    </style>
    <div class="notice">
      <button class="btn" on:click={() => promptLogin()}>Login</button>
    </div>
  {:else}
    <div class="navbar-wrapper">
      <nav class="plane navbar">
        <NavLink className="navbar-logo img btn" to="/">
          <img src="logo_long.svg" alt="logo" height="24px" />
        </NavLink>
        <btn
          class={(toggleMenu ? 'alert ' : '') + 'navbar-hamburger btn'}
          on:click={handleToggle}>
          {toggleMenu ? 'x' : 'menu'}
        </btn>
        <div
          class={(toggleMenu ? 'navbar-items-toggled ' : '') + 'navbar-items'}>
          <NavLink className="navbar-item btn" to="/posts">posts</NavLink>
          <NavLink className="navbar-item btn" to="/projects">projects</NavLink>
          <NavLink className="navbar-item btn" to="/favorites">
            favorites
          </NavLink>
          <NavLink className="navbar-item btn" to="/wishlist">wishlist</NavLink>
          <NavLink className="navbar-item btn" to="/contacts">contacts</NavLink>
        </div>
      </nav>
    </div>
    <main role="main" class="main__wrapper">
      <Route path="posts/*" component={Posts} />
      <Route path="projects" />
      <Route path="favorites" />
      <Route path="wishlist" />
      <Route path="contacts" />
      <Route path="/" component={Home} />
    </main>
  {/if}
</Router>
