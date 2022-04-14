<script lang="ts">
	import { page } from '$app/stores';
	import FormElement from "$lib/FormElement.svelte";
</script>

<footer>
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
</footer>