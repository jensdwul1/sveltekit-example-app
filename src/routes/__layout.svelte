<script lang="ts">
	import Navigation from '$lib/navigation/Navigation.svelte';
	import { globalStore } from '$lib/stores';
	import { browser } from '$app/env';
	import { page } from '$app/stores';
	import '../app.scss';
	import { onMount } from 'svelte';

	let entityId = browser && localStorage.getItem("entityId");
	if(browser){
		localStorage.setItem('entityId', entityId);
	}
	onMount(async () => {
		if(!entityId){
			const stores = $globalStore;
			const response = await postData('POST', stores);
			localStorage.setItem('entityId', response.item.id);
		} else {
			const response = await (await fetch('/data?'+new URLSearchParams({
				id: entityId
				}).toString(),{
				method: 'GET',
				credentials: 'same-origin',
				headers: {
					'Content-Type': 'application/json'
				}
			})).json();
			if(response.stores){
				globalStore.set(response.stores);
			}
			if(!Object.keys(response).length){
				const stores = $globalStore;
				// postData('PUT',stores, entityId);
			}
		}
	})
	
	const postData = async (method, stores, id?) => {
		const response = await fetch('/data', {
			method,
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ id, stores })
		});
		return await response.json();
	}
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
