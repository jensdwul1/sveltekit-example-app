<script lang="ts">
	import Navigation from '$lib/navigation/Navigation.svelte';
	import { page } from '$app/stores';
	import '../app.scss';
</script>


<svelte:head>
	<title>Spravato Navigator | {$page.stuff.title}</title>
</svelte:head>

<main class="app">
	<Navigation />
	<div class="app-container">
		<h1 class="flex f-e jc-sb f-wrap span-11">
			<span
				class="w-100 hospital--identifier"
				tabindex="0">Hospital / Veevä Provided /
			</span>
			<span class="pos-r">{$page.stuff.title}</span>
		</h1>
		<slot />
	</div>
	
</main>
