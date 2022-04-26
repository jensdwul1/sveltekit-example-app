<script lang="ts">
    export let styling: {
        class?: string,
        style?: string
    } = {
        class: undefined,
        style: undefined
    }
</script>
<div class="block {styling.class}">
    {#if $$slots.header}
    <div class="block--header">
        <slot name="header"></slot>
    </div>
    {/if}
    {#if $$slots.content}
        <div class="block--body">
            <slot name="content"></slot>
        </div>
    {/if}
    {#if $$slots.footer}
    <div class="block--footer">
        <slot name="footer"></slot>
    </div>
    {/if}
</div>
<style lang="scss">
    .block {
        padding: 1rem;
        border: 0.0625rem solid var(--app-color-light);
        border-radius: 0.25rem;
        box-shadow: 0 0.125rem 0.25rem rgba(0,0,0,0.25);
        &--header {
            border-bottom: 1px solid var(--app-color-medium);
            padding: 0 0 1rem;
        }
        &--body {
            padding: 1rem 0;
        }
        &--footer {
            border-top: 1px solid var(--app-color-medium);
            padding: 1rem 0 0;
        }
    }
</style>