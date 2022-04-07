<script lang="ts">
import { createEventDispatcher } from "svelte";


    interface Option {
        label: string;
        value?: string | number;
    };
    export let id: string;
    export let label: string;
    export let type: string = 'text';
    const simpleInputTypes: string[] = ['text','number','date','datetime-local','time','email','tel','url','search','password','range'];
    const selectInputTypes: string[] = ['select', 'multi-select'];
    export let required: boolean = false;
    export let placeholder: string = null;
    export let min: number = null;
    export let minLength: number = null;
    export let max: number = null;
    export let maxLength: number = null;
    export let step: number = null;
    export let pattern: string = null;
    export let autocomplete: string = null;
    export let readonly: boolean = false;
    export let disabled: boolean = false;
    export let options: Option[] = [];
    export let value;
    export let debug: boolean = false;
    export let styling: {
        underlined: boolean;
        class: string;
    }
    export let error: boolean = false;
    export let errorMessage: string = 'This field is required';

    const dispatch = createEventDispatcher();
    
    let active: boolean = false;
    let touched: boolean = false;
    let valid: boolean = true;
    const changeHandlerSelect = ($value) => {
        touched = true;
        if(value.includes($value)){
            value = value.filter(val => val !== $value);
        } else {
            value.push($value);
        }
        checkSelectValidity();
        dispatch('change', {value:value});
    }
    const selectTrigger = () => {
        active = !active;
    }
    const selectLabel = (optionValue) => {
        const opt = options.find((opti) => opti.value === optionValue);
        return opt && opt.label?opt.label:'Invalid';
    }
    const selectRemoveValue = ($value) => {
        value = value.filter(val => val !== $value);
        dispatch('change', {value:value});
    }
    const handleInput = e => {
        // in here, you can switch on type and implement
        // whatever behaviour you need
        value = type.match(/^(number|range)$/)
        ? +e.target.value
        : e.target.value;
        e.target.value = value;
    };
    const validate = (e) => {
        // Type validation
        switch(type){
            case 'url':
                // URL HAS TO START WITH HTTP OR HTTPS
                if(!value.startsWith("http://") && !value.startsWith("https://")){
                    value = "https://"+value;
                    e.target.value = value;
                }
            default:
                valid = e.target.checkValidity();
                break;
        }
        dispatch('change', {value:value});
    }
    const checkSelectValidity = () => {
        // CLEAN UP IMPOSSIBLE VALUES
        value = value.filter(option => {
            const optionMatch = options.find(opt => opt.value === option);
            return !!optionMatch;
        });

        if(required && value.length === 0){
            valid = false;
        } else {
            valid = true;
        }
    }
    
</script>
<div class="form-element {styling.class}">
    {#if label}
        <h3 class:underlined="{styling.underlined}">
            {@html label}
        </h3>
    {/if}
    <div class="input-container">
        {#if simpleInputTypes.includes(type)}
            <input 
            class:error="{!valid}"
            on:blur={validate}
            on:input={e => {handleInput(e); validate(e)}}
            {id} name={id} {type} {required} {disabled} value={value?value:null} {placeholder} {min} {max} {minLength} {maxLength} {step} {readonly} {autocomplete} {pattern}/>
        {/if}
        {#if type === 'textarea'}
            <textarea 
            class:error="{!valid}"
            on:blur={validate}
            on:input={validate}
            {id} name={id} {required} bind:value={value} {disabled} {placeholder} {minLength} {maxLength} {readonly} {autocomplete}></textarea>
        {/if}
        {#if selectInputTypes.includes(type)}
            {#if type === 'select'}
                <div class="select--wrapper">
                    <select 
                    {id} 
                    name={id}
                    class:error="{!valid}"
                    on:blur={validate}
                    on:change={e => {handleInput(e); validate(e)}}
                    {autocomplete}
                    disabled={disabled || readonly}
                    bind:value={value}>
                        {#if placeholder}
                        <option disabled>
                            {placeholder}
                        </option>
                        {/if}
                        {#each options as option}
                        <option value={option.value}>
                            {option.label}
                        </option>
                        {/each}
                    </select>
                </div>
            {/if}
            {#if type === 'multi-select'}
                <div class="select--multi" class:select--active={active}>
                    <button class="button--input button--select" 
                    class:touched={touched}
                    class:button--active={active}
                    class:invalid={!valid} 
                    on:blur={() => {touched=true}}
                    on:click={selectTrigger}
                    {id} 
                    name={id}
                    disabled={disabled || readonly}
                    >
                    {placeholder}
                    </button>
                    {#if options}
                        <div class="select--multi-options" class:select--multi-options-active={active}>
                            {#each options as option, index}
                                <label class="select--option" data-key="{index}" class:select--option-disabled={max && max === value.length && !value.includes(option.value)}>
                                    <input id="{id+'-multiselect-'+index}" name="{id+'-multiselect-'+index}" type="checkbox" checked="{value.includes(option.value)}" value="{option.value}" on:click={() => {changeHandlerSelect(option.value)}} disabled={max && max === value.length && !value.includes(option.value)}/>
                                    <span for="{id+'-multiselect-'+index}" class="select--option-label">{ option.label }</span>
                                </label>                                
                            {/each}     
                        </div>
                    {/if}
                    <div class="select--multi-barrier" class:select--multi-barrier-active={active} on:click={selectTrigger}></div>
                </div>
                {#if value.length}
                <div class="select--multi-answers">
                    {#each value as option, index}
                    <button class="select--multi-answers-answer" data-key={index} on:click={() => {!readonly?selectRemoveValue(option):null}}>
                        <span>{selectLabel(option)}</span>
                        {#if !readonly}
                            <svg class="icon select--multi-answers-answer-img">
                                <use xlink:href="#close-icon"></use>
                            </svg>
                        {/if}
                    </button>
                    {/each}
                </div>
                {/if}
            {/if}
        {/if}
        {#if debug}
            <pre>VALUE :: {value}</pre>
        {/if}
        {#if error}
            <div class="error-message">
                {@html errorMessage}
            </div>
        {/if}
    </div>
</div>