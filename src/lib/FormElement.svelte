<script lang="ts">
    interface Option {
        label: string;
        value?: string | number;
    };
    export let id: string;
    export let label: string;
    export let type: string = 'text';
    const simpleInputTypes: string[] = ['text','number','date','email','tel','url','search','password','range'];
    const selectInputTypes: string[] = ['select', 'multi-select'];
    export let required: boolean = false;
    export let placeholder;
    export let options: Option[];
    export let value;
    let active: boolean = false;
    let touched: boolean = false;
    let valid: boolean = true;
    const handleInput = e => {
        // in here, you can switch on type and implement
        // whatever behaviour you need
        value = type.match(/^(number|range)$/)
        ? +e.target.value
        : e.target.value;
    };
    const changeHandlerSelect = ($value) => {
        touched = true;
        if(value.includes($value)){
            value = value.filter(val => val !== $value);
        } else {
            value.push($value);
        }
        checkSelectValidity();
    }
    const selectTrigger = () => {
        active = !active;
    }
    const selectLabel = (opts, optionValue) => {
        const opt = opts.find((opti) => opti.value === optionValue);
        return opt && opt.label?opt.label:'Invalid';
    }
    const selectRemoveValue = ($value) => {
        value = value.filter(val => val !== $value);
    }
    const checkSelectValidity = () => {
        // CLEAN UP IMPOSSIBLE VALUES
        value = value.filter(option => options.includes(option));

        if(required && value.length === 0){
            valid = false;
        } else {
            valid = true;
        }
    }
    export let styling: {
        underlined: boolean;
    }
    export let error: boolean = false;
    export let errorMessage: string = 'This field is required';
    
</script>
<div class="form-element">
    {#if label}
        <h3 class:underlined="{styling.underlined}">
            {@html label}
        </h3>
    {/if}
    <div class="input-container" class:error="{error}">
        {#if simpleInputTypes.includes(type)}
            <input {id} name={id}{type} {required} {value} {placeholder}/>
        {/if}
        {#if selectInputTypes.includes(type)}
            {#if type === 'select'}
                <select 
                {id} 
                name={id}
                bind:value={value}>
                    {#each options as option}
                    <option value={option.value}>
                        {option.label}
                    </option>
                    {/each}
                </select>
            {/if}
            {#if type === 'multi-select'}
                <select bind:value={value}>
                    {#each options as option}
                    <option value={option.value}>
                        {option.label}
                    </option>
                    {/each}
                </select>
                <div class="select--multi">
                    <button class="button--input button--select" 
                    class:touched={touched}
                    class:button--active={active}
                    class:invalid={!valid} 
                    on:blur={() => {touched=true}}
                    on:click={selectTrigger}
                    {id} 
                    name={id}
                    >
                    {placeholder}
                    </button>
                    {#if options}
                        <div class="select--multi-options" class:select--multi-options-active={active}>
                            {#each options as option, index}
                                <label class="select--option" data-key="{index}">
                                    <input id="{id+'-multiselect-'+index}" name="{id+'-multiselect-'+index}" type="checkbox" checked="{value.includes(option.value)}" value="{option.value}" on:click={() => {changeHandlerSelect(option.value)}} />
                                    <span for="{id+'-multiselect-'+index}" class="select--option-label">{ option.label }</span>
                                </label>                                
                            {/each}     
                        </div>
                    {/if}
                    <div class="select--multi-barrier" class:select--multi-barrier-active={active} on:click={selectTrigger}></div>
                </div>
                {#if value.length}
                <div class="select--multi-answers">
                    {#each options as option, index}
                    <button class="select--multi-answers-answer" data-key={index} on:click={() => {selectRemoveValue(option)}}>
                        <span>{selectLabel(options, option)}</span>
                        <svg class="icon">
                            <use xlink:href="#close-icon"></use>
                        </svg>
                    </button>
                    {/each}
                </div>
                {/if}
            {/if}
        {/if}
        {#if error}
            <div class="error-message">
                {@html errorMessage}
            </div>
        {/if}
    </div>
</div>