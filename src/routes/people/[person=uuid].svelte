<script context="module" lang="ts">    
	export async function load({params, fetch}) {
		return {            
			stuff: {
				title: 'Profile'
			}
		}
	}
</script>
<script lang="ts">
    import { page } from "$app/stores";
    import { peopleStore, peopleOptions } from "$lib/stores/_people.store";
    import type { Person } from "$lib/types/people.type";
    import JSONTree from 'svelte-json-tree';

    const getPersonById = (personId) => {
        return $peopleStore.find(person => person.id === personId);
    }
    let value: Person;
    peopleStore.subscribe(people => {
        value = getPersonById($page.params.person)
    })
</script>

<pre>
    {#if value }
        <JSONTree {value} />
    {/if}
</pre>