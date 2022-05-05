<script lang="ts">
	import Navigation from '$lib/navigation/Navigation.svelte';
	import { globalStore } from '$lib/stores';
	import { browser } from '$app/env';
	import { page } from '$app/stores';
	import { afterNavigate } from '$app/navigation';
	import '../app.scss';
	import { onMount } from 'svelte';
	import { StoreIdentifier } from '$lib/stores/_storeIdentifier.enum';
	import type { DataEntryResponse } from '$lib/types/data-entry.type';
	import { peopleStore } from '$lib/stores/_people.store';

	let entityId = browser && localStorage.getItem("entityId");
	let hospitalName: string;
	onMount(async () => {
		if(!entityId){
			const stores = $globalStore;
			const people = $peopleStore;
			const response = await postData('POST', stores, people);
			if(browser && response && response.item){
				localStorage.setItem('entityId', response.item.id);
				entityId = response.item.id;
			}
		} else {
			const response = await getData();
			if(response.stores){
				globalStore.set(response.stores);
				peopleStore.set(response.people);
				hospitalName = getHospitalName();
			}
			if(!Object.keys(response).length){
				const stores = $globalStore;
				const people = $peopleStore;
				postData('PUT',stores, people, entityId);
			}
		}
	})
	afterNavigate((navigationEvent: { from: URL | null; to: URL}) => {
		if(navigationEvent.from && navigationEvent.to){
			// UPDATE ON NAV
			const stores = $globalStore;
			const people = $peopleStore;
			postData('PUT',stores, people, entityId);
			hospitalName = getHospitalName();
		} 
	})
	const getModuleData = (moduleId: StoreIdentifier) => {
		return $globalStore.find(mod => mod.id === moduleId);
	}
	const getHospitalName = (): string => {
		const data = getModuleData(StoreIdentifier.MAPPING);
		return data?data.name:'unknown'
	}
	const getData = async (): Promise<DataEntryResponse> => {
		return await (await fetch('/data?'+new URLSearchParams({
			id: entityId
			}).toString(),{
			method: 'GET',
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json'
			}
		})).json();
	}
	const postData = async (method, stores, people, id?) => {
		const response = await fetch('/data', {
			method,
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ id, stores, people })
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
				tabindex="0">Hospital / {hospitalName}
			</span>
			<span class="pos-r">{$page.stuff.title}</span>
		</h1>
		<slot />
	</div>
	
</main>
