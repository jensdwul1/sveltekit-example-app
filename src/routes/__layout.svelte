<script lang="ts">
	import Navigation from '$lib/navigation/Navigation.svelte';
	import { page } from '$app/stores';
	import '../app.scss';
</script>

<main class="app">
	<Navigation />
	<div class="app-container">
		<h1 class="flex f-e jc-sb span-11">
			<span
				class="w-100 hospital_identifier"
				tabindex="0">Hospital / Veevä Provided /
			</span>
			<span class="pos-r ng-star-inserted"></span>
		</h1>
		{#if $page.stuff}
			STUFF IS FILLED
		{/if}
		<slot name="content" />
	</div>
</main>
