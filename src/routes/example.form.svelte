<script context="module" lang="ts">
	export const prerender = true;
	export async function load({params, fetch}) {
		return {
			stuff: {
				title: 'Example'
			}
		}
	}
</script>

<script lang="ts">
	import FormElement from "$lib/FormElement.svelte";
	let textVariable: string;
	let textareaVariable: string;
	let numberVariable: number;
	let dateVariable: Date;
	let passwordVariable: string;
	let emailVariable: string;
	let urlVariable: string;
	let telVariable: string;
	let timeVariable: Date;
	let rangeVariable: number;
	let searchVariable: string;

	let selectVariable: string = 'val1';
	let multiSelectVariable = ['val2'];
</script>

<section class="grid">
	<FormElement
		id="textTest"
		placeholder="Text Input Value goes here"
		label="Text Input"
		type="text"
		value={textVariable}
        debug={true}
		styling={{underlined: true, class: 'span-6'}}
	/>
	<FormElement
		id="numberTest"
		placeholder="Number Input Value goes here"
		label="Number Input"
		type="number"
		min={10}
		max={50}
		step={2}
		value={numberVariable}
        debug={true}
		styling={{underlined: true, class: 'span-6'}}
	/>
	<FormElement
		id="textareaTest"
		placeholder="Textarea Value goes here"
		label="Textarea"
		type="textarea"
		required={true}
		value={textareaVariable}
        debug={true}
		styling={{underlined: true, class: 'span-12'}}
	/>
	<FormElement
		id="dateTest"
		placeholder="Date Input Value goes here"
		label="Date Input"
		type="date"
		value={dateVariable}
        debug={true}
		styling={{underlined: true, class: 'span-6'}}
	/>
	<FormElement
		id="timeTest"
		placeholder="time Input Value goes here"
		label="time Input"
		type="time"
		value={timeVariable}
        debug={true}
		styling={{underlined: true, class: 'span-6'}}
	/>
	<FormElement
		id="emailTest"
		placeholder="Email Input Value goes here"
		label="Email Input"
		type="email"
		value={emailVariable}
        debug={true}
		styling={{underlined: true, class: 'span-6'}}
	/>
	<FormElement
		id="telTest"
		placeholder="tel Input Value goes here"
		label="Tel Input"
		type="tel"
		value={telVariable}
        debug={true}
		styling={{underlined: true, class: 'span-6'}}
	/>
	<FormElement
		id="urlTest"
		placeholder="url Input Value goes here"
		label="url Input"
		type="url"
		value={urlVariable}
        debug={true}
		styling={{underlined: true, class: 'span-6'}}
	/>
	<FormElement
		id="searchTest"
		placeholder="search Input Value goes here"
		label="search Input"
		type="search"
		value={searchVariable}
        debug={true}
		styling={{underlined: true, class: 'span-6'}}
	/>
	<FormElement
		id="passwordTest"
		placeholder="password Input Value goes here"
		label="password Input"
		type="password"
		value={passwordVariable}
        debug={true}
		styling={{underlined: true, class: 'span-6'}}
	/>
	<FormElement
		id="rangeTest"
		placeholder="range Input Value goes here"
		label="range Input"
		type="range"
		min={10}
		max={50}
		step={2}
		value={rangeVariable}
        debug={true}
		styling={{underlined: true, class: 'span-6'}}
	/>
	<FormElement
		id="selectTest"
		placeholder="Select Placeholder"
		label="Test"
		type="select"
		value={selectVariable}
		styling={{underlined: true, class: 'span-6'}}
        debug={true}
		options={[{label: 'opt 1', value: 'val1'},{label: 'opt 2', value: 'val2'}]}
	/>
	<FormElement
		id="multiSelectTest"
		placeholder="Multi Select Placeholder"
		label="Test"
		type="multi-select"
		max={2}
		value={multiSelectVariable}
		styling={{underlined: true, class: 'span-6'}}
        debug={true}
		options={[{label: 'opt 1', value: 'val1'},{label: 'opt 2', value: 'val2'},{label: 'opt 3', value: 'val3'}]}
	/>
</section>
