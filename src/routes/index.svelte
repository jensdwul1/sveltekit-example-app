<script context="module" lang="ts">
	export async function load({params, fetch}) {
		return {
			stuff: {
				title: 'Dashboard'
			}
		}
	}
</script>

<script lang="ts">
	import { page } from '$app/stores';
	import { globalStore } from '$lib/stores';
	import type { GenericStore } from '$lib/stores/_generic.store';
	import { peopleStore } from '$lib/stores/_people.store';
	import { StoreIdentifier } from "$lib/stores/_storeIdentifier.enum";

	import Block from './dashboard/block.svelte';
	let dataStores;
	const getPersonById = (identifier: string) => {
		return $peopleStore.find(person => person.id === identifier);
	}
	const processDataScopes = (dataScopes: GenericStore[]) => {
		dataStores = {};
		dataScopes.forEach(scope => {
			dataStores[scope.id] = scope;
		});
	}
	globalStore.subscribe(data => {
		processDataScopes(data);
	})
	page.subscribe(page => {
		// STORE ON PAGE CHANGE
	})
		
</script>

<section class="grid">
	{#if dataStores[StoreIdentifier.MAPPING]}
		<Block styling="{{class:'span-6'}}">
			<h3 slot="header">
				Hospital :: {dataStores[StoreIdentifier.MAPPING].name}
			</h3>
			<p slot="content" class="m-none">
				{#if dataStores[StoreIdentifier.MAPPING].address}
					Street: {dataStores[StoreIdentifier.MAPPING].address.street} {dataStores[StoreIdentifier.MAPPING].address.number}<br>
					City: {dataStores[StoreIdentifier.MAPPING].address.city}<br>
					Postal: {dataStores[StoreIdentifier.MAPPING].address.postalcode}
				{/if}
			</p>
			<p slot="footer" class="m-none">
				{#if dataStores[StoreIdentifier.MAPPING].address}
					Phone: {dataStores[StoreIdentifier.MAPPING].address.contactInformation.telephone}<br>
					Website: <a href={dataStores[StoreIdentifier.MAPPING].address.contactInformation.website}>{dataStores[StoreIdentifier.MAPPING].address.contactInformation.website}</a>
				{/if}
			</p>
		</Block>
	{/if}
	{#if dataStores[StoreIdentifier.STAKEHOLDERS]}
		<Block styling="{{class:'span-6'}}">
			<h3 slot="header">Stakeholders</h3>
			<div slot="content">
				{#each dataStores[StoreIdentifier.STAKEHOLDERS].stakeholders as person}
					<p>
						{dataStores[StoreIdentifier.STAKEHOLDERS].primaryStakeholder === person?'Primary ::':''}
						{getPersonById(person).firstName + (getPersonById(person).lastName?' '+getPersonById(person).lastName:'')}
					</p>
				{/each}
			</div>
		</Block>
	{/if}
	{#if dataStores[StoreIdentifier.NUB]}
		<Block styling="{{class:'span-6'}}">
			<h3 slot="header">NUB Staff</h3>
			<div slot="content">
				{#each dataStores[StoreIdentifier.NUB].staff as person}
					<p>
						{getPersonById(person).firstName + (getPersonById(person).lastName?' '+getPersonById(person).lastName:'')}
					</p>
				{/each}
			</div>
		</Block>
	{/if}
</section>
