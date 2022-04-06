<script lang="ts">
	import { page } from '$app/stores';
    import { Navigation } from './navigation.options';
    const clientVersion = __version__;
</script>

<aside class="app-navigation" id="app-nav">
    <nav class="app-navigation-container" id="app-nav-pages">
        {#each Navigation as navigationItem }
            <a class="app-navigation-section" class:active="{$page.url.pathname === navigationItem.path}"
                sveltekit:prefetch class:disabled="{navigationItem.disabled}" href="{navigationItem.path}">
                <svg class="icon" class:nudged="{navigationItem.nudged}">
                <use xlink:href="{navigationItem.icon}"></use>
                </svg>
                <p>{@html navigationItem.label}</p>
            </a>
        {/each}
    </nav>
    <div class="app-navigation-version" id="app-nav-version">
        {clientVersion}
    </div>
</aside>