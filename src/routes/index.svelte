<script context="module" lang="ts">
	export const prerender = true;
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

	globalStore.subscribe(data => {
		console.log('data',data);
	})
	page.subscribe(page => {
		// STORE ON PAGE CHANGE
		
	})
</script>

<section class="grid">
	
</section>
