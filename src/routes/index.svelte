<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import FormElement from "$lib/FormElement.svelte";
	let testVariable = [];
</script>

<svelte:head>
	<title>Spravato Navigator | Dashboard</title>
</svelte:head>

<section>
	<FormElement 
		id="Test input"
		placeholder="Multi Select Placeholder"
		label="Test"
		type="multi-select"
		value={testVariable}
		styling={{underlined: true}}
		options={[{label: 'opt 1', value: 'val1'}]}
	/>
</section>
