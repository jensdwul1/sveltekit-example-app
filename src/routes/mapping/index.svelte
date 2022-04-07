<script context="module" lang="ts">
	export async function load({params, fetch}) {
		return {
			stuff: {
				title: 'Mapping'
			}
		}
	}
</script>
<script lang="ts">	
	import FormElement from "$lib/FormElement.svelte";
	import { globalStore } from "$lib/stores";
	import { MappingStore } from "$lib/stores/_mapping.store";
	let mappingStore: MappingStore;
	globalStore.subscribe(data => {
		mappingStore = data.find(entity => entity.id === 'mapping');
		if(!mappingStore){
			globalStore.add(new MappingStore());
		}
	})
</script>
<svelte:head>
	<title>Spravato Navigator | Mapping</title>
</svelte:head>
<section class="grid">
	{#if mappingStore}
		<FormElement
			id="mappingStore.name"
			placeholder="Enter the hospital name"
			label="Hospital Name"
			type="text"
			value={mappingStore.name}
			on:change={(e) => {
				mappingStore.name = e.detail.value;
			}}
			styling={{underlined: true, class: 'span-6'}}
		/>
		<FormElement
			id="mappingStore.hospitalId"
			placeholder="Enter the hospital identifier"
			label="Hospital Identifier"
			type="text"
			value={mappingStore.hospitalId}
			on:change={(e) => {
				mappingStore.hospitalId = e.detail.value;
			}}
			styling={{underlined: true, class: 'span-6'}}
		/>
		<hr class="span-12">
		<FormElement
			id="mappingStore.address.street"
			placeholder="Enter the street"
			label="Street"
			type="text"
			value={mappingStore.address.street}
			on:change={(e) => {
				mappingStore.address.street = e.detail.value;
			}}
			styling={{underlined: true, class: 'span-6'}}
		/>
		<FormElement
			id="mappingStore.address.number"
			placeholder="Enter the street number"
			label="Street number"
			type="number"
			min={1}
			value={mappingStore.address.number}
			on:change={(e) => {
				mappingStore.address.number = e.detail.value;
			}}
			styling={{underlined: true, class: 'span-6'}}
		/>
		<FormElement
			id="mappingStore.address.postalcode"
			placeholder="Enter the hospital identifier"
			label="Postal"
			type="text"
			value={mappingStore.address.postalcode}
			on:change={(e) => {
				mappingStore.address.postalcode = e.detail.value;
			}}
			styling={{underlined: true, class: 'span-6'}}
		/>
		<FormElement
			id="mappingStore.address.city"
			placeholder="Enter the hospital identifier"
			label="City"
			type="text"
			value={mappingStore.address.city}
			on:change={(e) => {
				mappingStore.address.city = e.detail.value;
			}}
			styling={{underlined: true, class: 'span-6'}}
		/>
		<FormElement
			id="mappingStore.address.contactInformation.telephone"
			placeholder="Enter the telephone number"
			label="Telephone"
			type="tel"
			value={mappingStore.address.contactInformation.telephone}
			on:change={(e) => {
				mappingStore.address.contactInformation.telephone = e.detail.value;
			}}
			styling={{underlined: true, class: 'span-6'}}
		/>
		<FormElement
			id="mappingStore.address.contactInformation.website"
			placeholder="Enter the website"
			label="Website"
			type="url"
			value={mappingStore.address.contactInformation.website}
			on:change={(e) => {
				mappingStore.address.contactInformation.website = e.detail.value;
			}}
			styling={{underlined: true, class: 'span-6'}}
		/>
	{/if}
</section>