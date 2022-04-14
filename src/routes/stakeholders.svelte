<script context="module" lang="ts">
	export async function load({params, fetch}) {
		return {
			stuff: {
				title: 'Stakeholders'
			}
		}
	}
</script>
<script lang="ts">
	import FormElement from "$lib/FormElement.svelte";
	import { globalStore } from "$lib/stores";
	import { peopleStore, peopleOptions } from "$lib/stores/_people.store";
	import { StakeholderStore } from "$lib/stores/modules/_stakeholders.store";
	import { StoreIdentifier } from "$lib/stores/_storeIdentifier.enum";
import type { Option } from "$lib/types/generic.type";
	let moduleStore: StakeholderStore;
	globalStore.subscribe(data => {
		moduleStore = data.find(entity => entity.id === StoreIdentifier.STAKEHOLDERS);
		if(!moduleStore){
			globalStore.add(new StakeholderStore());
		}
	})
	
	const add = () => {
		console.log('Stakeholders add')
		moduleStore.stakeholders = [...moduleStore.stakeholders,null];
	}
	const remove = (index: number) => {
		moduleStore.stakeholders = moduleStore.stakeholders.filter((p, i) => i !== index);
	}

	const getPerson = (identifier) => {
		return $peopleStore.find((person => person.id === identifier));
	}

	const filteredPeopleOptions = (): Option[] => {
		return peopleOptions.filter((person) => !moduleStore.stakeholders.includes(person.value))
	}
</script>
<div class="grid">
	{#each moduleStore.stakeholders as person, index}
	<div class="span-12 grid {moduleStore.primaryStakeholder === person?'primary-stakeholder':''}">
		<FormElement 
			id={'person-'+index}
			placeholder="Please select a person"
			label="Stakeholder"
			type="select"
			value={person}
			options={filteredPeopleOptions()}
			on:change={(e) => {
				person = e.detail.value;
			}}
			styling={{underlined: true, class: 'span-6'}}
		/>
		<FormElement
			id={'person-isPrimary'+index}
			label="Is this the primary Stakeholder?"
			type="checkbox"
			value={person}
			styling={{underlined: true, class: 'span-6'}}
			checked={moduleStore.primaryStakeholder === person}
			on:change={(e) => {
				moduleStore.primaryStakeholder = e.detail.value;
				console.log('moduleStore.primaryStakeholder',moduleStore.primaryStakeholder);
			}}
			/>
			<div class="form-element span-3">
				<h3>&nbsp;</h3>
				<button class="button dark" on:click={() => remove(index)}>Delete</button>
			</div>
			<hr class="span-12">
	</div>
	{/each}
	<button class="button primary-shade span-12" on:click={add}>Add a Stakeholder</button>
</div>