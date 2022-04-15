<script context="module" lang="ts">
	export async function load({params, fetch}) {
		return {
			stuff: {
				title: 'NUB'
			}
		}
	}
</script>
<script lang="ts">
	import FormElement from "$lib/FormElement.svelte";
	import { globalStore } from "$lib/stores";
	import { NubStore } from "$lib/stores/modules/_nub.store";
	import { peopleStore } from "$lib/stores/_people.store";
	import { StoreIdentifier } from "$lib/stores/_storeIdentifier.enum";
	import { Person, PersonRoleOptions } from "$lib/types/people.type";
	let moduleStore: NubStore;	;
	globalStore.subscribe(data => {
		moduleStore = data.find(entity => entity.id === StoreIdentifier.NUB);
		if(!moduleStore){
			globalStore.add(new NubStore());
		}
	})
	
	const add = () => {
		const newPerson = new Person({origin: 'nub.index'});
		peopleStore.add(newPerson);
		moduleStore.staff = [...moduleStore.staff, newPerson.id];
	}
	const remove = (identifier: string) => {
		// REMOVE FROM GLOBAL PEOPLE STORE
		peopleStore.remove(identifier);
		// REMOVE FROM MODULE STORE
		moduleStore.staff = moduleStore.staff.filter((p) => p !== identifier);
	}
</script>
<div class="grid">
	<h2 class="span-12">Medical Professionals</h2>
	{#each $peopleStore as person, index}
	<FormElement
		id={'FirstName'+person.id}
		placeholder="Enter the first name"
		label="First Name"
		type="text"
		value={person.firstName}
		on:change={(e) => {
			person.firstName = e.detail.value;
		}}
		styling={{underlined: true, class: 'span-6'}}
	/>
	<FormElement
		id={'LastName'+person.id}
		placeholder="Enter the last name"
		label="Last Name"
		type="text"
		value={person.lastName}
		on:change={(e) => {
			person.lastName = e.detail.value;
		}}
		styling={{underlined: true, class: 'span-6'}}
	/>
	<hr class="span-12">
	<FormElement 
		id={'Roles-'+index}
		placeholder="Please select the roles of this person"
		label="Roles"
		type="multi-select"
		value={person.roles}
		options={PersonRoleOptions}
		on:change={(e) => {
			person.roles = e.detail.value;
		}}
		styling={{underlined: true, class: 'span-12'}}
	/>
	<hr class="span-12">
	<button class="button dark span-6" on:click={() => remove(person.id)}>Delete this Staff member</button>
	<hr class="span-12">
	{/each}
	<button class="button primary-shade span-12" on:click={add}>Add a Staff member</button>
</div>