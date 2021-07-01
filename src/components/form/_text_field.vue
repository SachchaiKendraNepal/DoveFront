<template>
	<v-col cols="12">
		<v-text-field
			:value="value"
			solo
			clearable
			:label="label.toUpperCase()"
			placeholder="Start typing"
			:type="type"
			:hint="hint"
			:counter="counter"
			hide-details="auto"
			:error-messages="getErrorMessage"
			:prepend-inner-icon="icon"
			:autocomplete="autocomplete"
			@input="$emit('input', $event)"
			@change="$emit('change', $event)"
		/>
	</v-col>
</template>
<script>
import AdminFieldErrorMessage from "@/mixins/AdminFieldErrorMessage";

export default {
	name: "TextField",
	mixins: [AdminFieldErrorMessage],
	props: {
		/* eslint-disable vue/require-prop-types */
		value: {
			required: true
		},
		name: {
			type: String,
			required: true,
		},
		label: {
			type: String,
			required: true
		},
		hint: {
			type: String,
			default: null,
		},
		type: {
			type: String,
			required: false,
			default: "text"
		},
		errors: {
			type: Object,
			required: false,
			default: () => {}
		},
		icon: {
			type: String,
			required: true
		},
		counter: {
			default: false
		},
		autocomplete: {
			type: String,
			default: "off"
		}
	},
	emits: ["input", "change"],
}
</script>
